/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./client/src/ai-context-adapter.ts"
/*!******************************************!*\
  !*** ./client/src/ai-context-adapter.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AiContextAdapter: () => (/* binding */ AiContextAdapter),
/* harmony export */   FALLBACK_PAGE_ID: () => (/* binding */ FALLBACK_PAGE_ID)
/* harmony export */ });
const FALLBACK_PAGE_ID = "unknown-page";
const MOCK_CONTEXT_QUERY_PARAM = "mockContext";
const MOCK_RAW_CONTEXT_RESPONSE = {
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
        faviconUrl: "https://cdn.prod.website-files.com/64de662ff5e68c57571c3503/64de70ca01d66a5e42c92bf4_enigma-favicon-32x32px.png",
        title: "Enigma: Trusted business data"
    }
};
class AiContextAdapter {
    constructor(api) {
        this.api = api;
        this.listenerEnabled = false;
        this.mockContextEnabled = this.isMockContextEnabled();
    }
    isAvailable() {
        return this.mockContextEnabled || Boolean(this.api?.getContext);
    }
    isMockMode() {
        return this.mockContextEnabled;
    }
    hasAiEnabledViews(context) {
        return Object.keys(context.results).length > 0;
    }
    async getContext() {
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
    async getSignalContext() {
        if (this.mockContextEnabled) {
            return [];
        }
        if (!this.api?.getContext) {
            return [];
        }
        const rawResponse = await this.api.getContext();
        const viewIds = Object.keys(rawResponse?.results ?? {});
        const identity = { uuid: fin.me.identity.uuid, name: viewIds[0] };
        const view = await fin.View.wrap(identity);
        const options = await view.getOptions();
        const contextGroupId = options.interop?.currentContextGroup;
        const client = fin.Interop.connectSync(fin.me.identity.uuid);
        let aiContext;
        if (contextGroupId) {
            await client.joinContextGroup(contextGroupId);
            aiContext = await client.getCurrentContext("here.ai.context");
        }
        return aiContext ? [aiContext] : [];
    }
    async ensureContextChangedListener(onChanged) {
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
    formatContextForLog(context) {
        const lines = [];
        lines.push(`pageId: ${context.pageId}`);
        lines.push(`currentContext: ${JSON.stringify({
            pageId: context.currentContext.pageId,
            title: context.currentContext.title,
            isActive: context.currentContext.isActive,
            attachedPageType: context.currentContext.attachedPageType,
            faviconUrl: context.currentContext.faviconUrl
        }, null, 2)}`);
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
    normalizeResponse(raw) {
        const currentContext = this.normalizeCurrentContext(raw?.currentContext);
        const results = this.normalizeResults(raw?.results);
        return {
            pageId: currentContext.pageId,
            currentContext,
            results
        };
    }
    normalizeCurrentContext(context) {
        return {
            pageId: context?.pageId || FALLBACK_PAGE_ID,
            title: context?.title,
            url: context?.url,
            isActive: context?.isActive,
            attachedPageType: context?.attachedPageType,
            faviconUrl: context?.faviconUrl
        };
    }
    normalizeResults(results) {
        if (!results || typeof results !== "object") {
            return {};
        }
        return results;
    }
    summarizeResultEntry(entry) {
        const readabilityLength = entry.readability?.data?.length ?? 0;
        const screenshotLength = entry.screenshot?.data?.length ?? 0;
        const includeReadabilityText = entry.readability?.success === true && Boolean(entry.readability.data);
        const summary = {
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
    isMockContextEnabled() {
        const params = new URLSearchParams(window.location.search);
        return params.get(MOCK_CONTEXT_QUERY_PARAM) === "1";
    }
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ai_context_adapter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ai-context-adapter */ "./client/src/ai-context-adapter.ts");

const adapter = new _ai_context_adapter__WEBPACK_IMPORTED_MODULE_0__.AiContextAdapter(window._aiContext);
const cacheByPageId = new Map();
let currentPageId = _ai_context_adapter__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_PAGE_ID;
const statusEl = document.querySelector("#status");
const aiViewsStatusEl = document.querySelector("#ai-views-status");
const pageIdRowEl = document.querySelector("#page-id-row");
const activePageIdEl = document.querySelector("#active-page-id");
const transcriptEl = document.querySelector("#transcript");
const getAiContextBtn = document.querySelector("#get-ai-context");
const getSignalContextBtn = document.querySelector("#get-signal-context");
const clearTranscriptBtn = document.querySelector("#clear-transcript");
function nowIso() {
    return new Date().toISOString();
}
function setStatus(message, warning = false) {
    if (!statusEl) {
        return;
    }
    statusEl.textContent = message;
    statusEl.classList.toggle("warning", warning);
}
function getPageLogs(pageId) {
    return cacheByPageId.get(pageId) ?? [];
}
function writePageLogs(pageId, logs) {
    cacheByPageId.set(pageId, logs);
}
function updateClearButtonState() {
    if (!clearTranscriptBtn) {
        return;
    }
    clearTranscriptBtn.disabled = getPageLogs(currentPageId).length === 0;
}
function appendLog(entry, targetPageId = currentPageId) {
    const logs = getPageLogs(targetPageId);
    logs.push(entry);
    writePageLogs(targetPageId, logs);
    if (targetPageId === currentPageId) {
        renderTranscript();
    }
    else {
        updateClearButtonState();
    }
}
function renderTranscript() {
    if (!transcriptEl) {
        return;
    }
    const logs = getPageLogs(currentPageId);
    if (logs.length === 0) {
        transcriptEl.textContent = "No context captured yet. Click Get AI Context to load data.";
    }
    else {
        transcriptEl.textContent = logs
            .map((entry) => `[${entry.timestamp}] [${entry.level.toUpperCase()}] ${entry.message}`)
            .join("\n\n");
    }
    updateClearButtonState();
}
function updateUIFromContext(context) {
    const nextPageId = context.pageId || _ai_context_adapter__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_PAGE_ID;
    currentPageId = nextPageId;
    if (aiViewsStatusEl) {
        aiViewsStatusEl.textContent = `AI-enabled views: ${adapter.hasAiEnabledViews(context) ? "yes" : "no"}`;
    }
    if (pageIdRowEl && activePageIdEl) {
        if (nextPageId !== _ai_context_adapter__WEBPACK_IMPORTED_MODULE_0__.FALLBACK_PAGE_ID) {
            pageIdRowEl.hidden = false;
            pageIdRowEl.classList.remove("hidden");
            activePageIdEl.textContent = nextPageId;
        }
        else {
            pageIdRowEl.hidden = true;
            pageIdRowEl.classList.add("hidden");
        }
    }
    renderTranscript();
}
async function applyContextFromSource() {
    const context = await adapter.getContext();
    updateUIFromContext(context);
    return context;
}
async function onGetAiContextClick() {
    if (!getAiContextBtn) {
        return;
    }
    getAiContextBtn.disabled = true;
    try {
        const context = await applyContextFromSource();
        appendLog({
            level: "context",
            message: adapter.formatContextForLog(context),
            timestamp: nowIso()
        });
    }
    catch (error) {
        appendLog({
            level: "error",
            message: `Failed to get context: ${error instanceof Error ? error.message : String(error)}`,
            timestamp: nowIso()
        });
    }
    finally {
        getAiContextBtn.disabled = false;
    }
}
async function onGetSignalContextClick() {
    if (!getSignalContextBtn) {
        return;
    }
    getSignalContextBtn.disabled = true;
    try {
        const signalContext = await adapter.getSignalContext();
        appendLog({
            level: "context",
            message: `Signal context:\n${JSON.stringify(signalContext, null, 2)}`,
            timestamp: nowIso()
        });
    }
    catch (error) {
        appendLog({
            level: "error",
            message: `Failed to get signal context: ${error instanceof Error ? error.message : String(error)}`,
            timestamp: nowIso()
        });
    }
    finally {
        getSignalContextBtn.disabled = false;
    }
}
function onClearTranscriptClick() {
    writePageLogs(currentPageId, []);
    renderTranscript();
}
async function loadLabelsOnly() {
    try {
        await applyContextFromSource();
    }
    catch (error) {
        setStatus(`Could not read context: ${error instanceof Error ? error.message : String(error)}`, true);
    }
}
async function setupContextChangeListener() {
    try {
        const enabled = await adapter.ensureContextChangedListener(async () => {
            try {
                await applyContextFromSource();
            }
            catch (error) {
                appendLog({
                    level: "error",
                    message: `Context change handler failed: ${error instanceof Error ? error.message : String(error)}`,
                    timestamp: nowIso()
                });
            }
        });
        if (!enabled) {
            appendLog({
                level: "error",
                message: "setContextChangedListener is unavailable on window._aiContext.",
                timestamp: nowIso()
            });
        }
    }
    catch (error) {
        appendLog({
            level: "error",
            message: `Listener setup failed: ${error instanceof Error ? error.message : String(error)}`,
            timestamp: nowIso()
        });
    }
}
async function bootstrap() {
    getAiContextBtn?.addEventListener("click", () => {
        void onGetAiContextClick();
    });
    getSignalContextBtn?.addEventListener("click", () => {
        void onGetSignalContextClick();
    });
    clearTranscriptBtn?.addEventListener("click", onClearTranscriptClick);
    if (!adapter.isAvailable()) {
        setStatus("window._aiContext is not available. Load this in HERE Browser Custom AI Center to use context APIs.", true);
        if (aiViewsStatusEl) {
            aiViewsStatusEl.textContent = "";
        }
        if (pageIdRowEl) {
            pageIdRowEl.hidden = true;
            pageIdRowEl.classList.add("hidden");
        }
        getAiContextBtn && (getAiContextBtn.disabled = true);
        renderTranscript();
        return;
    }
    setStatus("Connected to window._aiContext. Use Get AI Context to append full context to the transcript.");
    if (adapter.isMockMode()) {
        setStatus("Mock context mode enabled (?mockContext=1). Use Get AI Context to see sample output.");
    }
    await loadLabelsOnly();
    getAiContextBtn && (getAiContextBtn.disabled = false);
    await setupContextChangeListener();
}
void bootstrap();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUM7UUFDNUIsU0FBUyxDQUNSLHFHQUFxRyxFQUNyRyxJQUFJLENBQ0osQ0FBQztRQUNGLElBQUksZUFBZSxFQUFFLENBQUM7WUFDckIsZUFBZSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDbEMsQ0FBQztRQUNELElBQUksV0FBVyxFQUFFLENBQUM7WUFDakIsV0FBVyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7WUFDMUIsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDckMsQ0FBQztRQUNELGVBQWUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDckQsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixPQUFPO0lBQ1IsQ0FBQztJQUVELFNBQVMsQ0FBQyw4RkFBOEYsQ0FBQyxDQUFDO0lBQzFHLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUM7UUFDMUIsU0FBUyxDQUFDLHNGQUFzRixDQUFDLENBQUM7SUFDbkcsQ0FBQztJQUVELE1BQU0sY0FBYyxFQUFFLENBQUM7SUFDdkIsZUFBZSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUN0RCxNQUFNLDBCQUEwQixFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUVELEtBQUssU0FBUyxFQUFFLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly91c2UtY3VzdG9tLWFpLWNlbnRlci8uL2NsaWVudC9zcmMvYWktY29udGV4dC1hZGFwdGVyLnRzIiwid2VicGFjazovL3VzZS1jdXN0b20tYWktY2VudGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3VzZS1jdXN0b20tYWktY2VudGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly91c2UtY3VzdG9tLWFpLWNlbnRlci93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3VzZS1jdXN0b20tYWktY2VudGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdXNlLWN1c3RvbS1haS1jZW50ZXIvLi9jbGllbnQvc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIE9wZW5GaW4gZnJvbSBcIkBvcGVuZmluL2NvcmVcIjtcblxuaW1wb3J0IHR5cGUge1xuXHRBaUNvbnRleHRBcGksXG5cdENvbnRleHRSZXN1bHRQYXlsb2FkLFxuXHRDdXJyZW50Q29udGV4dCxcblx0Tm9ybWFsaXplZENvbnRleHRSZXNwb25zZSxcblx0UmF3QWlDb250ZXh0UmVzcG9uc2Vcbn0gZnJvbSBcIi4vdHlwZXNcIjtcblxuZXhwb3J0IGNvbnN0IEZBTExCQUNLX1BBR0VfSUQgPSBcInVua25vd24tcGFnZVwiO1xuY29uc3QgTU9DS19DT05URVhUX1FVRVJZX1BBUkFNID0gXCJtb2NrQ29udGV4dFwiO1xuXG5jb25zdCBNT0NLX1JBV19DT05URVhUX1JFU1BPTlNFOiBSYXdBaUNvbnRleHRSZXNwb25zZSA9IHtcblx0cmVzdWx0czoge1xuXHRcdFwiaW50ZXJuYWwtZ2VuZXJhdGVkLXZpZXctMTk0OTVhNTQtODQ4Mi00ZDAyLWI1ZWItODY0NzQ1MjY2NjkxXCI6IHtcblx0XHRcdHJlYWRhYmlsaXR5OiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IHRydWUsXG5cdFx0XHRcdGRhdGE6IFwiR3JlYXQgZGF0YSBpcyB1c2VsZXNzIGlmIGl0J3MgbG9ja2VkIGluIGEgc2lsby4gRW5pZ21hIGlzIGRlc2lnbmVkIHRvIGJlIHRoZSBmb3VuZGF0aW9uYWwgZGF0YSBsYXllciBmb3IgeW91ciBncm93dGggZW5naW5lLiBVc2Ugb3VyIGZsZXhpYmxlIEdyYXBoUUwgQVBJIHRvIHN0cmVhbSBpbnRlbGxpZ2VuY2UgZGlyZWN0bHkgaW50byB5b3VyIENSTSBvciBjdXN0b20gYXBwbGljYXRpb25zLiBTZXQgdXAgYSBEYXRhIFNoYXJlIHRvIGRpcmVjdGx5IHN5bmMgRW5pZ21hIHdpdGggeW91ciBkYXRhIHdhcmVob3VzZS4gR28gZnJvbSBkaXNjb3ZlcnkgaW4gb3VyIGNvbnNvbGUgdG8gc2NhbGVkLXVwIHByb2R1Y3Rpb24gaW4geW91ciBlbnZpcm9ubWVudCwgc2VhbWxlc3NseS4gU3RvcCB3YXN0aW5nIHRpbWUgb24gaW5hY2N1cmF0ZSBkYXRhLiBVc2UgRW5pZ21hJ3MgcmVhbCByZXZlbnVlIGFuZCBncm93dGggc2lnbmFscyB0byBidWlsZCBwcmVjaXNlIGxpc3RzIG9mIHlvdXIgaWRlYWwgYWNjb3VudHMuIFRoZW4sIGFjY2VzcyBjb250YWN0IGluZm9ybWF0aW9uIHRvIGNvbm5lY3QgZGlyZWN0bHkgd2l0aCB0aGUgZGVjaXNpb24tbWFrZXJzIHJlYWR5IHRvIGJ1eS5cIlxuXHRcdFx0fSxcblx0XHRcdHNjcmVlbnNob3Q6IHtcblx0XHRcdFx0c3VjY2VzczogdHJ1ZSxcblx0XHRcdFx0ZGF0YTogXCIvOUVxRVZpMzZZL1RVNy9BTm5FcS4uLlRSVU5DQVRFRF9GT1JfREVNTy4uLkFCLy85az1cIlxuXHRcdFx0fSxcblx0XHRcdHRpdGxlOiBcIkVuaWdtYTogVHJ1c3RlZCBidXNpbmVzcyBkYXRhXCIsXG5cdFx0XHR1cmw6IFwiaHR0cHM6Ly9lbmlnbWEuY29tL1wiXG5cdFx0fVxuXHR9LFxuXHRjdXJyZW50Q29udGV4dDoge1xuXHRcdHBhZ2VJZDogXCIwNDlkY2M4My0wMTY0LTQ5ZGItODYwMi04Y2Y1NjVmMDFlODJcIixcblx0XHRpc0FjdGl2ZTogdHJ1ZSxcblx0XHRhdHRhY2hlZFBhZ2VUeXBlOiBcInNpbmdsZVZpZXdcIixcblx0XHRmYXZpY29uVXJsOlxuXHRcdFx0XCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY0ZGU2NjJmZjVlNjhjNTc1NzFjMzUwMy82NGRlNzBjYTAxZDY2YTVlNDJjOTJiZjRfZW5pZ21hLWZhdmljb24tMzJ4MzJweC5wbmdcIixcblx0XHR0aXRsZTogXCJFbmlnbWE6IFRydXN0ZWQgYnVzaW5lc3MgZGF0YVwiXG5cdH1cbn07XG5cbmV4cG9ydCBjbGFzcyBBaUNvbnRleHRBZGFwdGVyIHtcblx0cHJpdmF0ZSByZWFkb25seSBhcGk6IEFpQ29udGV4dEFwaSB8IHVuZGVmaW5lZDtcblx0cHJpdmF0ZSBsaXN0ZW5lckVuYWJsZWQ6IGJvb2xlYW47XG5cdHByaXZhdGUgcmVhZG9ubHkgbW9ja0NvbnRleHRFbmFibGVkOiBib29sZWFuO1xuXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihhcGk6IEFpQ29udGV4dEFwaSB8IHVuZGVmaW5lZCkge1xuXHRcdHRoaXMuYXBpID0gYXBpO1xuXHRcdHRoaXMubGlzdGVuZXJFbmFibGVkID0gZmFsc2U7XG5cdFx0dGhpcy5tb2NrQ29udGV4dEVuYWJsZWQgPSB0aGlzLmlzTW9ja0NvbnRleHRFbmFibGVkKCk7XG5cdH1cblxuXHRwdWJsaWMgaXNBdmFpbGFibGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMubW9ja0NvbnRleHRFbmFibGVkIHx8IEJvb2xlYW4odGhpcy5hcGk/LmdldENvbnRleHQpO1xuXHR9XG5cblx0cHVibGljIGlzTW9ja01vZGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMubW9ja0NvbnRleHRFbmFibGVkO1xuXHR9XG5cblx0cHVibGljIGhhc0FpRW5hYmxlZFZpZXdzKGNvbnRleHQ6IE5vcm1hbGl6ZWRDb250ZXh0UmVzcG9uc2UpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gT2JqZWN0LmtleXMoY29udGV4dC5yZXN1bHRzKS5sZW5ndGggPiAwO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGdldENvbnRleHQoKTogUHJvbWlzZTxOb3JtYWxpemVkQ29udGV4dFJlc3BvbnNlPiB7XG5cdFx0aWYgKHRoaXMubW9ja0NvbnRleHRFbmFibGVkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemVSZXNwb25zZShNT0NLX1JBV19DT05URVhUX1JFU1BPTlNFKTtcblx0XHR9XG5cblx0XHRpZiAoIXRoaXMuYXBpPy5nZXRDb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRwYWdlSWQ6IEZBTExCQUNLX1BBR0VfSUQsXG5cdFx0XHRcdGN1cnJlbnRDb250ZXh0OiB7IHBhZ2VJZDogRkFMTEJBQ0tfUEFHRV9JRCB9LFxuXHRcdFx0XHRyZXN1bHRzOiB7fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRjb25zdCByYXdSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpLmdldENvbnRleHQoKTtcblx0XHRyZXR1cm4gdGhpcy5ub3JtYWxpemVSZXNwb25zZShyYXdSZXNwb25zZSk7XG5cdH1cblxuXHRwdWJsaWMgYXN5bmMgZ2V0U2lnbmFsQ29udGV4dCgpOiBQcm9taXNlPE9wZW5GaW4uRkRDMy52Ml8wLkNvbnRleHRbXT4ge1xuXHRcdGlmICh0aGlzLm1vY2tDb250ZXh0RW5hYmxlZCkge1xuXHRcdFx0cmV0dXJuIFtdO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5hcGk/LmdldENvbnRleHQpIHtcblx0XHRcdHJldHVybiBbXTtcblx0XHR9XG5cblx0XHRjb25zdCByYXdSZXNwb25zZSA9IGF3YWl0IHRoaXMuYXBpLmdldENvbnRleHQoKTtcblx0XHRjb25zdCB2aWV3SWRzID0gT2JqZWN0LmtleXMocmF3UmVzcG9uc2U/LnJlc3VsdHMgPz8ge30pO1xuXHRcdGNvbnN0IGlkZW50aXR5ID0geyB1dWlkOiBmaW4ubWUuaWRlbnRpdHkudXVpZCwgbmFtZTogdmlld0lkc1swXSB9O1xuXHRcdGNvbnN0IHZpZXcgPSBhd2FpdCBmaW4uVmlldy53cmFwKGlkZW50aXR5KTtcblx0XHRjb25zdCBvcHRpb25zID0gYXdhaXQgdmlldy5nZXRPcHRpb25zKCk7XG5cdFx0Y29uc3QgY29udGV4dEdyb3VwSWQgPSBvcHRpb25zLmludGVyb3A/LmN1cnJlbnRDb250ZXh0R3JvdXA7XG5cdFx0Y29uc3QgY2xpZW50ID0gZmluLkludGVyb3AuY29ubmVjdFN5bmMoZmluLm1lLmlkZW50aXR5LnV1aWQpO1xuXHRcdGxldCBhaUNvbnRleHQ6IE9wZW5GaW4uRkRDMy52Ml8wLkNvbnRleHQgfCB1bmRlZmluZWQ7XG5cdFx0aWYgKGNvbnRleHRHcm91cElkKSB7XG5cdFx0XHRhd2FpdCBjbGllbnQuam9pbkNvbnRleHRHcm91cChjb250ZXh0R3JvdXBJZCk7XG5cdFx0XHRhaUNvbnRleHQgPSBhd2FpdCBjbGllbnQuZ2V0Q3VycmVudENvbnRleHQoXCJoZXJlLmFpLmNvbnRleHRcIik7XG5cdFx0fVxuXHRcdHJldHVybiBhaUNvbnRleHQgPyBbYWlDb250ZXh0XSA6IFtdO1xuXHR9XG5cblx0cHVibGljIGFzeW5jIGVuc3VyZUNvbnRleHRDaGFuZ2VkTGlzdGVuZXIoXG5cdFx0b25DaGFuZ2VkOiAocGF5bG9hZDogdW5rbm93bikgPT4gUHJvbWlzZTx2b2lkPlxuXHQpOiBQcm9taXNlPGJvb2xlYW4+IHtcblx0XHRpZiAodGhpcy5tb2NrQ29udGV4dEVuYWJsZWQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICghdGhpcy5hcGk/LnNldENvbnRleHRDaGFuZ2VkTGlzdGVuZXIpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5saXN0ZW5lckVuYWJsZWQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGF3YWl0IHRoaXMuYXBpLnNldENvbnRleHRDaGFuZ2VkTGlzdGVuZXIoYXN5bmMgKHBheWxvYWQpID0+IHtcblx0XHRcdGF3YWl0IG9uQ2hhbmdlZChwYXlsb2FkKTtcblx0XHR9KTtcblx0XHR0aGlzLmxpc3RlbmVyRW5hYmxlZCA9IHRydWU7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHRwdWJsaWMgZm9ybWF0Q29udGV4dEZvckxvZyhjb250ZXh0OiBOb3JtYWxpemVkQ29udGV4dFJlc3BvbnNlKTogc3RyaW5nIHtcblx0XHRjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblx0XHRsaW5lcy5wdXNoKGBwYWdlSWQ6ICR7Y29udGV4dC5wYWdlSWR9YCk7XG5cdFx0bGluZXMucHVzaChcblx0XHRcdGBjdXJyZW50Q29udGV4dDogJHtKU09OLnN0cmluZ2lmeShcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHBhZ2VJZDogY29udGV4dC5jdXJyZW50Q29udGV4dC5wYWdlSWQsXG5cdFx0XHRcdFx0dGl0bGU6IGNvbnRleHQuY3VycmVudENvbnRleHQudGl0bGUsXG5cdFx0XHRcdFx0aXNBY3RpdmU6IGNvbnRleHQuY3VycmVudENvbnRleHQuaXNBY3RpdmUsXG5cdFx0XHRcdFx0YXR0YWNoZWRQYWdlVHlwZTogY29udGV4dC5jdXJyZW50Q29udGV4dC5hdHRhY2hlZFBhZ2VUeXBlLFxuXHRcdFx0XHRcdGZhdmljb25Vcmw6IGNvbnRleHQuY3VycmVudENvbnRleHQuZmF2aWNvblVybFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHQyXG5cdFx0XHQpfWBcblx0XHQpO1xuXG5cdFx0Y29uc3QgcmVzdWx0RW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGNvbnRleHQucmVzdWx0cyk7XG5cdFx0aWYgKHJlc3VsdEVudHJpZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRsaW5lcy5wdXNoKFwicmVzdWx0czoge31cIik7XG5cdFx0XHRyZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcblx0XHR9XG5cblx0XHRmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiByZXN1bHRFbnRyaWVzKSB7XG5cdFx0XHRsaW5lcy5wdXNoKGByZXN1bHRLZXk6ICR7a2V5fWApO1xuXHRcdFx0bGluZXMucHVzaCh0aGlzLnN1bW1hcml6ZVJlc3VsdEVudHJ5KHZhbHVlKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGxpbmVzLmpvaW4oXCJcXG5cIik7XG5cdH1cblxuXHRwcml2YXRlIG5vcm1hbGl6ZVJlc3BvbnNlKHJhdzogUmF3QWlDb250ZXh0UmVzcG9uc2UgfCB1bmRlZmluZWQpOiBOb3JtYWxpemVkQ29udGV4dFJlc3BvbnNlIHtcblx0XHRjb25zdCBjdXJyZW50Q29udGV4dCA9IHRoaXMubm9ybWFsaXplQ3VycmVudENvbnRleHQocmF3Py5jdXJyZW50Q29udGV4dCk7XG5cdFx0Y29uc3QgcmVzdWx0cyA9IHRoaXMubm9ybWFsaXplUmVzdWx0cyhyYXc/LnJlc3VsdHMpO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VJZDogY3VycmVudENvbnRleHQucGFnZUlkLFxuXHRcdFx0Y3VycmVudENvbnRleHQsXG5cdFx0XHRyZXN1bHRzXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgbm9ybWFsaXplQ3VycmVudENvbnRleHQoY29udGV4dDogQ3VycmVudENvbnRleHQgfCB1bmRlZmluZWQpOiBDdXJyZW50Q29udGV4dCB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHBhZ2VJZDogY29udGV4dD8ucGFnZUlkIHx8IEZBTExCQUNLX1BBR0VfSUQsXG5cdFx0XHR0aXRsZTogY29udGV4dD8udGl0bGUsXG5cdFx0XHR1cmw6IGNvbnRleHQ/LnVybCxcblx0XHRcdGlzQWN0aXZlOiBjb250ZXh0Py5pc0FjdGl2ZSxcblx0XHRcdGF0dGFjaGVkUGFnZVR5cGU6IGNvbnRleHQ/LmF0dGFjaGVkUGFnZVR5cGUsXG5cdFx0XHRmYXZpY29uVXJsOiBjb250ZXh0Py5mYXZpY29uVXJsXG5cdFx0fTtcblx0fVxuXG5cdHByaXZhdGUgbm9ybWFsaXplUmVzdWx0cyhyZXN1bHRzOiBSYXdBaUNvbnRleHRSZXNwb25zZVtcInJlc3VsdHNcIl0pOiBSZWNvcmQ8c3RyaW5nLCBDb250ZXh0UmVzdWx0UGF5bG9hZD4ge1xuXHRcdGlmICghcmVzdWx0cyB8fCB0eXBlb2YgcmVzdWx0cyAhPT0gXCJvYmplY3RcIikge1xuXHRcdFx0cmV0dXJuIHt9O1xuXHRcdH1cblx0XHRyZXR1cm4gcmVzdWx0cztcblx0fVxuXG5cdHByaXZhdGUgc3VtbWFyaXplUmVzdWx0RW50cnkoZW50cnk6IENvbnRleHRSZXN1bHRQYXlsb2FkKTogc3RyaW5nIHtcblx0XHRjb25zdCByZWFkYWJpbGl0eUxlbmd0aCA9IGVudHJ5LnJlYWRhYmlsaXR5Py5kYXRhPy5sZW5ndGggPz8gMDtcblx0XHRjb25zdCBzY3JlZW5zaG90TGVuZ3RoID0gZW50cnkuc2NyZWVuc2hvdD8uZGF0YT8ubGVuZ3RoID8/IDA7XG5cdFx0Y29uc3QgaW5jbHVkZVJlYWRhYmlsaXR5VGV4dCA9IGVudHJ5LnJlYWRhYmlsaXR5Py5zdWNjZXNzID09PSB0cnVlICYmIEJvb2xlYW4oZW50cnkucmVhZGFiaWxpdHkuZGF0YSk7XG5cblx0XHRjb25zdCBzdW1tYXJ5OiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcblx0XHRcdHRpdGxlOiBlbnRyeS50aXRsZSxcblx0XHRcdHVybDogZW50cnkudXJsLFxuXHRcdFx0cmVhZGFiaWxpdHk6IHtcblx0XHRcdFx0c3VjY2VzczogZW50cnkucmVhZGFiaWxpdHk/LnN1Y2Nlc3MgPz8gZmFsc2UsXG5cdFx0XHRcdGxlbmd0aDogcmVhZGFiaWxpdHlMZW5ndGhcblx0XHRcdH0sXG5cdFx0XHRzY3JlZW5zaG90OiB7XG5cdFx0XHRcdHN1Y2Nlc3M6IGVudHJ5LnNjcmVlbnNob3Q/LnN1Y2Nlc3MgPz8gZmFsc2UsXG5cdFx0XHRcdGxlbmd0aDogc2NyZWVuc2hvdExlbmd0aFxuXHRcdFx0fVxuXHRcdH07XG5cblx0XHRpZiAoaW5jbHVkZVJlYWRhYmlsaXR5VGV4dCkge1xuXHRcdFx0c3VtbWFyeS5kYXRhID0gZW50cnkucmVhZGFiaWxpdHk/LmRhdGE7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHN1bW1hcnksIG51bGwsIDIpO1xuXHR9XG5cblx0cHJpdmF0ZSBpc01vY2tDb250ZXh0RW5hYmxlZCgpOiBib29sZWFuIHtcblx0XHRjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXHRcdHJldHVybiBwYXJhbXMuZ2V0KE1PQ0tfQ09OVEVYVF9RVUVSWV9QQVJBTSkgPT09IFwiMVwiO1xuXHR9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdGlmICghKG1vZHVsZUlkIGluIF9fd2VicGFja19tb2R1bGVzX18pKSB7XG5cdFx0ZGVsZXRlIF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgbW9kdWxlSWQgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgQWlDb250ZXh0QWRhcHRlciwgRkFMTEJBQ0tfUEFHRV9JRCB9IGZyb20gXCIuL2FpLWNvbnRleHQtYWRhcHRlclwiO1xuaW1wb3J0IHR5cGUgeyBOb3JtYWxpemVkQ29udGV4dFJlc3BvbnNlIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxudHlwZSBFbnRyeUxldmVsID0gXCJpbmZvXCIgfCBcImNvbnRleHRcIiB8IFwiZXJyb3JcIjtcblxuaW50ZXJmYWNlIExvZ0VudHJ5IHtcblx0bGV2ZWw6IEVudHJ5TGV2ZWw7XG5cdG1lc3NhZ2U6IHN0cmluZztcblx0dGltZXN0YW1wOiBzdHJpbmc7XG59XG5cbmNvbnN0IGFkYXB0ZXIgPSBuZXcgQWlDb250ZXh0QWRhcHRlcih3aW5kb3cuX2FpQ29udGV4dCk7XG5jb25zdCBjYWNoZUJ5UGFnZUlkID0gbmV3IE1hcDxzdHJpbmcsIExvZ0VudHJ5W10+KCk7XG5cbmxldCBjdXJyZW50UGFnZUlkID0gRkFMTEJBQ0tfUEFHRV9JRDtcblxuY29uc3Qgc3RhdHVzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNzdGF0dXNcIik7XG5jb25zdCBhaVZpZXdzU3RhdHVzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNhaS12aWV3cy1zdGF0dXNcIik7XG5jb25zdCBwYWdlSWRSb3dFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI3BhZ2UtaWQtcm93XCIpO1xuY29uc3QgYWN0aXZlUGFnZUlkRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxFbGVtZW50PihcIiNhY3RpdmUtcGFnZS1pZFwiKTtcbmNvbnN0IHRyYW5zY3JpcHRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI3RyYW5zY3JpcHRcIik7XG5jb25zdCBnZXRBaUNvbnRleHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNnZXQtYWktY29udGV4dFwiKTtcbmNvbnN0IGdldFNpZ25hbENvbnRleHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNnZXQtc2lnbmFsLWNvbnRleHRcIik7XG5jb25zdCBjbGVhclRyYW5zY3JpcHRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxCdXR0b25FbGVtZW50PihcIiNjbGVhci10cmFuc2NyaXB0XCIpO1xuXG5mdW5jdGlvbiBub3dJc28oKTogc3RyaW5nIHtcblx0cmV0dXJuIG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG1lc3NhZ2U6IHN0cmluZywgd2FybmluZyA9IGZhbHNlKTogdm9pZCB7XG5cdGlmICghc3RhdHVzRWwpIHtcblx0XHRyZXR1cm47XG5cdH1cblx0c3RhdHVzRWwudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xuXHRzdGF0dXNFbC5jbGFzc0xpc3QudG9nZ2xlKFwid2FybmluZ1wiLCB3YXJuaW5nKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFnZUxvZ3MocGFnZUlkOiBzdHJpbmcpOiBMb2dFbnRyeVtdIHtcblx0cmV0dXJuIGNhY2hlQnlQYWdlSWQuZ2V0KHBhZ2VJZCkgPz8gW107XG59XG5cbmZ1bmN0aW9uIHdyaXRlUGFnZUxvZ3MocGFnZUlkOiBzdHJpbmcsIGxvZ3M6IExvZ0VudHJ5W10pOiB2b2lkIHtcblx0Y2FjaGVCeVBhZ2VJZC5zZXQocGFnZUlkLCBsb2dzKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2xlYXJCdXR0b25TdGF0ZSgpOiB2b2lkIHtcblx0aWYgKCFjbGVhclRyYW5zY3JpcHRCdG4pIHtcblx0XHRyZXR1cm47XG5cdH1cblx0Y2xlYXJUcmFuc2NyaXB0QnRuLmRpc2FibGVkID0gZ2V0UGFnZUxvZ3MoY3VycmVudFBhZ2VJZCkubGVuZ3RoID09PSAwO1xufVxuXG5mdW5jdGlvbiBhcHBlbmRMb2coZW50cnk6IExvZ0VudHJ5LCB0YXJnZXRQYWdlSWQgPSBjdXJyZW50UGFnZUlkKTogdm9pZCB7XG5cdGNvbnN0IGxvZ3MgPSBnZXRQYWdlTG9ncyh0YXJnZXRQYWdlSWQpO1xuXHRsb2dzLnB1c2goZW50cnkpO1xuXHR3cml0ZVBhZ2VMb2dzKHRhcmdldFBhZ2VJZCwgbG9ncyk7XG5cdGlmICh0YXJnZXRQYWdlSWQgPT09IGN1cnJlbnRQYWdlSWQpIHtcblx0XHRyZW5kZXJUcmFuc2NyaXB0KCk7XG5cdH0gZWxzZSB7XG5cdFx0dXBkYXRlQ2xlYXJCdXR0b25TdGF0ZSgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRyYW5zY3JpcHQoKTogdm9pZCB7XG5cdGlmICghdHJhbnNjcmlwdEVsKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGNvbnN0IGxvZ3MgPSBnZXRQYWdlTG9ncyhjdXJyZW50UGFnZUlkKTtcblx0aWYgKGxvZ3MubGVuZ3RoID09PSAwKSB7XG5cdFx0dHJhbnNjcmlwdEVsLnRleHRDb250ZW50ID0gXCJObyBjb250ZXh0IGNhcHR1cmVkIHlldC4gQ2xpY2sgR2V0IEFJIENvbnRleHQgdG8gbG9hZCBkYXRhLlwiO1xuXHR9IGVsc2Uge1xuXHRcdHRyYW5zY3JpcHRFbC50ZXh0Q29udGVudCA9IGxvZ3Ncblx0XHRcdC5tYXAoKGVudHJ5KSA9PiBgWyR7ZW50cnkudGltZXN0YW1wfV0gWyR7ZW50cnkubGV2ZWwudG9VcHBlckNhc2UoKX1dICR7ZW50cnkubWVzc2FnZX1gKVxuXHRcdFx0LmpvaW4oXCJcXG5cXG5cIik7XG5cdH1cblx0dXBkYXRlQ2xlYXJCdXR0b25TdGF0ZSgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVVSUZyb21Db250ZXh0KGNvbnRleHQ6IE5vcm1hbGl6ZWRDb250ZXh0UmVzcG9uc2UpOiB2b2lkIHtcblx0Y29uc3QgbmV4dFBhZ2VJZCA9IGNvbnRleHQucGFnZUlkIHx8IEZBTExCQUNLX1BBR0VfSUQ7XG5cdGN1cnJlbnRQYWdlSWQgPSBuZXh0UGFnZUlkO1xuXG5cdGlmIChhaVZpZXdzU3RhdHVzRWwpIHtcblx0XHRhaVZpZXdzU3RhdHVzRWwudGV4dENvbnRlbnQgPSBgQUktZW5hYmxlZCB2aWV3czogJHthZGFwdGVyLmhhc0FpRW5hYmxlZFZpZXdzKGNvbnRleHQpID8gXCJ5ZXNcIiA6IFwibm9cIn1gO1xuXHR9XG5cblx0aWYgKHBhZ2VJZFJvd0VsICYmIGFjdGl2ZVBhZ2VJZEVsKSB7XG5cdFx0aWYgKG5leHRQYWdlSWQgIT09IEZBTExCQUNLX1BBR0VfSUQpIHtcblx0XHRcdHBhZ2VJZFJvd0VsLmhpZGRlbiA9IGZhbHNlO1xuXHRcdFx0cGFnZUlkUm93RWwuY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKTtcblx0XHRcdGFjdGl2ZVBhZ2VJZEVsLnRleHRDb250ZW50ID0gbmV4dFBhZ2VJZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFnZUlkUm93RWwuaGlkZGVuID0gdHJ1ZTtcblx0XHRcdHBhZ2VJZFJvd0VsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cdFx0fVxuXHR9XG5cblx0cmVuZGVyVHJhbnNjcmlwdCgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBhcHBseUNvbnRleHRGcm9tU291cmNlKCk6IFByb21pc2U8Tm9ybWFsaXplZENvbnRleHRSZXNwb25zZT4ge1xuXHRjb25zdCBjb250ZXh0ID0gYXdhaXQgYWRhcHRlci5nZXRDb250ZXh0KCk7XG5cdHVwZGF0ZVVJRnJvbUNvbnRleHQoY29udGV4dCk7XG5cdHJldHVybiBjb250ZXh0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBvbkdldEFpQ29udGV4dENsaWNrKCk6IFByb21pc2U8dm9pZD4ge1xuXHRpZiAoIWdldEFpQ29udGV4dEJ0bikge1xuXHRcdHJldHVybjtcblx0fVxuXHRnZXRBaUNvbnRleHRCdG4uZGlzYWJsZWQgPSB0cnVlO1xuXHR0cnkge1xuXHRcdGNvbnN0IGNvbnRleHQgPSBhd2FpdCBhcHBseUNvbnRleHRGcm9tU291cmNlKCk7XG5cdFx0YXBwZW5kTG9nKHtcblx0XHRcdGxldmVsOiBcImNvbnRleHRcIixcblx0XHRcdG1lc3NhZ2U6IGFkYXB0ZXIuZm9ybWF0Q29udGV4dEZvckxvZyhjb250ZXh0KSxcblx0XHRcdHRpbWVzdGFtcDogbm93SXNvKClcblx0XHR9KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRhcHBlbmRMb2coe1xuXHRcdFx0bGV2ZWw6IFwiZXJyb3JcIixcblx0XHRcdG1lc3NhZ2U6IGBGYWlsZWQgdG8gZ2V0IGNvbnRleHQ6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWAsXG5cdFx0XHR0aW1lc3RhbXA6IG5vd0lzbygpXG5cdFx0fSk7XG5cdH0gZmluYWxseSB7XG5cdFx0Z2V0QWlDb250ZXh0QnRuLmRpc2FibGVkID0gZmFsc2U7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gb25HZXRTaWduYWxDb250ZXh0Q2xpY2soKTogUHJvbWlzZTx2b2lkPiB7XG5cdGlmICghZ2V0U2lnbmFsQ29udGV4dEJ0bikge1xuXHRcdHJldHVybjtcblx0fVxuXHRnZXRTaWduYWxDb250ZXh0QnRuLmRpc2FibGVkID0gdHJ1ZTtcblx0dHJ5IHtcblx0XHRjb25zdCBzaWduYWxDb250ZXh0ID0gYXdhaXQgYWRhcHRlci5nZXRTaWduYWxDb250ZXh0KCk7XG5cdFx0YXBwZW5kTG9nKHtcblx0XHRcdGxldmVsOiBcImNvbnRleHRcIixcblx0XHRcdG1lc3NhZ2U6IGBTaWduYWwgY29udGV4dDpcXG4ke0pTT04uc3RyaW5naWZ5KHNpZ25hbENvbnRleHQsIG51bGwsIDIpfWAsXG5cdFx0XHR0aW1lc3RhbXA6IG5vd0lzbygpXG5cdFx0fSk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0YXBwZW5kTG9nKHtcblx0XHRcdGxldmVsOiBcImVycm9yXCIsXG5cdFx0XHRtZXNzYWdlOiBgRmFpbGVkIHRvIGdldCBzaWduYWwgY29udGV4dDogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YCxcblx0XHRcdHRpbWVzdGFtcDogbm93SXNvKClcblx0XHR9KTtcblx0fSBmaW5hbGx5IHtcblx0XHRnZXRTaWduYWxDb250ZXh0QnRuLmRpc2FibGVkID0gZmFsc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gb25DbGVhclRyYW5zY3JpcHRDbGljaygpOiB2b2lkIHtcblx0d3JpdGVQYWdlTG9ncyhjdXJyZW50UGFnZUlkLCBbXSk7XG5cdHJlbmRlclRyYW5zY3JpcHQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbG9hZExhYmVsc09ubHkoKTogUHJvbWlzZTx2b2lkPiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgYXBwbHlDb250ZXh0RnJvbVNvdXJjZSgpO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdHNldFN0YXR1cyhgQ291bGQgbm90IHJlYWQgY29udGV4dDogJHtlcnJvciBpbnN0YW5jZW9mIEVycm9yID8gZXJyb3IubWVzc2FnZSA6IFN0cmluZyhlcnJvcil9YCwgdHJ1ZSk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc2V0dXBDb250ZXh0Q2hhbmdlTGlzdGVuZXIoKTogUHJvbWlzZTx2b2lkPiB7XG5cdHRyeSB7XG5cdFx0Y29uc3QgZW5hYmxlZCA9IGF3YWl0IGFkYXB0ZXIuZW5zdXJlQ29udGV4dENoYW5nZWRMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRhd2FpdCBhcHBseUNvbnRleHRGcm9tU291cmNlKCk7XG5cdFx0XHR9IGNhdGNoIChlcnJvcikge1xuXHRcdFx0XHRhcHBlbmRMb2coe1xuXHRcdFx0XHRcdGxldmVsOiBcImVycm9yXCIsXG5cdFx0XHRcdFx0bWVzc2FnZTogYENvbnRleHQgY2hhbmdlIGhhbmRsZXIgZmFpbGVkOiAke2Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBlcnJvci5tZXNzYWdlIDogU3RyaW5nKGVycm9yKX1gLFxuXHRcdFx0XHRcdHRpbWVzdGFtcDogbm93SXNvKClcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0aWYgKCFlbmFibGVkKSB7XG5cdFx0XHRhcHBlbmRMb2coe1xuXHRcdFx0XHRsZXZlbDogXCJlcnJvclwiLFxuXHRcdFx0XHRtZXNzYWdlOiBcInNldENvbnRleHRDaGFuZ2VkTGlzdGVuZXIgaXMgdW5hdmFpbGFibGUgb24gd2luZG93Ll9haUNvbnRleHQuXCIsXG5cdFx0XHRcdHRpbWVzdGFtcDogbm93SXNvKClcblx0XHRcdH0pO1xuXHRcdH1cblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRhcHBlbmRMb2coe1xuXHRcdFx0bGV2ZWw6IFwiZXJyb3JcIixcblx0XHRcdG1lc3NhZ2U6IGBMaXN0ZW5lciBzZXR1cCBmYWlsZWQ6ICR7ZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiBTdHJpbmcoZXJyb3IpfWAsXG5cdFx0XHR0aW1lc3RhbXA6IG5vd0lzbygpXG5cdFx0fSk7XG5cdH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gYm9vdHN0cmFwKCk6IFByb21pc2U8dm9pZD4ge1xuXHRnZXRBaUNvbnRleHRCdG4/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0dm9pZCBvbkdldEFpQ29udGV4dENsaWNrKCk7XG5cdH0pO1xuXHRnZXRTaWduYWxDb250ZXh0QnRuPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdHZvaWQgb25HZXRTaWduYWxDb250ZXh0Q2xpY2soKTtcblx0fSk7XG5cdGNsZWFyVHJhbnNjcmlwdEJ0bj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIG9uQ2xlYXJUcmFuc2NyaXB0Q2xpY2spO1xuXG5cdGlmICghYWRhcHRlci5pc0F2YWlsYWJsZSgpKSB7XG5cdFx0c2V0U3RhdHVzKFxuXHRcdFx0XCJ3aW5kb3cuX2FpQ29udGV4dCBpcyBub3QgYXZhaWxhYmxlLiBMb2FkIHRoaXMgaW4gSEVSRSBCcm93c2VyIEN1c3RvbSBBSSBDZW50ZXIgdG8gdXNlIGNvbnRleHQgQVBJcy5cIixcblx0XHRcdHRydWVcblx0XHQpO1xuXHRcdGlmIChhaVZpZXdzU3RhdHVzRWwpIHtcblx0XHRcdGFpVmlld3NTdGF0dXNFbC50ZXh0Q29udGVudCA9IFwiXCI7XG5cdFx0fVxuXHRcdGlmIChwYWdlSWRSb3dFbCkge1xuXHRcdFx0cGFnZUlkUm93RWwuaGlkZGVuID0gdHJ1ZTtcblx0XHRcdHBhZ2VJZFJvd0VsLmNsYXNzTGlzdC5hZGQoXCJoaWRkZW5cIik7XG5cdFx0fVxuXHRcdGdldEFpQ29udGV4dEJ0biAmJiAoZ2V0QWlDb250ZXh0QnRuLmRpc2FibGVkID0gdHJ1ZSk7XG5cdFx0cmVuZGVyVHJhbnNjcmlwdCgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHNldFN0YXR1cyhcIkNvbm5lY3RlZCB0byB3aW5kb3cuX2FpQ29udGV4dC4gVXNlIEdldCBBSSBDb250ZXh0IHRvIGFwcGVuZCBmdWxsIGNvbnRleHQgdG8gdGhlIHRyYW5zY3JpcHQuXCIpO1xuXHRpZiAoYWRhcHRlci5pc01vY2tNb2RlKCkpIHtcblx0XHRzZXRTdGF0dXMoXCJNb2NrIGNvbnRleHQgbW9kZSBlbmFibGVkICg/bW9ja0NvbnRleHQ9MSkuIFVzZSBHZXQgQUkgQ29udGV4dCB0byBzZWUgc2FtcGxlIG91dHB1dC5cIik7XG5cdH1cblxuXHRhd2FpdCBsb2FkTGFiZWxzT25seSgpO1xuXHRnZXRBaUNvbnRleHRCdG4gJiYgKGdldEFpQ29udGV4dEJ0bi5kaXNhYmxlZCA9IGZhbHNlKTtcblx0YXdhaXQgc2V0dXBDb250ZXh0Q2hhbmdlTGlzdGVuZXIoKTtcbn1cblxudm9pZCBib290c3RyYXAoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==