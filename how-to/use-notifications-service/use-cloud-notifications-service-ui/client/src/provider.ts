/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/await-thenable */
import {
	CloudNotificationAPI,
	type ConnectionResult,
	type ConnectParameters
} from "@openfin/cloud-notification-core-api";
import { ColorSchemeOptionType, getCurrentSync, init } from "@openfin/workspace-platform";
import * as Notifications from "@openfin/workspace/notifications";

/* ************************************************************** */
/* Please change the values shown below to match your environment */
/* ************************************************************** */

const PLATFORM_ICON = ""; // point this to the url of an icon file
const NOTIFICATION_SOUND_URL = ""; // optional - point to the url of a sound file
let connected: boolean = false;

// Cloud Notification Service related constants
const NOTIFICATION_SERVER_HOST = ""; // Change this to point to the uri of your notification server

const JWT_TOKEN = ""; // Add your JWT token here
// This is the authenticationId of the jwt-api auth settings in the org
const JWT_AUTHENTICATION_ID = "158ad870-a2cb-46d3-ac01-544cd9a0c9d0";

const SOURCE_ID = "server"; // do not change this value
const PLATFORM_ID = ""; // this is the uuid value from the platform provider app manifest

// Do not change any of the values below.
let correlationId = "";
const notificationGroups: string[] = [];
let connectionResult: ConnectionResult;

const notificationApi = new CloudNotificationAPI({
	url: NOTIFICATION_SERVER_HOST
});

let loggingElement: HTMLElement | null;
let sessionId: string | null;

/**
 * Wait for the DOM to have been loaded before we connect the UI elements and listeners.
 */
window.addEventListener("DOMContentLoaded", async () => {
	await initializeDom();

	// The DOM is ready so initialize the platform
	// Provide default icons and default theme for the browser windows
	await initializeWorkspacePlatform();

	await initializeNotifications();
});

/**
 * Initialize the workspace platform.
 */
async function initializeWorkspacePlatform(): Promise<void> {
	console.log("Initializing workspace platform");
	await init({
		browser: {
			defaultWindowOptions: {
				icon: PLATFORM_ICON,
				workspacePlatform: {
					pages: [],
					favicon: PLATFORM_ICON
				}
			}
		},
		theme: [
			{
				label: "Default",
				default: "dark",
				palettes: {
					dark: {
						brandPrimary: "#0A76D3",
						brandSecondary: "#383A40",
						backgroundPrimary: "#1E1F23"
					},
					light: {
						brandPrimary: "#0A76D3",
						brandSecondary: "#1E1F23",
						backgroundPrimary: "#FAFBFE",
						// Demonstrate changing the link color for notifications
						linkDefault: "#FF0000",
						linkHover: "#00FF00"
					}
				},
				notificationIndicatorColors: {
					// This custom indicator color will be used in the Notification with Custom Indicator
					"custom-indicator": {
						dark: {
							background: "#FF0000",
							foreground: "#FFFFDD"
						},
						light: {
							background: "#FF0000",
							foreground: "#FFFFDD"
						}
					}
				}
			}
		]
	});
}

/**
 * Initialize the notifications.
 */
