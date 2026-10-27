import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { AuditApi, auditRecordTime, type TimeWindow } from "./audit-api";
import { optionalInteger, optionalString, readClientConfig } from "./env";
import { ClientCredentialsTokenSource, discover } from "./oauth";

/**
 * What the collector remembers between runs. HERE keeps no watermark for you: the last point
 * read is the collector's to hold.
 */
interface PullState {
	/** The inclusive end of the last window read. The next window starts here. */
	watermark: string;
	/**
	 * Ids of records at the very end of the last window. The API treats both ends of a window
	 * as inclusive, so a record stamped exactly on the boundary comes back in both windows;
	 * these ids let the next run skip it.
	 */
	boundaryIds: number[];
}

/**
 * Read the saved state, if any.
 * @param path The state file.
 * @returns The state, or undefined on the first run.
 */
function readState(path: string): PullState | undefined {
	if (!existsSync(path)) {
		return undefined;
	}
	return JSON.parse(readFileSync(path, "utf8")) as PullState;
}

/**
 * Save state by writing a temporary file and renaming it over the old one, so a run killed
 * part way through never leaves a half-written watermark behind.
 * @param path The state file.
 * @param state The state to save.
 */
function writeState(path: string, state: PullState): void {
	const temporary = `${path}.tmp`;
	writeFileSync(temporary, `${JSON.stringify(state, null, "\t")}\n`);
	renameSync(temporary, path);
}

/**
 * Pull one window of audit records and append them to newline-delimited JSON files, one record
 * per line and one file per UTC day. Run it on a schedule (cron, a systemd timer, Task
 * Scheduler or your orchestrator). A SIEM forwarder can then watch the output folder.
 *
 * Each run reads from the saved watermark to a point slightly behind now, then moves the
 * watermark forward. Nothing is written until the whole window has been read, so a run that
 * fails part way leaves no partial output and the next run retries the same window.
 */
async function main(): Promise<void> {
	const { baseUrl, clientId, clientSecret } = readClientConfig();
	const lookbackMinutes = optionalInteger("AUDIT_LOOKBACK_MINUTES", 15);
	const settleSeconds = optionalInteger("AUDIT_SETTLE_SECONDS", 60);
	const outputDir = resolve(optionalString("AUDIT_OUTPUT_DIR", "output"));

	mkdirSync(outputDir, { recursive: true });
	const statePath = join(outputDir, "state.json");
	const state = readState(statePath);

	const now = Date.now();
	const settleMs = settleSeconds * 1000;
	const lookbackMs = lookbackMinutes * 60_000;
	const toMs = now - settleMs;
	const window: TimeWindow = {
		from: state?.watermark ?? new Date(now - lookbackMs).toISOString(),
		to: new Date(toMs).toISOString()
	};
	if (toMs <= Date.parse(window.from)) {
		console.error(`Nothing to read: the window from ${window.from} to ${window.to} is empty.`);
		return;
	}

	const metadata = await discover(baseUrl);
	const tokens = new ClientCredentialsTokenSource(metadata.token_endpoint, clientId, clientSecret);
	const records = await new AuditApi(baseUrl, tokens).readWindow(window);

	const skip = new Set(state?.boundaryIds ?? []);
	const boundaryFrom = toMs - 1000;
	const boundaryIds: number[] = [];
	const linesByFile = new Map<string, string[]>();
	let skipped = 0;
	for (const record of records) {
		const time = auditRecordTime(record);
		if (time >= boundaryFrom) {
			boundaryIds.push(record.id);
		}
		if (skip.has(record.id)) {
			skipped++;
		} else {
			const file = join(outputDir, `audit-${new Date(time).toISOString().slice(0, 10)}.ndjson`);
			const lines = linesByFile.get(file) ?? [];
			lines.push(`${JSON.stringify(record)}\n`);
			linesByFile.set(file, lines);
		}
	}

	for (const [file, lines] of linesByFile) {
		appendFileSync(file, lines.join(""));
	}
	writeState(statePath, { watermark: window.to, boundaryIds });

	const written = records.length - skipped;
	const skippedNote = skipped > 0 ? `, skipped ${skipped} already written by the previous run` : "";
	const files = [...linesByFile.keys()].join(", ") || "no files";
	console.error(`Read ${window.from} to ${window.to}: wrote ${written} record(s) to ${files}${skippedNote}`);
}

main().catch((error: unknown) => {
	console.error(`Failed: ${error instanceof Error ? error.message : String(error)}`);
	console.error("The watermark was not moved, so the next run will retry this window.");
	process.exit(1);
});
