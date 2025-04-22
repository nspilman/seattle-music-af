import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_BjHVUQXF.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/","cacheDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/node_modules/.astro/","outDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/dist/","srcDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/","publicDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/public/","buildClientDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/dist/","buildServerDir":"file:///Users/natespilman/Repos/seattle-music-af/seattle-music-af/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/submit-form","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/submit-form\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"submit-form","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/submit-form.ts","pathname":"/api/submit-form","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BDlFe_BK.css"},{"type":"inline","content":".rating-label[data-astro-cid-agrygvml]{display:inline-block;cursor:pointer}.rating-button[data-astro-cid-agrygvml]{display:block;width:1.5rem;height:1.5rem;border-radius:50%;border:2px solid var(--color-border);background-color:var(--color-bg-secondary);transition:all .2s ease}input[data-astro-cid-agrygvml][type=radio]:checked+.rating-button[data-astro-cid-agrygvml]{background-color:var(--color-accent);border-color:var(--color-accent);transform:scale(1.1)}input[data-astro-cid-agrygvml][type=radio]:focus+.rating-button[data-astro-cid-agrygvml]{box-shadow:0 0 0 2px var(--color-accent-light)}.rating-label[data-astro-cid-agrygvml]:hover .rating-button[data-astro-cid-agrygvml]{border-color:var(--color-accent)}\n"}],"routeData":{"route":"/survey","isIndex":false,"type":"page","pattern":"^\\/survey\\/?$","segments":[[{"content":"survey","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/survey.astro","pathname":"/survey","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".typing-container[data-astro-cid-tsqe6jpn]{display:flex;justify-content:center;min-height:5rem;width:100%;max-width:100%;padding:0 1rem}#typed-heading[data-astro-cid-tsqe6jpn]{position:relative}#typed-heading[data-astro-cid-tsqe6jpn]:after{content:\"|\";position:absolute;right:-8px;animation:blink .7s infinite}@keyframes blink{0%,to{opacity:1}50%{opacity:0}}\n"},{"type":"external","src":"/_astro/index.BDlFe_BK.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/pages/survey.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/submit-form@_@ts":"pages/api/submit-form.astro.mjs","\u0000@astro-page:src/pages/survey@_@astro":"pages/survey.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_SpAl7DBn.mjs","/Users/natespilman/Repos/seattle-music-af/seattle-music-af/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/natespilman/Repos/seattle-music-af/seattle-music-af/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DB33jFHd.mjs","/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/SurveyForm.astro?astro&type=script&index=0&lang.ts":"_astro/SurveyForm.astro_astro_type_script_index_0_lang.Dx1v2iqv.js","/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/TypedHeading.astro?astro&type=script&index=0&lang.ts":"_astro/TypedHeading.astro_astro_type_script_index_0_lang.CqvoxD-E.js","/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/posthog.astro?astro&type=script&index=0&lang.ts":"_astro/posthog.astro_astro_type_script_index_0_lang.J6PNvltm.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/SurveyForm.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const s=document.getElementById(\"artist-survey\"),o=document.getElementById(\"form-success\"),t=document.getElementById(\"form-error\"),c=document.getElementById(\"close-success\"),i=document.getElementById(\"close-error\");document.querySelectorAll(\".rating-button\").forEach(r=>{r.addEventListener(\"click\",()=>{const n=r.previousElementSibling;n&&n.type===\"radio\"&&(n.checked=!0)})}),s&&s.addEventListener(\"submit\",async r=>{r.preventDefault();const n=new FormData(s);try{const e=s.querySelector('button[type=\"submit\"]');if(!e)return;const d=e.textContent||\"Submit Survey\";e.textContent=\"Submitting...\",e.disabled=!0;const a=Object.fromEntries(n.entries()),l=await(await fetch(\"/api/submit-form\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(a)})).json();e.textContent=d,e.disabled=!1,l.success?o&&(o.classList.remove(\"hidden\"),s.reset()):t&&t.classList.remove(\"hidden\")}catch(e){console.error(\"Error submitting form:\",e),t&&t.classList.remove(\"hidden\")}}),c&&o&&c.addEventListener(\"click\",()=>{o.classList.add(\"hidden\")}),i&&t&&i.addEventListener(\"click\",()=>{t.classList.add(\"hidden\")})});"],["/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/TypedHeading.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const s=document.getElementById(\"typed-heading\");if(!s){console.error(\"Typed heading element not found\");return}const d=[\"Seattle Music Artist Foundry\",\"#SeattleMusicAF\"];let r=0,e=0,t=!1,n=100,o=1500;function l(){const i=d[r];t?(s.textContent=i.substring(0,e-1),e--,n=50):(s.textContent=i.substring(0,e+1),e++,n=100),!t&&e===i.length?(t=!0,n=o):t&&e===0&&(t=!1,r=(r+1)%d.length),setTimeout(l,n)}l()});"],["/Users/natespilman/Repos/seattle-music-af/seattle-music-af/src/components/posthog.astro?astro&type=script&index=0&lang.ts","(function(g,e){var a,n,i,c;e.__SV||(window.posthog=e,e._i=[],e.init=function(l,u,o){function _(s,t){var p=t.split(\".\");p.length==2&&(s=s[p[0]],t=p[1]),s[t]=function(){s.push([t].concat(Array.prototype.slice.call(arguments,0)))}}(i=g.createElement(\"script\")).type=\"text/javascript\",i.crossOrigin=\"anonymous\",i.async=!0,i.src=u.api_host.replace(\".i.posthog.com\",\"-assets.i.posthog.com\")+\"/static/array.js\",(c=g.getElementsByTagName(\"script\")[0]).parentNode.insertBefore(i,c);var r=e;for(o!==void 0?r=e[o]=[]:o=\"posthog\",r.people=r.people||[],r.toString=function(s){var t=\"posthog\";return o!==\"posthog\"&&(t+=\".\"+o),s||(t+=\" (stub)\"),t},r.people.toString=function(){return r.toString(1)+\".people (stub)\"},a=\"init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing debug getPageViewId captureTraceFeedback captureTraceMetric\".split(\" \"),n=0;n<a.length;n++)_(r,a[n]);e._i.push([l,u,o])},e.__SV=1)})(document,window.posthog||[]);posthog.init(\"phc_bBGlI79RZoVN19fPM4dhF3qieNxo77CVio39BLiKv7N\",{api_host:\"https://us.i.posthog.com\",person_profiles:\"identified_only\"});"]],"assets":["/_astro/index.BDlFe_BK.css","/favicon.png","/seattle.png","/space-needle.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"PXmbhmI1E7WkBSndzoax81LCYZtyvdxrFw1BdYwYybE=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/natespilman/Repos/seattle-music-af/seattle-music-af/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
