# Use Custom AI Center

## Overview

This example shows how a HERE Browser Custom AI Center panel can load a
client-provided URL and use an injected `window._aiContext` API to:

- Fetch context automatically on panel load.
- Register a context-change listener and refresh context whenever it changes.
- Cache context output per `pageId` so switching tabs restores previous
  results.

This sample focuses on platform API usage only. It does not call any model
endpoint or stream model responses.

## Running the Sample

1. Install dependencies:

```shell
npm install
```

1. Build:

```shell
npm run build
```

1. Start localhost server:

```shell
npm run start
```

1. Configure HERE Browser Custom AI Center URL to:

`http://localhost:8183/`

## Using the Demo

- Open the panel and context is fetched automatically.
- As context changes, the listener re-reads `getContext()` and appends new
  context entries.
- Switch supertabs/pages, then return to see cached context restore for that
  page id.
- Context output is append-only for the session (no clear/reset control in
  this simplified version).

## API Notes

The adapter in `client/src/ai-context-adapter.ts` intentionally keeps API
calls isolated from UI code.

Based on observed HERE Browser behavior, this sample uses:

- `getContext()`
- `setContextChangedListener(handler)`

`setContextChangedListener` callback payload is treated as opaque and the
sample re-reads `getContext()` inside the callback.

The context output includes `results.[entry].readability.data` when
readability succeeds, and summarizes large screenshot/base64 payloads by
length.

## Temporary Mock Mode

For local validation without injected APIs, you can enable a temporary mock
payload based on real-world output:

- [http://localhost:8183/?mockContext=1](http://localhost:8183/?mockContext=1)

This keeps the same UI flow but serves a deterministic sample `getContext()`
response from the adapter.

## What This Shows

- A custom panel can be used as AI Center content.
- The panel can fetch supertab context and support tab switching with per-page
  context restore.
- The panel can react to context changes automatically via listener
  registration.

## What This Does Not Show

- Sending context data to a model provider.
- Prompt engineering, model orchestration, or token streaming.