async function initializeNotifications(): Promise<void> {
	loggingAddEntry("Initializing notifications");

	try {
		const connectSettings: ConnectParameters = {
			sourceId: SOURCE_ID,
			platformId: PLATFORM_ID,
			authenticationType: "jwt",
			jwtAuthenticationParameters: {
				authenticationId: JWT_AUTHENTICATION_ID, // This is the authenticationId of the jwt-api auth settings in the org
				jwtRequestCallback: () => JWT_TOKEN
			}
		};

		loggingAddEntry("\nConnecting to Notifications Service.");
		loggingAddEntry(`\nConnecting to: ${NOTIFICATION_SERVER_HOST}`);
		loggingAddEntry(`\nConnection Settings: ${JSON.stringify(connectSettings, undefined, "  ")}`);

		connectionResult = await notificationApi.connect(connectSettings);

		loggingAddEntry(`\nSession Connected: ${connectionResult.sessionId}`);

		connected = true;
		updateConnectedState();
		sessionId = connectionResult.sessionId;

		loggingAddEntry("-----------------------------------------------------------------------------\n");
		loggingAddEntry(
			`Groups                    : ${connectionResult.groups.map((x: { name: string }) => x.name)}\n`
		);
		loggingAddEntry(`Platform                  : ${connectionResult.platformId}\n`);
		loggingAddEntry(`Source                    : ${connectionResult.sourceId}\n`);
		loggingAddEntry(`Session Id                : ${connectionResult.sessionId}\n`);
		loggingAddEntry("-----------------------------------------------------------------------------\n");

		// Populate select-groups with group names
		const selectGroups = document.querySelector<HTMLSelectElement>("#select-groups");
		if (selectGroups && Array.isArray(connectionResult.groups)) {
			selectGroups.innerHTML = "";
			for (const group of connectionResult.groups) {
				const opt = document.createElement("option");
				opt.value = group.name;
				opt.textContent = group.name;
				selectGroups.append(opt);
			}
			// Set default notificationGroups to first group if available
			if (connectionResult.groups.length > 0) {
				notificationGroups.length = 0;
				notificationGroups.push(connectionResult.groups[0].name);
				selectGroups.value = connectionResult.groups[0].name;
			}
			// On change, update notificationGroups
			selectGroups.addEventListener("change", () => {
				notificationGroups.length = 0;
				notificationGroups.push(selectGroups.value);
			});
		} else {
			console.warn("Unable to find select-groups select element");
		}

		// Correlation ID input
		const inputCorrelationId = document.querySelector<HTMLInputElement>("#input-correlation-id");
		if (inputCorrelationId) {
			inputCorrelationId.addEventListener("input", () => {
				correlationId = inputCorrelationId.value;
			});
		}
	} catch (errorConnect) {
		loggingAddEntry(`\nError connecting to notification server: ${errorConnect}\n`);
		throw new Error("Failed to connect to notification server");
	}

	await initializeListeners();
}

/**
 * Initialize the DOM elements.
 */
