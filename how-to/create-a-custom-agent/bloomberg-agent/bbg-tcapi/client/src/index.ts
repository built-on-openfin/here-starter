import { Agent } from "@openfin/cloud-api";
import { init as initBBGAgent } from "./bloomberg-tcapi";
import type { Logger } from "./shapes";

const logger: Logger = {
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
};

/**
 * Initializes the search agent.
 */
async function init(): Promise<void> {
	console.log("Starting Agent Bloomberg TCAPI");

	try {
		await initBBGAgent(logger);
		const bloombergAgent = await Agent.register({});
		await bloombergAgent.setIsReady(true);
	} catch (error) {
		console.warn("Failed to register search agent", error);
	}
}

window.addEventListener("load", async () => {
	init().catch((err) => {
		console.error("Initialization failed:", err);
	});
});
