# Use Custom AI Center

## Overview

This example shows how a HERE Browser Custom AI Center panel can load a
client-provided URL and use an injected `window._aiContext` API to:

- Provide information about the supertab automatically as you load one.
- Register a context-change listener and provide a button for displaying the
  AI Context.
- Add a button for fetching Interop/FDC3 Context (Signals)
- Cache context output per `pageId` so switching tabs restores previous
  results.

This sample focuses on platform API usage only. It does not call any model
endpoint or stream model responses.

For cases where you want your AI Center to fetch the context of the
Tab/Supertab that has AI enabled content then we added a 'Get Signal Context'
button which calls our example AI adapter to lookup the Context Group Id of
the AI enabled content and it fetches the current context of type
'here.ai.context'. This is just an example of using the Interop API to get
context but you have the flexibility to determine what context you want to get
or if you want a context listener to get everything published on a context
group.

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

- Open the panel and information is fetched automatically.
- Use the Get AI Context to fetch what is currently being shown (this could
  be setup to read and refresh automatically). Content needs to be AI enabled.
- Use the Get Signal Context button to get any context of 'here.ai.context'
  published to the context group. At least 1 piece of content needs to be
  enabled to fetch from the Context group.
- Switch supertabs/pages, then return to see cached context restore for that
  page id.
- Context output can be cleared using the Clear button if needed.

## API Notes

The adapter in `client/src/ai-context-adapter.ts` intentionally keeps API
calls isolated from UI code.

Based on observed HERE Browser behavior, this sample uses the follow AI
Context APIs:

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
- The panel can gain access to FDC3/Interop Context.

## What This Does Not Show

- Sending context data to a model provider.
- Prompt engineering, model orchestration, or token streaming.

## Note About This Example

This is an example to demonstrate the use of our AI Context and Interop APIs.
This is not a production application and shouldn't be treated as such. Please
use this as a guide and provide feedback. Thanks!
