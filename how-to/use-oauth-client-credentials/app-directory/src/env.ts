import { existsSync } from "node:fs";
import { resolve } from "node:path";

/** The settings every script needs to obtain a token and call an API. */
export interface ClientConfig {
	/** Your HERE domain, no trailing slash. */
	baseUrl: string;
	clientId: string;
	clientSecret: string;
}

/**
 * Load `.env` from the folder the script is run in, if present. Variables already set in the
 * shell take precedence, so a scheduler or CI job can inject them directly.
 */
function loadDotEnv(): void {
	const envPath = resolve(process.cwd(), ".env");
	if (existsSync(envPath)) {
		process.loadEnvFile(envPath);
	}
}

/**
 * Read an optional setting.
 * @param name The environment variable to read.
 * @returns The trimmed value, or undefined when it is not set or empty.
 */
function readEnv(name: string): string | undefined {
	const value = (process.env[name] ?? "").trim();
	return value === "" ? undefined : value;
}

/**
 * Read a required setting, failing with a message that names it.
 * @param name The environment variable to read.
 * @returns The trimmed value.
 * @throws Error if the variable is missing or empty.
 */
function requireEnv(name: string): string {
	const value = readEnv(name);
	if (value === undefined) {
		throw new Error(`${name} is not set. Copy .env.example to .env and fill it in, or set it in the shell.`);
	}
	return value;
}

/**
 * Load `.env` and read the OAuth client settings.
 * @returns The client settings.
 * @throws Error if any of them is missing.
 */
export function readClientConfig(): ClientConfig {
	loadDotEnv();
	return {
		baseUrl: requireEnv("BASE_URL").replace(/\/+$/u, ""),
		clientId: requireEnv("HERE_CLIENT_ID"),
		clientSecret: requireEnv("HERE_CLIENT_SECRET")
	};
}
