import { Agent } from "@openfin/cloud-api";
import type { Search } from "@openfin/cloud-api";
import type { Logger, SearchAgentConfigData, UserData, UserSearchResultData } from "./shapes";
import { isStringValue } from "./util";

let agentLogger: Logger | undefined;
let userData: UserData[] = [];
let primaryIntent: { name: string; displayName: string } | undefined;
let secondaryIntent: { name: string; displayName: string } | undefined;
let broadcastContext: boolean = false;

/**
 * Returns a search agent implementation for an Interop Agent.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig> {
	agentLogger = logger;
	const { intent, intent2, broadcast, dataSource } = await Agent.getConfiguration<SearchAgentConfigData>();
	if (window.fdc3) {
		try {
			if (isStringValue(intent)) {
				const appIntent = await window.fdc3.findIntent(intent);
				if (appIntent.apps.length === 0) {
					agentLogger?.warn(`No apps found for primary intent: ${intent}`);
				} else {
					agentLogger?.info(`Found ${appIntent.apps.length} app(s) for primary intent: ${intent}`, {
						apps: appIntent.apps
					});
					primaryIntent = {
						name: appIntent.intent.name,
						displayName: appIntent.intent.displayName || appIntent.intent.name
					};
				}
			} else {
				agentLogger?.error("No primary intent configured");
			}
			if (isStringValue(intent2)) {
				const appIntent = await window.fdc3.findIntent(intent2);
				if (appIntent.apps.length === 0) {
					agentLogger?.warn(`No apps found for secondary intent: ${intent2}`);
				} else {
					agentLogger?.info(`Found ${appIntent.apps.length} app(s) for secondary intent: ${intent2}`, {
						apps: appIntent.apps
					});
					secondaryIntent = {
						name: appIntent.intent.name,
						displayName: appIntent.intent.displayName || appIntent.intent.name
					};
				}
			} else {
				agentLogger?.info("No secondary intent configured");
			}
			if (isStringValue(broadcast) && broadcast.toLowerCase() === "yes") {
				broadcastContext = true;
				agentLogger?.info("Broadcast action enabled");
			} else {
				agentLogger?.info("Broadcast action not enabled", broadcast);
			}
		} catch (err) {
			agentLogger?.error(
				`Error finding intent${intent ? `: ${intent}` : "Unknown"}: ${(err as Error).message}`
			);
		}
	}
	agentLogger?.info("Agent Interop example setting (init)", { intent, intent2, broadcast, dataSource });

	// Fetch user data from the configured data source
	if (dataSource) {
		try {
			const response = await fetch(dataSource);
			if (!response.ok) {
				throw new Error(`Failed to fetch user data: ${response.status}`);
			}
			userData = (await response.json()) as UserData[];
			agentLogger?.info("User data loaded successfully", { count: userData.length });
		} catch (err) {
			agentLogger?.error(`Error fetching user data: ${(err as Error).message}`);
		}
	} else {
		agentLogger?.error("No data source configured");
	}

	return {
		search: {
			onAction,
			onSearch
		}
	};
}

/**
 * Handles actions for the user search agent. This is triggered when someone makes a selection within the Enterprise Browser search results.
 * @param action The selection the user made.
 * @param result The result that was selected.
 * @returns The url to launch.
 */