async function initializeDom(): Promise<void> {
	loggingElement = document.querySelector("#logging");
	const loggingContainer: HTMLDivElement | null = document.querySelector("#logging-container");

	if (!loggingContainer) {
		return;
	}

	const btnLoggingClear = document.querySelector("#btnLoggingClear");
	if (btnLoggingClear) {
		btnLoggingClear.addEventListener("click", () => {
			// Always re-query loggingElement in case it was replaced in DOM
			const logElem = document.querySelector("#logging");
			if (logElem) {
				logElem.textContent = "";
			}
		});
	} else {
		console.warn("Unable to find btnLoggingClear button");
	}

	const btnToggleTheme = document.querySelector("#btnPlatformToggleTheme");
	if (btnToggleTheme) {
		btnToggleTheme.addEventListener("click", async () => {
			const platform = getCurrentSync();
			const currentScheme = await platform.Theme.getSelectedScheme();
			if (currentScheme === ColorSchemeOptionType.Light) {
				window.document.body.classList.remove("theme-light");
				await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Dark);
			} else {
				window.document.body.classList.add("theme-light");
				await platform.Theme.setSelectedScheme(ColorSchemeOptionType.Light);
			}
		});
	}

	const btnNotificationSimple = document.querySelector("#btnNotificationSimple");
	if (btnNotificationSimple) {
		btnNotificationSimple.addEventListener("click", async () => {
			const result = await showSimpleNotification();
			loggingAddEntry(`Simple Notification Result: ${result}`);
		});
	}

	const btnNotificationBodyDismiss = document.querySelector("#btnNotificationBodyDismiss");
	if (btnNotificationBodyDismiss) {
		btnNotificationBodyDismiss.addEventListener("click", async () => showSimpleNotificationBodyDismiss());
	}

	const btnNotificationBodyDismissAction = document.querySelector("#btnNotificationBodyDismissAction");
	if (btnNotificationBodyDismissAction) {
		btnNotificationBodyDismissAction.addEventListener("click", async () =>
			showSimpleNotificationBodyDismissAction()
		);
	}

	const btnNotificationActionable = document.querySelector("#btnNotificationActionable");
	if (btnNotificationActionable) {
		btnNotificationActionable.addEventListener("click", async () => showActionableNotification());
	}

	const btnNotificationForm = document.querySelector("#btnNotificationForm");
	if (btnNotificationForm) {
		btnNotificationForm.addEventListener("click", async () => showFormNotification());
	}

	const btnNotificationFormAdvanced = document.querySelector("#btnNotificationFormAdvanced");
	if (btnNotificationFormAdvanced) {
		btnNotificationFormAdvanced.addEventListener("click", async () => showFormAdvancedNotification());
	}

	const btnNotificationCustom = document.querySelector("#btnNotificationCustom");
	if (btnNotificationCustom) {
		btnNotificationCustom.addEventListener("click", async () => showCustomNotification());
	}

	const btnNotificationWithSound = document.querySelector("#btnNotificationWithSound");
	if (btnNotificationWithSound) {
		btnNotificationWithSound.addEventListener("click", async () =>
			showSoundNotification(NOTIFICATION_SOUND_URL)
		);
	}

	const btnNotificationCenterUserSettings = document.querySelector("#btnNotificationCenterUserSettings");
	if (btnNotificationCenterUserSettings) {
		btnNotificationCenterUserSettings.addEventListener("click", async () =>
			getNotificationCenterUserSettings()
		);
	}

	const btnNotificationWithIndicator = document.querySelector("#btnNotificationWithIndicator");
	if (btnNotificationWithIndicator) {
		btnNotificationWithIndicator.addEventListener("click", async () => showIndicatorNotification());
	}

	const btnNotificationWithCustomIndicator = document.querySelector("#btnNotificationWithCustomIndicator");
	if (btnNotificationWithCustomIndicator) {
		btnNotificationWithCustomIndicator.addEventListener("click", async () =>
			showCustomIndicatorNotification()
		);
	}

	const btnNotificationsCenterShow = document.querySelector<HTMLButtonElement>("#btnNotificationsCenterShow");
	if (btnNotificationsCenterShow) {
		btnNotificationsCenterShow.addEventListener("click", async () => {
			try {
				btnNotificationsCenterShow.disabled = true;
				await Notifications.show();
			} catch (err) {
				loggingAddEntry(`${err}`);
			} finally {
				btnNotificationsCenterShow.disabled = false;
			}
		});
	}

	const btnNotificationsCenterHide = document.querySelector<HTMLButtonElement>("#btnNotificationsCenterHide");
	if (btnNotificationsCenterHide) {
		btnNotificationsCenterHide.addEventListener("click", async () => {
			try {
				btnNotificationsCenterHide.disabled = true;
				await Notifications.hide();
			} catch (err) {
				loggingAddEntry(`${err}`);
			} finally {
				btnNotificationsCenterHide.disabled = false;
			}
		});
	}

	const btnNotificationStudioOpen = document.querySelector<HTMLButtonElement>("#btnNotificationStudioOpen");
	if (btnNotificationStudioOpen) {
		btnNotificationStudioOpen.addEventListener("click", async () => {
			try {
				btnNotificationStudioOpen.disabled = true;
				await fin.Application.startFromManifest("https://cdn.openfin.co/studio/notification/app.json");
			} finally {
				btnNotificationStudioOpen.disabled = false;
			}
		});
	}
}

/**
 * Initialize the listeners for the events from the notification center.
 */
