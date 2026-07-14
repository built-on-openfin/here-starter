import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { CookieHeaderAuth, JwtAuth } from "../shared/src/auth";
import type { CredentialProvider } from "../shared/src/auth";
import { ContentApiClient } from "../shared/src/content-api";
import { fdc3ToContentInput } from "../shared/src/fdc3-mapping";
import type {
	AppDirectory,
	ContentInput,
	ContentNode,
	ContentUpdate
} from "../shared/src/types";

// Load `.env` from the workspace root if present. Real environment variables
// already set in the shell take precedence, so CI can inject them directly.
const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env");
if (existsSync(envPath)) {
	process.loadEnvFile(envPath);
}

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
}

/** Compute create/update/delete actions. Deletes only occur when prune is true. */
export function computePlan(desired: DesiredApp[], live: ContentNode[], prune: boolean): SyncPlan {
	const liveById = new Map(live.map((node) => [node.id, node]));
	const desiredIds = new Set(desired.map((d) => d.input.contentId));

	const toCreate: ContentInput[] = [];
	const toUpdate: { uuid: string; desired: DesiredApp }[] = [];

	for (const app of desired) {
		const existing = liveById.get(app.input.contentId);
		if (existing === undefined) {
			toCreate.push(app.input);
		} else {
			toUpdate.push({ uuid: existing.uuid, desired: app });
		}
	}

	const toDelete = prune
		? live
				.filter((node) => !desiredIds.has(node.id))
				.map((node) => ({ uuid: node.uuid, contentId: node.id }))
		: [];

	return { toCreate, toUpdate, toDelete };
}

function loadManifest(): AppDirectory {
	const here = dirname(fileURLToPath(import.meta.url));
	const raw = readFileSync(resolve(here, "..", "apps.config.json"), "utf8");
	return JSON.parse(raw) as AppDirectory;
}

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
}

/**
 * Pick a credential provider from the environment. An API JWT is the
 * recommended credential; the here-session cookie is a convenience for local
 * runs (Node only — it cannot be used from the browser).
 */
function resolveAuth(): CredentialProvider | undefined {
	const jwt = process.env.HERE_API_JWT ?? "";
	if (jwt !== "") {
		const authConfigId = process.env.HERE_AUTH_ID;
		return new JwtAuth(jwt, authConfigId === "" ? undefined : authConfigId);
	}

	const session = process.env.HERE_SESSION ?? "";
	if (session !== "") {
		return new CookieHeaderAuth(session);
	}

	return undefined;
}

async function main(): Promise<void> {
	const args = process.argv.slice(2);
	const apply = args.includes("--apply");
	const prune = args.includes("--prune");

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

	// Each phase is a single all-or-nothing bulk request, so a batch never lands
	// partially. The run as a whole is not atomic though: a failure here stops
	// the later phases, but earlier ones have already committed.
	if (plan.toCreate.length > 0) {
		await client.createContents(plan.toCreate);
		console.log(`created ${plan.toCreate.length} app(s)`);
	}
	if (plan.toUpdate.length > 0) {
		await client.updateContents(
			plan.toUpdate.map((u) => ({ identifier: u.uuid, update: toUpdatePayload(u.desired) }))
		);
		console.log(`updated ${plan.toUpdate.length} app(s)`);
	}
	if (plan.toDelete.length > 0) {
		await client.deleteContents(plan.toDelete.map((d) => d.uuid));
		console.log(`deleted ${plan.toDelete.length} app(s)`);
	}
}

/**
 * Build the partial update body for one app.
 *
 * `contentType` and `contentId` identify the app and cannot be changed, so they
 * are dropped. `access` is dropped too unless the manifest declared it: the
 * mapper defaults to `{ subjects: [], primitives: [] }`, and sending that would
 * strip every existing assignment rather than leave it alone.
 */
export function toUpdatePayload(desired: DesiredApp): ContentUpdate {
	const { contentType: _contentType, contentId: _contentId, access, ...rest } = desired.input;
	return desired.declaresAccess ? { ...rest, access } : rest;
}

// Run main only when invoked directly (not when imported by tests).
if (process.argv[1] !== undefined && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
	main().catch((err: unknown) => {
		console.error(err instanceof Error ? err.message : err);
		process.exit(1);
	});
}
