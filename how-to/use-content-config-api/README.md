# Content Configuration API How-To

## Welcome

This how-to shows how to manage your HERE application directory programmatically with the
**Content Configuration API** — a single GraphQL endpoint serving both queries and mutations for
full create/read/update/delete. It includes two things:

1. A **browser UI** that shapes an app definition and runs the create → validate → update →
   delete lifecycle against your directory, logging every request and response.
2. A **config-as-code sync script** that reconciles an [FDC3 2.0 App Directory](https://fdc3.finos.org/docs/app-directory/overview)
   manifest (`apps.config.json`) against your live directory.

> Auth is a pluggable `CredentialProvider` (`shared/src/auth.ts`), so you can switch between a JWT
> and a session cookie without changing any of the CRUD code.

## Prerequisites

- Node.js 20.12+ (for the built-in `.env` support)
- An account with **admin write access** to content in your HERE org
- An **API JWT** for that org (see Authentication). Ask your HERE administrator for one

## Authentication

Use an **API JWT** — a bearer token. It is the recommended credential and the only one the
browser UI can use.

| Provider | Header | Works from |
| --- | --- | --- |
| `JwtAuth` | `Authorization: Bearer` (+ `x-of-auth-id`) | Browser UI, scripts, CI |
| `CookieHeaderAuth` | `here-session` cookie | Scripts / Node only |

**Getting a token.** An API JWT is a bearer token issued for your organization. How tokens are
issued depends on your org's authentication setup, so ask your HERE administrator (or follow your
organization's HERE API authentication docs) to get one. Set it as `HERE_API_JWT`. If your org has
more than one authentication provider, also set `HERE_AUTH_ID`; the sample sends it as the
`x-of-auth-id` header so the gateway knows which provider to check. Treat the token as a secret —
it carries whatever access its subject has.

**Why the UI can't use the session cookie.** A page served from a different origin than your HERE
org cannot send the cookie: the API answers CORS preflights with `Access-Control-Allow-Origin: *`
and no `Access-Control-Allow-Credentials`, and browsers reject a wildcard origin on any
credentialed request. A bearer token has no such restriction, which is why the UI uses `JwtAuth`.
The cookie still works from Node (no CORS engine), so `CookieHeaderAuth` remains an option for the
script.

The UI's token is inlined into the JavaScript bundle and readable by anyone who can load the page,
so use a short-lived token and serve the sample only to people you would trust with it. If a
request fails with `400` or `401`, the token or its `x-of-auth-id` did not match a configured auth
provider — check them with your HERE administrator.

## Setup

```shell
npm install
cp .env.example .env
```

Then edit `.env` and set `BASE_URL` plus a credential. Both the UI and the sync script read from
it, and it is git-ignored so your token never lands in a commit. Variables already set in your
shell take precedence over the file, so CI can inject them directly instead.

| Variable | Used by | Notes |
| --- | --- | --- |
| `BASE_URL` | UI, script | Your HERE domain, no trailing slash |
| `HERE_API_JWT` | UI, script | The API JWT bearer token — required for the UI |
| `HERE_AUTH_ID` | UI, script | The authentication provider id; only if your org has several |
| `HERE_SESSION` | script | `here-session` cookie value — script alternative to the JWT |

## Running the guided UI

1. Make sure `.env` has `BASE_URL` and `HERE_API_JWT` set (see Setup above). A browser bundle
   cannot read `.env` at runtime, so these are inlined at build time — **re-run the build after
   changing them**.
2. Build:

   ```shell
   npm run build
   ```

3. Serve (this rebuilds first, so `.env` changes are always picked up):

   ```shell
   npm run start
   ```

4. Open the served URL. Edit the app definition on the left, then run **List all apps** or any of
   **Create / Validate / Update / Delete** — each request and its response is logged on the right.
   The form defaults to a `here-io` demo app; **Validate** loads an existing app's live values back
   into the form so you can edit and re-apply them.

## Running the config-as-code sync script

The script reads `apps.config.json` (an FDC3 App Directory), compares it with your live directory,
and prints a plan. It picks up credentials from the same `.env` file, so no exports are needed, and
it is a **dry run by default**.

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

The script authenticates with `HERE_API_JWT` like the UI. As a Node-only alternative you can set
`HERE_SESSION` instead: while logged into the Admin Console, open developer tools → Application →
Cookies → copy the `here-session` value.

## What's in here

| Path | Responsibility |
| --- | --- |
| `shared/src/content-api.ts` | Reusable client: GraphQL queries, mutations, and bulk operations |
| `shared/src/auth.ts` | Pluggable credential providers (API JWT, session cookie) |
| `shared/src/fdc3-mapping.ts` | FDC3 Application → HERE content mapping |
| `client/src/index.ts` | Guided browser UI |
| `script/sync.ts` | Config-as-code reconcile |
| `apps.config.json` | Sample FDC3 App Directory manifest |
| `.env.example` | Template for your local `.env` |

## API reference

See the **HERE Content Configuration API** documentation for the full field reference,
content types, and error codes.
