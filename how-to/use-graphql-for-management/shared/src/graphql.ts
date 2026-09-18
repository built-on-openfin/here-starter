import type { CredentialProvider } from "./auth";
import { ContentApiError, codeToMessage, statusToMessage } from "./errors";

/** Every request in this sample goes to this one endpoint — reads and writes alike. */
export const ENDPOINT_PATH = "/here/api/graphql";

/** Construction options shared by every client built on this transport. */
export interface GraphQlTransportOptions {
	baseUrl: string;
	auth: CredentialProvider;
	fetchImpl?: typeof fetch;
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
 * Sends GraphQL documents to one org and unwraps the two error envelopes the
 * HERE gateway can answer with.
 *
 * Extracted so the content client and the user/group client share one copy of
 * that error handling: the dispatch below is subtle enough that a second
 * hand-written version would drift, and every client wants the same behaviour.
 * Swap `fetchImpl` in tests; everything else is stateless per request.
 */
export class GraphQlTransport {
	private readonly baseUrl: string;

	private readonly auth: CredentialProvider;

	private readonly fetchImpl: typeof fetch;

	/** Build a transport for one org, using the given credential provider. */
	public constructor(options: GraphQlTransportOptions) {
		this.baseUrl = options.baseUrl.replace(/\/$/u, "");
		this.auth = options.auth;
		// The native `fetch` must keep its original receiver: calling it as
		// `this.fetchImpl(...)` would rebind `this` and throw "Illegal invocation".
		this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}

	/** Send one GraphQL request and unwrap its `data`, throwing on any error shape. */
	public async request<T>(query: string, variables?: { [key: string]: unknown }): Promise<T> {
		const auth = await this.auth.apply();
		const response = await this.fetchImpl(`${this.baseUrl}${ENDPOINT_PATH}`, {
			method: "POST",
			headers: { "Content-Type": "application/json", ...auth.headers },
			credentials: auth.credentials,
			body: JSON.stringify({ query, variables })
		});

		// Failures arrive in two different envelopes, and either can accompany a
		// non-OK status: GraphQL answers malformed queries with 400 plus an
		// `errors` array, while the gateway rejects unauthenticated requests
		// before GraphQL runs with a flat `{ code, message }`. Read the body
		// first and dispatch on its shape — the server's own message is always
		// more specific than anything inferred from the status alone.
		const envelope = (await this.readBody<T>(response)) ?? {};

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
			// A gateway rejection: surface its message and code verbatim.
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

	/** Read a JSON body, tolerating a non-JSON or empty response. */
	private async readBody<T>(response: Response): Promise<GraphQlEnvelope<T> | undefined> {
		try {
			return (await response.json()) as GraphQlEnvelope<T>;
		} catch {
			return undefined;
		}
	}
}