async function initializeListeners(): Promise<void> {
	// Listen for new notifications being created
	notificationApi.addEventListener("reconnected", () => {
		loggingAddEntry("Session Reconnected");
	});

	notificationApi.addEventListener("session-expired", async () => {
		loggingAddEntry("Session expired");
	});

	notificationApi.addEventListener("session-extended", async () => {
		loggingAddEntry("Session extended");
	});

	notificationApi.addEventListener("disconnected", () => {
		loggingAddEntry("Session Disconnected");
	});
	notificationApi.addEventListener("disconnected", () => {
		loggingAddEntry("Session Connection Lost");
	});
	notificationApi.addEventListener("notification-event", (event) => {
		loggingAddEntry(`Notification groups: ${JSON.stringify(notificationGroups)}`);
		loggingAddEntry(`Notification Event: ${JSON.stringify(event, undefined, "  ")}`);
	});
}

/**
 * Add a new entry in to the logging window.
 * @param entry The entry to add.
 */
function loggingAddEntry(entry: string): void {
	if (loggingElement) {
		loggingElement.textContent = `\n${entry}${loggingElement.textContent}\n`;
	}
}

/**
 * Display a very basic simple notification.
 * @returns The notification ID as a string.
 */
async function showSimpleNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Simple Notification",
			body: "This is a simple notification",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			soundOptions: {
				mode: "silent"
			},
			platform: PLATFORM_ID
		}
	);
	return result.notificationId;
}

/**
 * Show a notification which can be dismissed by clicking on the body.
 * @returns The notification ID as a string.
 */
async function showSimpleNotificationBodyDismiss(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Simple Notification",
			body: "This is a simple notification that may be dismissed by clicking the body",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			platform: PLATFORM_ID,
			onSelect: { BODY_CLICK: Notifications.ActionBodyClickType.DISMISS_EVENT }
		}
	);

	return result.notificationId;
}

/**
 * Show a notification which can be dismissed by clicking on the body and then trigger a custom action.
 * @returns The notification ID as a string.
 */
async function showSimpleNotificationBodyDismissAction(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Simple Notification",
			body: "This is a simple notification that be dismissed by clicking the body and trigger custom action",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			platform: PLATFORM_ID,
			onSelect: { BODY_CLICK: Notifications.ActionBodyClickType.DISMISS_EVENT },
			customData: {
				action: "custom-action",
				data: {
					message: "Body click custom action"
				}
			}
		}
	);

	return result.notificationId;
}

/**
 * Show a notification which has action buttons, the events returned will
 * be handled the the notification-action listener.
 * @returns The notification ID as a string.
 */
async function showActionableNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Actionable Notification",
			body: "This is a notification that has an action",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			platform: PLATFORM_ID,
			buttons: [
				{
					title: "Acknowledged",
					type: "button",
					cta: true,
					onClick: {
						task: "acknowledge-task",
						customData: {
							message: "This is the response data"
						}
					}
				},
				{
					title: "Cancel",
					type: "button"
				}
			]
		}
	);

	return result.notificationId;
}

/**
 * Show a notification which has form fields, the data from the form will
 * be returned to the notification-form-submitted listener.
 * @returns The notification ID as a string.
 */
async function showFormNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Form Notification",
			body: "This is a notification that has form data",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			platform: PLATFORM_ID,
			form: [
				{
					key: "amount",
					label: "Amount",
					type: "number",
					widget: {
						type: "Number",
						max: 100,
						min: 1
					},
					validation: {
						min: {
							arg: 1,
							invalidMessage: "Must be at least 1"
						},
						max: {
							arg: 100,
							invalidMessage: "Cannot be more than 100"
						},
						required: {
							arg: true
						}
					}
				}
			],
			buttons: [
				{
					title: "Save",
					type: "button",
					cta: true,
					submit: true
				},
				{
					title: "Cancel",
					type: "button"
				}
			]
		}
	);

	return result.notificationId;
}

/**
 * Show a notification which has form fields, the data from the form will
 * be returned to the notification-form-submitted listener.
 * @returns The notification ID as a string.
 */
