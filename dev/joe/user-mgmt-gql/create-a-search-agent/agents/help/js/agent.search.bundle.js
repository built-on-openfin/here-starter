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
/* harmony import */ var _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/cloud-api */ "../../../../node_modules/@openfin/cloud-api/dist/index.js");
/* harmony import */ var fuse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fuse.js */ "../../../../node_modules/fuse.js/dist/fuse.mjs");


let agentLogger;
let fuse;
/**
 * Returns a search agent implementation for the help search.
 * @param logger An optional logger for this agent to use.
 * @returns The search agent implementation.
 */
async function init(logger) {
    agentLogger = logger;
    const configData = await _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__.Agent.getConfiguration();
    agentLogger?.info("configData", configData);
    if (!configData?.primaryHelpUrl ||
        configData.primaryHelpUrl.trim() === "" ||
        !configData.primaryHelpUrl.trim().startsWith("http")) {
        agentLogger?.error("No config URL provided in agent configuration");
        return;
    }
    const agentPrimaryUrlResponse = await fetch(configData.primaryHelpUrl);
    if (!agentPrimaryUrlResponse.ok) {
        agentLogger?.error(`Failed to fetch agent config from ${configData.primaryHelpUrl} with status ${agentPrimaryUrlResponse.status}`);
        return;
    }
    const helpResults = [];
    const primaryHelp = await agentPrimaryUrlResponse.json();
    agentLogger?.info("Fetched agent primary help", primaryHelp);
    helpResults.push(...primaryHelp);
    if (configData.secondaryHelpUrl &&
        configData.secondaryHelpUrl.trim() !== "" &&
        configData.secondaryHelpUrl.trim().startsWith("http")) {
        const agentSecondaryUrlResponse = await fetch(configData.secondaryHelpUrl);
        if (!agentSecondaryUrlResponse.ok) {
            agentLogger?.error(`Failed to fetch agent config from ${configData.secondaryHelpUrl} with status ${agentSecondaryUrlResponse.status}`);
            return;
        }
        const secondaryHelp = await agentSecondaryUrlResponse.json();
        agentLogger?.info("Fetched agent secondary help", secondaryHelp);
        helpResults.push(...secondaryHelp);
    }
    if (configData.tertiaryHelpUrl &&
        configData.tertiaryHelpUrl.trim() !== "" &&
        configData.tertiaryHelpUrl.trim().startsWith("http")) {
        const agentTertiaryUrlResponse = await fetch(configData.tertiaryHelpUrl);
        if (!agentTertiaryUrlResponse.ok) {
            agentLogger?.error(`Failed to fetch agent config from ${configData.tertiaryHelpUrl} with status ${agentTertiaryUrlResponse.status}`);
            return;
        }
        const tertiaryHelp = await agentTertiaryUrlResponse.json();
        agentLogger?.info("Fetched agent tertiary help", tertiaryHelp);
        helpResults.push(...tertiaryHelp);
    }
    if (configData.tertiaryHelpUrl &&
        configData.tertiaryHelpUrl.trim() !== "" &&
        configData.tertiaryHelpUrl.trim().startsWith("http")) {
        const agentTertiaryUrlResponse = await fetch(configData.tertiaryHelpUrl);
        if (!agentTertiaryUrlResponse.ok) {
            agentLogger?.error(`Failed to fetch agent config from ${configData.tertiaryHelpUrl} with status ${agentTertiaryUrlResponse.status}`);
            return;
        }
        const tertiaryHelp = await agentTertiaryUrlResponse.json();
        agentLogger?.info("Fetched agent tertiary help", tertiaryHelp);
        helpResults.push(...tertiaryHelp);
    }
    if (configData.quaternaryHelpUrl &&
        configData.quaternaryHelpUrl.trim() !== "" &&
        configData.quaternaryHelpUrl.trim().startsWith("http")) {
        const agentQuaternaryUrlResponse = await fetch(configData.quaternaryHelpUrl);
        if (!agentQuaternaryUrlResponse.ok) {
            agentLogger?.error(`Failed to fetch agent config from ${configData.quaternaryHelpUrl} with status ${agentQuaternaryUrlResponse.status}`);
            return;
        }
        const quaternaryHelp = await agentQuaternaryUrlResponse.json();
        agentLogger?.info("Fetched agent quaternary help", quaternaryHelp);
        helpResults.push(...quaternaryHelp);
    }
    const options = {
        includeScore: true,
        threshold: 0.4,
        keys: [
            { name: "title", weight: 0.6 },
            { name: "description", weight: 0.3 },
            { name: "text", weight: 0.1 }
        ]
    };
    fuse = new fuse_js__WEBPACK_IMPORTED_MODULE_1__["default"](helpResults, options);
    return {
        search: {
            onAction,
            onSearch
        }
    };
}
/**
 * Handles actions for the search agent. This is triggered when someone makes a selection within the Enterprise Browser search results.
 * @param action The selection the user made.
 * @param result The result that was selected.
 * @returns The url to launch.
 */
// eslint-disable-next-line func-style
async function onAction(action, result) {
    agentLogger?.info("Received action", { action, result });
    const data = result.data;
    if (!data) {
        agentLogger?.warn("No data in result");
        return;
    }
    return {
        url: data.url
    };
}
/**
 * A query handler for the search agent.
 * @param request The query from enterprise browser
 * @returns The results to display in the search results.
 */
async function onSearch(request) {
    const { context, query } = request;
    agentLogger?.info("Received search request", { context, query });
    if (!fuse) {
        return { results: [] };
    }
    const results = fuse.search(query).map((result) => ({
        title: result.item.title,
        label: result.item.description,
        key: result.item.id,
        icon: "data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAkACQAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCABQAFADASIAAhEBAxEB/8QAGwABAAMBAQEBAAAAAAAAAAAAAAEICQcGAwX/xAA3EAABAwMCBAIGCAcAAAAAAAABAAIDBAUGBxEIEiExUZETFDJBUnEJFRYXV2GV0iIzNUJDVbP/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUBAgYDB//EACoRAAMAAQIDBgcBAAAAAAAAAAABAgMEEQUhMRIVQVJxkRMUUYGxwdHw/9oADAMBAAIRAxEAPwCoSIi60+qhERAEREAREQBERAERANyB4oAo3HiPNX90D0r0O074ZaPWvULAYsoq6+j+sq177YLjPHG6cxxwwQnoA0cpJ6EkuJOwAHvKi6cK9NdJ7RJoNGZqe+W/H3Obg7eQ1FZEZIng8v8ALDRs5x6g7dDuCqq+KpW5mG9ntv6ER6tJtKW9jMbceI803HiPNbGHQbREEj7oMN6dP6LT/tUfcNoj+EGG/otP+1Ru/sfkZp89PlMdNx4jzUrYr7htEfwgw39Fp/2rifF3w56SR6LZBmeN4XacfvON07a6nqLZTNpxKwSND4pGs2a9pa47EjcEAg9wfTDxvFlyKOy1vyNp1s1SW3UzhRCNiR4IromBS32h81ClvtD5oDWrhMJbw3aekEjazN677f5ZF1vncP73eHtKo32syXB/o7bPlGIXuotF3orJR+r1kBAfEXVwa4jcEdWuIPTsV8NTuI/UKexaa0llxHUPDp6/I7NTXC7XSgigprlDI1rZYmvDnc3pCefsN2gnp2XGXo7z5aqfGqXtz/ZSvFV02vqy33M3xCczfEKjem2e6x546+3O4ZXrzXilyWuoInYjabfUW6OGOYcsbnSgOD2g9QOgby+/dfk5DrpnVJVarXS+at6oWyXH8lrLZYGWa1081ojcHOEEFTK+PaMlwA2LgS3r1Kd2ZHTlUt16/wAM/ArdpNf77F+iQO5AXJ+LAg8N+oRH+lf/ANI1Xm46j8Qtx1PsWFZTftQ6OuGC0N1udswKio6iobWue4OleyUFgaWlnOWnYOIDei6nqi67u4MMyN9mzGWt+qar0j8tpoYLoR6y3l9KyH+ADbbl27t2J6pGkrBlx06T3a6ephR2Lnmuq/JmO72j81Cl3tH5qF2ZdBAdjuiIC9Ghet/DvmfDjRaHa132CzttsAoaqnq5pqeOshZOZYpIpox0PshzdwQWnuCus5ZqvwcZvarDZMk1Rx6po8araW4W1jbjPGYp6dvLE4loBeAPc7cH3rL4EjsdlPM74j5qqvhOO7dq6XNvk/F9SJWjl12lTRoRHb/o/wCCrnrKXU2ClfU1T6yVtNllyhY6Z7+dzuRjw3qfy/Jepps44IaayZfjg1CxqW3Z3VyV19gnuM8jamd/d7eYbxkHYjk22IBHULM7md8R805nfEfNK4Uq65a9zD0e/W2aG3CLgHudRQVlZqhTGptlthtFNPHlNwjlbSRb+jiL2ODnBvNsNyegA9wXn9fNedAcZ4e7no5pHlJyKa8xOpIWR1dRWeqxyTCSWWWom3J7ENbzE7kdgFRLmd8R81BJPc7raeGSqmruns99m+RlaRJpum9gTuSfFERWZLCIiAIiIAiIgCIiAIiID//Z",
        data: {
            recordId: result.item.id,
            url: result.item.url
        },
        actions: [
            {
                name: "view",
                title: "View Help Document",
                description: `View the help document with url: ${result.item.url}`
            }
        ]
    }));
    return { results };
}


