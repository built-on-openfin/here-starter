import { AiContextAdapter } from "./ai-context-adapter";

type EntryLevel = "info" | "context" | "error";

interface LogEntry {
	level: EntryLevel;
	message: string;
	timestamp: string;
}

const adapter = new AiContextAdapter(window._aiContext);
const cacheByPageId = new Map<string, LogEntry[]>();

let currentPageId = "unknown-page";

const statusEl = document.querySelector<HTMLElement>("#status");
const activePageIdEl = document.querySelector<HTMLElement>("#active-page-id");
const transcriptEl = document.querySelector<HTMLElement>("#transcript");

function nowIso(): string {
	return new Date().toISOString();
}

function setStatus(message: string, warning = false): void {
	if (!statusEl) {
		return;
	}
	statusEl.textContent = message;
	statusEl.classList.toggle("warning", warning);
}

function getPageLogs(pageId: string): LogEntry[] {
	return cacheByPageId.get(pageId) ?? [];
}

function writePageLogs(pageId: string, logs: LogEntry[]): void {
	cacheByPageId.set(pageId, logs);
}

function appendLog(entry: LogEntry, targetPageId = currentPageId): void {
	const logs = getPageLogs(targetPageId);
	logs.push(entry);
	writePageLogs(targetPageId, logs);
	if (targetPageId === currentPageId) {
		renderTranscript();
	}
}

function renderTranscript(): void {
	if (!transcriptEl) {
		return;
	}
	const logs = getPageLogs(currentPageId);
	if (logs.length === 0) {
		transcriptEl.textContent = "No context available for this page.";
		return;
	}

	transcriptEl.textContent = logs
		.map((entry) => `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`)
		.join("\n\n");
}

function setCurrentPage(pageId: string): void {
	currentPageId = pageId || "unknown-page";
	if (activePageIdEl) {
		activePageIdEl.textContent = currentPageId;
	}
	renderTranscript();
}

async function refreshFocusedPage(): Promise<void> {
	try {
		const context = await adapter.getContext();
		const nextPageId = context.pageId || "unknown-page";
		if (nextPageId !== currentPageId) {
			setCurrentPage(nextPageId);
			appendLog(
				{
					level: "info",
					message: `Detected page switch. Restored cached transcript for ${nextPageId}.`,
					timestamp: nowIso()
				},
				nextPageId
			);
		}
		appendLog({
			level: "context",
			message: adapter.formatContextForLog(context),
			timestamp: nowIso()
		});
	} catch (error) {
		appendLog({
			level: "error",
			message: `Failed to refresh focused page: ${error instanceof Error ? error.message : String(error)}`,
			timestamp: nowIso()
		});
	}
}

async function setupContextChangeListener(): Promise<void> {
	try {
		const enabled = await adapter.ensureContextChangedListener(async (payload) => {
			appendLog({
				level: "info",
				message: `Context changed event received. Payload type: ${typeof payload}. Re-reading getContext().`,
				timestamp: nowIso()
			});
			await refreshFocusedPage();
		});
		if (!enabled) {
			appendLog({
				level: "error",
				message: "setContextChangedListener is unavailable on window._aiContext.",
				timestamp: nowIso()
			});
			return;
		}

		appendLog({
			level: "info",
			message: "Context changed listener enabled. Context is now logged automatically.",
			timestamp: nowIso()
		});
	} catch (error) {
		appendLog({
			level: "error",
			message: `Listener setup failed: ${error instanceof Error ? error.message : String(error)}`,
			timestamp: nowIso()
		});
	}
}

async function bootstrap(): Promise<void> {
	if (!adapter.isAvailable()) {
		setStatus(
			"window._aiContext is not available. Load this in HERE Browser Custom AI Center to use context APIs.",
			true
		);
		renderTranscript();
		return;
	}

	setStatus("Connected to window._aiContext. Logging context automatically.");
	if (adapter.isMockMode()) {
		setStatus("Mock context mode enabled (?mockContext=1). Displaying sample context output.");
	}

	await refreshFocusedPage();
	await setupContextChangeListener();
	appendLog({
		level: "info",
		message: "Panel initialized. Context is fetched on load and on each context change event.",
		timestamp: nowIso()
	});
}

void bootstrap();
