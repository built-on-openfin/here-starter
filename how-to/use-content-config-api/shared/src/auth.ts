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
 */
export interface CredentialProvider {
	apply(): RequestAuth;
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