/***/ },

/***/ "../../../../node_modules/@openfin/cloud-api/dist/index.js"
/*!*****************************************************************!*\
  !*** ../../../../node_modules/@openfin/cloud-api/dist/index.js ***!
  \*****************************************************************/
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
//# sourceMappingURL=index.js.map

/***/ },

/***/ "../../../../node_modules/fuse.js/dist/fuse.mjs"
/*!******************************************************!*\
  !*** ../../../../node_modules/fuse.js/dist/fuse.mjs ***!
  \******************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ entry_default)
/* harmony export */ });
/**
 * Fuse.js v7.4.2 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2026 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
//#region src/helpers/typeGuards.ts
function isArray(value) {
	return !Array.isArray ? getTag(value) === "[object Array]" : Array.isArray(value);
}
function baseToString(value) {
	if (typeof value == "string") return value;
	if (typeof value === "bigint") return value.toString();
	const result = value + "";
	return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function toString(value) {
	return value == null ? "" : baseToString(value);
}
function isString(value) {
	return typeof value === "string";
}
function isNumber(value) {
	return typeof value === "number";
}
function isBoolean(value) {
	return value === true || value === false || isObjectLike(value) && getTag(value) == "[object Boolean]";
}
function isObject(value) {
	return typeof value === "object";
}
function isObjectLike(value) {
	return isObject(value) && value !== null;
}
function isDefined(value) {
	return value !== void 0 && value !== null;
}
function isBlank(value) {
	return !value.trim().length;
}
function getTag(value) {
	return value == null ? value === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(value);
}

//#endregion
//#region src/core/errorMessages.ts
const INCORRECT_INDEX_TYPE = "Incorrect 'index' type";
const INVALID_DOC_INDEX = "Invalid doc index: must be a non-negative integer within the bounds of the docs array";
const LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY = (key) => `Invalid value for key ${key}`;
const PATTERN_LENGTH_TOO_LARGE = (max) => `Pattern length exceeds max of ${max}.`;
const MISSING_KEY_PROPERTY = (name) => `Missing ${name} property in key`;
const INVALID_KEY_WEIGHT_VALUE = (key) => `Property 'weight' in key '${key}' must be a positive integer`;
const FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED = "Fuse.match does not support useTokenSearch: token search requires corpus-level statistics (df, fieldCount) that a one-off string comparison does not have. Use new Fuse(...).search(...) instead.";

//#endregion
//#region src/tools/KeyStore.ts
const hasOwn = Object.prototype.hasOwnProperty;
var KeyStore = class {
	constructor(keys) {
		this._keys = [];
		this._keyMap = {};
		let totalWeight = 0;
		keys.forEach((key) => {
			const obj = createKey(key);
			this._keys.push(obj);
			this._keyMap[obj.id] = obj;
			totalWeight += obj.weight;
		});
		this._keys.forEach((key) => {
			key.weight /= totalWeight;
		});
	}
	get(keyId) {
		return this._keyMap[keyId];
	}
	keys() {
		return this._keys;
	}
	toJSON() {
		return JSON.stringify(this._keys);
	}
};
function createKey(key) {
	let path = null;
	let id = null;
	let src = null;
	let weight = 1;
	let getFn = null;
	if (isString(key) || isArray(key)) {
		src = key;
		path = createKeyPath(key);
		id = createKeyId(key);
	} else {
		if (!hasOwn.call(key, "name")) throw new Error(MISSING_KEY_PROPERTY("name"));
		const name = key.name;
		src = name;
		if (hasOwn.call(key, "weight") && key.weight !== void 0) {
			weight = key.weight;
			if (weight <= 0) throw new Error(INVALID_KEY_WEIGHT_VALUE(createKeyId(name)));
		}
		path = createKeyPath(name);
		id = createKeyId(name);
		getFn = key.getFn ?? null;
	}
	return {
		path,
		id,
		weight,
		src,
		getFn
	};
}
function createKeyPath(key) {
	return isArray(key) ? key : key.split(".");
}
function createKeyId(key) {
	return isArray(key) ? key.join(".") : key;
}

//#endregion
//#region src/helpers/get.ts
function get(obj, path) {
	const list = [];
	let arr = false;
	const deepGet = (obj, path, index, arrayIndex) => {
		if (!isDefined(obj)) return;
		if (!path[index]) list.push(arrayIndex !== void 0 ? {
			v: obj,
			i: arrayIndex
		} : obj);
		else {
			const value = obj[path[index]];
			if (!isDefined(value)) return;
			if (index === path.length - 1 && (isString(value) || isNumber(value) || isBoolean(value) || typeof value === "bigint")) list.push(arrayIndex !== void 0 ? {
				v: toString(value),
				i: arrayIndex
			} : toString(value));
			else if (isArray(value)) {
				arr = true;
				for (let i = 0, len = value.length; i < len; i += 1) deepGet(value[i], path, index + 1, i);
			} else if (path.length) deepGet(value, path, index + 1, arrayIndex);
		}
	};
	deepGet(obj, isString(path) ? path.split(".") : path, 0);
	return arr ? list : list[0];
}

//#endregion
//#region src/core/config.ts
const MatchOptions = {
	includeMatches: false,
	findAllMatches: false,
	minMatchCharLength: 1
};
const BasicOptions = {
	isCaseSensitive: false,
	ignoreDiacritics: false,
	includeScore: false,
	keys: [],
	shouldSort: true,
	sortFn: (a, b) => a.score === b.score ? a.idx < b.idx ? -1 : 1 : a.score < b.score ? -1 : 1
};
const FuzzyOptions = {
	location: 0,
	threshold: .6,
	distance: 100
};
const AdvancedOptions = {
	useExtendedSearch: false,
	useTokenSearch: false,
	tokenize: void 0,
	tokenMatch: "any",
	getFn: get,
	ignoreLocation: false,
	ignoreFieldNorm: false,
	fieldNormWeight: 1
};
const Config = Object.freeze({
	...BasicOptions,
	...MatchOptions,
	...FuzzyOptions,
	...AdvancedOptions
});

//#endregion
//#region src/tools/fieldNorm.ts
function norm(weight = 1, mantissa = 3) {
	const cache = /* @__PURE__ */ new Map();
	const m = Math.pow(10, mantissa);
	return {
		get(value) {
			let numTokens = 1;
			let inSpace = false;
			for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) === 32) {
				if (!inSpace) {
					numTokens++;
					inSpace = true;
				}
			} else inSpace = false;
			if (cache.has(numTokens)) return cache.get(numTokens);
			const n = Math.round(m / Math.pow(numTokens, .5 * weight)) / m;
			cache.set(numTokens, n);
			return n;
		},
		clear() {
			cache.clear();
		}
	};
}

