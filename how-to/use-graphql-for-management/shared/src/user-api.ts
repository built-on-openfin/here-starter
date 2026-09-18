import { ContentApiError } from "./errors";
import { GraphQlTransport } from "./graphql";
import type { GraphQlTransportOptions } from "./graphql";
import type { Group, GroupSwitchResult, User } from "./types";

/** Construction options for the user/group client. */
export type UserApiOptions = GraphQlTransportOptions;

/** Fields selected for a group. `Group` has no `name` — `id` is the readable one. */
const GROUP_FIELDS = "uuid id description";

/** Fields selected for a user, without their group memberships. */
const USER_FIELDS = "uuid id email firstName lastName active";

/** A Relay-style connection, the shape every list in this API comes back as. */
interface Connection<T> {
	totalCount?: number;
	edges: { node: T }[];
	pageInfo: { hasNextPage: boolean; endCursor: string | null };
}

/** The raw group shape, whose `users` sub-connection carries the member count. */
interface GroupNode {
	uuid: string;
	id: string;
	description?: string;
	users?: { totalCount?: number };
}

/** The raw user shape, whose `groups` sub-connection carries memberships. */
interface UserNode {
	uuid: string;
	id: string;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	active: boolean;
	groups?: Connection<GroupNode>;
}

/** Flatten a connection's `edges { node }` into a plain array. */
function nodesOf<T>(connection: Connection<T> | undefined): T[] {
	return (connection?.edges ?? []).map((edge) => edge.node);
}

/** Map a raw group node onto the domain type, lifting the nested member count. */
function toGroup(node: GroupNode): Group {
	return {
		uuid: node.uuid,
		id: node.id,
		description: node.description,
		memberCount: node.users?.totalCount
	};
}

/** Map a raw user node onto the domain type, flattening its group connection. */
function toUser(node: UserNode): User {
	return {
		uuid: node.uuid,
		id: node.id,
		email: node.email,
		firstName: node.firstName,
		lastName: node.lastName,
		active: node.active,
		groups: node.groups === undefined ? undefined : nodesOf(node.groups).map((group) => toGroup(group))
	};
}

/**
 * Client for the HERE User and Group API (GraphQL queries and mutations).
 *
 * Group membership is a **set**: a user can belong to many groups at once, and
 * the API exposes only add and remove. There is no atomic "move" or "set the
 * groups to exactly this list", so anything that looks like moving a user is
 * composed from those two primitives — see `switchGroup`.
 *
 * Shares `GraphQlTransport` with `ContentApiClient`, so both speak to the same
 * endpoint with the same credential and the same error handling.
 */
export class UserApiClient {
	private readonly transport: GraphQlTransport;

	/** Build a client for one org, using the given credential provider. */
	public constructor(options: UserApiOptions) {
		this.transport = new GraphQlTransport(options);
	}

	/**
	 * List every group in the org, following pagination.
	 *
	 * Each group's member count comes from its nested `users { totalCount }`
	 * rather than a second round of queries.
	 */
	public async listGroups(pageSize = 50): Promise<Group[]> {
		const groups: Group[] = [];
		let after: string | null = null;
		let hasNext = true;

		while (hasNext) {
			const query =
				"query($first: Int!, $after: String) { groups(first: $first, after: $after) " +
				`{ edges { node { ${GROUP_FIELDS} users { totalCount } } } pageInfo { hasNextPage endCursor } } }`;
			// Annotated explicitly: `after` is reassigned from `data` below, so
			// leaving this inferred makes the type circular (TS7022).
			const data: { groups: Connection<GroupNode> } = await this.transport.request<{
				groups: Connection<GroupNode>;
			}>(query, { first: pageSize, after });

			for (const node of nodesOf(data.groups)) {
				groups.push(toGroup(node));
			}
			hasNext = data.groups.pageInfo.hasNextPage;
			after = data.groups.pageInfo.endCursor;
		}

		return groups;
	}

	/**
	 * List every user in the org, following pagination.
	 *
	 * Group memberships are deliberately not fetched here: they would add a
	 * nested connection per user for a list that is mostly used to populate a
	 * picker. Use `getUser` for one user's memberships.
	 */
	public async listUsers(pageSize = 50): Promise<User[]> {
		const users: User[] = [];
		let after: string | null = null;
		let hasNext = true;

		while (hasNext) {
			const query =
				"query($first: Int!, $after: String) { users(first: $first, after: $after) " +
				`{ edges { node { ${USER_FIELDS} } } pageInfo { hasNextPage endCursor } } }`;
			// Same explicit annotation as `listGroups`, for the same reason.
			const data: { users: Connection<UserNode> } = await this.transport.request<{
				users: Connection<UserNode>;
			}>(query, { first: pageSize, after });

			for (const node of nodesOf(data.users)) {
				users.push(toUser(node));
			}
			hasNext = data.users.pageInfo.hasNextPage;
			after = data.users.pageInfo.endCursor;
		}

		return users;
	}

