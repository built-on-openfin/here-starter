import type { CredentialProvider } from "./auth";
import { ContentApiError, codeToMessage, statusToMessage } from "./errors";
import type {
	BulkUpdateEntry,
	ContentInput,
	ContentNode,
	ContentUpdate,
	WriteResult
} from "./types";

/** Construction options for the client. */
export interface ContentApiOptions {
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

interface ContentsQueryData {
	contents: {
		edges: { node: ContentNode }[];
		pageInfo: { hasNextPage: boolean; endCursor: string | null };
	};
}

/** Every request goes to this one endpoint — reads and writes alike. */
const ENDPOINT = "/here/api/graphql";

const NODE_FIELDS =
	"uuid id name type active featured icon createdAt " +
	"... on WebContent { url urls } ... on DesktopContent { desktopPath desktopArgs withSnap }";

/** Fields selected back from create/update mutations. */
const WRITE_FIELDS = "uuid id name type active featured";

/** The API rejects an update with no fields, so fail early with a clearer message. */
function assertNonEmptyUpdate(input: ContentUpdate, identifier: string): void {
	if (Object.keys(input).length === 0) {
		throw new ContentApiError(0, `Update for "${identifier}" is empty — include at least one field.`);
	}
}

/** Client for the HERE Content Configuration API (GraphQL queries and mutations). */
export class ContentApiClient {
	private readonly baseUrl: string;
	private readonly auth: CredentialProvider;
	private readonly fetchImpl: typeof fetch;

	public constructor(options: ContentApiOptions) {
		this.baseUrl = options.baseUrl.replace(/\/$/u, "");
		this.auth = options.auth;
		// The native `fetch` must keep its original receiver: calling it as
		// `this.fetchImpl(...)` would rebind `this` and throw "Illegal invocation".
		this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
	}

	/** List every app in the directory, following GraphQL pagination. */
	public async listContents(pageSize = 50): Promise<ContentNode[]> {
		const nodes: ContentNode[] = [];
		let after: string | null = null;
		let hasNext = true;

		while (hasNext) {
			const query =
				`query($first: Int!, $after: String) { contents(first: $first, after: $after) ` +
				`{ edges { node { ${NODE_FIELDS} } } pageInfo { hasNextPage endCursor } } }`;
			const data: ContentsQueryData = await this.graphql<ContentsQueryData>(query, {
				first: pageSize,
				after
			});

			for (const edge of data.contents.edges) {
				nodes.push(edge.node);
			}
			hasNext = data.contents.pageInfo.hasNextPage;
			after = data.contents.pageInfo.endCursor;
		}

		return nodes;
	}

	/** Look up a single app by its human-readable content ID. Null if it does not exist. */
	public async getContentById(contentId: string): Promise<ContentNode | null> {
		const query = `query($id: ID!) { content(id: $id) { ${NODE_FIELDS} } }`;
		return this.lookup(query, { id: contentId });
	}

	/** Look up a single app by its system UUID. Null if it does not exist. */
	public async getContentByUuid(uuid: string): Promise<ContentNode | null> {
		const query = `query($uuid: ID!) { content(uuid: $uuid) { ${NODE_FIELDS} } }`;
		return this.lookup(query, { uuid });
	}

	/**
	 * Run a single-app lookup.
	 *
	 * A missing app comes back as a NOT_FOUND error rather than `content: null`,
	 * so translate that one case — "does this app exist?" deserves an answer,
	 * not an exception. Every other failure still throws.
	 */
	private async lookup(
		query: string,
		variables: Record<string, unknown>
	): Promise<ContentNode | null> {
		try {
			return (await this.graphql<{ content: ContentNode | null }>(query, variables)).content;
		} catch (err) {
			if (err instanceof ContentApiError && err.code === "NOT_FOUND") {
				return null;
			}
			throw err;
		}
	}

	/** Create a new application definition. */
	public async createContent(input: ContentInput): Promise<WriteResult> {
		const query =
			`mutation CreateContent($input: CreateContentInput!) ` +
			`{ createContent(input: $input) { ${WRITE_FIELDS} } }`;
		return (await this.graphql<{ createContent: WriteResult }>(query, { input }))
			.createContent;
	}

	/**
	 * Update an existing application definition.
	 *
	 * `identifier` is the app's contentId or its uuid — either works. Updates are
	 * partial: send only the fields you want to change. The API rejects an empty
	 * update, so `input` must carry at least one field.
	 */
	public async updateContent(identifier: string, input: ContentUpdate): Promise<WriteResult> {
		assertNonEmptyUpdate(input, identifier);
		const query =
			`mutation UpdateContent($identifier: ID!, $input: UpdateContentInput!) ` +
			`{ updateContent(identifier: $identifier, input: $input) { ${WRITE_FIELDS} } }`;
		return (await this.graphql<{ updateContent: WriteResult }>(query, { identifier, input }))
			.updateContent;
	}

	/**
	 * Permanently delete an application definition by contentId or uuid.
	 * Access permissions and dock entries referencing it are cleaned up too.
	 */
	public async removeContent(identifier: string): Promise<boolean> {
		const query = `mutation DeleteContent($identifier: ID!) { deleteContent(identifier: $identifier) }`;
		return (await this.graphql<{ deleteContent: boolean }>(query, { identifier }))
			.deleteContent;
	}

	/**
	 * Create many apps in one request.
	 *
	 * Bulk operations are all-or-nothing: if any item fails validation, nothing
	 * in the batch is saved.
	 */
	public async createContents(inputs: ContentInput[]): Promise<WriteResult[]> {
		const query =
			`mutation BulkCreate($inputs: [CreateContentInput!]!) ` +
			`{ createContents(inputs: $inputs) { created { ${WRITE_FIELDS} } } }`;
		return (await this.graphql<{ createContents: { created: WriteResult[] } }>(query, { inputs }))
			.createContents.created;
	}

	/** Update many apps in one all-or-nothing request. */
	public async updateContents(inputs: BulkUpdateEntry[]): Promise<WriteResult[]> {
		for (const entry of inputs) {
			assertNonEmptyUpdate(entry.update, entry.identifier);
		}
		const query =
			`mutation BulkUpdate($inputs: [BulkUpdateContentInput!]!) ` +
			`{ updateContents(inputs: $inputs) { updated { ${WRITE_FIELDS} } } }`;
		return (await this.graphql<{ updateContents: { updated: WriteResult[] } }>(query, { inputs }))
			.updateContents.updated;
	}

	/** Delete many apps in one all-or-nothing request. Returns the deleted UUIDs. */
	public async deleteContents(identifiers: string[]): Promise<string[]> {
		const query =
			`mutation BulkDelete($identifiers: [ID!]!) ` +
			`{ deleteContents(identifiers: $identifiers) { deleted } }`;
		return (await this.graphql<{ deleteContents: { deleted: string[] } }>(query, { identifiers }))
			.deleteContents.deleted;
	}

	private async graphql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
		const auth = this.auth.apply();
		const response = await this.fetchImpl(`${this.baseUrl}${ENDPOINT}`, {
			method: "POST",
			headers: { "Content-Type": "application/json", ...(auth.headers ?? {}) },
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