//#endregion
//#region src/tools/FuseIndex.ts
var FuseIndex = class {
	constructor({ getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
		this.norm = norm(fieldNormWeight, 3);
		this.getFn = getFn;
		this.isCreated = false;
		this.docs = [];
		this.keys = [];
		this._keysMap = {};
		this.setIndexRecords();
	}
	setSources(docs = []) {
		this.docs = docs;
	}
	setIndexRecords(records = []) {
		this.records = records;
	}
	setKeys(keys = []) {
		this.keys = keys;
		this._keysMap = {};
		keys.forEach((key, idx) => {
			this._keysMap[key.id] = idx;
		});
	}
	create() {
		if (this.isCreated || !this.docs.length) return;
		this.isCreated = true;
		const len = this.docs.length;
		this.records = new Array(len);
		let recordCount = 0;
		if (isString(this.docs[0])) for (let i = 0; i < len; i++) {
			const record = this._createStringRecord(this.docs[i], i);
			if (record) this.records[recordCount++] = record;
		}
		else for (let i = 0; i < len; i++) this.records[recordCount++] = this._createObjectRecord(this.docs[i], i);
		this.records.length = recordCount;
		this.norm.clear();
	}
	add(doc, docIndex) {
		if (!Number.isInteger(docIndex) || docIndex < 0) throw new Error(INVALID_DOC_INDEX);
		if (isString(doc)) {
			const record = this._createStringRecord(doc, docIndex);
			if (record) this.records.push(record);
			return record;
		}
		const record = this._createObjectRecord(doc, docIndex);
		this.records.push(record);
		return record;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0) throw new Error(INVALID_DOC_INDEX);
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i === idx) {
			this.records.splice(i, 1);
			break;
		}
		for (let i = 0, len = this.records.length; i < len; i += 1) if (this.records[i].i > idx) this.records[i].i -= 1;
	}
	removeAll(indices) {
		const toRemove = /* @__PURE__ */ new Set();
		for (const v of indices) if (Number.isInteger(v) && v >= 0) toRemove.add(v);
		if (toRemove.size === 0) return;
		this.records = this.records.filter((r) => !toRemove.has(r.i));
		const sorted = Array.from(toRemove).sort((a, b) => a - b);
		for (const record of this.records) {
			let lo = 0;
			let hi = sorted.length;
			while (lo < hi) {
				const mid = lo + hi >>> 1;
				if (sorted[mid] < record.i) lo = mid + 1;
				else hi = mid;
			}
			record.i -= lo;
		}
	}
	getValueForItemAtKeyId(item, keyId) {
		return item[this._keysMap[keyId]];
	}
	size() {
		return this.records.length;
	}
	_createStringRecord(doc, docIndex) {
		if (!isDefined(doc) || isBlank(doc)) return null;
		return {
			v: doc,
			i: docIndex,
			n: this.norm.get(doc)
		};
	}
	_createObjectRecord(doc, docIndex) {
		const record = {
			i: docIndex,
			$: {}
		};
		for (let keyIndex = 0, keyLen = this.keys.length; keyIndex < keyLen; keyIndex++) {
			const key = this.keys[keyIndex];
			const value = key.getFn ? key.getFn(doc) : this.getFn(doc, key.path);
			if (!isDefined(value)) continue;
			if (isArray(value)) {
				const subRecords = [];
				for (let i = 0, len = value.length; i < len; i += 1) {
					const item = value[i];
					if (!isDefined(item)) continue;
					if (isString(item)) {
						if (!isBlank(item)) {
							const subRecord = {
								v: item,
								i,
								n: this.norm.get(item)
							};
							subRecords.push(subRecord);
						}
					} else if (isDefined(item.v)) {
						const text = isString(item.v) ? item.v : toString(item.v);
						if (!isBlank(text)) {
							const subRecord = {
								v: text,
								i: item.i,
								n: this.norm.get(text)
							};
							subRecords.push(subRecord);
						}
					}
				}
				record.$[keyIndex] = subRecords;
			} else if (isString(value) && !isBlank(value)) {
				const subRecord = {
					v: value,
					n: this.norm.get(value)
				};
				record.$[keyIndex] = subRecord;
			}
		}
		return record;
	}
	toJSON() {
		return {
			keys: this.keys.map(({ getFn, ...key }) => key),
			records: this.records
		};
	}
};
function createIndex(keys, docs, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys.map(createKey));
	myIndex.setSources(docs);
	myIndex.create();
	return myIndex;
}
function parseIndex(data, { getFn = Config.getFn, fieldNormWeight = Config.fieldNormWeight } = {}) {
	const { keys, records } = data;
	const myIndex = new FuseIndex({
		getFn,
		fieldNormWeight
	});
	myIndex.setKeys(keys);
	myIndex.setIndexRecords(records);
	return myIndex;
}

//#endregion
//#region src/search/bitap/convertMaskToIndices.ts
function convertMaskToIndices(matchmask = [], minMatchCharLength = Config.minMatchCharLength) {
	const indices = [];
	let start = -1;
	let end = -1;
	let i = 0;
	for (let len = matchmask.length; i < len; i += 1) {
		const match = matchmask[i];
		if (match && start === -1) start = i;
		else if (!match && start !== -1) {
			end = i - 1;
			if (end - start + 1 >= minMatchCharLength) indices.push([start, end]);
			start = -1;
		}
	}
	if (matchmask[i - 1] && i - start >= minMatchCharLength) indices.push([start, i - 1]);
	return indices;
}

