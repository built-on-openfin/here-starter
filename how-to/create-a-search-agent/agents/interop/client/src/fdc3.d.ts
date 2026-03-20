import type { DesktopAgent } from "@finos/fdc3";

declare global {
	interface Window {
		fdc3: DesktopAgent;
	}
}

export {};
