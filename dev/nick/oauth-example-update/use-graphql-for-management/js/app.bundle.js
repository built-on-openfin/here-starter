/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./shared/src/auth.ts"
/*!****************************!*\
  !*** ./shared/src/auth.ts ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BearerTokenAuth: () => (/* binding */ BearerTokenAuth),
/* harmony export */   CookieHeaderAuth: () => (/* binding */ CookieHeaderAuth)
/* harmony export */ });
/**
 * Sends a bearer token in the `Authorization` header.
 *
 * This one provider covers every credential the API accepts:
 *
 * - An **OAuth access token** the browser UI obtained via authorization code
 * + PKCE. HERE issued it, so no `authConfigId` is passed.
 * - An **org API JWT** issued by an authentication provider configured for
 * your organization, used by the sync script. When an org has more than one
 * such provider, `authConfigId` is sent as `x-of-auth-id` so the gateway
 * knows which one to validate against.
 * - That same **org API JWT pasted into the browser UI** as a stopgap for
 * orgs where OAuth public clients aren't available yet. It travels
 * identically to the OAuth case; only how the page obtained it differs.
 *
 * Do not send `authConfigId` with a HERE-issued OAuth token: that header selects
 * among externally configured providers, and HERE validates its own tokens.
 */
class BearerTokenAuth {
    /** Wrap a bearer token, optionally tied to an external auth provider. */
    constructor(token, authConfigId) {
        this.token = token;
        this.authConfigId = authConfigId;
    }
    /** Return the Authorization header, plus x-of-auth-id when configured. */
    apply() {
        const headers = { Authorization: `Bearer ${this.token}` };
        if (this.authConfigId !== undefined) {
            headers["x-of-auth-id"] = this.authConfigId;
        }
        return { headers };
    }
}
/**
 * Sends the here-session cookie explicitly. For Node scripts and CI only — a
 * browser cannot set the Cookie header, and cannot send the ambient cookie
 * cross-origin, so use `BearerTokenAuth` there instead.
 */
class CookieHeaderAuth {
    /** Wrap a here-session cookie value. */
    constructor(cookieValue) {
        this.cookieValue = cookieValue;
    }
    /** Return the Cookie header carrying the session value. */
    apply() {
        return { headers: { Cookie: `here-session=${this.cookieValue}` } };
    }
}


/***/ },

/***/ "./shared/src/content-api.ts"
/*!***********************************!*\
  !*** ./shared/src/content-api.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentApiClient: () => (/* binding */ ContentApiClient),
/* harmony export */   ENDPOINT_PATH: () => (/* reexport safe */ _graphql__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT_PATH),
/* harmony export */   toContentUpdate: () => (/* binding */ toContentUpdate)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./shared/src/errors.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./shared/src/graphql.ts");


// Re-exported so callers that only deal with content keep one import. The
// endpoint is shared by every client in this sample, so it is defined once in
// `graphql.ts`.

/**
 * Selects the fields `fdc3ToContentInput` can write, so a node round-trips
 * through `contentNodeToFdc3Application` without silently dropping settings.
 *
 * Two fields are deliberately not read back:
 *
 * - `access` comes back as org-specific subject/permission UUIDs unlikely to
 * mean anything in a different org, so the reverse mapper leaves it out even
 * though it *is* fetched here.
 * - `interop` is **write-only** in the deployed schema: `CreateContentInput`
 * and `UpdateContentInput` both accept it, but `WebContent` and
 * `DesktopContent` do not expose it, so selecting it fails the whole query
 * with `Cannot query field "interop" on type "WebContent"`. Writes still send
 * it (see `fdc3ToContentInput`); it simply cannot be read back, which means an
 * export → sync round-trip does not preserve interop declarations. If a later
 * schema version adds the field, add it back to both fragments here and the
 * reverse mapper picks it up with no other change.
 */
const NODE_FIELDS = "uuid id name type active featured icon createdAt customLabel " +
    "access { subjects primitives } " +
    "... on WebContent { " +
    "url urls hereApiAccess allowDuplication allowOpenWithDefaultBrowser useAIContext enableSimpleWindow " +
    "environmentAvailability { enableHereEB enableHereZero enableHereMobile } " +
    "viewSettings { navigationControls reloadControl } " +
    "dataLossPreventionSettings { copyBehavior pasteBehavior screenCaptureBehavior printBehavior } " +
    "} " +
    "... on DesktopContent { desktopPath desktopArgs withSnap }";
/** Fields selected back from create/update mutations. */
const WRITE_FIELDS = "uuid id name type active featured";
/**
 * Shape a full create body into a partial update body.
 *
 * `contentType` and `contentId` identify an app and cannot be changed, so they
 * are always dropped. `access` is dropped unless `keepAccess` is set: callers
 * that build an input from a manifest or a form get the mapper's default of
 * `{ subjects: [], primitives: [] }`, and sending that would strip every
 * existing assignment rather than leave it alone.
 */
function toContentUpdate(input, options) {
    const { contentType, contentId, access, ...rest } = input;
    void contentType;
    void contentId;
    return options?.keepAccess === true ? { ...rest, access } : rest;
}
/**
 * The API rejects an update with no fields, so fail early with a clearer message.
 * @throws {ContentApiError} if `input` has no fields set.
 */
function assertNonEmptyUpdate(input, identifier) {
    if (Object.keys(input).length === 0) {
        throw new _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError(0, `Update for "${identifier}" is empty — include at least one field.`);
    }
}
/** Client for the HERE Content Configuration API (GraphQL queries and mutations). */
class ContentApiClient {
    /** Build a client for one org, using the given credential provider. */
    constructor(options) {
        this.transport = new _graphql__WEBPACK_IMPORTED_MODULE_1__.GraphQlTransport(options);
    }
    /** List every app in the directory, following GraphQL pagination. */
    async listContents(pageSize = 50) {
        const nodes = [];
        let after = null;
        let hasNext = true;
        while (hasNext) {
            const query = "query($first: Int!, $after: String) { contents(first: $first, after: $after) " +
                `{ edges { node { ${NODE_FIELDS} } } pageInfo { hasNextPage endCursor } } }`;
            const data = await this.transport.request(query, {
                first: pageSize,
                after
            });
            for (const edge of data.contents.edges) {
                nodes.push(edge.node);
            }
            hasNext = data.contents.pageInfo.hasNextPage;
            after = data.contents.pageInfo.endCursor;
        }
        return nodes;
    }
    /** Look up a single app by its human-readable content ID. Null if it does not exist. */
    async getContentById(contentId) {
        const query = `query($id: ID!) { content(id: $id) { ${NODE_FIELDS} } }`;
        return this.lookup(query, { id: contentId });
    }
    /** Look up a single app by its system UUID. Null if it does not exist. */
    async getContentByUuid(uuid) {
        const query = `query($uuid: ID!) { content(uuid: $uuid) { ${NODE_FIELDS} } }`;
        return this.lookup(query, { uuid });
    }
    /** Create a new application definition. */
    async createContent(input) {
        const query = "mutation CreateContent($input: CreateContentInput!) " +
            `{ createContent(input: $input) { ${WRITE_FIELDS} } }`;
        const data = await this.transport.request(query, { input });
        return data.createContent;
    }
    /**
     * Update an existing application definition.
     *
     * `identifier` is the app's contentId or its uuid — either works. Updates are
     * partial: send only the fields you want to change. The API rejects an empty
     * update, so `input` must carry at least one field.
     */
    async updateContent(identifier, input) {
        assertNonEmptyUpdate(input, identifier);
        const query = "mutation UpdateContent($identifier: ID!, $input: UpdateContentInput!) " +
            `{ updateContent(identifier: $identifier, input: $input) { ${WRITE_FIELDS} } }`;
        const data = await this.transport.request(query, { identifier, input });
        return data.updateContent;
    }
    /**
     * Permanently delete an application definition by contentId or uuid.
     * Access permissions and dock entries referencing it are cleaned up too.
     */
    async removeContent(identifier) {
        const query = "mutation DeleteContent($identifier: ID!) { deleteContent(identifier: $identifier) }";
        const data = await this.transport.request(query, { identifier });
        return data.deleteContent;
    }
    /**
     * Create many apps in one request.
     *
     * Bulk operations are all-or-nothing: if any item fails validation, nothing
     * in the batch is saved.
     */
    async createContents(inputs) {
        const query = "mutation BulkCreate($inputs: [CreateContentInput!]!) " +
            `{ createContents(inputs: $inputs) { created { ${WRITE_FIELDS} } } }`;
        const data = await this.transport.request(query, {
            inputs
        });
        return data.createContents.created;
    }
    /** Update many apps in one all-or-nothing request. */
    async updateContents(inputs) {
        for (const entry of inputs) {
            assertNonEmptyUpdate(entry.update, entry.identifier);
        }
        const query = "mutation BulkUpdate($inputs: [BulkUpdateContentInput!]!) " +
            `{ updateContents(inputs: $inputs) { updated { ${WRITE_FIELDS} } } }`;
        const data = await this.transport.request(query, {
            inputs
        });
        return data.updateContents.updated;
    }
    /** Delete many apps in one all-or-nothing request. Returns the deleted UUIDs. */
    async deleteContents(identifiers) {
        const query = "mutation BulkDelete($identifiers: [ID!]!) " +
            "{ deleteContents(identifiers: $identifiers) { deleted } }";
        const data = await this.transport.request(query, {
            identifiers
        });
        return data.deleteContents.deleted;
    }
    /**
     * Run a single-app lookup.
     *
     * A missing app comes back as a NOT_FOUND error rather than `content: null`,
     * so translate that one case — "does this app exist?" deserves an answer,
     * not an exception. Every other failure still throws.
     */
    async lookup(query, variables) {
        try {
            const data = await this.transport.request(query, variables);
            return data.content;
        }
        catch (err) {
            if (err instanceof _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError && err.code === "NOT_FOUND") {
                return null;
            }
            throw err;
        }
    }
}


/***/ },

/***/ "./shared/src/errors.ts"
/*!******************************!*\
  !*** ./shared/src/errors.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ContentApiError: () => (/* binding */ ContentApiError),
/* harmony export */   codeToMessage: () => (/* binding */ codeToMessage),
/* harmony export */   statusToMessage: () => (/* binding */ statusToMessage)
/* harmony export */ });
/**
 * An error from the Content Configuration API.
 *
 * Failures arrive from two different layers, so both are represented here:
 * the gateway rejects unauthenticated requests with an HTTP status before
 * GraphQL ever runs, while GraphQL itself answers 200 with an `errors` array.
 * `status` is 0 for the GraphQL layer, where no meaningful HTTP status exists.
 */
class ContentApiError extends Error {
    /** Wrap a failure with its HTTP status (0 for a GraphQL-layer error) and code. */
    constructor(status, message, code) {
        super(message);
        this.name = "ContentApiError";
        this.status = status;
        this.code = code;
    }
}
/** Join the server's own wording with our hint as one readable sentence pair. */
function join(detail, hint) {
    const trimmed = detail.trim();
    if (trimmed === "") {
        return hint;
    }
    return /[.!?]$/u.test(trimmed) ? `${trimmed} ${hint}` : `${trimmed}. ${hint}`;
}
/** Map a GraphQL `errors[0].extensions.code` to an actionable message. */
function codeToMessage(code, detail) {
    switch (code) {
        case "BAD_USER_INPUT":
            return join(detail, "Check the required fields for this content type.");
        case "UNAUTHENTICATED":
            return join(detail, "Your session has expired or the credential is missing.");
        case "FORBIDDEN":
            return join(detail, "Your account lacks content admin access in this org.");
        case "NOT_FOUND":
            return join(detail, "No app, user, or group matches that identifier.");
        case "CONFLICT":
            return join(detail, "An app with that contentId already exists in your org.");
        default:
            return detail;
    }
}
/** Map a transport-level HTTP status to an actionable message. */
function statusToMessage(status) {
    switch (status) {
        case 400:
            return "400 Bad Request: the request was rejected before reaching the API. Your token, or its x-of-auth-id, may not match a configured auth provider for this org.";
        case 401:
            return "401 Unauthorized: the request is not authenticated. Sign in again in the UI, or supply a valid API JWT (or a here-session cookie) when running the script.";
        case 403:
            return "403 Forbidden: your account lacks admin write access to manage content in this org.";
        case 404:
            return "404 Not Found: check the base URL and endpoint path.";
        default:
            return `Request failed with status ${status}.`;
    }
}


/***/ },

/***/ "./shared/src/fdc3-mapping.ts"
/*!************************************!*\
  !*** ./shared/src/fdc3-mapping.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   contentNodeToFdc3Application: () => (/* binding */ contentNodeToFdc3Application),
/* harmony export */   fdc3ToContentInput: () => (/* binding */ fdc3ToContentInput)
/* harmony export */ });
const DEFAULT_VIEW = { navigationControls: true, reloadControl: true };
const DEFAULT_ENV = {
    enableHereEB: true,
    enableHereZero: false,
    enableHereMobile: false
};
const DEFAULT_DLP = {
    copyBehavior: "allow",
    pasteBehavior: "non-protected-content",
    screenCaptureBehavior: "allow",
    printBehavior: "allow"
};
const DEFAULT_ACCESS = { subjects: [], primitives: [] };
/**
 * Convert an FDC3 2.0 Application record into a HERE content create/update body.
 * @throws {Error} if a native app is missing `details.path`, or a web app is missing `details.url`.
 */
function fdc3ToContentInput(app) {
    const here = app.hostManifests?.here ?? {};
    const name = app.title ?? app.name;
    const icon = app.icons?.[0]?.src;
    if (app.type === "native") {
        if (app.details.path === undefined) {
            throw new Error(`FDC3 native app "${app.appId}" is missing details.path`);
        }
        const desktop = {
            contentType: "DESKTOP",
            name,
            contentId: app.appId,
            active: here.active ?? true,
            featured: here.featured ?? false,
            icon,
            customLabel: here.customLabel,
            nativeSettings: {
                desktopPath: app.details.path,
                desktopArgs: app.details.arguments ?? [],
                withSnap: here.withSnap ?? false
            },
            // This sample always emits an `access` object, re-applying the desired state on
            // every write. To leave access unchanged on update, the HERE API accepts
            // `access: null`, which this manifest-driven mapper does not emit.
            access: here.access ?? DEFAULT_ACCESS
        };
        return desktop;
    }
    if (app.details.url === undefined) {
        throw new Error(`FDC3 web app "${app.appId}" is missing details.url`);
    }
    const web = {
        contentType: "WEB",
        name,
        contentId: app.appId,
        active: here.active ?? true,
        featured: here.featured ?? false,
        icon,
        customLabel: here.customLabel,
        urls: [app.details.url],
        hereApiAccess: here.hereApiAccess ?? false,
        allowDuplication: here.allowDuplication ?? false,
        allowOpenWithDefaultBrowser: here.allowOpenWithDefaultBrowser ?? false,
        useAIContext: here.useAIContext ?? false,
        enableSimpleWindow: here.enableSimpleWindow ?? false,
        viewSettings: here.viewSettings ?? DEFAULT_VIEW,
        environmentAvailability: here.environmentAvailability ?? DEFAULT_ENV,
        dataLossPreventionSettings: here.dataLossPreventionSettings ?? DEFAULT_DLP,
        redirects: [],
        // FDC3 interop intent declarations pass straight through when present.
        interop: app.interop,
        // This sample always emits an `access` object, re-applying the desired state on every
        // write. To leave access unchanged on update, the HERE API accepts `access: null`,
        // which this manifest-driven mapper does not emit.
        access: here.access ?? DEFAULT_ACCESS
    };
    return web;
}
/**
 * Convert a live content node back into an FDC3 2.0 Application record — the
 * opposite of `fdc3ToContentInput`. Used to export a directory as an
 * app-directory manifest, e.g. to carry it into another environment.
 *
 * Deliberately omits `access`: `subjects`/`primitives` are org-specific
 * UUIDs (a permission or group id meaningful only in the org the node came
 * from), so carrying them into a different org's manifest would either fail
 * outright or — worse — silently grant access to whatever unrelated
 * subject happens to hold that id there. Leaving `access` out of the FDC3
 * record matches how `sync.ts` already treats undeclared access: applying
 * this manifest anywhere leaves that app's access assignments untouched
 * rather than wiping or misapplying them.
 */
function contentNodeToFdc3Application(node) {
    const here = {
        active: node.active,
        featured: node.featured ?? false,
        customLabel: node.customLabel
    };
    if (node.type === "DESKTOP") {
        return {
            appId: node.id,
            name: node.name,
            title: node.name,
            type: "native",
            details: { path: node.desktopPath, arguments: node.desktopArgs },
            icons: node.icon === undefined ? undefined : [{ src: node.icon }],
            // Undefined whenever the deployed schema does not expose `interop` on
            // the content types — see NODE_FIELDS in content-api.ts. Passed through
            // so it appears automatically if a schema version starts returning it.
            interop: node.interop,
            hostManifests: { here: { ...here, withSnap: node.withSnap ?? false } }
        };
    }
    return {
        appId: node.id,
        name: node.name,
        title: node.name,
        type: "web",
        // A node can carry more than one URL (e.g. allowed redirect targets); FDC3
        // has room for exactly one, so take the primary — same simplification the
        // UI's "Validate" already makes when it loads a node back into the form.
        details: { url: node.url ?? node.urls?.[0] },
        icons: node.icon === undefined ? undefined : [{ src: node.icon }],
        // Intent declarations are write-only in the deployed schema, so this is
        // undefined on export rather than round-tripping — see NODE_FIELDS in
        // content-api.ts. Passed through so it appears automatically if a schema
        // version starts returning it.
        interop: node.interop,
        hostManifests: {
            here: {
                ...here,
                hereApiAccess: node.hereApiAccess ?? false,
                allowDuplication: node.allowDuplication ?? false,
                allowOpenWithDefaultBrowser: node.allowOpenWithDefaultBrowser ?? false,
                useAIContext: node.useAIContext ?? false,
                enableSimpleWindow: node.enableSimpleWindow ?? false,
                viewSettings: node.viewSettings ?? DEFAULT_VIEW,
                environmentAvailability: node.environmentAvailability ?? DEFAULT_ENV,
                dataLossPreventionSettings: node.dataLossPreventionSettings ?? DEFAULT_DLP
            }
        }
    };
}


/***/ },

/***/ "./shared/src/graphql.ts"
/*!*******************************!*\
  !*** ./shared/src/graphql.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ENDPOINT_PATH: () => (/* binding */ ENDPOINT_PATH),
/* harmony export */   GraphQlTransport: () => (/* binding */ GraphQlTransport)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./shared/src/errors.ts");

/** Every request in this sample goes to this one endpoint — reads and writes alike. */
const ENDPOINT_PATH = "/here/api/graphql";
/**
 * Sends GraphQL documents to one org and unwraps the two error envelopes the
 * HERE gateway can answer with.
 *
 * Extracted so the content client and the user/group client share one copy of
 * that error handling: the dispatch below is subtle enough that a second
 * hand-written version would drift, and every client wants the same behaviour.
 * Swap `fetchImpl` in tests; everything else is stateless per request.
 */
class GraphQlTransport {
    /** Build a transport for one org, using the given credential provider. */
    constructor(options) {
        this.baseUrl = options.baseUrl.replace(/\/$/u, "");
        this.auth = options.auth;
        // The native `fetch` must keep its original receiver: calling it as
        // `this.fetchImpl(...)` would rebind `this` and throw "Illegal invocation".
        this.fetchImpl = options.fetchImpl ?? globalThis.fetch.bind(globalThis);
    }
    /** Send one GraphQL request and unwrap its `data`, throwing on any error shape. */
    async request(query, variables) {
        const auth = await this.auth.apply();
        const response = await this.fetchImpl(`${this.baseUrl}${ENDPOINT_PATH}`, {
            method: "POST",
            headers: { "Content-Type": "application/json", ...auth.headers },
            credentials: auth.credentials,
            body: JSON.stringify({ query, variables })
        });
        // Failures arrive in two different envelopes, and either can accompany a
        // non-OK status: GraphQL answers malformed queries with 400 plus an
        // `errors` array, while the gateway rejects unauthenticated requests
        // before GraphQL runs with a flat `{ code, message }`. Read the body
        // first and dispatch on its shape — the server's own message is always
        // more specific than anything inferred from the status alone.
        const envelope = (await this.readBody(response)) ?? {};
        if (envelope.errors !== undefined && envelope.errors.length > 0) {
            const first = envelope.errors[0];
            const code = first.extensions?.code;
            // Status 0 denotes a GraphQL-layer failure on an otherwise fine response.
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError(response.ok ? 0 : response.status, code === undefined ? first.message : (0,_errors__WEBPACK_IMPORTED_MODULE_0__.codeToMessage)(code, first.message), code);
        }
        if (!response.ok) {
            // A gateway rejection: surface its message and code verbatim.
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError(response.status, envelope.message ?? (0,_errors__WEBPACK_IMPORTED_MODULE_0__.statusToMessage)(response.status), envelope.code);
        }
        if (envelope.data === undefined) {
            throw new _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError(0, "GraphQL response had no data.");
        }
        return envelope.data;
    }
    /** Read a JSON body, tolerating a non-JSON or empty response. */
    async readBody(response) {
        try {
            return (await response.json());
        }
        catch {
            return undefined;
        }
    }
}


/***/ },

/***/ "./shared/src/oauth-pkce.ts"
/*!**********************************!*\
  !*** ./shared/src/oauth-pkce.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OAuthError: () => (/* binding */ OAuthError),
/* harmony export */   beginSignIn: () => (/* binding */ beginSignIn),
/* harmony export */   completeSignIn: () => (/* binding */ completeSignIn),
/* harmony export */   discover: () => (/* binding */ discover),
/* harmony export */   hasAuthorizationResponse: () => (/* binding */ hasAuthorizationResponse),
/* harmony export */   redirectUri: () => (/* binding */ redirectUri)
/* harmony export */ });
/**
 * OAuth 2.0 Authorization Code flow with PKCE (RFC 7636) — **browser only**.
 *
 * HERE's service gateway is the authorization server, so a page can obtain its
 * own short-lived access token instead of shipping a long-lived credential in
 * its bundle. The user signs in with their normal organization account and
 * consents; the token that comes back carries their access, not the app's.
 *
 * The sample is a public client: it holds no client secret, because anything in
 * a browser bundle is readable by anyone who loads the page. PKCE is what makes
 * that safe — the authorization code is bound to a one-time secret (the
 * "verifier") that never leaves this page, so an intercepted code is useless on
 * its own.
 *
 * This module depends on `window`, `sessionStorage` and `crypto.subtle`. The
 * sync script must not import it; a redirect flow needs a user present, so
 * headless callers use `BearerTokenAuth` with an org API JWT instead.
 */
/** A failure during discovery, authorization, or the token exchange. */
class OAuthError extends Error {
    /** Wrap a failure message, optionally tagged with the server's error code. */
    constructor(message, code) {
        super(message);
        this.name = "OAuthError";
        this.code = code;
    }
}
const DISCOVERY_PATH = "/.well-known/oauth-authorization-server";
/**
 * The verifier and state must outlive a full page navigation — the browser
 * leaves for the authorization server and comes back — so they cannot live in
 * memory. They are removed the moment the redirect is handled.
 */
const VERIFIER_KEY = "here-oauth-verifier";
const STATE_KEY = "here-oauth-state";
/**
 * The one scope this sample needs: it lets the page call HERE Cloud APIs on the
 * signed-in user's behalf.
 *
 * Deliberately a fixed value rather than something read out of the discovery
 * document. RFC 8414's `scopes_supported` lists what the *authorization server*
 * supports in aggregate, not what a *client* is permitted to request — a HERE
 * org also advertises `offline_access` and `app_default`. Asking for scopes the
 * registered app was not granted fails the whole authorization with
 * `invalid_scope`, and this sample wants neither of those: the token is held in
 * memory only and there is no refresh grant.
 */
const SCOPE = "full";
let cached;
/**
 * Read the authorization server's metadata.
 *
 * Endpoints are discovered rather than hardcoded so the sample works against
 * any organization's subdomain without extra configuration.
 */
async function discover(baseUrl) {
    if (cached !== undefined && cached.baseUrl === baseUrl) {
        return cached.metadata;
    }
    const url = `${baseUrl}${DISCOVERY_PATH}`;
    let response;
    try {
        response = await fetch(url);
    }
    catch {
        throw new OAuthError(`Could not reach ${url}. Check BASE_URL and your network.`);
    }
    if (!response.ok) {
        throw new OAuthError(`${url} returned ${response.status}. OAuth may not be enabled for this ` +
            "organization — ask your HERE administrator to enable it.");
    }
    const metadata = (await response.json());
    cached = { baseUrl, metadata };
    return metadata;
}
/**
 * Where the authorization server sends the user back.
 *
 * Derived from the current page rather than configured, because it must match
 * a registered redirect URI exactly and a mismatched hand-typed value is the
 * single most common way this flow fails. The UI displays this string so it can
 * be copied into the admin console verbatim.
 */
function redirectUri() {
    return `${window.location.origin}${window.location.pathname}`;
}
/** True when the current URL is an authorization response, success or failure. */
function hasAuthorizationResponse() {
    const params = new URLSearchParams(window.location.search);
    return params.has("code") || params.has("error");
}
/**
 * Start sign-in: stash a fresh verifier and state, then leave for the
 * authorization endpoint. This navigates away, so nothing after it runs.
 */
async function beginSignIn(baseUrl, clientId) {
    const metadata = await discover(baseUrl);
    // Checked up front so a server that does not offer this scope produces an
    // actionable message here, rather than an `invalid_scope` redirect after the
    // user has already been sent away to sign in.
    if (metadata.scopes_supported !== undefined && !metadata.scopes_supported.includes(SCOPE)) {
        throw new OAuthError(`This organization does not advertise the "${SCOPE}" scope (it offers: ` +
            `${metadata.scopes_supported.join(", ")}). Ask your HERE administrator which ` +
            "scope your OAuth app should request.");
    }
    const verifier = randomString(32);
    const state = randomString(16);
    sessionStorage.setItem(VERIFIER_KEY, verifier);
    sessionStorage.setItem(STATE_KEY, state);
    // Built with individual .set() calls, not an object literal: the OAuth spec
    // mandates these exact snake_case parameter names, and a literal object
    // would make every key a linter naming-convention violation.
    const params = new URLSearchParams();
    params.set("response_type", "code");
    params.set("client_id", clientId);
    params.set("redirect_uri", redirectUri());
    params.set("scope", SCOPE);
    params.set("state", state);
    params.set("code_challenge", await challengeFor(verifier));
    params.set("code_challenge_method", "S256");
    window.location.assign(`${metadata.authorization_endpoint}?${params.toString()}`);
}
/**
 * Handle the redirect back and exchange the code for an access token.
 *
 * The stored verifier and state are cleared first, and the query string is
 * stripped from the address bar, so a reload or a shared URL cannot replay a
 * one-time code.
 */
async function completeSignIn(baseUrl, clientId) {
    const params = new URLSearchParams(window.location.search);
    const verifier = sessionStorage.getItem(VERIFIER_KEY);
    const expectedState = sessionStorage.getItem(STATE_KEY);
    sessionStorage.removeItem(VERIFIER_KEY);
    sessionStorage.removeItem(STATE_KEY);
    window.history.replaceState({}, document.title, redirectUri());
    const failure = params.get("error");
    if (failure !== null) {
        throw new OAuthError(params.get("error_description") ?? `Authorization failed: ${failure}`, failure);
    }
    const code = params.get("code");
    if (code === null) {
        throw new OAuthError("The redirect carried no authorization code.");
    }
    // A mismatch means this response does not belong to the request this page
    // made, so the code must not be exchanged.
    if (expectedState === null || params.get("state") !== expectedState) {
        throw new OAuthError("The returned state did not match the value sent. Sign-in was abandoned — " +
            "this can indicate a cross-site request forgery attempt.");
    }
    if (verifier === null) {
        throw new OAuthError("The PKCE verifier was missing, so the code cannot be exchanged. Start sign-in again.");
    }
    const metadata = await discover(baseUrl);
    const body = new URLSearchParams();
    body.set("grant_type", "authorization_code");
    body.set("code", code);
    body.set("redirect_uri", redirectUri());
    body.set("client_id", clientId);
    body.set("code_verifier", verifier);
    const response = await fetch(metadata.token_endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
    });
    const payload = (await response.json().catch(() => ({})));
    if (!response.ok || payload.access_token === undefined) {
        const detail = payload.error_description ?? payload.error ?? `status ${response.status}`;
        throw new OAuthError(`Token exchange failed: ${detail}`, payload.error);
    }
    return payload.access_token;
}
/** A URL-safe random string, used for both the verifier and the state value. */
function randomString(bytes) {
    const buffer = new Uint8Array(bytes);
    crypto.getRandomValues(buffer);
    return base64Url(buffer);
}
/** The S256 challenge: base64url(SHA-256(verifier)). */
async function challengeFor(verifier) {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
    return base64Url(new Uint8Array(digest));
}
/** Base64url per RFC 4648 §5 — no padding, URL-safe alphabet. */
function base64Url(bytes) {
    let binary = "";
    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }
    return btoa(binary).replace(/\+/gu, "-").replace(/\//gu, "_").replace(/[=]+$/u, "");
}


/***/ },

/***/ "./shared/src/user-api.ts"
/*!********************************!*\
  !*** ./shared/src/user-api.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   UserApiClient: () => (/* binding */ UserApiClient)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./shared/src/errors.ts");
/* harmony import */ var _graphql__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphql */ "./shared/src/graphql.ts");


/** Fields selected for a group. `Group` has no `name` — `id` is the readable one. */
const GROUP_FIELDS = "uuid id description";
/** Fields selected for a user, without their group memberships. */
const USER_FIELDS = "uuid id email firstName lastName active";
/** Flatten a connection's `edges { node }` into a plain array. */
function nodesOf(connection) {
    return (connection?.edges ?? []).map((edge) => edge.node);
}
/** Map a raw group node onto the domain type, lifting the nested member count. */
function toGroup(node) {
    return {
        uuid: node.uuid,
        id: node.id,
        description: node.description,
        memberCount: node.users?.totalCount
    };
}
/** Map a raw user node onto the domain type, flattening its group connection. */
function toUser(node) {
    return {
        uuid: node.uuid,
        id: node.id,
        email: node.email,
        firstName: node.firstName,
        lastName: node.lastName,
        active: node.active,
        groups: node.groups === undefined ? undefined : nodesOf(node.groups).map((group) => toGroup(group))
    };
}
/**
 * Client for the HERE User and Group API (GraphQL queries and mutations).
 *
 * Group membership is a **set**: a user can belong to many groups at once, and
 * the API exposes only add and remove. There is no atomic "move" or "set the
 * groups to exactly this list", so anything that looks like moving a user is
 * composed from those two primitives — see `switchGroup`.
 *
 * Shares `GraphQlTransport` with `ContentApiClient`, so both speak to the same
 * endpoint with the same credential and the same error handling.
 */
class UserApiClient {
    /** Build a client for one org, using the given credential provider. */
    constructor(options) {
        this.transport = new _graphql__WEBPACK_IMPORTED_MODULE_1__.GraphQlTransport(options);
    }
    /**
     * List every group in the org, following pagination.
     *
     * Each group's member count comes from its nested `users { totalCount }`
     * rather than a second round of queries.
     */
    async listGroups(pageSize = 50) {
        const groups = [];
        let after = null;
        let hasNext = true;
        while (hasNext) {
            const query = "query($first: Int!, $after: String) { groups(first: $first, after: $after) " +
                `{ edges { node { ${GROUP_FIELDS} users { totalCount } } } pageInfo { hasNextPage endCursor } } }`;
            // Annotated explicitly: `after` is reassigned from `data` below, so
            // leaving this inferred makes the type circular (TS7022).
            const data = await this.transport.request(query, { first: pageSize, after });
            for (const node of nodesOf(data.groups)) {
                groups.push(toGroup(node));
            }
            hasNext = data.groups.pageInfo.hasNextPage;
            after = data.groups.pageInfo.endCursor;
        }
        return groups;
    }
    /**
     * List every user in the org, following pagination.
     *
     * Group memberships are deliberately not fetched here: they would add a
     * nested connection per user for a list that is mostly used to populate a
     * picker. Use `getUser` for one user's memberships.
     */
    async listUsers(pageSize = 50) {
        const users = [];
        let after = null;
        let hasNext = true;
        while (hasNext) {
            const query = "query($first: Int!, $after: String) { users(first: $first, after: $after) " +
                `{ edges { node { ${USER_FIELDS} } } pageInfo { hasNextPage endCursor } } }`;
            // Same explicit annotation as `listGroups`, for the same reason.
            const data = await this.transport.request(query, { first: pageSize, after });
            for (const node of nodesOf(data.users)) {
                users.push(toUser(node));
            }
            hasNext = data.users.pageInfo.hasNextPage;
            after = data.users.pageInfo.endCursor;
        }
        return users;
    }
    /**
     * Read one user and the groups they belong to. Null if no such user exists.
     *
     * `lookupBy` picks which argument to send, because the API names them
     * separately — `user(id: …)` for the readable identifier, `user(uuid: …)`
     * for the system id — rather than taking one generic `identifier`.
     */
    async getUser(identifier, lookupBy = "id") {
        const query = `query($value: ID!) { user(${lookupBy}: $value) ` +
            `{ ${USER_FIELDS} groups { totalCount edges { node { ${GROUP_FIELDS} } } } } }`;
        try {
            const data = await this.transport.request(query, { value: identifier });
            return data.user === null ? null : toUser(data.user);
        }
        catch (err) {
            // A missing user comes back as NOT_FOUND rather than `user: null`, so
            // translate that one case — "does this user exist?" deserves an
            // answer, not an exception. Every other failure still throws.
            if (err instanceof _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError && err.code === "NOT_FOUND") {
                return null;
            }
            throw err;
        }
    }
    /** Add one user to one group. Both arguments accept an `id` or a `uuid`. */
    async addUserToGroup(userIdentifier, groupIdentifier) {
        const query = "mutation AddUserToGroup($user: ID!, $group: ID!) " +
            `{ addUserToGroup(userIdentifier: $user, groupIdentifier: $group) { ${USER_FIELDS} } }`;
        const data = await this.transport.request(query, {
            user: userIdentifier,
            group: groupIdentifier
        });
        return toUser(data.addUserToGroup);
    }
    /** Remove one user from one group. Both arguments accept an `id` or a `uuid`. */
    async removeUserFromGroup(userIdentifier, groupIdentifier) {
        const query = "mutation RemoveUserFromGroup($user: ID!, $group: ID!) " +
            `{ removeUserFromGroup(userIdentifier: $user, groupIdentifier: $group) { ${USER_FIELDS} } }`;
        const data = await this.transport.request(query, {
            user: userIdentifier,
            group: groupIdentifier
        });
        return toUser(data.removeUserFromGroup);
    }
    /**
     * Move a user from one group to another.
     *
     * This is the operation most people picture as a single call, so it is worth
     * being explicit that the API has no such call: there is no
     * `moveUserToGroup`, `changeUserGroup` or `setUserGroup`, only add and
     * remove. A switch is therefore **two mutations and is not atomic** — there
     * is no transaction to roll back, unlike the content API's bulk writes.
     *
     * The order is deliberate: **add first, then remove.** If the second step
     * fails, the user is in both groups — holding slightly more access than
     * intended, and one retried remove away from correct. Removing first would
     * fail the other way, leaving the user in neither group with less access
     * than they started with, which in a desktop container means apps
     * disappearing for someone who did nothing wrong. Over-permissioned for a
     * moment beats locked out, and `partialFailure` reports it loudly either
     * way.
     * @throws {ContentApiError} if the add fails, in which case nothing changed.
     * @throws {Error} if the two groups are the same, which would otherwise add
     * and then immediately remove the user, leaving them outside the group they
     * started in.
     */
    async switchGroup(userIdentifier, fromGroupIdentifier, toGroupIdentifier) {
        if (fromGroupIdentifier === toGroupIdentifier) {
            throw new Error("The source and target groups are the same. Switching would add the user to " +
                "the group and then remove them from it, leaving them outside it.");
        }
        // Step one. Allowed to throw: if this fails, nothing has changed yet and
        // the caller's error path is the honest outcome.
        const added = await this.addUserToGroup(userIdentifier, toGroupIdentifier);
        // Step two. A failure here must NOT propagate as a plain error: the add
        // already happened, so the caller needs a result describing a
        // half-applied switch rather than an exception implying nothing did.
        try {
            const removed = await this.removeUserFromGroup(userIdentifier, fromGroupIdentifier);
            return {
                user: removed,
                addedTo: toGroupIdentifier,
                removedFrom: fromGroupIdentifier,
                added: true,
                removed: true
            };
        }
        catch (err) {
            return {
                user: added,
                addedTo: toGroupIdentifier,
                removedFrom: fromGroupIdentifier,
                added: true,
                removed: false,
                partialFailure: err instanceof _errors__WEBPACK_IMPORTED_MODULE_0__.ContentApiError ? err.message : String(err)
            };
        }
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
/* harmony import */ var _shared_src_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/src/auth */ "./shared/src/auth.ts");
/* harmony import */ var _shared_src_content_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../shared/src/content-api */ "./shared/src/content-api.ts");
/* harmony import */ var _shared_src_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/src/errors */ "./shared/src/errors.ts");
/* harmony import */ var _shared_src_fdc3_mapping__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/src/fdc3-mapping */ "./shared/src/fdc3-mapping.ts");
/* harmony import */ var _shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../shared/src/oauth-pkce */ "./shared/src/oauth-pkce.ts");
/* harmony import */ var _shared_src_user_api__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../shared/src/user-api */ "./shared/src/user-api.ts");






