/**
 * HERE.io / OpenFin FDC3 + Notifications demo
 * -------------------------------------------
 * A minimal, single-file TypeScript example showing four pieces of
 * enterprise-browser functionality:
 *
 *   1. FDC3 availability validation (window.fdc3)
 *   2. An FDC3 context listener (fdc3.addContextListener)
 *   3. An FDC3 broadcaster (fdc3.broadcast) using a sample Contact
 *   4. An FDC3 intent listener (fdc3.addIntentListener) for "ViewContact" --
 *      the receiving end of the intent raised by this repo's
 *      custom-search-agent, closing the loop between the two example apps.
 *   5. A HERE.io notification example (@openfin/notifications)
 *
 * Reference docs:
 *   FDC3 addContextListener: https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addcontextlistener
 *   FDC3 addIntentListener:  https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#addintentlistener
 *   FDC3 broadcast:          https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#broadcast
 *   FDC3 Contact schema:     https://fdc3.finos.org/schemas/2.0/contact.schema.json
 *   HERE notifications:      https://resources.here.io/docs/guide/devs/notifications/get-started/
 */

import * as Notifications from "@openfin/notifications";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Minimal shape of an FDC3 Contact context, per the 2.0 contact schema. */
interface Fdc3Contact extends FDC3Context {
  type: "fdc3.contact";
  id: {
    email?: string;
    FDS_ID?: string;
    [key: string]: string | undefined;
  };
  name?: string;
}

// The sample record used by the broadcaster button. It follows the
// fdc3.contact schema (https://fdc3.finos.org/schemas/2.0/contact.schema.json)
// with the extra CRM-style fields nested under `id`, since fdc3.contact only
// formally requires `type` and `id`.
const SAMPLE_CONTACT: Fdc3Contact = {
  type: "fdc3.contact",
  name: "Ashley James",
  id: {
    email: "ashley.james@example.com",
    FDS_ID: "0032600001446plAAA",
    interactionDate: "01/05/2023",
    interactionType: "Email",
    ssn: "100-123-101",
    gender: "Female",
    dob: "04/23/1987",
    age: "35",
    maritalStatus: "Married",
  },
};

// The FDC3 intent this app listens for. Matches the default "FDC3 Intent
// Name" configured on the custom-search-agent example in this repo, so the
// two demos work together out of the box.
const VIEW_CONTACT_INTENT = "ViewContact";

// ---------------------------------------------------------------------------
// DOM handles
// ---------------------------------------------------------------------------

const fdc3Banner = document.getElementById("fdc3-banner") as HTMLDivElement;
const listenerStatus = document.getElementById("listener-status") as HTMLSpanElement;
const contextOutput = document.getElementById("context-output") as HTMLTextAreaElement;
const contactCard = document.getElementById("contact-card") as HTMLDivElement;
const contactCardBody = document.getElementById("contact-card-body") as HTMLDivElement;
const broadcastButton = document.getElementById("broadcast-btn") as HTMLButtonElement;
const broadcastStatus = document.getElementById("broadcast-status") as HTMLSpanElement;
const intentStatus = document.getElementById("intent-status") as HTMLSpanElement;
const intentOutput = document.getElementById("intent-output") as HTMLTextAreaElement;
const intentContactCard = document.getElementById("intent-contact-card") as HTMLDivElement;
const intentContactCardBody = document.getElementById("intent-contact-card-body") as HTMLDivElement;
const notifyButton = document.getElementById("notify-btn") as HTMLButtonElement;
const notifyStatus = document.getElementById("notify-status") as HTMLSpanElement;

// ---------------------------------------------------------------------------
// 1) FDC3 validation
// ---------------------------------------------------------------------------

function initFdc3(): void {
  if (window.fdc3) {
    fdc3Banner.classList.add("hidden");
    initContextListener();
    initBroadcaster();
    initIntentListener();
  } else {
    fdc3Banner.classList.remove("hidden");
    fdc3Banner.textContent =
      "window.fdc3 was not found. Open this page inside the HERE Enterprise Browser " +
      "to see FDC3 listening and broadcasting in action. (Plain Chrome can still run " +
      "the Notifications demo below if @openfin/notifications is supported.)";
    listenerStatus.textContent = "unavailable (no FDC3 desktop agent)";
    broadcastButton.disabled = true;
    broadcastStatus.textContent = "Requires an FDC3 desktop agent.";
    intentStatus.textContent = "unavailable (no FDC3 desktop agent)";
  }
}

// ---------------------------------------------------------------------------
// 2) FDC3 context listener
// ---------------------------------------------------------------------------

