![HERE Starter](../../assets/Here-Starter.png)

> **_:information_source: HERE:_** [HERE](https://www.here.io) is a commercial product and this repo is for evaluation purposes. Use of HERE Core and HERE Enterprise Browser is only granted pursuant to a license from [HERE](https://www.here.io) (OpenFin). Please [**contact us**](https://www.here.io/contact) if you would like to request a developer evaluation or to discuss a production license.

# How To Use OAuth Client Credentials

Two headless examples of the **OAuth 2.0 client credentials grant** introduced in HERE 15. No person signs in. Each example is its own package: a confidential OAuth app, a service account user, and a script that exchanges a client id and secret for a short-lived access token.

The token acts as the service account. That user's admin type is what the API allows, so the two examples do not share an OAuth app.

| Example                               | What it does                                                                                                     | Service account |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------- |
| [Audit collector](./audit-collector/) | `npm run check`, then `npm run pull` to read Audit API records on a schedule without gaps or duplicates.         | Read            |
| [App directory](./app-directory/)     | `npm run check`, then `npm run sync` and `npm run export` to reconcile an FDC3 manifest with the live directory. | Full Access     |

Run each example from its own folder. Setup for the OAuth app — the service account, the confidential client, and the secret — is in that example's README, because the admin type is not the same.

A browser that signs a person in uses a different grant, authorization code with PKCE. See [How To Use The GraphQL API For App and User Management](../use-graphql-for-management/).

---

## Read more about working with HERE

[HERE Enterprise Browser](https://www.here.io/)
