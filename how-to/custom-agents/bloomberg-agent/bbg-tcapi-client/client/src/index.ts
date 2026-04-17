/* eslint-disable unicorn/prefer-query-selector */
import type OpenFin from "@openfin/core";
import { fin } from "@openfin/core";

let channelClient: OpenFin.ChannelClient | undefined;
const CONNECTION_STATUS_POLL_MS = 30_000;

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
			.catch((error) => {
				window.clearTimeout(timeoutId);
				reject(error);
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
		await channelClient?.dispatch("bbg-request", {
			mnemonic: "DES",
			value: "SAND SS Equity"
		});
	});

	bioButton.addEventListener("click", async () => {
		await channelClient?.dispatch("bbg-request", {
			mnemonic: "ALLQ",
			value: "MSFT US Equity",
			panel: "ONE"
		});
	});

	gipButton.addEventListener("click", async () => {
		await channelClient?.dispatch("bbg-request", {
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

		await channelClient?.dispatch("bbg-request", {
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
