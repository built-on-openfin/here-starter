# Using the GraphQL API for User and App Management How-To

Your HERE application directory — the apps your users see, and the settings that decide how each one
behaves — is normally maintained by hand in the Admin Console. The **Content Configuration API**
exposes that same directory programmatically: a single GraphQL endpoint serving both queries and
mutations, with full create/read/update/delete over app definitions.

That turns directory administration into something you can automate:

- **Config as code.** Keep the directory in a file in version control, review changes in a pull
  request, and read its history alongside the rest of your configuration.
- **Deployment pipelines.** Register or update an app as part of a release, rather than as a manual
  step someone has to remember afterwards.
- **Environment promotion.** Build a directory in one environment, then apply the same definitions
  to the next and know the two match.
- **Scale.** A directory of hundreds of apps, or one change that touches all of them, is a single
  bulk request. Bulk writes are all-or-nothing, so a directory never lands half-updated.
- **Validation before you write.** Check a definition, or preview a whole reconcile, before anything
  changes.

## What this how-to includes

1. A **browser UI** that signs in with OAuth 2.0 (or with an API JWT pasted in directly), shapes an
   app definition, and runs the create → validate → update → delete lifecycle against your
   directory, logging every request and response.
2. A **config-as-code sync script** that reconciles an [FDC3 2.0 App Directory](https://fdc3.finos.org/docs/app-directory/overview)
   manifest (`apps.config.json`) against your live directory, plus an **export script** (and a UI
   button) that does the reverse: dump a live directory into that same manifest shape, e.g. to
   carry it into another environment.
3. A **user management panel** in the same UI, using the User and Group API on the same GraphQL
   endpoint: list users and groups, inspect the groups a user belongs to, add them to a group, and
   switch them from one group to another. See "Managing users and groups" below — group membership
   behaves differently from app configuration in one important way, and the panel is built around
   that difference.

> Auth is a pluggable `CredentialProvider` (`shared/src/auth.ts`), so the browser and the script
> authenticate differently without either one changing a line of CRUD code.

## Prerequisites

- Node.js 20.12+ (for the built-in `.env` support)
- An account with **admin write access** to content in your HERE org
- For the browser UI: an **OAuth app** registered in your org (see below), or an API JWT to paste
  in at runtime
- For the sync script: an **API JWT** for your org. Ask your HERE administrator for one

## Authentication

Which credential you use depends on whether a human is present to sign in.

| Credential            | Provider                           | Use it for                                                                                       | Why                                                                                                        |
| --------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| OAuth access token    | `BearerTokenAuth`                  | Browser apps, with a user present                                                                | Obtained at runtime, so nothing secret ships in your bundle. The token carries the signed-in user's access |
| Org API JWT           | `BearerTokenAuth` + `x-of-auth-id` | Scripts, CI, anything headless — and the browser UI, when you'd rather not register an OAuth app | There is no user to redirect through a sign-in screen, and no build step is needed to use one              |
| `here-session` cookie | `CookieHeaderAuth`                 | Local scripts only                                                                               | Convenient for a quick local run; a browser cannot send it (see below)                                     |

Both token types travel the same way — `Authorization: Bearer <token>` — which is why one provider
covers both. The difference is only in how you obtain the token.

**Why a browser cannot use the session cookie.** A page served from a different origin than your
HERE org cannot send the cookie: the API answers CORS preflights with
`Access-Control-Allow-Origin: *` and no `Access-Control-Allow-Credentials`, and browsers reject a
wildcard origin on any credentialed request. A bearer token rides in a plain header, which the
CORS policy permits. The cookie still works from Node, which has no CORS engine, so
`CookieHeaderAuth` remains an option for the script.

## Signing in with a JWT instead of OAuth

The UI has a second sign-in path: paste an API JWT — the same credential the sync script uses — into
the field next to **Sign in** and choose **Use JWT**. It bypasses the OAuth handshake entirely and
authenticates the same way the script does, so it needs no `HERE_OAUTH_CLIENT_ID` and no registered
OAuth app. Use it when you want to exercise the API without setting up an OAuth app first.

Treat the token accordingly. A JWT is a real credential, and unlike an OAuth token it isn't scoped
to a consenting user or obtained at runtime. Don't leave it sitting in the field on a shared screen,
and don't paste it into a page you don't trust — the field is `type="password"`, but that only masks
the display, it doesn't protect the value in any other way. It is held in memory only, same as an
OAuth token: reloading the page signs you out.

**The Auth ID field.** Set this to the same value you'd put in `HERE_AUTH_ID` for the sync script
(see below) — it is sent as the `x-of-auth-id` header, which selects between the authentication
providers configured for your org. Set it whenever your administrator gives you one. If a JWT that
works from the script is rejected in the UI with `NOT_AUTHENTICATED`, check this field first.

## Registering an OAuth app

The browser UI needs an OAuth app registered in your organization.

1. **Check OAuth is enabled for your org.** It is disabled by default and an administrator must
   turn it on. If the discovery URL below returns `404`, this is almost always why.
2. In the Admin Console, go to **Admin → OAuth Apps → Register New OAuth App**.
3. Give it a **name**. This is shown to users on the consent screen, so name it after your
   application.
4. Add a **Redirect URI**. This must match what your app sends **exactly** — character for
   character, including the trailing slash. Redirect URIs must use `https://`, except
   `http://localhost` and `http://127.0.0.1`, which are allowed for local development.

   For this sample, running as described below, the value is:

   ```text
   http://localhost:8282/
   ```

   If you serve it from somewhere else, you need that origin instead. Rather than working it out,
   run `npm run start` first and open the page: it prints the exact string to register in the
   Activity panel. That works before you have configured anything, so you can do it now and come
   back with the value.

5. Set the **client type** to **public**. A browser app is a public client: it holds no client
   secret, and PKCE protects the flow instead. Do not create a client secret for it — one is
   neither needed nor safe here.
6. Save, and copy the **client id** into `HERE_OAUTH_CLIENT_ID` in your `.env`.

Registration comes first and configuration second: the client id does not exist until the app is
registered, and registering needs the redirect URI. The sample is runnable at every stage of that
sequence, so nothing is circular.

The client id is **not** a secret — it is public by design. A browser app needs no client secret at
all; see below.

### "Invalid client: client is invalid" on the token exchange

This means the token endpoint wanted client authentication and the page sent none — which is the
only thing a browser app _can_ send. Check the **Client Secrets** panel on the app's page in the
Admin Console. If it shows a warning that a non-expired client secret is required before the app
can acquire access tokens, the app is registered as a **confidential** client and needs to be a
public one instead.

Confirm the authorization server itself allows that, which it does if the discovery document lists
`none`:

```json
"token_endpoint_auth_methods_supported": ["client_secret_post", "none"]
```

`none` is the public-client method PKCE depends on, so when it is advertised the restriction is on
the app registration rather than the org.

**Do not add a client secret to make the error go away.** The client id and everything beside it
are inlined into the bundle at build time and readable by anyone who loads the page, so a secret
there protects nothing while creating a real credential to leak. If the console gives you no way to
register a public client, ask your HERE administrator — and use the **Use JWT** sign-in path
described above to exercise the API in the meantime.

## How the OAuth flow works

The sample implements this in [`shared/src/oauth-pkce.ts`](shared/src/oauth-pkce.ts) in about 150
lines with no OAuth library. The steps below are the whole protocol, so you can reimplement it in
whatever framework you use.

1. **Discover the endpoints.** `GET {BASE_URL}/.well-known/oauth-authorization-server` returns
   `authorization_endpoint`, `token_endpoint` and `scopes_supported`. Read them from here rather
   than hardcoding paths — they belong to the server, and discovery means the same build works
   against any org's subdomain.
2. **Generate a code verifier and a state value**, both cryptographically random. Store them
   somewhere that survives a page navigation, such as `sessionStorage` — the browser is about to
   leave your page and come back.
3. **Derive the code challenge:** `base64url(SHA-256(verifier))`, sent with
   `code_challenge_method=S256`.
4. **Redirect to the authorization endpoint** with `response_type=code`, `client_id`,
   `redirect_uri`, `scope`, `state`, `code_challenge` and `code_challenge_method`.
5. **The user authenticates and consents.** HERE signs them in using the authentication provider
   configured for your org, then shows a consent screen. Consent is remembered, so later sign-ins
   skip it; an administrator can also pre-consent on behalf of everyone in the org.
6. **On the way back, verify `state` matches** the value you sent — before anything else. If it
   does not, abandon the sign-in and do not exchange the code.
7. **Exchange the code for a token.** `POST` to the token endpoint, form-encoded:

   ```text
   grant_type=authorization_code
   code={code}
   redirect_uri={the same redirect_uri}
   client_id={client id}
   code_verifier={the verifier from step 2}
   ```

8. **Call the API** with `Authorization: Bearer <access_token>`. Do **not** send `x-of-auth-id`
   with a HERE-issued token: that header picks between externally configured authentication
   providers, and HERE validates its own tokens.

Once you have the code, discard the verifier and strip the query string from the address bar so a
reload or a shared URL cannot replay a one-time code.

**Why PKCE, and no client secret.** Anything in a browser bundle is readable by anyone who loads
the page, so a browser app cannot keep a client secret — shipping one only creates the illusion of
security. PKCE replaces it: the authorization request commits to a hash of a one-time random
value, and the token exchange must present the original. An intercepted authorization code is
useless without the verifier, which never leaves the page that generated it.

## Scopes and token lifetime

**Scopes.** Request only the scopes your application actually needs. This sample asks for exactly
one, `full`, which lets it call HERE Cloud APIs on the signed-in user's behalf.

Do **not** request everything the discovery document lists in `scopes_supported`. That field is the
set of scopes the _authorization server_ supports in aggregate — not the set your _client_ is
permitted to ask for. A HERE org typically advertises `full`, `offline_access` and `app_default`,
while a newly registered app is granted a subset. Requesting a scope the app was not granted fails
the entire authorization with:

```text
invalid_scope: one or more requested scopes are not permitted for this client
```

If you hit that error, check the scope your code sends against the grants on your OAuth app in the
Admin Console, and ask your administrator which scopes it should have.

**Lifetime.** This sample holds the access token **in memory only**. Reloading the page signs you
out, which is deliberate: it keeps a live credential out of `localStorage`, where any script on the
page could read it. There is no refresh token, so when a token expires you sign in again — the
sample detects the resulting `401`, returns to the signed-out state, and says so.

## Setup

```shell
npm install
cp .env.example .env
```

Then edit `.env`. Both the UI and the sync script read from it, and it is git-ignored so nothing
sensitive lands in a commit. Variables already set in your shell take precedence over the file, so
CI can inject them directly instead.

| Variable               | Used by    | Notes                                                                                                                                                      |
| ---------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `BASE_URL`             | UI, script | Your HERE domain, no trailing slash                                                                                                                        |
| `HERE_OAUTH_CLIENT_ID` | UI         | Client id of your registered OAuth app. Not a secret                                                                                                       |
| `HERE_API_JWT`         | script     | API JWT bearer token. Treat as a secret. The UI's JWT sign-in is a runtime paste, not a build-time value — it deliberately does **not** read this variable |
| `HERE_AUTH_ID`         | script     | Authentication provider id, sent as `x-of-auth-id`. Set it whenever your administrator gives you one                                                       |
| `HERE_SESSION`         | script     | `here-session` cookie value — a local alternative to the JWT                                                                                               |

## Running the guided UI

1. Set `BASE_URL` and `HERE_OAUTH_CLIENT_ID` in `.env`. A browser bundle cannot read `.env` at
   runtime, so these are inlined at build time — **re-run the build after changing them**.
2. Serve it (this rebuilds first, so `.env` changes are always picked up):

   ```shell
   npm run start
   ```

3. Open the served URL. The Activity panel shows the exact redirect URI to register if you have not
   done that yet.
4. Choose **Sign in**. You will be redirected to your organization's sign-in, then to a consent
   screen the first time. After that you land back on the page, signed in.

   Rather not register an OAuth app? Paste an API JWT into the field next to **Sign in**
   instead and choose **Use JWT** — see "Signing in with a JWT instead of OAuth" above.

5. Edit the app definition on the left, then run **List all apps** or any of
   **Create / Validate / Update / Delete** — each request and its response is logged on the right.
   The form defaults to a `here-io` demo app; **Validate** loads an existing app's live values back
   into the form so you can edit and re-apply them.

The action buttons stay disabled until you sign in, because without a token every call would fail.

## Managing users and groups

The **User management** panel drives the User and Group API, which lives on the same GraphQL
endpoint and uses the same credential as everything above — no second sign-in, no second client
configuration.

1. Choose **Load users & groups**. Both lists are read with cursor pagination and cached for the
   session, because the pickers are rebuilt on every selection.
2. Pick a user. The panel reads that one user back with their memberships and lists them.
3. **Add to group** adds a single membership. **Remove** next to any group drops that one.
4. **Switch group** moves the user from one group to another. **From** offers only groups the user
   is currently in, and **To** only groups they are not, so the picker cannot express a switch that
   could not work.

Every call is logged in the Activity panel with the mutation it used, so the panel doubles as a
worked example of the request shapes.

### Group membership is a set, not a slot

A user belongs to **many** groups at once — `User.groups` is a connection, not a single field — so
there is no "the user's group" to overwrite. Every operation is add or remove on one membership.

### There is no atomic move, and that shapes everything

The API exposes exactly four membership mutations:

| Mutation               | Arguments                                         | Returns                           |
| ---------------------- | ------------------------------------------------- | --------------------------------- |
| `addUserToGroup`       | `userIdentifier: ID!`, `groupIdentifier: ID!`     | `User!`                           |
| `removeUserFromGroup`  | `userIdentifier: ID!`, `groupIdentifier: ID!`     | `User!`                           |
| `addUsersToGroup`      | `userIdentifiers: [ID!]!`, `groupIdentifier: ID!` | `BulkAddUsersToGroupResult!`      |
| `removeUsersFromGroup` | `userIdentifiers: [ID!]!`, `groupIdentifier: ID!` | `BulkRemoveUsersFromGroupResult!` |

There is no `moveUserToGroup`, `changeUserGroup` or `setUserGroup`. **Switching a group is two
mutations and is not atomic** — unlike the content API's bulk writes, there is no transaction and
nothing rolls back. Either half can fail on its own.

`UserApiClient.switchGroup` runs the **add first, then the remove**, deliberately:

- If the add fails, nothing has changed and the call throws — the honest outcome.
- If the remove fails, the user is in **both** groups: holding slightly more access than intended,
  and one retried removal away from correct. The result carries `partialFailure` and the UI reports
  it as a failure naming the step that landed.

Removing first would fail the other way, leaving the user in **neither** group — less access than
they started with, which in a desktop container means apps vanishing for someone who did nothing
wrong. Being briefly over-permissioned is the better failure, but it is still a failure, which is
why it is reported rather than smoothed over.

If you build your own switch, make the same choice explicitly, and re-read the user afterwards
rather than assuming: after a partial failure the server is the only thing that knows the real
state.

### Identifiers

`addUserToGroup` and friends take an `ID!` that accepts either form, and the two read queries name
them separately — `user(id: …)` for the readable identifier, `user(uuid: …)` for the system id.
This sample sends **uuids** in mutations and displays **ids**, so what you see is recognisable while
what it sends cannot be ambiguous.

One wrinkle worth knowing: `Group` has **no `name` field**. Its `id` is the human-readable
identifier (`all-users`, `atlassian-users`) and its `uuid` is the system id. Selecting `name` on a
group fails the whole query.

### A note on real data

This panel reads your organization's actual user directory — real names and email addresses. The
sample keeps it in memory for the session and writes none of it to disk, and signing out clears the
cache. If you extend it to export, remember that a user export is personal data in a way an app
manifest is not.

## Running the config-as-code sync script

The script reads `apps.config.json` (an FDC3 App Directory), compares it with your live directory,
and prints a plan. Apps that already match are reported as up to date rather than rewritten, so
re-running against a directory that is already in sync does nothing. It picks up credentials from
the same `.env` file, so you don't need to `export` them into your shell, and it is a **dry run by
default**.

```shell
# preview changes (no writes)
npm run sync

# apply create/update
npm run sync -- --apply

# apply and also DELETE live apps not present in the manifest (destructive)
npm run sync -- --apply --prune
```

Create, update, and delete each run as a **single bulk request**, and bulk operations are
all-or-nothing — if any item fails validation, that whole batch is rolled back. Note this makes
each _phase_ atomic, not the whole run: a failure stops the run, so later phases never execute,
but earlier phases have already committed.

Updates omit `access` unless an app declares it under `hostManifests.here.access`. Omitting the
field leaves existing assignments untouched, whereas sending an empty `access` object would strip
every assignment — so a manifest that says nothing about access never changes it.

## Exporting a directory (copying between environments)

The export script is the reverse of sync: it reads your live directory and writes it out as an
FDC3 App Directory manifest, using `contentNodeToFdc3Application` in `shared/src/fdc3-mapping.ts` —
the opposite of the `fdc3ToContentInput` the UI and sync script both write with. This is how you
carry a directory from one environment to another: export it from the source org, point `.env` at
the destination org, then sync it in.

```shell
# writes apps.config.json in the workspace root (git-tracked — review with `git diff` before committing)
npm run export

# write somewhere else instead
npm run export -- --out my-other-org.json
```

Then, with `.env` pointed at the destination org:

```shell
npm run sync -- --apply
```

The guided UI has the same export as an **Export as JSON** button next to **List all apps** — it
downloads the current directory as the same manifest shape, straight from the browser.

**Access assignments are not exported.** `subjects` and `primitives` on a live app are org-specific
UUIDs — a permission or group id meaningful only in the org the app came from. Carrying them into a
different org's manifest would either be rejected outright or, worse, silently grant access to
whatever unrelated subject happens to hold that id there. An exported manifest never declares
`access`, so applying it anywhere leaves that app's access assignments alone (same as any other
manifest that doesn't mention access — see above) rather than wiping or misapplying them. Set access
up by hand in the destination org.

Both scripts authenticate with `HERE_API_JWT`, via the shared `resolveAuth()` in `script/env.ts`.
Neither uses OAuth: that flow redirects a user through a consent screen, which a headless script
has no way to satisfy. As a Node-only alternative you can set `HERE_SESSION` instead: while logged
into the Admin Console, open developer tools → Application → Cookies → copy the `here-session`
value.

## Troubleshooting

| Symptom                                             | Likely cause                                                                                                                              |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery URL returns `404`                         | OAuth is not enabled for your organization — ask your administrator                                                                       |
| `redirect_uri_mismatch`                             | The registered URI differs from what the app sent. Compare them character for character, including the trailing slash and the port        |
| `access_denied` after the consent screen            | The user declined consent, or lacks access to the app                                                                                     |
| "The returned state did not match"                  | A stale, replayed, or bookmarked redirect. Start sign-in again from the page                                                              |
| Token exchange fails with an invalid-client error   | The client id is wrong, or the app is not registered in this org                                                                          |
| Token exchange fails mentioning a **client secret** | The app is registered as a confidential client. Re-register it as public; see "Registering an OAuth app". Do not put a secret in the page |
| `401` on an API call after signing in successfully  | The access token expired. Sign in again                                                                                                   |
| `403` on writes                                     | The signed-in user lacks content admin access in this org                                                                                 |
| The script reports no credential                    | Set `HERE_API_JWT` (or `HERE_SESSION`) in `.env` — the script cannot use OAuth                                                            |
| UI JWT sign-in reports `NOT_AUTHENTICATED`          | Set the Auth ID field to the same value as `HERE_AUTH_ID` — it is sent as `x-of-auth-id`. See "Signing in with a JWT instead of OAuth"    |
| `invalid_scope` on sign-in                          | The app is not granted a scope the request asked for. This sample requests only `full`; check the grants on the OAuth app                 |
| `Cannot query field "X" on type "Y"`                | Your org's schema does not have that field. Schemas differ between versions — `interop`, for instance, is write-only on some orgs         |
| A group switch reports "Half-applied"               | The add landed and the remove did not, so the user is in both groups. Retry the removal; see "There is no atomic move"                    |
| Selecting `name` on a group fails                   | `Group` has no `name` field — use `id` for the readable identifier                                                                        |

## What's in here

| Path                         | Responsibility                                                   |
| ---------------------------- | ---------------------------------------------------------------- |
| `shared/src/graphql.ts`      | GraphQL transport: the endpoint, and the two error envelopes     |
| `shared/src/content-api.ts`  | Reusable client: GraphQL queries, mutations, and bulk operations |
| `shared/src/user-api.ts`     | Reusable client: users, groups, and membership changes           |
| `shared/src/oauth-pkce.ts`   | OAuth 2.0 authorization code + PKCE sign-in (browser only)       |
| `shared/src/auth.ts`         | Pluggable credential providers (bearer token, session cookie)    |
| `shared/src/fdc3-mapping.ts` | FDC3 Application <-> HERE content mapping, both directions       |
| `client/src/index.ts`        | Guided browser UI (app definition + user management)             |
| `script/env.ts`              | Shared `.env` loading and credential resolution for both scripts |
| `script/sync.ts`             | Config-as-code reconcile: manifest → live directory              |
| `script/export.ts`           | The reverse: live directory → manifest                           |
| `apps.config.json`           | Sample FDC3 App Directory manifest                               |
| `.env.example`               | Template for your local `.env`                                   |

## API reference

[Develop with GraphQL](https://resources.here.io/docs/guide/devs/graphql/) covers the endpoint and
points you at introspection for the full field reference.

Two caveats, both worth knowing before you go looking:

- **Introspection may be disabled on your org.** Apollo Server can be configured with
  `introspection: false`, and then `__schema` and `__type` are rejected — so the schema explorer in
  Apollo Sandbox comes up empty, with no field lists and no autocomplete. `__typename` still works.
  Ask your administrator to enable introspection on a development org; it turns schema questions
  into a lookup instead of an investigation.
- **The membership mutations are not on that page.** `addUserToGroup`, `removeUserFromGroup`,
  `addUsersToGroup` and `removeUsersFromGroup` are documented in the table above instead, with the
  signatures verified against a live instance.

To open the endpoint in a browser, visit it in a tab where you are already signed in to the Admin
Console — the session cookie rides along and the server returns the Apollo landing page. `curl`
gets JSON and a `401` instead, because it does not send `Accept: text/html`.
