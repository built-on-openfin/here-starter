import { BearerTokenAuth } from "../../shared/src/auth";
import { ContentApiClient, ENDPOINT_PATH, toContentUpdate } from "../../shared/src/content-api";
import { ContentApiError } from "../../shared/src/errors";
import { contentNodeToFdc3Application, fdc3ToContentInput } from "../../shared/src/fdc3-mapping";
import {
	beginSignIn,
	completeSignIn,
	hasAuthorizationResponse,
	OAuthError,
	redirectUri
} from "../../shared/src/oauth-pkce";
import type { AppDirectory, ContentNode, ContentUpdate, Fdc3Application } from "../../shared/src/types";

/**
 * Injected at build time by webpack from `.env` — see `.env.example`.
 *
 * Neither value is a secret. The client id is public by design, and the UI has
 * no token until the user signs in through HERE, so nothing sensitive is
 * readable in this bundle.
 *
 * `HERE_API_JWT` is deliberately NOT injected here even though it is also read
 * from `.env`: it is a real credential, unlike these two, and this bundle is
 * readable by anyone who loads the page. The JWT sign-in path below takes the
 * token from a field the user pastes into at runtime instead.
 */
const BASE_URL = process.env.BASE_URL ?? "";
const CLIENT_ID = process.env.HERE_OAUTH_CLIENT_ID ?? "";

/** The editable fields, read straight off the form. */
interface FormState {
	contentId: string;
	name: string;
	type: "native" | "web";
	url: string;
	path: string;
	icon: string;
	active: boolean;
	featured: boolean;
}

