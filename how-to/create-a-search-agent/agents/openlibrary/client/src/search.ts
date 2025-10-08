import { Agent } from "@openfin/cloud-api";
import type { Search } from "@openfin/cloud-api";
import type {
	Logger,
	OpenLibrarySearchResult,
	OpenLibrarySearchResultData,
	SearchAgentConfigData
} from "./shapes";

let agentLogger: Logger | undefined;

/**
 * Returns a search agent implementation for OpenLibrary.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig> {
	agentLogger = logger;
	const { exampleSetting } = await Agent.getConfiguration<SearchAgentConfigData>();
	agentLogger?.info("Agent example setting (init)", exampleSetting);
	return {
		search: {
			onAction,
			onSearch
		}
	};
}

/**
 * Handles actions for the OpenLibrary search agent. This is triggered when someone makes a selection within the Enterprise Browser search results.
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
	const { authorId } = data as unknown as OpenLibrarySearchResultData;
	const { name: actionName } = action;
	agentLogger?.info(`onAction: ${actionName} ${title} ${key}`);
	switch (actionName) {
		case "view-author":
			return { url: `https://openlibrary.org/authors/${authorId}` };
		case "view-book":
			return { url: `https://openlibrary.org/books/${key}` };
		default:
			agentLogger?.info(`Unknown action: ${actionName}`);
	}
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
	try {
		let results: Search.SearchResult[] = [];

		// Build the query with filters
		let searchQuery = query;
		if (filters.includes("public-ebook")) {
			searchQuery += " +ebook_access:public";
		}
		if (filters.includes("21st-century")) {
			searchQuery += " +first_publish_year:[2000 TO *]";
		}

		const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${pageNumber}&limit=${pageSize}`;
		const response = await fetch(url, { signal });
		if (!response.ok) {
			throw new Error(`Request failed: ${response.status}`);
		}
		const { docs } = (await response.json()) as OpenLibrarySearchResult;
		results = docs.map((result) => {
			const { author_key: authorId, author_name: author, cover_edition_key: key, publisher, title } = result;
			return {
				actions: [
					{
						name: "view-book",
						description: `Go to ${title} in OpenLibrary`
					},
					{
						darkIcon:
							"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.31 4.395C3.03 5.81 4.19 6.965 5.605 7.69L6.705 6.59C6.84 6.455 7.04 6.41 7.215 6.47C7.775 6.655 8.38 6.755 9 6.755C9.275 6.755 9.5 6.98 9.5 7.255V9C9.5 9.275 9.275 9.5 9 9.5C4.305 9.5 0.5 5.695 0.5 1C0.5 0.725 0.725 0.5 1 0.5H2.75C3.025 0.5 3.25 0.725 3.25 1C3.25 1.625 3.35 2.225 3.535 2.785C3.59 2.96 3.55 3.155 3.41 3.295L2.31 4.395Z' fill='%23FFFFFF'/%3E%3C/svg%3E%0A",
						lightIcon:
							"data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.31 4.395C3.03 5.81 4.19 6.965 5.605 7.69L6.705 6.59C6.84 6.455 7.04 6.41 7.215 6.47C7.775 6.655 8.38 6.755 9 6.755C9.275 6.755 9.5 6.98 9.5 7.255V9C9.5 9.275 9.275 9.5 9 9.5C4.305 9.5 0.5 5.695 0.5 1C0.5 0.725 0.725 0.5 1 0.5H2.75C3.025 0.5 3.25 0.725 3.25 1C3.25 1.625 3.35 2.225 3.535 2.785C3.59 2.96 3.55 3.155 3.41 3.295L2.31 4.395Z' fill='%23140611'/%3E%3C/svg%3E%0A",
						name: "view-author",
						title: "View author",
						description: `Go to profile of ${author.join(", ")} in OpenLibrary`
					}
				],
				data: { authorId: authorId?.[0] } satisfies OpenLibrarySearchResultData,
				icon: "https://openlibrary.org/static/images/openlibrary-128x128.png",
				key,
				label: `${author.join(", ")}${publisher ? ` - ${publisher}` : ""}`,
				title
			};
		});
		agentLogger?.info("returning", results);
		return { results };
	} catch (err) {
		if ((err as Error).name !== "AbortError") {
			agentLogger?.error(`Error querying OpenLibrary\n${(err as Error).message}`);
		}
	}
	return { results: [] };
}