function initContextListener(): void {
  listenerStatus.textContent = "listening for any context…";

  window.fdc3!
    .addContextListener(null, (context: FDC3Context, metadata?: FDC3ContextMetadata) => {
      contextOutput.value = JSON.stringify(context, null, 2);

      if (context && context.type === "fdc3.contact") {
        renderContactCard(context as Fdc3Contact, contactCard, contactCardBody);
      } else {
        contactCard.classList.add("hidden");
      }

      if (metadata?.source) {
        listenerStatus.textContent = `last message from: ${JSON.stringify(metadata.source)}`;
      } else {
        listenerStatus.textContent = "last message received (no source metadata)";
      }
    })
    .catch((err: unknown) => {
      listenerStatus.textContent = `failed to add context listener: ${String(err)}`;
    });
}

function renderContactCard(
  contact: Fdc3Contact,
  cardEl: HTMLDivElement,
  cardBodyEl: HTMLDivElement
): void {
  const { name, id } = contact;
  const rows: Array<[string, string | undefined]> = [
    ["Name", name],
    ["Email", id.email],
    ["FDS ID", id.FDS_ID],
    ["Interaction Date", id.interactionDate],
    ["Interaction Type", id.interactionType],
    ["Gender", id.gender],
    ["Date of Birth", id.dob],
    ["Age", id.age],
    ["Marital Status", id.maritalStatus],
  ];

  cardBodyEl.innerHTML = rows
    .filter(([, value]) => value !== undefined)
    .map(
      ([label, value]) =>
        `<div class="contact-row"><span class="contact-label">${label}</span><span class="contact-value">${value}</span></div>`
    )
    .join("");

  cardEl.classList.remove("hidden");
}

// ---------------------------------------------------------------------------
// 3) FDC3 broadcaster
// ---------------------------------------------------------------------------

function initBroadcaster(): void {
  broadcastButton.disabled = false;
  broadcastButton.addEventListener("click", async () => {
    try {
      await window.fdc3!.broadcast(SAMPLE_CONTACT);
      broadcastStatus.textContent = `Broadcast sent at ${new Date().toLocaleTimeString()}`;
    } catch (err) {
      broadcastStatus.textContent = `Broadcast failed: ${String(err)}`;
    }
  });
}

// ---------------------------------------------------------------------------
// 4) FDC3 intent listener -- receiving end of custom-search-agent's intent
// ---------------------------------------------------------------------------

/**
 * Registers a listener for the "ViewContact" intent. This is the receiving
 * end of the intent raised by this repo's custom-search-agent example: pick
 * a "Raise Intent" action on a search result there, and (once this app's
 * intents.json is uploaded via Interop Settings in the Admin Console) HERE
 * routes the intent here, where it shows up below as JSON and as a Contact
 * Card -- closing the loop between the two demos.
 */
function initIntentListener(): void {
  intentStatus.textContent = `listening for the "${VIEW_CONTACT_INTENT}" intent…`;

  window.fdc3!
    .addIntentListener(VIEW_CONTACT_INTENT, (context: FDC3Context, metadata?: FDC3ContextMetadata) => {
      intentOutput.value = JSON.stringify(context, null, 2);

      if (context && context.type === "fdc3.contact") {
        renderContactCard(context as Fdc3Contact, intentContactCard, intentContactCardBody);
      } else {
        intentContactCard.classList.add("hidden");
      }

      if (metadata?.source) {
        intentStatus.textContent = `last intent received from: ${JSON.stringify(metadata.source)}`;
      } else {
        intentStatus.textContent = "last intent received (no source metadata)";
      }
    })
    .catch((err: unknown) => {
      intentStatus.textContent = `failed to add intent listener: ${String(err)}`;
    });
}

// ---------------------------------------------------------------------------
// 5) HERE.io notification demo
// ---------------------------------------------------------------------------

async function sendExampleNotification(): Promise<void> {
  await Notifications.register();

  const exampleNotification: Notifications.NotificationOptions = {
    indicator: {
      color: "orange",
      text: "News Alert",
    },
    title: "US added 138K jobs; Lower than target 185K",
    body:
      "After more than a decade of growth, U.S. nonfarm payrolls shrunk by 701,000, " +
      "and the unemployment rate rose to 4.4%...",
    buttons: [
      {
        title: "Read More",
        type: "button",
        cta: true,
        onClick: {
          task: "open-link",
          url: "https://resources.here.io/docs/guide/devs/notifications/get-started/",
        },
      } as unknown as Notifications.ButtonOptions,
    ],
  } as Notifications.NotificationOptions;

  await Notifications.create(exampleNotification);
}

function initNotifications(): void {
  notifyButton.addEventListener("click", async () => {
    notifyStatus.textContent = "Sending notification…";
    try {
      await sendExampleNotification();
      notifyStatus.textContent = "Notification sent. Check Notification Center.";
    } catch (err) {
      notifyStatus.textContent =
        "Notifications are only available inside the HERE Enterprise Browser " +
        `(${String(err)}).`;
    }
  });
}

// ---------------------------------------------------------------------------
// Boot
// ---------------------------------------------------------------------------

window.addEventListener("DOMContentLoaded", () => {
  initFdc3();
  initNotifications();
});
