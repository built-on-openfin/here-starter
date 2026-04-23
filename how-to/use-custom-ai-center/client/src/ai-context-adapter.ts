import type {
	AiContextApi,
	ContextResultPayload,
	CurrentContext,
	NormalizedContextResponse,
	RawAiContextResponse
} from "./types";

export const FALLBACK_PAGE_ID = "unknown-page";
const MOCK_CONTEXT_QUERY_PARAM = "mockContext";

const MOCK_RAW_CONTEXT_RESPONSE: RawAiContextResponse = {
	results: {
		"internal-generated-view-19495a54-8482-4d02-b5eb-864745266691": {
			readability: {
				success: true,
				data: "Great data is useless if it's locked in a silo. Enigma is designed to be the foundational data layer for your growth engine. Use our flexible GraphQL API to stream intelligence directly into your CRM or custom applications. Set up a Data Share to directly sync Enigma with your data warehouse. Go from discovery in our console to scaled-up production in your environment, seamlessly. Stop wasting time on inaccurate data. Use Enigma's real revenue and growth signals to build precise lists of your ideal accounts. Then, access contact information to connect directly with the decision-makers ready to buy."
			},
			screenshot: {
				success: true,
				data: "/9EqEVi36Y/TU7/ANnEq...TRUNCATED_FOR_DEMO...AB//9k="
			},
			title: "Enigma: Trusted business data",
			url: "https://enigma.com/"
		}
	},
	currentContext: {
		pageId: "049dcc83-0164-49db-8602-8cf565f01e82",
		isActive: true,
		attachedPageType: "singleView",
		faviconUrl:
			"https://cdn.prod.website-files.com/64de662ff5e68c57571c3503/64de70ca01d66a5e42c92bf4_enigma-favicon-32x32px.png",
		title: "Enigma: Trusted business data"
	}
};

export class AiContextAdapter {
	private readonly api: AiContextApi | undefined;
	private listenerEnabled: boolean;
	private readonly mockContextEnabled: boolean;

	public constructor(api: AiContextApi | undefined) {
		this.api = api;
		this.listenerEnabled = false;
		this.mockContextEnabled = this.isMockContextEnabled();
	}

	public isAvailable(): boolean {
		return this.mockContextEnabled || Boolean(this.api?.getContext);
	}

	public isMockMode(): boolean {
		return this.mockContextEnabled;
	}

	public hasAiEnabledViews(context: NormalizedContextResponse): boolean {
		return Object.keys(context.results).length > 0;
	}

	public async getContext(): Promise<NormalizedContextResponse> {
		if (this.mockContextEnabled) {
			return this.normalizeResponse(MOCK_RAW_CONTEXT_RESPONSE);
		}

		if (!this.api?.getContext) {
			return {
				pageId: FALLBACK_PAGE_ID,
				currentContext: { pageId: FALLBACK_PAGE_ID },
				results: {}
			};
		}

		const rawResponse = await this.api.getContext();
		return this.normalizeResponse(rawResponse);
	}

	public async ensureContextChangedListener(
		onChanged: (payload: unknown) => Promise<void>
	): Promise<boolean> {
		if (this.mockContextEnabled) {
			return true;
		}

		if (!this.api?.setContextChangedListener) {
			return false;
		}

		if (this.listenerEnabled) {
			return true;
		}

		await this.api.setContextChangedListener(async (payload) => {
			await onChanged(payload);
		});
		this.listenerEnabled = true;
		return true;
	}

	public formatContextForLog(context: NormalizedContextResponse): string {
		const lines: string[] = [];
		lines.push(`pageId: ${context.pageId}`);
		lines.push(
			`currentContext: ${JSON.stringify(
				{
					pageId: context.currentContext.pageId,
					title: context.currentContext.title,
					isActive: context.currentContext.isActive,
					attachedPageType: context.currentContext.attachedPageType,
					faviconUrl: context.currentContext.faviconUrl
				},
				null,
				2
			)}`
		);

		const resultEntries = Object.entries(context.results);
		if (resultEntries.length === 0) {
			lines.push("results: {}");
			return lines.join("\n");
		}

		for (const [key, value] of resultEntries) {
			lines.push(`resultKey: ${key}`);
			lines.push(this.summarizeResultEntry(value));
		}

		return lines.join("\n");
	}

	private normalizeResponse(raw: RawAiContextResponse | undefined): NormalizedContextResponse {
		const currentContext = this.normalizeCurrentContext(raw?.currentContext);
		const results = this.normalizeResults(raw?.results);

		return {
			pageId: currentContext.pageId,
			currentContext,
			results
		};
	}

	private normalizeCurrentContext(context: CurrentContext | undefined): CurrentContext {
		return {
			pageId: context?.pageId || FALLBACK_PAGE_ID,
			title: context?.title,
			url: context?.url,
			isActive: context?.isActive,
			attachedPageType: context?.attachedPageType,
			faviconUrl: context?.faviconUrl
		};
	}

	private normalizeResults(results: RawAiContextResponse["results"]): Record<string, ContextResultPayload> {
		if (!results || typeof results !== "object") {
			return {};
		}
		return results;
	}

	private summarizeResultEntry(entry: ContextResultPayload): string {
		const readabilityLength = entry.readability?.data?.length ?? 0;
		const screenshotLength = entry.screenshot?.data?.length ?? 0;
		const includeReadabilityText = entry.readability?.success === true && Boolean(entry.readability.data);

		const summary: Record<string, unknown> = {
			title: entry.title,
			url: entry.url,
			readability: {
				success: entry.readability?.success ?? false,
				length: readabilityLength
			},
			screenshot: {
				success: entry.screenshot?.success ?? false,
				length: screenshotLength
			}
		};

		if (includeReadabilityText) {
			summary.data = entry.readability?.data;
		}

		return JSON.stringify(summary, null, 2);
	}

	private isMockContextEnabled(): boolean {
		const params = new URLSearchParams(window.location.search);
		return params.get(MOCK_CONTEXT_QUERY_PARAM) === "1";
	}
}
