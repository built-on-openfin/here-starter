import { Agent } from "@openfin/cloud-api";
import type { Search } from "@openfin/cloud-api";
import type { Logger, SearchAgentConfigData } from "./shapes";

let agentLogger: Logger | undefined;

/**
 * Returns a search agent implementation for OpenLibrary.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig> {
	agentLogger = logger;
	const { customData, description, id, title, url } = await Agent.getConfiguration<SearchAgentConfigData>();
	agentLogger?.info("init", { customData, description, id, title, url });
	return {
		search: {
			onAction,
			onSearch
		}
	};
}

/**
 * Handles actions for the search agent. This is triggered when someone makes a selection within the Enterprise Browser search results.
 * @param action The selection the user made.
 * @param result The result that was selected.
 * @returns The url to launch.
 */
async function onAction(
	action: Search.SearchAction,
	result: Search.SearchResult
): Promise<Search.SearchResultActionResponse> {
	agentLogger?.info("onActionListener", { action, result });
	const { data, key, title } = result;

	// Example of an action
	return { url: `https://www.google.com/search?q=${encodeURIComponent(title)}` };
}

/**
 * A query handler for the OpenLibrary search agent.
 * @param request The query from enterprise browser
 * @returns The results to display in the search results.
 */
async function onSearch(request: Agent.SearchListenerRequest): Promise<Search.SearchResponse> {
	agentLogger?.info("onSearchListener", { request });
	const { context, query, signal } = request;
	const { pageNumber, pageSize, filters } = context;

	// TODO fetch items to show in the search results

	try {
		const results: Search.SearchResult[] = [
			{
				data: {},
				icon: "",
				key: "test",
				label: "Test result",
				title: "Test",
				actions: [{ name: "action" }]
			}
		];

		agentLogger?.info("returning", results);
		return { results };
	} catch (err) {
		if ((err as Error).name !== "AbortError") {
			agentLogger?.error(`Error fetching search results\n${(err as Error).message}`);
		}
	}
	return { results: [] };
}