	/**
	 * Read one user and the groups they belong to. Null if no such user exists.
	 *
	 * `lookupBy` picks which argument to send, because the API names them
	 * separately — `user(id: …)` for the readable identifier, `user(uuid: …)`
	 * for the system id — rather than taking one generic `identifier`.
	 */
	public async getUser(identifier: string, lookupBy: "id" | "uuid" = "id"): Promise<User | null> {
		const query =
			`query($value: ID!) { user(${lookupBy}: $value) ` +
			`{ ${USER_FIELDS} groups { totalCount edges { node { ${GROUP_FIELDS} } } } } }`;
		try {
			const data = await this.transport.request<{ user: UserNode | null }>(query, { value: identifier });
			return data.user === null ? null : toUser(data.user);
		} catch (err) {
			// A missing user comes back as NOT_FOUND rather than `user: null`, so
			// translate that one case — "does this user exist?" deserves an
			// answer, not an exception. Every other failure still throws.
			if (err instanceof ContentApiError && err.code === "NOT_FOUND") {
				return null;
			}
			throw err;
		}
	}

	/** Add one user to one group. Both arguments accept an `id` or a `uuid`. */
	public async addUserToGroup(userIdentifier: string, groupIdentifier: string): Promise<User> {
		const query =
			"mutation AddUserToGroup($user: ID!, $group: ID!) " +
			`{ addUserToGroup(userIdentifier: $user, groupIdentifier: $group) { ${USER_FIELDS} } }`;
		const data = await this.transport.request<{ addUserToGroup: UserNode }>(query, {
			user: userIdentifier,
			group: groupIdentifier
		});
		return toUser(data.addUserToGroup);
	}

	/** Remove one user from one group. Both arguments accept an `id` or a `uuid`. */
	public async removeUserFromGroup(userIdentifier: string, groupIdentifier: string): Promise<User> {
		const query =
			"mutation RemoveUserFromGroup($user: ID!, $group: ID!) " +
			`{ removeUserFromGroup(userIdentifier: $user, groupIdentifier: $group) { ${USER_FIELDS} } }`;
		const data = await this.transport.request<{ removeUserFromGroup: UserNode }>(query, {
			user: userIdentifier,
			group: groupIdentifier
		});
		return toUser(data.removeUserFromGroup);
	}

	/**
	 * Move a user from one group to another.
	 *
	 * This is the operation most people picture as a single call, so it is worth
	 * being explicit that the API has no such call: there is no
	 * `moveUserToGroup`, `changeUserGroup` or `setUserGroup`, only add and
	 * remove. A switch is therefore **two mutations and is not atomic** — there
	 * is no transaction to roll back, unlike the content API's bulk writes.
	 *
	 * The order is deliberate: **add first, then remove.** If the second step
	 * fails, the user is in both groups — holding slightly more access than
	 * intended, and one retried remove away from correct. Removing first would
	 * fail the other way, leaving the user in neither group with less access
	 * than they started with, which in a desktop container means apps
	 * disappearing for someone who did nothing wrong. Over-permissioned for a
	 * moment beats locked out, and `partialFailure` reports it loudly either
	 * way.
	 * @throws {ContentApiError} if the add fails, in which case nothing changed.
	 * @throws {Error} if the two groups are the same, which would otherwise add
	 * and then immediately remove the user, leaving them outside the group they
	 * started in.
	 */
	public async switchGroup(
		userIdentifier: string,
		fromGroupIdentifier: string,
		toGroupIdentifier: string
	): Promise<GroupSwitchResult> {
		if (fromGroupIdentifier === toGroupIdentifier) {
			throw new Error(
				"The source and target groups are the same. Switching would add the user to " +
					"the group and then remove them from it, leaving them outside it."
			);
		}

		// Step one. Allowed to throw: if this fails, nothing has changed yet and
		// the caller's error path is the honest outcome.
		const added = await this.addUserToGroup(userIdentifier, toGroupIdentifier);

		// Step two. A failure here must NOT propagate as a plain error: the add
		// already happened, so the caller needs a result describing a
		// half-applied switch rather than an exception implying nothing did.
		try {
			const removed = await this.removeUserFromGroup(userIdentifier, fromGroupIdentifier);
			return {
				user: removed,
				addedTo: toGroupIdentifier,
				removedFrom: fromGroupIdentifier,
				added: true,
				removed: true
			};
		} catch (err) {
			return {
				user: added,
				addedTo: toGroupIdentifier,
				removedFrom: fromGroupIdentifier,
				added: true,
				removed: false,
				partialFailure: err instanceof ContentApiError ? err.message : String(err)
			};
		}
	}
}
