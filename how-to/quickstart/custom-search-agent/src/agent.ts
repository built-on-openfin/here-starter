/**
 * HERE.io Custom Search Agent -- Interop example (stripped down)
 * ----------------------------------------------------------------
 * Adapted from the official example:
 * https://github.com/built-on-openfin/here-starter/tree/main/how-to/create-a-search-agent/agents/interop
 *
 * This agent searches a small local contact list and offers two actions on
 * each search result:
 *   1. "Raise Intent" -- raises an FDC3 intent against the selected contact,
 *      instead of the default "navigate to a URL" action.
 *   2. "Start Email" -- the more traditional URL-based action, which opens
 *      the user's mail client via a "mailto:<email>" URL.
 *
 * Reference docs:
 *   HERE search agents:       https://resources.here.io/docs/guide/devs/search-agents
 *   HERE agent admin config:  https://resources.here.io/docs/guide/admins/agents
 *   FDC3 raiseIntent:         https://fdc3.finos.org/docs/2.0/api/ref/DesktopAgent#raiseintent
 */

import { Agent } from "@openfin/cloud-api";
import type { AppIdentifier, Context } from "@finos/fdc3";

/** Shape of a single record in the contact data source (public/data/contacts.json). */
interface ContactRecord {
	id: string;
	name: string;
	email: string;
	interactionDate: string;
	interactionType: string;
	ssn: string;
	gender: string;
	dob: string;
	age: string;
	maritalStatus: string;
}

/** Fields configured for this agent in the HERE Admin Console. */
interface SearchAgentConfig extends Record<string, unknown> {
	/** The supertab ID to open when a search result is selected. */
	supertab: string;
	/** URL of the JSON file containing the array of ContactRecord to search over. */
	dataSource: string;
}

let contacts: ContactRecord[] = [];
let supertabId: string | undefined;

/**
 * Loads configuration + data, then registers this page as a HERE search agent.
 */
async function init(): Promise<void> {
	if (typeof window.fin === "undefined") {
		console.error(
			"window.fin is not available. This search agent must run inside the HERE Enterprise Browser, not a standard browser tab."
		);
		return;
	}

	const { supertab, dataSource } = await Agent.getConfiguration<SearchAgentConfig>();



	if (supertab && supertab.length > 0) {
		supertabId = supertab.trim();
		console.log(`Search agent will open supertab "${supertabId}" when a result is selected.`);
	} else {
		console.warn(
			'No supertab configured. Set the "Super Tab ID" field for this agent in the Admin Console.'
		);
	}

	if (dataSource) {
		try {
			const response = await fetch(dataSource);
			if (!response.ok) {
				throw new Error(`Request failed: ${response.status}`);
			}
			contacts = (await response.json()) as ContactRecord[];
			console.log(`Loaded ${contacts.length} contact(s) from ${dataSource}`);
		} catch (err) {
			console.error("Failed to load contact data source", err);
		}
	} else {
		console.error('No "Contact Data Source URL" configured for this agent.');
	}

	const agent = await Agent.register({
		search: { onAction, onSearch }
	});
	await agent.setIsReady(true);
}

/**
 * Handles an incoming search query from HERE and returns matching contacts.
 */
const onSearch: Agent.OnSearchRequestListener = async ({ context, query }) => {
	const { pageNumber, pageSize } = context;
	const search = query.toLowerCase();

	const matches = contacts.filter(
		(contact) => contact.name.toLowerCase().includes(search) || contact.email.toLowerCase().includes(search)
	);

	const startIndex = (pageNumber - 1) * pageSize;
	const page = matches.slice(startIndex, startIndex + pageSize);

	const results: Agent.SearchResult[] = page.map((contact) => {
		// The first action is triggered automatically when a user selects the result.
		const actions: Agent.SearchResult["actions"] = [];
		
		actions.push({
			name: "open-dashboard",
			title: "Advisor Dashboard",
			description: `Opens the Advisor Dashboard for ${contact.name}`
		});

		return {
			key: contact.id,
			title: contact.name,
			label: contact.email,
			actions,
			data: { contact }
		};
	});

	return { results };
};

/**
 * Handles the user triggering an action on a search result.
 *   - "raise-intent" raises an FDC3 intent with the contact as context and
 *     performs no navigation (returns undefined).
 *   - "open-dashboard" opens the Wealth Management Dashboard for the contact.
 */
const onAction: Agent.OnSearchActionListener = (action, result) => {
	const { name } = action;
	const { contact } = (result.data ?? {}) as { contact?: ContactRecord };

	if (!contact) {
		console.warn(`Cannot handle action "${name}": no contact data on this result.`);
		return undefined;
	}

	const fdc3Context: Context = {
				type: "fdc3.contact",
				name: contact.name,
				id: {
					email: contact.email,
					FDS_ID: contact.id
				}
	};

	switch (name) {

		case "open-dashboard": {
			// The more traditional action type: return a URL for HERE to
			// navigate to, which opens the Advisor Dashboard here.
			const appId: AppIdentifier = {
				appId: supertabId as string
			};
			console.log(`Opening Advisor Dashboard for ${contact.name} in supertab "${supertabId}"`);
			window.fdc3?.open(appId, fdc3Context).catch((err: unknown) => {
				console.error("Failed to open Advisor Dashboard", err);
			});
			return;
		}

		default: {
			console.warn(`Unknown action: ${name}`);
			return undefined;
		}
	}
};

window.addEventListener("load", () => {
	init().catch((err: unknown) => {
		console.error("Failed to initialize search agent", err);
	});
});
