/**
 * An error from the Content Configuration API.
 *
 * Failures arrive from two different layers, so both are represented here:
 * the gateway rejects unauthenticated requests with an HTTP status before
 * GraphQL ever runs, while GraphQL itself answers 200 with an `errors` array.
 * `status` is 0 for the GraphQL layer, where no meaningful HTTP status exists.
 */
export class ContentApiError extends Error {
	public readonly status: number;

	public readonly code?: string;

	/** Wrap a failure with its HTTP status (0 for a GraphQL-layer error) and code. */
	public constructor(status: number, message: string, code?: string) {
		super(message);
		this.name = "ContentApiError";
		this.status = status;
		this.code = code;
	}
}

/** Join the server's own wording with our hint as one readable sentence pair. */
function join(detail: string, hint: string): string {
	const trimmed = detail.trim();
	if (trimmed === "") {
		return hint;
	}
	return /[.!?]$/u.test(trimmed) ? `${trimmed} ${hint}` : `${trimmed}. ${hint}`;
}

/** Map a GraphQL `errors[0].extensions.code` to an actionable message. */
export function codeToMessage(code: string, detail: string): string {
	switch (code) {
		case "BAD_USER_INPUT":
			return join(detail, "Check the required fields for this content type.");
		case "UNAUTHENTICATED":
			return join(detail, "The access token was rejected.");
		case "FORBIDDEN":
			return join(detail, "The service account lacks content admin access in this org.");
		case "NOT_FOUND":
			return join(detail, "No app matches that identifier.");
		case "CONFLICT":
			return join(detail, "An app with that contentId already exists in your org.");
		default:
			return detail;
	}
}

/** Map a transport-level HTTP status to an actionable message. */
export function statusToMessage(status: number): string {
	switch (status) {
		case 400:
			return "400 Bad Request: the request was rejected before reaching the API. Check the request and that BASE_URL points at the right org.";
		case 401:
			return "401 Unauthorized: the access token was rejected. Check HERE_CLIENT_ID and HERE_CLIENT_SECRET.";
		case 403:
			return "403 Forbidden: the service account lacks admin write access to manage content in this org.";
		case 404:
			return "404 Not Found: check the base URL and endpoint path.";
		default:
			return `Request failed with status ${status}.`;
	}
}
