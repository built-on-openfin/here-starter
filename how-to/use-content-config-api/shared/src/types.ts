/** View controls shown on a web app window. */
export interface ViewSettings {
	navigationControls: boolean;
	reloadControl: boolean;
}

/** Which HERE environments an app is available in. */
export interface EnvironmentAvailability {
	enableHereEB: boolean;
	enableHereZero: boolean;
	enableHereMobile: boolean;
}

/** Data Loss Prevention behaviours. */
export interface DlpSettings {
	copyBehavior: "block" | "protect" | "allow";
	pasteBehavior: "non-protected-content" | "all-content";
	screenCaptureBehavior: "block" | "allow";
	printBehavior: "block" | "allow";
}

/** Who can see and launch an app. */
export interface Access {
	subjects: string[];
	primitives: string[];
}

/** Native (desktop) launch configuration, as sent on create/update. */
export interface NativeSettings {
	desktopPath: string;
	desktopArgs: string[];
	withSnap: boolean;
}

/** Optional FDC3 intent declarations carried through to the API. */
export interface InteropSettings {
	intents?: {
		listensFor?: Record<
			string,
			{ displayName?: string; contexts?: string[]; resultType?: string }
		>;
	};
}

/** Create/update body for a web application. */
export interface WebContentInput {
	contentType: "WEB";
	name: string;
	contentId: string;
	id?: string;
	active: boolean;
	featured: boolean;
	icon?: string;
	customLabel?: string;
	urls: string[];
	hereApiAccess: boolean;
	allowDuplication: boolean;
	allowOpenWithDefaultBrowser: boolean;
	useAIContext: boolean;
	enableSimpleWindow: boolean;
	viewSettings: ViewSettings;
	environmentAvailability: EnvironmentAvailability;
	dataLossPreventionSettings: DlpSettings;
	redirects: unknown[];
	interop?: InteropSettings;
	access: Access | null;
}

/** Create/update body for a desktop application. */
export interface DesktopContentInput {
	contentType: "DESKTOP";
	name: string;
	contentId: string;
	id?: string;
	active: boolean;
	featured: boolean;
	icon?: string;
	customLabel?: string;
	nativeSettings: NativeSettings;
	interop?: InteropSettings;
	access: Access | null;
}

export type ContentInput = DesktopContentInput | WebContentInput;

/** Shape selected back from the create/update mutations. */
export interface WriteResult {
	uuid: string;
	id: string;
	name: string;
	type: "DESKTOP" | "WEB";
	active: boolean;
	featured: boolean;
}

/** Distributive Omit: applies per union member instead of collapsing to shared keys. */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;

/**
 * Update payload. Updates are partial — send only the fields you want to
 * change. Omitting `access` (or sending null) leaves access assignments alone.
 *
 * `contentType` and `contentId` identify the app and cannot be changed.
 */
export type ContentUpdate = Partial<DistributiveOmit<ContentInput, "contentType" | "contentId">>;

/** One entry in a bulk update: which app, and what to change about it. */
export interface BulkUpdateEntry {
	identifier: string;
	update: ContentUpdate;
}

/** A single content node from the GraphQL read API. */
export interface ContentNode {
	uuid: string;
	id: string;
	name: string;
	type: string;
	active: boolean;
	featured?: boolean;
	icon?: string;
	createdAt?: string;
	url?: string;
	urls?: string[];
	desktopPath?: string;
	desktopArgs?: string[];
	withSnap?: boolean;
}

/** HERE-specific settings carried on an FDC3 application record. */
export interface HereHostManifest {
	active?: boolean;
	featured?: boolean;
	customLabel?: string;
	hereApiAccess?: boolean;
	allowDuplication?: boolean;
	allowOpenWithDefaultBrowser?: boolean;
	useAIContext?: boolean;
	enableSimpleWindow?: boolean;
	viewSettings?: ViewSettings;
	environmentAvailability?: EnvironmentAvailability;
	dataLossPreventionSettings?: DlpSettings;
	access?: Access | null;
	withSnap?: boolean;
}

/** Minimal FDC3 2.0 Application record. See @finos/fdc3 for the full schema. */
export interface Fdc3Application {
	appId: string;
	name: string;
	title?: string;
	description?: string;
	type: "native" | "web";
	details: {
		url?: string;
		path?: string;
		arguments?: string[];
	};
	icons?: { src: string }[];
	interop?: InteropSettings;
	hostManifests?: {
		here?: HereHostManifest;
	};
}

/** An FDC3 2.0 App Directory document. */
export interface AppDirectory {
	applications: Fdc3Application[];
}