/**
 * Injected at build time by webpack from `.env` — see `.env.example`.
 *
 * Neither value is a secret. The client id is public by design, and the UI has
 * no token until the user signs in through HERE, so nothing sensitive is
 * readable in this bundle.
 *
 * `HERE_API_JWT` is deliberately NOT injected here even though it is also read
 * from `.env`: it is a real credential, unlike these two, and this bundle is
 * readable by anyone who loads the page. The JWT sign-in path below takes the
 * token from a field the user pastes into at runtime instead.
 */
const BASE_URL = "" ?? 0;
const CLIENT_ID = "" ?? 0;
/** Wire up the console: sign-in state, the CRUD form, and the activity log. */
function initializeDOM() {
    // Held in memory only, so closing or reloading the page ends the session.
    // There is no refresh grant, so an expired token means signing in again.
    // Both clients share the one credential and the one endpoint; they are
    // separate only because they cover two different parts of the schema.
    let client;
    let userClient;
    // The directory is fetched once per sign-in and cached, because the group
    // pickers are rebuilt on every selection and mutation.
    let groups = [];
    let users = [];
    /** The selected user's memberships, refreshed after every mutation. */
    let selectedGroups = [];
    const logEl = document.querySelector("#log");
    // --- sign-in state ------------------------------------------------------
    const ACTION_IDS = [
        "#btnList",
        "#btnExport",
        "#btnCreate",
        "#btnValidate",
        "#btnUpdate",
        "#btnDelete",
        "#btnLoadDirectory"
    ];
    /**
     * Controls that need more than a credential: they stay disabled until the
     * user and group lists have actually been fetched, because an empty picker
     * is worse than a visibly inactive one.
     */
    const DIRECTORY_CONTROL_IDS = [
        "#f-user",
        "#f-add-group",
        "#f-from-group",
        "#f-to-group",
        "#btnAddToGroup",
        "#btnSwitchGroup"
    ];
    /**
     * `authConfigId` only applies to a pasted API JWT — never pass it for an
     * OAuth token, which HERE validates itself (see `BearerTokenAuth`).
     */
    function setSignedIn(token, authConfigId) {
        const auth = token === undefined ? undefined : new _shared_src_auth__WEBPACK_IMPORTED_MODULE_0__.BearerTokenAuth(token, authConfigId);
        client = auth === undefined ? undefined : new _shared_src_content_api__WEBPACK_IMPORTED_MODULE_1__.ContentApiClient({ baseUrl: BASE_URL, auth });
        userClient = auth === undefined ? undefined : new _shared_src_user_api__WEBPACK_IMPORTED_MODULE_5__.UserApiClient({ baseUrl: BASE_URL, auth });
        for (const id of ACTION_IDS) {
            const button = document.querySelector(id);
            if (button !== null) {
                button.disabled = token === undefined;
            }
        }
        // Signing out must also drop the cached directory: it belongs to the
        // credential that fetched it, and leaving stale names in the pickers
        // would imply the page still has access to them.
        groups = [];
        users = [];
        selectedGroups = [];
        setDirectoryControlsEnabled(false);
        clearDirectoryPickers();
        renderMemberships();
        document.querySelector("#signInControls")?.classList.toggle("hidden", token !== undefined);
        document.querySelector("#authState")?.classList.toggle("hidden", token === undefined);
    }
    /** Report an OAuth failure in the transcript and return to signed out. */
    function failSignIn(err) {
        notice(err instanceof _shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__.OAuthError ? err.message : String(err), "error");
        setSignedIn(undefined);
    }
    // --- reading and building from the form ---------------------------------
    /** Read a trimmed input value by selector. */
    function text(id) {
        return (document.querySelector(id)?.value ?? "").trim();
    }
    /** Read a checkbox's checked state by selector. */
    function checked(id) {
        return document.querySelector(id)?.checked ?? false;
    }
    /** Snapshot the form into a `FormState`. */
    function readForm() {
        return {
            contentId: text("#f-contentId"),
            name: text("#f-name"),
            type: document.querySelector("#f-type")?.value === "native" ? "native" : "web",
            url: text("#f-url"),
            path: text("#f-path"),
            icon: text("#f-icon"),
            active: checked("#f-active"),
            featured: checked("#f-featured")
        };
    }
    /** Turn the form into an FDC3 application record for create. */
    function buildApp(form) {
        const name = form.name === "" ? form.contentId : form.name;
        return {
            appId: form.contentId,
            name,
            title: name,
            type: form.type,
            details: form.type === "web" ? { url: form.url } : { path: form.path },
            icons: form.icon === "" ? undefined : [{ src: form.icon }],
            hostManifests: { here: { active: form.active, featured: form.featured } }
        };
    }
    /**
     * Build a partial update from the form. The form has no access editor, so
     * access is left out and an app's existing assignments stay untouched.
     */
    function buildUpdate(form) {
        return (0,_shared_src_content_api__WEBPACK_IMPORTED_MODULE_1__.toContentUpdate)((0,_shared_src_fdc3_mapping__WEBPACK_IMPORTED_MODULE_3__.fdc3ToContentInput)(buildApp(form)));
    }
    /** Fill the form from a fetched app, so Validate loads real values to edit. */
    function populateForm(node) {
        setValue("#f-contentId", node.id);
        setValue("#f-name", node.name);
        const type = node.type === "DESKTOP" ? "native" : "web";
        setValue("#f-type", type);
        applyTypeVisibility();
        setValue("#f-url", node.url ?? node.urls?.[0] ?? "");
        setValue("#f-path", node.desktopPath ?? "");
        setValue("#f-icon", node.icon ?? "");
        setChecked("#f-active", node.active);
        setChecked("#f-featured", node.featured ?? false);
    }
    /** Set an input or select's value by selector, if it exists. */
    function setValue(id, value) {
        const field = document.querySelector(id);
        if (field !== null) {
            field.value = value;
        }
    }
    /** Set a checkbox's checked state by selector, if it exists. */
    function setChecked(id, value) {
        const field = document.querySelector(id);
        if (field !== null) {
            field.checked = value;
        }
    }
    // --- user and group management ------------------------------------------
    /** Enable or disable the controls that need a fetched directory. */
    function setDirectoryControlsEnabled(enabled) {
        for (const id of DIRECTORY_CONTROL_IDS) {
            const control = document.querySelector(id);
            if (control !== null) {
                control.disabled = !enabled;
            }
        }
    }
    /**
     * Reset every directory-backed picker to its placeholder.
     *
     * Placeholders rather than empty selects: a disabled select with no options
     * renders as a blank box with no dropdown arrow, which reads as broken
     * rather than as waiting for data.
     */
    function clearDirectoryPickers() {
        fillSelect("#f-user", [], "Load the directory first");
        fillSelect("#f-add-group", [], "Load the directory first");
        fillSelect("#f-from-group", [], "Select a user first");
        fillSelect("#f-to-group", [], "Select a user first");
    }
    /**
     * A readable label for a user.
     *
     * Every name part is nullable — a directory seeded from an external provider
     * often carries only an id — so this falls back through name, then email,
     * then the id itself rather than rendering "null null".
     */
    function userLabel(user) {
        const name = [user.firstName, user.lastName]
            .filter((part) => part !== null && part.trim() !== "")
            .join(" ")
            .trim();
        const who = name !== "" ? name : user.email ?? user.id;
        return `${who} · ${user.id}${user.active ? "" : " (inactive)"}`;
    }
    /** A readable label for a group: its id, plus its member count when known. */
    function groupLabel(group) {
        return group.memberCount === undefined ? group.id : `${group.id} · ${group.memberCount} member(s)`;
    }
    /** Replace a select's options. Values are uuids; labels are for humans. */
    function fillSelect(id, options, placeholder) {
        const select = document.querySelector(id);
        if (select === null) {
            return;
        }
        const elements = [];
        if (placeholder !== undefined) {
            const empty = document.createElement("option");
            empty.value = "";
            empty.textContent = placeholder;
            elements.push(empty);
        }
        for (const option of options) {
            const element = document.createElement("option");
            // uuid rather than id: both are accepted by the API, but a uuid can
            // never be ambiguous with another org's naming.
            element.value = option.value;
            element.textContent = option.label;
            elements.push(element);
        }
        select.replaceChildren(...elements);
    }
    /** The uuid of the currently selected user, or "" when none is chosen. */
    function selectedUserUuid() {
        return document.querySelector("#f-user")?.value ?? "";
    }
    /** The selected user, from the cached list. */
    function selectedUser() {
        const uuid = selectedUserUuid();
        return users.find((candidate) => candidate.uuid === uuid);
    }
    /** Fill the user picker and the "add to group" picker from the cached lists. */
    function populateDirectoryPickers() {
        fillSelect("#f-user", users.map((user) => ({ value: user.uuid, label: userLabel(user) })), "Select a user…");
        fillSelect("#f-add-group", groups.map((group) => ({ value: group.uuid, label: groupLabel(group) })), "Select a group…");
    }
    /**
     * Render the selected user's memberships, and rebuild the switch pickers
     * from them.
     *
     * "From" lists only groups the user is actually in, and "To" only groups
     * they are not: the switch is then unable to express the two cases that
     * cannot work — leaving a group they were never in, and the same-group
     * switch that would add then immediately remove them.
     */
    function renderMemberships() {
        const container = document.querySelector("#memberships");
        if (container === null) {
            return;
        }
        const user = selectedUser();
        if (user === undefined) {
            container.replaceChildren(span("field__hint", "No user selected."));
            fillSelect("#f-from-group", []);
            fillSelect("#f-to-group", []);
            return;
        }
        if (selectedGroups.length === 0) {
            container.replaceChildren(span("field__hint", "This user belongs to no groups."));
        }
        else {
            container.replaceChildren(...selectedGroups.map((group) => {
                const row = document.createElement("div");
                row.className = "membership";
                row.append(span("membership__name", group.id));
                const remove = document.createElement("button");
                remove.className = "secondary small";
                remove.textContent = "Remove";
                remove.addEventListener("click", () => {
                    removeFromGroup(user, group);
                });
                row.append(remove);
                return row;
            }));
        }
        const memberOf = new Set(selectedGroups.map((group) => group.uuid));
        fillSelect("#f-from-group", selectedGroups.map((group) => ({ value: group.uuid, label: group.id })), selectedGroups.length === 0 ? "No groups to leave" : "Select a group…");
        fillSelect("#f-to-group", groups
            .filter((group) => !memberOf.has(group.uuid))
            .map((group) => ({ value: group.uuid, label: group.id })), "Select a group…");
    }
    /**
     * Re-read the selected user's memberships from the server and re-render.
     *
     * Deliberately a fresh read rather than a local edit of `selectedGroups`:
     * after a mutation the server is the only thing that knows what actually
     * landed, which matters most when a switch half-applied.
     */
    async function refreshMemberships(api) {
        const uuid = selectedUserUuid();
        if (uuid === "") {
            selectedGroups = [];
            renderMemberships();
            return;
        }
        const fresh = await api.getUser(uuid, "uuid");
        selectedGroups = fresh?.groups ?? [];
        renderMemberships();
    }
    /** Remove the user from one group, then re-read their memberships. */
    function removeFromGroup(user, group) {
        void runUsers(`mutation removeUserFromGroup · ${group.id}`, async (api) => {
            await api.removeUserFromGroup(user.uuid, group.uuid);
            await refreshMemberships(api);
            return [
                `Removed ${user.id} from "${group.id}".`,
                `Now in ${selectedGroups.length} group(s): ${selectedGroups.map((g) => g.id).join(", ") || "none"}`
            ];
        });
    }
    // --- the activity transcript --------------------------------------------
    /** Append a request entry; returns a callback to resolve it once it settles. */
    function logRequest(label) {
        document.querySelector("#logEmpty")?.remove();
        const entry = document.createElement("div");
        entry.className = "log-entry is-pending";
        const line = document.createElement("div");
        line.className = "log-entry__line";
        line.append(span("log-time", new Date().toLocaleTimeString()), span("log-method", "POST"), span("log-path", _shared_src_content_api__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT_PATH), span("log-pill", "waiting"));
        entry.append(line, span("log-label", label));
        logEl?.append(entry);
        scrollToLatest();
        const pill = line.querySelector(".log-pill");
        return (status, detail) => {
            entry.className = `log-entry is-${status}`;
            if (pill !== null) {
                pill.className = `log-pill is-${status}`;
                pill.textContent = status === "ok" ? "OK" : "error";
            }
            if (detail.length > 0) {
                const body = document.createElement("pre");
                body.className = "log-detail";
                body.textContent = detail.join("\n");
                entry.append(body);
            }
            scrollToLatest();
        };
    }
    /** Append a one-line, non-request entry to the activity log. */
    function notice(message, kind) {
        document.querySelector("#logEmpty")?.remove();
        const entry = document.createElement("div");
        entry.className = kind === "error" ? "log-entry is-error" : "log-entry";
        entry.append(span("log-label", message));
        logEl?.append(entry);
        scrollToLatest();
    }
    /** Build a `<span>` with a class and text content. */
    function span(className, content) {
        const el = document.createElement("span");
        el.className = className;
        el.textContent = content;
        return el;
    }
    /** Scroll the activity log to its latest entry. */
    function scrollToLatest() {
        const body = logEl?.parentElement;
        if (body !== null && body !== undefined) {
            body.scrollTop = body.scrollHeight;
        }
    }
    /** Trigger a browser download of `data` as a formatted JSON file. */
    function downloadJson(filename, data) {
        const blob = new Blob([JSON.stringify(data, null, "\t")], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        link.click();
        URL.revokeObjectURL(url);
    }
    // --- wiring -------------------------------------------------------------
    /** Check BASE_URL and HERE_OAUTH_CLIENT_ID are set, reporting what's missing. */
    function configured() {
        const missing = [];
        if (BASE_URL === "") {
            missing.push("BASE_URL");
        }
        if (CLIENT_ID === "") {
            missing.push("HERE_OAUTH_CLIENT_ID");
        }
        if (missing.length > 0) {
            notice(`${missing.join(" and ")} not set in .env. Add ${missing.length === 1 ? "it" : "them"} ` +
                "and re-run npm run start to rebuild. See the README for how to register an " +
                "OAuth app and get a client id.", "error");
            return false;
        }
        return true;
    }
    /**
     * The JWT sign-in path needs `BASE_URL` to call the API, but not
     * `HERE_OAUTH_CLIENT_ID` — there is no OAuth app involved.
     */
    function baseUrlConfigured() {
        if (BASE_URL === "") {
            notice("BASE_URL not set in .env. Add it and re-run npm run start to rebuild. See the README.", "error");
            return false;
        }
        return true;
    }
    /**
     * Run one API call, logging the request and resolving it to OK or error.
     *
     * The client is handed to the callback rather than read from the closure, so
     * the signed-in check happens in one place and callers get a non-optional
     * client to work with. Generic over which client, so the content and
     * user/group calls share one copy of the logging and session-expiry
     * handling — see `run` and `runUsers` below.
     */
    async function runWith(label, api, call) {
        if (api === undefined) {
            notice("Sign in first.", "error");
            return;
        }
        const settle = logRequest(label);
        try {
            settle("ok", await call(api));
        }
        catch (err) {
            settle("error", [err instanceof _shared_src_errors__WEBPACK_IMPORTED_MODULE_2__.ContentApiError ? err.message : String(err)]);
            // No refresh grant exists, so an expired token ends the session.
            if (err instanceof _shared_src_errors__WEBPACK_IMPORTED_MODULE_2__.ContentApiError && err.status === 401) {
                setSignedIn(undefined);
                notice("Session expired. Sign in again to continue.", "error");
            }
        }
    }
    /** Run one content-API call. */
    async function run(label, call) {
        return runWith(label, client, call);
    }
    /** Run one user/group-API call. */
    async function runUsers(label, call) {
        return runWith(label, userClient, call);
    }
    /** Show the URL field for a web app, or the executable path field for a desktop one. */
    function applyTypeVisibility() {
        const isWeb = document.querySelector("#f-type")?.value !== "native";
        document.querySelector("#field-url")?.classList.toggle("hidden", !isWeb);
        document.querySelector("#field-path")?.classList.toggle("hidden", isWeb);
    }
    document.querySelector("#btnSignIn")?.addEventListener("click", () => {
        if (!configured()) {
            return;
        }
        // Navigates away on success, so nothing after this runs.
        (0,_shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__.beginSignIn)(BASE_URL, CLIENT_ID).catch(failSignIn);
    });
    document.querySelector("#btnSignOut")?.addEventListener("click", () => {
        setSignedIn(undefined);
        notice("Signed out.", "info");
    });
    /**
     * Stopgap for orgs where OAuth public clients aren't available yet
     * (see the README): sign in with an API JWT pasted straight into the page
     * instead of running the OAuth handshake. Same in-memory-only lifetime as an
     * OAuth token — nothing is persisted, so a reload signs you out.
     */
    function signInWithPastedJwt() {
        if (!baseUrlConfigured()) {
            return;
        }
        const jwtInput = document.querySelector("#f-jwt");
        const jwt = jwtInput?.value.trim() ?? "";
        if (jwt === "") {
            notice("Paste an API JWT first.", "error");
            return;
        }
        const authIdInput = document.querySelector("#f-auth-id");
        const authId = authIdInput?.value.trim() ?? "";
        if (jwtInput !== null) {
            jwtInput.value = "";
        }
        if (authIdInput !== null) {
            authIdInput.value = "";
        }
        setSignedIn(jwt, authId === "" ? undefined : authId);
        notice("Signed in with a pasted JWT. This bypasses OAuth entirely — treat the token as a " +
            "secret, and don't leave it sitting in the field on a shared screen.", "info");
    }
    document.querySelector("#btnSignInJwt")?.addEventListener("click", signInWithPastedJwt);
    for (const id of ["#f-jwt", "#f-auth-id"]) {
        document.querySelector(id)?.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                signInWithPastedJwt();
            }
        });
    }
    document.querySelector("#f-type")?.addEventListener("change", applyTypeVisibility);
    document.querySelector("#btnList")?.addEventListener("click", () => {
        void run("query contents", async (api) => {
            const nodes = await api.listContents();
            if (nodes.length === 0) {
                return ["Your directory has no apps yet."];
            }
            const rows = nodes.map((n) => `• ${n.name}  [${n.id}]  ${n.type}  ${n.active ? "active" : "inactive"}`);
            return [`${nodes.length} app(s):`, ...rows];
        });
    });
    document.querySelector("#btnExport")?.addEventListener("click", () => {
        void run("export directory as FDC3 manifest", async (api) => {
            const nodes = await api.listContents();
            const directory = {
                applications: nodes.map((node) => (0,_shared_src_fdc3_mapping__WEBPACK_IMPORTED_MODULE_3__.contentNodeToFdc3Application)(node))
            };
            downloadJson(`content-directory-${Date.now()}.json`, directory);
            return [
                `Downloaded ${nodes.length} app(s) as an FDC3 App Directory manifest.`,
                "Access assignments were not included — they're org-specific and wouldn't carry over correctly."
            ];
        });
    });
    document.querySelector("#btnCreate")?.addEventListener("click", () => {
        const form = readForm();
        void run(`mutation createContent · ${form.contentId || "?"}`, async (api) => {
            const result = await api.createContent((0,_shared_src_fdc3_mapping__WEBPACK_IMPORTED_MODULE_3__.fdc3ToContentInput)(buildApp(form)));
            return [
                `Created "${result.id}" (uuid ${result.uuid})`,
                `${result.type} · active=${result.active} · featured=${result.featured}`
            ];
        });
    });
    document.querySelector("#btnValidate")?.addEventListener("click", () => {
        const form = readForm();
        void run(`query content · ${form.contentId || "?"}`, async (api) => {
            const node = await api.getContentById(form.contentId);
            if (node === null) {
                return [`No app found with Content ID "${form.contentId}".`];
            }
            populateForm(node);
            return [
                `Found "${node.name}" (uuid ${node.uuid})`,
                `${node.type} · active=${node.active}`,
                "Loaded its current values into the form."
            ];
        });
    });
    document.querySelector("#btnUpdate")?.addEventListener("click", () => {
        const form = readForm();
        void run(`mutation updateContent · ${form.contentId || "?"}`, async (api) => {
            const result = await api.updateContent(form.contentId, buildUpdate(form));
            return [`Updated "${result.name}"`, `active=${result.active} · featured=${result.featured}`];
        });
    });
    document.querySelector("#btnDelete")?.addEventListener("click", () => {
        const form = readForm();
        void run(`mutation deleteContent · ${form.contentId || "?"}`, async (api) => {
            const removed = await api.removeContent(form.contentId);
            return removed ? [`Deleted "${form.contentId}".`] : [`The server did not delete "${form.contentId}".`];
        });
    });
    document.querySelector("#btnLoadDirectory")?.addEventListener("click", () => {
        void runUsers("query users + groups", async (api) => {
            // Two paginated reads, in parallel: neither depends on the other, and
            // the pickers need both before either is useful.
            [users, groups] = await Promise.all([api.listUsers(), api.listGroups()]);
            populateDirectoryPickers();
            selectedGroups = [];
            renderMemberships();
            setDirectoryControlsEnabled(true);
            return [
                `Loaded ${users.length} user(s) and ${groups.length} group(s).`,
                "Pick a user to see the groups they belong to."
            ];
        });
    });
    document.querySelector("#f-user")?.addEventListener("change", () => {
        const user = selectedUser();
        if (user === undefined) {
            selectedGroups = [];
            renderMemberships();
            return;
        }
        void runUsers(`query user · ${user.id}`, async (api) => {
            await refreshMemberships(api);
            return [
                `${userLabel(user)}`,
                `Belongs to ${selectedGroups.length} group(s): ${selectedGroups.map((g) => g.id).join(", ") || "none"}`
            ];
        });
    });
    document.querySelector("#btnAddToGroup")?.addEventListener("click", () => {
        const user = selectedUser();
        const groupUuid = document.querySelector("#f-add-group")?.value ?? "";
        if (user === undefined || groupUuid === "") {
            notice("Select a user and a group first.", "error");
            return;
        }
        const group = groups.find((candidate) => candidate.uuid === groupUuid);
        void runUsers(`mutation addUserToGroup · ${group?.id ?? groupUuid}`, async (api) => {
            await api.addUserToGroup(user.uuid, groupUuid);
            await refreshMemberships(api);
            return [
                `Added ${user.id} to "${group?.id ?? groupUuid}".`,
                `Now in ${selectedGroups.length} group(s): ${selectedGroups.map((g) => g.id).join(", ") || "none"}`
            ];
        });
    });
    document.querySelector("#btnSwitchGroup")?.addEventListener("click", () => {
        const user = selectedUser();
        const fromUuid = document.querySelector("#f-from-group")?.value ?? "";
        const toUuid = document.querySelector("#f-to-group")?.value ?? "";
        if (user === undefined || fromUuid === "" || toUuid === "") {
            notice("Select a user, a group to leave, and a group to join.", "error");
            return;
        }
        const from = groups.find((candidate) => candidate.uuid === fromUuid)?.id ?? fromUuid;
        const to = groups.find((candidate) => candidate.uuid === toUuid)?.id ?? toUuid;
        void runUsers(`mutation addUserToGroup + removeUserFromGroup · ${from} → ${to}`, async (api) => {
            const result = await api.switchGroup(user.uuid, fromUuid, toUuid);
            // Re-read before reporting either way: on a half-applied switch the
            // memberships list is the evidence of what actually landed.
            await refreshMemberships(api);
            if (result.partialFailure !== undefined) {
                // Surfaced as a failure, because a half-applied switch is one.
                // The detail says exactly which step landed, so the operator
                // knows to retry the remove rather than the whole switch.
                throw new Error(`Half-applied: ${user.id} was added to "${to}" but NOT removed from "${from}", ` +
                    `so they are now in BOTH groups. Retry the removal. The server said: ${result.partialFailure}`);
            }
            return [
                `Switched ${user.id}: joined "${to}", left "${from}".`,
                "Two mutations, in that order — the API has no atomic move.",
                `Now in ${selectedGroups.length} group(s): ${selectedGroups.map((g) => g.id).join(", ") || "none"}`
            ];
        });
    });
    document.querySelector("#btnClear")?.addEventListener("click", () => {
        if (logEl !== null) {
            logEl.replaceChildren();
            const empty = document.createElement("div");
            empty.className = "log__empty";
            empty.id = "logEmpty";
            empty.textContent = "Requests and their responses appear here.";
            logEl.append(empty);
        }
    });
    // --- first paint --------------------------------------------------------
    const endpoint = document.querySelector("#endpoint");
    if (endpoint !== null) {
        endpoint.textContent = `${BASE_URL === "" ? "{BASE_URL}" : BASE_URL}${_shared_src_content_api__WEBPACK_IMPORTED_MODULE_1__.ENDPOINT_PATH}`;
    }
    applyTypeVisibility();
    setSignedIn(undefined);
    if ((0,_shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__.hasAuthorizationResponse)()) {
        // Back from the authorization server with a code (or an error).
        if (configured()) {
            (0,_shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__.completeSignIn)(BASE_URL, CLIENT_ID)
                .then((token) => {
                setSignedIn(token);
                notice("Signed in. Your token is held in memory for this page only.", "info");
            })
                .catch(failSignIn);
        }
        return;
    }
    // Printed before the configuration check, deliberately: you need this value
    // to register the OAuth app that issues the client id, so it cannot depend
    // on already having one.
    notice(`OAuth redirect URI for OAuth app registration: ${(0,_shared_src_oauth_pkce__WEBPACK_IMPORTED_MODULE_4__.redirectUri)()}`, "info");
    if (configured()) {
        notice('Not signed in. Choose "Sign in" to authorize this page.', "info");
    }
    else {
        notice("OAuth is not configured, to use JWT instead paste an API JWT above", "info");
    }
}
window.addEventListener("DOMContentLoaded", initializeDOM);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFPO0lBQ1IsQ0FBQztJQUVELDRFQUE0RTtJQUM1RSwyRUFBMkU7SUFDM0UseUJBQXlCO0lBQ3pCLE1BQU0sQ0FBQyxrREFBa0QsbUVBQVcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFFbEYsSUFBSSxVQUFVLEVBQUUsRUFBRSxDQUFDO1FBQ2xCLE1BQU0sQ0FBQyx5REFBeUQsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRSxDQUFDO1NBQU0sQ0FBQztRQUNQLE1BQU0sQ0FBQyxvRUFBb0UsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN0RixDQUFDO0FBQ0YsQ0FBQztBQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2hlcmUtc3RhcnRlci1ncmFwaHFsLWFwaS1mb3ItbWFuYWdlbWVudC8uL3NoYXJlZC9zcmMvYXV0aC50cyIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvLi9zaGFyZWQvc3JjL2NvbnRlbnQtYXBpLnRzIiwid2VicGFjazovL2hlcmUtc3RhcnRlci1ncmFwaHFsLWFwaS1mb3ItbWFuYWdlbWVudC8uL3NoYXJlZC9zcmMvZXJyb3JzLnRzIiwid2VicGFjazovL2hlcmUtc3RhcnRlci1ncmFwaHFsLWFwaS1mb3ItbWFuYWdlbWVudC8uL3NoYXJlZC9zcmMvZmRjMy1tYXBwaW5nLnRzIiwid2VicGFjazovL2hlcmUtc3RhcnRlci1ncmFwaHFsLWFwaS1mb3ItbWFuYWdlbWVudC8uL3NoYXJlZC9zcmMvZ3JhcGhxbC50cyIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvLi9zaGFyZWQvc3JjL29hdXRoLXBrY2UudHMiLCJ3ZWJwYWNrOi8vaGVyZS1zdGFydGVyLWdyYXBocWwtYXBpLWZvci1tYW5hZ2VtZW50Ly4vc2hhcmVkL3NyYy91c2VyLWFwaS50cyIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vaGVyZS1zdGFydGVyLWdyYXBocWwtYXBpLWZvci1tYW5hZ2VtZW50L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9oZXJlLXN0YXJ0ZXItZ3JhcGhxbC1hcGktZm9yLW1hbmFnZW1lbnQvLi9jbGllbnQvc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBGZXRjaCBvcHRpb25zIGEgY3JlZGVudGlhbCBwcm92aWRlciBjb250cmlidXRlcyB0byBhIHJlcXVlc3QuICovXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RBdXRoIHtcblx0aGVhZGVycz86IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH07XG5cdGNyZWRlbnRpYWxzPzogUmVxdWVzdENyZWRlbnRpYWxzO1xufVxuXG4vKipcbiAqIFN0cmF0ZWd5IGZvciBhdXRoZW50aWNhdGluZyBDb250ZW50IENvbmZpZ3VyYXRpb24gQVBJIHJlcXVlc3RzLiBTd2FwIHRoZVxuICogaW1wbGVtZW50YXRpb24gd2l0aG91dCB0b3VjaGluZyB0aGUgQ1JVRCBjb2RlLlxuICpcbiAqIGBCZWFyZXJUb2tlbkF1dGhgIGNvdmVycyBib3RoIGFuIE9BdXRoIGFjY2VzcyB0b2tlbiAoYnJvd3NlciBVSSkgYW5kIGFuIG9yZ1xuICogQVBJIEpXVCAoc2NyaXB0cywgQ0kpLiBgQ29va2llSGVhZGVyQXV0aGAgd29ya3MgZnJvbSBOb2RlIG9ubHkg4oCUIGEgYnJvd3NlclxuICogY2Fubm90IHNlbmQgdGhlIHNlc3Npb24gY29va2llIGNyb3NzLW9yaWdpbi5cbiAqXG4gKiBgYXBwbHlgIG1heSBiZSBhc3luYyBzbyBhIHByb3ZpZGVyIGNhbiByZWZyZXNoIGEgY3JlZGVudGlhbCBiZWZvcmUgYSByZXF1ZXN0LlxuICogUHJvdmlkZXJzIHRoYXQganVzdCBzZXQgYSBoZWFkZXIgcmV0dXJuIHN5bmNocm9ub3VzbHkuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlZGVudGlhbFByb3ZpZGVyIHtcblx0LyoqIFByb2R1Y2UgdGhlIGhlYWRlcnMgKGFuZCBjcmVkZW50aWFscyBtb2RlKSBmb3Igb25lIHJlcXVlc3QuICovXG5cdGFwcGx5KCk6IFByb21pc2U8UmVxdWVzdEF1dGg+IHwgUmVxdWVzdEF1dGg7XG59XG5cbi8qKlxuICogU2VuZHMgYSBiZWFyZXIgdG9rZW4gaW4gdGhlIGBBdXRob3JpemF0aW9uYCBoZWFkZXIuXG4gKlxuICogVGhpcyBvbmUgcHJvdmlkZXIgY292ZXJzIGV2ZXJ5IGNyZWRlbnRpYWwgdGhlIEFQSSBhY2NlcHRzOlxuICpcbiAqIC0gQW4gKipPQXV0aCBhY2Nlc3MgdG9rZW4qKiB0aGUgYnJvd3NlciBVSSBvYnRhaW5lZCB2aWEgYXV0aG9yaXphdGlvbiBjb2RlXG4gKiArIFBLQ0UuIEhFUkUgaXNzdWVkIGl0LCBzbyBubyBgYXV0aENvbmZpZ0lkYCBpcyBwYXNzZWQuXG4gKiAtIEFuICoqb3JnIEFQSSBKV1QqKiBpc3N1ZWQgYnkgYW4gYXV0aGVudGljYXRpb24gcHJvdmlkZXIgY29uZmlndXJlZCBmb3JcbiAqIHlvdXIgb3JnYW5pemF0aW9uLCB1c2VkIGJ5IHRoZSBzeW5jIHNjcmlwdC4gV2hlbiBhbiBvcmcgaGFzIG1vcmUgdGhhbiBvbmVcbiAqIHN1Y2ggcHJvdmlkZXIsIGBhdXRoQ29uZmlnSWRgIGlzIHNlbnQgYXMgYHgtb2YtYXV0aC1pZGAgc28gdGhlIGdhdGV3YXlcbiAqIGtub3dzIHdoaWNoIG9uZSB0byB2YWxpZGF0ZSBhZ2FpbnN0LlxuICogLSBUaGF0IHNhbWUgKipvcmcgQVBJIEpXVCBwYXN0ZWQgaW50byB0aGUgYnJvd3NlciBVSSoqIGFzIGEgc3RvcGdhcCBmb3JcbiAqIG9yZ3Mgd2hlcmUgT0F1dGggcHVibGljIGNsaWVudHMgYXJlbid0IGF2YWlsYWJsZSB5ZXQuIEl0IHRyYXZlbHNcbiAqIGlkZW50aWNhbGx5IHRvIHRoZSBPQXV0aCBjYXNlOyBvbmx5IGhvdyB0aGUgcGFnZSBvYnRhaW5lZCBpdCBkaWZmZXJzLlxuICpcbiAqIERvIG5vdCBzZW5kIGBhdXRoQ29uZmlnSWRgIHdpdGggYSBIRVJFLWlzc3VlZCBPQXV0aCB0b2tlbjogdGhhdCBoZWFkZXIgc2VsZWN0c1xuICogYW1vbmcgZXh0ZXJuYWxseSBjb25maWd1cmVkIHByb3ZpZGVycywgYW5kIEhFUkUgdmFsaWRhdGVzIGl0cyBvd24gdG9rZW5zLlxuICovXG5leHBvcnQgY2xhc3MgQmVhcmVyVG9rZW5BdXRoIGltcGxlbWVudHMgQ3JlZGVudGlhbFByb3ZpZGVyIHtcblx0cHJpdmF0ZSByZWFkb25seSB0b2tlbjogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgYXV0aENvbmZpZ0lkPzogc3RyaW5nO1xuXG5cdC8qKiBXcmFwIGEgYmVhcmVyIHRva2VuLCBvcHRpb25hbGx5IHRpZWQgdG8gYW4gZXh0ZXJuYWwgYXV0aCBwcm92aWRlci4gKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKHRva2VuOiBzdHJpbmcsIGF1dGhDb25maWdJZD86IHN0cmluZykge1xuXHRcdHRoaXMudG9rZW4gPSB0b2tlbjtcblx0XHR0aGlzLmF1dGhDb25maWdJZCA9IGF1dGhDb25maWdJZDtcblx0fVxuXG5cdC8qKiBSZXR1cm4gdGhlIEF1dGhvcml6YXRpb24gaGVhZGVyLCBwbHVzIHgtb2YtYXV0aC1pZCB3aGVuIGNvbmZpZ3VyZWQuICovXG5cdHB1YmxpYyBhcHBseSgpOiBSZXF1ZXN0QXV0aCB7XG5cdFx0Y29uc3QgaGVhZGVyczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHsgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke3RoaXMudG9rZW59YCB9O1xuXHRcdGlmICh0aGlzLmF1dGhDb25maWdJZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRoZWFkZXJzW1wieC1vZi1hdXRoLWlkXCJdID0gdGhpcy5hdXRoQ29uZmlnSWQ7XG5cdFx0fVxuXHRcdHJldHVybiB7IGhlYWRlcnMgfTtcblx0fVxufVxuXG4vKipcbiAqIFNlbmRzIHRoZSBoZXJlLXNlc3Npb24gY29va2llIGV4cGxpY2l0bHkuIEZvciBOb2RlIHNjcmlwdHMgYW5kIENJIG9ubHkg4oCUIGFcbiAqIGJyb3dzZXIgY2Fubm90IHNldCB0aGUgQ29va2llIGhlYWRlciwgYW5kIGNhbm5vdCBzZW5kIHRoZSBhbWJpZW50IGNvb2tpZVxuICogY3Jvc3Mtb3JpZ2luLCBzbyB1c2UgYEJlYXJlclRva2VuQXV0aGAgdGhlcmUgaW5zdGVhZC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvb2tpZUhlYWRlckF1dGggaW1wbGVtZW50cyBDcmVkZW50aWFsUHJvdmlkZXIge1xuXHRwcml2YXRlIHJlYWRvbmx5IGNvb2tpZVZhbHVlOiBzdHJpbmc7XG5cblx0LyoqIFdyYXAgYSBoZXJlLXNlc3Npb24gY29va2llIHZhbHVlLiAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3IoY29va2llVmFsdWU6IHN0cmluZykge1xuXHRcdHRoaXMuY29va2llVmFsdWUgPSBjb29raWVWYWx1ZTtcblx0fVxuXG5cdC8qKiBSZXR1cm4gdGhlIENvb2tpZSBoZWFkZXIgY2FycnlpbmcgdGhlIHNlc3Npb24gdmFsdWUuICovXG5cdHB1YmxpYyBhcHBseSgpOiBSZXF1ZXN0QXV0aCB7XG5cdFx0cmV0dXJuIHsgaGVhZGVyczogeyBDb29raWU6IGBoZXJlLXNlc3Npb249JHt0aGlzLmNvb2tpZVZhbHVlfWAgfSB9O1xuXHR9XG59XG4iLCJpbXBvcnQgeyBDb250ZW50QXBpRXJyb3IgfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7IEdyYXBoUWxUcmFuc3BvcnQgfSBmcm9tIFwiLi9ncmFwaHFsXCI7XG5pbXBvcnQgdHlwZSB7IEdyYXBoUWxUcmFuc3BvcnRPcHRpb25zIH0gZnJvbSBcIi4vZ3JhcGhxbFwiO1xuaW1wb3J0IHR5cGUgeyBCdWxrVXBkYXRlRW50cnksIENvbnRlbnRJbnB1dCwgQ29udGVudE5vZGUsIENvbnRlbnRVcGRhdGUsIFdyaXRlUmVzdWx0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqIENvbnN0cnVjdGlvbiBvcHRpb25zIGZvciB0aGUgY2xpZW50LiAqL1xuZXhwb3J0IHR5cGUgQ29udGVudEFwaU9wdGlvbnMgPSBHcmFwaFFsVHJhbnNwb3J0T3B0aW9ucztcblxuLyoqIFNoYXBlIG9mIG9uZSBwYWdlIG9mIHRoZSBgY29udGVudHNgIHF1ZXJ5LiAqL1xuaW50ZXJmYWNlIENvbnRlbnRzUXVlcnlEYXRhIHtcblx0Y29udGVudHM6IHtcblx0XHRlZGdlczogeyBub2RlOiBDb250ZW50Tm9kZSB9W107XG5cdFx0cGFnZUluZm86IHsgaGFzTmV4dFBhZ2U6IGJvb2xlYW47IGVuZEN1cnNvcjogc3RyaW5nIHwgbnVsbCB9O1xuXHR9O1xufVxuXG4vLyBSZS1leHBvcnRlZCBzbyBjYWxsZXJzIHRoYXQgb25seSBkZWFsIHdpdGggY29udGVudCBrZWVwIG9uZSBpbXBvcnQuIFRoZVxuLy8gZW5kcG9pbnQgaXMgc2hhcmVkIGJ5IGV2ZXJ5IGNsaWVudCBpbiB0aGlzIHNhbXBsZSwgc28gaXQgaXMgZGVmaW5lZCBvbmNlIGluXG4vLyBgZ3JhcGhxbC50c2AuXG5leHBvcnQgeyBFTkRQT0lOVF9QQVRIIH0gZnJvbSBcIi4vZ3JhcGhxbFwiO1xuXG4vKipcbiAqIFNlbGVjdHMgdGhlIGZpZWxkcyBgZmRjM1RvQ29udGVudElucHV0YCBjYW4gd3JpdGUsIHNvIGEgbm9kZSByb3VuZC10cmlwc1xuICogdGhyb3VnaCBgY29udGVudE5vZGVUb0ZkYzNBcHBsaWNhdGlvbmAgd2l0aG91dCBzaWxlbnRseSBkcm9wcGluZyBzZXR0aW5ncy5cbiAqXG4gKiBUd28gZmllbGRzIGFyZSBkZWxpYmVyYXRlbHkgbm90IHJlYWQgYmFjazpcbiAqXG4gKiAtIGBhY2Nlc3NgIGNvbWVzIGJhY2sgYXMgb3JnLXNwZWNpZmljIHN1YmplY3QvcGVybWlzc2lvbiBVVUlEcyB1bmxpa2VseSB0b1xuICogbWVhbiBhbnl0aGluZyBpbiBhIGRpZmZlcmVudCBvcmcsIHNvIHRoZSByZXZlcnNlIG1hcHBlciBsZWF2ZXMgaXQgb3V0IGV2ZW5cbiAqIHRob3VnaCBpdCAqaXMqIGZldGNoZWQgaGVyZS5cbiAqIC0gYGludGVyb3BgIGlzICoqd3JpdGUtb25seSoqIGluIHRoZSBkZXBsb3llZCBzY2hlbWE6IGBDcmVhdGVDb250ZW50SW5wdXRgXG4gKiBhbmQgYFVwZGF0ZUNvbnRlbnRJbnB1dGAgYm90aCBhY2NlcHQgaXQsIGJ1dCBgV2ViQ29udGVudGAgYW5kXG4gKiBgRGVza3RvcENvbnRlbnRgIGRvIG5vdCBleHBvc2UgaXQsIHNvIHNlbGVjdGluZyBpdCBmYWlscyB0aGUgd2hvbGUgcXVlcnlcbiAqIHdpdGggYENhbm5vdCBxdWVyeSBmaWVsZCBcImludGVyb3BcIiBvbiB0eXBlIFwiV2ViQ29udGVudFwiYC4gV3JpdGVzIHN0aWxsIHNlbmRcbiAqIGl0IChzZWUgYGZkYzNUb0NvbnRlbnRJbnB1dGApOyBpdCBzaW1wbHkgY2Fubm90IGJlIHJlYWQgYmFjaywgd2hpY2ggbWVhbnMgYW5cbiAqIGV4cG9ydCDihpIgc3luYyByb3VuZC10cmlwIGRvZXMgbm90IHByZXNlcnZlIGludGVyb3AgZGVjbGFyYXRpb25zLiBJZiBhIGxhdGVyXG4gKiBzY2hlbWEgdmVyc2lvbiBhZGRzIHRoZSBmaWVsZCwgYWRkIGl0IGJhY2sgdG8gYm90aCBmcmFnbWVudHMgaGVyZSBhbmQgdGhlXG4gKiByZXZlcnNlIG1hcHBlciBwaWNrcyBpdCB1cCB3aXRoIG5vIG90aGVyIGNoYW5nZS5cbiAqL1xuY29uc3QgTk9ERV9GSUVMRFMgPVxuXHRcInV1aWQgaWQgbmFtZSB0eXBlIGFjdGl2ZSBmZWF0dXJlZCBpY29uIGNyZWF0ZWRBdCBjdXN0b21MYWJlbCBcIiArXG5cdFwiYWNjZXNzIHsgc3ViamVjdHMgcHJpbWl0aXZlcyB9IFwiICtcblx0XCIuLi4gb24gV2ViQ29udGVudCB7IFwiICtcblx0XCJ1cmwgdXJscyBoZXJlQXBpQWNjZXNzIGFsbG93RHVwbGljYXRpb24gYWxsb3dPcGVuV2l0aERlZmF1bHRCcm93c2VyIHVzZUFJQ29udGV4dCBlbmFibGVTaW1wbGVXaW5kb3cgXCIgK1xuXHRcImVudmlyb25tZW50QXZhaWxhYmlsaXR5IHsgZW5hYmxlSGVyZUVCIGVuYWJsZUhlcmVaZXJvIGVuYWJsZUhlcmVNb2JpbGUgfSBcIiArXG5cdFwidmlld1NldHRpbmdzIHsgbmF2aWdhdGlvbkNvbnRyb2xzIHJlbG9hZENvbnRyb2wgfSBcIiArXG5cdFwiZGF0YUxvc3NQcmV2ZW50aW9uU2V0dGluZ3MgeyBjb3B5QmVoYXZpb3IgcGFzdGVCZWhhdmlvciBzY3JlZW5DYXB0dXJlQmVoYXZpb3IgcHJpbnRCZWhhdmlvciB9IFwiICtcblx0XCJ9IFwiICtcblx0XCIuLi4gb24gRGVza3RvcENvbnRlbnQgeyBkZXNrdG9wUGF0aCBkZXNrdG9wQXJncyB3aXRoU25hcCB9XCI7XG5cbi8qKiBGaWVsZHMgc2VsZWN0ZWQgYmFjayBmcm9tIGNyZWF0ZS91cGRhdGUgbXV0YXRpb25zLiAqL1xuY29uc3QgV1JJVEVfRklFTERTID0gXCJ1dWlkIGlkIG5hbWUgdHlwZSBhY3RpdmUgZmVhdHVyZWRcIjtcblxuLyoqXG4gKiBTaGFwZSBhIGZ1bGwgY3JlYXRlIGJvZHkgaW50byBhIHBhcnRpYWwgdXBkYXRlIGJvZHkuXG4gKlxuICogYGNvbnRlbnRUeXBlYCBhbmQgYGNvbnRlbnRJZGAgaWRlbnRpZnkgYW4gYXBwIGFuZCBjYW5ub3QgYmUgY2hhbmdlZCwgc28gdGhleVxuICogYXJlIGFsd2F5cyBkcm9wcGVkLiBgYWNjZXNzYCBpcyBkcm9wcGVkIHVubGVzcyBga2VlcEFjY2Vzc2AgaXMgc2V0OiBjYWxsZXJzXG4gKiB0aGF0IGJ1aWxkIGFuIGlucHV0IGZyb20gYSBtYW5pZmVzdCBvciBhIGZvcm0gZ2V0IHRoZSBtYXBwZXIncyBkZWZhdWx0IG9mXG4gKiBgeyBzdWJqZWN0czogW10sIHByaW1pdGl2ZXM6IFtdIH1gLCBhbmQgc2VuZGluZyB0aGF0IHdvdWxkIHN0cmlwIGV2ZXJ5XG4gKiBleGlzdGluZyBhc3NpZ25tZW50IHJhdGhlciB0aGFuIGxlYXZlIGl0IGFsb25lLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdG9Db250ZW50VXBkYXRlKGlucHV0OiBDb250ZW50SW5wdXQsIG9wdGlvbnM/OiB7IGtlZXBBY2Nlc3M/OiBib29sZWFuIH0pOiBDb250ZW50VXBkYXRlIHtcblx0Y29uc3QgeyBjb250ZW50VHlwZSwgY29udGVudElkLCBhY2Nlc3MsIC4uLnJlc3QgfSA9IGlucHV0O1xuXHR2b2lkIGNvbnRlbnRUeXBlO1xuXHR2b2lkIGNvbnRlbnRJZDtcblx0cmV0dXJuIG9wdGlvbnM/LmtlZXBBY2Nlc3MgPT09IHRydWUgPyB7IC4uLnJlc3QsIGFjY2VzcyB9IDogcmVzdDtcbn1cblxuLyoqXG4gKiBUaGUgQVBJIHJlamVjdHMgYW4gdXBkYXRlIHdpdGggbm8gZmllbGRzLCBzbyBmYWlsIGVhcmx5IHdpdGggYSBjbGVhcmVyIG1lc3NhZ2UuXG4gKiBAdGhyb3dzIHtDb250ZW50QXBpRXJyb3J9IGlmIGBpbnB1dGAgaGFzIG5vIGZpZWxkcyBzZXQuXG4gKi9cbmZ1bmN0aW9uIGFzc2VydE5vbkVtcHR5VXBkYXRlKGlucHV0OiBDb250ZW50VXBkYXRlLCBpZGVudGlmaWVyOiBzdHJpbmcpOiB2b2lkIHtcblx0aWYgKE9iamVjdC5rZXlzKGlucHV0KS5sZW5ndGggPT09IDApIHtcblx0XHR0aHJvdyBuZXcgQ29udGVudEFwaUVycm9yKDAsIGBVcGRhdGUgZm9yIFwiJHtpZGVudGlmaWVyfVwiIGlzIGVtcHR5IOKAlCBpbmNsdWRlIGF0IGxlYXN0IG9uZSBmaWVsZC5gKTtcblx0fVxufVxuXG4vKiogQ2xpZW50IGZvciB0aGUgSEVSRSBDb250ZW50IENvbmZpZ3VyYXRpb24gQVBJIChHcmFwaFFMIHF1ZXJpZXMgYW5kIG11dGF0aW9ucykuICovXG5leHBvcnQgY2xhc3MgQ29udGVudEFwaUNsaWVudCB7XG5cdHByaXZhdGUgcmVhZG9ubHkgdHJhbnNwb3J0OiBHcmFwaFFsVHJhbnNwb3J0O1xuXG5cdC8qKiBCdWlsZCBhIGNsaWVudCBmb3Igb25lIG9yZywgdXNpbmcgdGhlIGdpdmVuIGNyZWRlbnRpYWwgcHJvdmlkZXIuICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihvcHRpb25zOiBDb250ZW50QXBpT3B0aW9ucykge1xuXHRcdHRoaXMudHJhbnNwb3J0ID0gbmV3IEdyYXBoUWxUcmFuc3BvcnQob3B0aW9ucyk7XG5cdH1cblxuXHQvKiogTGlzdCBldmVyeSBhcHAgaW4gdGhlIGRpcmVjdG9yeSwgZm9sbG93aW5nIEdyYXBoUUwgcGFnaW5hdGlvbi4gKi9cblx0cHVibGljIGFzeW5jIGxpc3RDb250ZW50cyhwYWdlU2l6ZSA9IDUwKTogUHJvbWlzZTxDb250ZW50Tm9kZVtdPiB7XG5cdFx0Y29uc3Qgbm9kZXM6IENvbnRlbnROb2RlW10gPSBbXTtcblx0XHRsZXQgYWZ0ZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXHRcdGxldCBoYXNOZXh0ID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChoYXNOZXh0KSB7XG5cdFx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcdFwicXVlcnkoJGZpcnN0OiBJbnQhLCAkYWZ0ZXI6IFN0cmluZykgeyBjb250ZW50cyhmaXJzdDogJGZpcnN0LCBhZnRlcjogJGFmdGVyKSBcIiArXG5cdFx0XHRcdGB7IGVkZ2VzIHsgbm9kZSB7ICR7Tk9ERV9GSUVMRFN9IH0gfSBwYWdlSW5mbyB7IGhhc05leHRQYWdlIGVuZEN1cnNvciB9IH0gfWA7XG5cdFx0XHRjb25zdCBkYXRhOiBDb250ZW50c1F1ZXJ5RGF0YSA9IGF3YWl0IHRoaXMudHJhbnNwb3J0LnJlcXVlc3Q8Q29udGVudHNRdWVyeURhdGE+KHF1ZXJ5LCB7XG5cdFx0XHRcdGZpcnN0OiBwYWdlU2l6ZSxcblx0XHRcdFx0YWZ0ZXJcblx0XHRcdH0pO1xuXG5cdFx0XHRmb3IgKGNvbnN0IGVkZ2Ugb2YgZGF0YS5jb250ZW50cy5lZGdlcykge1xuXHRcdFx0XHRub2Rlcy5wdXNoKGVkZ2Uubm9kZSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNOZXh0ID0gZGF0YS5jb250ZW50cy5wYWdlSW5mby5oYXNOZXh0UGFnZTtcblx0XHRcdGFmdGVyID0gZGF0YS5jb250ZW50cy5wYWdlSW5mby5lbmRDdXJzb3I7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG5vZGVzO1xuXHR9XG5cblx0LyoqIExvb2sgdXAgYSBzaW5nbGUgYXBwIGJ5IGl0cyBodW1hbi1yZWFkYWJsZSBjb250ZW50IElELiBOdWxsIGlmIGl0IGRvZXMgbm90IGV4aXN0LiAqL1xuXHRwdWJsaWMgYXN5bmMgZ2V0Q29udGVudEJ5SWQoY29udGVudElkOiBzdHJpbmcpOiBQcm9taXNlPENvbnRlbnROb2RlIHwgbnVsbD4ge1xuXHRcdGNvbnN0IHF1ZXJ5ID0gYHF1ZXJ5KCRpZDogSUQhKSB7IGNvbnRlbnQoaWQ6ICRpZCkgeyAke05PREVfRklFTERTfSB9IH1gO1xuXHRcdHJldHVybiB0aGlzLmxvb2t1cChxdWVyeSwgeyBpZDogY29udGVudElkIH0pO1xuXHR9XG5cblx0LyoqIExvb2sgdXAgYSBzaW5nbGUgYXBwIGJ5IGl0cyBzeXN0ZW0gVVVJRC4gTnVsbCBpZiBpdCBkb2VzIG5vdCBleGlzdC4gKi9cblx0cHVibGljIGFzeW5jIGdldENvbnRlbnRCeVV1aWQodXVpZDogc3RyaW5nKTogUHJvbWlzZTxDb250ZW50Tm9kZSB8IG51bGw+IHtcblx0XHRjb25zdCBxdWVyeSA9IGBxdWVyeSgkdXVpZDogSUQhKSB7IGNvbnRlbnQodXVpZDogJHV1aWQpIHsgJHtOT0RFX0ZJRUxEU30gfSB9YDtcblx0XHRyZXR1cm4gdGhpcy5sb29rdXAocXVlcnksIHsgdXVpZCB9KTtcblx0fVxuXG5cdC8qKiBDcmVhdGUgYSBuZXcgYXBwbGljYXRpb24gZGVmaW5pdGlvbi4gKi9cblx0cHVibGljIGFzeW5jIGNyZWF0ZUNvbnRlbnQoaW5wdXQ6IENvbnRlbnRJbnB1dCk6IFByb21pc2U8V3JpdGVSZXN1bHQ+IHtcblx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcIm11dGF0aW9uIENyZWF0ZUNvbnRlbnQoJGlucHV0OiBDcmVhdGVDb250ZW50SW5wdXQhKSBcIiArXG5cdFx0XHRgeyBjcmVhdGVDb250ZW50KGlucHV0OiAkaW5wdXQpIHsgJHtXUklURV9GSUVMRFN9IH0gfWA7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudHJhbnNwb3J0LnJlcXVlc3Q8eyBjcmVhdGVDb250ZW50OiBXcml0ZVJlc3VsdCB9PihxdWVyeSwgeyBpbnB1dCB9KTtcblx0XHRyZXR1cm4gZGF0YS5jcmVhdGVDb250ZW50O1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBhbiBleGlzdGluZyBhcHBsaWNhdGlvbiBkZWZpbml0aW9uLlxuXHQgKlxuXHQgKiBgaWRlbnRpZmllcmAgaXMgdGhlIGFwcCdzIGNvbnRlbnRJZCBvciBpdHMgdXVpZCDigJQgZWl0aGVyIHdvcmtzLiBVcGRhdGVzIGFyZVxuXHQgKiBwYXJ0aWFsOiBzZW5kIG9ubHkgdGhlIGZpZWxkcyB5b3Ugd2FudCB0byBjaGFuZ2UuIFRoZSBBUEkgcmVqZWN0cyBhbiBlbXB0eVxuXHQgKiB1cGRhdGUsIHNvIGBpbnB1dGAgbXVzdCBjYXJyeSBhdCBsZWFzdCBvbmUgZmllbGQuXG5cdCAqL1xuXHRwdWJsaWMgYXN5bmMgdXBkYXRlQ29udGVudChpZGVudGlmaWVyOiBzdHJpbmcsIGlucHV0OiBDb250ZW50VXBkYXRlKTogUHJvbWlzZTxXcml0ZVJlc3VsdD4ge1xuXHRcdGFzc2VydE5vbkVtcHR5VXBkYXRlKGlucHV0LCBpZGVudGlmaWVyKTtcblx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcIm11dGF0aW9uIFVwZGF0ZUNvbnRlbnQoJGlkZW50aWZpZXI6IElEISwgJGlucHV0OiBVcGRhdGVDb250ZW50SW5wdXQhKSBcIiArXG5cdFx0XHRgeyB1cGRhdGVDb250ZW50KGlkZW50aWZpZXI6ICRpZGVudGlmaWVyLCBpbnB1dDogJGlucHV0KSB7ICR7V1JJVEVfRklFTERTfSB9IH1gO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnRyYW5zcG9ydC5yZXF1ZXN0PHsgdXBkYXRlQ29udGVudDogV3JpdGVSZXN1bHQgfT4ocXVlcnksIHsgaWRlbnRpZmllciwgaW5wdXQgfSk7XG5cdFx0cmV0dXJuIGRhdGEudXBkYXRlQ29udGVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBQZXJtYW5lbnRseSBkZWxldGUgYW4gYXBwbGljYXRpb24gZGVmaW5pdGlvbiBieSBjb250ZW50SWQgb3IgdXVpZC5cblx0ICogQWNjZXNzIHBlcm1pc3Npb25zIGFuZCBkb2NrIGVudHJpZXMgcmVmZXJlbmNpbmcgaXQgYXJlIGNsZWFuZWQgdXAgdG9vLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHJlbW92ZUNvbnRlbnQoaWRlbnRpZmllcjogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0Y29uc3QgcXVlcnkgPSBcIm11dGF0aW9uIERlbGV0ZUNvbnRlbnQoJGlkZW50aWZpZXI6IElEISkgeyBkZWxldGVDb250ZW50KGlkZW50aWZpZXI6ICRpZGVudGlmaWVyKSB9XCI7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudHJhbnNwb3J0LnJlcXVlc3Q8eyBkZWxldGVDb250ZW50OiBib29sZWFuIH0+KHF1ZXJ5LCB7IGlkZW50aWZpZXIgfSk7XG5cdFx0cmV0dXJuIGRhdGEuZGVsZXRlQ29udGVudDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgbWFueSBhcHBzIGluIG9uZSByZXF1ZXN0LlxuXHQgKlxuXHQgKiBCdWxrIG9wZXJhdGlvbnMgYXJlIGFsbC1vci1ub3RoaW5nOiBpZiBhbnkgaXRlbSBmYWlscyB2YWxpZGF0aW9uLCBub3RoaW5nXG5cdCAqIGluIHRoZSBiYXRjaCBpcyBzYXZlZC5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBjcmVhdGVDb250ZW50cyhpbnB1dHM6IENvbnRlbnRJbnB1dFtdKTogUHJvbWlzZTxXcml0ZVJlc3VsdFtdPiB7XG5cdFx0Y29uc3QgcXVlcnkgPVxuXHRcdFx0XCJtdXRhdGlvbiBCdWxrQ3JlYXRlKCRpbnB1dHM6IFtDcmVhdGVDb250ZW50SW5wdXQhXSEpIFwiICtcblx0XHRcdGB7IGNyZWF0ZUNvbnRlbnRzKGlucHV0czogJGlucHV0cykgeyBjcmVhdGVkIHsgJHtXUklURV9GSUVMRFN9IH0gfSB9YDtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy50cmFuc3BvcnQucmVxdWVzdDx7IGNyZWF0ZUNvbnRlbnRzOiB7IGNyZWF0ZWQ6IFdyaXRlUmVzdWx0W10gfSB9PihxdWVyeSwge1xuXHRcdFx0aW5wdXRzXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGRhdGEuY3JlYXRlQ29udGVudHMuY3JlYXRlZDtcblx0fVxuXG5cdC8qKiBVcGRhdGUgbWFueSBhcHBzIGluIG9uZSBhbGwtb3Itbm90aGluZyByZXF1ZXN0LiAqL1xuXHRwdWJsaWMgYXN5bmMgdXBkYXRlQ29udGVudHMoaW5wdXRzOiBCdWxrVXBkYXRlRW50cnlbXSk6IFByb21pc2U8V3JpdGVSZXN1bHRbXT4ge1xuXHRcdGZvciAoY29uc3QgZW50cnkgb2YgaW5wdXRzKSB7XG5cdFx0XHRhc3NlcnROb25FbXB0eVVwZGF0ZShlbnRyeS51cGRhdGUsIGVudHJ5LmlkZW50aWZpZXIpO1xuXHRcdH1cblx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcIm11dGF0aW9uIEJ1bGtVcGRhdGUoJGlucHV0czogW0J1bGtVcGRhdGVDb250ZW50SW5wdXQhXSEpIFwiICtcblx0XHRcdGB7IHVwZGF0ZUNvbnRlbnRzKGlucHV0czogJGlucHV0cykgeyB1cGRhdGVkIHsgJHtXUklURV9GSUVMRFN9IH0gfSB9YDtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy50cmFuc3BvcnQucmVxdWVzdDx7IHVwZGF0ZUNvbnRlbnRzOiB7IHVwZGF0ZWQ6IFdyaXRlUmVzdWx0W10gfSB9PihxdWVyeSwge1xuXHRcdFx0aW5wdXRzXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGRhdGEudXBkYXRlQ29udGVudHMudXBkYXRlZDtcblx0fVxuXG5cdC8qKiBEZWxldGUgbWFueSBhcHBzIGluIG9uZSBhbGwtb3Itbm90aGluZyByZXF1ZXN0LiBSZXR1cm5zIHRoZSBkZWxldGVkIFVVSURzLiAqL1xuXHRwdWJsaWMgYXN5bmMgZGVsZXRlQ29udGVudHMoaWRlbnRpZmllcnM6IHN0cmluZ1tdKTogUHJvbWlzZTxzdHJpbmdbXT4ge1xuXHRcdGNvbnN0IHF1ZXJ5ID1cblx0XHRcdFwibXV0YXRpb24gQnVsa0RlbGV0ZSgkaWRlbnRpZmllcnM6IFtJRCFdISkgXCIgK1xuXHRcdFx0XCJ7IGRlbGV0ZUNvbnRlbnRzKGlkZW50aWZpZXJzOiAkaWRlbnRpZmllcnMpIHsgZGVsZXRlZCB9IH1cIjtcblx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy50cmFuc3BvcnQucmVxdWVzdDx7IGRlbGV0ZUNvbnRlbnRzOiB7IGRlbGV0ZWQ6IHN0cmluZ1tdIH0gfT4ocXVlcnksIHtcblx0XHRcdGlkZW50aWZpZXJzXG5cdFx0fSk7XG5cdFx0cmV0dXJuIGRhdGEuZGVsZXRlQ29udGVudHMuZGVsZXRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSdW4gYSBzaW5nbGUtYXBwIGxvb2t1cC5cblx0ICpcblx0ICogQSBtaXNzaW5nIGFwcCBjb21lcyBiYWNrIGFzIGEgTk9UX0ZPVU5EIGVycm9yIHJhdGhlciB0aGFuIGBjb250ZW50OiBudWxsYCxcblx0ICogc28gdHJhbnNsYXRlIHRoYXQgb25lIGNhc2Ug4oCUIFwiZG9lcyB0aGlzIGFwcCBleGlzdD9cIiBkZXNlcnZlcyBhbiBhbnN3ZXIsXG5cdCAqIG5vdCBhbiBleGNlcHRpb24uIEV2ZXJ5IG90aGVyIGZhaWx1cmUgc3RpbGwgdGhyb3dzLlxuXHQgKi9cblx0cHJpdmF0ZSBhc3luYyBsb29rdXAocXVlcnk6IHN0cmluZywgdmFyaWFibGVzOiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSk6IFByb21pc2U8Q29udGVudE5vZGUgfCBudWxsPiB7XG5cdFx0dHJ5IHtcblx0XHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnRyYW5zcG9ydC5yZXF1ZXN0PHsgY29udGVudDogQ29udGVudE5vZGUgfCBudWxsIH0+KHF1ZXJ5LCB2YXJpYWJsZXMpO1xuXHRcdFx0cmV0dXJuIGRhdGEuY29udGVudDtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdGlmIChlcnIgaW5zdGFuY2VvZiBDb250ZW50QXBpRXJyb3IgJiYgZXJyLmNvZGUgPT09IFwiTk9UX0ZPVU5EXCIpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXHR9XG59XG4iLCIvKipcbiAqIEFuIGVycm9yIGZyb20gdGhlIENvbnRlbnQgQ29uZmlndXJhdGlvbiBBUEkuXG4gKlxuICogRmFpbHVyZXMgYXJyaXZlIGZyb20gdHdvIGRpZmZlcmVudCBsYXllcnMsIHNvIGJvdGggYXJlIHJlcHJlc2VudGVkIGhlcmU6XG4gKiB0aGUgZ2F0ZXdheSByZWplY3RzIHVuYXV0aGVudGljYXRlZCByZXF1ZXN0cyB3aXRoIGFuIEhUVFAgc3RhdHVzIGJlZm9yZVxuICogR3JhcGhRTCBldmVyIHJ1bnMsIHdoaWxlIEdyYXBoUUwgaXRzZWxmIGFuc3dlcnMgMjAwIHdpdGggYW4gYGVycm9yc2AgYXJyYXkuXG4gKiBgc3RhdHVzYCBpcyAwIGZvciB0aGUgR3JhcGhRTCBsYXllciwgd2hlcmUgbm8gbWVhbmluZ2Z1bCBIVFRQIHN0YXR1cyBleGlzdHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZW50QXBpRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdHB1YmxpYyByZWFkb25seSBzdGF0dXM6IG51bWJlcjtcblxuXHRwdWJsaWMgcmVhZG9ubHkgY29kZT86IHN0cmluZztcblxuXHQvKiogV3JhcCBhIGZhaWx1cmUgd2l0aCBpdHMgSFRUUCBzdGF0dXMgKDAgZm9yIGEgR3JhcGhRTC1sYXllciBlcnJvcikgYW5kIGNvZGUuICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihzdGF0dXM6IG51bWJlciwgbWVzc2FnZTogc3RyaW5nLCBjb2RlPzogc3RyaW5nKSB7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5uYW1lID0gXCJDb250ZW50QXBpRXJyb3JcIjtcblx0XHR0aGlzLnN0YXR1cyA9IHN0YXR1cztcblx0XHR0aGlzLmNvZGUgPSBjb2RlO1xuXHR9XG59XG5cbi8qKiBKb2luIHRoZSBzZXJ2ZXIncyBvd24gd29yZGluZyB3aXRoIG91ciBoaW50IGFzIG9uZSByZWFkYWJsZSBzZW50ZW5jZSBwYWlyLiAqL1xuZnVuY3Rpb24gam9pbihkZXRhaWw6IHN0cmluZywgaGludDogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgdHJpbW1lZCA9IGRldGFpbC50cmltKCk7XG5cdGlmICh0cmltbWVkID09PSBcIlwiKSB7XG5cdFx0cmV0dXJuIGhpbnQ7XG5cdH1cblx0cmV0dXJuIC9bLiE/XSQvdS50ZXN0KHRyaW1tZWQpID8gYCR7dHJpbW1lZH0gJHtoaW50fWAgOiBgJHt0cmltbWVkfS4gJHtoaW50fWA7XG59XG5cbi8qKiBNYXAgYSBHcmFwaFFMIGBlcnJvcnNbMF0uZXh0ZW5zaW9ucy5jb2RlYCB0byBhbiBhY3Rpb25hYmxlIG1lc3NhZ2UuICovXG5leHBvcnQgZnVuY3Rpb24gY29kZVRvTWVzc2FnZShjb2RlOiBzdHJpbmcsIGRldGFpbDogc3RyaW5nKTogc3RyaW5nIHtcblx0c3dpdGNoIChjb2RlKSB7XG5cdFx0Y2FzZSBcIkJBRF9VU0VSX0lOUFVUXCI6XG5cdFx0XHRyZXR1cm4gam9pbihkZXRhaWwsIFwiQ2hlY2sgdGhlIHJlcXVpcmVkIGZpZWxkcyBmb3IgdGhpcyBjb250ZW50IHR5cGUuXCIpO1xuXHRcdGNhc2UgXCJVTkFVVEhFTlRJQ0FURURcIjpcblx0XHRcdHJldHVybiBqb2luKGRldGFpbCwgXCJZb3VyIHNlc3Npb24gaGFzIGV4cGlyZWQgb3IgdGhlIGNyZWRlbnRpYWwgaXMgbWlzc2luZy5cIik7XG5cdFx0Y2FzZSBcIkZPUkJJRERFTlwiOlxuXHRcdFx0cmV0dXJuIGpvaW4oZGV0YWlsLCBcIllvdXIgYWNjb3VudCBsYWNrcyBjb250ZW50IGFkbWluIGFjY2VzcyBpbiB0aGlzIG9yZy5cIik7XG5cdFx0Y2FzZSBcIk5PVF9GT1VORFwiOlxuXHRcdFx0cmV0dXJuIGpvaW4oZGV0YWlsLCBcIk5vIGFwcCwgdXNlciwgb3IgZ3JvdXAgbWF0Y2hlcyB0aGF0IGlkZW50aWZpZXIuXCIpO1xuXHRcdGNhc2UgXCJDT05GTElDVFwiOlxuXHRcdFx0cmV0dXJuIGpvaW4oZGV0YWlsLCBcIkFuIGFwcCB3aXRoIHRoYXQgY29udGVudElkIGFscmVhZHkgZXhpc3RzIGluIHlvdXIgb3JnLlwiKTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGRldGFpbDtcblx0fVxufVxuXG4vKiogTWFwIGEgdHJhbnNwb3J0LWxldmVsIEhUVFAgc3RhdHVzIHRvIGFuIGFjdGlvbmFibGUgbWVzc2FnZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGF0dXNUb01lc3NhZ2Uoc3RhdHVzOiBudW1iZXIpOiBzdHJpbmcge1xuXHRzd2l0Y2ggKHN0YXR1cykge1xuXHRcdGNhc2UgNDAwOlxuXHRcdFx0cmV0dXJuIFwiNDAwIEJhZCBSZXF1ZXN0OiB0aGUgcmVxdWVzdCB3YXMgcmVqZWN0ZWQgYmVmb3JlIHJlYWNoaW5nIHRoZSBBUEkuIFlvdXIgdG9rZW4sIG9yIGl0cyB4LW9mLWF1dGgtaWQsIG1heSBub3QgbWF0Y2ggYSBjb25maWd1cmVkIGF1dGggcHJvdmlkZXIgZm9yIHRoaXMgb3JnLlwiO1xuXHRcdGNhc2UgNDAxOlxuXHRcdFx0cmV0dXJuIFwiNDAxIFVuYXV0aG9yaXplZDogdGhlIHJlcXVlc3QgaXMgbm90IGF1dGhlbnRpY2F0ZWQuIFNpZ24gaW4gYWdhaW4gaW4gdGhlIFVJLCBvciBzdXBwbHkgYSB2YWxpZCBBUEkgSldUIChvciBhIGhlcmUtc2Vzc2lvbiBjb29raWUpIHdoZW4gcnVubmluZyB0aGUgc2NyaXB0LlwiO1xuXHRcdGNhc2UgNDAzOlxuXHRcdFx0cmV0dXJuIFwiNDAzIEZvcmJpZGRlbjogeW91ciBhY2NvdW50IGxhY2tzIGFkbWluIHdyaXRlIGFjY2VzcyB0byBtYW5hZ2UgY29udGVudCBpbiB0aGlzIG9yZy5cIjtcblx0XHRjYXNlIDQwNDpcblx0XHRcdHJldHVybiBcIjQwNCBOb3QgRm91bmQ6IGNoZWNrIHRoZSBiYXNlIFVSTCBhbmQgZW5kcG9pbnQgcGF0aC5cIjtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGBSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyAke3N0YXR1c30uYDtcblx0fVxufVxuIiwiaW1wb3J0IHR5cGUge1xuXHRBY2Nlc3MsXG5cdENvbnRlbnRJbnB1dCxcblx0Q29udGVudE5vZGUsXG5cdERlc2t0b3BDb250ZW50SW5wdXQsXG5cdERscFNldHRpbmdzLFxuXHRFbnZpcm9ubWVudEF2YWlsYWJpbGl0eSxcblx0RmRjM0FwcGxpY2F0aW9uLFxuXHRIZXJlSG9zdE1hbmlmZXN0LFxuXHRWaWV3U2V0dGluZ3MsXG5cdFdlYkNvbnRlbnRJbnB1dFxufSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBERUZBVUxUX1ZJRVc6IFZpZXdTZXR0aW5ncyA9IHsgbmF2aWdhdGlvbkNvbnRyb2xzOiB0cnVlLCByZWxvYWRDb250cm9sOiB0cnVlIH07XG5jb25zdCBERUZBVUxUX0VOVjogRW52aXJvbm1lbnRBdmFpbGFiaWxpdHkgPSB7XG5cdGVuYWJsZUhlcmVFQjogdHJ1ZSxcblx0ZW5hYmxlSGVyZVplcm86IGZhbHNlLFxuXHRlbmFibGVIZXJlTW9iaWxlOiBmYWxzZVxufTtcbmNvbnN0IERFRkFVTFRfRExQOiBEbHBTZXR0aW5ncyA9IHtcblx0Y29weUJlaGF2aW9yOiBcImFsbG93XCIsXG5cdHBhc3RlQmVoYXZpb3I6IFwibm9uLXByb3RlY3RlZC1jb250ZW50XCIsXG5cdHNjcmVlbkNhcHR1cmVCZWhhdmlvcjogXCJhbGxvd1wiLFxuXHRwcmludEJlaGF2aW9yOiBcImFsbG93XCJcbn07XG5jb25zdCBERUZBVUxUX0FDQ0VTUzogQWNjZXNzID0geyBzdWJqZWN0czogW10sIHByaW1pdGl2ZXM6IFtdIH07XG5cbi8qKlxuICogQ29udmVydCBhbiBGREMzIDIuMCBBcHBsaWNhdGlvbiByZWNvcmQgaW50byBhIEhFUkUgY29udGVudCBjcmVhdGUvdXBkYXRlIGJvZHkuXG4gKiBAdGhyb3dzIHtFcnJvcn0gaWYgYSBuYXRpdmUgYXBwIGlzIG1pc3NpbmcgYGRldGFpbHMucGF0aGAsIG9yIGEgd2ViIGFwcCBpcyBtaXNzaW5nIGBkZXRhaWxzLnVybGAuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBmZGMzVG9Db250ZW50SW5wdXQoYXBwOiBGZGMzQXBwbGljYXRpb24pOiBDb250ZW50SW5wdXQge1xuXHRjb25zdCBoZXJlOiBIZXJlSG9zdE1hbmlmZXN0ID0gYXBwLmhvc3RNYW5pZmVzdHM/LmhlcmUgPz8ge307XG5cdGNvbnN0IG5hbWUgPSBhcHAudGl0bGUgPz8gYXBwLm5hbWU7XG5cdGNvbnN0IGljb24gPSBhcHAuaWNvbnM/LlswXT8uc3JjO1xuXG5cdGlmIChhcHAudHlwZSA9PT0gXCJuYXRpdmVcIikge1xuXHRcdGlmIChhcHAuZGV0YWlscy5wYXRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihgRkRDMyBuYXRpdmUgYXBwIFwiJHthcHAuYXBwSWR9XCIgaXMgbWlzc2luZyBkZXRhaWxzLnBhdGhgKTtcblx0XHR9XG5cblx0XHRjb25zdCBkZXNrdG9wOiBEZXNrdG9wQ29udGVudElucHV0ID0ge1xuXHRcdFx0Y29udGVudFR5cGU6IFwiREVTS1RPUFwiLFxuXHRcdFx0bmFtZSxcblx0XHRcdGNvbnRlbnRJZDogYXBwLmFwcElkLFxuXHRcdFx0YWN0aXZlOiBoZXJlLmFjdGl2ZSA/PyB0cnVlLFxuXHRcdFx0ZmVhdHVyZWQ6IGhlcmUuZmVhdHVyZWQgPz8gZmFsc2UsXG5cdFx0XHRpY29uLFxuXHRcdFx0Y3VzdG9tTGFiZWw6IGhlcmUuY3VzdG9tTGFiZWwsXG5cdFx0XHRuYXRpdmVTZXR0aW5nczoge1xuXHRcdFx0XHRkZXNrdG9wUGF0aDogYXBwLmRldGFpbHMucGF0aCxcblx0XHRcdFx0ZGVza3RvcEFyZ3M6IGFwcC5kZXRhaWxzLmFyZ3VtZW50cyA/PyBbXSxcblx0XHRcdFx0d2l0aFNuYXA6IGhlcmUud2l0aFNuYXAgPz8gZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHQvLyBUaGlzIHNhbXBsZSBhbHdheXMgZW1pdHMgYW4gYGFjY2Vzc2Agb2JqZWN0LCByZS1hcHBseWluZyB0aGUgZGVzaXJlZCBzdGF0ZSBvblxuXHRcdFx0Ly8gZXZlcnkgd3JpdGUuIFRvIGxlYXZlIGFjY2VzcyB1bmNoYW5nZWQgb24gdXBkYXRlLCB0aGUgSEVSRSBBUEkgYWNjZXB0c1xuXHRcdFx0Ly8gYGFjY2VzczogbnVsbGAsIHdoaWNoIHRoaXMgbWFuaWZlc3QtZHJpdmVuIG1hcHBlciBkb2VzIG5vdCBlbWl0LlxuXHRcdFx0YWNjZXNzOiBoZXJlLmFjY2VzcyA/PyBERUZBVUxUX0FDQ0VTU1xuXHRcdH07XG5cdFx0cmV0dXJuIGRlc2t0b3A7XG5cdH1cblxuXHRpZiAoYXBwLmRldGFpbHMudXJsID09PSB1bmRlZmluZWQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYEZEQzMgd2ViIGFwcCBcIiR7YXBwLmFwcElkfVwiIGlzIG1pc3NpbmcgZGV0YWlscy51cmxgKTtcblx0fVxuXG5cdGNvbnN0IHdlYjogV2ViQ29udGVudElucHV0ID0ge1xuXHRcdGNvbnRlbnRUeXBlOiBcIldFQlwiLFxuXHRcdG5hbWUsXG5cdFx0Y29udGVudElkOiBhcHAuYXBwSWQsXG5cdFx0YWN0aXZlOiBoZXJlLmFjdGl2ZSA/PyB0cnVlLFxuXHRcdGZlYXR1cmVkOiBoZXJlLmZlYXR1cmVkID8/IGZhbHNlLFxuXHRcdGljb24sXG5cdFx0Y3VzdG9tTGFiZWw6IGhlcmUuY3VzdG9tTGFiZWwsXG5cdFx0dXJsczogW2FwcC5kZXRhaWxzLnVybF0sXG5cdFx0aGVyZUFwaUFjY2VzczogaGVyZS5oZXJlQXBpQWNjZXNzID8/IGZhbHNlLFxuXHRcdGFsbG93RHVwbGljYXRpb246IGhlcmUuYWxsb3dEdXBsaWNhdGlvbiA/PyBmYWxzZSxcblx0XHRhbGxvd09wZW5XaXRoRGVmYXVsdEJyb3dzZXI6IGhlcmUuYWxsb3dPcGVuV2l0aERlZmF1bHRCcm93c2VyID8/IGZhbHNlLFxuXHRcdHVzZUFJQ29udGV4dDogaGVyZS51c2VBSUNvbnRleHQgPz8gZmFsc2UsXG5cdFx0ZW5hYmxlU2ltcGxlV2luZG93OiBoZXJlLmVuYWJsZVNpbXBsZVdpbmRvdyA/PyBmYWxzZSxcblx0XHR2aWV3U2V0dGluZ3M6IGhlcmUudmlld1NldHRpbmdzID8/IERFRkFVTFRfVklFVyxcblx0XHRlbnZpcm9ubWVudEF2YWlsYWJpbGl0eTogaGVyZS5lbnZpcm9ubWVudEF2YWlsYWJpbGl0eSA/PyBERUZBVUxUX0VOVixcblx0XHRkYXRhTG9zc1ByZXZlbnRpb25TZXR0aW5nczogaGVyZS5kYXRhTG9zc1ByZXZlbnRpb25TZXR0aW5ncyA/PyBERUZBVUxUX0RMUCxcblx0XHRyZWRpcmVjdHM6IFtdLFxuXHRcdC8vIEZEQzMgaW50ZXJvcCBpbnRlbnQgZGVjbGFyYXRpb25zIHBhc3Mgc3RyYWlnaHQgdGhyb3VnaCB3aGVuIHByZXNlbnQuXG5cdFx0aW50ZXJvcDogYXBwLmludGVyb3AsXG5cdFx0Ly8gVGhpcyBzYW1wbGUgYWx3YXlzIGVtaXRzIGFuIGBhY2Nlc3NgIG9iamVjdCwgcmUtYXBwbHlpbmcgdGhlIGRlc2lyZWQgc3RhdGUgb24gZXZlcnlcblx0XHQvLyB3cml0ZS4gVG8gbGVhdmUgYWNjZXNzIHVuY2hhbmdlZCBvbiB1cGRhdGUsIHRoZSBIRVJFIEFQSSBhY2NlcHRzIGBhY2Nlc3M6IG51bGxgLFxuXHRcdC8vIHdoaWNoIHRoaXMgbWFuaWZlc3QtZHJpdmVuIG1hcHBlciBkb2VzIG5vdCBlbWl0LlxuXHRcdGFjY2VzczogaGVyZS5hY2Nlc3MgPz8gREVGQVVMVF9BQ0NFU1Ncblx0fTtcblx0cmV0dXJuIHdlYjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgbGl2ZSBjb250ZW50IG5vZGUgYmFjayBpbnRvIGFuIEZEQzMgMi4wIEFwcGxpY2F0aW9uIHJlY29yZCDigJQgdGhlXG4gKiBvcHBvc2l0ZSBvZiBgZmRjM1RvQ29udGVudElucHV0YC4gVXNlZCB0byBleHBvcnQgYSBkaXJlY3RvcnkgYXMgYW5cbiAqIGFwcC1kaXJlY3RvcnkgbWFuaWZlc3QsIGUuZy4gdG8gY2FycnkgaXQgaW50byBhbm90aGVyIGVudmlyb25tZW50LlxuICpcbiAqIERlbGliZXJhdGVseSBvbWl0cyBgYWNjZXNzYDogYHN1YmplY3RzYC9gcHJpbWl0aXZlc2AgYXJlIG9yZy1zcGVjaWZpY1xuICogVVVJRHMgKGEgcGVybWlzc2lvbiBvciBncm91cCBpZCBtZWFuaW5nZnVsIG9ubHkgaW4gdGhlIG9yZyB0aGUgbm9kZSBjYW1lXG4gKiBmcm9tKSwgc28gY2FycnlpbmcgdGhlbSBpbnRvIGEgZGlmZmVyZW50IG9yZydzIG1hbmlmZXN0IHdvdWxkIGVpdGhlciBmYWlsXG4gKiBvdXRyaWdodCBvciDigJQgd29yc2Ug4oCUIHNpbGVudGx5IGdyYW50IGFjY2VzcyB0byB3aGF0ZXZlciB1bnJlbGF0ZWRcbiAqIHN1YmplY3QgaGFwcGVucyB0byBob2xkIHRoYXQgaWQgdGhlcmUuIExlYXZpbmcgYGFjY2Vzc2Agb3V0IG9mIHRoZSBGREMzXG4gKiByZWNvcmQgbWF0Y2hlcyBob3cgYHN5bmMudHNgIGFscmVhZHkgdHJlYXRzIHVuZGVjbGFyZWQgYWNjZXNzOiBhcHBseWluZ1xuICogdGhpcyBtYW5pZmVzdCBhbnl3aGVyZSBsZWF2ZXMgdGhhdCBhcHAncyBhY2Nlc3MgYXNzaWdubWVudHMgdW50b3VjaGVkXG4gKiByYXRoZXIgdGhhbiB3aXBpbmcgb3IgbWlzYXBwbHlpbmcgdGhlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRlbnROb2RlVG9GZGMzQXBwbGljYXRpb24obm9kZTogQ29udGVudE5vZGUpOiBGZGMzQXBwbGljYXRpb24ge1xuXHRjb25zdCBoZXJlOiBIZXJlSG9zdE1hbmlmZXN0ID0ge1xuXHRcdGFjdGl2ZTogbm9kZS5hY3RpdmUsXG5cdFx0ZmVhdHVyZWQ6IG5vZGUuZmVhdHVyZWQgPz8gZmFsc2UsXG5cdFx0Y3VzdG9tTGFiZWw6IG5vZGUuY3VzdG9tTGFiZWxcblx0fTtcblxuXHRpZiAobm9kZS50eXBlID09PSBcIkRFU0tUT1BcIikge1xuXHRcdHJldHVybiB7XG5cdFx0XHRhcHBJZDogbm9kZS5pZCxcblx0XHRcdG5hbWU6IG5vZGUubmFtZSxcblx0XHRcdHRpdGxlOiBub2RlLm5hbWUsXG5cdFx0XHR0eXBlOiBcIm5hdGl2ZVwiLFxuXHRcdFx0ZGV0YWlsczogeyBwYXRoOiBub2RlLmRlc2t0b3BQYXRoLCBhcmd1bWVudHM6IG5vZGUuZGVza3RvcEFyZ3MgfSxcblx0XHRcdGljb25zOiBub2RlLmljb24gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IFt7IHNyYzogbm9kZS5pY29uIH1dLFxuXHRcdFx0Ly8gVW5kZWZpbmVkIHdoZW5ldmVyIHRoZSBkZXBsb3llZCBzY2hlbWEgZG9lcyBub3QgZXhwb3NlIGBpbnRlcm9wYCBvblxuXHRcdFx0Ly8gdGhlIGNvbnRlbnQgdHlwZXMg4oCUIHNlZSBOT0RFX0ZJRUxEUyBpbiBjb250ZW50LWFwaS50cy4gUGFzc2VkIHRocm91Z2hcblx0XHRcdC8vIHNvIGl0IGFwcGVhcnMgYXV0b21hdGljYWxseSBpZiBhIHNjaGVtYSB2ZXJzaW9uIHN0YXJ0cyByZXR1cm5pbmcgaXQuXG5cdFx0XHRpbnRlcm9wOiBub2RlLmludGVyb3AsXG5cdFx0XHRob3N0TWFuaWZlc3RzOiB7IGhlcmU6IHsgLi4uaGVyZSwgd2l0aFNuYXA6IG5vZGUud2l0aFNuYXAgPz8gZmFsc2UgfSB9XG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0YXBwSWQ6IG5vZGUuaWQsXG5cdFx0bmFtZTogbm9kZS5uYW1lLFxuXHRcdHRpdGxlOiBub2RlLm5hbWUsXG5cdFx0dHlwZTogXCJ3ZWJcIixcblx0XHQvLyBBIG5vZGUgY2FuIGNhcnJ5IG1vcmUgdGhhbiBvbmUgVVJMIChlLmcuIGFsbG93ZWQgcmVkaXJlY3QgdGFyZ2V0cyk7IEZEQzNcblx0XHQvLyBoYXMgcm9vbSBmb3IgZXhhY3RseSBvbmUsIHNvIHRha2UgdGhlIHByaW1hcnkg4oCUIHNhbWUgc2ltcGxpZmljYXRpb24gdGhlXG5cdFx0Ly8gVUkncyBcIlZhbGlkYXRlXCIgYWxyZWFkeSBtYWtlcyB3aGVuIGl0IGxvYWRzIGEgbm9kZSBiYWNrIGludG8gdGhlIGZvcm0uXG5cdFx0ZGV0YWlsczogeyB1cmw6IG5vZGUudXJsID8/IG5vZGUudXJscz8uWzBdIH0sXG5cdFx0aWNvbnM6IG5vZGUuaWNvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogW3sgc3JjOiBub2RlLmljb24gfV0sXG5cdFx0Ly8gSW50ZW50IGRlY2xhcmF0aW9ucyBhcmUgd3JpdGUtb25seSBpbiB0aGUgZGVwbG95ZWQgc2NoZW1hLCBzbyB0aGlzIGlzXG5cdFx0Ly8gdW5kZWZpbmVkIG9uIGV4cG9ydCByYXRoZXIgdGhhbiByb3VuZC10cmlwcGluZyDigJQgc2VlIE5PREVfRklFTERTIGluXG5cdFx0Ly8gY29udGVudC1hcGkudHMuIFBhc3NlZCB0aHJvdWdoIHNvIGl0IGFwcGVhcnMgYXV0b21hdGljYWxseSBpZiBhIHNjaGVtYVxuXHRcdC8vIHZlcnNpb24gc3RhcnRzIHJldHVybmluZyBpdC5cblx0XHRpbnRlcm9wOiBub2RlLmludGVyb3AsXG5cdFx0aG9zdE1hbmlmZXN0czoge1xuXHRcdFx0aGVyZToge1xuXHRcdFx0XHQuLi5oZXJlLFxuXHRcdFx0XHRoZXJlQXBpQWNjZXNzOiBub2RlLmhlcmVBcGlBY2Nlc3MgPz8gZmFsc2UsXG5cdFx0XHRcdGFsbG93RHVwbGljYXRpb246IG5vZGUuYWxsb3dEdXBsaWNhdGlvbiA/PyBmYWxzZSxcblx0XHRcdFx0YWxsb3dPcGVuV2l0aERlZmF1bHRCcm93c2VyOiBub2RlLmFsbG93T3BlbldpdGhEZWZhdWx0QnJvd3NlciA/PyBmYWxzZSxcblx0XHRcdFx0dXNlQUlDb250ZXh0OiBub2RlLnVzZUFJQ29udGV4dCA/PyBmYWxzZSxcblx0XHRcdFx0ZW5hYmxlU2ltcGxlV2luZG93OiBub2RlLmVuYWJsZVNpbXBsZVdpbmRvdyA/PyBmYWxzZSxcblx0XHRcdFx0dmlld1NldHRpbmdzOiBub2RlLnZpZXdTZXR0aW5ncyA/PyBERUZBVUxUX1ZJRVcsXG5cdFx0XHRcdGVudmlyb25tZW50QXZhaWxhYmlsaXR5OiBub2RlLmVudmlyb25tZW50QXZhaWxhYmlsaXR5ID8/IERFRkFVTFRfRU5WLFxuXHRcdFx0XHRkYXRhTG9zc1ByZXZlbnRpb25TZXR0aW5nczogbm9kZS5kYXRhTG9zc1ByZXZlbnRpb25TZXR0aW5ncyA/PyBERUZBVUxUX0RMUFxuXHRcdFx0fVxuXHRcdH1cblx0fTtcbn1cbiIsImltcG9ydCB0eXBlIHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIi4vYXV0aFwiO1xuaW1wb3J0IHsgQ29udGVudEFwaUVycm9yLCBjb2RlVG9NZXNzYWdlLCBzdGF0dXNUb01lc3NhZ2UgfSBmcm9tIFwiLi9lcnJvcnNcIjtcblxuLyoqIEV2ZXJ5IHJlcXVlc3QgaW4gdGhpcyBzYW1wbGUgZ29lcyB0byB0aGlzIG9uZSBlbmRwb2ludCDigJQgcmVhZHMgYW5kIHdyaXRlcyBhbGlrZS4gKi9cbmV4cG9ydCBjb25zdCBFTkRQT0lOVF9QQVRIID0gXCIvaGVyZS9hcGkvZ3JhcGhxbFwiO1xuXG4vKiogQ29uc3RydWN0aW9uIG9wdGlvbnMgc2hhcmVkIGJ5IGV2ZXJ5IGNsaWVudCBidWlsdCBvbiB0aGlzIHRyYW5zcG9ydC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgR3JhcGhRbFRyYW5zcG9ydE9wdGlvbnMge1xuXHRiYXNlVXJsOiBzdHJpbmc7XG5cdGF1dGg6IENyZWRlbnRpYWxQcm92aWRlcjtcblx0ZmV0Y2hJbXBsPzogdHlwZW9mIGZldGNoO1xufVxuXG4vKipcbiAqIEEgcmVzcG9uc2UgYm9keS4gR3JhcGhRTCB1c2VzIGBkYXRhYC9gZXJyb3JzYDsgdGhlIGdhdGV3YXkgcmVqZWN0cyByZXF1ZXN0c1xuICogYWhlYWQgb2YgR3JhcGhRTCB3aXRoIGEgZmxhdCBgeyBjb2RlLCBtZXNzYWdlIH1gLCBzbyBib3RoIHNoYXBlcyBsaXZlIGhlcmUuXG4gKi9cbmludGVyZmFjZSBHcmFwaFFsRW52ZWxvcGU8VD4ge1xuXHRkYXRhPzogVDtcblx0ZXJyb3JzPzogeyBtZXNzYWdlOiBzdHJpbmc7IGV4dGVuc2lvbnM/OiB7IGNvZGU/OiBzdHJpbmcgfSB9W107XG5cdGNvZGU/OiBzdHJpbmc7XG5cdG1lc3NhZ2U/OiBzdHJpbmc7XG59XG5cbi8qKlxuICogU2VuZHMgR3JhcGhRTCBkb2N1bWVudHMgdG8gb25lIG9yZyBhbmQgdW53cmFwcyB0aGUgdHdvIGVycm9yIGVudmVsb3BlcyB0aGVcbiAqIEhFUkUgZ2F0ZXdheSBjYW4gYW5zd2VyIHdpdGguXG4gKlxuICogRXh0cmFjdGVkIHNvIHRoZSBjb250ZW50IGNsaWVudCBhbmQgdGhlIHVzZXIvZ3JvdXAgY2xpZW50IHNoYXJlIG9uZSBjb3B5IG9mXG4gKiB0aGF0IGVycm9yIGhhbmRsaW5nOiB0aGUgZGlzcGF0Y2ggYmVsb3cgaXMgc3VidGxlIGVub3VnaCB0aGF0IGEgc2Vjb25kXG4gKiBoYW5kLXdyaXR0ZW4gdmVyc2lvbiB3b3VsZCBkcmlmdCwgYW5kIGV2ZXJ5IGNsaWVudCB3YW50cyB0aGUgc2FtZSBiZWhhdmlvdXIuXG4gKiBTd2FwIGBmZXRjaEltcGxgIGluIHRlc3RzOyBldmVyeXRoaW5nIGVsc2UgaXMgc3RhdGVsZXNzIHBlciByZXF1ZXN0LlxuICovXG5leHBvcnQgY2xhc3MgR3JhcGhRbFRyYW5zcG9ydCB7XG5cdHByaXZhdGUgcmVhZG9ubHkgYmFzZVVybDogc3RyaW5nO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgYXV0aDogQ3JlZGVudGlhbFByb3ZpZGVyO1xuXG5cdHByaXZhdGUgcmVhZG9ubHkgZmV0Y2hJbXBsOiB0eXBlb2YgZmV0Y2g7XG5cblx0LyoqIEJ1aWxkIGEgdHJhbnNwb3J0IGZvciBvbmUgb3JnLCB1c2luZyB0aGUgZ2l2ZW4gY3JlZGVudGlhbCBwcm92aWRlci4gKi9cblx0cHVibGljIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEdyYXBoUWxUcmFuc3BvcnRPcHRpb25zKSB7XG5cdFx0dGhpcy5iYXNlVXJsID0gb3B0aW9ucy5iYXNlVXJsLnJlcGxhY2UoL1xcLyQvdSwgXCJcIik7XG5cdFx0dGhpcy5hdXRoID0gb3B0aW9ucy5hdXRoO1xuXHRcdC8vIFRoZSBuYXRpdmUgYGZldGNoYCBtdXN0IGtlZXAgaXRzIG9yaWdpbmFsIHJlY2VpdmVyOiBjYWxsaW5nIGl0IGFzXG5cdFx0Ly8gYHRoaXMuZmV0Y2hJbXBsKC4uLilgIHdvdWxkIHJlYmluZCBgdGhpc2AgYW5kIHRocm93IFwiSWxsZWdhbCBpbnZvY2F0aW9uXCIuXG5cdFx0dGhpcy5mZXRjaEltcGwgPSBvcHRpb25zLmZldGNoSW1wbCA/PyBnbG9iYWxUaGlzLmZldGNoLmJpbmQoZ2xvYmFsVGhpcyk7XG5cdH1cblxuXHQvKiogU2VuZCBvbmUgR3JhcGhRTCByZXF1ZXN0IGFuZCB1bndyYXAgaXRzIGBkYXRhYCwgdGhyb3dpbmcgb24gYW55IGVycm9yIHNoYXBlLiAqL1xuXHRwdWJsaWMgYXN5bmMgcmVxdWVzdDxUPihxdWVyeTogc3RyaW5nLCB2YXJpYWJsZXM/OiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSk6IFByb21pc2U8VD4ge1xuXHRcdGNvbnN0IGF1dGggPSBhd2FpdCB0aGlzLmF1dGguYXBwbHkoKTtcblx0XHRjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuZmV0Y2hJbXBsKGAke3RoaXMuYmFzZVVybH0ke0VORFBPSU5UX1BBVEh9YCwge1xuXHRcdFx0bWV0aG9kOiBcIlBPU1RcIixcblx0XHRcdGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsIC4uLmF1dGguaGVhZGVycyB9LFxuXHRcdFx0Y3JlZGVudGlhbHM6IGF1dGguY3JlZGVudGlhbHMsXG5cdFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7IHF1ZXJ5LCB2YXJpYWJsZXMgfSlcblx0XHR9KTtcblxuXHRcdC8vIEZhaWx1cmVzIGFycml2ZSBpbiB0d28gZGlmZmVyZW50IGVudmVsb3BlcywgYW5kIGVpdGhlciBjYW4gYWNjb21wYW55IGFcblx0XHQvLyBub24tT0sgc3RhdHVzOiBHcmFwaFFMIGFuc3dlcnMgbWFsZm9ybWVkIHF1ZXJpZXMgd2l0aCA0MDAgcGx1cyBhblxuXHRcdC8vIGBlcnJvcnNgIGFycmF5LCB3aGlsZSB0aGUgZ2F0ZXdheSByZWplY3RzIHVuYXV0aGVudGljYXRlZCByZXF1ZXN0c1xuXHRcdC8vIGJlZm9yZSBHcmFwaFFMIHJ1bnMgd2l0aCBhIGZsYXQgYHsgY29kZSwgbWVzc2FnZSB9YC4gUmVhZCB0aGUgYm9keVxuXHRcdC8vIGZpcnN0IGFuZCBkaXNwYXRjaCBvbiBpdHMgc2hhcGUg4oCUIHRoZSBzZXJ2ZXIncyBvd24gbWVzc2FnZSBpcyBhbHdheXNcblx0XHQvLyBtb3JlIHNwZWNpZmljIHRoYW4gYW55dGhpbmcgaW5mZXJyZWQgZnJvbSB0aGUgc3RhdHVzIGFsb25lLlxuXHRcdGNvbnN0IGVudmVsb3BlID0gKGF3YWl0IHRoaXMucmVhZEJvZHk8VD4ocmVzcG9uc2UpKSA/PyB7fTtcblxuXHRcdGlmIChlbnZlbG9wZS5lcnJvcnMgIT09IHVuZGVmaW5lZCAmJiBlbnZlbG9wZS5lcnJvcnMubGVuZ3RoID4gMCkge1xuXHRcdFx0Y29uc3QgZmlyc3QgPSBlbnZlbG9wZS5lcnJvcnNbMF07XG5cdFx0XHRjb25zdCBjb2RlID0gZmlyc3QuZXh0ZW5zaW9ucz8uY29kZTtcblx0XHRcdC8vIFN0YXR1cyAwIGRlbm90ZXMgYSBHcmFwaFFMLWxheWVyIGZhaWx1cmUgb24gYW4gb3RoZXJ3aXNlIGZpbmUgcmVzcG9uc2UuXG5cdFx0XHR0aHJvdyBuZXcgQ29udGVudEFwaUVycm9yKFxuXHRcdFx0XHRyZXNwb25zZS5vayA/IDAgOiByZXNwb25zZS5zdGF0dXMsXG5cdFx0XHRcdGNvZGUgPT09IHVuZGVmaW5lZCA/IGZpcnN0Lm1lc3NhZ2UgOiBjb2RlVG9NZXNzYWdlKGNvZGUsIGZpcnN0Lm1lc3NhZ2UpLFxuXHRcdFx0XHRjb2RlXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdGlmICghcmVzcG9uc2Uub2spIHtcblx0XHRcdC8vIEEgZ2F0ZXdheSByZWplY3Rpb246IHN1cmZhY2UgaXRzIG1lc3NhZ2UgYW5kIGNvZGUgdmVyYmF0aW0uXG5cdFx0XHR0aHJvdyBuZXcgQ29udGVudEFwaUVycm9yKFxuXHRcdFx0XHRyZXNwb25zZS5zdGF0dXMsXG5cdFx0XHRcdGVudmVsb3BlLm1lc3NhZ2UgPz8gc3RhdHVzVG9NZXNzYWdlKHJlc3BvbnNlLnN0YXR1cyksXG5cdFx0XHRcdGVudmVsb3BlLmNvZGVcblx0XHRcdCk7XG5cdFx0fVxuXG5cdFx0aWYgKGVudmVsb3BlLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dGhyb3cgbmV3IENvbnRlbnRBcGlFcnJvcigwLCBcIkdyYXBoUUwgcmVzcG9uc2UgaGFkIG5vIGRhdGEuXCIpO1xuXHRcdH1cblx0XHRyZXR1cm4gZW52ZWxvcGUuZGF0YTtcblx0fVxuXG5cdC8qKiBSZWFkIGEgSlNPTiBib2R5LCB0b2xlcmF0aW5nIGEgbm9uLUpTT04gb3IgZW1wdHkgcmVzcG9uc2UuICovXG5cdHByaXZhdGUgYXN5bmMgcmVhZEJvZHk8VD4ocmVzcG9uc2U6IFJlc3BvbnNlKTogUHJvbWlzZTxHcmFwaFFsRW52ZWxvcGU8VD4gfCB1bmRlZmluZWQ+IHtcblx0XHR0cnkge1xuXHRcdFx0cmV0dXJuIChhd2FpdCByZXNwb25zZS5qc29uKCkpIGFzIEdyYXBoUWxFbnZlbG9wZTxUPjtcblx0XHR9IGNhdGNoIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG59XG4iLCIvKipcbiAqIE9BdXRoIDIuMCBBdXRob3JpemF0aW9uIENvZGUgZmxvdyB3aXRoIFBLQ0UgKFJGQyA3NjM2KSDigJQgKipicm93c2VyIG9ubHkqKi5cbiAqXG4gKiBIRVJFJ3Mgc2VydmljZSBnYXRld2F5IGlzIHRoZSBhdXRob3JpemF0aW9uIHNlcnZlciwgc28gYSBwYWdlIGNhbiBvYnRhaW4gaXRzXG4gKiBvd24gc2hvcnQtbGl2ZWQgYWNjZXNzIHRva2VuIGluc3RlYWQgb2Ygc2hpcHBpbmcgYSBsb25nLWxpdmVkIGNyZWRlbnRpYWwgaW5cbiAqIGl0cyBidW5kbGUuIFRoZSB1c2VyIHNpZ25zIGluIHdpdGggdGhlaXIgbm9ybWFsIG9yZ2FuaXphdGlvbiBhY2NvdW50IGFuZFxuICogY29uc2VudHM7IHRoZSB0b2tlbiB0aGF0IGNvbWVzIGJhY2sgY2FycmllcyB0aGVpciBhY2Nlc3MsIG5vdCB0aGUgYXBwJ3MuXG4gKlxuICogVGhlIHNhbXBsZSBpcyBhIHB1YmxpYyBjbGllbnQ6IGl0IGhvbGRzIG5vIGNsaWVudCBzZWNyZXQsIGJlY2F1c2UgYW55dGhpbmcgaW5cbiAqIGEgYnJvd3NlciBidW5kbGUgaXMgcmVhZGFibGUgYnkgYW55b25lIHdobyBsb2FkcyB0aGUgcGFnZS4gUEtDRSBpcyB3aGF0IG1ha2VzXG4gKiB0aGF0IHNhZmUg4oCUIHRoZSBhdXRob3JpemF0aW9uIGNvZGUgaXMgYm91bmQgdG8gYSBvbmUtdGltZSBzZWNyZXQgKHRoZVxuICogXCJ2ZXJpZmllclwiKSB0aGF0IG5ldmVyIGxlYXZlcyB0aGlzIHBhZ2UsIHNvIGFuIGludGVyY2VwdGVkIGNvZGUgaXMgdXNlbGVzcyBvblxuICogaXRzIG93bi5cbiAqXG4gKiBUaGlzIG1vZHVsZSBkZXBlbmRzIG9uIGB3aW5kb3dgLCBgc2Vzc2lvblN0b3JhZ2VgIGFuZCBgY3J5cHRvLnN1YnRsZWAuIFRoZVxuICogc3luYyBzY3JpcHQgbXVzdCBub3QgaW1wb3J0IGl0OyBhIHJlZGlyZWN0IGZsb3cgbmVlZHMgYSB1c2VyIHByZXNlbnQsIHNvXG4gKiBoZWFkbGVzcyBjYWxsZXJzIHVzZSBgQmVhcmVyVG9rZW5BdXRoYCB3aXRoIGFuIG9yZyBBUEkgSldUIGluc3RlYWQuXG4gKi9cblxuLyoqIFRoZSBzdWJzZXQgb2YgUkZDIDg0MTQgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgbWV0YWRhdGEgdGhpcyBzYW1wbGUgdXNlcy4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgT0F1dGhNZXRhZGF0YSB7XG5cdGlzc3Vlcjogc3RyaW5nO1xuXHRhdXRob3JpemF0aW9uX2VuZHBvaW50OiBzdHJpbmc7XG5cdHRva2VuX2VuZHBvaW50OiBzdHJpbmc7XG5cdHNjb3Blc19zdXBwb3J0ZWQ/OiBzdHJpbmdbXTtcblx0Y29kZV9jaGFsbGVuZ2VfbWV0aG9kc19zdXBwb3J0ZWQ/OiBzdHJpbmdbXTtcbn1cblxuLyoqIEEgZmFpbHVyZSBkdXJpbmcgZGlzY292ZXJ5LCBhdXRob3JpemF0aW9uLCBvciB0aGUgdG9rZW4gZXhjaGFuZ2UuICovXG5leHBvcnQgY2xhc3MgT0F1dGhFcnJvciBleHRlbmRzIEVycm9yIHtcblx0cHVibGljIHJlYWRvbmx5IGNvZGU/OiBzdHJpbmc7XG5cblx0LyoqIFdyYXAgYSBmYWlsdXJlIG1lc3NhZ2UsIG9wdGlvbmFsbHkgdGFnZ2VkIHdpdGggdGhlIHNlcnZlcidzIGVycm9yIGNvZGUuICovXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcsIGNvZGU/OiBzdHJpbmcpIHtcblx0XHRzdXBlcihtZXNzYWdlKTtcblx0XHR0aGlzLm5hbWUgPSBcIk9BdXRoRXJyb3JcIjtcblx0XHR0aGlzLmNvZGUgPSBjb2RlO1xuXHR9XG59XG5cbmNvbnN0IERJU0NPVkVSWV9QQVRIID0gXCIvLndlbGwta25vd24vb2F1dGgtYXV0aG9yaXphdGlvbi1zZXJ2ZXJcIjtcblxuLyoqXG4gKiBUaGUgdmVyaWZpZXIgYW5kIHN0YXRlIG11c3Qgb3V0bGl2ZSBhIGZ1bGwgcGFnZSBuYXZpZ2F0aW9uIOKAlCB0aGUgYnJvd3NlclxuICogbGVhdmVzIGZvciB0aGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIgYW5kIGNvbWVzIGJhY2sg4oCUIHNvIHRoZXkgY2Fubm90IGxpdmUgaW5cbiAqIG1lbW9yeS4gVGhleSBhcmUgcmVtb3ZlZCB0aGUgbW9tZW50IHRoZSByZWRpcmVjdCBpcyBoYW5kbGVkLlxuICovXG5jb25zdCBWRVJJRklFUl9LRVkgPSBcImhlcmUtb2F1dGgtdmVyaWZpZXJcIjtcbmNvbnN0IFNUQVRFX0tFWSA9IFwiaGVyZS1vYXV0aC1zdGF0ZVwiO1xuXG4vKipcbiAqIFRoZSBvbmUgc2NvcGUgdGhpcyBzYW1wbGUgbmVlZHM6IGl0IGxldHMgdGhlIHBhZ2UgY2FsbCBIRVJFIENsb3VkIEFQSXMgb24gdGhlXG4gKiBzaWduZWQtaW4gdXNlcidzIGJlaGFsZi5cbiAqXG4gKiBEZWxpYmVyYXRlbHkgYSBmaXhlZCB2YWx1ZSByYXRoZXIgdGhhbiBzb21ldGhpbmcgcmVhZCBvdXQgb2YgdGhlIGRpc2NvdmVyeVxuICogZG9jdW1lbnQuIFJGQyA4NDE0J3MgYHNjb3Blc19zdXBwb3J0ZWRgIGxpc3RzIHdoYXQgdGhlICphdXRob3JpemF0aW9uIHNlcnZlcipcbiAqIHN1cHBvcnRzIGluIGFnZ3JlZ2F0ZSwgbm90IHdoYXQgYSAqY2xpZW50KiBpcyBwZXJtaXR0ZWQgdG8gcmVxdWVzdCDigJQgYSBIRVJFXG4gKiBvcmcgYWxzbyBhZHZlcnRpc2VzIGBvZmZsaW5lX2FjY2Vzc2AgYW5kIGBhcHBfZGVmYXVsdGAuIEFza2luZyBmb3Igc2NvcGVzIHRoZVxuICogcmVnaXN0ZXJlZCBhcHAgd2FzIG5vdCBncmFudGVkIGZhaWxzIHRoZSB3aG9sZSBhdXRob3JpemF0aW9uIHdpdGhcbiAqIGBpbnZhbGlkX3Njb3BlYCwgYW5kIHRoaXMgc2FtcGxlIHdhbnRzIG5laXRoZXIgb2YgdGhvc2U6IHRoZSB0b2tlbiBpcyBoZWxkIGluXG4gKiBtZW1vcnkgb25seSBhbmQgdGhlcmUgaXMgbm8gcmVmcmVzaCBncmFudC5cbiAqL1xuY29uc3QgU0NPUEUgPSBcImZ1bGxcIjtcblxubGV0IGNhY2hlZDogeyBiYXNlVXJsOiBzdHJpbmc7IG1ldGFkYXRhOiBPQXV0aE1ldGFkYXRhIH0gfCB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmVhZCB0aGUgYXV0aG9yaXphdGlvbiBzZXJ2ZXIncyBtZXRhZGF0YS5cbiAqXG4gKiBFbmRwb2ludHMgYXJlIGRpc2NvdmVyZWQgcmF0aGVyIHRoYW4gaGFyZGNvZGVkIHNvIHRoZSBzYW1wbGUgd29ya3MgYWdhaW5zdFxuICogYW55IG9yZ2FuaXphdGlvbidzIHN1YmRvbWFpbiB3aXRob3V0IGV4dHJhIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkaXNjb3ZlcihiYXNlVXJsOiBzdHJpbmcpOiBQcm9taXNlPE9BdXRoTWV0YWRhdGE+IHtcblx0aWYgKGNhY2hlZCAhPT0gdW5kZWZpbmVkICYmIGNhY2hlZC5iYXNlVXJsID09PSBiYXNlVXJsKSB7XG5cdFx0cmV0dXJuIGNhY2hlZC5tZXRhZGF0YTtcblx0fVxuXG5cdGNvbnN0IHVybCA9IGAke2Jhc2VVcmx9JHtESVNDT1ZFUllfUEFUSH1gO1xuXHRsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xuXHR0cnkge1xuXHRcdHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcblx0fSBjYXRjaCB7XG5cdFx0dGhyb3cgbmV3IE9BdXRoRXJyb3IoYENvdWxkIG5vdCByZWFjaCAke3VybH0uIENoZWNrIEJBU0VfVVJMIGFuZCB5b3VyIG5ldHdvcmsuYCk7XG5cdH1cblxuXHRpZiAoIXJlc3BvbnNlLm9rKSB7XG5cdFx0dGhyb3cgbmV3IE9BdXRoRXJyb3IoXG5cdFx0XHRgJHt1cmx9IHJldHVybmVkICR7cmVzcG9uc2Uuc3RhdHVzfS4gT0F1dGggbWF5IG5vdCBiZSBlbmFibGVkIGZvciB0aGlzIGAgK1xuXHRcdFx0XHRcIm9yZ2FuaXphdGlvbiDigJQgYXNrIHlvdXIgSEVSRSBhZG1pbmlzdHJhdG9yIHRvIGVuYWJsZSBpdC5cIlxuXHRcdCk7XG5cdH1cblxuXHRjb25zdCBtZXRhZGF0YSA9IChhd2FpdCByZXNwb25zZS5qc29uKCkpIGFzIE9BdXRoTWV0YWRhdGE7XG5cdGNhY2hlZCA9IHsgYmFzZVVybCwgbWV0YWRhdGEgfTtcblx0cmV0dXJuIG1ldGFkYXRhO1xufVxuXG4vKipcbiAqIFdoZXJlIHRoZSBhdXRob3JpemF0aW9uIHNlcnZlciBzZW5kcyB0aGUgdXNlciBiYWNrLlxuICpcbiAqIERlcml2ZWQgZnJvbSB0aGUgY3VycmVudCBwYWdlIHJhdGhlciB0aGFuIGNvbmZpZ3VyZWQsIGJlY2F1c2UgaXQgbXVzdCBtYXRjaFxuICogYSByZWdpc3RlcmVkIHJlZGlyZWN0IFVSSSBleGFjdGx5IGFuZCBhIG1pc21hdGNoZWQgaGFuZC10eXBlZCB2YWx1ZSBpcyB0aGVcbiAqIHNpbmdsZSBtb3N0IGNvbW1vbiB3YXkgdGhpcyBmbG93IGZhaWxzLiBUaGUgVUkgZGlzcGxheXMgdGhpcyBzdHJpbmcgc28gaXQgY2FuXG4gKiBiZSBjb3BpZWQgaW50byB0aGUgYWRtaW4gY29uc29sZSB2ZXJiYXRpbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZGlyZWN0VXJpKCk6IHN0cmluZyB7XG5cdHJldHVybiBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufSR7d2luZG93LmxvY2F0aW9uLnBhdGhuYW1lfWA7XG59XG5cbi8qKiBUcnVlIHdoZW4gdGhlIGN1cnJlbnQgVVJMIGlzIGFuIGF1dGhvcml6YXRpb24gcmVzcG9uc2UsIHN1Y2Nlc3Mgb3IgZmFpbHVyZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNBdXRob3JpemF0aW9uUmVzcG9uc2UoKTogYm9vbGVhbiB7XG5cdGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cdHJldHVybiBwYXJhbXMuaGFzKFwiY29kZVwiKSB8fCBwYXJhbXMuaGFzKFwiZXJyb3JcIik7XG59XG5cbi8qKlxuICogU3RhcnQgc2lnbi1pbjogc3Rhc2ggYSBmcmVzaCB2ZXJpZmllciBhbmQgc3RhdGUsIHRoZW4gbGVhdmUgZm9yIHRoZVxuICogYXV0aG9yaXphdGlvbiBlbmRwb2ludC4gVGhpcyBuYXZpZ2F0ZXMgYXdheSwgc28gbm90aGluZyBhZnRlciBpdCBydW5zLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYmVnaW5TaWduSW4oYmFzZVVybDogc3RyaW5nLCBjbGllbnRJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG5cdGNvbnN0IG1ldGFkYXRhID0gYXdhaXQgZGlzY292ZXIoYmFzZVVybCk7XG5cblx0Ly8gQ2hlY2tlZCB1cCBmcm9udCBzbyBhIHNlcnZlciB0aGF0IGRvZXMgbm90IG9mZmVyIHRoaXMgc2NvcGUgcHJvZHVjZXMgYW5cblx0Ly8gYWN0aW9uYWJsZSBtZXNzYWdlIGhlcmUsIHJhdGhlciB0aGFuIGFuIGBpbnZhbGlkX3Njb3BlYCByZWRpcmVjdCBhZnRlciB0aGVcblx0Ly8gdXNlciBoYXMgYWxyZWFkeSBiZWVuIHNlbnQgYXdheSB0byBzaWduIGluLlxuXHRpZiAobWV0YWRhdGEuc2NvcGVzX3N1cHBvcnRlZCAhPT0gdW5kZWZpbmVkICYmICFtZXRhZGF0YS5zY29wZXNfc3VwcG9ydGVkLmluY2x1ZGVzKFNDT1BFKSkge1xuXHRcdHRocm93IG5ldyBPQXV0aEVycm9yKFxuXHRcdFx0YFRoaXMgb3JnYW5pemF0aW9uIGRvZXMgbm90IGFkdmVydGlzZSB0aGUgXCIke1NDT1BFfVwiIHNjb3BlIChpdCBvZmZlcnM6IGAgK1xuXHRcdFx0XHRgJHttZXRhZGF0YS5zY29wZXNfc3VwcG9ydGVkLmpvaW4oXCIsIFwiKX0pLiBBc2sgeW91ciBIRVJFIGFkbWluaXN0cmF0b3Igd2hpY2ggYCArXG5cdFx0XHRcdFwic2NvcGUgeW91ciBPQXV0aCBhcHAgc2hvdWxkIHJlcXVlc3QuXCJcblx0XHQpO1xuXHR9XG5cblx0Y29uc3QgdmVyaWZpZXIgPSByYW5kb21TdHJpbmcoMzIpO1xuXHRjb25zdCBzdGF0ZSA9IHJhbmRvbVN0cmluZygxNik7XG5cblx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShWRVJJRklFUl9LRVksIHZlcmlmaWVyKTtcblx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbShTVEFURV9LRVksIHN0YXRlKTtcblxuXHQvLyBCdWlsdCB3aXRoIGluZGl2aWR1YWwgLnNldCgpIGNhbGxzLCBub3QgYW4gb2JqZWN0IGxpdGVyYWw6IHRoZSBPQXV0aCBzcGVjXG5cdC8vIG1hbmRhdGVzIHRoZXNlIGV4YWN0IHNuYWtlX2Nhc2UgcGFyYW1ldGVyIG5hbWVzLCBhbmQgYSBsaXRlcmFsIG9iamVjdFxuXHQvLyB3b3VsZCBtYWtlIGV2ZXJ5IGtleSBhIGxpbnRlciBuYW1pbmctY29udmVudGlvbiB2aW9sYXRpb24uXG5cdGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblx0cGFyYW1zLnNldChcInJlc3BvbnNlX3R5cGVcIiwgXCJjb2RlXCIpO1xuXHRwYXJhbXMuc2V0KFwiY2xpZW50X2lkXCIsIGNsaWVudElkKTtcblx0cGFyYW1zLnNldChcInJlZGlyZWN0X3VyaVwiLCByZWRpcmVjdFVyaSgpKTtcblx0cGFyYW1zLnNldChcInNjb3BlXCIsIFNDT1BFKTtcblx0cGFyYW1zLnNldChcInN0YXRlXCIsIHN0YXRlKTtcblx0cGFyYW1zLnNldChcImNvZGVfY2hhbGxlbmdlXCIsIGF3YWl0IGNoYWxsZW5nZUZvcih2ZXJpZmllcikpO1xuXHRwYXJhbXMuc2V0KFwiY29kZV9jaGFsbGVuZ2VfbWV0aG9kXCIsIFwiUzI1NlwiKTtcblxuXHR3aW5kb3cubG9jYXRpb24uYXNzaWduKGAke21ldGFkYXRhLmF1dGhvcml6YXRpb25fZW5kcG9pbnR9PyR7cGFyYW1zLnRvU3RyaW5nKCl9YCk7XG59XG5cbi8qKlxuICogSGFuZGxlIHRoZSByZWRpcmVjdCBiYWNrIGFuZCBleGNoYW5nZSB0aGUgY29kZSBmb3IgYW4gYWNjZXNzIHRva2VuLlxuICpcbiAqIFRoZSBzdG9yZWQgdmVyaWZpZXIgYW5kIHN0YXRlIGFyZSBjbGVhcmVkIGZpcnN0LCBhbmQgdGhlIHF1ZXJ5IHN0cmluZyBpc1xuICogc3RyaXBwZWQgZnJvbSB0aGUgYWRkcmVzcyBiYXIsIHNvIGEgcmVsb2FkIG9yIGEgc2hhcmVkIFVSTCBjYW5ub3QgcmVwbGF5IGFcbiAqIG9uZS10aW1lIGNvZGUuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wbGV0ZVNpZ25JbihiYXNlVXJsOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuXHRjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXHRjb25zdCB2ZXJpZmllciA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oVkVSSUZJRVJfS0VZKTtcblx0Y29uc3QgZXhwZWN0ZWRTdGF0ZSA9IHNlc3Npb25TdG9yYWdlLmdldEl0ZW0oU1RBVEVfS0VZKTtcblxuXHRzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKFZFUklGSUVSX0tFWSk7XG5cdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oU1RBVEVfS0VZKTtcblx0d2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKHt9LCBkb2N1bWVudC50aXRsZSwgcmVkaXJlY3RVcmkoKSk7XG5cblx0Y29uc3QgZmFpbHVyZSA9IHBhcmFtcy5nZXQoXCJlcnJvclwiKTtcblx0aWYgKGZhaWx1cmUgIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgT0F1dGhFcnJvcihwYXJhbXMuZ2V0KFwiZXJyb3JfZGVzY3JpcHRpb25cIikgPz8gYEF1dGhvcml6YXRpb24gZmFpbGVkOiAke2ZhaWx1cmV9YCwgZmFpbHVyZSk7XG5cdH1cblxuXHRjb25zdCBjb2RlID0gcGFyYW1zLmdldChcImNvZGVcIik7XG5cdGlmIChjb2RlID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3IE9BdXRoRXJyb3IoXCJUaGUgcmVkaXJlY3QgY2FycmllZCBubyBhdXRob3JpemF0aW9uIGNvZGUuXCIpO1xuXHR9XG5cblx0Ly8gQSBtaXNtYXRjaCBtZWFucyB0aGlzIHJlc3BvbnNlIGRvZXMgbm90IGJlbG9uZyB0byB0aGUgcmVxdWVzdCB0aGlzIHBhZ2Vcblx0Ly8gbWFkZSwgc28gdGhlIGNvZGUgbXVzdCBub3QgYmUgZXhjaGFuZ2VkLlxuXHRpZiAoZXhwZWN0ZWRTdGF0ZSA9PT0gbnVsbCB8fCBwYXJhbXMuZ2V0KFwic3RhdGVcIikgIT09IGV4cGVjdGVkU3RhdGUpIHtcblx0XHR0aHJvdyBuZXcgT0F1dGhFcnJvcihcblx0XHRcdFwiVGhlIHJldHVybmVkIHN0YXRlIGRpZCBub3QgbWF0Y2ggdGhlIHZhbHVlIHNlbnQuIFNpZ24taW4gd2FzIGFiYW5kb25lZCDigJQgXCIgK1xuXHRcdFx0XHRcInRoaXMgY2FuIGluZGljYXRlIGEgY3Jvc3Mtc2l0ZSByZXF1ZXN0IGZvcmdlcnkgYXR0ZW1wdC5cIlxuXHRcdCk7XG5cdH1cblxuXHRpZiAodmVyaWZpZXIgPT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgT0F1dGhFcnJvcihcblx0XHRcdFwiVGhlIFBLQ0UgdmVyaWZpZXIgd2FzIG1pc3NpbmcsIHNvIHRoZSBjb2RlIGNhbm5vdCBiZSBleGNoYW5nZWQuIFN0YXJ0IHNpZ24taW4gYWdhaW4uXCJcblx0XHQpO1xuXHR9XG5cblx0Y29uc3QgbWV0YWRhdGEgPSBhd2FpdCBkaXNjb3ZlcihiYXNlVXJsKTtcblx0Y29uc3QgYm9keSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcblx0Ym9keS5zZXQoXCJncmFudF90eXBlXCIsIFwiYXV0aG9yaXphdGlvbl9jb2RlXCIpO1xuXHRib2R5LnNldChcImNvZGVcIiwgY29kZSk7XG5cdGJvZHkuc2V0KFwicmVkaXJlY3RfdXJpXCIsIHJlZGlyZWN0VXJpKCkpO1xuXHRib2R5LnNldChcImNsaWVudF9pZFwiLCBjbGllbnRJZCk7XG5cdGJvZHkuc2V0KFwiY29kZV92ZXJpZmllclwiLCB2ZXJpZmllcik7XG5cblx0Y29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChtZXRhZGF0YS50b2tlbl9lbmRwb2ludCwge1xuXHRcdG1ldGhvZDogXCJQT1NUXCIsXG5cdFx0aGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiIH0sXG5cdFx0Ym9keTogYm9keS50b1N0cmluZygpXG5cdH0pO1xuXG5cdGNvbnN0IHBheWxvYWQgPSAoYXdhaXQgcmVzcG9uc2UuanNvbigpLmNhdGNoKCgpID0+ICh7fSkpKSBhcyB7XG5cdFx0YWNjZXNzX3Rva2VuPzogc3RyaW5nO1xuXHRcdGVycm9yPzogc3RyaW5nO1xuXHRcdGVycm9yX2Rlc2NyaXB0aW9uPzogc3RyaW5nO1xuXHR9O1xuXG5cdGlmICghcmVzcG9uc2Uub2sgfHwgcGF5bG9hZC5hY2Nlc3NfdG9rZW4gPT09IHVuZGVmaW5lZCkge1xuXHRcdGNvbnN0IGRldGFpbCA9IHBheWxvYWQuZXJyb3JfZGVzY3JpcHRpb24gPz8gcGF5bG9hZC5lcnJvciA/PyBgc3RhdHVzICR7cmVzcG9uc2Uuc3RhdHVzfWA7XG5cdFx0dGhyb3cgbmV3IE9BdXRoRXJyb3IoYFRva2VuIGV4Y2hhbmdlIGZhaWxlZDogJHtkZXRhaWx9YCwgcGF5bG9hZC5lcnJvcik7XG5cdH1cblxuXHRyZXR1cm4gcGF5bG9hZC5hY2Nlc3NfdG9rZW47XG59XG5cbi8qKiBBIFVSTC1zYWZlIHJhbmRvbSBzdHJpbmcsIHVzZWQgZm9yIGJvdGggdGhlIHZlcmlmaWVyIGFuZCB0aGUgc3RhdGUgdmFsdWUuICovXG5mdW5jdGlvbiByYW5kb21TdHJpbmcoYnl0ZXM6IG51bWJlcik6IHN0cmluZyB7XG5cdGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KGJ5dGVzKTtcblx0Y3J5cHRvLmdldFJhbmRvbVZhbHVlcyhidWZmZXIpO1xuXHRyZXR1cm4gYmFzZTY0VXJsKGJ1ZmZlcik7XG59XG5cbi8qKiBUaGUgUzI1NiBjaGFsbGVuZ2U6IGJhc2U2NHVybChTSEEtMjU2KHZlcmlmaWVyKSkuICovXG5hc3luYyBmdW5jdGlvbiBjaGFsbGVuZ2VGb3IodmVyaWZpZXI6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG5cdGNvbnN0IGRpZ2VzdCA9IGF3YWl0IGNyeXB0by5zdWJ0bGUuZGlnZXN0KFwiU0hBLTI1NlwiLCBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUodmVyaWZpZXIpKTtcblx0cmV0dXJuIGJhc2U2NFVybChuZXcgVWludDhBcnJheShkaWdlc3QpKTtcbn1cblxuLyoqIEJhc2U2NHVybCBwZXIgUkZDIDQ2NDggwqc1IOKAlCBubyBwYWRkaW5nLCBVUkwtc2FmZSBhbHBoYWJldC4gKi9cbmZ1bmN0aW9uIGJhc2U2NFVybChieXRlczogVWludDhBcnJheSk6IHN0cmluZyB7XG5cdGxldCBiaW5hcnkgPSBcIlwiO1xuXHRmb3IgKGNvbnN0IGJ5dGUgb2YgYnl0ZXMpIHtcblx0XHRiaW5hcnkgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlKTtcblx0fVxuXHRyZXR1cm4gYnRvYShiaW5hcnkpLnJlcGxhY2UoL1xcKy9ndSwgXCItXCIpLnJlcGxhY2UoL1xcLy9ndSwgXCJfXCIpLnJlcGxhY2UoL1s9XSskL3UsIFwiXCIpO1xufVxuIiwiaW1wb3J0IHsgQ29udGVudEFwaUVycm9yIH0gZnJvbSBcIi4vZXJyb3JzXCI7XG5pbXBvcnQgeyBHcmFwaFFsVHJhbnNwb3J0IH0gZnJvbSBcIi4vZ3JhcGhxbFwiO1xuaW1wb3J0IHR5cGUgeyBHcmFwaFFsVHJhbnNwb3J0T3B0aW9ucyB9IGZyb20gXCIuL2dyYXBocWxcIjtcbmltcG9ydCB0eXBlIHsgR3JvdXAsIEdyb3VwU3dpdGNoUmVzdWx0LCBVc2VyIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLyoqIENvbnN0cnVjdGlvbiBvcHRpb25zIGZvciB0aGUgdXNlci9ncm91cCBjbGllbnQuICovXG5leHBvcnQgdHlwZSBVc2VyQXBpT3B0aW9ucyA9IEdyYXBoUWxUcmFuc3BvcnRPcHRpb25zO1xuXG4vKiogRmllbGRzIHNlbGVjdGVkIGZvciBhIGdyb3VwLiBgR3JvdXBgIGhhcyBubyBgbmFtZWAg4oCUIGBpZGAgaXMgdGhlIHJlYWRhYmxlIG9uZS4gKi9cbmNvbnN0IEdST1VQX0ZJRUxEUyA9IFwidXVpZCBpZCBkZXNjcmlwdGlvblwiO1xuXG4vKiogRmllbGRzIHNlbGVjdGVkIGZvciBhIHVzZXIsIHdpdGhvdXQgdGhlaXIgZ3JvdXAgbWVtYmVyc2hpcHMuICovXG5jb25zdCBVU0VSX0ZJRUxEUyA9IFwidXVpZCBpZCBlbWFpbCBmaXJzdE5hbWUgbGFzdE5hbWUgYWN0aXZlXCI7XG5cbi8qKiBBIFJlbGF5LXN0eWxlIGNvbm5lY3Rpb24sIHRoZSBzaGFwZSBldmVyeSBsaXN0IGluIHRoaXMgQVBJIGNvbWVzIGJhY2sgYXMuICovXG5pbnRlcmZhY2UgQ29ubmVjdGlvbjxUPiB7XG5cdHRvdGFsQ291bnQ/OiBudW1iZXI7XG5cdGVkZ2VzOiB7IG5vZGU6IFQgfVtdO1xuXHRwYWdlSW5mbzogeyBoYXNOZXh0UGFnZTogYm9vbGVhbjsgZW5kQ3Vyc29yOiBzdHJpbmcgfCBudWxsIH07XG59XG5cbi8qKiBUaGUgcmF3IGdyb3VwIHNoYXBlLCB3aG9zZSBgdXNlcnNgIHN1Yi1jb25uZWN0aW9uIGNhcnJpZXMgdGhlIG1lbWJlciBjb3VudC4gKi9cbmludGVyZmFjZSBHcm91cE5vZGUge1xuXHR1dWlkOiBzdHJpbmc7XG5cdGlkOiBzdHJpbmc7XG5cdGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuXHR1c2Vycz86IHsgdG90YWxDb3VudD86IG51bWJlciB9O1xufVxuXG4vKiogVGhlIHJhdyB1c2VyIHNoYXBlLCB3aG9zZSBgZ3JvdXBzYCBzdWItY29ubmVjdGlvbiBjYXJyaWVzIG1lbWJlcnNoaXBzLiAqL1xuaW50ZXJmYWNlIFVzZXJOb2RlIHtcblx0dXVpZDogc3RyaW5nO1xuXHRpZDogc3RyaW5nO1xuXHRlbWFpbDogc3RyaW5nIHwgbnVsbDtcblx0Zmlyc3ROYW1lOiBzdHJpbmcgfCBudWxsO1xuXHRsYXN0TmFtZTogc3RyaW5nIHwgbnVsbDtcblx0YWN0aXZlOiBib29sZWFuO1xuXHRncm91cHM/OiBDb25uZWN0aW9uPEdyb3VwTm9kZT47XG59XG5cbi8qKiBGbGF0dGVuIGEgY29ubmVjdGlvbidzIGBlZGdlcyB7IG5vZGUgfWAgaW50byBhIHBsYWluIGFycmF5LiAqL1xuZnVuY3Rpb24gbm9kZXNPZjxUPihjb25uZWN0aW9uOiBDb25uZWN0aW9uPFQ+IHwgdW5kZWZpbmVkKTogVFtdIHtcblx0cmV0dXJuIChjb25uZWN0aW9uPy5lZGdlcyA/PyBbXSkubWFwKChlZGdlKSA9PiBlZGdlLm5vZGUpO1xufVxuXG4vKiogTWFwIGEgcmF3IGdyb3VwIG5vZGUgb250byB0aGUgZG9tYWluIHR5cGUsIGxpZnRpbmcgdGhlIG5lc3RlZCBtZW1iZXIgY291bnQuICovXG5mdW5jdGlvbiB0b0dyb3VwKG5vZGU6IEdyb3VwTm9kZSk6IEdyb3VwIHtcblx0cmV0dXJuIHtcblx0XHR1dWlkOiBub2RlLnV1aWQsXG5cdFx0aWQ6IG5vZGUuaWQsXG5cdFx0ZGVzY3JpcHRpb246IG5vZGUuZGVzY3JpcHRpb24sXG5cdFx0bWVtYmVyQ291bnQ6IG5vZGUudXNlcnM/LnRvdGFsQ291bnRcblx0fTtcbn1cblxuLyoqIE1hcCBhIHJhdyB1c2VyIG5vZGUgb250byB0aGUgZG9tYWluIHR5cGUsIGZsYXR0ZW5pbmcgaXRzIGdyb3VwIGNvbm5lY3Rpb24uICovXG5mdW5jdGlvbiB0b1VzZXIobm9kZTogVXNlck5vZGUpOiBVc2VyIHtcblx0cmV0dXJuIHtcblx0XHR1dWlkOiBub2RlLnV1aWQsXG5cdFx0aWQ6IG5vZGUuaWQsXG5cdFx0ZW1haWw6IG5vZGUuZW1haWwsXG5cdFx0Zmlyc3ROYW1lOiBub2RlLmZpcnN0TmFtZSxcblx0XHRsYXN0TmFtZTogbm9kZS5sYXN0TmFtZSxcblx0XHRhY3RpdmU6IG5vZGUuYWN0aXZlLFxuXHRcdGdyb3Vwczogbm9kZS5ncm91cHMgPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG5vZGVzT2Yobm9kZS5ncm91cHMpLm1hcCgoZ3JvdXApID0+IHRvR3JvdXAoZ3JvdXApKVxuXHR9O1xufVxuXG4vKipcbiAqIENsaWVudCBmb3IgdGhlIEhFUkUgVXNlciBhbmQgR3JvdXAgQVBJIChHcmFwaFFMIHF1ZXJpZXMgYW5kIG11dGF0aW9ucykuXG4gKlxuICogR3JvdXAgbWVtYmVyc2hpcCBpcyBhICoqc2V0Kio6IGEgdXNlciBjYW4gYmVsb25nIHRvIG1hbnkgZ3JvdXBzIGF0IG9uY2UsIGFuZFxuICogdGhlIEFQSSBleHBvc2VzIG9ubHkgYWRkIGFuZCByZW1vdmUuIFRoZXJlIGlzIG5vIGF0b21pYyBcIm1vdmVcIiBvciBcInNldCB0aGVcbiAqIGdyb3VwcyB0byBleGFjdGx5IHRoaXMgbGlzdFwiLCBzbyBhbnl0aGluZyB0aGF0IGxvb2tzIGxpa2UgbW92aW5nIGEgdXNlciBpc1xuICogY29tcG9zZWQgZnJvbSB0aG9zZSB0d28gcHJpbWl0aXZlcyDigJQgc2VlIGBzd2l0Y2hHcm91cGAuXG4gKlxuICogU2hhcmVzIGBHcmFwaFFsVHJhbnNwb3J0YCB3aXRoIGBDb250ZW50QXBpQ2xpZW50YCwgc28gYm90aCBzcGVhayB0byB0aGUgc2FtZVxuICogZW5kcG9pbnQgd2l0aCB0aGUgc2FtZSBjcmVkZW50aWFsIGFuZCB0aGUgc2FtZSBlcnJvciBoYW5kbGluZy5cbiAqL1xuZXhwb3J0IGNsYXNzIFVzZXJBcGlDbGllbnQge1xuXHRwcml2YXRlIHJlYWRvbmx5IHRyYW5zcG9ydDogR3JhcGhRbFRyYW5zcG9ydDtcblxuXHQvKiogQnVpbGQgYSBjbGllbnQgZm9yIG9uZSBvcmcsIHVzaW5nIHRoZSBnaXZlbiBjcmVkZW50aWFsIHByb3ZpZGVyLiAqL1xuXHRwdWJsaWMgY29uc3RydWN0b3Iob3B0aW9uczogVXNlckFwaU9wdGlvbnMpIHtcblx0XHR0aGlzLnRyYW5zcG9ydCA9IG5ldyBHcmFwaFFsVHJhbnNwb3J0KG9wdGlvbnMpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3QgZXZlcnkgZ3JvdXAgaW4gdGhlIG9yZywgZm9sbG93aW5nIHBhZ2luYXRpb24uXG5cdCAqXG5cdCAqIEVhY2ggZ3JvdXAncyBtZW1iZXIgY291bnQgY29tZXMgZnJvbSBpdHMgbmVzdGVkIGB1c2VycyB7IHRvdGFsQ291bnQgfWBcblx0ICogcmF0aGVyIHRoYW4gYSBzZWNvbmQgcm91bmQgb2YgcXVlcmllcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsaXN0R3JvdXBzKHBhZ2VTaXplID0gNTApOiBQcm9taXNlPEdyb3VwW10+IHtcblx0XHRjb25zdCBncm91cHM6IEdyb3VwW10gPSBbXTtcblx0XHRsZXQgYWZ0ZXI6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuXHRcdGxldCBoYXNOZXh0ID0gdHJ1ZTtcblxuXHRcdHdoaWxlIChoYXNOZXh0KSB7XG5cdFx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcdFwicXVlcnkoJGZpcnN0OiBJbnQhLCAkYWZ0ZXI6IFN0cmluZykgeyBncm91cHMoZmlyc3Q6ICRmaXJzdCwgYWZ0ZXI6ICRhZnRlcikgXCIgK1xuXHRcdFx0XHRgeyBlZGdlcyB7IG5vZGUgeyAke0dST1VQX0ZJRUxEU30gdXNlcnMgeyB0b3RhbENvdW50IH0gfSB9IHBhZ2VJbmZvIHsgaGFzTmV4dFBhZ2UgZW5kQ3Vyc29yIH0gfSB9YDtcblx0XHRcdC8vIEFubm90YXRlZCBleHBsaWNpdGx5OiBgYWZ0ZXJgIGlzIHJlYXNzaWduZWQgZnJvbSBgZGF0YWAgYmVsb3csIHNvXG5cdFx0XHQvLyBsZWF2aW5nIHRoaXMgaW5mZXJyZWQgbWFrZXMgdGhlIHR5cGUgY2lyY3VsYXIgKFRTNzAyMikuXG5cdFx0XHRjb25zdCBkYXRhOiB7IGdyb3VwczogQ29ubmVjdGlvbjxHcm91cE5vZGU+IH0gPSBhd2FpdCB0aGlzLnRyYW5zcG9ydC5yZXF1ZXN0PHtcblx0XHRcdFx0Z3JvdXBzOiBDb25uZWN0aW9uPEdyb3VwTm9kZT47XG5cdFx0XHR9PihxdWVyeSwgeyBmaXJzdDogcGFnZVNpemUsIGFmdGVyIH0pO1xuXG5cdFx0XHRmb3IgKGNvbnN0IG5vZGUgb2Ygbm9kZXNPZihkYXRhLmdyb3VwcykpIHtcblx0XHRcdFx0Z3JvdXBzLnB1c2godG9Hcm91cChub2RlKSk7XG5cdFx0XHR9XG5cdFx0XHRoYXNOZXh0ID0gZGF0YS5ncm91cHMucGFnZUluZm8uaGFzTmV4dFBhZ2U7XG5cdFx0XHRhZnRlciA9IGRhdGEuZ3JvdXBzLnBhZ2VJbmZvLmVuZEN1cnNvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gZ3JvdXBzO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3QgZXZlcnkgdXNlciBpbiB0aGUgb3JnLCBmb2xsb3dpbmcgcGFnaW5hdGlvbi5cblx0ICpcblx0ICogR3JvdXAgbWVtYmVyc2hpcHMgYXJlIGRlbGliZXJhdGVseSBub3QgZmV0Y2hlZCBoZXJlOiB0aGV5IHdvdWxkIGFkZCBhXG5cdCAqIG5lc3RlZCBjb25uZWN0aW9uIHBlciB1c2VyIGZvciBhIGxpc3QgdGhhdCBpcyBtb3N0bHkgdXNlZCB0byBwb3B1bGF0ZSBhXG5cdCAqIHBpY2tlci4gVXNlIGBnZXRVc2VyYCBmb3Igb25lIHVzZXIncyBtZW1iZXJzaGlwcy5cblx0ICovXG5cdHB1YmxpYyBhc3luYyBsaXN0VXNlcnMocGFnZVNpemUgPSA1MCk6IFByb21pc2U8VXNlcltdPiB7XG5cdFx0Y29uc3QgdXNlcnM6IFVzZXJbXSA9IFtdO1xuXHRcdGxldCBhZnRlcjogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG5cdFx0bGV0IGhhc05leHQgPSB0cnVlO1xuXG5cdFx0d2hpbGUgKGhhc05leHQpIHtcblx0XHRcdGNvbnN0IHF1ZXJ5ID1cblx0XHRcdFx0XCJxdWVyeSgkZmlyc3Q6IEludCEsICRhZnRlcjogU3RyaW5nKSB7IHVzZXJzKGZpcnN0OiAkZmlyc3QsIGFmdGVyOiAkYWZ0ZXIpIFwiICtcblx0XHRcdFx0YHsgZWRnZXMgeyBub2RlIHsgJHtVU0VSX0ZJRUxEU30gfSB9IHBhZ2VJbmZvIHsgaGFzTmV4dFBhZ2UgZW5kQ3Vyc29yIH0gfSB9YDtcblx0XHRcdC8vIFNhbWUgZXhwbGljaXQgYW5ub3RhdGlvbiBhcyBgbGlzdEdyb3Vwc2AsIGZvciB0aGUgc2FtZSByZWFzb24uXG5cdFx0XHRjb25zdCBkYXRhOiB7IHVzZXJzOiBDb25uZWN0aW9uPFVzZXJOb2RlPiB9ID0gYXdhaXQgdGhpcy50cmFuc3BvcnQucmVxdWVzdDx7XG5cdFx0XHRcdHVzZXJzOiBDb25uZWN0aW9uPFVzZXJOb2RlPjtcblx0XHRcdH0+KHF1ZXJ5LCB7IGZpcnN0OiBwYWdlU2l6ZSwgYWZ0ZXIgfSk7XG5cblx0XHRcdGZvciAoY29uc3Qgbm9kZSBvZiBub2Rlc09mKGRhdGEudXNlcnMpKSB7XG5cdFx0XHRcdHVzZXJzLnB1c2godG9Vc2VyKG5vZGUpKTtcblx0XHRcdH1cblx0XHRcdGhhc05leHQgPSBkYXRhLnVzZXJzLnBhZ2VJbmZvLmhhc05leHRQYWdlO1xuXHRcdFx0YWZ0ZXIgPSBkYXRhLnVzZXJzLnBhZ2VJbmZvLmVuZEN1cnNvcjtcblx0XHR9XG5cblx0XHRyZXR1cm4gdXNlcnM7XG5cdH1cblxuXHQvKipcblx0ICogUmVhZCBvbmUgdXNlciBhbmQgdGhlIGdyb3VwcyB0aGV5IGJlbG9uZyB0by4gTnVsbCBpZiBubyBzdWNoIHVzZXIgZXhpc3RzLlxuXHQgKlxuXHQgKiBgbG9va3VwQnlgIHBpY2tzIHdoaWNoIGFyZ3VtZW50IHRvIHNlbmQsIGJlY2F1c2UgdGhlIEFQSSBuYW1lcyB0aGVtXG5cdCAqIHNlcGFyYXRlbHkg4oCUIGB1c2VyKGlkOiDigKYpYCBmb3IgdGhlIHJlYWRhYmxlIGlkZW50aWZpZXIsIGB1c2VyKHV1aWQ6IOKApilgXG5cdCAqIGZvciB0aGUgc3lzdGVtIGlkIOKAlCByYXRoZXIgdGhhbiB0YWtpbmcgb25lIGdlbmVyaWMgYGlkZW50aWZpZXJgLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIGdldFVzZXIoaWRlbnRpZmllcjogc3RyaW5nLCBsb29rdXBCeTogXCJpZFwiIHwgXCJ1dWlkXCIgPSBcImlkXCIpOiBQcm9taXNlPFVzZXIgfCBudWxsPiB7XG5cdFx0Y29uc3QgcXVlcnkgPVxuXHRcdFx0YHF1ZXJ5KCR2YWx1ZTogSUQhKSB7IHVzZXIoJHtsb29rdXBCeX06ICR2YWx1ZSkgYCArXG5cdFx0XHRgeyAke1VTRVJfRklFTERTfSBncm91cHMgeyB0b3RhbENvdW50IGVkZ2VzIHsgbm9kZSB7ICR7R1JPVVBfRklFTERTfSB9IH0gfSB9IH1gO1xuXHRcdHRyeSB7XG5cdFx0XHRjb25zdCBkYXRhID0gYXdhaXQgdGhpcy50cmFuc3BvcnQucmVxdWVzdDx7IHVzZXI6IFVzZXJOb2RlIHwgbnVsbCB9PihxdWVyeSwgeyB2YWx1ZTogaWRlbnRpZmllciB9KTtcblx0XHRcdHJldHVybiBkYXRhLnVzZXIgPT09IG51bGwgPyBudWxsIDogdG9Vc2VyKGRhdGEudXNlcik7XG5cdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHQvLyBBIG1pc3NpbmcgdXNlciBjb21lcyBiYWNrIGFzIE5PVF9GT1VORCByYXRoZXIgdGhhbiBgdXNlcjogbnVsbGAsIHNvXG5cdFx0XHQvLyB0cmFuc2xhdGUgdGhhdCBvbmUgY2FzZSDigJQgXCJkb2VzIHRoaXMgdXNlciBleGlzdD9cIiBkZXNlcnZlcyBhblxuXHRcdFx0Ly8gYW5zd2VyLCBub3QgYW4gZXhjZXB0aW9uLiBFdmVyeSBvdGhlciBmYWlsdXJlIHN0aWxsIHRocm93cy5cblx0XHRcdGlmIChlcnIgaW5zdGFuY2VvZiBDb250ZW50QXBpRXJyb3IgJiYgZXJyLmNvZGUgPT09IFwiTk9UX0ZPVU5EXCIpIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXHR9XG5cblx0LyoqIEFkZCBvbmUgdXNlciB0byBvbmUgZ3JvdXAuIEJvdGggYXJndW1lbnRzIGFjY2VwdCBhbiBgaWRgIG9yIGEgYHV1aWRgLiAqL1xuXHRwdWJsaWMgYXN5bmMgYWRkVXNlclRvR3JvdXAodXNlcklkZW50aWZpZXI6IHN0cmluZywgZ3JvdXBJZGVudGlmaWVyOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcblx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcIm11dGF0aW9uIEFkZFVzZXJUb0dyb3VwKCR1c2VyOiBJRCEsICRncm91cDogSUQhKSBcIiArXG5cdFx0XHRgeyBhZGRVc2VyVG9Hcm91cCh1c2VySWRlbnRpZmllcjogJHVzZXIsIGdyb3VwSWRlbnRpZmllcjogJGdyb3VwKSB7ICR7VVNFUl9GSUVMRFN9IH0gfWA7XG5cdFx0Y29uc3QgZGF0YSA9IGF3YWl0IHRoaXMudHJhbnNwb3J0LnJlcXVlc3Q8eyBhZGRVc2VyVG9Hcm91cDogVXNlck5vZGUgfT4ocXVlcnksIHtcblx0XHRcdHVzZXI6IHVzZXJJZGVudGlmaWVyLFxuXHRcdFx0Z3JvdXA6IGdyb3VwSWRlbnRpZmllclxuXHRcdH0pO1xuXHRcdHJldHVybiB0b1VzZXIoZGF0YS5hZGRVc2VyVG9Hcm91cCk7XG5cdH1cblxuXHQvKiogUmVtb3ZlIG9uZSB1c2VyIGZyb20gb25lIGdyb3VwLiBCb3RoIGFyZ3VtZW50cyBhY2NlcHQgYW4gYGlkYCBvciBhIGB1dWlkYC4gKi9cblx0cHVibGljIGFzeW5jIHJlbW92ZVVzZXJGcm9tR3JvdXAodXNlcklkZW50aWZpZXI6IHN0cmluZywgZ3JvdXBJZGVudGlmaWVyOiBzdHJpbmcpOiBQcm9taXNlPFVzZXI+IHtcblx0XHRjb25zdCBxdWVyeSA9XG5cdFx0XHRcIm11dGF0aW9uIFJlbW92ZVVzZXJGcm9tR3JvdXAoJHVzZXI6IElEISwgJGdyb3VwOiBJRCEpIFwiICtcblx0XHRcdGB7IHJlbW92ZVVzZXJGcm9tR3JvdXAodXNlcklkZW50aWZpZXI6ICR1c2VyLCBncm91cElkZW50aWZpZXI6ICRncm91cCkgeyAke1VTRVJfRklFTERTfSB9IH1gO1xuXHRcdGNvbnN0IGRhdGEgPSBhd2FpdCB0aGlzLnRyYW5zcG9ydC5yZXF1ZXN0PHsgcmVtb3ZlVXNlckZyb21Hcm91cDogVXNlck5vZGUgfT4ocXVlcnksIHtcblx0XHRcdHVzZXI6IHVzZXJJZGVudGlmaWVyLFxuXHRcdFx0Z3JvdXA6IGdyb3VwSWRlbnRpZmllclxuXHRcdH0pO1xuXHRcdHJldHVybiB0b1VzZXIoZGF0YS5yZW1vdmVVc2VyRnJvbUdyb3VwKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBNb3ZlIGEgdXNlciBmcm9tIG9uZSBncm91cCB0byBhbm90aGVyLlxuXHQgKlxuXHQgKiBUaGlzIGlzIHRoZSBvcGVyYXRpb24gbW9zdCBwZW9wbGUgcGljdHVyZSBhcyBhIHNpbmdsZSBjYWxsLCBzbyBpdCBpcyB3b3J0aFxuXHQgKiBiZWluZyBleHBsaWNpdCB0aGF0IHRoZSBBUEkgaGFzIG5vIHN1Y2ggY2FsbDogdGhlcmUgaXMgbm9cblx0ICogYG1vdmVVc2VyVG9Hcm91cGAsIGBjaGFuZ2VVc2VyR3JvdXBgIG9yIGBzZXRVc2VyR3JvdXBgLCBvbmx5IGFkZCBhbmRcblx0ICogcmVtb3ZlLiBBIHN3aXRjaCBpcyB0aGVyZWZvcmUgKip0d28gbXV0YXRpb25zIGFuZCBpcyBub3QgYXRvbWljKiog4oCUIHRoZXJlXG5cdCAqIGlzIG5vIHRyYW5zYWN0aW9uIHRvIHJvbGwgYmFjaywgdW5saWtlIHRoZSBjb250ZW50IEFQSSdzIGJ1bGsgd3JpdGVzLlxuXHQgKlxuXHQgKiBUaGUgb3JkZXIgaXMgZGVsaWJlcmF0ZTogKiphZGQgZmlyc3QsIHRoZW4gcmVtb3ZlLioqIElmIHRoZSBzZWNvbmQgc3RlcFxuXHQgKiBmYWlscywgdGhlIHVzZXIgaXMgaW4gYm90aCBncm91cHMg4oCUIGhvbGRpbmcgc2xpZ2h0bHkgbW9yZSBhY2Nlc3MgdGhhblxuXHQgKiBpbnRlbmRlZCwgYW5kIG9uZSByZXRyaWVkIHJlbW92ZSBhd2F5IGZyb20gY29ycmVjdC4gUmVtb3ZpbmcgZmlyc3Qgd291bGRcblx0ICogZmFpbCB0aGUgb3RoZXIgd2F5LCBsZWF2aW5nIHRoZSB1c2VyIGluIG5laXRoZXIgZ3JvdXAgd2l0aCBsZXNzIGFjY2Vzc1xuXHQgKiB0aGFuIHRoZXkgc3RhcnRlZCB3aXRoLCB3aGljaCBpbiBhIGRlc2t0b3AgY29udGFpbmVyIG1lYW5zIGFwcHNcblx0ICogZGlzYXBwZWFyaW5nIGZvciBzb21lb25lIHdobyBkaWQgbm90aGluZyB3cm9uZy4gT3Zlci1wZXJtaXNzaW9uZWQgZm9yIGFcblx0ICogbW9tZW50IGJlYXRzIGxvY2tlZCBvdXQsIGFuZCBgcGFydGlhbEZhaWx1cmVgIHJlcG9ydHMgaXQgbG91ZGx5IGVpdGhlclxuXHQgKiB3YXkuXG5cdCAqIEB0aHJvd3Mge0NvbnRlbnRBcGlFcnJvcn0gaWYgdGhlIGFkZCBmYWlscywgaW4gd2hpY2ggY2FzZSBub3RoaW5nIGNoYW5nZWQuXG5cdCAqIEB0aHJvd3Mge0Vycm9yfSBpZiB0aGUgdHdvIGdyb3VwcyBhcmUgdGhlIHNhbWUsIHdoaWNoIHdvdWxkIG90aGVyd2lzZSBhZGRcblx0ICogYW5kIHRoZW4gaW1tZWRpYXRlbHkgcmVtb3ZlIHRoZSB1c2VyLCBsZWF2aW5nIHRoZW0gb3V0c2lkZSB0aGUgZ3JvdXAgdGhleVxuXHQgKiBzdGFydGVkIGluLlxuXHQgKi9cblx0cHVibGljIGFzeW5jIHN3aXRjaEdyb3VwKFxuXHRcdHVzZXJJZGVudGlmaWVyOiBzdHJpbmcsXG5cdFx0ZnJvbUdyb3VwSWRlbnRpZmllcjogc3RyaW5nLFxuXHRcdHRvR3JvdXBJZGVudGlmaWVyOiBzdHJpbmdcblx0KTogUHJvbWlzZTxHcm91cFN3aXRjaFJlc3VsdD4ge1xuXHRcdGlmIChmcm9tR3JvdXBJZGVudGlmaWVyID09PSB0b0dyb3VwSWRlbnRpZmllcikge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcIlRoZSBzb3VyY2UgYW5kIHRhcmdldCBncm91cHMgYXJlIHRoZSBzYW1lLiBTd2l0Y2hpbmcgd291bGQgYWRkIHRoZSB1c2VyIHRvIFwiICtcblx0XHRcdFx0XHRcInRoZSBncm91cCBhbmQgdGhlbiByZW1vdmUgdGhlbSBmcm9tIGl0LCBsZWF2aW5nIHRoZW0gb3V0c2lkZSBpdC5cIlxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHQvLyBTdGVwIG9uZS4gQWxsb3dlZCB0byB0aHJvdzogaWYgdGhpcyBmYWlscywgbm90aGluZyBoYXMgY2hhbmdlZCB5ZXQgYW5kXG5cdFx0Ly8gdGhlIGNhbGxlcidzIGVycm9yIHBhdGggaXMgdGhlIGhvbmVzdCBvdXRjb21lLlxuXHRcdGNvbnN0IGFkZGVkID0gYXdhaXQgdGhpcy5hZGRVc2VyVG9Hcm91cCh1c2VySWRlbnRpZmllciwgdG9Hcm91cElkZW50aWZpZXIpO1xuXG5cdFx0Ly8gU3RlcCB0d28uIEEgZmFpbHVyZSBoZXJlIG11c3QgTk9UIHByb3BhZ2F0ZSBhcyBhIHBsYWluIGVycm9yOiB0aGUgYWRkXG5cdFx0Ly8gYWxyZWFkeSBoYXBwZW5lZCwgc28gdGhlIGNhbGxlciBuZWVkcyBhIHJlc3VsdCBkZXNjcmliaW5nIGFcblx0XHQvLyBoYWxmLWFwcGxpZWQgc3dpdGNoIHJhdGhlciB0aGFuIGFuIGV4Y2VwdGlvbiBpbXBseWluZyBub3RoaW5nIGRpZC5cblx0XHR0cnkge1xuXHRcdFx0Y29uc3QgcmVtb3ZlZCA9IGF3YWl0IHRoaXMucmVtb3ZlVXNlckZyb21Hcm91cCh1c2VySWRlbnRpZmllciwgZnJvbUdyb3VwSWRlbnRpZmllcik7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR1c2VyOiByZW1vdmVkLFxuXHRcdFx0XHRhZGRlZFRvOiB0b0dyb3VwSWRlbnRpZmllcixcblx0XHRcdFx0cmVtb3ZlZEZyb206IGZyb21Hcm91cElkZW50aWZpZXIsXG5cdFx0XHRcdGFkZGVkOiB0cnVlLFxuXHRcdFx0XHRyZW1vdmVkOiB0cnVlXG5cdFx0XHR9O1xuXHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dXNlcjogYWRkZWQsXG5cdFx0XHRcdGFkZGVkVG86IHRvR3JvdXBJZGVudGlmaWVyLFxuXHRcdFx0XHRyZW1vdmVkRnJvbTogZnJvbUdyb3VwSWRlbnRpZmllcixcblx0XHRcdFx0YWRkZWQ6IHRydWUsXG5cdFx0XHRcdHJlbW92ZWQ6IGZhbHNlLFxuXHRcdFx0XHRwYXJ0aWFsRmFpbHVyZTogZXJyIGluc3RhbmNlb2YgQ29udGVudEFwaUVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKVxuXHRcdFx0fTtcblx0XHR9XG5cdH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0aWYgKCEobW9kdWxlSWQgaW4gX193ZWJwYWNrX21vZHVsZXNfXykpIHtcblx0XHRkZWxldGUgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBCZWFyZXJUb2tlbkF1dGggfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NyYy9hdXRoXCI7XG5pbXBvcnQgeyBDb250ZW50QXBpQ2xpZW50LCBFTkRQT0lOVF9QQVRILCB0b0NvbnRlbnRVcGRhdGUgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NyYy9jb250ZW50LWFwaVwiO1xuaW1wb3J0IHsgQ29udGVudEFwaUVycm9yIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zcmMvZXJyb3JzXCI7XG5pbXBvcnQgeyBjb250ZW50Tm9kZVRvRmRjM0FwcGxpY2F0aW9uLCBmZGMzVG9Db250ZW50SW5wdXQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NyYy9mZGMzLW1hcHBpbmdcIjtcbmltcG9ydCB7XG5cdGJlZ2luU2lnbkluLFxuXHRjb21wbGV0ZVNpZ25Jbixcblx0aGFzQXV0aG9yaXphdGlvblJlc3BvbnNlLFxuXHRPQXV0aEVycm9yLFxuXHRyZWRpcmVjdFVyaVxufSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NyYy9vYXV0aC1wa2NlXCI7XG5pbXBvcnQgdHlwZSB7XG5cdEFwcERpcmVjdG9yeSxcblx0Q29udGVudE5vZGUsXG5cdENvbnRlbnRVcGRhdGUsXG5cdEZkYzNBcHBsaWNhdGlvbixcblx0R3JvdXAsXG5cdFVzZXJcbn0gZnJvbSBcIi4uLy4uL3NoYXJlZC9zcmMvdHlwZXNcIjtcbmltcG9ydCB7IFVzZXJBcGlDbGllbnQgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NyYy91c2VyLWFwaVwiO1xuXG4vKipcbiAqIEluamVjdGVkIGF0IGJ1aWxkIHRpbWUgYnkgd2VicGFjayBmcm9tIGAuZW52YCDigJQgc2VlIGAuZW52LmV4YW1wbGVgLlxuICpcbiAqIE5laXRoZXIgdmFsdWUgaXMgYSBzZWNyZXQuIFRoZSBjbGllbnQgaWQgaXMgcHVibGljIGJ5IGRlc2lnbiwgYW5kIHRoZSBVSSBoYXNcbiAqIG5vIHRva2VuIHVudGlsIHRoZSB1c2VyIHNpZ25zIGluIHRocm91Z2ggSEVSRSwgc28gbm90aGluZyBzZW5zaXRpdmUgaXNcbiAqIHJlYWRhYmxlIGluIHRoaXMgYnVuZGxlLlxuICpcbiAqIGBIRVJFX0FQSV9KV1RgIGlzIGRlbGliZXJhdGVseSBOT1QgaW5qZWN0ZWQgaGVyZSBldmVuIHRob3VnaCBpdCBpcyBhbHNvIHJlYWRcbiAqIGZyb20gYC5lbnZgOiBpdCBpcyBhIHJlYWwgY3JlZGVudGlhbCwgdW5saWtlIHRoZXNlIHR3bywgYW5kIHRoaXMgYnVuZGxlIGlzXG4gKiByZWFkYWJsZSBieSBhbnlvbmUgd2hvIGxvYWRzIHRoZSBwYWdlLiBUaGUgSldUIHNpZ24taW4gcGF0aCBiZWxvdyB0YWtlcyB0aGVcbiAqIHRva2VuIGZyb20gYSBmaWVsZCB0aGUgdXNlciBwYXN0ZXMgaW50byBhdCBydW50aW1lIGluc3RlYWQuXG4gKi9cbmNvbnN0IEJBU0VfVVJMID0gcHJvY2Vzcy5lbnYuQkFTRV9VUkwgPz8gXCJcIjtcbmNvbnN0IENMSUVOVF9JRCA9IHByb2Nlc3MuZW52LkhFUkVfT0FVVEhfQ0xJRU5UX0lEID8/IFwiXCI7XG5cbi8qKiBUaGUgZWRpdGFibGUgZmllbGRzLCByZWFkIHN0cmFpZ2h0IG9mZiB0aGUgZm9ybS4gKi9cbmludGVyZmFjZSBGb3JtU3RhdGUge1xuXHRjb250ZW50SWQ6IHN0cmluZztcblx0bmFtZTogc3RyaW5nO1xuXHR0eXBlOiBcIm5hdGl2ZVwiIHwgXCJ3ZWJcIjtcblx0dXJsOiBzdHJpbmc7XG5cdHBhdGg6IHN0cmluZztcblx0aWNvbjogc3RyaW5nO1xuXHRhY3RpdmU6IGJvb2xlYW47XG5cdGZlYXR1cmVkOiBib29sZWFuO1xufVxuXG4vKiogV2lyZSB1cCB0aGUgY29uc29sZTogc2lnbi1pbiBzdGF0ZSwgdGhlIENSVUQgZm9ybSwgYW5kIHRoZSBhY3Rpdml0eSBsb2cuICovXG5mdW5jdGlvbiBpbml0aWFsaXplRE9NKCk6IHZvaWQge1xuXHQvLyBIZWxkIGluIG1lbW9yeSBvbmx5LCBzbyBjbG9zaW5nIG9yIHJlbG9hZGluZyB0aGUgcGFnZSBlbmRzIHRoZSBzZXNzaW9uLlxuXHQvLyBUaGVyZSBpcyBubyByZWZyZXNoIGdyYW50LCBzbyBhbiBleHBpcmVkIHRva2VuIG1lYW5zIHNpZ25pbmcgaW4gYWdhaW4uXG5cdC8vIEJvdGggY2xpZW50cyBzaGFyZSB0aGUgb25lIGNyZWRlbnRpYWwgYW5kIHRoZSBvbmUgZW5kcG9pbnQ7IHRoZXkgYXJlXG5cdC8vIHNlcGFyYXRlIG9ubHkgYmVjYXVzZSB0aGV5IGNvdmVyIHR3byBkaWZmZXJlbnQgcGFydHMgb2YgdGhlIHNjaGVtYS5cblx0bGV0IGNsaWVudDogQ29udGVudEFwaUNsaWVudCB8IHVuZGVmaW5lZDtcblx0bGV0IHVzZXJDbGllbnQ6IFVzZXJBcGlDbGllbnQgfCB1bmRlZmluZWQ7XG5cblx0Ly8gVGhlIGRpcmVjdG9yeSBpcyBmZXRjaGVkIG9uY2UgcGVyIHNpZ24taW4gYW5kIGNhY2hlZCwgYmVjYXVzZSB0aGUgZ3JvdXBcblx0Ly8gcGlja2VycyBhcmUgcmVidWlsdCBvbiBldmVyeSBzZWxlY3Rpb24gYW5kIG11dGF0aW9uLlxuXHRsZXQgZ3JvdXBzOiBHcm91cFtdID0gW107XG5cdGxldCB1c2VyczogVXNlcltdID0gW107XG5cdC8qKiBUaGUgc2VsZWN0ZWQgdXNlcidzIG1lbWJlcnNoaXBzLCByZWZyZXNoZWQgYWZ0ZXIgZXZlcnkgbXV0YXRpb24uICovXG5cdGxldCBzZWxlY3RlZEdyb3VwczogR3JvdXBbXSA9IFtdO1xuXG5cdGNvbnN0IGxvZ0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXCIjbG9nXCIpO1xuXG5cdC8vIC0tLSBzaWduLWluIHN0YXRlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGNvbnN0IEFDVElPTl9JRFMgPSBbXG5cdFx0XCIjYnRuTGlzdFwiLFxuXHRcdFwiI2J0bkV4cG9ydFwiLFxuXHRcdFwiI2J0bkNyZWF0ZVwiLFxuXHRcdFwiI2J0blZhbGlkYXRlXCIsXG5cdFx0XCIjYnRuVXBkYXRlXCIsXG5cdFx0XCIjYnRuRGVsZXRlXCIsXG5cdFx0XCIjYnRuTG9hZERpcmVjdG9yeVwiXG5cdF07XG5cblx0LyoqXG5cdCAqIENvbnRyb2xzIHRoYXQgbmVlZCBtb3JlIHRoYW4gYSBjcmVkZW50aWFsOiB0aGV5IHN0YXkgZGlzYWJsZWQgdW50aWwgdGhlXG5cdCAqIHVzZXIgYW5kIGdyb3VwIGxpc3RzIGhhdmUgYWN0dWFsbHkgYmVlbiBmZXRjaGVkLCBiZWNhdXNlIGFuIGVtcHR5IHBpY2tlclxuXHQgKiBpcyB3b3JzZSB0aGFuIGEgdmlzaWJseSBpbmFjdGl2ZSBvbmUuXG5cdCAqL1xuXHRjb25zdCBESVJFQ1RPUllfQ09OVFJPTF9JRFMgPSBbXG5cdFx0XCIjZi11c2VyXCIsXG5cdFx0XCIjZi1hZGQtZ3JvdXBcIixcblx0XHRcIiNmLWZyb20tZ3JvdXBcIixcblx0XHRcIiNmLXRvLWdyb3VwXCIsXG5cdFx0XCIjYnRuQWRkVG9Hcm91cFwiLFxuXHRcdFwiI2J0blN3aXRjaEdyb3VwXCJcblx0XTtcblxuXHQvKipcblx0ICogYGF1dGhDb25maWdJZGAgb25seSBhcHBsaWVzIHRvIGEgcGFzdGVkIEFQSSBKV1Qg4oCUIG5ldmVyIHBhc3MgaXQgZm9yIGFuXG5cdCAqIE9BdXRoIHRva2VuLCB3aGljaCBIRVJFIHZhbGlkYXRlcyBpdHNlbGYgKHNlZSBgQmVhcmVyVG9rZW5BdXRoYCkuXG5cdCAqL1xuXHRmdW5jdGlvbiBzZXRTaWduZWRJbih0b2tlbjogc3RyaW5nIHwgdW5kZWZpbmVkLCBhdXRoQ29uZmlnSWQ/OiBzdHJpbmcpOiB2b2lkIHtcblx0XHRjb25zdCBhdXRoID0gdG9rZW4gPT09IHVuZGVmaW5lZCA/IHVuZGVmaW5lZCA6IG5ldyBCZWFyZXJUb2tlbkF1dGgodG9rZW4sIGF1dGhDb25maWdJZCk7XG5cdFx0Y2xpZW50ID0gYXV0aCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbmV3IENvbnRlbnRBcGlDbGllbnQoeyBiYXNlVXJsOiBCQVNFX1VSTCwgYXV0aCB9KTtcblx0XHR1c2VyQ2xpZW50ID0gYXV0aCA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogbmV3IFVzZXJBcGlDbGllbnQoeyBiYXNlVXJsOiBCQVNFX1VSTCwgYXV0aCB9KTtcblxuXHRcdGZvciAoY29uc3QgaWQgb2YgQUNUSU9OX0lEUykge1xuXHRcdFx0Y29uc3QgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MQnV0dG9uRWxlbWVudD4oaWQpO1xuXHRcdFx0aWYgKGJ1dHRvbiAhPT0gbnVsbCkge1xuXHRcdFx0XHRidXR0b24uZGlzYWJsZWQgPSB0b2tlbiA9PT0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH1cblx0XHQvLyBTaWduaW5nIG91dCBtdXN0IGFsc28gZHJvcCB0aGUgY2FjaGVkIGRpcmVjdG9yeTogaXQgYmVsb25ncyB0byB0aGVcblx0XHQvLyBjcmVkZW50aWFsIHRoYXQgZmV0Y2hlZCBpdCwgYW5kIGxlYXZpbmcgc3RhbGUgbmFtZXMgaW4gdGhlIHBpY2tlcnNcblx0XHQvLyB3b3VsZCBpbXBseSB0aGUgcGFnZSBzdGlsbCBoYXMgYWNjZXNzIHRvIHRoZW0uXG5cdFx0Z3JvdXBzID0gW107XG5cdFx0dXNlcnMgPSBbXTtcblx0XHRzZWxlY3RlZEdyb3VwcyA9IFtdO1xuXHRcdHNldERpcmVjdG9yeUNvbnRyb2xzRW5hYmxlZChmYWxzZSk7XG5cdFx0Y2xlYXJEaXJlY3RvcnlQaWNrZXJzKCk7XG5cdFx0cmVuZGVyTWVtYmVyc2hpcHMoKTtcblxuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lnbkluQ29udHJvbHNcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIiwgdG9rZW4gIT09IHVuZGVmaW5lZCk7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhdXRoU3RhdGVcIik/LmNsYXNzTGlzdC50b2dnbGUoXCJoaWRkZW5cIiwgdG9rZW4gPT09IHVuZGVmaW5lZCk7XG5cdH1cblxuXHQvKiogUmVwb3J0IGFuIE9BdXRoIGZhaWx1cmUgaW4gdGhlIHRyYW5zY3JpcHQgYW5kIHJldHVybiB0byBzaWduZWQgb3V0LiAqL1xuXHRmdW5jdGlvbiBmYWlsU2lnbkluKGVycjogdW5rbm93bik6IHZvaWQge1xuXHRcdG5vdGljZShlcnIgaW5zdGFuY2VvZiBPQXV0aEVycm9yID8gZXJyLm1lc3NhZ2UgOiBTdHJpbmcoZXJyKSwgXCJlcnJvclwiKTtcblx0XHRzZXRTaWduZWRJbih1bmRlZmluZWQpO1xuXHR9XG5cblx0Ly8gLS0tIHJlYWRpbmcgYW5kIGJ1aWxkaW5nIGZyb20gdGhlIGZvcm0gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqIFJlYWQgYSB0cmltbWVkIGlucHV0IHZhbHVlIGJ5IHNlbGVjdG9yLiAqL1xuXHRmdW5jdGlvbiB0ZXh0KGlkOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdHJldHVybiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihpZCk/LnZhbHVlID8/IFwiXCIpLnRyaW0oKTtcblx0fVxuXG5cdC8qKiBSZWFkIGEgY2hlY2tib3gncyBjaGVja2VkIHN0YXRlIGJ5IHNlbGVjdG9yLiAqL1xuXHRmdW5jdGlvbiBjaGVja2VkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihpZCk/LmNoZWNrZWQgPz8gZmFsc2U7XG5cdH1cblxuXHQvKiogU25hcHNob3QgdGhlIGZvcm0gaW50byBhIGBGb3JtU3RhdGVgLiAqL1xuXHRmdW5jdGlvbiByZWFkRm9ybSgpOiBGb3JtU3RhdGUge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb250ZW50SWQ6IHRleHQoXCIjZi1jb250ZW50SWRcIiksXG5cdFx0XHRuYW1lOiB0ZXh0KFwiI2YtbmFtZVwiKSxcblx0XHRcdHR5cGU6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2YtdHlwZVwiKT8udmFsdWUgPT09IFwibmF0aXZlXCIgPyBcIm5hdGl2ZVwiIDogXCJ3ZWJcIixcblx0XHRcdHVybDogdGV4dChcIiNmLXVybFwiKSxcblx0XHRcdHBhdGg6IHRleHQoXCIjZi1wYXRoXCIpLFxuXHRcdFx0aWNvbjogdGV4dChcIiNmLWljb25cIiksXG5cdFx0XHRhY3RpdmU6IGNoZWNrZWQoXCIjZi1hY3RpdmVcIiksXG5cdFx0XHRmZWF0dXJlZDogY2hlY2tlZChcIiNmLWZlYXR1cmVkXCIpXG5cdFx0fTtcblx0fVxuXG5cdC8qKiBUdXJuIHRoZSBmb3JtIGludG8gYW4gRkRDMyBhcHBsaWNhdGlvbiByZWNvcmQgZm9yIGNyZWF0ZS4gKi9cblx0ZnVuY3Rpb24gYnVpbGRBcHAoZm9ybTogRm9ybVN0YXRlKTogRmRjM0FwcGxpY2F0aW9uIHtcblx0XHRjb25zdCBuYW1lID0gZm9ybS5uYW1lID09PSBcIlwiID8gZm9ybS5jb250ZW50SWQgOiBmb3JtLm5hbWU7XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFwcElkOiBmb3JtLmNvbnRlbnRJZCxcblx0XHRcdG5hbWUsXG5cdFx0XHR0aXRsZTogbmFtZSxcblx0XHRcdHR5cGU6IGZvcm0udHlwZSxcblx0XHRcdGRldGFpbHM6IGZvcm0udHlwZSA9PT0gXCJ3ZWJcIiA/IHsgdXJsOiBmb3JtLnVybCB9IDogeyBwYXRoOiBmb3JtLnBhdGggfSxcblx0XHRcdGljb25zOiBmb3JtLmljb24gPT09IFwiXCIgPyB1bmRlZmluZWQgOiBbeyBzcmM6IGZvcm0uaWNvbiB9XSxcblx0XHRcdGhvc3RNYW5pZmVzdHM6IHsgaGVyZTogeyBhY3RpdmU6IGZvcm0uYWN0aXZlLCBmZWF0dXJlZDogZm9ybS5mZWF0dXJlZCB9IH1cblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCAqIEJ1aWxkIGEgcGFydGlhbCB1cGRhdGUgZnJvbSB0aGUgZm9ybS4gVGhlIGZvcm0gaGFzIG5vIGFjY2VzcyBlZGl0b3IsIHNvXG5cdCAqIGFjY2VzcyBpcyBsZWZ0IG91dCBhbmQgYW4gYXBwJ3MgZXhpc3RpbmcgYXNzaWdubWVudHMgc3RheSB1bnRvdWNoZWQuXG5cdCAqL1xuXHRmdW5jdGlvbiBidWlsZFVwZGF0ZShmb3JtOiBGb3JtU3RhdGUpOiBDb250ZW50VXBkYXRlIHtcblx0XHRyZXR1cm4gdG9Db250ZW50VXBkYXRlKGZkYzNUb0NvbnRlbnRJbnB1dChidWlsZEFwcChmb3JtKSkpO1xuXHR9XG5cblx0LyoqIEZpbGwgdGhlIGZvcm0gZnJvbSBhIGZldGNoZWQgYXBwLCBzbyBWYWxpZGF0ZSBsb2FkcyByZWFsIHZhbHVlcyB0byBlZGl0LiAqL1xuXHRmdW5jdGlvbiBwb3B1bGF0ZUZvcm0obm9kZTogQ29udGVudE5vZGUpOiB2b2lkIHtcblx0XHRzZXRWYWx1ZShcIiNmLWNvbnRlbnRJZFwiLCBub2RlLmlkKTtcblx0XHRzZXRWYWx1ZShcIiNmLW5hbWVcIiwgbm9kZS5uYW1lKTtcblx0XHRjb25zdCB0eXBlID0gbm9kZS50eXBlID09PSBcIkRFU0tUT1BcIiA/IFwibmF0aXZlXCIgOiBcIndlYlwiO1xuXHRcdHNldFZhbHVlKFwiI2YtdHlwZVwiLCB0eXBlKTtcblx0XHRhcHBseVR5cGVWaXNpYmlsaXR5KCk7XG5cdFx0c2V0VmFsdWUoXCIjZi11cmxcIiwgbm9kZS51cmwgPz8gbm9kZS51cmxzPy5bMF0gPz8gXCJcIik7XG5cdFx0c2V0VmFsdWUoXCIjZi1wYXRoXCIsIG5vZGUuZGVza3RvcFBhdGggPz8gXCJcIik7XG5cdFx0c2V0VmFsdWUoXCIjZi1pY29uXCIsIG5vZGUuaWNvbiA/PyBcIlwiKTtcblx0XHRzZXRDaGVja2VkKFwiI2YtYWN0aXZlXCIsIG5vZGUuYWN0aXZlKTtcblx0XHRzZXRDaGVja2VkKFwiI2YtZmVhdHVyZWRcIiwgbm9kZS5mZWF0dXJlZCA/PyBmYWxzZSk7XG5cdH1cblxuXHQvKiogU2V0IGFuIGlucHV0IG9yIHNlbGVjdCdzIHZhbHVlIGJ5IHNlbGVjdG9yLCBpZiBpdCBleGlzdHMuICovXG5cdGZ1bmN0aW9uIHNldFZhbHVlKGlkOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcblx0XHRjb25zdCBmaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTElucHV0RWxlbWVudCB8IEhUTUxTZWxlY3RFbGVtZW50PihpZCk7XG5cdFx0aWYgKGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRmaWVsZC52YWx1ZSA9IHZhbHVlO1xuXHRcdH1cblx0fVxuXG5cdC8qKiBTZXQgYSBjaGVja2JveCdzIGNoZWNrZWQgc3RhdGUgYnkgc2VsZWN0b3IsIGlmIGl0IGV4aXN0cy4gKi9cblx0ZnVuY3Rpb24gc2V0Q2hlY2tlZChpZDogc3RyaW5nLCB2YWx1ZTogYm9vbGVhbik6IHZvaWQge1xuXHRcdGNvbnN0IGZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihpZCk7XG5cdFx0aWYgKGZpZWxkICE9PSBudWxsKSB7XG5cdFx0XHRmaWVsZC5jaGVja2VkID0gdmFsdWU7XG5cdFx0fVxuXHR9XG5cblx0Ly8gLS0tIHVzZXIgYW5kIGdyb3VwIG1hbmFnZW1lbnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqIEVuYWJsZSBvciBkaXNhYmxlIHRoZSBjb250cm9scyB0aGF0IG5lZWQgYSBmZXRjaGVkIGRpcmVjdG9yeS4gKi9cblx0ZnVuY3Rpb24gc2V0RGlyZWN0b3J5Q29udHJvbHNFbmFibGVkKGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcblx0XHRmb3IgKGNvbnN0IGlkIG9mIERJUkVDVE9SWV9DT05UUk9MX0lEUykge1xuXHRcdFx0Y29uc3QgY29udHJvbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MU2VsZWN0RWxlbWVudD4oaWQpO1xuXHRcdFx0aWYgKGNvbnRyb2wgIT09IG51bGwpIHtcblx0XHRcdFx0Y29udHJvbC5kaXNhYmxlZCA9ICFlbmFibGVkO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXNldCBldmVyeSBkaXJlY3RvcnktYmFja2VkIHBpY2tlciB0byBpdHMgcGxhY2Vob2xkZXIuXG5cdCAqXG5cdCAqIFBsYWNlaG9sZGVycyByYXRoZXIgdGhhbiBlbXB0eSBzZWxlY3RzOiBhIGRpc2FibGVkIHNlbGVjdCB3aXRoIG5vIG9wdGlvbnNcblx0ICogcmVuZGVycyBhcyBhIGJsYW5rIGJveCB3aXRoIG5vIGRyb3Bkb3duIGFycm93LCB3aGljaCByZWFkcyBhcyBicm9rZW5cblx0ICogcmF0aGVyIHRoYW4gYXMgd2FpdGluZyBmb3IgZGF0YS5cblx0ICovXG5cdGZ1bmN0aW9uIGNsZWFyRGlyZWN0b3J5UGlja2VycygpOiB2b2lkIHtcblx0XHRmaWxsU2VsZWN0KFwiI2YtdXNlclwiLCBbXSwgXCJMb2FkIHRoZSBkaXJlY3RvcnkgZmlyc3RcIik7XG5cdFx0ZmlsbFNlbGVjdChcIiNmLWFkZC1ncm91cFwiLCBbXSwgXCJMb2FkIHRoZSBkaXJlY3RvcnkgZmlyc3RcIik7XG5cdFx0ZmlsbFNlbGVjdChcIiNmLWZyb20tZ3JvdXBcIiwgW10sIFwiU2VsZWN0IGEgdXNlciBmaXJzdFwiKTtcblx0XHRmaWxsU2VsZWN0KFwiI2YtdG8tZ3JvdXBcIiwgW10sIFwiU2VsZWN0IGEgdXNlciBmaXJzdFwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBBIHJlYWRhYmxlIGxhYmVsIGZvciBhIHVzZXIuXG5cdCAqXG5cdCAqIEV2ZXJ5IG5hbWUgcGFydCBpcyBudWxsYWJsZSDigJQgYSBkaXJlY3Rvcnkgc2VlZGVkIGZyb20gYW4gZXh0ZXJuYWwgcHJvdmlkZXJcblx0ICogb2Z0ZW4gY2FycmllcyBvbmx5IGFuIGlkIOKAlCBzbyB0aGlzIGZhbGxzIGJhY2sgdGhyb3VnaCBuYW1lLCB0aGVuIGVtYWlsLFxuXHQgKiB0aGVuIHRoZSBpZCBpdHNlbGYgcmF0aGVyIHRoYW4gcmVuZGVyaW5nIFwibnVsbCBudWxsXCIuXG5cdCAqL1xuXHRmdW5jdGlvbiB1c2VyTGFiZWwodXNlcjogVXNlcik6IHN0cmluZyB7XG5cdFx0Y29uc3QgbmFtZSA9IFt1c2VyLmZpcnN0TmFtZSwgdXNlci5sYXN0TmFtZV1cblx0XHRcdC5maWx0ZXIoKHBhcnQpOiBwYXJ0IGlzIHN0cmluZyA9PiBwYXJ0ICE9PSBudWxsICYmIHBhcnQudHJpbSgpICE9PSBcIlwiKVxuXHRcdFx0LmpvaW4oXCIgXCIpXG5cdFx0XHQudHJpbSgpO1xuXHRcdGNvbnN0IHdobyA9IG5hbWUgIT09IFwiXCIgPyBuYW1lIDogdXNlci5lbWFpbCA/PyB1c2VyLmlkO1xuXHRcdHJldHVybiBgJHt3aG99IMK3ICR7dXNlci5pZH0ke3VzZXIuYWN0aXZlID8gXCJcIiA6IFwiIChpbmFjdGl2ZSlcIn1gO1xuXHR9XG5cblx0LyoqIEEgcmVhZGFibGUgbGFiZWwgZm9yIGEgZ3JvdXA6IGl0cyBpZCwgcGx1cyBpdHMgbWVtYmVyIGNvdW50IHdoZW4ga25vd24uICovXG5cdGZ1bmN0aW9uIGdyb3VwTGFiZWwoZ3JvdXA6IEdyb3VwKTogc3RyaW5nIHtcblx0XHRyZXR1cm4gZ3JvdXAubWVtYmVyQ291bnQgPT09IHVuZGVmaW5lZCA/IGdyb3VwLmlkIDogYCR7Z3JvdXAuaWR9IMK3ICR7Z3JvdXAubWVtYmVyQ291bnR9IG1lbWJlcihzKWA7XG5cdH1cblxuXHQvKiogUmVwbGFjZSBhIHNlbGVjdCdzIG9wdGlvbnMuIFZhbHVlcyBhcmUgdXVpZHM7IGxhYmVscyBhcmUgZm9yIGh1bWFucy4gKi9cblx0ZnVuY3Rpb24gZmlsbFNlbGVjdChpZDogc3RyaW5nLCBvcHRpb25zOiB7IHZhbHVlOiBzdHJpbmc7IGxhYmVsOiBzdHJpbmcgfVtdLCBwbGFjZWhvbGRlcj86IHN0cmluZyk6IHZvaWQge1xuXHRcdGNvbnN0IHNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KGlkKTtcblx0XHRpZiAoc2VsZWN0ID09PSBudWxsKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGVsZW1lbnRzOiBIVE1MT3B0aW9uRWxlbWVudFtdID0gW107XG5cdFx0aWYgKHBsYWNlaG9sZGVyICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdGNvbnN0IGVtcHR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKTtcblx0XHRcdGVtcHR5LnZhbHVlID0gXCJcIjtcblx0XHRcdGVtcHR5LnRleHRDb250ZW50ID0gcGxhY2Vob2xkZXI7XG5cdFx0XHRlbGVtZW50cy5wdXNoKGVtcHR5KTtcblx0XHR9XG5cdFx0Zm9yIChjb25zdCBvcHRpb24gb2Ygb3B0aW9ucykge1xuXHRcdFx0Y29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG5cdFx0XHQvLyB1dWlkIHJhdGhlciB0aGFuIGlkOiBib3RoIGFyZSBhY2NlcHRlZCBieSB0aGUgQVBJLCBidXQgYSB1dWlkIGNhblxuXHRcdFx0Ly8gbmV2ZXIgYmUgYW1iaWd1b3VzIHdpdGggYW5vdGhlciBvcmcncyBuYW1pbmcuXG5cdFx0XHRlbGVtZW50LnZhbHVlID0gb3B0aW9uLnZhbHVlO1xuXHRcdFx0ZWxlbWVudC50ZXh0Q29udGVudCA9IG9wdGlvbi5sYWJlbDtcblx0XHRcdGVsZW1lbnRzLnB1c2goZWxlbWVudCk7XG5cdFx0fVxuXHRcdHNlbGVjdC5yZXBsYWNlQ2hpbGRyZW4oLi4uZWxlbWVudHMpO1xuXHR9XG5cblx0LyoqIFRoZSB1dWlkIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgdXNlciwgb3IgXCJcIiB3aGVuIG5vbmUgaXMgY2hvc2VuLiAqL1xuXHRmdW5jdGlvbiBzZWxlY3RlZFVzZXJVdWlkKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2YtdXNlclwiKT8udmFsdWUgPz8gXCJcIjtcblx0fVxuXG5cdC8qKiBUaGUgc2VsZWN0ZWQgdXNlciwgZnJvbSB0aGUgY2FjaGVkIGxpc3QuICovXG5cdGZ1bmN0aW9uIHNlbGVjdGVkVXNlcigpOiBVc2VyIHwgdW5kZWZpbmVkIHtcblx0XHRjb25zdCB1dWlkID0gc2VsZWN0ZWRVc2VyVXVpZCgpO1xuXHRcdHJldHVybiB1c2Vycy5maW5kKChjYW5kaWRhdGUpID0+IGNhbmRpZGF0ZS51dWlkID09PSB1dWlkKTtcblx0fVxuXG5cdC8qKiBGaWxsIHRoZSB1c2VyIHBpY2tlciBhbmQgdGhlIFwiYWRkIHRvIGdyb3VwXCIgcGlja2VyIGZyb20gdGhlIGNhY2hlZCBsaXN0cy4gKi9cblx0ZnVuY3Rpb24gcG9wdWxhdGVEaXJlY3RvcnlQaWNrZXJzKCk6IHZvaWQge1xuXHRcdGZpbGxTZWxlY3QoXG5cdFx0XHRcIiNmLXVzZXJcIixcblx0XHRcdHVzZXJzLm1hcCgodXNlcikgPT4gKHsgdmFsdWU6IHVzZXIudXVpZCwgbGFiZWw6IHVzZXJMYWJlbCh1c2VyKSB9KSksXG5cdFx0XHRcIlNlbGVjdCBhIHVzZXLigKZcIlxuXHRcdCk7XG5cdFx0ZmlsbFNlbGVjdChcblx0XHRcdFwiI2YtYWRkLWdyb3VwXCIsXG5cdFx0XHRncm91cHMubWFwKChncm91cCkgPT4gKHsgdmFsdWU6IGdyb3VwLnV1aWQsIGxhYmVsOiBncm91cExhYmVsKGdyb3VwKSB9KSksXG5cdFx0XHRcIlNlbGVjdCBhIGdyb3Vw4oCmXCJcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlbmRlciB0aGUgc2VsZWN0ZWQgdXNlcidzIG1lbWJlcnNoaXBzLCBhbmQgcmVidWlsZCB0aGUgc3dpdGNoIHBpY2tlcnNcblx0ICogZnJvbSB0aGVtLlxuXHQgKlxuXHQgKiBcIkZyb21cIiBsaXN0cyBvbmx5IGdyb3VwcyB0aGUgdXNlciBpcyBhY3R1YWxseSBpbiwgYW5kIFwiVG9cIiBvbmx5IGdyb3Vwc1xuXHQgKiB0aGV5IGFyZSBub3Q6IHRoZSBzd2l0Y2ggaXMgdGhlbiB1bmFibGUgdG8gZXhwcmVzcyB0aGUgdHdvIGNhc2VzIHRoYXRcblx0ICogY2Fubm90IHdvcmsg4oCUIGxlYXZpbmcgYSBncm91cCB0aGV5IHdlcmUgbmV2ZXIgaW4sIGFuZCB0aGUgc2FtZS1ncm91cFxuXHQgKiBzd2l0Y2ggdGhhdCB3b3VsZCBhZGQgdGhlbiBpbW1lZGlhdGVseSByZW1vdmUgdGhlbS5cblx0ICovXG5cdGZ1bmN0aW9uIHJlbmRlck1lbWJlcnNoaXBzKCk6IHZvaWQge1xuXHRcdGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTEVsZW1lbnQ+KFwiI21lbWJlcnNoaXBzXCIpO1xuXHRcdGlmIChjb250YWluZXIgPT09IG51bGwpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHRjb25zdCB1c2VyID0gc2VsZWN0ZWRVc2VyKCk7XG5cdFx0aWYgKHVzZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Y29udGFpbmVyLnJlcGxhY2VDaGlsZHJlbihzcGFuKFwiZmllbGRfX2hpbnRcIiwgXCJObyB1c2VyIHNlbGVjdGVkLlwiKSk7XG5cdFx0XHRmaWxsU2VsZWN0KFwiI2YtZnJvbS1ncm91cFwiLCBbXSk7XG5cdFx0XHRmaWxsU2VsZWN0KFwiI2YtdG8tZ3JvdXBcIiwgW10pO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChzZWxlY3RlZEdyb3Vwcy5sZW5ndGggPT09IDApIHtcblx0XHRcdGNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oc3BhbihcImZpZWxkX19oaW50XCIsIFwiVGhpcyB1c2VyIGJlbG9uZ3MgdG8gbm8gZ3JvdXBzLlwiKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnRhaW5lci5yZXBsYWNlQ2hpbGRyZW4oXG5cdFx0XHRcdC4uLnNlbGVjdGVkR3JvdXBzLm1hcCgoZ3JvdXApID0+IHtcblx0XHRcdFx0XHRjb25zdCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRcdHJvdy5jbGFzc05hbWUgPSBcIm1lbWJlcnNoaXBcIjtcblx0XHRcdFx0XHRyb3cuYXBwZW5kKHNwYW4oXCJtZW1iZXJzaGlwX19uYW1lXCIsIGdyb3VwLmlkKSk7XG5cblx0XHRcdFx0XHRjb25zdCByZW1vdmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0XHRcdHJlbW92ZS5jbGFzc05hbWUgPSBcInNlY29uZGFyeSBzbWFsbFwiO1xuXHRcdFx0XHRcdHJlbW92ZS50ZXh0Q29udGVudCA9IFwiUmVtb3ZlXCI7XG5cdFx0XHRcdFx0cmVtb3ZlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZW1vdmVGcm9tR3JvdXAodXNlciwgZ3JvdXApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJvdy5hcHBlbmQocmVtb3ZlKTtcblx0XHRcdFx0XHRyZXR1cm4gcm93O1xuXHRcdFx0XHR9KVxuXHRcdFx0KTtcblx0XHR9XG5cblx0XHRjb25zdCBtZW1iZXJPZiA9IG5ldyBTZXQoc2VsZWN0ZWRHcm91cHMubWFwKChncm91cCkgPT4gZ3JvdXAudXVpZCkpO1xuXHRcdGZpbGxTZWxlY3QoXG5cdFx0XHRcIiNmLWZyb20tZ3JvdXBcIixcblx0XHRcdHNlbGVjdGVkR3JvdXBzLm1hcCgoZ3JvdXApID0+ICh7IHZhbHVlOiBncm91cC51dWlkLCBsYWJlbDogZ3JvdXAuaWQgfSkpLFxuXHRcdFx0c2VsZWN0ZWRHcm91cHMubGVuZ3RoID09PSAwID8gXCJObyBncm91cHMgdG8gbGVhdmVcIiA6IFwiU2VsZWN0IGEgZ3JvdXDigKZcIlxuXHRcdCk7XG5cdFx0ZmlsbFNlbGVjdChcblx0XHRcdFwiI2YtdG8tZ3JvdXBcIixcblx0XHRcdGdyb3Vwc1xuXHRcdFx0XHQuZmlsdGVyKChncm91cCkgPT4gIW1lbWJlck9mLmhhcyhncm91cC51dWlkKSlcblx0XHRcdFx0Lm1hcCgoZ3JvdXApID0+ICh7IHZhbHVlOiBncm91cC51dWlkLCBsYWJlbDogZ3JvdXAuaWQgfSkpLFxuXHRcdFx0XCJTZWxlY3QgYSBncm91cOKAplwiXG5cdFx0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZS1yZWFkIHRoZSBzZWxlY3RlZCB1c2VyJ3MgbWVtYmVyc2hpcHMgZnJvbSB0aGUgc2VydmVyIGFuZCByZS1yZW5kZXIuXG5cdCAqXG5cdCAqIERlbGliZXJhdGVseSBhIGZyZXNoIHJlYWQgcmF0aGVyIHRoYW4gYSBsb2NhbCBlZGl0IG9mIGBzZWxlY3RlZEdyb3Vwc2A6XG5cdCAqIGFmdGVyIGEgbXV0YXRpb24gdGhlIHNlcnZlciBpcyB0aGUgb25seSB0aGluZyB0aGF0IGtub3dzIHdoYXQgYWN0dWFsbHlcblx0ICogbGFuZGVkLCB3aGljaCBtYXR0ZXJzIG1vc3Qgd2hlbiBhIHN3aXRjaCBoYWxmLWFwcGxpZWQuXG5cdCAqL1xuXHRhc3luYyBmdW5jdGlvbiByZWZyZXNoTWVtYmVyc2hpcHMoYXBpOiBVc2VyQXBpQ2xpZW50KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0Y29uc3QgdXVpZCA9IHNlbGVjdGVkVXNlclV1aWQoKTtcblx0XHRpZiAodXVpZCA9PT0gXCJcIikge1xuXHRcdFx0c2VsZWN0ZWRHcm91cHMgPSBbXTtcblx0XHRcdHJlbmRlck1lbWJlcnNoaXBzKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGZyZXNoID0gYXdhaXQgYXBpLmdldFVzZXIodXVpZCwgXCJ1dWlkXCIpO1xuXHRcdHNlbGVjdGVkR3JvdXBzID0gZnJlc2g/Lmdyb3VwcyA/PyBbXTtcblx0XHRyZW5kZXJNZW1iZXJzaGlwcygpO1xuXHR9XG5cblx0LyoqIFJlbW92ZSB0aGUgdXNlciBmcm9tIG9uZSBncm91cCwgdGhlbiByZS1yZWFkIHRoZWlyIG1lbWJlcnNoaXBzLiAqL1xuXHRmdW5jdGlvbiByZW1vdmVGcm9tR3JvdXAodXNlcjogVXNlciwgZ3JvdXA6IEdyb3VwKTogdm9pZCB7XG5cdFx0dm9pZCBydW5Vc2VycyhgbXV0YXRpb24gcmVtb3ZlVXNlckZyb21Hcm91cCDCtyAke2dyb3VwLmlkfWAsIGFzeW5jIChhcGkpID0+IHtcblx0XHRcdGF3YWl0IGFwaS5yZW1vdmVVc2VyRnJvbUdyb3VwKHVzZXIudXVpZCwgZ3JvdXAudXVpZCk7XG5cdFx0XHRhd2FpdCByZWZyZXNoTWVtYmVyc2hpcHMoYXBpKTtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdGBSZW1vdmVkICR7dXNlci5pZH0gZnJvbSBcIiR7Z3JvdXAuaWR9XCIuYCxcblx0XHRcdFx0YE5vdyBpbiAke3NlbGVjdGVkR3JvdXBzLmxlbmd0aH0gZ3JvdXAocyk6ICR7c2VsZWN0ZWRHcm91cHMubWFwKChnKSA9PiBnLmlkKS5qb2luKFwiLCBcIikgfHwgXCJub25lXCJ9YFxuXHRcdFx0XTtcblx0XHR9KTtcblx0fVxuXG5cdC8vIC0tLSB0aGUgYWN0aXZpdHkgdHJhbnNjcmlwdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKiBBcHBlbmQgYSByZXF1ZXN0IGVudHJ5OyByZXR1cm5zIGEgY2FsbGJhY2sgdG8gcmVzb2x2ZSBpdCBvbmNlIGl0IHNldHRsZXMuICovXG5cdGZ1bmN0aW9uIGxvZ1JlcXVlc3QobGFiZWw6IHN0cmluZyk6IChzdGF0dXM6IFwiZXJyb3JcIiB8IFwib2tcIiwgZGV0YWlsOiBzdHJpbmdbXSkgPT4gdm9pZCB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dFbXB0eVwiKT8ucmVtb3ZlKCk7XG5cblx0XHRjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0ZW50cnkuY2xhc3NOYW1lID0gXCJsb2ctZW50cnkgaXMtcGVuZGluZ1wiO1xuXG5cdFx0Y29uc3QgbGluZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0bGluZS5jbGFzc05hbWUgPSBcImxvZy1lbnRyeV9fbGluZVwiO1xuXHRcdGxpbmUuYXBwZW5kKFxuXHRcdFx0c3BhbihcImxvZy10aW1lXCIsIG5ldyBEYXRlKCkudG9Mb2NhbGVUaW1lU3RyaW5nKCkpLFxuXHRcdFx0c3BhbihcImxvZy1tZXRob2RcIiwgXCJQT1NUXCIpLFxuXHRcdFx0c3BhbihcImxvZy1wYXRoXCIsIEVORFBPSU5UX1BBVEgpLFxuXHRcdFx0c3BhbihcImxvZy1waWxsXCIsIFwid2FpdGluZ1wiKVxuXHRcdCk7XG5cblx0XHRlbnRyeS5hcHBlbmQobGluZSwgc3BhbihcImxvZy1sYWJlbFwiLCBsYWJlbCkpO1xuXHRcdGxvZ0VsPy5hcHBlbmQoZW50cnkpO1xuXHRcdHNjcm9sbFRvTGF0ZXN0KCk7XG5cblx0XHRjb25zdCBwaWxsID0gbGluZS5xdWVyeVNlbGVjdG9yKFwiLmxvZy1waWxsXCIpO1xuXHRcdHJldHVybiAoc3RhdHVzLCBkZXRhaWwpID0+IHtcblx0XHRcdGVudHJ5LmNsYXNzTmFtZSA9IGBsb2ctZW50cnkgaXMtJHtzdGF0dXN9YDtcblx0XHRcdGlmIChwaWxsICE9PSBudWxsKSB7XG5cdFx0XHRcdHBpbGwuY2xhc3NOYW1lID0gYGxvZy1waWxsIGlzLSR7c3RhdHVzfWA7XG5cdFx0XHRcdHBpbGwudGV4dENvbnRlbnQgPSBzdGF0dXMgPT09IFwib2tcIiA/IFwiT0tcIiA6IFwiZXJyb3JcIjtcblx0XHRcdH1cblx0XHRcdGlmIChkZXRhaWwubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRjb25zdCBib2R5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInByZVwiKTtcblx0XHRcdFx0Ym9keS5jbGFzc05hbWUgPSBcImxvZy1kZXRhaWxcIjtcblx0XHRcdFx0Ym9keS50ZXh0Q29udGVudCA9IGRldGFpbC5qb2luKFwiXFxuXCIpO1xuXHRcdFx0XHRlbnRyeS5hcHBlbmQoYm9keSk7XG5cdFx0XHR9XG5cdFx0XHRzY3JvbGxUb0xhdGVzdCgpO1xuXHRcdH07XG5cdH1cblxuXHQvKiogQXBwZW5kIGEgb25lLWxpbmUsIG5vbi1yZXF1ZXN0IGVudHJ5IHRvIHRoZSBhY3Rpdml0eSBsb2cuICovXG5cdGZ1bmN0aW9uIG5vdGljZShtZXNzYWdlOiBzdHJpbmcsIGtpbmQ6IFwiZXJyb3JcIiB8IFwiaW5mb1wiKTogdm9pZCB7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNsb2dFbXB0eVwiKT8ucmVtb3ZlKCk7XG5cdFx0Y29uc3QgZW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdGVudHJ5LmNsYXNzTmFtZSA9IGtpbmQgPT09IFwiZXJyb3JcIiA/IFwibG9nLWVudHJ5IGlzLWVycm9yXCIgOiBcImxvZy1lbnRyeVwiO1xuXHRcdGVudHJ5LmFwcGVuZChzcGFuKFwibG9nLWxhYmVsXCIsIG1lc3NhZ2UpKTtcblx0XHRsb2dFbD8uYXBwZW5kKGVudHJ5KTtcblx0XHRzY3JvbGxUb0xhdGVzdCgpO1xuXHR9XG5cblx0LyoqIEJ1aWxkIGEgYDxzcGFuPmAgd2l0aCBhIGNsYXNzIGFuZCB0ZXh0IGNvbnRlbnQuICovXG5cdGZ1bmN0aW9uIHNwYW4oY2xhc3NOYW1lOiBzdHJpbmcsIGNvbnRlbnQ6IHN0cmluZyk6IEhUTUxTcGFuRWxlbWVudCB7XG5cdFx0Y29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcblx0XHRlbC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XG5cdFx0ZWwudGV4dENvbnRlbnQgPSBjb250ZW50O1xuXHRcdHJldHVybiBlbDtcblx0fVxuXG5cdC8qKiBTY3JvbGwgdGhlIGFjdGl2aXR5IGxvZyB0byBpdHMgbGF0ZXN0IGVudHJ5LiAqL1xuXHRmdW5jdGlvbiBzY3JvbGxUb0xhdGVzdCgpOiB2b2lkIHtcblx0XHRjb25zdCBib2R5ID0gbG9nRWw/LnBhcmVudEVsZW1lbnQ7XG5cdFx0aWYgKGJvZHkgIT09IG51bGwgJiYgYm9keSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRib2R5LnNjcm9sbFRvcCA9IGJvZHkuc2Nyb2xsSGVpZ2h0O1xuXHRcdH1cblx0fVxuXG5cdC8qKiBUcmlnZ2VyIGEgYnJvd3NlciBkb3dubG9hZCBvZiBgZGF0YWAgYXMgYSBmb3JtYXR0ZWQgSlNPTiBmaWxlLiAqL1xuXHRmdW5jdGlvbiBkb3dubG9hZEpzb24oZmlsZW5hbWU6IHN0cmluZywgZGF0YTogdW5rbm93bik6IHZvaWQge1xuXHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgXCJcXHRcIildLCB7IHR5cGU6IFwiYXBwbGljYXRpb24vanNvblwiIH0pO1xuXHRcdGNvbnN0IHVybCA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG5cdFx0Y29uc3QgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpO1xuXHRcdGxpbmsuaHJlZiA9IHVybDtcblx0XHRsaW5rLmRvd25sb2FkID0gZmlsZW5hbWU7XG5cdFx0bGluay5jbGljaygpO1xuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwodXJsKTtcblx0fVxuXG5cdC8vIC0tLSB3aXJpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKiBDaGVjayBCQVNFX1VSTCBhbmQgSEVSRV9PQVVUSF9DTElFTlRfSUQgYXJlIHNldCwgcmVwb3J0aW5nIHdoYXQncyBtaXNzaW5nLiAqL1xuXHRmdW5jdGlvbiBjb25maWd1cmVkKCk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IG1pc3Npbmc6IHN0cmluZ1tdID0gW107XG5cdFx0aWYgKEJBU0VfVVJMID09PSBcIlwiKSB7XG5cdFx0XHRtaXNzaW5nLnB1c2goXCJCQVNFX1VSTFwiKTtcblx0XHR9XG5cdFx0aWYgKENMSUVOVF9JRCA9PT0gXCJcIikge1xuXHRcdFx0bWlzc2luZy5wdXNoKFwiSEVSRV9PQVVUSF9DTElFTlRfSURcIik7XG5cdFx0fVxuXHRcdGlmIChtaXNzaW5nLmxlbmd0aCA+IDApIHtcblx0XHRcdG5vdGljZShcblx0XHRcdFx0YCR7bWlzc2luZy5qb2luKFwiIGFuZCBcIil9IG5vdCBzZXQgaW4gLmVudi4gQWRkICR7bWlzc2luZy5sZW5ndGggPT09IDEgPyBcIml0XCIgOiBcInRoZW1cIn0gYCArXG5cdFx0XHRcdFx0XCJhbmQgcmUtcnVuIG5wbSBydW4gc3RhcnQgdG8gcmVidWlsZC4gU2VlIHRoZSBSRUFETUUgZm9yIGhvdyB0byByZWdpc3RlciBhbiBcIiArXG5cdFx0XHRcdFx0XCJPQXV0aCBhcHAgYW5kIGdldCBhIGNsaWVudCBpZC5cIixcblx0XHRcdFx0XCJlcnJvclwiXG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgSldUIHNpZ24taW4gcGF0aCBuZWVkcyBgQkFTRV9VUkxgIHRvIGNhbGwgdGhlIEFQSSwgYnV0IG5vdFxuXHQgKiBgSEVSRV9PQVVUSF9DTElFTlRfSURgIOKAlCB0aGVyZSBpcyBubyBPQXV0aCBhcHAgaW52b2x2ZWQuXG5cdCAqL1xuXHRmdW5jdGlvbiBiYXNlVXJsQ29uZmlndXJlZCgpOiBib29sZWFuIHtcblx0XHRpZiAoQkFTRV9VUkwgPT09IFwiXCIpIHtcblx0XHRcdG5vdGljZShcblx0XHRcdFx0XCJCQVNFX1VSTCBub3Qgc2V0IGluIC5lbnYuIEFkZCBpdCBhbmQgcmUtcnVuIG5wbSBydW4gc3RhcnQgdG8gcmVidWlsZC4gU2VlIHRoZSBSRUFETUUuXCIsXG5cdFx0XHRcdFwiZXJyb3JcIlxuXHRcdFx0KTtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvKipcblx0ICogUnVuIG9uZSBBUEkgY2FsbCwgbG9nZ2luZyB0aGUgcmVxdWVzdCBhbmQgcmVzb2x2aW5nIGl0IHRvIE9LIG9yIGVycm9yLlxuXHQgKlxuXHQgKiBUaGUgY2xpZW50IGlzIGhhbmRlZCB0byB0aGUgY2FsbGJhY2sgcmF0aGVyIHRoYW4gcmVhZCBmcm9tIHRoZSBjbG9zdXJlLCBzb1xuXHQgKiB0aGUgc2lnbmVkLWluIGNoZWNrIGhhcHBlbnMgaW4gb25lIHBsYWNlIGFuZCBjYWxsZXJzIGdldCBhIG5vbi1vcHRpb25hbFxuXHQgKiBjbGllbnQgdG8gd29yayB3aXRoLiBHZW5lcmljIG92ZXIgd2hpY2ggY2xpZW50LCBzbyB0aGUgY29udGVudCBhbmRcblx0ICogdXNlci9ncm91cCBjYWxscyBzaGFyZSBvbmUgY29weSBvZiB0aGUgbG9nZ2luZyBhbmQgc2Vzc2lvbi1leHBpcnlcblx0ICogaGFuZGxpbmcg4oCUIHNlZSBgcnVuYCBhbmQgYHJ1blVzZXJzYCBiZWxvdy5cblx0ICovXG5cdGFzeW5jIGZ1bmN0aW9uIHJ1bldpdGg8VD4oXG5cdFx0bGFiZWw6IHN0cmluZyxcblx0XHRhcGk6IFQgfCB1bmRlZmluZWQsXG5cdFx0Y2FsbDogKGFwaTogVCkgPT4gUHJvbWlzZTxzdHJpbmdbXT5cblx0KTogUHJvbWlzZTx2b2lkPiB7XG5cdFx0aWYgKGFwaSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRub3RpY2UoXCJTaWduIGluIGZpcnN0LlwiLCBcImVycm9yXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBzZXR0bGUgPSBsb2dSZXF1ZXN0KGxhYmVsKTtcblx0XHR0cnkge1xuXHRcdFx0c2V0dGxlKFwib2tcIiwgYXdhaXQgY2FsbChhcGkpKTtcblx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdHNldHRsZShcImVycm9yXCIsIFtlcnIgaW5zdGFuY2VvZiBDb250ZW50QXBpRXJyb3IgPyBlcnIubWVzc2FnZSA6IFN0cmluZyhlcnIpXSk7XG5cdFx0XHQvLyBObyByZWZyZXNoIGdyYW50IGV4aXN0cywgc28gYW4gZXhwaXJlZCB0b2tlbiBlbmRzIHRoZSBzZXNzaW9uLlxuXHRcdFx0aWYgKGVyciBpbnN0YW5jZW9mIENvbnRlbnRBcGlFcnJvciAmJiBlcnIuc3RhdHVzID09PSA0MDEpIHtcblx0XHRcdFx0c2V0U2lnbmVkSW4odW5kZWZpbmVkKTtcblx0XHRcdFx0bm90aWNlKFwiU2Vzc2lvbiBleHBpcmVkLiBTaWduIGluIGFnYWluIHRvIGNvbnRpbnVlLlwiLCBcImVycm9yXCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKiBSdW4gb25lIGNvbnRlbnQtQVBJIGNhbGwuICovXG5cdGFzeW5jIGZ1bmN0aW9uIHJ1bihsYWJlbDogc3RyaW5nLCBjYWxsOiAoYXBpOiBDb250ZW50QXBpQ2xpZW50KSA9PiBQcm9taXNlPHN0cmluZ1tdPik6IFByb21pc2U8dm9pZD4ge1xuXHRcdHJldHVybiBydW5XaXRoKGxhYmVsLCBjbGllbnQsIGNhbGwpO1xuXHR9XG5cblx0LyoqIFJ1biBvbmUgdXNlci9ncm91cC1BUEkgY2FsbC4gKi9cblx0YXN5bmMgZnVuY3Rpb24gcnVuVXNlcnMobGFiZWw6IHN0cmluZywgY2FsbDogKGFwaTogVXNlckFwaUNsaWVudCkgPT4gUHJvbWlzZTxzdHJpbmdbXT4pOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRyZXR1cm4gcnVuV2l0aChsYWJlbCwgdXNlckNsaWVudCwgY2FsbCk7XG5cdH1cblxuXHQvKiogU2hvdyB0aGUgVVJMIGZpZWxkIGZvciBhIHdlYiBhcHAsIG9yIHRoZSBleGVjdXRhYmxlIHBhdGggZmllbGQgZm9yIGEgZGVza3RvcCBvbmUuICovXG5cdGZ1bmN0aW9uIGFwcGx5VHlwZVZpc2liaWxpdHkoKTogdm9pZCB7XG5cdFx0Y29uc3QgaXNXZWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNmLXR5cGVcIik/LnZhbHVlICE9PSBcIm5hdGl2ZVwiO1xuXHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZmllbGQtdXJsXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIsICFpc1dlYik7XG5cdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmaWVsZC1wYXRoXCIpPy5jbGFzc0xpc3QudG9nZ2xlKFwiaGlkZGVuXCIsIGlzV2ViKTtcblx0fVxuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuU2lnbkluXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGlmICghY29uZmlndXJlZCgpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdC8vIE5hdmlnYXRlcyBhd2F5IG9uIHN1Y2Nlc3MsIHNvIG5vdGhpbmcgYWZ0ZXIgdGhpcyBydW5zLlxuXHRcdGJlZ2luU2lnbkluKEJBU0VfVVJMLCBDTElFTlRfSUQpLmNhdGNoKGZhaWxTaWduSW4pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blNpZ25PdXRcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0c2V0U2lnbmVkSW4odW5kZWZpbmVkKTtcblx0XHRub3RpY2UoXCJTaWduZWQgb3V0LlwiLCBcImluZm9cIik7XG5cdH0pO1xuXG5cdC8qKlxuXHQgKiBTdG9wZ2FwIGZvciBvcmdzIHdoZXJlIE9BdXRoIHB1YmxpYyBjbGllbnRzIGFyZW4ndCBhdmFpbGFibGUgeWV0XG5cdCAqIChzZWUgdGhlIFJFQURNRSk6IHNpZ24gaW4gd2l0aCBhbiBBUEkgSldUIHBhc3RlZCBzdHJhaWdodCBpbnRvIHRoZSBwYWdlXG5cdCAqIGluc3RlYWQgb2YgcnVubmluZyB0aGUgT0F1dGggaGFuZHNoYWtlLiBTYW1lIGluLW1lbW9yeS1vbmx5IGxpZmV0aW1lIGFzIGFuXG5cdCAqIE9BdXRoIHRva2VuIOKAlCBub3RoaW5nIGlzIHBlcnNpc3RlZCwgc28gYSByZWxvYWQgc2lnbnMgeW91IG91dC5cblx0ICovXG5cdGZ1bmN0aW9uIHNpZ25JbldpdGhQYXN0ZWRKd3QoKTogdm9pZCB7XG5cdFx0aWYgKCFiYXNlVXJsQ29uZmlndXJlZCgpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGNvbnN0IGp3dElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MSW5wdXRFbGVtZW50PihcIiNmLWp3dFwiKTtcblx0XHRjb25zdCBqd3QgPSBqd3RJbnB1dD8udmFsdWUudHJpbSgpID8/IFwiXCI7XG5cdFx0aWYgKGp3dCA9PT0gXCJcIikge1xuXHRcdFx0bm90aWNlKFwiUGFzdGUgYW4gQVBJIEpXVCBmaXJzdC5cIiwgXCJlcnJvclwiKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0Y29uc3QgYXV0aElkSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxJbnB1dEVsZW1lbnQ+KFwiI2YtYXV0aC1pZFwiKTtcblx0XHRjb25zdCBhdXRoSWQgPSBhdXRoSWRJbnB1dD8udmFsdWUudHJpbSgpID8/IFwiXCI7XG5cdFx0aWYgKGp3dElucHV0ICE9PSBudWxsKSB7XG5cdFx0XHRqd3RJbnB1dC52YWx1ZSA9IFwiXCI7XG5cdFx0fVxuXHRcdGlmIChhdXRoSWRJbnB1dCAhPT0gbnVsbCkge1xuXHRcdFx0YXV0aElkSW5wdXQudmFsdWUgPSBcIlwiO1xuXHRcdH1cblx0XHRzZXRTaWduZWRJbihqd3QsIGF1dGhJZCA9PT0gXCJcIiA/IHVuZGVmaW5lZCA6IGF1dGhJZCk7XG5cdFx0bm90aWNlKFxuXHRcdFx0XCJTaWduZWQgaW4gd2l0aCBhIHBhc3RlZCBKV1QuIFRoaXMgYnlwYXNzZXMgT0F1dGggZW50aXJlbHkg4oCUIHRyZWF0IHRoZSB0b2tlbiBhcyBhIFwiICtcblx0XHRcdFx0XCJzZWNyZXQsIGFuZCBkb24ndCBsZWF2ZSBpdCBzaXR0aW5nIGluIHRoZSBmaWVsZCBvbiBhIHNoYXJlZCBzY3JlZW4uXCIsXG5cdFx0XHRcImluZm9cIlxuXHRcdCk7XG5cdH1cblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blNpZ25Jbkp3dFwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHNpZ25JbldpdGhQYXN0ZWRKd3QpO1xuXHRmb3IgKGNvbnN0IGlkIG9mIFtcIiNmLWp3dFwiLCBcIiNmLWF1dGgtaWRcIl0pIHtcblx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGlkKT8uYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgKGUpID0+IHtcblx0XHRcdGlmICgoZSBhcyBLZXlib2FyZEV2ZW50KS5rZXkgPT09IFwiRW50ZXJcIikge1xuXHRcdFx0XHRzaWduSW5XaXRoUGFzdGVkSnd0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2YtdHlwZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBhcHBseVR5cGVWaXNpYmlsaXR5KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bkxpc3RcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0dm9pZCBydW4oXCJxdWVyeSBjb250ZW50c1wiLCBhc3luYyAoYXBpKSA9PiB7XG5cdFx0XHRjb25zdCBub2RlcyA9IGF3YWl0IGFwaS5saXN0Q29udGVudHMoKTtcblx0XHRcdGlmIChub2Rlcy5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIFtcIllvdXIgZGlyZWN0b3J5IGhhcyBubyBhcHBzIHlldC5cIl07XG5cdFx0XHR9XG5cdFx0XHRjb25zdCByb3dzID0gbm9kZXMubWFwKChuKSA9PiBg4oCiICR7bi5uYW1lfSAgWyR7bi5pZH1dICAke24udHlwZX0gICR7bi5hY3RpdmUgPyBcImFjdGl2ZVwiIDogXCJpbmFjdGl2ZVwifWApO1xuXHRcdFx0cmV0dXJuIFtgJHtub2Rlcy5sZW5ndGh9IGFwcChzKTpgLCAuLi5yb3dzXTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5FeHBvcnRcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0dm9pZCBydW4oXCJleHBvcnQgZGlyZWN0b3J5IGFzIEZEQzMgbWFuaWZlc3RcIiwgYXN5bmMgKGFwaSkgPT4ge1xuXHRcdFx0Y29uc3Qgbm9kZXMgPSBhd2FpdCBhcGkubGlzdENvbnRlbnRzKCk7XG5cdFx0XHRjb25zdCBkaXJlY3Rvcnk6IEFwcERpcmVjdG9yeSA9IHtcblx0XHRcdFx0YXBwbGljYXRpb25zOiBub2Rlcy5tYXAoKG5vZGUpID0+IGNvbnRlbnROb2RlVG9GZGMzQXBwbGljYXRpb24obm9kZSkpXG5cdFx0XHR9O1xuXHRcdFx0ZG93bmxvYWRKc29uKGBjb250ZW50LWRpcmVjdG9yeS0ke0RhdGUubm93KCl9Lmpzb25gLCBkaXJlY3RvcnkpO1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0YERvd25sb2FkZWQgJHtub2Rlcy5sZW5ndGh9IGFwcChzKSBhcyBhbiBGREMzIEFwcCBEaXJlY3RvcnkgbWFuaWZlc3QuYCxcblx0XHRcdFx0XCJBY2Nlc3MgYXNzaWdubWVudHMgd2VyZSBub3QgaW5jbHVkZWQg4oCUIHRoZXkncmUgb3JnLXNwZWNpZmljIGFuZCB3b3VsZG4ndCBjYXJyeSBvdmVyIGNvcnJlY3RseS5cIlxuXHRcdFx0XTtcblx0XHR9KTtcblx0fSk7XG5cblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG5DcmVhdGVcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y29uc3QgZm9ybSA9IHJlYWRGb3JtKCk7XG5cdFx0dm9pZCBydW4oYG11dGF0aW9uIGNyZWF0ZUNvbnRlbnQgwrcgJHtmb3JtLmNvbnRlbnRJZCB8fCBcIj9cIn1gLCBhc3luYyAoYXBpKSA9PiB7XG5cdFx0XHRjb25zdCByZXN1bHQgPSBhd2FpdCBhcGkuY3JlYXRlQ29udGVudChmZGMzVG9Db250ZW50SW5wdXQoYnVpbGRBcHAoZm9ybSkpKTtcblx0XHRcdHJldHVybiBbXG5cdFx0XHRcdGBDcmVhdGVkIFwiJHtyZXN1bHQuaWR9XCIgKHV1aWQgJHtyZXN1bHQudXVpZH0pYCxcblx0XHRcdFx0YCR7cmVzdWx0LnR5cGV9IMK3IGFjdGl2ZT0ke3Jlc3VsdC5hY3RpdmV9IMK3IGZlYXR1cmVkPSR7cmVzdWx0LmZlYXR1cmVkfWBcblx0XHRcdF07XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuVmFsaWRhdGVcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y29uc3QgZm9ybSA9IHJlYWRGb3JtKCk7XG5cdFx0dm9pZCBydW4oYHF1ZXJ5IGNvbnRlbnQgwrcgJHtmb3JtLmNvbnRlbnRJZCB8fCBcIj9cIn1gLCBhc3luYyAoYXBpKSA9PiB7XG5cdFx0XHRjb25zdCBub2RlID0gYXdhaXQgYXBpLmdldENvbnRlbnRCeUlkKGZvcm0uY29udGVudElkKTtcblx0XHRcdGlmIChub2RlID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybiBbYE5vIGFwcCBmb3VuZCB3aXRoIENvbnRlbnQgSUQgXCIke2Zvcm0uY29udGVudElkfVwiLmBdO1xuXHRcdFx0fVxuXHRcdFx0cG9wdWxhdGVGb3JtKG5vZGUpO1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0YEZvdW5kIFwiJHtub2RlLm5hbWV9XCIgKHV1aWQgJHtub2RlLnV1aWR9KWAsXG5cdFx0XHRcdGAke25vZGUudHlwZX0gwrcgYWN0aXZlPSR7bm9kZS5hY3RpdmV9YCxcblx0XHRcdFx0XCJMb2FkZWQgaXRzIGN1cnJlbnQgdmFsdWVzIGludG8gdGhlIGZvcm0uXCJcblx0XHRcdF07XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuVXBkYXRlXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IGZvcm0gPSByZWFkRm9ybSgpO1xuXHRcdHZvaWQgcnVuKGBtdXRhdGlvbiB1cGRhdGVDb250ZW50IMK3ICR7Zm9ybS5jb250ZW50SWQgfHwgXCI/XCJ9YCwgYXN5bmMgKGFwaSkgPT4ge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgYXBpLnVwZGF0ZUNvbnRlbnQoZm9ybS5jb250ZW50SWQsIGJ1aWxkVXBkYXRlKGZvcm0pKTtcblx0XHRcdHJldHVybiBbYFVwZGF0ZWQgXCIke3Jlc3VsdC5uYW1lfVwiYCwgYGFjdGl2ZT0ke3Jlc3VsdC5hY3RpdmV9IMK3IGZlYXR1cmVkPSR7cmVzdWx0LmZlYXR1cmVkfWBdO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bkRlbGV0ZVwiKT8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRjb25zdCBmb3JtID0gcmVhZEZvcm0oKTtcblx0XHR2b2lkIHJ1bihgbXV0YXRpb24gZGVsZXRlQ29udGVudCDCtyAke2Zvcm0uY29udGVudElkIHx8IFwiP1wifWAsIGFzeW5jIChhcGkpID0+IHtcblx0XHRcdGNvbnN0IHJlbW92ZWQgPSBhd2FpdCBhcGkucmVtb3ZlQ29udGVudChmb3JtLmNvbnRlbnRJZCk7XG5cdFx0XHRyZXR1cm4gcmVtb3ZlZCA/IFtgRGVsZXRlZCBcIiR7Zm9ybS5jb250ZW50SWR9XCIuYF0gOiBbYFRoZSBzZXJ2ZXIgZGlkIG5vdCBkZWxldGUgXCIke2Zvcm0uY29udGVudElkfVwiLmBdO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bkxvYWREaXJlY3RvcnlcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0dm9pZCBydW5Vc2VycyhcInF1ZXJ5IHVzZXJzICsgZ3JvdXBzXCIsIGFzeW5jIChhcGkpID0+IHtcblx0XHRcdC8vIFR3byBwYWdpbmF0ZWQgcmVhZHMsIGluIHBhcmFsbGVsOiBuZWl0aGVyIGRlcGVuZHMgb24gdGhlIG90aGVyLCBhbmRcblx0XHRcdC8vIHRoZSBwaWNrZXJzIG5lZWQgYm90aCBiZWZvcmUgZWl0aGVyIGlzIHVzZWZ1bC5cblx0XHRcdFt1c2VycywgZ3JvdXBzXSA9IGF3YWl0IFByb21pc2UuYWxsKFthcGkubGlzdFVzZXJzKCksIGFwaS5saXN0R3JvdXBzKCldKTtcblx0XHRcdHBvcHVsYXRlRGlyZWN0b3J5UGlja2VycygpO1xuXHRcdFx0c2VsZWN0ZWRHcm91cHMgPSBbXTtcblx0XHRcdHJlbmRlck1lbWJlcnNoaXBzKCk7XG5cdFx0XHRzZXREaXJlY3RvcnlDb250cm9sc0VuYWJsZWQodHJ1ZSk7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRgTG9hZGVkICR7dXNlcnMubGVuZ3RofSB1c2VyKHMpIGFuZCAke2dyb3Vwcy5sZW5ndGh9IGdyb3VwKHMpLmAsXG5cdFx0XHRcdFwiUGljayBhIHVzZXIgdG8gc2VlIHRoZSBncm91cHMgdGhleSBiZWxvbmcgdG8uXCJcblx0XHRcdF07XG5cdFx0fSk7XG5cdH0pO1xuXG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZi11c2VyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcblx0XHRjb25zdCB1c2VyID0gc2VsZWN0ZWRVc2VyKCk7XG5cdFx0aWYgKHVzZXIgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0c2VsZWN0ZWRHcm91cHMgPSBbXTtcblx0XHRcdHJlbmRlck1lbWJlcnNoaXBzKCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdHZvaWQgcnVuVXNlcnMoYHF1ZXJ5IHVzZXIgwrcgJHt1c2VyLmlkfWAsIGFzeW5jIChhcGkpID0+IHtcblx0XHRcdGF3YWl0IHJlZnJlc2hNZW1iZXJzaGlwcyhhcGkpO1xuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0YCR7dXNlckxhYmVsKHVzZXIpfWAsXG5cdFx0XHRcdGBCZWxvbmdzIHRvICR7c2VsZWN0ZWRHcm91cHMubGVuZ3RofSBncm91cChzKTogJHtzZWxlY3RlZEdyb3Vwcy5tYXAoKGcpID0+IGcuaWQpLmpvaW4oXCIsIFwiKSB8fCBcIm5vbmVcIn1gXG5cdFx0XHRdO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bkFkZFRvR3JvdXBcIik/LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0Y29uc3QgdXNlciA9IHNlbGVjdGVkVXNlcigpO1xuXHRcdGNvbnN0IGdyb3VwVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2YtYWRkLWdyb3VwXCIpPy52YWx1ZSA/PyBcIlwiO1xuXHRcdGlmICh1c2VyID09PSB1bmRlZmluZWQgfHwgZ3JvdXBVdWlkID09PSBcIlwiKSB7XG5cdFx0XHRub3RpY2UoXCJTZWxlY3QgYSB1c2VyIGFuZCBhIGdyb3VwIGZpcnN0LlwiLCBcImVycm9yXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBncm91cCA9IGdyb3Vwcy5maW5kKChjYW5kaWRhdGUpID0+IGNhbmRpZGF0ZS51dWlkID09PSBncm91cFV1aWQpO1xuXHRcdHZvaWQgcnVuVXNlcnMoYG11dGF0aW9uIGFkZFVzZXJUb0dyb3VwIMK3ICR7Z3JvdXA/LmlkID8/IGdyb3VwVXVpZH1gLCBhc3luYyAoYXBpKSA9PiB7XG5cdFx0XHRhd2FpdCBhcGkuYWRkVXNlclRvR3JvdXAodXNlci51dWlkLCBncm91cFV1aWQpO1xuXHRcdFx0YXdhaXQgcmVmcmVzaE1lbWJlcnNoaXBzKGFwaSk7XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRgQWRkZWQgJHt1c2VyLmlkfSB0byBcIiR7Z3JvdXA/LmlkID8/IGdyb3VwVXVpZH1cIi5gLFxuXHRcdFx0XHRgTm93IGluICR7c2VsZWN0ZWRHcm91cHMubGVuZ3RofSBncm91cChzKTogJHtzZWxlY3RlZEdyb3Vwcy5tYXAoKGcpID0+IGcuaWQpLmpvaW4oXCIsIFwiKSB8fCBcIm5vbmVcIn1gXG5cdFx0XHRdO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0blN3aXRjaEdyb3VwXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGNvbnN0IHVzZXIgPSBzZWxlY3RlZFVzZXIoKTtcblx0XHRjb25zdCBmcm9tVXVpZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3I8SFRNTFNlbGVjdEVsZW1lbnQ+KFwiI2YtZnJvbS1ncm91cFwiKT8udmFsdWUgPz8gXCJcIjtcblx0XHRjb25zdCB0b1V1aWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yPEhUTUxTZWxlY3RFbGVtZW50PihcIiNmLXRvLWdyb3VwXCIpPy52YWx1ZSA/PyBcIlwiO1xuXHRcdGlmICh1c2VyID09PSB1bmRlZmluZWQgfHwgZnJvbVV1aWQgPT09IFwiXCIgfHwgdG9VdWlkID09PSBcIlwiKSB7XG5cdFx0XHRub3RpY2UoXCJTZWxlY3QgYSB1c2VyLCBhIGdyb3VwIHRvIGxlYXZlLCBhbmQgYSBncm91cCB0byBqb2luLlwiLCBcImVycm9yXCIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRjb25zdCBmcm9tID0gZ3JvdXBzLmZpbmQoKGNhbmRpZGF0ZSkgPT4gY2FuZGlkYXRlLnV1aWQgPT09IGZyb21VdWlkKT8uaWQgPz8gZnJvbVV1aWQ7XG5cdFx0Y29uc3QgdG8gPSBncm91cHMuZmluZCgoY2FuZGlkYXRlKSA9PiBjYW5kaWRhdGUudXVpZCA9PT0gdG9VdWlkKT8uaWQgPz8gdG9VdWlkO1xuXG5cdFx0dm9pZCBydW5Vc2VycyhgbXV0YXRpb24gYWRkVXNlclRvR3JvdXAgKyByZW1vdmVVc2VyRnJvbUdyb3VwIMK3ICR7ZnJvbX0g4oaSICR7dG99YCwgYXN5bmMgKGFwaSkgPT4ge1xuXHRcdFx0Y29uc3QgcmVzdWx0ID0gYXdhaXQgYXBpLnN3aXRjaEdyb3VwKHVzZXIudXVpZCwgZnJvbVV1aWQsIHRvVXVpZCk7XG5cdFx0XHQvLyBSZS1yZWFkIGJlZm9yZSByZXBvcnRpbmcgZWl0aGVyIHdheTogb24gYSBoYWxmLWFwcGxpZWQgc3dpdGNoIHRoZVxuXHRcdFx0Ly8gbWVtYmVyc2hpcHMgbGlzdCBpcyB0aGUgZXZpZGVuY2Ugb2Ygd2hhdCBhY3R1YWxseSBsYW5kZWQuXG5cdFx0XHRhd2FpdCByZWZyZXNoTWVtYmVyc2hpcHMoYXBpKTtcblxuXHRcdFx0aWYgKHJlc3VsdC5wYXJ0aWFsRmFpbHVyZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIFN1cmZhY2VkIGFzIGEgZmFpbHVyZSwgYmVjYXVzZSBhIGhhbGYtYXBwbGllZCBzd2l0Y2ggaXMgb25lLlxuXHRcdFx0XHQvLyBUaGUgZGV0YWlsIHNheXMgZXhhY3RseSB3aGljaCBzdGVwIGxhbmRlZCwgc28gdGhlIG9wZXJhdG9yXG5cdFx0XHRcdC8vIGtub3dzIHRvIHJldHJ5IHRoZSByZW1vdmUgcmF0aGVyIHRoYW4gdGhlIHdob2xlIHN3aXRjaC5cblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdGBIYWxmLWFwcGxpZWQ6ICR7dXNlci5pZH0gd2FzIGFkZGVkIHRvIFwiJHt0b31cIiBidXQgTk9UIHJlbW92ZWQgZnJvbSBcIiR7ZnJvbX1cIiwgYCArXG5cdFx0XHRcdFx0XHRgc28gdGhleSBhcmUgbm93IGluIEJPVEggZ3JvdXBzLiBSZXRyeSB0aGUgcmVtb3ZhbC4gVGhlIHNlcnZlciBzYWlkOiAke3Jlc3VsdC5wYXJ0aWFsRmFpbHVyZX1gXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRgU3dpdGNoZWQgJHt1c2VyLmlkfTogam9pbmVkIFwiJHt0b31cIiwgbGVmdCBcIiR7ZnJvbX1cIi5gLFxuXHRcdFx0XHRcIlR3byBtdXRhdGlvbnMsIGluIHRoYXQgb3JkZXIg4oCUIHRoZSBBUEkgaGFzIG5vIGF0b21pYyBtb3ZlLlwiLFxuXHRcdFx0XHRgTm93IGluICR7c2VsZWN0ZWRHcm91cHMubGVuZ3RofSBncm91cChzKTogJHtzZWxlY3RlZEdyb3Vwcy5tYXAoKGcpID0+IGcuaWQpLmpvaW4oXCIsIFwiKSB8fCBcIm5vbmVcIn1gXG5cdFx0XHRdO1xuXHRcdH0pO1xuXHR9KTtcblxuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2J0bkNsZWFyXCIpPy5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdGlmIChsb2dFbCAhPT0gbnVsbCkge1xuXHRcdFx0bG9nRWwucmVwbGFjZUNoaWxkcmVuKCk7XG5cdFx0XHRjb25zdCBlbXB0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRlbXB0eS5jbGFzc05hbWUgPSBcImxvZ19fZW1wdHlcIjtcblx0XHRcdGVtcHR5LmlkID0gXCJsb2dFbXB0eVwiO1xuXHRcdFx0ZW1wdHkudGV4dENvbnRlbnQgPSBcIlJlcXVlc3RzIGFuZCB0aGVpciByZXNwb25zZXMgYXBwZWFyIGhlcmUuXCI7XG5cdFx0XHRsb2dFbC5hcHBlbmQoZW1wdHkpO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gLS0tIGZpcnN0IHBhaW50IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0Y29uc3QgZW5kcG9pbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VuZHBvaW50XCIpO1xuXHRpZiAoZW5kcG9pbnQgIT09IG51bGwpIHtcblx0XHRlbmRwb2ludC50ZXh0Q29udGVudCA9IGAke0JBU0VfVVJMID09PSBcIlwiID8gXCJ7QkFTRV9VUkx9XCIgOiBCQVNFX1VSTH0ke0VORFBPSU5UX1BBVEh9YDtcblx0fVxuXHRhcHBseVR5cGVWaXNpYmlsaXR5KCk7XG5cdHNldFNpZ25lZEluKHVuZGVmaW5lZCk7XG5cblx0aWYgKGhhc0F1dGhvcml6YXRpb25SZXNwb25zZSgpKSB7XG5cdFx0Ly8gQmFjayBmcm9tIHRoZSBhdXRob3JpemF0aW9uIHNlcnZlciB3aXRoIGEgY29kZSAob3IgYW4gZXJyb3IpLlxuXHRcdGlmIChjb25maWd1cmVkKCkpIHtcblx0XHRcdGNvbXBsZXRlU2lnbkluKEJBU0VfVVJMLCBDTElFTlRfSUQpXG5cdFx0XHRcdC50aGVuKCh0b2tlbikgPT4ge1xuXHRcdFx0XHRcdHNldFNpZ25lZEluKHRva2VuKTtcblx0XHRcdFx0XHRub3RpY2UoXCJTaWduZWQgaW4uIFlvdXIgdG9rZW4gaXMgaGVsZCBpbiBtZW1vcnkgZm9yIHRoaXMgcGFnZSBvbmx5LlwiLCBcImluZm9cIik7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5jYXRjaChmYWlsU2lnbkluKTtcblx0XHR9XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gUHJpbnRlZCBiZWZvcmUgdGhlIGNvbmZpZ3VyYXRpb24gY2hlY2ssIGRlbGliZXJhdGVseTogeW91IG5lZWQgdGhpcyB2YWx1ZVxuXHQvLyB0byByZWdpc3RlciB0aGUgT0F1dGggYXBwIHRoYXQgaXNzdWVzIHRoZSBjbGllbnQgaWQsIHNvIGl0IGNhbm5vdCBkZXBlbmRcblx0Ly8gb24gYWxyZWFkeSBoYXZpbmcgb25lLlxuXHRub3RpY2UoYE9BdXRoIHJlZGlyZWN0IFVSSSBmb3IgT0F1dGggYXBwIHJlZ2lzdHJhdGlvbjogJHtyZWRpcmVjdFVyaSgpfWAsIFwiaW5mb1wiKTtcblxuXHRpZiAoY29uZmlndXJlZCgpKSB7XG5cdFx0bm90aWNlKCdOb3Qgc2lnbmVkIGluLiBDaG9vc2UgXCJTaWduIGluXCIgdG8gYXV0aG9yaXplIHRoaXMgcGFnZS4nLCBcImluZm9cIik7XG5cdH0gZWxzZSB7XG5cdFx0bm90aWNlKFwiT0F1dGggaXMgbm90IGNvbmZpZ3VyZWQsIHRvIHVzZSBKV1QgaW5zdGVhZCBwYXN0ZSBhbiBBUEkgSldUIGFib3ZlXCIsIFwiaW5mb1wiKTtcblx0fVxufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdGlhbGl6ZURPTSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=