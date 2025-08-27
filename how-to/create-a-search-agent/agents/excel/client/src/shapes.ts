import type { OpenFin } from "@openfin/core";

/**
 * Custom settings for the application.
 */
export interface CustomSettings {
	/**
	 * The settings for excel.
	 */
	excel?: ExcelSettings;
}

/**
 * Settings for integration with Excel.
 */
export interface ExcelSettings {
	/**
	 * The icons to display.
	 */
	icon: string;

	/**
	 * The asset for the excel integration.
	 */
	asset: ExcelAssetSettings;

	/**
	 * The app asset information.
	 */
	appAsset: OpenFin.AppAssetInfo;
}

/**
 * Definition for excel worksheet settings.
 */
export interface ExcelWorksheetSettings {
	/**
	 * The name of the excel worksheet.
	 */
	name: string;

	/**
	 * Handlers for the excel worksheet cells.
	 */
	cellHandlers?: {
		cell: string;
		types: string[];
		contextGroup: "green" | "purple" | "orange" | "red" | "pink" | "yellow";
	}[];
}

/**
 * Excel asset settings.
 */
export interface ExcelAssetSettings {
	/**
	 * Title of the asset.
	 */
	title: string;

	/**
	 * Description for the asset.
	 */
	description: string;

	/**
	 * The workbook for the asset.
	 */
	workbook: string;

	/**
	 * The worksheet settings for the workbook.
	 */
	worksheets: ExcelWorksheetSettings[];
}

/**
 * Interface for a logger.
 */
export interface Logger {
	/**
	 * Log data as information.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	info(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as error.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	error(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as warning.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	warn(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as trace.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	trace(message: unknown, ...optionalParams: unknown[]): void;

	/**
	 * Log data as debug.
	 * @param message The message to log.
	 * @param optionalParams Optional parameters for details.
	 */
	debug(message: unknown, ...optionalParams: unknown[]): void;
}

/**
 * Interface for the search agent configuration data.
 */
export interface SearchAgentConfigData {
	[key: string]: unknown;
	/**
	 * An example setting.
	 */
	exampleSetting: string;
	/**
	 * Custom data for the agent.
	 */
	customData?: unknown;
	/**
	 * Description of the agent.
	 */
	description?: string;
	/**
	 * ID of the agent.
	 */
	id?: string;
	/**
	 * Title of the agent.
	 */
	title?: string;
	/**
	 * URL of the agent.
	 */
	url?: string;
}