//#endregion
//#region src/search/bitap/search.ts
function search(text, pattern, patternAlphabet, { location = Config.location, distance = Config.distance, threshold = Config.threshold, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, includeMatches = Config.includeMatches, ignoreLocation = Config.ignoreLocation } = {}) {
	if (pattern.length > 32) throw new Error(PATTERN_LENGTH_TOO_LARGE(32));
	const patternLen = pattern.length;
	const textLen = text.length;
	const expectedLocation = Math.max(0, Math.min(location, textLen));
	let currentThreshold = threshold;
	let bestLocation = expectedLocation;
	const calcScore = (errors, currentLocation) => {
		const accuracy = errors / patternLen;
		if (ignoreLocation) return accuracy;
		const proximity = Math.abs(expectedLocation - currentLocation);
		if (!distance) return proximity ? 1 : accuracy;
		return accuracy + proximity / distance;
	};
	const computeMatches = minMatchCharLength > 1 || includeMatches;
	const matchMask = computeMatches ? Array(textLen) : [];
	let index;
	while ((index = text.indexOf(pattern, bestLocation)) > -1) {
		const score = calcScore(0, index);
		currentThreshold = Math.min(score, currentThreshold);
		bestLocation = index + patternLen;
		if (computeMatches) {
			let i = 0;
			while (i < patternLen) {
				matchMask[index + i] = 1;
				i += 1;
			}
		}
	}
	bestLocation = -1;
	let lastBitArr = [];
	let finalScore = 1;
	let bestErrors = 0;
	let binMax = patternLen + textLen;
	const mask = 1 << patternLen - 1;
	for (let i = 0; i < patternLen; i += 1) {
		let binMin = 0;
		let binMid = binMax;
		while (binMin < binMid) {
			if (calcScore(i, expectedLocation + binMid) <= currentThreshold) binMin = binMid;
			else binMax = binMid;
			binMid = Math.floor((binMax - binMin) / 2 + binMin);
		}
		binMax = binMid;
		let start = Math.max(1, expectedLocation - binMid + 1);
		const finish = findAllMatches ? textLen : Math.min(expectedLocation + binMid, textLen) + patternLen;
		const bitArr = Array(finish + 2);
		bitArr[finish + 1] = (1 << i) - 1;
		for (let j = finish; j >= start; j -= 1) {
			const currentLocation = j - 1;
			const charMatch = patternAlphabet[text[currentLocation]];
			bitArr[j] = (bitArr[j + 1] << 1 | 1) & charMatch;
			if (i) bitArr[j] |= (lastBitArr[j + 1] | lastBitArr[j]) << 1 | 1 | lastBitArr[j + 1];
			if (bitArr[j] & mask) {
				finalScore = calcScore(i, currentLocation);
				if (finalScore <= currentThreshold) {
					currentThreshold = finalScore;
					bestLocation = currentLocation;
					bestErrors = i;
					if (bestLocation <= expectedLocation) break;
					start = Math.max(1, 2 * expectedLocation - bestLocation);
				}
			}
		}
		if (calcScore(i + 1, expectedLocation) > currentThreshold) break;
		lastBitArr = bitArr;
	}
	if (computeMatches && bestLocation >= 0) {
		const matchEnd = Math.min(textLen - 1, bestLocation + patternLen - 1 + bestErrors);
		for (let k = bestLocation; k <= matchEnd; k += 1) if (patternAlphabet[text[k]]) matchMask[k] = 1;
	}
	const result = {
		isMatch: bestLocation >= 0,
		score: Math.max(.001, finalScore)
	};
	if (computeMatches) {
		const indices = convertMaskToIndices(matchMask, minMatchCharLength);
		if (!indices.length) result.isMatch = false;
		else if (includeMatches) result.indices = indices;
	}
	return result;
}

//#endregion
//#region src/search/bitap/createPatternAlphabet.ts
function createPatternAlphabet(pattern) {
	const mask = {};
	for (let i = 0, len = pattern.length; i < len; i += 1) {
		const char = pattern.charAt(i);
		mask[char] = (mask[char] || 0) | 1 << len - i - 1;
	}
	return mask;
}

//#endregion
//#region src/helpers/mergeIndices.ts
function mergeIndices(indices) {
	if (indices.length <= 1) return indices;
	indices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
	const merged = [indices[0]];
	for (let i = 1, len = indices.length; i < len; i += 1) {
		const last = merged[merged.length - 1];
		const curr = indices[i];
		if (curr[0] <= last[1] + 1) last[1] = Math.max(last[1], curr[1]);
		else merged.push(curr);
	}
	return merged;
}

//#endregion
//#region src/helpers/diacritics.ts
const NON_DECOMPOSABLE_MAP = {
	"ł": "l",
	"Ł": "L",
	"đ": "d",
	"Đ": "D",
	"ø": "o",
	"Ø": "O",
	"ħ": "h",
	"Ħ": "H",
	"ŧ": "t",
	"Ŧ": "T",
	"ı": "i",
	"ß": "ss"
};
const NON_DECOMPOSABLE_RE = new RegExp("[" + Object.keys(NON_DECOMPOSABLE_MAP).join("") + "]", "g");
const stripDiacritics = typeof String.prototype.normalize === "function" ? (str) => str.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g, "").replace(NON_DECOMPOSABLE_RE, (ch) => NON_DECOMPOSABLE_MAP[ch]) : (str) => str;

