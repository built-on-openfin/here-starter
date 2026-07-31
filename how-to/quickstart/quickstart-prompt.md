# Prompt: Build a HERE.io Enterprise Browser FDC3 + Search Agent demo kit

Copy everything below this line and give it to an agent (or developer) as a single instruction.

---

Create two standalone demo projects in a shared parent folder, showing off HERE Enterprise Browser / OpenFin functionality for an app-builder audience: FDC3 interop, HERE notifications, and a custom search agent. Both projects must be simple enough that a developer can unzip the folder, run a couple of npm commands, and see everything working locally. Build both, verify they compile and serve correctly, and write README instructions for each.

## Folder structure

```
<parent-folder>/
  example-app/            -- FDC3 + Notifications demo (single HTML page)
  custom-search-agent/    -- HERE custom search agent example
```

## Shared conventions for both projects

- TypeScript source in `src/`, compiled/bundled with **esbuild** (not webpack), type-checked separately with `tsc --noEmit`.
- A single zero-dependency Node `server.js` per project (plain `http` module, no Express) that statically serves the project folder with correct MIME types and blocks path traversal outside the project root.
- `package.json` scripts: `typecheck`, `build`, `start`, and `dev` (`build` then `start`).
- `.gitignore` excluding `node_modules/`, `dist/`, `*.log`.
- Node.js 18+ required.
- Every README must include: what the project demonstrates, project layout, setup/build/run commands, and links to the real reference docs used (FDC3 spec pages, HERE docs, GitHub sample repo).
- Do not ship `node_modules`, `dist`, or `package-lock.json` in the delivered folder -- those are build artifacts the developer generates themselves. Verify the whole chain (`npm install && npm run typecheck && npm run build && npm start`) works from a clean copy of the delivered files before considering either project done.

---

## Project 1: `example-app` (FDC3 + Notifications demo, port 3000)

A single HTML page (`index.html`) with a single TypeScript file (`src/app.ts`) bundled to `dist/app.js`, plus `styles.css`. Visual theme: dark navy background (`#0a0e1a`), elevated card backgrounds (`#121a2a`-ish gradient), blue accent (`#4f7cff`), cyan secondary accent (`#22d3ee`), clean sans-serif (system font stack), rounded cards with subtle borders -- inspired by the look of `https://www.here.io/enterprise-browser` (dark, modern, enterprise SaaS). Fully responsive: a card grid that lays out 2x2 or 4-across on wide screens and collapses to a single column under ~900px (use `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`).

### Functionality

1. **FDC3 validation**: on page load, check `window.fdc3`. If present, wire up all FDC3 functionality. If absent, show a dismissible-looking banner at the top of the page stating FDC3 isn't available and that the page must run inside the HERE Enterprise Browser to see FDC3 features (notifications can still be attempted).

2. **FDC3 context listener** (Card 1: "FDC3 Listening"): call `fdc3.addContextListener(null, handler)` to receive *any* context type. Display the raw received context as pretty-printed JSON in a read-only `<textarea>`. If the received context has `type === "fdc3.contact"`, additionally render a "Contact Card" showing the fields (Name, Email, FDS ID, Interaction Date, Interaction Type, Gender, Date of Birth, Age, Marital Status) as label/value rows. Show a status line reflecting listener state and the last message's source app (from listener metadata).

3. **FDC3 broadcaster** (Card 2: "FDC3 Broadcasting"): a button that calls `fdc3.broadcast()` with a sample `fdc3.contact` context following the FDC3 2.0 contact schema (`https://fdc3.finos.org/schemas/2.0/contact.schema.json`, which only strictly requires `type` and `id`). Use this exact sample record (nest the CRM-style fields under `id`):

   ```json
   {
     "type": "fdc3.contact",
     "name": "Ashley James",
     "id": {
       "email": "ashley.james@example.com",
       "FDS_ID": "0032600001446plAAA",
       "interactionDate": "01/05/2023",
       "interactionType": "Email",
       "ssn": "100-123-101",
       "gender": "Female",
       "dob": "04/23/1987",
       "age": "35",
       "maritalStatus": "Married"
     }
   }
   ```

   Disable the button when `window.fdc3` isn't present. Show a status line with the last broadcast time or error.

