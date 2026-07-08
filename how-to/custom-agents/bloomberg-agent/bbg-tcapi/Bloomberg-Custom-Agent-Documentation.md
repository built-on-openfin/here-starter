# Bloomberg TCAPI Agent

## Purpose

The Bloomberg TCAPI agent is a HERE Enterprise Browser custom agent that connects Enterprise Browser workflows to a locally running Bloomberg Terminal.

At runtime the agent:

- registers itself through `@openfin/cloud-api`
- connects to Bloomberg Terminal through `@openfin/bloomberg`
- exposes an OpenFin Inter-Application Bus channel named `<agent-uuid>/bbg-tcapi`
- accepts Bloomberg function requests from client applications
- polls FDC3 channel membership and writes an interop flag into `localStorage`
- performs periodic health checks and reconnects when the terminal connection drops

This document reflects the current implementation in `client/src`, the current manifest in `public/agent-schema.json`, and the current package scripts in `package.json`.

## Current Package Snapshot

- Package name: `here-starter-create-a-search-agent-bloomberg-tcapi`
- Package version: `11.1.0`
- Served page: `http://localhost:8181/agent-search-bloomberg-tcapi.html`
- Bundle output: `public/js/agent-search-bloomberg-tcapi.bundle.js`
- Agent manifest: `public/agent-schema.json`

## Runtime Prerequisites

- HERE Enterprise Browser access
- permission to upload a custom agent manifest in the HERE EB Admin Console
- a locally running Bloomberg Terminal with a signed-in user
- a Bloomberg API key configured in the `bbgAPIKey` agent setting
- an OpenFin environment where `window.fin` is available
- FDC3 support if you want the interop tracking behavior described below

If you are running commands from Windows PowerShell and `npm` is blocked by script execution policy, use `npm.cmd` instead.

## Project Layout

```text
bbg-tcapi/
|-- client/
|   |-- src/
|   |   |-- bloomberg-tcapi.ts
|   |   |-- index.ts
|   |   `-- shapes.ts
|   |-- tsconfig.json
|   `-- webpack.config.js
|-- public/
|   |-- agent-schema.json
|   |-- agent-search-bloomberg-tcapi.html
|   `-- js/
|       `-- agent-search-bloomberg-tcapi.bundle.js
|-- Bloomberg-Custom-Agent-Documentation.md
|-- README.md
`-- package.json
```

## Dependencies

### Runtime dependencies

- `@finos/fdc3@^2.0.3`: FDC3 desktop agent access used for interop tracking
- `@openfin/bloomberg@^2.1.0`: Bloomberg Terminal Connection API
- `@openfin/cloud-api@11.1.0`: HERE agent registration and configuration
- `@openfin/core@^41.102.4`: OpenFin runtime APIs, including `fin` and IAB

### Tooling dependencies

The package also uses TypeScript, webpack, ESLint, Prettier, and `markdownlint-cli` for local validation.

## NPM Scripts

- `npm run kill`: stops the sample through the shared helper script
- `npm run client`: opens `http://localhost:8181/agent-search-bloomberg-tcapi.html`
- `npm run build-client`: builds the browser bundle with webpack
- `npm run build`: main build entrypoint
- `npm run start`: serves the static assets from `./public` on port `8181`
- `npm run setup`: installs dependencies and builds the package
- `npm run eslint`: lints source files
- `npm run markdownlint`: lints markdown
- `npm run validate`: runs Prettier, ESLint, and markdownlint

## Startup Flow

The entrypoint is `client/src/index.ts`.

1. A `Logger` implementation is created around `console.log`, `console.warn`, `console.error`, `console.trace`, and `console.debug`.
2. On window `load`, `init()` runs.
3. `init()` calls `initBBGAgent(logger)` from `client/src/bloomberg-tcapi.ts`.
4. The agent registers with `Agent.register({})`.
5. The agent calls `setIsReady(true)` after registration completes.

```text
window load
`-- init()
    |-- initBBGAgent(logger)
    |-- Agent.register({})
    `-- bloombergAgent.setIsReady(true)
```

If initialization throws, the error is logged and the agent is not marked ready.

## Core Module State

The main implementation lives in `client/src/bloomberg-tcapi.ts`.

The module keeps process-wide state for:

- the injected logger
- the OpenFin channel provider
- the active Bloomberg connection
- the health-check interval ID
- the FDC3 interop polling interval ID
- reconnect and health-check guard flags
- the last configured API key
- the last known connection status and timestamps

### Important constants

- `HEALTH_CHECK_INTERVAL_MS = 60000`
- `HEALTH_CHECK_QUERY = "query { __typename }"`
- `INTEROP_TRACKING_INTERVAL_MS = 2000`

## Configuration

The agent reads configuration through `Agent.getConfiguration<BloombergAgentSettings>()`.

Supported configuration fields:

- `bbgAPIKey: string`

If configuration lookup fails, the agent logs a warning and continues with an empty API key.

## Bloomberg Connection Lifecycle

### Initial connection

During initialization the agent:

1. stores the configured API key in module state
2. enables SDK logging through `enableLogging()`
3. attempts `connect(bbgAPIKey)`

Retry behavior:

- if the failure is a `TerminalConnectionError`, the agent waits 30 seconds and retries indefinitely
- if the failure is another error type, the error is logged as unrecoverable for that attempt

On successful connection the agent:

- stores the `BloombergConnection`
- sets `isConnectionHealthy` to `true`
- updates `lastSuccessfulHealthCheckAt`

### Health monitoring

After the first connection attempt, the agent starts a repeating health check every 60 seconds.