async function showFormAdvancedNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Form Advanced Notification",
			body: "This is a notification that has form data",
			toast: "transient",
			category: "default",
			template: "markdown",
			id: randomUUID(),
			platform: PLATFORM_ID,
			form: [
				{
					type: "string",
					key: "book",
					label: "Book",
					helperText: "This is used to look up for book",
					widget: {
						type: "Text",
						placeholder: "Book name"
					},
					validation: {
						min: {
							arg: 7,
							invalidMessage: "Must be at least 7 chars long"
						},
						max: {
							arg: 9,
							invalidMessage: "Must be at most 9 chars long"
						},
						required: {
							arg: true
						}
					},
					value: "1234554"
				},
				{
					type: "time",
					key: "what_time",
					label: "Chose time?",
					helperText: "Some time choosing helper text",
					value: {
						hour: 12
					},
					validation: {
						required: {
							arg: true
						}
					},
					widget: {
						type: "Time"
					}
				},
				{
					type: "date",
					key: "date_pickup",
					label: "When to pick up?",
					helperText: "Some date choosing helper text",
					validation: {
						required: {
							arg: true
						}
					},
					widget: {
						type: "Date"
					}
				},
				{
					type: "string",
					key: "book2",
					label: "Book Type",
					helperText: "This is used to look up for book",
					validation: {
						required: {
							arg: true
						}
					},
					widget: {
						type: "Dropdown",
						options: [
							{
								value: "book1",
								label: "Book 1"
							},
							{
								value: "book2",
								label: "Book 2"
							},
							{
								value: "book3",
								label: "Book 3"
							}
						]
					}
				},
				{
					type: "radioGroup",
					key: "radioGroupDemo",
					label: "Chose one",
					helperText: "Some radio choosing helper text",
					value: "option_1",
					validation: {
						required: {
							arg: true
						}
					},
					widget: {
						type: "RadioGroup",
						group: [
							{
								label: "Option 1",
								value: "option_1"
							},
							{
								label: "Option 2",
								value: "option_2"
							},
							{
								label: "Option 3",
								value: "option_3"
							}
						]
					}
				},
				{
					type: "checkboxGroup",
					key: "checkboxGroupDemo",
					label: "Chose Multiple",
					helperText: "Some checkbox choosing helper text",
					value: ["option_1", "option_2"],
					validation: {
						required: {
							arg: true
						}
					},
					widget: {
						type: "CheckboxGroup",
						group: [
							{
								label: "Option 1",
								value: "option_1"
							},
							{
								label: "Option 2",
								value: "option_2"
							},
							{
								label: "Option 3",
								value: "option_3"
							}
						]
					}
				},
				{
					type: "string",
					key: "description",
					label: "Description",
					value: "very long text....",
					helperText: "This is used to look up for book",
					widget: {
						type: "Text",
						multiline: true,
						placeholder: "Write description",
						rows: 5
					}
				},
				{
					type: "number",
					key: "age",
					label: "Age",
					helperText: "This is used to look up for book",
					widget: {
						type: "Number",
						placeholder: "Enter age",
						min: 1,
						max: 8
					},
					validation: {
						min: {
							arg: 0
						},
						max: {
							arg: 9
						},
						required: {
							arg: true
						}
					}
				}
			],
			buttons: [
				{
					title: "Save",
					type: "button",
					cta: true,
					submit: true
				},
				{
					title: "Cancel",
					type: "button"
				}
			]
		}
	);

	return result.notificationId;
}

/**
 * Show a notification with custom content.
 * @returns The notification ID as a string.
 */
