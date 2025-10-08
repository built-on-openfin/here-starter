/**
 * Interface for the configuration.
 */
export interface OpenLibrarySearchResultData {
	/**
	 * The id of the author.
	 */
	authorId: string;
}

/**
 * Interface for a search result.
 */
export interface OpenLibraryDocument {
	/**
	 * The key of the author.
	 */
	author_key: string[];
	/**
	 * The name of the author.
	 */
	author_name: string[];
	/**
	 * The key of the document.
	 */
	cover_edition_key: string;
	/**
	 * The publisher of the document.
	 */
	publisher: string;
	/**
	 * The title of the document.
	 */
	title: string;
	/**
	 * The ebook access of the document.
	 */
	ebook_access: string;
	/**
	 * The first publish year of the document.
	 */
	first_publish_year: number;
}

/**
 * Interface for a search result.
 */
export interface OpenLibrarySearchResult {
	/**
	 * The number of results found.
	 */
	start: number;
	/**
	 * The number of results found.
	 */
	numFound: number;
	/**
	 * The results found.
	 */
	docs: OpenLibraryDocument[];
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
}
