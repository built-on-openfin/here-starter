/**
 * OAuth 2.0 Authorization Code flow with PKCE (RFC 7636) — **browser only**.
 *
 * HERE's service gateway is the authorization server, so a page can obtain its
 * own short-lived access token instead of shipping a long-lived credential in
 * its bundle. The user signs in with their normal organization account and
 * consents; the token that comes back carries their access, not the app's.
 *
 * The sample is a public client: it holds no client secret, because anything in
 * a browser bundle is readable by anyone who loads the page. PKCE is what makes
 * that safe — the authorization code is bound to a one-time secret (the
 * "verifier") that never leaves this page, so an intercepted code is useless on
 * its own.
 *
 * This module depends on `window`, `sessionStorage` and `crypto.subtle`. The
 * sync script must not import it; a redirect flow needs a user present, so
 * headless callers use `BearerTokenAuth` with an org API JWT instead.
 */

/** The subset of RFC 8414 authorization server metadata this sample uses. */
export interface OAuthMetadata {
	issuer: string;
	authorization_endpoint: string;
	token_endpoint: string;
	scopes_supported?: string[];
	code_challenge_methods_supported?: string[];
}

/** A failure during discovery, authorization, or the token exchange. */
export class OAuthError extends Error {
	public readonly code?: string;

	/** Wrap a failure message, optionally tagged with the server's error code. */
	public constructor(message: string, code?: string) {
		super(message);
		this.name = "OAuthError";
		this.code = code;
	}
}

const DISCOVERY_PATH = "/.well-known/oauth-authorization-server";

/**
 * The verifier and state must outlive a full page navigation — the browser
 * leaves for the authorization server and comes back — so they cannot live in
 * memory. They are removed the moment the redirect is handled.
 */
const VERIFIER_KEY = "here-oauth-verifier";
const STATE_KEY = "here-oauth-state";

/** Falls back to the one scope the server currently offers. */
const DEFAULT_SCOPE = "full";

let cached: { baseUrl: string; metadata: OAuthMetadata } | undefined;

/**
 * Read the authorization server's metadata.
 *
 * Endpoints are discovered rather than hardcoded so the sample works against
 * any organization's subdomain without extra configuration.
 */
export async function discover(baseUrl: string): Promise<OAuthMetadata> {
	if (cached !== undefined && cached.baseUrl === baseUrl) {
		return cached.metadata;
	}

	const url = `${baseUrl}${DISCOVERY_PATH}`;
	let response: Response;
	try {
		response = await fetch(url);
	} catch {
		throw new OAuthError(`Could not reach ${url}. Check BASE_URL and your network.`);
	}

	if (!response.ok) {
		throw new OAuthError(
			`${url} returned ${response.status}. OAuth may not be enabled for this ` +
				"organization — ask your HERE administrator to enable it."
		);
	}

	const metadata = (await response.json()) as OAuthMetadata;
	cached = { baseUrl, metadata };
	return metadata;
}

/**
 * Where the authorization server sends the user back.
 *
 * Derived from the current page rather than configured, because it must match
 * a registered redirect URI exactly and a mismatched hand-typed value is the
 * single most common way this flow fails. The UI displays this string so it can
 * be copied into the admin console verbatim.
 */
export function redirectUri(): string {
	return `${window.location.origin}${window.location.pathname}`;
}

/** True when the current URL is an authorization response, success or failure. */
export function hasAuthorizationResponse(): boolean {
	const params = new URLSearchParams(window.location.search);
	return params.has("code") || params.has("error");
}

/**
 * Start sign-in: stash a fresh verifier and state, then leave for the
 * authorization endpoint. This navigates away, so nothing after it runs.
 */
export async function beginSignIn(baseUrl: string, clientId: string): Promise<void> {
	const metadata = await discover(baseUrl);
	const verifier = randomString(32);
	const state = randomString(16);

	sessionStorage.setItem(VERIFIER_KEY, verifier);
	sessionStorage.setItem(STATE_KEY, state);

	// Built with individual .set() calls, not an object literal: the OAuth spec
	// mandates these exact snake_case parameter names, and a literal object
	// would make every key a linter naming-convention violation.
	const params = new URLSearchParams();
	params.set("response_type", "code");
	params.set("client_id", clientId);
	params.set("redirect_uri", redirectUri());
	params.set("scope", (metadata.scopes_supported ?? [DEFAULT_SCOPE]).join(" "));
	params.set("state", state);
	params.set("code_challenge", await challengeFor(verifier));
	params.set("code_challenge_method", "S256");

	window.location.assign(`${metadata.authorization_endpoint}?${params.toString()}`);
}

/**
 * Handle the redirect back and exchange the code for an access token.
 *
 * The stored verifier and state are cleared first, and the query string is
 * stripped from the address bar, so a reload or a shared URL cannot replay a
 * one-time code.
 */
export async function completeSignIn(baseUrl: string, clientId: string): Promise<string> {
	const params = new URLSearchParams(window.location.search);
	const verifier = sessionStorage.getItem(VERIFIER_KEY);
	const expectedState = sessionStorage.getItem(STATE_KEY);

	sessionStorage.removeItem(VERIFIER_KEY);
	sessionStorage.removeItem(STATE_KEY);
	window.history.replaceState({}, document.title, redirectUri());

	const failure = params.get("error");
	if (failure !== null) {
		throw new OAuthError(params.get("error_description") ?? `Authorization failed: ${failure}`, failure);
	}

	const code = params.get("code");
	if (code === null) {
		throw new OAuthError("The redirect carried no authorization code.");
	}

	// A mismatch means this response does not belong to the request this page
	// made, so the code must not be exchanged.
	if (expectedState === null || params.get("state") !== expectedState) {
		throw new OAuthError(
			"The returned state did not match the value sent. Sign-in was abandoned — " +
				"this can indicate a cross-site request forgery attempt."
		);
	}

	if (verifier === null) {
		throw new OAuthError(
			"The PKCE verifier was missing, so the code cannot be exchanged. Start sign-in again."
		);
	}

	const metadata = await discover(baseUrl);
	const body = new URLSearchParams();
	body.set("grant_type", "authorization_code");
	body.set("code", code);
	body.set("redirect_uri", redirectUri());
	body.set("client_id", clientId);
	body.set("code_verifier", verifier);

	const response = await fetch(metadata.token_endpoint, {
		method: "POST",
		headers: { "Content-Type": "application/x-www-form-urlencoded" },
		body: body.toString()
	});

	const payload = (await response.json().catch(() => ({}))) as {
		access_token?: string;
		error?: string;
		error_description?: string;
	};

	if (!response.ok || payload.access_token === undefined) {
		const detail = payload.error_description ?? payload.error ?? `status ${response.status}`;
		throw new OAuthError(`Token exchange failed: ${detail}`, payload.error);
	}

	return payload.access_token;
}

/** A URL-safe random string, used for both the verifier and the state value. */
function randomString(bytes: number): string {
	const buffer = new Uint8Array(bytes);
	crypto.getRandomValues(buffer);
	return base64Url(buffer);
}

/** The S256 challenge: base64url(SHA-256(verifier)). */
async function challengeFor(verifier: string): Promise<string> {
	const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
	return base64Url(new Uint8Array(digest));
}

/** Base64url per RFC 4648 §5 — no padding, URL-safe alphabet. */
function base64Url(bytes: Uint8Array): string {
	let binary = "";
	for (const byte of bytes) {
		binary += String.fromCharCode(byte);
	}
	return btoa(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/[=]+$/u, "");
}
