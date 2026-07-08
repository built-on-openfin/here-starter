import {
	type BloombergConnection,
	connect,
	enableLogging,
	TerminalConnectionError
} from "@openfin/bloomberg";
import { Agent } from "@openfin/cloud-api";
// import type { Search } from "@openfin/cloud-api";
import type OpenFin from "@openfin/core";
import { fin } from "@openfin/core";
import type { Logger, BloombergAgentSettings } from "./shapes";

let agentLogger: Logger | undefined;
let bbgChannel: OpenFin.ChannelProvider | undefined;
let bbgConnection: BloombergConnection | undefined;
let healthCheckTimerId: number | undefined;
let interopTrackingTimerId: number | undefined;
let healthCheckInProgress = false;
let reconnectInProgress = false;
let currentApiKey = "";
let isConnectionHealthy = false;
let lastSuccessfulHealthCheckAt: string | undefined;
let lastFailedHealthCheckAt: string | undefined;

const HEALTH_CHECK_INTERVAL_MS = 60_000;
const HEALTH_CHECK_QUERY = "query { __typename }";
const INTEROP_TRACKING_INTERVAL_MS = 2_000;

/**
 * Returns an agent implementation for Bloomberg Terminal API.
 * @param logger An optional logger for this agent to use.
 * @returns The agent implementation.
 */
// export async function init(logger?: Logger): Promise<Agent.AgentRegistrationConfig> {
export async function init(logger?: Logger): Promise<void> {
	agentLogger = logger;
	let bbgAPIKey = "";
	try {
		const config = await Agent.getConfiguration<BloombergAgentSettings>();
		bbgAPIKey = config.bbgAPIKey;
		agentLogger?.info("Agent apiKey setting (init)", bbgAPIKey);
	} catch (error) {
		agentLogger?.warn("Failed to get agent configuration", error);
		bbgAPIKey = "";
	}

	console.log("Initializing Interop tracking for Bloomberg Terminal API agent");
	await initInteropTracking();

	// Connect to BBG Terminal API here using the bbgAPIKey and set up any necessary state for your agent
	await connectToBBGTerminal(bbgAPIKey);

	startConnectionHealthChecks();

	// Create an app channel named bbg-tcapi to which clients can connect to interact with the Bloomberg Terminal API
	// This channel can be used to send requests from the client to the agent and receive responses back
	// The expected payload will contain a mnemonic value, a data packet such as ticket, instrument, contact, etc, and a BBG panel number if applicable, or default is 0
	await createBBGChannel();

	// register an action to perform when a message is received on this channel, such as making a request to the Bloomberg Terminal API using the provided data
	registerBBGMessageAction();
}

/**
 * Registers a message action listener on the Bloomberg Terminal API channel.
 */
function registerBBGMessageAction(): void {
	if (bbgChannel) {
		agentLogger?.info("Registering message listener for Bloomberg Terminal API channel");
		bbgChannel.register("bbg-request", async (payload: unknown, sender: unknown) => {
			agentLogger?.info("Received message on Bloomberg Terminal API channel", { payload, sender });
			const { mnemonic, value, panel } = payload as { mnemonic: string; value: string; panel?: string };
			// Process the payload, make a request to the Bloomberg Terminal API, and return the response
			await sendToBBGTerminal(mnemonic, value, panel ?? "ZERO");
		});

		bbgChannel.register("bbg-health", async () => {
			const status = getConnectionHealthStatus();
			agentLogger?.debug("Connection health status requested", status);
			return status;
		});
	} else {
		agentLogger?.error("Failed to create or access Bloomberg Terminal API channel");
	}
}

/**
 * Establishes a connection to the Bloomberg Terminal API.
 * @param bbgAPIKey The API key for Bloomberg Terminal authentication.
 * @throws Error if connection to Bloomberg Terminal API fails.
 */
async function connectToBBGTerminal(bbgAPIKey: string): Promise<void> {
	try {
		currentApiKey = bbgAPIKey;

		const retryIntervalMs = 30_000; // 30 seconds

		agentLogger?.info("Connecting to Bloomberg Terminal API");

		// Initialize Bloomberg Terminal API client with the provided API key
		enableLogging();

		// Establish connection
		// eslint-disable-next-line no-constant-condition
		while (true) {
			try {
				bbgConnection = await connect(bbgAPIKey);
				isConnectionHealthy = true;
				lastSuccessfulHealthCheckAt = new Date().toISOString();
				agentLogger?.info("Connected to Bloomberg Terminal");
				return;
			} catch (error) {
				if (!(error instanceof TerminalConnectionError)) {
					agentLogger?.error(
						"Unable to connect to the Bloomberg Terminal. Please ensure the Terminal is running and the API key is correct.",
						error
					);
					throw error;
				}
				agentLogger?.warn("Failed to connect to Terminal, retrying in 30s", error);
				await new Promise((resolve) => setTimeout(resolve, retryIntervalMs));
			}
		}
	} catch (error) {
		agentLogger?.error("Failed to connect to Bloomberg Terminal API", error);
		// throw error;
	}
}

