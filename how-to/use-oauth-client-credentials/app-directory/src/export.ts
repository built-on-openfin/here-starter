import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ContentApiClient } from "./content-api";
import { readClientConfig } from "./env";
import { contentNodeToFdc3Application } from "./fdc3-mapping";
import { reportFailure } from "./hints";
import { ClientCredentialsTokenSource, discover } from "./oauth";
import type { AppDirectory } from "./types";

const DEFAULT_OUT = "apps.config.json";

/**
 * Dump the live directory as an FDC3 App Directory manifest — the reverse of
 * `sync.ts`. Point `.env` at a different org and re-run to carry a directory
 * from one environment to another: export here, then `npm run sync -- --apply`
 * there against the exported file.
 *
 * Access assignments are not included — see `contentNodeToFdc3Application`.
 */
async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const outIndex = args.indexOf("--out");
	const outPath = outIndex === -1 ? DEFAULT_OUT : args[outIndex + 1];
	if (outPath === undefined) {
		throw new Error("--out needs a file path, e.g. --out my-other-org.json");
	}

	const { baseUrl, clientId, clientSecret } = readClientConfig();
	const metadata = await discover(baseUrl);
	const tokens = new ClientCredentialsTokenSource(metadata.token_endpoint, clientId, clientSecret);
	const client = new ContentApiClient({ baseUrl, tokens });

	const nodes = await client.listContents();
	const directory: AppDirectory = {
		applications: nodes.map((node) => contentNodeToFdc3Application(node))
	};

	const resolvedPath = resolve(process.cwd(), outPath);
	writeFileSync(resolvedPath, `${JSON.stringify(directory, null, "\t")}\n`, "utf8");
	console.log(`Wrote ${nodes.length} app(s) to ${outPath}.`);
	if (outPath === DEFAULT_OUT) {
		console.log("That's the sync script's manifest — review with `git diff` before committing.");
	}
	console.log(
		"\nAccess assignments (subjects/primitives) were not exported: they're org-specific ids " +
			"and would either fail or misapply in a different org. Set access up manually wherever " +
			"you apply this manifest."
	);
}

main().catch((error: unknown) => {
	reportFailure(error);
	process.exit(1);
});
