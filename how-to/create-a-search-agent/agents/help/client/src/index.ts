import { Agent } from "@openfin/cloud-api";
import { init as getSearchAgent } from "./search";

/**
 * Initializes the search agent.
 */
async function init(): Promise<void> {
	const searchAgentConfiguration = await getSearchAgent({
		info: (message: unknown, ...optionalParams: unknown[]) => {
			console.log(message, optionalParams);
		},
		error: (message: unknown, ...optionalParams: unknown[]) => {
			console.error(message, optionalParams);
		},
		warn: (message: unknown, ...optionalParams: unknown[]) => {
			console.warn(message, optionalParams);
		},
		trace: (message: unknown, ...optionalParams: unknown[]) => {
			console.trace(message, optionalParams);
		},
		debug: (message: unknown, ...optionalParams: unknown[]) => {
			console.debug(message, optionalParams);
		}
	});
	if (searchAgentConfiguration) {
		const searchAgent = await Agent.register(searchAgentConfiguration);
		await searchAgent.setIsReady(true);
	}
}

window.addEventListener("load", async () => {
	await init();
});
