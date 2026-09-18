import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { BearerTokenAuth, CookieHeaderAuth } from "../shared/src/auth";
import type { CredentialProvider } from "../shared/src/auth";

/** Load `.env` from the workspace root if present. Shared by every script entry point. */
export function loadDotEnv(): void {
	// Real environment variables already set in the shell take precedence, so
	// CI can inject them directly.
	const envPath = resolve(dirname(fileURLToPath(import.meta.url)), "..", ".env");
	if (existsSync(envPath)) {
		process.loadEnvFile(envPath);
	}
}

/**
 * Pick a credential provider from the environment. An API JWT is the
 * recommended credential; the here-session cookie is a convenience for local
 * runs (Node only — it cannot be used from the browser).
 *
 * The browser UI signs in with OAuth (or a pasted JWT), but that flow
 * redirects a user through a consent screen, so it has nothing to offer a
 * headless script.
 */
export function resolveAuth(): CredentialProvider | undefined {
	const jwt = process.env.HERE_API_JWT ?? "";
	if (jwt !== "") {
		const authConfigId = process.env.HERE_AUTH_ID;
		return new BearerTokenAuth(jwt, authConfigId === "" ? undefined : authConfigId);
	}

	const session = process.env.HERE_SESSION ?? "";
	if (session !== "") {
		return new CookieHeaderAuth(session);
	}

	return undefined;
}