4. **FDC3 intent listener** (Card 4: "FDC3 Intent Listening"): call `fdc3.addIntentListener("ViewContact", handler)`. This is the receiving end of the intent raised by `custom-search-agent` (Project 2) -- it closes the loop between the two demos. Reuse the same rendering logic as the context listener: print the received context as JSON in its own textarea, and render a Contact Card if the context is `fdc3.contact`. Refactor the contact-card renderer into a shared function that takes the target card/body elements as parameters so both the context-listener card and the intent-listener card can use it.

5. **HERE notification** (Card 3: "HERE Notifications"): a button that uses `@openfin/notifications` to create a basic notification, following the official example from `https://resources.here.io/docs/guide/devs/notifications/get-started/`:

   ```ts
   import * as Notifications from "@openfin/notifications";

   await Notifications.register();

   const exampleNotification = {
     indicator: { color: "orange", text: "News Alert" },
     title: "US added 138K jobs; Lower than target 185K",
     body: "After more than a decade of growth, U.S. nonfarm payrolls shrunk by 701,000, and the unemployment rate rose to 4.4%...",
     buttons: [
       {
         title: "Read More",
         type: "button",
         cta: true,
         onClick: { task: "open-link", url: "https://resources.here.io/docs/guide/devs/notifications/get-started/" }
       }
     ]
   };

   await Notifications.create(exampleNotification);
   ```

   Wrap in try/catch so it fails gracefully with a status message when run outside HERE/OpenFin (e.g. in plain Chrome).

### Layout

Four section cards in a responsive grid, in this order: **FDC3 Listening**, **FDC3 Broadcasting**, **HERE Notifications**, **FDC3 Intent Listening**. Each card has: an icon + heading, a short 1-3 sentence summary of what it demonstrates, the interactive element(s) (textarea/button/status line), and a small "Reference:" footer line linking to the relevant doc page(s):
- Card 1 links to `https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addcontextlistener`
- Card 2 links to `https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#broadcast` and `https://fdc3.finos.org/schemas/2.0/contact.schema.json`
- Card 3 links to `https://resources.here.io/docs/guide/devs/notifications/get-started/`
- Card 4 links to `https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addintentlistener`

Top bar: small brand mark + a link out to `https://www.here.io/enterprise-browser`. A hero section above the cards with a one-paragraph intro. The FDC3-missing banner sits between the hero and the card grid, hidden by default.

### Files to create

```
example-app/
  index.html          -- the page described above, loads styles.css and dist/app.js
  styles.css          -- dark theme, responsive card grid
  intents.json         -- Interop Settings definition for the app (see below)
  src/
    app.ts             -- all logic described above, in one file
    fdc3-types.d.ts     -- hand-written ambient types for window.fdc3 (don't pull in @finos/fdc3 as a runtime dep here -- keep this project dependency-light); declare a global `Window.fdc3?: FDC3DesktopAgent` with addContextListener, addIntentListener, broadcast, getInfo
  server.js             -- static file server, serves the folder root on port 3000 (index.html at "/")
  package.json          -- name "here-fdc3-example-app"; dependency: @openfin/notifications (latest 2.x); devDependencies: esbuild, typescript
  tsconfig.json         -- target/lib ES2020+DOM, module ES2020, strict, noEmit: true (esbuild does the actual emit)
  README.md
```

