/* eslint-disable unicorn/prefer-query-selector */
import type OpenFin from "@openfin/core";
import { fin } from "@openfin/core";

let channelClient: OpenFin.ChannelClient | undefined;
const CONNECTION_STATUS_POLL_MS = 30_000;

/**
 * Checks to see if local storage has a flag enabled to disable Bloomberg interop.
 * If the flag is not set, or is set to any value other than "false" (case-insensitive), interop is considered enabled.
 * @returns true if interop is enabled, false otherwise.
 */
function isBbgInteropEnabled(): boolean {
	const value = window.localStorage.getItem("enable-BBG-Interop");
	const enabled = value?.toLowerCase() !== "false";
	console.log(`Bloomberg interop enabled: ${enabled}`);
	return enabled;
}

/**
 * Dispatches an action to the channel if Bloomberg interop is enabled.
 * @param action - The action to dispatch.
 * @param payload - The payload to send with the action.
 * @returns The result of the dispatch, or undefined if interop is disabled.
 */
async function dispatchIfInteropEnabled<TPayload extends { [key: string]: unknown }>(
	action: string,
	payload: TPayload
): Promise<unknown> {
	if (!isBbgInteropEnabled()) {
		console.log("BBG interop disabled via localStorage flag enable-BBG-Interop=false");
		return;
	}

	console.log(`Dispatching action ${action} with payload`, payload);

	return channelClient?.dispatch(action, payload);
}

/**
 * Connects to a channel with a timeout.
 * @param channelName - The name of the channel to connect to.
 * @param timeoutMs - The timeout in milliseconds.
 * @returns A promise that resolves with the channel client or rejects on timeout/error.
 */
async function connectToChannelWithTimeout(
	channelName: string,
	timeoutMs: number
): Promise<OpenFin.ChannelClient> {
	return new Promise((resolve, reject) => {
		const timeoutId = window.setTimeout(() => {
			reject(new Error("Client cannot connect to the channel."));
		}, timeoutMs);

		fin.InterApplicationBus.Channel.connect(channelName)
			.then((client) => {
				window.clearTimeout(timeoutId);
				resolve(client);
				return client;
			})
			.catch((error: unknown) => {
				window.clearTimeout(timeoutId);
				reject(error instanceof Error ? error : new Error(String(error)));
			});
	});
}

document.addEventListener("DOMContentLoaded", async () => {
	const desButton = document.getElementById("desButton") as HTMLButtonElement;
	const bioButton = document.getElementById("bioButton") as HTMLButtonElement;
	const gipButton = document.getElementById("gipButton") as HTMLButtonElement;
	const sendButton = document.getElementById("sendButton") as HTMLButtonElement;
	const mnemonicInput = document.getElementById("mnemonicInput") as HTMLInputElement;
	const valueInput = document.getElementById("valueInput") as HTMLInputElement;
	const panelInput = document.getElementById("panelInput") as HTMLInputElement;

	try {
		console.log("Connecting to channel");
		channelClient = await connectToChannelWithTimeout(`${fin.me.identity.uuid}/bbg-tcapi`, 15000);
		console.log(`Successfully connected to the channel ${fin.me.identity.uuid}/bbg-tcapi`);
		startConnectionStatusPolling();
	} catch (error) {
		console.error("Failed to connect to the channel:", error);
	}

	desButton.addEventListener("click", async () => {
		await dispatchIfInteropEnabled("bbg-request", {
			mnemonic: "DES",
			value: "SAND SS Equity"
		});
	});

	bioButton.addEventListener("click", async () => {
		await dispatchIfInteropEnabled("bbg-request", {
			mnemonic: "ALLQ",
			value: "MSFT US Equity",
			panel: "ONE"
		});
	});

	gipButton.addEventListener("click", async () => {
		await dispatchIfInteropEnabled("bbg-request", {
			mnemonic: "GP",
			value: "NVDA US Equity", // "ORCL US Equity",
			panel: "TWO"
		});
	});

	sendButton.addEventListener("click", async () => {
		const mnemonic = mnemonicInput.value;
		const value = valueInput.value;
		const panel = panelInput.value;

		console.log(`Sending request with mnemonic: ${mnemonic}, value: ${value}, panel: ${panel}`);

		await dispatchIfInteropEnabled("bbg-request", {
			mnemonic,
			value,
			panel
		});
	});
});

/**
 * Starts periodic polling of the agent's Bloomberg connection health endpoint.
 *
 * The poll runs every `CONNECTION_STATUS_POLL_MS` milliseconds and dispatches
 * `bbg-health` on the connected channel. Results are logged for diagnostics,
 * and transient dispatch failures are logged without interrupting future polls.
 */
function startConnectionStatusPolling(): void {
	window.setInterval(async () => {
		if (!channelClient) {
			return;
		}

		try {
			const status = await channelClient.dispatch("bbg-health", {});
			console.log("Bloomberg connection status", status);
		} catch (error) {
			console.error("Failed to retrieve Bloomberg connection status", error);
		}
	}, CONNECTION_STATUS_POLL_MS);
}
