# HERE.io Custom Search Agent -- Interop Example

A stripped-down example of a [HERE custom search agent](https://resources.here.io/docs/guide/devs/search-agents),
adapted from the official
[Interop Agent sample](https://github.com/built-on-openfin/here-starter/tree/main/how-to/create-a-search-agent/agents/interop).

Each search result offers two actions instead of just the default "navigate to
a URL" behavior:

- **Raise Intent** -- calls `window.fdc3.raiseIntent()` with the selected
  contact as context, instead of navigating anywhere.
- **Start Email** -- the more traditional URL-based action: it returns a
  `mailto:<contact's email>` URL, which HERE opens in the user's default mail
  client.

## How it works

1. HERE loads `public/agent.html` in the background and it registers itself as a
   search agent via `Agent.register()` from `@openfin/cloud-api`.
2. When a user searches in HERE, `onSearch` filters a local contact list
   (`public/data/contacts.json`) by name/email and returns matches, each with
   a "Raise Intent" action (only if an intent is configured) and a
   "Start Email" action.
3. When a user selects a result and triggers the **Raise Intent** action,
   `onAction` calls `window.fdc3.raiseIntent(<configured intent name>, contactContext)`
   and returns no URL.
4. When a user triggers the **Start Email** action instead, `onAction` returns
   `{ url: "mailto:<contact's email>" }`, which HERE navigates to, opening the
   user's mail client with a new message addressed to that contact.

## Project layout

```
custom-search-agent/
  public/
    agent.html          the page HERE loads to run this agent (no visible UI)
    agent-schema.json    agent definition uploaded/linked in the Admin Console
    data/
      contacts.json      sample contact records the agent searches over
  src/
    agent.ts             all agent logic (search + FDC3 intent raising), in TypeScript
    fdc3-global.d.ts      declares window.fdc3 using @finos/fdc3 types
  dist/                  build output (created by `npm run build`, gitignored)
  server.js              zero-dependency static file server (port 3001)
  package.json
  tsconfig.json
```

## Requirements

- Node.js 18+ and npm
- Access to a HERE Enterprise Browser instance, with Admin Console rights (or
  someone who has them) to add a search agent

## Setup

```bash
cd custom-search-agent
npm install
```

## Build

Compiles and bundles `src/agent.ts` (plus its `@openfin/cloud-api` and
`@finos/fdc3` imports) into `dist/agent.js` using esbuild:

```bash
npm run build
```

Optionally type-check without emitting anything:

```bash
npm run typecheck
```

## Run locally

```bash
npm start
```

This serves the folder at **http://localhost:3001**:

- Agent page: `http://localhost:3001/public/agent.html`
- Agent schema: `http://localhost:3001/public/agent-schema.json`
- Sample data: `http://localhost:3001/public/data/contacts.json`

Or run build + start in one step: `npm run dev`.

Note: this page has no visible UI and depends on `@openfin/cloud-api` /
`window.fdc3`, both of which are only injected when the page is loaded by the
HERE Enterprise Browser platform itself. Opening `agent.html` directly in plain
Chrome will load without errors but the agent will never receive search
requests -- you need to register it in HERE (see below) to see it work.

## Configure the agent in HERE (Admin Console)

These steps follow the general process described in
[Develop custom search agents](https://resources.here.io/docs/guide/devs/search-agents)
and [Agents](https://resources.here.io/docs/guide/admins/agents):

1. Make sure `npm start` is running locally (or the built `public/` + `dist/`
   folders are hosted somewhere reachable by the browser, e.g. an internal
   dev server) so `http://localhost:3001/public/agent.html` resolves.
2. In the HERE Admin Console, go to **Content** and click **Create**, then
   choose the **Agent** content type.
3. Upload `public/agent-schema.json`, either by pasting its URL
   (`http://localhost:3001/public/agent-schema.json`) or uploading the file
   directly, following the same flow used for **Apps** (Basics, Access,
   Interop Settings, etc.).
4. Fill in the two configuration fields defined by this agent (from
   `agent-schema.json`'s `configurationFields`):
   - **FDC3 Intent Name** -- the FDC3 intent to raise when a result is
     selected, e.g. `ViewContact`. This must match an intent that some other
     app/agent in your HERE environment actually listens for.
   - **Contact Data Source URL** -- where the agent fetches its searchable
     contact records, e.g. `http://localhost:3001/public/data/contacts.json`.
5. Under **Access**, grant the users or groups who should be able to use this
   search agent, then click **Publish**.

Note: `agent-schema.json`'s `features.interop.fdc3Version` field is what
tells HERE to inject `window.fdc3` into this agent at all -- without it,
`Raise Intent` will silently fail even inside the real HERE Enterprise
Browser. See **Troubleshooting** below if you hit this.

### Registering the FDC3 intent listener side

Raising an intent only does something if another app in HERE is listening for
it. This repo's `example-app` example is already set up as that receiving
app -- it calls `fdc3.addIntentListener("ViewContact", handler)` and displays
whatever it receives in its "FDC3 Intent Listening" card.

To wire it up:

1. In the HERE Admin Console, open `example-app`'s entry under **Apps**, go
   to **Interop Settings**, click **Update**, and upload
   `example-app/intents.json` (or paste a URL to it), which declares:

   ```json
   {
     "intents": {
       "listensFor": {
         "ViewContact": {
           "displayName": "View Contact",
           "contexts": ["fdc3.contact"]
         }
       }
     }
   }
   ```

2. Make sure `example-app` is running locally (`npm start`, on
   `http://localhost:3000` by default) and open in HERE alongside this
   search agent.
3. Search for a contact in HERE and pick **Raise Intent** on a result from
   this agent -- HERE routes the `ViewContact` intent to `example-app`,
   where it shows up as JSON and as a Contact Card.

If you want a different app (or intent name) to receive it instead, define
`fdc3.addIntentListener(<your intent>, handler)` there and update this
agent's **FDC3 Intent Name** configuration field to match; the FDC3
[`addIntentListener` reference](https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addintentlistener)
covers the API in full.

## Troubleshooting: "window.fdc3 is not available" inside HERE

If "Start Email" works but **Raise Intent** logs
`window.fdc3 is not available -- this agent must run inside the HERE
Enterprise Browser` even though you're genuinely running inside HERE (you'll
see `[here-agent]` log lines from OpenFin's injectables in the console),
the cause is almost always that `public/agent-schema.json`'s `features`
block doesn't declare interop support. HERE only injects `window.fdc3` into
an agent's execution context for agents that declare it up front:

```json
"features": {
  "search": { "supportsPaging": false },
  "interop": { "fdc3Version": "2.0" }
}
```

This repo's `agent-schema.json` already includes this. If you've customized
the schema and lost it, add it back. Because the Admin Console stores its
own copy of the schema from when you registered the agent, editing the local
file isn't enough by itself -- go back to this agent's entry under
**Content**, click **Edit**, re-upload the updated `agent-schema.json` (or
re-paste its URL), and **Publish** again for the change to take effect.

## Reference docs

- HERE custom search agents: https://resources.here.io/docs/guide/devs/search-agents
- HERE agent admin configuration: https://resources.here.io/docs/guide/admins/agents
- Official Interop Agent sample: https://github.com/built-on-openfin/here-starter/tree/main/how-to/create-a-search-agent/agents/interop
- FDC3 `raiseIntent`: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#raiseintent
- FDC3 `addIntentListener`: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addintentlistener
