# Bloomberg TCAPI Agent — Developer Documentation

## Overview

The **Bloomberg TCAPI Agent** is an OpenFin custom agent that bridges **HERE Enterprise Browser** and the **Bloomberg Terminal**. It connects to a locally running Bloomberg Terminal via the `@openfin/bloomberg` SDK, registers itself as a Cloud API agent, and exposes an **OpenFin Inter-Application Bus (IAB) channel** so that other applications can trigger Bloomberg Terminal commands programmatically.

### Key capabilities

- Authenticates with the Bloomberg Terminal using an API key configured in the HERE EB Admin Console.
- Executes **Bloomberg mnemonics** (e.g. `BIO`, `DES`, `GP`) against specified Terminal panels using GraphQL mutations via the Bloomberg TC API.
- Monitors connection health every 60 seconds and **automatically reconnects** if the connection drops.
- Exposes a named IAB channel (`<uuid>/bbg-tcapi`) for client applications to send requests and query health status.

---

## Project Structure

```
bbg-tcapi/
├── client/
│   └── src/
│       ├── index.ts              # Entry point — wires up the agent
│       ├── bloomberg-tcapi.ts    # Core agent logic
│       └── shapes.ts             # TypeScript interfaces (Logger, BloombergAgentSettings)
├── public/
│   ├── agent-schema.json         # Agent manifest for HERE EB Admin Console
│   └── agent-search-bloomberg-tcapi.html
└── package.json
```

---

## Dependencies

| Package | Purpose |
|---|---|
| `@openfin/bloomberg` | Bloomberg Terminal Connection API (TC API) |
| `@openfin/cloud-api` | HERE Cloud Agent registration and configuration |
| `@openfin/core` | OpenFin runtime (`fin`) — IAB channel, identity |

---

## Module: `shapes.ts`

Defines the shared TypeScript interfaces used across the agent.

### `Logger`

A generic logging interface injected at runtime. Implementations must provide:

| Method | Description |
|---|---|
| `info(message, ...params)` | Logs informational messages |
| `error(message, ...params)` | Logs errors |
| `warn(message, ...params)` | Logs warnings |
| `trace(message, ...params)` | Logs fine-grained trace output |
| `debug(message, ...params)` | Logs debug-level detail |

The interface keeps the agent decoupled from any specific logging library. The concrete implementation in `index.ts` delegates to the browser `console.*` methods.

### `BloombergAgentSettings`

Typed representation of the agent's configuration as stored in HERE EB Admin Console.

| Field | Type | Description |
|---|---|---|
| `bbgAPIKey` | `string` | Bloomberg Terminal API key used for authentication |

---

## Module: `index.ts` — Entry Point

This is the **browser entry point** loaded when the agent HTML page is opened inside Enterprise Browser.

### Startup sequence

1. A concrete `Logger` implementation is constructed that wraps `console.log/error/warn/trace/debug`.
2. The `load` DOM event triggers `init()`.
3. `init()` calls `initBBGAgent(logger)` from `bloomberg-tcapi.ts`.
4. After the Bloomberg agent is set up, `Agent.register({})` registers this window as a HERE Cloud Agent.
5. `bloombergAgent.setIsReady(true)` signals to HERE EB that the agent is ready to serve.

```
window load
  └─ init()
       ├─ initBBGAgent(logger)   ← bloomberg-tcapi.ts
       ├─ Agent.register({})
       └─ bloombergAgent.setIsReady(true)
```

---

## Module: `bloomberg-tcapi.ts` — Core Agent Logic

This module contains all Bloomberg Terminal interaction logic. It is **stateful** — module-level variables track connection objects, health state, and timers.

### Module-level State

