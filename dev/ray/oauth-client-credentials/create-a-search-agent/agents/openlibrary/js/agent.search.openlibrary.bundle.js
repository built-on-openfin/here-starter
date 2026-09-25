/******/ var __webpack_modules__ = ({

/***/ "./client/src/search.ts"
/*!******************************!*\
  !*** ./client/src/search.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   init: () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/cloud-api */ "./node_modules/@openfin/cloud-api/dist/index.js");

let agentLogger;
/**
 * Returns a search agent implementation for OpenLibrary.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
async function init(logger) {
    agentLogger = logger;
    const config = await _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__.Agent.getConfiguration();
    agentLogger?.info("Agent configuration (init)", config);
    return {
        search: {
            onAction,
            onSearch
        }
    };
}
/**
 * Handles actions for the OpenLibrary search agent. This is triggered when someone makes a selection within the Enterprise Browser search results.
 * @param action The selection the user made.
 * @param result The result that was selected.
 * @returns The url to launch.
 */
// eslint-disable-next-line func-style
async function onAction(action, result) {
    agentLogger?.info("onActionListener", { action, result });
    const { data, key, title } = result;
    const { authorId } = data;
    const { name: actionName } = action;
    agentLogger?.info(`onAction: ${actionName} ${title} ${key}`);
    switch (actionName) {
        case "view-author":
            return { url: `https://openlibrary.org/authors/${authorId}` };
        case "view-book":
            return { url: `https://openlibrary.org/books/${key}` };
        default:
            agentLogger?.info(`Unknown action: ${actionName}`);
    }
}
/**
 * A query handler for the OpenLibrary search agent.
 * @param request The query from enterprise browser
 * @returns The results to display in the search results.
 */
async function onSearch(request) {
    agentLogger?.info("onSearchListener", { request });
    const { context, query, signal } = request;
    const { pageNumber, pageSize, filters } = context;
    try {
        let results = [];
        // Build the query with filters
        let searchQuery = query;
        if (filters.includes("public-ebook")) {
            searchQuery += " +ebook_access:public";
        }
        if (filters.includes("21st-century")) {
            searchQuery += " +first_publish_year:[2000 TO *]";
        }
        const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(searchQuery)}&page=${pageNumber}&limit=${pageSize}`;
        const response = await fetch(url, { signal });
        if (!response.ok) {
            throw new Error(`Request failed: ${response.status}`);
        }
        const { docs } = (await response.json());
        results = docs.map((result) => {
            const { author_key: authorId, author_name: author, cover_edition_key: key, publisher, title } = result;
            return {
                actions: [
                    {
                        name: "view-book",
                        description: `Go to ${title} in OpenLibrary`
                    },
                    {
                        icon: {
                            dark: "data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.31 4.395C3.03 5.81 4.19 6.965 5.605 7.69L6.705 6.59C6.84 6.455 7.04 6.41 7.215 6.47C7.775 6.655 8.38 6.755 9 6.755C9.275 6.755 9.5 6.98 9.5 7.255V9C9.5 9.275 9.275 9.5 9 9.5C4.305 9.5 0.5 5.695 0.5 1C0.5 0.725 0.725 0.5 1 0.5H2.75C3.025 0.5 3.25 0.725 3.25 1C3.25 1.625 3.35 2.225 3.535 2.785C3.59 2.96 3.55 3.155 3.41 3.295L2.31 4.395Z' fill='%23FFFFFF'/%3E%3C/svg%3E%0A",
                            light: "data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.31 4.395C3.03 5.81 4.19 6.965 5.605 7.69L6.705 6.59C6.84 6.455 7.04 6.41 7.215 6.47C7.775 6.655 8.38 6.755 9 6.755C9.275 6.755 9.5 6.98 9.5 7.255V9C9.5 9.275 9.275 9.5 9 9.5C4.305 9.5 0.5 5.695 0.5 1C0.5 0.725 0.725 0.5 1 0.5H2.75C3.025 0.5 3.25 0.725 3.25 1C3.25 1.625 3.35 2.225 3.535 2.785C3.59 2.96 3.55 3.155 3.41 3.295L2.31 4.395Z' fill='%23140611'/%3E%3C/svg%3E%0A"
                        },
                        name: "view-author",
                        title: "View author",
                        description: `Go to profile of ${author.join(", ")} in OpenLibrary`
                    }
                ],
                data: { authorId: authorId?.[0] },
                icon: "https://openlibrary.org/static/images/openlibrary-128x128.png",
                key,
                label: `${author.join(", ")}${publisher ? ` - ${publisher}` : ""}`,
                title
            };
        });
        agentLogger?.info("returning", results);
        return { results };
    }
    catch (err) {
        if (err.name !== "AbortError") {
            agentLogger?.error(`Error querying OpenLibrary\n${err.message}`);
        }
    }
    return { results: [] };
}


/***/ },

/***/ "./node_modules/@openfin/cloud-api/dist/index.js"
/*!*******************************************************!*\
  !*** ./node_modules/@openfin/cloud-api/dist/index.js ***!
  \*******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Agent: () => (/* binding */ le),
/* harmony export */   Search: () => (/* binding */ ne),
/* harmony export */   getAppSettings: () => (/* binding */ Ht),
/* harmony export */   getAppUserPermissions: () => (/* binding */ Xt),
/* harmony export */   getAppUserSettings: () => (/* binding */ Kt),
/* harmony export */   getNotificationsClient: () => (/* binding */ qt),
/* harmony export */   launchContent: () => (/* binding */ Jt),
/* harmony export */   launchSupertab: () => (/* binding */ Qt),
/* harmony export */   launchWorkspace: () => (/* binding */ Yt),
/* harmony export */   setAppUserSettings: () => (/* binding */ zt)
/* harmony export */ });
var tt=Object.create;var En=Object.defineProperty;var ot=Object.getOwnPropertyDescriptor;var rt=Object.getOwnPropertyNames;var it=Object.getPrototypeOf,st=Object.prototype.hasOwnProperty;var at=(t,i)=>()=>(i||t((i={exports:{}}).exports,i),i.exports),Kn=(t,i)=>{for(var r in i)En(t,r,{get:i[r],enumerable:!0})},ct=(t,i,r,a)=>{if(i&&typeof i=="object"||typeof i=="function")for(let d of rt(i))!st.call(t,d)&&d!==r&&En(t,d,{get:()=>i[d],enumerable:!(a=ot(i,d))||a.enumerable});return t};var vn=(t,i,r)=>(r=t!=null?tt(it(t)):{},ct(i||!t||!t.__esModule?En(r,"default",{value:t,enumerable:!0}):r,t));var on=at((no,Xn)=>{"use strict";(()=>{"use strict";var t={d:(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},o:(n,e)=>Object.prototype.hasOwnProperty.call(n,e),r:n=>{typeof Symbol<"u"&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})}},i={};t.r(i),t.d(i,{SearchTagBackground:()=>cn,create:()=>Vn,defaultTopic:()=>jn,subscribe:()=>qn});var r={};t.r(r),t.d(r,{B:()=>Oe});var a={};t.r(a),t.d(a,{v:()=>Ye});let d="deregistered or does not exist",h=new Error(`provider ${d}`),m=new Error("provider with name already exists"),w=new Error("bad payload"),C=new Error("subscription rejected"),S=new Error(`channel ${d}`),P;function b(){if(P)return P;throw S}function H(){return P}function In(n){P=n}var O,x,an,cn;(function(n){n[n.Initial=0]="Initial",n[n.Open=1]="Open",n[n.Close=2]="Close"})(O||(O={})),(function(n){n.Fetching="fetching",n.Fetched="fetched",n.Complete="complete"})(x||(x={})),(function(n){n.UserAction="user-action",n.FocusChange="focus-change",n.Reload="reload"})(an||(an={})),(function(n){n.Active="active",n.Default="default"})(cn||(cn={}));let K="0",Pn="1",bn="2",Nn="3",Ln="4",z="5",X="6",ue=()=>{},ln=new Set;function de(n){ln.add(n)}function pe(n){ln.delete(n)}let un=new Set;function fe(n){un.add(n)}function he(n){un.delete(n)}let j=new Map;async function dn(n){j.set(n.id,n);let e=[...ln].map((o=>o()));await Promise.all(e)}async function J(n){j.delete(n);let e=[...un].map((o=>o()));await Promise.all(e)}function pn(){return[...j.values()]}function Fn(){j.clear()}function L(n){return j.get(n)}function _n(n,e,o){return{...n,action:o||{...n.actions[0],trigger:an.UserAction},dispatcherIdentity:e}}function fn(n,e,o="ascending"){let s=n||[];if(!e?.length)return s;let c=[],l=new Map;e.forEach((p=>{if(p.key)return l.set(p.key,p);c.push(p)}));let u=s.map((p=>{let{key:g}=p;if(g&&l.has(g)){let v=l.get(g);return l.delete(g),v}return p}));return u.push(...l.values(),...c),u=o==="ascending"?u.sort(((p,g)=>(p?.score??1/0)-(g?.score??1/0))):u.sort(((p,g)=>(g?.score??1/0)-(p?.score??1/0))),u}function Tn(n){let e={},o=[],s=[],c=null,l=O.Initial;e.getStatus=()=>l,e.getResultBuffer=()=>o,e.setResultBuffer=p=>{o=p,o?.length&&e.onChange()},e.getRevokedBuffer=()=>s,e.setRevokedBuffer=p=>{s=p,s?.length&&e.onChange()},e.setUpdatedContext=p=>{c=p,e.onChange()},e.getUpdatedContext=()=>c,e.onChange=ue;let u={};return e.res=u,u.close=()=>{l!==O.Close&&(l=O.Close,e.onChange())},u.open=()=>{l!==O.Open&&(l=O.Open,e.onChange())},u.respond=p=>{let g=fn(e.getResultBuffer(),p,n);e.setResultBuffer(g)},u.revoke=(...p)=>{let g=new Set(p),v=e.getResultBuffer().filter((({key:f})=>{let R=g.has(f);return R&&g.delete(f),!R}));e.setResultBuffer(v),g.size&&(e.getRevokedBuffer().forEach((f=>g.add(f))),e.setRevokedBuffer([...g]))},u.updateContext=p=>{e.setUpdatedContext(p)},e}function xn(n,e){let o=new Set,s=!1;return{close:()=>{s=!0;for(let c of o)c()},req:{id:n,...e,context:e?.context||{},onClose:c=>{o.add(c),s&&c()},removeListener:c=>{o.delete(c)}}}}function Q(){return{name:fin.me.name,uuid:fin.me.uuid}}let kn=50,ge=1e3,we=new Map;function hn(){return we}let ye=100;function me(){return async n=>{if(!n||!n.id||!n.providerId){let f=w;return console.error(f),{error:f.message}}let{id:e,providerId:o}=n,s=L(o);if(!s){let f=h;return console.error(f),{error:f.message}}let c=hn(),l=c.get(n.id);l||(l=xn(e,n),c.set(n.id,l));let u=Tn(),p=()=>{let f=u.getResultBuffer();u.setResultBuffer([]);let R=u.getRevokedBuffer();u.setRevokedBuffer([]);let F=u.getUpdatedContext();u.setUpdatedContext(null);let $=u.getStatus();(async function(M){(await b()).dispatch(K,M)})({id:e,providerId:o,results:f,revoked:R,status:$,context:F})},g=!0,v=!1;u.onChange=()=>{if(g)return g=!1,void p();v||(v=!0,setTimeout((()=>{v=!1,p()}),ye))};try{let{results:f,context:R}=await s.onUserInput(l.req,u.res),F=u.getStatus();return{id:e,providerId:o,status:F,results:f,context:R}}catch(f){return console.error(`OpenFin/Workspace/Home. Uncaught exception in search provider ${o} for search ${e}`,"This is likely a bug in the implementation of the search provider.",f),{id:e,providerId:o,error:f?.message}}}}async function $n(n,e){let o=e||await b(),s=Q(),c={...n,identity:s,onResultDispatch:void 0},l=await o.dispatch(bn,c);return await dn({identity:s,...n}),l}async function Ce(n){return await(await b()).dispatch(Nn,n),J(n)}async function Se(n,e,o,s){let c=_n(e,s??Q(),o),l=L(n);if(l){let{onResultDispatch:p}=l;return p?p(c):void 0}let u={providerId:n,result:c};return(await b()).dispatch(z,u)}async function Re(n){let e={...n,context:n?.context||{}},o={},s=(async function*(l,{setState:u}){let p=await b();for(;;){let g=await p.dispatch(Pn,l),v=g.error;if(v)throw new Error(v);let f=g;if(l.id=f.id,u(f.state),f.done)return f.value;yield f.value}})(e,{setState:l=>{o.state=l}}),c=await s.next();return o.id=e.id||"",o.close=()=>{(async function(l){(await b()).dispatch(X,{id:l})})(o.id)},o.next=()=>{if(c){let l=c;return c=void 0,l}return s.next()},o}async function Ee(){return(await b()).dispatch(Ln,null)}async function ve(){let n=await b();P=void 0,Fn(),await n.disconnect()}let Ae=async n=>{let e=await Un(n);for(let o of pn())await $n(o,e);return e};async function Un(n){let e=await(async function(o){for(let s=0;s<kn;s++)try{return await fin.InterApplicationBus.Channel.connect(o,{wait:!1})}catch(c){if(s===kn-1)throw c;await new Promise((l=>setTimeout(l,ge)))}})(n);return e.register(K,me()),e.register(X,(o=>{let s=hn(),c=s.get(o.id);c&&(c.close(),s.delete(o.id))})),e.register(z,(async(o,s)=>{if(!o||!o.providerId||!o.result)return void console.error(w);let c=L(o.providerId);if(!c)return void console.error(h);let{onResultDispatch:l}=c;return l?(o.result.dispatcherIdentity=o.result.dispatcherIdentity??s,l(o.result)):void 0})),e.onDisconnection((function(o){return async()=>{if(!H())return;let s=hn();for(let{req:c,close:l}of s.values())l(),s.delete(c.id);In(Ae(o))}})(n)),e}async function Oe(n){let e=H();e||(e=Un(n),In(e));let o=await e;return{getAllProviders:Ee.bind(null),register:$n.bind(null),search:Re.bind(null),deregister:Ce.bind(null),dispatch:Se.bind(null),disconnect:ve.bind(null),channel:o}}let G;function Y(){if(G)return G;throw S}function Ie(){return G}function Pe(n){G=n}function be(){G=void 0}let gn=new Set;function Ne(n){gn.add(n)}function Le(n){gn.delete(n)}var k;(function(n){n.Local="local",n.Dev="dev",n.Staging="staging",n.Prod="prod"})(k||(k={}));let wn=typeof window<"u"&&typeof fin<"u",Fe=(typeof process>"u"||process.env,typeof window<"u"),_e=Fe?window.origin:k.Local,Z=(wn&&fin.me.uuid,wn&&fin.me.name,wn&&fin.me.entityType,k.Local,k.Dev,k.Staging,k.Prod,n=>n.startsWith("http://")||n.startsWith("https://")?n:_e+n),Dn=(Z("http://localhost:4002"),Z("http://localhost:4002"),typeof WORKSPACE_DOCS_PLATFORM_URL<"u"&&Z(WORKSPACE_DOCS_PLATFORM_URL),typeof WORKSPACE_DOCS_CLIENT_URL<"u"&&Z(WORKSPACE_DOCS_CLIENT_URL),"20.3.6");typeof WORKSPACE_BUILD_SHA<"u"&&WORKSPACE_BUILD_SHA;async function Mn(){return[...pn()].map((n=>({...n,onUserInput:void 0,onResultDispatch:void 0})))}async function Te(n){if(L(n.id))throw new Error("provider with name already exists");let e=Q();return await dn({identity:e,...n}),{workspaceVersion:Dn||"",clientAPIVersion:n.clientAPIVersion||""}}async function xe(n){await J(n)}async function ke(n,e,o,s){let c=L(n);if(!c)throw h;let{onResultDispatch:l}=c;if(l)return l(_n(e,s??Q(),o))}async function*$e(n,e){let o=(function(R,F){let $=[],M=[],B=[],I=[];for(let E of R){let _=Tn(E.scoreOrder),T={results:[],provider:{id:E.id,identity:E.identity,title:E.title,scoreOrder:E.scoreOrder,icon:E.icon,dispatchFocusEvents:E.dispatchFocusEvents}};$.push(T),M.push(_);let W=(async()=>{try{let{results:V,context:en}=await E.onUserInput(F,_.res);T.results=fn(T.results||[],V,E.scoreOrder),T.context={...T.context,...en}}catch(V){T.error=V}})();W.finally((()=>{W.done=!0})),I.push(W),B.push(B.length)}return{providerResponses:$,listenerResponses:M,openListenerResponses:B,initialResponsePromises:I}})(n.targets?n.targets.map((R=>L(R))).filter((R=>!!R)):[...pn().filter((R=>!R.hidden))],n),{providerResponses:s,listenerResponses:c}=o,{openListenerResponses:l,initialResponsePromises:u}=o,p=x.Fetching,g=R=>{p=R,e.setState(p)},v,f=!1;n.onClose((()=>{f=!0,v&&v()}));do{let R=!1;if(u.length){let I=[];for(let E of u)E.done?R=!0:I.push(E);u=I,u.length||(g(x.Fetched),R=!0)}let F,$=!1,M=()=>{$=!0,F&&F()},B=[];for(let I of l){let E=c[I],_=s[I],T=E.getStatus();(T===O.Open||p===x.Fetching&&T===O.Initial)&&(B.push(I),E.onChange=M);let W=E.getResultBuffer();W.length&&(E.setResultBuffer([]),_.results=fn(_.results||[],W),R=!0);let V=E.getRevokedBuffer();if(V.length){E.setRevokedBuffer([]);let nt=new Set(V);_.results=(_.results||[]).filter((({key:et})=>!nt.has(et))),R=!0}let en=E.getUpdatedContext();en&&(E.setUpdatedContext(null),_.context={..._.context,...en},R=!0)}if(l=B,R&&(yield s),f)break;$||(l.length||u.length)&&await Promise.race([...u,new Promise((I=>{F=I})),new Promise((I=>{v=I}))])}while(l.length||u.length);return g(x.Complete),s}let yn=0;async function Bn(n){yn+=1;let e=xn(yn.toString(),n),o=$e(e.req,{setState:s=>{o.state=s}});return o.id=yn.toString(),o.close=e.close,o.state=x.Fetching,o}let nn=new Map,Ue=1e4;function De(){return async n=>{if(!n)return console.error(w),{error:w.message};let e;if(n.id)e=n.id;else{let c=await Bn(n);e=c.id,n.id=c.id,nn.set(e,{generator:c})}let o=nn.get(e);clearTimeout(o.timeout);let s=await o.generator.next();return o.timeout=(function(c){return window.setTimeout((()=>{nn.delete(c)}),Ue)})(e),{...s,id:n.id,state:o.generator.state}}}function Me(n,e){return Y().dispatch(n,X,{id:e})}function Be(){return n=>(function(e){let o=nn.get(e);o&&o.generator.close()})(n.id)}async function We(n,{id:e,query:o,context:s,targets:c=[]}){let l=Y(),u={id:e,query:o,context:s,targets:c,providerId:n.id},p=await l.dispatch(n.identity,K,u),g=p.error;if(g)throw new Error(g);return p}let mn=new Map;function Ve(n,e){return`${n.name}:${n.uuid}:${e}`}let Cn=new Map;function Wn(n,e){return`${n}:${e}`}function qe(n){let e=Ve.bind(null,n.identity),o=Me.bind(null,n.identity),s=We.bind(null,n);return async(c,l)=>{let u=e(c.id);if(!mn.has(u)){let f=()=>{o(c.id),mn.delete(u)};mn.set(u,f),c.onClose(f)}let p=Wn(n.id,c.id),g=()=>{Cn.delete(p),l.close()};c.onClose(g),Cn.set(p,(f=>{f.results?.length&&l.respond(f.results),f.revoked?.length&&l.revoke(...f.revoked),f.context&&l.updateContext(f.context),f.status===O.Open&&l.open(),f.status===O.Close&&g()}));let v=await s(c);return v.status===O.Open&&l.open(),v.status!==O.Close&&v.status!==O.Initial||g(),v}}function je(n){return async e=>{let o=Y(),s={providerId:n.id,result:e};return o.dispatch(n.identity,z,s)}}let D=new Map;function Sn(n){return`${n.name}-${n.uuid}`}function Ge(){return async(n,e)=>{if(!n||!n.id)return console.error(new Error(JSON.stringify(n))),void console.error(w);if(L(n.id))throw m;return n.identity=e,await(async function(o){let s=Sn(o.identity);D.has(s)||D.set(s,[]),D.get(s).push(o.id),await dn({...o,onUserInput:qe(o),onResultDispatch:je(o)})})(n),{workspaceVersion:Dn||"",clientAPIVersion:n.clientAPIVersion||""}}}function He(){return(n,e)=>{n?(function(o,s){let c=L(o);if(!c)return;if(c.identity.uuid!==s.uuid||c.identity.name!==s.name)throw h;let l=Sn(c.identity),u=D.get(l);if(u){let p=u.findIndex((g=>g===o));p!==-1&&(u.splice(p,1),J(o))}})(n,e):console.error(w)}}let Rn=new Set;function Ke(n){Rn.add(n)}function ze(n){Rn.delete(n)}function Xe(){return async n=>{(function(e){let o=Sn(e),s=D.get(o);if(s){for(let c of s)J(c);D.delete(o)}})(n),Rn.forEach((e=>e(n)))}}async function Je(n){let e=await(o=n,fin.InterApplicationBus.Channel.create(o));var o;return e.onConnection((async s=>{for(let c of gn)if(!await c(s))throw C})),e.onDisconnection(Xe()),e.register(X,Be()),e.register(K,(s=>{let c=Wn(s.providerId,s.id),l=Cn.get(c);l&&l(s)})),e.register(bn,Ge()),e.register(Nn,He()),e.register(Ln,(async()=>Mn())),e.register(Pn,De()),e.register(z,(async(s,c)=>{if(!s||!s.providerId||!s.result)return void console.error(w);let l=L(s.providerId);if(!l)throw h;let{onResultDispatch:u}=l;return u?(s.result.dispatcherIdentity=s.result.dispatcherIdentity??c,u(s.result)):void 0})),e}async function Qe(){let n=Y();be(),await n.destroy(),Fn()}async function Ye(n){let e=Ie();e||(e=await Je(n),Pe(e));let o=Le.bind(null),s=ze.bind(null),c=pe.bind(null),l=he.bind(null);return{getAllProviders:Mn.bind(null),search:Bn.bind(null),register:Te.bind(null),deregister:xe.bind(null),onSubscription:Ne.bind(null),onDisconnect:Ke.bind(null),onRegister:de.bind(null),onDeregister:fe.bind(null),dispatch:ke.bind(null),disconnect:Qe.bind(null),removeListener:u=>{o(u),s(u),c(u),l(u)},channel:e}}let{v:Vn}=a,{B:qn}=r,jn="all",Ze={create:Vn,subscribe:qn,defaultTopic:jn},Gn=()=>{window.search=Ze},Hn=n=>{let e=()=>{Gn(),window.removeEventListener(n,e)};return e};if(typeof window<"u"){Gn();let n="load",e=Hn(n);window.addEventListener(n,e);let o="DOMContentLoaded",s=Hn(o);window.addEventListener(o,s)}Xn.exports=i})()});var y="@openfin/cloud-api";async function N(){try{return await window.fin.View.getCurrentSync().getInfo(),!0}catch{return!1}}function zn(t){if(t.name.startsWith("internal-generated"))throw new Error("Cannot extract app UUID from identity");return/\/[\d,a-z-]{36}$/.test(t.name)?t.name.split("/")[0]||"":t.name}var q="@openfin/cloud-api";function lt(){return`${window.fin.me.uuid}-cloud-api-notifications`}var An=null;async function qt(){return An||(An=ut()),An}async function ut(){if(!window.fin)throw new Error(`\`${q}\`: \`getNotificationsClient\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${q}: \`getNotificationsClient\` cannot be used in a non-OpenFin environment`);zn(window.fin.me);let t=await dt();console.log(t),t.register("openfin-cloud-event",r=>{for(let a of i.get(r.type)??[])typeof r.payload.timestamp=="string"&&(r.payload.timestamp=new Date(r.payload.timestamp)),a(r.payload)});let i=new Map;return{addEventListener:(r,a)=>{let d=i.get(r)||new Set;d.add(a),i.set(r,d)},removeEventListener:(r,a)=>{let d=i.get(r);if(!d){console.warn(`\`${q}\`: Listener was not found for event. Did you pass a function directly instead of a reference or forget to add the listener?`,r);return}d.delete(a)===!1&&console.warn(`\`${q}\`: Listener was not found for event. Did you pass a function directly instead of a reference?`,r)},update:async r=>(await t.dispatch("openfin-cloud-update-notification",{version:1,payload:{notification:r}})).payload.response,clear:async r=>(await t.dispatch("openfin-cloud-clear-notification",{version:1,payload:{notificationId:r}})).payload.response,createNotification:async r=>(r.id&&console.warn(`\`${q}\`: The \`id\` property is not supported and will be ignored. If you need to use the \`id\` property, you should use the \`id\` property of the returned notification object.`),(await t.dispatch("openfin-cloud-create-notification",{version:1,payload:{notification:{...r,id:void 0}}})).payload.response)}}var tn=null;async function dt(){return tn||(tn=pt()),tn}async function pt(){let t=await window.fin.InterApplicationBus.Channel.connect(lt());return t.onDisconnection(i=>{console.warn(`\`${q}\`: Channel Disconnected from`,i,"Reconnecting..."),tn=null}),t}var On;function ft(){return`${window.fin.me.uuid}-client-api`}async function U(){return On||(On=window.fin.InterApplicationBus.Channel.connect(ft())),On}async function Ht(){if(!window.fin)throw new Error(`\`${y}\`: \`getAppSettings\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`getAppSettings\` cannot be used in a non-OpenFin environment`);return(await U()).dispatch("get-settings")}async function Kt(){if(!window.fin)throw new Error(`\`${y}\`: \`getAppUserSettings\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`getAppUserSettings\` cannot be used in a non-OpenFin environment`);return(await U()).dispatch("get-user-settings")}async function zt(t){if(!window.fin)throw new Error(`\`${y}\`: \`setAppUserSettings\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`setAppUserSettings\` cannot be used in a non-OpenFin environment`);return(await U()).dispatch("set-user-settings",t)}async function Xt(){if(!window.fin)throw new Error(`\`${y}\`: \`getAppUserPermissions\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`getAppUserPermissions\` cannot be used in a non-OpenFin environment`);return(await U()).dispatch("get-user-permissions")}async function Jt(t,i){if(!window.fin)throw new Error(`\`${y}\`: \`launchContent\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`launchContent\` cannot be used in a outside of an OpenFin View context`);let r=await U();try{await r.dispatch("launch-content",{id:t,options:i})}catch(a){switch(a instanceof Error?a.message:String(a)){case"UnableToLookup":throw new Error(`${y}: \`launchContent\` was unable to lookup content with id: ${t}`);case"UnableToLaunch":throw new Error(`${y}: \`launchContent\` was unable to launch content with id: ${t}`);case"NoContentFound":throw new Error(`${y}: \`launchContent\` did not find content with id: ${t}`);default:throw new Error(`${y}: \`launchContent\` was unable to look up or launch content with id: ${t} or the content did not exist.`)}}}async function Qt(t){if(!window.fin)throw new Error(`\`${y}\`: \`launchSupertab\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`launchSupertab\` cannot be used in a outside of an OpenFin View context`);let i=await U();try{await i.dispatch("launch-supertab",{id:t})}catch(r){switch(r instanceof Error?r.message:String(r)){case"UnableToLookup":throw new Error(`${y}: \`launchSupertab\` was unable to lookup content with id: ${t}`);case"UnableToLaunch":throw new Error(`${y}: \`launchSupertab\` was unable to launch content with id: ${t}`);case"NoContentFound":throw new Error(`${y}: \`launchSupertab\` did not find content with id: ${t}`);default:throw new Error(`${y}: \`launchSupertab\` was unable to look up or launch content with id: ${t} or the content did not exist.`)}}}async function Yt(t){if(!window.fin)throw new Error(`\`${y}\`: \`launchWorkspace\` cannot be used in a non-OpenFin environment`);if(await N()===!1)throw new Error(`${y}: \`launchWorkspace\` cannot be used in a outside of an OpenFin View context`);let i=await U();try{await i.dispatch("launch-workspace",{id:t})}catch(r){switch(r instanceof Error?r.message:String(r)){case"UnableToLookup":throw new Error(`${y}: \`launchWorkspace\` was unable to lookup content with id: ${t}`);case"UnableToLaunch":throw new Error(`${y}: \`launchWorkspace\` was unable to launch content with id: ${t}`);case"NoContentFound":throw new Error(`${y}: \`launchWorkspace\` did not find content with id: ${t}`);default:throw new Error(`${y}: \`launchWorkspace\` was unable to look up or launch content with id: ${t} or the content did not exist.`)}}}var ne={};Kn(ne,{getAgentConfiguration:()=>Yn,register:()=>Zn});var Qn=vn(on(),1),ht="[here-agent]",gt="log-message-",wt="open-url",yt="provider-status-",mt="registered-",Ct="1.0";function St(t,i){let{data:r,iconSize:a,rightSideIcon:d,...h}=t;return{...h,data:{customData:r,iconSize:a,providerId:i,resultType:"app",rightSideIcon:d}}}function Jn(t){return{...t,data:t.data.customData}}async function Yn(){let{customData:t}=await window.fin.me.getOptions();return t}function Rt(){return`${window.fin.me.identity.uuid}-cloud-api-search`}async function Et(t,i,r,a=!0){await i("info",`Setting status as ${a?"ready":"not ready"}`);try{await t.dispatch(`${yt}${r}`,{isReady:a})}catch(d){let h=["Error setting provider status",d];console.error(...h),i("error",...h)}}async function vt(t,i,r,...a){try{console.log(ht,...a),await t.dispatch(`${gt}${i}`,{level:r,message:a})}catch(d){console.error("Error logging message",d)}}async function At(t,i,r,a,d){let{action:h,dispatcherIdentity:m,...w}=d;await r("info","Handling action",{action:h,dispatcherIdentity:m,result:w});let C;try{let P=Jn(d).actions?.find(({name:H})=>H===h.name);if(!P)throw new Error("Original action not found in search result");C=(await a(P,Jn(d)))?.url}catch(S){throw await r("error","Error handling dispatch",S),S}if(!C){await r("warn","OnActionListener did not return a URL");return}await It(t,r,i,C,m)}async function Ot(t,i,r,a){await i("info","Getting search results",{request:a});try{let d=new AbortController;a.onClose(()=>d.abort());let{context:h,query:m}=a,{results:w}=await r({context:h,query:m,signal:d.signal}),C=w.map(S=>St(S,t));return await i("info","Returning results",C),{results:C}}catch(d){let h=["Error handling search",d];throw console.error(...h),i("error",...h),d}}async function It(t,i,r,a,d){await i("info","Opening URL",{url:a,targetIdentity:d});try{await t.dispatch(wt,{url:a,targetIdentity:d,providerId:r})}catch(h){let m=["Error opening URL",h];console.error(...m),i("error",...m)}}async function Zn(t){let r=(await window.fin.me.getOptions()).customData,{id:a,title:d}=r,{onAction:h,onSearch:m}=t,w=await Qn.subscribe(Rt()),C=w.channel,S=vt.bind(null,C,a);return await w.register({icon:"",id:a,onResultDispatch:At.bind(null,C,a,S,h),onUserInput:Ot.bind(null,a,S,m),title:d}),await w.channel.dispatch(`${mt}${a}`,{version:Ct}),S("info","Registered search topic",{id:a,title:d}),{isReady:Et.bind(null,C,S,a)}}var le={};Kn(le,{getConfiguration:()=>ae,register:()=>ce});var se=vn(on(),1);var rn=class extends Error{constructor(){super("Interop feature is not supported by the agent")}};async function sn(t,i){try{let r=await window.fin.me.interop.getFDC3(t);i==="none"?(A("Leaving current channel"),await r.leaveCurrentChannel()):(A(`Joining interop channel: ${i}`),await("joinUserChannel"in r?r.joinUserChannel(i):r.joinChannel(i)))}catch(r){A(`Failed to join interop channel: ${i}`,r)}}var ro=vn(on(),1);var Nt=(t,i)=>{let{data:r,iconSize:a,rightSideIcon:d,...h}=t;return{...h,data:{customData:r,iconSize:a,providerId:i,resultType:"app",rightSideIcon:d}}},ee=t=>({...t,data:t.data.customData}),te=()=>`${window.fin.me.identity.uuid}-cloud-api-search`,Lt=async({channel:t,url:i,targetIdentity:r})=>{A("Opening URL",{url:i,targetIdentity:r});try{await t.dispatch(ie,{url:i,targetIdentity:r})}catch(a){console.error("Failed opening URL",a)}},oe=async(t,i,r,a)=>{let{action:d,dispatcherIdentity:h,...m}=a;A("Handling action...",{action:d,dispatcherIdentity:h,result:m});let w;try{let S=ee(a).actions?.find(({name:b})=>b===d.name);if(!S)throw new Error("Original action not found in search result");w=(await r(S,ee(a)))?.url}catch(C){throw A("Error handling dispatch",C),C}if(!w){A("OnActionListener did not return a URL");return}await Lt({channel:t,url:w,targetIdentity:h})},re=async(t,i,r)=>{A("Getting search results...",{request:r});try{let a=new AbortController;r.onClose(()=>a.abort());let{context:d,query:h}=r,{results:m}=await i({context:d,query:h,signal:a.signal}),w=m.map(C=>Nt(C,t));return A("Returning results",w),{results:w}}catch(a){throw new Error("Error handling search request",{cause:a})}};var _t="[here-agent]",Tt="1.0",xt="-enterprise-component-bridge",ie="open-url",kt="set-agent-registered",$t="set-agent-status",ae=async()=>{let{customData:t}=await window.fin.me.getOptions(),i=t,{configurationFields:r}=i;return Object.fromEntries(r?.map(a=>[a.name,a.value])??[])};async function Ut(t,i){if(!t.interop)throw new rn;let{fdc3Version:r}=t.interop;await sn(r,i)}function A(...t){console.log(_t,...t)}var Dt=async(t,i,r=!0)=>{A(`Setting status to ${r?"ready":"not ready"}`);try{await t.dispatch($t,{id:i,isReady:r})}catch(a){throw new Error("Failed to set agent status",{cause:a})}};async function ce(t){let{customData:i}=await window.fin.me.getOptions(),r=i;A("Registering agent...",r);try{let a=`${window.fin.me.identity.uuid}${xt}`,d;try{d=await window.fin.InterApplicationBus.Channel.connect(a,{wait:!1})}catch(S){throw new Error("Failed to connect to enterprise component bridge channel",{cause:S})}let{id:h,features:m,title:w}=r,C={features:m,joinInteropChannel:Ut.bind(null,m),setIsReady:Dt.bind(null,d,h)};if(m.interop){A("Enabling interop features");let{defaultChannel:S,fdc3Version:P}=m.interop;S&&S!=="none"&&await sn(P,S),d.register("on-desktop-app-signals-changed",Mt.bind(null,r))}return m.search&&t.search&&(A("Enabling search features"),await(await se.subscribe(te())).register({icon:"",id:h,onResultDispatch:oe.bind(null,d,h,t.search.onAction),onUserInput:re.bind(null,h,t.search.onSearch),title:w})),await d.dispatch(kt,{id:h,apiVersion:Tt}),A("Registered successfully"),C}catch(a){throw new Error("Failed to register agent",{cause:a})}}function Mt(t,i){A("Desktop app signals changed",i);let r=i,{type:a,id:d,features:h}=t,{fdc3Version:m}=h.interop,w=r.find(C=>a==="agent"?C.appKey===t.name:a==="custom"?C.appKey===d:!1);w&&sn(m,w.selectedColorChannel)}


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
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
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
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./client/src/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/cloud-api */ "./node_modules/@openfin/cloud-api/dist/index.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./client/src/search.ts");


/**
 * Initializes the search agent.
 */
async function init() {
    const openLibrarySearchAgent = await (0,_search__WEBPACK_IMPORTED_MODULE_1__.init)({
        info: (message, ...optionalParams) => {
            console.log(message, optionalParams);
        },
        error: (message, ...optionalParams) => {
            console.error(message, optionalParams);
        },
        warn: (message, ...optionalParams) => {
            console.warn(message, optionalParams);
        },
        trace: (message, ...optionalParams) => {
            console.trace(message, optionalParams);
        },
        debug: (message, ...optionalParams) => {
            console.debug(message, optionalParams);
        }
    });
    const searchAgent = await _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__.Agent.register(openLibrarySearchAgent);
    await searchAgent.setIsReady(true);
}
window.addEventListener("load", async () => {
    await init();
});

})();


//# sourceMappingURL=agent.search.openlibrary.bundle.js.map