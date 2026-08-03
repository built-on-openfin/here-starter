import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { loadDotEnv, resolveAuth } from "./env";
import { ContentApiClient } from "../shared/src/content-api";
import { contentNodeToFdc3Application } from "../shared/src/fdc3-mapping";
import type { AppDirectory } from "../shared/src/types";

loadDotEnv();

const DEFAULT_OUT = "apps.config.json";

/**
 * Dump the live directory as an FDC3 App Directory manifest — the reverse of
 * `sync.ts`. Point `.env` at a different org and re-run to carry a directory
 * from one environment to another: export here, then `npm run sync --
 * --apply` there against the exported file.
 *
 * Access assignments are not included — see `contentNodeToFdc3Application`.
 */
async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const outIndex = args.indexOf("--out");
	const outPath = outIndex !== -1 ? args[outIndex + 1] : DEFAULT_OUT;

	const baseUrl = process.env.BASE_URL ?? "";
	if (baseUrl === "") {
		console.error("Set BASE_URL. See the README.");
		process.exit(1);
		return;
	}

	const auth = resolveAuth();
	if (auth === undefined) {
		console.error(
			"Set HERE_API_JWT (recommended) or HERE_SESSION to authenticate. See the README."
		);
		process.exit(1);
		return;
	}

	const client = new ContentApiClient({ baseUrl, auth });
	const nodes = await client.listContents();
	const directory: AppDirectory = { applications: nodes.map(contentNodeToFdc3Application) };

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

// Run main only when invoked directly (not when imported by tests).
if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
	main().catch((err: unknown) => {
		console.error(err instanceof Error ? err.message : err);
		process.exit(1);
	});
}