/**
 * Creates the OpenFin IAB channel "bbg-tcapi" if it does not already exist.
 */
async function createBBGChannel(): Promise<void> {
	if (bbgChannel) {
		return;
	}

	if (!window.fin) {
		agentLogger?.error(
			"OpenFin API is not available. Ensure this agent is running within an OpenFin environment."
		);
		return;
	}

	agentLogger?.info("Creating OpenFin IAB channel", { channel: `${fin.me.identity.uuid}/bbg-tcapi` });
	bbgChannel = await fin.InterApplicationBus.Channel.create(`${fin.me.identity.uuid}/bbg-tcapi`);
	agentLogger?.info("OpenFin IAB channel created", { channel: `${fin.me.identity.uuid}/bbg-tcapi` });
}

/**
 * Sends a request to the Bloomberg Terminal API.
 * @param mnemonic The Bloomberg mnemonic command to execute.
 * @param value The data value to send with the request.
 * @param panel The Bloomberg panel number where the command should be executed.
 */
async function sendToBBGTerminal(mnemonic: string, value: unknown, panel: string): Promise<void> {
	try {
		if (!bbgConnection) {
			isConnectionHealthy = false;
			agentLogger?.error("Bloomberg Terminal connection not established");
			return;
		}

		agentLogger?.info("Sending request to Bloomberg Terminal", { mnemonic, value, panel });

		// Send the request to Bloomberg Terminal API using the connection
		let queryStr = "";
		if (mnemonic === "BIO") {
			queryStr = `
				mutation {
					runFunctionInPanel(input: {
						mnemonic: "BIO",
						panel: ZERO,
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
				}`;
		} else {
			queryStr = `
				mutation {
					runFunctionInPanel(input: {
						mnemonic: "${mnemonic}",
						panel: ${panel},
						security1: "${value}"
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
				}`;
		}

		agentLogger?.info("Constructed GraphQL query for Bloomberg Terminal API", { queryStr });

		const result = await bbgConnection.executeApiRequest(queryStr, "local");
		isConnectionHealthy = true;
		lastSuccessfulHealthCheckAt = new Date().toISOString();
		agentLogger?.info("Received response from Bloomberg Terminal API", { result });

		agentLogger?.info("Bloomberg Terminal request completed", { mnemonic, value, panel });
	} catch (error) {
		isConnectionHealthy = false;
		lastFailedHealthCheckAt = new Date().toISOString();
		agentLogger?.error("Failed to send request to Bloomberg Terminal", { mnemonic, value, panel, error });
	}
}

/**
 * Starts a periodic check to verify that the Bloomberg connection is still active.
 */