`intents.json` (uploaded via this app's Admin Console entry under Apps > Interop Settings, to enable it to receive the `ViewContact` intent from `custom-search-agent`):

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

`package.json` build script: `esbuild src/app.ts --bundle --outfile=dist/app.js --target=es2020 --format=iife --sourcemap`. Serve as a plain `<script src="dist/app.js"></script>` (not a module).

### README must cover

- What it demonstrates (the 5 numbered features above).
- Setup/build/run commands.
- Viewing in plain Chrome (FDC3 banner shows, notifications fail gracefully) vs. inside HERE Enterprise Browser (everything works).
- A "closing the loop with custom-search-agent" section: register that agent, upload `intents.json` here via Admin Console > Apps > this app > Interop Settings > Update, run both apps, search for a contact in HERE, pick "Raise Intent" on a result from the search agent, and watch it land in this app's "FDC3 Intent Listening" card.

---

## Project 2: `custom-search-agent` (HERE custom search agent example, port 3001)

A stripped-down adaptation of the official HERE search agent sample at `https://github.com/built-on-openfin/here-starter/tree/main/how-to/create-a-search-agent/agents/interop`, simplified to one TypeScript file with no webpack/eslint/prettier tooling (use esbuild instead). This agent searches a small local contact list and offers **two actions** per search result instead of the default single URL-navigation action:

- **Raise Intent**: calls `window.fdc3.raiseIntent(<configured intent name>, contactContext)` with the selected contact as an `fdc3.contact` context, and performs no navigation.
- **Start Email**: the traditional URL-based action -- returns `{ url: "mailto:<contact's email>" }`, which HERE opens in the user's default mail client.

### Dependencies

- `@openfin/cloud-api` (latest 13.x) -- provides `Agent.register()`, `Agent.getConfiguration()`, and the `Agent.SearchResult` / `Agent.OnSearchRequestListener` / `Agent.OnSearchActionListener` types.
- `@finos/fdc3` (latest 2.x) -- only for the `Context` type used when constructing the `fdc3.contact` object; runtime `window.fdc3` is injected by HERE itself.
- `esbuild` + `typescript` as dev dependencies.

### Agent logic (`src/agent.ts`)

- Define a `ContactRecord` interface matching the sample data shape: `id, name, email, interactionDate, interactionType, ssn, gender, dob, age, maritalStatus` (all strings).
- Define a `SearchAgentConfig` interface with two configurable fields: `intent: string` (the FDC3 intent name to raise) and `dataSource: string` (URL of the JSON contact list to search).
- On `window.addEventListener("load", ...)`, call an `init()` function that:
  1. Reads `intent` and `dataSource` via `Agent.getConfiguration<SearchAgentConfig>()`, logging warnings if either is missing.
  2. Fetches `dataSource` and stores the parsed `ContactRecord[]` in module state.
  3. Calls `Agent.register({ search: { onAction, onSearch } })` then `agent.setIsReady(true)`.
- `onSearch` (an `Agent.OnSearchRequestListener`): lowercase-filters the contact list by name/email substring match against `query`, paginates using `context.pageNumber`/`context.pageSize`, and maps each match to an `Agent.SearchResult` with `key` (contact id), `title` (name), `label` (email), `data: { contact }`, and an `actions` array containing (in order) a `"raise-intent"` action (only if an intent name is configured, titled "Raise Intent") and always a `"start-email"` action (titled "Start Email").
- `onAction` (an `Agent.OnSearchActionListener`): switches on `action.name`. For `"raise-intent"`, build the `fdc3.contact` context (`{ type: "fdc3.contact", name, id: { email, FDS_ID: contact.id } }`) and call `window.fdc3.raiseIntent(intentName, context)`, catching/logging errors, returning `undefined` (no navigation). Guard against missing `intentName`, missing `contact`, or missing `window.fdc3` with warnings. For `"start-email"`, return `{ url: "mailto:" + contact.email }`. Default case logs an unknown-action warning.

### Sample data (`public/data/contacts.json`)

An array of 5 `ContactRecord` objects. Include this exact first record (for continuity with `example-app`'s broadcast sample), plus 4 more invented contacts with varied names/emails/interaction types/genders/marital statuses so search filtering has something to demonstrate:

```json
{
  "id": "0032600001446plAAA",
  "name": "Ashley James",
  "email": "ashley.james@example.com",
  "interactionDate": "01/05/2023",
  "interactionType": "Email",
  "ssn": "100-123-101",
  "gender": "Female",
  "dob": "04/23/1987",
  "age": "35",
  "maritalStatus": "Married"
}
```

### Agent schema (`public/agent-schema.json`)

This is the file uploaded (or linked by URL) in the HERE Admin Console to register the agent. **Critical:** it must declare interop support in `features`, or HERE will never inject `window.fdc3` into the agent's execution context, even when the agent is genuinely running inside HERE Enterprise Browser (this is a real gotcha -- without it, URL-based actions work fine but `window.fdc3` is silently `undefined` for FDC3 actions).

```json
{
  "$schema": "https://resources.here.io/schemas/agents/v1.0/custom-agent.json",
  "type": "custom",
  "url": "http://localhost:3001/public/agent.html",
  "title": "Contacts Interop Search Agent",
  "description": "Example search agent that searches a local contact list and raises an FDC3 intent (instead of navigating to a URL) when a result is selected.",
  "icon": "<a small data-URI icon, svg or png, doesn't need to be elaborate>",
  "features": {
    "search": { "supportsPaging": false },
    "interop": { "fdc3Version": "2.0" }
  },
  "configurationFields": [
    {
      "name": "intent",
      "title": "FDC3 Intent Name",
      "placeholder": "e.g. ViewContact",
      "defaultValue": "ViewContact"
    },
    {
      "name": "dataSource",
      "title": "Contact Data Source URL",
      "placeholder": "http://localhost:3001/public/data/contacts.json",
      "defaultValue": "http://localhost:3001/public/data/contacts.json"
    }
  ]
}
```

The default intent name (`ViewContact`) must match what `example-app`'s intent listener registers, so the two projects work together with zero reconfiguration.

### `public/agent.html`

A minimal page with no real visible UI (just a short explanatory paragraph) that loads the bundled script as an ES module: `<script type="module" src="/dist/agent.js"></script>`. This page has no UI because it runs headlessly, registered by HERE in the background.

### Build

Bundle as an ES module (not IIFE, unlike `example-app`) since `agent.html` loads it with `type="module"`: `esbuild src/agent.ts --bundle --outfile=dist/agent.js --format=esm --target=es2020 --sourcemap`.

### Files to create

```
custom-search-agent/
  public/
    agent.html            -- loads dist/agent.js as a module, no real UI
    agent-schema.json      -- described above
    data/
      contacts.json         -- 5 sample contacts described above
  src/
    agent.ts                -- all agent logic described above
    fdc3-global.d.ts         -- `import type { DesktopAgent } from "@finos/fdc3"; declare global { interface Window { fdc3?: DesktopAgent } } export {};`
  server.js                  -- static server on port 3001, default route "/" -> "/public/agent.html"
  package.json                -- name "here-custom-search-agent-example"; dependencies: @openfin/cloud-api, @finos/fdc3; devDependencies: esbuild, typescript
  tsconfig.json
  README.md
```

### README must cover

- What the two actions do and how they differ (intent vs. URL).
- Setup/build/run (`npm install`, `npm run build`, `npm start` -> `http://localhost:3001`), and that this agent has no visible UI and only does anything useful when actually registered inside HERE (opening `agent.html` directly in Chrome loads fine but never receives search requests).
- Step-by-step Admin Console registration: Content > Create > Agent type, upload/link `agent-schema.json`, fill in the two configuration fields, grant Access, Publish.
- A note that `example-app` (Project 1) is already set up to receive the `ViewContact` intent -- explain uploading its `intents.json` via that app's Interop Settings, running both apps, and testing the full loop.
- A **Troubleshooting** section explicitly covering the `features.interop.fdc3Version` requirement: symptom (`window.fdc3 is not available` in the console even though `[here-agent]` OpenFin injectable logs prove it's running inside HERE; URL-based actions like "Start Email" work fine, only FDC3 actions fail), cause (missing `interop` declaration in `agent-schema.json`), and fix (add the block shown above, then go back to this agent's Admin Console entry, re-upload/re-link the schema, and re-publish -- editing the local file alone does not update an already-registered agent, since the Admin Console stores its own copy of the schema from when it was first configured).

---

## Verification checklist (do this for both projects before finishing)

1. `npm install` from a clean checkout (no pre-existing `node_modules`).
2. `npm run typecheck` -- zero errors.
3. `npm run build` -- produces `dist/*.js` with no errors.
4. `npm start` -- serves on the correct port; `curl` the main HTML page, the built JS bundle, and (for the search agent) the schema JSON and sample data JSON, confirming all return HTTP 200 and valid content (JSON files should parse).
5. Confirm the delivered folder contains no `node_modules/`, `dist/`, or `package-lock.json` -- those should only exist in your own temporary build/verification copy, never in the folder you hand off.
