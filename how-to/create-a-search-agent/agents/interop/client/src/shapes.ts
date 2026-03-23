/**
 * Interface for user search result data.
 */
export interface UserSearchResultData {
	/**
	 * The user's unique identifier.
	 */
	id: string;
	/**
	 * The user's email address.
	 */
	email: string;
	/**
	 * The user's name.
	 */
	name: string;
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
	 * The primary intent of the search agent.
	 */
	intent: string;
	/**
	 * The secondary intent of the search agent.
	 */
	intent2: string;
	/**
	 * The broadcast setting of the search agent. YES if the agent should broadcast the context after raising the intent, NO if it should not, or leave blank to disable the broadcast action.
	 */
	broadcast: string;
	/**
	 * The data source for the search agent.
	 */
	dataSource: string;
}

/**
 * Interface for user data from the data source.
 */
export interface UserData {
	/**
	 * The unique identifier.
	 */
	id: string;
	/**
	 * The user's name.
	 */
	name: string;
	/**
	 * The user's email address.
	 */
	email: string;
	/**
	 * The interaction date.
	 */
	interactionDate: string;
	/**
	 * The interaction type.
	 */
	interactionType: string;
	/**
	 * The user's social security number.
	 */
	ssn: string;
	/**
	 * The user's gender.
	 */
	gender: string;
	/**
	 * The user's date of birth.
	 */
	dob: string;
	/**
	 * The user's age.
	 */
	age: string;
	/**
	 * The user's marital status.
	 */
	maritalStatus: string;
}
