import { type Search, Agent } from "@openfin/cloud-api";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { HelpDocument, Logger, SearchAgentConfigData, SearchResultData } from "./shapes";

let agentLogger: Logger | undefined;
let fuse: Fuse<HelpDocument> | undefined;

/**
 * Returns a search agent implementation for the help search.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig | undefined> {
	agentLogger = logger;
	const configData = await Agent.getConfiguration<SearchAgentConfigData>();
	agentLogger?.info("configData", configData);

	if (
		!configData?.primaryHelpUrl ||
		configData.primaryHelpUrl.trim() === "" ||
		!configData.primaryHelpUrl.trim().startsWith("http")
	) {
		agentLogger?.error("No config URL provided in agent configuration");
		return;
	}
	const agentPrimaryUrlResponse = await fetch(configData.primaryHelpUrl);
	if (!agentPrimaryUrlResponse.ok) {
		agentLogger?.error(
			`Failed to fetch agent config from ${configData.primaryHelpUrl} with status ${agentPrimaryUrlResponse.status}`
		);
		return;
	}
	const helpResults: HelpDocument[] = [];
	const primaryHelp = await agentPrimaryUrlResponse.json();
	agentLogger?.info("Fetched agent primary help", primaryHelp);

	helpResults.push(...primaryHelp);
	if (
		configData.secondaryHelpUrl &&
		configData.secondaryHelpUrl.trim() !== "" &&
		configData.secondaryHelpUrl.trim().startsWith("http")
	) {
		const agentSecondaryUrlResponse = await fetch(configData.secondaryHelpUrl);
		if (!agentSecondaryUrlResponse.ok) {
			agentLogger?.error(
				`Failed to fetch agent config from ${configData.secondaryHelpUrl} with status ${agentSecondaryUrlResponse.status}`
			);
			return;
		}
		const secondaryHelp = await agentSecondaryUrlResponse.json();
		agentLogger?.info("Fetched agent secondary help", secondaryHelp);
		helpResults.push(...secondaryHelp);
	}

	if (
		configData.tertiaryHelpUrl &&
		configData.tertiaryHelpUrl.trim() !== "" &&
		configData.tertiaryHelpUrl.trim().startsWith("http")
	) {
		const agentTertiaryUrlResponse = await fetch(configData.tertiaryHelpUrl);
		if (!agentTertiaryUrlResponse.ok) {
			agentLogger?.error(
				`Failed to fetch agent config from ${configData.tertiaryHelpUrl} with status ${agentTertiaryUrlResponse.status}`
			);
			return;
		}
		const tertiaryHelp = await agentTertiaryUrlResponse.json();
		agentLogger?.info("Fetched agent tertiary help", tertiaryHelp);
		helpResults.push(...tertiaryHelp);
	}

	if (
		configData.tertiaryHelpUrl &&
		configData.tertiaryHelpUrl.trim() !== "" &&
		configData.tertiaryHelpUrl.trim().startsWith("http")
	) {
		const agentTertiaryUrlResponse = await fetch(configData.tertiaryHelpUrl);
		if (!agentTertiaryUrlResponse.ok) {
			agentLogger?.error(
				`Failed to fetch agent config from ${configData.tertiaryHelpUrl} with status ${agentTertiaryUrlResponse.status}`
			);
			return;
		}
		const tertiaryHelp = await agentTertiaryUrlResponse.json();
		agentLogger?.info("Fetched agent tertiary help", tertiaryHelp);
		helpResults.push(...tertiaryHelp);
	}

	if (
		configData.quaternaryHelpUrl &&
		configData.quaternaryHelpUrl.trim() !== "" &&
		configData.quaternaryHelpUrl.trim().startsWith("http")
	) {
		const agentQuaternaryUrlResponse = await fetch(configData.quaternaryHelpUrl);
		if (!agentQuaternaryUrlResponse.ok) {
			agentLogger?.error(
				`Failed to fetch agent config from ${configData.quaternaryHelpUrl} with status ${agentQuaternaryUrlResponse.status}`
			);
			return;
		}
		const quaternaryHelp = await agentQuaternaryUrlResponse.json();
		agentLogger?.info("Fetched agent quaternary help", quaternaryHelp);
		helpResults.push(...quaternaryHelp);
	}

	const options: IFuseOptions<HelpDocument> = {
		includeScore: true,
		threshold: 0.4,
		keys: [
			{ name: "title", weight: 0.6 },
			{ name: "description", weight: 0.3 },
			{ name: "text", weight: 0.1 }
		]
	};

	fuse = new Fuse(helpResults, options);

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
// eslint-disable-next-line func-style
async function onAction(
	action: Search.SearchAction,
	result: Search.SearchResult
): Promise<Search.SearchResultActionResponse> {
	agentLogger?.info("Received action", { action, result });
	const data: SearchResultData = result.data as SearchResultData;
	if (!data) {
		agentLogger?.warn("No data in result");
		return;
	}
	return {
		url: data.url
	};
}

/**
 * A query handler for the search agent.
 * @param request The query from enterprise browser
 * @returns The results to display in the search results.
 */
