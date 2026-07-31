# HERE.io FDC3 & Notifications Example App

A minimal, single-page reference app for building on the HERE Enterprise Browser.
It demonstrates:

1. **FDC3 validation** &mdash; checks for `window.fdc3` and only wires up FDC3
   functionality if it's present.
2. **FDC3 listening** &mdash; `fdc3.addContextListener(null, handler)` prints any
   received context as JSON, and renders a Contact Card when the context type is
   `fdc3.contact`.
3. **FDC3 broadcasting** &mdash; a button that calls `fdc3.broadcast()` with a
   sample `fdc3.contact` record.
4. **FDC3 intent listening** &mdash; `fdc3.addIntentListener("ViewContact", handler)`
   receives the intent raised by this repo's `custom-search-agent` example,
   printing it as JSON and rendering a Contact Card, closing the loop between
   the two demos.
5. **HERE Notifications** &mdash; a button that creates a basic notification via
   `@openfin/notifications`.

## Project layout

```
example-app/
  index.html        single HTML page (theme inspired by here.io/enterprise-browser)
  styles.css         responsive, 4-card layout
  server.js          zero-dependency static file server (port 3000)
  intents.json       Interop Settings definition for the ViewContact intent
  src/
    app.ts           all app logic, in TypeScript
    fdc3-types.d.ts   minimal ambient types for window.fdc3
  dist/              build output (created by `npm run build`, gitignored)
  package.json
  tsconfig.json
```

## Requirements

- Node.js 18+ and npm
- Access to npm to pull @openfin packages, specifically, `@openfin/notifications`

## Setup

```bash
cd example-app
npm install
```

## Build

Compiles and bundles `src/app.ts` (plus its `@openfin/notifications` import)
into `dist/app.js` using esbuild:

```bash
npm run build
```

## Run locally

```bash
npm start
```

This serves the folder at **http://localhost:3000**. Or run build + start in
one step:

```bash
npm run dev
```

## Viewing the app

- **Plain Chrome** (`http://localhost:3000`): the page loads and shows the
  "window.fdc3 not found" banner, since no FDC3 desktop agent is present.
  Notifications will also fail gracefully with a status message, since
  `@openfin/notifications` requires the OpenFin/HERE runtime.
- **HERE Enterprise Browser**: open `http://localhost:3000` as a tab/app
  inside the browser. `window.fdc3` will be injected by the platform, so
  the listening card, broadcasting card, intent listening card, and
  notification button all work end to end.

## Closing the loop with `custom-search-agent`

This app's "FDC3 Intent Listening" card is the receiving end of the
`custom-search-agent` example elsewhere in this repo. To see the full loop
work:

1. Register `custom-search-agent` as a search agent in HERE (see its
   README), with its **FDC3 Intent Name** field left as the default
   `ViewContact`.
2. In the HERE Admin Console, open this app's entry under **Apps**, go to
   **Interop Settings**, click **Update**, and upload `intents.json` from
   this folder (or paste a URL to it if you're hosting it). This tells HERE
   that this app can handle the `ViewContact` intent for `fdc3.contact`
   context.
3. Make sure this app is running (`npm start`, served at
   `http://localhost:3000`) and open in HERE alongside the search agent.
4. Search for a contact in HERE (e.g. "Ashley") and pick the **Raise Intent**
   action on a result from `custom-search-agent`.
5. HERE routes the `ViewContact` intent to this app (opening it if it isn't
   already running), and the contact shows up in the "FDC3 Intent Listening"
   card as JSON and as a Contact Card.

## Reference docs

- FDC3 `addContextListener`: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addcontextlistener
- FDC3 `addIntentListener`: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addintentlistener
- FDC3 `broadcast`: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#broadcast
- FDC3 `fdc3.contact` schema: https://fdc3.finos.org/schemas/2.0/contact.schema.json
- HERE app Interop Settings: https://resources.here.io/docs/guide/admins/apps#interop-settings
- HERE notifications guide: https://resources.here.io/docs/guide/devs/notifications/get-started/
- HERE Enterprise Browser: https://www.here.io/enterprise-browser
