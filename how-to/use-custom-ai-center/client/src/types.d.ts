export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };

export interface CurrentContext {
	pageId: string;
	isActive?: boolean;
	attachedPageType?: string;
	faviconUrl?: string;
	title?: string;
	url?: string;
}

export interface ContextResultPayload {
	readability?: {
		success?: boolean;
		data?: string;
	};
	screenshot?: {
		success?: boolean;
		data?: string;
	};
	title?: string;
	url?: string;
	[key: string]: unknown;
}

export interface RawAiContextResponse {
	results?: Record<string, ContextResultPayload>;
	currentContext?: CurrentContext;
	[key: string]: unknown;
}

export interface NormalizedContextResponse {
	pageId: string;
	currentContext: CurrentContext;
	results: Record<string, ContextResultPayload>;
}

export interface AiContextApi {
	getContext?: () => Promise<RawAiContextResponse>;
	setContextChangedListener?: (handler: (payload: unknown) => void | Promise<void>) => Promise<void> | void;
}

declare global {
	interface Window {
		_aiContext?: AiContextApi;
	}
}

export {};
