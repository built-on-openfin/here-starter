import { tryParseJson } from "./json";
import { OAuthRequestError } from "./oauth-request-error";

/**
 * The parts of the authorization server metadata (RFC 8414) this sample uses. HERE publishes
 * it at `/.well-known/oauth-authorization-server` on your HERE domain.
 */
export interface AuthorizationServerMetadata {
	token_endpoint: string;
	grant_types_supported?: string[];
}

/** A successful token response (RFC 6749 section 5.1). */
export interface TokenResponse {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
}

/**
 * The scope a client credentials request must send. HERE expands it server side to the
 * scope configured for the app. Omitting `scope`, or sending anything else, returns
 * `invalid_scope`, which is the most likely thing to trip a first integration because many
 * other providers let you leave it out.
 */
const CLIENT_CREDENTIALS_SCOPE = "app_default";

/**
 * Renew this many seconds before the token actually expires, so a request never goes out
 * with a token that lapses in flight.
 */
const EXPIRY_MARGIN_SECONDS = 60;

/**
 * Read the authorization server metadata. Reading the token endpoint from here, rather than
 * hardcoding `/oauth2/token`, is what the spec intends and is also a cheap way to confirm the
 * environment supports the client credentials grant before asking for a token.
 * @param baseUrl Your HERE domain, no trailing slash.
 * @returns The metadata document.
 * @throws Error if the document cannot be fetched or does not name a token endpoint.
 */
export async function discover(baseUrl: string): Promise<AuthorizationServerMetadata> {
	const response = await fetch(`${baseUrl}/.well-known/oauth-authorization-server`, {
		headers: { Accept: "application/json" }
	});
	const metadata = tryParseJson(await response.text()) as Partial<AuthorizationServerMetadata> | undefined;
	if (!response.ok || typeof metadata?.token_endpoint !== "string") {
		throw new Error(
			`Could not read OAuth metadata from ${baseUrl} (HTTP ${response.status}). Check BASE_URL.`
		);
	}
	return metadata as AuthorizationServerMetadata;
}

/**
 * Obtains and caches access tokens using the client credentials grant.
 *
 * There is no user and no browser in this flow. The app proves its own identity with its
 * client id and secret, and HERE issues a token that acts as the service account user an
 * administrator chose for the app. What the token can reach is decided by that user's roles.
 *
 * The client credentials grant does not return a refresh token. When the access token is
 * close to expiry this class simply asks for a new one with the same credentials.
 */
export class ClientCredentialsTokenSource {
	private readonly tokenEndpoint: string;

	private readonly clientId: string;

	private readonly clientSecret: string;

	private cached?: { token: string; renewAt: number };

	/** Create a token source for one registered OAuth app. */
	public constructor(tokenEndpoint: string, clientId: string, clientSecret: string) {
		this.tokenEndpoint = tokenEndpoint;
		this.clientId = clientId;
		this.clientSecret = clientSecret;
	}

	/**
	 * Return a usable access token, requesting a new one only when the cached token is missing
	 * or close to expiry.
	 * @returns The access token, ready to send as `Authorization: Bearer <token>`.
	 */
	public async getAccessToken(): Promise<string> {
		if (this.cached && Date.now() < this.cached.renewAt) {
			return this.cached.token;
		}
		const response = await this.requestToken();
		const usableMs = Math.max(0, response.expires_in - EXPIRY_MARGIN_SECONDS) * 1000;
		this.cached = { token: response.access_token, renewAt: Date.now() + usableMs };
		return response.access_token;
	}

	/** Drop the cached token, for example after the API rejects it, so the next call fetches a new one. */
	public invalidate(): void {
		this.cached = undefined;
	}

	/**
	 * Exchange the client id and secret for an access token.
	 *
	 * HERE authenticates confidential clients with `client_secret_post`, so the id and secret
	 * travel in the form body rather than an HTTP Basic header.
	 * @returns The raw token response.
	 * @throws OAuthRequestError if the authorization server rejects the request.
	 */
	public async requestToken(): Promise<TokenResponse> {
		const body = new URLSearchParams([
			["grant_type", "client_credentials"],
			["client_id", this.clientId],
			["client_secret", this.clientSecret],
			["scope", CLIENT_CREDENTIALS_SCOPE]
		]);
		const response = await fetch(this.tokenEndpoint, {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
			body
		});
		const text = await response.text();
		const payload = (tryParseJson(text) ?? {}) as { [key: string]: unknown };
		if (!response.ok) {
			const code = typeof payload.error === "string" ? payload.error : "request_failed";
			const description =
				typeof payload.error_description === "string" ? payload.error_description : text.slice(0, 200);
			throw new OAuthRequestError(response.status, code, description);
		}
		if (typeof payload.access_token !== "string" || typeof payload.expires_in !== "number") {
			throw new OAuthRequestError(
				response.status,
				"invalid_response",
				"The response is missing access_token or expires_in"
			);
		}
		return payload as unknown as TokenResponse;
	}
}
