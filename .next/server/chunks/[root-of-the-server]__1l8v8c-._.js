module.exports=[70406,(e,t,r)=>{t.exports=e.x("next/dist/compiled/@opentelemetry/api",()=>require("next/dist/compiled/@opentelemetry/api"))},18622,(e,t,r)=>{t.exports=e.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},56704,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(e,t,r)=>{t.exports=e.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(e,t,r)=>{t.exports=e.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},93695,(e,t,r)=>{t.exports=e.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},81111,(e,t,r)=>{t.exports=e.x("node:stream",()=>require("node:stream"))},24361,(e,t,r)=>{t.exports=e.x("util",()=>require("util"))},18739,e=>{"use strict";var t=e.i(89171),r=e.i(79058);async function a(e,{params:i}){try{let{id:e}=await i,[a]=await r.default.query(`SELECT 
        o.order_id,
        o.status,
        o.subtotal,
        o.discount_amount,
        o.net_total,
        o.note,
        o.created_at,
        dt.table_name_or_number AS table_number,
        m.name AS member_name,
        m.phone_number AS member_phone,
        m.total_points AS member_points,
        s.name AS staff_name,
        s.role AS staff_role
      FROM orders o
      LEFT JOIN dining_table dt ON o.table_id = dt.table_id
      LEFT JOIN member m ON o.member_id = m.member_id
      LEFT JOIN staff s ON o.staff_id_opened = s.staff_id
      WHERE o.order_id = ? OR o.order_id LIKE ?
      LIMIT 1`,[e,`${e}%`]);if(0===a.length)return t.NextResponse.json({error:"ไม่พบออเดอร์"},{status:404});let n=a[0],[o]=await r.default.query(`SELECT 
        oi.order_item_id,
        oi.quantity,
        oi.unit_price AS menu_price,
        oi.kitchen_status,
        oi.is_takeaway,
        mi.name AS menu_name,
        mi.image_url,
        mc.name AS category_name
      FROM order_item oi
      JOIN menu_item mi ON oi.menu_id = mi.menu_id
      LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
      WHERE oi.order_id = ?
      ORDER BY oi.created_at ASC`,[n.order_id]);for(let e of o){let[t]=await r.default.query(`SELECT 
          m.name AS modifier_name,
          m.extra_price,
          mg.name AS group_name
        FROM order_item_modifier oim
        JOIN modifier m ON oim.modifier_id = m.modifier_id
        JOIN modifier_group mg ON m.group_id = mg.group_id
        WHERE oim.order_item_id = ?`,[e.order_item_id]);e.modifiers=t}let[s]=await r.default.query(`SELECT 
        payment_id,
        payment_method,
        amount,
        status,
        paid_at AS created_at
      FROM payment
      WHERE order_id = ?
      ORDER BY paid_at ASC`,[n.order_id]),[d]=await r.default.query(`SELECT 
        ledger_id,
        points_changed,
        transaction_type,
        created_at
      FROM point_ledger
      WHERE order_id = ?
      ORDER BY created_at ASC`,[n.order_id]);return t.NextResponse.json({order:n,items:o,payments:s,points:d})}catch(e){return console.error("Order detail API error:",e),t.NextResponse.json({error:e.message,code:e.code},{status:500})}}e.s(["GET",0,a])},13232,e=>{"use strict";var t=e.i(47909),r=e.i(74017),a=e.i(96250),i=e.i(59756),n=e.i(61916),o=e.i(74677),s=e.i(69741),d=e.i(16795),l=e.i(87718),u=e.i(95169),p=e.i(47587),c=e.i(66012),m=e.i(70101),_=e.i(26937),x=e.i(10372),h=e.i(93695);e.i(52474);var R=e.i(220);let f=new t.AppRouteRouteModule({definition:{kind:r.RouteKind.APP_ROUTE,page:"/api/admin/orders/[id]/route",pathname:"/api/admin/orders/[id]",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/admin/orders/[id]/route.js",nextConfigOutput:"",userland:()=>e.r(18739),...{}}),{workAsyncStorage:g,workUnitAsyncStorage:E,serverHooks:v}=f;async function y(e,t,a){a.requestMeta&&(0,i.setRequestMeta)(e,a.requestMeta),f.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let g="/api/admin/orders/[id]/route";g=g.replace(/\/index$/,"")||"/";let E=await f.prepare(e,t,{srcPage:g,multiZoneDraftMode:!1});if(!E)return t.statusCode=400,t.end("Bad Request"),null==a.waitUntil||a.waitUntil.call(a,Promise.resolve()),null;let{buildId:v,deploymentId:y,params:w,nextConfig:A,parsedUrl:C,isDraftMode:S,prerenderManifest:b,routerServerContext:O,isOnDemandRevalidate:N,revalidateOnlyGenerated:T,resolvedPathname:q,clientReferenceManifest:I,serverActionsManifest:P}=E,j=(0,s.normalizeAppPath)(g),H=!!(b.dynamicRoutes[j]||b.routes[q]),k=async()=>((null==O?void 0:O.render404)?await O.render404(e,t,C,!1):t.end("This page could not be found"),null);if(H&&!S){let e=!!b.routes[q],t=b.dynamicRoutes[j];if(t&&!1===t.fallback&&!e){if(A.adapterPath)return await k();throw new h.NoFallbackError}}let M=null;!H||f.isDev||S||(M="/index"===(M=q)?"/":M);let L=!0===f.isDev||!H,F=H&&!L;P&&I&&(0,o.setManifestsSingleton)({page:g,clientReferenceManifest:I,serverActionsManifest:P});let D=e.method||"GET",U=(0,n.getTracer)(),B=U.getActiveScopeSpan(),K=!!(null==O?void 0:O.isWrappedByNextServer),$=!!(0,i.getRequestMeta)(e,"minimalMode"),J=(0,i.getRequestMeta)(e,"incrementalCache")||await f.getIncrementalCache(e,A,b,$);null==J||J.resetRequestCache(),globalThis.__incrementalCache=J;let W={params:w,previewProps:b.preview,renderOpts:{experimental:{authInterrupts:!!A.experimental.authInterrupts,useCacheTimeout:A.experimental.useCacheTimeout},cacheComponents:!!A.cacheComponents,validationLevel:A.experimental.instantInsights.validationLevel,supportsDynamicResponse:L,incrementalCache:J,hmrRefreshHash:(0,i.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:A.cacheLife,staticPageGenerationTimeout:A.staticPageGenerationTimeout,waitUntil:a.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,a,i)=>f.onRequestError(e,t,a,i,O)},sharedContext:{buildId:v,deploymentId:y}},G=new d.NodeNextRequest(e),V=new d.NodeNextResponse(t),X=l.NextRequestAdapter.fromNodeNextRequest(G,(0,l.signalFromNodeResponse)(t)),Y=async({previousCacheEntry:r})=>{try{if(!$&&N&&T&&!r)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await f.handle(X,W);e.fetchMetrics=W.renderOpts.fetchMetrics;let n=W.renderOpts.pendingWaitUntil;n&&a.waitUntil&&(a.waitUntil(n),n=void 0);let o=W.renderOpts.collectedTags;if(!H)return await (0,c.sendResponse)(G,V,i,n),null;{let e=await i.blob(),t=(0,m.toNodeOutgoingHttpHeaders)(i.headers);o&&(t[x.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==W.renderOpts.collectedRevalidate&&!(W.renderOpts.collectedRevalidate>=x.INFINITE_CACHE)&&W.renderOpts.collectedRevalidate,a=void 0===W.renderOpts.collectedExpire||W.renderOpts.collectedExpire>=x.INFINITE_CACHE?!1!==r&&r>0?A.expireTime:void 0:W.renderOpts.collectedExpire;return{value:{kind:R.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==r?void 0:r.isStale)&&await f.onRequestError(e,t,{routerKind:"App Router",routePath:g,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:N})},!1,O),t}},z=async(i,o)=>{try{var s,d;let i=await f.handleResponse({req:e,nextConfig:A,cacheKey:M,routeKind:r.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:b,isRoutePPREnabled:!1,isOnDemandRevalidate:N,revalidateOnlyGenerated:T,responseGenerator:Y,waitUntil:a.waitUntil,isMinimalMode:$});if(!H)return;if((null==i||null==(s=i.value)?void 0:s.kind)!==R.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==i||null==(d=i.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});$||t.setHeader("x-nextjs-cache",N?"REVALIDATED":i.isMiss?"MISS":i.isStale?"STALE":"HIT"),S&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,m.fromNodeOutgoingHttpHeaders)(i.value.headers);$&&H||n.delete(x.NEXT_CACHE_TAGS_HEADER),!i.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,_.getCacheControlHeader)(i.cacheControl)),await (0,c.sendResponse)(G,V,new Response(i.value.body,{headers:n,status:i.value.status||200}));return}catch(t){if(t instanceof h.NoFallbackError||await f.onRequestError(e,t,{routerKind:"App Router",routePath:j,routeType:"route",revalidateReason:(0,p.getRevalidateReason)({isStaticGeneration:F,isOnDemandRevalidate:N})},!1,O),H)throw t;await (0,c.sendResponse)(G,V,new Response(null,{status:500}));return}finally{(()=>{if(!i)return;let e=t.statusCode;i.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(i.setStatus({code:n.SpanStatusCode.ERROR}),i.setAttribute("error.type",e.toString()));let r=U.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==u.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route")||j,s=`${D} ${a}`;i.setAttributes({"next.route":a,"http.route":a,"next.span_name":s}),i.updateName(s),o&&o!==i&&(o.setAttribute("http.route",a),o.updateName(s))})()}};if(K&&B)await z(B,void 0);else{let t=U.getActiveScopeSpan();await U.withPropagatedContext(e.headers,()=>U.trace(u.BaseServerSpan.handleRequest,{spanName:`${D} ${g}`,kind:n.SpanKind.SERVER,attributes:{"http.method":D,"http.target":e.url}},e=>z(e,t)),void 0,!K)}}e.s(["handler",0,y,"patchFetch",0,function(){return(0,a.patchFetch)({workAsyncStorage:g,workUnitAsyncStorage:E})},"routeModule",0,f,"serverHooks",0,v,"workAsyncStorage",0,g,"workUnitAsyncStorage",0,E])}];

//# sourceMappingURL=%5Broot-of-the-server%5D__1l8v8c-._.js.map