async function onSearch(request: Agent.SearchListenerRequest): Promise<Search.SearchResponse> {
	const { context, query } = request;
	agentLogger?.info("Received search request", { context, query });

	if (!fuse) {
		return { results: [] };
	}

	const results = fuse.search(query).map((result) => ({
		title: result.item.title,
		label: result.item.description,
		key: result.item.id,
		icon: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABQAFADASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAEICQcGAwX/xAA3EAABAwMCBAIGCAcAAAAAAAABAAIDBAUGBxEIEiExUZETFDJBUnEJFRYXV2GV0iIzNUJDVbP/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EACoRAAMAAQIDBgcBAAAAAAAAAAABAgMEEQUhMRIVQVJxkRMUUYGxwdHw/9oADAMBAAIRAxEAPwCoSIi60+qhERAEREAREQBERAERANyB4oAo3HiPNX90D0r0O074ZaPWvULAYsoq6+j+sq177YLjPHG6cxxwwQnoA0cpJ6EkuJOwAHvKi6cK9NdJ7RJoNGZqe+W/H3Obg7eQ1FZEZIng8v8ALDRs5x6g7dDuCqq+KpW5mG9ntv6ER6tJtKW9jMbceI803HiPNbGHQbREEj7oMN6dP6LT/tUfcNoj+EGG/otP+1Ru/sfkZp89PlMdNx4jzUrYr7htEfwgw39Fp/2rifF3w56SR6LZBmeN4XacfvON07a6nqLZTNpxKwSND4pGs2a9pa47EjcEAg9wfTDxvFlyKOy1vyNp1s1SW3UzhRCNiR4IromBS32h81ClvtD5oDWrhMJbw3aekEjazN677f5ZF1vncP73eHtKo32syXB/o7bPlGIXuotF3orJR+r1kBAfEXVwa4jcEdWuIPTsV8NTuI/UKexaa0llxHUPDp6/I7NTXC7XSgigprlDI1rZYmvDnc3pCefsN2gnp2XGXo7z5aqfGqXtz/ZSvFV02vqy33M3xCczfEKjem2e6x546+3O4ZXrzXilyWuoInYjabfUW6OGOYcsbnSgOD2g9QOgby+/dfk5DrpnVJVarXS+at6oWyXH8lrLZYGWa1081ojcHOEEFTK+PaMlwA2LgS3r1Kd2ZHTlUt16/wAM/ArdpNf77F+iQO5AXJ+LAg8N+oRH+lf/ANI1Xm46j8Qtx1PsWFZTftQ6OuGC0N1udswKio6iobWue4OleyUFgaWlnOWnYOIDei6nqi67u4MMyN9mzGWt+qar0j8tpoYLoR6y3l9KyH+ADbbl27t2J6pGkrBlx06T3a6ephR2Lnmuq/JmO72j81Cl3tH5qF2ZdBAdjuiIC9Ghet/DvmfDjRaHa132CzttsAoaqnq5pqeOshZOZYpIpox0PshzdwQWnuCus5ZqvwcZvarDZMk1Rx6po8araW4W1jbjPGYp6dvLE4loBeAPc7cH3rL4EjsdlPM74j5qqvhOO7dq6XNvk/F9SJWjl12lTRoRHb/o/wCCrnrKXU2ClfU1T6yVtNllyhY6Z7+dzuRjw3qfy/Jepps44IaayZfjg1CxqW3Z3VyV19gnuM8jamd/d7eYbxkHYjk22IBHULM7md8R805nfEfNK4Uq65a9zD0e/W2aG3CLgHudRQVlZqhTGptlthtFNPHlNwjlbSRb+jiL2ODnBvNsNyegA9wXn9fNedAcZ4e7no5pHlJyKa8xOpIWR1dRWeqxyTCSWWWom3J7ENbzE7kdgFRLmd8R81BJPc7raeGSqmruns99m+RlaRJpum9gTuSfFERWZLCIiAIiIAiIgCIiAIiID//Z",
		data: {
			recordId: result.item.id,
			url: result.item.url
		} as SearchResultData,
		actions: [
			{
				name: "view",
				title: "View Help Document",
				description: `View the help document with url: ${result.item.url}`
			}
		] as Search.SearchAction[]
	}));
	return { results };
}
