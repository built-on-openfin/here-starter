/**
 * Test if a value is a string.
 * @param value The value to test.
 * @returns True if the value is a string.
 */
export function isString(value: unknown): value is string {
	// eslint-disable-next-line no-restricted-syntax
	return value !== undefined && value !== null && typeof value === "string";
}

/**
 * Test if a value is a string that is not empty.
 * @param value The value to test.
 * @returns True if the value is a string that is not empty.
 */
export function isStringValue(value: unknown): value is string {
	return isString(value) && value.trim().length > 0;
}
