import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { isDeepStrictEqual } from "node:util";
import { ContentApiClient, toContentUpdate } from "./content-api";
import { readClientConfig } from "./env";
import { contentNodeToFdc3Application, fdc3ToContentInput } from "./fdc3-mapping";
import { reportFailure } from "./hints";
import { ClientCredentialsTokenSource, discover } from "./oauth";
import type { AppDirectory, ContentInput, ContentNode } from "./types";

/**
 * A manifest entry, plus whether it explicitly declared access assignments.
 *
 * This distinction matters on update: omitting `access` leaves assignments
 * untouched, whereas sending `{ subjects: [], primitives: [] }` removes every
 * assignment. A manifest that says nothing about access must not wipe it.
 */
export interface DesiredApp {
	input: ContentInput;
	declaresAccess: boolean;
}

/** The set of changes required to reconcile the manifest against the live directory. */
export interface SyncPlan {
	toCreate: ContentInput[];
	toUpdate: { uuid: string; desired: DesiredApp }[];
	toDelete: { uuid: string; contentId: string }[];
	unchanged: number;
}

/**
 * Whether the live node already says what the manifest asks for.
 *
 * Both sides are compared as update bodies: the node is mapped back through
 * `contentNodeToFdc3Application` and forward again, so it arrives in exactly
 * the shape the manifest produces and only real differences show up. Access is
 * compared only when the manifest declares it — an undeclared access block
 * means "leave it alone", not "must be empty".
 *
 * A node that cannot be mapped back (a desktop app with no path, say) counts
 * as different, so it lands in the update phase rather than being skipped.
 * @param desired The manifest entry.
 * @param node The live app.
 * @returns True when applying the manifest would change nothing.
 */
function matchesLive(desired: DesiredApp, node: ContentNode): boolean {
	let liveInput: ContentInput;
	try {
		liveInput = fdc3ToContentInput(contentNodeToFdc3Application(node));
	} catch {
		return false;
	}

	if (!isDeepStrictEqual(toContentUpdate(liveInput), toContentUpdate(desired.input))) {
		return false;
	}
	return desired.declaresAccess ? isDeepStrictEqual(node.access, desired.input.access) : true;
}

/**
 * Compute create/update/delete actions. Apps that already match the manifest
 * are counted, not updated, so a directory in sync is a no-op. Deletes only
 * occur when prune is true.
 * @param desired The manifest, as content inputs.
 * @param live The apps currently in the directory.
 * @param prune Whether live apps missing from the manifest should be deleted.
 * @returns The plan.
 */
export function computePlan(desired: DesiredApp[], live: ContentNode[], prune: boolean): SyncPlan {
	const liveById = new Map(live.map((node) => [node.id, node]));
	const desiredIds = new Set(desired.map((d) => d.input.contentId));

	const toCreate: ContentInput[] = [];
	const toUpdate: { uuid: string; desired: DesiredApp }[] = [];
	let unchanged = 0;

	for (const app of desired) {
		const existing = liveById.get(app.input.contentId);
		if (existing === undefined) {
			toCreate.push(app.input);
		} else if (matchesLive(app, existing)) {
			unchanged += 1;
		} else {
			toUpdate.push({ uuid: existing.uuid, desired: app });
		}
	}

	const toDelete = prune
		? live.filter((node) => !desiredIds.has(node.id)).map((node) => ({ uuid: node.uuid, contentId: node.id }))
		: [];

	return { toCreate, toUpdate, toDelete, unchanged };
}

/**
 * Read and parse `apps.config.json` from this package.
 * @returns The manifest.
 */
function loadManifest(): AppDirectory {
	const here = dirname(fileURLToPath(import.meta.url));
	const raw = readFileSync(resolve(here, "..", "apps.config.json"), "utf8");
	return JSON.parse(raw) as AppDirectory;
}

/**
 * Print a create/update/delete plan to the console.
 * @param plan The plan to print.
 */
function printPlan(plan: SyncPlan): void {
	console.log("Sync plan:");
	for (const c of plan.toCreate) {
		console.log(`  + create ${c.contentId}`);
	}
	for (const u of plan.toUpdate) {
		const access = u.desired.declaresAccess ? "" : ", access left unchanged";
		console.log(`  ~ update ${u.desired.input.contentId} (${u.uuid}${access})`);
	}
	for (const d of plan.toDelete) {
		console.log(`  - delete ${d.contentId} (${d.uuid})`);
	}
	if (plan.toCreate.length + plan.toUpdate.length + plan.toDelete.length === 0) {
		console.log("  (no changes)");
	}
	if (plan.unchanged > 0) {
		console.log(`  ${plan.unchanged} app(s) already up to date`);
	}
}

/**
 * Compute the plan against the live directory, print it, and apply if asked.
 *
 * Each phase is a single all-or-nothing bulk request, so a batch never lands
 * partially. The run as a whole is not atomic: a failure stops the later
 * phases, but earlier ones have already committed.
 */
async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const apply = args.includes("--apply");
	const prune = args.includes("--prune");

	const { baseUrl, clientId, clientSecret } = readClientConfig();
	const metadata = await discover(baseUrl);
	const tokens = new ClientCredentialsTokenSource(metadata.token_endpoint, clientId, clientSecret);
	const client = new ContentApiClient({ baseUrl, tokens });

	const desired: DesiredApp[] = loadManifest().applications.map((app) => ({
		input: fdc3ToContentInput(app),
		declaresAccess: app.hostManifests?.here?.access !== undefined
	}));
	const live = await client.listContents();
	const plan = computePlan(desired, live, prune);
	printPlan(plan);

	if (!apply) {
		console.log("\nDry run. Re-run with --apply to execute (add --prune to allow deletes).");
		return;
	}

	if (plan.toCreate.length > 0) {
		await client.createContents(plan.toCreate);
		console.log(`created ${plan.toCreate.length} app(s)`);
	}
	if (plan.toUpdate.length > 0) {
		await client.updateContents(
			plan.toUpdate.map((u) => ({
				identifier: u.uuid,
				update: toContentUpdate(u.desired.input, { keepAccess: u.desired.declaresAccess })
			}))
		);
		console.log(`updated ${plan.toUpdate.length} app(s)`);
	}
	if (plan.toDelete.length > 0) {
		await client.deleteContents(plan.toDelete.map((d) => d.uuid));
		console.log(`deleted ${plan.toDelete.length} app(s)`);
	}
}

main().catch((error: unknown) => {
	reportFailure(error);
	process.exit(1);
});
