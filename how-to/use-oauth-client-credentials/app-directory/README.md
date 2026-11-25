![HERE Starter](../../../assets/Here-Starter.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io) is a commercial product and this repo is for evaluation purposes. Use of HERE Core and HERE Enterprise Browser is only granted pursuant to a license from [HERE](https://www.here.io) (OpenFin). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation or to discuss a production license.

# App directory

This is the write example in [How To Use OAuth Client Credentials](../). A headless script reconciles an [FDC3 2.0 App Directory](https://fdc3.finos.org/docs/app-directory/overview) manifest with the live HERE directory, using the same **OAuth 2.0 client credentials grant** as the [audit collector](../audit-collector/).

It does three things:

- `npm run check` walks the whole flow once against your environment and reports each step: discovery, token, API call.
- `npm run sync` compares `apps.config.json` with the live directory and prints a plan. It is a dry run unless you pass `--apply`.
- `npm run export` writes the live directory back out as that same manifest, for example to carry it into another environment.

No person signs in and no browser opens. The browser UI that signs a user in with authorization code and PKCE is a different example: [How To Use The GraphQL API For App and User Management](../../use-graphql-for-management/).

It has no runtime dependencies. OAuth and GraphQL are both plain `fetch` calls, so the code reads as a description of the protocol rather than of a library.

## Who is who in this flow

Client credentials is a **system-to-system** grant. The four OAuth roles are the same as in the audit collector. Only the resource server and the service account's role change.

| OAuth role                | In this example                                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Client**                | This script, registered in the Admin Console as a _confidential_ OAuth app. It holds the client id and secret.                                             |
| **Authorization server**  | HERE. Your HERE domain issues the token at `/oauth2/token`. No other identity provider is involved.                                                        |
| **Resource server**       | The Content Configuration API at `/here/api/graphql`.                                                                                                      |
| **Resource owner (user)** | None at run time. Instead an administrator chooses a **service account user** when registering the app, and every token the app obtains acts as that user. |

Because the token acts as the service account user, **that user's roles decide what the token can reach**. `npm run sync -- --apply` creates, updates, and deletes apps, so this service account needs **Full Access**. **Read: all apps, all admin tabs** can list the directory, so `check`, `export`, and a dry run succeed, and apply returns 403.

Register a separate OAuth app from the audit collector. That app's service account is read-only, and reusing it here cannot write.

## Before you start

- Your HERE environment must be on **HERE 15** or later. `npm run check` tells you: if discovery does not list `client_credentials`, the environment is on an earlier version.
- You need an administrator login to the Admin Console.
- Node.js 22.22.2 or later.

## Setting up the OAuth app

### 1. Create the service account user

Create a dedicated user for the integration rather than using a person's account. A named person's account makes the audit trail read as if that person made each change, and the integration breaks when they leave.

In the Admin Console, go to **Access > Users**, choose **Create New User** and create a user whose username identifies the integration, for example `svc-directory-sync`. The user must be **active**.

The **Service Account User** picker lists only active users. If the user is later deactivated, token requests fail with `invalid_grant`.

### 2. Give it write access to content

1. Go to **Admin > Admin Settings** and choose **Add Admin Users**.
2. Tick the service account in the **Non-Admins** list, then choose **Select Admin Type**.
3. Choose **Full Access**, then **Add Admins**.

The service account now appears in the **Admin Security** list. That list is where to review what access it holds.

### 3. Register the OAuth app

1. Go to **Admin > OAuth Apps** and choose **Register OAuth App**.
2. Give it a name and description that say what it is, for example "Directory sync".
3. Choose **Confidential** as the client type. This cannot be changed later.
4. Under **Enabled Grants**, tick **Client Credentials** only.
5. Under **Service Account User**, search for and select the user from step 1.
6. Save, then copy the **Client ID**.

### 4. Create a client secret

On the app, add a secret. Give it a name and an expiry (90 days by default, and no more than a year). **The secret is shown once**, so copy it straight into your secret store.

Plan for the expiry. When the secret expires, token requests fail with `invalid_client`. Apps can hold more than one secret, so rotate by adding the new secret, switching the script over, then removing the old one.

## Running the example

From the root of the repo run `npm install` (or `npm run setup` from this folder), then in this folder:

```bash
cp .env.example .env
# edit .env: BASE_URL, HERE_CLIENT_ID, HERE_CLIENT_SECRET
npm run check
```

A successful check looks like this:

```text
1. Reading OAuth metadata from https://my-org.here.io
   token endpoint: https://my-org.here.io/oauth2/token
   grants supported: authorization_code, refresh_token, client_credentials
2. Requesting an access token with the client credentials grant
   token_type: Bearer
   expires_in: 900s
   scope:      full
3. Calling the Content Configuration API as the app's service account
   OK: the service account can read the app directory.
```

The check prints the token's metadata but never the token itself. `expires_in` is set by your environment, so yours may differ.

Then reconcile the sample manifest:

```bash
# preview changes (no writes)
npm run sync

# apply create/update
npm run sync -- --apply

# apply and also DELETE live apps not present in the manifest (destructive)
npm run sync -- --apply --prune
```

`apps.config.json` is an FDC3 App Directory. Apps that already match are reported as up to date rather than rewritten, so re-running against a directory that is already in sync does nothing.

Create, update, and delete each run as a **single bulk request**, and bulk operations are all-or-nothing — if any item fails validation, that whole batch is rolled back. That makes each phase atomic, not the whole run: a failure stops the run, so later phases never execute, but earlier phases have already committed.

Updates omit `access` unless an app declares it under `hostManifests.here.access`. Omitting the field leaves existing assignments untouched, whereas sending an empty `access` object would strip every assignment.

Export is the reverse. Point `.env` at the source org, write the manifest, then point `.env` at the destination and sync it in.

```bash
# writes apps.config.json in this folder (review with git diff before committing)
npm run export

# write somewhere else instead
npm run export -- --out my-other-org.json
```

**Access assignments are not exported.** `subjects` and `primitives` on a live app are org-specific UUIDs. Carrying them into a different org would either be rejected or grant access to whatever unrelated subject holds that id there. Set access up by hand in the destination org.

## How the script gets a token

The client sends its id and secret in the form body (`client_secret_post`) with `scope=app_default`. The client credentials grant does not return a refresh token, so when the access token is about a minute from expiry the script asks for a new one. A call that comes back 401 retries once with a fresh token. See [`src/oauth.ts`](./src/oauth.ts).

## Troubleshooting

| What you see                                       | What to check                                                                                                                                         |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Discovery does not list `client_credentials`       | The environment is on a version earlier than HERE 15.                                                                                                 |
| `invalid_client`                                   | The client id or secret is wrong, or the secret has expired.                                                                                          |
| HTTP 500 or `server_error` from the token endpoint | Check `HERE_CLIENT_ID` matches the Client ID shown on the OAuth app in the Admin Console.                                                             |
| `unauthorized_client`                              | The Client Credentials grant is not enabled on the app.                                                                                               |
| `invalid_scope`                                    | The token request must send `scope=app_default` and nothing else. The example already does.                                                           |
| `invalid_grant`                                    | The app has no service account user, or that user is no longer active.                                                                                |
| HTTP 403 or `FORBIDDEN` from the API               | The token is fine but the service account lacks access. Grant **Full Access** under **Admin > Admin Settings**. Read is enough to list, not to apply. |

## Notes

- Do not send an `x-of-auth-id` header with these tokens. That header selects between identity providers configured for your organisation, and HERE validates the tokens it issues itself.
- The client credentials grant never returns a refresh token. Refresh tokens in HERE 15 belong to the authorization code grant, where an app requests the `offline_access` scope.

---

### Read more about working with HERE

[HERE Enterprise Browser](https://www.here.io/)