| Variable | Type | Purpose |
|---|---|---|
| `agentLogger` | `Logger \| undefined` | Injected logger instance |
| `bbgChannel` | `OpenFin.ChannelProvider \| undefined` | The IAB channel for client communication |
| `bbgConnection` | `BloombergConnection \| undefined` | Active Bloomberg Terminal connection |
| `healthCheckTimerId` | `number \| undefined` | Timer ID for the periodic health check interval |
| `healthCheckInProgress` | `boolean` | Guard flag preventing concurrent health checks |
| `reconnectInProgress` | `boolean` | Guard flag preventing concurrent reconnection attempts |
| `currentApiKey` | `string` | Stored API key used during reconnection |
| `isConnectionHealthy` | `boolean` | Last known health state of the BBG connection |
| `lastSuccessfulHealthCheckAt` | `string \| undefined` | ISO timestamp of last passing health check |
| `lastFailedHealthCheckAt` | `string \| undefined` | ISO timestamp of last failing health check |

### Constants

| Constant | Value | Description |
|---|---|---|
| `HEALTH_CHECK_INTERVAL_MS` | `60_000` | Milliseconds between each health check (60 seconds) |
| `HEALTH_CHECK_QUERY` | `"query { __typename }"` | Lightweight GraphQL introspection probe used as a ping |

---

### Method: `init(logger?)`

**Signature:** `async function init(logger?: Logger): Promise<void>`

The public entry point for the Bloomberg agent. Called by `index.ts` after the page loads.

**Step-by-step:**

1. Stores the optional `logger` in the `agentLogger` module variable.
2. Calls `Agent.getConfiguration<BloombergAgentSettings>()` to retrieve the `bbgAPIKey` configured in the HERE EB Admin Console.
3. If configuration retrieval fails, logs a warning and falls back to an empty API key string.
4. Calls `connectToBBGTerminal(bbgAPIKey)` to establish the initial Bloomberg Terminal connection.
5. Calls `startConnectionHealthChecks()` to begin the 60-second periodic health monitoring loop.
6. Calls `createBBGChannel()` to create the OpenFin IAB channel.
7. Calls `registerBBGMessageAction()` to attach message handlers to the channel.

---

### Method: `connectToBBGTerminal(bbgAPIKey)`

**Signature:** `async function connectToBBGTerminal(bbgAPIKey: string): Promise<void>`

Establishes the connection to the Bloomberg Terminal.

**Step-by-step:**

1. Stores `bbgAPIKey` in the module-level `currentApiKey` (used later for reconnection).
2. Calls `enableLogging()` from the `@openfin/bloomberg` SDK to activate SDK-level diagnostic logging.
3. Enters a **retry loop** (`while (true)`):
   - Attempts `connect(bbgAPIKey)` — the Bloomberg SDK establishes a connection to the locally running Terminal process.
   - **On success:** stores the returned `BloombergConnection` in `bbgConnection`, sets `isConnectionHealthy = true`, records `lastSuccessfulHealthCheckAt`, then returns.
   - **On `TerminalConnectionError`:** logs a warning and waits 30 seconds before retrying. This error indicates the Terminal is not yet reachable (e.g. still starting up).
   - **On any other error type:** logs the error and re-throws immediately — these are unrecoverable errors (e.g. invalid API key format).
4. Wraps the entire loop in a `try/catch` to log and absorb unexpected errors without crashing the agent.

> **Note:** The retry loop only exits on a successful connection or a non-`TerminalConnectionError`. This means the agent will keep trying until the Bloomberg Terminal is available.

---

### Method: `createBBGChannel()`

**Signature:** `async function createBBGChannel(): Promise<void>`

Creates the named OpenFin IAB channel through which client applications send Bloomberg commands.

**Step-by-step:**

1. If `bbgChannel` already exists, returns immediately (idempotent).
2. Verifies that `window.fin` is available — if not, logs an error and returns. This check ensures the agent is running inside an OpenFin environment.
3. Calls `fin.InterApplicationBus.Channel.create(...)` with the channel name `<uuid>/bbg-tcapi`, where `<uuid>` is the OpenFin identity UUID of the agent window.
4. Stores the resulting `ChannelProvider` in the module-level `bbgChannel`.

> The channel name is scoped to the agent's UUID to avoid naming conflicts in multi-agent deployments.

---

### Method: `registerBBGMessageAction()`