Each cycle:

1. skips if a health check is already running
2. calls `verifyConnectionHealth()`
3. sends `query { __typename }` through `executeApiRequest(..., "local")`
4. marks the connection healthy on success
5. clears the connection object and marks the connection unhealthy on failure
6. triggers `reconnectToBBGTerminal()` when unhealthy

### Reconnection

Reconnection is guarded so only one reconnect attempt can run at a time. The reconnect path reuses the stored API key and calls the same connection routine used at startup.

## FDC3 Interop Tracking

The current implementation contains behavior that is not documented in the local package README.

Before connecting to Bloomberg, the agent calls `initInteropTracking()`.

That routine:

1. reads `window.fdc3`
2. attempts `getCurrentChannel()`
3. inspects `currentChannel.displayMetadata.color`
4. writes `enable-BBG-Interop` to `localStorage`
5. starts polling every 2 seconds for FDC3 channel changes
6. rewrites `enable-BBG-Interop` whenever the current channel changes

### Local storage contract

- key `enable-BBG-Interop` is set to `true` when the current FDC3 channel has a non-`none` color
- key `enable-BBG-Interop` is set to `false` when there is no current channel, no color, or the color resolves to `none`

This is implemented as polling rather than an event-driven subscription so it remains compatible with stricter broker environments.

## OpenFin Channel Contract

The agent creates a channel named `<fin.me.identity.uuid>/bbg-tcapi`.

The UUID scoping prevents collisions when multiple agent windows are present.

### Registered actions

- `bbg-request`: sends a Bloomberg function request to Terminal
- `bbg-health`: returns the agent's current connection health snapshot

### `bbg-request` payload

```ts
{
  mnemonic: string;
  value: string;
  panel?: string;
}
```

Behavior:

- `panel` defaults to `ZERO`
- the agent logs the inbound payload and sender
- the request is forwarded to `sendToBBGTerminal(...)`
- the handler does not return a structured success payload

### `bbg-health` response

```ts
{
  isConnected: boolean;
  hasConnectionObject: boolean;
  lastSuccessfulHealthCheckAt?: string;
  lastFailedHealthCheckAt?: string;
  checkIntervalMs: number;
}
```

## Bloomberg Request Execution

`sendToBBGTerminal(mnemonic, value, panel)` builds a GraphQL mutation and executes it through the Bloomberg connection with target `local`.

### Special case: `BIO`

If `mnemonic === "BIO"`, the current implementation always sends:

- `mnemonic: "BIO"`
- `panel: ZERO`
- no `security1` field

That means the inbound `panel` value is ignored for `BIO` in the current implementation.

### General case

For any other mnemonic, the request includes:

- `mnemonic`
- `panel`
- `security1: value`

Representative mutation shape:

```graphql
mutation {
  runFunctionInPanel(input: {
    mnemonic: "DES",
    panel: ZERO,
    security1: "AAPL US Equity"
  }) {
    ... on Result {
      succeeded
      details
    }
    ... on Error {
      errorCategory
      errorMessage
    }
  }
}
```

On successful execution the agent updates health state and logs the Bloomberg response. On failure it marks the connection unhealthy, timestamps the failure, and logs the error.

## Agent Manifest

The current `public/agent-schema.json` contains:

- `$schema: https://resources.here.io/schemas/agents/v1.0/custom-agent.json`
- `type: custom`
- `version: 1.0`
- `url: http://localhost:8181/agent-search-bloomberg-tcapi.html`
- `title: Bloomberg TCAPI Agent`
- `description: An example agent that uses Bloomberg TCAPI to communicate with the Terminal`
- `features.interop.fdc3Version: 2.0`

The manifest exposes one configuration field:

```json
[
  {
    "name": "bbgAPIKey",
    "title": "Bloomberg API Key",
    "placeholder": "Enter your Bloomberg API key"
  }
]
```

## Served Assets

The page served to Enterprise Browser is `public/agent-search-bloomberg-tcapi.html`.

That page:

- loads `./common/style/app.css`
- loads `./js/agent-search-bloomberg-tcapi.bundle.js` as an ES module
- renders a simple `Please wait...` placeholder while the agent initializes

## Local Development

### Install and build

```shell
npm install
npm run build
```

If PowerShell blocks `npm`, use:

```shell
npm.cmd install
npm.cmd run build
```

### Start the static server

```shell
npm run start
```

This serves the `public` folder on `http://localhost:8181` with caching disabled.

### Optional helper launch

```shell
npm run client
```

This uses the shared launch script to open the sample page URL.

### Validation

```shell
npm run validate
```

## HERE Admin Setup

1. Build and serve the sample locally.
2. Upload `public/agent-schema.json` in the HERE EB Admin Console.
3. Ensure the uploaded agent points to `http://localhost:8181/agent-search-bloomberg-tcapi.html`.
4. Create or update an application entry with permission to access that URL.
5. Set the `bbgAPIKey` configuration value in the custom agent configuration.
6. Launch the agent inside Enterprise Browser.

## Operational Notes

- The IAB channel is only created when `window.fin` is available.
- If Bloomberg is not connected yet, `bbg-request` calls are logged and dropped rather than queued.
- `bbg-health` is the only built-in diagnostics endpoint exposed over the channel.
- FDC3 interop tracking depends on `window.fdc3`; if FDC3 is absent, the agent logs a warning and skips that behavior.
- The current implementation does not expose a teardown path for the polling timers.

## Related Sample

The companion client sample for sending `bbg-request` messages lives alongside this package in the repository under the `bbg-tcapi-client` folder.