/** Wire up the console: sign-in state, the CRUD form, and the activity log. */
function initializeDOM(): void {
	// Held in memory only, so closing or reloading the page ends the session.
	// There is no refresh grant, so an expired token means signing in again.
	let client: ContentApiClient | undefined;

	const logEl = document.querySelector<HTMLElement>("#log");

	// --- sign-in state ------------------------------------------------------

	const ACTION_IDS = ["#btnList", "#btnExport", "#btnCreate", "#btnValidate", "#btnUpdate", "#btnDelete"];

	/**
	 * `authConfigId` only applies to a pasted API JWT — never pass it for an
	 * OAuth token, which HERE validates itself (see `BearerTokenAuth`).
	 */
	function setSignedIn(token: string | undefined, authConfigId?: string): void {
		client =
			token === undefined
				? undefined
				: new ContentApiClient({
						baseUrl: BASE_URL,
						auth: new BearerTokenAuth(token, authConfigId)
					});

		for (const id of ACTION_IDS) {
			const button = document.querySelector<HTMLButtonElement>(id);
			if (button !== null) {
				button.disabled = token === undefined;
			}
		}
		document.querySelector("#signInControls")?.classList.toggle("hidden", token !== undefined);
		document.querySelector("#authState")?.classList.toggle("hidden", token === undefined);
	}

	/** Report an OAuth failure in the transcript and return to signed out. */
	function failSignIn(err: unknown): void {
		notice(err instanceof OAuthError ? err.message : String(err), "error");
		setSignedIn(undefined);
	}

	// --- reading and building from the form ---------------------------------

	/** Read a trimmed input value by selector. */
	function text(id: string): string {
		return (document.querySelector<HTMLInputElement>(id)?.value ?? "").trim();
	}

	/** Read a checkbox's checked state by selector. */
	function checked(id: string): boolean {
		return document.querySelector<HTMLInputElement>(id)?.checked ?? false;
	}

	/** Snapshot the form into a `FormState`. */
	function readForm(): FormState {
		return {
			contentId: text("#f-contentId"),
			name: text("#f-name"),
			type: document.querySelector<HTMLSelectElement>("#f-type")?.value === "native" ? "native" : "web",
			url: text("#f-url"),
			path: text("#f-path"),
			icon: text("#f-icon"),
			active: checked("#f-active"),
			featured: checked("#f-featured")
		};
	}

	/** Turn the form into an FDC3 application record for create. */
	function buildApp(form: FormState): Fdc3Application {
		const name = form.name === "" ? form.contentId : form.name;
		return {
			appId: form.contentId,
			name,
			title: name,
			type: form.type,
			details: form.type === "web" ? { url: form.url } : { path: form.path },
			icons: form.icon === "" ? undefined : [{ src: form.icon }],
			hostManifests: { here: { active: form.active, featured: form.featured } }
		};
	}

	/**
	 * Build a partial update from the form. The form has no access editor, so
	 * access is left out and an app's existing assignments stay untouched.
	 */
	function buildUpdate(form: FormState): ContentUpdate {
		return toContentUpdate(fdc3ToContentInput(buildApp(form)));
	}

	/** Fill the form from a fetched app, so Validate loads real values to edit. */
	function populateForm(node: ContentNode): void {
		setValue("#f-contentId", node.id);
		setValue("#f-name", node.name);
		const type = node.type === "DESKTOP" ? "native" : "web";
		setValue("#f-type", type);
		applyTypeVisibility();
		setValue("#f-url", node.url ?? node.urls?.[0] ?? "");
		setValue("#f-path", node.desktopPath ?? "");
		setValue("#f-icon", node.icon ?? "");
		setChecked("#f-active", node.active);
		setChecked("#f-featured", node.featured ?? false);
	}

	/** Set an input or select's value by selector, if it exists. */
	function setValue(id: string, value: string): void {
		const field = document.querySelector<HTMLInputElement | HTMLSelectElement>(id);
		if (field !== null) {
			field.value = value;
		}
	}

	/** Set a checkbox's checked state by selector, if it exists. */
	function setChecked(id: string, value: boolean): void {
		const field = document.querySelector<HTMLInputElement>(id);
		if (field !== null) {
			field.checked = value;
		}
	}

	// --- the activity transcript --------------------------------------------

	/** Append a request entry; returns a callback to resolve it once it settles. */
	function logRequest(label: string): (status: "error" | "ok", detail: string[]) => void {
		document.querySelector("#logEmpty")?.remove();

		const entry = document.createElement("div");
		entry.className = "log-entry is-pending";

		const line = document.createElement("div");
		line.className = "log-entry__line";
		line.append(
			span("log-time", new Date().toLocaleTimeString()),
			span("log-method", "POST"),
			span("log-path", ENDPOINT_PATH),
			span("log-pill", "waiting")
		);

		entry.append(line, span("log-label", label));
		logEl?.append(entry);
		scrollToLatest();

		const pill = line.querySelector(".log-pill");
		return (status, detail) => {
			entry.className = `log-entry is-${status}`;
			if (pill !== null) {
				pill.className = `log-pill is-${status}`;
				pill.textContent = status === "ok" ? "OK" : "error";
			}
			if (detail.length > 0) {
				const body = document.createElement("pre");
				body.className = "log-detail";
				body.textContent = detail.join("\n");
				entry.append(body);
			}
			scrollToLatest();
		};
	}

	/** Append a one-line, non-request entry to the activity log. */
	function notice(message: string, kind: "error" | "info"): void {
		document.querySelector("#logEmpty")?.remove();
		const entry = document.createElement("div");
		entry.className = kind === "error" ? "log-entry is-error" : "log-entry";
		entry.append(span("log-label", message));
		logEl?.append(entry);
		scrollToLatest();
	}

	/** Build a `<span>` with a class and text content. */
	function span(className: string, content: string): HTMLSpanElement {
		const el = document.createElement("span");
		el.className = className;
		el.textContent = content;
		return el;
	}

	/** Scroll the activity log to its latest entry. */
	function scrollToLatest(): void {
		const body = logEl?.parentElement;
		if (body !== null && body !== undefined) {
			body.scrollTop = body.scrollHeight;
		}
	}

	/** Trigger a browser download of `data` as a formatted JSON file. */
	function downloadJson(filename: string, data: unknown): void {
		const blob = new Blob([JSON.stringify(data, null, "\t")], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	}

	// --- wiring -------------------------------------------------------------

	/** Check BASE_URL and HERE_OAUTH_CLIENT_ID are set, reporting what's missing. */
	function configured(): boolean {
		const missing: string[] = [];
		if (BASE_URL === "") {
			missing.push("BASE_URL");
		}
		if (CLIENT_ID === "") {
			missing.push("HERE_OAUTH_CLIENT_ID");
		}
		if (missing.length > 0) {
			notice(
				`${missing.join(" and ")} not set in .env. Add ${missing.length === 1 ? "it" : "them"} ` +
					"and re-run npm run start to rebuild. See the README for how to register an " +
					"OAuth app and get a client id.",
				"error"
			);
			return false;
		}
		return true;
	}

	/**
	 * The JWT sign-in path needs `BASE_URL` to call the API, but not
	 * `HERE_OAUTH_CLIENT_ID` — there is no OAuth app involved.
	 */
	function baseUrlConfigured(): boolean {
		if (BASE_URL === "") {
			notice(
				"BASE_URL not set in .env. Add it and re-run npm run start to rebuild. See the README.",
				"error"
			);
			return false;
		}
		return true;
	}

	/**
	 * Run one API call, logging the request and resolving it to OK or error.
	 *
	 * The client is handed to the callback rather than read from the closure, so
	 * the signed-in check happens in one place and callers get a non-optional
	 * client to work with.
	 */
	async function run(label: string, call: (api: ContentApiClient) => Promise<string[]>): Promise<void> {
		if (client === undefined) {
			notice("Sign in first.", "error");
			return;
		}
		const settle = logRequest(label);
		try {
			settle("ok", await call(client));
		} catch (err) {
			settle("error", [err instanceof ContentApiError ? err.message : String(err)]);
			// No refresh grant exists, so an expired token ends the session.
			if (err instanceof ContentApiError && err.status === 401) {
				setSignedIn(undefined);
				notice("Session expired. Sign in again to continue.", "error");
			}
		}
	}

	/** Show the URL field for a web app, or the executable path field for a desktop one. */
	function applyTypeVisibility(): void {
		const isWeb = document.querySelector<HTMLSelectElement>("#f-type")?.value !== "native";
		document.querySelector("#field-url")?.classList.toggle("hidden", !isWeb);
		document.querySelector("#field-path")?.classList.toggle("hidden", isWeb);
	}

	document.querySelector("#btnSignIn")?.addEventListener("click", () => {
		if (!configured()) {
			return;
		}
		// Navigates away on success, so nothing after this runs.
		beginSignIn(BASE_URL, CLIENT_ID).catch(failSignIn);
	});

	document.querySelector("#btnSignOut")?.addEventListener("click", () => {
		setSignedIn(undefined);
		notice("Signed out.", "info");
	});

	/**
	 * Stopgap for orgs where OAuth public clients aren't available yet
	 * (see the README): sign in with an API JWT pasted straight into the page
	 * instead of running the OAuth handshake. Same in-memory-only lifetime as an
	 * OAuth token — nothing is persisted, so a reload signs you out.
	 */
	function signInWithPastedJwt(): void {
		if (!baseUrlConfigured()) {
			return;
		}
		const jwtInput = document.querySelector<HTMLInputElement>("#f-jwt");
		const jwt = jwtInput?.value.trim() ?? "";
		if (jwt === "") {
			notice("Paste an API JWT first.", "error");
			return;
		}
		const authIdInput = document.querySelector<HTMLInputElement>("#f-auth-id");
		const authId = authIdInput?.value.trim() ?? "";
		if (jwtInput !== null) {
			jwtInput.value = "";
		}
		if (authIdInput !== null) {
			authIdInput.value = "";
		}
		setSignedIn(jwt, authId === "" ? undefined : authId);
		notice(
			"Signed in with a pasted JWT. This bypasses OAuth entirely — treat the token as a " +
				"secret, and don't leave it sitting in the field on a shared screen.",
			"info"
		);
	}

	document.querySelector("#btnSignInJwt")?.addEventListener("click", signInWithPastedJwt);
	for (const id of ["#f-jwt", "#f-auth-id"]) {
		document.querySelector(id)?.addEventListener("keydown", (e) => {
			if ((e as KeyboardEvent).key === "Enter") {
				signInWithPastedJwt();
			}
		});
	}

	document.querySelector("#f-type")?.addEventListener("change", applyTypeVisibility);

	document.querySelector("#btnList")?.addEventListener("click", () => {
		void run("query contents", async (api) => {
			const nodes = await api.listContents();
			if (nodes.length === 0) {
				return ["Your directory has no apps yet."];
			}
			const rows = nodes.map((n) => `• ${n.name}  [${n.id}]  ${n.type}  ${n.active ? "active" : "inactive"}`);
			return [`${nodes.length} app(s):`, ...rows];
		});
	});

	document.querySelector("#btnExport")?.addEventListener("click", () => {
		void run("export directory as FDC3 manifest", async (api) => {
			const nodes = await api.listContents();
			const directory: AppDirectory = {
				applications: nodes.map((node) => contentNodeToFdc3Application(node))
			};
			downloadJson(`content-directory-${Date.now()}.json`, directory);
			return [
				`Downloaded ${nodes.length} app(s) as an FDC3 App Directory manifest.`,
				"Access assignments were not included — they're org-specific and wouldn't carry over correctly."
			];
		});
	});

	document.querySelector("#btnCreate")?.addEventListener("click", () => {
		const form = readForm();
		void run(`mutation createContent · ${form.contentId || "?"}`, async (api) => {
			const result = await api.createContent(fdc3ToContentInput(buildApp(form)));
			return [
				`Created "${result.id}" (uuid ${result.uuid})`,
				`${result.type} · active=${result.active} · featured=${result.featured}`
			];
		});
	});

	document.querySelector("#btnValidate")?.addEventListener("click", () => {
		const form = readForm();
		void run(`query content · ${form.contentId || "?"}`, async (api) => {
			const node = await api.getContentById(form.contentId);
			if (node === null) {
				return [`No app found with Content ID "${form.contentId}".`];
			}
			populateForm(node);
			return [
				`Found "${node.name}" (uuid ${node.uuid})`,
				`${node.type} · active=${node.active}`,
				"Loaded its current values into the form."
			];
		});
	});

	document.querySelector("#btnUpdate")?.addEventListener("click", () => {
		const form = readForm();
		void run(`mutation updateContent · ${form.contentId || "?"}`, async (api) => {
			const result = await api.updateContent(form.contentId, buildUpdate(form));
			return [`Updated "${result.name}"`, `active=${result.active} · featured=${result.featured}`];
		});
	});

	document.querySelector("#btnDelete")?.addEventListener("click", () => {
		const form = readForm();
		void run(`mutation deleteContent · ${form.contentId || "?"}`, async (api) => {
			const removed = await api.removeContent(form.contentId);
			return removed ? [`Deleted "${form.contentId}".`] : [`The server did not delete "${form.contentId}".`];
		});
	});

	document.querySelector("#btnClear")?.addEventListener("click", () => {
		if (logEl !== null) {
			logEl.replaceChildren();
			const empty = document.createElement("div");
			empty.className = "log__empty";
			empty.id = "logEmpty";
			empty.textContent = "Requests and their responses appear here.";
			logEl.append(empty);
		}
	});

	// --- first paint --------------------------------------------------------

	const endpoint = document.querySelector("#endpoint");
	if (endpoint !== null) {
		endpoint.textContent = `${BASE_URL === "" ? "{BASE_URL}" : BASE_URL}${ENDPOINT_PATH}`;
	}
	applyTypeVisibility();
	setSignedIn(undefined);

	if (hasAuthorizationResponse()) {
		// Back from the authorization server with a code (or an error).
		if (configured()) {
			completeSignIn(BASE_URL, CLIENT_ID)
				.then((token) => {
					setSignedIn(token);
					notice("Signed in. Your token is held in memory for this page only.", "info");
				})
				.catch(failSignIn);
		}
		return;
	}

	// Printed before the configuration check, deliberately: you need this value
	// to register the OAuth app that issues the client id, so it cannot depend
	// on already having one.
	notice(`OAuth redirect URI for OAuth app registration: ${redirectUri()}`, "info");

	if (configured()) {
		notice('Not signed in. Choose "Sign in" to authorize this page.', "info");
	} else {
		notice("OAuth is not configured, to use JWT instead paste an API JWT above", "info");
	}
}

window.addEventListener("DOMContentLoaded", initializeDOM);