**Signature:** `function registerBBGMessageAction(): void`

Attaches message action handlers to the IAB channel.

**Step-by-step:**

1. Verifies `bbgChannel` exists. If not, logs an error.
2. Registers the **`bbg-request`** action:
   - Receives a payload of `{ mnemonic: string, value: string, panel?: string }` from the client.
   - Logs the received payload and sender identity.
   - Calls `sendToBBGTerminal(mnemonic, value, panel ?? "ZERO")` to forward the command to the Terminal.
3. Registers the **`bbg-health`** action:
   - Calls `getConnectionHealthStatus()` to build the health status object.
   - Returns it to the calling client — clients can use this to display connection diagnostics.

> Clients connect to `<agentUUID>/bbg-tcapi` and dispatch these named actions using the OpenFin IAB client API.

---

### Method: `sendToBBGTerminal(mnemonic, value, panel)`

**Signature:** `async function sendToBBGTerminal(mnemonic: string, value: unknown, panel: string): Promise<void>`

Executes a Bloomberg mnemonic command via the TC API's GraphQL interface.

**Step-by-step:**

1. Checks that `bbgConnection` exists. If not, marks `isConnectionHealthy = false` and returns.
2. Constructs a **GraphQL mutation string** depending on the mnemonic:
   - If `mnemonic === "BIO"`: builds a mutation that calls `runFunctionInPanel` with only `mnemonic` and `panel: ZERO`. BIO is a user-lookup function that does not take a security argument.
   - For all other mnemonics: builds a mutation that includes `mnemonic`, `panel`, and `security1: "<value>"` — the security or instrument identifier to display in the Terminal panel.
3. Calls `bbgConnection.executeApiRequest(queryStr, "local")` to send the mutation to the Bloomberg TC API gateway running locally.
4. **On success:** sets `isConnectionHealthy = true` and records `lastSuccessfulHealthCheckAt`.
5. **On error:** sets `isConnectionHealthy = false`, records `lastFailedHealthCheckAt`, and logs the error. Does not re-throw — the channel response is fire-and-forget.

#### GraphQL Mutation shape (general case)

