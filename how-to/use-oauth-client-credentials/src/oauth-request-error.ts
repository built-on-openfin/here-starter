/**
 * An error response from the HERE authorization server, carrying the standard OAuth `error`
 * code (RFC 6749 section 5.2) so a caller can tell a bad secret from a disabled grant.
 */
export class OAuthRequestError extends Error {
	public readonly status: number;

	public readonly code: string;

	/** Wrap an OAuth error response. */
	public constructor(status: number, code: string, description?: string) {
		super(`${code}${description ? `: ${description}` : ""} (HTTP ${status})`);
		this.name = "OAuthRequestError";
		this.status = status;
		this.code = code;
	}
}
