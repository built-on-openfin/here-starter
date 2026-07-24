import type {
	Access,
	ContentInput,
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

/** Convert an FDC3 2.0 Application record into a HERE content create/update body. */
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
