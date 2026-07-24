/** Fetch options a credential provider contributes to a request. */
export interface RequestAuth {
	headers?: Record<string, string>;
	credentials?: RequestCredentials;
}

/**
 * Strategy for authenticating Content Configuration API requests. Swap the
 * implementation without touching the CRUD code.
 *
 * An API JWT (`JwtAuth`) is the recommended credential and works everywhere —
 * the browser UI, scripts, and CI. The session cookie (`CookieHeaderAuth`)
 * works from Node scripts only; a browser cannot send it cross-origin.
 *
 * `apply` may be async, so a provider can fetch or refresh a token before each
 * request (see `OAuthClientCredentialsAuth`). Providers that just set a header
 * return synchronously.
 */
export interface CredentialProvider {
	apply(): Promise<RequestAuth> | RequestAuth;
}

/**
 * Sends an API JWT as a bearer token — the recommended way to authenticate.
 *
 * It is also the only option that works from a browser page served off-origin
 * from your HERE org: a bearer header passes the API's CORS policy, whereas the
 * ambient session cookie cannot be sent cross-origin.
 *
 * `authConfigId` is sent as the `x-of-auth-id` header, which the gateway uses
 * to pick a provider — needed only when your org has more than one
 * authentication provider configured.
 */
export class JwtAuth implements CredentialProvider {
	private readonly token: string;
	private readonly authConfigId?: string;

	public constructor(token: string, authConfigId?: string) {
		this.token = token;
		this.authConfigId = authConfigId;
	}

	public apply(): RequestAuth {
		const headers: Record<string, string> = { Authorization: `Bearer ${this.token}` };
		if (this.authConfigId !== undefined) {
			headers["x-of-auth-id"] = this.authConfigId;
		}
		return { headers };
	}
}

/**
 * Sends the here-session cookie explicitly. For Node scripts and CI only — a
 * browser cannot set the Cookie header, and cannot send the ambient cookie
 * cross-origin, so use `JwtAuth` there instead.
 */
export class CookieHeaderAuth implements CredentialProvider {
	private readonly cookieValue: string;

	public constructor(cookieValue: string) {
		this.cookieValue = cookieValue;
	}

	public apply(): RequestAuth {
		return { headers: { Cookie: `here-session=${this.cookieValue}` } };
	}
}

/** Options for the OAuth 2.0 client-credentials provider. */
export interface OAuthClientCredentialsOptions {
	/** The OAuth token endpoint to request an access token from. */
	tokenUrl: string;
	clientId: string;
	clientSecret: string;
	/** Optional space-delimited scopes. */
	scope?: string;
	/** Override the fetch used to reach the token endpoint (for tests). */
	fetchImpl?: typeof fetch;
}

/**
 * Coming soon — a forward-looking provider, not yet usable.
 *
 * Server-to-server OAuth 2.0 using the client-credentials grant (RFC 6749): it
 * exchanges a client id and secret at a token endpoint for a short-lived access
 * token, caches it until it is close to expiry, and sends it as a bearer token.
 *
 * This is a standard OAuth flow shown here to demonstrate that the pluggable
 * `CredentialProvider` seam already accommodates it. The Content Configuration
 * API does not accept OAuth tokens yet, so nothing in this sample wires it up.
 *
 * Server / CI use only: the client secret must never ship in a browser bundle.
 */
export class OAuthClientCredentialsAuth implements CredentialProvider {
	private readonly options: OAuthClientCredentialsOptions;
	private readonly fetchImpl: typeof fetch;
	private cached?: { token: string; expiresAt: number };

	public constructor(options: OAuthClientCredentialsOptions) {
		this.options = options;
		this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}

	public async apply(): Promise<RequestAuth> {
		return { headers: { Authorization: `Bearer ${await this.accessToken()}` } };
	}

	/** Return a cached token while it is fresh, otherwise fetch a new one. */
	private async accessToken(): Promise<string> {
		const now = Date.now();
		// Refresh a little early so a token never expires mid-request.
		if (this.cached !== undefined && this.cached.expiresAt > now + 30_000) {
			return this.cached.token;
		}

		const body = new URLSearchParams({
			grant_type: "client_credentials",
			client_id: this.options.clientId,
			client_secret: this.options.clientSecret
		});
		if (this.options.scope !== undefined) {
			body.set("scope", this.options.scope);
		}

		const response = await this.fetchImpl(this.options.tokenUrl, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: body.toString()
		});
		if (!response.ok) {
			throw new Error(`OAuth token request failed with status ${response.status}.`);
		}

		const json = (await response.json()) as { access_token: string; expires_in?: number };
		this.cached = {
			token: json.access_token,
			expiresAt: now + (json.expires_in ?? 3600) * 1000
		};
		return this.cached.token;
	}
}