async function showCustomNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Custom Notification",
			toast: "transient",
			category: "default",
			template: "custom",
			id: randomUUID(),
			platform: PLATFORM_ID,
			templateOptions: {
				body: {
					compositions: [
						{
							minTemplateAPIVersion: "1",
							layout: {
								type: "container",
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "10px"
								},
								children: [
									{
										type: "text",
										dataKey: "subTitle",
										style: {
											fontSize: "12px",
											fontWeight: "bold"
										}
									},
									{
										type: "container",
										style: {
											display: "flex",
											flexDirection: "column",
											marginBottom: "10px"
										},
										children: [
											{
												type: "text",
												dataKey: "firstValueTitle",
												style: {
													fontSize: "12px"
												}
											},
											{
												type: "text",
												dataKey: "firstValue",
												style: {
													fontSize: "14px",
													color: "var(--openfin-ui-brandPrimary)"
												}
											}
										]
									},
									{
										type: "container",
										style: {
											display: "flex",
											flexDirection: "column",
											marginBottom: "10px"
										},
										children: [
											{
												type: "text",
												dataKey: "secondValueTitle",
												style: {
													fontSize: "12px"
												}
											},
											{
												type: "text",
												dataKey: "secondValue",
												style: {
													fontSize: "14px",
													color: "var(--openfin-ui-brandPrimary)"
												}
											}
										]
									},
									{
										type: "image",
										dataKey: "exampleImageUrl",
										style: {
											height: "100px"
										}
									},
									{
										type: "actionableText",
										dataKey: "actionableUrlTitle",
										tooltipKey: "actionableUrlTooltip",
										onClick: {
											actionId: "open-web-site",
											url: "https://openfin.co"
										}
									},
									{
										type: "container",
										style: {
											display: "grid",
											flexDirection: "row",
											gridTemplateColumns: "1fr 1fr 1fr",
											marginBottom: "10px",
											overflow: "auto"
										},
										children: [
											{
												type: "text",
												dataKey: "c0",
												style: {
													fontSize: "10px",
													marginBottom: "10px",
													padding: "3px",
													whiteSpace: "nowrap",
													fontWeight: "bold",
													backgroundColor: "var(--openfin-ui-brandPrimary)"
												}
											},
											{
												type: "text",
												dataKey: "c1",
												style: {
													fontSize: "10px",
													marginBottom: "10px",
													padding: "3px",
													whiteSpace: "nowrap",
													fontWeight: "bold",
													backgroundColor: "var(--openfin-ui-brandPrimary)"
												}
											},
											{
												type: "text",
												dataKey: "c2",
												style: {
													fontSize: "10px",
													marginBottom: "10px",
													padding: "3px",
													whiteSpace: "nowrap",
													fontWeight: "bold",
													backgroundColor: "var(--openfin-ui-brandPrimary)"
												}
											},
											{
												type: "text",
												dataKey: "d00",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											},
											{
												type: "text",
												dataKey: "d01",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											},
											{
												type: "text",
												dataKey: "d02",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											},
											{
												type: "text",
												dataKey: "d10",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											},
											{
												type: "text",
												dataKey: "d11",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											},
											{
												type: "text",
												dataKey: "d12",
												style: {
													fontSize: "10px",
													padding: "3px",
													whiteSpace: "nowrap"
												}
											}
										]
									}
								]
							}
						}
					]
				}
			},
			templateData: {
				subTitle: "Sub Title 🚀",
				firstValueTitle: "First Value",
				firstValue: "100",
				secondValueTitle: "Second Value",
				secondValue: "200",
				c0: "Col 1",
				c1: "Col 2",
				c2: "Col 3",
				d00: "50",
				d01: "150",
				d02: "250",
				d10: "550",
				d11: "650",
				d12: "750",
				exampleImageUrl: "http://localhost:8080/images/example.png",
				actionableUrlTitle: "OpenFin Website",
				actionableUrlTooltip: "http://www.openfin.co"
			}
		}
	);

	return result.notificationId;
}

/**
 * Show a notification and play a sound with it.
 * @param notificationSoundUrl The url of the sounds file to play.
 * @returns The notification ID as a string.
 */
async function showSoundNotification(notificationSoundUrl: string): Promise<string> {
	// we disable the sound if it is enabled at the Notification Center level

	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Sound Notification",
			body: "This is a notification with sound 🔉",
			toast: "transient",
			category: "default",
			template: "markdown",
			soundOptions: { mode: "silent" },
			id: randomUUID(),
			platform: PLATFORM_ID
		}
	);

	await playNotification(notificationSoundUrl);
	return result.notificationId;
}

