/**
 * A failed call to a HERE Cloud API. `status` is the HTTP status; `code` is the GraphQL error
 * code (for example FORBIDDEN) when the failure came back as a GraphQL error.
 */
export class ApiRequestError extends Error {
	public readonly status: number;

	public readonly code?: string;

	/** Wrap an API failure. */
	public constructor(message: string, status: number, code?: string) {
		super(message);
		this.name = "ApiRequestError";
		this.status = status;
		this.code = code;
	}
}
