import { ContentApiError } from "./errors";
import { GraphQlTransport } from "./graphql";
import type { GraphQlTransportOptions } from "./graphql";
import type { BulkUpdateEntry, ContentInput, ContentNode, ContentUpdate, WriteResult } from "./types";

/** Construction options for the client. */
export type ContentApiOptions = GraphQlTransportOptions;

/** Shape of one page of the `contents` query. */
interface ContentsQueryData {
	contents: {
		edges: { node: ContentNode }[];
		pageInfo: { hasNextPage: boolean; endCursor: string | null };
	};
}

// Re-exported so callers that only deal with content keep one import. The
// endpoint is shared by every client in this sample, so it is defined once in
// `graphql.ts`.
export { ENDPOINT_PATH } from "./graphql";

/**
 * Selects the fields `fdc3ToContentInput` can write, so a node round-trips
 * through `contentNodeToFdc3Application` without silently dropping settings.
 *
 * Two fields are deliberately not read back:
 *
 * - `access` comes back as org-specific subject/permission UUIDs unlikely to
 * mean anything in a different org, so the reverse mapper leaves it out even
 * though it *is* fetched here.
 * - `interop` is **write-only** in the deployed schema: `CreateContentInput`
 * and `UpdateContentInput` both accept it, but `WebContent` and
 * `DesktopContent` do not expose it, so selecting it fails the whole query
 * with `Cannot query field "interop" on type "WebContent"`. Writes still send
 * it (see `fdc3ToContentInput`); it simply cannot be read back, which means an
 * export → sync round-trip does not preserve interop declarations. If a later
 * schema version adds the field, add it back to both fragments here and the
 * reverse mapper picks it up with no other change.
 */
const NODE_FIELDS =
	"uuid id name type active featured icon createdAt customLabel " +
	"access { subjects primitives } " +
	"... on WebContent { " +
	"url urls hereApiAccess allowDuplication allowOpenWithDefaultBrowser useAIContext enableSimpleWindow " +
	"environmentAvailability { enableHereEB enableHereZero enableHereMobile } " +
	"viewSettings { navigationControls reloadControl } " +
	"dataLossPreventionSettings { copyBehavior pasteBehavior screenCaptureBehavior printBehavior } " +
	"} " +
	"... on DesktopContent { desktopPath desktopArgs withSnap }";

/** Fields selected back from create/update mutations. */
const WRITE_FIELDS = "uuid id name type active featured";

/**
 * Shape a full create body into a partial update body.
 *
 * `contentType` and `contentId` identify an app and cannot be changed, so they
 * are always dropped. `access` is dropped unless `keepAccess` is set: callers
 * that build an input from a manifest or a form get the mapper's default of
 * `{ subjects: [], primitives: [] }`, and sending that would strip every
 * existing assignment rather than leave it alone.
 */
export function toContentUpdate(input: ContentInput, options?: { keepAccess?: boolean }): ContentUpdate {
	const { contentType, contentId, access, ...rest } = input;
	void contentType;
	void contentId;
	return options?.keepAccess === true ? { ...rest, access } : rest;
}

/**
 * The API rejects an update with no fields, so fail early with a clearer message.
 * @throws {ContentApiError} if `input` has no fields set.
 */
function assertNonEmptyUpdate(input: ContentUpdate, identifier: string): void {
	if (Object.keys(input).length === 0) {
		throw new ContentApiError(0, `Update for "${identifier}" is empty — include at least one field.`);
	}
}

/** Client for the HERE Content Configuration API (GraphQL queries and mutations). */
export class ContentApiClient {
	private readonly transport: GraphQlTransport;

	/** Build a client for one org, using the given credential provider. */
	public constructor(options: ContentApiOptions) {
		this.transport = new GraphQlTransport(options);
	}

	/** List every app in the directory, following GraphQL pagination. */
	public async listContents(pageSize = 50): Promise<ContentNode[]> {
		const nodes: ContentNode[] = [];
		let after: string | null = null;
		let hasNext = true;

		while (hasNext) {
			const query =
				"query($first: Int!, $after: String) { contents(first: $first, after: $after) " +
				`{ edges { node { ${NODE_FIELDS} } } pageInfo { hasNextPage endCursor } } }`;
			const data: ContentsQueryData = await this.transport.request<ContentsQueryData>(query, {
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

	/** Create a new application definition. */
	public async createContent(input: ContentInput): Promise<WriteResult> {
		const query =
			"mutation CreateContent($input: CreateContentInput!) " +
			`{ createContent(input: $input) { ${WRITE_FIELDS} } }`;
		const data = await this.transport.request<{ createContent: WriteResult }>(query, { input });
		return data.createContent;
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
			"mutation UpdateContent($identifier: ID!, $input: UpdateContentInput!) " +
			`{ updateContent(identifier: $identifier, input: $input) { ${WRITE_FIELDS} } }`;
		const data = await this.transport.request<{ updateContent: WriteResult }>(query, { identifier, input });
		return data.updateContent;
	}

	/**
	 * Permanently delete an application definition by contentId or uuid.
	 * Access permissions and dock entries referencing it are cleaned up too.
	 */
	public async removeContent(identifier: string): Promise<boolean> {
		const query = "mutation DeleteContent($identifier: ID!) { deleteContent(identifier: $identifier) }";
		const data = await this.transport.request<{ deleteContent: boolean }>(query, { identifier });
		return data.deleteContent;
	}

	/**
	 * Create many apps in one request.
	 *
	 * Bulk operations are all-or-nothing: if any item fails validation, nothing
	 * in the batch is saved.
	 */
	public async createContents(inputs: ContentInput[]): Promise<WriteResult[]> {
		const query =
			"mutation BulkCreate($inputs: [CreateContentInput!]!) " +
			`{ createContents(inputs: $inputs) { created { ${WRITE_FIELDS} } } }`;
		const data = await this.transport.request<{ createContents: { created: WriteResult[] } }>(query, {
			inputs
		});
		return data.createContents.created;
	}

	/** Update many apps in one all-or-nothing request. */
	public async updateContents(inputs: BulkUpdateEntry[]): Promise<WriteResult[]> {
		for (const entry of inputs) {
			assertNonEmptyUpdate(entry.update, entry.identifier);
		}
		const query =
			"mutation BulkUpdate($inputs: [BulkUpdateContentInput!]!) " +
			`{ updateContents(inputs: $inputs) { updated { ${WRITE_FIELDS} } } }`;
		const data = await this.transport.request<{ updateContents: { updated: WriteResult[] } }>(query, {
			inputs
		});
		return data.updateContents.updated;
	}

	/** Delete many apps in one all-or-nothing request. Returns the deleted UUIDs. */
	public async deleteContents(identifiers: string[]): Promise<string[]> {
		const query =
			"mutation BulkDelete($identifiers: [ID!]!) " +
			"{ deleteContents(identifiers: $identifiers) { deleted } }";
		const data = await this.transport.request<{ deleteContents: { deleted: string[] } }>(query, {
			identifiers
		});
		return data.deleteContents.deleted;
	}

	/**
	 * Run a single-app lookup.
	 *
	 * A missing app comes back as a NOT_FOUND error rather than `content: null`,
	 * so translate that one case — "does this app exist?" deserves an answer,
	 * not an exception. Every other failure still throws.
	 */
	private async lookup(query: string, variables: { [key: string]: unknown }): Promise<ContentNode | null> {
		try {
			const data = await this.transport.request<{ content: ContentNode | null }>(query, variables);
			return data.content;
		} catch (err) {
			if (err instanceof ContentApiError && err.code === "NOT_FOUND") {
				return null;
			}
			throw err;
		}
	}
}
