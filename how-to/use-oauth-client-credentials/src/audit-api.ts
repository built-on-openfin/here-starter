import { ApiRequestError } from "./api-request-error";
import { tryParseJson } from "./json";
import type { ClientCredentialsTokenSource } from "./oauth";

/**
 * One Audit API record: an administrator (or system) change made through the Admin Console.
 * `metadata` holds before and after values and its shape varies by `resourceType`, so treat
 * it as opaque JSON rather than binding it to a schema.
 */
export interface AuditRecord {
	id: number;
	resourceType: string;
	resourceId: string;
	changeType: string;
	actorType: string;
	actorId: string;
	timestamp: string;
	metadata: unknown;
}

/** An inclusive time window, as ISO 8601 strings with an explicit offset. */
export interface TimeWindow {
	from: string;
	to: string;
}

/** The shape of one page of the `audits` connection. */
interface AuditPage {
	edges: { node: AuditRecord; cursor: string }[];
	pageInfo: { hasNextPage: boolean; endCursor: string | null };
	totalCount: number;
}

/** The GraphQL response envelope. */
interface GraphQLResponse<T> {
	data?: T;
	errors?: { message: string; extensions?: { code?: string } }[];
}

/** The largest page the Audit API will return. */
const PAGE_SIZE = 100;

/**
 * Oldest first, so records come back in the order they happened. `actorType` is left unset on
 * purpose: the Admin Console's Audit Viewer filters to user actions only, but a collector wants
 * system-generated records too.
 */
const AUDITS_QUERY = `
query PullAudits($first: Int, $after: String, $fromTimestamp: String, $toTimestamp: String) {
	audits(
		first: $first
		after: $after
		fromTimestamp: $fromTimestamp
		toTimestamp: $toTimestamp
		orderBy: "timestamp"
		orderDirection: "asc"
	) {
		edges {
			node { id resourceType resourceId changeType actorType actorId timestamp metadata }
			cursor
		}
		pageInfo { hasNextPage endCursor }
		totalCount
	}
}`;

/**
 * When a record happened, in milliseconds since the epoch. Audit timestamps are UTC but can
 * come back without an offset (for example `2026-01-31 09:30:00.123456`), which `Date.parse`
 * would read as local time, so a missing offset is treated as UTC.
 * @param record The audit record.
 * @returns The record's time.
 * @throws Error if the timestamp cannot be read.
 */
export function auditRecordTime(record: AuditRecord): number {
	const { id, timestamp } = record;
	const hasOffset = /(?:z|[+-]\d{2}:?\d{2})$/i.test(timestamp);
	const time = Date.parse(hasOffset ? timestamp : `${timestamp.replace(" ", "T")}Z`);
	if (Number.isNaN(time)) {
		throw new TypeError(`Audit record ${id} has an unreadable timestamp "${timestamp}"`);
	}
	return time;
}

/** Calls the Audit API at `/audit/api/graphql` with bearer tokens from a token source. */
export class AuditApi {
	private readonly endpoint: string;

	private readonly tokens: ClientCredentialsTokenSource;

	/**
	 * Create a client for one HERE environment.
	 * @param baseUrl Your HERE domain, no trailing slash.
	 * @param tokens Where access tokens come from.
	 */
	public constructor(baseUrl: string, tokens: ClientCredentialsTokenSource) {
		this.endpoint = `${baseUrl}/audit/api/graphql`;
		this.tokens = tokens;
	}

	/**
	 * Send one GraphQL request. Retries once with a fresh token on HTTP 401, which covers a
	 * token that expired between being issued and being used.
	 * @param query The GraphQL document.
	 * @param variables The query variables.
	 * @returns The `data` member of the response.
	 * @throws ApiRequestError if the request fails at the gateway or returns GraphQL errors.
	 */
	public async query<T>(query: string, variables: { [key: string]: unknown } = {}): Promise<T> {
		let response = await this.post(query, variables);
		if (response.status === 401) {
			await response.body?.cancel();
			this.tokens.invalidate();
			response = await this.post(query, variables);
		}

		// Authentication and permission failures are answered by the gateway before GraphQL runs,
		// so the body may not be GraphQL-shaped. Handle both.
		const text = await response.text();
		const payload = tryParseJson(text) as GraphQLResponse<T> | undefined;

		const firstError = payload?.errors?.[0];
		if (firstError) {
			throw new ApiRequestError(firstError.message, response.status, firstError.extensions?.code);
		}
		if (!response.ok || !payload?.data) {
			throw new ApiRequestError(
				`Audit API returned HTTP ${response.status}: ${text.slice(0, 200)}`,
				response.status
			);
		}
		return payload.data;
	}

	/**
	 * Read every audit record in a window, oldest first, following the cursor to the last page.
	 * @param window The window to read. Both ends are inclusive on the server.
	 * @returns The records, in timestamp order.
	 * @throws ApiRequestError if a page cannot be read.
	 */
	public async readWindow(window: TimeWindow): Promise<AuditRecord[]> {
		const records: AuditRecord[] = [];
		let after: string | null = null;
		let hasNextPage = true;
		while (hasNextPage) {
			const data: { audits: AuditPage } = await this.query<{ audits: AuditPage }>(AUDITS_QUERY, {
				first: PAGE_SIZE,
				after,
				fromTimestamp: window.from,
				toTimestamp: window.to
			});
			records.push(...data.audits.edges.map((edge) => edge.node));
			({ hasNextPage, endCursor: after } = data.audits.pageInfo);
			if (hasNextPage && !after) {
				throw new ApiRequestError("The Audit API reported another page but no cursor to reach it", 200);
			}
		}
		return records;
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
