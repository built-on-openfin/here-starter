/**
 * Minimal ambient types for the FDC3 2.0 DesktopAgent API, just enough to
 * cover the calls used in this example (addContextListener + broadcast).
 *
 * These are intentionally hand-written (rather than pulled from the
 * @finos/fdc3 package) to keep this template dependency-free for the parts
 * that don't need bundling — the HERE Enterprise Browser injects the real
 * `window.fdc3` implementation at runtime.
 *
 * Full spec: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent
 */

export {};

declare global {
  interface FDC3AppIdentifier {
    appId: string;
    instanceId?: string;
  }

  interface FDC3Context {
    type: string;
    id?: Record<string, string | undefined>;
    name?: string;
    [key: string]: unknown;
  }

  interface FDC3ContextMetadata {
    source?: FDC3AppIdentifier;
    [key: string]: unknown;
  }

  type FDC3ContextHandler = (context: FDC3Context, metadata?: FDC3ContextMetadata) => void;

  interface FDC3Listener {
    unsubscribe(): void;
  }

  interface FDC3DesktopAgent {
    addContextListener(
      contextType: string | null,
      handler: FDC3ContextHandler
    ): Promise<FDC3Listener>;
    addIntentListener(
      intent: string,
      handler: FDC3ContextHandler
    ): Promise<FDC3Listener>;
    broadcast(context: FDC3Context): Promise<void>;
    getInfo?: () => Promise<unknown>;
    [key: string]: unknown;
  }

  interface Window {
    fdc3?: FDC3DesktopAgent;
  }
}
