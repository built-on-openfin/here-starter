/** Fetch options a credential provider contributes to a request. */
export interface RequestAuth {
	headers?: { [key: string]: string };
	credentials?: RequestCredentials;
}

/**
 * Strategy for authenticating Content Configuration API requests. Swap the
 * implementation without touching the CRUD code.
 *
 * `BearerTokenAuth` covers both an OAuth access token (browser UI) and an org
 * API JWT (scripts, CI). `CookieHeaderAuth` works from Node only — a browser
 * cannot send the session cookie cross-origin.
 *
 * `apply` may be async so a provider can refresh a credential before a request.
 * Providers that just set a header return synchronously.
 */
export interface CredentialProvider {
	/** Produce the headers (and credentials mode) for one request. */
	apply(): Promise<RequestAuth> | RequestAuth;
}

/**
 * Sends a bearer token in the `Authorization` header.
 *
 * This one provider covers every credential the API accepts:
 *
 * - An **OAuth access token** the browser UI obtained via authorization code
 * + PKCE. HERE issued it, so no `authConfigId` is passed.
 * - An **org API JWT** issued by an authentication provider configured for
 * your organization, used by the sync script. When an org has more than one
 * such provider, `authConfigId` is sent as `x-of-auth-id` so the gateway
 * knows which one to validate against.
 * - That same **org API JWT pasted into the browser UI** as a stopgap for
 * orgs where OAuth public clients aren't available yet. It travels
 * identically to the OAuth case; only how the page obtained it differs.
 *
 * Do not send `authConfigId` with a HERE-issued OAuth token: that header selects
 * among externally configured providers, and HERE validates its own tokens.
 */
export class BearerTokenAuth implements CredentialProvider {
	private readonly token: string;

	private readonly authConfigId?: string;

	/** Wrap a bearer token, optionally tied to an external auth provider. */
	public constructor(token: string, authConfigId?: string) {
		this.token = token;
		this.authConfigId = authConfigId;
	}

	/** Return the Authorization header, plus x-of-auth-id when configured. */
	public apply(): RequestAuth {
		const headers: { [key: string]: string } = { Authorization: `Bearer ${this.token}` };
		if (this.authConfigId !== undefined) {
			headers["x-of-auth-id"] = this.authConfigId;
		}
		return { headers };
	}
}

/**
 * Sends the here-session cookie explicitly. For Node scripts and CI only — a
 * browser cannot set the Cookie header, and cannot send the ambient cookie
 * cross-origin, so use `BearerTokenAuth` there instead.
 */
export class CookieHeaderAuth implements CredentialProvider {
	private readonly cookieValue: string;

	/** Wrap a here-session cookie value. */
	public constructor(cookieValue: string) {
		this.cookieValue = cookieValue;
	}

	/** Return the Cookie header carrying the session value. */
	public apply(): RequestAuth {
		return { headers: { Cookie: `here-session=${this.cookieValue}` } };
	}
}