function startConnectionHealthChecks(): void {
	if (healthCheckTimerId) {
		clearInterval(healthCheckTimerId);
	}

	healthCheckTimerId = window.setInterval(async () => {
		if (healthCheckInProgress) {
			return;
		}

		healthCheckInProgress = true;
		try {
			const isHealthy = await verifyConnectionHealth();
			if (!isHealthy) {
				await reconnectToBBGTerminal();
			}
		} finally {
			healthCheckInProgress = false;
		}
	}, HEALTH_CHECK_INTERVAL_MS);

	agentLogger?.info("Bloomberg connection health checks started", {
		intervalMs: HEALTH_CHECK_INTERVAL_MS
	});
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * Verifies Bloomberg connection activity using a lightweight GraphQL probe.
 */
async function verifyConnectionHealth(): Promise<boolean> {
	if (!bbgConnection) {
		isConnectionHealthy = false;
		lastFailedHealthCheckAt = new Date().toISOString();
		agentLogger?.warn("Bloomberg connection health check failed: no active connection object");
		return false;
	}

	try {
		await bbgConnection.executeApiRequest(HEALTH_CHECK_QUERY, "local");
		isConnectionHealthy = true;
		lastSuccessfulHealthCheckAt = new Date().toISOString();
		agentLogger?.debug("Bloomberg connection health check succeeded");
		return true;
	} catch (error) {
		isConnectionHealthy = false;
		lastFailedHealthCheckAt = new Date().toISOString();
		bbgConnection = undefined;
		agentLogger?.warn("Bloomberg connection health check failed", error);
		return false;
	}
}

/**
 * Reconnects to Bloomberg Terminal when health checks detect a dropped connection.
 */
async function reconnectToBBGTerminal(): Promise<void> {
	if (reconnectInProgress || !currentApiKey) {
		return;
	}

	reconnectInProgress = true;
	try {
		agentLogger?.warn("Attempting Bloomberg Terminal reconnection after failed health check");
		await connectToBBGTerminal(currentApiKey);
	} catch (error) {
		agentLogger?.error("Bloomberg Terminal reconnection failed", error);
	} finally {
		reconnectInProgress = false;
	}
}

// eslint-disable-next-line jsdoc/require-returns
/**
 * Returns the current connection health state for diagnostics.
 */
function getConnectionHealthStatus(): {
	isConnected: boolean;
	hasConnectionObject: boolean;
	lastSuccessfulHealthCheckAt?: string;
	lastFailedHealthCheckAt?: string;
	checkIntervalMs: number;
} {
	return {
		isConnected: isConnectionHealthy,
		hasConnectionObject: Boolean(bbgConnection),
		lastSuccessfulHealthCheckAt,
		lastFailedHealthCheckAt,
		checkIntervalMs: HEALTH_CHECK_INTERVAL_MS
	};
}

// eslint-disable-next-line jsdoc/require-jsdoc
async function initInteropTracking(): Promise<void> {
	try {
		let previousChannelId: string | undefined;

		// 1. Initial Check using standard FDC3 (Safe for strict brokers)
		const desktopAgent = window.fdc3;
		if (desktopAgent) {
			try {
				const currentChannel = await desktopAgent.getCurrentChannel();
				previousChannelId = currentChannel?.id;
				const color = currentChannel?.displayMetadata?.color;
				console.log(`[Initial Check] Current channel color: ${color ?? "None"}`);
				const hasColor = typeof color === "string" && color.toLowerCase() !== "none";
				localStorage.setItem("enable-BBG-Interop", hasColor ? "true" : "false");
				if (currentChannel) {
					// In FDC3, the channel 'id' corresponds to the OpenFin 'contextGroupId' (e.g., 'red')
					console.log(`[Initial Check] Currently joined to channel: ${currentChannel.id}`);
					console.log(`[Initial Check] Set enable-BBG-Interop=${hasColor}`);
				} else {
					console.log("[Initial Check] Not currently joined to any channel.");
					console.log("[Initial Check] Set enable-BBG-Interop=false");
				}
			} catch (fdc3Error: unknown) {
				const errorMessage = fdc3Error instanceof Error ? fdc3Error.message : String(fdc3Error);
				console.warn("[Initial Check] Could not retrieve current channel via FDC3:", errorMessage);
			}
		} else {
			console.warn(
				"[Initial Check] 'fdc3' global object not found. Ensure FDC3 is enabled in your app manifest."
			);
			return;
		}

		// 2. Poll current channel changes through FDC3 to avoid broker-specific Interop APIs.
		if (interopTrackingTimerId) {
			clearInterval(interopTrackingTimerId);
		}

		interopTrackingTimerId = window.setInterval(async () => {
			try {
				const currentChannel = await desktopAgent.getCurrentChannel();
				const currentChannelId = currentChannel?.id;
				if (currentChannelId !== previousChannelId) {
					const color = currentChannel?.displayMetadata?.color;
					const hasColor = typeof color === "string" && color.toLowerCase() !== "none";
					localStorage.setItem("enable-BBG-Interop", hasColor ? "true" : "false");
					console.log(`\n[Event] Context group changed via FDC3 polling!`);
					console.log(`Previous Channel: ${previousChannelId ?? "None"}`);
					console.log(`Current Channel: ${currentChannelId ?? "None"}`);
					console.log(`[Event] Set enable-BBG-Interop=${hasColor}`);
					previousChannelId = currentChannelId;
				}
			} catch (pollError: unknown) {
				const errorMessage = pollError instanceof Error ? pollError.message : String(pollError);
				console.warn("[Interop Tracking] Failed to poll current FDC3 channel:", errorMessage);
			}
		}, INTEROP_TRACKING_INTERVAL_MS);

		console.log("Interop tracking successfully initialized.");
	} catch (error: unknown) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		console.error("Initialization failed:", errorMessage);
	}
}
