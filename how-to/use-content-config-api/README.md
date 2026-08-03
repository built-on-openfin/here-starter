# Content Configuration API How-To

## Welcome

This how-to shows how to manage your HERE application directory programmatically with the
**Content Configuration API** — a single GraphQL endpoint serving both queries and mutations for
full create/read/update/delete. It includes two things:

1. A **browser UI** that signs in with OAuth 2.0 (or an API JWT pasted in directly, as a stopgap —
   see below), shapes an app definition, and runs the create → validate → update → delete
   lifecycle against your directory, logging every request and response.
2. A **config-as-code sync script** that reconciles an [FDC3 2.0 App Directory](https://fdc3.finos.org/docs/app-directory/overview)
   manifest (`apps.config.json`) against your live directory, plus an **export script** (and a UI
   button) that does the reverse: dump a live directory into that same manifest shape, e.g. to
   carry it into another environment.

> Auth is a pluggable `CredentialProvider` (`shared/src/auth.ts`), so the browser and the script
> authenticate differently without either one changing a line of CRUD code.

## Prerequisites

- Node.js 20.12+ (for the built-in `.env` support)
- An account with **admin write access** to content in your HERE org
- For the browser UI: an **OAuth app** registered in your org (see below)
- For the sync script: an **API JWT** for your org. Ask your HERE administrator for one

## Authentication

Which credential you use depends on whether a human is present to sign in.

| Credential | Provider | Use it for | Why |
| --- | --- | --- | --- |
| OAuth access token | `BearerTokenAuth` | Browser apps, with a user present | Obtained at runtime, so nothing secret ships in your bundle. The token carries the signed-in user's access |
| Org API JWT | `BearerTokenAuth` + `x-of-auth-id` | Scripts, CI, anything headless — or the browser UI as a stopgap while OAuth public clients aren't available | There is no user to redirect through a sign-in screen (script), or OAuth isn't an option yet (UI) |
| `here-session` cookie | `CookieHeaderAuth` | Local scripts only | Convenient for a quick local run; a browser cannot send it (see below) |

Both token types travel the same way — `Authorization: Bearer <token>` — which is why one provider
covers both. The difference is only in how you obtain the token.

**Why a browser cannot use the session cookie.** A page served from a different origin than your
HERE org cannot send the cookie: the API answers CORS preflights with
`Access-Control-Allow-Origin: *` and no `Access-Control-Allow-Credentials`, and browsers reject a
wildcard origin on any credentialed request. A bearer token rides in a plain header, which the
CORS policy permits. The cookie still works from Node, which has no CORS engine, so
`CookieHeaderAuth` remains an option for the script.

## Signing in with a JWT instead of OAuth (stopgap)

If OAuth public clients aren't available in your org yet, the UI has a second, always-available
sign-in path: paste an API JWT — the same credential the sync script uses — into the field next to
**Sign in** and choose **Use JWT**. It bypasses the OAuth handshake entirely and authenticates the
same way the script does. No `HERE_OAUTH_CLIENT_ID` or registered OAuth app is needed for this path.

This is a stopgap, not the intended flow: a JWT is a real credential, and unlike an OAuth token it
isn't scoped to a consenting user or obtained at runtime. Don't leave it sitting in the field on a
shared screen, and don't paste it into a page you don't trust — the field is `type="password"` but
that only masks the display, it doesn't protect the value in any other way. It is held in memory
only, same as an OAuth token: reloading the page signs you out.

**The Auth ID field.** Set this to the same value you'd put in `HERE_AUTH_ID` for the sync script
(see below) — it is sent as the `x-of-auth-id` header. The API docs describe this as required only
when your org has more than one authentication provider configured, but in practice we found an org
that rejected the JWT with `NOT_AUTHENTICATED` until this header was set even with what looked like
a single provider. If your `HERE_API_JWT` works from the script but the UI reports `NOT_AUTHENTICATED`
with the same token, set the Auth ID field before assuming anything else is wrong.

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

   ```
   http://localhost:8282/
   ```

   If you serve it from somewhere else, you need that origin instead. Rather than working it out,
   run `npm run start` first and open the page: it prints the exact string to register in the
   Activity panel. That works before you have configured anything, so you can do it now and come
   back with the value.
5. Set the **client type** to **public**, if your admin console offers the choice. A browser app is
   a public client: it holds no client secret, and PKCE protects the flow instead. Do not create a
   client secret for it — one is neither needed nor safe here.
6. Save, and copy the **client id** into `HERE_OAUTH_CLIENT_ID` in your `.env`.

Registration comes first and configuration second: the client id does not exist until the app is
registered, and registering needs the redirect URI. The sample is runnable at every stage of that
sequence, so nothing is circular.

The client id is **not** a secret — it is public by design. A browser app needs no client secret at
all; see below.

**If you don't see a client type option**, your deployment may only support confidential clients —
those that authenticate with a secret. Check the discovery document: if
`token_endpoint_auth_methods_supported` does not include `none`, the token endpoint will require a
`client_secret`, and the exchange at the end of the flow will fail for a browser app. Ask your HERE
administrator about public client support rather than embedding a secret in the page. Everything up
to the exchange still works, and this sample needs no changes once public clients are available.

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

   ```
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

**Scopes.** One scope is available today, `full`, which lets the application call HERE Cloud APIs
on the signed-in user's behalf. Request whatever `scopes_supported` advertises rather than
hardcoding `full`, and narrower scopes will work later without a code change.

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

| Variable | Used by | Notes |
| --- | --- | --- |
| `BASE_URL` | UI, script | Your HERE domain, no trailing slash |
| `HERE_OAUTH_CLIENT_ID` | UI | Client id of your registered OAuth app. Not a secret |
| `HERE_API_JWT` | script | API JWT bearer token. Treat as a secret. The UI has its own JWT sign-in path too, but it's a runtime paste, not a build-time value — see below, it deliberately does **not** read this variable |
| `HERE_AUTH_ID` | script | Authentication provider id. Nominally required only if your org has several — in practice, set it whenever your administrator gives you one, even if your org appears to have just one (see below) |
| `HERE_SESSION` | script | `here-session` cookie value — a local alternative to the JWT |

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

   No OAuth app registered yet? Paste an API JWT into the field next to **Sign in** instead and
   choose **Use JWT** — see "Signing in with a JWT instead of OAuth" above.
5. Edit the app definition on the left, then run **List all apps** or any of
   **Create / Validate / Update / Delete** — each request and its response is logged on the right.
   The form defaults to a `here-io` demo app; **Validate** loads an existing app's live values back
   into the form so you can edit and re-apply them.

The action buttons stay disabled until you sign in, because without a token every call would fail.

## Running the config-as-code sync script

The script reads `apps.config.json` (an FDC3 App Directory), compares it with your live directory,
and prints a plan. It picks up credentials from the same `.env` file, so you don't need to `export`
them into your shell, and it is a **dry run by default**.

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
each *phase* atomic, not the whole run: a failure stops the run, so later phases never execute,
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

| Symptom | Likely cause |
| --- | --- |
| Discovery URL returns `404` | OAuth is not enabled for your organization — ask your administrator |
| `redirect_uri_mismatch` | The registered URI differs from what the app sent. Compare them character for character, including the trailing slash and the port |
| `access_denied` after the consent screen | The user declined consent, or lacks access to the app |
| "The returned state did not match" | A stale, replayed, or bookmarked redirect. Start sign-in again from the page |
| Token exchange fails with an invalid-client error | The client id is wrong, or the app is not registered in this org |
| Token exchange fails mentioning a **client secret** | The app is registered as a confidential client, or the deployment does not support public clients. Re-register it as public; see "Registering an OAuth app". Do not put a secret in the page |
| `401` on an API call after signing in successfully | The access token expired. Sign in again |
| `403` on writes | The signed-in user lacks content admin access in this org |
| The script reports no credential | Set `HERE_API_JWT` (or `HERE_SESSION`) in `.env` — the script cannot use OAuth |
| UI JWT sign-in reports `NOT_AUTHENTICATED` | Set the Auth ID field to the same value as `HERE_AUTH_ID`. Some orgs require `x-of-auth-id` even though it's nominally optional — see "Signing in with a JWT instead of OAuth" |

## What to copy into your own app

| File | Take it if you want |
| --- | --- |
| `shared/src/oauth-pkce.ts` | The OAuth handshake. Copy as-is; it has no dependencies |
| `shared/src/auth.ts` | The `BearerTokenAuth` provider and the `CredentialProvider` seam |
| `shared/src/content-api.ts` | The GraphQL client: queries, mutations, and bulk operations |
| `shared/src/fdc3-mapping.ts` | FDC3 Application ↔ HERE content mapping, both directions |

Everything under `client/` and `public/` is sample scaffolding — a console for exercising the API,
not a starting point for a product.

## What's in here

| Path | Responsibility |
| --- | --- |
| `shared/src/content-api.ts` | Reusable client: GraphQL queries, mutations, and bulk operations |
| `shared/src/oauth-pkce.ts` | OAuth 2.0 authorization code + PKCE sign-in (browser only) |
| `shared/src/auth.ts` | Pluggable credential providers (bearer token, session cookie) |
| `shared/src/fdc3-mapping.ts` | FDC3 Application ↔ HERE content mapping, both directions |
| `client/src/index.ts` | Guided browser UI |
| `script/env.ts` | Shared `.env` loading and credential resolution for both scripts |
| `script/sync.ts` | Config-as-code reconcile: manifest → live directory |
| `script/export.ts` | The reverse: live directory → manifest |
| `apps.config.json` | Sample FDC3 App Directory manifest |
| `.env.example` | Template for your local `.env` |

## API reference

See the **HERE Content Configuration API** documentation for the full field reference,
content types, and error codes.
