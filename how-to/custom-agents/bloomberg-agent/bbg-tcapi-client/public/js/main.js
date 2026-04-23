/******/ var __webpack_modules__ = ({

/***/ "../../../../node_modules/@openfin/core/out/stub.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/@openfin/core/out/stub.js ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({ value: true }));

var require$$0 = __webpack_require__(/*! events */ "../../../../node_modules/events/events.js");
var require$$0$1 = __webpack_require__(/*! lodash/cloneDeep */ "../../../../node_modules/lodash/cloneDeep.js");
var require$$3 = __webpack_require__(/*! lodash/isEqual */ "../../../../node_modules/lodash/isEqual.js");

function _mergeNamespaces(n, m) {
	m.forEach(function (e) {
		e && typeof e !== 'string' && !Array.isArray(e) && Object.keys(e).forEach(function (k) {
			if (k !== 'default' && !(k in n)) {
				var d = Object.getOwnPropertyDescriptor(e, k);
				Object.defineProperty(n, k, d.get ? d : {
					enumerable: true,
					get: function () { return e[k]; }
				});
			}
		});
	});
	return Object.freeze(n);
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

var OpenFin$2 = {};

var events = {};

var application$1 = {};

/**
 * Namespace for events that can be emitted by an {@link OpenFin.Application}.  Includes events
 * re-propagated from the {@link OpenFin.Window} (and, transitively, {@link OpenFin.View}) level, prefixed with `window-` (and also, if applicable, `view-`).
 * For example, a view's "attached" event will fire as 'window-view-attached' at the application level.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * This namespace contains only payload shapes for events that are unique to `Application`.  Events that propagate to `Application` from
 * child {@link OpenFin.Window windows} and {@link OpenFin.View views} are defined in the {@link OpenFin.WindowEvents} and
 * {@link OpenFin.ViewEvents} namespaces.  For a list of valid string keys for *all* application events, see {@link Application.on Application.on}.
 *
 * {@link ApplicationSourcedEvent Application-sourced events} (i.e. those that have not propagated from {@link OpenFin.ViewEvents Views}
 * or {@link OpenFin.WindowEvents Windows} re-propagate to {@link OpenFin.SystemEvents System} with their type string prefixed with `application-`.
 * {@link ApplicationWindowEvent Application events that are tied to Windows but do not propagate from them}
 * are propagated to `System` without any type string prefixing.
 *
 * "Requested" events (e.g. {@link RunRequestedEvent}) do not propagate.
 *
 * @packageDocumentation
 */
Object.defineProperty(application$1, "__esModule", { value: true });

var base$1 = {};

/**
 * Namespace for shared event payloads and utility types common to all event emitters.
 *
 * @packageDocumentation
 */
Object.defineProperty(base$1, "__esModule", { value: true });

var externalApplication$1 = {};

/**
 * Namespace for events that can be transmitted by an {@link OpenFin.ExternalApplication}.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * For a list of valid string keys for external application events, see {@link ExternalApplication.on ExternalApplication.on}.
 *
 * @packageDocumentation
 */
Object.defineProperty(externalApplication$1, "__esModule", { value: true });

var frame$1 = {};

Object.defineProperty(frame$1, "__esModule", { value: true });

var globalHotkey$1 = {};

/**
 *
 * Namespace for events that can be transmitted by {@link GlobalHotkey.GlobalHotkey}.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * For a list of valid string keys for global hotkey events, see {@link GlobalHotkey.GlobalHotkey.on GlobalHotkey.on}.
 *
 * @packageDocumentation
 */
Object.defineProperty(globalHotkey$1, "__esModule", { value: true });

var platform$1 = {};

/**
 *
 * Namespace for events that can emitted by a {@link OpenFin.Platform}.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * The Platform `EventEmitter` is a superset of the {@link OpenFin.Application} `EventEmitter`,
 * meaning it can listen to all {@link OpenFin.ApplicationEvents Application events} in addition to the
 * Platform-specific events listed here.  For a list of valid string keys for *all* platform events, see
 * {@link Platform.on Platform.on}.
 *
 * @packageDocumentation
 */
Object.defineProperty(platform$1, "__esModule", { value: true });

var system$1 = {};

/**
 * Namespace for runtime-wide OpenFin events emitted by {@link System.System}.  Includes events
 * re-propagated from {@link OpenFin.Application}, {@link OpenFin.Window}, and {@link OpenFin.View} (prefixed with `application-`, `window-`, and `view-`).  All
 * event propagations are visible at the System level. Propagated events from WebContents (windows, views, frames) to the Application level will *not*
 * transitively re-propagate to the System level, because they are already visible at the system level and contain the identity
 * of the application.  For example, an application's "closed" event will fire as 'application-closed' at the system level.  A view's 'shown' event
 * will be visible as 'view-shown' at the system level, but *not* as `application-window-view-shown`.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * This namespace contains only payload shapes for events that are unique to `System`.  Events that propagate to `System` from
 * child {@link OpenFin.Application applications}, {@link OpenFin.Window windows}, and {@link OpenFin.View views} are defined in the
 * {@link OpenFin.ApplicationEvents}, {@link OpenFin.WindowEvents}, and {@link OpenFin.ViewEvents} namespaces.  For a list of valid string keys for *all*
 * system events, see {@link System.on System.on}.
 *
 * @packageDocumentation
 */
Object.defineProperty(system$1, "__esModule", { value: true });

var view$1 = {};

/**
 * Namespace for events that can be emitted by a {@link OpenFin.View}.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * This namespace contains only payload shapes for events that are unique to `View`.  Events that are shared between all `WebContents`
 * (i.e. {@link OpenFin.Window}, {@link OpenFin.View}) are defined in {@link OpenFin.WebContentsEvents}.  For a list
 * of valid string keys for *all* View events, see {@link View.on View.on}.
 *
 * View events propagate to their parent {@link OpenFin.WindowEvents Window}, {@link OpenFin.ApplicationEvents Application},
 * and {@link OpenFin.SystemEvents System} with an added `viewIdentity` property and their event types prefixed with `'view-'`.
 *
 * @packageDocumentation
 */
Object.defineProperty(view$1, "__esModule", { value: true });

var webcontents = {};

/**
 * Namespace for events shared by all OpenFin WebContents elements (i.e. {@link OpenFin.Window},
 * {@link OpenFin.View}).
 *
 * WebContents events will re-emit on parent entities - e.g., a propagating event in a view will also be emitted on the view's
 * parent window, and propagating events in a window will also be emitted on the window's parent {@link OpenFin.Application}.
 *
 * @packageDocumentation
 */
Object.defineProperty(webcontents, "__esModule", { value: true });

var window$2 = {};

/**
 * Namespace for events that can be emitted by a {@link OpenFin.Window}.
 *
 * Event payloads are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 * Events gain metadata as they propagate, which is *not* present on the explicit payload interfaces.  To refer to the full type
 * of an event as it would be raised on this emitter, use {@link Payload}.
 *
 * This namespace contains only payload shapes for events that are unique to `Window`.  Events that are shared between all `WebContents`
 * (i.e. {@link OpenFin.Window}, {@link OpenFin.View}) are defined in {@link OpenFin.WebContentsEvents}. Events that
 * propagate from `View` are defined in {@link OpenFin.ViewEvents}. For a list of valid string keys for *all* Window events, see
 * {@link Window.on Window.on}
 *
 * {@link OpenFin.WindowEvents.WindowSourcedEvent Window-sourced events} (i.e. those that are not propagated from a
 * {@link OpenFin.ViewEvents View}) propagate to their parent {@link OpenFin.ApplicationEvents Application} and
 * {@link OpenFin.SystemEvents System} with their event types prefixed with `'window-'`).
 *
 * "Requested" events (e.g. {@link AuthRequestedEvent}) do not propagate to `System.  The {@link OpenFin.WindowEvents.WindowCloseRequestedEvent}
 * does not propagate at all.
 *
 * @packageDocumentation
 */
Object.defineProperty(window$2, "__esModule", { value: true });

/**
 * Namespace for OpenFin event types. Each entity that emits OpenFin events has its own sub-namespace. Event payloads
 * themselves are documented as interfaces, while algebraic helper types and derived types are documented as type aliases.
 *
 * #### Event emitters
 *
 * The following entities emit OpenFin events, and have corresponding sub-namespaces:
 *
 * * {@link OpenFin.Application}: {@link OpenFin.ApplicationEvents}
 * * {@link OpenFin.ExternalApplication}: {@link OpenFin.ExternalApplicationEvents}
 * * {@link OpenFin.Frame}: {@link OpenFin.FrameEvents}
 * * {@link OpenFin.GlobalHotkey}: {@link OpenFin.GlobalHotkeyEvents}
 * * {@link OpenFin.Platform}: {@link OpenFin.PlatformEvents}
 * * {@link OpenFin.System}: {@link OpenFin.SystemEvents}
 * * {@link OpenFin.View}: {@link OpenFin.ViewEvents}
 * * {@link OpenFin.Window}: {@link OpenFin.WindowEvents}
 *
 * These `EventEmitter` entities share a common set of methods for interacting with the OpenFin event bus, which can be
 * seen on the individual documentation pages for each entity type.
 *
 * Registering event handlers is an asynchronous operation. It is important to ensure that the returned Promises are awaited to reduce the
 * risk of race conditions.
 *
 * When the `EventEmitter` receives an event from the browser process and emits on the renderer, all of the functions attached to that
 * specific event are called synchronously. Any values returned by the called listeners are ignored and will be discarded.  If the window document
 * is destroyed by page navigation or reload, its registered event listeners will be removed.
 *
 * We recommend using Arrow Functions for event listeners to ensure the this scope is consistent with the original function context.
 *
 * Events re-propagate from smaller/more-local scopes to larger/more-global scopes.  For example, an event emitted on a specific
 * view will propagate to the window in which the view is embedded, and then to the application in which the window is running, and
 * finally to the OpenFin runtime itself at the "system" level.  For details on propagation semantics, see the namespace for
 * the propagating (or propagated-to) entity.
 *
 * If you need the payload type for a specific type of event (especially propagated events), use the emitting topic's `Payload` generic
 * (e.g. {@link WindowEvents.Payload}) with the event's `type` string.  For example, the payload of
 * a {@link ViewEvents.CreatedEvent} after it has propagated to its parent {@link WindowEvents Window} can be found with
 * `WindowEvents.Payload<'view-created'>`.
 *
 * @packageDocumentation
 */
var __createBinding$1 = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault$1 = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar$1 = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding$1(result, mod, k);
    __setModuleDefault$1(result, mod);
    return result;
};
Object.defineProperty(events, "__esModule", { value: true });
events.WindowEvents = events.WebContentsEvents = events.ViewEvents = events.SystemEvents = events.PlatformEvents = events.GlobalHotkeyEvents = events.FrameEvents = events.ExternalApplicationEvents = events.BaseEvents = events.ApplicationEvents = void 0;
const ApplicationEvents = __importStar$1(application$1);
events.ApplicationEvents = ApplicationEvents;
const BaseEvents = __importStar$1(base$1);
events.BaseEvents = BaseEvents;
const ExternalApplicationEvents = __importStar$1(externalApplication$1);
events.ExternalApplicationEvents = ExternalApplicationEvents;
const FrameEvents = __importStar$1(frame$1);
events.FrameEvents = FrameEvents;
const GlobalHotkeyEvents = __importStar$1(globalHotkey$1);
events.GlobalHotkeyEvents = GlobalHotkeyEvents;
const PlatformEvents = __importStar$1(platform$1);
events.PlatformEvents = PlatformEvents;
const SystemEvents = __importStar$1(system$1);
events.SystemEvents = SystemEvents;
const ViewEvents = __importStar$1(view$1);
events.ViewEvents = ViewEvents;
const WebContentsEvents = __importStar$1(webcontents);
events.WebContentsEvents = WebContentsEvents;
const WindowEvents = __importStar$1(window$2);
events.WindowEvents = WindowEvents;

(function (exports) {
	/**
	 * Top-level namespace for types referenced by the OpenFin API.  Contains:
	 *
	 * * The type of the global `fin` entry point ({@link FinApi})
	 * * Classes that act as static namespaces returned from the `fin` global (e.g. {@link ApplicationModule}, accessible via `fin.Application`)
	 * * Instance classes that are returned from API calls (e.g. {@link Application}, accessible via `fin.Application.getCurrentSync()`)
	 * * Parameter shapes for API methods (e.g. {@link ApplicationOptions}, used in `fin.Application.start()`)
	 * * Event namespaces and payload union types (e.g. {@link ApplicationEvents} and {@link ApplicationEvent})
	 *
	 * @packageDocumentation
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	// Deprecated shim to preserve v30 namespace names
	__exportStar(events, exports); 
} (OpenFin$2));

var OpenFin = /*@__PURE__*/getDefaultExportFromCjs(OpenFin$2);

var OpenFin$1 = /*#__PURE__*/_mergeNamespaces({
	__proto__: null,
	default: OpenFin
}, [OpenFin$2]);

var fin$2 = {};

var system = {};

var base = {};

var promises = {};

Object.defineProperty(promises, "__esModule", { value: true });
promises.promiseMapSerial = promises.serial = promises.promiseMap = promises.promisify = void 0;
function promisify(func) {
    return (...args) => new Promise((resolve, reject) => {
        func(...args, (err, val) => (err ? reject(err) : resolve(val)));
    });
}
promises.promisify = promisify;
async function promiseMap(arr, asyncF) {
    return Promise.all(arr.map(asyncF));
}
promises.promiseMap = promiseMap;
async function serial(arr) {
    const ret = [];
    for (const func of arr) {
        // eslint-disable-next-line no-await-in-loop
        const next = await func();
        ret.push(next);
    }
    return ret;
}
promises.serial = serial;
async function promiseMapSerial(arr, func) {
    return serial(arr.map((value, index, array) => () => func(value, index, array)));
}
promises.promiseMapSerial = promiseMapSerial;

var __classPrivateFieldSet$h = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$i = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _EmitterBase_emitterAccessor, _EmitterBase_deregisterOnceListeners;
Object.defineProperty(base, "__esModule", { value: true });
base.Reply = base.EmitterBase = base.Base = void 0;
const promises_1 = promises;
class Base {
    /**
     * @internal
     */
    constructor(wire) {
        /**
         * @internal
         * @deprecated
         */
        this.isNodeEnvironment = () => {
            return this.wire.environment.type === 'node';
        };
        /**
         * @internal
         * @deprecated
         */
        this.isOpenFinEnvironment = () => {
            return this.wire.environment.type === 'openfin';
        };
        /**
         * @internal
         * @deprecated
         */
        this.isBrowserEnvironment = () => {
            return this.wire.environment.type === 'other';
        };
        this.wire = wire;
    }
    get fin() {
        return this.wire.getFin();
    }
    /**
     * @deprecated `me` should only be accessed from the `fin` global ({@link FinApi.me}); access through entity classes is not
     * guaranteed to behave sensibly in all calling contexts.
     */
    get me() {
        return this.wire.me;
    }
}
base.Base = Base;
/**
 * An entity that emits OpenFin events.
 *
 * @remarks Event-binding methods are asynchronous as they must cross process boundaries
 * and setup the listener in the browser process.  When the `EventEmitter` receives an event from the browser process
 * and emits on the renderer, all of the functions attached to that specific event are called synchronously.  Any values
 * returned by the called listeners are ignored and will be discarded.  If the execution context of the window is destroyed
 * by page navigation or reload, any events that have been setup in that context will be destroyed.
 *
 * It is important to keep in mind that when an ordinary listener function is called, the standard `this` keyword is intentionally
 * set to reference the `EventEmitter` instance to which the listener is attached.  It is possible to use ES6 Arrow Functions as
 * listeners, however, when doing so, the `this` keyword will no longer reference the `EventEmitter` instance.
 *
 * Events re-propagate from smaller/more-local scopes to larger/more-global scopes.  For example, an event emitted on a specific
 * view will propagate to the window in which the view is embedded, and then to the application in which the window is running, and
 * finally to the OpenFin runtime itself at the "system" level.  Re-propagated events are prefixed with the name of the scope in which
 * they originated - for example, a "shown" event emitted on a view will be re-propagated at the window level as "view-shown", and
 * then to the application as "window-view-shown", and finally at the system level as "application-window-view-shown".
 *
 * All event propagations are visible at the System level, regardless of source, so transitive re-propagations (e.g. from view to window
 * to application) are visible in their entirety at the system level.  So, we can listen to the above event as "shown", "view-shown",
 * "window-view-shown", or "application-window-view-shown."
 */
class EmitterBase extends Base {
    constructor(wire, topic, ...additionalAccessors) {
        super(wire);
        this.topic = topic;
        _EmitterBase_emitterAccessor.set(this, void 0);
        _EmitterBase_deregisterOnceListeners.set(this, void 0);
        this.eventNames = () => (this.hasEmitter() ? this.getOrCreateEmitter().eventNames() : []);
        /**
         * @internal
         */
        this.emit = (eventType, payload, ...args) => {
            return this.hasEmitter() ? this.getOrCreateEmitter().emit(eventType, payload, ...args) : false;
        };
        this.hasEmitter = () => this.wire.eventAggregator.has(__classPrivateFieldGet$i(this, _EmitterBase_emitterAccessor, "f"));
        /**
         * Cleans up after removal of a listener, e.g. deleting any lingering deregistration handlers for a
         * `once` subscription.
         *
         * @remarks Implementing this as a `removeListener` handler ensures that direct removal of a listener
         * on the base emitter will not leak additional core handlers.  We could do this in the forwarding method,
         * which would involve less "magic," but would be more-vulnerable to accidental re-introduction of a leak.
         */
        this.cleanUpRemovedListener = (eventType, listener) => {
            const deregister = __classPrivateFieldGet$i(this, _EmitterBase_deregisterOnceListeners, "f").get(listener);
            if (deregister) {
                const emitter = this.wire.eventAggregator.getOrCreate(__classPrivateFieldGet$i(this, _EmitterBase_emitterAccessor, "f"));
                emitter.removeListener(eventType, deregister);
            }
        };
        this.getOrCreateEmitter = () => {
            const emitter = this.wire.eventAggregator.getOrCreate(__classPrivateFieldGet$i(this, _EmitterBase_emitterAccessor, "f"));
            if (!emitter.listeners('removeListener').includes(this.cleanUpRemovedListener)) {
                emitter.on('removeListener', this.cleanUpRemovedListener);
            }
            return emitter;
        };
        this.listeners = (type) => this.hasEmitter() ? this.getOrCreateEmitter().listeners(type) : [];
        this.listenerCount = (type) => this.hasEmitter() ? this.getOrCreateEmitter().listenerCount(type) : 0;
        this.registerEventListener = async (eventType, options = {}, applySubscription, undoSubscription) => {
            const runtimeEvent = {
                ...this.identity,
                timestamp: options.timestamp || Date.now(),
                topic: this.topic,
                type: eventType
            };
            const emitter = this.getOrCreateEmitter();
            // We apply the subscription and then undo if the async call fails to avoid
            // indeterminacy in subscription application order, which can break things elsewhere
            applySubscription(emitter);
            try {
                await this.wire.sendAction('subscribe-to-desktop-event', runtimeEvent);
            }
            catch (e) {
                undoSubscription(emitter);
                this.deleteEmitterIfNothingRegistered(emitter);
                throw e;
            }
        };
        this.deregisterEventListener = async (eventType, options = {}) => {
            if (this.hasEmitter()) {
                const runtimeEvent = {
                    ...this.identity,
                    timestamp: options.timestamp || Date.now(),
                    topic: this.topic,
                    type: eventType
                };
                await this.wire.sendAction('unsubscribe-to-desktop-event', runtimeEvent).catch(() => null);
                return this.getOrCreateEmitter();
            }
            // This will only be reached if unsubscribe from event that does not exist but do not want to error here
            return Promise.resolve();
        };
        __classPrivateFieldSet$h(this, _EmitterBase_emitterAccessor, [topic, ...additionalAccessors], "f");
        __classPrivateFieldSet$h(this, _EmitterBase_deregisterOnceListeners, new WeakMap(), "f");
        this.listeners = (event) => this.hasEmitter() ? this.getOrCreateEmitter().listeners(event) : [];
    }
    /**
     * Adds a listener to the end of the listeners array for the specified event.
     *
     * @remarks Event payloads are documented in the {@link OpenFin.Events} namespace.
     */
    async on(eventType, listener, options) {
        await this.registerEventListener(eventType, options, (emitter) => {
            emitter.on(eventType, listener);
        }, (emitter) => {
            emitter.removeListener(eventType, listener);
        });
        return this;
    }
    /**
     * Adds a listener to the end of the listeners array for the specified event.
     */
    async addListener(eventType, listener, options) {
        return this.on(eventType, listener, options);
    }
    /**
     * Adds a one time listener for the event. The listener is invoked only the first time the event is fired, after which it is removed.
     *
     * @remarks Event payloads are documented in the {@link OpenFin.Events} namespace.
     */
    async once(eventType, listener, options) {
        const deregister = () => this.deregisterEventListener(eventType);
        __classPrivateFieldGet$i(this, _EmitterBase_deregisterOnceListeners, "f").set(listener, deregister);
        await this.registerEventListener(eventType, options, (emitter) => {
            emitter.once(eventType, deregister);
            emitter.once(eventType, listener);
        }, (emitter) => {
            emitter.removeListener(eventType, deregister);
            emitter.removeListener(eventType, listener);
        });
        return this;
    }
    /**
     * Adds a listener to the beginning of the listeners array for the specified event.
     *
     * @remarks Event payloads are documented in the {@link OpenFin.Events} namespace.
     */
    async prependListener(eventType, listener, options) {
        await this.registerEventListener(eventType, options, (emitter) => {
            emitter.prependListener(eventType, listener);
        }, (emitter) => {
            emitter.removeListener(eventType, listener);
        });
        return this;
    }
    /**
     * Adds a one time listener for the event. The listener is invoked only the first time the event is fired,
     * after which it is removed. The listener is added to the beginning of the listeners array.
     *
     * @remarks Event payloads are documented in the {@link OpenFin.Events} namespace.
     */
    async prependOnceListener(eventType, listener, options) {
        const deregister = () => this.deregisterEventListener(eventType);
        __classPrivateFieldGet$i(this, _EmitterBase_deregisterOnceListeners, "f").set(listener, deregister);
        await this.registerEventListener(eventType, options, (emitter) => {
            emitter.prependOnceListener(eventType, listener);
            emitter.once(eventType, deregister);
        }, (emitter) => {
            emitter.removeListener(eventType, listener);
            emitter.removeListener(eventType, deregister);
        });
        return this;
    }
    /**
     * Remove a listener from the listener array for the specified event.
     *
     * @remarks Caution: Calling this method changes the array indices in the listener array behind the listener.
     */
    async removeListener(eventType, listener, options) {
        const emitter = await this.deregisterEventListener(eventType, options);
        if (emitter) {
            emitter.removeListener(eventType, listener);
            this.deleteEmitterIfNothingRegistered(emitter);
        }
        return this;
    }
    async deregisterAllListeners(eventType) {
        const runtimeEvent = { ...this.identity, type: eventType, topic: this.topic };
        if (this.hasEmitter()) {
            const emitter = this.getOrCreateEmitter();
            const refCount = emitter.listenerCount(runtimeEvent.type);
            const unsubscribePromises = [];
            for (let i = 0; i < refCount; i++) {
                unsubscribePromises.push(this.wire.sendAction('unsubscribe-to-desktop-event', runtimeEvent).catch(() => null));
            }
            await Promise.all(unsubscribePromises);
            return emitter;
        }
        return undefined;
    }
    /**
     * Removes all listeners, or those of the specified event.
     *
     */
    async removeAllListeners(eventType) {
        const removeByEvent = async (event) => {
            const emitter = await this.deregisterAllListeners(event);
            if (emitter) {
                emitter.removeAllListeners(event);
                this.deleteEmitterIfNothingRegistered(emitter);
            }
        };
        if (eventType) {
            await removeByEvent(eventType);
        }
        else if (this.hasEmitter()) {
            const events = this.getOrCreateEmitter().eventNames();
            await (0, promises_1.promiseMap)(events, removeByEvent);
        }
        return this;
    }
    deleteEmitterIfNothingRegistered(emitter) {
        if (emitter.eventNames().every((type) => type === 'removeListener')) {
            this.wire.eventAggregator.delete(__classPrivateFieldGet$i(this, _EmitterBase_emitterAccessor, "f"));
        }
    }
}
base.EmitterBase = EmitterBase;
_EmitterBase_emitterAccessor = new WeakMap(), _EmitterBase_deregisterOnceListeners = new WeakMap();
class Reply {
}
base.Reply = Reply;

var transportErrors = {};

Object.defineProperty(transportErrors, "__esModule", { value: true });
transportErrors.RuntimeError = transportErrors.NotSupportedError = transportErrors.NotImplementedError = transportErrors.NoAckError = transportErrors.DuplicateCorrelationError = transportErrors.UnexpectedActionError = transportErrors.DisconnectedError = void 0;
class DisconnectedError extends Error {
    constructor(readyState) {
        super(`Expected websocket state OPEN but found ${readyState}`);
        this.readyState = readyState;
    }
}
transportErrors.DisconnectedError = DisconnectedError;
class UnexpectedActionError extends Error {
}
transportErrors.UnexpectedActionError = UnexpectedActionError;
class DuplicateCorrelationError extends Error {
}
transportErrors.DuplicateCorrelationError = DuplicateCorrelationError;
class NoAckError extends Error {
}
transportErrors.NoAckError = NoAckError;
class NotImplementedError extends Error {
}
transportErrors.NotImplementedError = NotImplementedError;
class NotSupportedError extends Error {
}
transportErrors.NotSupportedError = NotSupportedError;
class DeserializedError extends Error {
    constructor(err) {
        const { message, name, stack, ...rest } = err;
        super(message);
        if ('cause' in err && err.cause) {
            this.cause = new DeserializedError(err.cause);
        }
        this.name = name || 'Error';
        this.stack = stack ?? this.toString();
        Object.keys(rest)
            .filter((k) => k !== 'cause')
            .forEach((key) => {
            this[key] = rest[key];
        });
    }
}
// For documentation of the error methods being used see here: https://v8.dev/docs/stack-trace-api
class RuntimeError extends Error {
    static trimEndCallSites(err, takeUntilRegex) {
        // save original props
        const length = Error.stackTraceLimit;
        // eslint-disable-next-line no-underscore-dangle
        const _prepareStackTrace = Error.prepareStackTrace;
        // This will be called when we access the `stack` property
        Error.prepareStackTrace = (_, stack) => stack;
        // in channel errors, the error was already serialized so we need to handle both string and CallSite[]
        const isString = typeof err.stack === 'string';
        const stack = (isString ? err.stack?.split('\n') : err.stack) ?? [];
        // restore original props
        Error.prepareStackTrace = _prepareStackTrace;
        Error.stackTraceLimit = length;
        // stack is optional in non chromium contexts
        if (stack.length) {
            const newStack = [];
            // remove this call ONLY if it's not a string
            for (const line of isString ? stack : stack.slice(1)) {
                // inclusive take until
                newStack.push(line);
                if (takeUntilRegex.test(line.toString())) {
                    break;
                }
            }
            if (isString) {
                // maintain it as a string
                err.stack = newStack.join('\n');
            }
            else {
                err.stack = RuntimeError.prepareStackTrace(err, newStack);
            }
        }
    }
    static getCallSite(callsToRemove = 0) {
        const length = Error.stackTraceLimit;
        const realCallsToRemove = callsToRemove + 1; // remove this call;
        Error.stackTraceLimit = length + realCallsToRemove;
        // eslint-disable-next-line no-underscore-dangle
        const _prepareStackTrace = Error.prepareStackTrace;
        // This will be called when we access the `stack` property
        Error.prepareStackTrace = (_, stack) => stack;
        // stack is optional in non chromium contexts
        const stack = new Error().stack?.slice(realCallsToRemove) ?? [];
        Error.prepareStackTrace = _prepareStackTrace;
        Error.stackTraceLimit = length;
        return stack;
    }
    static prepareStackTrace(err, callSites) {
        if (typeof Error.prepareStackTrace === 'function') {
            return Error.prepareStackTrace(err, callSites);
        }
        // TODO: this is just a first iteration, we can make this "nicer" at some point
        // const EXCLUSIONS = ['IpcRenderer', 'Object.onMessage', 'Transport.onmessage', 'MessageReceiver.onmessage'];
        let stackTrace = `${err.name || 'Error'}: ${err.message || ''}\n`;
        stackTrace += callSites
            .map((line) => `    at ${line}`)
            // .filter((line) => !EXCLUSIONS.some((l) => line.includes(l)))
            .join('\n');
        return stackTrace;
    }
    /*

    NON filtered stack trace example from MTP page channel-errors.tsx:

    Caused by: ChannelError: Error from ch0
        at ChannelClient.dispatch (<anonymous>:3:119560)
        at eval (test-channel-errors.tsx:73:26)
        at ChannelProvider.processAction (<anonymous>:3:116748)
        at ChannelProvider.processAction (<anonymous>:3:149121)
        at MessageReceiver.processChannelMessage (<anonymous>:3:131909)
        at MessageReceiver.onmessage (<anonymous>:3:131232)
        at Transport.onmessage (<anonymous>:3:282049)
        at IpcRenderer.<anonymous> (<anonymous>:3:275150)
        at IpcRenderer.emit (node:electron/js2c/sandbox_bundle:2:34834)
        at Object.onMessage (node:electron/js2c/sandbox_bundle:2:51566)
    Caused by: ChannelError: Error from ch0
        at ChannelClient.dispatch (<anonymous>:3:119560)
        at eval (test-channel-errors.tsx:73:26)
        at ChannelProvider.processAction (<anonymous>:3:116748)
        at ChannelProvider.processAction (<anonymous>:3:149121)
        at MessageReceiver.processChannelMessage (<anonymous>:3:131909)
        at MessageReceiver.onmessage (<anonymous>:3:131232)
        at Transport.onmessage (<anonymous>:3:282049)
        at IpcRenderer.<anonymous> (<anonymous>:3:275150)
        at IpcRenderer.emit (node:electron/js2c/sandbox_bundle:2:34834)
        at Object.onMessage (node:electron/js2c/sandbox_bundle:2:51566)
    Caused by: ChannelError: Error from ch0
        at ChannelClient.dispatch (<anonymous>:3:119560)
        at eval (test-channel-errors.tsx:73:26)
        at ChannelProvider.processAction (<anonymous>:3:116748)
        at ChannelProvider.processAction (<anonymous>:3:149121)
        at MessageReceiver.processChannelMessage (<anonymous>:3:131909)
        at MessageReceiver.onmessage (<anonymous>:3:131232)
        at Transport.onmessage (<anonymous>:3:282049)
        at IpcRenderer.<anonymous> (<anonymous>:3:275150)
        at IpcRenderer.emit (node:electron/js2c/sandbox_bundle:2:34834)
        at Object.onMessage (node:electron/js2c/sandbox_bundle:2:51566)
    Caused by: ChannelError: Error from ch0
        at ChannelClient.dispatch (<anonymous>:3:119560)
        at eval (test-channel-errors.tsx:50:23)
        at ChannelProvider.processAction (<anonymous>:3:116748)
        at ChannelProvider.processAction (<anonymous>:3:149121)
        at MessageReceiver.processChannelMessage (<anonymous>:3:131909)
        at MessageReceiver.onmessage (<anonymous>:3:131232)
        at Transport.onmessage (<anonymous>:3:282049)
        at IpcRenderer.<anonymous> (<anonymous>:3:275150)
        at IpcRenderer.emit (node:electron/js2c/sandbox_bundle:2:34834)
        at Object.onMessage (node:electron/js2c/sandbox_bundle:2:51566)
    Caused by: Error: Error from ch0
        at eval (test-channel-errors.tsx:54:19)
        at ChannelProvider.processAction (<anonymous>:3:116748)
        at ChannelProvider.processAction (<anonymous>:3:149121)
        at MessageReceiver.processChannelMessage (<anonymous>:3:131909)
        at MessageReceiver.onmessage (<anonymous>:3:131232)
        at Transport.onmessage (<anonymous>:3:282049)
        at IpcRenderer.<anonymous> (<anonymous>:3:275150)
        at IpcRenderer.emit (node:electron/js2c/sandbox_bundle:2:34834)
        at Object.onMessage (node:electron/js2c/sandbox_bundle:2:51566)

    
    */
    constructor(payload, callSites) {
        const { reason, error } = payload;
        super(reason);
        this.name = this.constructor.name;
        if (error?.stack) {
            this.cause = new DeserializedError(error);
        }
        if (callSites) {
            this.stack = RuntimeError.prepareStackTrace(this, callSites);
        }
    }
}
transportErrors.RuntimeError = RuntimeError;

var window$1 = {};

var Factory$8 = {};

var validate = {};

Object.defineProperty(validate, "__esModule", { value: true });
validate.validateIdentity = void 0;
function validateIdentity(identity) {
    let errorMsg;
    if (typeof identity !== 'object' || typeof identity.uuid !== 'string') {
        errorMsg = 'Not a valid identity object';
    }
    return errorMsg;
}
validate.validateIdentity = validateIdentity;

var Instance$7 = {};

var application = {};

var Factory$7 = {};

var Instance$6 = {};

var view = {};

var Factory$6 = {};

var warnings = {};

Object.defineProperty(warnings, "__esModule", { value: true });
warnings.handleDeprecatedWarnings = void 0;
const handleDeprecatedWarnings = (options) => {
    if (options.contentNavigation?.whitelist ||
        options.contentNavigation?.blacklist ||
        options.contentRedirect?.whitelist ||
        options.contentRedirect?.blacklist) {
        console.warn(`The properties 'whitelist' and 'blacklist' have been marked as deprecated and will be removed in a future version. Please use 'allowlist' and 'denylist'.`);
    }
};
warnings.handleDeprecatedWarnings = handleDeprecatedWarnings;

var hasRequiredFactory$2;

function requireFactory$2 () {
	if (hasRequiredFactory$2) return Factory$6;
	hasRequiredFactory$2 = 1;
	Object.defineProperty(Factory$6, "__esModule", { value: true });
	Factory$6.ViewModule = void 0;
	const base_1 = base;
	const validate_1 = validate;
	const index_1 = requireView();
	const warnings_1 = warnings;
	/**
	 * Static namespace for OpenFin API methods that interact with the {@link View} class, available under `fin.View`.
	 */
	class ViewModule extends base_1.Base {
	    /**
	     * Creates a new View.
	     * @param options - View creation options
	     *
	     * @example
	     * ```js
	     * let view;
	     * async function createView() {
	     *     const me = await fin.Window.getCurrent();
	     *     return fin.View.create({
	     *         name: 'viewNameCreate',
	     *         target: me.identity,
	     *         bounds: {top: 10, left: 10, width: 200, height: 200}
	     *     });
	     * }
	     *
	     * createView()
	     *     .then((createdView) => {
	     *         view = createdView;
	     *         console.log('View created.', view);
	     *         view.navigate('https://google.com');
	     *         console.log('View navigated to given url.');
	     *     })
	     *     .catch(err => console.log(err));
	     * ```
	     * Note that created views needs to navigate somewhere for them to actually render a website.
	     * @experimental
	     */
	    async create(options) {
	        const { uuid } = this.wire.me;
	        if (!options.name || typeof options.name !== 'string') {
	            throw new Error('Please provide a name property as a string in order to create a View.');
	        }
	        (0, warnings_1.handleDeprecatedWarnings)(options);
	        if (this.wire.environment.childViews) {
	            await this.wire.environment.createChildContent({
	                entityType: 'view',
	                options: { ...options, uuid }
	            });
	        }
	        else {
	            await this.wire.sendAction('create-view', { ...options, uuid });
	        }
	        return this.wrapSync({ uuid, name: options.name });
	    }
	    /**
	     * Asynchronously returns an API handle for the given View identity.
	     *
	     * @remarks Wrapping a View identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for a View throughout its entire lifecycle.
	     *
	     * @example
	     * ```js
	     * fin.View.wrap({ uuid: 'testViewUuid', name: 'testViewName' }))
	     *     .then(view => console.log('wrapped view', view))
	     *     .catch(err => console.log(err));
	     * ```
	     * @experimental
	     */
	    async wrap(identity) {
	        this.wire.sendAction('view-wrap').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new index_1.View(this.wire, identity);
	    }
	    /**
	     * Synchronously returns an API handle for the given View identity.
	     *
	     * @remarks Wrapping a View identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for a View throughout its entire lifecycle.
	     *
	     * @example
	     * ```js
	     * const view = fin.View.wrapSync({ uuid: 'testView', name: 'testViewName' });
	     * await view.hide();
	     * ```
	     * @experimental
	     */
	    wrapSync(identity) {
	        this.wire.sendAction('view-wrap-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new index_1.View(this.wire, identity);
	    }
	    /**
	     * Asynchronously returns a View object that represents the current view
	     *
	     * @example
	     * ```js
	     * fin.View.getCurrent()
	     *     .then(view => console.log('current view', view))
	     *     .catch(err => console.log(err));
	     *
	     * ```
	     * @experimental
	     */
	    getCurrent() {
	        this.wire.sendAction('view-get-current').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        if (!this.wire.me.isView) {
	            throw new Error('You are not in a View context');
	        }
	        const { uuid, name } = this.wire.me;
	        return this.wrap({ uuid, name });
	    }
	    /**
	     * Synchronously returns a View object that represents the current view
	     *
	     * @example
	     * ```js
	     * const view = fin.View.getCurrentSync();
	     * console.log(view);
	     *
	     * ```
	     * @experimental
	     */
	    getCurrentSync() {
	        this.wire.sendAction('view-get-current-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        if (!this.wire.me.isView) {
	            throw new Error('You are not in a View context');
	        }
	        const { uuid, name } = this.wire.me;
	        return this.wrapSync({ uuid, name });
	    }
	}
	Factory$6.ViewModule = ViewModule;
	return Factory$6;
}

var Instance$5 = {};

var lazy = {};

Object.defineProperty(lazy, "__esModule", { value: true });
lazy.AsyncRetryableLazy = lazy.Lazy = void 0;
/**
 * Handy class for managing asynchronous dependencies of classes.
 *
 * Will call the producer function once and only once when getValue is called,
 * returning the resultant value for every subsequent call.
 */
class Lazy {
    // eslint-disable-next-line
    constructor(producerFn) {
        this.producerFn = producerFn;
    }
    /**
     * Lazily get the value returned by the producer.
     * @returns The value returned from the producer function
     */
    getValue() {
        if (!this.value) {
            this.value = this.producerFn();
        }
        return this.value;
    }
}
lazy.Lazy = Lazy;
/**
 * Handy class for managing asynchronous dependencies of classes.
 *
 * Will call asynchronous producer only after `getValue` is called.  If the
 * deferred code errors, we can try it again by re-calling `getValue` after
 * the promise rejects.
 */
class AsyncRetryableLazy {
    // eslint-disable-next-line
    constructor(producerFn) {
        this.producerFn = producerFn;
    }
    /**
     * Lazily get the value returned by the async producer.
     *
     * @returns The value returned from the producer function
     */
    async getValue() {
        if (!this.promise) {
            this.promise = this.producerFn().catch((e) => {
                delete this.promise;
                throw e;
            });
        }
        return this.promise;
    }
}
lazy.AsyncRetryableLazy = AsyncRetryableLazy;

var main = {};

Object.defineProperty(main, "__esModule", { value: true });
main.WebContents = void 0;
const base_1$m = base;
class WebContents extends base_1$m.EmitterBase {
    /**
     * @param identity The identity of the {@link OpenFin.WebContentsEvents WebContents}.
     * @param entityType The type of the {@link OpenFin.WebContentsEvents WebContents}.
     */
    constructor(wire, identity, entityType) {
        super(wire, entityType, identity.uuid, identity.name);
        this.identity = identity;
        this.entityType = entityType;
    }
    /**
     * Gets a base64 encoded image of all or part of the WebContents.
     * @param options Options for the capturePage call.
     *
     * @example
     *
     * View:
     * ```js
     * const view = fin.View.getCurrentSync();
     *
     * // PNG image of a full visible View
     * console.log(await view.capturePage());
     *
     * // Low-quality JPEG image of a defined visible area of the view
     * const options = {
     *     area: {
     *         height: 100,
     *         width: 100,
     *         x: 10,
     *         y: 10,
     *     },
     *     format: 'jpg',
     *     quality: 20
     * }
     * console.log(await view.capturePage(options));
     * ```
     *
     * Window:
     * ```js
     * const wnd = await fin.Window.getCurrent();
     *
     * // PNG image of a full visible window
     * console.log(await wnd.capturePage());
     *
     * // Low-quality JPEG image of a defined visible area of the window
     * const options = {
     *     area: {
     *         height: 100,
     *         width: 100,
     *         x: 10,
     *         y: 10,
     *     },
     *     format: 'jpg',
     *     quality: 20
     * }
     * console.log(await wnd.capturePage(options));
     * ```
     *
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    capturePage(options) {
        return this.wire.sendAction('capture-page', { options, ...this.identity }).then(({ payload }) => payload.data);
    }
    /**
     * Executes Javascript on the WebContents, restricted to contents you own or contents owned by
     * applications you have created.
     * @param code JavaScript code to be executed on the view.
     *
     * @example
     * View:
     * ```js
     * async function executeJavaScript(code) {
     *     const view = await fin.View.wrap({uuid: 'uuid', name: 'view name'});
     *     return await view.executeJavaScript(code);
     * }
     *
     * executeJavaScript(`console.log('Hello, Openfin')`).then(() => console.log('Javascript excuted')).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function executeJavaScript(code) {
     *     const app = await fin.Application.start({
     *         name: 'myApp',
     *         uuid: 'app-1',
     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.executeJavaScript.html',
     *         autoShow: true
     *     });
     *     const win = await app.getWindow();
     *     return await win.executeJavaScript(code);
     * }
     *
     * executeJavaScript(`console.log('Hello, Openfin')`).then(() => console.log('Javascript excuted')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    executeJavaScript(code) {
        return this.wire
            .sendAction('execute-javascript-in-window', { ...this.identity, code })
            .then(({ payload }) => payload.data);
    }
    /**
     * Returns the zoom level of the WebContents.
     *
     * @example
     * View:
     * ```js
     * async function getZoomLevel() {
     *     const view = await fin.View.getCurrent();
     *     return await view.getZoomLevel();
     * }
     *
     * getZoomLevel().then(zoomLevel => console.log(zoomLevel)).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function createWin() {
     *     const app = await fin.Application.start({
     *         name: 'myApp',
     *         uuid: 'app-1',
     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getZoomLevel.html',
     *         autoShow: true
     *     });
     *     return await app.getWindow();
     * }
     *
     * async function getZoomLevel() {
     *     const win = await createWin();
     *     return await win.getZoomLevel();
     * }
     *
     * getZoomLevel().then(zoomLevel => console.log(zoomLevel)).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    getZoomLevel() {
        return this.wire.sendAction('get-zoom-level', this.identity).then(({ payload }) => payload.data);
    }
    /**
     * Sets the zoom level of the WebContents.
     * @param level The zoom level
     *
     * @example
     * View:
     * ```js
     * async function setZoomLevel(number) {
     *     const view = await fin.View.getCurrent();
     *     return await view.setZoomLevel(number);
     * }
     *
     * setZoomLevel(4).then(() => console.log('Setting a  zoom level')).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function createWin() {
     *     const app = await fin.Application.start({
     *         name: 'myApp',
     *         uuid: 'app-1',
     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.setZoomLevel.html',
     *         autoShow: true
     *     });
     *     return await app.getWindow();
     * }
     *
     * async function setZoomLevel(number) {
     *     const win = await createWin();
     *     return await win.setZoomLevel(number);
     * }
     *
     * setZoomLevel(4).then(() => console.log('Setting a  zoom level')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    setZoomLevel(level) {
        return this.wire.sendAction('set-zoom-level', { ...this.identity, level }).then(() => undefined);
    }
    /**
     * Navigates the WebContents to a specified URL.
     *
     * Note: The url must contain the protocol prefix such as http:// or https://.
     * @param url - The URL to navigate the WebContents to.
     *
     * @example
     * View:
     * ```js
     * async function createView() {
     *     const me = await fin.Window.getCurrent();
     *     return fin.View.create({
     *         name: 'viewName',
     *         target: me.identity,
     *         bounds: {top: 10, left: 10, width: 200, height: 200}
     *     });
     * }
     *
     * createView()
     *     .then(view => view.navigate('https://example.com'))
     *     .then(() => console.log('navigation complete'))
     *     .catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function navigate() {
     *     const win = await fin.Window.getCurrent();
     *     return await win.navigate('https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.navigate.html');
     * }
     * navigate().then(() => console.log('Navigate to tutorial')).catch(err => console.log(err));
     * ```
     * @experimental
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    navigate(url) {
        return this.wire.sendAction('navigate-window', { ...this.identity, url }).then(() => undefined);
    }
    /**
     * Navigates the WebContents back one page.
     *
     * @example
     * View:
     * ```js
     * async function navigateBack() {
     *     const view = await fin.View.wrap({ name: 'testapp-view', uuid: 'testapp' });
     *     await view.navigate('https://www.google.com');
     *     return await view.navigateBack();
     * }
     * navigateBack().then(() => console.log('Navigated back')).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function navigateBack() {
     *     const win = await fin.Window.wrap({ name: 'testapp', uuid: 'testapp' });
     *     await win.navigate('https://www.google.com');
     *     return await win.navigateBack();
     * }
     * navigateBack().then(() => console.log('Navigated back')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    navigateBack() {
        return this.wire.sendAction('navigate-window-back', { ...this.identity }).then(() => undefined);
    }
    /**
     * Navigates the WebContents forward one page.
     *
     * @example
     * View:
     * ```js
     * async function navigateForward() {
     *     const view = await fin.View.getCurrent();
     *     await view.navigate('https://www.google.com');
     *     await view.navigateBack();
     *     return await view.navigateForward();
     * }
     * navigateForward().then(() => console.log('Navigated forward')).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function navigateForward() {
     *     const win = await fin.Window.getCurrent();
     *     await win.navigate('https://www.google.com');
     *     await win.navigateBack();
     *     return await win.navigateForward();
     * }
     * navigateForward().then(() => console.log('Navigated forward')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async navigateForward() {
        await this.wire.sendAction('navigate-window-forward', { ...this.identity });
    }
    /**
     * Stops any current navigation the WebContents is performing.
     *
     * @example
     * View:
     * ```js
     * async function stopNavigation() {
     *     const view = await fin.View.wrap({ name: 'testapp-view', uuid: 'testapp' });
     *     await view.navigate('https://www.google.com');
     *     return await view.stopNavigation();
     * }
     * stopNavigation().then(() => console.log('you shall not navigate')).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function stopNavigation() {
     *     const win = await fin.Window.wrap({ name: 'testapp', uuid: 'testapp' });
     *     await win.navigate('https://www.google.com');
     *     return await win.stopNavigation();
     * }
     * stopNavigation().then(() => console.log('you shall not navigate')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    stopNavigation() {
        return this.wire.sendAction('stop-window-navigation', { ...this.identity }).then(() => undefined);
    }
    /**
     * Reloads the WebContents
     *
     * @example
     * View:
     * ```js
     * async function reload() {
     * 	const view = await fin.View.getCurrent();
     *     return await view.reload();
     * }
     *
     * reload().then(() => {
     * 		console.log('Reloaded view')
     * }).catch(err => console.log(err));
     * ```
     *
     * Window:
     * ```js
     * async function reloadWindow() {
     * 		const app = await fin.Application.start({
     * 				name: 'myApp',
     * 				uuid: 'app-1',
     * 				url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.reload.html',
     * 				autoShow: true
     * 		});
     * 		const win = await app.getWindow();
     *     return await win.reload();
     * }
     *
     * reloadWindow().then(() => {
     * 		console.log('Reloaded window')
     * }).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    reload(ignoreCache = false) {
        return this.wire
            .sendAction('reload-window', {
            ignoreCache,
            ...this.identity
        })
            .then(() => undefined);
    }
    /**
     * Prints the WebContents.
     * @param options Printer Options
     *
     * Note: When `silent` is set to `true`, the API will pick the system's default printer if deviceName
     * is empty and the default settings for printing.
     *
     * Use the CSS style `page-break-before: always;` to force print to a new page.
     *
     * @example
     * ```js
     * const view = fin.View.getCurrentSync();
     *
     * view.print({ silent: false, deviceName: 'system-printer-name' }).then(() => {
     *     console.log('print call has been sent to the system');
     * });
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    print(options = {}) {
        return this.wire.sendAction('print', { ...this.identity, options }).then(() => undefined);
    }
    /**
     * Find and highlight text on a page.
     * @param searchTerm Term to find in page
     * @param options Search options
     *
     * Note: By default, each subsequent call will highlight the next text that matches the search term.
     *
     * Returns a promise with the results for the request. By subscribing to the
     * found-in-page event, you can get the results of this call as well.
     *
     * @example
     * View:
     * ```js
     * const view = fin.View.getCurrentSync();
     *
     * //By subscribing to the 'found in page' event we can get the results of each findInPage call made.
     * view.addListener('found-in-page', (event) => {
     *     console.log(event);
     * });
     *
     * // The promise also returns the results for the request
     * view.findInPage('a').then((result) => {
     *     console.log(result)
     * });
     * ```
     *
     * Window:
     * ```js
     * const win = fin.Window.getCurrentSync();
     *
     * //By subscribing to the 'found in page' event we can get the results of each findInPage call made.
     * win.addListener('found-in-page', (event) => {
     *     console.log(event);
     * });
     *
     * // The promise also returns the results for the request
     * win.findInPage('a').then((result) => {
     *     console.log(result)
     * });
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    findInPage(searchTerm, options) {
        return this.wire
            .sendAction('find-in-page', { ...this.identity, searchTerm, options })
            .then(({ payload }) => payload.data);
    }
    /**
     * Stop a {@link View#findInPage findInPage} call by specifying any of these actions:
     *
     * * clearSelection - Clear the selection.
     * * keepSelection - Translate the selection into a normal selection.
     * * activateSelection - Focus and click the selection node.
     *
     * @example
     * View:
     * ```js
     * const view = fin.View.getCurrentSync();
     *
     * view.addListener('found-in-page', (event) => {
     *     setTimeout(() => {
     *         view.stopFindInPage('clearSelection');
     *     }, 5000);
     * });
     *
     * view.findInPage('a').then(results => {
     *     console.log(results);
     * });
     * ```
     *
     * Window:
     * ```js
     * const win = fin.Window.getCurrentSync();
     *
     * win.addListener('found-in-page', (event) => {
     *     setTimeout(() => {
     *         win.stopFindInPage('clearSelection');
     *     }, 5000);
     * });
     *
     * win.findInPage('a').then(results => {
     *     console.log(results);
     * });
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    stopFindInPage(action) {
        return this.wire.sendAction('stop-find-in-page', { ...this.identity, action }).then(() => undefined);
    }
    /**
     * Returns an array with all system printers
     * @deprecated use System.getPrinters instead
     *
     * @example
     * View:
     * ```js
     * const view = fin.View.getCurrentSync();
     *
     * view.getPrinters()
     *     .then((printers) => {
     *         printers.forEach((printer) => {
     *             if (printer.isDefault) {
     *                 console.log(printer);
     *             }
     *         });
     *     })
     *     .catch((err) => {
     *         console.log(err);
     *     });
     * ```
     *
     * Window:
     * ```js
     * const win = fin.Window.getCurrentSync();
     *
     * win.getPrinters()
     *     .then((printers) => {
     *         printers.forEach((printer) => {
     *             if (printer.isDefault) {
     *                 console.log(printer);
     *             }
     *         });
     *     })
     *     .catch((err) => {
     *         console.log(err);
     *     });
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    getPrinters() {
        return this.wire.sendAction('get-printers', { ...this.identity }).then(({ payload }) => payload.data);
    }
    /**
     * Gives focus to the WebContents.
     *
     * @example
     * ```js
     * async function focusWindow() {
     *     const app = await fin.Application.start({
     *         name: 'myApp',
     *         uuid: 'app-1',
     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.focus.html',
     *         autoShow: true
     *     });
     *     const win = await app.getWindow();
     *     return await win.focus();
     * }
     *
     * focusWindow().then(() => console.log('Window focused')).catch(err => console.log(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async focus({ emitSynthFocused } = { emitSynthFocused: true }) {
        await this.wire.sendAction('focus-window', { emitSynthFocused, ...this.identity });
    }
    /**
     * Shows the Chromium Developer Tools
     *
     * @example
     * View:
     * ```js
     * async function showDeveloperTools() {
     *     const view = await fin.View.getCurrent();
     *     return view.showDeveloperTools();
     * }
     *
     * showDevelopertools()
     * .then(() => console.log('Showing dev tools'))
     * .catch(err => console.error(err));
     * ```
     *
     * Window:
     * ```js
     * async function showDeveloperTools() {
     *     const win = await fin.Window.getCurrent();
     *     return win.showDeveloperTools();
     * }
     *
     * showDevelopertools()
     * .then(() => console.log('Showing dev tools'))
     * .catch(err => console.error(err));
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async showDeveloperTools() {
        // Note this hits the system action map in core state for legacy reasons.
        await this.wire.sendAction('show-developer-tools', this.identity);
    }
    /**
     * Retrieves the process information associated with a WebContents.
     *
     * Note: This includes any iframes associated with the WebContents
     *
     * @example
     * View:
     * ```js
     *     const view = await fin.View.getCurrent();
     *     const processInfo = await view.getProcessInfo();
     * ```
     *
     * Window:
     * ```js
     *     const win = await fin.Window.getCurrent();
     *     const processInfo = await win.getProcessInfo();
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async getProcessInfo() {
        const { payload: { data } } = await this.wire.sendAction('get-process-info', this.identity);
        return data;
    }
    /**
     * Retrieves information on all Shared Workers.
     *
     * @example
     * View:
     * ```js
     *     const view = await fin.View.create({
     *         name: 'viewName',
     *         target: fin.me.identity,
     *         bounds: {top: 10, left: 10, width: 200, height: 200}
     *     });
     *
     *     await view.navigate('https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/');
     *
     *     const sharedWorkers = await view.getSharedWorkers();
     * ```
     *
     * Window:
     * ```js
     *     const winOption = {
     *         name:'child',
     *         defaultWidth: 300,
     *         defaultHeight: 300,
     *         url: 'https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/',
     *         frame: true,
     *         autoShow: true
     *     };
     *     const win = await fin.Window.create(winOption);
     *     const sharedWorkers = await win.getSharedWorkers();
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async getSharedWorkers() {
        return this.wire.sendAction('get-shared-workers', this.identity).then(({ payload }) => payload.data);
    }
    /**
     * Opens the developer tools for the shared worker context.
     *
     * @example
     * View:
     * ```js
     *     const view = await fin.View.create({
     *         name: 'viewName',
     *         target: fin.me.identity,
     *         bounds: {top: 10, left: 10, width: 200, height: 200}
     *     });
     *
     *     await view.navigate('https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/');
     *
     *     await view.inspectSharedWorker();
     * ```
     *
     * Example:
     * ```js
     *     const winOption = {
     *         name:'child',
     *         defaultWidth: 300,
     *         defaultHeight: 300,
     *         url: 'https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/',
     *         frame: true,
     *         autoShow: true
     *     };
     *     const win = await fin.Window.create(winOption);
     *     await win.inspectSharedWorker();
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async inspectSharedWorker() {
        await this.wire.sendAction('inspect-shared-worker', { ...this.identity });
    }
    /**
     * Inspects the shared worker based on its ID.
     * @param workerId - The id of the shared worker.
     *
     * @example
     * View:
     * ```js
     *     const view = await fin.View.create({
     *         name: 'viewName',
     *         target: fin.me.identity,
     *         bounds: {top: 10, left: 10, width: 200, height: 200}
     *     });
     *
     *     await view.navigate('https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/');
     *
     *     const sharedWorkers = await view.getSharedWorkers();
     *     await view.inspectSharedWorkerById(sharedWorkers[0].id);
     * ```
     *
     * Window:
     * ```js
     *     const winOption = {
     *         name:'child',
     *         defaultWidth: 300,
     *         defaultHeight: 300,
     *         url: 'https://mdn.github.io/dom-examples/web-workers/simple-shared-worker/',
     *         frame: true,
     *         autoShow: true
     *     };
     *     const win = await fin.Window.create(winOption);
     *     const sharedWorkers = await win.getSharedWorkers();
     *     await win.inspectSharedWorkerById(sharedWorkers[0].id);
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async inspectSharedWorkerById(workerId) {
        await this.wire.sendAction('inspect-shared-worker-by-id', { ...this.identity, workerId });
    }
    /**
     * Opens the developer tools for the service worker context.
     *
     * @example
     * View:
     * ```js
     *     const view = await fin.View.create({
     *         name: 'viewName',
     *         target: fin.me.identity,
     *         bounds: {top: 10, left: 10, width: 200, height: 200}
     *     });
     *
     *     await view.navigate('http://googlechrome.github.io/samples/service-worker/basic/index.html');
     *
     *     await view.inspectServiceWorker();
     * ```
     *
     * Window:
     * ```js
     *     const winOption = {
     *         name:'child',
     *         defaultWidth: 300,
     *         defaultHeight: 300,
     *         url: 'http://googlechrome.github.io/samples/service-worker/basic/index.html',
     *         frame: true,
     *         autoShow: true
     *     };
     *     const win = await fin.Window.create(winOption);
     *     await win.inspectServiceWorker();
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async inspectServiceWorker() {
        await this.wire.sendAction('inspect-service-worker', { ...this.identity });
    }
    /**
     * Shows a popup window.
     *
     * Note: If this WebContents is a view and its attached window has a popup open, this will close it.
     *
     * Shows a popup window. Including a `name` in `options` will attempt to show an existing window as a popup, if
     * that window doesn't exist or no `name` is included a window will be created. If the caller view or the caller
     * view's parent window currently has a popup window open, calling `showPopupWindow` again will dismiss the currently
     * open popup window before showing the new popup window. Also, if the caller view is destroyed or detached, the popup
     * will be dismissed.
     *
     * Note: in the case where the window being shown as a popup needs to be created, it is a child of the caller view's parent window.
     *
     * @example
     *
     * Create and show a single-use popup window that returns a single result to the caller. `initialOptions` allows
     * us to pass window options to the popup window that will be created. `resultDispatchBehavior: 'close'` ensures
     * that once the popup window calls `dispatchPopupResult` it is closed. `blurBehavior: 'close'` will yield a dismissed
     * result should the popup window lose focus.
     *
     * ```js
     * const result = await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: false
     *     },
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'close',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0
     * });
     * ```
     *
     * Same as above but using an existing window as a popup by referencing its `name`:
     *
     * Note: if a window with the `name` provided doesn't exist, it will be created.
     *
     * ```js
     * const result = await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: true
     *     },
     *     name: 'my-popup', // shows the 'my-popup' window if it exists, otherwise creates it
     *     url: '<my_popup_url>', // navigates to this url if it doesn't match the location.href of the 'my-popup' window
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'close',
     *     focus: true,
     *     hideOnClose: true, // persist window on 'dismissed' result, alternatively change onResultDispatch and blurBehavior to 'hide'
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0
     * });
     * ```
     *
     * Create and show a popup window that is able to return multiple results to the caller via an `onPopupResult` callback. Each
     * time the popup window calls `dispatchPopupResult`, the callback will be executed on the result. Once the popup window is
     * closed or hidden, the `showPopupWindow` promise will resolve with a `dismissed` result that will include the most recently
     * dispatched result as `lastDispatchResult`:
     *
     * ```js
     * const popupResultCallback = (payload) => {
     *        if (payload.result === 'clicked') {
     *            if (payload.data.topic === 'color-changed') {
     *                // do something like
     *                // setColor(payload.data.value);
     *            }
     *        }
     * };
     *
     * await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: false
     *     },
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'none',
     *     blurBehavior: 'close',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0,
     *     onPopupResult: popupResultCallback
     * });
     * ```
     *
     * Same as above but using an existing window as a popup:
     *
     * ```js
     * const popupResultCallback = (payload) => {
     *        if (payload.result === 'clicked') {
     *            if (payload.data.topic === 'color-changed') {
     *                // do something like
     *                // setColor(payload.data.value);
     *            }
     *        }
     * };
     *
     * await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: false
     *     },
     *     name: 'my-popup', // shows the 'my-popup' window if it exists, otherwise creates it
     *     url: '<my_popup_url>', // navigates to this url if it doesn't match the location.href of the 'my-popup' window
     *     resultDispatchBehavior: 'none',
     *     blurBehavior: 'hide',
     *     focus: true,
     *     hideOnClose: true, // we can just use this or we can change blurBehavior to 'hide'
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0,
     *     onPopupResult: popupResultCallback
     * });
     * ```
     *
     * Create or show a popup window that disables user movement (positioning and resizing) in the caller
     * view's parent window by using `blurBehavior: 'modal'`:
     *
     * ```js
     * const result = await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: false
     *     },
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'modal',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0
     * });
     * ```
     *
     * Create a popup window as a modal:
     *
     * Note: The only way to ensure true modal behavior is to create the window being shown as a popup with a
     * `modalParentIdentity` that uses the caller view's parent window identity.
     *
     * ```js
     * const result = await fin.me.showPopupWindow({
     *     initialOptions: {
     *         frame: false,
     *         modalParentIdentity: fin.me.identity
     *     },
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'modal',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0
     * });
     * ```
     *
     * Pass data to a popup window that is available when the popup is shown.
     *
     * Note: this is just one example for a use of `additionalOptions`, it can be used to update any updatable
     * window options when creating or showing an existing window as a popup.
     *
     * ```js
     * const result = await fin.me.showPopupWindow({
     *     additionalOptions: {
     *         customData: {
     *             foo: 'bar'
     *         }
     *     },
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'close',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0
     * });
     *
     * // Access from the popup window context like so:
     * const { customData } = await fin.me.getOptions();
     * const { foo } = customData;
     * ```
     *
     * Execute a callback on the popup's OpenFin window when the popup is shown:
     *
     * ```js
     * const popupWindowCallback = async (win) => {
     *     await win.flash();
     * };
     *
     * const result = await fin.me.showPopupWindow({
     *     url: '<my_popup_url>',
     *     resultDispatchBehavior: 'close',
     *     blurBehavior: 'close',
     *     focus: true,
     *     height: 300,
     *     width: 300,
     *     x: 0,
     *     y: 0,
     *     onPopupReady: popupWindowCallback;
     * });
     * ```
     * @remarks
     * `WebContents` refers to shared functionality between {@link OpenFin.Window} and {@link OpenFin.View}.
     * We do not expose an explicit superclass for this functionality, but it does have its own
     * {@link OpenFin.WebContentsEvents event namespace}.
     */
    async showPopupWindow(options) {
        this.wire.sendAction(`${this.entityType}-show-popup-window`, this.identity).catch(() => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        if (options?.onPopupReady) {
            const readyListener = async ({ popupName }) => {
                try {
                    const popupWindow = this.fin.Window.wrapSync({ uuid: this.fin.me.uuid, name: popupName });
                    await options.onPopupReady(popupWindow);
                }
                catch (error) {
                    throw new Error(`Something went wrong during onPopupReady execution: ${error}`);
                }
            };
            // TODO: fix typing (internal)
            // @ts-expect-error
            await this.once('popup-ready', readyListener);
        }
        const { payload: tryCreatePayload } = await this.wire.sendAction('try-create-popup-window', {
            options: {
                ...options,
                // Internal use only.
                // @ts-expect-error
                hasResultCallback: !!options?.onPopupResult,
                hasReadyCallback: !!options?.onPopupReady
            },
            ...this.identity
        });
        const { data: { willOpen, options: popupOptions } } = tryCreatePayload;
        if (willOpen) {
            // Solve the issue where Interop in a popup window with non cross-origin url is not working(core-1076).
            await this.fin.Window.create(popupOptions.initialOptions);
        }
        const normalizePopupResult = (payload) => {
            const { name, uuid, result, data } = payload;
            const popupResult = {
                identity: {
                    name,
                    uuid
                },
                result
            };
            if (data) {
                popupResult.data = data;
            }
            return popupResult;
        };
        if (options?.onPopupResult) {
            const dispatchResultListener = async (payload) => {
                await options.onPopupResult(normalizePopupResult(payload));
            };
            const teardownListener = async () => {
                // TODO: fix typing (internal)
                // @ts-expect-error
                await this.removeListener('popup-result', dispatchResultListener);
            };
            // TODO: fix typing (internal)
            // @ts-expect-error
            await this.on('popup-result', dispatchResultListener);
            // TODO: fix typing (internal)
            // hilariously this does not need a ts-expect-error - this is gap in type soundness
            // should investigate - probably due to `teardownListener` taking a void argument
            // which might play nicely with the `never` type?  huh...
            await this.once('popup-teardown', teardownListener);
        }
        const { payload } = await this.wire.sendAction('show-popup-window', {
            options: popupOptions,
            ...this.identity
        });
        return payload.data;
    }
    /**
     *
     * Get the screen capture permission for this content.
     *
     * @example
     * ```js
     * const { permission } = await fin.me.getScreenCapturePermission();
     *
     * console.log(`This content is currently ${permission}ed in screen captures.`);
     *
     * ```
     */
    async getScreenCapturePermission() {
        return (await this.wire.sendAction('get-screen-capture-permissions', this.identity)).payload.data;
    }
}
main.WebContents = WebContents;

var hasRequiredInstance$2;

function requireInstance$2 () {
	if (hasRequiredInstance$2) return Instance$5;
	hasRequiredInstance$2 = 1;
	var _View_providerChannelClient;
	Object.defineProperty(Instance$5, "__esModule", { value: true });
	Instance$5.View = void 0;
	const transport_errors_1 = transportErrors;
	const lazy_1 = lazy;
	const main_1 = main;
	const window_1 = requireWindow();
	/**
	 * A View can be used to embed additional web content into a Window.
	 * It is like a child window, except it is positioned relative to its owning window.
	 * It has the ability to listen for {@link OpenFin.ViewEvents View-specific events}.
	 *
	 * By default, a View will try to share the same renderer process as other Views owned by its parent Application.
	 * To change that behavior, see the processAffinity {@link OpenFin.ViewOptions view option}.
	 *
	 * A View's lifecycle is tied to its owning window and can be re-attached to a different window at any point during its lifecycle.
	 */
	class View extends main_1.WebContents {
	    /**
	     * @internal
	     */
	    constructor(wire, identity) {
	        super(wire, identity, 'view');
	        this.identity = identity;
	        _View_providerChannelClient.set(this, new lazy_1.Lazy(() => {
	            const platform = this.fin.Platform.wrapSync(this.identity);
	            return platform.getClient();
	        }));
	        /**
	         * Attaches the current view to the given window identity.
	         * Identity must be the identity of a window in the same application.
	         * This detaches the view from its current window, and sets the view to be destroyed when its new window closes.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameAttach',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function attachView() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     const winOption = {
	         *         name:'winOptionName',
	         *         defaultWidth: 300,
	         *         defaultHeight: 300,
	         *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.create.html',
	         *         frame: true,
	         *         autoShow: true
	         *     };
	         *     const newWindow = await fin.Window.create(winOption);
	         *     view.attach(newWindow.identity);
	         * }
	         *
	         * attachView()
	         *     .then(() => console.log('View attached to new window.'))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.attach = async (target) => {
	            await this.wire.sendAction('attach-view', { target, ...this.identity });
	        };
	        /**
	         * Destroys the current view
	         *
	         * @example
	         * ```js
	         * const view = fin.View.wrapSync({ uuid: 'viewUuid', name: 'viewName' });
	         * view.destroy();
	         * ```
	         * @experimental
	         */
	        this.destroy = async () => {
	            await this.wire.sendAction('destroy-view', { ...this.identity });
	        };
	        /**
	         * Shows the current view if it is currently hidden.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameShow',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function hideAndShowView() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url option.');
	         *
	         *     await view.hide();
	         *     console.log("View hidden.");
	         *
	         *     view.show();
	         *     console.log("View shown.");
	         * }
	         *
	         * hideAndShowView()
	         *     .then(() => console.log('View hidden and shown.'))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.show = async () => {
	            await this.wire.sendAction('show-view', { ...this.identity });
	        };
	        /**
	         * Sets the bounds (top, left, width, height) of the view relative to its window and shows it if it is hidden.
	         * This method ensures the view is both positioned and showing. It will reposition a visible view and both show and reposition a hidden view.
	         *
	         * @remarks View position is relative to the bounds of the window.
	         * ({top: 0, left: 0} represents the top left corner of the window)
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameSetBounds',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function showViewAt() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     await view.showAt({
	         *         top: 100,
	         *         left: 100,
	         *         width: 300,
	         *         height: 300
	         *     }, {
	         *       bringToFront : true
	         *     });
	         * }
	         *
	         * showViewAt()
	         *     .then(() => console.log('View set to new bounds and shown.'))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.showAt = async (bounds, options = {}) => {
	            await this.wire.sendAction('show-view-at', { bounds, ...this.identity, options });
	        };
	        /**
	         * Brings the specified view to the front of its current window. This ensures the view will be visible on top of any other views
	         * which have overlapping bounds with it.
	         *
	         * Please note, this is not a permanent action - when a new view is created or attached to the window, it will display on top of all other views
	         * in the window that share bounds with it.
	         */
	        this.bringToFront = async () => {
	            await this.wire.sendAction('bring-view-to-front', { ...this.identity });
	        };
	        /**
	         * Hides the current view if it is currently visible.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameHide',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function hideView() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     await view.hide();
	         * }
	         *
	         * hideView()
	         *     .then(() => console.log('View hidden.'))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.hide = async () => {
	            await this.wire.sendAction('hide-view', { ...this.identity });
	        };
	        /**
	         * Sets the bounds (top, left, width, height) of the view relative to its window.
	         *
	         * @remarks View position is relative to the bounds of the window.
	         * ({top: 0, left: 0} represents the top left corner of the window)
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameSetBounds',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function setViewBounds() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     await view.setBounds({
	         *         top: 100,
	         *         left: 100,
	         *         width: 300,
	         *         height: 300
	         *     });
	         * }
	         *
	         * setViewBounds()
	         *     .then(() => console.log('View set to new bounds.'))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.setBounds = async (bounds) => {
	            await this.wire.sendAction('set-view-bounds', { bounds, ...this.identity });
	        };
	        /**
	         * Gets the bounds (top, left, width, height) of the view relative to its window.
	         *
	         * @remarks View position is relative to the bounds of the window.
	         * ({top: 0, left: 0} represents the top left corner of the window)
	         *
	         * @example
	         * ```js
	         * const view = await fin.View.create({
	         *     name: 'viewNameSetBounds',
	         *     target: fin.me.identity,
	         *     bounds: {top: 10, left: 10, width: 200, height: 200}
	         * });
	         *
	         * await view.navigate('https://google.com');
	         *
	         * await view.setBounds({
	         *     top: 100,
	         *     left: 100,
	         *     width: 300,
	         *     height: 300
	         * });
	         *
	         * console.log(await view.getBounds());
	         * ```
	         * @experimental
	         */
	        this.getBounds = async () => {
	            const ack = await this.wire.sendAction('get-view-bounds', { ...this.identity });
	            return ack.payload.data;
	        };
	        /**
	         * Gets the View's info.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameGetInfo',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function getViewInfo() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     return view.getInfo();
	         * }
	         *
	         * getViewInfo()
	         *     .then((info) => console.log('View info fetched.', info))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.getInfo = async () => {
	            const ack = await this.wire.sendAction('get-view-info', { ...this.identity });
	            return ack.payload.data;
	        };
	        /**
	         * Retrieves the OpenFin.Layout instance for the Window the View is attached to.
	         *
	         * @example
	         * ```js
	         *     //get the current View
	         *     const view = await fin.View.getCurrent();
	         *
	         *     //get a reference to the Layout for the Window the view is part of
	         *     const layout = await view.getParentLayout();
	         * ```
	         * @experimental
	         */
	        this.getParentLayout = async () => {
	            this.wire.sendAction('view-get-parent-layout', { ...this.identity }).catch(() => {
	                // don't expose
	            });
	            return this.fin.Platform.Layout.getLayoutByViewIdentity(this.identity);
	        };
	        /**
	         * Gets the View's options.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         name: 'viewNameGetOptions',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function getViewOptions() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url.');
	         *
	         *     const me = await fin.Window.getCurrent();
	         *     view = fin.View.wrapSync({ uuid: me.identity.uuid, name: 'viewNameGetOptions' });
	         *     return view.getOptions();
	         * }
	         *
	         * getViewOptions()
	         *     .then((info) => console.log('View options fetched.', info))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.getOptions = async () => {
	            return this.wire.sendAction('get-view-options', { ...this.identity }).then(({ payload }) => payload.data);
	        };
	        /**
	         * Updates the view's options.
	         *
	         * @example
	         * ```js
	         * let view;
	         * async function createView() {
	         *     const me = await fin.Window.getCurrent();
	         *     return fin.View.create({
	         *         url: 'https://google.com',
	         *         name: 'viewNameUpdateOptions',
	         *         target: me.identity,
	         *         bounds: {top: 10, left: 10, width: 200, height: 200}
	         *     });
	         * }
	         *
	         * async function updateViewOptions() {
	         *     view = await createView();
	         *     console.log('View created.');
	         *
	         *     await view.navigate('https://google.com');
	         *     console.log('View navigated to given url option.');
	         *
	         *     const newOptions = { autoResize: {
	         *         width: true,
	         *         horizontal: true
	         *     }};
	         *     return view.updateOptions(newOptions);
	         * }
	         *
	         * updateViewOptions()
	         *     .then(payload => console.log('View options updated: ', payload))
	         *     .catch(err => console.log(err));
	         * ```
	         * @experimental
	         */
	        this.updateOptions = async (options) => {
	            return this.wire.sendAction('update-view-options', { options, ...this.identity }).then(() => undefined);
	        };
	        /**
	         * Retrieves the window the view is currently attached to.
	         *
	         * @example
	         * ```js
	         * const view = fin.View.wrapSync({ uuid: 'viewUuid', name: 'viewName' });
	         * view.getCurrentWindow()
	         *     .then(win => console.log('current window', win))
	         *     .catch(err => console.log(err));)
	         * ```
	         * @experimental
	         */
	        this.getCurrentWindow = async () => {
	            const { payload: { data } } = await this.wire.sendAction('get-view-window', { ...this.identity });
	            return new window_1._Window(this.wire, data);
	        };
	        /**
	         * Retrieves the current {@link OpenFin.TabStack} of the view if it belongs to one.
	         * @returns this view belongs to.
	         * @throws if this view does not belong to a TabStack or if the window has been destroyed.
	         * @example
	         * ```js
	         * if (!fin.me.isView) {
	         *     throw new Error('Not running in a platform View.');
	         * }
	         *
	         * const stack = await fin.me.getCurrentStack();
	         * // Alternatively, you can wrap any view and get the stack from there
	         * // const viewFromSomewhere = fin.View.wrapSync(someView.identity);
	         * // const stack = await viewFromSomewhere.getCurrentStack();
	         * const views = await stack.getViews();
	         * console.log(`Stack contains ${views.length} view(s)`);
	         * ```
	         */
	        this.getCurrentStack = async () => {
	            this.wire.sendAction('view-get-current-stack').catch(() => {
	                // don't expose
	            });
	            try {
	                const layout = await this.getParentLayout();
	                return layout.getStackByViewIdentity(this.identity);
	            }
	            catch (error) {
	                throw new transport_errors_1.RuntimeError({ reason: 'This view does not belong to a stack.', error });
	            }
	        };
	        /**
	         * Triggers the before-unload handler for the View, if one is set.
	         *
	         * @remarks Returns `true` if the handler is trying to prevent the View from unloading, and `false` if it isn't.
	         * Only enabled when setting enableBeforeUnload: true in your View options. If this option is not enabled it will
	         * always return false.
	         *
	         * This method is used internally by the Platform Provider to determine the status of each before unload handler in Views when closing the Window.
	         *
	         * @example
	         *
	         * ```js
	         * // from inside a View context
	         * const unloadPrevented = await fin.me.triggerBeforeUnload();
	         * ```
	         *
	         * @experimental
	         */
	        this.triggerBeforeUnload = async () => {
	            const message = await this.wire.sendAction('trigger-before-unload', { ...this.identity });
	            return message.payload.data;
	        };
	        /**
	         * **NOTE**: Internal use only.
	         * Attaches this view to an HTML element in the current context. The view will resize responsively when the element bounds change.
	         *
	         * **Known issue**: View.bindToElement does not track position changes, if the element has fixed px width and height values it is possible for the view to not update responsively.
	         *
	         * **Known issue**: When View.bindToElement is used on a element that takes up the entire page in a platform window, the bound view will not respond responsively when the window is resized to be smaller.
	         *
	         * @param element - HTML element to attach the view to.
	         * @returns - Cleanup function that will disconnect the element resize observer.
	         * @internal
	         * @experimental
	         * @remarks View will resize accordingly when the element is resized. If the element is repositioned in the DOM the view will not be repositioned, to handle this case call `bindToElement` again once the element changes position.
	         *
	         * @example
	         * ```html
	         * <div id="view-container"></div>
	         * <script>
	         *     async function createAndAttachView() {
	         *         const url = 'https://example.com';
	         *         const elementId = 'view-container';
	         *         const element = document.getElementById(elementId);
	         *         const view = await fin.View.create({
	         *             name: 'my-view',
	         *             url,
	         *             target: fin.me.identity
	         *         });
	         *         await view.navigate(url);
	         *         await view.bindToElement(element);
	         *     }
	         *     createAndAttachView().catch(console.error);
	         * </script>
	         * ```
	         */
	        this.bindToElement = async (element) => {
	            if (!element) {
	                throw new Error('Element not found.');
	            }
	            const onChange = async (bounds) => this.setBounds(bounds);
	            return this.wire.environment.observeBounds(element, onChange);
	        };
	    }
	    /**
	     * Focuses the view
	     *
	     * @example
	     * ```js
	     * const view = fin.View.wrapSync({ uuid: 'viewUuid', name: 'viewName' });
	     * await view.focus();
	     * // do things with the focused view
	     * ```
	     * @experimental
	     */
	    async focus({ emitSynthFocused } = { emitSynthFocused: true }) {
	        const win = await this.getCurrentWindow();
	        await win.focusedWebViewWasChanged();
	        await super.focus({ emitSynthFocused });
	    }
	}
	Instance$5.View = View;
	_View_providerChannelClient = new WeakMap();
	return Instance$5;
}

var hasRequiredView;

function requireView () {
	if (hasRequiredView) return view;
	hasRequiredView = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		/**
		 * Entry points for the OpenFin `View` API (`fin.View`).
		 *
		 * * {@link ViewModule} contains static members of the `View` API, accessible through `fin.View`.
		 * * {@link View} describes an instance of an OpenFin View, e.g. as returned by `fin.View.getCurrent`.
		 *
		 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
		 * both of these were documented on the same page.
		 *
		 * @packageDocumentation
		 */
		__exportStar(requireFactory$2(), exports);
		__exportStar(requireInstance$2(), exports); 
	} (view));
	return view;
}

var hasRequiredInstance$1;

function requireInstance$1 () {
	if (hasRequiredInstance$1) return Instance$6;
	hasRequiredInstance$1 = 1;
	Object.defineProperty(Instance$6, "__esModule", { value: true });
	Instance$6.Application = void 0;
	/* eslint-disable import/prefer-default-export */
	const base_1 = base;
	const window_1 = requireWindow();
	const view_1 = requireView();
	/**
	 * An object representing an application. Allows the developer to create,
	 * execute, show/close an application as well as listen to {@link OpenFin.ApplicationEvents application events}.
	 */
	class Application extends base_1.EmitterBase {
	    /**
	     * @internal
	     */
	    constructor(wire, identity) {
	        super(wire, 'application', identity.uuid);
	        this.identity = identity;
	        this.window = new window_1._Window(this.wire, {
	            uuid: this.identity.uuid,
	            name: this.identity.uuid
	        });
	    }
	    windowListFromIdentityList(identityList) {
	        const windowList = [];
	        identityList.forEach((identity) => {
	            windowList.push(new window_1._Window(this.wire, {
	                uuid: identity.uuid,
	                name: identity.name
	            }));
	        });
	        return windowList;
	    }
	    /**
	     * Determines if the application is currently running.
	     *
	     * @example
	     *
	     * ```js
	     * async function isAppRunning() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.isRunning();
	     * }
	     * isAppRunning().then(running => console.log(`Current app is running: ${running}`)).catch(err => console.log(err));
	     * ```
	     */
	    isRunning() {
	        return this.wire.sendAction('is-application-running', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Closes the application and any child windows created by the application.
	     * Cleans the application from state so it is no longer found in getAllApplications.
	     * @param force Close will be prevented from closing when force is false and
	     *  ‘close-requested’ has been subscribed to for application’s main window.
	     *
	     * @example
	     *
	     * ```js
	     * async function closeApp() {
	     *     const allApps1 = await fin.System.getAllApplications(); //[{uuid: 'app1', isRunning: true}, {uuid: 'app2', isRunning: true}]
	     *     const app = await fin.Application.wrap({uuid: 'app2'});
	     *     await app.quit();
	     *     const allApps2 = await fin.System.getAllApplications(); //[{uuid: 'app1', isRunning: true}]
	     *
	     * }
	     * closeApp().then(() => console.log('Application quit')).catch(err => console.log(err));
	     * ```
	     */
	    async quit(force = false) {
	        try {
	            await this._close(force);
	            await this.wire.sendAction('destroy-application', { force, ...this.identity });
	        }
	        catch (error) {
	            const acceptableErrors = ['Remote connection has closed', 'Could not locate the requested application'];
	            if (!acceptableErrors.some((msg) => error.message.includes(msg))) {
	                throw error;
	            }
	        }
	    }
	    async _close(force = false) {
	        try {
	            await this.wire.sendAction('close-application', { force, ...this.identity });
	        }
	        catch (error) {
	            if (!error.message.includes('Remote connection has closed')) {
	                throw error;
	            }
	        }
	    }
	    /**
	     * @deprecated use Application.quit instead
	     * Closes the application and any child windows created by the application.
	     * @param force - Close will be prevented from closing when force is false and ‘close-requested’ has been subscribed to for application’s main window.
	     * @param callback - called if the method succeeds.
	     * @param errorCallback - called if the method fails. The reason for failure is passed as an argument.
	     *
	     * @example
	     *
	     * ```js
	     * async function closeApp() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.close();
	     * }
	     * closeApp().then(() => console.log('Application closed')).catch(err => console.log(err));
	     * ```
	     */
	    close(force = false) {
	        console.warn('Deprecation Warning: Application.close is deprecated Please use Application.quit');
	        this.wire.sendAction('application-close', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this._close(force);
	    }
	    /**
	     * Retrieves an array of wrapped fin.Windows for each of the application’s child windows.
	     *
	     * @example
	     *
	     * ```js
	     * async function getChildWindows() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.getChildWindows();
	     * }
	     *
	     * getChildWindows().then(children => console.log(children)).catch(err => console.log(err));
	     * ```
	     */
	    getChildWindows() {
	        return this.wire.sendAction('get-child-windows', this.identity).then(({ payload }) => {
	            const identityList = [];
	            payload.data.forEach((winName) => {
	                identityList.push({ uuid: this.identity.uuid, name: winName });
	            });
	            return this.windowListFromIdentityList(identityList);
	        });
	    }
	    /**
	     * Retrieves the JSON manifest that was used to create the application. Invokes the error callback
	     * if the application was not created from a manifest.
	     *
	     * @example
	     *
	     * ```js
	     * async function getManifest() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.getManifest();
	     * }
	     *
	     * getManifest().then(manifest => console.log(manifest)).catch(err => console.log(err));
	     * ```
	     */
	    getManifest() {
	        return this.wire.sendAction('get-application-manifest', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves UUID of the application that launches this application. Invokes the error callback
	     * if the application was created from a manifest.
	     *
	     * @example
	     *
	     * ```js
	     * async function getParentUuid() {
	     *     const app = await fin.Application.start({
	     *         uuid: 'app-1',
	     *         name: 'myApp',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Application.getParentUuid.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getParentUuid();
	     * }
	     *
	     * getParentUuid().then(parentUuid => console.log(parentUuid)).catch(err => console.log(err));
	     * ```
	     */
	    getParentUuid() {
	        return this.wire.sendAction('get-parent-application', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves current application's shortcut configuration.
	     *
	     * @example
	     *
	     * ```js
	     * async function getShortcuts() {
	     *     const app = await fin.Application.wrap({ uuid: 'testapp' });
	     *     return await app.getShortcuts();
	     * }
	     * getShortcuts().then(config => console.log(config)).catch(err => console.log(err));
	     * ```
	     */
	    getShortcuts() {
	        return this.wire.sendAction('get-shortcuts', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves current application's views.
	     * @experimental
	     *
	     * @example
	     *
	     * ```js
	     * async function getViews() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.getViews();
	     * }
	     * getViews().then(views => console.log(views)).catch(err => console.log(err));
	     * ```
	     */
	    async getViews() {
	        const { payload } = await this.wire.sendAction('application-get-views', this.identity);
	        return payload.data.map((id) => new view_1.View(this.wire, id));
	    }
	    /**
	     * Returns the current zoom level of the application.
	     *
	     * @example
	     *
	     * ```js
	     * async function getZoomLevel() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.getZoomLevel();
	     * }
	     *
	     * getZoomLevel().then(zoomLevel => console.log(zoomLevel)).catch(err => console.log(err));
	     * ```
	     */
	    getZoomLevel() {
	        return this.wire.sendAction('get-application-zoom-level', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Returns an instance of the main Window of the application
	     *
	     * @example
	     *
	     * ```js
	     * async function getWindow() {
	     *     const app = await fin.Application.start({
	     *         uuid: 'app-1',
	     *         name: 'myApp',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Application.getWindow.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * getWindow().then(win => {
	     *     win.showAt(0, 400);
	     *     win.flash();
	     * }).catch(err => console.log(err));
	     * ```
	     */
	    getWindow() {
	        this.wire.sendAction('application-get-window', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return Promise.resolve(this.window);
	    }
	    /**
	     * Manually registers a user with the licensing service. The only data sent by this call is userName and appName.
	     * @param userName - username to be passed to the RVM.
	     * @param appName - app name to be passed to the RVM.
	     *
	     * @example
	     *
	     * ```js
	     * async function registerUser() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.registerUser('user', 'myApp');
	     * }
	     *
	     * registerUser().then(() => console.log('Successfully registered the user')).catch(err => console.log(err));
	     * ```
	     */
	    registerUser(userName, appName) {
	        return this.wire.sendAction('register-user', { userName, appName, ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Removes the application’s icon from the tray.
	     *
	     * @example
	     *
	     * ```js
	     * async function removeTrayIcon() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.removeTrayIcon();
	     * }
	     *
	     * removeTrayIcon().then(() => console.log('Removed the tray icon.')).catch(err => console.log(err));
	     * ```
	     */
	    removeTrayIcon() {
	        return this.wire.sendAction('remove-tray-icon', this.identity).then(() => undefined);
	    }
	    /**
	     * Restarts the application.
	     *
	     * @example
	     *
	     * ```js
	     * async function restartApp() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.restart();
	     * }
	     * restartApp().then(() => console.log('Application restarted')).catch(err => console.log(err));
	     * ```
	     */
	    restart() {
	        return this.wire.sendAction('restart-application', this.identity).then(() => undefined);
	    }
	    /**
	     * DEPRECATED method to run the application.
	     * Needed when starting application via {@link Application.create}, but NOT needed when starting via {@link Application.start}.
	     *
	     * @example
	     *
	     * ```js
	     * async function run() {
	     *     const app = await fin.Application.create({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Application.run.html',
	     *         autoShow: true
	     *     });
	     *     await app.run();
	     * }
	     * run().then(() => console.log('Application is running')).catch(err => console.log(err));
	     * ```
	     *
	     * @ignore
	     */
	    run() {
	        console.warn('Deprecation Warning: Application.run is deprecated Please use fin.Application.start');
	        this.wire.sendAction('application-run', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this._run();
	    }
	    _run(opts = {}) {
	        return this.wire
	            .sendAction('run-application', {
	            manifestUrl: this._manifestUrl,
	            opts,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Instructs the RVM to schedule one restart of the application.
	     *
	     * @example
	     *
	     * ```js
	     * async function scheduleRestart() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.scheduleRestart();
	     * }
	     *
	     * scheduleRestart().then(() => console.log('Application is scheduled to restart')).catch(err => console.log(err));
	     * ```
	     */
	    scheduleRestart() {
	        return this.wire.sendAction('relaunch-on-close', this.identity).then(() => undefined);
	    }
	    /**
	     * Sends a message to the RVM to upload the application's logs. On success,
	     * an object containing logId is returned.
	     *
	     * @example
	     *
	     * ```js
	     * async function sendLog() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.sendApplicationLog();
	     * }
	     *
	     * sendLog().then(info => console.log(info.logId)).catch(err => console.log(err));
	     * ```
	     */
	    async sendApplicationLog() {
	        const { payload } = await this.wire.sendAction('send-application-log', this.identity);
	        return payload.data;
	    }
	    /**
	     * Sets or removes a custom JumpList for the application. Only applicable in Windows OS.
	     * If categories is null the previously set custom JumpList (if any) will be replaced by the standard JumpList for the app (managed by Windows).
	     *
	     * Note: If the "name" property is omitted it defaults to "tasks".
	     * @param jumpListCategories An array of JumpList Categories to populate. If null, remove any existing JumpList configuration and set to Windows default.
	     *
	     *
	     * @remarks If categories is null the previously set custom JumpList (if any) will be replaced by the standard JumpList for the app (managed by Windows).
	     *
	     * The bottommost item in the jumplist will always be an item pointing to the current app. Its name is taken from the manifest's
	     * **` shortcut.name `** and uses **` shortcut.company `** as a fallback. Clicking that item will launch the app from its current manifest.
	     *
	     * Note: If the "name" property is omitted it defaults to "tasks".
	     *
	     * Note: Window OS caches jumplists icons, therefore an icon change might only be visible after the cache is removed or the
	     * uuid or shortcut.name is changed.
	     *
	     * @example
	     *
	     * ```js
	     *     const app = fin.Application.getCurrentSync();
	     *     const appName = 'My App';
	     *     const jumpListConfig = [ // array of JumpList categories
	     *         {
	     *             // has no name and no type so `type` is assumed to be "tasks"
	     *             items: [ // array of JumpList items
	     *             {
	     *                 type: 'task',
	     *                 title: `Launch ${appName}`,
	     *                 description: `Runs ${appName} with the default configuration`,
	     *                 deepLink: 'fins://path.to/app/manifest.json',
	     *                 iconPath: 'https://path.to/app/icon.ico',
	     *                 iconIndex: 0
	     *             },
	     *             { type: 'separator' },
	     *             {
	     *                 type: 'task',
	     *                 title: `Restore ${appName}`,
	     *                 description: 'Restore to last configuration',
	     *                 deepLink: 'fins://path.to/app/manifest.json?$$use-last-configuration=true',
	     *                 iconPath: 'https://path.to/app/icon.ico',
	     *                 iconIndex: 0
	     *             },
	     *             ]
	     *         },
	     *         {
	     *             name: 'Tools',
	     *             items: [ // array of JumpList items
	     *             {
	     *                 type: 'task',
	     *                 title: 'Tool A',
	     *                 description: 'Runs Tool A',
	     *                 deepLink: 'fins://path.to/tool-a/manifest.json',
	     *                 iconPath: 'https://path.to/tool-a/icon.ico',
	     *                 iconIndex: 0
	     *             },
	     *             {
	     *                 type: 'task',
	     *                 title: 'Tool B',
	     *                 description: 'Runs Tool B',
	     *                 deepLink: 'fins://path.to/tool-b/manifest.json',
	     *                 iconPath: 'https://path.to/tool-b/icon.ico',
	     *                 iconIndex: 0
	     *             }]
	     *         }
	     *     ];
	     *
	     *     app.setJumpList(jumpListConfig).then(() => console.log('JumpList applied')).catch(e => console.log(`JumpList failed to apply: ${e.toString()}`));
	     * ```
	     *
	     * To handle deeplink args:
	     * ```js
	     *     function handleUseLastConfiguration() {
	     *         // this handler is called when the app is being launched
	     *         app.on('run-requested', event => {
	     *             if(event.userAppConfigArgs['use-last-configuration']) {
	     *                 // your logic here
	     *             }
	     *         });
	     *         // this handler is called when the app was already running when the launch was requested
	     *         fin.desktop.main(function(args) {
	     *             if(args && args['use-last-configuration']) {
	     *                 // your logic here
	     *             }
	     *         });
	     *     }
	     * ```
	     */
	    async setJumpList(jumpListCategories) {
	        await this.wire.sendAction('set-jump-list', { config: jumpListCategories, ...this.identity });
	    }
	    /**
	     * Adds a customizable icon in the system tray.  To listen for a click on the icon use the `tray-icon-clicked` event.
	     * @param icon Image URL or base64 encoded string to be used as the icon
	     *
	     * @example
	     *
	     * ```js
	     * const imageUrl = "http://cdn.openfin.co/assets/testing/icons/circled-digit-one.png";
	     * const base64EncodedImage = "iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX\
	     * ///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";
	     * const dataURL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DH\
	     * xgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
	     *
	     * async function setTrayIcon(icon) {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.setTrayIcon(icon);
	     * }
	     *
	     * // use image url to set tray icon
	     * setTrayIcon(imageUrl).then(() => console.log('Setting tray icon')).catch(err => console.log(err));
	     *
	     * // use base64 encoded string to set tray icon
	     * setTrayIcon(base64EncodedImage).then(() => console.log('Setting tray icon')).catch(err => console.log(err));
	     *
	     * // use a dataURL to set tray icon
	     * setTrayIcon(dataURL).then(() => console.log('Setting tray icon')).catch(err => console.log(err));
	     * ```
	     */
	    setTrayIcon(icon) {
	        return this.wire
	            .sendAction('set-tray-icon', {
	            enabledIcon: icon,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Set hover text for this application's system tray icon.
	     * Note: Application must first set a tray icon with {@link Application.setTrayIcon}.
	     * @param toolTip
	     *
	     * @example
	     *
	     * ```js
	     * const app = fin.Application.getCurrentSync();
	     * const iconUrl = "http://cdn.openfin.co/assets/testing/icons/circled-digit-one.png";
	     *
	     * await app.setTrayIcon(iconUrl);
	     *
	     * await app.setTrayIconToolTip('My Application');
	     * ```
	     */
	    async setTrayIconToolTip(toolTip) {
	        await this.wire.sendAction('set-tray-icon-tooltip', { ...this.identity, toolTip });
	    }
	    /**
	     * Sets new application's shortcut configuration. Windows only.
	     * @param config New application's shortcut configuration.
	     *
	     * @remarks Application has to be launched with a manifest and has to have shortcut configuration (icon url, name, etc.) in its manifest
	     * to be able to change shortcut states.
	     *
	     * @example
	     *
	     * ```js
	     * async function setShortcuts(config) {
	     *     const app = await fin.Application.getCurrent();
	     *     return app.setShortcuts(config);
	     * }
	     *
	     * setShortcuts({
	     *     desktop: true,
	     *     startMenu: false,
	     *     systemStartup: true
	     * }).then(() => console.log('Shortcuts are set.')).catch(err => console.log(err));
	     * ```
	     */
	    setShortcuts(config) {
	        return this.wire.sendAction('set-shortcuts', { data: config, ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Sets the query string in all shortcuts for this app. Requires RVM 5.5+.
	     * @param queryString The new query string for this app's shortcuts.
	     *
	     * @example
	     *
	     * ```js
	     * const newQueryArgs = 'arg=true&arg2=false';
	     * const app = await fin.Application.getCurrent();
	     * try {
	     *     await app.setShortcutQueryParams(newQueryArgs);
	     * } catch(err) {
	     *     console.error(err)
	     * }
	     * ```
	     */
	    async setShortcutQueryParams(queryString) {
	        await this.wire.sendAction('set-shortcut-query-args', { data: queryString, ...this.identity });
	    }
	    /**
	     * Sets the zoom level of the application. The original size is 0 and each increment above or below represents zooming 20%
	     * larger or smaller to default limits of 300% and 50% of original size, respectively.
	     * @param level The zoom level
	     *
	     * @example
	     *
	     * ```js
	     * async function setZoomLevel(number) {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.setZoomLevel(number);
	     * }
	     *
	     * setZoomLevel(5).then(() => console.log('Setting a  zoom level')).catch(err => console.log(err));
	     * ```
	     */
	    setZoomLevel(level) {
	        return this.wire.sendAction('set-application-zoom-level', { level, ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Sets a username to correlate with App Log Management.
	     * @param username Username to correlate with App's Log.
	     *
	     * @example
	     *
	     * ```js
	     * async function setAppLogUser() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.setAppLogUsername('username');
	     * }
	     *
	     * setAppLogUser().then(() => console.log('Success')).catch(err => console.log(err));
	     *
	     * ```
	     */
	    async setAppLogUsername(username) {
	        await this.wire.sendAction('set-app-log-username', { data: username, ...this.identity });
	    }
	    /**
	     * Retrieves information about the system tray. If the system tray is not set, it will throw an error message.
	     * @remarks The only information currently returned is the position and dimensions.
	     *
	     * @example
	     *
	     * ```js
	     * async function getTrayIconInfo() {
	     *     const app = await fin.Application.wrap({ uuid: 'testapp' });
	     *     return await app.getTrayIconInfo();
	     * }
	     * getTrayIconInfo().then(info => console.log(info)).catch(err => console.log(err));
	     * ```
	     */
	    getTrayIconInfo() {
	        return this.wire.sendAction('get-tray-icon-info', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Checks if the application has an associated tray icon.
	     *
	     * @example
	     *
	     * ```js
	     * const app = await fin.Application.wrap({ uuid: 'testapp' });
	     * const hasTrayIcon = await app.hasTrayIcon();
	     * console.log(hasTrayIcon);
	     * ```
	     */
	    hasTrayIcon() {
	        return this.wire.sendAction('has-tray-icon', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Closes the application by terminating its process.
	     *
	     * @example
	     *
	     * ```js
	     * async function terminateApp() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.terminate();
	     * }
	     * terminateApp().then(() => console.log('Application terminated')).catch(err => console.log(err));
	     * ```
	     */
	    terminate() {
	        return this.wire.sendAction('terminate-application', this.identity).then(() => undefined);
	    }
	    /**
	     * Waits for a hanging application. This method can be called in response to an application
	     * "not-responding" to allow the application to continue and to generate another "not-responding"
	     * message after a certain period of time.
	     *
	     * @ignore
	     */
	    wait() {
	        return this.wire.sendAction('wait-for-hung-application', this.identity).then(() => undefined);
	    }
	    /**
	     * Retrieves information about the application.
	     *
	     * @remarks If the application was not launched from a manifest, the call will return the closest parent application `manifest`
	     * and `manifestUrl`.  `initialOptions` shows the parameters used when launched programmatically, or the `startup_app` options
	     * if launched from manifest. The `parentUuid` will be the uuid of the immediate parent (if applicable).
	     *
	     * @example
	     *
	     * ```js
	     * async function getInfo() {
	     *     const app = await fin.Application.getCurrent();
	     *     return await app.getInfo();
	     * }
	     *
	     * getInfo().then(info => console.log(info)).catch(err => console.log(err));
	     * ```
	     */
	    getInfo() {
	        return this.wire.sendAction('get-info', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves all process information for entities (windows and views) associated with an application.
	     *
	     * @example
	     * ```js
	     *     const app = await fin.Application.getCurrent();
	     *     const processInfo = await app.getProcessInfo();
	     * ```
	     * @experimental
	     */
	    async getProcessInfo() {
	        const { payload: { data } } = await this.wire.sendAction('application-get-process-info', this.identity);
	        return data;
	    }
	    /**
	     * Sets file auto download location. It's only allowed in the same application.
	     *
	     * Note: This method is restricted by default and must be enabled via
	     * <a href="https://developers.openfin.co/docs/api-security">API security settings</a>.
	     * @param downloadLocation file auto download location
	     *
	     * @throws if setting file auto download location on different applications.
	     * @example
	     *
	     * ```js
	     * const downloadLocation = 'C:\\dev\\temp';
	     * const app = await fin.Application.getCurrent();
	     * try {
	     *     await app.setFileDownloadLocation(downloadLocation);
	     *     console.log('File download location is set');
	     * } catch(err) {
	     *     console.error(err)
	     * }
	     * ```
	     */
	    async setFileDownloadLocation(downloadLocation) {
	        const { name } = this.wire.me;
	        const entityIdentity = { uuid: this.identity.uuid, name };
	        await this.wire.sendAction('set-file-download-location', { ...entityIdentity, downloadLocation });
	    }
	    /**
	     * Gets file auto download location. It's only allowed in the same application. If file auto download location is not set, it will return the default location.
	     *
	     * Note: This method is restricted by default and must be enabled via
	     * <a href="https://developers.openfin.co/docs/api-security">API security settings</a>.
	     *
	     * @throws if getting file auto download location on different applications.
	     * @example
	     *
	     * ```js
	     * const app = await fin.Application.getCurrent();
	     * const fileDownloadDir =  await app.getFileDownloadLocation();
	     * ```
	     */
	    async getFileDownloadLocation() {
	        const { payload: { data } } = await this.wire.sendAction('get-file-download-location', this.identity);
	        return data;
	    }
	    /**
	     * Shows a menu on the tray icon. Use with tray-icon-clicked event.
	     * @param options
	     * @typeParam Data User-defined shape for data returned upon menu item click. Should be a
	     * [union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
	     * of all possible data shapes for the entire menu, and the click handler should process
	     * these with a "reducer" pattern.
	     * @throws if the application has no tray icon set
	     * @throws if the system tray is currently hidden
	     * @example
	     *
	     * ```js
	     * const iconUrl = 'http://cdn.openfin.co/assets/testing/icons/circled-digit-one.png';
	     * const app = fin.Application.getCurrentSync();
	     *
	     * await app.setTrayIcon(iconUrl);
	     *
	     * const template = [
	     *  {
	     *    label: 'Menu Item 1',
	     *    data: 'hello from item 1'
	     *  },
	     *  { type: 'separator' },
	     *  {
	     *    label: 'Menu Item 2',
	     *    type: 'checkbox',
	     *    checked: true,
	     *    data: 'The user clicked the checkbox'
	     *  },
	     *  {
	     *    label: 'see more',
	     *    enabled: false,
	     *    submenu: [
	     *      { label: 'submenu 1', data: 'hello from submenu' }
	     *    ]
	     *  }
	     * ];
	     *
	     * app.addListener('tray-icon-clicked', (event) => {
	     *   // right-click
	     *   if (event.button === 2) {
	     *     app.showTrayIconPopupMenu({ template }).then(r => {
	     *       if (r.result === 'closed') {
	     *         console.log('nothing happened');
	     *       } else {
	     *         console.log(r.data);
	     *       }
	     *     });
	     *   }
	     * });
	     * ```
	     */
	    async showTrayIconPopupMenu(options) {
	        const { name } = this.wire.me;
	        const entityIdentity = { uuid: this.identity.uuid, name };
	        const { payload } = await this.wire.sendAction('show-tray-icon-popup-menu', { ...entityIdentity, options });
	        return payload.data;
	    }
	    /**
	     * Closes the tray icon menu.
	     *
	     * @throws if the application has no tray icon set
	     * @example
	     *
	     * ```js
	     * const app = fin.Application.getCurrentSync();
	     *
	     * await app.closeTrayIconPopupMenu();
	     * ```
	     */
	    async closeTrayIconPopupMenu() {
	        const { name } = this.wire.me;
	        const entityIdentity = { uuid: this.identity.uuid, name };
	        await this.wire.sendAction('close-tray-icon-popup-menu', { ...entityIdentity });
	    }
	}
	Instance$6.Application = Application;
	return Instance$6;
}

var hasRequiredFactory$1;

function requireFactory$1 () {
	if (hasRequiredFactory$1) return Factory$7;
	hasRequiredFactory$1 = 1;
	Object.defineProperty(Factory$7, "__esModule", { value: true });
	Factory$7.ApplicationModule = void 0;
	const base_1 = base;
	const validate_1 = validate;
	const Instance_1 = requireInstance$1();
	/**
	 * Static namespace for OpenFin API methods that interact with the {@link Application} class, available under `fin.Application`.
	 */
	class ApplicationModule extends base_1.Base {
	    /**
	     * Asynchronously returns an API handle for the given Application identity.
	     *
	     * @remarks Wrapping an Application identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for an Application throughout its entire lifecycle.
	     *
	     * @example
	     *
	     * ```js
	     * fin.Application.wrap({ uuid: 'testapp' })
	     * .then(app => app.isRunning())
	     * .then(running => console.log('Application is running: ' + running))
	     * .catch(err => console.log(err));
	     * ```
	     *
	     */
	    async wrap(identity) {
	        this.wire.sendAction('wrap-application').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new Instance_1.Application(this.wire, identity);
	    }
	    /**
	     * Synchronously returns an API handle for the given Application identity.
	     *
	     * @remarks Wrapping an Application identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for an Aplication throughout its entire lifecycle.
	     *
	     * @example
	     *
	     * ```js
	     * const app = fin.Application.wrapSync({ uuid: 'testapp' });
	     * await app.close();
	     * ```
	     *
	     */
	    wrapSync(identity) {
	        this.wire.sendAction('wrap-application-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new Instance_1.Application(this.wire, identity);
	    }
	    async _create(appOptions) {
	        // set defaults:
	        if (appOptions.waitForPageLoad === undefined) {
	            appOptions.waitForPageLoad = false;
	        }
	        if (appOptions.autoShow === undefined && appOptions.isPlatformController === undefined) {
	            appOptions.autoShow = true;
	        }
	        await this.wire.sendAction('create-application', appOptions);
	        return this.wrap({ uuid: appOptions.uuid });
	    }
	    /**
	     * DEPRECATED method to create a new Application. Use {@link Application.ApplicationModule.start Application.start} instead.
	     *
	     * @example
	     *
	     * ```js
	     * async function createApp() {
	     *     const app = await fin.Application.create({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Application.create.html',
	     *         autoShow: true
	     *     });
	     *     await app.run();
	     * }
	     *
	     * createApp().then(() => console.log('Application is created')).catch(err => console.log(err));
	     * ```
	     *
	     * @ignore
	     */
	    create(appOptions) {
	        console.warn('Deprecation Warning: fin.Application.create is deprecated. Please use fin.Application.start');
	        this.wire.sendAction('application-create').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this._create(appOptions);
	    }
	    /**
	     * Creates and starts a new Application.
	     *
	     * @example
	     *
	     * ```js
	     * async function start() {
	     *     return fin.Application.start({
	     *         name: 'app-1',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Application.start.html',
	     *         autoShow: true
	     *     });
	     * }
	     * start().then(() => console.log('Application is running')).catch(err => console.log(err));
	     * ```
	     *
	     */
	    async start(appOptions) {
	        this.wire.sendAction('start-application').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const app = await this._create(appOptions);
	        await this.wire.sendAction('run-application', { uuid: appOptions.uuid });
	        return app;
	    }
	    /**
	     * Asynchronously starts a batch of applications given an array of application identifiers and manifestUrls.
	     * Returns once the RVM is finished attempting to launch the applications.
	     * @param opts - Parameters that the RVM will use.
	     *
	     * @example
	     *
	     * ```js
	     *
	     * const applicationInfoArray = [
	     *     {
	     *         "uuid": 'App-1',
	     *         "manifestUrl": 'http://localhost:5555/app1.json',
	     *     },
	     *     {
	     *         "uuid": 'App-2',
	     *         "manifestUrl": 'http://localhost:5555/app2.json',
	     *     },
	     *     {
	     *         "uuid": 'App-3',
	     *         "manifestUrl": 'http://localhost:5555/app3.json',
	     *     }
	     * ]
	     *
	     * fin.Application.startManyManifests(applicationInfoArray)
	     *     .then(() => {
	     *         console.log('RVM has finished launching the application list.');
	     *     })
	     *     .catch((err) => {
	     *         console.log(err);
	     *     })
	     * ```
	     *
	     * @experimental
	     */
	    async startManyManifests(applications, opts) {
	        return this.wire.sendAction('run-applications', { applications, opts }).then(() => undefined);
	    }
	    /**
	     * Asynchronously returns an Application object that represents the current application
	     *
	     * @example
	     *
	     * ```js
	     * async function isCurrentAppRunning () {
	     *     const app = await fin.Application.getCurrent();
	     *     return app.isRunning();
	     * }
	     *
	     * isCurrentAppRunning().then(running => {
	     *     console.log(`Current app is running: ${running}`);
	     * }).catch(err => {
	     *     console.error(err);
	     * });
	     *
	     * ```
	     */
	    getCurrent() {
	        this.wire.sendAction('get-current-application').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this.wrap({ uuid: this.wire.me.uuid });
	    }
	    /**
	     * Synchronously returns an Application object that represents the current application
	     *
	     * @example
	     *
	     * ```js
	     * async function isCurrentAppRunning () {
	     *     const app = fin.Application.getCurrentSync();
	     *     return app.isRunning();
	     * }
	     *
	     * isCurrentAppRunning().then(running => {
	     *     console.log(`Current app is running: ${running}`);
	     * }).catch(err => {
	     *     console.error(err);
	     * });
	     *
	     * ```
	     */
	    getCurrentSync() {
	        this.wire.sendAction('get-current-application-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this.wrapSync({ uuid: this.wire.me.uuid });
	    }
	    /**
	     * Retrieves application's manifest and returns a running instance of the application.
	     * @param manifestUrl - The URL of app's manifest.
	     * @param opts - Parameters that the RVM will use.
	     *
	     * @example
	     *
	     * ```js
	     * fin.Application.startFromManifest('http://localhost:5555/app.json').then(app => console.log('App is running')).catch(err => console.log(err));
	     *
	     * // For a local manifest file:
	     * fin.Application.startFromManifest('file:///C:/somefolder/app.json').then(app => console.log('App is running')).catch(err => console.log(err));
	     * ```
	     */
	    async startFromManifest(manifestUrl, opts) {
	        this.wire.sendAction('application-start-from-manifest').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const app = await this._createFromManifest(manifestUrl);
	        // @ts-expect-error using private method without warning.
	        await app._run(opts); // eslint-disable-line no-underscore-dangle
	        return app;
	    }
	    /**
	     * @deprecated Use {@link Application.ApplicationModule.startFromManifest Application.startFromManifest} instead.
	     * Retrieves application's manifest and returns a wrapped application.
	     * @param manifestUrl - The URL of app's manifest.
	     * @param callback - called if the method succeeds.
	     * @param errorCallback - called if the method fails. The reason for failure is passed as an argument.
	     *
	     * @example
	     *
	     * ```js
	     * fin.Application.createFromManifest('http://localhost:5555/app.json').then(app => console.log(app)).catch(err => console.log(err));
	     * ```
	     * @ignore
	     */
	    createFromManifest(manifestUrl) {
	        console.warn('Deprecation Warning: fin.Application.createFromManifest is deprecated. Please use fin.Application.startFromManifest');
	        this.wire.sendAction('application-create-from-manifest').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this._createFromManifest(manifestUrl);
	    }
	    _createFromManifest(manifestUrl) {
	        return this.wire
	            .sendAction('get-application-manifest', { manifestUrl })
	            .then(({ payload }) => {
	            const uuid = payload.data.platform ? payload.data.platform.uuid : payload.data.startup_app.uuid;
	            return this.wrap({ uuid });
	        })
	            .then((app) => {
	            app._manifestUrl = manifestUrl; // eslint-disable-line no-underscore-dangle
	            return app;
	        });
	    }
	}
	Factory$7.ApplicationModule = ApplicationModule;
	return Factory$7;
}

var hasRequiredApplication;

function requireApplication () {
	if (hasRequiredApplication) return application;
	hasRequiredApplication = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		/**
		 * Entry points for the OpenFin `Application` API (`fin.Application`).
		 *
		 * * {@link ApplicationModule} contains static members of the `Application` API, accessible through `fin.Application`.
		 * * {@link Application} describes an instance of an OpenFin Application, e.g. as returned by `fin.Application.getCurrent`.
		 *
		 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
		 * both of these were documented on the same page.
		 *
		 * @packageDocumentation
		 */
		__exportStar(requireFactory$1(), exports);
		__exportStar(requireInstance$1(), exports); 
	} (application));
	return application;
}

var promisifySubscription$1 = {};

Object.defineProperty(promisifySubscription$1, "__esModule", { value: true });
promisifySubscription$1.promisifySubscription = void 0;
const promisifySubscription = async (emitter, eventName, predicate = () => true, timeout) => {
    let resolve;
    let reject;
    let timer;
    const valuePromise = new Promise((y, n) => {
        resolve = y;
        reject = n;
    });
    const listener = (e) => {
        if (predicate(e)) {
            clearTimeout(timer);
            resolve(e);
        }
    };
    await emitter.on(eventName, listener);
    if (timeout) {
        timer = setTimeout(() => reject(new Error('event timed out')), timeout);
    }
    valuePromise.finally(() => {
        emitter.removeListener(eventName, listener).catch(() => null);
    });
    return {
        getValue: () => valuePromise
    };
};
promisifySubscription$1.promisifySubscription = promisifySubscription;

var hasRequiredInstance;

function requireInstance () {
	if (hasRequiredInstance) return Instance$7;
	hasRequiredInstance = 1;
	Object.defineProperty(Instance$7, "__esModule", { value: true });
	Instance$7._Window = void 0;
	/* eslint-disable import/prefer-default-export */
	/* eslint-disable @typescript-eslint/no-unused-vars */
	/* eslint-disable no-console */
	/* eslint-disable @typescript-eslint/no-non-null-assertion */
	const application_1 = requireApplication();
	const main_1 = main;
	const view_1 = requireView();
	const warnings_1 = warnings;
	const promisifySubscription_1 = promisifySubscription$1;
	/**
	 * A basic window that wraps a native HTML window. Provides more fine-grained
	 * control over the window state such as the ability to minimize, maximize, restore, etc.
	 * By default a window does not show upon instantiation; instead the window's show() method
	 * must be invoked manually. The new window appears in the same process as the parent window.
	 * It has the ability to listen for {@link OpenFin.WindowEvents window specific events}.
	 */
	// The window.Window name is taken
	class _Window extends main_1.WebContents {
	    /**
	     * @internal
	     */
	    constructor(wire, identity) {
	        super(wire, identity, 'window');
	    }
	    async createWindow(options) {
	        this.wire.sendAction('window-create-window', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const CONSTRUCTOR_CB_TOPIC = 'fire-constructor-callback';
	        const responseSubscription = await (0, promisifySubscription_1.promisifySubscription)(this, CONSTRUCTOR_CB_TOPIC);
	        // set defaults:
	        if (options.waitForPageLoad === undefined) {
	            options.waitForPageLoad = false;
	        }
	        if (options.autoShow === undefined) {
	            options.autoShow = true;
	        }
	        (0, warnings_1.handleDeprecatedWarnings)(options);
	        const windowCreation = this.wire.environment.createChildContent({ entityType: 'window', options });
	        const [response] = await Promise.all([responseSubscription.getValue(), windowCreation]);
	        let cbPayload;
	        const { success } = response;
	        const responseData = response.data;
	        const { message } = responseData;
	        if (success) {
	            cbPayload = {
	                httpResponseCode: responseData.httpResponseCode,
	                apiInjected: responseData.apiInjected
	            };
	        }
	        else {
	            cbPayload = {
	                message: responseData.message,
	                networkErrorCode: responseData.networkErrorCode,
	                stack: responseData.stack
	            };
	        }
	        const pageResolve = {
	            message,
	            cbPayload,
	            success
	        };
	        try {
	            // this is to enforce a 5.0 contract that the child's main function
	            // will not fire before the parent's success callback on creation.
	            // if the child window is not accessible (CORS) this contract does
	            // not hold.
	            const webWindow = this.getWebWindow();
	            webWindow.fin.__internal_.openerSuccessCBCalled();
	        }
	        catch (e) {
	            // common for main windows, we do not want to expose this error. here just to have a debug target.
	            // console.error(e);
	        }
	        if (pageResolve.success) {
	            return this;
	        }
	        return Promise.reject(pageResolve);
	    }
	    /**
	     * Retrieves an array of frame info objects representing the main frame and any
	     * iframes that are currently on the page.
	     *
	     * @example
	     * ```js
	     * async function getAllFrames() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getAllFrames.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getAllFrames();
	     * }
	     *
	     * getAllFrames().then(framesInfo => console.log(framesInfo)).catch(err => console.log(err));
	     * ```
	     */
	    getAllFrames() {
	        return this.wire.sendAction('get-all-frames', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Activates the current window and focuses the child entity if it exists. If this does
	     * not succeed - say the child does not belong to this window, or the identity does not exist -
	     * it will return false.
	     *
	     * @example
	     * ```js
	     * const win = fin.Window.wrapSync({ uuid: 'myApp', name: 'myOtherWindow' });
	     *
	     * win.getCurrentViews()
	     *   .then(([view1]) => {
	     *      return win.activateAndFocus(view1.identity);
	     *   })
	     *   .then(success => {
	     *     if (success) {
	     *        console.log('Window activated and child focused');
	     *     } else {
	     *        console.log('Window activation failed, focus state unchanged');
	     *     }
	     *   })
	     *   .catch(console.error);
	     * ```
	     */
	    activateAndFocus(childIdentityToFocus) {
	        return this.wire
	            .sendAction('activate-window-and-focus', {
	            winIdentity: this.identity,
	            focusIdentity: childIdentityToFocus
	        })
	            .then(({ payload }) => payload.data);
	    }
	    /**
	     * Gets the current bounds (top, bottom, right, left, width, height) of the window.
	     *
	     * @example
	     * ```js
	     * async function getBounds() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getBounds.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getBounds();
	     * }
	     *
	     * getBounds().then(bounds => console.log(bounds)).catch(err => console.log(err));
	     * ```
	     */
	    getBounds(options) {
	        return this.wire
	            .sendAction('get-window-bounds', { ...this.identity, options })
	            .then(({ payload }) => payload.data);
	    }
	    /**
	     * Centers the window on its current screen.
	     *
	     * @remarks Does not have an effect on minimized or maximized windows.
	     *
	     * @example
	     * ```js
	     * async function centerWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.center.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.center();
	     * }
	     *
	     * centerWindow().then(() => console.log('Window centered')).catch(err => console.log(err));
	     * ```
	     *
	     */
	    center() {
	        return this.wire.sendAction('center-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Removes focus from the window.
	     *
	     * @example
	     * ```js
	     * async function blurWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.blur.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.blur();
	     * }
	     *
	     * blurWindow().then(() => console.log('Blured Window')).catch(err => console.log(err));
	     * ```
	     */
	    blur() {
	        return this.wire.sendAction('blur-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Brings the window to the front of the window stack.
	     *
	     * @example
	     * ```js
	     * async function BringWindowToFront() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.bringToFront.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.bringToFront();
	     * }
	     *
	     * BringWindowToFront().then(() => console.log('Window is in the front')).catch(err => console.log(err));
	     * ```
	     */
	    bringToFront() {
	        return this.wire.sendAction('bring-window-to-front', this.identity).then(() => undefined);
	    }
	    /**
	     * Performs the specified window transitions.
	     * @param transitions - Describes the animations to perform. See the tutorial.
	     * @param options - Options for the animation. See the tutorial.
	     *
	     * @example
	     * ```
	     * async function animateWindow() {
	     *     const transitions = {
	     *         opacity: {
	     *             opacity: 0.7,
	     *             duration: 500
	     *         },
	     *         position: {
	     *             top: 100,
	     *             left: 100,
	     *             duration: 500,
	     *             relative: true
	     *         }
	     *     };
	     *     const options = {
	     *         interrupt: true,
	     *         tween: 'ease-in'
	     *     };
	     *
	     *     const win = await fin.Window.getCurrent();
	     *     return win.animate(transitions, options);
	     * }
	     *
	     * animateWindow()
	     *     .then(() => console.log('Animation done'))
	     *     .catch(err => console.error(err));
	     * ```
	     */
	    animate(transitions, options) {
	        return this.wire
	            .sendAction('animate-window', {
	            transitions,
	            options,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Hides the window.
	     *
	     * @example
	     * ```js
	     * async function hideWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.hide.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.hide();
	     * }
	     *
	     * hideWindow().then(() => console.log('Window is hidden')).catch(err => console.log(err));
	     * ```
	     */
	    hide() {
	        return this.wire.sendAction('hide-window', this.identity).then(() => undefined);
	    }
	    /**
	     * closes the window application
	     * @param force Close will be prevented from closing when force is false and
	     *  ‘close-requested’ has been subscribed to for application’s main window.
	     *
	     * @example
	     * ```js
	     * async function closeWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.close.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.close();
	     * }
	     *
	     * closeWindow().then(() => console.log('Window closed')).catch(err => console.log(err));
	     * ```
	     */
	    close(force = false) {
	        return this.wire.sendAction('close-window', { force, ...this.identity }).then(() => {
	            Object.setPrototypeOf(this, null);
	            return undefined;
	        });
	    }
	    focusedWebViewWasChanged() {
	        return this.wire.sendAction('focused-webview-changed', this.identity).then(() => undefined);
	    }
	    /**
	     * Returns the native OS level Id.
	     *
	     * @remarks In Windows, it will return the Windows [handle](https://docs.microsoft.com/en-us/windows/desktop/WinProg/windows-data-types#HWND).
	     *
	     * @example
	     * ```js
	     * async function getWindowNativeId() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getNativeId.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getNativeId();
	     * }
	     *
	     * getWindowNativeId().then(nativeId => console.log(nativeId)).catch(err => console.log(err));
	     * ```
	     */
	    getNativeId() {
	        return this.wire.sendAction('get-window-native-id', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves window's attached views.
	     * @experimental
	     *
	     * @example
	     * ```js
	     * const win = fin.Window.getCurrentSync();
	     *
	     * win.getCurrentViews()
	     *   .then(views => console.log(views))
	     *   .catch(console.error);
	     * ```
	     */
	    async getCurrentViews() {
	        const { payload } = await this.wire.sendAction('window-get-views', this.identity);
	        return payload.data.map((id) => new view_1.View(this.wire, id));
	    }
	    /**
	     * @deprecated Use {@link Window._Window.disableUserMovement} instead.
	     */
	    disableFrame() {
	        console.warn('Function is deprecated; use disableUserMovement instead.');
	        return this.wire.sendAction('disable-window-frame', this.identity).then(() => undefined);
	    }
	    /**
	     * Prevents a user from changing a window's size/position when using the window's frame.
	     *
	     * @example
	     * ```js
	     * async function disableUserMovement() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.disableFrame.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.disableUserMovement();
	     * }
	     *
	     * disableUserMovement().then(() => console.log('Window is disabled')).catch(err => console.log(err));
	     * ```
	     */
	    disableUserMovement() {
	        return this.wire.sendAction('disable-window-frame', this.identity).then(() => undefined);
	    }
	    /**
	     * @deprecated Use {@link Window._Window.enableUserMovement} instead.
	     */
	    enableFrame() {
	        console.warn('Function is deprecated; use enableUserMovement instead.');
	        return this.wire.sendAction('enable-window-frame', this.identity).then(() => undefined);
	    }
	    /**
	     * Re-enables user changes to a window's size/position when using the window's frame.
	     *
	     * @example
	     * ```js
	     * async function enableUserMovement() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-3',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.enableFrame.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.enableUserMovement();
	     * }
	     *
	     * enableUserMovement().then(() => console.log('Window is enabled')).catch(err => console.log(err));
	     * ```
	     */
	    enableUserMovement() {
	        return this.wire.sendAction('enable-window-frame', this.identity).then(() => undefined);
	    }
	    /**
	     * Flashes the window’s frame and taskbar icon until stopFlashing is called or until a focus event is fired.
	     *
	     * @remarks On macOS flash only works on inactive windows.
	     * @example
	     * ```js
	     * async function windowFlash() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.flash.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.flash();
	     * }
	     *
	     * windowFlash().then(() => console.log('Window flashing')).catch(err => console.log(err));
	     * ```
	     */
	    flash() {
	        return this.wire.sendAction('flash-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Stops the taskbar icon from flashing.
	     *
	     * @example
	     * ```js
	     * async function stopWindowFlashing() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.stopFlashing.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.stopFlashing();
	     * }
	     *
	     * stopWindowFlashing().then(() => console.log('Application window flashing')).catch(err => console.log(err));
	     * ```
	     */
	    stopFlashing() {
	        return this.wire.sendAction('stop-flash-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Gets an information object for the window.
	     *
	     * @example
	     * ```js
	     * async function getInfo() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getInfo.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getInfo();
	     * }
	     *
	     * getInfo().then(info => console.log(info)).catch(err => console.log(err));
	     * ```
	     */
	    getInfo() {
	        return this.wire.sendAction('get-window-info', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Retrieves the window's Layout
	     *
	     * @example
	     * ```js
	     *     //get the current window
	     *     const window = await fin.Window.getCurrent();
	     *
	     *     //get the layout for the window
	     *     const layout = await window.getLayout();
	     * ```
	     * @experimental
	     */
	    async getLayout(layoutIdentity) {
	        this.wire.sendAction('window-get-layout', this.identity).catch((e) => {
	            // don't expose
	        });
	        const opts = await this.getOptions();
	        if (!opts.layout && !opts.layoutSnapshot) {
	            throw new Error('Window does not have a Layout');
	        }
	        return this.fin.Platform.Layout.wrap(layoutIdentity ?? this.identity);
	    }
	    /**
	     * Gets the current settings of the window.
	     *
	     * @example
	     * ```js
	     * async function getWindowOptions() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getOptions.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getOptions();
	     * }
	     *
	     * getWindowOptions().then(opts => console.log(opts)).catch(err => console.log(err));
	     * ```
	     */
	    getOptions() {
	        return this.wire.sendAction('get-window-options', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Gets the parent application.
	     *
	     * @example
	     * ```js
	     * async function getParentApplication() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getParentApplication.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getParentApplication();
	     * }
	     *
	     * getParentApplication().then(parentApplication => console.log(parentApplication)).catch(err => console.log(err));
	     * ```
	     */
	    getParentApplication() {
	        this.wire.sendAction('window-get-parent-application', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return Promise.resolve(new application_1.Application(this.wire, this.identity));
	    }
	    /**
	     * Gets the parent window.
	     *
	     * @example
	     * ```js
	     * async function getParentWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getParentWindow.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getParentWindow();
	     * }
	     *
	     * getParentWindow().then(parentWindow => console.log(parentWindow)).catch(err => console.log(err));
	     * ```
	     */
	    getParentWindow() {
	        this.wire.sendAction('window-get-parent-window', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return Promise.resolve(new application_1.Application(this.wire, this.identity)).then((app) => app.getWindow());
	    }
	    /**
	     * ***DEPRECATED - please use Window.capturePage.***
	     * Gets a base64 encoded PNG image of the window or just part a of it.
	     * @param area The area of the window to be captured.
	     * Omitting it will capture the whole visible window.
	     *
	     * @tutorial Window.capturePage
	     */
	    async getSnapshot(area) {
	        const req = { area, ...this.identity };
	        console.warn('Window.getSnapshot has been deprecated, please use Window.capturePage');
	        const res = await this.wire.sendAction('get-window-snapshot', req);
	        return res.payload.data;
	    }
	    /**
	     * Gets the current state ("minimized", "maximized", or "normal") of the window.
	     *
	     * @example
	     * ```js
	     * async function getWindowState() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.getState.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.getState();
	     * }
	     *
	     * getWindowState().then(winState => console.log(winState)).catch(err => console.log(err));
	     * ```
	     */
	    getState() {
	        return this.wire.sendAction('get-window-state', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Previously called getNativeWindow.
	     * Returns the [Window Object](https://developer.mozilla.org/en-US/docs/Web/API/Window)
	     * that represents the web context of the target window. This is the same object that
	     * you would get from calling [window.open()](https://developer.mozilla.org/en-US/docs/Web/API/Window/open) in a standard web context.
	     * The target window needs to be in the same application as the requesting window
	     * as well as comply with [same-origin](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy) policy requirements.
	     *
	     * @example
	     * Injecting content into an empty window:
	     *
	     * ```js
	     * (async ()=> {
	     *     try {
	     *         const winName = `child-window-${Date.now()}`;
	     *         const win = await fin.Window.create({
	     *             name: winName,
	     *             url: 'about:blank'
	     *         });
	     *         win.getWebWindow().document.write('<h1>Hello World</h1>');
	     *     } catch (err) {
	     *         console.error(err);
	     *     }
	     * })();
	     * ```
	     *
	     * Cloning DOM elements from the parent window (in this example we clone an `h3` element from the parent window):
	     * ```js
	     * (async ()=> {
	     *     try {
	     *         const currentWindow = await fin.Window.getCurrent();
	     *         const parentWindow = await currentWindow.getParentWindow();
	     *         const clonedH3 = parentWindow.getWebWindow().document.querySelector('h3').cloneNode(true);
	     *         document.body.append(clonedH3);
	     *
	     *     } catch (err) {
	     *         console.error(err);
	     *     }
	     * })();
	     * ```
	     *
	     * Rendering on a child window via a library (in this example we are using the [lit-html](https://lit-html.polymer-project.org/)
	     * template library to render content on a blank child window. You are not going to be able to copy paste this example without
	     * configuring the project correctly but this would demonstrate some templating options available):
	     * ```js
	     * (async ()=> {
	     *     try {
	     *         const win = await fin.Window.create({
	     *             name: `child-window-${Date.now()}`,
	     *             url: 'about:blank'
	     *         });
	     *         const template = html`
	     *             <div>
	     *                 <span>Click here: </span>
	     *                 <button @click=${()=> console.log('Hello World!')}>log to the console</button>
	     *             </div>`;
	     *         render(template, win.getWebWindow().document.body);
	     *
	     *     } catch (err) {
	     *         console.error(err);
	     *     }
	     * })();
	     * ```
	     */
	    getWebWindow() {
	        this.wire.sendAction('window-get-web-window', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this.wire.environment.getWebWindow(this.identity);
	    }
	    /**
	     * Determines if the window is a main window.
	     *
	     * @example
	     * ```js
	     * const wnd = fin.Window.getCurrentSync();
	     * const isMainWnd = wnd.isMainWindow();
	     * console.log('Is this a main window? ' + isMainWnd);
	     * ```
	     */
	    isMainWindow() {
	        this.wire.sendAction('window-is-main-window', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        return this.me.uuid === this.me.name;
	    }
	    /**
	     * Determines if the window is currently showing.
	     *
	     * @example
	     * ```js
	     * async function isWindowShowing() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.isShowing.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.isShowing();
	     * }
	     *
	     * isWindowShowing().then(bool => console.log(bool)).catch(err => console.log(err));
	     * ```
	     */
	    isShowing() {
	        return this.wire.sendAction('is-window-showing', this.identity).then(({ payload }) => payload.data);
	    }
	    /**
	     * Maximizes the window
	     *
	     * @example
	     * ```js
	     * async function maxWindow() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.maximize.html',
	     *         autoShow: true
	     *     });
	     *     const win = await app.getWindow();
	     *     return await win.maximize();
	     * }
	     *
	     * maxWindow().then(() => console.log('Maximized window')).catch(err => console.log(err));
	     * ```
	     */
	    maximize() {
	        return this.wire.sendAction('maximize-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Minimizes the window.
	     *
	     * @example
	     * ```js
	     * async function minWindow() {
	     *     const win = await fin.Window.getCurrent();
	     *     return await win.minimize();
	     * }
	     *
	     * minWindow().then(() => console.log('Minimized window')).catch(err => console.log(err));
	     * ```
	     */
	    minimize() {
	        return this.wire.sendAction('minimize-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Moves the window by a specified amount.
	     * @param deltaLeft The change in the left position of the window
	     * @param deltaTop The change in the top position of the window
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.moveBy.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function moveBy(left, top) {
	     *     const win = await createWin();
	     *     return await win.moveBy(left, top);
	     * }
	     *
	     * moveBy(580, 300).then(() => console.log('Moved')).catch(err => console.log(err));
	     * ```
	     */
	    moveBy(deltaLeft, deltaTop, positioningOptions) {
	        return this.wire
	            .sendAction('move-window-by', {
	            deltaLeft,
	            deltaTop,
	            positioningOptions,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Moves the window to a specified location.
	     * @param left The left position of the window
	     * @param top The top position of the window
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.moveTo.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function moveTo(left, top) {
	     *     const win = await createWin();
	     *     return await win.moveTo(left, top)
	     * }
	     *
	     * moveTo(580, 300).then(() => console.log('Moved')).catch(err => console.log(err))
	     * ```
	     */
	    moveTo(left, top, positioningOptions) {
	        return this.wire
	            .sendAction('move-window', {
	            left,
	            top,
	            positioningOptions,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Resizes the window by a specified amount.
	     * @param deltaWidth The change in the width of the window
	     * @param deltaHeight The change in the height of the window
	     * @param anchor Specifies a corner to remain fixed during the resize.
	     * Can take the values: "top-left", "top-right", "bottom-left", or "bottom-right".
	     * If undefined, the default is "top-left"
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.resizeBy.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function resizeBy(left, top, anchor) {
	     *     const win = await createWin();
	     *     return await win.resizeBy(left, top, anchor)
	     * }
	     *
	     * resizeBy(580, 300, 'top-right').then(() => console.log('Resized')).catch(err => console.log(err));
	     * ```
	     */
	    resizeBy(deltaWidth, deltaHeight, anchor, positioningOptions) {
	        return this.wire
	            .sendAction('resize-window-by', {
	            deltaWidth: Math.floor(deltaWidth),
	            deltaHeight: Math.floor(deltaHeight),
	            anchor,
	            positioningOptions,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Resizes the window to the specified dimensions.
	     * @param width The change in the width of the window
	     * @param height The change in the height of the window
	     * @param anchor Specifies a corner to remain fixed during the resize.
	     * Can take the values: "top-left", "top-right", "bottom-left", or "bottom-right".
	     * If undefined, the default is "top-left"
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.resizeTo.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function resizeTo(left, top, anchor) {
	     *     const win = await createWin();
	     *     return await win.resizeTo(left, top, anchor);
	     * }
	     *
	     * resizeTo(580, 300, 'top-left').then(() => console.log('Resized')).catch(err => console.log(err));
	     * ```
	     */
	    resizeTo(width, height, anchor, positioningOptions) {
	        return this.wire
	            .sendAction('resize-window', {
	            width: Math.floor(width),
	            height: Math.floor(height),
	            anchor,
	            positioningOptions,
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Restores the window to its normal state (i.e., unminimized, unmaximized).
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.restore.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function restore() {
	     *     const win = await createWin();
	     *     return await win.restore();
	     * }
	     *
	     * restore().then(() => console.log('Restored')).catch(err => console.log(err));
	     * ```
	     */
	    restore() {
	        return this.wire.sendAction('restore-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Will bring the window to the front of the entire stack and give it focus.
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.setAsForeground.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function setAsForeground() {
	     *     const win = await createWin();
	     *     return await win.setAsForeground()
	     * }
	     *
	     * setAsForeground().then(() => console.log('In the foreground')).catch(err => console.log(err));
	     * ```
	     */
	    setAsForeground() {
	        return this.wire.sendAction('set-foreground-window', this.identity).then(() => undefined);
	    }
	    /**
	     * Sets the window's size and position.
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.setBounds.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function setBounds(bounds) {
	     *     const win = await createWin();
	     *     return await win.setBounds(bounds);
	     * }
	     *
	     * setBounds({
	     *     height: 100,
	     *     width: 200,
	     *     top: 400,
	     *     left: 400
	     * }).then(() => console.log('Bounds set to window')).catch(err => console.log(err));
	     * ```
	     */
	    setBounds(bounds, positioningOptions) {
	        return this.wire
	            .sendAction('set-window-bounds', { ...bounds, ...this.identity, positioningOptions })
	            .then(() => undefined);
	    }
	    /**
	     * Shows the window if it is hidden.
	     * @param force Show will be prevented from showing when force is false and
	     *  ‘show-requested’ has been subscribed to for application’s main window.
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.show.html',
	     *         autoShow: false
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function show() {
	     *     const win = await createWin();
	     *     return await win.show()
	     * }
	     *
	     * show().then(() => console.log('Showing')).catch(err => console.log(err));
	     * ```
	     */
	    show(force = false) {
	        return this.wire.sendAction('show-window', { force, ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Shows the window if it is hidden at the specified location.
	     *
	     * @param left The left position of the window in pixels
	     * @param top The top position of the window in pixels
	     * @param force Show will be prevented from closing when force is false and
	     * ‘show-requested’ has been subscribed to for application’s main window
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.showAt.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     *
	     * async function showAt(left, top) {
	     *     const win = await createWin();
	     *     return await win.showAt(left, top)
	     * }
	     *
	     * showAt(580, 300).then(() => console.log('Showing at')).catch(err => console.log(err));
	     * ```
	     */
	    showAt(left, top, force = false) {
	        return this.wire
	            .sendAction('show-at-window', {
	            force,
	            left: Math.floor(left),
	            top: Math.floor(top),
	            ...this.identity
	        })
	            .then(() => undefined);
	    }
	    /**
	     * Shows the Chromium Developer Tools
	     *
	     * @tutorial Window.showDeveloperTools
	     */
	    /**
	     * Updates the window using the passed options.
	     *
	     * @remarks Values that are objects are deep-merged, overwriting only the values that are provided.
	     * @param options Changes a window's options that were defined upon creation. See tutorial
	     *
	     * @example
	     * ```js
	     * async function updateOptions() {
	     *     const win = await fin.Window.getCurrent();
	     *     return win.updateOptions({maxWidth: 100});
	     * }
	     * updateOptions().then(() => console.log('options is updated')).catch(err => console.error(err));
	     * ```
	     */
	    updateOptions(options) {
	        return this.wire.sendAction('update-window-options', { options, ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Provides credentials to authentication requests
	     * @param userName userName to provide to the authentication challenge
	     * @param password password to provide to the authentication challenge
	     *
	     * @example
	     * ```js
	     * fin.Application.wrap({uuid: 'OpenfinPOC'}).then(app => {
	     *     app.on('window-auth-requested', evt => {
	     *         let win = fin.Window.wrap({ uuid: evt.uuid, name: evt.name});
	     *         win.authenticate('userName', 'P@assw0rd').then(()=> console.log('authenticated')).catch(err => console.log(err));
	     *     });
	     * });
	     * ```
	     */
	    authenticate(userName, password) {
	        return this.wire
	            .sendAction('window-authenticate', { userName, password, ...this.identity })
	            .then(() => undefined);
	    }
	    /**
	     * Shows a menu on the window.
	     *
	     * @remarks Returns a promise that resolves when the user has either selected an item or closed the menu. (This may take longer than other apis).
	     * Resolves to an object with `{result: 'clicked', data }` where data is the data field on the menu item clicked, or `{result 'closed'}` when the user doesn't select anything.
	     * Calling this method will close previously opened menus.
	     * @experimental
	     * @param options
	     * @typeParam Data User-defined shape for data returned upon menu item click.  Should be a
	     * [union](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)
	     * of all possible data shapes for the entire menu, and the click handler should process
	     * these with a "reducer" pattern.
	     * @example
	     * This could be used to show a drop down menu over views in a platform window:
	     * ```js
	     * const template = [
	     *     {
	     *         label: 'Menu Item 1',
	     *         data: 'hello from item 1'
	     *     },
	     *     { type: 'separator' },
	     *     {
	     *         label: 'Menu Item 2',
	     *         type: 'checkbox',
	     *         checked: true,
	     *         data: 'The user clicked the checkbox'
	     *     },
	     *     {
	     *         label: 'see more',
	     *         enabled: false,
	     *         submenu: [
	     *             { label: 'submenu 1', data: 'hello from submenu' }
	     *         ]
	     *     }
	     * ]
	     * fin.me.showPopupMenu({ template }).then(r => {
	     *     if (r.result === 'closed') {
	     *         console.log('nothing happened');
	     *     } else {
	     *         console.log(r.data)
	     *     }
	     * })
	     * ```
	     *
	     * Overriding the built in context menu (note: that this can be done per element or document wide):
	     * ```js
	     * document.addEventListener('contextmenu', e => {
	     *     e.preventDefault();
	     *     const template = [
	     *         {
	     *             label: 'Menu Item 1',
	     *             data: 'hello from item 1'
	     *         },
	     *         { type: 'separator' },
	     *         {
	     *             label: 'Menu Item 2',
	     *             type: 'checkbox',
	     *             checked: true,
	     *             data: 'The user clicked the checkbox'
	     *         },
	     *         {
	     *             label: 'see more',
	     *             enabled: false,
	     *             submenu: [
	     *                 { label: 'submenu 1', data: 'hello from submenu' }
	     *             ]
	     *         }
	     *     ]
	     *     fin.me.showPopupMenu({ template, x: e.x, y: e.y }).then(r => {
	     *         if (r.result === 'closed') {
	     *             console.log('nothing happened');
	     *         } else {
	     *             console.log(r.data)
	     *         }
	     *     })
	     * })
	     * ```
	     */
	    async showPopupMenu(options) {
	        const { payload } = await this.wire.sendAction('show-popup-menu', { options, ...this.identity });
	        return payload.data;
	    }
	    /**
	     * Closes the window's popup menu, if one exists.
	     * @experimental
	     *
	     * @remarks Only one popup menu will ever be showing at a time. Calling `showPopupMenu` will automatically close
	     * any existing popup menu.
	     *
	     *
	     * @example
	     * This could be used to close a popup menu if the user's mouse leaves an element for example.
	     *
	     * ```js
	     * await fin.me.closePopupMenu();
	     * ```
	     */
	    async closePopupMenu() {
	        return this.wire.sendAction('close-popup-menu', { ...this.identity }).then(() => undefined);
	    }
	    /**
	     * Dispatch a result to the caller of `showPopupWindow`.
	     *
	     * @remarks If this window isn't currently being shown as a popup, this call will silently fail.
	     * @param data Serializable data to send to the caller window.
	     *
	     * @example
	     * ```js
	     * await fin.me.dispatchPopupResult({
	     *     foo: 'bar'
	     * });
	     * ```
	     */
	    async dispatchPopupResult(data) {
	        this.wire.sendAction('window-dispatch-popup-result', this.identity).catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        await this.wire.sendAction('dispatch-popup-result', { data, ...this.identity });
	    }
	    /**
	     * Prints the contents of the window.
	     *
	     * @param options Configuration for the print task.
	     * @remarks When `silent` is set to `true`, the API will pick the system's default printer if deviceName is empty
	     * and the default settings for printing.
	     *
	     * Use the CSS style `page-break-before: always;` to force print to a new page.
	     *
	     * @example
	     * ```js
	     * const win = fin.Window.getCurrentSync();
	     *
	     * win.print({ silent: false, deviceName: 'system-printer-name' }).then(() => {
	     *     console.log('print call has been sent to the system');
	     * });
	     * ```
	     *
	     * If a window has embedded views, those views will not print by default.  To print a window's contents including embedded views,
	     * use the `content` option:
	     *
	     * ```js
	     * const win = fin.Window.getCurrentSync();
	     *
	     * // Print embedded views
	     * win.print({ content: 'views' });
	     *
	     * // Print screenshot of current window
	     * win.print({ content: 'screenshot' })
	     * ```
	     *
	     * When `content` is set to `views`, the embedded views in the platform window will be concatenated and printed as
	     * individual pages.  If `includeSelf` is set to `true`, the platform window itself will be printed as the first
	     * page - be aware that this page will *not* include the embedded views - it will only include the contents of
	     * the platform window itself (e.g. tab stacks), with blank spaces where the view contents would be embedded.
	     *
	     * Due to a known issue, view contents that are not visible at the time `print` is called will not appear when
	     * printing `contents: views`.  This includes views that are obscured behind other active UI elements.
	     *
	     * To print the views embedded in their page context, set `content` to `screenshot`.
	     */
	    async print(options = { content: 'self' }) {
	        switch (options.content) {
	            case undefined:
	            case 'self':
	                return super.print(options);
	            case 'screenshot':
	                return this.wire.sendAction('print-screenshot', this.identity).then(() => undefined);
	            case 'views':
	                return this.wire.sendAction('print-views', { ...this.identity, options }).then(() => undefined);
	            default:
	                return undefined;
	        }
	    }
	}
	Instance$7._Window = _Window;
	return Instance$7;
}

var hasRequiredFactory;

function requireFactory () {
	if (hasRequiredFactory) return Factory$8;
	hasRequiredFactory = 1;
	Object.defineProperty(Factory$8, "__esModule", { value: true });
	Factory$8._WindowModule = void 0;
	const base_1 = base;
	const validate_1 = validate;
	const Instance_1 = requireInstance();
	/**
	 * Static namespace for OpenFin API methods that interact with the {@link _Window} class, available under `fin.Window`.
	 */
	class _WindowModule extends base_1.Base {
	    /**
	     * Asynchronously returns an API handle for the given Window identity.
	     *
	     * @remarks Wrapping a Window identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for a Window throughout its entire lifecycle.
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.wrap.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     * createWin().then(() => fin.Window.wrap({ uuid: 'app-1', name: 'myApp' }))
	     * .then(win => console.log('wrapped window'))
	     * .catch(err => console.log(err));
	     * ```
	     */
	    async wrap(identity) {
	        this.wire.sendAction('window-wrap').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new Instance_1._Window(this.wire, identity);
	    }
	    /**
	     * Synchronously returns an API handle for the given Window identity.
	     *
	     * @remarks Wrapping a Window identity that does not yet exist will *not* throw an error, and instead
	     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
	     * for a Window throughout its entire lifecycle.
	     *
	     * @example
	     * ```js
	     * async function createWin() {
	     *     const app = await fin.Application.start({
	     *         name: 'myApp',
	     *         uuid: 'app-1',
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.wrapSync.html',
	     *         autoShow: true
	     *     });
	     *     return await app.getWindow();
	     * }
	     * await createWin();
	     * let win = fin.Window.wrapSync({ uuid: 'app-1', name: 'myApp' });
	     * ```
	     */
	    wrapSync(identity) {
	        this.wire.sendAction('window-wrap-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const errorMsg = (0, validate_1.validateIdentity)(identity);
	        if (errorMsg) {
	            throw new Error(errorMsg);
	        }
	        return new Instance_1._Window(this.wire, identity);
	    }
	    /**
	     * Creates a new Window.
	     * @param options - Window creation options
	     *
	     * @example
	     * ```js
	     * async function createWindow() {
	     *     const winOption = {
	     *         name:'child',
	     *         defaultWidth: 300,
	     *         defaultHeight: 300,
	     *         url: 'https://cdn.openfin.co/docs/javascript/stable/tutorial-Window.create.html',
	     *         frame: true,
	     *         autoShow: true
	     *     };
	     *     return await fin.Window.create(winOption);
	     * }
	     *
	     * createWindow().then(() => console.log('Window is created')).catch(err => console.log(err));
	     * ```
	     */
	    create(options) {
	        this.wire.sendAction('create-window').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        const win = new Instance_1._Window(this.wire, { uuid: this.me.uuid, name: options.name });
	        return win.createWindow(options);
	    }
	    /**
	     * Asynchronously returns a Window object that represents the current window
	     *
	     * @example
	     * ```js
	     * fin.Window.getCurrent()
	     * .then(wnd => console.log('current window'))
	     * .catch(err => console.log(err));
	     *
	     * ```
	     */
	    getCurrent() {
	        this.wire.sendAction('get-current-window').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        if (!this.wire.me.isWindow) {
	            throw new Error('You are not in a Window context');
	        }
	        const { uuid, name } = this.wire.me;
	        return this.wrap({ uuid, name });
	    }
	    /**
	     * Synchronously returns a Window object that represents the current window
	     *
	     * @example
	     * ```js
	     * const wnd = fin.Window.getCurrentSync();
	     * const info = await wnd.getInfo();
	     * console.log(info);
	     *
	     * ```
	     */
	    getCurrentSync() {
	        this.wire.sendAction('get-current-window-sync').catch((e) => {
	            // we do not want to expose this error, just continue if this analytics-only call fails
	        });
	        if (!this.wire.me.isWindow) {
	            throw new Error('You are not in a Window context');
	        }
	        const { uuid, name } = this.wire.me;
	        return this.wrapSync({ uuid, name });
	    }
	}
	Factory$8._WindowModule = _WindowModule;
	return Factory$8;
}

var hasRequiredWindow;

function requireWindow () {
	if (hasRequiredWindow) return window$1;
	hasRequiredWindow = 1;
	(function (exports) {
		var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
		    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
		};
		Object.defineProperty(exports, "__esModule", { value: true });
		/**
		 * Entry points for the OpenFin `Window` API (`fin.Window`).
		 *
		 * * {@link _WindowModule} contains static members of the `Window` API, accessible through `fin.Window`.
		 * * {@link _Window} describes an instance of an OpenFin Window, e.g. as returned by `fin.Window.getCurrent`.
		 *
		 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
		 * both of these were documented on the same page.
		 *
		 * Underscore prefixing of OpenFin types that alias DOM entities will be fixed in a future version.
		 *
		 * @packageDocumentation
		 */
		__exportStar(requireFactory(), exports);
		__exportStar(requireInstance(), exports); 
	} (window$1));
	return window$1;
}

/**
 * Entry point for the OpenFin `System` API (`fin.System`).
 *
 * * {@link System} contains static members of the `System` API (available under `fin.System`)
 *
 * @packageDocumentation
 */
Object.defineProperty(system, "__esModule", { value: true });
system.System = void 0;
const base_1$l = base;
const transport_errors_1$5 = transportErrors;
const window_1 = requireWindow();
const events_1$6 = require$$0;
/**
 * An object representing the core of OpenFin Runtime. Allows the developer
 * to perform system-level actions, such as accessing logs, viewing processes,
 * clearing the cache and exiting the runtime as well as listen to {@link OpenFin.SystemEvents system events}.
 *
 */
class System extends base_1$l.EmitterBase {
    /**
     * @internal
     */
    constructor(wire) {
        super(wire, 'system');
    }
    sendExternalProcessRequest(action, options) {
        return new Promise((resolve, reject) => {
            const exitEventKey = 'external-process-exited';
            let processUuid;
            let exitPayload;
            let externalProcessExitHandler;
            let ofWindow;
            if (typeof options.listener === 'function') {
                externalProcessExitHandler = (payload) => {
                    const data = payload || {};
                    exitPayload = {
                        topic: 'exited',
                        uuid: data.processUuid || '',
                        exitCode: data.exitCode || 0
                    };
                    if (processUuid === payload.processUuid) {
                        options.listener(exitPayload);
                        ofWindow.removeListener(exitEventKey, externalProcessExitHandler);
                    }
                };
                // window constructor expects the name is not undefined
                if (!this.wire.me.name) {
                    this.wire.me.name = this.wire.me.uuid;
                }
                ofWindow = new window_1._Window(this.wire, this.wire.me);
                ofWindow.on(exitEventKey, externalProcessExitHandler);
            }
            this.wire
                .sendAction(action, options)
                .then(({ payload }) => {
                processUuid = payload.data.uuid;
                resolve(payload.data);
                if (exitPayload && processUuid === exitPayload.uuid) {
                    options.listener(exitPayload);
                    ofWindow.removeListener(exitEventKey, externalProcessExitHandler);
                }
            })
                .catch((err) => {
                if (ofWindow) {
                    ofWindow.removeListener(exitEventKey, externalProcessExitHandler);
                }
                reject(err);
            });
        });
    }
    /**
     * Returns the version of the runtime. The version contains the major, minor,
     * build and revision numbers.
     *
     * @example
     * ```js
     * fin.System.getVersion().then(v => console.log(v)).catch(err => console.log(err));
     * ```
     */
    getVersion() {
        return this.wire.sendAction('get-version').then(({ payload }) => payload.data);
    }
    /**
     * Clears cached data containing application resource
     * files (images, HTML, JavaScript files), cookies, and items stored in the
     * Local Storage.
     * @param options - See below for details.
     *
     * @remarks For more information on the accepted options, see the following pages:
     * * cache: browsing data cache for html files and images ([caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching))
     * * cookies: browser [cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
     * * localStorage: browser data that can be used across sessions ([local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage))
     * * appcache: html5 [application cache](https://developer.mozilla.org/en-US/docs/Web/HTML/Using_the_application_cache)
     * @example
     * ```js
     * const clearCacheOptions = {
     *     appcache: true,
     *     cache: true,
     *     cookies: true,
     *     localStorage: true
     * };
     * fin.System.clearCache(clearCacheOptions).then(() => console.log('Cache cleared')).catch(err => console.log(err));
     * ```
     *
     */
    clearCache(options) {
        return this.wire.sendAction('clear-cache', options).then(() => undefined);
    }
    /**
     * Clears all cached data when OpenFin Runtime exits.
     *
     * @example
     * ```js
     * fin.System.deleteCacheOnExit().then(() => console.log('Deleted Cache')).catch(err => console.log(err));
     * ```
     */
    deleteCacheOnExit() {
        return this.wire.sendAction('delete-cache-request').then(() => undefined);
    }
    /**
     * Exits the Runtime.
     *
     * @example
     * ```js
     * fin.System.exit().then(() => console.log('exit')).catch(err => console.log(err));
     * ```
     */
    exit() {
        return this.wire.sendAction('exit-desktop').then(() => undefined);
    }
    /**
     * Fetches a JSON manifest using the browser process and returns a Javascript object.
     * @param manifestUrl The URL of the manifest to fetch.
     *
     * @example
     * ```js
     * const manifest = await fin.System.fetchManifest('https://www.path-to-manifest.com');
     * console.log(manifest);
     * ```
     */
    async fetchManifest(manifestUrl) {
        const { payload: { data } } = await this.wire.sendAction('fetch-manifest', { manifestUrl });
        return data;
    }
    /**
     * Writes any unwritten cookies data to disk.
     *
     * @example
     * ```js
     * fin.System.flushCookieStore()
     *     .then(() => console.log('success'))
     *     .catch(err => console.error(err));
     * ```
     */
    flushCookieStore() {
        return this.wire.sendAction('flush-cookie-store').then(() => undefined);
    }
    /**
     * Retrieves an array of data (name, ids, bounds) for all application windows.
     *
     * @example
     * ```js
     * fin.System.getAllWindows().then(wins => console.log(wins)).catch(err => console.log(err));
     * ```
     */
    getAllWindows() {
        return this.wire.sendAction('get-all-windows').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an array of data for all applications.
     *
     * @example
     * ```js
     * fin.System.getAllApplications().then(apps => console.log(apps)).catch(err => console.log(err));
     * ```
     */
    getAllApplications() {
        return this.wire.sendAction('get-all-applications').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves the command line argument string that started OpenFin Runtime.
     *
     * @example
     * ```js
     * fin.System.getCommandLineArguments().then(args => console.log(args)).catch(err => console.log(err));
     * ```
     */
    getCommandLineArguments() {
        return this.wire.sendAction('get-command-line-arguments').then(({ payload }) => payload.data);
    }
    /**
     * Get the current state of the crash reporter.
     *
     * @example
     * ```js
     * fin.System.getCrashReporterState().then(state => console.log(state)).catch(err => console.log(err));
     * ```
     */
    async getCrashReporterState() {
        const { payload: { data: { diagnosticMode, isRunning } } } = await this.wire.sendAction('get-crash-reporter-state');
        console.warn('diagnosticMode property is deprecated. It will be removed in a future version');
        return {
            // diagnosticMode will be removed in a future version
            diagnosticMode,
            diagnosticsMode: diagnosticMode,
            isRunning
        };
    }
    /**
     * Start the crash reporter if not already running.
     * @param options - configure crash reporter
     *
     * @remarks You can optionally specify `diagnosticsMode` to have the logs sent to
     * OpenFin on runtime close. (NOTE: `diagnosticsMode` will turn on verbose logging and disable the sandbox
     * for newly launched renderer processes. See https://developers.openfin.co/of-docs/docs/debugging#diagnostics-mode for
     * more details.)
     *
     * @example
     * ```js
     * fin.System.startCrashReporter({diagnosticsMode: true}).then(reporter => console.log(reporter)).catch(err => console.log(err));
     * ```
     */
    async startCrashReporter(options) {
        const opts = options;
        const newOpts = { ...opts, diagnosticMode: opts.diagnosticsMode || opts.diagnosticMode };
        const { payload: { data: { diagnosticMode, isRunning } } } = await this.wire.sendAction('start-crash-reporter', newOpts);
        return {
            // diagnosticMode will be removed in a future version
            diagnosticMode,
            diagnosticsMode: diagnosticMode,
            isRunning
        };
    }
    /**
     * Returns a hex encoded hash of the machine id and the currently logged in user name.
     * This is the recommended way to uniquely identify a user / machine combination.
     *
     * @remarks For Windows systems this is a sha256 hash of the machine ID set in the registry key:
     * `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Cryptography\MachineGuid` and `USERNAME`.
     *
     * For OSX systems, a native-level call is used to get the machine ID.
     *
     * @example
     * ```js
     * fin.System.getUniqueUserId().then(id => console.log(id)).catch(err => console.log(err));
     * ```
     */
    getUniqueUserId() {
        return this.wire.sendAction('get-unique-user-id').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves a frame info object for the uuid and name passed in
     * @param uuid - The UUID of the target.
     * @param name - The name of the target.
     *
     * @remarks The possible types are 'window', 'iframe', 'external connection' or 'unknown'.
     * @example
     * ```js
     * const entityUuid = 'OpenfinPOC';
     * const entityName = '40c74b5d-ed98-40f7-853f-e3d3c2699175';
     * fin.System.getEntityInfo(entityUuid, entityName).then(info => console.log(info)).catch(err => console.log(err));
     *
     * // example info shape
     * {
     *     "uuid": "OpenfinPOC",
     *     "name": "40c74b5d-ed98-40f7-853f-e3d3c2699175",
     *     "parent": {
     *         "uuid": "OpenfinPOC",
     *         "name": "OpenfinPOC"
     *     },
     *     "entityType": "iframe"
     * }
     * ```
     */
    getEntityInfo(uuid, name) {
        return this.wire.sendAction('get-entity-info', { uuid, name }).then(({ payload }) => payload.data);
    }
    /**
     * Gets the value of a given environment variable on the computer on which the runtime is installed
     *
     * @example
     * ```js
     * fin.System.getEnvironmentVariable('HOME').then(env => console.log(env)).catch(err => console.log(err));
     * ```
     */
    getEnvironmentVariable(envName) {
        return this.wire
            .sendAction('get-environment-variable', {
            environmentVariables: envName
        })
            .then(({ payload }) => payload.data);
    }
    /**
     * Get currently focused Window.
     * If a View currently has focus, returns the identity of View's parent Window.
     * Use {@link Window._Window#getFocusedContent Window.getFocusedContent} to directly access currently focused Window or View.
     *
     * @example
     * ```js
     * fin.System.getFocusedWindow().then(winInfo => console.log(winInfo)).catch(err => console.log(err));
     * ```
     */
    getFocusedWindow() {
        return this.wire.sendAction('get-focused-window').then(({ payload }) => payload.data);
    }
    /**
     * Get currently focused content. Returns identity of entity with `entityType`.
     *
     * @example
     * ```js
     * fin.System.getFocusedContent().then(contentIdentity => console.log(contentIdentity)).catch(err => console.log(err));
     * ```
     */
    getFocusedContent() {
        return this.wire.sendAction('get-focused-content').then(({ payload }) => payload.data);
    }
    /**
     * Returns information about the given app's certification status
     *
     * @example
     * ```js
     * const manifestUrl = "http://localhost:1234/app.json"
     * try {
     *     const certificationInfo = await fin.System.isAppCertified(manifestUrl);
     * } catch(err) {
     *     console.error(err)
     * }
     * ```
     */
    async isAppCertified(manifestUrl) {
        const { payload: { data: { certifiedInfo } } } = await this.wire.sendAction('is-app-certified', { manifestUrl });
        return certifiedInfo;
    }
    /**
     * Returns an array of all the installed runtime versions in an object.
     *
     * @example
     * ```js
     * fin.System.getInstalledRuntimes().then(runtimes => console.log(runtimes)).catch(err => console.log(err));
     * ```
     */
    // incompatible with standalone node process.
    getInstalledRuntimes() {
        return this.wire.sendAction('get-installed-runtimes').then(({ payload }) => payload.data.runtimes);
    }
    // incompatible with standalone node process.
    async getInstalledApps() {
        const { payload: { data: { installedApps } } } = await this.wire.sendAction('get-installed-apps');
        return installedApps;
    }
    /**
     * Retrieves the contents of the log with the specified filename.
     * @param options A object that id defined by the GetLogRequestType interface
     *
     * @example
     * ```js
     * async function getLog() {
     *     const logs = await fin.System.getLogList();
     *     return await fin.System.getLog(logs[0]);
     * }
     *
     * getLog().then(log => console.log(log)).catch(err => console.log(err));
     * ```
     */
    getLog(options) {
        return this.wire.sendAction('view-log', options).then(({ payload }) => payload.data);
    }
    /**
     * Returns a unique identifier (UUID) provided by the machine.
     *
     * @example
     * ```js
     * fin.System.getMachineId().then(id => console.log(id)).catch(err => console.log(err));
     * ```
     */
    getMachineId() {
        return this.wire.sendAction('get-machine-id').then(({ payload }) => payload.data);
    }
    /**
     * Returns the minimum (inclusive) logging level that is currently being written to the log.
     *
     * @example
     * ```js
     * fin.System.getMinLogLevel().then(level => console.log(level)).catch(err => console.log(err));
     * ```
     */
    getMinLogLevel() {
        return this.wire.sendAction('get-min-log-level').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an array containing information for each log file.
     *
     * @example
     * ```js
     * fin.System.getLogList().then(logList => console.log(logList)).catch(err => console.log(err));
     * ```
     */
    getLogList() {
        return this.wire.sendAction('list-logs').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an object that contains data about the monitor setup of the
     * computer that the runtime is running on.
     *
     * @example
     * ```js
     * fin.System.getMonitorInfo().then(monitorInfo => console.log(monitorInfo)).catch(err => console.log(err));
     * ```
     */
    getMonitorInfo() {
        return this.wire.sendAction('get-monitor-info').then(({ payload }) => payload.data);
    }
    /**
     * Returns the mouse in virtual screen coordinates (left, top).
     *
     * @example
     * ```js
     * fin.System.getMousePosition().then(mousePosition => console.log(mousePosition)).catch(err => console.log(err));
     * ```
     */
    getMousePosition() {
        return this.wire.sendAction('get-mouse-position').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an array of all of the runtime processes that are currently
     * running. Each element in the array is an object containing the uuid
     * and the name of the application to which the process belongs.
     * @deprecated Please use our new set of process APIs:
     * {@link Window._Window#getProcessInfo Window.getProcessInfo}
     * {@link View.View#getProcessInfo View.getProcessInfo}
     * {@link Application.Application#getProcessInfo Application.getProcessInfo}
     * {@link System#getAllProcessInfo System.getAllProcessInfo}
     *
     * @example
     * ```js
     * fin.System.getProcessList().then(ProcessList => console.log(ProcessList)).catch(err => console.log(err));
     * ```
     */
    getProcessList() {
        // eslint-disable-next-line no-console
        console.warn('System.getProcessList has been deprecated. Please consider using our new process APIs: Window.getProcessInfo, View.getProcessInfo, Application.getProcessInfo, System.getAllProcessInfo');
        return this.wire.sendAction('process-snapshot').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves all process information.
     *
     * @remarks This includes the browser process and every process associated to all entities (windows and views).
     *
     * @example
     * ```js
     * const allProcessInfo = await fin.System.getAllProcessInfo();
     * ```
     * @experimental
     */
    async getAllProcessInfo() {
        const { payload: { data } } = await this.wire.sendAction('get-all-process-info', this.identity);
        return data;
    }
    /**
     * Retrieves the Proxy settings.
     *
     * @example
     * ```js
     * fin.System.getProxySettings().then(ProxySetting => console.log(ProxySetting)).catch(err => console.log(err));
     *
     * //This response has the following shape:
     * {
     *     config: {
     *         proxyAddress: "proxyAddress", //the configured Proxy Address
     *         proxyPort: 0, //the configured Proxy port
     *         type: "system" //Proxy Type
     *     },
     *     system: {
     *         autoConfigUrl: "",
     *         bypass: "",
     *         enabled: false,
     *         proxy: ""
     *     }
     * }
     * ```
     */
    getProxySettings() {
        return this.wire.sendAction('get-proxy-settings').then(({ payload }) => payload.data);
    }
    /**
     * Returns information about the running Runtime in an object.
     *
     * @example
     * ```js
     * fin.System.getRuntimeInfo().then(RuntimeInfo => console.log(RuntimeInfo)).catch(err => console.log(err));
     * ```
     */
    getRuntimeInfo() {
        return this.wire.sendAction('get-runtime-info').then(({ payload }) => payload.data);
    }
    /**
     * Returns information about the running RVM in an object.
     *
     * @example
     * ```js
     * fin.System.getRvmInfo().then(RvmInfo => console.log(RvmInfo)).catch(err => console.log(err));
     * ```
     */
    // incompatible with standalone node process.
    getRvmInfo() {
        return this.wire.sendAction('get-rvm-info').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves general system information. If you need more detailed information about the
     * OS and the currently logged in user, use `fin.System.getOSInfo()` instead.
     *
     * @example
     * ```js
     * fin.System.getHostSpecs().then(specs => console.log(specs)).catch(err => console.log(err));
     * ```
     */
    getHostSpecs() {
        return this.wire.sendAction('get-host-specs').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves information about the OS and the currently logged in user.
     *
     * @example
     * ```js
     * fin.System.getOSInfo().then(specs => console.log(specs)).catch(err => console.log(err));
     * ```
     */
    getOSInfo() {
        return this.wire.sendAction('get-os-info').then(({ payload }) => payload.data);
    }
    /**
     * Runs an executable or batch file. A path to the file must be included in options.
     * <br> A uuid may be optionally provided. If not provided, OpenFin will create a uuid for the new process.
     * <br> Note: This method is restricted by default and must be enabled via
     * <a href="https://developers.openfin.co/docs/api-security">API security settings</a>. Also, this api has an enhanced permission set to make it less dangerous. So application owners can only allow to launch the assets owned by the application, the enabled downloaded files or the restricted executables.
     * @param options A object that is defined in the ExternalProcessRequestType interface
     *
     * @remarks If an unused UUID is provided in options, it will be used. If no UUID is provided, OpenFin will assign one.
     * This api has an enhanced permission set to make it less dangerous. So application owners can only allow to launch the
     * assets owned by the application, the enabled downloaded files or the restricted executables.
     *
     * **Note:** Since _appAssets_ relies on the RVM, which is missing on MAC_OS, 'alias' is not available. Instead provide
     * the full path e.g. _/Applications/Calculator.app/Contents/MacOS/Calculator_.
     *
     * @example
     * Basic Example:
     * ```js
     * fin.System.launchExternalProcess({
     *     path: 'notepad',
     *     arguments: '',
     *     listener: function (result) {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Promise resolution:
     *
     * ```js
     * //This response has the following shape:
     * {
     *     uuid: "FB3E6E36-0976-4C2B-9A09-FB2E54D2F1BB" // The mapped UUID which identifies the launched process
     * }
     * ```
     *
     * Listener callback:
     * ```js
     * //This response has the following shape:
     * {
     *     topic: "exited", // Or "released" on a call to releaseExternalProcess
     *     uuid: "FB3E6E36-0976-4C2B-9A09-FB2E54D2F1BB", // The mapped UUID which identifies the launched process
     *     exitCode: 0 // Process exit code
     * }
     * ```
     *
     * By specifying a lifetime, an external process can live as long the window/application that launched it or
     * persist after the application exits. The default value is null, which is equivalent to 'persist', meaning
     * the process lives on after the application exits:
     *
     * ```js
     * fin.System.launchExternalProcess({
     *     path: 'notepad',
     *     arguments: '',
     *     listener: (result) => {
     *         console.log('the exit code', result.exitCode);
     *     },
     *     lifetime: 'window'
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Note: A process that exits when the window/application exits cannot be released via fin.desktop.System.releaseExternalProcess.
     *
     * By specifying a cwd, it will set current working directory when launching an external process:
     *
     * ```js
     * fin.System.launchExternalProcess({
     *     path: 'cmd.exe',
     *     cwd: 'c:\\temp',
     *     arguments: '',
     *     listener: (result) => {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Example using an alias from app.json appAssets property:
     *
     * ```json
     * "appAssets": [
     *     {
     *         "src": "exe.zip",
     *         "alias": "myApp",
     *         "version": "4.12.8",
     *         "target": "myApp.exe",
     *         "args": "a b c d"
     *     },
     * ]
     * ```
     *
     * ```js
     * //  When called, if no arguments are passed then the arguments (if any)
     * //  are taken from the 'app.json' file, from the  'args' parameter
     * //  of the 'appAssets' Object with the relevant 'alias'.
     * fin.System.launchExternalProcess({
     *     //Additionally note that the executable found in the zip file specified in appAssets
     *     //will default to the one mentioned by appAssets.target
     *     //If the the path below refers to a specific path it will override this default
     *     alias: 'myApp',
     *     listener: (result) => {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * Example using an alias but overriding the arguments:
     *
     * ```json
     * "appAssets": [
     *     {
     *         "src": "exe.zip",
     *         "alias": "myApp",
     *         "version": "4.12.8",
     *         "target": "myApp.exe",
     *         "args": "a b c d"
     *     },
     * ]
     * ```
     *
     * ```js
     * //  If 'arguments' is passed as a parameter it takes precedence
     * //  over any 'args' set in the 'app.json'.
     * fin.System.launchExternalProcess({
     *     alias: 'myApp',
     *     arguments: 'e f g',
     *     listener: (result) => {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * It is now possible to optionally perform any combination of the following certificate checks
     * against an absolute target via `fin.desktop.System.launchExternalProcess()`:
     *
     * ```js
     * "certificate": {
     *     "serial": "3c a5 ...",                        // A hex string with or without spaces
     *     "subject": "O=OpenFin INC., L=New York, ...", // An internally tokenized and comma delimited string allowing partial or full checks of the subject fields
     *     "publickey": "3c a5 ...",                     // A hex string with or without spaces
     *     "thumbprint": "3c a5 ...",                    // A hex string with or without spaces
     *     "trusted": true                               // A boolean indicating that the certificate is trusted and not revoked
     * }
     * ```
     *
     * Providing this information as part of the default configurations for assets in an application's manifest
     * will be added in a future RVM update:
     *
     * ```js
     * fin.System.launchExternalProcess({
     *     path: 'C:\\Users\\ExampleUser\\AppData\\Local\\OpenFin\\OpenFinRVM.exe',
     *     arguments: '--version',
     *     certificate: {
     *         trusted: true,
     *         subject: 'O=OpenFin INC., L=New York, S=NY, C=US',
     *         thumbprint: '‎3c a5 28 19 83 05 fe 69 88 e6 8f 4b 3a af c5 c5 1b 07 80 5b'
     *     },
     *     listener: (result) => {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => {
     *     console.log(processIdentity);
     * }).catch(error => {
     *     console.log(error);
     * });
     * ```
     *
     * It is possible to launch files that have been downloaded by the user by listening to the window
     * `file-download-completed` event and using the `fileUuid` provided by the event:
     *
     * ```js
     * const win = fin.Window.getCurrentSync();
     * win.addListener('file-download-completed', (evt) => {
     *     if (evt.state === 'completed') {
     *         fin.System.launchExternalProcess({
     *             fileUuid: evt.fileUuid,
     *             arguments: '',
     *             listener: (result) => {
     *                 console.log('the exit code', result.exitCode);
     *             }
     *         }).then(processIdentity => {
     *             console.log(processIdentity);
     *         }).catch(error => {
     *             console.log(error);
     *         });
     *     }
     * });
     * ```
     *
     * Launching assets specified in the app manifest:
     *
     * Sample appAssets section in app.json
     * ```js
     *     "appAssets": [
     *         {
     *             "src": "http://filesamples.com/exe.zip",
     *             "alias": "myApp",
     *             "version": "4.12.8",
     *             "target": "myApp.exe",
     *             "args": "a b c d"
     *         },
     *         {
     *             "src": "http://examples.com/exe.zip",
     *             "alias": "myApp2",
     *             "version": "5.12.8",
     *             "target": "myApp2.exe",
     *             "args": "a b c"
     *         }
     *     ]
     * ```
     *
     * This permission allows for launching of all assets specified in the above appAssets section. ("myApp" and "myApp2"):
     *
     * ```js
     *     "permissions": {
     *        "System": {
     *            "launchExternalProcess": {
     *                 "enabled": true,
     *                 "assets": {
     *                     "enabled": true
     *                 }
     *             }
     *        }
     *     }
     * ```
     *
     * This permission allows for launching of _only_ the "myApp" asset in the above appAssets section, as defined in `srcRules`:
     * ```js
     *     "permissions": {
     *        "System": {
     *            "launchExternalProcess": {
     *                 "enabled": true,
     *                 "assets": {
     *                     "enabled": true
     *                     "srcRules": [
     *                         {
     *                             "match": [
     *                                 "*://filesamples.com/*"
     *                             ],
     *                             "behavior": "allow"
     *                         },
     *                         {
     *                             "match": [
     *                                 "<all_urls>"
     *                             ],
     *                             "behavior": "block"
     *                         }
     *                     ]
     *                 }
     *             }
     *        }
     *     }
     * ```
     *
     * Launching downloaded files:
     * ```js
     *     "permissions": {
     *        "System": {
     *            "launchExternalProcess": {
     *                 "enabled": true,
     *                 "downloads": {
     *                     "enabled": true
     *                 }
     *             }
     *        }
     *     }
     * ```
     *
     * This permission allows to launch all the executables:
     * ```js
     *     "permissions": {
     *        "System": {
     *            "launchExternalProcess": {
     *                 "enabled": true,
     *                 "executables": {
     *                     "enabled": true
     *                 }
     *             }
     *        }
     *     }
     * ```
     *
     *
     * This permission only allows launching of executables whose file paths match the corresponding `pathRules`:
     * ```js
     *     "permissions": {
     *        "System": {
     *            "launchExternalProcess": {
     *                 "enabled": true,
     *                 "executables": {
     *                     "enabled": true
     *                     "pathRules": [
     *                         {
     *                             "match": [
     *                                 "/Windows/System32/*.exe"
     *                             ],
     *                             "behavior": "allow"
     *                         },
     *                         {
     *                             "match": [
     *                                 "*.exe"
     *                             ],
     *                             "behavior": "block"
     *                         }
     *                     ]
     *                 }
     *             }
     *        }
     *     }
     * ```
     */
    launchExternalProcess(options) {
        return this.sendExternalProcessRequest('launch-external-process', options);
    }
    /**
     * Monitors a running process. A pid for the process must be included in options.
     * <br> A uuid may be optionally provided. If not provided, OpenFin will create a uuid for the new process.
     *
     * @remarks If an unused uuid is provided in options, it will be used. If no uuid is provided, OpefinFin will assign a uuid.
     * @example
     * ```js
     * fin.System.monitorExternalProcess({
     *     pid: 10208,
     *     uuid: 'my-external-process', // optional
     *     listener: function (result) {
     *         console.log('the exit code', result.exitCode);
     *     }
     * }).then(processIdentity => console.log(processIdentity)).catch(err => console.log(err));
     * ```
     */
    monitorExternalProcess(options) {
        return this.sendExternalProcessRequest('monitor-external-process', options);
    }
    /**
     * Writes the passed message into both the log file and the console.
     * @param level The log level for the entry. Can be either "info", "warning" or "error"
     * @param message The log message text
     *
     * @example
     * ```js
     * fin.System.log("info", "An example log message").then(() => console.log('Log info message')).catch(err => console.log(err));
     * ```
     */
    log(level, message) {
        return this.wire.sendAction('write-to-log', { level, message }).then(() => undefined);
    }
    /**
     * Opens the passed URL in the default web browser.
     *
     * @remarks It only supports http(s) and fin(s) protocols by default.
     * In order to use other custom protocols, they have to be enabled via
     * [API security settings](https://developers.openfin.co/docs/api-security).
     * File protocol and file path are not supported.
     * @param url The URL to open
     *
     * @example
     * ```js
     * fin.System.openUrlWithBrowser('https://cdn.openfin.co/docs/javascript/stable/tutorial-System.openUrlWithBrowser.html')
     * .then(() => console.log('Opened URL'))
     * .catch(err => console.log(err));
     * ```
     *
     * Example of permission definition to enable non-default protocols:
     *
     * Note: permission definition should be specified in an app manifest file if there is no DOS settings.
     * Otherwise it has to be specified in both DOS and app manifest files.
     *
     * ```js
     *     "permissions": {
     *        "System": {
     *            "openUrlWithBrowser": {
     *                 "enabled": true,
     *                 "protocols": [ "msteams", "slack"]
     *             }
     *        }
     *     }
     * ```
     */
    openUrlWithBrowser(url) {
        return this.wire.sendAction('open-url-with-browser', { url }).then(() => undefined);
    }
    /**
     * Creates a new registry entry under the HKCU root Windows registry key if the given custom protocol name doesn't exist or
     * overwrites the existing registry entry if the given custom protocol name already exists.
     *
     * Note: This method is restricted by default and must be enabled via
     * {@link https://developers.openfin.co/docs/api-security API security settings}. It requires RVM 12 or higher version.
     *
     *
     * @remarks These protocols are reserved and cannot be registered:
     * - fin
     * - fins
     * - openfin
     * - URI Schemes registered with {@link https://en.wikipedia.org/wiki/List_of_URI_schemes#Official_IANA-registered_schemes IANA}
     *
     * @throws if a given custom protocol failed to be registered.
     * @throws if a manifest URL contains the '%1' string.
     * @throws if a manifest URL contains a query string parameter which name equals to the Protocol Launch Request Parameter Name.
     * @throws if the full length of the command string that is to be written to the registry exceeds 2048 bytes.
     *
     * @example
     * ```js
     * fin.System.registerCustomProtocol({protocolName:'protocol1'}).then(console.log).catch(console.error);
     * ```
     */
    async registerCustomProtocol(options) {
        if (typeof options !== 'object') {
            throw new Error('Must provide an object with a `protocolName` property having a string value.');
        }
        await this.wire.sendAction('register-custom-protocol', options);
    }
    /**
     * Removes the registry entry for a given custom protocol.
     *
     * Note: This method is restricted by default and must be enabled via
     * {@link https://developers.openfin.co/docs/api-security API security settings}. It requires RVM 12 or higher version.
     *
     *
     * @remarks These protocols are reserved and cannot be unregistered:
     * - fin
     * - fins
     * - openfin
     * - URI Schemes registered with {@link https://en.wikipedia.org/wiki/List_of_URI_schemes#Official_IANA-registered_schemes IANA}
     *
     * @throws if a protocol entry failed to be removed in registry.
     *
     * @example
     * ```js
     * await fin.System.unregisterCustomProtocol('protocol1');
     * ```
     */
    async unregisterCustomProtocol(protocolName) {
        await this.wire.sendAction('unregister-custom-protocol', { protocolName });
    }
    /**
     * Retrieves the registration state for a given custom protocol.
     *
     * Note: This method is restricted by default and must be enabled via
     * {@link https://developers.openfin.co/docs/api-security API security settings}. It requires RVM 12 or higher version.
     *
     * @remarks These protocols are reserved and cannot get states for them:
     * - fin
     * - fins
     * - openfin
     * - URI Schemes registered with {@link https://en.wikipedia.org/wiki/List_of_URI_schemes#Official_IANA-registered_schemes IANA}
     *
     *
     * @example
     * ```js
     * const protocolState = await fin.System.getCustomProtocolState('protocol1');
     */
    async getCustomProtocolState(protocolName) {
        return this.wire.sendAction('get-custom-protocol-state', { protocolName }).then(({ payload }) => payload.data);
    }
    /**
     * Removes the process entry for the passed UUID obtained from a prior call
     * of fin.System.launchExternalProcess().
     * @param uuid The UUID for a process obtained from a prior call to fin.desktop.System.launchExternalProcess()
     *
     * @example
     * ```js
     * fin.System.launchExternalProcess({
     *     path: "notepad",
     *     listener: function (result) {
     *         console.log("The exit code", result.exitCode);
     *     }
     * })
     * .then(identity => fin.System.releaseExternalProcess(identity.uuid))
     * .then(() => console.log('Process has been unmapped!'))
     * .catch(err => console.log(err));
     * ```
     */
    releaseExternalProcess(uuid) {
        return this.wire.sendAction('release-external-process', { uuid }).then(() => undefined);
    }
    /**
     * Shows the Chromium Developer Tools for the specified window
     * @param identity This is a object that is defined by the Identity interface
     *
     * @tutorial System.showDeveloperTools
     */
    showDeveloperTools(identity) {
        return this.wire.sendAction('show-developer-tools', identity).then(() => undefined);
    }
    /**
     * Attempt to close an external process. The process will be terminated if it
     * has not closed after the elapsed timeout in milliseconds.
     *
     * Note: This method is restricted by default and must be enabled via
     * <a href="https://developers.openfin.co/docs/api-security">API security settings</a>.
     * @param options A object defined in the TerminateExternalRequestType interface
     *
     * @example
     * ```js
     * fin.System.launchExternalProcess({
     *     path: "notepad",
     *     listener: function (result) {
     *         console.log("The exit code", result.exitCode);
     *     }
     * })
     * .then(identity => fin.System.terminateExternalProcess({uuid: identity.uuid, timeout:2000, killTree: false}))
     * .then(() => console.log('Terminate the process'))
     * .catch(err => console.log(err));
     * ```
     */
    terminateExternalProcess(options) {
        return this.wire.sendAction('terminate-external-process', options).then(() => undefined);
    }
    /**
     * Update the OpenFin Runtime Proxy settings.
     * @param options A config object defined in the ProxyConfig interface
     *
     * @example
     * ```js
     * fin.System.updateProxySettings({proxyAddress:'127.0.0.1', proxyPort:8080, type:'http'})
     * .then(() => console.log('Update proxy successfully'))
     * .catch(err => console.error(err));
     * ```
     */
    updateProxySettings(options) {
        return this.wire.sendAction('update-proxy', options).then(() => undefined);
    }
    /**
     * Downloads the given application asset.
     *
     * Note: This method is restricted by default and must be enabled via
     * <a href="https://developers.openfin.co/docs/api-security">API security settings</a>.
     * @param appAsset App asset object
     *
     * @example
     * ```js
     * async function downloadAsset() {
     *     const appAsset = {
     *         src: `${ location.origin }/assets.zip`,
     *         alias: 'dirApp',
     *         version: '1.23.24',
     *         target: 'assets/run.bat'
     *     };
     *
     *     return fin.System.downloadAsset(appAsset, (progress => {
     *     //Print progress as we download the asset.
     *         const downloadedPercent = Math.floor((progress.downloadedBytes / progress.totalBytes) * 100);
     *         console.log(`Downloaded ${downloadedPercent}%`);
     *     }));
     * }
     *
     * downloadAsset()
     * .then(() => console.log('Success'))
     * .catch(err => console.error(err));
     *
     * ```
     */
    // incompatible with standalone node process.
    async downloadAsset(appAsset, progressListener) {
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-empty-function
        const noop = () => { };
        let resolve = noop;
        let reject = noop;
        const downloadCompletePromise = new Promise((y, n) => {
            resolve = y;
            reject = n;
        });
        // node.js environment not supported
        if (this.wire.environment.type !== 'openfin') {
            throw new transport_errors_1$5.NotSupportedError('downloadAsset only supported in an OpenFin Render process');
        }
        const callSite = transport_errors_1$5.RuntimeError.getCallSite();
        const downloadId = this.wire.environment.getNextMessageId().toString();
        const dlProgressKey = `asset-download-progress-${downloadId}`;
        const dlErrorKey = `asset-download-error-${downloadId}`;
        const dlCompleteKey = `asset-download-complete-${downloadId}`;
        const dlProgress = (progress) => {
            const p = {
                downloadedBytes: progress.downloadedBytes,
                totalBytes: progress.totalBytes
            };
            progressListener(p);
        };
        const cleanListeners = () => {
            // TODO: fix internal types
            // @ts-expect-error
            this.removeListener(dlProgressKey, dlProgress);
        };
        const dlError = (payload) => {
            cleanListeners();
            const { reason, err: error } = payload;
            reject(new transport_errors_1$5.RuntimeError({ reason, error }, callSite));
        };
        const dlComplete = () => {
            cleanListeners();
            resolve();
        };
        await Promise.all([
            // TODO: fix internal types
            // @ts-expect-error
            this.on(dlProgressKey, dlProgress),
            // TODO: fix internal types
            // @ts-expect-error
            this.once(dlErrorKey, dlError),
            // TODO: fix internal types
            // @ts-expect-error
            this.once(dlCompleteKey, dlComplete)
        ]);
        const downloadOptions = Object.assign(appAsset, { downloadId });
        await this.wire.sendAction('download-asset', downloadOptions).catch((err) => {
            cleanListeners();
            throw err;
        });
        return downloadCompletePromise;
    }
    /**
     * Downloads a version of the runtime.
     * @param options - Download options.
     * @param progressListener - called as the runtime is downloaded with progress information.
     *
     * @remarks Only supported in an OpenFin Render process.
     *
     * @example
     * ```js
     * var downloadOptions = {
     *     //Specific version number required, if given a release channel the call will produce an error.
     *     version: '9.61.30.1'
     * };
     *
     * function onProgress(progress) {
     *     console.log(`${Math.floor((progress.downloadedBytes / progress.totalBytes) * 100)}%`);
     * }
     *
     * fin.System.downloadRuntime(downloadOptions, onProgress).then(() => {
     *     console.log('Download complete');
     * }).catch(err =>    {
     *     console.log(`Download Failed, we could retry: ${err.message}`);
     *     console.log(err);
     * });
     * ```
     */
    downloadRuntime(options, progressListener) {
        const callsites = transport_errors_1$5.RuntimeError.getCallSite();
        return new Promise((resolve, reject) => {
            // node.js environment not supported
            if (this.wire.environment.type !== 'openfin') {
                reject(new transport_errors_1$5.NotSupportedError('downloadRuntime only supported in an OpenFin Render process'));
                return;
            }
            const downloadId = this.wire.environment.getNextMessageId().toString();
            const dlProgressKey = `runtime-download-progress-${downloadId}`;
            const dlErrorKey = `runtime-download-error-${downloadId}`;
            const dlCompleteKey = `runtime-download-complete-${downloadId}`;
            const dlProgress = (progress) => {
                const p = {
                    downloadedBytes: progress.downloadedBytes,
                    totalBytes: progress.totalBytes
                };
                progressListener(p);
            };
            const cleanListeners = () => {
                // TODO: fix internal types
                // @ts-expect-error
                this.removeListener(dlProgressKey, dlProgress);
            };
            const dlError = (payload) => {
                cleanListeners();
                const { reason, err: error } = payload;
                reject(new transport_errors_1$5.RuntimeError({ reason, error }, callsites));
            };
            const dlComplete = () => {
                cleanListeners();
                resolve();
            };
            // TODO: fix internal types
            // @ts-expect-error
            this.on(dlProgressKey, dlProgress);
            // TODO: fix internal types
            // @ts-expect-error
            this.once(dlErrorKey, dlError);
            // TODO: fix internal types
            // @ts-expect-error
            this.once(dlCompleteKey, dlComplete);
            const downloadOptions = Object.assign(options, { downloadId });
            this.wire.sendAction('download-runtime', downloadOptions).catch((err) => {
                cleanListeners();
                reject(err);
            });
        });
    }
    /**
     * Download preload scripts from given URLs
     * @param scripts - URLs of preload scripts.
     *
     * @example
     * ```js
     * const scripts = [
     *     { url: 'http://.../preload.js' },
     *     { url: 'http://.../preload2.js' }
     * ];
     *
     * fin.System.downloadPreloadScripts(scripts).then(results => {
     *     results.forEach(({url, success, error}) => {
     *         console.log(`URL: ${url}`);
     *         console.log(`Success: ${success}`);
     *         if (error) {
     *             console.log(`Error: ${error}`);
     *         }
     *     });
     * });
     * ```
     */
    downloadPreloadScripts(scripts) {
        return this.wire.sendAction('download-preload-scripts', { scripts }).then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an array of data (name, ids, bounds) for all application windows.
     *
     * @example
     * ```js
     * fin.System.getAllExternalApplications()
     * .then(externalApps => console.log('Total external apps: ' + externalApps.length))
     * .catch(err => console.log(err));
     * ```
     */
    getAllExternalApplications() {
        return this.wire.sendAction('get-all-external-applications').then(({ payload }) => payload.data);
    }
    /**
     * Retrieves app asset information.
     * @param options
     *
     * @example
     * ```js
     * fin.System.getAppAssetInfo({alias:'procexp'}).then(assetInfo => console.log(assetInfo)).catch(err => console.log(err));
     * ```
     */
    getAppAssetInfo(options) {
        return this.wire.sendAction('get-app-asset-info', options).then(({ payload }) => payload.data);
    }
    /**
     * Get additional info of cookies.
     *
     * @example
     * ```js
     * fin.System.getCookies({name: 'myCookie'}).then(cookies => console.log(cookies)).catch(err => console.log(err));
     * ```
     */
    getCookies(options) {
        const url = this.wire.environment.getUrl();
        const newOptions = Object.assign(options, { url });
        return this.wire.sendAction('get-cookies', newOptions).then(({ payload }) => payload.data);
    }
    /**
     * Set the minimum log level above which logs will be written to the OpenFin log
     * @param The minimum level (inclusive) above which all calls to log will be written
     *
     * @example
     * ```js
     * fin.System.setMinLogLevel("verbose").then(() => console.log("log level is set to verbose")).catch(err => console.log(err));
     * ```
     */
    setMinLogLevel(level) {
        return this.wire.sendAction('set-min-log-level', { level }).then(() => undefined);
    }
    /**
     * Retrieves the UUID of the computer on which the runtime is installed
     * @param uuid The uuid of the running application
     *
     * @example
     * ```js
     * fin.System.resolveUuid('OpenfinPOC').then(entity => console.log(entity)).catch(err => console.log(err));
     * ```
     */
    resolveUuid(uuid) {
        return this.wire
            .sendAction('resolve-uuid', {
            entityKey: uuid
        })
            .then(({ payload }) => payload.data);
    }
    /**
     * Retrieves an array of data for all external applications
     * @param requestingIdentity This object is described in the Identity typedef
     * @param data Any data type to pass to the method
     *
     * @ignore
     */
    executeOnRemote(requestingIdentity, data) {
        data.requestingIdentity = requestingIdentity;
        return this.wire.ferryAction(data);
    }
    /**
     * Reads the specifed value from the registry.
     * @remarks This method is restricted by default and must be enabled via
     * [API security settings](https://developers.openfin.co/docs/api-security).
     * @param rootKey - The registry root key.
     * @param subkey - The registry key.
     * @param value - The registry value name.
     *
     * @example
     * ```js
     * fin.System.readRegistryValue("HKEY_LOCAL_MACHINE", "HARDWARE\\DESCRIPTION\\System", "BootArchitecture").then(val => console.log(val)).catch(err => console.log(err));
     * ```
     *
     * See {@link https://msdn.microsoft.com/en-us/library/windows/desktop/ms681382(v=vs.85).aspx here} for Window's error code definitions.
     *
     * Example payloads of different registry types:
     *
     * See list of types {@link https://msdn.microsoft.com/en-us/library/windows/desktop/ms724884(v=vs.85).aspx here}.
     *
     * ```js
     * // REG_DWORD
     * {
     *     data: 1,
     *     rootKey: "HKEY_LOCAL_MACHINE",
     *     subkey: "Foo\Bar",
     *     type: "REG_DWORD",
     *     value: "Baz"
     * }
     *
     * // REG_QWORD
     * {
     *     data: 13108146671334112,
     *     rootKey: "HKEY_LOCAL_MACHINE",
     *     subkey: "Foo\Bar",
     *     type: "REG_QWORD",
     *     value: "Baz"
     * }
     *
     * // REG_SZ
     * {
     *     data: "FooBarBaz",
     *     rootKey: "HKEY_LOCAL_MACHINE",
     *     subkey: "Foo\Bar",
     *     type: "REG_SZ",
     *     value: "Baz"
     * }
     *
     * // REG_EXPAND_SZ
     * {
     *     data: "C:\User\JohnDoe\AppData\Local",
     *     rootKey: "HKEY_CURRENT_USER",
     *     subkey: "Foo\Bar",
     *     type: "REG_EXPAND_SZ",
     *     value: "Baz"
     * }
     *
     * // REG_MULTI_SZ
     * {
     *     data: [
     *         "Foo",
     *         "Bar",
     *         "Baz"
     *     ],
     *     rootKey: "HKEY_CURRENT_USER",
     *     subkey: "Foo\Bar",
     *     type: "REG_MULTI_SZ",
     *     value: "Baz"
     * }
     *
     * // REG_BINARY
     * {
     *     data: {
     *         data: [
     *             255,
     *             255,
     *             0,
     *             43,
     *             55,
     *             0,
     *             0,
     *             255,
     *             255
     *         ],
     *         type: "Buffer"
     *     },
     *     rootKey: "HKEY_CURRENT_USER",
     *     subkey: "Foo\Bar",
     *     type: "REG_BINARY",
     *     value: "Baz"
     * }
     * ```
     */
    readRegistryValue(rootKey, subkey, value) {
        return this.wire
            .sendAction('read-registry-value', {
            rootKey,
            subkey,
            value
        })
            .then(({ payload }) => payload.data);
    }
    /**
     * This function call will register a unique id and produce a token.
     * The token can be used to broker an external connection.
     * @param uuid - A UUID for the remote connection.
     *
     * @example
     * ```js
     * fin.System.registerExternalConnection("remote-connection-uuid").then(conn => console.log(conn)).catch(err => console.log(err));
     *
     *
     * // object comes back with
     * //     token: "0489EAC5-6404-4F0D-993B-92BB8EAB445D", // this will be unique each time
     * //     uuid: "remote-connection-uuid"
     *
     * ```
     */
    registerExternalConnection(uuid) {
        return this.wire.sendAction('register-external-connection', { uuid }).then(({ payload }) => payload.data);
    }
    /**
     * Returns the json blob found in the [desktop owner settings](https://openfin.co/documentation/desktop-owner-settings/)
     * for the specified service.
     * @param serviceIdentifier An object containing a name key that identifies the service.
     *
     * @remarks More information about desktop services can be found [here](https://developers.openfin.co/docs/desktop-services).
     * This call will reject if the desktop owner settings file is not present, not correctly formatted, or if the service requested is not configured or configured incorrectly.
     *
     * @example
     * ```js
     * // Here we are using the [layouts](https://github.com/HadoukenIO/layouts-service) service.
     * fin.System.getServiceConfiguration({name:'layouts'}).then(console.log).catch(console.error);
     * ```
     */
    async getServiceConfiguration(serviceIdentifier) {
        if (typeof serviceIdentifier.name !== 'string') {
            throw new Error('Must provide an object with a `name` property having a string value');
        }
        const { name } = serviceIdentifier;
        return this.wire.sendAction('get-service-configuration', { name }).then(({ payload }) => payload.data);
    }
    async getSystemAppConfig(name) {
        if (typeof name !== 'string') {
            throw new Error('Must provide a string value for name of system app');
        }
        return this.wire.sendAction('get-system-app-configuration', { name }).then(({ payload }) => payload.data);
    }
    /**
     * Registers a system shutdown handler so user can do some cleanup before system is shutting down.
     * @remarks Once system shutdown starts, you are unable to cancel it.
     * @param handler system shutdown handler
     *
     * @example
     * ```js
     * fin.System.registerShutdownHandler((shutdownEvent) => {
     *         // save state or cleanup
     *         console.log('do some cleanup before shutdown');
     *         // Notify app is ready for termination.
     *         shutdownEvent.proceed();
     * })
     * .then(() => console.log('Shutdown handler registered!'))
     * .catch(err => console.log(err));
     * ```
     * @experimental
     */
    async registerShutdownHandler(handler) {
        this.wire.sendAction('system-register-shutdown-handler').catch((e) => {
            // don't expose, analytics-only call
        });
        const SystemShutdownEventName = 'system-shutdown';
        const SystemShutdownHandledEventName = 'system-shutdown-handled';
        const { uuid, name } = this.wire.me;
        const shutdownHandler = (payload) => {
            const proceed = () => {
                // notify core that the app is ready for shutdown
                this.wire.environment.raiseEvent(`application/${SystemShutdownHandledEventName}`, {
                    uuid,
                    name,
                    topic: 'application'
                });
            };
            handler({ proceed });
        };
        this.on(SystemShutdownEventName, shutdownHandler);
    }
    /**
     * Signals the RVM to perform a health check and returns the results as json.
     *
     * @remarks Requires RVM 5.5+
     *
     * @example
     * ```js
     * try {
     *     const results = await fin.System.runRvmHealthCheck();
     *     console.log(results);
     * } catch(e) {
     *      console.error(e);
     * }
     * ```
     */
    runRvmHealthCheck() {
        return this.wire.sendAction('run-rvm-health-check').then(({ payload }) => payload.data);
    }
    /**
     * Launch application using a manifest URL/path. It differs from Application.startFromManifest in that this API can accept a manifest using the fin protocol.
     * @param manifestUrl - The manifest's URL or path.
     * @param opts - Parameters that the RVM will use.
     *
     * @experimental
     * @remarks Supports protocols http/s and fin/s, and also a local path.
     *
     * Note: This API is Windows only.
     *
     * @example
     *
     * This API can handle most manifest types. Some examples below.
     *
     * Traditional:
     * ```js
     * const manifest = await fin.System.launchManifest(
     *   'https://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/app.json');
     * console.log(manifest);
     * ```
     *
     * Platform:
     * ```js
     * const manifest = await fin.System.launchManifest('https://openfin.github.io/platform-api-project-seed/public.json');
     * console.log(manifest);
     * ```
     *
     * Launching traditional manifest into a platform:
     * ```js
     * const manifest = await fin.System.launchManifest(
     *   'https://openfin.github.io/platform-api-project-seed/public.json?\
     *   $$appManifestUrl=https://demoappdirectory.openf.in/desktop/config/\
     *   apps/OpenFin/HelloOpenFin/app.json');
     * console.log(manifest);
     * ```
     *
     * Launching with RVM options:
     * ```js
     * const manifest = await fin.System.launchManifest('https://openfin.github.io/platform-api-project-seed/public.json',
     *     { noUi: true, userAppConfigArgs: { abc: '123', xyz: '789' } });
     * console.log(manifest);
     * ```
     *
     * Local Path:
     * ```js
     * const manifest =  await fin.System.launchManifest('file://c:\\path\\to\\manifest\\file.json');
     * console.log(manifest);
     * ```
     *
     * Launching with RVM 'subscribe' option:
     *
     * This option allows users to subscribe to app version resolver events when
     * calling launchManifest with fallbackManifests specified.
     *
     * ```js
     * fin.System.launchManifest('fins://system-apps/notifications/app.json', { subscribe: (launch) => {
     * 		launch.on('app-version-progress', (progress) => {
     * 			console.log("Trying manifest " + progress.manifest)
     * 		});
     *
     * 		launch.on('runtime-status', (status) => {
     * 			console.log("Runtime status: " + JSON.stringify(status));
     * 		});
     *
     * 		// RVM has successfully found the target runtime version
     * 		launch.on('app-version-complete', (complete) => {
     * 			console.log("Parent app " + complete.srcManifest + " resolved to " + complete.manifest);
     * 			launch.removeAllListeners();
     * 		});
     *
     * 		// RVM failed to find an available runtime version
     * 		launch.on('app-version-error', (error) => {
     * 			console.log("Failed to resolve " + error.srcManifest + " from the fallbackManifests");
     * 			launch.removeAllListeners();
     * 		});
     * 	}
     * });
     * ```
     */
    async launchManifest(manifestUrl, opts = {}) {
        const { subscribe, ..._sendOpts } = opts;
        const sendOpts = _sendOpts;
        if (subscribe) {
            const launchEmitter = new events_1$6.EventEmitter();
            subscribe(launchEmitter);
            const AppVersionProgressEventName = 'app-version-progress';
            const RuntimeStatusEventName = 'runtime-status';
            const AppVersionCompleteEventName = 'app-version-complete';
            const AppVersionErrorEventName = 'app-version-error';
            // add id to avoid multiple api calls getting duplicated events
            const id = this.wire.environment.getNextMessageId().toString();
            sendOpts.appVersionId = id;
            const supportedEvents = [
                AppVersionCompleteEventName,
                AppVersionProgressEventName,
                RuntimeStatusEventName,
                AppVersionErrorEventName
            ];
            const cleanEventPayload = (payload) => {
                // We need to do type castings below to make sure the return type is correct.
                const { appVersionId, topic, type: typeWithId, ...rest } = payload;
                const type = supportedEvents.find((x) => typeWithId.includes(x));
                return {
                    ...rest,
                    type
                };
            };
            const appVersionListener = (payload) => {
                const cleanPayload = cleanEventPayload(payload);
                launchEmitter.emit(cleanPayload.type, cleanPayload);
            };
            const removeAllListeners = () => {
                this.removeListener(`${AppVersionProgressEventName}.${id}`, appVersionListener);
                this.removeListener(`${RuntimeStatusEventName}.${id}`, appVersionListener);
                this.removeListener(`${AppVersionCompleteEventName}.${id}`, appVersionListener);
                this.removeListener(`${AppVersionErrorEventName}.${id}`, appVersionListener);
                this.removeListener(`${AppVersionCompleteEventName}.${id}`, removeAllListeners);
                this.removeListener(`${AppVersionErrorEventName}.${id}`, removeAllListeners);
            };
            await Promise.all([
                this.on(`${AppVersionProgressEventName}.${id}`, appVersionListener),
                this.on(`${RuntimeStatusEventName}.${id}`, appVersionListener),
                this.once(`${AppVersionCompleteEventName}.${id}`, appVersionListener),
                this.once(`${AppVersionErrorEventName}.${id}`, appVersionListener),
                this.once(`${AppVersionCompleteEventName}.${id}`, removeAllListeners),
                this.once(`${AppVersionErrorEventName}.${id}`, removeAllListeners)
            ]);
        }
        const response = await this.wire.sendAction('launch-manifest', {
            manifestUrl,
            opts: sendOpts
        });
        return response.payload.data.manifest;
    }
    /**
     * Query permission of a secured api in current context.
     *
     * @param apiName - The full name of a secured API.
     *
     * @remarks If a function has a structured permission value, the value of `granted` will reflect the `enabled` key
     * of the call's permissions literal.  In this case, *permission may still be denied to a call* pending arguments or other
     * runtime state.  This is indicated with `state: unavailable`.
     *
     * @example
     * ```js
     * fin.System.queryPermissionForCurrentContext('System.launchExternalProcess').then(result => console.log(result)).catch(err => console.log(err));
     *
     * //This response has the following shape:
     * {
     *    permission: 'System.launchExternalProcess', // api full name
     *    state: 'granted', // state of permission
     *    granted: true
     * }
     * ```
     */
    async queryPermissionForCurrentContext(apiName) {
        const identity = { uuid: this.wire.me.uuid, name: this.wire.me.name };
        const response = await this.wire.sendAction('query-permission-for-current-context', {
            apiName,
            identity
        });
        return response.payload.data;
    }
    // Not documenting, internal use only.
    async enableNativeWindowIntegrationProvider(permissions) {
        const { payload } = await this.wire.sendAction('enable-native-window-integration-provider', { permissions });
        return payload.data;
    }
    /**
     * (Internal) Register the usage of a component with a platform
     * @param options - Object with data and type
     *
     * @example
     * ```js
     * async function registerUsage() {
     *     const app = await fin.System.getCurrent();
     *     return await fin.System.registerUsage({
     *         type: 'workspace-licensing',
     *         // example values for the following data object
     *         data: {
     *             apiVersion: '1.0',
     *             componentName: 'home',
     *             componentVersion: '1.0',
     *             allowed: true,
     *             rejectionCode: ''
     *         }
     *     });
     * }
     *
     * registerUsage().then(() => console.log('Successfully registered component application')).catch(err => console.log(err));
     * ```
     */
    async registerUsage({ data, type }) {
        await this.wire.sendAction('register-usage', { data, type });
    }
    /**
     * Returns an array with all printers of the caller and not all the printers on the desktop.
     *
     * @example
     * ```js
     * fin.System.getPrinters()
     *     .then((printers) => {
     *         printers.forEach((printer) => {
     *             if (printer.isDefault) {
     *                 console.log(printer);
     *             }
     *         });
     *     })
     *     .catch((err) => {
     *         console.log(err);
     *     });
     * ```
     */
    async getPrinters() {
        const { payload } = await this.wire.sendAction('system-get-printers');
        return payload.data;
    }
    /**
     * Updates Process Logging values: periodic interval and outlier detection entries and interval.
     * @param options Process Logging updatable options.
     *
     * @remarks When enabling verbose mode, additional process information is logged to the debug.log:
     *
     * 1. Periodically process usage (memory, cpu, etc) will be logged for each PID along with the windows, views and
     * iframes that belong to them. The default is every 30 seconds. Updatable by passing the interval option.
     * 2. When Windows and Views are created or navigated the PID they belong to and their options will be logged.
     * 3. When Windows and Views are destroyed their last known process usage will be logged.
     * 4. Whenever an outlier memory usage is detected it will be logged. By default, on an interval of 5 seconds we will
     * collect process usage for all PIDs and when 144 such entries are collected, we will start analyzing the data for any
     * possible outliers in the following entries. The interval and maximum number of entries stored in the running buffer
     * can be updatable by passing the outlierDetection.interval and outlierDetection.entries options.
     *
     * @example
     *
     * ```js
     * await fin.System.updateProcessLoggingOptions({
     *     interval: 10,
     *     outlierDetection: {
     *         interval: 15,
     *         entries: 200
     *     }
     * });
     * ```
     */
    async updateProcessLoggingOptions(options) {
        await this.wire.sendAction('system-update-process-logging-options', { options });
    }
    /**
     * Returns domain settings for the current application.
     * Initial settings are configured with the defaultDomainSettings application option via manifest.
     * Domain settings can be overwritten during runtime with System.setDomainSettings.
     * @example
     * ```js
     * const domainSettings = await fin.System.getDomainSettings();
     * // {
     * //     "rules": [
     * //         {
     * //             "match": [
     * //                 "https://openfin.co"
     * //             ],
     * //             "options": {
     * //                 "downloadSettings": {
     * //                     "rules": [
     * //                         {
     * //                             "match": [
     * //                                 "<all_urls>"
     * //                             ],
     * //                             "behavior": "prompt"
     * //                         }
     * //                     ]
     * //                 }
     * //             }
     * //         }
     * //     ]
     * // }
     * ```
     */
    async getDomainSettings() {
        const { payload: { data } } = await this.wire.sendAction('get-domain-settings');
        return data;
    }
    /**
     * Sets the domain settings for the current application.
     * @param domainSettings - domain settings object
     * @example
     * ```js
     * const domainSettings = await fin.System.getDomainSettings();
     * // {
     * //     "rules": [
     * //         {
     * //             "match": [
     * //                 "https://openfin.co"
     * //             ],
     * //             "options": {
     * //                 "downloadSettings": {
     * //                     "rules": [
     * //                         {
     * //                             "match": [
     * //                                 "<all_urls>"
     * //                             ],
     * //                             "behavior": "prompt"
     * //                         }
     * //                     ]
     * //                 }
     * //             }
     * //         }
     * //     ]
     * // }
     *
     * // Valid rule behaviors are 'prompt' and 'no-prompt'
     * domainSettings.rules[0].options.downloadSettings.rules[0].behavior = 'no-prompt';
     *
     * await fin.System.setDomainSettings(domainSettings);
     *
     * const newDomainSettings = await fin.System.getDomainSettings();
     * // {
     * //     "rules": [
     * //         {
     * //             "match": [
     * //                 "https://openfin.co"
     * //             ],
     * //             "options": {
     * //                 "downloadSettings": {
     * //                     "rules": [
     * //                         {
     * //                             "match": [
     * //                                 "<all_urls>"
     * //                             ],
     * //                             "behavior": "no-prompt"
     * //                         }
     * //                     ]
     * //                 }
     * //             }
     * //         }
     * //     ]
     * // }
     * ```
     */
    async setDomainSettings(domainSettings) {
        await this.wire.sendAction('set-domain-settings', { domainSettings });
    }
    async getCurrentDomainSettings(identity) {
        return (await this.wire.sendAction('get-current-domain-settings', { identity })).payload.data;
    }
    async resolveDomainSettings(url) {
        return (await this.wire.sendAction('resolve-domain-settings', { url })).payload.data;
    }
    /**
     * Attempts to install and enable extensions for the security realm.  Users may want to call this function in response
     * to an `extensions-install-failed` event.  Only extensions allowed by every application on the current security realm
     * will be installed/enabled.
     */
    async refreshExtensions() {
        const { payload } = await this.wire.sendAction('refresh-extensions');
        return payload.data;
    }
    /**
     * Gets the currently-installed
     */
    async getInstalledExtensions() {
        const { payload } = await this.wire.sendAction('get-installed-extensions');
        return payload.data;
    }
    /**
     * Used to serve an asset signed by OpenFin within the given runtime.
     * Not indended for general use, will be used by the `@openfin/workspace-platform` package.
     */
    async serveAsset(options) {
        return (await this.wire.sendAction('serve-asset', { options })).payload.data;
    }
}
system.System = System;

var interappbus = {};

var refCounter = {};

Object.defineProperty(refCounter, "__esModule", { value: true });
refCounter.RefCounter = void 0;
class RefCounter {
    constructor() {
        this.topicRefMap = new Map();
    }
    // returns the ref count after incrementing
    incRefCount(key) {
        const refCount = this.topicRefMap.get(key);
        let returnCount;
        if (!refCount) {
            this.topicRefMap.set(key, 1);
            returnCount = 1;
        }
        else {
            const newRefCount = refCount + 1;
            returnCount = newRefCount;
            this.topicRefMap.set(key, newRefCount);
        }
        return returnCount;
    }
    // returns the ref count after decrementing, or -1 if the key already had no references
    decRefCount(key) {
        const refCount = this.topicRefMap.get(key);
        let returnCount;
        if (refCount) {
            const newRefCount = refCount - 1;
            this.topicRefMap.set(key, newRefCount);
            returnCount = newRefCount;
        }
        else {
            returnCount = -1;
        }
        return returnCount;
    }
    // Execute firstAction if it is the first such ref, else execute nonFirstAction.
    // In either case the return value is that of the action executed
    actOnFirst(key, firstAction, nonFirstAction) {
        const numRefs = this.incRefCount(key);
        const isFirstRef = numRefs === 1;
        return isFirstRef ? firstAction() : nonFirstAction();
    }
    // Execute lastAction if it is the first such ref, else execute nonLastAction.
    // In either case the return value is that of the action executed
    actOnLast(key, lastAction, nonLastAction) {
        const numRefs = this.decRefCount(key);
        const isLastRef = numRefs === 0;
        return isLastRef ? lastAction() : nonLastAction();
    }
}
refCounter.RefCounter = RefCounter;

var channel$1 = {};

var client = {};

var channel = {};

Object.defineProperty(channel, "__esModule", { value: true });
channel.ChannelBase = channel.ProtectedItems = void 0;
const transport_errors_1$4 = transportErrors;
const resultOrPayload = (func) => async (topic, payload, senderIdentity) => {
    const res = await func(topic, payload, senderIdentity);
    return res === undefined ? payload : res;
};
class ProtectedItems {
    /**
     * @internal
     */
    // eslint-disable-next-line no-useless-constructor
    constructor(providerIdentity, close) {
        this.providerIdentity = providerIdentity;
        this.close = close;
    }
}
channel.ProtectedItems = ProtectedItems;
class ChannelBase {
    static defaultAction(topic) {
        throw new Error(`No action registered at target for ${topic}`);
    }
    constructor() {
        this.subscriptions = new Map();
    }
    async processAction(topic, payload, senderIdentity) {
        try {
            const registeredAction = this.subscriptions.get(topic);
            const defaultAction = (currentPayload, id) => (this.defaultAction ?? ChannelBase.defaultAction)(topic, currentPayload, id);
            const mainAction = registeredAction ?? defaultAction;
            const preActionProcessed = this.preAction ? await this.preAction(topic, payload, senderIdentity) : payload;
            const actionProcessed = await mainAction(preActionProcessed, senderIdentity);
            return this.postAction ? await this.postAction(topic, actionProcessed, senderIdentity) : actionProcessed;
        }
        catch (e) {
            transport_errors_1$4.RuntimeError.trimEndCallSites(e, /Channel.*processAction/);
            if (this.errorMiddleware) {
                return this.errorMiddleware(topic, e, senderIdentity);
            }
            throw e;
        }
    }
    /**
     * Register middleware that fires before the action.
     *
     * @param func
     *
     * @example
     *
     * Channel Provider:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     provider.register('provider-action', (payload, identity) => {
     *         console.log(payload, identity);
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     provider.beforeAction((action, payload, identity) => {
     *         //The payload can be altered here before handling the action.
     *         payload.received = Date.now();
     *         return payload;
     *     });
     *
     * })();
     * ```
     *
     * Channel Client:
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     client.register('client-action', (payload, identity) => {
     *         console.log(payload, identity);
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     client.beforeAction((action, payload, identity) => {
     *         //The payload can be altered here before handling the action.
     *         payload.received = Date.now();
     *         return payload;
     *     });
     *
     *     const providerResponse = await client.dispatch('provider-action', { message: 'Hello From the client' });
     *     console.log(providerResponse);
     * })();
     * ```
     */
    beforeAction(func) {
        if (this.preAction) {
            throw new Error('Already registered beforeAction middleware');
        }
        this.preAction = resultOrPayload(func);
    }
    /**
     * Register an error handler. This is called before responding on any error.
     *
     * @param func
     *
     * Channel Provider:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     provider.register('provider-action', (payload, identity) => {
     *         console.log(payload);
     *         throw new Error('Action error');
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     provider.onError((action, error, identity) => {
     *         console.log('uncaught Exception in action:', action);
     *         console.error(error);
     *     });
     *
     * })();
     * ```
     *
     * Channel Client:
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     client.register('client-action', (payload, identity) => {
     *         console.log(payload);
     *         throw new Error('Action error');
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     client.onError((action, error, identity) => {
     *         console.log('uncaught Exception in action:', action);
     *         console.error(error);
     *     });
     * })();
     * ```
     */
    onError(func) {
        if (this.errorMiddleware) {
            throw new Error('Already registered error middleware');
        }
        this.errorMiddleware = func;
    }
    /**
     * Register middleware that fires after the action.
     *
     * @param func
     *
     * @remarks If the action does not return the payload, then the afterAction will not have access to the payload object.
     *
     * @example
     *
     * Channel Provider:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.register('provider-action', (payload, identity) => {
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     await provider.afterAction((action, payload, identity) => {
     *         //the payload can be altered here after handling the action but before sending an acknowledgement.
     *         payload.sent = date.now();
     *         return payload;
     *     });
     *
     * })();
     * ```
     *
     * Channel Client:
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.register('client-action', (payload, identity) => {
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     await client.afterAction((action, payload, identity) => {
     *         //the payload can be altered here after handling the action but before sending an acknowledgement.
     *         payload.sent = date.now();
     *         return payload;
     *     });
     *
     * })();
     * ```
     */
    afterAction(func) {
        if (this.postAction) {
            throw new Error('Already registered afterAction middleware');
        }
        this.postAction = resultOrPayload(func);
    }
    /**
     * Remove an action by action name.
     *
     * @param action
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.register('provider-action', (payload, identity) => {
     *         console.log(payload);
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     await provider.remove('provider-action');
     *
     * })();
     * ```
     */
    remove(action) {
        this.subscriptions.delete(action);
    }
    /**
     * Registers a default action. This is used any time an action that has not been registered is invoked.
     *
     * @example
     *
     * Channel Provider:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.setDefaultAction((action, payload, identity) => {
     *         console.log(`Client with identity ${JSON.stringify(identity)} has attempted to dispatch unregistered action: ${action}.`);
     *
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     * })();
     * ```
     *
     * Channel Client:
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.setDefaultAction((action, payload, identity) => {
     *         console.log(`Provider with identity ${JSON.stringify(identity)} has attempted to dispatch unregistered action: ${action}.`);
     *
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     * })();
     * ```
     * @param func
     */
    setDefaultAction(func) {
        if (this.defaultAction) {
            throw new Error('default action can only be set once');
        }
        else {
            this.defaultAction = func;
        }
    }
    /**
     * Register an action to be called by dispatching from any channelClient or channelProvider.
     *
     * @param topic
     * @param listener
     *
     * @remarks The return value will be sent back as an acknowledgement to the original caller. You can throw an
     * error to send a negative-acknowledgement and the error will reject the promise returned to the sender by the
     * dispatch call.  Once a listener is registered for a particular action, it stays in place receiving and responding
     * to incoming messages until it is removed.  This messaging mechanism works exactly the same when messages are
     * dispatched from the provider to a client.  However, the provider has an additional publish method that sends messages
     * to all connected clients.
     *
     * Because multiple clients can share the same `name` and `uuid`, in order to distinguish between individual clients,
     * the `identity` argument in a provider's registered action callback contains an `endpointId` property. When dispatching
     * from a provider to a client, the `endpointId` property must be provided in order to send an action to a specific client.
     *
     * @example
     *
     * Channel Provider:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.register('provider-action', (payload, identity) => {
     *        console.log('Action dispatched by client: ', identity);
     *        console.log('Payload sent in dispatch: ', payload);
     *
     *        return { echo: payload };
     *    });
     * })();
     * ```
     *
     * Channel Client:
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.register('client-action', (payload, identity) => {
     *        console.log('Action dispatched by client: ', identity);
     *        console.log('Payload sent in dispatch: ', payload);
     *
     *        return { echo: payload };
     *    });
     * })();
     * ```
     */
    register(topic, listener) {
        if (this.subscriptions.has(topic)) {
            throw new Error(`Subscription already registered for action: ${topic}. Unsubscribe before adding new subscription`);
        }
        else {
            this.subscriptions.set(topic, listener);
            return true;
        }
    }
}
channel.ChannelBase = ChannelBase;

var channelError = {};

Object.defineProperty(channelError, "__esModule", { value: true });
channelError.ChannelError = void 0;
const transport_errors_1$3 = transportErrors;
class ChannelError extends Error {
    constructor(originalError, action, dispatchPayload, callsites) {
        super(originalError.message);
        this.action = action;
        this.dispatchPayload = dispatchPayload;
        this.name = this.constructor.name;
        if ('cause' in originalError && originalError.cause instanceof Error) {
            this.cause = originalError.cause;
        }
        this.stack = transport_errors_1$3.RuntimeError.prepareStackTrace(this, callsites);
    }
}
channelError.ChannelError = ChannelError;

var __classPrivateFieldGet$h = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$g = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ChannelClient_protectedObj, _ChannelClient_strategy, _ChannelClient_close;
Object.defineProperty(client, "__esModule", { value: true });
client.ChannelClient = void 0;
const transport_errors_1$2 = transportErrors;
const channel_1$1 = channel;
const channel_error_1$1 = channelError;
const channelClientsByEndpointId = new Map();
/**
 * Instance created to enable use of a channel as a client.  Allows for communication with the
 * {@link ChannelProvider ChannelProvider} by invoking an action on the
 * provider via {@link ChannelClient#dispatch dispatch} and to listen for communication
 * from the provider by registering an action via {@link ChannelClient#register register}.
 *
 * ### Synchronous Methods:
 *  * {@link ChannelClient#onDisconnection onDisconnection(listener)}
 *  * {@link ChannelClient#register register(action, listener)}
 *  * {@link ChannelClient#remove remove(action)}
 *
 * ### Asynchronous Methods:
 *  * {@link ChannelClient#disconnect disconnect()}
 *  * {@link ChannelClient#dispatch dispatch(action, payload)}
 *
 * ### Middleware:
 * Middleware functions receive the following arguments: (action, payload, senderId).
 * The return value of the middleware function will be passed on as the payload from beforeAction, to the action listener, to afterAction
 * unless it is undefined, in which case the original payload is used.  Middleware can be used for side effects.
 *  * {@link ChannelClient#setDefaultAction setDefaultAction(middleware)}
 *  * {@link ChannelClient#onError onError(middleware)}
 *  * {@link ChannelClient#beforeAction beforeAction(middleware)}
 *  * {@link ChannelClient#afterAction afterAction(middleware)}
 */
class ChannelClient extends channel_1$1.ChannelBase {
    /**
     * @internal
     */
    static closeChannelByEndpointId(id) {
        const channel = channelClientsByEndpointId.get(id);
        if (channel) {
            __classPrivateFieldGet$h(channel, _ChannelClient_close, "f").call(channel);
        }
    }
    /**
     * @internal
     * closes the corresponding channel and invokes the disconnect listener if an event payload is passed.
     */
    static handleProviderDisconnect(eventPayload) {
        for (const channelClient of channelClientsByEndpointId.values()) {
            if (channelClient.providerIdentity.channelId === eventPayload.channelId) {
                channelClient.disconnectListener(eventPayload);
                __classPrivateFieldGet$h(channelClient, _ChannelClient_close, "f").call(channelClient);
            }
        }
    }
    /**
     * @internal
     */
    constructor(routingInfo, close, strategy) {
        super();
        _ChannelClient_protectedObj.set(this, void 0);
        _ChannelClient_strategy.set(this, void 0);
        // needs to be bound;
        this.processAction = (action, payload, senderIdentity) => super.processAction(action, payload, senderIdentity);
        _ChannelClient_close.set(this, () => {
            channelClientsByEndpointId.delete(this.endpointId);
            __classPrivateFieldGet$h(this, _ChannelClient_strategy, "f").close();
        });
        __classPrivateFieldSet$g(this, _ChannelClient_protectedObj, new channel_1$1.ProtectedItems(routingInfo, close), "f");
        this.disconnectListener = () => undefined;
        this.endpointId = routingInfo.endpointId;
        __classPrivateFieldSet$g(this, _ChannelClient_strategy, strategy, "f");
        channelClientsByEndpointId.set(this.endpointId, this);
        strategy.receive(this.processAction);
    }
    /**
     * a read-only provider identity
     */
    get providerIdentity() {
        const protectedObj = __classPrivateFieldGet$h(this, _ChannelClient_protectedObj, "f");
        return protectedObj.providerIdentity;
    }
    /**
     * Dispatch the given action to the channel provider. Returns a promise that resolves with the response from
     * the provider for that action.
     *
     * @param action
     * @param payload
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.register('client-action', (payload, identity) => {
     *         console.log(payload, identity);
     *         return {
     *             echo: payload
     *         };
     *     });
     *
     *     const providerResponse = await client.dispatch('provider-action', { message: 'Hello From the client'});
     *     console.log(providerResponse);
     * })();
     * ```
     */
    async dispatch(action, payload) {
        if (__classPrivateFieldGet$h(this, _ChannelClient_strategy, "f").isEndpointConnected(this.providerIdentity.channelId)) {
            const callSites = transport_errors_1$2.RuntimeError.getCallSite();
            return __classPrivateFieldGet$h(this, _ChannelClient_strategy, "f").send(this.providerIdentity.channelId, action, payload).catch((e) => {
                throw new channel_error_1$1.ChannelError(e, action, payload, callSites);
            });
        }
        throw new Error('The client you are trying to dispatch from is disconnected from the target provider.');
    }
    /**
     * Register a listener that is called on provider disconnection. It is passed the disconnection event of the
     * disconnecting provider.
     *
     * @param listener
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.onDisconnection(evt => {
     *         console.log('Provider disconnected', `uuid: ${evt.uuid}, name: ${evt.name}`);
     *     });
     * })();
     * ```
     */
    onDisconnection(listener) {
        this.disconnectListener = (payload) => {
            try {
                listener(payload);
            }
            catch (err) {
                throw new Error(`Error while calling the onDisconnection callback: ${err.message}`);
            }
            finally {
                this.disconnectListener = () => undefined;
            }
        };
    }
    /**
     * Disconnects the client from the channel.
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const client = await fin.InterApplicationBus.Channel.connect('channelName');
     *
     *     await client.disconnect();
     * })();
     * ```
     */
    async disconnect() {
        await this.sendDisconnectAction();
        __classPrivateFieldGet$h(this, _ChannelClient_close, "f").call(this);
    }
    async sendDisconnectAction() {
        const protectedObj = __classPrivateFieldGet$h(this, _ChannelClient_protectedObj, "f");
        await protectedObj.close();
    }
    /**
     * @internal
     * Writing this as a static to keep code together, but in environments with a wire, this will be DI'd into the protectedObject class as close.
     */
    static async wireClose(wire, providerIdentity, endpointId) {
        const { channelName, uuid, name } = providerIdentity;
        await wire.sendAction('disconnect-from-channel', {
            channelName,
            uuid,
            name,
            endpointId
        });
    }
}
client.ChannelClient = ChannelClient;
_ChannelClient_protectedObj = new WeakMap(), _ChannelClient_strategy = new WeakMap(), _ChannelClient_close = new WeakMap();

var connectionManager = {};

var exhaustive = {};

Object.defineProperty(exhaustive, "__esModule", { value: true });
exhaustive.exhaustiveCheck = void 0;
function exhaustiveCheck(value, allowed) {
    throw new Error(`Unsupported value: ${value}${allowed ? `\n Supported values are: ${allowed.join('')}` : ''}`);
}
exhaustive.exhaustiveCheck = exhaustiveCheck;

var strategy$3 = {};

var __classPrivateFieldSet$f = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$g = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ClassicStrategy_wire, _ClassicStrategy_endpointIdentityMap, _ClassicStrategy_pendingMessagesByEndpointId;
Object.defineProperty(strategy$3, "__esModule", { value: true });
strategy$3.ClassicInfo = strategy$3.ClassicStrategy = void 0;
/*
This is used to abstract out ipc messaging from the channels implementation. It is only concerned with sending messages and registration with the MessageReceiver
*/
class ClassicStrategy {
    constructor(wire, messageReceiver, endpointId, // Provider endpointId is channelId
    providerIdentity) {
        this.messageReceiver = messageReceiver;
        this.endpointId = endpointId;
        this.providerIdentity = providerIdentity;
        _ClassicStrategy_wire.set(this, void 0);
        // Store full endpointIdentity by endpointId of all known endpoints for this strategy instance.
        // (clients will only have 1: the provider, the provider will have all clients)
        _ClassicStrategy_endpointIdentityMap.set(this, new Map());
        // Store a set of cancellable promises to be able to reject them when client
        // connection problems occur
        _ClassicStrategy_pendingMessagesByEndpointId.set(this, new Map());
        this.send = async (endpointId, action, payload) => {
            const to = __classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").get(endpointId);
            if (!to) {
                throw new Error(`Could not locate routing info for endpoint ${endpointId}`);
            }
            // as casting to any because typescript complains. The following is only relevant if this is a locally set endpointId on a ClientIdentity.
            // We delete these properties to not change backwards compatibility.
            const cleanId = { ...to };
            if (cleanId.isLocalEndpointId) {
                delete cleanId.endpointId;
            }
            delete cleanId.isLocalEndpointId;
            // grab the promise before awaiting it to save in our pending messages map
            const p = __classPrivateFieldGet$g(this, _ClassicStrategy_wire, "f").sendAction('send-channel-message', {
                ...cleanId,
                providerIdentity: this.providerIdentity,
                action,
                payload
            });
            __classPrivateFieldGet$g(this, _ClassicStrategy_pendingMessagesByEndpointId, "f").get(endpointId)?.add(p);
            const raw = await p
                .catch((error) => {
                if ('cause' in error) {
                    throw error;
                }
                throw new Error(error.message);
            })
                .finally(() => {
                // clean up the pending promise
                __classPrivateFieldGet$g(this, _ClassicStrategy_pendingMessagesByEndpointId, "f").get(endpointId)?.delete(p);
            });
            return raw.payload.data.result;
        };
        this.close = async () => {
            this.messageReceiver.removeEndpoint(this.providerIdentity.channelId, this.endpointId);
            [...__classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").keys()].forEach((id) => this.closeEndpoint(id));
            __classPrivateFieldSet$f(this, _ClassicStrategy_endpointIdentityMap, new Map(), "f");
        };
        __classPrivateFieldSet$f(this, _ClassicStrategy_wire, wire, "f");
    }
    onEndpointDisconnect(endpointId, listener) {
        // Never fires for 'classic'.
    }
    receive(listener) {
        this.messageReceiver.addEndpoint(listener, this.providerIdentity.channelId, this.endpointId);
    }
    async closeEndpoint(endpointId) {
        const id = __classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").get(endpointId);
        __classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").delete(endpointId);
        const pendingSet = __classPrivateFieldGet$g(this, _ClassicStrategy_pendingMessagesByEndpointId, "f").get(endpointId);
        pendingSet?.forEach((p) => {
            const errorMsg = `Channel connection with identity uuid: ${id?.uuid} / name: ${id?.name} / endpointId: ${endpointId} no longer connected.`;
            p.cancel(new Error(errorMsg));
        });
    }
    isEndpointConnected(endpointId) {
        return __classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").has(endpointId);
    }
    addEndpoint(endpointId, payload) {
        __classPrivateFieldGet$g(this, _ClassicStrategy_endpointIdentityMap, "f").set(endpointId, payload.endpointIdentity);
        __classPrivateFieldGet$g(this, _ClassicStrategy_pendingMessagesByEndpointId, "f").set(endpointId, new Set());
    }
    isValidEndpointPayload(payload) {
        return (typeof payload?.endpointIdentity?.endpointId === 'string' ||
            typeof payload?.endpointIdentity?.channelId === 'string');
    }
}
strategy$3.ClassicStrategy = ClassicStrategy;
_ClassicStrategy_wire = new WeakMap(), _ClassicStrategy_endpointIdentityMap = new WeakMap(), _ClassicStrategy_pendingMessagesByEndpointId = new WeakMap();
// Arbitrarily starting at 5 to leave the door open to backfilling pre endpointId etc.
strategy$3.ClassicInfo = { version: 5, minimumVersion: 0, type: 'classic' };

var strategy$2 = {};

var endpoint = {};

var errors = {};

Object.defineProperty(errors, "__esModule", { value: true });
errors.errorToPOJO = void 0;
function errorToPOJO(error) {
    const errorObj = {
        stack: error.stack,
        name: error.name,
        message: error.message,
        // support the case where stack is empty or missing
        toString: () => error.stack || error.toString()
    };
    if ('cause' in error) {
        errorObj.cause = errorToPOJO(error.cause);
    }
    return errorObj;
}
errors.errorToPOJO = errorToPOJO;

var __classPrivateFieldGet$f = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$e = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _RTCEndpoint_processAction, _RTCEndpoint_disconnectListener;
Object.defineProperty(endpoint, "__esModule", { value: true });
endpoint.RTCEndpoint = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const errors_1$2 = errors;
/*
This handles sending RTC messages between RTC connections over the request and response data channels.
*/
class RTCEndpoint {
    static isValidEndpointPayload(payload) {
        const isObject = (x) => {
            return typeof x === 'object' && x !== null;
        };
        return (
        // TODO in factory PR:
        // payload.type === 'rtc' &&
        isObject(payload) &&
            isObject(payload.endpointIdentity) &&
            isObject(payload.rtc) &&
            typeof payload.endpointIdentity.endpointId === 'string');
    }
    constructor({ rtc, endpointIdentity }) {
        this.responseMap = new Map();
        _RTCEndpoint_processAction.set(this, null);
        _RTCEndpoint_disconnectListener.set(this, void 0);
        this.connectionStateChangeHandler = (event) => {
            if (this.rtc.rtcClient.connectionState !== 'connected') {
                this.rtc.rtcClient.removeEventListener('connectionstatechange', this.connectionStateChangeHandler);
                this.close();
                if (__classPrivateFieldGet$f(this, _RTCEndpoint_disconnectListener, "f")) {
                    __classPrivateFieldGet$f(this, _RTCEndpoint_disconnectListener, "f").call(this);
                }
            }
        };
        this.send = async (action, payload) => {
            const messageId = `message-${Math.random()}`;
            const promise = new Promise((resolve, reject) => {
                this.responseMap.set(messageId, { resolve, reject });
            });
            this.rtc.channels.request.send(JSON.stringify({ action, payload, messageId }));
            return promise;
        };
        this.close = () => {
            this.responseMap.forEach((response) => response.reject('Connection has closed.'));
            this.responseMap = new Map();
            this.rtc.channels.request.close();
            this.rtc.channels.response.close();
            this.rtc.rtcClient.close();
        };
        this.rtc = rtc;
        this.endpointIdentity = endpointIdentity;
        this.rtc.channels.response.addEventListener('message', (e) => {
            let { data } = e;
            if (e.data instanceof ArrayBuffer) {
                data = new TextDecoder().decode(e.data);
            }
            const { messageId, payload, success, error } = JSON.parse(data);
            const { resolve, reject } = this.responseMap.get(messageId) ?? {};
            if (resolve && reject) {
                this.responseMap.delete(messageId);
                if (success) {
                    resolve(payload);
                }
                else {
                    reject(error);
                }
            }
            else {
                console.log('Could not find id in responseMap.');
                console.log(e);
            }
        });
        this.rtc.channels.request.addEventListener('message', async (e) => {
            let { data } = e;
            if (e.data instanceof ArrayBuffer) {
                data = new TextDecoder().decode(e.data);
            }
            const { messageId, action, payload } = JSON.parse(data);
            if (__classPrivateFieldGet$f(this, _RTCEndpoint_processAction, "f")) {
                try {
                    const res = await __classPrivateFieldGet$f(this, _RTCEndpoint_processAction, "f").call(this, action, payload, endpointIdentity);
                    this.rtc.channels.response.send(JSON.stringify({
                        messageId,
                        payload: res,
                        success: true
                    }));
                }
                catch (error) {
                    // Check if RTCDataChannel is open before sending, error gets swallowed here in the case where
                    // client dispatched then closed or disconnected before the dispatch resolves.
                    if (this.rtc.channels.response.readyState === 'open') {
                        this.rtc.channels.response.send(JSON.stringify({
                            messageId,
                            error: (0, errors_1$2.errorToPOJO)(error),
                            success: false
                        }));
                    }
                }
                // Check if RTCDataChannel is open for same reason as catch block above.
            }
            else if (this.rtc.channels.response.readyState === 'open') {
                this.rtc.channels.response.send(JSON.stringify({
                    messageId,
                    success: false,
                    error: 'Connection not ready.'
                }));
            }
        });
        this.rtc.rtcClient.addEventListener('connectionstatechange', this.connectionStateChangeHandler);
        // Disconnect if data channels close unexpectedly, e.g. can happen due to message size > ~255kB (RTCPeerConnection.sctp.maxMessageSizeLimit: 262144)
        Object.values(this.rtc.channels).forEach((datachannel) => {
            datachannel.onclose = (e) => {
                [...this.responseMap.values()].forEach((promise) => promise.reject(new Error('RTCDataChannel closed unexpectedly, this is most commonly caused by message size. Note: RTC Channels have a message size limit of ~255kB.')));
                this.close();
                if (__classPrivateFieldGet$f(this, _RTCEndpoint_disconnectListener, "f")) {
                    __classPrivateFieldGet$f(this, _RTCEndpoint_disconnectListener, "f").call(this);
                }
            };
        });
    }
    onDisconnect(listener) {
        if (!__classPrivateFieldGet$f(this, _RTCEndpoint_disconnectListener, "f")) {
            __classPrivateFieldSet$e(this, _RTCEndpoint_disconnectListener, listener, "f");
        }
        else {
            throw new Error('RTCEndpoint disconnectListener cannot be set twice.');
        }
    }
    receive(listener) {
        if (__classPrivateFieldGet$f(this, _RTCEndpoint_processAction, "f")) {
            throw new Error('You have already set a listener for this RTC Endpoint.');
        }
        __classPrivateFieldSet$e(this, _RTCEndpoint_processAction, listener, "f");
    }
    get connected() {
        return this.rtc.rtcClient.connectionState === 'connected';
    }
}
endpoint.RTCEndpoint = RTCEndpoint;
_RTCEndpoint_processAction = new WeakMap(), _RTCEndpoint_disconnectListener = new WeakMap();

var strategy$1 = {};

var __classPrivateFieldGet$e = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$d = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _EndpointStrategy_processAction, _EndpointStrategy_endpointMap, _EndpointStrategy_connected;
Object.defineProperty(strategy$1, "__esModule", { value: true });
strategy$1.EndpointStrategy = void 0;
class EndpointStrategy {
    // Need to pass in validate endpoint separately from constructor because ts interfaces don't do well with static methods
    constructor(EndpointType, validateEndpoint, StrategyName) {
        this.EndpointType = EndpointType;
        this.StrategyName = StrategyName;
        _EndpointStrategy_processAction.set(this, null);
        _EndpointStrategy_endpointMap.set(this, new Map());
        _EndpointStrategy_connected.set(this, true);
        this.send = async (endpointId, action, payload) => {
            return this.getEndpointById(endpointId).send(action, payload);
        };
        this.close = async () => {
            if (__classPrivateFieldGet$e(this, _EndpointStrategy_connected, "f")) {
                __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").forEach((endpoint) => endpoint.close());
                __classPrivateFieldSet$d(this, _EndpointStrategy_endpointMap, new Map(), "f");
            }
            __classPrivateFieldSet$d(this, _EndpointStrategy_connected, false, "f");
        };
        this.isValidEndpointPayload = validateEndpoint;
    }
    onEndpointDisconnect(endpointId, listener) {
        this.getEndpointById(endpointId).onDisconnect(listener);
    }
    receive(listener) {
        if (__classPrivateFieldGet$e(this, _EndpointStrategy_processAction, "f")) {
            throw new Error(`You have already set a listener for this ${this.StrategyName} Strategy`);
        }
        __classPrivateFieldSet$d(this, _EndpointStrategy_processAction, listener, "f");
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").forEach((endpoint) => endpoint.receive(__classPrivateFieldGet$e(this, _EndpointStrategy_processAction, "f")));
    }
    getEndpointById(endpointId) {
        const endpoint = __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").get(endpointId);
        if (!endpoint) {
            throw new Error(`Client with endpoint id ${endpointId} is not connected`);
        }
        return endpoint;
    }
    get connected() {
        return __classPrivateFieldGet$e(this, _EndpointStrategy_connected, "f");
    }
    isEndpointConnected(endpointId) {
        return __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").has(endpointId);
    }
    addEndpoint(endpointId, payload) {
        if (!__classPrivateFieldGet$e(this, _EndpointStrategy_connected, "f")) {
            console.warn(`Adding endpoint to disconnected ${this.StrategyName} Strategy`);
            return;
        }
        const clientStrat = new this.EndpointType(payload);
        if (__classPrivateFieldGet$e(this, _EndpointStrategy_processAction, "f")) {
            clientStrat.receive(__classPrivateFieldGet$e(this, _EndpointStrategy_processAction, "f"));
        }
        __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").set(endpointId, clientStrat);
    }
    async closeEndpoint(endpointId) {
        __classPrivateFieldGet$e(this, _EndpointStrategy_endpointMap, "f").delete(endpointId);
    }
}
strategy$1.EndpointStrategy = EndpointStrategy;
_EndpointStrategy_processAction = new WeakMap(), _EndpointStrategy_endpointMap = new WeakMap(), _EndpointStrategy_connected = new WeakMap();

Object.defineProperty(strategy$2, "__esModule", { value: true });
strategy$2.RTCInfo = strategy$2.RTCStrategy = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable class-methods-use-this */
const endpoint_1 = endpoint;
const strategy_1$1 = strategy$1;
/*
This is used to abstract out rtc messaging from the channels implementation using RTCEndpoints.
*/
class RTCStrategy extends strategy_1$1.EndpointStrategy {
    constructor() {
        super(endpoint_1.RTCEndpoint, endpoint_1.RTCEndpoint.isValidEndpointPayload, 'RTC');
    }
}
strategy$2.RTCStrategy = RTCStrategy;
strategy$2.RTCInfo = { version: 2, minimumVersion: 0, type: 'rtc' };

var iceManager = {};

Object.defineProperty(iceManager, "__esModule", { value: true });
iceManager.RTCICEManager = void 0;
const base_1$k = base;
/*
Singleton that facilitates Offer and Answer exchange required for establishing RTC connections.
*/
class RTCICEManager extends base_1$k.EmitterBase {
    constructor(wire) {
        super(wire, 'channel');
        this.ensureChannelOpened = (channel) => {
            return new Promise((resolve, reject) => {
                if (channel.readyState === 'open') {
                    resolve();
                }
                else if (channel.readyState === 'connecting') {
                    const listener = () => {
                        channel.removeEventListener('open', listener);
                        resolve();
                    };
                    channel.addEventListener('open', listener);
                }
                else {
                    reject(new Error('This Channel has already closed'));
                }
            });
        };
    }
    static createDataChannelPromise(label, rtcClient) {
        let resolver;
        const promise = new Promise((resolve) => {
            resolver = resolve;
        });
        const listener = (e) => {
            const openListener = () => {
                e.channel.removeEventListener('open', openListener);
                resolver(e.channel);
            };
            if (e.channel.label === label) {
                e.channel.addEventListener('open', openListener);
                rtcClient.removeEventListener('datachannel', listener);
            }
        };
        rtcClient.addEventListener('datachannel', listener);
        return promise;
    }
    async listenForProviderIce(rtcConnectionId, listener) {
        await this.on(this.createProviderEventName(rtcConnectionId), listener, { timestamp: Date.now() });
    }
    async raiseProviderIce(rtcConnectionId, payload) {
        await this.wire.environment.raiseEvent(this.createRouteString(this.createProviderEventName(rtcConnectionId)), payload);
    }
    async listenForClientIce(rtcConnectionId, listener) {
        await this.on(this.createClientEventName(rtcConnectionId), listener, { timestamp: Date.now() });
    }
    async raiseClientIce(rtcConnectionId, payload) {
        await this.wire.environment.raiseEvent(this.createRouteString(this.createClientEventName(rtcConnectionId)), payload);
    }
    cleanupIceListeners(rtcConnectionId) {
        this.removeAllListeners(this.createClientEventName(rtcConnectionId));
        this.removeAllListeners(this.createProviderEventName(rtcConnectionId));
    }
    createClientEventName(rtcConnectionId) {
        return `ice-client-${rtcConnectionId}`;
    }
    createProviderEventName(rtcConnectionId) {
        return `ice-provider-${rtcConnectionId}`;
    }
    createRouteString(name) {
        return `channel/${name}`;
    }
    createRtcPeer() {
        return this.wire.environment.getRtcPeer();
    }
    async startClientOffer() {
        // TODO replace with real guid.
        const rtcConnectionId = Math.random().toString();
        const rtcClient = this.createRtcPeer();
        rtcClient.addEventListener('icecandidate', async (e) => {
            if (e.candidate) {
                await this.raiseClientIce(rtcConnectionId, { candidate: e.candidate?.toJSON() });
            }
        });
        await this.listenForProviderIce(rtcConnectionId, async (payload) => {
            await rtcClient.addIceCandidate(payload.candidate);
        });
        const channels = {
            request: rtcClient.createDataChannel('request'),
            response: rtcClient.createDataChannel('response')
        };
        const offer = await rtcClient.createOffer();
        await rtcClient.setLocalDescription(offer);
        const channelsOpened = Promise.all([channels.request, channels.response].map(this.ensureChannelOpened)).then(() => undefined);
        return { rtcClient, channels, offer, rtcConnectionId, channelsOpened };
    }
    async finishClientOffer(rtcClient, answer, providerReady) {
        await rtcClient.setRemoteDescription(answer);
        await providerReady;
        return true;
    }
    async createProviderAnswer(rtcConnectionId, offer) {
        const rtcClient = this.createRtcPeer();
        const requestChannelPromise = RTCICEManager.createDataChannelPromise('request', rtcClient);
        const responseChannelPromise = RTCICEManager.createDataChannelPromise('response', rtcClient);
        rtcClient.addEventListener('icecandidate', async (e) => {
            if (e.candidate) {
                await this.raiseProviderIce(rtcConnectionId, { candidate: e.candidate?.toJSON() });
            }
        });
        await this.listenForClientIce(rtcConnectionId, async (payload) => {
            await rtcClient.addIceCandidate(payload.candidate);
        });
        await rtcClient.setRemoteDescription(offer);
        const answer = await rtcClient.createAnswer();
        await rtcClient.setLocalDescription(answer);
        const channels = Promise.all([requestChannelPromise, responseChannelPromise]).then(([request, response]) => {
            // Clean up ice events.
            this.cleanupIceListeners(rtcConnectionId);
            return { request, response };
        });
        return {
            rtcClient,
            answer,
            channels
        };
    }
}
iceManager.RTCICEManager = RTCICEManager;

var provider = {};

var runtimeVersioning = {};

Object.defineProperty(runtimeVersioning, "__esModule", { value: true });
runtimeVersioning.runtimeUuidMeetsMinimumRuntimeVersion = runtimeVersioning.parseRuntimeUuid = runtimeVersioning.meetsMinimumRuntimeVersion = void 0;
function vNum(x) {
    return [...x.split('.').reverse().entries()].reduce((p, [i, v]) => p + +v * 10000 ** i, 0);
}
/*
  Compares runtime versions to see if the current runtime meets your desired minimum.
*/
function meetsMinimumRuntimeVersion(currentVersion, minVersion) {
    const currentVersionParsed = vNum(currentVersion);
    const minVersionParsed = vNum(minVersion);
    return currentVersionParsed >= minVersionParsed;
}
runtimeVersioning.meetsMinimumRuntimeVersion = meetsMinimumRuntimeVersion;
// Strips the port info from the runtimeUuid, leaving just the runtime version.
function parseRuntimeUuid(runtimeUuid) {
    return runtimeUuid.split('/')[0];
}
runtimeVersioning.parseRuntimeUuid = parseRuntimeUuid;
function runtimeUuidMeetsMinimumRuntimeVersion(runtimeUuid, minVersion) {
    const runtimeVersion = parseRuntimeUuid(runtimeUuid);
    return meetsMinimumRuntimeVersion(runtimeVersion, minVersion);
}
runtimeVersioning.runtimeUuidMeetsMinimumRuntimeVersion = runtimeUuidMeetsMinimumRuntimeVersion;

var __classPrivateFieldGet$d = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$c = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ChannelProvider_connections, _ChannelProvider_protectedObj, _ChannelProvider_strategy, _ChannelProvider_removeEndpoint, _ChannelProvider_close;
Object.defineProperty(provider, "__esModule", { value: true });
provider.ChannelProvider = void 0;
const transport_errors_1$1 = transportErrors;
const runtimeVersioning_1 = runtimeVersioning;
const channel_1 = channel;
const channel_error_1 = channelError;
/**
 * Instance created to enable use of a channel as a provider. Allows for communication with the {@link ChannelClient ChannelClients} by invoking an action on
 * a single client via {@link ChannelProvider#dispatch dispatch} or all clients via {@link ChannelProvider#publish publish}
 * and to listen for communication from clients by registering an action via {@link ChannelProvider#register register}.
 *
 * ### Synchronous Methods:
 *  * {@link ChannelProvider#onConnection onConnection(listener)}
 *  * {@link ChannelProvider#onDisconnection onDisconnection(listener)}
 *  * {@link ChannelProvider#publish publish(action, payload)}
 *  * {@link ChannelProvider#register register(action, listener)}
 *  * {@link ChannelProvider#remove remove(action)}
 *
 * ### Asynchronous Methods:
 *  * {@link ChannelProvider#destroy destroy()}
 *  * {@link ChannelProvider#dispatch dispatch(to, action, payload)}
 *  * {@link ChannelProvider#getAllClientInfo getAllClientInfo()}
 *
 * ### Middleware:
 * Middleware functions receive the following arguments: (action, payload, senderId).
 * The return value of the middleware function will be passed on as the payload from beforeAction, to the action listener, to afterAction
 * unless it is undefined, in which case the most recently defined payload is used.  Middleware can be used for side effects.
 *  * {@link ChannelProvider#setDefaultAction setDefaultAction(middleware)}
 *  * {@link ChannelProvider#onError onError(middleware)}
 *  * {@link ChannelProvider#beforeAction beforeAction(middleware)}
 *  * {@link ChannelProvider#afterAction afterAction(middleware)}
 */
class ChannelProvider extends channel_1.ChannelBase {
    /**
     * a read-only array containing all the identities of connecting clients.
     */
    get connections() {
        return [...__classPrivateFieldGet$d(this, _ChannelProvider_connections, "f")];
    }
    static handleClientDisconnection(channel, payload) {
        if (payload?.endpointId) {
            const { uuid, name, endpointId, isLocalEndpointId } = payload;
            __classPrivateFieldGet$d(channel, _ChannelProvider_removeEndpoint, "f").call(channel, { uuid, name, endpointId, isLocalEndpointId });
        }
        else {
            // this is here to support older runtimes that did not have endpointId
            const multipleRemoves = channel.connections.filter((identity) => {
                return identity.uuid === payload.uuid && identity.name === payload.name;
            });
            multipleRemoves.forEach(__classPrivateFieldGet$d(channel, _ChannelProvider_removeEndpoint, "f"));
        }
        channel.disconnectListener(payload);
    }
    static setProviderRemoval(provider, remove) {
        ChannelProvider.removalMap.set(provider, remove);
    }
    /**
     * @internal
     */
    constructor(providerIdentity, close, strategy) {
        super();
        _ChannelProvider_connections.set(this, void 0);
        _ChannelProvider_protectedObj.set(this, void 0);
        _ChannelProvider_strategy.set(this, void 0);
        _ChannelProvider_removeEndpoint.set(this, (identity) => {
            const remainingConnections = this.connections.filter((clientIdentity) => clientIdentity.endpointId !== identity.endpointId);
            __classPrivateFieldGet$d(this, _ChannelProvider_strategy, "f").closeEndpoint(identity.endpointId);
            __classPrivateFieldSet$c(this, _ChannelProvider_connections, remainingConnections, "f");
        });
        // Must be bound.
        this.processAction = async (action, payload, senderIdentity) => {
            if (ChannelProvider.clientIsMultiRuntime(senderIdentity) &&
                !(0, runtimeVersioning_1.runtimeUuidMeetsMinimumRuntimeVersion)(senderIdentity.runtimeUuid, '18.87.56.0')) {
                this.handleMultiRuntimeLegacyClient(senderIdentity);
            }
            else {
                this.checkForClientConnection(senderIdentity);
            }
            return super.processAction(action, payload, senderIdentity);
        };
        _ChannelProvider_close.set(this, () => {
            __classPrivateFieldGet$d(this, _ChannelProvider_strategy, "f").close();
            const remove = ChannelProvider.removalMap.get(this);
            if (remove) {
                remove();
            }
        });
        __classPrivateFieldSet$c(this, _ChannelProvider_protectedObj, new channel_1.ProtectedItems(providerIdentity, close), "f");
        this.connectListener = () => undefined;
        this.disconnectListener = () => undefined;
        __classPrivateFieldSet$c(this, _ChannelProvider_connections, [], "f");
        __classPrivateFieldSet$c(this, _ChannelProvider_strategy, strategy, "f");
        strategy.receive(this.processAction);
    }
    /**
     * Dispatch an action to a specified client. Returns a promise for the result of executing that action on the client side.
     *
     * @param to - Identity of the target client.
     * @param action - Name of the action to be invoked by the client.
     * @param payload - Payload to be sent along with the action.
     *
     * @remarks
     *
     * Because multiple clients can share the same `name` and `uuid`, when dispatching from a provider to a client,
     * the `identity` you provide must include the client's unique `endpointId` property. This `endpointId` is
     * passed to the provider in both the `Provider.onConnection` callback and in any registered action callbacks.
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.register('provider-action', async (payload, identity) => {
     *         console.log(payload, identity);
     *         return await provider.dispatch(identity, 'client-action', 'Hello, World!');
     *     });
     * })();
     * ```
     */
    dispatch(to, action, payload) {
        const endpointId = to.endpointId ?? this.getEndpointIdForOpenFinId(to, action);
        if (endpointId && __classPrivateFieldGet$d(this, _ChannelProvider_strategy, "f").isEndpointConnected(endpointId)) {
            const callSites = transport_errors_1$1.RuntimeError.getCallSite();
            return __classPrivateFieldGet$d(this, _ChannelProvider_strategy, "f").send(endpointId, action, payload).catch((e) => {
                throw new channel_error_1.ChannelError(e, action, payload, callSites);
            });
        }
        return Promise.reject(new Error(`Client connection with identity uuid: ${to.uuid} / name: ${to.name} / endpointId: ${endpointId} no longer connected.`));
    }
    async processConnection(senderId, payload) {
        __classPrivateFieldGet$d(this, _ChannelProvider_connections, "f").push(senderId);
        return this.connectListener(senderId, payload);
    }
    /**
     * Publish an action and payload to every connected client.
     * Synchronously returns an array of promises for each action (see dispatch).
     *
     * @param action
     * @param payload
     *
     * @example
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.register('provider-action', async (payload, identity) => {
     *         console.log(payload, identity);
     *         return await Promise.all(provider.publish('client-action', { message: 'Broadcast from provider'}));
     *     });
     * })();
     * ```
     */
    publish(action, payload) {
        return this.connections.map((to) => __classPrivateFieldGet$d(this, _ChannelProvider_strategy, "f").send(to.endpointId, action, payload));
    }
    /**
     * Register a listener that is called on every new client connection.
     *
     * @remarks It is passed the identity of the connecting client and a payload if it was provided to Channel.connect.
     * If you wish to reject the connection, throw an error. Be sure to synchronously provide an onConnection upon receipt of
     * the channelProvider to ensure all potential client connections are caught by the listener.
     *
     * Because multiple clients can exist at the same `name` and `uuid`, in order to distinguish between individual clients,
     * the `identity` argument in a provider's `onConnection` callback contains an `endpointId` property. When dispatching from a
     * provider to a client, the `endpointId` property must be provided in order to send an action to a specific client.
     *
     * @example
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     provider.onConnection(identity => {
     *         console.log('Client connected', identity);
     *     });
     * })();
     * ```
     *
     * Reject connection:
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     provider.onConnection(identity => {
     *         throw new Error('Connection Rejected');
     *     });
     * })();
     * ```
     * @param listener
     */
    onConnection(listener) {
        this.connectListener = listener;
    }
    /**
     * Register a listener that is called on client disconnection. It is passed the disconnection event of the disconnecting
     * client.
     *
     * @param listener
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.onDisconnection(evt => {
     *         console.log('Client disconnected', `uuid: ${evt.uuid}, name: ${evt.name}`);
     *     });
     * })();
     * ```
     */
    onDisconnection(listener) {
        this.disconnectListener = listener;
    }
    /**
     * Destroy the channel, raises `disconnected` events on all connected channel clients.
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *     const provider = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *     await provider.destroy();
     * })();
     * ```
     */
    async destroy() {
        const protectedObj = __classPrivateFieldGet$d(this, _ChannelProvider_protectedObj, "f");
        protectedObj.providerIdentity;
        __classPrivateFieldSet$c(this, _ChannelProvider_connections, [], "f");
        await protectedObj.close();
        __classPrivateFieldGet$d(this, _ChannelProvider_close, "f").call(this);
    }
    /**
     * Returns an array with info on every Client connected to the Provider
     *
     * @example
     *
     * ```js
     * const provider = await fin.InterApplicationBus.Channel.create('openfin');
     * const client = await fin.InterApplicationBus.Channel.connect('openfin');
     * const clientInfo = await provider.getAllClientInfo();
     *
     * console.log(clientInfo);
     *
     * // [
     * //    {
     * //        "uuid": "openfin",
     * //        "name": "openfin-view",
     * //        "endpointId": "6d4c7ca8-4a74-4634-87f8-760558229613",
     * //        "entityType": "view",
     * //        "url": "https://openfin.co"
     * //    },
     * //    {
     * //        "uuid": "openfin2",
     * //        "name": "openfin-view2",
     * //        "endpointId": "4z5d8ab9-2b81-3691-91ex-142179382511",
     * //        "entityType": "view",
     * //        "url": "https://example.com"
     * //    }
     * //]
     * ```
     */
    async getAllClientInfo() {
        return this.connections.map((clientInfo) => {
            const { uuid, name, endpointId, entityType, connectionUrl } = clientInfo;
            return { uuid, name, endpointId, entityType, connectionUrl };
        });
    }
    checkForClientConnection(clientIdentity) {
        if (!this.isClientConnected(clientIdentity)) {
            throw new Error(`This action was sent from a client that is not connected to the provider.
                    Client Identity: {uuid: ${clientIdentity.uuid}, name: ${clientIdentity.name}, endpointId: ${clientIdentity.endpointId}}`);
        }
    }
    isClientConnected(clientIdentity) {
        if (ChannelProvider.clientIdentityIncludesEndpointId(clientIdentity)) {
            return this.connections.some((identity) => {
                return (
                // Might be redundant to check for uuid and name here after we get an endpointId match, but just in case
                identity.endpointId === clientIdentity.endpointId &&
                    identity.uuid === clientIdentity.uuid &&
                    identity.name === clientIdentity.name);
            });
        }
        return this.isLegacyClientConnected(clientIdentity);
    }
    isLegacyClientConnected(clientIdentity) {
        return this.connections.some((identity) => {
            return identity.uuid === clientIdentity.uuid && identity.name === clientIdentity.name;
        });
    }
    handleMultiRuntimeLegacyClient(senderIdentity) {
        if (!this.isLegacyClientConnected(senderIdentity)) {
            throw new Error(`This action was sent from a client that is not connected to the provider. Client Identity:
                    {uuid: ${senderIdentity.uuid}, name: ${senderIdentity.name}, endpointId: ${senderIdentity.endpointId}}`);
        }
    }
    getEndpointIdForOpenFinId(clientIdentity, action) {
        const matchingConnections = this.connections.filter((c) => c.name === clientIdentity.name && c.uuid === clientIdentity.uuid);
        if (matchingConnections.length >= 2) {
            const protectedObj = __classPrivateFieldGet$d(this, _ChannelProvider_protectedObj, "f");
            const { uuid, name } = clientIdentity;
            const providerUuid = protectedObj?.providerIdentity.uuid;
            const providerName = protectedObj?.providerIdentity.name;
            // eslint-disable-next-line no-console
            console.warn(`WARNING: Dispatch call may have unintended results. The "to" argument of your dispatch call is missing the
                "endpointId" parameter. The identity you are dispatching to ({uuid: ${uuid}, name: ${name}})
                has multiple channelClients for this channel. Your dispatched action: (${action}) from the provider:
                ({uuid: ${providerUuid}, name: ${providerName}}) will only be processed by the most recently-created client.`);
        }
        // Pop to return the most recently created endpointId.
        return matchingConnections.pop()?.endpointId;
    }
    // eslint-disable-next-line class-methods-use-this
    static clientIdentityIncludesEndpointId(subscriptionIdentity) {
        return subscriptionIdentity.endpointId !== undefined;
    }
    // eslint-disable-next-line class-methods-use-this
    static clientIsMultiRuntime(subscriptionIdentity) {
        return subscriptionIdentity.runtimeUuid !== undefined;
    }
    static async wireClose(wire, channelName) {
        await wire.sendAction('destroy-channel', { channelName });
    }
}
provider.ChannelProvider = ChannelProvider;
_ChannelProvider_connections = new WeakMap(), _ChannelProvider_protectedObj = new WeakMap(), _ChannelProvider_strategy = new WeakMap(), _ChannelProvider_removeEndpoint = new WeakMap(), _ChannelProvider_close = new WeakMap();
// The following line should be changed following a typescript update.
// static #removalMap = new WeakMap<ChannelProvider, Function>();
ChannelProvider.removalMap = new WeakMap();

var messageReceiver = {};

Object.defineProperty(messageReceiver, "__esModule", { value: true });
messageReceiver.MessageReceiver = void 0;
const client_1$1 = client;
const base_1$j = base;
const errors_1$1 = errors;
/*
This is a singleton (per fin object) tasked with routing messages coming off the ipc to the correct endpoint.
It needs to be a singleton because there can only be one per wire. It tracks both clients and providers' processAction passed in via the strategy.
If functionality is not about receiving messages, it does not belong here.
*/
class MessageReceiver extends base_1$j.Base {
    constructor(wire) {
        super(wire);
        this.onmessage = (msg) => {
            if (msg.action === 'process-channel-message') {
                this.processChannelMessage(msg);
                return true;
            }
            return false;
        };
        this.endpointMap = new Map();
        this.latestEndpointIdByChannelId = new Map();
        wire.registerMessageHandler(this.onmessage.bind(this));
    }
    async processChannelMessage(msg) {
        const { senderIdentity, providerIdentity, action, ackToSender, payload, intendedTargetIdentity } = msg.payload;
        const key = intendedTargetIdentity.channelId ?? // The recipient is a provider
            intendedTargetIdentity.endpointId ?? // The recipient is a client
            this.latestEndpointIdByChannelId.get(providerIdentity.channelId); // No endpointId was passed, make best attempt
        const handler = this.endpointMap.get(key);
        if (!handler) {
            ackToSender.payload.success = false;
            ackToSender.payload.reason = `Client connection with identity uuid: ${this.wire.me.uuid} / name: ${this.wire.me.name} / endpointId: ${key} no longer connected.`;
            ackToSender.payload.error = (0, errors_1$1.errorToPOJO)(new Error(ackToSender.payload.reason));
            return this.wire.sendRaw(ackToSender);
        }
        try {
            const res = await handler(action, payload, senderIdentity);
            ackToSender.payload.payload = ackToSender.payload.payload || {};
            ackToSender.payload.payload.result = res;
            return this.wire.sendRaw(ackToSender);
        }
        catch (e) {
            ackToSender.payload.success = false;
            ackToSender.payload.reason = e.message;
            ackToSender.payload.error = (0, errors_1$1.errorToPOJO)(e);
            return this.wire.sendRaw(ackToSender);
        }
    }
    addEndpoint(handler, channelId, endpointId) {
        this.endpointMap.set(endpointId, handler);
        // Providers have the same endpointId and channelId.
        // This is only used when clients are receiving messages from providers, so we shouldn't save provider endpointId here.
        if (channelId !== endpointId) {
            this.latestEndpointIdByChannelId.set(channelId, endpointId);
        }
    }
    removeEndpoint(channelId, endpointId) {
        this.endpointMap.delete(endpointId);
        if (this.latestEndpointIdByChannelId.get(channelId) === endpointId) {
            this.latestEndpointIdByChannelId.delete(channelId);
        }
    }
    checkForPreviousClientConnection(channelId) {
        const endpointIdFromPreviousConnection = this.latestEndpointIdByChannelId.get(channelId);
        if (endpointIdFromPreviousConnection) {
            // Not convinced by this way of doing things, but pushing up for now.
            client_1$1.ChannelClient.closeChannelByEndpointId(endpointIdFromPreviousConnection);
            // eslint-disable-next-line no-console
            console.warn('You have created a second connection to an older provider. First connection has been removed from the clientMap');
            // eslint-disable-next-line no-console
            console.warn('If the provider calls publish(), you may receive multiple messages.');
        }
    }
}
messageReceiver.MessageReceiver = MessageReceiver;

var protocolManager = {};

Object.defineProperty(protocolManager, "__esModule", { value: true });
protocolManager.ProtocolManager = void 0;
/*
This should be agnostic of any actual openfin code to be unit testable.
Dependencies on the actual srategies should be handled in ConnectionManager
*/
class ProtocolManager {
    // eslint-disable-next-line no-useless-constructor
    constructor(ProtocolsInPreferenceOrder) {
        this.ProtocolsInPreferenceOrder = ProtocolsInPreferenceOrder;
        this.DefaultClientProtocols = ['classic'];
        this.DefaultProviderProtocols = ['classic'];
        this.getClientProtocols = (protocols) => {
            const supported = protocols
                ? this.ProtocolsInPreferenceOrder.filter((x) => protocols.includes(x))
                : this.DefaultClientProtocols;
            if (!supported.length) {
                throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(', ')}.`);
            }
            return supported;
        };
        this.getProviderProtocols = (protocols) => {
            const supported = protocols
                ? this.ProtocolsInPreferenceOrder.filter((x) => protocols.includes(x))
                : this.DefaultProviderProtocols;
            if (!supported.length) {
                throw new Error(`No valid protocols were passed in. Accepted values are: ${this.ProtocolsInPreferenceOrder.join(', ')}.`);
            }
            return supported;
        };
        this.getCompatibleProtocols = (providerProtocols, clientOffer) => {
            const supported = clientOffer.supportedProtocols.filter((clientProtocol) => providerProtocols.some((providerProtocol) => providerProtocol.type === clientProtocol.type &&
                clientProtocol.version >= providerProtocol.minimumVersion &&
                providerProtocol.version >= (clientProtocol.minimumVersion ?? 0)));
            return supported.slice(0, clientOffer.maxProtocols);
        };
    }
}
protocolManager.ProtocolManager = ProtocolManager;

var strategy = {};

Object.defineProperty(strategy, "__esModule", { value: true });
class CombinedStrategy {
    // Making this a static method because the constructor can't be typed.
    // Otherwise it will error when calling addEndpoint but I'd rather the whole instance be typed as never.
    static combine(a, b) {
        return new CombinedStrategy(a, b);
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(primary, secondary) {
        this.primary = primary;
        this.secondary = secondary;
    }
    onEndpointDisconnect(endpointId, listener) {
        this.primary.onEndpointDisconnect(endpointId, () => {
            if (!this.secondary.isEndpointConnected(endpointId)) {
                listener();
            }
        });
        this.secondary.onEndpointDisconnect(endpointId, () => {
            if (!this.primary.isEndpointConnected(endpointId)) {
                listener();
            }
        });
    }
    isValidEndpointPayload(payload) {
        return this.primary.isValidEndpointPayload(payload) || this.secondary.isValidEndpointPayload(payload);
    }
    async closeEndpoint(endpointId) {
        await this.primary.closeEndpoint(endpointId);
        await this.secondary.closeEndpoint(endpointId);
    }
    isEndpointConnected(endpoint) {
        return this.primary.isEndpointConnected(endpoint) || this.secondary.isEndpointConnected(endpoint);
    }
    async addEndpoint(endpoint, payload) {
        if (this.primary.isValidEndpointPayload(payload)) {
            await this.primary.addEndpoint(endpoint, payload);
        }
        if (this.secondary.isValidEndpointPayload(payload)) {
            await this.secondary.addEndpoint(endpoint, payload);
        }
    }
    receive(listener) {
        this.primary.receive(listener);
        this.secondary.receive(listener);
    }
    send(endpointId, action, payload) {
        if (this.primary.isEndpointConnected(endpointId)) {
            return this.primary.send(endpointId, action, payload);
        }
        return this.secondary.send(endpointId, action, payload);
    }
    async close() {
        await Promise.all([this.primary.close(), this.secondary.close()]);
    }
}
strategy.default = CombinedStrategy;

var __classPrivateFieldSet$b = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$c = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault$5 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ConnectionManager_messageReceiver, _ConnectionManager_rtcConnectionManager;
Object.defineProperty(connectionManager, "__esModule", { value: true });
connectionManager.ConnectionManager = void 0;
const exhaustive_1 = exhaustive;
const base_1$i = base;
const strategy_1 = strategy$3;
const strategy_2 = strategy$2;
const ice_manager_1 = iceManager;
const provider_1$1 = provider;
const message_receiver_1 = messageReceiver;
const protocol_manager_1 = protocolManager;
const strategy_3 = __importDefault$5(strategy);
class ConnectionManager extends base_1$i.Base {
    static getProtocolOptionsFromStrings(protocols) {
        return protocols.map((protocol) => {
            switch (protocol) {
                case 'rtc':
                    return strategy_2.RTCInfo;
                case 'classic':
                    return strategy_1.ClassicInfo;
                default:
                    return (0, exhaustive_1.exhaustiveCheck)(protocol, ['rtc', 'classic']);
            }
        });
    }
    constructor(wire) {
        super(wire);
        _ConnectionManager_messageReceiver.set(this, void 0);
        _ConnectionManager_rtcConnectionManager.set(this, void 0);
        this.removeChannelFromProviderMap = (channelId) => {
            this.providerMap.delete(channelId);
        };
        this.onmessage = (msg) => {
            if (msg.action === 'process-channel-connection') {
                this.processChannelConnection(msg);
                return true;
            }
            return false;
        };
        this.providerMap = new Map();
        this.protocolManager = new protocol_manager_1.ProtocolManager(this.wire.environment.type === 'node' ? ['classic'] : ['rtc', 'classic']);
        __classPrivateFieldSet$b(this, _ConnectionManager_messageReceiver, new message_receiver_1.MessageReceiver(wire), "f");
        __classPrivateFieldSet$b(this, _ConnectionManager_rtcConnectionManager, new ice_manager_1.RTCICEManager(wire), "f");
        wire.registerMessageHandler(this.onmessage.bind(this));
    }
    createProvider(options, providerIdentity) {
        const opts = Object.assign(this.wire.environment.getDefaultChannelOptions().create, options || {});
        const protocols = this.protocolManager.getProviderProtocols(opts?.protocols);
        const createSingleStrategy = (stratType) => {
            switch (stratType) {
                case 'rtc':
                    return new strategy_2.RTCStrategy();
                case 'classic':
                    return new strategy_1.ClassicStrategy(this.wire, __classPrivateFieldGet$c(this, _ConnectionManager_messageReceiver, "f"), 
                    // Providers do not have an endpointId, use channelId as endpointId in the strategy.
                    providerIdentity.channelId, providerIdentity);
                default:
                    return (0, exhaustive_1.exhaustiveCheck)(stratType, ['rtc', 'classic']);
            }
        };
        const strategies = protocols.map(createSingleStrategy);
        let strategy;
        if (strategies.length === 2) {
            const [a, b] = strategies;
            strategy = strategy_3.default.combine(a, b);
        }
        else if (strategies.length === 1) {
            [strategy] = strategies;
        }
        else {
            // Should be impossible.
            throw new Error('failed to combine strategies');
        }
        const channel = new provider_1$1.ChannelProvider(providerIdentity, () => provider_1$1.ChannelProvider.wireClose(this.wire, providerIdentity.channelName), strategy);
        const key = providerIdentity.channelId;
        this.providerMap.set(key, {
            provider: channel,
            strategy,
            supportedProtocols: ConnectionManager.getProtocolOptionsFromStrings(protocols)
        });
        provider_1$1.ChannelProvider.setProviderRemoval(channel, this.removeChannelFromProviderMap.bind(this));
        return channel;
    }
    async createClientOffer(options) {
        const protocols = this.protocolManager.getClientProtocols(options?.protocols);
        let rtcPacket;
        const supportedProtocols = await Promise.all(protocols.map(async (type) => {
            switch (type) {
                case 'rtc': {
                    const { rtcClient, channels, offer, rtcConnectionId, channelsOpened } = await __classPrivateFieldGet$c(this, _ConnectionManager_rtcConnectionManager, "f").startClientOffer();
                    rtcPacket = { rtcClient, channels, channelsOpened };
                    return {
                        type: 'rtc',
                        version: strategy_2.RTCInfo.version,
                        payload: { offer, rtcConnectionId }
                    };
                }
                case 'classic':
                    return { type: 'classic', version: strategy_1.ClassicInfo.version };
                default:
                    return (0, exhaustive_1.exhaustiveCheck)(type, ['rtc', 'classic']);
            }
        }));
        return {
            offer: {
                supportedProtocols,
                maxProtocols: 2
            },
            rtc: rtcPacket
        };
    }
    async createClientStrategy(rtcPacket, routingInfo) {
        if (!routingInfo.endpointId) {
            routingInfo.endpointId = this.wire.environment.getNextMessageId();
            // For New Clients connecting to Old Providers. To prevent multi-dispatching and publishing, we delete previously-connected
            // clients that are in the same context as the newly-connected client.
            __classPrivateFieldGet$c(this, _ConnectionManager_messageReceiver, "f").checkForPreviousClientConnection(routingInfo.channelId);
        }
        const answer = routingInfo.answer ?? {
            supportedProtocols: [{ type: 'classic', version: 1 }]
        };
        const createStrategyFromAnswer = async (protocol) => {
            if (protocol.type === 'rtc' && rtcPacket) {
                await __classPrivateFieldGet$c(this, _ConnectionManager_rtcConnectionManager, "f").finishClientOffer(rtcPacket.rtcClient, protocol.payload.answer, rtcPacket.channelsOpened);
                return new strategy_2.RTCStrategy();
            }
            if (protocol.type === 'classic') {
                return new strategy_1.ClassicStrategy(this.wire, __classPrivateFieldGet$c(this, _ConnectionManager_messageReceiver, "f"), routingInfo.endpointId, routingInfo);
            }
            return null;
        };
        const allProtocols = (await Promise.all(answer.supportedProtocols.map(createStrategyFromAnswer))).filter((x) => x !== null);
        // Clean up logic if provider didn't support rtc.
        if (rtcPacket && !allProtocols.some((x) => x instanceof strategy_2.RTCStrategy)) {
            if (rtcPacket) {
                rtcPacket.rtcClient.close();
            }
        }
        let strategy;
        if (allProtocols.length >= 2) {
            strategy = strategy_3.default.combine(allProtocols[0], allProtocols[1]);
        }
        else if (allProtocols.length) {
            [strategy] = allProtocols;
        }
        else {
            // Should be impossible.
            throw new Error('No compatible protocols');
        }
        // as casting rtcPacket because we won't have an rtcStrategy if rtcPacket is undefined;
        const endpointPayload = { endpointIdentity: routingInfo, rtc: rtcPacket };
        strategy.addEndpoint(routingInfo.channelId, endpointPayload);
        return strategy;
    }
    async processChannelConnection(msg) {
        const { clientIdentity, providerIdentity, ackToSender, payload, offer: clientOffer } = msg.payload;
        if (!clientIdentity.endpointId) {
            // Should be polyfilled by core but not in cases of node connecting to an old runtime.
            clientIdentity.endpointId = this.wire.environment.getNextMessageId();
            clientIdentity.isLocalEndpointId = true;
        }
        else {
            clientIdentity.isLocalEndpointId = false;
        }
        const key = providerIdentity.channelId;
        const bus = this.providerMap.get(key);
        if (!bus) {
            ackToSender.payload.success = false;
            ackToSender.payload.reason = `Channel "${providerIdentity.channelName}" has been destroyed.`;
            return this.wire.sendRaw(ackToSender);
        }
        const { provider, strategy, supportedProtocols } = bus;
        try {
            if (!(provider instanceof provider_1$1.ChannelProvider)) {
                throw Error('Cannot connect to a channel client');
            }
            const offer = clientOffer ?? {
                supportedProtocols: [{ type: 'classic', version: 1 }],
                maxProtocols: 1
            };
            const overlappingProtocols = this.protocolManager.getCompatibleProtocols(supportedProtocols, offer);
            if (!overlappingProtocols.length) {
                throw new Error('This provider does not support any of the offered protocols.');
            }
            const res = await provider.processConnection(clientIdentity, payload);
            ackToSender.payload.payload = ackToSender.payload.payload || {};
            // Loop through all supported protocols and accumulate them into the answer
            // addEndpoint is tricky but we need to wait for channel resolution before adding the endpoint.
            let clientAnswer = {
                supportedProtocols: [],
                endpointPayloadPromise: Promise.resolve({ endpointIdentity: clientIdentity })
            };
            clientAnswer = await overlappingProtocols.reduce(async (accumP, protocolToUse) => {
                const answer = await accumP;
                if (protocolToUse.type === 'rtc') {
                    const { answer: rtcAnswer, rtcClient, channels } = await __classPrivateFieldGet$c(this, _ConnectionManager_rtcConnectionManager, "f").createProviderAnswer(protocolToUse.payload.rtcConnectionId, protocolToUse.payload.offer);
                    answer.supportedProtocols.push({
                        type: 'rtc',
                        version: strategy_2.RTCInfo.version,
                        payload: {
                            answer: rtcAnswer
                        }
                    });
                    answer.endpointPayloadPromise = answer.endpointPayloadPromise.then((endpointPayload) => channels.then((resolvedChannels) => {
                        return {
                            ...endpointPayload,
                            rtc: {
                                rtcClient,
                                channels: resolvedChannels
                            }
                        };
                    }));
                }
                else {
                    answer.supportedProtocols.push({ type: 'classic', version: strategy_1.ClassicInfo.version });
                }
                return answer;
            }, Promise.resolve(clientAnswer));
            // Need to as cast here.
            clientAnswer.endpointPayloadPromise.then((endpointPayload) => strategy.addEndpoint(clientIdentity.endpointId, endpointPayload));
            ackToSender.payload.payload.result = res;
            ackToSender.payload.payload.answer = clientAnswer;
            return this.wire.sendRaw(ackToSender);
        }
        catch (e) {
            ackToSender.payload.success = false;
            ackToSender.payload.reason = e.message;
            return this.wire.sendRaw(ackToSender);
        }
    }
}
connectionManager.ConnectionManager = ConnectionManager;
_ConnectionManager_messageReceiver = new WeakMap(), _ConnectionManager_rtcConnectionManager = new WeakMap();

/**
 * Entry points for the `Channel` subset of the `InterApplicationBus` API (`fin.InterApplicationBus.Channel`).
 *
 * * {@link Channel} contains static members of the `Channel` API, accessible through `fin.InterApplicationBus.Channel`.
 * * {@link OpenFin.ChannelClient} describes a client of a channel, e.g. as returned by `fin.InterApplicationBus.Channel.connect`.
 * * {@link OpenFin.ChannelProvider} describes a provider of a channel, e.g. as returned by `fin.InterApplicationBus.Channel.create`.
 *
 * @packageDocumentation
 */
var __classPrivateFieldSet$a = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$b = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Channel_connectionManager, _Channel_internalEmitter, _Channel_readyToConnect;
Object.defineProperty(channel$1, "__esModule", { value: true });
channel$1.Channel = void 0;
/* eslint-disable no-console */
const events_1$5 = require$$0;
const lazy_1$2 = lazy;
const base_1$h = base;
const client_1 = client;
const connection_manager_1 = connectionManager;
const provider_1 = provider;
function retryDelay(count) {
    const interval = 500; // base delay
    const steps = 10; // How many retries to do before incrementing the delay
    const base = 2; // How much to multiply the previous delay by
    const max = 30000; // max delay
    const step = Math.floor(count / steps);
    const delay = Math.min(max, interval * base ** step);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, delay);
    });
}
/**
 * The Channel API allows an OpenFin application to create a channel as a {@link ChannelProvider ChannelProvider},
 * or connect to a channel as a {@link ChannelClient ChannelClient}.
 * @remarks The "handshake" between the communication partners is
 * simplified when using a channel.  A request to connect to a channel as a client will return a promise that resolves if/when the channel has been created. Both the
 * provider and client can dispatch actions that have been registered on their opposites, and dispatch returns a promise that resolves with a payload from the other
 * communication participant. There can be only one provider per channel, but many clients.  Version `9.61.35.*` or later is required for both communication partners.
 *
 * Asynchronous Methods:
 *  * {@link Channel.create create(channelName, options)}
 *  * {@link Channel.connect connect(channelName, options)}
 *  * {@link Channel.onChannelConnect onChannelConnect(listener)}
 *  * {@link Channel.onChannelDisconnect onChannelDisconnect(listener)}
 */
class Channel extends base_1$h.EmitterBase {
    /**
     * @internal
     */
    constructor(wire) {
        super(wire, 'channel');
        _Channel_connectionManager.set(this, void 0);
        _Channel_internalEmitter.set(this, new events_1$5.EventEmitter());
        // OpenFin API has not been injected at construction time, *must* wait for API to be ready.
        _Channel_readyToConnect.set(this, new lazy_1$2.AsyncRetryableLazy(async () => {
            await Promise.all([
                this.on('disconnected', (eventPayload) => {
                    client_1.ChannelClient.handleProviderDisconnect(eventPayload);
                }),
                this.on('connected', (...args) => {
                    __classPrivateFieldGet$b(this, _Channel_internalEmitter, "f").emit('connected', ...args);
                })
            ]).catch(() => new Error('error setting up channel connection listeners'));
        }));
        __classPrivateFieldSet$a(this, _Channel_connectionManager, new connection_manager_1.ConnectionManager(wire), "f");
    }
    /**
     *
     * @internal
     */
    async getAllChannels() {
        return this.wire.sendAction('get-all-channels').then(({ payload }) => payload.data);
    }
    /**
     * Listens for channel connections.
     *
     * @param listener - callback to execute.
     *
     * @example
     *
     * ```js
     * const listener = (channelPayload) => console.log(channelPayload); // see return value below
     *
     * fin.InterApplicationBus.Channel.onChannelConnect(listener);
     *
     * // example shape
     * {
     *     "topic": "channel",
     *     "type": "connected",
     *     "uuid": "OpenfinPOC",
     *     "name": "OpenfinPOC",
     *     "channelName": "counter",
     *     "channelId": "OpenfinPOC/OpenfinPOC/counter"
     * }
     *
     * ```
     */
    async onChannelConnect(listener) {
        await this.on('connected', listener);
    }
    /**
     * Listen for channel disconnections.
     *
     * @param listener - callback to execute.
     *
     * @example
     *
     * ```js
     * const listener = (channelPayload) => console.log(channelPayload); // see return value below
     *
     * fin.InterApplicationBus.Channel.onChannelDisconnect(listener);
     *
     * // example shape
     * {
     *     "topic": "channel",
     *     "type": "disconnected",
     *     "uuid": "OpenfinPOC",
     *     "name": "OpenfinPOC",
     *     "channelName": "counter",
     *     "channelId": "OpenfinPOC/OpenfinPOC/counter"
     * }
     *
     * ```
     */
    async onChannelDisconnect(listener) {
        await this.on('disconnected', listener);
    }
    async safeConnect(channelName, shouldWait, connectPayload) {
        const retryInfo = { count: 0 };
        /* eslint-disable no-await-in-loop, no-constant-condition */
        do {
            // setup a listener and a connected promise to await in case we connect before the channel is ready
            let connectedListener = () => undefined;
            const connectedPromise = new Promise((resolve) => {
                connectedListener = (payload) => {
                    if (channelName === payload.channelName) {
                        resolve(true);
                    }
                };
                __classPrivateFieldGet$b(this, _Channel_internalEmitter, "f").on('connected', connectedListener);
            });
            try {
                if (retryInfo.count > 0) {
                    // Wait before retrying
                    // Delay returns false connectedPromise returns true so we can know if a retry is due to connected event
                    retryInfo.gotConnectedEvent = await Promise.race([retryDelay(retryInfo.count), connectedPromise]);
                    const result = await this.wire.sendAction('connect-to-channel', { ...connectPayload, retryInfo });
                    // log only if there was a retry
                    console.log(`Successfully connected to channelName: ${channelName}`);
                    return result.payload.data;
                }
                // Send retryInfo to the core for debug log inclusion
                const sentMessagePromise = this.wire.sendAction('connect-to-channel', connectPayload);
                // Save messageId from the first connection attempt
                retryInfo.originalMessageId = sentMessagePromise.messageId;
                const result = await sentMessagePromise;
                return result.payload.data;
            }
            catch (error) {
                if (!error.message.includes('internal-nack')) {
                    // Not an internal nack, break the loop
                    throw error;
                }
                if (shouldWait && retryInfo.count === 0) {
                    // start waiting on the next iteration, warn the user
                    console.warn(`No channel found for channelName: ${channelName}. Waiting for connection...`);
                }
            }
            finally {
                retryInfo.count += 1;
                // in case of other errors, remove our listener
                __classPrivateFieldGet$b(this, _Channel_internalEmitter, "f").removeListener('connected', connectedListener);
            }
        } while (shouldWait); // If we're waiting we retry the above loop
        // Should wait was false, no channel was found.
        throw new Error(`No channel found for channelName: ${channelName}.`);
        /* eslint-enable no-await-in-loop, no-constant-condition */
    }
    /**
     * Connect to a channel. If you wish to send a payload to the provider, add a payload property to the options argument.
     * EXPERIMENTAL: pass { protocols: ['rtc'] } as options to opt-in to High Throughput Channels.
     *
     * @param channelName - Name of the target channel.
     * @param options - Connection options.
     * @returns Returns a promise that resolves with an instance of {@link ChannelClient ChannelClient}.
     *
     * @remarks The connection request will be routed to the channelProvider if/when the channel is created.  If the connect
     * request is sent prior to creation, the promise will not resolve or reject until the channel is created by a channelProvider
     * (whether or not to wait for creation is configurable in the connectOptions).
     *
     * The connect call returns a promise that will resolve with a channelClient bus if accepted by the channelProvider, or reject if
     * the channelProvider throws an error to reject the connection. This bus can communicate with the Provider, but not to other
     * clients on the channel. Using the bus, the channelClient can register actions and middleware. Channel lifecycle can also be
     * handled with an onDisconnection listener.
     *
     * @example
     *
     * ```js
     * async function makeClient(channelName) {
     *    // A payload can be sent along with channel connection requests to help with authentication
     *    const connectPayload = { payload: 'token' };
     *
     *    // If the channel has been created this request will be sent to the provider.  If not, the
     *    // promise will not be resolved or rejected until the channel has been created.
     *    const clientBus = await fin.InterApplicationBus.Channel.connect(channelName, connectPayload);
     *
     *    clientBus.onDisconnection(channelInfo => {
     *        // handle the channel lifecycle here - we can connect again which will return a promise
     *        // that will resolve if/when the channel is re-created.
     *        makeClient(channelInfo.channelName);
     *    })
     *
     *    clientBus.register('topic', (payload, identity) => {
     *        // register a callback for a topic to which the channel provider can dispatch an action
     *        console.log('Action dispatched by provider: ', JSON.stringify(identity));
     *        console.log('Payload sent in dispatch: ', JSON.stringify(payload));
     *        return {
     *            echo: payload
     *        };
     *    });
     * }
     *
     * makeClient('channelName')
     * .then(() => console.log('Connected'))
     * .catch(console.error);
     * ```
     */
    async connect(channelName, options = {}) {
        // Make sure we don't connect before listeners are set up
        // This also errors if we're not in OpenFin, ensuring we don't run unnecessary code
        await __classPrivateFieldGet$b(this, _Channel_readyToConnect, "f").getValue();
        if (!channelName || typeof channelName !== 'string') {
            throw new Error('Please provide a channelName string to connect to a channel.');
        }
        const opts = { wait: true, ...this.wire.environment.getDefaultChannelOptions().connect, ...options };
        const { offer, rtc: rtcPacket } = await __classPrivateFieldGet$b(this, _Channel_connectionManager, "f").createClientOffer(opts);
        let connectionUrl;
        if (this.fin.me.isFrame || this.fin.me.isView || this.fin.me.isWindow) {
            connectionUrl = (await this.fin.me.getInfo()).url;
        }
        const connectPayload = {
            channelName,
            ...opts,
            offer,
            connectionUrl
        };
        const routingInfo = await this.safeConnect(channelName, opts.wait, connectPayload);
        const strategy = await __classPrivateFieldGet$b(this, _Channel_connectionManager, "f").createClientStrategy(rtcPacket, routingInfo);
        const channel = new client_1.ChannelClient(routingInfo, () => client_1.ChannelClient.wireClose(this.wire, routingInfo, routingInfo.endpointId), strategy);
        // It is the client's responsibility to handle endpoint disconnection to the provider.
        // If the endpoint dies, the client will force a disconnection through the core.
        // The provider does not care about endpoint disconnection.
        strategy.onEndpointDisconnect(routingInfo.channelId, async () => {
            try {
                await channel.sendDisconnectAction();
            }
            catch (error) {
                console.warn(`Something went wrong during disconnect for client with uuid: ${routingInfo.uuid} / name: ${routingInfo.name} / endpointId: ${routingInfo.endpointId}.`);
            }
            finally {
                client_1.ChannelClient.handleProviderDisconnect(routingInfo);
            }
        });
        return channel;
    }
    /**
     * Create a new channel.
     * You must provide a unique channelName. If a channelName is not provided, or it is not unique, the creation will fail.
     * EXPERIMENTAL: pass { protocols: ['rtc'] } as options to opt-in to High Throughput Channels.
     *
     * @param channelName - Name of the channel to be created.
     * @param options - Creation options.
     * @returns Returns a promise that resolves with an instance of {@link ChannelProvider ChannelProvider}.
     *
     * @remarks If successful, the create method returns a promise that resolves to an instance of the channelProvider bus. The caller
     * then becomes the “channel provider” and can use the channelProvider bus to register actions and middleware.
     *
     * The caller can also set an onConnection and/or onDisconnection listener that will execute on any new channel
     * connection/disconnection attempt from a channel client. To reject a connection, simply throw an error in the
     * onConnection listener.  The default behavior is to accept all new connections.
     *
     * A map of client connections is updated automatically on client connection and disconnection and saved in the
     * [read-only] `connections` property on the channelProvider bus.  The channel will exist until the provider
     * destroys it or disconnects by closing or destroying the context (navigating or reloading). To setup a channel
     * as a channelProvider, call `Channel.create` with a unique channel name. A map of client connections is updated
     * automatically on client connection and disconnection.
     *
     * @example
     *
     * ```js
     * (async ()=> {
     *    // entity creates a channel and becomes the channelProvider
     *    const providerBus = await fin.InterApplicationBus.Channel.create('channelName');
     *
     *    providerBus.onConnection((identity, payload) => {
     *        // can reject a connection here by throwing an error
     *        console.log('Client connection request identity: ', JSON.stringify(identity));
     *        console.log('Client connection request payload: ', JSON.stringify(payload));
     *    });
     *
     *    providerBus.register('topic', (payload, identity) => {
     *        // register a callback for a 'topic' to which clients can dispatch an action
     *        console.log('Action dispatched by client: ', JSON.stringify(identity));
     *        console.log('Payload sent in dispatch: ', JSON.stringify(payload));
     *        return {
     *            echo: payload
     *        };
     *    });
     * })();
     * ```
     */
    async create(channelName, options) {
        if (!channelName) {
            throw new Error('Please provide a channelName to create a channel');
        }
        const { payload: { data: providerIdentity } } = await this.wire.sendAction('create-channel', { channelName });
        const channel = __classPrivateFieldGet$b(this, _Channel_connectionManager, "f").createProvider(options, providerIdentity);
        // TODO: fix typing (internal)
        // @ts-expect-error
        this.on('client-disconnected', (eventPayload) => {
            if (eventPayload.channelName === channelName) {
                provider_1.ChannelProvider.handleClientDisconnection(channel, eventPayload);
            }
        });
        return channel;
    }
}
channel$1.Channel = Channel;
_Channel_connectionManager = new WeakMap(), _Channel_internalEmitter = new WeakMap(), _Channel_readyToConnect = new WeakMap();

Object.defineProperty(interappbus, "__esModule", { value: true });
interappbus.InterAppPayload = interappbus.InterApplicationBus = void 0;
/**
 * Entry point for the OpenFin `InterApplicationBus` API (`fin.InterApplicationBus`).
 *
 * * {@link InterApplicationBus} contains static members of the `InterApplicationBus` API, accessible through `fin.InterApplicationBus`.
 *
 * @packageDocumentation
 */
const events_1$4 = require$$0;
const base_1$g = base;
const ref_counter_1 = refCounter;
const index_1$2 = channel$1;
const validate_1$3 = validate;
/**
 * A messaging bus that allows for pub/sub messaging between different applications.
 *
 */
class InterApplicationBus extends base_1$g.Base {
    /**
     * @internal
     */
    constructor(wire) {
        super(wire);
        this.events = {
            subscriberAdded: 'subscriber-added',
            subscriberRemoved: 'subscriber-removed'
        };
        this.refCounter = new ref_counter_1.RefCounter();
        this.Channel = new index_1$2.Channel(wire);
        this.emitter = new events_1$4.EventEmitter();
        wire.registerMessageHandler(this.onmessage.bind(this));
        this.on = this.emitter.on.bind(this.emitter);
        this.removeAllListeners = this.emitter.removeAllListeners.bind(this.emitter);
    }
    /**
     * Publishes a message to all applications running on OpenFin Runtime that
     * are subscribed to the specified topic.
     * @param topic The topic on which the message is sent
     * @param message The message to be published. Can be either a primitive
     * data type (string, number, or boolean) or composite data type (object, array)
     * that is composed of other primitive or composite data types
     *
     * @example
     * ```js
     * fin.InterApplicationBus.publish('topic', 'hello').then(() => console.log('Published')).catch(err => console.log(err));
     * ```
     */
    async publish(topic, message) {
        await this.wire.sendAction('publish-message', {
            topic,
            message,
            sourceWindowName: this.me.name
        });
    }
    /**
     * Sends a message to a specific application on a specific topic.
     * @param destination The identity of the application to which the message is sent
     * @param topic The topic on which the message is sent
     * @param message The message to be sent. Can be either a primitive data
     * type (string, number, or boolean) or composite data type (object, array) that
     * is composed of other primitive or composite data types
     *
     * @example
     * ```js
     * fin.InterApplicationBus.send(fin.me, 'topic', 'Hello there!').then(() => console.log('Message sent')).catch(err => console.log(err));
     * ```
     */
    async send(destination, topic, message) {
        const errorMsg = (0, validate_1$3.validateIdentity)(destination);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        await this.wire.sendAction('send-message', {
            destinationUuid: destination.uuid,
            destinationWindowName: destination.name,
            topic,
            message,
            sourceWindowName: this.me.name
        });
    }
    /**
     * Subscribes to messages from the specified application on the specified topic.
     * @param source This object is described in the Identity in the typedef
     * @param topic The topic on which the message is sent
     * @param listener A function that is called when a message has
     * been received. It is passed the message, uuid and name of the sending application.
     * The message can be either a primitive data type (string, number, or boolean) or
     * composite data type (object, array) that is composed of other primitive or composite
     * data types
     *
     * @example
     * ```js
     * // subscribe to a specified application
     * fin.InterApplicationBus.subscribe(fin.me, 'topic', sub_msg => console.log(sub_msg)).then(() => console.log('Subscribed to the specified application')).catch(err => console.log(err));
     *
     * // subscribe to wildcard
     * fin.InterApplicationBus.subscribe({ uuid: '*' }, 'topic', sub_msg => console.log(sub_msg)).then(() => console.log('Subscribed to *')).catch(err => console.log(err));
     * ```
     */
    subscribe(source, topic, listener) {
        const subKey = this.createSubscriptionKey(source.uuid, source.name || '*', topic);
        const sendSubscription = async () => {
            await this.wire.sendAction('subscribe', {
                sourceUuid: source.uuid,
                sourceWindowName: source.name || '*',
                topic,
                destinationWindowName: this.me.name
            });
        };
        const alreadySubscribed = () => {
            return Promise.resolve();
        };
        this.emitter.on(subKey, listener);
        return this.refCounter.actOnFirst(subKey, sendSubscription, alreadySubscribed);
    }
    /**
     * Unsubscribes to messages from the specified application on the specified topic.
     *
     * @remarks If you are listening to all apps on a topic, (i.e you passed `{ uuid:'*' }` to the subscribe function)
     * then you need to pass `{ uuid:'*' }` to unsubscribe as well. If you are listening to a specific application,
     * (i.e you passed `{ uuid:'some_app' }` to the subscribe function) then you need to provide the same identifier to
     * unsubscribe, unsubscribing to `*` on that same topic will not unhook your initial listener otherwise.
     *
     * @param source This object is described in the Identity in the typedef
     * @param topic The topic on which the message is sent
     * @param listener A callback previously registered with subscribe()
     *
     * @example
     * ```js
     * const listener = console.log;
     *
     * // If any application publishes a message on topic `foo`, our listener will be called.
     * await fin.InterApplicationBus.subscribe({ uuid:'*' }, 'foo', listener)
     *
     * // When you want to unsubscribe, you need to specify the uuid of the app you'd like to
     * // unsubscribe from (or `*`) and provide the same function you gave the subscribe function
     * await fin.InterApplicationBus.unsubscribe({ uuid:'*' }, 'foo', listener)
     * ```
     */
    unsubscribe(source, topic, listener) {
        const sourceWindowName = source.name || '*';
        const subKey = this.createSubscriptionKey(source.uuid, sourceWindowName, topic);
        const sendUnsubscription = async () => {
            await this.wire.sendAction('unsubscribe', {
                sourceUuid: source.uuid,
                sourceWindowName,
                topic,
                destinationWindowName: this.me.name
            });
        };
        const dontSendUnsubscription = () => {
            return new Promise((r) => r).then(() => undefined);
        };
        this.emitter.removeListener(subKey, listener);
        return this.refCounter.actOnLast(subKey, sendUnsubscription, dontSendUnsubscription);
    }
    processMessage(message) {
        const { payload: { message: payloadMessage, sourceWindowName, sourceUuid, topic } } = message;
        const keys = [
            this.createSubscriptionKey(sourceUuid, sourceWindowName, topic),
            this.createSubscriptionKey(sourceUuid, '*', topic),
            this.createSubscriptionKey('*', '*', topic)
        ];
        const idOfSender = { uuid: sourceUuid, name: sourceWindowName };
        keys.forEach((key) => {
            this.emitter.emit(key, payloadMessage, idOfSender);
        });
    }
    emitSubscriverEvent(type, message) {
        const { payload: { targetName: name, uuid, topic } } = message;
        const payload = { name, uuid, topic };
        this.emitter.emit(type, payload);
    }
    // eslint-disable-next-line class-methods-use-this
    createSubscriptionKey(uuid, name, topic) {
        const n = name || '*';
        if (!(uuid && n && topic)) {
            throw new Error('Missing uuid, name, or topic string');
        }
        return createKey(uuid, n, topic);
    }
    onmessage(message) {
        const { action } = message;
        switch (action) {
            case 'process-message':
                this.processMessage(message);
                break;
            case this.events.subscriberAdded:
                this.emitSubscriverEvent(this.events.subscriberAdded, message);
                break;
            case this.events.subscriberRemoved:
                this.emitSubscriverEvent(this.events.subscriberRemoved, message);
                break;
        }
        return true;
    }
}
interappbus.InterApplicationBus = InterApplicationBus;
/**
 * @internal
 */
class InterAppPayload {
}
interappbus.InterAppPayload = InterAppPayload;
function createKey(...toHash) {
    return toHash
        .map((item) => {
        return Buffer.from(`${item}`).toString('base64');
    })
        .join('/');
}

var clipboard = {};

/**
 * Entry point for the OpenFin `Clipboard` API (`fin.Clipboard`).
 *
 * * {@link Clipboard} contains static members of the `Clipboard` API, accessible through `fin.Clipboard`.
 *
 * @packageDocumentation
 */
var __classPrivateFieldGet$a = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$9 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Clipboard_instances, _Clipboard_securedApiWarningCount, _Clipboard_warnSecuredApi;
Object.defineProperty(clipboard, "__esModule", { value: true });
clipboard.Clipboard = void 0;
const base_1$f = base;
const maxSecuredApiWarnings = 10;
/**
 * The Clipboard API allows reading and writing to the clipboard in multiple formats.
 *
 */
class Clipboard extends base_1$f.Base {
    constructor() {
        super(...arguments);
        _Clipboard_instances.add(this);
        _Clipboard_securedApiWarningCount.set(this, 0);
    }
    /**
     * Writes data into the clipboard as plain text
     * @param writeObj The object for writing data into the clipboard
     *
     * @example
     * ```js
     * fin.Clipboard.writeText({
     *     data: 'hello, world'
     * }).then(() => console.log('Text On clipboard')).catch(err => console.log(err));
     * ```
     */
    async writeText(writeObj) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.writeText');
        await this.wire.sendAction('clipboard-write-text', writeObj);
    }
    /**
     * Read the content of the clipboard as plain text
     * @param type Clipboard Type defaults to 'clipboard', use 'selection' for linux
     *
     * @example
     * ```js
     * fin.Clipboard.readText().then(text => console.log(text)).catch(err => console.log(err));
     * ```
     */
    async readText(type) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.readText');
        // NOTE: When we start supporting linux, we could detect the OS and choose 'selection' automatically for the user
        const { payload } = await this.wire.sendAction('clipboard-read-text', { type });
        return payload.data;
    }
    /**
     * Writes data into the clipboard as an Image
     * @param writeRequest The object to write an image to the clipboard
     *
     * @example
     * ```js
     * fin.Clipboard.writeImage({
     *   // raw base64 string, or dataURL of either data:image/png or data:image/jpeg type
     *   image: '...'
     * }).then(() => console.log('Image written to clipboard')).catch(err => console.log(err));
     * ```
     */
    async writeImage(writeRequest) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.writeImage');
        await this.wire.sendAction('clipboard-write-image', writeRequest);
    }
    /**
     * Read the content of the clipboard as a base64 string or a dataURL based on the input parameter 'format', defaults to 'dataURL'
     * @param readRequest Clipboard Read Image request with formatting options
     *
     * @example
     * ```js
     * // see TS type: OpenFin.ImageFormatOptions
     *
     * const pngOrDataURLOrBmpOptions = {
     *     format: 'png', // can be: 'png' | 'dataURL' | 'bmp'
     * };
     *
     * const jpgOptions = {
     *     format: 'jpg',
     *     quality: 80 // optional, if omitted defaults to 100
     * };
     *
     * fin.Clipboard.readImage(pngOrDataURLOrBmpOptions)
     *     .then(image => console.log('Image read from clipboard as PNG, DataURL or BMP', image))
     *     .catch(err => console.log(err));
     *
     * fin.Clipboard.readImage(jpgOptions)
     *     .then(image => console.log('Image read from clipboard as JPG', image))
     *     .catch(err => console.log(err));
     *
     * // defaults to {format: 'dataURL'}
     * fin.Clipboard.readImage()
     *     .then(image => console.log('Image read from clipboard as DataURL', image))
     *     .catch(err => console.log(err));
     *
     * ```
     */
    async readImage(readRequest = { format: 'dataURL' }) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.readImage');
        const { payload } = await this.wire.sendAction('clipboard-read-image', readRequest);
        return payload.data;
    }
    /**
     * Writes data into the clipboard as Html
     * @param writeObj The object for writing data into the clipboard
     *
     * @example
     * ```js
     * fin.Clipboard.writeHtml({
     *         data: '<h1>Hello, World!</h1>'
     * }).then(() => console.log('HTML On clipboard')).catch(err => console.log(err));
     * ```
     */
    async writeHtml(writeObj) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.writeHtml');
        await this.wire.sendAction('clipboard-write-html', writeObj);
    }
    /**
     * Read the content of the clipboard as Html
     * @param type Clipboard Type defaults to 'clipboard', use 'selection' for linux
     *
     * @example
     * ```js
     * fin.Clipboard.readHtml().then(html => console.log(html)).catch(err => console.log(err));
     * ```
     */
    async readHtml(type) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.readHtml');
        const { payload } = await this.wire.sendAction('clipboard-read-html', { type });
        return payload.data;
    }
    /**
     * Writes data into the clipboard as Rtf
     * @param writeObj The object for writing data into the clipboard
     *
     * @example
     * ```js
     * fin.Clipboard.writeRtf({
     *         data: 'some text goes here'
     * }).then(() => console.log('RTF On clipboard')).catch(err => console.log(err));
     * ```
     */
    async writeRtf(writeObj) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.writeRtf');
        await this.wire.sendAction('clipboard-write-rtf', writeObj);
    }
    /**
     * Read the content of the clipboard as Rtf
     * @param type Clipboard Type defaults to 'clipboard', use 'selection' for linux
     *
     * @example
     *
     * ```js
     * const writeObj = {
     *     data: 'some text goes here'
     * };
     * async function readRtf() {
     *     await fin.Clipboard.writeRtf(writeObj);
     *     return await fin.Clipboard.readRtf();
     * }
     * readRtf().then(rtf => console.log(rtf)).catch(err => console.log(err));
     * ```
     */
    async readRtf(type) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.readRtf');
        const { payload } = await this.wire.sendAction('clipboard-read-rtf', { type });
        return payload.data;
    }
    /**
     * Writes data into the clipboard
     * @param writeObj The object for writing data into the clipboard
     *
     * @example
     * ```js
     * fin.Clipboard.write({
     *   data: {
     *     text: 'a',
     *     html: 'b',
     *     rtf: 'c',
     *     // Can be either a base64 string, or a DataURL string. If using DataURL, the
     *     // supported formats are `data:image/png[;base64],` and `data:image/jpeg[;base64],`.
     *     // Using other image/<format> DataURLs will throw an Error.
     *     image: '...'
     *   }
     * }).then(() => console.log('write data into clipboard')).catch(err => console.log(err));
     * ```
     */
    async write(writeObj) {
        __classPrivateFieldGet$a(this, _Clipboard_instances, "m", _Clipboard_warnSecuredApi).call(this, 'Clipboard.write');
        await this.wire.sendAction('clipboard-write', writeObj);
    }
    /**
     * Reads available formats for the clipboard type
     * @param type Clipboard Type defaults to 'clipboard', use 'selection' for linux
     *
     * @example
     * ```js
     * fin.Clipboard.getAvailableFormats().then(formats => console.log(formats)).catch(err => console.log(err));
     * ```
     */
    async getAvailableFormats(type) {
        const { payload } = await this.wire.sendAction('clipboard-read-formats', { type });
        return payload.data;
    }
}
clipboard.Clipboard = Clipboard;
_Clipboard_securedApiWarningCount = new WeakMap(), _Clipboard_instances = new WeakSet(), _Clipboard_warnSecuredApi = async function _Clipboard_warnSecuredApi(apiName) {
    if (__classPrivateFieldGet$a(this, _Clipboard_securedApiWarningCount, "f") <= maxSecuredApiWarnings) {
        console.warn(`Here's Clipboard APIs will become secured APIs starting in v42. To continue using this API without interruption, make sure to grant explicit API permissions for ${apiName} in the Desktop Owner Settings, and in the Application, Window, View, or Domain Settings.  For more information, see https://resources.here.io/docs/core/develop/security/api-security/`);
        __classPrivateFieldSet$9(this, _Clipboard_securedApiWarningCount, __classPrivateFieldGet$a(this, _Clipboard_securedApiWarningCount, "f") + 1, "f");
    }
};

var externalApplication = {};

var Factory$5 = {};

var Instance$4 = {};

Object.defineProperty(Instance$4, "__esModule", { value: true });
Instance$4.ExternalApplication = void 0;
/* eslint-disable import/prefer-default-export */
const base_1$e = base;
/**
 * An ExternalApplication object representing native language adapter connections to the runtime. Allows
 * the developer to listen to {@link OpenFin.ExternalApplicationEvents external application events}.
 * Discovery of connections is provided by {@link System.System.getAllExternalApplications getAllExternalApplications}.</a>
 *
 * Processes that can be wrapped as `ExternalApplication`s include the following:
 * - Processes which have connected to an OpenFin runtime via an adapter
 * - Processes started via `System.launchExternalApplication`
 * - Processes monitored via `System.monitorExternalProcess`
 */
class ExternalApplication extends base_1$e.EmitterBase {
    /**
     * @internal
     */
    constructor(wire, identity) {
        super(wire, 'external-application', identity.uuid);
        this.identity = identity;
    }
    /**
     * Retrieves information about the external application.
     *
     * @example
     * ```js
     * async function getInfo() {
     *     const extApp = await fin.ExternalApplication.wrap('javaApp-uuid');
     *     return await extApp.getInfo();
     * }
     * getInfo().then(info => console.log(info)).catch(err => console.log(err));
     * ```
     */
    getInfo() {
        return this.wire.sendAction('get-external-application-info', this.identity).then(({ payload }) => payload.data);
    }
}
Instance$4.ExternalApplication = ExternalApplication;

Object.defineProperty(Factory$5, "__esModule", { value: true });
Factory$5.ExternalApplicationModule = void 0;
const base_1$d = base;
const Instance_1$4 = Instance$4;
/**
 * Static namespace for OpenFin API methods that interact with the {@link ExternalApplication} class, available under `fin.ExternalApplication`.
 */
class ExternalApplicationModule extends base_1$d.Base {
    /**
     * Asynchronously returns an External Application object that represents an external application.
     * <br>It is possible to wrap a process that does not yet exist, (for example, to listen for startup-related events)
     * provided its uuid is already known.
     * @param uuid The UUID of the external application to be wrapped
     *
     * @example
     * ```js
     * fin.ExternalApplication.wrap('javaApp-uuid');
     * .then(extApp => console.log('wrapped external application'))
     * .catch(err => console.log(err));
     * ```
     */
    wrap(uuid) {
        this.wire.sendAction('external-application-wrap').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return Promise.resolve(new Instance_1$4.ExternalApplication(this.wire, { uuid }));
    }
    /**
     * Synchronously returns an External Application object that represents an external application.
     * <br>It is possible to wrap a process that does not yet exist, (for example, to listen for startup-related events)
     * provided its uuid is already known.
     * @param uuid The UUID of the external application to be wrapped
     *
     * @example
     * ```js
     * const extApp = fin.ExternalApplication.wrapSync('javaApp-uuid');
     * const info = await extApp.getInfo();
     * console.log(info);
     * ```
     */
    wrapSync(uuid) {
        this.wire.sendAction('external-application-wrap-sync').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return new Instance_1$4.ExternalApplication(this.wire, { uuid });
    }
}
Factory$5.ExternalApplicationModule = ExternalApplicationModule;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Entry points for the OpenFin `ExternalApplication` API (`fin.ExternalApplication`).
	 *
	 * * {@link ExternalApplicationModule} contains static members of the `ExternalApplication` type, accessible through `fin.ExternalApplication`.
	 * * {@link ExternalApplication} describes an instance of an OpenFin ExternalApplication, e.g. as returned by `fin.ExternalApplication.getCurrent`.
	 *
	 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
	 * both of these were documented on the same page.
	 *
	 * @packageDocumentation
	 */
	__exportStar(Factory$5, exports);
	__exportStar(Instance$4, exports); 
} (externalApplication));

var frame = {};

var Factory$4 = {};

var Instance$3 = {};

Object.defineProperty(Instance$3, "__esModule", { value: true });
Instance$3._Frame = void 0;
/* eslint-disable import/prefer-default-export */
const base_1$c = base;
/**
 * An iframe represents an embedded HTML page within a parent HTML page. Because this embedded page
 * has its own DOM and global JS context (which may or may not be linked to that of the parent depending
 * on if it is considered out of the root domain or not), it represents a unique endpoint as an OpenFin
 * connection. Iframes may be generated dynamically, or be present on initial page load and each non-CORS
 * iframe has the OpenFin API injected by default. It is possible to opt into cross-origin iframes having
 * the API by setting api.iframe.crossOriginInjection to true in a window's options. To block all iframes
 * from getting the API injected you can set api.frame.sameOriginInjection
 * to false <a href="Window.html#~options" target="_blank">({@link OpenFin.WindowCreationOptions see Window Options})</a>.
 *
 * To be able to directly address this context for eventing and messaging purposes, it needs a
 * unique uuid name pairing. For OpenFin applications and windows this is provided via a configuration
 * object in the form of a manifest URL or options object, but there is no configuration object for iframes.
 * Just as a call to window.open outside of our Window API returns a new window with a random GUID assigned
 * for the name, each iframe that has the API injected will be assigned a GUID as its name, the UUID will be
 * the same as the parent window's.
 *
 * The fin.Frame namespace represents a way to interact with `iframes` and facilitates the discovery of current context
 * (iframe or main window) as well as the ability to listen for {@link OpenFin.FrameEvents frame-specific events}.
 */
class _Frame extends base_1$c.EmitterBase {
    /**
     * @internal
     */
    constructor(wire, identity) {
        super(wire, 'frame', identity.uuid, identity.name);
        this.identity = identity;
    }
    /**
     * Returns a frame info object for the represented frame.
     *
     * @example
     * ```js
     * async function getInfo() {
     *     const frm = await fin.Frame.getCurrent();
     *     return await frm.getInfo();
     * }
     * getInfo().then(info => console.log(info)).catch(err => console.log(err));
     * ```
     */
    getInfo() {
        return this.wire.sendAction('get-frame-info', this.identity).then(({ payload }) => payload.data);
    }
    /**
     * Returns a frame info object representing the window that the referenced iframe is
     * currently embedded in.
     *
     * @remarks If the frame is embedded in a view, this will return an invalid stub with empty fields.
     *
     * @example
     * ```js
     * async function getParentWindow() {
     *     const frm = await fin.Frame.getCurrent();
     *     return await frm.getParentWindow();
     * }
     * getParentWindow().then(winInfo => console.log(winInfo)).catch(err => console.log(err));
     * ```
     */
    getParentWindow() {
        return this.wire.sendAction('get-parent-window', this.identity).then(({ payload }) => payload.data);
    }
}
Instance$3._Frame = _Frame;

Object.defineProperty(Factory$4, "__esModule", { value: true });
Factory$4._FrameModule = void 0;
const base_1$b = base;
const validate_1$2 = validate;
const Instance_1$3 = Instance$3;
/**
 * Static namespace for OpenFin API methods that interact with the {@link _Frame} class, available under `fin.Frame`.
 */
class _FrameModule extends base_1$b.Base {
    /**
     * Asynchronously returns an API handle for the given Frame identity.
     *
     * @remarks Wrapping a Frame identity that does not yet exist will *not* throw an error, and instead
     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
     * for a Frame throughout its entire lifecycle.
     *
     * @example
     * ```js
     * fin.Frame.wrap({ uuid: 'testFrame', name: 'testFrame' })
     * .then(frm => console.log('wrapped frame'))
     * .catch(err => console.log(err));
     * ```
     */
    async wrap(identity) {
        this.wire.sendAction('frame-wrap').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const errorMsg = (0, validate_1$2.validateIdentity)(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return new Instance_1$3._Frame(this.wire, identity);
    }
    /**
     * Synchronously returns an API handle for the given Frame identity.
     *
     * @remarks Wrapping a Frame identity that does not yet exist will *not* throw an error, and instead
     * returns a stub object that cannot yet perform rendering tasks. This can be useful for plumbing eventing
     * for a Frame throughout its entire lifecycle.
     *
     * @example
     * ```js
     * const frm = fin.Frame.wrapSync({ uuid: 'testFrame', name: 'testFrame' });
     * const info = await frm.getInfo();
     * console.log(info);
     * ```
     */
    wrapSync(identity) {
        this.wire.sendAction('frame-wrap-sync').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const errorMsg = (0, validate_1$2.validateIdentity)(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        return new Instance_1$3._Frame(this.wire, identity);
    }
    /**
     * Asynchronously returns a reference to the current frame
     *
     * @example
     * ```js
     * fin.Frame.getCurrent()
     * .then(frm => console.log('current frame'))
     * .catch(err => console.log(err));
     * ```
     */
    getCurrent() {
        this.wire.sendAction('frame-get-current').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return Promise.resolve(new Instance_1$3._Frame(this.wire, this.wire.environment.getCurrentEntityIdentity()));
    }
    /**
     * Synchronously returns a reference to the current frame
     *
     * @example
     * ```js
     * const frm = fin.Frame.getCurrentSync();
     * const info = await frm.getInfo();
     * console.log(info);
     * ```
     */
    getCurrentSync() {
        this.wire.sendAction('frame-get-current-sync').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return new Instance_1$3._Frame(this.wire, this.wire.environment.getCurrentEntityIdentity());
    }
}
Factory$4._FrameModule = _FrameModule;

(function (exports) {
	/**
	 * Entry points for the OpenFin `Frame` API (`fin.Frame`).
	 *
	 * * {@link _FrameModule} contains static members of the `Frame` API, accessible through `fin.Frame`.
	 * * {@link _Frame} describes an instance of an OpenFin Frame, e.g. as returned by `fin.Frame.getCurrent`.
	 *
	 * These are separate code entities, and are documented separately. In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
	 * both of these were documented on the same page.
	 *
	 * Underscore prefixing of OpenFin types that alias DOM entities will be fixed in a future version.
	 *
	 * @packageDocumentation
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(Factory$4, exports);
	__exportStar(Instance$3, exports); 
} (frame));

var globalHotkey = {};

Object.defineProperty(globalHotkey, "__esModule", { value: true });
globalHotkey.GlobalHotkey = void 0;
const base_1$a = base;
/**
 * The GlobalHotkey module can register/unregister a global hotkeys.
 *
 */
class GlobalHotkey extends base_1$a.EmitterBase {
    /**
     * @internal
     */
    constructor(wire) {
        super(wire, 'global-hotkey');
    }
    /**
     * Registers a global hotkey with the operating system.
     * @param hotkey a hotkey string
     * @param listener called when the registered hotkey is pressed by the user.
     * @throws If the `hotkey` is reserved, see list below.
     * @throws if the `hotkey` is already registered by another application.
     *
     * @remarks The `hotkey` parameter expects an electron compatible [accelerator](https://github.com/electron/electron/blob/master/docs/api/accelerator.md) and the `listener` will be called if the `hotkey` is pressed by the user.
     * If successfull, the hotkey will be 'claimed' by the application, meaning that this register call can be called multiple times from within the same application but will fail if another application has registered the hotkey.
     * <br>The register call will fail if given any of these reserved Hotkeys:
     * * `CommandOrControl+0`
     * * `CommandOrControl+=`
     * * `CommandOrControl+Plus`
     * * `CommandOrControl+-`
     * * `CommandOrControl+_`
     * * `CommandOrControl+Shift+I`
     * * `F5`
     * * `CommandOrControl+R`
     * * `Shift+F5`
     * * `CommandOrControl+Shift+R`
     *
     * Raises the `registered` event.
     *
     * @example
     * ```js
     * const hotkey = 'CommandOrControl+X';
     *
     * fin.GlobalHotkey.register(hotkey, () => {
     * console.log(`${hotkey} pressed`);
     * })
     * .then(() => {
     *     console.log('Success');
     * })
     * .catch(err => {
     *     console.log('Error registering the hotkey', err);
     * });
     * ```
     */
    async register(hotkey, listener) {
        // TODO: fix typing (hotkey events are not typed)
        // @ts-expect-error
        await this.on(hotkey, listener);
        await this.wire.sendAction('global-hotkey-register', { hotkey });
        return undefined;
    }
    /**
     * Unregisters a global hotkey with the operating system.
     * @param hotkey a hotkey string
     *
     * @remarks This method will unregister all existing registrations of the hotkey within the application.
     * Raises the `unregistered` event.
     *
     * @example
     * ```js
     * const hotkey = 'CommandOrControl+X';
     *
     * fin.GlobalHotkey.unregister(hotkey)
     * .then(() => {
     *     console.log('Success');
     * })
     * .catch(err => {
     *     console.log('Error unregistering the hotkey', err);
     * });
     * ```
     */
    async unregister(hotkey) {
        // TODO: fix typing (hotkey events are not typed)
        // @ts-expect-error
        await this.removeAllListeners(hotkey);
        await this.wire.sendAction('global-hotkey-unregister', { hotkey });
        return undefined;
    }
    /**
     * Unregisters all global hotkeys for the current application.
     *
     * @remarks Raises the `unregistered` event for each hotkey unregistered.
     *
     * @example
     * ```js
     * fin.GlobalHotkey.unregisterAll()
     * .then(() => {
     *     console.log('Success');
     * })
     * .catch(err => {
     *     console.log('Error unregistering all hotkeys for this application', err);
     * });
     * ```
     */
    async unregisterAll() {
        await Promise.all(this.eventNames()
            .filter((name) => !(name === 'registered' || name === 'unregistered'))
            // TODO: fix typing (hotkey events are not typed)
            // @ts-expect-error
            .map((name) => this.removeAllListeners(name)));
        await this.wire.sendAction('global-hotkey-unregister-all', {});
        return undefined;
    }
    /**
     * Checks if a given hotkey has been registered by an application within the current runtime.
     * @param hotkey a hotkey string
     *
     * @example
     * ```js
     * const hotkey = 'CommandOrControl+X';
     *
     * fin.GlobalHotkey.isRegistered(hotkey)
     * .then((registered) => {
     *     console.log(`hotkey ${hotkey} is registered ? ${registered}`);
     * })
     * .catch(err => {
     *     console.log('Error unregistering the hotkey', err);
     * });
     * ```
     */
    async isRegistered(hotkey) {
        const { payload: { data } } = await this.wire.sendAction('global-hotkey-is-registered', { hotkey });
        return data;
    }
}
globalHotkey.GlobalHotkey = GlobalHotkey;

var platform = {};

var Factory$3 = {};

var Instance$2 = {};

var __classPrivateFieldSet$8 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$9 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Platform_channelName, _Platform_connectToProvider;
Object.defineProperty(Instance$2, "__esModule", { value: true });
Instance$2.Platform = void 0;
/* eslint-disable import/prefer-default-export, no-undef */
const base_1$9 = base;
const validate_1$1 = validate;
/** Manages the life cycle of windows and views in the application.
 *
 * Enables taking snapshots of itself and applying them to restore a previous configuration
 * as well as listen to {@link OpenFin.PlatformEvents platform events}.
 */
class Platform extends base_1$9.EmitterBase {
    /**
     * @internal
     */
    // eslint-disable-next-line no-shadow
    constructor(wire, identity, channelName = `custom-frame-${identity.uuid}`) {
        // we piggyback off of application event emitter because from the core's perspective platform is just an app.
        super(wire, 'application', identity.uuid);
        /**
         * @internal
         */
        _Platform_channelName.set(this, void 0);
        this.getClient = (identity = this.identity) => {
            if (identity.uuid !== this.identity.uuid) {
                // I have no idea why we allow passing in a different identity, but we do.
                // Doing this above the analytics call so we only register one call.
                return new Platform(this.wire, identity).getClient();
            }
            this.wire.sendAction('platform-get-client', this.identity).catch((e) => {
                // don't expose
            });
            if (!Platform.clientMap.has(__classPrivateFieldGet$9(this, _Platform_channelName, "f"))) {
                const clientPromise = __classPrivateFieldGet$9(this, _Platform_connectToProvider, "f").call(this);
                Platform.clientMap.set(__classPrivateFieldGet$9(this, _Platform_channelName, "f"), clientPromise);
            }
            // we set it above
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return Platform.clientMap.get(__classPrivateFieldGet$9(this, _Platform_channelName, "f"));
        };
        _Platform_connectToProvider.set(this, async () => {
            try {
                const client = await this._channel.connect(__classPrivateFieldGet$9(this, _Platform_channelName, "f"), { wait: false });
                client.onDisconnection(() => {
                    Platform.clientMap.delete(__classPrivateFieldGet$9(this, _Platform_channelName, "f"));
                });
                return client;
            }
            catch (e) {
                Platform.clientMap.delete(__classPrivateFieldGet$9(this, _Platform_channelName, "f"));
                throw new Error('The targeted Platform is not currently running. Listen for application-started event for the given Uuid.');
            }
        });
        /**
         * @deprecated (renamed)
         * @ignore
         */
        this.launchLegacyManifest = this.launchContentManifest;
        const errorMsg = (0, validate_1$1.validateIdentity)(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        __classPrivateFieldSet$8(this, _Platform_channelName, channelName, "f");
        this._channel = this.fin.InterApplicationBus.Channel;
        this.identity = { uuid: identity.uuid };
        this.Layout = this.fin.Platform.Layout;
        this.Application = this.fin.Application.wrapSync(this.identity);
    }
    /**
     * Creates a new view and attaches it to a specified target window.
     * @param viewOptions View creation options
     * @param target The window to which the new view is to be attached. If no target, create a view in a new window.
     * @param targetView If provided, the new view will be added to the same tabstrip as targetView.
     *
     * @remarks If the view already exists, will reparent the view to the new target. You do not need to set a name for a View.
     * Views that are not passed a name get a randomly generated one.
     *
     * @example
     * ```js
     * let windowIdentity;
     * if (fin.me.isWindow) {
     *     windowIdentity = fin.me.identity;
     * } else if (fin.me.isView) {
     *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
     * } else {
     *     throw new Error('Not running in a platform View or Window');
     * }
     *
     * const platform = fin.Platform.getCurrentSync();
     *
     * platform.createView({
     *     name: 'test_view',
     *     url: 'https://developers.openfin.co/docs/platform-api'
     * }, windowIdentity).then(console.log);
     * ```
     *
     * Reparenting a view:
     * ```js
     * let windowIdentity;
     * if (fin.me.isWindow) {
     *     windowIdentity = fin.me.identity;
     * } else if (fin.me.isView) {
     *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
     * } else {
     *     throw new Error('Not running in a platform View or Window');
     * }
     *
     * let platform = fin.Platform.getCurrentSync();
     * let viewOptions = {
     *     name: 'example_view',
     *     url: 'https://example.com'
     * };
     * // a new view will now show in the current window
     * await platform.createView(viewOptions, windowIdentity);
     *
     * const view = fin.View.wrapSync({ uuid: windowIdentity.uuid, name: 'yahoo_view' });
     * // reparent `example_view` when a view in the new window is shown
     * view.on('shown', async () => {
     *     let viewIdentity = { uuid: windowIdentity.uuid, name: 'example_view'};
     *     let target = {uuid: windowIdentity.uuid, name: 'test_win'};
     *     platform.createView(viewOptions, target);
     * });
     *
     * // create a new window
     * await platform.createWindow({
     *     name: "test_win",
     *     layout: {
     *         content: [
     *             {
     *                 type: 'stack',
     *                 content: [
     *                     {
     *                         type: 'component',
     *                         componentName: 'view',
     *                         componentState: {
     *                             name: 'yahoo_view',
     *                             url: 'https://yahoo.com'
     *                         }
     *                     }
     *                 ]
     *             }
     *         ]
     *     }
     * }).then(console.log);
     * ```
     */
    async createView(viewOptions, target, targetView) {
        this.wire.sendAction('platform-create-view', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        const response = await client.dispatch('create-view', {
            target,
            opts: viewOptions,
            targetView
        });
        if (!response || (0, validate_1$1.validateIdentity)(response.identity)) {
            throw new Error(`When overwriting the createView call, please return an object that has a valid 'identity' property: ${JSON.stringify(response)}`);
        }
        return this.fin.View.wrapSync(response.identity);
    }
    /**
     * Creates a new Window.
     * @param options Window creation options
     *
     * @remarks There are two Window types at your disposal while using OpenFin Platforms - Default Window and Custom Window.
     *
     * The Default Window uses the standard OpenFin Window UI. It contains the standard close, maximize and minimize buttons,
     * and will automatically render the Window's layout if one is specified.
     *
     * For deeper customization, you can bring your own Window code into a Platform. This is called a Custom Window.
     *
     * @example
     *
     *
     * The example below will create a Default Window which uses OpenFin default Window UI.<br>
     * The Window contains two Views in a stack Layout:
     *
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * platform.createWindow({
     *     layout: {
     *         content: [
     *             {
     *                 type: 'stack',
     *                 content: [
     *                     {
     *                         type: 'component',
     *                         componentName: 'view',
     *                         componentState: {
     *                             name: 'test_view_1',
     *                             url: 'https://cdn.openfin.co/docs/javascript/canary/Platform.html'
     *                         }
     *                     },
     *                     {
     *                         type: 'component',
     *                         componentName: 'view',
     *                         componentState: {
     *                             name: 'test_view_2',
     *                             url: 'https://cdn.openfin.co/docs/javascript/canary/Platform.html'
     *                         }
     *                     }
     *                 ]
     *             }
     *         ]
     *     }
     * }).then(console.log);
     * ```
     * The Default Window's design can be customized by specifying the `stylesheetUrl` property in the manifest:
     *
     * ```json
     * {
     *     platform: {
     *         defaultWindowOptions: {
     *             stylesheetUrl: 'some-url.css',
     *             ...
     *         }
     *     }
     * }
     * ```
     * For a list of common Layout CSS classes you can override in your custom stylesheet, see <a href="tutorial-layoutStyles.html">Useful Layout CSS Classes</a>
     **
     * To specify a Platform Custom Window, provide a `url` property when creating a Window.
     * If you intend to render a Layout in your Custom Window, you must also specify an `HTMLElement` that the Layout will inject into and set its `id` property to `"layout-container"`.
     *
     * The example below will create a Platform Custom Window:
     *
     * ```js
     *     // in an OpenFin app:
     *     const platform = fin.Platform.getCurrentSync();
     *     const windowConfig =
     *         {
     *             url: "https://www.my-domain.com/my-custom-window.html", // here we point to where the Custom Frame is hosted.
     *             layout: {
     *                 content: [
     *                     {
     *                         type: "stack",
     *                         content: [
     *                             {
     *                                 type: "component",
     *                                 componentName: "view",
     *                                 componentState: {
     *                                     name: "app #1",
     *                                     url: "https://cdn.openfin.co/docs/javascript/canary/Platform.html"
     *                                 }
     *                             },
     *                             {
     *                                 type: "component",
     *                                 componentName: "view",
     *                                 componentState: {
     *                                     name: "app #2",
     *                                     url: "https://cdn.openfin.co/docs/javascript/canary/Platform.html"
     *                                 }
     *                             }
     *                         ]
     *                     }
     *                 ]
     *             }
     *         };
     *     platform.createWindow(windowConfig);
     * ```
     *
     * Here's an example of a minimalist Custom Platform Window implementation:
     * ```html
     * <html>
     *     <head>
     *         <meta charset="utf-8">
     *         <meta name="viewport" content="width=device-width, initial-scale=1">
     *         <link rel="stylesheet" type="text/css" href="./styles.css">
     *     </head>
     *     <body>
     *         <div id="of-frame-main">
     *             <div id="title-bar">
     *                 <div class="title-bar-draggable">
     *                     <div id="title"> This is a custom frame! </div>
     *                 </div>
     *                 <div id="buttons-wrapper">
     *                     <div class="button" id="minimize-button"></div>
     *                     <div class="button" id="expand-button"></div>
     *                     <div class="button" id="close-button"></div>
     *                 </div>
     *             </div>
     *             <div id="layout-container"></div> <!-- OpenFin layout would be injected here -->
     *             <script src="./custom-frame.js"></script>
     *         </div>
     *     </body>
     * </html>
     * ```
     * Your Custom Window can use in-domain resources for further customization (such as CSS, scripts, etc.).<br>
     * For a list of common Layout CSS classes you can override in your stylesheet, see <a href="tutorial-layoutStyles.html">Useful Layout CSS Classes</a>
     *
     * The example above will require the `body` element to have `height: 100%;` set in order to render the layout correctly.
     */
    async createWindow(options) {
        this.wire.sendAction('platform-create-window', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        if (!options.reason) {
            options.reason = 'api-call';
        }
        const response = await client.dispatch('create-view-container', options);
        if (!response || (0, validate_1$1.validateIdentity)(response.identity)) {
            throw new Error(`When overwriting the createWindow call, please return an object that has a valid 'identity' property: ${JSON.stringify(response)}`);
        }
        const { identity } = response;
        const res = this.fin.Window.wrapSync(identity);
        // we add the identity at the top level for backwards compatibility.
        res.name = identity.name;
        res.uuid = identity.uuid;
        return res;
    }
    /**
     * Closes current platform, all its windows, and their views.
     *
     * @example
     * ```js
     * const platform = await fin.Platform.getCurrent();
     * platform.quit();
     * // All windows/views in current layout platform will close and platform will shut down
     * ```
     */
    async quit() {
        this.wire.sendAction('platform-quit', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        return client.dispatch('quit');
    }
    /**
     * Closes a specified view in a target window.
     * @param viewIdentity View identity
     *
     * @example
     * ```js
     * let windowIdentity;
     * if (fin.me.isWindow) {
     *     windowIdentity = fin.me.identity;
     * } else if (fin.me.isView) {
     *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
     * } else {
     *     throw new Error('Not running in a platform View or Window');
     * }
     *
     * const viewOptions = {
     *     name: 'test_view',
     *     url: 'https://example.com'
     * };
     *
     * function sleep(ms) {
     *     return new Promise(resolve => setTimeout(resolve, ms));
     * }
     *
     * const platform = await fin.Platform.getCurrent();
     *
     * await platform.createView(viewOptions, windowIdentity);
     * // a new view will now show in the current window
     *
     * await sleep(5000);
     *
     * const viewIdentity = { uuid: windowIdentity.uuid, name: 'test_view'};
     * platform.closeView(viewIdentity);
     * // the view will now close
     * ```
     */
    async closeView(viewIdentity) {
        this.wire.sendAction('platform-close-view', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        await client.dispatch('close-view', {
            view: viewIdentity
        });
    }
    /**
     * ***DEPRECATED - please use {@link Platform.createView Platform.createView}.***
     * Reparents a specified view in a new target window.
     * @param viewIdentity View identity
     * @param target new owner window identity
     *
     */
    async reparentView(viewIdentity, target) {
        // eslint-disable-next-line no-console
        console.warn('Platform.reparentView has been deprecated, please use Platform.createView');
        this.wire.sendAction('platform-reparent-view', this.identity).catch((e) => {
            // don't expose
        });
        const normalizedViewIdentity = {
            ...viewIdentity,
            uuid: viewIdentity.uuid ?? this.identity.uuid
        };
        const view = await this.fin.View.wrap(normalizedViewIdentity);
        const viewOptions = await view.getOptions();
        return this.createView(viewOptions, target);
    }
    /**
     * Returns a snapshot of the platform in its current state. You can pass the returning object to
     * [Platform.applySnapshot]{@link Platform#applySnapshot} to launch it.
     *
     * @remarks The snapshot will include details such as an [ISO format](https://en.wikipedia.org/wiki/ISO_8601)
     * timestamp of when the snapshot was taken, OpenFin runtime version the platform is running on, monitor information
     * and the list of currently running windows.
     *
     * @example
     * ```js
     * const platform = await fin.Platform.getCurrent();
     * const snapshot = await platform.getSnapshot();
     * ```
     */
    async getSnapshot() {
        this.wire.sendAction('platform-get-snapshot', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        return client.dispatch('get-snapshot');
    }
    /**
     * **NOTE**: Internal use only. It is not recommended to manage the state of individual views.
     *
     * Returns a snapshot of a single view's options in its current state.
     *
     * Can be used to restore a view to a previous state.
     *
     * @param viewIdentity View identity
     *
     * @internal
     * @experimental
     * @remarks This slice of snapshot state is equivalent to what is stored as `componentState` for views
     * when capturing platform state using [Platform.getSnapshot]{@link Platform#getSnapshot}.
     *
     * @example
     * ```js
     * const platform = await fin.Platform.getCurrent();
     * const url = 'https://google.com';
     * const view = await fin.View.create({ name: 'my-view', target: fin.me.identity, url });
     *
     * await view.navigate(url);
     *
     * const viewState = await platform.getViewSnapshot(view.identity);
     *
     * console.log(viewState);
     * ```
     */
    async getViewSnapshot(viewIdentity) {
        const client = await this.getClient();
        return client.dispatch('get-view-snapshot', { viewIdentity });
    }
    /**
     * Adds a snapshot to a running Platform.
     * Requested snapshot must be a valid Snapshot object, or a url or filepath to such an object.
     *
     * Can optionally close existing windows and overwrite current platform state with that of a snapshot.
     *
     * The function accepts either a snapshot taken using {@link Platform#getSnapshot getSnapshot},
     * or a url or filepath to a snapshot JSON object.
     * @param requestedSnapshot Snapshot to apply, or a url or filepath.
     * @param options Optional parameters to specify whether existing windows should be closed.
     *
     * @remarks Will create any windows and views that are not running but are passed in the snapshot object. Any View
     * specified in the snapshot is assigned a randomly generated name to avoid collisions.
     *
     * @example
     * ```js
     * // Get a wrapped layout platform instance
     * const platform = await fin.Platform.getCurrent();
     *
     * const snapshot = {
     *     windows: [
     *         {
     *             layout: {
     *                 content: [
     *                     {
     *                         type: 'stack',
     *                         content: [
     *                             {
     *                                 type: 'component',
     *                                 componentName: 'view',
     *                                 componentState: {
     *                                     name: 'component_X',
     *                                     url: 'https://www.openfin.co'
     *                                 }
     *                             },
     *                             {
     *                                 type: 'component',
     *                                 componentName: 'view',
     *                                 componentState: {
     *                                     name: 'component_Y',
     *                                     url: 'https://cdn.openfin.co/embed-web/chart.html'
     *                                 }
     *                             }
     *                         ]
     *                     }
     *                 ]
     *             }
     *         }
     *     ]
     * }
     *
     * platform.applySnapshot(snapshot);
     * ```
     *
     * In place of a snapshot object, `applySnapshot` can take a url or filepath and to retrieve a JSON snapshot.
     *
     * ```js
     * const platform = await fin.Platform.getCurrent();
     * platform.applySnapshot('https://api.jsonbin.io/b/5e6f903ef4331e681fc1231d/1');
     * ```
     *
     * Optionally, `applySnapshot` can close existing windows and restore a Platform to a previously saved state.
     * This is accomplished by providing `{ closeExistingWindows: true }` as an option.
     *
     * ```js
     * // Get a wrapped layout platform instance
     * const platform = await fin.Platform.getCurrent();
     *
     * async function addViewToWindow(winId) {
     *     return await platform.createView({
     *         name: 'test_view_3',
     *         url: 'https://openfin.co'
     *     }, winId);
     * }
     *
     * async function createWindowWithTwoViews() {
     *     const platform = await fin.Platform.getCurrent();
     *
     *     return platform.createWindow({
     *         layout: {
     *             content: [
     *                 {
     *                     type: 'stack',
     *                     content: [
     *                         {
     *                             type: 'component',
     *                             componentName: 'view',
     *                             componentState: {
     *                                 name: 'test_view_1',
     *                                 url: 'https://example.com'
     *                             }
     *                         },
     *                         {
     *                             type: 'component',
     *                             componentName: 'view',
     *                             componentState: {
     *                                 name: 'test_view_2',
     *                                 url: 'https://yahoo.com'
     *                             }
     *                         }
     *                     ]
     *                 }
     *             ]
     *         }
     *     });
     * }
     *
     * const win = await createWindowWithTwoViews();
     * // ... you will now see a new window with two views in it
     *
     * // we take a snapshot of the current state of the app, before changing it
     * const snapshotOfInitialAppState = await platform.getSnapshot();
     *
     * // now let's change the state of the app:
     * await addViewToWindow(win.identity);
     * // ... the window now has three views in it
     *
     * await platform.applySnapshot(snapshotOfInitialAppState, { closeExistingWindows: true });
     * // ... the window will revert to previous state, with just two views
     *
     * ```
     */
    async applySnapshot(requestedSnapshot, options) {
        this.wire.sendAction('platform-apply-snapshot', this.identity).catch((e) => {
            // don't expose
        });
        const errMsg = 'Requested snapshot must be a valid Snapshot object, or a url or filepath to such an object.';
        let snapshot;
        if (typeof requestedSnapshot === 'string') {
            // Fetch and parse snapshot
            try {
                const response = await this._channel.wire.sendAction('get-application-manifest', {
                    manifestUrl: requestedSnapshot
                });
                snapshot = response.payload.data;
            }
            catch (err) {
                throw new Error(`${errMsg}: ${err}`);
            }
        }
        else {
            snapshot = requestedSnapshot;
        }
        if (!snapshot.windows) {
            throw new Error(errMsg);
        }
        const client = await this.getClient();
        await client.dispatch('apply-snapshot', {
            snapshot,
            options
        });
        return this;
    }
    /**
     * Fetches a JSON manifest using the browser process and returns a Javascript object.
     * Can be overwritten using {@link Platform.PlatformModule.init Platform.init}.
     * @param manifestUrl The URL of the manifest to fetch.
     *
     * @remarks Can be overwritten using {@link Platform#init Platform.init}.
     *
     * @example
     *
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * const manifest = await platform.fetchManifest('https://www.path-to-manifest.com/app.json');
     * console.log(manifest);
     * ```
     */
    async fetchManifest(manifestUrl) {
        const client = await this.getClient();
        return client.dispatch('platform-fetch-manifest', { manifestUrl });
    }
    /**
     * Retrieves a manifest by url and launches a legacy application manifest or snapshot into the platform.  Returns a promise that
     * resolves to the wrapped Platform.
     * @param manifestUrl - The URL of the manifest that will be launched into the platform.  If this app manifest
     * contains a snapshot, that will be launched into the platform.  If not, the application described in startup_app options
     * will be launched into the platform. The applicable startup_app options will become {@link OpenFin.ViewCreationOptions View Options}.
     *
     * @remarks If the app manifest contains a snapshot, that will be launched into the platform.  If not, the
     * application described in startup_app options will be launched into the platform as a window with a single view.
     * The applicable startup_app options will become View Options.
     *
     * @example
     * ```js
     * try {
     *     const platform = fin.Platform.getCurrentSync();
     *     await platform.launchContentManifest('http://localhost:5555/app.json');
     *     console.log(`content launched successfully into platform`);
     * } catch(e) {
     *     console.error(e);
     * }
     * // For a local manifest file:
     * try {
     *     const platform = fin.Platform.getCurrentSync();
     *     platform.launchContentManifest('file:///C:/somefolder/app.json');
     *     console.log(`content launched successfully into platform`);
     * } catch(e) {
     *     console.error(e);
     * }
     * ```
     * @experimental
     */
    async launchContentManifest(manifestUrl) {
        this.wire.sendAction('platform-launch-content-manifest', this.identity).catch(() => {
            // don't expose
        });
        const client = await this.getClient();
        const manifest = await this.fetchManifest(manifestUrl);
        client.dispatch('launch-into-platform', { manifest, manifestUrl });
        return this;
    }
    /**
     * Set the context of a host window. The context will be available to the window itself, and to its child Views. It will be saved in any platform snapshots.
     * It can be retrieved using {@link Platform#getWindowContext getWindowContext}.
     * @param context - A field where serializable context data can be stored to be saved in platform snapshots.
     * @param target - A target window or view may optionally be provided. If no target is provided, the update will be applied
     * to the current window (if called from a Window) or the current host window (if called from a View).
     *
     * @remarks The context data must be serializable.  This can only be called from a window or view that has been launched into a
     * platform.
     * This method can be called from the window itself, or from any child view. Context data is shared by all
     * entities within a window.
     *
     * @example
     * Setting own context:
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * const contextData = {
     *     security: 'STOCK',
     *     currentView: 'detailed'
     * }
     *
     * await platform.setWindowContext(contextData);
     * // Context of current window is now set to `contextData`
     * ```
     *
     * Setting the context of another window or view:
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * const contextData = {
     *     security: 'STOCK',
     *     currentView: 'detailed'
     * }
     *
     * const windowOrViewIdentity = { uuid: fin.me.uuid, name: 'nameOfWindowOrView' };
     * await platform.setWindowContext(contextData, windowOrViewIdentity);
     * // Context of the target window or view is now set to `contextData`
     * ```
     *
     * A view can listen to changes to its host window's context by listening to the `host-context-changed` event.
     * This event will fire when a host window's context is updated or when the view is reparented to a new window:
     *
     * ```js
     * // From a view
     * const contextChangeHandler = ({ context }) => {
     *     console.log('Host window\'s context has changed. New context data:', context);
     *     // react to new context data here
     * }
     * await fin.me.on('host-context-changed', contextChangeHandler);
     *
     * const platform = await fin.Platform.getCurrentSync();
     * const contextData = {
     *     security: 'STOCK',
     *     currentView: 'detailed'
     * }
     * platform.setWindowContext(contextData) // contextChangeHandler will log the new context
     * ```
     *
     * To listen to a window's context updates, use the `context-changed` event:
     * ```js
     * // From a window
     * const contextChangeHandler = ({ context }) => {
     *     console.log('This window\'s context has changed. New context data:', context);
     *     // react to new context data here
     * }
     * await fin.me.on('context-changed', contextChangeHandler);
     *
     * const platform = await fin.Platform.getCurrentSync();
     * const contextData = {
     *     security: 'STOCK',
     *     currentView: 'detailed'
     * }
     * platform.setWindowContext(contextData) // contextChangeHandler will log the new context
     * ```
     * @experimental
     */
    async setWindowContext(context = {}, target) {
        this.wire.sendAction('platform-set-window-context', this.identity).catch((e) => {
            // don't expose
        });
        if (!context) {
            throw new Error('Please provide a serializable object or string to set the context.');
        }
        const client = await this.getClient();
        const { entityType } = target ? await this.fin.System.getEntityInfo(target.uuid, target.name) : this.fin.me;
        await client.dispatch('set-window-context', {
            context,
            entityType,
            target: target || { uuid: this.fin.me.uuid, name: this.fin.me.name }
        });
    }
    /**
     * Get the context context of a host window that was previously set using {@link Platform#setWindowContext setWindowContext}.
     * The context will be saved in any platform snapshots.  Returns a promise that resolves to the context.
     * @param target - A target window or view may optionally be provided. If no target is provided, target will be
     * the current window (if called from a Window) or the current host window (if called from a View).
     *
     * @remarks This method can be called from the window itself, or from any child view. Context data is shared
     * by all entities within a window.
     *
     * @example
     *
     * Retrieving context from current window:
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * const customContext = { answer: 42 };
     * await platform.setWindowContext(customContext);
     *
     * const myContext = await platform.getWindowContext();
     * console.log(myContext); // { answer: 42 }
     * ```
     *
     * Retrieving the context of another window or view:
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     *
     * const windowOrViewIdentity = { uuid: fin.me.uuid, name: 'nameOfWindowOrView' };
     *
     * const targetWindowContext = await platform.getWindowContext(windowOrViewIdentity);
     * console.log(targetWindowContext); // context of target window
     * ```
     * @experimental
     */
    async getWindowContext(target) {
        this.wire.sendAction('platform-get-window-context', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        const { entityType } = target ? await this.fin.System.getEntityInfo(target.uuid, target.name) : this.fin.me;
        return client.dispatch('get-window-context', {
            target: target || { uuid: this.fin.me.uuid, name: this.fin.me.name },
            entityType
        });
    }
    /**
     * Closes a window. If enableBeforeUnload is enabled in the Platform options, any beforeunload handler set on Views will fire
     * This behavior can be disabled by setting skipBeforeUnload to false in the options parameter.
     * @param winId
     * @param options
     *
     * @remarks This method works by setting a `close-requested` handler on the Platform Window. If you have your own `close-requested` handler set on the Platform Window as well,
     * it is recommended to move that logic over to the [PlatformProvider.closeWindow]{@link PlatformProvider#closeWindow} override to ensure it runs when the Window closes.
     *
     * @example
     *
     * ```js
     * // Close the current Window inside a Window context
     * const platform = await fin.Platform.getCurrent();
     * platform.closeWindow(fin.me.identity);
     *
     * // Close the Window from inside a View context
     * const platform = await fin.Platform.getCurrent();
     * const parentWindow = await fin.me.getCurrentWindow();
     * platform.closeWindow(parentWindow.identity);
     *
     * // Close the Window and do not fire the before unload handler on Views
     * const platform = await fin.Platform.getCurrent();
     * platform.closeWindow(fin.me.identity, { skipBeforeUnload: true });
     * ```
     * @experimental
     */
    async closeWindow(windowId, options = { skipBeforeUnload: false }) {
        this.wire.sendAction('platform-close-window', this.identity).catch((e) => {
            // don't expose
        });
        const client = await this.getClient();
        return client.dispatch('close-window', { windowId, options });
    }
}
Instance$2.Platform = Platform;
_Platform_channelName = new WeakMap(), _Platform_connectToProvider = new WeakMap();
/**
 * @internal
 * Reuse clients to avoid overwriting already-registered client in provider
 * This ensures that only channel client is created per channel name per `fin` instance
 */
Platform.clientMap = new Map();

var layout = {};

var Factory$2 = {};

var Instance$1 = {};

var commonUtils = {};

Object.defineProperty(commonUtils, "__esModule", { value: true });
commonUtils.overrideFromComposables = commonUtils.isValidPresetType = void 0;
function isValidPresetType(type) {
    switch (type) {
        case 'columns':
        case 'grid':
        case 'rows':
        case 'tabs':
            return true;
        default:
            return false;
    }
}
commonUtils.isValidPresetType = isValidPresetType;
function overrideFromComposables(...overrides) {
    return (base) => overrides.reduceRight((p, c) => (b) => c(p(b)), (x) => x)(base);
}
commonUtils.overrideFromComposables = overrideFromComposables;
commonUtils.default = { isValidPresetType };

var layoutEntities = {};

var apiExposer$1 = {};

var apiConsumer = {};

Object.defineProperty(apiConsumer, "__esModule", { value: true });
apiConsumer.ApiConsumer = void 0;
/**
 * Consumer for apis exposed with {@see ApiExposer}.
 *
 * A strategy that matches the strategy used to expose a target API must be provided.
 */
class ApiConsumer {
    // eslint-disable-next-line
    constructor(strategy) {
        this.strategy = strategy;
        /**
         * Consumes an api exposed using a given transport strategy, and generates a client
         * for easy, type safe consumption of that client.
         * @param options Strategy specific consumption options.
         * @returns An api client matching the given type.
         */
        this.consume = async (options) => {
            const exposedProperties = await this.strategy.getExposedFunctions(options);
            return exposedProperties.reduce((client, prop) => ({
                ...client,
                [prop.key]: this.strategy.createFunction(prop, options)
            }), {});
        };
    }
}
apiConsumer.ApiConsumer = ApiConsumer;

var apiExposer = {};

var decorators = {};

Object.defineProperty(decorators, "__esModule", { value: true });
decorators.expose = decorators.getExposedProperties = void 0;
const exposedProperties = Symbol('exposedProperties');
const getExposedProperties = (target) => {
    return target[exposedProperties] || target.prototype[exposedProperties] || [];
};
decorators.getExposedProperties = getExposedProperties;
/**
 * Indicates that a class member function can be exposed using {@link ApiExposer}.
 * @param options Options specific to the strategy used in {@link ApiExposer}
 */
// Returns any as decorator typing is weird.
const expose = (options) => (target, key, descriptor) => {
    target[exposedProperties] = target[exposedProperties] || [];
    target[exposedProperties].push({ key, descriptor, options });
};
decorators.expose = expose;

Object.defineProperty(apiExposer, "__esModule", { value: true });
apiExposer.ApiExposer = void 0;
const decorators_1 = decorators;
/**
 * Exposes api services on the transport of choice.
 */
class ApiExposer {
    /**
     * @param strategy The expose strategy to use to expose instances.
     */
    // eslint-disable-next-line
    constructor(strategy) {
        this.strategy = strategy;
        /**
         * Exposes an instance of a given api on
         * @param instance Instance of a class which has been decorated to indicate which functions can be exposed.
         * @param instanceOptions Transport strategy specific options to use when exposing.
         */
        this.exposeInstance = async (instance, instanceOptions) => {
            const exposableProps = (0, decorators_1.getExposedProperties)(instance);
            const exposedProps = await Promise.all(exposableProps.map(async ({ key, options }) => {
                const customConsumptionOptions = await this.strategy.exposeFunction(instance[key].bind(instance), {
                    key,
                    options,
                    meta: instanceOptions
                });
                return {
                    key,
                    options: customConsumptionOptions
                };
            }));
            await this.strategy.exposeMeta(instanceOptions, exposedProps);
        };
    }
    ;
}
apiExposer.ApiExposer = ApiExposer;

var strategies = {};

var openfinChannels = {};

var channelsConsumer = {};

Object.defineProperty(channelsConsumer, "__esModule", { value: true });
channelsConsumer.ChannelsConsumer = void 0;
class ChannelsConsumer {
    // eslint-disable-next-line
    constructor(channel) {
        this.channel = channel;
        this.getExposedFunctions = async (options) => {
            const { id } = options;
            const { props } = await this.channel.dispatch(`api-meta:${id}`);
            return props;
        };
        this.createFunction = (prop) => (...args) => {
            const { action } = prop.options;
            return this.channel.dispatch(action, { args });
        };
    }
    ;
}
channelsConsumer.ChannelsConsumer = ChannelsConsumer;

var channelsExposer = {};

Object.defineProperty(channelsExposer, "__esModule", { value: true });
channelsExposer.ChannelsExposer = void 0;
class ChannelsExposer {
    // eslint-disable-next-line
    constructor(channelProviderOrClient) {
        this.channelProviderOrClient = channelProviderOrClient;
        this.exposeFunction = async (target, config) => {
            const { key, options, meta } = config;
            const { id } = meta;
            const action = `${id}.${options?.action || key}`;
            await this.channelProviderOrClient.register(action, async ({ args }) => {
                return target(...args);
            });
            return { action };
        };
        this.exposeMeta = async ({ id }, props) => {
            const action = `api-meta:${id}`;
            await this.channelProviderOrClient.register(action, () => ({ props }));
        };
    }
}
channelsExposer.ChannelsExposer = ChannelsExposer;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(channelsConsumer, exports);
	__exportStar(channelsExposer, exports); 
} (openfinChannels));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(openfinChannels, exports); 
} (strategies));

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(apiConsumer, exports);
	__exportStar(apiExposer, exports);
	__exportStar(strategies, exports);
	__exportStar(decorators, exports); 
} (apiExposer$1));

var channelApiRelay = {};

Object.defineProperty(channelApiRelay, "__esModule", { value: true });
channelApiRelay.createRelayedDispatch = channelApiRelay.relayChannelClientApi = void 0;
const EXPECTED_ERRORS = [
    'no longer connected',
    'RTCDataChannel closed unexpectedly',
    'The client you are trying to dispatch from is disconnected from the target provider',
];
// Checks possible error messages that we want to trap, client error message can originate
// from ChannelProvider::dispatch OR ClassicStrategy::closeEndpoint OR RTCEndPoint::dataChannel::onclose
const isDisconnectedError = (errorMsg) => {
    return EXPECTED_ERRORS.some(e => errorMsg.includes(e));
};
/**
 * @internal
 * Create a channel relay for a given channel exposition, allowing a single provider to route
 * actions to the designated clients.
 *
 * Designed to be used in conjunction with @expose
 *
 * @param channelProvider The channel provider to relay the actions on.
 * @param config Determines which actions to relay. Please ensure action prefix matches the exposed api.
 */
const relayChannelClientApi = async (channelProvider, relayId) => {
    channelProvider.register(`relay:${relayId}`, ({ action, target, payload }) => {
        return channelProvider.dispatch(target, action, payload);
    });
    await Promise.resolve();
};
channelApiRelay.relayChannelClientApi = relayChannelClientApi;
const createRelayedDispatch = (client, target, relayId, relayErrorMsg) => async (action, payload) => {
    try {
        return await client.dispatch(`relay:${relayId}`, {
            action,
            payload,
            target
        });
    }
    catch (e) {
        if (isDisconnectedError(e.message) && relayErrorMsg) {
            throw new Error(relayErrorMsg);
        }
        throw e;
    }
};
channelApiRelay.createRelayedDispatch = createRelayedDispatch;

var __classPrivateFieldSet$7 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$8 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _LayoutNode_client, _TabStack_client, _ColumnOrRow_client;
Object.defineProperty(layoutEntities, "__esModule", { value: true });
layoutEntities.ColumnOrRow = layoutEntities.TabStack = layoutEntities.LayoutNode = void 0;
const api_exposer_1 = apiExposer$1;
const channel_api_relay_1 = channelApiRelay;
/*
    This file includes LayoutNode, ColumnOrRow and TabStack classes, which are all closely
    intertwined, and share members via parent abstract class LayoutNode. To prevent circular
    refs, we define and export all the classes here.
*/
/**
 * @ignore
 * @internal
 * Supplies an ApiClient for {@link LayoutEntitiesController} and helper methods
 * for the entities {@link TabStack} AND {@link ColumnOrRow} to use.
 */
class LayoutNode {
    /**
     * @internal
     * @ignore
     */
    constructor(client, entityId) {
        /**
         * @ignore
         * @internal
         * ApiClient for {@link LayoutEntitiesController}
         */
        _LayoutNode_client.set(this, void 0);
        /**
         * Checks if the TabStack or ColumnOrRow is the root content item
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * const isRoot = await stack.isRoot();
         * // The TabStack is root: false
         * console.log(`The TabStack is root: ${isRoot}`);
         *
         * // Retrieves the parent ColumnOrRow
         * const parent = await stack.getParent();
         * const parentIsRoot = await parent.isRoot();
         * // The parent ColumnOrRow is root: true
         * console.log(`The parent ColumnOrRow is root: ${parentIsRoot}`);
         * ```
         */
        this.isRoot = () => __classPrivateFieldGet$8(this, _LayoutNode_client, "f").isRoot(this.entityId);
        /**
         * Checks if the TabStack or ColumnOrRow exists
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * // Retrieves the parent ColumnOrRow
         * const columnOrRow = await stack.getParent();
         * let exists = await stack.exists();
         * // or
         * let exists = await columnOrRow.exists();
         * // The entity exists: true
         * console.log(`The entity exists: ${exists}`);
         * ```
         */
        this.exists = () => __classPrivateFieldGet$8(this, _LayoutNode_client, "f").exists(this.entityId);
        /**
         * Retrieves the parent of the TabStack or ColumnOrRow
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * // Retrieves the parent ColumnOrRow
         * const columnOrRow = await stack.getParent();
         *
         * // undefined if entity is the root item
         * let parent = await columnOrRow.getParent();
         * // or
         * let parent = await stack.getParent();
         * ```
         */
        this.getParent = async () => {
            const parent = await __classPrivateFieldGet$8(this, _LayoutNode_client, "f").getParent(this.entityId);
            if (!parent) {
                return undefined;
            }
            return LayoutNode.getEntity(parent, __classPrivateFieldGet$8(this, _LayoutNode_client, "f"));
        };
        /**
         * Creates a new TabStack adjacent to the given TabStack or ColumnOrRow. Inputs can be new views to create, or existing views.
         *
         * Known Issue: If the number of views to add overflows the tab-container, the added views will be set as active
         * during each render, and then placed at the front of the tab-stack, while the underlying order of tabs will remain unchanged.
         * This means the views you pass to createAdjacentStack() may not render in the order given by the array.
         * Until fixed, this problem can be avoided only if your window is wide enough to fit creating all the views in the tabstack.
         *
         * @param views The views that will populate the new TabStack.
         * @param options Additional options that control new TabStack creation.
         * @returns The newly-created TabStack.
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * const columnOrRow = await stack.getParent();
         *
         * // Create view references by supplying a 'name' and 'url'
         * const views = [
         *     // if 'name' is undefined, one will be generated
         *     // if 'url' is undefined, it will default the view URL to 'about:blank'
         *     { name: 'google-view', url: 'http://google.com/'},
         *     { name: 'of-developers-view', url: 'http://developers.openfin.co/'},
         * ];
         *
         * // Create a view beforehand to be included in the new tab stack
         * const outsideView = await fin.View.create({
         *     name: 'outside-bloomberg-view',
         *     url: 'https://bloomberg.com/',
         *     target: fin.me.identity,
         * });
         *
         * // Views to add can be identities, or the reference views mentioned above
         * const viewsToAdd = [outsideView.identity, ...views];
         *
         * // Possible position inputs: 'right' | 'left' | 'top' | 'bottom'
         * let stackFrom = await columnOrRow.createAdjacentStack(viewsToAdd, { position: 'right' });
         * // Or
         * let newStack = await stack.createAdjacentStack(viewsToAdd, { position: 'right' });
         * console.log(`A new TabStack created to the right has ${newStack.length} views in it`);
         *
         * ```
         * @experimental
         */
        this.createAdjacentStack = async (views, options) => {
            const entityId = await __classPrivateFieldGet$8(this, _LayoutNode_client, "f").createAdjacentStack(this.entityId, views, options);
            return LayoutNode.getEntity({ entityId, type: 'stack' }, __classPrivateFieldGet$8(this, _LayoutNode_client, "f"));
        };
        /**
         * Retrieves the adjacent TabStacks of the given TabStack or ColumnOrRow.
         *
         * @param edge Edge whose adjacent TabStacks will be returned.
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * const columnOrRow = await stack.getParent();
         * // Possible position inputs: 'right' | 'left' | 'top' | 'bottom'
         * let rightStacks = await columnOrRow.getAdjacentStacks('right');
         * let leftStacks = await columnOrRow.getAdjacentStacks('left');
         * // or
         * let rightStacks = await stack.getAdjacentStacks('right');
         * let leftStacks = await stack.getAdjacentStacks('left');
         *
         * console.log(`The entity has ${rightStacks.length} stacks to the right, and ${leftStacks.length} stacks to the left`);
         *
         * ```
         * @experimental
         */
        this.getAdjacentStacks = async (edge) => {
            const adjacentStacks = await __classPrivateFieldGet$8(this, _LayoutNode_client, "f").getAdjacentStacks({
                targetId: this.entityId,
                edge
            });
            return adjacentStacks.map((stack) => LayoutNode.getEntity({
                type: 'stack',
                entityId: stack.entityId
            }, __classPrivateFieldGet$8(this, _LayoutNode_client, "f")));
        };
        __classPrivateFieldSet$7(this, _LayoutNode_client, client, "f");
        this.entityId = entityId;
    }
}
layoutEntities.LayoutNode = LayoutNode;
_LayoutNode_client = new WeakMap();
/**
 * @ignore
 * @internal
 * Encapsulates Api consumption of {@link LayoutEntitiesClient} with a relayed dispatch
 * @param client
 * @param controllerId
 * @param identity
 * @returns a new instance of {@link LayoutEntitiesClient} with bound to the controllerId
 */
LayoutNode.newLayoutEntitiesClient = async (client, controllerId, identity) => {
    const dispatch = (0, channel_api_relay_1.createRelayedDispatch)(client, identity, 'layout-relay', 'You are trying to interact with a layout component on a window that does not exist or has been destroyed.');
    const consumer = new api_exposer_1.ApiConsumer(new api_exposer_1.ChannelsConsumer({ dispatch }));
    return consumer.consume({ id: controllerId });
};
LayoutNode.getEntity = (definition, client) => {
    const { entityId, type } = definition;
    switch (type) {
        case 'column':
        case 'row':
            return new ColumnOrRow(client, entityId, type);
        case 'stack':
            return new TabStack(client, entityId);
        default:
            throw new Error(`Unrecognised Layout Entity encountered ('${JSON.stringify(definition)})`);
    }
};
/**
 * A TabStack is used to manage the state of a stack of tabs within an OpenFin Layout.
 */
class TabStack extends LayoutNode {
    /** @internal */
    constructor(client, entityId) {
        super(client, entityId);
        /**
         * @internal
         * ApiClient for {@link LayoutEntitiesController}
         */
        _TabStack_client.set(this, void 0);
        /**
         * Type of the content item. Always stack, but useful for distinguishing between a {@link TabStack} and {@link ColumnOrRow}.
         */
        this.type = 'stack';
        /**
         * Retrieves a list of all views belonging to this {@link TabStack}.
         *
         * Known Issue: If adding a view overflows the tab-container width, the added view will be set as active
         * and rendered at the front of the tab-stack, while the underlying order of tabs will remain unchanged.
         * If that happens and then getViews() is called, it will return the identities in a different order than
         * than the currently rendered tab order.
         *
         *
         * @throws If the {@link TabStack} has been destroyed.
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * // Alternatively, you can wrap any view and get the stack from there
         * // const viewFromSomewhere = fin.View.wrapSync(someView.identity);
         * // const stack = await viewFromSomewhere.getCurrentStack();
         * const views = await stack.getViews();
         * console.log(`Stack contains ${views.length} view(s)`);
         * ```
         * @experimental
         */
        this.getViews = () => __classPrivateFieldGet$8(this, _TabStack_client, "f").getStackViews(this.entityId);
        /**
         * Adds or creates a view in this {@link TabStack}.
         *
         * @remarks Known Issue: If adding a view overflows the tab-container, the added view will be set as active
         * and rendered at the front of the tab-stack, while the underlying order of tabs will remain unchanged.
         *
         * @param view The identity of an existing view to add, or options to create a view.
         * @param options Optional view options: index number used to insert the view into the stack at that index. Defaults to 0 (front of the stack)
         * @returns Resolves with the {@link OpenFin.Identity identity} of the added view.
         * @throws If the view does not exist or fails to create.
         * @throws If the {@link TabStack} has been destroyed.
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * // Alternatively, you can wrap any view and get the stack from there
         * // const viewFromSomewhere = fin.View.wrapSync(someView.identity);
         * // const stack = await viewFromSomewhere.getCurrentStack();
         * const googleViewIdentity = await stack.addView({ name: 'google-view', url: 'http://google.com/' });
         * console.log('Identity of the google view just added', { googleViewIdentity });
         * // pass in { index: number } to set the index in the stack. Here 1 means, end of the stack (defaults to 0)
         * const appleViewIdentity = await stack.addView({ name: 'apple-view', url: 'http://apple.com/' }, { index: 1 });
         * console.log('Identity of the apple view just added', { appleViewIdentity });
         * ```
         * @experimental
         */
        this.addView = async (view, options = { index: 0 }) => __classPrivateFieldGet$8(this, _TabStack_client, "f").addViewToStack(this.entityId, view, options);
        /**
         * Removes a view from this {@link TabStack}.
         *
         * @remarks Throws an exception if the view identity does not exist or was already destroyed.
         *
         * @param view - Identity of the view to remove.
         * @throws If the view does not exist or does not belong to the stack.
         * @throws If the {@link TabStack} has been destroyed.
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * const googleViewIdentity = await stack.addView({ name: 'google-view', url: 'http://google.com/' });
         *
         * await stack.removeView(googleViewIdentity);
         *
         * try {
         *     await stack.removeView(googleViewIdentity);
         * } catch (error) {
         *     // Tried to remove a view ('google-view') which does not belong to the stack.
         *     console.log(error);
         * }
         * ```
         */
        this.removeView = async (view) => {
            await __classPrivateFieldGet$8(this, _TabStack_client, "f").removeViewFromStack(this.entityId, view);
        };
        /**
         * Sets the active view of the {@link TabStack} without focusing it.
         * @param view - Identity of the view to activate.
         * @returns Promise which resolves with void once the view has been activated.
         * @throws If the {@link TabStack} has been destroyed.
         * @throws If the view does not exist.
         * @example
         * Change the active tab of a known View's TabStack:
         * ```js
         * const targetView = fin.View.wrapSync({ uuid: 'uuid', name: 'view-name' });
         * const stack = await targetView.getCurrentStack();
         * await stack.setActiveView(targetView.identity);
         * ```
         *
         * Set the current View as active within its TabStack:
         * ```js
         * const stack = await fin.me.getCurrentStack();
         * await stack.setActiveView(fin.me.identity);
         * ```
         * @experimental
         */
        this.setActiveView = async (view) => {
            await __classPrivateFieldGet$8(this, _TabStack_client, "f").setStackActiveView(this.entityId, view);
        };
        __classPrivateFieldSet$7(this, _TabStack_client, client, "f");
    }
}
layoutEntities.TabStack = TabStack;
_TabStack_client = new WeakMap();
/**
 * A ColumnOrRow is used to manage the state of Column and Rows within an OpenFin Layout.
 */
class ColumnOrRow extends LayoutNode {
    /**
     * @internal
     */
    constructor(client, entityId, type) {
        super(client, entityId);
        /**
         * @ignore
         * @internal
         * ApiClient for {@link LayoutEntitiesController}
         */
        _ColumnOrRow_client.set(this, void 0);
        /**
         * Retrieves the content array of the ColumnOrRow
         *
         * @example
         * ```js
         * if (!fin.me.isView) {
         *     throw new Error('Not running in a platform View.');
         * }
         *
         * const stack = await fin.me.getCurrentStack();
         * // Retrieves the parent ColumnOrRow
         * const columnOrRow = await stack.getParent();
         *
         * // returns [TabStack]
         * const contentArray = await columnOrRow.getContent();
         * console.log(`The ColumnOrRow has ${contentArray.length} item(s)`);
         * ```
         */
        this.getContent = async () => {
            const contentItemEntities = await __classPrivateFieldGet$8(this, _ColumnOrRow_client, "f").getContent(this.entityId);
            return contentItemEntities.map((entity) => LayoutNode.getEntity(entity, __classPrivateFieldGet$8(this, _ColumnOrRow_client, "f")));
        };
        __classPrivateFieldSet$7(this, _ColumnOrRow_client, client, "f");
        this.type = type;
    }
}
layoutEntities.ColumnOrRow = ColumnOrRow;
_ColumnOrRow_client = new WeakMap();

var layout_constants = {};

Object.defineProperty(layout_constants, "__esModule", { value: true });
layout_constants.DEFAULT_LAYOUT_KEY = layout_constants.LAYOUT_CONTROLLER_ID = void 0;
layout_constants.LAYOUT_CONTROLLER_ID = 'layout-entities';
// TODO: eventually export this somehow
layout_constants.DEFAULT_LAYOUT_KEY = '__default__';

var __classPrivateFieldGet$7 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Layout_instances, _Layout_layoutClient, _Layout_forwardLayoutAction;
Object.defineProperty(Instance$1, "__esModule", { value: true });
Instance$1.Layout = void 0;
const lazy_1$1 = lazy;
const validate_1 = validate;
const base_1$8 = base;
const common_utils_1$1 = commonUtils;
const layout_entities_1 = layoutEntities;
const layout_constants_1$1 = layout_constants;
/**
 *
 * Layouts give app providers the ability to embed multiple views in a single window. The Layout namespace
 * enables the initialization and manipulation of a window's Layout. A Layout will
 * emit events locally on the DOM element representing the layout-container.
 *
 *
 * ### Layout.DOMEvents
 *
 * When a Layout is created, it emits events onto the DOM element representing the Layout container.
 * This Layout container is the DOM element referenced by containerId in {@link Layout.LayoutModule#init Layout.init}.
 * You can use the built-in event emitter to listen to these events using [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
 * The events are emitted synchronously and only in the process where the Layout exists.
 * Any values returned by the called listeners are ignored and will be discarded.
 * If the target DOM element is destroyed, any events that have been set up on that element will be destroyed.
 *
 * @remarks The built-in event emitter is not an OpenFin event emitter so it doesn't share propagation semantics.
 *
 * #### [addEventListener(type, listener [, options]);](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
 * Adds a listener to the end of the listeners array for the specified event.
 * @example
 * ```js
 * const myLayoutContainer = document.getElementById('layout-container');
 *
 * myLayoutContainer.addEventListener('tab-created', function(event) {
 *      const { tabSelector } = event.detail;
 *      const tabElement = document.getElementById(tabSelector);
 *      const existingColor = tabElement.style.backgroundColor;
 *      tabElement.style.backgroundColor = "red";
 *      setTimeout(() => {
 *          tabElement.style.backgroundColor = existingColor;
 *      }, 2000);
 * });
 * ```
 *
 * #### [removeEventListener(type, listener [, options]);](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
 * Adds a listener to the end of the listeners array for the specified event.
 * @example
 * ```js
 * const myLayoutContainer = document.getElementById('layout-container');
 *
 * const listener = function(event) {
 *     console.log(event.detail);
 *     console.log('container-created event fired once, removing listener');
 *     myLayoutContainer.removeEventListener('container-created', listener);
 * };
 *
 * myLayoutContainer.addEventListener('container-created', listener);
 * ```
 *
 * ### Supported event types are:
 *
 * * tab-created
 * * container-created
 * * layout-state-changed
 * * tab-closed
 * * tab-dropped
 *
 * ### Layout DOM Node Events
 *
 * #### tab-created
 * Generated when a tab is created.  As a user drags and drops tabs within window, new tabs are created.  A single view may have multiple tabs created and destroyed during its lifetime attached to a single window.
 * ```js
 * // The response has the following shape in event.detail:
 * {
 *     containerSelector: "container-component_A",
 *     name: "component_A",
 *     tabSelector: "tab-component_A",
 *     topic: "openfin-DOM-event",
 *     type: "tab-created",
 *     uuid: "OpenFin POC"
 * }
 * ```
 *
 * #### container-created
 * Generated when a container is created.  A single view will have only one container during its lifetime attached to a single window and the container's lifecycle is tied to the view.  To discover when the container is destroyed, please listen to view-detached event.
 * ```js
 * // The response has the following shape in event.detail:
 * {
 *     containerSelector: "container-component_A",
 *     name: "component_A",
 *     tabSelector: "tab-component_A",
 *     topic: "openfin-DOM-event",
 *     type: "container-created",
 *     uuid: "OpenFin POC"
 * }
 * ```
 *
 * ### layout-state-changed
 * Generated when the state of the layout changes in any way, such as a view added/removed/replaced. Note that this event can fire frequently as the underlying layout can change multiple components from all kinds of changes (resizing for example). Given this, it is recommended to debounce this event and then you can use the {@link Layout#getConfig Layout.getConfig} API to retrieve the most up-to-date state.
 * ```js
 * // The response has the following shape in event.detail
 * {
 *     containerSelector: "container-component_A",
 *     name: "component_A",
 *     tabSelector: "tab-component_A",
 *     topic: "openfin-DOM-event",
 *     type: "layout-state-changed",
 *     uuid: "OpenFin POC"
 * }
 * ```
 *
 * #### tab-closed
 * Generated when a tab is closed.
 * ```js
 * // The response has the following shape in event.detail:
 * {
 *     containerSelector: "container-component_A",
 *     name: "component_A",
 *     tabSelector: "tab-component_A",
 *     topic: "openfin-DOM-event",
 *     type: "tab-closed",
 *     uuid: "OpenFin POC",
 *     url: "http://openfin.co"   // The url of the view that was closed.
 * }
 * ```
 *
 * #### tab-dropped
 * Generated when a tab is dropped.
 * ```js
 * // The response has the following shape in event.detail:
 * {
 *     containerSelector: "container-component_A",
 *     name: "component_A",
 *     tabSelector: "tab-component_A",
 *     topic: "openfin-DOM-event",
 *     type: "tab-dropped",
 *     uuid: "OpenFin POC",
 *     url: "http://openfin.co"    // The url of the view linked to the dropped tab.
 * }
 * ```
 */
class Layout extends base_1$8.Base {
    /**
     * @internal
     */
    static getClient(layout) {
        return __classPrivateFieldGet$7(layout, _Layout_layoutClient, "f").getValue();
    }
    /**
     * @internal
     */
    // eslint-disable-next-line no-shadow
    constructor(identity, wire) {
        super(wire);
        _Layout_instances.add(this);
        /**
         * @internal
         * Lazily constructed {@link LayoutEntitiesClient} bound to this platform's client and identity
         * The client is for {@link LayoutEntitiesController}
         */
        _Layout_layoutClient.set(this, new lazy_1$1.Lazy(async () => layout_entities_1.LayoutNode.newLayoutEntitiesClient(await this.platform.getClient(), layout_constants_1$1.LAYOUT_CONTROLLER_ID, this.identity)));
        /**
         * Replaces a Platform window's layout with a new layout.
         *
         * @remarks Any views that were in the old layout but not the new layout will be destroyed. Views will be assigned a randomly generated name to avoid collisions.
         * @example
         * ```js
         * let windowIdentity;
         * if (fin.me.isWindow) {
         *     windowIdentity = fin.me.identity;
         * } else if (fin.me.isView) {
         *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
         * } else {
         *     throw new Error('Not running in a platform View or Window');
         * }
         *
         * const layout = fin.Platform.Layout.wrapSync(windowIdentity);
         *
         * const newLayout = {
         *     content: [
         *         {
         *             type: 'stack',
         *             content: [
         *                 {
         *                     type: 'component',
         *                     componentName: 'view',
         *                     componentState: {
         *                         name: 'new_component_A1',
         *                         processAffinity: 'ps_1',
         *                         url: 'https://www.example.com'
         *                     }
         *                 },
         *                 {
         *                     type: 'component',
         *                     componentName: 'view',
         *                     componentState: {
         *                         name: 'new_component_A2',
         *                         url: 'https://cdn.openfin.co/embed-web/chart.html'
         *                     }
         *                 }
         *             ]
         *         }
         *     ]
         * };
         *
         * layout.replace(newLayout);
         * ```
         */
        this.replace = async (layout) => {
            this.wire.sendAction('layout-replace').catch((e) => {
                // don't expose
            });
            const client = await this.platform.getClient();
            await client.dispatch('replace-layout', {
                target: this.identity,
                opts: { layout }
            });
        };
        /**
         * Replaces the specified view with a view with the provided configuration.
         *
         * @remarks The old view is stripped of its listeners and either closed or attached to the provider window
         * depending on `detachOnClose` view option.
         *
         * @param viewToReplace Identity of the view to be replaced
         * @param newView Creation options of the new view.
         *
         * @example
         * ```js
         * let currentWindow;
         * if (fin.me.isWindow) {
         *     currentWindow = fin.me;
         * } else if (fin.me.isView) {
         *     currentWindow = await fin.me.getCurrentWindow();
         * } else {
         *     throw new Error('Not running in a platform View or Window');
         * }
         *
         * const layout = fin.Platform.Layout.wrapSync(currentWindow.identity);
         * const viewToReplace = (await currentWindow.getCurrentViews())[0];
         * const newViewConfig = {url: 'https://example.com'};
         * await layout.replaceView(viewToReplace.identity, newViewConfig);
         * ```
         */
        this.replaceView = async (viewToReplace, newView) => {
            this.wire.sendAction('layout-replace-view').catch((e) => {
                // don't expose
            });
            const client = await this.platform.getClient();
            await client.dispatch('replace-view', {
                target: this.identity,
                opts: { viewToReplace, newView }
            });
        };
        /**
         * Replaces a Platform window's layout with a preset layout arrangement using the existing Views attached to the window.
         * The preset options are `columns`, `grid`, `rows`, and `tabs`.
         * @param options Mandatory object with `presetType` property that sets which preset layout arrangement to use.
         * The preset options are `columns`, `grid`, `rows`, and `tabs`.
         *
         * @example
         * ```js
         * let windowIdentity;
         * if (fin.me.isWindow) {
         *     windowIdentity = fin.me.identity;
         * } else if (fin.me.isView) {
         *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
         * } else {
         *     throw new Error('Not running in a platform View or Window');
         * }
         *
         * const layout = fin.Platform.Layout.wrapSync(windowIdentity);
         * await layout.applyPreset({ presetType: 'grid' });
         *
         * // wait 5 seconds until you change the layout from grid to tabs
         * await new Promise (res => setTimeout(res, 5000));
         * await layout.applyPreset({ presetType: 'tabs' });
         * ```
         */
        this.applyPreset = async (options) => {
            this.wire.sendAction('layout-apply-preset').catch((e) => {
                // don't expose
            });
            const client = await this.platform.getClient();
            const { presetType } = options;
            if (!presetType || !(0, common_utils_1$1.isValidPresetType)(presetType)) {
                throw new Error('Cannot apply preset layout, please include an applicable presetType property in the PresetLayoutOptions.');
            }
            await client.dispatch('apply-preset-layout', {
                target: this.identity,
                opts: { presetType }
            });
        };
        const errorMsg = (0, validate_1.validateIdentity)(identity);
        if (errorMsg) {
            throw new Error(errorMsg);
        }
        this.identity = identity;
        this.platform = this.fin.Platform.wrapSync({ uuid: identity.uuid });
        if (identity.uuid === this.fin.me.uuid && identity.name === this.fin.me.name) {
            this.init = this.fin.Platform.Layout.init;
        }
    }
    /**
     * Returns the configuration of the window's layout.  Returns the same information that is returned for all windows in getSnapshot.
     *
     * @remarks Cannot be called from a View.
     *
     *
     * @example
     * ```js
     * const layout = fin.Platform.Layout.getCurrentSync();
     * // Use wrapped instance to get the layout configuration of the current window's Layout:
     * const layoutConfig = await layout.getConfig();
     * ```
     */
    async getConfig() {
        this.wire.sendAction('layout-get-config').catch((e) => {
            // don't expose
        });
        const client = await this.platform.getClient();
        return client.dispatch('get-frame-snapshot', {
            target: this.identity
        });
    }
    /**
     * Retrieves the attached views in current window layout.
     *
     * @example
     * ```js
     * const layout = fin.Platform.Layout.getCurrentSync();
     * const views = await layout.getCurrentViews();
     * ```
     */
    async getCurrentViews() {
        this.wire.sendAction('layout-get-views').catch((e) => {
            // don't expose
        });
        const client = await this.platform.getClient();
        const viewIdentities = await client.dispatch('get-layout-views', {
            target: this.identity
        });
        return viewIdentities.map((identity) => this.fin.View.wrapSync(identity));
    }
    /**
     * Retrieves the top level content item of the layout.
     *
     * @remarks Cannot be called from a view.
     *
     *
     *
     * @example
     * ```js
     * if (!fin.me.isWindow) {
     *     throw new Error('Not running in a platform View.');
     * }
     *
     * // From the layout window
     * const layout = fin.Platform.Layout.getCurrentSync();
     * // Retrieves the ColumnOrRow instance
     * const rootItem = await layout.getRootItem();
     * const content = await rootItem.getContent();
     * console.log(`The root ColumnOrRow instance has ${content.length} item(s)`);
     * ```
     */
    async getRootItem() {
        this.wire.sendAction('layout-get-root-item').catch(() => {
            // don't expose
        });
        const client = await __classPrivateFieldGet$7(this, _Layout_layoutClient, "f").getValue();
        const root = await client.getRoot('layoutName' in this.identity ? this.identity : undefined);
        return layout_entities_1.LayoutNode.getEntity(root, client);
    }
    /**
     * Retrieves the OpenFin.TabStack instance which the View belongs to.
     *
     * @example
     * ```js
     * const viewIdentity = { uuid: 'uuid', name: 'view-name' };
     * const stack = await fin.View.wrapSync(viewIdentity).getStackByViewIdentity(viewIdentity);
     * console.log(await stack.getViews());
     * ```
     */
    async getStackByViewIdentity(identity) {
        this.wire.sendAction('layout-get-stack-by-view').catch(() => {
            // don't expose
        });
        const client = await __classPrivateFieldGet$7(this, _Layout_layoutClient, "f").getValue();
        const stack = await client.getStackByView(identity);
        if (!stack) {
            throw new Error(`No stack found for view: ${identity.uuid}/${identity.name}`);
        }
        return layout_entities_1.LayoutNode.getEntity(stack, client);
    }
    /**
     * Adds a view to the platform layout. Behaves like {@link Platform#createView Platform.createView} with the current layout as the target.
     *
     * @param viewOptions - The options for creating the view.
     * @param options - Optional parameters for adding the view.
     * @param options.location - The location where the view should be added.
     * @param options.targetView - The target view to which the new view should be added.
     * @returns A promise that resolves to an object containing the identity of the added view.
     */
    async addView(viewOptions, { location, targetView } = {}) {
        this.wire.sendAction('layout-add-view').catch((e) => {
            // don't expose
        });
        const { identity } = await __classPrivateFieldGet$7(this, _Layout_instances, "m", _Layout_forwardLayoutAction).call(this, 'layout-add-view', {
            viewOptions,
            location,
            targetView
        });
        return { identity };
    }
    /**
     * Closes a view by its identity. Throws an error if the view does not belong to the current layout.
     * Behaves like {@link Platform#closeView Platform.closeView} but only closes the view if it belongs the current layout.
     *
     * @param viewIdentity - The identity of the view to close.
     * @returns A promise that resolves when the view is closed.
     */
    async closeView(viewIdentity) {
        this.wire.sendAction('layout-close-view').catch((e) => {
            // don't expose
        });
        await __classPrivateFieldGet$7(this, _Layout_instances, "m", _Layout_forwardLayoutAction).call(this, 'layout-close-view', { viewIdentity });
    }
}
Instance$1.Layout = Layout;
_Layout_layoutClient = new WeakMap(), _Layout_instances = new WeakSet(), _Layout_forwardLayoutAction = 
/**
 * @internal
 * Use to type-guard actions sent to the layout via the provider.
 */
async function _Layout_forwardLayoutAction(action, payload) {
    const client = await this.platform.getClient();
    return client.dispatch(action, { target: this.identity, opts: payload });
};

var __classPrivateFieldGet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$6 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _LayoutModule_instances, _LayoutModule_layoutInitializationAttempted, _LayoutModule_layoutManager, _LayoutModule_getLayoutManagerSpy, _LayoutModule_getSafeLayoutManager;
Object.defineProperty(Factory$2, "__esModule", { value: true });
Factory$2.LayoutModule = void 0;
const base_1$7 = base;
const Instance_1$2 = Instance$1;
const layout_constants_1 = layout_constants;
/**
 * Static namespace for OpenFin API methods that interact with the {@link Layout} class, available under `fin.Platform.Layout`.
 */
class LayoutModule extends base_1$7.Base {
    constructor() {
        super(...arguments);
        _LayoutModule_instances.add(this);
        _LayoutModule_layoutInitializationAttempted.set(this, false);
        _LayoutModule_layoutManager.set(this, null);
        /**
         * Initialize the window's Layout.
         *
         * @remarks Must be called from a custom window that has a 'layout' option set upon creation of that window.
         * If a containerId is not provided, this method attempts to find an element with the id `layout-container`.
         * A Layout will emit events locally on the DOM element representing the layout-container.
         * In order to capture the relevant events during Layout initiation, set up the listeners on the DOM element prior to calling `init`.
         * @param options - Layout init options.
         *
         * @experimental
         *
         * @example
         * ```js
         * // If no options are included, the layout in the window options is initialized in an element with the id `layout-container`
         * const layout = await fin.Platform.Layout.init();
         * ```
         * <br>
         *
         * ```js
         * const containerId = 'my-custom-container-id';
         *
         * const myLayoutContainer = document.getElementById(containerId);
         *
         * myLayoutContainer.addEventListener('tab-created', function(event) {
         *     const { tabSelector } = event.detail;
         *     const tabElement = document.getElementById(tabSelector);
         *     const existingColor = tabElement.style.backgroundColor;
         *     tabElement.style.backgroundColor = "red";
         *     setTimeout(() => {
         *         tabElement.style.backgroundColor = existingColor;
         *     }, 2000);
         * });
         *
         * // initialize the layout into an existing HTML element with the div `my-custom-container-id`
         * // the window must have been created with a layout in its window options
         * const layout = await fin.Platform.Layout.init({ containerId });
         * ```
         */
        this.init = async (options = {}) => {
            this.wire.sendAction('layout-init').catch((e) => {
                // don't expose
            });
            if (!this.wire.environment.layoutAllowedInContext(this.fin)) {
                throw new Error('Layout.init can only be called from a Window context.');
            }
            if (__classPrivateFieldGet$6(this, _LayoutModule_layoutInitializationAttempted, "f")) {
                throw new Error('Layout.init was already called, please use Layout.create to add additional layouts.');
            }
            if (this.wire.environment.type === 'openfin') {
                // preload the client
                await this.fin.Platform.getCurrentSync().getClient();
            }
            __classPrivateFieldSet$6(this, _LayoutModule_layoutInitializationAttempted, true, "f");
            // TODO: rename to createLayoutManager
            __classPrivateFieldSet$6(this, _LayoutModule_layoutManager, await this.wire.environment.initLayoutManager(this.fin, this.wire, options), "f");
            await this.wire.environment.applyLayoutSnapshot(this.fin, __classPrivateFieldGet$6(this, _LayoutModule_layoutManager, "f"), options);
            const meIdentity = { name: this.fin.me.name, uuid: this.fin.me.uuid };
            if (!options.layoutManagerOverride) {
                // CORE-1081 to be removed when we actually delete the `layoutManager` prop
                // in single-layout case, we return the undocumented layoutManager type
                const layoutIdentity = { layoutName: layout_constants_1.DEFAULT_LAYOUT_KEY, ...meIdentity };
                return __classPrivateFieldGet$6(this, _LayoutModule_getLayoutManagerSpy, "f").call(this, layoutIdentity);
            }
            return this.wrapSync(meIdentity);
        };
        _LayoutModule_getLayoutManagerSpy.set(this, (layoutIdentity) => {
            const msg = '[Layout] You are using a deprecated property `layoutManager` - it will throw if you access it starting in v37.';
            const managerProxy = new Proxy({}, {
                get(target, key) {
                    console.warn(`[Layout-mgr-proxy] accessing ${key.toString()}`);
                    throw new Error(msg);
                }
            });
            const layout = Object.assign(this.wrapSync(layoutIdentity), { layoutManager: managerProxy });
            const layoutProxy = new Proxy(layout, {
                get(target, key) {
                    if (key === 'layoutManager') {
                        console.warn(`[Layout-proxy] accessing ${key.toString()}`);
                        throw new Error(msg);
                    }
                    return target[key];
                }
            });
            return layoutProxy;
        });
        /**
         * Returns the layout manager for the current window
         * @returns
         */
        this.getCurrentLayoutManagerSync = () => {
            return __classPrivateFieldGet$6(this, _LayoutModule_instances, "m", _LayoutModule_getSafeLayoutManager).call(this, `fin.Platform.Layout.getCurrentLayoutManagerSync()`);
        };
        this.create = async (options) => {
            return this.wire.environment.createLayout(__classPrivateFieldGet$6(this, _LayoutModule_instances, "m", _LayoutModule_getSafeLayoutManager).call(this, `fin.Platform.Layout.create()`), options);
        };
        this.destroy = async (layoutIdentity) => {
            return this.wire.environment.destroyLayout(__classPrivateFieldGet$6(this, _LayoutModule_instances, "m", _LayoutModule_getSafeLayoutManager).call(this, `fin.Platform.Layout.destroy()`), layoutIdentity);
        };
    }
    /**
     * Asynchronously returns a Layout object that represents a Window's layout.
     *
     * @example
     * ```js
     * let windowIdentity;
     * if (!fin.me.isWindow) {
     *     windowIdentity = fin.me.identity;
     * } else if (fin.me.isView) {
     *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
     * } else {
     *     throw new Error('Not running in a platform View or Window');
     * }
     *
     * const layout = await fin.Platform.Layout.wrap(windowIdentity);
     * // Use wrapped instance to control layout, e.g.:
     * const layoutConfig = await layout.getConfig();
     * ```
     */
    async wrap(identity) {
        this.wire.sendAction('layout-wrap').catch((e) => {
            // don't expose
        });
        return new Instance_1$2.Layout(identity, this.wire);
    }
    /**
     * Synchronously returns a Layout object that represents a Window's layout.
     *
     * @example
     * ```js
     * let windowIdentity;
     * if (!fin.me.isWindow) {
     *     windowIdentity = fin.me.identity;
     * } else if (fin.me.isView) {
     *     windowIdentity = (await fin.me.getCurrentWindow()).identity;
     * } else {
     *     throw new Error('Not running in a platform View or Window');
     * }
     *
     * const layout = fin.Platform.Layout.wrapSync(windowIdentity);
     * // Use wrapped instance to control layout, e.g.:
     * const layoutConfig = await layout.getConfig();
     * ```
     */
    wrapSync(identity) {
        this.wire.sendAction('layout-wrap-sync').catch((e) => {
            // don't expose
        });
        return new Instance_1$2.Layout(identity, this.wire);
    }
    /**
     * Asynchronously returns a Layout object that represents a Window's layout.
     *
     * @example
     * ```js
     * const layout = await fin.Platform.Layout.getCurrent();
     * // Use wrapped instance to control layout, e.g.:
     * const layoutConfig = await layout.getConfig();
     * ```
     */
    async getCurrent() {
        this.wire.sendAction('layout-get-current').catch((e) => {
            // don't expose
        });
        if (this.wire.environment.type === 'openfin' && !this.fin.me.isWindow) {
            throw new Error('You are not in a Window context.  Only Windows can have a Layout.');
        }
        const { uuid, name } = this.fin.me;
        return this.wrap({ uuid, name });
    }
    /**
     * Synchronously returns a Layout object that represents a Window's layout.
     *
     * @remarks Cannot be called from a view.
     *
     *
     * @example
     * ```js
     * const layout = fin.Platform.Layout.getCurrentSync();
     * // Use wrapped instance to control layout, e.g.:
     * const layoutConfig = await layout.getConfig();
     * ```
     */
    getCurrentSync() {
        this.wire.sendAction('layout-get-current-sync').catch((e) => {
            // don't expose
        });
        if (this.wire.environment.type === 'openfin' && !this.fin.me.isWindow) {
            throw new Error('You are not in a Window context.  Only Windows can have a Layout.');
        }
        const { uuid, name } = this.fin.me;
        return this.wrapSync({ uuid, name });
    }
    /**
     * Retrieves the OpenFin.Layout instance for the Window the View is attached to.
     *
     * @example
     * ```js
     * const viewIdentity = { uuid: 'uuid', name: 'view-name' };
     * const layout = await fin.Platform.Layout.getLayoutByViewIdentity(viewIdentity);
     * console.log(await layout.getCurrentViews());
     * ```
     */
    async getLayoutByViewIdentity(viewIdentity) {
        this.wire.sendAction('layout-get-by-view-identity').catch(() => {
            // don't expose
        });
        const winIdentity = await this.wire.environment.getViewWindowIdentity(this.fin, viewIdentity);
        let layoutWindowIdentity = winIdentity;
        // TODO: CORE-1857 - when we tearout active layout or drag a view out of a window, the above identity includes the whole window info.
        if (layoutWindowIdentity.identity) {
            layoutWindowIdentity = layoutWindowIdentity.identity;
        }
        try {
            const layoutWindow = this.wrapSync(layoutWindowIdentity);
            const client = await Instance_1$2.Layout.getClient(layoutWindow);
            const layoutIdentity = await client.getLayoutIdentityForViewOrThrow(viewIdentity);
            return this.wrapSync(layoutIdentity);
        }
        catch (e) {
            const allowedErrors = [
                'No action registered at target for',
                'getLayoutIdentityForViewOrThrow is not a function'
            ];
            if (!allowedErrors.some((m) => e.message.includes(m))) {
                throw e;
            }
            // If a view is attached to provider window, return null
            if (layoutWindowIdentity.uuid === layoutWindowIdentity.name) {
                throw new Error(`View identity ${JSON.stringify(viewIdentity)} is not attached to any layout in provider window ${JSON.stringify(layoutWindowIdentity)}.`);
            }
            // fallback logic for missing endpoint in older runtimes
            return this.wrapSync(layoutWindowIdentity);
        }
    }
}
Factory$2.LayoutModule = LayoutModule;
_LayoutModule_layoutInitializationAttempted = new WeakMap(), _LayoutModule_layoutManager = new WeakMap(), _LayoutModule_getLayoutManagerSpy = new WeakMap(), _LayoutModule_instances = new WeakSet(), _LayoutModule_getSafeLayoutManager = function _LayoutModule_getSafeLayoutManager(method) {
    if (!__classPrivateFieldGet$6(this, _LayoutModule_layoutManager, "f")) {
        throw new Error(`You must call init before using the API ${method}`);
    }
    return __classPrivateFieldGet$6(this, _LayoutModule_layoutManager, "f");
};

(function (exports) {
	/**
	 * Entry point for the OpenFin `Layout` subset of the `Platform` API (`fin.Platform.Layout`).
	 *
	 * * {@link LayoutModule} contains static members of the `Layout` API, accessible through `fin.Platform.Layout`.
	 * * {@link Layout} describes an instance of an OpenFin Layout, e.g. as returned by `fin.Platform.Layout.getCurrent`.
	 *
	 * These are separate code entities, and are documented separately. In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
	 * both of these were documented on the same page.
	 *
	 * @packageDocumentation
	 *
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(Factory$2, exports);
	__exportStar(Instance$1, exports); 
} (layout));

Object.defineProperty(Factory$3, "__esModule", { value: true });
Factory$3.PlatformModule = void 0;
const base_1$6 = base;
const Instance_1$1 = Instance$2;
const index_1$1 = layout;
/**
 * Static namespace for OpenFin API methods that interact with the {@link Platform} class, available under `fin.Platform`.
 */
class PlatformModule extends base_1$6.Base {
    /**
     * @internal
     */
    constructor(wire, channel) {
        super(wire);
        this._channel = channel;
        /**
         *
         * @desc Layouts give app providers the ability to embed multiple views in a single window.  The Layout namespace
         * enables the initialization and manipulation of a window's Layout.  A Layout will
         * <a href="tutorial-Layout.DOMEvents.html">emit events locally</a> on the DOM element representing the layout-container.
         */
        this.Layout = new index_1$1.LayoutModule(this.wire);
    }
    /**
     * Initializes a Platform. Must be called from the Provider when using a custom provider.
     * @param options - platform options including a callback function that can be used to extend or replace
     * default Provider behavior.
     *
     * @remarks Must be called from the Provider when using a custom provider.
     *
     * @example
     *
     * ```js
     * // From Provider context
     * await fin.Platform.init();
     * // Platform API is now hooked up and windows contained in the manifest snapshot are open.
     * ```
     *
     * `Platform.init` accepts an options object that can contain a callback function which can be used to extend or
     * replace default Provider behavior. As an argument, this function will receive the `Provider` class, which is
     * used to handle Platform actions. The function must return an object with methods to handle Platform API actions.
     * The recommended approach is to extend the `Provider` class, overriding the methods you wish to alter, and return an
     * instance of your subclass:
     *
     * ```js
     * const overrideCallback = async (PlatformProvider) => {
     *     // Actions can be performed before initialization.
     *     // e.g. we might authenticate a user, set up a Channel, etc before initializing the Platform.
     *     const { manifestUrl } = await fin.Application.getCurrentSync().getInfo();
     *
     *     // Extend or replace default PlatformProvider behavior by extending the PlatformProvider class.
     *     class MyOverride extends PlatformProvider {
     *         // Default behavior can be changed by implementing methods with the same names as those used by the default PlatformProvider.
     *         async getSnapshot() {
     *             // Since we are extending the class, we can call `super` methods to access default behavior.
     *             const snapshot = await super.getSnapshot();
     *             // But we can modify return values.
     *             return { ...snapshot, answer: 42, manifestUrl };
     *         }
     *         async replaceLayout({ opts, target }) {
     *             // To disable an API method, overwrite with a noop function.
     *             return;
     *         }
     *     }
     *     // Return instance with methods to be consumed by Platform.
     *     // The returned object must implement all methods of the PlatformProvider class.
     *     // By extending the class, we can simply inherit methods we do not wish to alter.
     *     return new MyOverride();
     * };
     *
     * fin.Platform.init({overrideCallback});
     * ```
     * @experimental
     */
    async init(options) {
        if (!fin.__internal_.isPlatform || fin.me.name !== fin.me.uuid) {
            throw new Error('fin.Platform.init should only be called from a custom platform provider running in the main window of the application.');
        }
        return this.wire.environment.initPlatform(this.fin, options);
    }
    /**
     * Asynchronously returns a Platform object that represents an existing platform.
     *
     * @example
     * ```js
     * const { identity } = fin.me;
     * const platform = await fin.Platform.wrap(identity);
     * // Use wrapped instance to control layout, e.g.:
     * const snapshot = await platform.getSnapshot();
     * ```
     */
    async wrap(identity) {
        this.wire.sendAction('platform-wrap').catch((e) => {
            // don't expose
        });
        return new Instance_1$1.Platform(this.wire, { uuid: identity.uuid });
    }
    /**
     * Synchronously returns a Platform object that represents an existing platform.
     *
     * @example
     * ```js
     * const { identity } = fin.me;
     * const platform = fin.Platform.wrapSync(identity);
     * // Use wrapped instance to control layout, e.g.:
     * const snapshot = await platform.getSnapshot();
     * ```
     */
    wrapSync(identity) {
        this.wire.sendAction('platform-wrap-sync').catch((e) => {
            // don't expose
        });
        return new Instance_1$1.Platform(this.wire, { uuid: identity.uuid });
    }
    /**
     * Asynchronously returns a Platform object that represents the current platform.
     *
     * @example
     * ```js
     * const platform = await fin.Platform.getCurrent();
     * // Use wrapped instance to control layout, e.g.:
     * const snapshot = await platform.getSnapshot();
     * ```
     */
    async getCurrent() {
        this.wire.sendAction('platform-get-current').catch((e) => {
            // don't expose
        });
        return this.wrap({ uuid: this.wire.me.uuid });
    }
    /**
     * Synchronously returns a Platform object that represents the current platform.
     *
     * @example
     * ```js
     * const platform = fin.Platform.getCurrentSync();
     * // Use wrapped instance to control layout, e.g.:
     * const snapshot = await platform.getSnapshot();
     * ```
     */
    getCurrentSync() {
        this.wire.sendAction('platform-get-current-sync').catch((e) => {
            // don't expose
        });
        return this.wrapSync({ uuid: this.wire.me.uuid });
    }
    /**
     * Creates and starts a Platform and returns a wrapped and running Platform instance. The wrapped Platform methods can
     * be used to launch content into the platform.  Promise will reject if the platform is already running.
     *
     * @example
     * ```js
     * try {
     *     const platform = await fin.Platform.start({
     *         uuid: 'platform-1',
     *         autoShow: false,
     *         defaultWindowOptions: {
     *             stylesheetUrl: 'css-sheet-url',
     *             cornerRounding: {
     *                 height: 10,
     *                 width: 10
     *             }
     *         }
     *     });
     *     console.log('Platform is running', platform);
     * } catch(e) {
     *     console.error(e);
     * }
     * ```
     */
    start(platformOptions) {
        this.wire.sendAction('platform-start').catch((e) => {
            // don't expose
        });
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                const { uuid } = platformOptions;
                // @ts-expect-error using private variable.
                const app = await this.fin.Application._create({ ...platformOptions, isPlatformController: true });
                // TODO: fix typing (internal)
                // @ts-expect-error
                app.once('platform-api-ready', () => resolve(this.wrapSync({ uuid })));
                // @ts-expect-error using private variable.
                app._run({ uuid });
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * Retrieves platforms's manifest and returns a wrapped and running Platform.  If there is a snapshot in the manifest,
     * it will be launched into the platform.
     * @param manifestUrl - The URL of platform's manifest.
     * @param opts - Parameters that the RVM will use.
     *
     * @example
     * ```js
     * try {
     *     const platform = await fin.Platform.startFromManifest('https://openfin.github.io/golden-prototype/public.json');
     *     console.log('Platform is running, wrapped platform: ', platform);
     * } catch(e) {
     *     console.error(e);
     * }
     * // For a local manifest file:
     * try {
     *     const platform = await fin.Platform.startFromManifest('file:///C:/somefolder/app.json');
     *     console.log('Platform is running, wrapped platform: ', platform);
     * } catch(e) {
     *     console.error(e);
     * }
     * ```
     */
    startFromManifest(manifestUrl, opts) {
        this.wire.sendAction('platform-start-from-manifest').catch((e) => {
            // don't expose
        });
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            try {
                // @ts-expect-error using private variable.
                const app = await this.fin.Application._createFromManifest(manifestUrl);
                // TODO: fix typing (internal)
                // @ts-expect-error
                app.once('platform-api-ready', () => resolve(this.wrapSync({ uuid: app.identity.uuid })));
                // @ts-expect-error using private method without warning.
                app._run(opts);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
Factory$3.PlatformModule = PlatformModule;

(function (exports) {
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	/**
	 * Entry points for the OpenFin `Platform` API (`fin.Platform`)
	 *
	 * * {@link PlatformModule} contains static members of the `Platform` API, accessible through `fin.Platform`.
	 * * {@link Platform} describes an instance of an OpenFin Platform, e.g. as returned by `fin.Platform.getCurrent`.
	 *
	 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
	 * both of these were documented on the same page.
	 *
	 * @packageDocumentation
	 */
	__exportStar(Factory$3, exports);
	__exportStar(Instance$2, exports); 
} (platform));

var me = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getMe = exports.getBaseMe = exports.environmentUnsupportedMessage = void 0;
	const view_1 = requireView();
	const frame_1 = frame;
	const window_1 = requireWindow();
	const external_application_1 = externalApplication;
	exports.environmentUnsupportedMessage = 'You are not running in OpenFin.';
	function getBaseMe(entityType, uuid, name) {
	    const entityTypeHelpers = {
	        isView: entityType === 'view',
	        isWindow: entityType === 'window',
	        isFrame: entityType === 'iframe',
	        isExternal: entityType === 'external connection'
	    };
	    return { ...entityTypeHelpers, uuid, name, entityType };
	}
	exports.getBaseMe = getBaseMe;
	// We need to do a lot of casting as unknown here because the compiler get's confused about matching types. What matters is that it works on the outside
	function getMe(wire) {
	    const { uuid, name, entityType } = wire.me;
	    const unsupportedInterop = {
	        setContext() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        addContextHandler() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        getContextGroups() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        joinContextGroup() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        removeFromContextGroup() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        getAllClientsInContextGroup() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        getInfoForContextGroup() {
	            throw new Error(exports.environmentUnsupportedMessage);
	        }
	    };
	    const fallbackErrorMessage = 'Interop API has not been instantiated. Either connection has failed or you have not declared interop in your config.';
	    const fallbackInterop = {
	        setContext() {
	            throw new Error(fallbackErrorMessage);
	        },
	        addContextHandler() {
	            throw new Error(fallbackErrorMessage);
	        },
	        getContextGroups() {
	            throw new Error(fallbackErrorMessage);
	        },
	        joinContextGroup() {
	            throw new Error(fallbackErrorMessage);
	        },
	        removeFromContextGroup() {
	            throw new Error(fallbackErrorMessage);
	        },
	        getAllClientsInContextGroup() {
	            throw new Error(fallbackErrorMessage);
	        },
	        getInfoForContextGroup() {
	            throw new Error(fallbackErrorMessage);
	        }
	    };
	    const unsupportedEventBase = {
	        eventNames: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        emit: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        listeners: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        listenerCount: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        on: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        addListener: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        once: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        prependListener: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        prependOnceListener: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        removeListener: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        },
	        removeAllListeners: () => {
	            throw new Error(exports.environmentUnsupportedMessage);
	        }
	    };
	    switch (entityType) {
	        case 'view':
	            return Object.assign(new view_1.View(wire, { uuid, name }), getBaseMe(entityType, uuid, name), {
	                interop: fallbackInterop,
	                isOpenFin: true
	            });
	        case 'window':
	            return Object.assign(new window_1._Window(wire, { uuid, name }), getBaseMe(entityType, uuid, name), {
	                interop: fallbackInterop,
	                isOpenFin: true
	            });
	        case 'iframe':
	            return Object.assign(new frame_1._Frame(wire, { uuid, name }), getBaseMe(entityType, uuid, name), {
	                interop: fallbackInterop,
	                isOpenFin: true
	            });
	        case 'external connection':
	            return Object.assign(new external_application_1.ExternalApplication(wire, { uuid }), getBaseMe(entityType, uuid, name), {
	                interop: fallbackInterop,
	                isOpenFin: false
	            });
	        default:
	            return {
	                ...getBaseMe(entityType, uuid, name),
	                ...unsupportedEventBase,
	                interop: unsupportedInterop,
	                isOpenFin: false
	            };
	    }
	}
	exports.getMe = getMe; 
} (me));

var interop = {};

var Factory$1 = {};

var inaccessibleObject = {};

Object.defineProperty(inaccessibleObject, "__esModule", { value: true });
inaccessibleObject.createWarningObject = inaccessibleObject.createUnusableObject = void 0;
function createUnusableObject(message) {
    const handle = () => {
        throw new Error(message);
    };
    return new Proxy({}, {
        apply: handle,
        construct: handle,
        defineProperty: handle,
        deleteProperty: handle,
        get: handle,
        getOwnPropertyDescriptor: handle,
        getPrototypeOf: handle,
        has: handle,
        isExtensible: handle,
        ownKeys: handle,
        preventExtensions: handle,
        set: handle,
        setPrototypeOf: handle
    });
}
inaccessibleObject.createUnusableObject = createUnusableObject;
function createWarningObject(message, obj) {
    return new Proxy(obj, {
        get: (...args) => {
            // eslint-disable-next-line no-console
            console.warn(message);
            return Reflect.get(...args);
        },
        set: (...args) => {
            // eslint-disable-next-line no-console
            console.warn(message);
            return Reflect.set(...args);
        },
        getOwnPropertyDescriptor: (...args) => {
            // eslint-disable-next-line no-console
            console.warn(message);
            return Reflect.getOwnPropertyDescriptor(...args);
        },
        ownKeys: (...args) => {
            // eslint-disable-next-line no-console
            console.warn(message);
            return Reflect.ownKeys(...args);
        }
    });
}
inaccessibleObject.createWarningObject = createWarningObject;

var InteropBroker$1 = {};

var SessionContextGroupBroker$1 = {};

var utils$3 = {};

(function (exports) {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.checkContextIntegrity = exports.wrapIntentHandler = exports.BROKER_ERRORS = exports.generateOverrideWarning = exports.generateOverrideError = exports.wrapContextHandler = exports.wrapInTryCatch = exports.generateId = void 0;
	const generateId = () => `${Math.random()}${Date.now()}`;
	exports.generateId = generateId;
	const wrapInTryCatch = (f, prefix) => (...args) => {
	    try {
	        return f(...args);
	    }
	    catch (e) {
	        throw new Error((prefix || '') + e);
	    }
	};
	exports.wrapInTryCatch = wrapInTryCatch;
	const wrapContextHandler = (handler, handlerId) => {
	    return async (context) => {
	        try {
	            await handler(context);
	        }
	        catch (error) {
	            console.error(`Error thrown by handler ${handlerId} for context type ${context.type}: ${error}`);
	            throw error;
	        }
	    };
	};
	exports.wrapContextHandler = wrapContextHandler;
	const generateOverrideError = (clientApi, brokerApi) => {
	    return `You have tried to to use ${clientApi} but ${brokerApi} has not been overridden in the Interop Broker. Please override this function. Refer to our documentation for more info.`;
	};
	exports.generateOverrideError = generateOverrideError;
	const generateOverrideWarning = (fdc3ClientApi, brokerApi, identity, interopClientApi) => {
	    const { uuid, name } = identity;
	    const message = interopClientApi
	        ? `Entity with identity: ${uuid}/${name} has called ${interopClientApi} or ${fdc3ClientApi} but ${brokerApi} has not been overridden.`
	        : `Entity with identity: ${uuid}/${name} has called ${fdc3ClientApi} but ${brokerApi} has not been overridden.`;
	    return message;
	};
	exports.generateOverrideWarning = generateOverrideWarning;
	exports.BROKER_ERRORS = {
	    fireIntent: (0, exports.generateOverrideError)('fireIntent', 'handleFiredIntent'),
	    fireIntentForContext: (0, exports.generateOverrideError)('fireIntentForContext', 'handleFiredIntentForContext'),
	    getInfoForIntent: (0, exports.generateOverrideError)('getInfoForIntent', 'handleInfoForIntent'),
	    getInfoForIntentsByContext: (0, exports.generateOverrideError)('getInfoForIntentsByContext', 'handleInfoForIntentsByContext'),
	    joinSessionContextGroupWithJoinContextGroup: 'The Context Group you have tried to join is a Session Context Group. Custom Context Groups can only be defined by the Interop Broker through code or manifest configuration. Please use joinSessionContextGroup.',
	    fdc3Open: (0, exports.generateOverrideError)('fdc3.open', 'fdc3HandleOpen'),
	    fdc3FindInstances: (0, exports.generateOverrideError)('fdc3.findInstances', 'fdc3HandleFindInstances'),
	    fdc3GetAppMetadata: (0, exports.generateOverrideError)('fdc3.getAppMetadata', 'fdc3HandleGetAppMetadata'),
	    fdc3GetInfo: (0, exports.generateOverrideError)('fdc3.getInfo', 'fdc3HandleGetInfo')
	};
	const wrapIntentHandler = (handler, handlerId) => {
	    return async (intent) => {
	        try {
	            return handler(intent);
	        }
	        catch (error) {
	            console.error(`Error thrown by handler ${handlerId}: ${error}`);
	            throw error;
	        }
	    };
	};
	exports.wrapIntentHandler = wrapIntentHandler;
	const checkContextIntegrity = (context) => {
	    if (!context) {
	        return { isValid: false, reason: 'No context supplied' };
	    }
	    if (typeof context !== 'object') {
	        return { isValid: false, reason: 'Context must be an Object' };
	    }
	    if (!context.type) {
	        return { isValid: false, reason: 'Context must have a type property' };
	    }
	    return { isValid: true };
	};
	exports.checkContextIntegrity = checkContextIntegrity; 
} (utils$3));

Object.defineProperty(SessionContextGroupBroker$1, "__esModule", { value: true });
const utils_1$9 = utils$3;
class SessionContextGroupBroker {
    constructor(provider, id) {
        this.provider = provider;
        this.id = id;
        this.lastContext = undefined;
        this.contextGroupMap = new Map();
        this.clients = new Map();
        this.registerListeners();
    }
    registerListeners() {
        this.provider.register(`sessionContextGroup:getContext-${this.id}`, this.getCurrentContext.bind(this));
        this.provider.register(`sessionContextGroup:setContext-${this.id}`, this.setContext.bind(this));
        this.provider.register(`sessionContextGroup:handlerAdded-${this.id}`, this.handlerAdded.bind(this));
        this.provider.register(`sessionContextGroup:handlerRemoved-${this.id}`, this.handlerRemoved.bind(this));
    }
    getCurrentContext(payload) {
        return payload.type ? this.contextGroupMap.get(payload.type) : this.lastContext;
    }
    setContext(payload, clientIdentity) {
        const { context } = payload;
        const contextIntegrityCheckResult = (0, utils_1$9.checkContextIntegrity)(context);
        if (contextIntegrityCheckResult.isValid === false) {
            throw new Error(`Failed to set Context - bad Context. Reason: ${contextIntegrityCheckResult.reason}. Context: ${JSON.stringify(context)}`);
        }
        const clientState = this.getClientState(clientIdentity);
        if (!clientState) {
            // This shouldn't get hit.
            throw new Error(`Client with Identity: ${clientIdentity.uuid} ${clientIdentity.name} not in Session Client State Map`);
        }
        // set the context
        this.contextGroupMap.set(context.type, context);
        this.lastContext = context;
        const clientSubscriptionStates = Array.from(this.clients.values());
        clientSubscriptionStates.forEach((client) => {
            // eslint-disable-next-line no-unused-expressions
            client.contextHandlers.get(context.type)?.forEach((handlerId) => {
                this.provider.dispatch(client.clientIdentity, handlerId, context);
            });
            if (client.globalHandler) {
                this.provider.dispatch(client.clientIdentity, client.globalHandler, context);
            }
        });
    }
    getClientState(id) {
        return this.clients.get(id.endpointId);
    }
    async handlerAdded(payload, clientIdentity) {
        const { handlerId, contextType } = payload;
        const clientSubscriptionState = this.getClientState(clientIdentity);
        if (!clientSubscriptionState) {
            throw new Error(`Client with Identity: ${clientIdentity.uuid} ${clientIdentity.name} not in Client State Map`);
        }
        if (contextType) {
            const currentHandlerList = clientSubscriptionState.contextHandlers.get(contextType) || [];
            clientSubscriptionState.contextHandlers.set(contextType, [...currentHandlerList, handlerId]);
            const currentContext = this.contextGroupMap.get(contextType);
            if (currentContext) {
                await this.provider.dispatch(clientIdentity, handlerId, currentContext);
            }
        }
        else {
            clientSubscriptionState.globalHandler = handlerId;
            const globalDispatchPromises = [...this.contextGroupMap.keys()].map(async (currentContextType) => {
                const currentContext = this.contextGroupMap.get(currentContextType);
                if (currentContext) {
                    await this.provider.dispatch(clientIdentity, handlerId, currentContext);
                }
            });
            await Promise.all(globalDispatchPromises);
        }
    }
    handlerRemoved(payload, clientIdentity) {
        const { handlerId } = payload;
        const client = this.clients.get(clientIdentity.endpointId);
        if (client) {
            Array.from(client.contextHandlers).forEach(([, handlers]) => {
                const index = handlers.indexOf(handlerId);
                if (index > -1) {
                    handlers.splice(index, 1);
                }
            });
            if (client.globalHandler === handlerId) {
                client.globalHandler = undefined;
            }
        }
        else {
            console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${handlerId}. clientIdentity: ${clientIdentity}`);
        }
    }
    registerNewClient(clientIdentity) {
        if (!this.clients.has(clientIdentity.endpointId)) {
            const clientSubscriptionState = {
                contextHandlers: new Map(),
                clientIdentity,
                globalHandler: undefined
            };
            this.clients.set(clientIdentity.endpointId, clientSubscriptionState);
        }
    }
    onDisconnection(clientIdentity) {
        this.clients.delete(clientIdentity.endpointId);
    }
}
SessionContextGroupBroker$1.default = SessionContextGroupBroker;

var PrivateChannelProvider$1 = {};

Object.defineProperty(PrivateChannelProvider$1, "__esModule", { value: true });
PrivateChannelProvider$1.PrivateChannelProvider = void 0;
const utils_1$8 = utils$3;
class PrivateChannelProvider {
    constructor(provider, id) {
        this.provider = provider;
        this.id = id;
        this.clients = new Map();
        this.registerListeners();
        this.contextByContextType = new Map();
        this.lastContext = undefined;
        this.provider.onConnection((clientIdentity) => this.registerNewClient(clientIdentity));
        this.provider.onDisconnection(async (clientIdentity) => {
            const { endpointId } = clientIdentity;
            if (this.clients.has(endpointId)) {
                await this.handleClientDisconnecting(clientIdentity);
            }
            if ((await this.provider.getAllClientInfo()).length === 0) {
                this.provider.destroy();
            }
        });
    }
    getClientState(id) {
        return this.clients.get(id.endpointId);
    }
    registerListeners() {
        this.provider.register('broadcast', this.broadcast.bind(this));
        this.provider.register('getCurrentContext', this.getCurrentContext.bind(this));
        this.provider.register('contextHandlerAdded', this.contextHandlerAdded.bind(this));
        this.provider.register('contextHandlerRemoved', this.contextHandlerRemoved.bind(this));
        this.provider.register('nonStandardHandlerRemoved', this.nonStandardHandlerRemoved.bind(this));
        this.provider.register('onAddContextHandlerAdded', this.onAddContextHandlerAdded.bind(this));
        this.provider.register('onDisconnectHandlerAdded', this.onDisconnectHandlerAdded.bind(this));
        this.provider.register('onUnsubscribeHandlerAdded', this.onUnsubscribeHandlerAdded.bind(this));
        this.provider.register('clientDisconnecting', (payload, clientIdentity) => {
            this.handleClientDisconnecting(clientIdentity);
        });
    }
    broadcast(payload, broadcasterClientIdentity) {
        const { context } = payload;
        const broadcasterClientState = this.getClientState(broadcasterClientIdentity);
        if (!broadcasterClientState) {
            throw new Error(`Client with Identity: ${broadcasterClientIdentity.uuid} ${broadcasterClientIdentity.name}, tried to call broadcast, is not connected to this Private Channel`);
        }
        const contextIntegrityCheckResult = (0, utils_1$8.checkContextIntegrity)(context);
        if (contextIntegrityCheckResult.isValid === false) {
            throw new Error(`Failed to broadcast - bad Context. Reason: ${contextIntegrityCheckResult.reason}. Context: ${JSON.stringify(context)}`);
        }
        this.contextByContextType.set(context.type, context);
        this.lastContext = context;
        Array.from(this.clients.values()).forEach((currClientState) => {
            const handlerIdsForContextType = currClientState.handlerIdsByContextTypes.get(context.type);
            if (handlerIdsForContextType) {
                handlerIdsForContextType.forEach((handlerId) => {
                    this.provider.dispatch(currClientState.clientIdentity, handlerId, context);
                });
            }
            if (currClientState.globalHandler) {
                this.provider.dispatch(currClientState.clientIdentity, currClientState.globalHandler, context);
            }
        });
    }
    getCurrentContext(payload, senderClientIdentity) {
        const { contextType } = payload;
        const clientState = this.getClientState(senderClientIdentity);
        if (!clientState) {
            throw new Error(`Client with Identity: ${senderClientIdentity.uuid} ${senderClientIdentity.name}, tried to call getCurrentContext, is not connected to this Private Channel`);
        }
        if (contextType !== undefined) {
            const currentContext = this.contextByContextType.get(contextType);
            if (currentContext)
                return currentContext;
            return null;
        }
        return this.lastContext ? this.lastContext : null;
    }
    contextHandlerAdded(payload, senderClientIdentity) {
        const { handlerId, contextType } = payload;
        const senderClientState = this.getClientState(senderClientIdentity);
        if (!senderClientState) {
            throw new Error(`Client with Identity: ${senderClientIdentity.uuid} ${senderClientIdentity.name}, tried to call addContextListener, is not connected to this Private Channel`);
        }
        if (contextType) {
            const currentHandlersList = senderClientState.handlerIdsByContextTypes.get(contextType) || [];
            senderClientState.handlerIdsByContextTypes.set(contextType, [...currentHandlersList, handlerId]);
        }
        else {
            senderClientState.globalHandler = handlerId;
        }
        Array.from(this.clients.values()).forEach((currClientState) => {
            if (currClientState.clientIdentity.endpointId !== senderClientIdentity.endpointId &&
                currClientState.onAddContextListenerHandlerId) {
                this.provider.dispatch(currClientState.clientIdentity, currClientState.onAddContextListenerHandlerId, contextType);
            }
        });
    }
    async contextHandlerRemoved(payload, removingClientIdentity) {
        // MC: Made this removal async to ensure that onUnsubscribe handlers are hit before anything else happens.
        const { handlerId } = payload;
        const removingClientState = this.getClientState(removingClientIdentity);
        if (removingClientState) {
            let contextType;
            if (removingClientState.globalHandler === handlerId) {
                removingClientState.globalHandler = undefined;
            }
            else {
                for (const [currContextType, handlersIds] of removingClientState.handlerIdsByContextTypes) {
                    const index = handlersIds.indexOf(handlerId);
                    if (index > -1) {
                        handlersIds.splice(index, 1);
                        contextType = currContextType;
                    }
                }
            }
            // getting only valid client connections here, it is possible we haven't removed a disconnected client from the map yet
            // so we need to ensure we don't dispatch to any disconnected client
            // TODO: Take a look at our client disconnection logic and see if we can handle client disconnection cleanly
            const clientsToDispatchTo = await this.getConnectedClients();
            const dispatchPromises = clientsToDispatchTo.map(async (otherClientState) => {
                const { clientIdentity, clientIdentity: { endpointId }, onUnsubscribeHandlerId } = otherClientState;
                if (endpointId !== removingClientIdentity.endpointId && onUnsubscribeHandlerId) {
                    await this.provider.dispatch(clientIdentity, onUnsubscribeHandlerId, contextType);
                }
            });
            try {
                await Promise.all(dispatchPromises);
            }
            catch (error) {
                console.error(`Problem when attempting to dispatch to onUnsubscribeHandlers. Error: ${error} Removing Client: ${handlerId}. uuid: ${removingClientIdentity.uuid}. name: ${removingClientIdentity.name}. endpointId: ${removingClientIdentity.endpointId}`);
                throw new Error(error);
            }
        }
        else {
            console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${handlerId}. uuid: ${removingClientIdentity.uuid}. name: ${removingClientIdentity.name}. endpointId: ${removingClientIdentity.endpointId}.`);
        }
    }
    nonStandardHandlerRemoved(payload, id) {
        const { handlerId } = payload;
        const clientState = this.getClientState(id);
        if (clientState) {
            if (clientState.onDisconnectHandlerId === handlerId) {
                clientState.onDisconnectHandlerId = undefined;
            }
            else if (clientState.onAddContextListenerHandlerId === handlerId) {
                clientState.onAddContextListenerHandlerId = undefined;
            }
            else if (clientState.onUnsubscribeHandlerId === handlerId) {
                clientState.onUnsubscribeHandlerId = undefined;
            }
        }
        else {
            console.warn(`Trying to remove a handler from a client that isn't mapped. handlerId: ${handlerId}. clientIdentity: ${id}`);
        }
    }
    onAddContextHandlerAdded(payload, senderClientIdentity) {
        const clientState = this.getClientState(senderClientIdentity);
        const { handlerId } = payload;
        if (!clientState) {
            throw new Error(`Client with Identity: ${senderClientIdentity.uuid} ${senderClientIdentity.name}, tried to call onAddContextListener, is not connected to this Private Channel`);
        }
        clientState.onAddContextListenerHandlerId = handlerId;
        // FDC3 Spec says that the added listener should fire for all previously-registered addContextListeners from the other client
        Array.from(this.clients.values()).forEach((otherClientState) => {
            if (otherClientState.clientIdentity.endpointId !== senderClientIdentity.endpointId) {
                Array.from(otherClientState.handlerIdsByContextTypes.keys()).forEach((subscribedContextType) => {
                    this.provider.dispatch(senderClientIdentity, handlerId, subscribedContextType);
                });
            }
        });
    }
    onDisconnectHandlerAdded(payload, id) {
        const clientState = this.getClientState(id);
        const { handlerId } = payload;
        if (!clientState) {
            throw new Error(`Client with Identity: ${id.uuid} ${id.name}, tried to call onDisconnect, is not connected to this Private Channel`);
        }
        clientState.onDisconnectHandlerId = handlerId;
    }
    onUnsubscribeHandlerAdded(payload, id) {
        const clientState = this.getClientState(id);
        const { handlerId } = payload;
        if (!clientState) {
            throw new Error(`Client with Identity: ${id.uuid} ${id.name}, tried to call onUnsubscribe, is not connected to this Private Channel`);
        }
        clientState.onUnsubscribeHandlerId = handlerId;
    }
    removeClient(disconnectingClientIdentity) {
        const disconnectingClientState = this.getClientState(disconnectingClientIdentity);
        if (!disconnectingClientState) {
            throw new Error(`Client with Identity: ${disconnectingClientIdentity.uuid} ${disconnectingClientIdentity.name}, tried to call disconnect, is not connected to this Private Channel`);
        }
        disconnectingClientState.handlerIdsByContextTypes.clear();
        this.clients.delete(disconnectingClientIdentity.endpointId);
    }
    async fireOnDisconnectForOtherClients(disconnectingClientIdentity) {
        // TODO: call onDisconnect Handler of the other client only.
        // CURRENTLY, just calling the onDisconnect handler for all the other clients. Once we limit it to just one other client, we can eliminate all the iteration code.
        const { endpointId } = disconnectingClientIdentity;
        // getting only valid client connections here, it is possible we haven't removed a disconnected client from the map yet
        // so we need to ensure we don't dispatch to any disconnected client
        // TODO: Take a look at our client disconnection logic and see if we can handle client disconnection cleanly
        const clientsToDispatchTo = await this.getConnectedClients();
        const dispatchPromises = clientsToDispatchTo.map(async (otherClientState) => {
            const { clientIdentity: { endpointId: otherClientEndpointId }, onDisconnectHandlerId } = otherClientState;
            if (otherClientEndpointId !== endpointId && onDisconnectHandlerId) {
                await this.provider.dispatch(otherClientState.clientIdentity, onDisconnectHandlerId);
            }
        });
        try {
            await Promise.all(dispatchPromises);
        }
        catch (error) {
            console.error(`Problem when attempting to dispatch to onDisconnectHandlers. Error: ${error} Disconnecting Client: uuid: ${disconnectingClientIdentity.uuid}. name: ${disconnectingClientIdentity.name}. endpointId: ${disconnectingClientIdentity.endpointId}`);
            throw new Error(error);
        }
    }
    async unsubscribeAll(clientIdentity) {
        const { endpointId } = clientIdentity;
        const state = this.clients.get(endpointId);
        if (state) {
            const contextTypeHandlerIds = Array.from(state.handlerIdsByContextTypes.values()).flat();
            const globalHandlerId = state.globalHandler;
            if (contextTypeHandlerIds.length > 0) {
                const unsubPromises = contextTypeHandlerIds.map(async (handlerId) => {
                    return this.contextHandlerRemoved({ handlerId }, clientIdentity);
                });
                try {
                    await Promise.all(unsubPromises);
                }
                catch (error) {
                    console.error(error.message);
                }
            }
            if (globalHandlerId) {
                try {
                    await this.contextHandlerRemoved({ handlerId: globalHandlerId }, clientIdentity);
                }
                catch (error) {
                    console.error(error.message);
                }
            }
        }
    }
    async handleClientDisconnecting(disconnectingClientIdentity) {
        await this.unsubscribeAll(disconnectingClientIdentity);
        this.removeClient(disconnectingClientIdentity);
        await this.fireOnDisconnectForOtherClients(disconnectingClientIdentity);
    }
    registerNewClient(clientIdentity) {
        if (!this.clients.has(clientIdentity.endpointId)) {
            const clientSubscriptionState = {
                clientIdentity,
                handlerIdsByContextTypes: new Map(),
                globalHandler: undefined,
                onAddContextListenerHandlerId: undefined,
                onUnsubscribeHandlerId: undefined,
                onDisconnectHandlerId: undefined
            };
            this.clients.set(clientIdentity.endpointId, clientSubscriptionState);
        }
    }
    async getConnectedClients() {
        const allClientInfo = await this.provider.getAllClientInfo();
        return Array.from(this.clients.values()).filter((clientState) => {
            const { uuid, name } = clientState.clientIdentity;
            return allClientInfo.some((clientInfo) => {
                return name === clientInfo.name && uuid === clientInfo.uuid;
            });
        });
    }
    static init(channelProvider, id) {
        return new PrivateChannelProvider(channelProvider, id);
    }
}
PrivateChannelProvider$1.PrivateChannelProvider = PrivateChannelProvider;

var __classPrivateFieldSet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$5 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault$4 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _InteropBroker_fdc3Info, _InteropBroker_contextGroups, _InteropBroker_providerPromise;
Object.defineProperty(InteropBroker$1, "__esModule", { value: true });
InteropBroker$1.InteropBroker = void 0;
const base_1$5 = base;
const SessionContextGroupBroker_1 = __importDefault$4(SessionContextGroupBroker$1);
const utils_1$7 = utils$3;
const isEqual_1$1 = __importDefault$4(require$$3);
const PrivateChannelProvider_1 = PrivateChannelProvider$1;
const lazy_1 = lazy;
const defaultContextGroups = [
    {
        id: 'green',
        displayMetadata: {
            color: '#00CC88',
            name: 'green'
        }
    },
    {
        id: 'purple',
        displayMetadata: {
            color: '#8C61FF',
            name: 'purple'
        }
    },
    {
        id: 'orange',
        displayMetadata: {
            color: '#FF8C4C',
            name: 'orange'
        }
    },
    {
        id: 'red',
        displayMetadata: {
            color: '#FF5E60',
            name: 'red'
        }
    },
    {
        id: 'pink',
        displayMetadata: {
            color: '#FF8FB8',
            name: 'pink'
        }
    },
    {
        id: 'yellow',
        displayMetadata: {
            color: '#E9FF8F',
            name: 'yellow'
        }
    }
];
/**
 * {@link https://developers.openfin.co/of-docs/docs/enable-color-linking}
 *
 * The Interop Broker is responsible for keeping track of the Interop state of the Platform, and for directing messages to the proper locations.
 *
 * @remarks This class contains some types related to FDC3 that are specific to OpenFin. {@link https://developers.openfin.co/of-docs/docs/fdc3-support-in-openfin OpenFin's FDC3 support} is forward- and backward-compatible.
 * Standard types for {@link https://fdc3.finos.org/ FDC3} do not appear in OpenFin’s API documentation, to avoid duplication.
 *
 * ---
 *
 * There are 2 ways to inject custom functionality into the Interop Broker:
 *
 * **1. Configuration**
 *
 * At the moment, you can configure the default context groups for the Interop Broker without having to override it. To do so, include the `interopBrokerConfiguration` `contextGroups` option in your `platform` options in your manifest. This is the preferred method.
 * ```js
 * {
 *      "runtime": {
 *          "arguments": "--v=1 --inspect",
 *          "version": "alpha-v19"
 *      },
 *      "platform": {
 *          "uuid": "platform_customization_local",
 *          "applicationIcon": "https://openfin.github.io/golden-prototype/favicon.ico",
 *          "autoShow": false,
 *          "providerUrl": "http://localhost:5555/provider.html",
 *          "interopBrokerConfiguration": {
 *              "contextGroups": [
 *                  {
 *                      "id": "green",
 *                      "displayMetadata": {
 *                          "color": "#00CC88",
 *                          "name": "green"
 *                      }
 *                  },
 *                  {
 *                      "id": "purple",
 *                      "displayMetadata": {
 *                          "color": "#8C61FF",
 *                          "name": "purple"
 *                      }
 *                  },
 *              ]
 *          }
 *      }
 * }
 * ```
 *
 * By default the Interop Broker logs all actions to the console. You can disable this by using the logging option in `interopBrokerConfiguration`:
 * ```js
 * {
 *      "runtime": {
 *          "arguments": "--v=1 --inspect",
 *          "version": "alpha-v19"
 *      },
 *      "platform": {
 *          "uuid": "platform_customization_local",
 *          "applicationIcon": "https://openfin.github.io/golden-prototype/favicon.ico",
 *          "autoShow": false,
 *          "providerUrl": "http://localhost:5555/provider.html",
 *		    "interopBrokerConfiguration": {
 *       		"logging": {
 *   				"beforeAction": {
 *   					"enabled": false
 *   				},
 *   				"afterAction": {
 *   					"enabled": false
 *   				}
 *   			}
 *		    }
 *      }
 * }
 * ```
 *
 * ---
 * **2. Overriding**
 *
 * Similarly to how {@link https://developers.openfin.co/docs/platform-customization#section-customizing-platform-behavior Platform Overriding} works, you can override functions in the Interop Broker in `fin.Platform.init`. An example of that is shown below. Overriding `isConnectionAuthorized` and `isActionAuthorized` will allow you to control allowed connections and allowed actions.
 *
 * However, if there is custom functionality you wish to include in the Interop Broker, please let us know. We would like to provide better configuration options so that you don't have to continually maintain your own override code.
 *
 * ```js
 * fin.Platform.init({
 *     overrideCallback: async (Provider) => {
 *         class Override extends Provider {
 *             async getSnapshot() {
 *                 console.log('before getSnapshot')
 *                 const snapshot = await super.getSnapshot();
 *                 console.log('after getSnapshot')
 *                 return snapshot;
 *             }
 *
 *             async applySnapshot({ snapshot, options }) {
 *                 console.log('before applySnapshot')
 *                 const originalPromise = super.applySnapshot({ snapshot, options });
 *                 console.log('after applySnapshot')
 *
 *                 return originalPromise;
 *             }
 *         };
 *         return new Override();
 *     },
 *     interopOverride: async (InteropBroker) => {
 *         class Override extends InteropBroker {
 *             async joinContextGroup(channelName = 'default', target) {
 *                 console.log('before super joinContextGroup')
 *                 super.joinContextGroup(channelName, target);
 *                 console.log('after super joinContextGroup')
 *             }
 *         }
 *
 *       return new Override();
 *   }
 * });
 * ```
 *
 * ---
 *
 */
class InteropBroker extends base_1$5.Base {
    /**
     * @internal
     */
    constructor(wire, createProvider, options) {
        // Tip from Pierre and Michael from the overrideCheck work: Don't use bound methods for overrideable InteropBroker functions.
        super(wire);
        _InteropBroker_fdc3Info.set(this, void 0);
        _InteropBroker_contextGroups.set(this, void 0);
        _InteropBroker_providerPromise.set(this, void 0);
        this.getProvider = () => {
            return __classPrivateFieldGet$5(this, _InteropBroker_providerPromise, "f").getValue();
        };
        this.interopClients = new Map();
        this.contextGroupsById = new Map();
        __classPrivateFieldSet$5(this, _InteropBroker_contextGroups, options.contextGroups ?? [...defaultContextGroups], "f");
        __classPrivateFieldSet$5(this, _InteropBroker_fdc3Info, options.fdc3Info, "f");
        if (options?.logging) {
            this.logging = options.logging;
        }
        this.intentClientMap = new Map();
        this.lastContextMap = new Map();
        this.sessionContextGroupMap = new Map();
        __classPrivateFieldSet$5(this, _InteropBroker_providerPromise, new lazy_1.Lazy(createProvider), "f");
        this.setContextGroupMap();
        this.setupChannelProvider();
    }
    static createClosedConstructor(...args) {
        return class OverrideableBroker extends InteropBroker {
            constructor(...unused) {
                if (unused.length) {
                    const [_ignore1, ignore2, opts] = unused;
                    if (opts && typeof opts === 'object' && !(0, isEqual_1$1.default)(opts, args[2])) {
                        // eslint-disable-next-line no-console
                        console.warn('You have modified the parameters of the InteropOverride constructor. This behavior is deprecated and will be removed in a future version. You can modify these options in your manifest. Please consult our Interop docs for guidance on migrating to the new override scheme.');
                        super(args[0], args[1], opts);
                        return;
                    }
                    // eslint-disable-next-line no-console
                    console.warn('You are attempting to pass arguments to the InteropOverride constructor. This is not necessary, and these passed arguments will be ignored. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.');
                }
                super(...args);
            }
        };
    }
    /*
    Client API
    */
    /**
     * Sets a context for the context group of the incoming current entity.
     * @param setContextOptions - New context to set.
     * @param clientIdentity - Identity of the client sender.
     *
     */
    setContext({ context }, clientIdentity) {
        this.wire.sendAction('interop-broker-set-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const clientState = this.getClientState(clientIdentity);
        if (clientState && clientState.contextGroupId) {
            const { contextGroupId } = clientState;
            this.setContextForGroup({ context }, contextGroupId);
        }
        else if (clientState) {
            // Client has not joined any context group behavior.
            throw new Error('You must join a context group before you can set context.');
        }
        else {
            // This shouldn't get hit.
            throw new Error(`Client with Identity: ${clientIdentity.uuid} ${clientIdentity.name} not in Client State Map`);
        }
    }
    /**
     * Sets a context for the context group.
     * @param setContextOptions - New context to set.
     * @param contextGroupId - Context group id.
     *
     */
    setContextForGroup({ context }, contextGroupId) {
        this.wire.sendAction('interop-broker-set-context-for-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const contextGroupState = this.contextGroupsById.get(contextGroupId);
        if (!contextGroupState) {
            throw new Error(`Unable to set context for context group that isn't in the context group mapping: ${contextGroupId}.`);
        }
        const contextIntegrityCheckResult = InteropBroker.checkContextIntegrity(context);
        if (contextIntegrityCheckResult.isValid === false) {
            throw new Error(`Failed to set Context - bad Context. Reason: ${contextIntegrityCheckResult.reason}. Context: ${JSON.stringify(context)}`);
        }
        const broadcastedContextType = context.type;
        contextGroupState.set(broadcastedContextType, context);
        this.lastContextMap.set(contextGroupId, broadcastedContextType);
        const clientsInSameContextGroup = Array.from(this.interopClients.values()).filter((connectedClient) => connectedClient.contextGroupId === contextGroupId);
        clientsInSameContextGroup.forEach((client) => {
            for (const [, handlerInfo] of client.contextHandlers) {
                if (InteropBroker.isContextTypeCompatible(broadcastedContextType, handlerInfo.contextType)) {
                    this.invokeContextHandler(client.clientIdentity, handlerInfo.handlerId, context);
                }
            }
        });
    }
    /**
     * Get current context for a client subscribed to a Context Group.
     *
     * @remarks It takes an optional Context Type argument and returns the last context of that type.
     *
     * @param getContextOptions - Options for getting context
     * @param clientIdentity - Identity of the client sender.
     *
     */
    getCurrentContext(getCurrentContextOptions, clientIdentity) {
        this.wire.sendAction('interop-broker-get-current-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const clientState = this.getClientState(clientIdentity);
        if (!clientState?.contextGroupId) {
            throw new Error('You must be a member of a context group to call getCurrentContext');
        }
        const { contextGroupId } = clientState;
        const contextGroupState = this.contextGroupsById.get(contextGroupId);
        const lastContextType = this.lastContextMap.get(contextGroupId);
        const contextType = getCurrentContextOptions?.contextType ?? lastContextType;
        return contextGroupState && contextType ? contextGroupState.get(contextType) : undefined;
    }
    /*
    Platform Window APIs
    */
    // joinContextGroup and addClientToContextGroup are separate functions here, for easier overrides and separation of concerns.
    // joinContextGroup checks all connections for matching identities, in case we have multiple connection from an entity.
    /**
     * Join all connections at the given identity (or just one if endpointId provided) to context group `contextGroupId`.
     * If no target is specified, it adds the sender to the context group.
     * joinContextGroup is responsible for checking connections at the incoming identity. It calls {@link InteropBroker#addClientToContextGroup InteropBroker.addClientToContextGroup} to actually group the client.
     * Used by Platform Windows.
     *
     * @param joinContextGroupOptions - Id of the Context Group and identity of the entity to join to the group.
     * @param senderIdentity - Identity of the client sender.
     */
    async joinContextGroup({ contextGroupId, target }, senderIdentity) {
        this.wire.sendAction('interop-broker-join-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        if (this.sessionContextGroupMap.has(contextGroupId)) {
            throw new Error(utils_1$7.BROKER_ERRORS.joinSessionContextGroupWithJoinContextGroup);
        }
        if (target) {
            // If an endpointId is provided, use that. This will likely be used by external adapters.
            if (InteropBroker.hasEndpointId(target)) {
                await this.addClientToContextGroup({ contextGroupId }, target);
            }
            // Sanity check here in case a single app has multiple connections
            try {
                const allConnections = this.channel.connections.filter((x) => x.uuid === target.uuid && x.name === target.name);
                if (!allConnections.length) {
                    throw new Error(`Given Identity ${target.uuid} ${target.name} is not connected to the Interop Broker.`);
                }
                if (allConnections.length > 1) {
                    // Should figure out how we want to handle this situation. In the meantime, just change context group for all connections.
                    console.warn(`More than one connection found for identity ${target.uuid} ${target.name}`);
                }
                const promises = [];
                for (const connection of allConnections) {
                    promises.push(this.addClientToContextGroup({ contextGroupId }, connection));
                }
                await Promise.all(promises);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            // No target provided, add the sender to the context group.
            await this.addClientToContextGroup({ contextGroupId }, senderIdentity);
        }
    }
    // addClientToContextGroup does the actual addition of the client to the Context Group
    /**
     * Helper function for {@link InteropBroker#joinContextGroup InteropBroker.joinContextGroup}. Does the work of actually adding the client to the Context Group.
     * Used by Platform Windows.
     *
     * @param addClientToContextGroupOptions - Contains the contextGroupId
     * @param clientIdentity - Identity of the client sender.
     */
    async addClientToContextGroup({ contextGroupId }, clientIdentity) {
        this.wire.sendAction('interop-broker-add-client-to-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const clientSubscriptionState = this.getClientState(clientIdentity);
        if (!clientSubscriptionState) {
            throw new Error(`Client with Identity: ${clientIdentity.uuid} ${clientIdentity.name} not in Client State Map`);
        }
        if (!this.getContextGroups().find((contextGroupInfo) => contextGroupInfo.id === contextGroupId)) {
            throw new Error(`Attempting to join a context group that does not exist: ${contextGroupId}. You may only join existing context groups.`);
        }
        const oldContextGroupId = clientSubscriptionState.contextGroupId;
        if (oldContextGroupId !== contextGroupId) {
            clientSubscriptionState.contextGroupId = contextGroupId;
            await this.setCurrentContextGroupInClientOptions(clientIdentity, contextGroupId);
            const contextGroupMap = this.contextGroupsById.get(contextGroupId);
            for (const [, handlerInfo] of clientSubscriptionState.contextHandlers) {
                const { contextType, handlerId } = handlerInfo;
                if (contextType === undefined) {
                    // Send this single handler all of the context, because it accepts all.
                    contextGroupMap.forEach((context, _) => {
                        this.invokeContextHandler(clientIdentity, handlerId, context);
                    });
                }
                else if (contextGroupMap.has(contextType)) {
                    const contextForType = contextGroupMap.get(contextType);
                    if (contextForType) {
                        this.invokeContextHandler(clientIdentity, handlerId, contextForType);
                    }
                }
            }
        }
    }
    // Removes the target from its context group. Similar structure to joinContextGroup.
    /**
     * Removes the specified target from a context group.
     * If no target is specified, it removes the sender from their context group.
     * removeFromContextGroup is responsible for checking connections at the incoming identity.
     *
     * @remarks It calls {@link InteropBroker#removeClientFromContextGroup InteropBroker.removeClientFromContextGroup} to actually ungroup
     * the client. Used by Platform Windows.
     *
     * @param removeFromContextGroupOptions - Contains the target identity to remove.
     * @param senderIdentity - Identity of the client sender.
     */
    async removeFromContextGroup({ target }, senderIdentity) {
        this.wire.sendAction('interop-broker-remove-from-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        if (target) {
            // If an endpointId is provided, use that. This will likely be used by external adapters.
            if (InteropBroker.hasEndpointId(target)) {
                await this.removeClientFromContextGroup(target);
            }
            try {
                // Sanity check here in case a single app has multiple connections
                const allConnections = this.channel.connections.filter((x) => x.uuid === target.uuid && x.name === target.name);
                if (!allConnections.length) {
                    throw new Error(`No connection found for given Identity ${target.uuid} ${target.name}`);
                }
                if (allConnections.length > 1) {
                    console.warn(`More than one connection found for identity ${target.uuid} ${target.name}`);
                }
                const promises = [];
                for (const connection of allConnections) {
                    promises.push(this.removeClientFromContextGroup(connection));
                }
                await Promise.all(promises);
            }
            catch (error) {
                throw new Error(error);
            }
        }
        else {
            // No target provided, remove the sender from the context group.
            await this.removeClientFromContextGroup(senderIdentity);
        }
    }
    // removeClientFromContextGroup does the actual remove of the client from the Context Group
    /**
     * Helper function for {@link InteropBroker#removeFromContextGroup InteropBroker.removeFromContextGroup}. Does the work of actually removing the client from the Context Group.
     * Used by Platform Windows.
     *
     * @property { ClientIdentity } clientIdentity - Identity of the client sender.
     */
    async removeClientFromContextGroup(clientIdentity) {
        this.wire.sendAction('interop-broker-remove-client-from-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const clientState = this.getClientState(clientIdentity);
        if (clientState) {
            clientState.contextGroupId = undefined;
        }
        await this.setCurrentContextGroupInClientOptions(clientIdentity, null);
    }
    // Used by platform windows to know what client groups the provider has declared. Also used internally to access context groups. Overrideable so that the platform developer can modify it.
    /**
     * Returns the Interop-Broker-defined context groups available for an entity to join. Because this function is used in the rest of the Interop Broker to fetch the Context Groups, overriding this allows you to customize the Context Groups for the Interop Broker. However, we recommend customizing the context groups through configuration instead.
     * Used by Platform Windows.
     *
     */
    // eslint-disable-next-line class-methods-use-this
    getContextGroups() {
        this.wire.sendAction('interop-broker-get-context-groups').catch((e) => {
            // don't expose, analytics-only call
        });
        // Create copy for immutability
        return __classPrivateFieldGet$5(this, _InteropBroker_contextGroups, "f").map((contextGroup) => {
            return { ...contextGroup };
        });
    }
    // Used to by platform windows to get display metadata for a context group.
    /**
     * Gets display info for a context group
     *
     * @remarks Used by Platform Windows.
     *
     * @param getInfoForContextGroupOptions - Contains contextGroupId, the context group you wish to get display info for.
     *
     */
    getInfoForContextGroup({ contextGroupId }) {
        this.wire.sendAction('interop-broker-get-info-for-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        return this.getContextGroups().find((contextGroup) => contextGroup.id === contextGroupId);
    }
    // Used by platform windows to get all clients for a context group.
    /**
     * Gets all clients for a context group.
     *
     * @remarks **This is primarily used for platform windows. Views within a platform should not have to use this API.**
     * Returns the Interop-Broker-defined context groups available for an entity to join.
     *
     * @param getAllClientsInContextGroupOptions - Contains contextGroupId, the context group you wish to get clients for.
     *
     */
    getAllClientsInContextGroup({ contextGroupId }) {
        this.wire.sendAction('interop-broker-get-all-clients-in-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const clientsInContextGroup = Array.from(this.interopClients.values())
            .filter((connectedClient) => connectedClient.contextGroupId === contextGroupId)
            .map((subscriptionState) => {
            return subscriptionState.clientIdentity;
        });
        return clientsInContextGroup;
    }
    /**
     * Responsible for launching of applications that can handle a given intent, and delegation of intents to those applications.
     * Must be overridden.
     *
     * @remarks To make this call FDC3-Compliant it would need to return an IntentResolution.
     *
     * ```js
     * interface IntentResolution {
     *   source: TargetApp;
     *   // deprecated, not assignable from intent listeners
     *   data?: object;
     *   version: string;
     * }
     * ```
     *
     * More information on the IntentResolution type can be found in the [FDC3 documentation](https://fdc3.finos.org/docs/api/ref/IntentResolution).
     *
     * @param intent The combination of an action and a context that is passed to an application for resolution.
     * @param  clientIdentity Identity of the Client making the request.
     *
     * @example
     * ```js
     * // override call so we set intent target and create view that will handle it
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async handleFiredIntent(intent) {
     *                 super.setIntentTarget(intent, { uuid: 'platform-uuid', name: 'intent-view' });
     *                 const platform = fin.Platform.getCurrentSync();
     *                 const win = fin.Window.wrapSync({ name: 'foo', uuid: 'platform-uuid' });
     *                 const createdView = await platform.createView({ url: 'http://openfin.co', name: 'intent-view' }, win.identity);
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    // eslint-disable-next-line class-methods-use-this
    async handleFiredIntent(intent, clientIdentity // TODO(CORE-811): remove inline intersected type
    ) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.raiseIntent', 'InteropBroker.handleFiredIntent', clientIdentity, 'interopClient.fireIntent');
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.fireIntent);
    }
    /**
     * Should be called in {@link InteropBroker#handleFiredIntent InteropBroker.handleFiredIntent}.
     * While handleFiredIntent is responsible for launching applications, setIntentTarget is used to tell the InteropBroker which application should receive the intent when it is ready.
     * @param intent The combination of an action and a context that is passed to an application for resolution.
     * @param target - Identity of the target that will handle the intent.
     *
     */
    async setIntentTarget(intent, target) {
        this.wire.sendAction('interop-broker-set-intent-target').catch((e) => {
            // don't expose, this is only for api analytics purposes
        });
        const targetInfo = this.intentClientMap.get(target.name);
        const handlerId = `intent-handler-${intent.name}`;
        if (!targetInfo) {
            this.intentClientMap.set(target.name, new Map());
            const newHandlerInfoMap = this.intentClientMap.get(target.name);
            if (newHandlerInfoMap) {
                newHandlerInfoMap.set(handlerId, { isReady: false, pendingIntents: [intent] });
            }
        }
        else {
            const handlerInfo = targetInfo.get(handlerId);
            if (!handlerInfo) {
                targetInfo.set(handlerId, { isReady: false, pendingIntents: [intent] });
            }
            else {
                handlerInfo.pendingIntents.push(intent);
                if (handlerInfo.clientIdentity && handlerInfo.isReady) {
                    const { clientIdentity, pendingIntents } = handlerInfo;
                    try {
                        const intentToSend = pendingIntents[pendingIntents.length - 1];
                        await this.invokeIntentHandler(clientIdentity, handlerId, intentToSend);
                        handlerInfo.pendingIntents = [];
                    }
                    catch (error) {
                        console.error(`Error invoking intent handler for client ${clientIdentity.uuid}/${clientIdentity.name}/${clientIdentity.endpointId}`);
                        handlerInfo.isReady = false;
                    }
                }
            }
        }
    }
    /**
     * Responsible for returning information on a particular Intent.
     *
     * @remarks Whenever InteropClient.getInfoForIntent is called this function will fire. The options argument gives you
     * access to the intent name and any optional context that was passed and clientIdentity is the identity of the client
     * that made the call. Ideally here you would fetch the info for the intent and return it with the shape that the
     * InteropClient.getInfoForIntent call is expecting.
     *
     * To make this call FDC3-Compliant it would need to return an App Intent:
     *
     * ```js
     * // {
     * //     intent: { name: "StartChat", displayName: "Chat" },
     * //     apps: [{ name: "Skype" }, { name: "Symphony" }, { name: "Slack" }]
     * // }
     * ```
     *
     * More information on the AppIntent type can be found in the [FDC3 documentation](https://fdc3.finos.org/docs/api/ref/AppIntent).
     *
     * @param options
     * @param clientIdentity Identity of the Client making the request.
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async handleInfoForIntent(options, clientIdentity) {
     *                 // Your code goes here.
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    // eslint-disable-next-line class-methods-use-this
    async handleInfoForIntent(options, clientIdentity // TODO(CORE-811): remove inline intersected type
    ) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.findIntent', 'InteropBroker.handleInfoForIntent', clientIdentity, 'interopClient.getInfoForIntent');
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.getInfoForIntent);
    }
    /**
     * Responsible for returning information on which Intents are meant to handle a specific Context.
     * Must be overridden.
     *
     * @remarks Responsible for returning information on which Intents are meant to handle a specific Context. Must be overridden.
     *
     * Whenever InteropClient.getInfoForIntentsByContext is called this function will fire. The context argument gives you access to the context that the client wants information on and clientIdentity is the identity of the client that made the call. Ideally here you would fetch the info for any intent that can handle and return it with the shape that the InteropClient.getInfoForIntentsByContext call is expecting.
     *
     * To make this call FDC3-Compliant it would need to return an array of AppIntents:
     *
     * ```js
     * // [{
     * //     intent: { name: "StartCall", displayName: "Call" },
     * //     apps: [{ name: "Skype" }]
     * // },
     * // {
     * //     intent: { name: "StartChat", displayName: "Chat" },
     * //     apps: [{ name: "Skype" }, { name: "Symphony" }, { name: "Slack" }]
     * // }];
     * ```
     *
     * More information on the AppIntent type can be found in the [FDC3 documentation](https://fdc3.finos.org/docs/api/ref/AppIntent).
     *
     * @param context Data passed between entities and applications.
     * @param clientIdentity Identity of the Client making the request.
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async handleInfoForIntentsByContext(context, clientIdentity) {
     *                 // Your code goes here.
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    // eslint-disable-next-line class-methods-use-this
    async handleInfoForIntentsByContext(context, clientIdentity // TODO(CORE-811): remove inline intersected type
    ) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.findIntentsByContext', 'InteropBroker.handleInfoForIntentsByContext', clientIdentity, 'interopClient.getInfoForIntentsByContext');
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.getInfoForIntentsByContext);
    }
    /**
     * Responsible for resolving an Intent based on a specific Context.
     * Must be overridden.
     *
     * @remarks Whenever InteropClient.fireIntentForContext is called this function will fire. The contextForIntent argument
     * gives you access to the context that will be resolved to an intent. It also can optionally contain any metadata relevant
     * to resolving it, like a specific app the client wants the context to be handled by. The clientIdentity is the identity
     * of the client that made the call.
     *
     * To make this call FDC3-Compliant it would need to return an IntentResolution:
     *
     * ```js
     * // {
     * //     intent: { name: "StartChat", displayName: "Chat" },
     * //     apps: [{ name: "Skype" }, { name: "Symphony" }, { name: "Slack" }]
     * // }
     * ```
     *
     * More information on the IntentResolution type can be found in the [FDC3 documentation](https://fdc3.finos.org/docs/api/ref/Metadata#intentresolution).
     *
     * @param contextForIntent Data passed between entities and applications.
     * @param clientIdentity Identity of the Client making the request.
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async handleFiredIntentForContext(contextForIntent, clientIdentity) {
     *                 // Your code goes here.
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    // eslint-disable-next-line class-methods-use-this
    async handleFiredIntentForContext(contextForIntent, clientIdentity) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.raiseIntentForContext', 'InteropBroker.handleFiredIntentForContext', clientIdentity, 'interopClient.fireIntentForContext');
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.fireIntentForContext);
    }
    /**
     * Provides the identity of any Interop Client that disconnects from the Interop Broker. It is meant to be overriden.
     * @param clientIdentity
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async clientDisconnected(clientIdentity) {
     *                 const { uuid, name } = clientIdentity;
     *                 console.log(`Client with identity ${uuid}/${name} has been disconnected`);
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    // eslint-disable-next-line class-methods-use-this
    async clientDisconnected(clientIdentity) {
        // This function is called in channel.onDisconnection.
        // It is meant to be overridden to inform when an Interop Client has been disconnected.
    }
    /**
     * Responsible for resolving an fdc3.open call.
     * Must be overridden.
     * @param fdc3OpenOptions fdc3.open options
     * @param clientIdentity Identity of the Client making the request.
     */
    // eslint-disable-next-line class-methods-use-this
    async fdc3HandleOpen({ app, context }, clientIdentity) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.open', 'InteropBroker.fdc3HandleOpen', clientIdentity);
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.fdc3Open);
    }
    /**
     * Responsible for resolving the fdc3.findInstances call.
     * Must be overridden
     * @param app AppIdentifier that was passed to fdc3.findInstances
     * @param clientIdentity Identity of the Client making the request.
     */
    // eslint-disable-next-line class-methods-use-this
    async fdc3HandleFindInstances(app, clientIdentity) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.open', 'InteropBroker.fdc3HandleFindInstances', clientIdentity);
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.fdc3FindInstances);
    }
    /**
     * Responsible for resolving the fdc3.getAppMetadata call.
     * Must be overridden
     * @param app AppIdentifier that was passed to fdc3.getAppMetadata
     * @param clientIdentity Identity of the Client making the request.
     */
    // eslint-disable-next-line class-methods-use-this
    async fdc3HandleGetAppMetadata(app, clientIdentity) {
        const warning = (0, utils_1$7.generateOverrideWarning)('fdc3.getAppMetadata', 'InteropBroker.fdc3HandleGetAppMetadata', clientIdentity);
        console.warn(warning);
        throw new Error(utils_1$7.BROKER_ERRORS.fdc3GetAppMetadata);
    }
    /**
     * This function is called by the Interop Broker whenever a Context handler would fire.
     * For FDC3 2.0 you would need to override this function and add the contextMetadata as
     * part of the Context object. Then would you need to call
     * super.invokeContextHandler passing it this new Context object along with the clientIdentity and handlerId
     * @param clientIdentity
     * @param handlerId
     * @param context
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async invokeContextHandler(clientIdentity, handlerId, context) {
     *                 return super.invokeContextHandler(clientIdentity, handlerId, {
     *                     ...context,
     *                     contextMetadata: {
     *                         source: {
     *                             appId: 'openfin-app',
     *                             instanceId: '3D54D456D9HT0'
     *                         }
     *                     }
     *                 });
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    async invokeContextHandler(clientIdentity, handlerId, context) {
        const provider = await this.getProvider();
        try {
            await provider.dispatch(clientIdentity, handlerId, context);
        }
        catch (error) {
            console.error(`Error invoking context handler ${handlerId} for context type ${context.type} in client ${clientIdentity.uuid}/${clientIdentity.name}/${clientIdentity.endpointId}`, error);
        }
    }
    /**
     * This function is called by the Interop Broker whenever an Intent handler would fire.
     * For FDC3 2.0 you would need to override this function and add the contextMetadata as
     * part of the Context object inside the Intent object. Then would you need to call
     * super.invokeIntentHandler passing it this new Intent object along with the clientIdentity and handlerId
     * @param ClientIdentity
     * @param handlerId
     * @param context
     *
     * @example
     * ```js
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker) => {
     *         class Override extends InteropBroker {
     *             async invokeIntentHandler(clientIdentity, handlerId, context) {
     *                 const { context } = intent;
     *                 return super.invokeIntentHandler(clientIdentity, handlerId, {
     *                     ...intent,
     *                     context: {
     *                         ...context,
     *                         contextMetadata: {
     *                             source: {
     *                                 appId: 'openfin-app',
     *                                 instanceId: '3D54D456D9HT0'
     *                             }
     *                         }
     *                     }
     *                 });
     *             }
     *         }
     *         return new Override();
     *     }
     * });
     * ```
     */
    async invokeIntentHandler(clientIdentity, handlerId, intent) {
        const provider = await this.getProvider();
        await provider.dispatch(clientIdentity, handlerId, intent);
    }
    /**
     * Responsible for resolving fdc3.getInfo for FDC3 2.0
     * Would need to return the optionalFeatures and appMetadata for the {@link https://fdc3.finos.org/docs/api/ref/Metadata#implementationmetadata ImplementationMetadata}.
     * Must be overridden.
     * @param clientIdentity
     *
     */
    // eslint-disable-next-line class-methods-use-this
    async fdc3HandleGetInfo(payload, clientIdentity) {
        const { fdc3Version } = payload;
        return {
            fdc3Version,
            ...__classPrivateFieldGet$5(this, _InteropBroker_fdc3Info, "f"),
            optionalFeatures: {
                OriginatingAppMetadata: false,
                UserChannelMembershipAPIs: true
            },
            appMetadata: {
                appId: '',
                instanceId: ''
            }
        };
    }
    /**
     * Returns an array of info for each Interop Client connected to the Interop Broker.
     *
     * FDC3 2.0: Use the endpointId in the ClientInfo as the instanceId when generating
     * an AppIdentifier.
     *
     * @remarks FDC3 2.0 Note: When needing an instanceId to generate an AppIdentifier use this call to
     * get the endpointId and use it as the instanceId. In the Example below we override handleFiredIntent
     * and then call super.getAllClientInfo to generate the AppIdentifier for the IntentResolution.
     *
     *
     * @example
     * ```js
     * // FDC3 2.0 Example:
     * fin.Platform.init({
     *     interopOverride: async (InteropBroker, ...args) => {
     *         class Override extends InteropBroker {
     *             async handleFiredIntent(intent) {
     *                 super.setIntentTarget(intent, { uuid: 'platform-uuid', name: 'intent-view' });
     *                 const platform = fin.Platform.getCurrentSync();
     *                 const win = fin.Window.wrapSync({ name: 'foo', uuid: 'platform-uuid' });
     *                 const createdView = await platform.createView({ url: 'http://openfin.co', name: 'intent-view' }, win.identity);
     *
     *                 const allClientInfo = await super.getAllClientInfo();
     *
     *                 const infoForTarget = allClientInfo.find((clientInfo) => {
     *                     return clientInfo.uuid === 'platform-uuid' && clientInfo.name === 'intent-view';
     *                 });
     *
     *                 const source = {
     *                     appId: 'intent-view',
     *                     instanceId: infoForTarget.endpointId
     *                 }
     *
     *                 return {
     *                     source,
     *                     intent: intent.name
     *                 }
     *
     *             }
     *         }
     *         return new Override(...args);
     *     }
     * });
     * ```
     */
    async getAllClientInfo() {
        const provider = await this.getProvider();
        return provider.getAllClientInfo();
    }
    /*
    Snapshot APIs
    */
    // Used to save interop broker state in snapshots
    decorateSnapshot(snapshot) {
        return { ...snapshot, interopSnapshotDetails: { contextGroupStates: this.getContextGroupStates() } };
    }
    // Used to restore interop broker state in snapshots.
    applySnapshot(snapshot, options) {
        const contextGroupStates = snapshot?.interopSnapshotDetails?.contextGroupStates;
        if (contextGroupStates) {
            if (!options?.closeExistingWindows) {
                this.updateExistingClients(contextGroupStates);
            }
            this.rehydrateContextGroupStates(contextGroupStates);
        }
    }
    updateExistingClients(contextGroupStates) {
        const clients = this.interopClients;
        clients.forEach((subState) => {
            const { clientIdentity, contextGroupId, contextHandlers } = subState;
            if (contextGroupId) {
                const groupContexts = contextGroupStates[contextGroupId];
                for (const [, context] of Object.entries(groupContexts)) {
                    contextHandlers.forEach((contextHandler) => {
                        const { handlerId, contextType } = contextHandler;
                        if (InteropBroker.isContextTypeCompatible(context.type, contextType)) {
                            this.invokeContextHandler(clientIdentity, handlerId, context);
                        }
                    });
                }
            }
        });
    }
    // Used to store context group state in snapshots
    getContextGroupStates() {
        return InteropBroker.toObject(this.contextGroupsById);
    }
    // Used to rehydrate the context state from a snapshot
    rehydrateContextGroupStates(incomingContextGroupStates) {
        const contextGroupStates = Object.entries(incomingContextGroupStates);
        for (const [contextGroupId, contexts] of contextGroupStates) {
            const contextObjects = Object.entries(contexts);
            for (const [contextType, context] of contextObjects) {
                if (this.contextGroupsById.has(contextGroupId)) {
                    const currentContextGroupState = this.contextGroupsById.get(contextGroupId);
                    currentContextGroupState.set(contextType, context);
                }
                else {
                    // This logic will change when dynamic context group creation comes in.
                    console.warn(`Attempting to set a context group that isn't in the context group mapping. Skipping context group rehydration for: ${contextGroupId}`);
                }
            }
        }
    }
    /*
    Internal Context Handler APIs
    */
    // Used to give context to a client that has registered their context handler
    contextHandlerRegistered({ contextType, handlerId }, clientIdentity) {
        const handlerInfo = { contextType, handlerId };
        const clientState = this.getClientState(clientIdentity);
        clientState?.contextHandlers.set(handlerId, handlerInfo);
        if (clientState && clientState.contextGroupId) {
            const { contextGroupId } = clientState;
            const contextGroupMap = this.contextGroupsById.get(contextGroupId);
            if (contextType === undefined) {
                // Send this single handler all of the context, because it accepts all.
                contextGroupMap.forEach((context, _) => {
                    this.invokeContextHandler(clientIdentity, handlerId, context);
                });
            }
            else if (contextGroupMap.has(contextType)) {
                const contextForType = contextGroupMap.get(contextType);
                if (contextForType) {
                    this.invokeContextHandler(clientIdentity, handlerId, contextForType);
                }
            }
        }
    }
    // eslint-disable-next-line class-methods-use-this
    async intentHandlerRegistered(payload, clientIdentity) {
        const { handlerId } = payload;
        const clientIntentInfo = this.intentClientMap.get(clientIdentity.name);
        const handlerInfo = clientIntentInfo?.get(handlerId);
        if (!clientIntentInfo) {
            this.intentClientMap.set(clientIdentity.name, new Map());
            const newHandlerInfoMap = this.intentClientMap.get(clientIdentity.name);
            if (newHandlerInfoMap) {
                newHandlerInfoMap.set(handlerId, { isReady: true, pendingIntents: [], clientIdentity });
            }
        }
        else if (!handlerInfo) {
            clientIntentInfo.set(handlerId, { isReady: true, pendingIntents: [], clientIdentity });
        }
        else {
            const { pendingIntents } = handlerInfo;
            handlerInfo.clientIdentity = clientIdentity;
            handlerInfo.isReady = true;
            try {
                if (pendingIntents.length > 0) {
                    const intentToSend = pendingIntents[pendingIntents.length - 1];
                    await this.invokeIntentHandler(clientIdentity, handlerId, intentToSend);
                    handlerInfo.pendingIntents = [];
                }
            }
            catch (error) {
                console.error(`Error invoking intent handler: ${handlerId} for client ${clientIdentity.uuid}/${clientIdentity.name}/${clientIdentity.endpointId}`);
            }
        }
    }
    // Used to remove a context handler for a client
    removeContextHandler({ handlerId }, clientIdentity) {
        const clientState = this.getClientState(clientIdentity);
        if (clientState) {
            clientState.contextHandlers.delete(handlerId);
        }
    }
    handleJoinSessionContextGroup({ sessionContextGroupId }, clientIdentity) {
        try {
            if (!sessionContextGroupId) {
                throw new Error('Failed to join session context group: must specify group id.');
            }
            const sessionContextGroup = this.sessionContextGroupMap.get(sessionContextGroupId);
            if (sessionContextGroup) {
                sessionContextGroup.registerNewClient(clientIdentity);
            }
            else {
                const newSessionContextGroupBroker = new SessionContextGroupBroker_1.default(this.channel, sessionContextGroupId);
                newSessionContextGroupBroker.registerNewClient(clientIdentity);
                this.sessionContextGroupMap.set(sessionContextGroupId, newSessionContextGroupBroker);
            }
            return { hasConflict: this.contextGroupsById.has(sessionContextGroupId) };
        }
        catch (error) {
            throw new Error(error);
        }
    }
    /*
    Internal Utilties
    */
    // Getter for interop info for a client.
    getClientState(id) {
        return this.interopClients.get(id.endpointId);
    }
    // Util for getContextGroupStates. Serializes the contextGroupStates object so we can store it.
    static toObject(map) {
        const objectFromMap = Object.fromEntries(map);
        const newObject = {};
        Object.entries(objectFromMap).forEach(([contextGroupId, contextMap]) => {
            const newContextObject = Object.fromEntries(contextMap);
            newObject[contextGroupId] = newContextObject;
        });
        return newObject;
    }
    // Util to check a client identity.
    static hasEndpointId(target) {
        return target.endpointId !== undefined;
    }
    // Util to check if we should send a context to a handler.
    static isContextTypeCompatible(contextType, registeredContextType) {
        return typeof registeredContextType === 'undefined' || contextType === registeredContextType;
    }
    // Setup function for state mapping
    setContextGroupMap() {
        // This way, if a user overrides this.getContextGroups, it's reflected in the contextGroupMapping.
        for (const contextGroupInfo of this.getContextGroups()) {
            this.contextGroupsById.set(contextGroupInfo.id, new Map());
        }
    }
    async setCurrentContextGroupInClientOptions(clientIdentity, contextGroupId) {
        try {
            const entityInfo = await this.fin.System.getEntityInfo(clientIdentity.uuid, clientIdentity.name);
            let entity;
            if (entityInfo.entityType === 'view') {
                entity = await this.fin.View.wrap(clientIdentity);
            }
            else if (entityInfo.entityType === 'window') {
                entity = await this.fin.Window.wrap(clientIdentity);
            }
            if (entity) {
                await entity.updateOptions({
                    interop: {
                        currentContextGroup: contextGroupId
                    }
                });
            }
        }
        catch (error) {
            //  May file in interop
        }
    }
    async setupChannelProvider() {
        try {
            const channel = await this.getProvider();
            this.channel = channel;
            this.wireChannel(channel);
        }
        catch (error) {
            throw new Error(`Error setting up Interop Broker Channel Provider: ${error}`);
        }
    }
    // Setup Channel Connection Logic
    wireChannel(channel) {
        channel.onConnection(async (clientIdentity, // TODO(CORE-811): remove inline intersected type
        payload) => {
            if (!(await this.isConnectionAuthorized(clientIdentity, payload))) {
                throw new Error(`Connection not authorized for ${clientIdentity.uuid}, ${clientIdentity.name}`);
            }
            if (!clientIdentity.endpointId) {
                throw new Error('Version too old to be compatible with Interop. Please upgrade your runtime to a more recent version.');
            }
            const clientSubscriptionState = {
                contextGroupId: undefined,
                contextHandlers: new Map(),
                clientIdentity
            };
            // Only allow the client to join a contextGroup that actually exists.
            if (payload?.currentContextGroup && this.contextGroupsById.has(payload.currentContextGroup)) {
                clientSubscriptionState.contextGroupId = payload?.currentContextGroup;
            }
            this.interopClients.set(clientIdentity.endpointId, clientSubscriptionState);
        });
        channel.onDisconnection((clientIdentity) => {
            this.interopClients.delete(clientIdentity.endpointId);
            const targetInfo = this.intentClientMap.get(clientIdentity.name);
            if (targetInfo && clientIdentity.uuid === this.fin.me.uuid) {
                targetInfo.forEach((handler) => {
                    handler.isReady = false;
                });
            }
            this.sessionContextGroupMap.forEach((sessionContextGroup) => {
                sessionContextGroup.onDisconnection(clientIdentity);
            });
            this.clientDisconnected(clientIdentity);
        });
        channel.beforeAction(async (action, payload, clientIdentity) => {
            if (!(await this.isActionAuthorized(action, payload, clientIdentity))) {
                throw new Error(`Action (${action}) not authorized for ${clientIdentity.uuid}, ${clientIdentity.name}`);
            }
            if (this.logging?.beforeAction?.enabled) {
                console.log(action, payload, clientIdentity);
            }
        });
        channel.afterAction((action, payload, clientIdentity) => {
            if (this.logging?.afterAction?.enabled) {
                // afterAction can result in payload being undefined
                const logArgs = payload ? [action, payload, clientIdentity] : [action, clientIdentity];
                console.log(...logArgs);
            }
        });
        // Client functions
        channel.register('setContext', this.setContext.bind(this));
        channel.register('fireIntent', this.handleFiredIntent.bind(this));
        channel.register('getCurrentContext', this.getCurrentContext.bind(this));
        channel.register('getInfoForIntent', this.handleInfoForIntent.bind(this));
        channel.register('getInfoForIntentsByContext', this.handleInfoForIntentsByContext.bind(this));
        channel.register('fireIntentForContext', this.handleFiredIntentForContext.bind(this));
        // Platform window functions
        channel.register('getContextGroups', this.getContextGroups.bind(this));
        channel.register('joinContextGroup', this.joinContextGroup.bind(this));
        channel.register('removeFromContextGroup', this.removeFromContextGroup.bind(this));
        channel.register('getAllClientsInContextGroup', this.getAllClientsInContextGroup.bind(this));
        channel.register('getInfoForContextGroup', this.getInfoForContextGroup.bind(this));
        // Internal methods
        channel.register('contextHandlerRegistered', this.contextHandlerRegistered.bind(this));
        channel.register('intentHandlerRegistered', this.intentHandlerRegistered.bind(this));
        channel.register('removeContextHandler', this.removeContextHandler.bind(this));
        channel.register('sessionContextGroup:createIfNeeded', this.handleJoinSessionContextGroup.bind(this));
        // fdc3 only methods
        channel.register('fdc3Open', this.fdc3HandleOpen.bind(this));
        channel.register('fdc3v2FindIntentsByContext', this.handleInfoForIntentsByContext.bind(this));
        channel.register('fdc3FindInstances', this.fdc3HandleFindInstances.bind(this));
        channel.register('fdc3GetAppMetadata', this.fdc3HandleGetAppMetadata.bind(this));
        channel.register('fdc3v2GetInfo', async (payload, clientIdentity) => {
            return this.fdc3HandleGetInfo.bind(this)(payload, clientIdentity);
        });
        channel.register('createPrivateChannelProvider', async (payload) => {
            const { channelId } = payload;
            const channelProvider = await this.fin.InterApplicationBus.Channel.create(channelId);
            PrivateChannelProvider_1.PrivateChannelProvider.init(channelProvider, channelId);
        });
    }
    /**
     * Can be used to completely prevent a connection. Return false to prevent connections. Allows all connections by default.
     * @param _id the identity tryinc to connect
     * @param _connectionPayload optional payload to use in custom implementations, will be undefined by default
     */
    isConnectionAuthorized(_id, _connectionPayload) {
        this.wire.sendAction('interop-broker-is-connection-authorized').catch((e) => {
            // don't expose, analytics-only call
        });
        return Promise.resolve(true);
    }
    /**
     * Called before every action to check if this entity should be allowed to take the action.
     * Return false to prevent the action
     * @param _action the string action to authorize in camel case
     * @param _payload the data being sent for this action
     * @param _identity the connection attempting to dispatch this action
     */
    isActionAuthorized(_action, _payload, _identity) {
        this.wire.sendAction('interop-broker-is-action-authorized').catch((e) => {
            // don't expose, analytics-only call
        });
        return Promise.resolve(true);
    }
}
InteropBroker$1.InteropBroker = InteropBroker;
_InteropBroker_fdc3Info = new WeakMap(), _InteropBroker_contextGroups = new WeakMap(), _InteropBroker_providerPromise = new WeakMap();
InteropBroker.checkContextIntegrity = utils_1$7.checkContextIntegrity;

var InteropClient$1 = {};

var SessionContextGroupClient$1 = {};

var __classPrivateFieldSet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$4 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SessionContextGroupClient_clientPromise;
Object.defineProperty(SessionContextGroupClient$1, "__esModule", { value: true });
const base_1$4 = base;
const utils_1$6 = utils$3;
class SessionContextGroupClient extends base_1$4.Base {
    constructor(wire, client, id) {
        super(wire);
        _SessionContextGroupClient_clientPromise.set(this, void 0);
        this.id = id;
        __classPrivateFieldSet$4(this, _SessionContextGroupClient_clientPromise, client, "f");
    }
    /**
     * Sets a context for the session context group.
     * @param context - New context to set.
     *
     * @tutorial interop.setContext
     */
    async setContext(context) {
        this.wire.sendAction('interop-session-context-group-set-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$4(this, _SessionContextGroupClient_clientPromise, "f");
        return client.dispatch(`sessionContextGroup:setContext-${this.id}`, {
            sessionContextGroupId: this.id,
            context
        });
    }
    async getCurrentContext(type) {
        this.wire.sendAction('interop-session-context-group-get-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$4(this, _SessionContextGroupClient_clientPromise, "f");
        return client.dispatch(`sessionContextGroup:getContext-${this.id}`, {
            sessionContextGroupId: this.id,
            type
        });
    }
    async addContextHandler(contextHandler, contextType) {
        this.wire.sendAction('interop-session-context-group-add-handler').catch((e) => {
            // don't expose, analytics-only call
        });
        if (typeof contextHandler !== 'function') {
            throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");
        }
        const client = await __classPrivateFieldGet$4(this, _SessionContextGroupClient_clientPromise, "f");
        let handlerId;
        if (contextType) {
            handlerId = `sessionContextHandler:invoke-${this.id}-${contextType}-${(0, utils_1$6.generateId)()}`;
        }
        else {
            handlerId = `sessionContextHandler:invoke-${this.id}`;
        }
        client.register(handlerId, (0, utils_1$6.wrapContextHandler)(contextHandler, handlerId));
        await client.dispatch(`sessionContextGroup:handlerAdded-${this.id}`, { handlerId, contextType });
        return { unsubscribe: await this.createUnsubscribeCb(handlerId) };
    }
    async createUnsubscribeCb(handlerId) {
        const client = await __classPrivateFieldGet$4(this, _SessionContextGroupClient_clientPromise, "f");
        return async () => {
            client.remove(handlerId);
            await client.dispatch(`sessionContextGroup:handlerRemoved-${this.id}`, { handlerId });
        };
    }
    getUserInstance() {
        return {
            id: this.id,
            setContext: (0, utils_1$6.wrapInTryCatch)(this.setContext.bind(this), 'Failed to set context: '),
            getCurrentContext: (0, utils_1$6.wrapInTryCatch)(this.getCurrentContext.bind(this), 'Failed to get context: '),
            addContextHandler: (0, utils_1$6.wrapInTryCatch)(this.addContextHandler.bind(this), 'Failed to add context handler: ')
        };
    }
}
SessionContextGroupClient$1.default = SessionContextGroupClient;
_SessionContextGroupClient_clientPromise = new WeakMap();

var __classPrivateFieldSet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$3 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault$3 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _InteropClient_clientPromise, _InteropClient_sessionContextGroups, _InteropClient_fdc3Factory;
Object.defineProperty(InteropClient$1, "__esModule", { value: true });
InteropClient$1.InteropClient = void 0;
const base_1$3 = base;
const SessionContextGroupClient_1 = __importDefault$3(SessionContextGroupClient$1);
const utils_1$5 = utils$3;
/**
 * The Interop Client API is broken up into two groups:
 *
 * **Content Facing APIs** - For Application Developers putting Views into a Platform Window, who care about Context. These are APIs that send out and receive the Context data that flows between applications. Think of this as the Water in the Interop Pipes.
 *
 * **Context Grouping APIs** - For Platform Developers, to add and remove Views to and from Context Groups. These APIs are utilized under-the-hood in Platforms, so they don't need to be used to participate in Interop. These are the APIs that decide which entities the context data flows between. Think of these as the valves or pipes that control the flow of Context Data for Interop.
 *
 * ---
 *
 * All APIs are available at the `fin.me.interop` namespace.
 *
 * ---
 *
 * **You only need 2 things to participate in Interop Context Grouping:**
 * * A Context Handler for incoming context: {@link InteropClient#addContextHandler addContextHandler(handler, contextType?)}
 * * Call setContext on your context group when you want to share context with other group members: {@link InteropClient#setContext setContext(context)}
 *
 * ---
 *
 * ##### Constructor
 * Returned by {@link Interop.connectSync Interop.connectSync}.
 *
 * ---
 *
 * ##### Interop methods intended for Views
 *
 *
 * **Context Groups API**
 *  * {@link InteropClient#addContextHandler addContextHandler(handler, contextType?)}
 *  * {@link InteropClient#setContext setContext(context)}
 *  * {@link InteropClient#getCurrentContext getCurrentContext(contextType?)}
 *  * {@link InteropClient#joinSessionContextGroup joinSessionContextGroup(sessionContextGroupId)}
 *
 *
 * **Intents API**
 *  * {@link InteropClient#fireIntent fireIntent(intent)}
 *  * {@link InteropClient#registerIntentHandler registerIntentHandler(intentHandler, intentName)}
 *  * {@link InteropClient#getInfoForIntent getInfoForIntent(infoForIntentOptions)}
 *  * {@link InteropClient#getInfoForIntentsByContext getInfoForIntentsByContext(context)}
 *  * {@link InteropClient#fireIntentForContext fireIntentForContext(contextForIntent)}
 *
 * ##### Interop methods intended for Windows
 *  * {@link InteropClient#getContextGroups getContextGroups()}
 *  * {@link InteropClient#joinContextGroup joinContextGroup(contextGroupId, target?)}
 *  * {@link InteropClient#removeFromContextGroup removeFromContextGroup(target?)}
 *  * {@link InteropClient#getInfoForContextGroup getInfoForContextGroup(contextGroupId)}
 *  * {@link InteropClient#getAllClientsInContextGroup getAllClientsInContextGroup(contextGroupId)}
 *
 */
class InteropClient extends base_1$3.Base {
    /**
     * @internal
     */
    constructor(wire, clientPromise, fdc3Factory) {
        super(wire);
        _InteropClient_clientPromise.set(this, void 0);
        _InteropClient_sessionContextGroups.set(this, void 0);
        _InteropClient_fdc3Factory.set(this, void 0);
        __classPrivateFieldSet$3(this, _InteropClient_sessionContextGroups, new Map(), "f");
        __classPrivateFieldSet$3(this, _InteropClient_clientPromise, clientPromise, "f");
        __classPrivateFieldSet$3(this, _InteropClient_fdc3Factory, fdc3Factory, "f");
    }
    /*
    Client APIs
    */
    /**
     * Sets a context for the context group of the current entity.
     *
     * @remarks The entity must be part of a context group in order set a context.
     *
     * @param context - New context to set.
     *
     * @example
     * ```js
     * setInstrumentContext = async (ticker) => {
     *     fin.me.interop.setContext({type: 'instrument', id: {ticker}})
     * }
     *
     * // The user clicks an instrument of interest. We want to set that Instrument context so that the rest of our workflow updates with information for that instrument
     * instrumentElement.on('click', (evt) => {
     *     setInstrumentContext(evt.ticker)
     * })
     * ```
     */
    async setContext(context) {
        this.wire.sendAction('interop-client-set-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('setContext', { context });
    }
    /**
     * Add a context handler for incoming context. If an entity is part of a context group, and then sets its context handler,
     * it will receive all of its declared contexts.
     *
     * @param handler - Handler for incoming context.
     * @param contextType - The type of context you wish to handle.
     *
     * @example
     * ```js
     * function handleIncomingContext(contextInfo) {
     *     const { type, id } = contextInfo;
     *     switch (type) {
     *         case 'instrument':
     *             handleInstrumentContext(contextInfo);
     *             break;
     *         case 'country':
     *             handleCountryContext(contextInfo);
     *             break;
     *
     *         default:
     *             break;
     *     }
     * }
     *
     *
     * function handleInstrumentContext(contextInfo) {
     *     const { type, id } = contextInfo;
     *     console.log('contextInfo for instrument', contextInfo)
     * }
     *
     * function handleCountryContext(contextInfo) {
     *     const { type, id } = contextInfo;
     *     console.log('contextInfo for country', contextInfo)
     * }
     *
     * fin.me.interop.addContextHandler(handleIncomingContext);
     * ```
     *
     *
     * Passing in a context type as the second parameter will cause the handler to only be invoked with that context type.
     *
     * ```js
     * function handleInstrumentContext(contextInfo) {
     *     const { type, id } = contextInfo;
     *     console.log('contextInfo for instrument', contextInfo)
     * }
     *
     * function handleCountryContext(contextInfo) {
     *     const { type, id } = contextInfo;
     *     console.log('contextInfo for country', contextInfo)
     * }
     *
     *
     * fin.me.interop.addContextHandler(handleInstrumentContext, 'instrument')
     * fin.me.interop.addContextHandler(handleCountryContext, 'country')
     * ```
     */
    async addContextHandler(handler, contextType) {
        this.wire.sendAction('interop-client-add-context-handler').catch((e) => {
            // don't expose, analytics-only call
        });
        if (typeof handler !== 'function') {
            throw new Error("Non-function argument passed to the first parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");
        }
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        let handlerId;
        if (contextType) {
            handlerId = `invokeContextHandler-${contextType}-${(0, utils_1$5.generateId)()}`;
        }
        else {
            handlerId = 'invokeContextHandler';
        }
        const wrappedHandler = (0, utils_1$5.wrapContextHandler)(handler, handlerId);
        client.register(handlerId, wrappedHandler);
        await client.dispatch('contextHandlerRegistered', { handlerId, contextType });
        return {
            unsubscribe: async () => {
                client.remove(handlerId);
                await client.dispatch('removeContextHandler', { handlerId });
            }
        };
    }
    /*
    Platform Window APIs
    */
    /**
     * Returns the Interop-Broker-defined context groups available for an entity to join.
     * Used by Platform Windows.
     *
     * @example
     * ```js
     * fin.me.interop.getContextGroups()
     *         .then(contextGroups => {
     *             contextGroups.forEach(contextGroup => {
     *                 console.log(contextGroup.displayMetadata.name)
     *                 console.log(contextGroup.displayMetadata.color)
     *             })
     *         })
     * ```
     */
    async getContextGroups() {
        this.wire.sendAction('interop-client-get-context-groups').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('getContextGroups');
    }
    /**
     * Join all Interop Clients at the given identity to context group `contextGroupId`.
     * If no target is specified, it adds the sender to the context group.
     *
     * @remarks Because multiple Channel connections/Interop Clients can potentially exist at a `uuid`/`name` combo, we currently join all Channel connections/Interop Clients at the given identity to the context group.
     * If an `endpointId` is provided (which is unlikely, unless the call is coming from an external adapter), then we only join that single connection to the context group.
     * For all intents and purposes, there will only be 1 connection present in Platform and Browser implmentations, so this point is more-or-less moot.
     * Used by Platform Windows.
     *
     * @param contextGroupId - Id of the context group.
     * @param target - Identity of the entity you wish to join to a context group.
     *
     * @example
     * ```js
     * joinViewToContextGroup = async (contextGroupId, view) => {
     *     await fin.me.interop.joinContextGroup(contextGroupId, view);
     * }
     *
     * getLastFocusedView()
     *     .then(lastFocusedViewIdentity => {
     *         joinViewToContextGroup('red', lastFocusedViewIdentity)
     *     })
     * ```
     */
    async joinContextGroup(contextGroupId, target) {
        this.wire.sendAction('interop-client-join-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        if (!contextGroupId) {
            throw new Error('No contextGroupId specified for joinContextGroup.');
        }
        return client.dispatch('joinContextGroup', { contextGroupId, target });
    }
    /**
     * Removes the specified target from a context group.
     * If no target is specified, it removes the sender from their context group.
     * Used by Platform Windows.
     *
     * @param target - Identity of the entity you wish to join to a context group.
     *
     * @example
     * ```js
     * removeViewFromContextGroup = async (view) => {
     *     await fin.me.interop.removeFromContextGroup(view);
     * }
     *
     * getLastFocusedView()
     *     .then(lastFocusedViewIdentity => {
     *         removeViewFromContextGroup(lastFocusedViewIdentity)
     *     })
     * ```
     */
    async removeFromContextGroup(target) {
        this.wire.sendAction('interop-client-remove-from-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('removeFromContextGroup', { target });
    }
    /**
     * Gets all clients for a context group.
     *
     * @remarks **This is primarily used for platform windows. Views within a platform should not have to use this API.**
     *
     * Returns the Interop-Broker-defined context groups available for an entity to join.
     * @param contextGroupId - The id of context group you wish to get clients for.
     *
     * @example
     * ```js
     * fin.me.interop.getAllClientsInContextGroup('red')
     *     .then(clientsInContextGroup => {
     *         console.log(clientsInContextGroup)
     *     })
     * ```
     */
    async getAllClientsInContextGroup(contextGroupId) {
        this.wire.sendAction('interop-client-get-all-clients-in-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        if (!contextGroupId) {
            throw new Error('No contextGroupId specified for getAllClientsInContextGroup.');
        }
        return client.dispatch('getAllClientsInContextGroup', { contextGroupId });
    }
    /**
     * Gets display info for a context group
     *
     * @remarks Used by Platform Windows.
     * @param contextGroupId - The id of context group you wish to get display info for.
     *
     * @example
     * ```js
     * fin.me.interop.getInfoForContextGroup('red')
     *     .then(contextGroupInfo => {
     *         console.log(contextGroupInfo.displayMetadata.name)
     *         console.log(contextGroupInfo.displayMetadata.color)
     *     })
     * ```
     */
    async getInfoForContextGroup(contextGroupId) {
        this.wire.sendAction('interop-client-get-info-for-context-group').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        if (!contextGroupId) {
            throw new Error('No contextGroupId specified for getInfoForContextGroup.');
        }
        return client.dispatch('getInfoForContextGroup', { contextGroupId });
    }
    /**
     * Sends an intent to the Interop Broker to resolve.
     * @param intent - The combination of an action and a context that is passed to an application for resolution.
     *
     * @example
     * ```js
     * // View wants to fire an Intent after a user clicks on a ticker
     * tickerElement.on('click', (element) => {
     *     const ticker = element.innerText;
     *     const intent = {
     *         name: 'ViewChart',
     *         context: {type: 'fdc3.instrument', id: { ticker }}
     *     }
     *
     *     fin.me.interop.fireIntent(intent);
     * })
     * ```
     */
    async fireIntent(intent) {
        this.wire.sendAction('interop-client-fire-intent').catch((e) => {
            // don't expose, this is only for api analytics purposes
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('fireIntent', intent);
    }
    /**
     * Adds an intent handler for incoming intents. The last intent sent of the name subscribed to will be received.
     * @param handler - Registered function meant to handle a specific intent type.
     * @param intentName - The name of an intent.
     *
     * @example
     * ```js
     * const intentHandler = (intent) => {
     *     const { context } = intent;
     *     myViewChartHandler(context);
     * };
     *
     * const subscription = await fin.me.interop.registerIntentHandler(intentHandler, 'ViewChart');
     *
     * function myAppCloseSequence() {
     *     // to unsubscribe the handler, simply call:
     *     subscription.unsubscribe();
     * }
     * ```
     */
    async registerIntentHandler(handler, intentName, options) {
        this.wire.sendAction('interop-client-register-intent-handler').catch((e) => {
            // don't expose, this is only for api analytics purposes
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        const handlerId = `intent-handler-${intentName}`;
        const wrappedHandler = (0, utils_1$5.wrapIntentHandler)(handler, handlerId);
        try {
            await client.register(handlerId, wrappedHandler);
            await client.dispatch('intentHandlerRegistered', { handlerId, ...options });
        }
        catch (error) {
            throw new Error('Unable to register intent handler');
        }
        return {
            unsubscribe: async () => {
                client.remove(handlerId);
            }
        };
    }
    /**
     * Gets the last context of the Context Group currently subscribed to. It takes an optional Context Type and returns the
     * last context of that type.
     * @param contextType
     *
     * @example
     * ```js
     * await fin.me.interop.joinContextGroup('yellow');
     * await fin.me.interop.setContext({ type: 'instrument', id: { ticker: 'FOO' }});
     * const currentContext = await fin.me.interop.getCurrentContext();
     *
     * // with a specific context
     * await fin.me.interop.joinContextGroup('yellow');
     * await fin.me.interop.setContext({ type: 'country', id: { ISOALPHA3: 'US' }});
     * await fin.me.interop.setContext({ type: 'instrument', id: { ticker: 'FOO' }});
     * const currentContext = await fin.me.interop.getCurrentContext('country');
     * ```
     */
    async getCurrentContext(contextType) {
        this.wire.sendAction('interop-client-get-current-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('getCurrentContext', { contextType });
    }
    /**
     * Get information for a particular Intent from the Interop Broker.
     *
     * @remarks To resolve this info, the function handleInfoForIntent is meant to be overridden in the Interop Broker.
     * The format for the response will be determined by the App Provider overriding the function.
     *
     * @param options
     *
     * @example
     * ```js
     * const intentInfo = await fin.me.interop.getInfoForIntent('ViewChart');
     * ```
     */
    async getInfoForIntent(options) {
        this.wire.sendAction('interop-client-get-info-for-intent').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('getInfoForIntent', options);
    }
    /**
     * Get information from the Interop Broker on all Intents that are meant to handle a particular context.
     *
     * @remarks To resolve this info, the function handleInfoForIntentsByContext is meant to be overridden in the Interop Broker.
     * The format for the response will be determined by the App Provider overriding the function.
     *
     * @param context
     *
     * @example
     * ```js
     * tickerElement.on('click', (element) => {
     *     const ticker = element.innerText;
     *
     *     const context = {
     *         type: 'fdc3.instrument',
     *         id: {
     *             ticker
     *         }
     *     }
     *
     *     const intentsInfo = await fin.me.interop.getInfoForIntentByContext(context);
     * })
     * ```
     */
    async getInfoForIntentsByContext(context) {
        this.wire.sendAction('interop-client-get-info-for-intents-by-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('getInfoForIntentsByContext', context);
    }
    /**
     * Sends a Context that will be resolved to an Intent by the Interop Broker.
     * This context accepts a metadata property.
     *
     * @remarks To resolve this info, the function handleFiredIntentByContext is meant to be overridden in the Interop Broker.
     * The format for the response will be determined by the App Provider overriding the function.
     *
     * @param context
     *
     * @example
     * ```js
     * tickerElement.on('click', (element) => {
     *     const ticker = element.innerText;
     *
     *     const context = {
     *         type: 'fdc3.instrument',
     *         id: {
     *             ticker
     *         }
     *     }
     *
     *     const intentResolution = await fin.me.interop.fireIntentForContext(context);
     * })
     * ```
     */
    async fireIntentForContext(context) {
        this.wire.sendAction('interop-client-fire-intent-for-context').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.dispatch('fireIntentForContext', context);
    }
    /**
     * Join the current entity to session context group `sessionContextGroupId` and return a sessionContextGroup instance.
     * If the sessionContextGroup doesn't exist, one will get created.
     *
     * @remarks Session Context Groups do not persist between runs and aren't present on snapshots.
     * @param sessionContextGroupId - Id of the context group.
     *
     * @example
     * Say we want to have a Session Context Group that holds UI theme information for all apps to consume:
     *
     * My color-picker View:
     * ```js
     *     const themeSessionContextGroup = await fin.me.interop.joinSessionContextGroup('theme');
     *
     *     const myColorPickerElement = document.getElementById('color-palette-picker');
     *     myColorPickerElement.addEventListener('change', event => {
     *         themeSessionContextGroup.setContext({ type: 'color-palette', selection: event.value });
     *     });
     * ```
     *
     * In other views:
     * ```js
     *     const themeSessionContextGroup = await fin.me.interop.joinSessionContextGroup('theme');
     *
     *     const changeColorPalette = ({ selection }) => {
     *         // change the color palette to the selection
     *     };
     *
     *     // If the context is already set by the time the handler was set, the handler will get invoked immediately with the current context.
     *     themeSessionContextGroup.addContextHandler(changeColorPalette, 'color-palette');
     * ```
     */
    async joinSessionContextGroup(sessionContextGroupId) {
        try {
            const currentSessionContextGroup = __classPrivateFieldGet$3(this, _InteropClient_sessionContextGroups, "f").get(sessionContextGroupId);
            if (currentSessionContextGroup) {
                return currentSessionContextGroup.getUserInstance();
            }
            const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
            const { hasConflict } = await client.dispatch('sessionContextGroup:createIfNeeded', {
                sessionContextGroupId
            });
            if (hasConflict) {
                console.warn(`A (non-session) context group with the name "${sessionContextGroupId}" already exists. If you are trying to join a Context Group, call joinContextGroup instead.`);
            }
            const newSessionContextGroup = new SessionContextGroupClient_1.default(this.wire, __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f"), sessionContextGroupId);
            __classPrivateFieldGet$3(this, _InteropClient_sessionContextGroups, "f").set(sessionContextGroupId, newSessionContextGroup);
            return newSessionContextGroup.getUserInstance();
        }
        catch (error) {
            console.error(`Error thrown trying to create Session Context Group with id "${sessionContextGroupId}": ${error}`);
            throw error;
        }
    }
    /**
     * Register a listener that is called when the Interop Client has been disconnected from the Interop Broker.
     * Only one listener per Interop Client can be set.
     * @param listener
     *
     * @example
     * ```js
     * const listener = (event) => {
     *     const { type, topic, brokerName} = event;
     *     console.log(`Disconnected from Interop Broker ${brokerName} `);
     * }
     *
     * await fin.me.interop.onDisconnection(listener);
     * ```
     */
    async onDisconnection(listener) {
        this.wire.sendAction('interop-client-add-ondisconnection-listener').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$3(this, _InteropClient_clientPromise, "f");
        return client.onDisconnection((event) => {
            const { uuid } = event;
            listener({ type: 'interop-broker', topic: 'disconnected', brokerName: uuid });
        });
    }
    getFDC3Sync(version) {
        return __classPrivateFieldGet$3(this, _InteropClient_fdc3Factory, "f").call(this, version, this, this.wire);
    }
    async getFDC3(version) {
        return this.getFDC3Sync(version);
    }
    /**
     * @internal
     *
     * Used to ferry fdc3-only calls from the fdc3 shim to the Interop Broker
     */
    static async ferryFdc3Call(interopClient, action, payload) {
        const client = await __classPrivateFieldGet$3(interopClient, _InteropClient_clientPromise, "f");
        return client.dispatch(action, payload || null);
    }
}
InteropClient$1.InteropClient = InteropClient;
_InteropClient_clientPromise = new WeakMap(), _InteropClient_sessionContextGroups = new WeakMap(), _InteropClient_fdc3Factory = new WeakMap();

var overrideCheck$1 = {};

Object.defineProperty(overrideCheck$1, "__esModule", { value: true });
overrideCheck$1.overrideCheck = overrideCheck$1.checkFDC32Overrides = overrideCheck$1.getDefaultViewFdc3VersionFromAppInfo = void 0;
const InteropBroker_1$1 = InteropBroker$1;
function getDefaultViewFdc3VersionFromAppInfo({ manifest, initialOptions }) {
    const setVersion = manifest?.platform?.defaultViewOptions?.fdc3InteropApi ?? initialOptions.defaultViewOptions?.fdc3InteropApi;
    return ['1.2', '2.0'].includes(setVersion ?? '') ? setVersion : undefined;
}
overrideCheck$1.getDefaultViewFdc3VersionFromAppInfo = getDefaultViewFdc3VersionFromAppInfo;
function checkFDC32Overrides(overriddenBroker) {
    // These are the APIs that must be overridden for FDC3 2.0 compliance
    const mustOverrideAPIs = [
        'fdc3HandleFindInstances',
        'handleInfoForIntent',
        'handleInfoForIntentsByContext',
        'fdc3HandleGetAppMetadata',
        'fdc3HandleGetInfo',
        'fdc3HandleOpen',
        'handleFiredIntent',
        'handleFiredIntentForContext'
    ];
    return mustOverrideAPIs.filter((api) => {
        return overriddenBroker[api] === InteropBroker_1$1.InteropBroker.prototype[api];
    });
}
overrideCheck$1.checkFDC32Overrides = checkFDC32Overrides;
function overrideCheck(overriddenBroker, fdc3InteropApi) {
    if (fdc3InteropApi && fdc3InteropApi === '2.0') {
        const notOverridden = checkFDC32Overrides(overriddenBroker);
        if (notOverridden.length > 0) {
            console.warn(`WARNING: FDC3 2.0 has been set as a default option for Views in this Platform, but the required InteropBroker APIs for FDC3 2.0 compliance have not all been overridden.\nThe following APIs need to be overridden:\n${notOverridden.join('\n')}`);
        }
    }
}
overrideCheck$1.overrideCheck = overrideCheck;

var fdc3ClientFactory = {};

var fdc31_2 = {};

var fdc3Common = {};

var utils$2 = {};

var PrivateChannelClient$1 = {};

var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(PrivateChannelClient$1, "__esModule", { value: true });
PrivateChannelClient$1.PrivateChannelClient = void 0;
const utils$1 = __importStar(utils$3);
class PrivateChannelClient {
    constructor(client, id) {
        this.id = id;
        this.client = client;
        this.listeners = new Map();
    }
    async broadcast(context) {
        return this.client.dispatch('broadcast', { context });
    }
    async getCurrentContext(contextType) {
        return this.client.dispatch('getCurrentContext', { contextType });
    }
    async addContextListener(contextType, handler) {
        if (typeof handler !== 'function') {
            throw new Error("Non-function argument passed to the second parameter 'handler'. Be aware that the argument order does not match the FDC3 standard.");
        }
        let handlerId;
        if (contextType) {
            handlerId = `contextHandler:invoke-${this.id}-${contextType}-${utils$1.generateId()}`;
        }
        else {
            handlerId = `contextHandler:invoke-${this.id}-${utils$1.generateId()}`;
        }
        this.client.register(handlerId, utils$1.wrapContextHandler(handler, handlerId));
        const listener = { unsubscribe: await this.createContextUnsubscribeCb(handlerId) };
        this.listeners.set(handlerId, listener);
        await this.client.dispatch(`contextHandlerAdded`, { handlerId, contextType });
        return listener;
    }
    createNonStandardUnsubscribeCb(handlerId) {
        return async () => {
            this.client.remove(handlerId);
            this.listeners.delete(handlerId);
            await this.client.dispatch('nonStandardHandlerRemoved', { handlerId });
        };
    }
    createContextUnsubscribeCb(handlerId) {
        return async () => {
            this.client.remove(handlerId);
            this.listeners.delete(handlerId);
            await this.client.dispatch('contextHandlerRemoved', { handlerId });
        };
    }
    onAddContextListener(handler) {
        const handlerId = `onContextHandlerAdded:invoke-${this.id}-${utils$1.generateId()}`;
        this.client.register(handlerId, handler);
        const listener = { unsubscribe: this.createNonStandardUnsubscribeCb(handlerId) };
        this.listeners.set(handlerId, listener);
        this.client.dispatch(`onAddContextHandlerAdded`, { handlerId });
        return listener;
    }
    onDisconnect(handler) {
        const handlerId = `onDisconnect:invoke-${this.id}-${utils$1.generateId()}`;
        this.client.register(handlerId, handler);
        const listener = { unsubscribe: this.createNonStandardUnsubscribeCb(handlerId) };
        this.listeners.set(handlerId, listener);
        this.client.dispatch(`onDisconnectHandlerAdded`, { handlerId });
        return listener;
    }
    onUnsubscribe(handler) {
        const handlerId = `onUnsubscribe:invoke-${this.id}-${utils$1.generateId()}`;
        this.client.register(handlerId, handler);
        const listener = { unsubscribe: this.createNonStandardUnsubscribeCb(handlerId) };
        this.listeners.set(handlerId, listener);
        this.client.dispatch(`onUnsubscribeHandlerAdded`, { handlerId });
        return listener;
    }
    async cleanUpAllSubs() {
        const listenerUnsubscribers = Array.from(this.listeners.keys());
        listenerUnsubscribers.forEach((handlerId) => {
            this.client.remove(handlerId);
            this.listeners.delete(handlerId);
        });
    }
    async disconnect() {
        try {
            await this.client.dispatch('clientDisconnecting');
            await this.cleanUpAllSubs();
            await this.client.disconnect();
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
PrivateChannelClient$1.PrivateChannelClient = PrivateChannelClient;

(function (exports) {
	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
	    return (mod && mod.__esModule) ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getIntentResolution = exports.isChannel = exports.isContext = exports.connectPrivateChannel = exports.buildAppChannelObject = exports.buildPrivateChannelObject = exports.ChannelError = exports.ResultError = exports.UnsupportedChannelApiError = exports.getUnsupportedChannelApis = void 0;
	const utils_1 = utils$3;
	const PrivateChannelClient_1 = PrivateChannelClient$1;
	const isEqual_1 = __importDefault(require$$3);
	const getUnsupportedChannelApis = (channelType) => {
	    return {
	        addContextListener: () => {
	            throw new UnsupportedChannelApiError('Channel.addContextListener', channelType);
	        },
	        broadcast: () => {
	            throw new UnsupportedChannelApiError('Channel.broadcast', channelType);
	        },
	        getCurrentContext: () => {
	            throw new UnsupportedChannelApiError('Channel.getCurrentContext', channelType);
	        }
	    };
	};
	exports.getUnsupportedChannelApis = getUnsupportedChannelApis;
	class UnsupportedChannelApiError extends Error {
	    constructor(apiName, channelType = 'System') {
	        super(apiName);
	        this.message = `Calling ${apiName} on an instance of a ${channelType} Channel returned by fdc3.get${channelType}Channels is not supported. If you would like to use a ${channelType} Channel, please use fdc3.joinChannel, fdc3.addContextListener, and fdc3.broadcast instead.`;
	    }
	}
	exports.UnsupportedChannelApiError = UnsupportedChannelApiError;
	var ResultError;
	(function (ResultError) {
	    /** Returned if the `IntentHandler` exited without returning a Promise or that
	     *  Promise was not resolved with a Context or Channel object.
	     */
	    ResultError["NoResultReturned"] = "NoResultReturned";
	    /** Returned if the `IntentHandler` function processing the raised intent
	     *  throws an error or rejects the Promise it returned.
	     */
	    ResultError["IntentHandlerRejected"] = "IntentHandlerRejected";
	})(ResultError = exports.ResultError || (exports.ResultError = {}));
	(function (ChannelError) {
	    /** Returned if the specified channel is not found when attempting to join a
	     *  channel via the `joinUserChannel` function of the DesktopAgent (`fdc3`).
	     */
	    ChannelError["NoChannelFound"] = "NoChannelFound";
	    /** SHOULD be returned when a request to join a user channel or to a retrieve
	     *  a Channel object via the `joinUserChannel` or `getOrCreateChannel` methods
	     *  of the DesktopAgent (`fdc3`) object is denied.
	     */
	    ChannelError["AccessDenied"] = "AccessDenied";
	    /** SHOULD be returned when a channel cannot be created or retrieved via the
	     *  `getOrCreateChannel` method of the DesktopAgent (`fdc3`).
	     */
	    ChannelError["CreationFailed"] = "CreationFailed";
	})(exports.ChannelError || (exports.ChannelError = {}));
	const buildPrivateChannelObject = (privateChannelClient) => {
	    let clientDisconnected = false;
	    const checkIfClientDisconnected = () => {
	        if (clientDisconnected) {
	            throw new Error('Private Channel Client has been disconnected from the Private Channel');
	        }
	    };
	    return {
	        id: privateChannelClient.id,
	        type: 'private',
	        broadcast: async (context) => {
	            checkIfClientDisconnected();
	            return privateChannelClient.broadcast(context);
	        },
	        getCurrentContext: async (contextType) => {
	            checkIfClientDisconnected();
	            return privateChannelClient.getCurrentContext(contextType);
	        },
	        // @ts-expect-error TODO [CORE-1524]
	        addContextListener: async (contextType, handler) => {
	            checkIfClientDisconnected();
	            let handlerInUse = handler;
	            let contextTypeInUse = contextType;
	            if (typeof contextType === 'function') {
	                console.warn('addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)');
	                handlerInUse = contextType;
	                contextTypeInUse = null;
	            }
	            const listener = privateChannelClient.addContextListener(contextTypeInUse, handlerInUse);
	            return listener;
	        },
	        onAddContextListener: (handler) => {
	            checkIfClientDisconnected();
	            return privateChannelClient.onAddContextListener(handler);
	        },
	        disconnect: async () => {
	            checkIfClientDisconnected();
	            clientDisconnected = true;
	            return privateChannelClient.disconnect();
	        },
	        onDisconnect: (handler) => {
	            checkIfClientDisconnected();
	            return privateChannelClient.onDisconnect(handler);
	        },
	        onUnsubscribe: (handler) => {
	            checkIfClientDisconnected();
	            return privateChannelClient.onUnsubscribe(handler);
	        }
	    };
	};
	exports.buildPrivateChannelObject = buildPrivateChannelObject;
	const buildAppChannelObject = (sessionContextGroup) => {
	    return {
	        id: sessionContextGroup.id,
	        type: 'app',
	        broadcast: sessionContextGroup.setContext,
	        getCurrentContext: async (contextType) => {
	            const context = await sessionContextGroup.getCurrentContext(contextType);
	            return context === undefined ? null : context;
	        },
	        // @ts-expect-error TODO [CORE-1524]
	        addContextListener: (contextType, handler) => {
	            let realHandler;
	            let realType;
	            if (typeof contextType === 'function') {
	                console.warn('addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)');
	                realHandler = contextType;
	            }
	            else {
	                realHandler = handler;
	                if (typeof contextType === 'string') {
	                    realType = contextType;
	                }
	            }
	            const listener = (async () => {
	                let first = true;
	                const currentContext = await sessionContextGroup.getCurrentContext(realType);
	                const wrappedHandler = (context, contextMetadata) => {
	                    if (first) {
	                        first = false;
	                        if ((0, isEqual_1.default)(currentContext, context)) {
	                            return;
	                        }
	                    }
	                    // eslint-disable-next-line consistent-return
	                    return realHandler(context, contextMetadata);
	                };
	                return sessionContextGroup.addContextHandler(wrappedHandler, realType);
	            })();
	            return {
	                ...listener,
	                unsubscribe: () => listener.then((l) => l.unsubscribe())
	            };
	        }
	    };
	};
	exports.buildAppChannelObject = buildAppChannelObject;
	const connectPrivateChannel = async (channelId) => {
	    try {
	        const channelClient = await fin.InterApplicationBus.Channel.connect(channelId);
	        const privateChannelClient = new PrivateChannelClient_1.PrivateChannelClient(channelClient, channelId);
	        return (0, exports.buildPrivateChannelObject)(privateChannelClient);
	    }
	    catch (error) {
	        throw new Error(`Private Channel with id: ${channelId} doesn't exist`);
	    }
	};
	exports.connectPrivateChannel = connectPrivateChannel;
	const isContext = (context) => {
	    if (context && typeof context === 'object' && 'type' in context) {
	        const { type } = context;
	        return typeof type === 'string';
	    }
	    return false;
	};
	exports.isContext = isContext;
	const isChannel = (channel) => {
	    if (channel && typeof channel === 'object' && 'type' in channel && 'id' in channel) {
	        const { type, id } = channel;
	        return typeof type === 'string' && typeof id === 'string' && (type === 'app' || type === 'private');
	    }
	    return false;
	};
	exports.isChannel = isChannel;
	const getIntentResolution = async (interopModule, context, app, intent) => {
	    // Generate an ID to make a session context group with. We will pass that ID to the Broker.
	    // The broker will then setContext on that session context group later with our Intent Result,
	    const guid = (0, utils_1.generateId)(); // TODO make this undefined in web
	    // Promise we'll use in getResult
	    const getResultPromise = new Promise((resolve, reject) => {
	        fin.InterApplicationBus.subscribe({ uuid: '*' }, guid, (intentResult) => {
	            resolve(intentResult);
	        }).catch(() => {
	            // not supported in web, suppress the error
	            if (interopModule.wire.environment.type === 'other') {
	                resolve(undefined);
	            }
	            reject(new Error('getResult is not supported in this environment'));
	        });
	    });
	    // Adding the intentResolutionResultId to the intentObj. Because fireIntent only accepts a single arg, we have to slap it in here.
	    const metadata = app ? { target: app, intentResolutionResultId: guid } : { intentResolutionResultId: guid };
	    const intentObj = intent ? { name: intent, context, metadata } : { ...context, metadata };
	    // Set up the getResult call.
	    const getResult = async () => {
	        let intentResult = await getResultPromise;
	        if (!intentResult || typeof intentResult !== 'object') {
	            throw new Error(ResultError.NoResultReturned);
	        }
	        const { error } = intentResult;
	        if (error) {
	            throw new Error(ResultError.IntentHandlerRejected);
	        }
	        if ((0, exports.isChannel)(intentResult)) {
	            const { id, type } = intentResult;
	            switch (type) {
	                case 'private': {
	                    intentResult = await (0, exports.connectPrivateChannel)(id);
	                    break;
	                }
	                case 'app': {
	                    const sessionContextGroup = await interopModule.joinSessionContextGroup(id);
	                    intentResult = (0, exports.buildAppChannelObject)(sessionContextGroup);
	                    break;
	                }
	            }
	        }
	        else if (!(0, exports.isContext)(intentResult)) {
	            throw new Error(ResultError.NoResultReturned);
	        }
	        return intentResult;
	    };
	    // Finally fire the intent.
	    const intentResolutionInfoFromBroker = intent
	        ? await interopModule.fireIntent(intentObj)
	        : await interopModule.fireIntentForContext(intentObj);
	    if (typeof intentResolutionInfoFromBroker !== 'object') {
	        return {
	            source: {
	                appId: '',
	                instanceId: ''
	            },
	            intent: '',
	            version: '2.0',
	            getResult
	        };
	    }
	    return { ...intentResolutionInfoFromBroker, getResult };
	};
	exports.getIntentResolution = getIntentResolution; 
} (utils$2));

var __classPrivateFieldGet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet$2 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault$2 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _FDC3ModuleBase_producer;
Object.defineProperty(fdc3Common, "__esModule", { value: true });
fdc3Common.FDC3ModuleBase = void 0;
const utils_1$4 = utils$2;
const utils_2$1 = utils$3;
const InteropClient_1$2 = InteropClient$1;
const isEqual_1 = __importDefault$2(require$$3);
class FDC3ModuleBase {
    get client() {
        return __classPrivateFieldGet$2(this, _FDC3ModuleBase_producer, "f").call(this);
    }
    get fin() {
        return this.wire.getFin();
    }
    // eslint-disable-next-line no-useless-constructor
    constructor(producer, wire) {
        this.wire = wire;
        _FDC3ModuleBase_producer.set(this, void 0);
        __classPrivateFieldSet$2(this, _FDC3ModuleBase_producer, producer, "f");
    }
    /**
     * Broadcasts a context for the channel of the current entity.
     * @param context - New context to set.
     *
     * @tutorial fdc3.broadcast
     * @static
     */
    async broadcast(context) {
        this.wire.sendAction('fdc3-broadcast').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return this.client.setContext(context);
    }
    /**
     * Launches an app with target information, which can either be a string or an AppMetadata object.
     * @param app
     * @param context
     *
     * @tutorial fdc3.open
     */
    async _open(app, context) {
        this.wire.sendAction('fdc3-open').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await InteropClient_1$2.InteropClient.ferryFdc3Call(this.client, 'fdc3Open', { app, context });
        }
        catch (error) {
            const errorToThrow = error.message === utils_2$1.BROKER_ERRORS.fdc3Open ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    async _getChannels() {
        const channels = await this.client.getContextGroups();
        // fdc3 implementation of getSystemChannels returns an array of channels, have to decorate over
        // this so people know that these APIs are not supported
        return channels.map((channel) => {
            return { ...channel, type: 'system', ...(0, utils_1$4.getUnsupportedChannelApis)() };
        });
    }
    /**
     * Returns a Channel object for the specified channel, creating it as an App Channel if it does not exist.
     * @param channelId
     *
     * @tutorial fdc3.getOrCreateChannel
     */
    async getOrCreateChannel(channelId) {
        this.wire.sendAction('fdc3-get-or-create-channel').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const systemChannels = await this._getChannels();
        const userChannel = systemChannels.find((channel) => channel.id === channelId);
        if (userChannel) {
            return { ...userChannel, type: 'system', ...(0, utils_1$4.getUnsupportedChannelApis)() };
        }
        try {
            const sessionContextGroup = await this.client.joinSessionContextGroup(channelId);
            return (0, utils_1$4.buildAppChannelObject)(sessionContextGroup);
        }
        catch (error) {
            console.error(error.message);
            throw new Error(utils_1$4.ChannelError.CreationFailed);
        }
    }
    /**
     * Returns the Interop-Broker-defined context groups available for an entity to join.
     *
     * @tutorial fdc3.getSystemChannels
     * @static
     */
    async getSystemChannels() {
        this.wire.sendAction('fdc3-get-system-channels').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return this._getChannels();
    }
    /**
     * Join all Interop Clients at the given identity to context group `contextGroupId`.
     * If no target is specified, it adds the sender to the context group.
     * Because multiple Channel connections/Interop Clients can potentially exist at a `uuid`/`name` combo, we currently join all Channel connections/Interop Clients at the given identity to the context group.
     * If an `endpointId` is provided (which is unlikely, unless the call is coming from an external adapter), then we only join that single connection to the context group.
     * For all intents and purposes, there will only be 1 connection present in Platform and Browser implementations, so this point is more-or-less moot.
     * @param channelId - Id of the context group.
     *
     * @tutorial fdc3.joinChannel
     * @static
     */
    async joinChannel(channelId) {
        this.wire.sendAction('fdc3-join-channel').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await this.client.joinContextGroup(channelId);
        }
        catch (error) {
            if (error.message === utils_2$1.BROKER_ERRORS.joinSessionContextGroupWithJoinContextGroup) {
                console.error('The Channel you have tried to join is an App Channel. Custom Channels can only be defined by the Interop Broker through code or manifest configuration. Please use getOrCreateChannel.');
            }
            else {
                console.error(error.message);
            }
            if (error.message.startsWith('Attempting to join a context group that does not exist')) {
                throw new Error(utils_1$4.ChannelError.NoChannelFound);
            }
            throw new Error(utils_1$4.ChannelError.AccessDenied);
        }
    }
    /**
     * Returns the Channel that the entity is subscribed to. Returns null if not joined to a channel.
     *
     * @tutorial fdc3.getCurrentChannel
     */
    async getCurrentChannel() {
        this.wire.sendAction('fdc3-get-current-channel').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const currentContextGroupInfo = await this.getCurrentContextGroupInfo();
        if (!currentContextGroupInfo) {
            return null;
        }
        return this.buildChannelObject(currentContextGroupInfo);
    }
    /**
     * Removes the specified target from a context group.
     * If no target is specified, it removes the sender from their context group.
     *
     * @tutorial fdc3.leaveCurrentChannel
     * @static
     */
    async leaveCurrentChannel() {
        this.wire.sendAction('fdc3-leave-current-channel').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        return this.client.removeFromContextGroup();
    }
    // utils
    // eslint-disable-next-line class-methods-use-this
    async getCurrentContextGroupInfo() {
        const contextGroups = await this.client.getContextGroups();
        const clientsInCtxGroupsPromise = contextGroups.map(async (ctxGroup) => {
            return this.client.getAllClientsInContextGroup(ctxGroup.id);
        });
        const clientsInCtxGroups = await Promise.all(clientsInCtxGroupsPromise);
        const clientIdx = clientsInCtxGroups.findIndex((clientIdentityArr) => {
            return clientIdentityArr.some((clientIdentity) => {
                const { uuid, name } = clientIdentity;
                return this.wire.me.uuid === uuid && this.wire.me.name === name;
            });
        });
        return contextGroups[clientIdx];
    }
    async buildChannelObject(currentContextGroupInfo) {
        // @ts-expect-error
        return {
            ...currentContextGroupInfo,
            type: 'system',
            addContextListener: (...[contextType, handler]) => {
                let realHandler;
                let realType;
                if (typeof contextType === 'function') {
                    console.warn('addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)');
                    realHandler = contextType;
                }
                else {
                    realHandler = handler;
                    if (typeof contextType === 'string') {
                        realType = contextType;
                    }
                }
                const listener = (async () => {
                    let first = true;
                    const currentContext = await this.client.getCurrentContext(realType);
                    const wrappedHandler = (context, contextMetadata) => {
                        if (first) {
                            first = false;
                            if ((0, isEqual_1.default)(currentContext, context)) {
                                return;
                            }
                        }
                        // eslint-disable-next-line consistent-return
                        return realHandler(context, contextMetadata);
                    };
                    return this.client.addContextHandler(wrappedHandler, realType);
                })();
                // @ts-expect-error TODO [CORE-1524]
                return {
                    ...listener,
                    unsubscribe: () => listener.then((l) => l.unsubscribe())
                };
            },
            broadcast: this.broadcast.bind(this),
            // @ts-expect-error Typescript fails to infer the returntype is a Promise
            getCurrentContext: async (contextType) => {
                const context = await this.client.getCurrentContext(contextType);
                // @ts-expect-error Typescript fails to infer the returntype is a Promise
                return context === undefined ? null : context;
            }
        };
    }
}
fdc3Common.FDC3ModuleBase = FDC3ModuleBase;
_FDC3ModuleBase_producer = new WeakMap();

Object.defineProperty(fdc31_2, "__esModule", { value: true });
fdc31_2.Fdc3Module = void 0;
const utils_1$3 = utils$3;
const fdc3_common_1$1 = fdc3Common;
/**
 * @version 1.2
 * The FDC3 Client Library provides a set APIs to be used for FDC3 compliance,
 * while using our Interop API under the hood. In order to use this set of APIs
 * you will need to set up your own {@link InteropBroker InteropBroker} or use a Platform application, which does the setup for you. Refer to our documentation on
 * our {@link https://developers.openfin.co/of-docs/docs/enable-color-linking Interop API}.
 *
 * To enable the FDC3 APIs in a {@link Window Window} or {@link View View}, add the fdc3InteropApi
 * property to its options:
 *
 * ```js
 * {
 *     autoShow: false,
 *     saveWindowState: true,
 *     url: 'https://openfin.co',
 *     fdc3InteropApi: '1.2'
 * }
 * ```
 *
 * If using a {@link Platform Platform } application, you can set this property in defaultWindowOptions and defaultViewOptions.
 *
 * In order to ensure that the FDC3 Api is ready before use, you can use the 'fdc3Ready' event fired on the DOM Window object:
 *
 * ```js
 * function fdc3Action() {
 *     // Make some fdc3 API calls here
 * }
 *
 * if (window.fdc3) {
 *    fdc3Action();
 * } else {
 *    window.addEventListener('fdc3Ready', fdc3Action);
 * }
 * ```
 */
class Fdc3Module extends fdc3_common_1$1.FDC3ModuleBase {
    async open(app, context) {
        // eslint-disable-next-line no-underscore-dangle
        await super._open(app, context);
    }
    /**
     * Add a context handler for incoming context. If an entity is part of a context group, and then sets its context handler, it will receive all of its declared contexts. If you wish to listen for all incoming contexts, pass `null` for the contextType argument.
     * @param contextType - The type of context you wish to handle.
     * @param handler - Handler for incoming context.
     *
     * @tutorial fdc3.addContextListener
     * @static
     */
    // @ts-expect-error TODO [CORE-1524]
    addContextListener(contextType, handler) {
        this.wire.sendAction('fdc3-add-context-listener').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        let listener;
        if (typeof contextType === 'function') {
            console.warn('addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)');
            listener = this.client.addContextHandler(contextType);
        }
        else {
            listener = this.client.addContextHandler(handler, contextType === null ? undefined : contextType);
        }
        return {
            ...listener,
            unsubscribe: () => listener.then((l) => l.unsubscribe())
        };
    }
    /**
     * Adds a listener for incoming Intents.
     * @param intent - Name of the Intent
     * @param handler - Handler for incoming Intent
     *
     * @tutorial fdc3.addIntentListener
     * @static
     */
    addIntentListener(intent, handler) {
        this.wire.sendAction('fdc3-add-intent-listener').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const contextHandler = (raisedIntent) => {
            const { context, metadata: intentMetadata } = raisedIntent;
            const { metadata } = context;
            const intentResolutionResultId = intentMetadata?.intentResolutionResultId || metadata?.intentResolutionResultId;
            if (intentResolutionResultId) {
                this.fin.InterApplicationBus.publish(intentResolutionResultId, null).catch(() => null);
            }
            handler(raisedIntent.context);
        };
        const listener = this.client.registerIntentHandler(contextHandler, intent, {
            fdc3Version: '1.2'
        });
        return {
            ...listener,
            unsubscribe: () => listener.then((l) => l.unsubscribe())
        };
    }
    /**
     * Raises a specific intent.
     * @param intent Name of the Intent.
     * @param context Context associated with the Intent.
     * @param  app App that will resolve the Intent. This is added as metadata to the Intent. Can be accessed by the app provider in {@link InteropBroker#handleFiredIntent InteropBroker.handleFiredIntent}.
     *
     * @tutorial fdc3.raiseIntent
     * @static
     */
    async raiseIntent(intent, context, app) {
        this.wire.sendAction('fdc3-raise-intent').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const intentObj = app
            ? { name: intent, context, metadata: { target: app } }
            : { name: intent, context };
        try {
            return await this.client.fireIntent(intentObj);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$3.BROKER_ERRORS.fireIntent ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Find out more information about a particular intent by passing its name, and optionally its context.
     * @param intent Name of the Intent
     * @param context
     *
     * @tutorial fdc3.findIntent
     */
    async findIntent(intent, context) {
        this.wire.sendAction('fdc3-find-intent').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await this.client.getInfoForIntent({ name: intent, context });
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$3.BROKER_ERRORS.getInfoForIntent ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Find all the available intents for a particular context.
     * @param context
     *
     * @tutorial fdc3.findIntentsByContext
     */
    async findIntentsByContext(context) {
        this.wire.sendAction('fdc3-find-intents-by-context').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await this.client.getInfoForIntentsByContext(context);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$3.BROKER_ERRORS.getInfoForIntentsByContext ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Finds and raises an intent against a target app based purely on context data.
     * @param context
     * @param app
     *
     * @tutorial fdc3.raiseIntentForContext
     */
    async raiseIntentForContext(context, app) {
        this.wire.sendAction('fdc3-raise-intent-for-context').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await this.client.fireIntentForContext({ ...context, metadata: { target: app } });
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$3.BROKER_ERRORS.fireIntentForContext ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Returns a Channel object for the specified channel, creating it as an App Channel if it does not exist.
     * @param channelId
     *
     * @tutorial fdc3.getOrCreateChannel
     */
    async getOrCreateChannel(channelId) {
        return super.getOrCreateChannel(channelId);
    }
    /**
     * Returns metadata relating to the FDC3 object and its provider, including the supported version of the FDC3 specification and the name of the provider of the implementation.
     *
     * @tutorial fdc3.getInfo
     */
    getInfo() {
        this.wire.sendAction('fdc3-get-info').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const version = this.wire.environment.getAdapterVersionSync();
        return {
            providerVersion: version,
            provider: `openfin-${this.wire.me.uuid}`,
            fdc3Version: '1.2'
        };
    }
}
fdc31_2.Fdc3Module = Fdc3Module;

var fdc32_0 = {};

Object.defineProperty(fdc32_0, "__esModule", { value: true });
fdc32_0.Fdc3Module2 = void 0;
const fdc3_common_1 = fdc3Common;
const utils_1$2 = utils$3;
const InteropClient_1$1 = InteropClient$1;
const utils_2 = utils$2;
const PrivateChannelClient_1 = PrivateChannelClient$1;
/**
 * @version 2.0
 * The FDC3 Client Library provides a set APIs to be used for FDC3 compliance,
 * while using our Interop API under the hood. In order to use this set of APIs
 * you will need to set up your own {@link InteropBroker InteropBroker} or use a Platform application, which does the setup for you. Refer to our documentation on
 * our {@link https://developers.openfin.co/of-docs/docs/enable-context-sharing Interop API}.
 *
 * To enable the FDC3 APIs in a {@link Window Window} or {@link View View}, add the fdc3InteropApi
 * property to its options:
 *
 * ```js
 * {
 *     autoShow: false,
 *     saveWindowState: true,
 *     url: 'https://openfin.co',
 *     fdc3InteropApi: '2.0'
 * }
 * ```
 *
 * If using a {@link Platform Platform } application, you can set this property in defaultWindowOptions and defaultViewOptions.
 *
 * In order to ensure that the FDC3 Api is ready before use, you can use the 'fdc3Ready' event fired on the DOM Window object:
 *
 * ```js
 * function fdc3Action() {
 *     // Make some fdc3 API calls here
 * }
 *
 * if (window.fdc3) {
 *    fdc3Action();
 * } else {
 *    window.addEventListener('fdc3Ready', fdc3Action);
 * }
 * ```
 */
class Fdc3Module2 extends fdc3_common_1.FDC3ModuleBase {
    /**
     * Launches an app, specified via an AppIdentifier object.
     * @param app
     * @param context
     *
     * @tutorial fdc3.open
     */
    async open(app, context) {
        if (typeof app === 'string') {
            console.warn('Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string }).');
        }
        // eslint-disable-next-line no-underscore-dangle
        return super._open(app, context);
    }
    /**
     * Find all the available instances for a particular application.
     * @param app
     *
     * @tutorial fdc3v2.findInstances
     */
    async findInstances(app) {
        this.wire.sendAction('fdc3-find-instances').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await InteropClient_1$1.InteropClient.ferryFdc3Call(this.client, 'fdc3FindInstances', app);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.fdc3FindInstances ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Retrieves the AppMetadata for an AppIdentifier, which provides additional metadata (such as icons, a title and description) from the App Directory record for the application, that may be used for display purposes.
     * @param app
     *
     * @tutorial fdc3v2.getAppMetadata
     */
    async getAppMetadata(app) {
        this.wire.sendAction('fdc3-get-app-metadata').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await InteropClient_1$1.InteropClient.ferryFdc3Call(this.client, 'fdc3GetAppMetadata', app);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.fdc3GetAppMetadata ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Add a context handler for incoming context. If an entity is part of a context group, and then sets its context handler, it will receive all of its declared contexts. If you wish to listen for all incoming contexts, pass `null` for the contextType argument.
     * @param contextType
     * @param handler
     *
     * @tutorial fdc3.addContextListener
     */
    // @ts-expect-error TODO [CORE-1524]
    async addContextListener(contextType, handler) {
        this.wire.sendAction('fdc3-add-context-listener').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        // The FDC3 ContextHandler only expects the context and optional ContextMetadata, so we wrap the handler
        // here so it only gets passed these parameters
        const getWrappedHandler = (handlerToWrap) => {
            return (context) => {
                const { contextMetadata, ...rest } = context;
                const args = contextMetadata ? [{ ...rest }, contextMetadata] : [context, null];
                handlerToWrap(...args);
            };
        };
        let actualHandler = handler;
        let wrappedHandler = getWrappedHandler(actualHandler);
        if (typeof contextType === 'function') {
            console.warn('addContextListener(handler) has been deprecated. Please use addContextListener(null, handler)');
            actualHandler = contextType;
            wrappedHandler = getWrappedHandler(actualHandler);
            return this.client.addContextHandler(wrappedHandler);
        }
        return this.client.addContextHandler(wrappedHandler, contextType === null ? undefined : contextType);
    }
    /**
     * Find out more information about a particular intent by passing its name, and optionally its context and resultType.
     * @param intent Name of the Intent
     * @param context Context
     * @param resultType The type of result returned for any intent specified during resolution.
     *
     * @tutorial fdc3.findIntent
     */
    async findIntent(intent, context, resultType) {
        this.wire.sendAction('fdc3-find-intent').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            return await this.client.getInfoForIntent({ name: intent, context, metadata: { resultType } });
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.getInfoForIntent ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Find all the available intents for a particular context.
     * @param context
     * @param resultType The type of result returned for any intent specified during resolution.
     *
     * @tutorial fdc3v2.findIntentsByContext
     */
    async findIntentsByContext(context, resultType) {
        this.wire.sendAction('fdc3-find-intents-by-context').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        const payload = resultType ? { context, metadata: { resultType } } : context;
        try {
            return await InteropClient_1$1.InteropClient.ferryFdc3Call(this.client, 'fdc3v2FindIntentsByContext', payload);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.getInfoForIntentsByContext ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Raises a specific intent for resolution against apps registered with the desktop agent.
     * @param intent Name of the Intent
     * @param context Context associated with the Intent
     * @param app
     *
     * @tutorial fdc3v2.raiseIntent
     */
    async raiseIntent(intent, context, app) {
        this.wire.sendAction('fdc3-raise-intent').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            if (typeof app === 'string') {
                console.warn('Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string }).');
            }
            return (0, utils_2.getIntentResolution)(this.client, context, app, intent);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.fireIntent ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Finds and raises an intent against apps registered with the desktop agent based purely on the type of the context data.
     * @param context Context associated with the Intent
     * @param app
     *
     * @tutorial fdc3v2.raiseIntentForContext
     */
    async raiseIntentForContext(context, app) {
        // TODO: We have to do the same thing we do for raiseIntent here as well.
        this.wire.sendAction('fdc3-raise-intent-for-context').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        try {
            if (typeof app === 'string') {
                console.warn('Passing a string as the app parameter is deprecated, please use an AppIdentifier ({ appId: string; instanceId?: string }).');
            }
            return (0, utils_2.getIntentResolution)(this.client, context, app);
        }
        catch (error) {
            const errorToThrow = error.message === utils_1$2.BROKER_ERRORS.fireIntent ? 'ResolverUnavailable' : error.message;
            throw new Error(errorToThrow);
        }
    }
    /**
     * Adds a listener for incoming intents.
     * @param intent  Name of the Intent
     * @param handler A callback that handles a context event and may return a promise of a Context or Channel object to be returned to the application that raised the intent.
     *
     * @tutorial fdc3.addIntentListener
     */
    async addIntentListener(intent, handler) {
        this.wire.sendAction('fdc3-add-intent-listener').catch((e) => {
            // we do not want to expose this error, just continue if this analytics-only call fails
        });
        if (typeof intent !== 'string') {
            throw new Error('First argument must be an Intent name');
        }
        // The FDC3 Intenter handler only expects the context and contextMetadata to be passed to the handler,
        // so we wrap it here and only pass those paramaters.
        const contextHandler = async (raisedIntent) => {
            let intentResult;
            let intentResultToSend;
            const { context, metadata: intentMetadata } = raisedIntent;
            const { contextMetadata, metadata, ...rest } = context;
            const intentResolutionResultId = intentMetadata?.intentResolutionResultId || metadata?.intentResolutionResultId;
            try {
                const newContext = metadata ? { metadata, ...rest } : { ...rest };
                intentResult = await handler(newContext, contextMetadata);
                intentResultToSend = intentResult;
            }
            catch (error) {
                intentResult = error;
                intentResultToSend = { error: true };
            }
            if (intentResolutionResultId) {
                this.fin.InterApplicationBus.publish(intentResolutionResultId, intentResultToSend).catch(() => null);
            }
            if (intentResult instanceof Error) {
                throw new Error(intentResult.message);
            }
            return intentResult;
        };
        return this.client.registerIntentHandler(contextHandler, intent, { fdc3Version: '2.0' });
    }
    /**
     * Returns a Channel object for the specified channel, creating it as an App Channel if it does not exist.
     * @param channelId
     *
     * @tutorial fdc3.getOrCreateChannel
     */
    async getOrCreateChannel(channelId) {
        return super.getOrCreateChannel(channelId);
    }
    /**
     * Returns a Channel with an auto-generated identity that is intended for private communication between applications. Primarily used to create channels that will be returned to other applications via an IntentResolution for a raised intent.
     *
     * @tutorial fdc3v2.createPrivateChannel
     */
    async createPrivateChannel() {
        const channelId = (0, utils_1$2.generateId)();
        await InteropClient_1$1.InteropClient.ferryFdc3Call(this.client, 'createPrivateChannelProvider', { channelId });
        const channelClient = await this.fin.InterApplicationBus.Channel.connect(channelId);
        const newPrivateChannelClient = new PrivateChannelClient_1.PrivateChannelClient(channelClient, channelId);
        return (0, utils_2.buildPrivateChannelObject)(newPrivateChannelClient);
    }
    /**
     * Retrieves a list of the User Channels available for the app to join.
     *
     * @tutorial fdc3v2.getUserChannels
     */
    async getUserChannels() {
        const channels = await this.client.getContextGroups();
        // fdc3 implementation of getUserChannels returns on array of channels, have to decorate over
        // this so people know that these APIs are not supported
        return channels.map((channel) => {
            // @ts-expect-error TODO [CORE-1524]
            return { ...channel, type: 'user', ...(0, utils_2.getUnsupportedChannelApis)('User') };
        });
    }
    /**
     * Retrieves a list of the User Channels available for the app to join.
     *
     * @deprecated Please use {@link fdc3.getUserChannels fdc3.getUserChannels} instead
     * @tutorial fdc3.getSystemChannels
     */
    async getSystemChannels() {
        console.warn('This API has been deprecated. Please use fdc3.getUserChannels instead.');
        return super.getSystemChannels();
    }
    /**
     * Join an app to a specified User channel.
     * @param channelId Channel name
     *
     * @tutorial fdc3v2.joinUserChannel
     */
    async joinUserChannel(channelId) {
        return super.joinChannel(channelId);
    }
    /**
     * Join an app to a specified User channel.
     * @param channelId Channel name
     * @deprecated Please use {@link fdc3.joinUserChannel fdc3.joinUserChannel} instead
     *
     * @tutorial fdc3.joinChannel
     */
    async joinChannel(channelId) {
        console.warn('This API has been deprecated. Please use fdc3.joinUserChannel instead.');
        return super.joinChannel(channelId);
    }
    /**
     * Returns the Channel object for the current User channel membership
     *
     * @tutorial fdc3.getCurrentChannel
     */
    async getCurrentChannel() {
        const currentChannel = await super.getCurrentChannel();
        if (!currentChannel) {
            return null;
        }
        return {
            ...currentChannel,
            type: 'user',
            broadcast: this.broadcast.bind(this)
        };
    }
    /**
     * Retrieves information about the FDC3 implementation, including the supported version of the FDC3 specification, the name of the provider of the implementation, its own version number, details of whether optional API features are implemented and the metadata of the calling application according to the desktop agent.
     * fdc3HandleGetInfo must be overridden in the InteropBroker so that the ImplementationMetadata will have the appMetadata info.
     *
     * @tutorial fdc3v2.getInfo
     */
    async getInfo() {
        return InteropClient_1$1.InteropClient.ferryFdc3Call(this.client, 'fdc3v2GetInfo', { fdc3Version: '2.0' });
    }
}
fdc32_0.Fdc3Module2 = Fdc3Module2;

Object.defineProperty(fdc3ClientFactory, "__esModule", { value: true });
fdc3ClientFactory.fdc3Factory = void 0;
const fdc3_1_2_1 = fdc31_2;
const fdc3_2_0_1 = fdc32_0;
const fdc3Factory = (version, interopClient, wire) => {
    switch (version) {
        case '1.2':
            return new fdc3_1_2_1.Fdc3Module(() => interopClient, wire);
        case '2.0':
            return new fdc3_2_0_1.Fdc3Module2(() => interopClient, wire);
        default:
            throw new Error(`Invalid FDC3 version provided: ${version}. Must be '1.2' or '2.0'`);
    }
};
fdc3ClientFactory.fdc3Factory = fdc3Factory;

var __importDefault$1 = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(Factory$1, "__esModule", { value: true });
Factory$1.InteropModule = void 0;
const cloneDeep_1 = __importDefault$1(require$$0$1);
const inaccessibleObject_1 = inaccessibleObject;
const base_1$2 = base;
const InteropBroker_1 = InteropBroker$1;
const InteropClient_1 = InteropClient$1;
const overrideCheck_1 = overrideCheck$1;
const common_utils_1 = commonUtils;
const fdc3_client_factory_1 = fdc3ClientFactory;
const defaultOverride = (Class) => new Class();
const BrokerParamAccessError = 'You have attempted to use or modify InteropBroker parameters, which is not allowed. You are likely using an older InteropBroker override scheme. Please consult our Interop docs for guidance on migrating to the new override scheme.';
/**
 * Manages creation of Interop Brokers and Interop Clients. These APIs are called under-the-hood in Platforms.
 *
 */
class InteropModule extends base_1$2.Base {
    /**
     * Initializes an Interop Broker. This is called under-the-hood for Platforms.
     *
     * @remarks For Platforms, this is set up automatically. We advise to only create your own Interop Broker
     * when not using a Platform app. You can override functions in the Interop Broker. More info {@link InteropBroker here}.
     *
     * @param name - Name of the Interop Broker.
     * @param override - A callback function or array of callback functions that can be used to extend or replace default Interop Broker behavior.
     *
     * @example
     * ``` js
     * const interopBroker = await fin.Interop.init('openfin');
     * const contextGroups = await interopBroker.getContextGroups();
     * console.log(contextGroups);
     * ```
     */
    async init(name, override = defaultOverride) {
        this.wire.sendAction('interop-init').catch(() => {
            // don't expose, analytics-only call
        });
        // Allows for manifest-level configuration, without having to override. (e.g. specifying custom context groups)
        const options = await this.wire.environment.getInteropInfo(this.wire.getFin());
        const objectThatThrows = (0, inaccessibleObject_1.createUnusableObject)(BrokerParamAccessError);
        const warningOptsClone = (0, inaccessibleObject_1.createWarningObject)(BrokerParamAccessError, (0, cloneDeep_1.default)(options));
        const getProvider = () => {
            return this.fin.InterApplicationBus.Channel.create(`interop-broker-${name}`);
        };
        const throwingGetProvider = async () => {
            // eslint-disable-next-line no-console
            throw new Error(BrokerParamAccessError);
        };
        const OverrideableBroker = InteropBroker_1.InteropBroker.createClosedConstructor(this.wire, getProvider, options);
        let broker;
        if (Array.isArray(override)) {
            const BrokerConstructor = (0, common_utils_1.overrideFromComposables)(...override)(OverrideableBroker);
            // We need to use these objects because removing them entirely would be a breaking change and we want an informative error
            // @ts-expect-error
            broker = new BrokerConstructor(objectThatThrows, throwingGetProvider, warningOptsClone);
        }
        else {
            // We need to use these objects because removing them entirely would be a breaking change and we want an informative error
            // @ts-expect-error
            broker = await override(OverrideableBroker, objectThatThrows, throwingGetProvider, warningOptsClone);
        }
        (0, overrideCheck_1.overrideCheck)(broker, options.fdc3Version);
        return broker;
    }
    /**
     * Connects a client to an Interop broker. This is called under-the-hood for Views in a Platform.
     *
     * @remarks
     * @param name - The name of the Interop Broker to connect to. For Platforms, this will default to the uuid of the Platform.
     * @param interopConfig - Information relevant to the Interop Broker. Typically a declaration of
     * what context(s) the entity wants to subscribe to, and the current Context Group of the entity.
     *
     * @example
     * ```js
     * const interopConfig = {
     *     currentContextGroup: 'green'
     * }
     *
     * const interopBroker = await fin.Interop.init('openfin');
     * const client = await fin.Interop.connectSync('openfin', interopConfig);
     * const contextGroupInfo = await client.getInfoForContextGroup();
     * console.log(contextGroupInfo);
     * ```
     */
    connectSync(name, interopConfig) {
        this.wire.sendAction('interop-connect-sync').catch(() => {
            // don't expose, analytics-only call
        });
        return new InteropClient_1.InteropClient(this.wire, this.wire.environment.whenReady().then(() => {
            return this.fin.InterApplicationBus.Channel.connect(`interop-broker-${name}`, {
                payload: interopConfig
            });
        }), fdc3_client_factory_1.fdc3Factory);
    }
}
Factory$1.InteropModule = InteropModule;

(function (exports) {
	/**
	 * Entry point for the OpenFin `Interop` API (`fin.Interop`).
	 *
	 * * {@link InteropModule} contains static members of the `Interop` API (available under `fin.Interop`)
	 * * {@link InteropClient} and {@link InteropBroker} document instances of their respective classes.
	 *
	 * @packageDocumentation
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(Factory$1, exports);
	__exportStar(InteropClient$1, exports);
	__exportStar(InteropBroker$1, exports); 
} (interop));

var snapshotSource = {};

var Factory = {};

var Instance = {};

var utils = {};

Object.defineProperty(utils, "__esModule", { value: true });
utils.getSnapshotSourceChannelName = void 0;
const channelPrefix = 'snapshot-source-provider-';
const getSnapshotSourceChannelName = (id) => `${channelPrefix}${id.uuid}`;
utils.getSnapshotSourceChannelName = getSnapshotSourceChannelName;

var __classPrivateFieldSet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet$1 = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SnapshotSource_identity, _SnapshotSource_getConnection, _SnapshotSource_getClient, _SnapshotSource_startConnection, _SnapshotSource_setUpConnectionListener;
Object.defineProperty(Instance, "__esModule", { value: true });
Instance.SnapshotSource = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const base_1$1 = base;
const utils_1$1 = utils;
const connectionMap = new Map();
/**
 * Enables configuring a SnapshotSource with custom getSnapshot and applySnapshot methods.
 *
 * @typeParam Snapshot Implementation-defined shape of an application snapshot.  Allows
 * custom snapshot implementations for legacy applications to define their own snapshot format.
 */
class SnapshotSource extends base_1$1.Base {
    /**
     * @internal
     */
    constructor(wire, id) {
        super(wire);
        _SnapshotSource_identity.set(this, void 0);
        _SnapshotSource_getConnection.set(this, () => {
            if (!connectionMap.has(this.identity.uuid)) {
                connectionMap.set(this.identity.uuid, { eventFired: null, clientPromise: null });
            }
            return connectionMap.get(this.identity.uuid);
        });
        _SnapshotSource_getClient.set(this, () => {
            if (!__classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).clientPromise) {
                __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).clientPromise = __classPrivateFieldGet$1(this, _SnapshotSource_startConnection, "f").call(this);
            }
            return __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).clientPromise;
        });
        _SnapshotSource_startConnection.set(this, async () => {
            const channelName = (0, utils_1$1.getSnapshotSourceChannelName)(this.identity);
            try {
                if (!__classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).eventFired) {
                    await __classPrivateFieldGet$1(this, _SnapshotSource_setUpConnectionListener, "f").call(this);
                }
                const client = await this.fin.InterApplicationBus.Channel.connect(channelName, { wait: false });
                client.onDisconnection(() => {
                    __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).clientPromise = null;
                    __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).eventFired = null;
                });
                return client;
            }
            catch (e) {
                __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).clientPromise = null;
                throw new Error("The targeted SnapshotSource is not currently initialized. Await this object's ready() method.");
            }
        });
        _SnapshotSource_setUpConnectionListener.set(this, async () => {
            const channelName = (0, utils_1$1.getSnapshotSourceChannelName)(this.identity);
            let resolve;
            let reject;
            const eventFired = new Promise((y, n) => {
                resolve = y;
                reject = n;
            });
            __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).eventFired = eventFired;
            const listener = async (e) => {
                try {
                    if (e.channelName === channelName) {
                        resolve();
                        await this.fin.InterApplicationBus.Channel.removeListener('connected', listener);
                    }
                }
                catch (err) {
                    reject(err);
                }
            };
            await this.fin.InterApplicationBus.Channel.on('connected', listener);
        });
        __classPrivateFieldSet$1(this, _SnapshotSource_identity, id, "f");
    }
    get identity() {
        return __classPrivateFieldGet$1(this, _SnapshotSource_identity, "f");
    }
    /**
     * Method to determine if the SnapshotSource has been initialized.
     *
     * @remarks Use when the parent application is starting up to ensure the SnapshotSource is able to accept and
     * apply a snapshot using the {@link SnapshotSource#applySnapshot applySnapshot} method.
     *
     * @example
     * ```js
     * let snapshotSource = fin.SnapshotSource.wrapSync(fin.me);
     *
     * const snapshotProvider = {
     *     async getSnapshot() { return 'foo' },
     *     async applySnapshot(snapshot) {
     *       console.log(snapshot);
     *       return undefined;
     *     }
     * }
     * await fin.SnapshotSource.init(snapshotProvider);
     *
     * try {
     *   await snapshotSource.ready();
     *   await snapshotSource.applySnapshot('foo');
     * } catch (err) {
     *   console.log(err)
     * }
     * ```
     */
    async ready() {
        this.wire.sendAction('snapshot-source-ready').catch((e) => {
            // don't expose, analytics-only call
        });
        // eslint-disable-next-line no-async-promise-executor
        try {
            // If getClient was already called before this, do we have a timing issue where the channel might have been created but we missed the event but this still fails?
            await __classPrivateFieldGet$1(this, _SnapshotSource_getClient, "f").call(this);
        }
        catch (e) {
            // it was not running.
            await __classPrivateFieldGet$1(this, _SnapshotSource_getConnection, "f").call(this).eventFired;
        }
    }
    /**
     * Call the SnapshotSource's getSnapshot method defined by {@link SnapshotSource.SnapshotSourceModule#init init}.
     *
     */
    async getSnapshot() {
        this.wire.sendAction('snapshot-source-get-snapshot').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$1(this, _SnapshotSource_getClient, "f").call(this);
        const response = (await client.dispatch('get-snapshot'));
        return (await response).snapshot;
    }
    /**
     * Call the SnapshotSource's applySnapshot method defined by {@link SnapshotSource.SnapshotSourceModule#init init}.
     *
     */
    async applySnapshot(snapshot) {
        this.wire.sendAction('snapshot-source-apply-snapshot').catch((e) => {
            // don't expose, analytics-only call
        });
        const client = await __classPrivateFieldGet$1(this, _SnapshotSource_getClient, "f").call(this);
        return client.dispatch('apply-snapshot', { snapshot });
    }
}
Instance.SnapshotSource = SnapshotSource;
_SnapshotSource_identity = new WeakMap(), _SnapshotSource_getConnection = new WeakMap(), _SnapshotSource_getClient = new WeakMap(), _SnapshotSource_startConnection = new WeakMap(), _SnapshotSource_setUpConnectionListener = new WeakMap();

Object.defineProperty(Factory, "__esModule", { value: true });
Factory.SnapshotSourceModule = void 0;
const base_1 = base;
const Instance_1 = Instance;
const utils_1 = utils;
/**
 * Static namespace for OpenFin API methods that interact with the {@link SnapshotSource} class, available under `fin.SnapshotSource`.
 */
class SnapshotSourceModule extends base_1.Base {
    /**
     * Initializes a SnapshotSource with the getSnapshot and applySnapshot methods defined.
     *
     * @typeParam Snapshot Implementation-defined shape of an application snapshot.  Allows
     * custom snapshot implementations for legacy applications to define their own snapshot format.
     *
     * @example
     * ```js
     * const snapshotProvider = {
     *     async getSnapshot() {
     *       const bounds = await fin.me.getBounds();
     *       return bounds;
     *      },
     *     async applySnapshot(snapshot) {
     *       await fin.me.setBounds(snapshot);
     *       return undefined;
     *     }
     * }
     *
     * await fin.SnapshotSource.init(snapshotProvider);
     * ```
     *
     */
    async init(provider) {
        this.wire.sendAction('snapshot-source-init').catch((e) => {
            // don't expose, analytics-only call
        });
        if (typeof provider !== 'object' ||
            typeof provider.getSnapshot !== 'function' ||
            typeof provider.applySnapshot !== 'function') {
            throw new Error('you must pass in a valid SnapshotProvider');
        }
        const channel = await this.fin.InterApplicationBus.Channel.create((0, utils_1.getSnapshotSourceChannelName)(this.fin.me));
        channel.register('get-snapshot', async () => {
            const snapshot = await provider.getSnapshot();
            return { snapshot };
        });
        channel.register('apply-snapshot', ({ snapshot }) => provider.applySnapshot(snapshot));
    }
    /**
     * Synchronously returns a SnapshotSource object that represents the current SnapshotSource.
     *
     * @example
     * ```js
     * const snapshotSource = fin.SnapshotSource.wrapSync(fin.me);
     * // Use wrapped instance's getSnapshot method, e.g.:
     * const snapshot = await snapshotSource.getSnapshot();
     * ```
     */
    wrapSync(identity) {
        this.wire.sendAction('snapshot-source-wrap-sync').catch((e) => {
            // don't expose, analytics-only call
        });
        return new Instance_1.SnapshotSource(this.wire, identity);
    }
    /**
     * Asynchronously returns a SnapshotSource object that represents the current SnapshotSource.
     *
     * @example
     * ```js
     * const snapshotSource = await fin.SnapshotSource.wrap(fin.me);
     * // Use wrapped instance's getSnapshot method, e.g.:
     * const snapshot = await snapshotSource.getSnapshot();
     * ```
     */
    async wrap(identity) {
        this.wire.sendAction('snapshot-source-wrap').catch((e) => {
            // don't expose, analytics-only call
        });
        return this.wrapSync(identity);
    }
}
Factory.SnapshotSourceModule = SnapshotSourceModule;

(function (exports) {
	/**
	 * Entry points for the OpenFin `SnapshotSource` API (`fin.SnapshotSource`).
	 *
	 * * {@link SnapshotSourceModule} contains static members of the `SnapshotSource` API, accessible through `fin.SnapshotSource`.
	 * * {@link SnapshotSource} describes an instance of an OpenFin SnapshotSource, e.g. as returned by `fin.SnapshotSource.wrap`.
	 *
	 * These are separate code entities, and are documented separately.  In the [previous version of the API documentation](https://cdn.openfin.co/docs/javascript/32.114.76.10/index.html),
	 * both of these were documented on the same page.
	 *
	 * @packageDocumentation
	 */
	var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    var desc = Object.getOwnPropertyDescriptor(m, k);
	    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
	      desc = { enumerable: true, get: function() { return m[k]; } };
	    }
	    Object.defineProperty(o, k2, desc);
	}) : (function(o, m, k, k2) {
	    if (k2 === undefined) k2 = k;
	    o[k2] = m[k];
	}));
	var __exportStar = (commonjsGlobal && commonjsGlobal.__exportStar) || function(m, exports) {
	    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	__exportStar(Factory, exports);
	__exportStar(Instance, exports); 
} (snapshotSource));

Object.defineProperty(fin$2, "__esModule", { value: true });
var Fin_1 = fin$2.Fin = void 0;
const events_1$3 = require$$0;
// Import from the file rather than the directory in case someone consuming types is using module resolution other than "node"
const index_1 = system;
const index_2 = requireWindow();
const index_3 = requireApplication();
const index_4 = interappbus;
const index_5 = clipboard;
const index_6 = externalApplication;
const index_7 = frame;
const index_8 = globalHotkey;
const index_9 = requireView();
const index_10 = platform;
const me_1$2 = me;
const interop_1 = interop;
const snapshot_source_1 = snapshotSource;
/**
 * @internal
 */
class Fin extends events_1$3.EventEmitter {
    /**
     * @internal
     */
    constructor(wire) {
        super();
        this.wire = wire;
        this.System = new index_1.System(wire);
        this.Window = new index_2._WindowModule(wire);
        this.Application = new index_3.ApplicationModule(wire);
        this.InterApplicationBus = new index_4.InterApplicationBus(wire);
        this.Clipboard = new index_5.Clipboard(wire);
        this.ExternalApplication = new index_6.ExternalApplicationModule(wire);
        this.Frame = new index_7._FrameModule(wire);
        this.GlobalHotkey = new index_8.GlobalHotkey(wire);
        this.Platform = new index_10.PlatformModule(wire, this.InterApplicationBus.Channel);
        this.View = new index_9.ViewModule(wire);
        this.Interop = new interop_1.InteropModule(wire);
        this.SnapshotSource = new snapshot_source_1.SnapshotSourceModule(wire);
        wire.registerFin(this);
        this.me = (0, me_1$2.getMe)(wire);
        // Handle disconnect events
        wire.on('disconnected', () => {
            this.emit('disconnected');
        });
    }
}
Fin_1 = fin$2.Fin = Fin;

var transport = {};

var wire = {};

Object.defineProperty(wire, "__esModule", { value: true });
wire.isInternalConnectConfig = wire.isPortDiscoveryConfig = wire.isNewConnectConfig = wire.isConfigWithReceiver = wire.isRemoteConfig = wire.isExistingConnectConfig = wire.isExternalConfig = void 0;
function isExternalConfig(config) {
    if (typeof config.manifestUrl === 'string') {
        return true;
    }
    return false;
}
wire.isExternalConfig = isExternalConfig;
function isExistingConnectConfig(config) {
    return hasUuid(config) && typeof config.address === 'string';
}
wire.isExistingConnectConfig = isExistingConnectConfig;
function isRemoteConfig(config) {
    return isExistingConnectConfig(config) && typeof config.token === 'string';
}
wire.isRemoteConfig = isRemoteConfig;
function isConfigWithReceiver(config) {
    return typeof config.receiver === 'object' && isRemoteConfig({ ...config, address: '' });
}
wire.isConfigWithReceiver = isConfigWithReceiver;
function hasUuid(config) {
    return typeof config.uuid === 'string';
}
function hasRuntimeVersion(config) {
    return config.runtime && typeof config.runtime.version === 'string';
}
function isNewConnectConfig(config) {
    return hasUuid(config) && hasRuntimeVersion(config);
}
wire.isNewConnectConfig = isNewConnectConfig;
function isPortDiscoveryConfig(config) {
    return (isExternalConfig(config) && hasRuntimeVersion(config)) || isNewConnectConfig(config);
}
wire.isPortDiscoveryConfig = isPortDiscoveryConfig;
function isInternalConnectConfig(config) {
    return isExistingConnectConfig(config) || isNewConnectConfig(config);
}
wire.isInternalConnectConfig = isInternalConnectConfig;

var eventAggregator = {};

var emitterMap = {};

Object.defineProperty(emitterMap, "__esModule", { value: true });
emitterMap.EmitterMap = void 0;
const events_1$2 = require$$0;
class EmitterMap {
    constructor() {
        this.storage = new Map();
    }
    // eslint-disable-next-line class-methods-use-this
    hashKeys(keys) {
        const hashed = keys.map(normalizeString);
        return hashed.join('/');
    }
    getOrCreate(keys) {
        const hash = this.hashKeys(keys);
        if (!this.storage.has(hash)) {
            this.storage.set(hash, new events_1$2.EventEmitter());
        }
        // We set it above
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return this.storage.get(hash);
    }
    has(keys) {
        return this.storage.has(this.hashKeys(keys));
    }
    delete(keys) {
        const hash = this.hashKeys(keys);
        return this.storage.delete(hash);
    }
}
emitterMap.EmitterMap = EmitterMap;
function normalizeString(s) {
    const b = Buffer.from(s);
    return b.toString('base64');
}

Object.defineProperty(eventAggregator, "__esModule", { value: true });
const emitterMap_1 = emitterMap;
function isEventMessage(message) {
    return message.action === 'process-desktop-event';
}
function mapKeyFromEvent(event) {
    const { topic } = event;
    if (topic === 'frame' || topic === 'window' || topic === 'view') {
        const { uuid, name } = event;
        return [topic, uuid, name];
    }
    if (topic === 'application') {
        const { uuid } = event;
        return [topic, uuid];
    }
    return [topic];
}
class EventAggregator extends emitterMap_1.EmitterMap {
    constructor() {
        super(...arguments);
        this.dispatchEvent = (message) => {
            if (isEventMessage(message)) {
                const { payload } = message;
                const accessor = mapKeyFromEvent(payload);
                if (this.has(accessor)) {
                    this.getOrCreate(accessor).emit(payload.type, payload);
                    return true;
                }
            }
            return false;
        };
    }
}
eventAggregator.default = EventAggregator;

var __classPrivateFieldSet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (commonjsGlobal && commonjsGlobal.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Transport_wire, _Transport_fin;
Object.defineProperty(transport, "__esModule", { value: true });
var Transport_1 = transport.Transport = void 0;
const events_1$1 = require$$0;
const wire_1 = wire;
const transport_errors_1 = transportErrors;
const eventAggregator_1 = __importDefault(eventAggregator);
const me_1$1 = me;
const errors_1 = errors;
class Transport extends events_1$1.EventEmitter {
    constructor(factory, environment, config) {
        super();
        this.wireListeners = new Map();
        this.topicRefMap = new Map();
        this.eventAggregator = new eventAggregator_1.default();
        this.messageHandlers = [this.eventAggregator.dispatchEvent];
        _Transport_wire.set(this, void 0);
        // Typing as unknown to avoid circular dependency, should not be used directly.
        _Transport_fin.set(this, void 0);
        this.connectSync = () => {
            const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
            wire.connectSync();
        };
        // This function is only used in our tests.
        this.getPort = () => {
            const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
            return wire.getPort();
        };
        __classPrivateFieldSet(this, _Transport_wire, factory(this.onmessage.bind(this)), "f");
        this.environment = environment;
        this.sendRaw = __classPrivateFieldGet(this, _Transport_wire, "f").send.bind(__classPrivateFieldGet(this, _Transport_wire, "f"));
        this.registerMessageHandler(this.handleMessage.bind(this));
        __classPrivateFieldGet(this, _Transport_wire, "f").on('disconnected', () => {
            for (const [, { handleNack }] of this.wireListeners) {
                handleNack({ reason: 'Remote connection has closed' });
            }
            this.wireListeners.clear();
            this.emit('disconnected');
        });
        const { uuid, name } = config;
        const entityType = this.environment.getCurrentEntityType();
        this.me = (0, me_1$1.getBaseMe)(entityType, uuid, name);
    }
    getFin() {
        if (!__classPrivateFieldGet(this, _Transport_fin, "f")) {
            throw new Error('No Fin object registered for this transport');
        }
        return __classPrivateFieldGet(this, _Transport_fin, "f");
    }
    registerFin(_fin) {
        if (__classPrivateFieldGet(this, _Transport_fin, "f")) {
            throw new Error('Fin object has already been registered for this transport');
        }
        __classPrivateFieldSet(this, _Transport_fin, _fin, "f");
    }
    shutdown() {
        const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
        return wire.shutdown();
    }
    async connect(config) {
        if ((0, wire_1.isConfigWithReceiver)(config)) {
            await __classPrivateFieldGet(this, _Transport_wire, "f").connect(config.receiver);
            return this.authorize(config);
        }
        if ((0, wire_1.isRemoteConfig)(config)) {
            return this.connectRemote(config);
        }
        if ((0, wire_1.isExistingConnectConfig)(config)) {
            return this.connectByPort(config);
        }
        if ((0, wire_1.isNewConnectConfig)(config)) {
            const port = await this.environment.retrievePort(config);
            return this.connectByPort({ ...config, address: `ws://localhost:${port}` });
        }
        return undefined;
    }
    async connectRemote(config) {
        await __classPrivateFieldGet(this, _Transport_wire, "f").connect(new (this.environment.getWsConstructor())(config.address));
        return this.authorize(config);
    }
    async connectByPort(config) {
        const { address, uuid } = config;
        const reqAuthPayload = { ...config, type: 'file-token' };
        const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
        await wire.connect(new (this.environment.getWsConstructor())(config.address));
        const requestExtAuthRet = await this.sendAction('request-external-authorization', {
            uuid,
            type: 'file-token'
        }, true);
        if (requestExtAuthRet.action !== 'external-authorization-response') {
            throw new transport_errors_1.UnexpectedActionError(requestExtAuthRet.action);
        }
        await this.environment.writeToken(requestExtAuthRet.payload.file, requestExtAuthRet.payload.token);
        return this.authorize(reqAuthPayload);
    }
    async authorize(reqAuthPayload) {
        const requestAuthRet = await this.sendAction('request-authorization', reqAuthPayload, true);
        if (requestAuthRet.action !== 'authorization-response') {
            throw new transport_errors_1.UnexpectedActionError(requestAuthRet.action);
        }
        else if (requestAuthRet.payload.success !== true) {
            throw new transport_errors_1.RuntimeError(requestAuthRet.payload);
        }
    }
    sendAction(action, payload = {}, uncorrelated = false
    // specialResponse type is only used for 'requestAuthorization'
    ) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        let cancel = () => { };
        // We want the callsite from the caller of this function, not from here.
        const callSites = transport_errors_1.RuntimeError.getCallSite(1);
        const messageId = this.environment.getNextMessageId();
        const prom = new Promise((resolve, reject) => {
            cancel = reject;
            const msg = {
                action,
                payload,
                messageId
            };
            const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
            this.addWireListener(messageId, resolve, (payload) => this.nackHandler(payload, reject, callSites), uncorrelated);
            return wire.send(msg).catch(reject);
        });
        return Object.assign(prom, { cancel, messageId });
    }
    nackHandler(payloadOrMessage, reject, callSites) {
        if (typeof payloadOrMessage === 'string') {
            // NOTE: this is for backwards compatibility to support plain string rejections
            reject(payloadOrMessage);
        }
        else {
            reject(new transport_errors_1.RuntimeError(payloadOrMessage, callSites));
        }
    }
    ferryAction(origData) {
        return new Promise((resolve, reject) => {
            const id = this.environment.getNextMessageId();
            origData.messageId = id;
            const resolver = (data) => {
                resolve(data.payload);
            };
            const wire = __classPrivateFieldGet(this, _Transport_wire, "f");
            return wire
                .send(origData)
                .then(() => this.addWireListener(id, resolver, (payload) => this.nackHandler(payload, reject), false))
                .catch(reject);
        });
    }
    registerMessageHandler(handler) {
        this.messageHandlers.push(handler);
    }
    addWireListener(id, resolve, handleNack, uncorrelated) {
        if (uncorrelated) {
            this.uncorrelatedListener = resolve;
        }
        else if (this.wireListeners.has(id)) {
            handleNack({
                reason: 'Duplicate handler id',
                error: (0, errors_1.errorToPOJO)(new transport_errors_1.DuplicateCorrelationError(String(id)))
            });
        }
        else {
            this.wireListeners.set(id, { resolve, handleNack });
        }
        // Timeout and reject()?
    }
    // This method executes message handlers until the _one_ that handles the message (returns truthy) has run
    onmessage(data) {
        for (const h of this.messageHandlers) {
            h.call(null, data);
        }
    }
    handleMessage(data) {
        const id = data.correlationId || NaN;
        if (!('correlationId' in data)) {
            if (this.uncorrelatedListener) {
                this.uncorrelatedListener.call(null, data);
            }
            this.uncorrelatedListener = () => {
                // empty block
            };
        }
        else if (!this.wireListeners.has(id)) {
            return false;
        }
        else {
            // We just checked for existence above
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const { resolve, handleNack } = this.wireListeners.get(id);
            if (data.action !== 'ack') {
                handleNack({ reason: 'Did not receive ack action', error: (0, errors_1.errorToPOJO)(new transport_errors_1.NoAckError(data.action)) });
            }
            else if (!('payload' in data)) {
                // I'm not sure when this code would actually run, but passing in something that doeesn't have a reason to the runtimeerror constructor will not end well.
                // @ts-expect-error
                if (typeof data.reason === 'string') {
                    handleNack(data);
                }
                else {
                    console.warn('Received invalid response from core', data);
                    handleNack({
                        reason: 'invalid response shape',
                        error: (0, errors_1.errorToPOJO)(new Error('Invalid response shape'))
                    });
                }
            }
            else if (!data.payload.success) {
                handleNack(data.payload);
            }
            else {
                resolve.call(null, data);
            }
            this.wireListeners.delete(id);
        }
        return true;
    }
}
Transport_1 = transport.Transport = Transport;
_Transport_wire = new WeakMap(), _Transport_fin = new WeakMap();

var stubEnvironment = {};

Object.defineProperty(stubEnvironment, "__esModule", { value: true });
var StubEnvironment_1 = stubEnvironment.StubEnvironment = void 0;
const me_1 = me;
class StubEnvironment {
    constructor() {
        this.type = 'other';
        this.childViews = true;
    }
    getAdapterVersionSync() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    async getInteropInfo() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    async getViewWindowIdentity() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getDefaultChannelOptions() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getRtcPeer() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    layoutAllowedInContext(_fin) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    initLayoutManager() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    applyLayoutSnapshot() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    async createLayout() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    async destroyLayout() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    async resolveLayout() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    initPlatform() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    observeBounds() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    writeToken(path, token) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    retrievePort(config) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getNextMessageId() {
        return `mock-message-id-${Math.random()}`;
    }
    getRandomId() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    createChildContent(options) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getWebWindow(identity) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getCurrentEntityIdentity() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getCurrentEntityType() {
        return 'unknown';
    }
    raiseEvent(eventName, eventArgs) {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getUrl() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    whenReady() {
        throw new Error(me_1.environmentUnsupportedMessage);
    }
    getWsConstructor() {
        throw new Error('Method not implemented.');
    }
}
StubEnvironment_1 = stubEnvironment.StubEnvironment = StubEnvironment;

var stubWire = {};

Object.defineProperty(stubWire, "__esModule", { value: true });
var StubWire_1 = stubWire.StubWire = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const events_1 = require$$0;
class StubWire extends events_1.EventEmitter {
    connect() {
        throw new Error('You are not running in OpenFin.');
    }
    connectSync() {
        throw new Error('You are not running in OpenFin.');
    }
    send(data) {
        throw new Error('You are not running in OpenFin.');
    }
    shutdown() {
        throw new Error('You are not running in OpenFin.');
    }
    getPort() {
        throw new Error('This transport has no port');
    }
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
}
StubWire_1 = stubWire.StubWire = StubWire;

const fin$1 = ((typeof window !== 'undefined' && window?.fin) ||
    (() => {
        const environment = new StubEnvironment_1();
        const transport = new Transport_1(() => new StubWire_1(), environment, {
            uuid: '',
            name: ''
        });
        return new Fin_1(transport);
    })());

exports.OpenFin = OpenFin$1;
exports["default"] = OpenFin$1;
exports.fin = fin$1;


/***/ },

/***/ "../../../../node_modules/events/events.js"
/*!*************************************************!*\
  !*** ../../../../node_modules/events/events.js ***!
  \*************************************************/
(module) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ },

/***/ "../../../../node_modules/lodash/_DataView.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_DataView.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;


/***/ },

/***/ "../../../../node_modules/lodash/_Hash.js"
/*!************************************************!*\
  !*** ../../../../node_modules/lodash/_Hash.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(/*! ./_hashClear */ "../../../../node_modules/lodash/_hashClear.js"),
    hashDelete = __webpack_require__(/*! ./_hashDelete */ "../../../../node_modules/lodash/_hashDelete.js"),
    hashGet = __webpack_require__(/*! ./_hashGet */ "../../../../node_modules/lodash/_hashGet.js"),
    hashHas = __webpack_require__(/*! ./_hashHas */ "../../../../node_modules/lodash/_hashHas.js"),
    hashSet = __webpack_require__(/*! ./_hashSet */ "../../../../node_modules/lodash/_hashSet.js");

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;


/***/ },

/***/ "../../../../node_modules/lodash/_ListCache.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_ListCache.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(/*! ./_listCacheClear */ "../../../../node_modules/lodash/_listCacheClear.js"),
    listCacheDelete = __webpack_require__(/*! ./_listCacheDelete */ "../../../../node_modules/lodash/_listCacheDelete.js"),
    listCacheGet = __webpack_require__(/*! ./_listCacheGet */ "../../../../node_modules/lodash/_listCacheGet.js"),
    listCacheHas = __webpack_require__(/*! ./_listCacheHas */ "../../../../node_modules/lodash/_listCacheHas.js"),
    listCacheSet = __webpack_require__(/*! ./_listCacheSet */ "../../../../node_modules/lodash/_listCacheSet.js");

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;


/***/ },

/***/ "../../../../node_modules/lodash/_Map.js"
/*!***********************************************!*\
  !*** ../../../../node_modules/lodash/_Map.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;


/***/ },

/***/ "../../../../node_modules/lodash/_MapCache.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_MapCache.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(/*! ./_mapCacheClear */ "../../../../node_modules/lodash/_mapCacheClear.js"),
    mapCacheDelete = __webpack_require__(/*! ./_mapCacheDelete */ "../../../../node_modules/lodash/_mapCacheDelete.js"),
    mapCacheGet = __webpack_require__(/*! ./_mapCacheGet */ "../../../../node_modules/lodash/_mapCacheGet.js"),
    mapCacheHas = __webpack_require__(/*! ./_mapCacheHas */ "../../../../node_modules/lodash/_mapCacheHas.js"),
    mapCacheSet = __webpack_require__(/*! ./_mapCacheSet */ "../../../../node_modules/lodash/_mapCacheSet.js");

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;


/***/ },

/***/ "../../../../node_modules/lodash/_Promise.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_Promise.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;


/***/ },

/***/ "../../../../node_modules/lodash/_Set.js"
/*!***********************************************!*\
  !*** ../../../../node_modules/lodash/_Set.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;


/***/ },

/***/ "../../../../node_modules/lodash/_SetCache.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_SetCache.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var MapCache = __webpack_require__(/*! ./_MapCache */ "../../../../node_modules/lodash/_MapCache.js"),
    setCacheAdd = __webpack_require__(/*! ./_setCacheAdd */ "../../../../node_modules/lodash/_setCacheAdd.js"),
    setCacheHas = __webpack_require__(/*! ./_setCacheHas */ "../../../../node_modules/lodash/_setCacheHas.js");

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;


/***/ },

/***/ "../../../../node_modules/lodash/_Stack.js"
/*!*************************************************!*\
  !*** ../../../../node_modules/lodash/_Stack.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../../../node_modules/lodash/_ListCache.js"),
    stackClear = __webpack_require__(/*! ./_stackClear */ "../../../../node_modules/lodash/_stackClear.js"),
    stackDelete = __webpack_require__(/*! ./_stackDelete */ "../../../../node_modules/lodash/_stackDelete.js"),
    stackGet = __webpack_require__(/*! ./_stackGet */ "../../../../node_modules/lodash/_stackGet.js"),
    stackHas = __webpack_require__(/*! ./_stackHas */ "../../../../node_modules/lodash/_stackHas.js"),
    stackSet = __webpack_require__(/*! ./_stackSet */ "../../../../node_modules/lodash/_stackSet.js");

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;


/***/ },

/***/ "../../../../node_modules/lodash/_Symbol.js"
/*!**************************************************!*\
  !*** ../../../../node_modules/lodash/_Symbol.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ },

/***/ "../../../../node_modules/lodash/_Uint8Array.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_Uint8Array.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;


/***/ },

/***/ "../../../../node_modules/lodash/_WeakMap.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_WeakMap.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js"),
    root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;


/***/ },

/***/ "../../../../node_modules/lodash/_arrayEach.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_arrayEach.js ***!
  \*****************************************************/
(module) {

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;


/***/ },

/***/ "../../../../node_modules/lodash/_arrayFilter.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_arrayFilter.js ***!
  \*******************************************************/
(module) {

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

module.exports = arrayFilter;


/***/ },

/***/ "../../../../node_modules/lodash/_arrayLikeKeys.js"
/*!*********************************************************!*\
  !*** ../../../../node_modules/lodash/_arrayLikeKeys.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(/*! ./_baseTimes */ "../../../../node_modules/lodash/_baseTimes.js"),
    isArguments = __webpack_require__(/*! ./isArguments */ "../../../../node_modules/lodash/isArguments.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../../../node_modules/lodash/isBuffer.js"),
    isIndex = __webpack_require__(/*! ./_isIndex */ "../../../../node_modules/lodash/_isIndex.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../../../node_modules/lodash/isTypedArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ },

/***/ "../../../../node_modules/lodash/_arrayPush.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_arrayPush.js ***!
  \*****************************************************/
(module) {

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

module.exports = arrayPush;


/***/ },

/***/ "../../../../node_modules/lodash/_arraySome.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_arraySome.js ***!
  \*****************************************************/
(module) {

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;


/***/ },

/***/ "../../../../node_modules/lodash/_assignValue.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_assignValue.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../../../node_modules/lodash/_baseAssignValue.js"),
    eq = __webpack_require__(/*! ./eq */ "../../../../node_modules/lodash/eq.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ },

/***/ "../../../../node_modules/lodash/_assocIndexOf.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_assocIndexOf.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(/*! ./eq */ "../../../../node_modules/lodash/eq.js");

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;


/***/ },

/***/ "../../../../node_modules/lodash/_baseAssign.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_baseAssign.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../../../node_modules/lodash/_copyObject.js"),
    keys = __webpack_require__(/*! ./keys */ "../../../../node_modules/lodash/keys.js");

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

module.exports = baseAssign;


/***/ },

/***/ "../../../../node_modules/lodash/_baseAssignIn.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseAssignIn.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../../../node_modules/lodash/_copyObject.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../../../node_modules/lodash/keysIn.js");

/**
 * The base implementation of `_.assignIn` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}

module.exports = baseAssignIn;


/***/ },

/***/ "../../../../node_modules/lodash/_baseAssignValue.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseAssignValue.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ./_defineProperty */ "../../../../node_modules/lodash/_defineProperty.js");

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ },

/***/ "../../../../node_modules/lodash/_baseClone.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseClone.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "../../../../node_modules/lodash/_Stack.js"),
    arrayEach = __webpack_require__(/*! ./_arrayEach */ "../../../../node_modules/lodash/_arrayEach.js"),
    assignValue = __webpack_require__(/*! ./_assignValue */ "../../../../node_modules/lodash/_assignValue.js"),
    baseAssign = __webpack_require__(/*! ./_baseAssign */ "../../../../node_modules/lodash/_baseAssign.js"),
    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ "../../../../node_modules/lodash/_baseAssignIn.js"),
    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ "../../../../node_modules/lodash/_cloneBuffer.js"),
    copyArray = __webpack_require__(/*! ./_copyArray */ "../../../../node_modules/lodash/_copyArray.js"),
    copySymbols = __webpack_require__(/*! ./_copySymbols */ "../../../../node_modules/lodash/_copySymbols.js"),
    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ "../../../../node_modules/lodash/_copySymbolsIn.js"),
    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../../../../node_modules/lodash/_getAllKeys.js"),
    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ "../../../../node_modules/lodash/_getAllKeysIn.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../../../node_modules/lodash/_getTag.js"),
    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ "../../../../node_modules/lodash/_initCloneArray.js"),
    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ "../../../../node_modules/lodash/_initCloneByTag.js"),
    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ "../../../../node_modules/lodash/_initCloneObject.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../../../node_modules/lodash/isBuffer.js"),
    isMap = __webpack_require__(/*! ./isMap */ "../../../../node_modules/lodash/isMap.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../../../node_modules/lodash/isObject.js"),
    isSet = __webpack_require__(/*! ./isSet */ "../../../../node_modules/lodash/isSet.js"),
    keys = __webpack_require__(/*! ./keys */ "../../../../node_modules/lodash/keys.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../../../node_modules/lodash/keysIn.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_FLAT_FLAG = 2,
    CLONE_SYMBOLS_FLAG = 4;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Deep clone
 *  2 - Flatten inherited properties
 *  4 - Clone symbols
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result,
      isDeep = bitmask & CLONE_DEEP_FLAG,
      isFlat = bitmask & CLONE_FLAT_FLAG,
      isFull = bitmask & CLONE_SYMBOLS_FLAG;

  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = (isFlat || isFunc) ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat
          ? copySymbolsIn(value, baseAssignIn(result, value))
          : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (isSet(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap(value)) {
    value.forEach(function(subValue, key) {
      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
  }

  var keysFunc = isFull
    ? (isFlat ? getAllKeysIn : getAllKeys)
    : (isFlat ? keysIn : keys);

  var props = isArr ? undefined : keysFunc(value);
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
  });
  return result;
}

module.exports = baseClone;


/***/ },

/***/ "../../../../node_modules/lodash/_baseCreate.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_baseCreate.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../../../../node_modules/lodash/isObject.js");

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;


/***/ },

/***/ "../../../../node_modules/lodash/_baseGetAllKeys.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseGetAllKeys.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../../../../node_modules/lodash/_arrayPush.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../../../node_modules/lodash/isArray.js");

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

module.exports = baseGetAllKeys;


/***/ },

/***/ "../../../../node_modules/lodash/_baseGetTag.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_baseGetTag.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../node_modules/lodash/_Symbol.js"),
    getRawTag = __webpack_require__(/*! ./_getRawTag */ "../../../../node_modules/lodash/_getRawTag.js"),
    objectToString = __webpack_require__(/*! ./_objectToString */ "../../../../node_modules/lodash/_objectToString.js");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsArguments.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsArguments.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../node_modules/lodash/_baseGetTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsEqual.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsEqual.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqualDeep = __webpack_require__(/*! ./_baseIsEqualDeep */ "../../../../node_modules/lodash/_baseIsEqualDeep.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

module.exports = baseIsEqual;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsEqualDeep.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsEqualDeep.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(/*! ./_Stack */ "../../../../node_modules/lodash/_Stack.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "../../../../node_modules/lodash/_equalArrays.js"),
    equalByTag = __webpack_require__(/*! ./_equalByTag */ "../../../../node_modules/lodash/_equalByTag.js"),
    equalObjects = __webpack_require__(/*! ./_equalObjects */ "../../../../node_modules/lodash/_equalObjects.js"),
    getTag = __webpack_require__(/*! ./_getTag */ "../../../../node_modules/lodash/_getTag.js"),
    isArray = __webpack_require__(/*! ./isArray */ "../../../../node_modules/lodash/isArray.js"),
    isBuffer = __webpack_require__(/*! ./isBuffer */ "../../../../node_modules/lodash/isBuffer.js"),
    isTypedArray = __webpack_require__(/*! ./isTypedArray */ "../../../../node_modules/lodash/isTypedArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

module.exports = baseIsEqualDeep;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsMap.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsMap.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "../../../../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]';

/**
 * The base implementation of `_.isMap` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 */
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}

module.exports = baseIsMap;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsNative.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsNative.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../../../node_modules/lodash/isFunction.js"),
    isMasked = __webpack_require__(/*! ./_isMasked */ "../../../../node_modules/lodash/_isMasked.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../../../node_modules/lodash/isObject.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../../../node_modules/lodash/_toSource.js");

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsSet.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsSet.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getTag = __webpack_require__(/*! ./_getTag */ "../../../../node_modules/lodash/_getTag.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var setTag = '[object Set]';

/**
 * The base implementation of `_.isSet` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 */
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}

module.exports = baseIsSet;


/***/ },

/***/ "../../../../node_modules/lodash/_baseIsTypedArray.js"
/*!************************************************************!*\
  !*** ../../../../node_modules/lodash/_baseIsTypedArray.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../node_modules/lodash/_baseGetTag.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../../../node_modules/lodash/isLength.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ },

/***/ "../../../../node_modules/lodash/_baseKeys.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseKeys.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../../../node_modules/lodash/_isPrototype.js"),
    nativeKeys = __webpack_require__(/*! ./_nativeKeys */ "../../../../node_modules/lodash/_nativeKeys.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;


/***/ },

/***/ "../../../../node_modules/lodash/_baseKeysIn.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_baseKeysIn.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ./isObject */ "../../../../node_modules/lodash/isObject.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../../../node_modules/lodash/_isPrototype.js"),
    nativeKeysIn = __webpack_require__(/*! ./_nativeKeysIn */ "../../../../node_modules/lodash/_nativeKeysIn.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ },

/***/ "../../../../node_modules/lodash/_baseTimes.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseTimes.js ***!
  \*****************************************************/
(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ },

/***/ "../../../../node_modules/lodash/_baseUnary.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_baseUnary.js ***!
  \*****************************************************/
(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ },

/***/ "../../../../node_modules/lodash/_cacheHas.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_cacheHas.js ***!
  \****************************************************/
(module) {

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneArrayBuffer.js"
/*!************************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneArrayBuffer.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "../../../../node_modules/lodash/_Uint8Array.js");

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneBuffer.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneBuffer.js ***!
  \*******************************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneDataView.js"
/*!*********************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneDataView.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../../../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

module.exports = cloneDataView;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneRegExp.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneRegExp.js ***!
  \*******************************************************/
(module) {

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

module.exports = cloneRegExp;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneSymbol.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneSymbol.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../node_modules/lodash/_Symbol.js");

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

module.exports = cloneSymbol;


/***/ },

/***/ "../../../../node_modules/lodash/_cloneTypedArray.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_cloneTypedArray.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../../../node_modules/lodash/_cloneArrayBuffer.js");

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;


/***/ },

/***/ "../../../../node_modules/lodash/_copyArray.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_copyArray.js ***!
  \*****************************************************/
(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;


/***/ },

/***/ "../../../../node_modules/lodash/_copyObject.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_copyObject.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(/*! ./_assignValue */ "../../../../node_modules/lodash/_assignValue.js"),
    baseAssignValue = __webpack_require__(/*! ./_baseAssignValue */ "../../../../node_modules/lodash/_baseAssignValue.js");

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ },

/***/ "../../../../node_modules/lodash/_copySymbols.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_copySymbols.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../../../node_modules/lodash/_copyObject.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../../../node_modules/lodash/_getSymbols.js");

/**
 * Copies own symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

module.exports = copySymbols;


/***/ },

/***/ "../../../../node_modules/lodash/_copySymbolsIn.js"
/*!*********************************************************!*\
  !*** ../../../../node_modules/lodash/_copySymbolsIn.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(/*! ./_copyObject */ "../../../../node_modules/lodash/_copyObject.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../../../../node_modules/lodash/_getSymbolsIn.js");

/**
 * Copies own and inherited symbols of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}

module.exports = copySymbolsIn;


/***/ },

/***/ "../../../../node_modules/lodash/_coreJsData.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_coreJsData.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js");

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ },

/***/ "../../../../node_modules/lodash/_defineProperty.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_defineProperty.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js");

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ },

/***/ "../../../../node_modules/lodash/_equalArrays.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_equalArrays.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var SetCache = __webpack_require__(/*! ./_SetCache */ "../../../../node_modules/lodash/_SetCache.js"),
    arraySome = __webpack_require__(/*! ./_arraySome */ "../../../../node_modules/lodash/_arraySome.js"),
    cacheHas = __webpack_require__(/*! ./_cacheHas */ "../../../../node_modules/lodash/_cacheHas.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;


/***/ },

/***/ "../../../../node_modules/lodash/_equalByTag.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_equalByTag.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../node_modules/lodash/_Symbol.js"),
    Uint8Array = __webpack_require__(/*! ./_Uint8Array */ "../../../../node_modules/lodash/_Uint8Array.js"),
    eq = __webpack_require__(/*! ./eq */ "../../../../node_modules/lodash/eq.js"),
    equalArrays = __webpack_require__(/*! ./_equalArrays */ "../../../../node_modules/lodash/_equalArrays.js"),
    mapToArray = __webpack_require__(/*! ./_mapToArray */ "../../../../node_modules/lodash/_mapToArray.js"),
    setToArray = __webpack_require__(/*! ./_setToArray */ "../../../../node_modules/lodash/_setToArray.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;


/***/ },

/***/ "../../../../node_modules/lodash/_equalObjects.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_equalObjects.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getAllKeys = __webpack_require__(/*! ./_getAllKeys */ "../../../../node_modules/lodash/_getAllKeys.js");

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;


/***/ },

/***/ "../../../../node_modules/lodash/_freeGlobal.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_freeGlobal.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;

module.exports = freeGlobal;


/***/ },

/***/ "../../../../node_modules/lodash/_getAllKeys.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_getAllKeys.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../../../../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../../../node_modules/lodash/_getSymbols.js"),
    keys = __webpack_require__(/*! ./keys */ "../../../../node_modules/lodash/keys.js");

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

module.exports = getAllKeys;


/***/ },

/***/ "../../../../node_modules/lodash/_getAllKeysIn.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_getAllKeysIn.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ "../../../../node_modules/lodash/_baseGetAllKeys.js"),
    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ "../../../../node_modules/lodash/_getSymbolsIn.js"),
    keysIn = __webpack_require__(/*! ./keysIn */ "../../../../node_modules/lodash/keysIn.js");

/**
 * Creates an array of own and inherited enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn);
}

module.exports = getAllKeysIn;


/***/ },

/***/ "../../../../node_modules/lodash/_getMapData.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_getMapData.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(/*! ./_isKeyable */ "../../../../node_modules/lodash/_isKeyable.js");

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;


/***/ },

/***/ "../../../../node_modules/lodash/_getNative.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_getNative.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(/*! ./_baseIsNative */ "../../../../node_modules/lodash/_baseIsNative.js"),
    getValue = __webpack_require__(/*! ./_getValue */ "../../../../node_modules/lodash/_getValue.js");

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ },

/***/ "../../../../node_modules/lodash/_getPrototype.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_getPrototype.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../../../../node_modules/lodash/_overArg.js");

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;


/***/ },

/***/ "../../../../node_modules/lodash/_getRawTag.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_getRawTag.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(/*! ./_Symbol */ "../../../../node_modules/lodash/_Symbol.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ },

/***/ "../../../../node_modules/lodash/_getSymbols.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_getSymbols.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayFilter = __webpack_require__(/*! ./_arrayFilter */ "../../../../node_modules/lodash/_arrayFilter.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../../../../node_modules/lodash/stubArray.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

module.exports = getSymbols;


/***/ },

/***/ "../../../../node_modules/lodash/_getSymbolsIn.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_getSymbolsIn.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayPush = __webpack_require__(/*! ./_arrayPush */ "../../../../node_modules/lodash/_arrayPush.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../../../../node_modules/lodash/_getPrototype.js"),
    getSymbols = __webpack_require__(/*! ./_getSymbols */ "../../../../node_modules/lodash/_getSymbols.js"),
    stubArray = __webpack_require__(/*! ./stubArray */ "../../../../node_modules/lodash/stubArray.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own and inherited enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols(object));
    object = getPrototype(object);
  }
  return result;
};

module.exports = getSymbolsIn;


/***/ },

/***/ "../../../../node_modules/lodash/_getTag.js"
/*!**************************************************!*\
  !*** ../../../../node_modules/lodash/_getTag.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var DataView = __webpack_require__(/*! ./_DataView */ "../../../../node_modules/lodash/_DataView.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../../../node_modules/lodash/_Map.js"),
    Promise = __webpack_require__(/*! ./_Promise */ "../../../../node_modules/lodash/_Promise.js"),
    Set = __webpack_require__(/*! ./_Set */ "../../../../node_modules/lodash/_Set.js"),
    WeakMap = __webpack_require__(/*! ./_WeakMap */ "../../../../node_modules/lodash/_WeakMap.js"),
    baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../node_modules/lodash/_baseGetTag.js"),
    toSource = __webpack_require__(/*! ./_toSource */ "../../../../node_modules/lodash/_toSource.js");

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;


/***/ },

/***/ "../../../../node_modules/lodash/_getValue.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_getValue.js ***!
  \****************************************************/
(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ },

/***/ "../../../../node_modules/lodash/_hashClear.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_hashClear.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../../../node_modules/lodash/_nativeCreate.js");

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;


/***/ },

/***/ "../../../../node_modules/lodash/_hashDelete.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_hashDelete.js ***!
  \******************************************************/
(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;


/***/ },

/***/ "../../../../node_modules/lodash/_hashGet.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_hashGet.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../../../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;


/***/ },

/***/ "../../../../node_modules/lodash/_hashHas.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_hashHas.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../../../node_modules/lodash/_nativeCreate.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

module.exports = hashHas;


/***/ },

/***/ "../../../../node_modules/lodash/_hashSet.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_hashSet.js ***!
  \***************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(/*! ./_nativeCreate */ "../../../../node_modules/lodash/_nativeCreate.js");

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;


/***/ },

/***/ "../../../../node_modules/lodash/_initCloneArray.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_initCloneArray.js ***!
  \**********************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;


/***/ },

/***/ "../../../../node_modules/lodash/_initCloneByTag.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_initCloneByTag.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ "../../../../node_modules/lodash/_cloneArrayBuffer.js"),
    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ "../../../../node_modules/lodash/_cloneDataView.js"),
    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ "../../../../node_modules/lodash/_cloneRegExp.js"),
    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ "../../../../node_modules/lodash/_cloneSymbol.js"),
    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ "../../../../node_modules/lodash/_cloneTypedArray.js");

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return new Ctor;

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return new Ctor;

    case symbolTag:
      return cloneSymbol(object);
  }
}

module.exports = initCloneByTag;


/***/ },

/***/ "../../../../node_modules/lodash/_initCloneObject.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_initCloneObject.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(/*! ./_baseCreate */ "../../../../node_modules/lodash/_baseCreate.js"),
    getPrototype = __webpack_require__(/*! ./_getPrototype */ "../../../../node_modules/lodash/_getPrototype.js"),
    isPrototype = __webpack_require__(/*! ./_isPrototype */ "../../../../node_modules/lodash/_isPrototype.js");

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;


/***/ },

/***/ "../../../../node_modules/lodash/_isIndex.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_isIndex.js ***!
  \***************************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ },

/***/ "../../../../node_modules/lodash/_isKeyable.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/_isKeyable.js ***!
  \*****************************************************/
(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;


/***/ },

/***/ "../../../../node_modules/lodash/_isMasked.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_isMasked.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(/*! ./_coreJsData */ "../../../../node_modules/lodash/_coreJsData.js");

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ },

/***/ "../../../../node_modules/lodash/_isPrototype.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_isPrototype.js ***!
  \*******************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ },

/***/ "../../../../node_modules/lodash/_listCacheClear.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_listCacheClear.js ***!
  \**********************************************************/
(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;


/***/ },

/***/ "../../../../node_modules/lodash/_listCacheDelete.js"
/*!***********************************************************!*\
  !*** ../../../../node_modules/lodash/_listCacheDelete.js ***!
  \***********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../../../node_modules/lodash/_assocIndexOf.js");

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;


/***/ },

/***/ "../../../../node_modules/lodash/_listCacheGet.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_listCacheGet.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../../../node_modules/lodash/_assocIndexOf.js");

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;


/***/ },

/***/ "../../../../node_modules/lodash/_listCacheHas.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_listCacheHas.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../../../node_modules/lodash/_assocIndexOf.js");

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;


/***/ },

/***/ "../../../../node_modules/lodash/_listCacheSet.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_listCacheSet.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(/*! ./_assocIndexOf */ "../../../../node_modules/lodash/_assocIndexOf.js");

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;


/***/ },

/***/ "../../../../node_modules/lodash/_mapCacheClear.js"
/*!*********************************************************!*\
  !*** ../../../../node_modules/lodash/_mapCacheClear.js ***!
  \*********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(/*! ./_Hash */ "../../../../node_modules/lodash/_Hash.js"),
    ListCache = __webpack_require__(/*! ./_ListCache */ "../../../../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../../../node_modules/lodash/_Map.js");

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;


/***/ },

/***/ "../../../../node_modules/lodash/_mapCacheDelete.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_mapCacheDelete.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../../../node_modules/lodash/_getMapData.js");

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;


/***/ },

/***/ "../../../../node_modules/lodash/_mapCacheGet.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_mapCacheGet.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../../../node_modules/lodash/_getMapData.js");

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;


/***/ },

/***/ "../../../../node_modules/lodash/_mapCacheHas.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_mapCacheHas.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../../../node_modules/lodash/_getMapData.js");

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;


/***/ },

/***/ "../../../../node_modules/lodash/_mapCacheSet.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_mapCacheSet.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(/*! ./_getMapData */ "../../../../node_modules/lodash/_getMapData.js");

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;


/***/ },

/***/ "../../../../node_modules/lodash/_mapToArray.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_mapToArray.js ***!
  \******************************************************/
(module) {

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;


/***/ },

/***/ "../../../../node_modules/lodash/_nativeCreate.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_nativeCreate.js ***!
  \********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(/*! ./_getNative */ "../../../../node_modules/lodash/_getNative.js");

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;


/***/ },

/***/ "../../../../node_modules/lodash/_nativeKeys.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_nativeKeys.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(/*! ./_overArg */ "../../../../node_modules/lodash/_overArg.js");

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;


/***/ },

/***/ "../../../../node_modules/lodash/_nativeKeysIn.js"
/*!********************************************************!*\
  !*** ../../../../node_modules/lodash/_nativeKeysIn.js ***!
  \********************************************************/
(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ },

/***/ "../../../../node_modules/lodash/_nodeUtil.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_nodeUtil.js ***!
  \****************************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;


/***/ },

/***/ "../../../../node_modules/lodash/_objectToString.js"
/*!**********************************************************!*\
  !*** ../../../../node_modules/lodash/_objectToString.js ***!
  \**********************************************************/
(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ },

/***/ "../../../../node_modules/lodash/_overArg.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/_overArg.js ***!
  \***************************************************/
(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;


/***/ },

/***/ "../../../../node_modules/lodash/_root.js"
/*!************************************************!*\
  !*** ../../../../node_modules/lodash/_root.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(/*! ./_freeGlobal */ "../../../../node_modules/lodash/_freeGlobal.js");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ },

/***/ "../../../../node_modules/lodash/_setCacheAdd.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_setCacheAdd.js ***!
  \*******************************************************/
(module) {

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;


/***/ },

/***/ "../../../../node_modules/lodash/_setCacheHas.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_setCacheHas.js ***!
  \*******************************************************/
(module) {

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {boolean} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;


/***/ },

/***/ "../../../../node_modules/lodash/_setToArray.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_setToArray.js ***!
  \******************************************************/
(module) {

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;


/***/ },

/***/ "../../../../node_modules/lodash/_stackClear.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/_stackClear.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../../../node_modules/lodash/_ListCache.js");

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;


/***/ },

/***/ "../../../../node_modules/lodash/_stackDelete.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/_stackDelete.js ***!
  \*******************************************************/
(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;


/***/ },

/***/ "../../../../node_modules/lodash/_stackGet.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_stackGet.js ***!
  \****************************************************/
(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;


/***/ },

/***/ "../../../../node_modules/lodash/_stackHas.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_stackHas.js ***!
  \****************************************************/
(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;


/***/ },

/***/ "../../../../node_modules/lodash/_stackSet.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_stackSet.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(/*! ./_ListCache */ "../../../../node_modules/lodash/_ListCache.js"),
    Map = __webpack_require__(/*! ./_Map */ "../../../../node_modules/lodash/_Map.js"),
    MapCache = __webpack_require__(/*! ./_MapCache */ "../../../../node_modules/lodash/_MapCache.js");

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;


/***/ },

/***/ "../../../../node_modules/lodash/_toSource.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/_toSource.js ***!
  \****************************************************/
(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ },

/***/ "../../../../node_modules/lodash/cloneDeep.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/cloneDeep.js ***!
  \****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseClone = __webpack_require__(/*! ./_baseClone */ "../../../../node_modules/lodash/_baseClone.js");

/** Used to compose bitmasks for cloning. */
var CLONE_DEEP_FLAG = 1,
    CLONE_SYMBOLS_FLAG = 4;

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}

module.exports = cloneDeep;


/***/ },

/***/ "../../../../node_modules/lodash/eq.js"
/*!*********************************************!*\
  !*** ../../../../node_modules/lodash/eq.js ***!
  \*********************************************/
(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ },

/***/ "../../../../node_modules/lodash/isArguments.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/isArguments.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(/*! ./_baseIsArguments */ "../../../../node_modules/lodash/_baseIsArguments.js"),
    isObjectLike = __webpack_require__(/*! ./isObjectLike */ "../../../../node_modules/lodash/isObjectLike.js");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ },

/***/ "../../../../node_modules/lodash/isArray.js"
/*!**************************************************!*\
  !*** ../../../../node_modules/lodash/isArray.js ***!
  \**************************************************/
(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ },

/***/ "../../../../node_modules/lodash/isArrayLike.js"
/*!******************************************************!*\
  !*** ../../../../node_modules/lodash/isArrayLike.js ***!
  \******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(/*! ./isFunction */ "../../../../node_modules/lodash/isFunction.js"),
    isLength = __webpack_require__(/*! ./isLength */ "../../../../node_modules/lodash/isLength.js");

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ },

/***/ "../../../../node_modules/lodash/isBuffer.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/isBuffer.js ***!
  \***************************************************/
(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(/*! ./_root */ "../../../../node_modules/lodash/_root.js"),
    stubFalse = __webpack_require__(/*! ./stubFalse */ "../../../../node_modules/lodash/stubFalse.js");

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;


/***/ },

/***/ "../../../../node_modules/lodash/isEqual.js"
/*!**************************************************!*\
  !*** ../../../../node_modules/lodash/isEqual.js ***!
  \**************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsEqual = __webpack_require__(/*! ./_baseIsEqual */ "../../../../node_modules/lodash/_baseIsEqual.js");

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;


/***/ },

/***/ "../../../../node_modules/lodash/isFunction.js"
/*!*****************************************************!*\
  !*** ../../../../node_modules/lodash/isFunction.js ***!
  \*****************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(/*! ./_baseGetTag */ "../../../../node_modules/lodash/_baseGetTag.js"),
    isObject = __webpack_require__(/*! ./isObject */ "../../../../node_modules/lodash/isObject.js");

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ },

/***/ "../../../../node_modules/lodash/isLength.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/isLength.js ***!
  \***************************************************/
(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ },

/***/ "../../../../node_modules/lodash/isMap.js"
/*!************************************************!*\
  !*** ../../../../node_modules/lodash/isMap.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ "../../../../node_modules/lodash/_baseIsMap.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsMap = nodeUtil && nodeUtil.isMap;

/**
 * Checks if `value` is classified as a `Map` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
 * @example
 *
 * _.isMap(new Map);
 * // => true
 *
 * _.isMap(new WeakMap);
 * // => false
 */
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

module.exports = isMap;


/***/ },

/***/ "../../../../node_modules/lodash/isObject.js"
/*!***************************************************!*\
  !*** ../../../../node_modules/lodash/isObject.js ***!
  \***************************************************/
(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ },

/***/ "../../../../node_modules/lodash/isObjectLike.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/isObjectLike.js ***!
  \*******************************************************/
(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ },

/***/ "../../../../node_modules/lodash/isSet.js"
/*!************************************************!*\
  !*** ../../../../node_modules/lodash/isSet.js ***!
  \************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ "../../../../node_modules/lodash/_baseIsSet.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsSet = nodeUtil && nodeUtil.isSet;

/**
 * Checks if `value` is classified as a `Set` object.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
 * @example
 *
 * _.isSet(new Set);
 * // => true
 *
 * _.isSet(new WeakSet);
 * // => false
 */
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

module.exports = isSet;


/***/ },

/***/ "../../../../node_modules/lodash/isTypedArray.js"
/*!*******************************************************!*\
  !*** ../../../../node_modules/lodash/isTypedArray.js ***!
  \*******************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(/*! ./_baseIsTypedArray */ "../../../../node_modules/lodash/_baseIsTypedArray.js"),
    baseUnary = __webpack_require__(/*! ./_baseUnary */ "../../../../node_modules/lodash/_baseUnary.js"),
    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ "../../../../node_modules/lodash/_nodeUtil.js");

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ },

/***/ "../../../../node_modules/lodash/keys.js"
/*!***********************************************!*\
  !*** ../../../../node_modules/lodash/keys.js ***!
  \***********************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeys = __webpack_require__(/*! ./_baseKeys */ "../../../../node_modules/lodash/_baseKeys.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;


/***/ },

/***/ "../../../../node_modules/lodash/keysIn.js"
/*!*************************************************!*\
  !*** ../../../../node_modules/lodash/keysIn.js ***!
  \*************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(/*! ./_arrayLikeKeys */ "../../../../node_modules/lodash/_arrayLikeKeys.js"),
    baseKeysIn = __webpack_require__(/*! ./_baseKeysIn */ "../../../../node_modules/lodash/_baseKeysIn.js"),
    isArrayLike = __webpack_require__(/*! ./isArrayLike */ "../../../../node_modules/lodash/isArrayLike.js");

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ },

/***/ "../../../../node_modules/lodash/stubArray.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/stubArray.js ***!
  \****************************************************/
(module) {

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

module.exports = stubArray;


/***/ },

/***/ "../../../../node_modules/lodash/stubFalse.js"
/*!****************************************************!*\
  !*** ../../../../node_modules/lodash/stubFalse.js ***!
  \****************************************************/
(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	if (!(moduleId in __webpack_modules__)) {
/******/ 		delete __webpack_module_cache__[moduleId];
/******/ 		var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 		e.code = 'MODULE_NOT_FOUND';
/******/ 		throw e;
/******/ 	}
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/global */
/******/ (() => {
/******/ 	__webpack_require__.g = (function() {
/******/ 		if (typeof globalThis === 'object') return globalThis;
/******/ 		try {
/******/ 			return this || new Function('return this')();
/******/ 		} catch (e) {
/******/ 			if (typeof window === 'object') return window;
/******/ 		}
/******/ 	})();
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/node module decorator */
/******/ (() => {
/******/ 	__webpack_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openfin_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/core */ "../../../../node_modules/@openfin/core/out/stub.js");

let channelClient;
const CONNECTION_STATUS_POLL_MS = 30_000;
/**
 * Connects to a channel with a timeout.
 * @param channelName - The name of the channel to connect to.
 * @param timeoutMs - The timeout in milliseconds.
 * @returns A promise that resolves with the channel client or rejects on timeout/error.
 */
async function connectToChannelWithTimeout(channelName, timeoutMs) {
    return new Promise((resolve, reject) => {
        const timeoutId = window.setTimeout(() => {
            reject(new Error("Client cannot connect to the channel."));
        }, timeoutMs);
        _openfin_core__WEBPACK_IMPORTED_MODULE_0__.fin.InterApplicationBus.Channel.connect(channelName)
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
    const desButton = document.getElementById("desButton");
    const bioButton = document.getElementById("bioButton");
    const gipButton = document.getElementById("gipButton");
    const sendButton = document.getElementById("sendButton");
    const mnemonicInput = document.getElementById("mnemonicInput");
    const valueInput = document.getElementById("valueInput");
    const panelInput = document.getElementById("panelInput");
    try {
        console.log("Connecting to channel");
        channelClient = await connectToChannelWithTimeout(`${_openfin_core__WEBPACK_IMPORTED_MODULE_0__.fin.me.identity.uuid}/bbg-tcapi`, 15000);
        console.log(`Successfully connected to the channel ${_openfin_core__WEBPACK_IMPORTED_MODULE_0__.fin.me.identity.uuid}/bbg-tcapi`);
        startConnectionStatusPolling();
    }
    catch (error) {
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
function startConnectionStatusPolling() {
    window.setInterval(async () => {
        if (!channelClient) {
            return;
        }
        try {
            const status = await channelClient.dispatch("bbg-health", {});
            console.log("Bloomberg connection status", status);
        }
        catch (error) {
            console.error("Failed to retrieve Bloomberg connection status", error);
        }
    }, CONNECTION_STATUS_POLL_MS);
}

})();


//# sourceMappingURL=main.js.map