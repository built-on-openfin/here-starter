/**
 * Parse a response body that should be JSON but might not be, for example a proxy error page.
 * @param text The response body.
 * @returns The parsed value, or undefined when the body is not JSON.
 */
export function tryParseJson(text: string): unknown {
	try {
		return JSON.parse(text) as unknown;
	} catch {
		return undefined;
	}
}
