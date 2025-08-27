import { Agent } from "@openfin/cloud-api";
import { Context } from "@finos/fdc3";
import { init as getSearchAgent } from "./search";
import type { Logger } from "./shapes";

async function init(): Promise<void> {
	const agent = await getSearchAgent(logger);
	const searchAgent = await Agent.register(agent);

	if (!fdc3) {
		console.error("FDC3 is not defined");
		return;
	}

	// Listen for fdc3 context changes from the platform
	const userChannelHandler = async (ctx: Context) => {
		try {
			logger.info("User Context Received:", ctx);
		} catch (e) {
			logger.error(e);
		}
	};

	await fdc3.addContextListener(null, userChannelHandler);

	await searchAgent.setIsReady(true);
}

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

window.addEventListener("load", () => {
	init().catch((err) => {
		console.error("Initialization failed:", err);
	});
});
