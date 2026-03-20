import { Agent } from "@openfin/cloud-api";
import type { Search } from "@openfin/cloud-api";
import type { Logger, SearchAgentConfigData, UserData, UserSearchResultData } from "./shapes";

let agentLogger: Logger | undefined;
let userData: UserData[] = [];
let targetIntent: string | undefined;
let intentName: string | undefined;
const actions: Search.SearchAction[] = [];

/**
 * Returns a search agent implementation for OpenLibrary.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig> {
	agentLogger = logger;
	const { intent, dataSource } = await Agent.getConfiguration<SearchAgentConfigData>();
	if (window.fdc3 && intent) {
		try {
			const appIntent = await window.fdc3.findIntent(intent);
			if (appIntent.apps.length === 0) {
				agentLogger?.warn(`No apps found for intent: ${intent}`);
			} else {
				agentLogger?.info(`Found ${appIntent.apps.length} app(s) for intent: ${intent}`, {
					apps: appIntent.apps
				});
				targetIntent = appIntent.intent.name;
				intentName = appIntent.intent.displayName || appIntent.intent.name;
				actions.push({ name: "intent", description: `Raise ${intentName} Intent` });
				actions.push({ name: "broadcast", description: "Broadcast" });
			}
		} catch (err) {
			agentLogger?.error(
				`Error finding intent${intent ? `: ${intent}` : "Unknown"}: ${(err as Error).message}`
			);
		}
	}
	targetIntent = intent;
	agentLogger?.info("Agent example setting (init)", { intent, dataSource });

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
			agentLogger?.info(`Raising intent: ${intentName} for user: ${resultData.id} - ${resultData.email}`);
			if (targetIntent) {
				window.fdc3.raiseIntent(targetIntent, context).catch((err) => {
					agentLogger?.error(`Error raising intent: ${err instanceof Error ? err.message : String(err)}`);
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
