import { ApiRequestError } from "./api-request-error";
import { AuditApi } from "./audit-api";
import { readClientConfig } from "./env";
import { ClientCredentialsTokenSource, discover } from "./oauth";
import { OAuthRequestError } from "./oauth-request-error";

/**
 * Walk the whole client credentials flow once and report each step, so you can see where a
 * misconfiguration is before scheduling anything. Prints token metadata but never the token.
 */
async function main(): Promise<void> {
	const { baseUrl, clientId, clientSecret } = readClientConfig();

	console.log(`1. Reading OAuth metadata from ${baseUrl}`);
	const metadata = await discover(baseUrl);
	console.log(`   token endpoint: ${metadata.token_endpoint}`);
	const grants = metadata.grant_types_supported ?? [];
	console.log(`   grants supported: ${grants.join(", ")}`);
	if (!grants.includes("client_credentials")) {
		console.error(
			"   This environment does not advertise client_credentials. It needs HERE 15 or later; ask HERE which version your environment is on."
		);
		process.exit(1);
	}

	console.log("2. Requesting an access token with the client credentials grant");
	const tokens = new ClientCredentialsTokenSource(metadata.token_endpoint, clientId, clientSecret);
	const token = await tokens.requestToken();
	console.log(`   token_type: ${token.token_type}`);
	console.log(`   expires_in: ${token.expires_in}s`);
	console.log(`   scope:      ${token.scope ?? "(not returned)"}`);

	console.log("3. Calling the Audit API as the app's service account");
	const api = new AuditApi(baseUrl, tokens);
	const data = await api.query<{ audits: { totalCount: number } }>(
		"query { audits(first: 1) { totalCount } }"
	);
	console.log(`   OK: ${data.audits.totalCount} audit records visible to this app.`);
}

/**
 * Turn the errors a first run usually hits into a next step.
 * @param error The error that ended the run.
 * @returns A hint, or undefined when there is nothing specific to add.
 */
function hintFor(error: unknown): string | undefined {
	if (error instanceof OAuthRequestError) {
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
	if (error instanceof ApiRequestError && (error.status === 403 || error.code === "FORBIDDEN")) {
		return "The token is valid but its service account lacks permission. Make it a Read admin under Admin > Admin Settings.";
	}
	return undefined;
}

main().catch((error: unknown) => {
	console.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
	const hint = hintFor(error);
	if (hint) {
		console.error(`Hint: ${hint}`);
	}
	process.exit(1);
});
