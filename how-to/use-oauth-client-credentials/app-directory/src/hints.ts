import { ContentApiError } from "./errors";
import { OAuthRequestError } from "./oauth-request-error";

/**
 * Turn the errors a first run usually hits into a next step.
 * @param error The error that ended the run.
 * @returns A hint, or undefined when there is nothing specific to add.
 */
export function hintFor(error: unknown): string | undefined {
	if (error instanceof OAuthRequestError) {
		if (error.status >= 500) {
			return "Check HERE_CLIENT_ID is the Client ID shown on the OAuth app in the Admin Console, and that HERE_CLIENT_SECRET is set.";
		}
		switch (error.code) {
			case "invalid_client": {
				return "Check HERE_CLIENT_ID and HERE_CLIENT_SECRET, and that the secret has not expired.";
			}
			case "unauthorized_client": {
				return "Enable the Client Credentials grant on the OAuth app.";
			}
			case "invalid_scope": {
				return "The request must send scope=app_default and nothing else.";
			}
			case "invalid_grant": {
				return "Check the app has a service account user selected and that the user is still active.";
			}
			default: {
				return undefined;
			}
		}
	}
	if (error instanceof ContentApiError && (error.status === 403 || error.code === "FORBIDDEN")) {
		return "The token is valid but its service account lacks permission. Grant Full Access under Admin > Admin Settings. Read can list the directory; sync --apply needs Full Access.";
	}
	return undefined;
}

/**
 * Print a failure and a next step.
 * @param error The error that ended the run.
 */
export function reportFailure(error: unknown): void {
	console.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
	const hint = hintFor(error);
	if (hint !== undefined) {
		console.error(`Hint: ${hint}`);
	}
}
