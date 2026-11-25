import { ContentApiClient } from "./content-api";
import { readClientConfig } from "./env";
import { reportFailure } from "./hints";
import { ClientCredentialsTokenSource, discover } from "./oauth";

/**
 * Walk the whole client credentials flow once and report each step, so you can see where a
 * misconfiguration is before syncing anything. Prints token metadata but never the token.
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

	console.log("3. Calling the Content Configuration API as the app's service account");
	const api = new ContentApiClient({ baseUrl, tokens });
	const apps = await api.readFirstPage(1);
	const found = apps.length > 0 ? "can read the app directory" : "found no apps yet";
	console.log(`   OK: the service account ${found}.`);
}

main().catch((error: unknown) => {
	reportFailure(error);
	process.exit(1);
});
