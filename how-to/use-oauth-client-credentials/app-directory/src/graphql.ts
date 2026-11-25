import { ContentApiError, codeToMessage, statusToMessage } from "./errors";
import { tryParseJson } from "./json";
import type { ClientCredentialsTokenSource } from "./oauth";

/** Every request in this sample goes to this one endpoint — reads and writes alike. */
export const ENDPOINT_PATH = "/here/api/graphql";

/** Construction options for the content client. */
export interface GraphQlTransportOptions {
	baseUrl: string;
	tokens: ClientCredentialsTokenSource;
}

/**
 * A response body. GraphQL uses `data`/`errors`; the gateway rejects requests
 * ahead of GraphQL with a flat `{ code, message }`, so both shapes live here.
 */
interface GraphQlEnvelope<T> {
	data?: T;
	errors?: { message: string; extensions?: { code?: string } }[];
	code?: string;
	message?: string;
}

/**
 * Sends GraphQL documents to the Content Configuration API and unwraps the two
 * error envelopes the HERE gateway can answer with.
 *
 * Retries once with a fresh token on HTTP 401, which covers a token that
 * expired between being issued and being used.
 */
export class GraphQlTransport {
	private readonly endpoint: string;

	private readonly tokens: ClientCredentialsTokenSource;

	/**
	 * Build a transport for one org.
	 * @param options The org and the token source.
	 */
	public constructor(options: GraphQlTransportOptions) {
		const baseUrl = options.baseUrl.replace(/\/$/u, "");
		this.endpoint = `${baseUrl}${ENDPOINT_PATH}`;
		this.tokens = options.tokens;
	}

	/**
	 * Send one GraphQL request and unwrap its `data`, throwing on any error shape.
	 * @param query The GraphQL document.
	 * @param variables The query variables.
	 * @returns The `data` member of the response.
	 * @throws ContentApiError if the request fails at the gateway or returns GraphQL errors.
	 */
	public async request<T>(query: string, variables?: { [key: string]: unknown }): Promise<T> {
		let response = await this.post(query, variables ?? {});
		if (response.status === 401) {
			await response.body?.cancel();
			this.tokens.invalidate();
			response = await this.post(query, variables ?? {});
		}

		// Failures arrive in two different envelopes, and either can accompany a
		// non-OK status: GraphQL answers malformed queries with 400 plus an
		// `errors` array, while the gateway rejects unauthenticated requests
		// before GraphQL runs with a flat `{ code, message }`. Read the body
		// first and dispatch on its shape — the server's own message is always
		// more specific than anything inferred from the status alone.
		const text = await response.text();
		const envelope = (tryParseJson(text) ?? {}) as GraphQlEnvelope<T>;

		if (envelope.errors !== undefined && envelope.errors.length > 0) {
			const first = envelope.errors[0];
			const code = first.extensions?.code;
			// Status 0 denotes a GraphQL-layer failure on an otherwise fine response.
			throw new ContentApiError(
				response.ok ? 0 : response.status,
				code === undefined ? first.message : codeToMessage(code, first.message),
				code
			);
		}

		if (!response.ok) {
			throw new ContentApiError(
				response.status,
				envelope.message ?? statusToMessage(response.status),
				envelope.code
			);
		}

		if (envelope.data === undefined) {
			throw new ContentApiError(0, "GraphQL response had no data.");
		}
		return envelope.data;
	}

	/**
	 * POST one GraphQL request with the current access token.
	 * @param query The GraphQL document.
	 * @param variables The query variables.
	 * @returns The raw response.
	 */
	private async post(query: string, variables: { [key: string]: unknown }): Promise<Response> {
		const token = await this.tokens.getAccessToken();
		return fetch(this.endpoint, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({ query, variables })
		});
	}
}
