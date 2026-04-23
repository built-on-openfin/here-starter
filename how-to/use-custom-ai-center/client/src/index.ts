import { AiContextAdapter, FALLBACK_PAGE_ID } from "./ai-context-adapter";
import type { NormalizedContextResponse } from "./types";

type EntryLevel = "info" | "context" | "error";

interface LogEntry {
	level: EntryLevel;
	message: string;
	timestamp: string;
}

const adapter = new AiContextAdapter(window._aiContext);
const cacheByPageId = new Map<string, LogEntry[]>();

let currentPageId = FALLBACK_PAGE_ID;

const statusEl = document.querySelector<HTMLElement>("#status");
const aiViewsStatusEl = document.querySelector<HTMLElement>("#ai-views-status");
const pageIdRowEl = document.querySelector<HTMLElement>("#page-id-row");
const activePageIdEl = document.querySelector<HTMLElement>("#active-page-id");
const transcriptEl = document.querySelector<HTMLElement>("#transcript");
const getAiContextBtn = document.querySelector<HTMLButtonElement>("#get-ai-context");
const clearTranscriptBtn = document.querySelector<HTMLButtonElement>("#clear-transcript");

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

function updateClearButtonState(): void {
	if (!clearTranscriptBtn) {
		return;
	}
	clearTranscriptBtn.disabled = getPageLogs(currentPageId).length === 0;
}

function appendLog(entry: LogEntry, targetPageId = currentPageId): void {
	const logs = getPageLogs(targetPageId);
	logs.push(entry);
	writePageLogs(targetPageId, logs);
	if (targetPageId === currentPageId) {
		renderTranscript();
	} else {
		updateClearButtonState();
	}
}

function renderTranscript(): void {
	if (!transcriptEl) {
		return;
	}
	const logs = getPageLogs(currentPageId);
	if (logs.length === 0) {
		transcriptEl.textContent = "No context loaded yet. Click Get AI Context.";
	} else {
		transcriptEl.textContent = logs
			.map((entry) => `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`)
			.join("\n\n");
	}
	updateClearButtonState();
}

function updateUIFromContext(context: NormalizedContextResponse): void {
	const nextPageId = context.pageId || FALLBACK_PAGE_ID;
	currentPageId = nextPageId;

	if (aiViewsStatusEl) {
		aiViewsStatusEl.textContent = `AI-enabled views: ${adapter.hasAiEnabledViews(context) ? "yes" : "no"}`;
	}

	if (pageIdRowEl && activePageIdEl) {
		if (nextPageId !== FALLBACK_PAGE_ID) {
			pageIdRowEl.hidden = false;
			pageIdRowEl.classList.remove("hidden");
			activePageIdEl.textContent = nextPageId;
		} else {
			pageIdRowEl.hidden = true;
			pageIdRowEl.classList.add("hidden");
		}
	}

	renderTranscript();
}

async function applyContextFromSource(): Promise<NormalizedContextResponse> {
	const context = await adapter.getContext();
	updateUIFromContext(context);
	return context;
}

async function onGetAiContextClick(): Promise<void> {
	if (!getAiContextBtn) {
		return;
	}
	getAiContextBtn.disabled = true;
	try {
		const context = await applyContextFromSource();
		appendLog({
			level: "context",
			message: adapter.formatContextForLog(context),
			timestamp: nowIso()
		});
	} catch (error) {
		appendLog({
			level: "error",
			message: `Failed to get context: ${error instanceof Error ? error.message : String(error)}`,
			timestamp: nowIso()
		});
	} finally {
		getAiContextBtn.disabled = false;
	}
}

function onClearTranscriptClick(): void {
	writePageLogs(currentPageId, []);
	renderTranscript();
}

async function loadLabelsOnly(): Promise<void> {
	try {
		await applyContextFromSource();
	} catch (error) {
		setStatus(`Could not read context: ${error instanceof Error ? error.message : String(error)}`, true);
	}
}

async function setupContextChangeListener(): Promise<void> {
	try {
		const enabled = await adapter.ensureContextChangedListener(async () => {
			try {
				await applyContextFromSource();
			} catch (error) {
				appendLog({
					level: "error",
					message: `Context change handler failed: ${error instanceof Error ? error.message : String(error)}`,
					timestamp: nowIso()
				});
			}
		});
		if (!enabled) {
			appendLog({
				level: "error",
				message: "setContextChangedListener is unavailable on window._aiContext.",
				timestamp: nowIso()
			});
		}
	} catch (error) {
		appendLog({
			level: "error",
			message: `Listener setup failed: ${error instanceof Error ? error.message : String(error)}`,
			timestamp: nowIso()
		});
	}
}

async function bootstrap(): Promise<void> {
	getAiContextBtn?.addEventListener("click", () => {
		void onGetAiContextClick();
	});
	clearTranscriptBtn?.addEventListener("click", onClearTranscriptClick);

	if (!adapter.isAvailable()) {
		setStatus(
			"window._aiContext is not available. Load this in HERE Browser Custom AI Center to use context APIs.",
			true
		);
		if (aiViewsStatusEl) {
			aiViewsStatusEl.textContent = "";
		}
		if (pageIdRowEl) {
			pageIdRowEl.hidden = true;
			pageIdRowEl.classList.add("hidden");
		}
		getAiContextBtn && (getAiContextBtn.disabled = true);
		renderTranscript();
		return;
	}

	setStatus("Connected to window._aiContext. Use Get AI Context to append full context to the transcript.");
	if (adapter.isMockMode()) {
		setStatus("Mock context mode enabled (?mockContext=1). Use Get AI Context to see sample output.");
	}

	await loadLabelsOnly();
	getAiContextBtn && (getAiContextBtn.disabled = false);
	await setupContextChangeListener();
}

void bootstrap();
