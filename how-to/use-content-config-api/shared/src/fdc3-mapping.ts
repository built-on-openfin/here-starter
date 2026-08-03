import type {
	Access,
	ContentInput,
	ContentNode,
	DesktopContentInput,
	DlpSettings,
	EnvironmentAvailability,
	Fdc3Application,
	HereHostManifest,
	ViewSettings,
	WebContentInput
} from "./types";

const DEFAULT_VIEW: ViewSettings = { navigationControls: true, reloadControl: true };
const DEFAULT_ENV: EnvironmentAvailability = {
	enableHereEB: true,
	enableHereZero: false,
	enableHereMobile: false
};
const DEFAULT_DLP: DlpSettings = {
	copyBehavior: "allow",
	pasteBehavior: "non-protected-content",
	screenCaptureBehavior: "allow",
	printBehavior: "allow"
};
const DEFAULT_ACCESS: Access = { subjects: [], primitives: [] };

/**
 * Convert an FDC3 2.0 Application record into a HERE content create/update body.
 * @throws {Error} if a native app is missing `details.path`, or a web app is missing `details.url`.
 */
export function fdc3ToContentInput(app: Fdc3Application): ContentInput {
	const here: HereHostManifest = app.hostManifests?.here ?? {};
	const name = app.title ?? app.name;
	const icon = app.icons?.[0]?.src;

	if (app.type === "native") {
		if (app.details.path === undefined) {
			throw new Error(`FDC3 native app "${app.appId}" is missing details.path`);
		}

		const desktop: DesktopContentInput = {
			contentType: "DESKTOP",
			name,
			contentId: app.appId,
			active: here.active ?? true,
			featured: here.featured ?? false,
			icon,
			customLabel: here.customLabel,
			nativeSettings: {
				desktopPath: app.details.path,
				desktopArgs: app.details.arguments ?? [],
				withSnap: here.withSnap ?? false
			},
			// This sample always emits an `access` object, re-applying the desired state on
			// every write. To leave access unchanged on update, the HERE API accepts
			// `access: null`, which this manifest-driven mapper does not emit.
			access: here.access ?? DEFAULT_ACCESS
		};
		return desktop;
	}

	if (app.details.url === undefined) {
		throw new Error(`FDC3 web app "${app.appId}" is missing details.url`);
	}

	const web: WebContentInput = {
		contentType: "WEB",
		name,
		contentId: app.appId,
		active: here.active ?? true,
		featured: here.featured ?? false,
		icon,
		customLabel: here.customLabel,
		urls: [app.details.url],
		hereApiAccess: here.hereApiAccess ?? false,
		allowDuplication: here.allowDuplication ?? false,
		allowOpenWithDefaultBrowser: here.allowOpenWithDefaultBrowser ?? false,
		useAIContext: here.useAIContext ?? false,
		enableSimpleWindow: here.enableSimpleWindow ?? false,
		viewSettings: here.viewSettings ?? DEFAULT_VIEW,
		environmentAvailability: here.environmentAvailability ?? DEFAULT_ENV,
		dataLossPreventionSettings: here.dataLossPreventionSettings ?? DEFAULT_DLP,
		redirects: [],
		// FDC3 interop intent declarations pass straight through when present.
		interop: app.interop,
		// This sample always emits an `access` object, re-applying the desired state on every
		// write. To leave access unchanged on update, the HERE API accepts `access: null`,
		// which this manifest-driven mapper does not emit.
		access: here.access ?? DEFAULT_ACCESS
	};
	return web;
}

/**
 * Convert a live content node back into an FDC3 2.0 Application record — the
 * opposite of `fdc3ToContentInput`. Used to export a directory as an
 * app-directory manifest, e.g. to carry it into another environment.
 *
 * Deliberately omits `access`: `subjects`/`primitives` are org-specific
 * UUIDs (a permission or group id meaningful only in the org the node came
 * from), so carrying them into a different org's manifest would either fail
 * outright or — worse — silently grant access to whatever unrelated
 * subject happens to hold that id there. Leaving `access` out of the FDC3
 * record matches how `sync.ts` already treats undeclared access: applying
 * this manifest anywhere leaves that app's access assignments untouched
 * rather than wiping or misapplying them.
 */
export function contentNodeToFdc3Application(node: ContentNode): Fdc3Application {
	const here: HereHostManifest = {
		active: node.active,
		featured: node.featured ?? false,
		customLabel: node.customLabel
	};

	if (node.type === "DESKTOP") {
		return {
			appId: node.id,
			name: node.name,
			title: node.name,
			type: "native",
			details: { path: node.desktopPath, arguments: node.desktopArgs },
			icons: node.icon === undefined ? undefined : [{ src: node.icon }],
			hostManifests: { here: { ...here, withSnap: node.withSnap ?? false } }
		};
	}

	return {
		appId: node.id,
		name: node.name,
		title: node.name,
		type: "web",
		// A node can carry more than one URL (e.g. allowed redirect targets); FDC3
		// has room for exactly one, so take the primary — same simplification the
		// UI's "Validate" already makes when it loads a node back into the form.
		details: { url: node.url ?? node.urls?.[0] },
		icons: node.icon === undefined ? undefined : [{ src: node.icon }],
		hostManifests: {
			here: {
				...here,
				hereApiAccess: node.hereApiAccess ?? false,
				allowDuplication: node.allowDuplication ?? false,
				allowOpenWithDefaultBrowser: node.allowOpenWithDefaultBrowser ?? false,
				useAIContext: node.useAIContext ?? false,
				enableSimpleWindow: node.enableSimpleWindow ?? false,
				viewSettings: node.viewSettings ?? DEFAULT_VIEW,
				environmentAvailability: node.environmentAvailability ?? DEFAULT_ENV,
				dataLossPreventionSettings: node.dataLossPreventionSettings ?? DEFAULT_DLP
			}
		}
	};
}