```graphql
mutation {
  runFunctionInPanel(input: {
    mnemonic: "<mnemonic>",
    panel: <ZERO|ONE|TWO|THREE|FOUR>,
    security1: "<value>"
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

---

### Method: `startConnectionHealthChecks()`

**Signature:** `function startConnectionHealthChecks(): void`

Starts a repeating timer that verifies the Bloomberg connection is still alive.

**Step-by-step:**

1. If a previous timer exists (`healthCheckTimerId`), clears it first to avoid duplicate intervals.
2. Calls `window.setInterval(...)` with an interval of `HEALTH_CHECK_INTERVAL_MS` (60 seconds).
3. On each tick:
   - Skips the check if `healthCheckInProgress` is `true` (prevents overlapping checks).
   - Sets `healthCheckInProgress = true`.
   - Calls `verifyConnectionHealth()`.
   - If the check returns `false`, calls `reconnectToBBGTerminal()`.
   - Resets `healthCheckInProgress = false` in the `finally` block.

---

### Method: `verifyConnectionHealth()`

**Signature:** `async function verifyConnectionHealth(): Promise<boolean>`

Sends a lightweight GraphQL introspection query to confirm the Bloomberg connection is responsive.

**Step-by-step:**

1. If `bbgConnection` is `undefined`, marks the connection unhealthy, records `lastFailedHealthCheckAt`, logs a warning, and returns `false`.
2. Calls `bbgConnection.executeApiRequest(HEALTH_CHECK_QUERY, "local")` with the probe query `query { __typename }`. This is the smallest valid GraphQL query and causes no side effects on the Terminal.
3. **On success:** marks `isConnectionHealthy = true`, records `lastSuccessfulHealthCheckAt`, logs debug info, and returns `true`.
4. **On error:** marks `isConnectionHealthy = false`, records `lastFailedHealthCheckAt`, sets `bbgConnection = undefined` (forces full reconnection), logs a warning, and returns `false`.

---

### Method: `reconnectToBBGTerminal()`

**Signature:** `async function reconnectToBBGTerminal(): Promise<void>`

Attempts to restore a dropped Bloomberg Terminal connection.

**Step-by-step:**

1. Guards against concurrent reconnection attempts using the `reconnectInProgress` flag.
2. Guards against reconnection without a stored API key (`currentApiKey`).
3. Sets `reconnectInProgress = true`.
4. Calls `connectToBBGTerminal(currentApiKey)` to re-establish the connection using the same API key retrieved during `init()`.
5. Logs any errors without re-throwing.
6. Resets `reconnectInProgress = false` in the `finally` block.

---

### Method: `getConnectionHealthStatus()`

**Signature:** `function getConnectionHealthStatus(): { isConnected, hasConnectionObject, lastSuccessfulHealthCheckAt?, lastFailedHealthCheckAt?, checkIntervalMs }`

Returns a snapshot of the current connection health state. Called in response to `bbg-health` channel requests.

**Returns:**

| Field | Type | Description |
|---|---|---|
| `isConnected` | `boolean` | Whether the last health check or API call succeeded |
| `hasConnectionObject` | `boolean` | Whether a `BloombergConnection` object currently exists |
| `lastSuccessfulHealthCheckAt` | `string \| undefined` | ISO 8601 timestamp of the last successful check |
| `lastFailedHealthCheckAt` | `string \| undefined` | ISO 8601 timestamp of the last failed check |
| `checkIntervalMs` | `number` | The configured health check interval (always 60,000) |

---

## Agent Schema (`agent-schema.json`)

The manifest uploaded to HERE EB Admin Console that registers this agent:

| Field | Value |
|---|---|
| `type` | `custom` |
| `url` | `http://localhost:8181/agent-search-bloomberg-tcapi.html` |
| `title` | Bloomberg TCAPI Agent |
| `features.interop.fdc3Version` | `2.0` |
| Configuration field | `bbgAPIKey` — admin-entered Bloomberg API key |

---

## IAB Channel Protocol

Client applications (see `bbg-tcapi-client`) connect to the channel `<agentUUID>/bbg-tcapi` and dispatch the following actions:

### `bbg-request`

**Payload:**

```ts
{
  mnemonic: string;   // Bloomberg function mnemonic, e.g. "DES", "GP", "BIO"
  value: string;      // Security/instrument identifier, e.g. "AAPL US Equity"
  panel?: string;     // Target Terminal panel: "ZERO" | "ONE" | "TWO" | "THREE" | "FOUR"
                      // Defaults to "ZERO" if omitted
}
```

**Response:** none (fire-and-forget).

### `bbg-health`

**Payload:** none.

**Response:** the `getConnectionHealthStatus()` object (see above).

---

## Connection Lifecycle

```
init()
  │
  ├─ connectToBBGTerminal()  ──(retry every 30s on TerminalConnectionError)──►  bbgConnection established
  │
  ├─ startConnectionHealthChecks()  ──(every 60s)──►  verifyConnectionHealth()
  │                                                        │
  │                                                    unhealthy?
  │                                                        │
  │                                                    reconnectToBBGTerminal()
  │                                                        └─► connectToBBGTerminal()
  │
  ├─ createBBGChannel()  ──►  IAB channel "<uuid>/bbg-tcapi" ready
  │
  └─ registerBBGMessageAction()
         ├─ "bbg-request"  ──►  sendToBBGTerminal(mnemonic, value, panel)
         └─ "bbg-health"   ──►  getConnectionHealthStatus()
```

---

## Running Locally

```shell
# Install dependencies
npm install

# Build the TypeScript client
npm run build

# Serve on http://localhost:8181
npm run start
```

Ensure the Bloomberg Terminal is running and a user is logged in before starting the agent. Upload `public/agent-schema.json` to the HERE EB Admin Console and add an application entry pointing to `http://localhost:8181/agent-search-bloomberg-tcapi.html`.
