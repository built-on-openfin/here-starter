/**
 * Interface for the configuration.
 */
export interface SearchResultData extends Record<string, unknown> {
	/**
	 * The record id.
	 */
	recordId: string;

	/**
	 * URL to the record.
	 */
	url: string;
}

/**
 * Interface for a help search document.
 */
export interface HelpDocument {
	/**
	 * Unique identifier.
	 */
	id: string;
	/**
	 * Document title.
	 */
	title: string;
	/**
	 * Document URL.
	 */
	url: string;
	/**
	 * Document description.
	 */
	description?: string;
	/**
	 * Full text content.
	 */
	text: string;
}

/**
 * Interface for the search agent configuration data.
 */
export interface SearchAgentConfigData {
	[key: string]: unknown;
	/**
	 * The primary help URL to load search index from.
	 */
	primaryHelpUrl: string;

	/**
	 * Optional secondary help URL to load search index from.
	 */
	secondaryHelpUrl?: string;

	/**
	 * Optional tertiary help URL to load search index from.
	 */
	tertiaryHelpUrl?: string;

	/**
	 * Optional quaternary help URL to load search index from.
	 */
	quaternaryHelpUrl?: string;
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
