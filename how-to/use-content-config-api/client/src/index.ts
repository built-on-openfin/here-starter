import { BearerTokenAuth } from "../../shared/src/auth";
import { ContentApiClient } from "../../shared/src/content-api";
import { ContentApiError } from "../../shared/src/errors";
import { fdc3ToContentInput } from "../../shared/src/fdc3-mapping";
import {
	beginSignIn,
	completeSignIn,
	hasAuthorizationResponse,
	OAuthError,
	redirectUri
} from "../../shared/src/oauth-pkce";
import type { ContentNode, ContentUpdate, Fdc3Application } from "../../shared/src/types";

/**
 * Injected at build time by webpack from `.env` — see `.env.example`.
 *
 * Neither value is a secret. The client id is public by design, and the UI has
 * no token until the user signs in through HERE, so nothing sensitive is
 * readable in this bundle.
 */
const BASE_URL = process.env.BASE_URL ?? "";
const CLIENT_ID = process.env.HERE_OAUTH_CLIENT_ID ?? "";

/** Every request — read or write — goes to this one endpoint. */
const ENDPOINT_PATH = "/here/api/graphql";

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

function initializeDOM(): void {
	// Held in memory only, so closing or reloading the page ends the session.
	// There is no refresh grant, so an expired token means signing in again.
	let client: ContentApiClient | undefined;

	const logEl = document.querySelector<HTMLElement>("#log");

	// --- sign-in state ------------------------------------------------------

	const ACTION_IDS = ["#btnList", "#btnCreate", "#btnValidate", "#btnUpdate", "#btnDelete"];

	function setSignedIn(token: string | undefined): void {
		client =
			token === undefined
				? undefined
				: new ContentApiClient({ baseUrl: BASE_URL, auth: new BearerTokenAuth(token) });

		for (const id of ACTION_IDS) {
			const button = document.querySelector<HTMLButtonElement>(id);
			if (button !== null) {
				button.disabled = token === undefined;
			}
		}
		document.querySelector("#btnSignIn")?.classList.toggle("hidden", token !== undefined);
		document.querySelector("#authState")?.classList.toggle("hidden", token === undefined);
	}

	/** Report an OAuth failure in the transcript and return to signed out. */
	function failSignIn(err: unknown): void {
		notice(err instanceof OAuthError ? err.message : String(err), "error");
		setSignedIn(undefined);
	}

	// --- reading and building from the form ---------------------------------

	function text(id: string): string {
		return (document.querySelector<HTMLInputElement>(id)?.value ?? "").trim();
	}

	function checked(id: string): boolean {
		return document.querySelector<HTMLInputElement>(id)?.checked ?? false;
	}

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
	 * Build a partial update from the form. Identity fields cannot change, and
	 * access is dropped deliberately: the mapper defaults it to an empty object,
	 * and sending that would wipe an app's existing assignments. The form has no
	 * access editor, so it never touches access.
	 */
	function buildUpdate(form: FormState): ContentUpdate {
		const { contentType, contentId, access, ...rest } = fdc3ToContentInput(buildApp(form));
		void contentType;
		void contentId;
		void access;
		return rest;
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

	function setValue(id: string, value: string): void {
		const field = document.querySelector<HTMLInputElement | HTMLSelectElement>(id);
		if (field !== null) {
			field.value = value;
		}
	}

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

	function notice(message: string, kind: "error" | "info"): void {
		document.querySelector("#logEmpty")?.remove();
		const entry = document.createElement("div");
		entry.className = kind === "error" ? "log-entry is-error" : "log-entry";
		entry.append(span("log-label", message));
		logEl?.append(entry);
		scrollToLatest();
	}

	function span(className: string, content: string): HTMLSpanElement {
		const el = document.createElement("span");
		el.className = className;
		el.textContent = content;
		return el;
	}

	function scrollToLatest(): void {
		const body = logEl?.parentElement;
		if (body != null) {
			body.scrollTop = body.scrollHeight;
		}
	}

	// --- wiring -------------------------------------------------------------

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
	 * Run one API call, logging the request and resolving it to OK or error.
	 *
	 * The client is handed to the callback rather than read from the closure, so
	 * the signed-in check happens in one place and callers get a non-optional
	 * client to work with.
	 */
	async function run(
		label: string,
		call: (api: ContentApiClient) => Promise<string[]>
	): Promise<void> {
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

	document.querySelector("#f-type")?.addEventListener("change", applyTypeVisibility);

	document.querySelector("#btnList")?.addEventListener("click", () => {
		void run("query contents", async (api) => {
			const nodes = await api.listContents();
			if (nodes.length === 0) {
				return ["Your directory has no apps yet."];
			}
			const rows = nodes.map(
				(n) => `• ${n.name}  [${n.id}]  ${n.type}  ${n.active ? "active" : "inactive"}`
			);
			return [`${nodes.length} app(s):`, ...rows];
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
			return removed
				? [`Deleted "${form.contentId}".`]
				: [`The server did not delete "${form.contentId}".`];
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
	notice(`Register this exact redirect URI in your admin console: ${redirectUri()}`, "info");

	if (configured()) {
		notice(`Not signed in. Choose "Sign in" to authorize this page.`, "info");
	}
}

window.addEventListener("DOMContentLoaded", initializeDOM);
