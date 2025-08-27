import { Agent } from "@openfin/cloud-api";
import { Context } from "@finos/fdc3";
import type OpenFin from "@openfin/core";
import { launchExcel, init as initExcel } from "./excel";
import { init as getSearchAgent } from "./search";
import type { ExcelAssetSettings, Logger } from "./shapes";

const assetInfo: OpenFin.AppAssetInfo = {
	alias: "excel-interop-example.xlsx",
	version: "0.0.5",
	src: `${window.location.origin}/assets/excel-interop-example.zip`,
	target: "excel-interop-example.xlsx"
};

const assetSettings: ExcelAssetSettings = {
	title: "Excel Interop Example",
	description: "Excel Interop Example",
	workbook: "excel-interop-example.xlsx",
	worksheets: []
};

async function init(): Promise<void> {
	const agent = await getSearchAgent(logger);
	const searchAgent = await Agent.register(agent);

	await initExcel({
		icon: `${window.location.origin}/assets/excel.svg`,
		asset: assetSettings,
		appAsset: assetInfo
	});

	if (!fdc3) {
		console.error("FDC3 is not defined");
		return;
	}

	// Listen for fdc3 context changes from the platform
	const userChannelHandler = async (ctx: Context) => {
		try {
			logger.info("User Context Received:", ctx);
			await launchExcel(assetInfo, assetSettings);
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