//#endregion
//#region src/search/bitap/index.ts
var BitapSearch = class {
	constructor(pattern, { location = Config.location, threshold = Config.threshold, distance = Config.distance, includeMatches = Config.includeMatches, findAllMatches = Config.findAllMatches, minMatchCharLength = Config.minMatchCharLength, isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, ignoreLocation = Config.ignoreLocation } = {}) {
		this.options = {
			location,
			threshold,
			distance,
			includeMatches,
			findAllMatches,
			minMatchCharLength,
			isCaseSensitive,
			ignoreDiacritics,
			ignoreLocation
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.chunks = [];
		if (!this.pattern.length) return;
		const addChunk = (pattern, startIndex) => {
			this.chunks.push({
				pattern,
				alphabet: createPatternAlphabet(pattern),
				startIndex
			});
		};
		const len = this.pattern.length;
		if (len > 32) {
			let i = 0;
			const remainder = len % 32;
			const end = len - remainder;
			while (i < end) {
				addChunk(this.pattern.substr(i, 32), i);
				i += 32;
			}
			if (remainder) {
				const startIndex = len - 32;
				addChunk(this.pattern.substr(startIndex), startIndex);
			}
		} else addChunk(this.pattern, 0);
	}
	searchIn(text) {
		const { isCaseSensitive, ignoreDiacritics, includeMatches } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		if (this.pattern === text) {
			const result = {
				isMatch: true,
				score: 0
			};
			if (includeMatches) result.indices = [[0, text.length - 1]];
			return result;
		}
		const { location, distance, threshold, findAllMatches, minMatchCharLength, ignoreLocation } = this.options;
		const allIndices = [];
		let totalScore = 0;
		let hasMatches = false;
		this.chunks.forEach(({ pattern, alphabet, startIndex }) => {
			const { isMatch, score, indices } = search(text, pattern, alphabet, {
				location: location + startIndex,
				distance,
				threshold,
				findAllMatches,
				minMatchCharLength,
				includeMatches,
				ignoreLocation
			});
			if (isMatch) hasMatches = true;
			totalScore += score;
			if (isMatch && indices) allIndices.push(...indices);
		});
		const result = {
			isMatch: hasMatches,
			score: hasMatches ? totalScore / this.chunks.length : 1
		};
		if (hasMatches && includeMatches) result.indices = mergeIndices(allIndices);
		return result;
	}
};

//#endregion
//#region src/search/extended/matchers.ts
const MULTI_MATCH_TYPES = new Set(["fuzzy", "include"]);
function isInverse(type) {
	return type.startsWith("inverse");
}
const matchers = [
	{
		type: "exact",
		multiRegex: /^="(.*)"$/,
		singleRegex: /^=(.*)$/,
		create: (pattern) => ({
			type: "exact",
			search(text) {
				const isMatch = text === pattern;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "include",
		multiRegex: /^'"(.*)"$/,
		singleRegex: /^'(.*)$/,
		create: (pattern) => ({
			type: "include",
			search(text) {
				let location = 0;
				let index;
				const indices = [];
				const patternLen = pattern.length;
				while ((index = text.indexOf(pattern, location)) > -1) {
					location = index + patternLen;
					indices.push([index, location - 1]);
				}
				const isMatch = !!indices.length;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices
				};
			}
		})
	},
	{
		type: "prefix-exact",
		multiRegex: /^\^"(.*)"$/,
		singleRegex: /^\^(.*)$/,
		create: (pattern) => ({
			type: "prefix-exact",
			search(text) {
				const isMatch = text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, pattern.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-prefix-exact",
		multiRegex: /^!\^"(.*)"$/,
		singleRegex: /^!\^(.*)$/,
		create: (pattern) => ({
			type: "inverse-prefix-exact",
			search(text) {
				const isMatch = !text.startsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-suffix-exact",
		multiRegex: /^!"(.*)"\$$/,
		singleRegex: /^!(.*)\$$/,
		create: (pattern) => ({
			type: "inverse-suffix-exact",
			search(text) {
				const isMatch = !text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "suffix-exact",
		multiRegex: /^"(.*)"\$$/,
		singleRegex: /^(.*)\$$/,
		create: (pattern) => ({
			type: "suffix-exact",
			search(text) {
				const isMatch = text.endsWith(pattern);
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [text.length - pattern.length, text.length - 1]
				};
			}
		})
	},
	{
		type: "inverse-exact",
		multiRegex: /^!"(.*)"$/,
		singleRegex: /^!(.*)$/,
		create: (pattern) => ({
			type: "inverse-exact",
			search(text) {
				const isMatch = text.indexOf(pattern) === -1;
				return {
					isMatch,
					score: isMatch ? 0 : 1,
					indices: [0, text.length - 1]
				};
			}
		})
	},
	{
		type: "fuzzy",
		multiRegex: /^"(.*)"$/,
		singleRegex: /^(.*)$/,
		create: (pattern, options = {}) => {
			const bitap = new BitapSearch(pattern, {
				location: options.location ?? Config.location,
				threshold: options.threshold ?? Config.threshold,
				distance: options.distance ?? Config.distance,
				includeMatches: options.includeMatches ?? Config.includeMatches,
				findAllMatches: options.findAllMatches ?? Config.findAllMatches,
				minMatchCharLength: options.minMatchCharLength ?? Config.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive ?? Config.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics ?? Config.ignoreDiacritics,
				ignoreLocation: options.ignoreLocation ?? Config.ignoreLocation
			});
			return {
				type: "fuzzy",
				search(text) {
					return bitap.searchIn(text);
				}
			};
		}
	}
];

//#endregion
//#region src/search/extended/parseQuery.ts
const matchersLen = matchers.length;
const ESCAPED_PIPE = "\0";
const OR_TOKEN = "|";
function tokenize(pattern) {
	const tokens = [];
	const len = pattern.length;
	let i = 0;
	while (i < len) {
		while (i < len && pattern[i] === " ") i++;
		if (i >= len) break;
		let j = i;
		while (j < len && pattern[j] !== " " && pattern[j] !== "\"") j++;
		if (j < len && pattern[j] === "\"") {
			j++;
			while (j < len) {
				if (pattern[j] === "\"") {
					const next = j + 1;
					if (next >= len || pattern[next] === " ") {
						j++;
						break;
					}
					if (pattern[next] === "$" && (next + 1 >= len || pattern[next + 1] === " ")) {
						j += 2;
						break;
					}
				}
				j++;
			}
			tokens.push(pattern.substring(i, j));
			i = j;
		} else {
			while (j < len && pattern[j] !== " ") j++;
			tokens.push(pattern.substring(i, j));
			i = j;
		}
	}
	return tokens;
}
function getMatch(pattern, exp) {
	const matches = pattern.match(exp);
	return matches ? matches[1] : null;
}
function parseQuery(pattern, options = {}) {
	return pattern.replace(/\\\|/g, ESCAPED_PIPE).split(OR_TOKEN).map((item) => {
		const query = tokenize(item.replace(/\u0000/g, "|").trim()).filter((item) => item && !!item.trim());
		const results = [];
		for (let i = 0, len = query.length; i < len; i += 1) {
			const queryItem = query[i];
			let found = false;
			let idx = -1;
			while (!found && ++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.multiRegex);
				if (token) {
					results.push(def.create(token, options));
					found = true;
				}
			}
			if (found) continue;
			idx = -1;
			while (++idx < matchersLen) {
				const def = matchers[idx];
				const token = getMatch(queryItem, def.singleRegex);
				if (token) {
					results.push(def.create(token, options));
					break;
				}
			}
		}
		return results;
	});
}

//#endregion
//#region src/search/extended/index.ts
var ExtendedSearch = class {
	constructor(pattern, { isCaseSensitive = Config.isCaseSensitive, ignoreDiacritics = Config.ignoreDiacritics, includeMatches = Config.includeMatches, minMatchCharLength = Config.minMatchCharLength, ignoreLocation = Config.ignoreLocation, findAllMatches = Config.findAllMatches, location = Config.location, threshold = Config.threshold, distance = Config.distance } = {}) {
		this.query = null;
		this.options = {
			isCaseSensitive,
			ignoreDiacritics,
			includeMatches,
			minMatchCharLength,
			findAllMatches,
			ignoreLocation,
			location,
			threshold,
			distance
		};
		pattern = isCaseSensitive ? pattern : pattern.toLowerCase();
		pattern = ignoreDiacritics ? stripDiacritics(pattern) : pattern;
		this.pattern = pattern;
		this.query = parseQuery(this.pattern, this.options);
	}
	static condition(_, options) {
		return options.useExtendedSearch;
	}
	searchIn(text) {
		const query = this.query;
		if (!query) return {
			isMatch: false,
			score: 1
		};
		const { includeMatches, isCaseSensitive, ignoreDiacritics } = this.options;
		text = isCaseSensitive ? text : text.toLowerCase();
		text = ignoreDiacritics ? stripDiacritics(text) : text;
		let numMatches = 0;
		const allIndices = [];
		let totalScore = 0;
		let hasInverse = false;
		for (let i = 0, qLen = query.length; i < qLen; i += 1) {
			const searchers = query[i];
			allIndices.length = 0;
			numMatches = 0;
			hasInverse = false;
			for (let j = 0, pLen = searchers.length; j < pLen; j += 1) {
				const matcher = searchers[j];
				const { isMatch, indices, score } = matcher.search(text);
				if (isMatch) {
					numMatches += 1;
					totalScore += score;
					if (isInverse(matcher.type)) hasInverse = true;
					if (includeMatches) if (MULTI_MATCH_TYPES.has(matcher.type)) allIndices.push(...indices);
					else allIndices.push(indices);
				} else {
					totalScore = 0;
					numMatches = 0;
					allIndices.length = 0;
					hasInverse = false;
					break;
				}
			}
			if (numMatches) {
				const result = {
					isMatch: true,
					score: totalScore / numMatches
				};
				if (hasInverse) result.hasInverse = true;
				if (includeMatches) result.indices = mergeIndices(allIndices);
				return result;
			}
		}
		return {
			isMatch: false,
			score: 1
		};
	}
};

//#endregion
//#region src/core/register.ts
const registeredSearchers = [];
function register(...args) {
	registeredSearchers.push(...args);
}
function createSearcher(pattern, options) {
	for (let i = 0, len = registeredSearchers.length; i < len; i += 1) {
		const searcherClass = registeredSearchers[i];
		if (searcherClass.condition(pattern, options)) return new searcherClass(pattern, options);
	}
	return new BitapSearch(pattern, options);
}

//#endregion
//#region src/core/queryParser.ts
const LogicalOperator = {
	AND: "$and",
	OR: "$or"
};
const KeyType = {
	PATH: "$path",
	PATTERN: "$val"
};
const isExpression = (query) => !!(query[LogicalOperator.AND] || query[LogicalOperator.OR]);
const isPath = (query) => !!query[KeyType.PATH];
const isLeaf = (query) => !isArray(query) && isObject(query) && !isExpression(query);
const convertToExplicit = (query) => ({ [LogicalOperator.AND]: Object.keys(query).map((key) => ({ [key]: query[key] })) });
function parse(query, options, { auto = true } = {}) {
	const next = (query) => {
		if (isString(query)) {
			const obj = {
				keyId: null,
				pattern: query
			};
			if (auto) obj.searcher = createSearcher(query, options);
			return obj;
		}
		const keys = Object.keys(query);
		const isQueryPath = isPath(query);
		if (!isQueryPath && keys.length > 1 && !isExpression(query)) return next(convertToExplicit(query));
		if (isLeaf(query)) {
			const key = isQueryPath ? query[KeyType.PATH] : keys[0];
			const pattern = isQueryPath ? query[KeyType.PATTERN] : query[key];
			if (!isString(pattern)) throw new Error(LOGICAL_SEARCH_INVALID_QUERY_FOR_KEY(key));
			const obj = {
				keyId: createKeyId(key),
				pattern
			};
			if (auto) obj.searcher = createSearcher(pattern, options);
			return obj;
		}
		const node = {
			children: [],
			operator: keys[0]
		};
		keys.forEach((key) => {
			const value = query[key];
			if (isArray(value)) value.forEach((item) => {
				node.children.push(next(item));
			});
		});
		return node;
	};
	if (!isExpression(query)) query = convertToExplicit(query);
	return next(query);
}

//#endregion
//#region src/core/computeScore.ts
function computeScoreSingle(matches, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	let totalScore = 1;
	matches.forEach(({ key, norm, score }) => {
		const weight = key ? key.weight : null;
		totalScore *= Math.pow(score === 0 && weight ? Number.EPSILON : score, (weight || 1) * (ignoreFieldNorm ? 1 : norm));
	});
	return totalScore;
}
function computeScore(results, { ignoreFieldNorm = Config.ignoreFieldNorm }) {
	results.forEach((result) => {
		result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
	});
}

//#endregion
//#region src/tools/MaxHeap.ts
var MaxHeap = class {
	constructor(limit) {
		this.limit = limit;
		this.heap = [];
	}
	get size() {
		return this.heap.length;
	}
	shouldInsert(score) {
		return this.size < this.limit || score < this.heap[0].score;
	}
	insert(item) {
		if (this.size < this.limit) {
			this.heap.push(item);
			this._bubbleUp(this.size - 1);
		} else if (item.score < this.heap[0].score) {
			this.heap[0] = item;
			this._sinkDown(0);
		}
	}
	extractSorted(sortFn) {
		return this.heap.sort(sortFn);
	}
	_bubbleUp(i) {
		const heap = this.heap;
		while (i > 0) {
			const parent = i - 1 >> 1;
			if (heap[i].score <= heap[parent].score) break;
			const tmp = heap[i];
			heap[i] = heap[parent];
			heap[parent] = tmp;
			i = parent;
		}
	}
	_sinkDown(i) {
		const heap = this.heap;
		const len = heap.length;
		let largest = i;
		do {
			i = largest;
			const left = 2 * i + 1;
			const right = 2 * i + 2;
			if (left < len && heap[left].score > heap[largest].score) largest = left;
			if (right < len && heap[right].score > heap[largest].score) largest = right;
			if (largest !== i) {
				const tmp = heap[i];
				heap[i] = heap[largest];
				heap[largest] = tmp;
			}
		} while (largest !== i);
	}
};

//#endregion
//#region src/core/formatMatches.ts
function formatMatches(result) {
	const matches = [];
	result.matches.forEach((match) => {
		if (!isDefined(match.indices) || !match.indices.length) return;
		const obj = {
			indices: match.indices,
			value: match.value
		};
		if (match.key) obj.key = match.key.id;
		if (match.idx > -1) obj.refIndex = match.idx;
		matches.push(obj);
	});
	return matches;
}

//#endregion
//#region src/core/format.ts
function format(results, docs, { includeMatches = Config.includeMatches, includeScore = Config.includeScore } = {}) {
	return results.map((result) => {
		const { idx } = result;
		const data = {
			item: docs[idx],
			refIndex: idx
		};
		if (includeMatches) data.matches = formatMatches(result);
		if (includeScore) data.score = result.score;
		return data;
	});
}

//#endregion
//#region src/search/token/analyzer.ts
const DEFAULT_TOKEN = /[\p{L}\p{M}\p{N}_]+/gu;
const warned = /* @__PURE__ */ new WeakSet();
function warnNonGlobal(regex) {
	if (!warned.has(regex)) {
		warned.add(regex);
		console.warn(`[Fuse] tokenize regex ${regex} lacks the global flag; only the first match per text will be returned. Add the 'g' flag.`);
	}
}
function resolveTokenize(tokenize) {
	if (typeof tokenize === "function") {
		let validated = false;
		return (text) => {
			const result = tokenize(text);
			if (!validated) {
				validated = true;
				if (!Array.isArray(result) || result.some((t) => typeof t !== "string")) throw new Error(`[Fuse] tokenize function must return string[]; received ${Array.isArray(result) ? "array containing non-strings" : typeof result}.`);
			}
			return result;
		};
	}
	if (tokenize instanceof RegExp) {
		if (!tokenize.global) warnNonGlobal(tokenize);
		return (text) => text.match(tokenize) || [];
	}
	return (text) => text.match(DEFAULT_TOKEN) || [];
}
function createAnalyzer({ isCaseSensitive = false, ignoreDiacritics = false, tokenize } = {}) {
	const tokenizeFn = resolveTokenize(tokenize);
	return { tokenize(text) {
		if (!isCaseSensitive) text = text.toLowerCase();
		if (ignoreDiacritics) text = stripDiacritics(text);
		return tokenizeFn(text);
	} };
}

//#endregion
//#region src/search/token/index.ts
const MAX_MASK_TERMS = 31;
var TokenSearch = class {
	static condition(_, options) {
		return options.useTokenSearch;
	}
	constructor(pattern, options) {
		this.options = options;
		this.analyzer = createAnalyzer({
			isCaseSensitive: options.isCaseSensitive,
			ignoreDiacritics: options.ignoreDiacritics,
			tokenize: options.tokenize
		});
		const queryTerms = this.analyzer.tokenize(pattern);
		const { df, fieldCount } = options._invertedIndex;
		this.termSearchers = [];
		this.idfWeights = [];
		for (const term of queryTerms) {
			this.termSearchers.push(new BitapSearch(term, {
				location: options.location,
				threshold: options.threshold,
				distance: options.distance,
				includeMatches: options.includeMatches,
				findAllMatches: options.findAllMatches,
				minMatchCharLength: options.minMatchCharLength,
				isCaseSensitive: options.isCaseSensitive,
				ignoreDiacritics: options.ignoreDiacritics,
				ignoreLocation: true
			}));
			const docFreq = df.get(term) || 0;
			const idf = Math.log(1 + (fieldCount - docFreq + .5) / (docFreq + .5));
			this.idfWeights.push(idf);
		}
		this.combineAll = options.tokenMatch === "all";
		this.numTerms = this.termSearchers.length;
		this.useMask = this.numTerms <= 31;
	}
	searchIn(text) {
		if (!this.termSearchers.length) return {
			isMatch: false,
			score: 1
		};
		const allIndices = [];
		let weightedScore = 0;
		let maxPossibleScore = 0;
		let matchedCount = 0;
		let matchedMask = 0;
		const matchedTerms = this.combineAll && !this.useMask ? /* @__PURE__ */ new Set() : null;
		for (let i = 0; i < this.termSearchers.length; i++) {
			const result = this.termSearchers[i].searchIn(text);
			const idf = this.idfWeights[i];
			maxPossibleScore += idf;
			if (result.isMatch) {
				matchedCount++;
				weightedScore += idf * (1 - result.score);
				if (result.indices) allIndices.push(...result.indices);
				if (this.combineAll) if (this.useMask) matchedMask |= 1 << i;
				else matchedTerms.add(i);
			}
		}
		if (matchedCount === 0) return {
			isMatch: false,
			score: 1
		};
		const normalized = maxPossibleScore > 0 ? 1 - weightedScore / maxPossibleScore : 0;
		const searchResult = {
			isMatch: true,
			score: Math.max(.001, normalized)
		};
		if (this.options.includeMatches && allIndices.length) searchResult.indices = mergeIndices(allIndices);
		if (this.combineAll) {
			if (this.useMask) searchResult.matchedMask = matchedMask;
			else searchResult.matchedTerms = matchedTerms;
			searchResult.termCount = this.numTerms;
		}
		return searchResult;
	}
};

//#endregion
//#region src/search/token/InvertedIndex.ts
function addField(index, text, docIdx, analyzer) {
	const tokens = analyzer.tokenize(text);
	if (!tokens.length) return;
	index.fieldCount++;
	index.docFieldCount.set(docIdx, (index.docFieldCount.get(docIdx) || 0) + 1);
	const distinctTerms = new Set(tokens);
	let perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) {
		perDocTerms = /* @__PURE__ */ new Map();
		index.docTermFieldHits.set(docIdx, perDocTerms);
	}
	for (const term of distinctTerms) {
		perDocTerms.set(term, (perDocTerms.get(term) || 0) + 1);
		index.df.set(term, (index.df.get(term) || 0) + 1);
	}
}
function ingestRecord(index, record, keyCount, analyzer) {
	const { i: docIdx, v, $: fields } = record;
	if (v !== void 0) {
		addField(index, v, docIdx, analyzer);
		return;
	}
	if (!fields) return;
	for (let keyIdx = 0; keyIdx < keyCount; keyIdx++) {
		const value = fields[keyIdx];
		if (!value) continue;
		if (Array.isArray(value)) for (const sub of value) addField(index, sub.v, docIdx, analyzer);
		else addField(index, value.v, docIdx, analyzer);
	}
}
function buildInvertedIndex(records, keyCount, analyzer) {
	const index = {
		fieldCount: 0,
		df: /* @__PURE__ */ new Map(),
		docFieldCount: /* @__PURE__ */ new Map(),
		docTermFieldHits: /* @__PURE__ */ new Map()
	};
	for (const record of records) ingestRecord(index, record, keyCount, analyzer);
	return index;
}
function addToInvertedIndex(index, record, keyCount, analyzer) {
	ingestRecord(index, record, keyCount, analyzer);
}
function removeFromInvertedIndex(index, docIdx) {
	const fieldCount = index.docFieldCount.get(docIdx);
	if (fieldCount === void 0) return;
	index.fieldCount -= fieldCount;
	index.docFieldCount.delete(docIdx);
	const perDocTerms = index.docTermFieldHits.get(docIdx);
	if (!perDocTerms) return;
	for (const [term, hits] of perDocTerms) {
		const next = (index.df.get(term) || 0) - hits;
		if (next <= 0) index.df.delete(term);
		else index.df.set(term, next);
	}
	index.docTermFieldHits.delete(docIdx);
}
function removeAndShiftInvertedIndex(index, removedIndices) {
	if (removedIndices.length === 0) return;
	const sorted = Array.from(new Set(removedIndices)).sort((a, b) => a - b);
	for (const idx of sorted) removeFromInvertedIndex(index, idx);
	const shift = (oldIdx) => {
		let lo = 0;
		let hi = sorted.length;
		while (lo < hi) {
			const mid = lo + hi >>> 1;
			if (sorted[mid] < oldIdx) lo = mid + 1;
			else hi = mid;
		}
		return oldIdx - lo;
	};
	const firstRemoved = sorted[0];
	const shiftedDocFieldCount = /* @__PURE__ */ new Map();
	for (const [oldKey, count] of index.docFieldCount) shiftedDocFieldCount.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, count);
	index.docFieldCount = shiftedDocFieldCount;
	const shiftedDocTermFieldHits = /* @__PURE__ */ new Map();
	for (const [oldKey, terms] of index.docTermFieldHits) shiftedDocTermFieldHits.set(oldKey > firstRemoved ? shift(oldKey) : oldKey, terms);
	index.docTermFieldHits = shiftedDocTermFieldHits;
}

//#endregion
//#region src/core/index.ts
var Fuse = class {
	constructor(docs, options, index) {
		this.options = {
			...Config,
			...options
		};
		if (this.options.useExtendedSearch && false)// removed by dead control flow
{}
		if (this.options.useTokenSearch && false)// removed by dead control flow
{}
		this._keyStore = new KeyStore(this.options.keys);
		this._docs = docs;
		this._myIndex = null;
		this._invertedIndex = null;
		this.setCollection(docs, index);
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	_getSearcher(query) {
		if (this._lastQuery === query) return this._lastSearcher;
		const searcher = createSearcher(query, this._invertedIndex ? {
			...this.options,
			_invertedIndex: this._invertedIndex
		} : this.options);
		this._lastQuery = query;
		this._lastSearcher = searcher;
		return searcher;
	}
	setCollection(docs, index) {
		this._docs = docs;
		if (index && !(index instanceof FuseIndex)) throw new Error(INCORRECT_INDEX_TYPE);
		this._myIndex = index || createIndex(this.options.keys, this._docs, {
			getFn: this.options.getFn,
			fieldNormWeight: this.options.fieldNormWeight
		});
		if (this.options.useTokenSearch) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			this._invertedIndex = buildInvertedIndex(this._myIndex.records, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	add(doc) {
		if (!isDefined(doc)) return;
		this._docs.push(doc);
		const record = this._myIndex.add(doc, this._docs.length - 1);
		if (this._invertedIndex && record) {
			const analyzer = createAnalyzer({
				isCaseSensitive: this.options.isCaseSensitive,
				ignoreDiacritics: this.options.ignoreDiacritics,
				tokenize: this.options.tokenize
			});
			addToInvertedIndex(this._invertedIndex, record, this._myIndex.keys.length, analyzer);
		}
		this._invalidateSearcherCache();
	}
	remove(predicate = () => false) {
		const results = [];
		const indicesToRemove = [];
		for (let i = 0, len = this._docs.length; i < len; i += 1) if (predicate(this._docs[i], i)) {
			results.push(this._docs[i]);
			indicesToRemove.push(i);
		}
		if (indicesToRemove.length) {
			if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, indicesToRemove);
			const toRemove = new Set(indicesToRemove);
			this._docs = this._docs.filter((_, i) => !toRemove.has(i));
			this._myIndex.removeAll(indicesToRemove);
			this._invalidateSearcherCache();
		}
		return results;
	}
	removeAt(idx) {
		if (!Number.isInteger(idx) || idx < 0 || idx >= this._docs.length) throw new Error(INVALID_DOC_INDEX);
		if (this._invertedIndex) removeAndShiftInvertedIndex(this._invertedIndex, [idx]);
		const doc = this._docs.splice(idx, 1)[0];
		this._myIndex.removeAt(idx);
		this._invalidateSearcherCache();
		return doc;
	}
	_invalidateSearcherCache() {
		this._lastQuery = null;
		this._lastSearcher = null;
	}
	getIndex() {
		return this._myIndex;
	}
	search(query, options) {
		const { limit = -1 } = options || {};
		const { includeMatches, includeScore, shouldSort, sortFn, ignoreFieldNorm } = this.options;
		if (isString(query) && !query.trim()) {
			let docs = this._docs.map((item, idx) => ({
				item,
				refIndex: idx
			}));
			if (isNumber(limit) && limit > -1) docs = docs.slice(0, limit);
			return docs;
		}
		const useHeap = isNumber(limit) && limit > 0 && isString(query);
		let results;
		if (useHeap) {
			const heap = new MaxHeap(limit);
			if (isString(this._docs[0])) this._searchStringList(query, {
				heap,
				ignoreFieldNorm
			});
			else this._searchObjectList(query, {
				heap,
				ignoreFieldNorm
			});
			results = heap.extractSorted(sortFn);
		} else {
			results = isString(query) ? isString(this._docs[0]) ? this._searchStringList(query) : this._searchObjectList(query) : this._searchLogical(query);
			computeScore(results, { ignoreFieldNorm });
			if (shouldSort) results.sort(sortFn);
			if (isNumber(limit) && limit > -1) results = results.slice(0, limit);
		}
		return format(results, this._docs, {
			includeMatches,
			includeScore
		});
	}
	_searchStringList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { records } = this._myIndex;
		const results = heap ? null : [];
		records.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					value: text,
					norm,
					indices: searchResult.indices
				};
				if (requireAllTokens) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				const matches = [match];
				if (!requireAllTokens || this._coversAllTokens(matches)) {
					const result = {
						item: text,
						idx,
						matches
					};
					if (heap) {
						result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
						if (heap.shouldInsert(result.score)) heap.insert(result);
					} else results.push(result);
				}
			}
		});
		return results;
	}
	_searchLogical(query) {
		const expression = parse(query, this.options);
		const evaluate = (node, item, idx) => {
			if (!("children" in node)) {
				const { keyId, searcher } = node;
				let matches;
				if (keyId === null) {
					matches = [];
					this._myIndex.keys.forEach((key, keyIndex) => {
						matches.push(...this._findMatches({
							key,
							value: item[keyIndex],
							searcher
						}));
					});
				} else matches = this._findMatches({
					key: this._keyStore.get(keyId),
					value: this._myIndex.getValueForItemAtKeyId(item, keyId),
					searcher
				});
				if (matches && matches.length) return [{
					idx,
					item,
					matches
				}];
				return [];
			}
			const { children, operator } = node;
			const res = [];
			for (let i = 0, len = children.length; i < len; i += 1) {
				const child = children[i];
				const result = evaluate(child, item, idx);
				if (result.length) res.push(...result);
				else if (operator === LogicalOperator.AND) return [];
			}
			return res;
		};
		const records = this._myIndex.records;
		const resultMap = /* @__PURE__ */ new Map();
		const results = [];
		records.forEach(({ $: item, i: idx }) => {
			if (isDefined(item)) {
				const expResults = evaluate(expression, item, idx);
				if (expResults.length) {
					if (!resultMap.has(idx)) {
						resultMap.set(idx, {
							idx,
							item,
							matches: []
						});
						results.push(resultMap.get(idx));
					}
					expResults.forEach(({ matches }) => {
						resultMap.get(idx).matches.push(...matches);
					});
				}
			}
		});
		return results;
	}
	_searchObjectList(query, { heap, ignoreFieldNorm } = {}) {
		const searcher = this._getSearcher(query);
		const requireAllTokens = this.options.useTokenSearch && this.options.tokenMatch === "all";
		const { keys, records } = this._myIndex;
		const results = heap ? null : [];
		records.forEach(({ $: item, i: idx }) => {
			if (!isDefined(item)) return;
			const matches = [];
			let anyKeyFailed = false;
			let hasInverse = false;
			keys.forEach((key, keyIndex) => {
				const keyMatches = this._findMatches({
					key,
					value: item[keyIndex],
					searcher
				});
				if (keyMatches.length) {
					matches.push(...keyMatches);
					if (keyMatches[0].hasInverse) hasInverse = true;
				} else anyKeyFailed = true;
			});
			if (hasInverse && anyKeyFailed) return;
			if (matches.length && (!requireAllTokens || this._coversAllTokens(matches))) {
				const result = {
					idx,
					item,
					matches
				};
				if (heap) {
					result.score = computeScoreSingle(result.matches, { ignoreFieldNorm });
					if (heap.shouldInsert(result.score)) heap.insert(result);
				} else results.push(result);
			}
		});
		return results;
	}
	_findMatches({ key, value, searcher }) {
		if (!isDefined(value)) return [];
		const matches = [];
		if (isArray(value)) value.forEach(({ v: text, i: idx, n: norm }) => {
			if (!isDefined(text)) return;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					idx,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		});
		else {
			const { v: text, n: norm } = value;
			const searchResult = searcher.searchIn(text);
			if (searchResult.isMatch) {
				const match = {
					score: searchResult.score,
					key,
					value: text,
					norm,
					indices: searchResult.indices,
					hasInverse: searchResult.hasInverse
				};
				if (searchResult.termCount !== void 0) {
					match.matchedMask = searchResult.matchedMask;
					match.matchedTerms = searchResult.matchedTerms;
					match.termCount = searchResult.termCount;
				}
				matches.push(match);
			}
		}
		return matches;
	}
	_coversAllTokens(matches) {
		const termCount = matches.length ? matches[0].termCount : void 0;
		if (termCount === void 0) return true;
		if (termCount <= 31) {
			let coverage = 0;
			for (let i = 0; i < matches.length; i++) coverage |= matches[i].matchedMask || 0;
			return coverage === 2 ** termCount - 1;
		}
		const coverage = /* @__PURE__ */ new Set();
		for (let i = 0; i < matches.length; i++) {
			const terms = matches[i].matchedTerms;
			if (terms) for (const t of terms) coverage.add(t);
		}
		return coverage.size === termCount;
	}
};

//#endregion
//#region src/entry.ts
Fuse.version = "7.4.2";
Fuse.createIndex = createIndex;
Fuse.parseIndex = parseIndex;
Fuse.config = Config;
Fuse.match = function(pattern, text, options) {
	if (options && options.useTokenSearch) throw new Error(FUSE_MATCH_TOKEN_SEARCH_UNSUPPORTED);
	return createSearcher(pattern, {
		...Config,
		...options
	}).searchIn(text);
};
Fuse.parseQuery = parse;
register(ExtendedSearch);
register(TokenSearch);
Fuse.use = function(...plugins) {
	plugins.forEach((plugin) => register(plugin));
};
var entry_default = Fuse;

//#endregion


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
/* harmony import */ var _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @openfin/cloud-api */ "../../../../node_modules/@openfin/cloud-api/dist/index.js");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search */ "./client/src/search.ts");


/**
 * Initializes the search agent.
 */
async function init() {
    const searchAgentConfiguration = await (0,_search__WEBPACK_IMPORTED_MODULE_1__.init)({
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
    if (searchAgentConfiguration) {
        const searchAgent = await _openfin_cloud_api__WEBPACK_IMPORTED_MODULE_0__.Agent.register(searchAgentConfiguration);
        await searchAgent.setIsReady(true);
    }
}
window.addEventListener("load", async () => {
    await init();
});

})();


//# sourceMappingURL=agent.search.bundle.js.map