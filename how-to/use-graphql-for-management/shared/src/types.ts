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
		listensFor?: {
			[intentName: string]: { displayName?: string; contexts?: string[]; resultType?: string };
		};
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

/** Create/update body for either kind of app. */
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

/**
 * A single content node from the GraphQL read API.
 *
 * Covers both `WebContent` and `DesktopContent` in one flat shape, the way the
 * query in `content-api.ts` selects them. The web-only and desktop-only
 * fields below are optional for that reason, not because the API omits them
 * for a given node — a web node always has `url`/`viewSettings`/etc, a
 * desktop node always has `desktopPath`, and so on.
 */
export interface ContentNode {
	uuid: string;
	id: string;
	name: string;
	type: string;
	active: boolean;
	featured?: boolean;
	icon?: string;
	createdAt?: string;
	customLabel?: string;
	/** Present on every node, but excluded from `contentNodeToFdc3Application` — see there for why. */
	access?: Access;
	// --- web only ---
	url?: string;
	urls?: string[];
	hereApiAccess?: boolean;
	allowDuplication?: boolean;
	allowOpenWithDefaultBrowser?: boolean;
	useAIContext?: boolean;
	enableSimpleWindow?: boolean;
	viewSettings?: ViewSettings;
	environmentAvailability?: EnvironmentAvailability;
	dataLossPreventionSettings?: DlpSettings;
	interop?: InteropSettings;
	// --- desktop only ---
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

// ===========================================================================
// User and group management
// ===========================================================================

/**
 * A group a user can belong to.
 *
 * Note there is no `name` field on this type: `id` is the human-readable
 * identifier (`all-users`, `atlassian-users`) and `uuid` is the system id.
 * Either is accepted wherever the API asks for a group identifier, and the UI
 * shows `id` because it is what an administrator recognises.
 */
export interface Group {
	uuid: string;
	id: string;
	description?: string;
	/** Total members, present only when the query asked for the count. */
	memberCount?: number;
}

/**
 * A user in the organization.
 *
 * `email`, `firstName` and `lastName` are genuinely nullable — directories
 * seeded from an external provider often carry a bare employee id and nothing
 * else — so render them defensively rather than assuming a display name.
 */
export interface User {
	uuid: string;
	id: string;
	email: string | null;
	firstName: string | null;
	lastName: string | null;
	active: boolean;
	/**
	 * The groups this user currently belongs to. Populated by `getUser`, left
	 * undefined by `listUsers`, which does not fetch them. A user can belong to
	 * many groups at once — membership is a set, not a single slot.
	 */
	groups?: Group[];
}

/**
 * What a group switch actually did.
 *
 * Switching groups is **two** mutations, because the API has no atomic move
 * (there is no `moveUserToGroup`/`setUserGroup`). Either step can fail on its
 * own, so the outcome has to be reported per step rather than as one boolean.
 * See `UserApiClient.switchGroup` for the ordering and why it was chosen.
 */
export interface GroupSwitchResult {
	/** The user as the server returned them after the last successful step. */
	user: User;
	addedTo: string;
	removedFrom: string;
	added: boolean;
	removed: boolean;
	/**
	 * Set when the add succeeded but the remove did not, which leaves the user
	 * in **both** groups. The switch is half-applied and needs the remove
	 * retried — it is not a failure that undid itself.
	 */
	partialFailure?: string;
}