/**
 * Get the user settings for the notification center.
 */
async function getNotificationCenterUserSettings(): Promise<void> {
	const status = await Notifications.getUserSettingStatus(Notifications.UserSettings.SOUND_ENABLED);
	loggingAddEntry(`Sound Enabled: ${status}`);
}

/**
 * Display a notification that has an indicator bar on the left.
 * @returns The notification ID as a string.
 */
async function showIndicatorNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Indicator Notification",
			toast: "transient",
			indicator: {
				text: "Limit"
			},
			category: "default",
			template: "custom",
			id: randomUUID(),
			platform: PLATFORM_ID,
			templateOptions: {
				body: {
					compositions: [
						{
							minTemplateAPIVersion: "1",
							layout: {
								type: "container",
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "10px"
								},
								children: [
									{
										type: "text",
										dataKey: "content"
									}
								]
							}
						}
					]
				},
				indicator: {
					align: "left",
					color: Notifications.IndicatorColor.RED
				}
			},
			templateData: {
				content: "This is a custom notification with a red indicator showing to the left of the toast"
			}
		}
	);

	return result.notificationId;
}

/**
 * Display a notification that has an custom indicator bar color theme.
 * @returns The notification ID as a string.
 */
async function showCustomIndicatorNotification(): Promise<string> {
	const result = await notificationApi.raiseNotification(
		{
			correlationId,
			targets: {
				groups: notificationGroups,
				users: []
			}
		},
		{
			title: "Custom Indicator Notification",
			toast: "transient",
			category: "default",
			template: "custom",
			id: randomUUID(),
			platform: PLATFORM_ID,
			templateOptions: {
				body: {
					compositions: [
						{
							minTemplateAPIVersion: "1",
							layout: {
								type: "container",
								style: {
									display: "flex",
									flexDirection: "column",
									gap: "10px"
								},
								children: [
									{
										type: "text",
										dataKey: "content"
									}
								]
							}
						}
					]
				},
				indicator: {
					align: "right"
				}
			},
			indicator: {
				color: "custom-indicator",
				fallback: Notifications.IndicatorColor.RED,
				text: "ALERT!!!"
			},
			templateData: {
				content: "This is a custom notification with custom indicator styling"
			}
		}
	);

	return result.notificationId;
}

/**
 * Play a sound.
 * @param notificationSoundUrl The url of the notification to play.
 */
async function playNotification(notificationSoundUrl: string): Promise<void> {
	const audio = new Audio(notificationSoundUrl);
	await audio.play();
}

/**
 * Polyfills randomUUID if running in a non-secure context.
 * @returns The random UUID.
 */
function randomUUID(): string {
	if ("randomUUID" in window.crypto) {
		// eslint-disable-next-line no-restricted-syntax
		return window.crypto.randomUUID();
	}
	// Polyfill the window.crypto.randomUUID if we are running in a non secure context that doesn't have it
	// we are still using window.crypto.getRandomValues which is always available
	// https://stackoverflow.com/a/2117523/2800218
	/**
	 * Get random hex value.
	 * @param c The number to base the random value on.
	 * @returns The random value.
	 */
	function getRandomHex(c: string): string {
		// eslint-disable-next-line no-bitwise
		const rnd = window.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4));
		return (
			// eslint-disable-next-line no-bitwise
			(Number(c) ^ rnd).toString(16)
		);
	}
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, getRandomHex);
}

/**
 * Update the connected state on the view.
 */
function updateConnectedState(): void {
	loggingAddEntry(`\nIs Connected: ${connected}\n`);
	if (connected) {
		loggingAddEntry(`\nConnected Version: ${sessionId}`);
	}

	const buttons = document.querySelectorAll("button");
	for (const button of buttons) {
		button.disabled = !connected;
	}
}