// eslint-disable-next-line func-style
async function onAction(
	action: Search.SearchAction,
	result: Search.SearchResult
): Promise<Search.SearchResultActionResponse> {
	agentLogger?.info("onActionListener", { action, result });
	const { data, key, title } = result;
	const resultData = data as unknown as UserSearchResultData;
	const context = {
		type: "fdc3.contact",
		name: resultData.name,
		id: {
			id: resultData.id,
			email: resultData.email
		}
	};
	const { name: actionName } = action;
	agentLogger?.info(`onAction: ${actionName} ${title} ${key}`);
	switch (actionName) {
		case "intent": {
			agentLogger?.info(
				`Raising primary intent: ${primaryIntent?.name} for user: ${resultData.id} - ${resultData.email}`
			);
			if (primaryIntent) {
				window.fdc3.raiseIntent(primaryIntent.name, context).catch((err) => {
					agentLogger?.error(
						`Error raising primary intent: ${err instanceof Error ? err.message : String(err)}`
					);
				});
			}
			break;
		}
		case "intent2": {
			agentLogger?.info(
				`Raising secondary intent: ${secondaryIntent?.name} for user: ${resultData.id} - ${resultData.email}`
			);
			if (secondaryIntent) {
				window.fdc3.raiseIntent(secondaryIntent.name, context).catch((err) => {
					agentLogger?.error(
						`Error raising secondary intent: ${err instanceof Error ? err.message : String(err)}`
					);
				});
			}
			break;
		}
		case "broadcast": {
			agentLogger?.info(`Broadcasting for user: ${resultData.id} - ${resultData.email}`);
			window.fdc3.broadcast(context).catch((err) => {
				agentLogger?.error(`Error broadcasting context: ${err instanceof Error ? err.message : String(err)}`);
			});
			break;
		}
		default:
			agentLogger?.info(`Unknown action: ${actionName}`);
	}
	return undefined;
}

/**
 * A query handler for the user search agent.
 * @param request The query from enterprise browser
 * @returns The results to display in the search results.
 */
async function onSearch(request: Agent.SearchListenerRequest): Promise<Search.SearchResponse> {
	agentLogger?.info("onSearchListener", { request });
	const { context, query } = request;
	const { pageNumber, pageSize } = context;
	try {
		let results: Search.SearchResult[] = [];
		const actions: Search.SearchAction[] = [];

		if (primaryIntent) {
			actions.push({
				name: "intent",
				title: primaryIntent.displayName,
				description: `Raise ${primaryIntent.displayName || primaryIntent.name} Intent`
			});
		}
		if (secondaryIntent) {
			actions.push({
				name: "intent2",
				title: secondaryIntent.displayName,
				description: `Raise ${secondaryIntent.displayName || secondaryIntent.name} Intent`
			});
		}
		if (broadcastContext) {
			const currentContextGroup = await window.fdc3.getCurrentChannel();
			if (currentContextGroup) {
				let currentColor = currentContextGroup.displayMetadata?.color;
				if (currentColor) {
					currentColor = currentColor.replace("#", "%23");
					actions.push({
						name: "broadcast",
						title: "Broadcast",
						description: "Broadcast contact on the matching channel.",
						icon: {
							dark: `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Crect%20x='10'%20y='10'%20width='80'%20height='80'%20fill='${currentColor}'/%3E%3C/svg%3E`,
							light: `data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20100%20100'%3E%3Crect%20x='10'%20y='10'%20width='80'%20height='80'%20fill='${currentColor}'/%3E%3C/svg%3E`
						}
					} as Search.SearchAction);
				} else {
					agentLogger?.info("Current context group has no color");
					actions.push({
						name: "broadcast",
						title: "Broadcast",
						description: "Broadcast contact on the matching channel."
					});
				}
			} else {
				agentLogger?.info(
					"No current context group assigned so broadcast action will not be added even though it is enabled."
				);
			}
		}
		// Filter userData by name and email (case-insensitive)
		const searchQuery = query.toLowerCase();
		const filteredUsers = userData.filter((user) => {
			const nameMatch = user.name.toLowerCase().includes(searchQuery);
			const emailMatch = user.email.toLowerCase().includes(searchQuery);
			return nameMatch || emailMatch;
		});

		// Apply pagination
		const startIndex = (pageNumber - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

		// Map to search results
		results = paginatedUsers.map((user) => ({
			actions,
			data: { id: user.id, email: user.email, name: user.name } satisfies UserSearchResultData,
			key: user.id,
			label: user.email,
			title: user.name,
			description: [
				{ label: "Email", value: user.email },
				{ label: "Interaction Date", value: user.interactionDate },
				{ label: "Interaction Type", value: user.interactionType },
				{ label: "Age", value: user.age },
				{ label: "Gender", value: user.gender },
				{ label: "Marital Status", value: user.maritalStatus }
			]
		}));
		agentLogger?.info("returning", { resultCount: results.length, totalMatches: filteredUsers.length });
		return { results };
	} catch (err) {
		if ((err as Error).name !== "AbortError") {
			agentLogger?.error(`Error querying users\n${(err as Error).message}`);
		}
	}
	return { results: [] };
}
