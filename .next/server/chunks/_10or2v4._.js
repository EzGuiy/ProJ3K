module.exports=[13923,e=>{"use strict";var t=e.i(89171),a=e.i(79058);async function r(){try{let[e]=await a.default.query(`
      SELECT 
        COUNT(*) AS total_orders,
        COALESCE(SUM(net_total), 0) AS total_revenue,
        COUNT(CASE WHEN status = 'OPEN' THEN 1 END) AS open_orders,
        COUNT(CASE WHEN status = 'CLOSED' THEN 1 END) AS closed_orders
      FROM orders
      WHERE DATE(created_at) = CURDATE()
    `),[r]=await a.default.query(`
      SELECT 
        COUNT(*) AS total_tables,
        COUNT(CASE WHEN status = 'AVAILABLE' THEN 1 END) AS available,
        COUNT(CASE WHEN status = 'OCCUPIED' THEN 1 END) AS occupied
      FROM dining_table
    `),[i]=await a.default.query(`
      SELECT 
        COUNT(*) AS total_menus,
        COUNT(CASE WHEN is_available = 1 THEN 1 END) AS available_menus,
        COUNT(CASE WHEN is_available = 0 THEN 1 END) AS unavailable_menus
      FROM menu_item
    `),[n]=await a.default.query(`
      SELECT COUNT(*) AS total_members
      FROM member
    `),[o]=await a.default.query(`
      SELECT 
        COUNT(CASE WHEN oi.kitchen_status = 'PENDING' THEN 1 END) AS pending_items,
        COUNT(CASE WHEN oi.kitchen_status = 'COOKING' THEN 1 END) AS cooking_items,
        COUNT(CASE WHEN oi.kitchen_status = 'READY' THEN 1 END) AS ready_items,
        COUNT(CASE WHEN oi.kitchen_status = 'SERVED' THEN 1 END) AS served_items
      FROM order_item oi
      JOIN orders o ON oi.order_id = o.order_id
      WHERE DATE(o.created_at) = CURDATE()
    `),[s]=await a.default.query(`
      SELECT 
        mi.name,
        mi.price,
        mc.name AS category_name,
        SUM(oi.quantity) AS total_ordered
      FROM order_item oi
      JOIN menu_item mi ON oi.menu_id = mi.menu_id
      LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
      JOIN orders o ON oi.order_id = o.order_id
      WHERE DATE(o.created_at) = CURDATE()
      GROUP BY mi.menu_id, mi.name, mi.price, mc.name
      ORDER BY total_ordered DESC
      LIMIT 5
    `);if(0===s.length){let[e]=await a.default.query(`
        SELECT 
          mi.name,
          mi.price,
          mc.name AS category_name,
          COALESCE(SUM(oi.quantity), 0) AS total_ordered
        FROM menu_item mi
        LEFT JOIN menu_category mc ON mi.category_id = mc.category_id
        LEFT JOIN order_item oi ON oi.menu_id = mi.menu_id
        WHERE mi.is_available = 1
        GROUP BY mi.menu_id, mi.name, mi.price, mc.name
        ORDER BY total_ordered DESC, mi.is_popular DESC
        LIMIT 5
      `);s=e}let[d]=await a.default.query(`
      SELECT 
        DATE(created_at) AS date,
        COUNT(*) AS orders,
        COALESCE(SUM(net_total), 0) AS revenue
      FROM orders
      WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND status = 'CLOSED'
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `);return t.NextResponse.json({today:e[0]||{},tables:r[0]||{},menus:i[0]||{},members:n[0]||{},kitchen:o[0]||{},popularItems:s||[],revenueWeek:d||[]})}catch(e){return console.error("Dashboard API error:",e),t.NextResponse.json({error:e.message,code:e.code},{status:500})}}e.s(["GET",0,r])},86040,e=>{"use strict";var t=e.i(47909),a=e.i(74017),r=e.i(96250),i=e.i(59756),n=e.i(61916),o=e.i(74677),s=e.i(69741),d=e.i(16795),l=e.i(87718),u=e.i(95169),c=e.i(47587),E=e.i(66012),p=e.i(70101),m=e.i(26937),R=e.i(10372),C=e.i(93695);e.i(52474);var N=e.i(220);let h=new t.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/admin/dashboard/route",pathname:"/api/admin/dashboard",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/admin/dashboard/route.js",nextConfigOutput:"",userland:()=>e.r(13923),...{}}),{workAsyncStorage:A,workUnitAsyncStorage:S,serverHooks:_}=h;async function T(e,t,r){r.requestMeta&&(0,i.setRequestMeta)(e,r.requestMeta),h.isDev&&(0,i.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let A="/api/admin/dashboard/route";A=A.replace(/\/index$/,"")||"/";let S=await h.prepare(e,t,{srcPage:A,multiZoneDraftMode:!1});if(!S)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:_,deploymentId:T,params:O,nextConfig:v,parsedUrl:g,isDraftMode:f,prerenderManifest:y,routerServerContext:D,isOnDemandRevalidate:w,revalidateOnlyGenerated:H,resolvedPathname:U,clientReferenceManifest:b,serverActionsManifest:x}=S,I=(0,s.normalizeAppPath)(A),P=!!(y.dynamicRoutes[I]||y.routes[U]),M=async()=>((null==D?void 0:D.render404)?await D.render404(e,t,g,!1):t.end("This page could not be found"),null);if(P&&!f){let e=!!y.routes[U],t=y.dynamicRoutes[I];if(t&&!1===t.fallback&&!e){if(v.adapterPath)return await M();throw new C.NoFallbackError}}let q=null;!P||h.isDev||f||(q="/index"===(q=U)?"/":q);let L=!0===h.isDev||!P,k=P&&!L;x&&b&&(0,o.setManifestsSingleton)({page:A,clientReferenceManifest:b,serverActionsManifest:x});let F=e.method||"GET",W=(0,n.getTracer)(),B=W.getActiveScopeSpan(),G=!!(null==D?void 0:D.isWrappedByNextServer),j=!!(0,i.getRequestMeta)(e,"minimalMode"),K=(0,i.getRequestMeta)(e,"incrementalCache")||await h.getIncrementalCache(e,v,y,j);null==K||K.resetRequestCache(),globalThis.__incrementalCache=K;let Y={params:O,previewProps:y.preview,renderOpts:{experimental:{authInterrupts:!!v.experimental.authInterrupts,useCacheTimeout:v.experimental.useCacheTimeout},cacheComponents:!!v.cacheComponents,validationLevel:v.experimental.instantInsights.validationLevel,supportsDynamicResponse:L,incrementalCache:K,hmrRefreshHash:(0,i.getRequestMeta)(e,"hmrRefreshHash"),cacheLifeProfiles:v.cacheLife,staticPageGenerationTimeout:v.staticPageGenerationTimeout,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,a,r,i)=>h.onRequestError(e,t,r,i,D)},sharedContext:{buildId:_,deploymentId:T}},$=new d.NodeNextRequest(e),J=new d.NodeNextResponse(t),V=l.NextRequestAdapter.fromNodeNextRequest($,(0,l.signalFromNodeResponse)(t)),X=async({previousCacheEntry:a})=>{try{if(!j&&w&&H&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let i=await h.handle(V,Y);e.fetchMetrics=Y.renderOpts.fetchMetrics;let n=Y.renderOpts.pendingWaitUntil;n&&r.waitUntil&&(r.waitUntil(n),n=void 0);let o=Y.renderOpts.collectedTags;if(!P)return await (0,E.sendResponse)($,J,i,n),null;{let e=await i.blob(),t=(0,p.toNodeOutgoingHttpHeaders)(i.headers);o&&(t[R.NEXT_CACHE_TAGS_HEADER]=o),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let a=void 0!==Y.renderOpts.collectedRevalidate&&!(Y.renderOpts.collectedRevalidate>=R.INFINITE_CACHE)&&Y.renderOpts.collectedRevalidate,r=void 0===Y.renderOpts.collectedExpire||Y.renderOpts.collectedExpire>=R.INFINITE_CACHE?!1!==a&&a>0?v.expireTime:void 0:Y.renderOpts.collectedExpire;return{value:{kind:N.CachedRouteKind.APP_ROUTE,status:i.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:a,expire:r}}}}catch(t){throw(null==a?void 0:a.isStale)&&await h.onRequestError(e,t,{routerKind:"App Router",routePath:A,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:w})},!1,D),t}},z=async(i,o)=>{try{var s,d;let i=await h.handleResponse({req:e,nextConfig:v,cacheKey:q,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:y,isRoutePPREnabled:!1,isOnDemandRevalidate:w,revalidateOnlyGenerated:H,responseGenerator:X,waitUntil:r.waitUntil,isMinimalMode:j});if(!P)return;if((null==i||null==(s=i.value)?void 0:s.kind)!==N.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==i||null==(d=i.value)?void 0:d.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});j||t.setHeader("x-nextjs-cache",w?"REVALIDATED":i.isMiss?"MISS":i.isStale?"STALE":"HIT"),f&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let n=(0,p.fromNodeOutgoingHttpHeaders)(i.value.headers);j&&P||n.delete(R.NEXT_CACHE_TAGS_HEADER),!i.cacheControl||t.getHeader("Cache-Control")||n.get("Cache-Control")||n.set("Cache-Control",(0,m.getCacheControlHeader)(i.cacheControl)),await (0,E.sendResponse)($,J,new Response(i.value.body,{headers:n,status:i.value.status||200}));return}catch(t){if(t instanceof C.NoFallbackError||await h.onRequestError(e,t,{routerKind:"App Router",routePath:I,routeType:"route",revalidateReason:(0,c.getRevalidateReason)({isStaticGeneration:k,isOnDemandRevalidate:w})},!1,D),P)throw t;await (0,E.sendResponse)($,J,new Response(null,{status:500}));return}finally{(()=>{if(!i)return;let e=t.statusCode;i.setAttributes({"http.status_code":e,"next.rsc":!1}),e&&e>=500&&(i.setStatus({code:n.SpanStatusCode.ERROR}),i.setAttribute("error.type",e.toString()));let a=W.getRootSpanAttributes();if(!a)return;if(a.get("next.span_type")!==u.BaseServerSpan.handleRequest)return console.warn(`Unexpected root span type '${a.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let r=a.get("next.route")||I,s=`${F} ${r}`;i.setAttributes({"next.route":r,"http.route":r,"next.span_name":s}),i.updateName(s),o&&o!==i&&(o.setAttribute("http.route",r),o.updateName(s))})()}};if(G&&B)await z(B,void 0);else{let t=W.getActiveScopeSpan();await W.withPropagatedContext(e.headers,()=>W.trace(u.BaseServerSpan.handleRequest,{spanName:`${F} ${A}`,kind:n.SpanKind.SERVER,attributes:{"http.method":F,"http.target":e.url}},e=>z(e,t)),void 0,!G)}}e.s(["handler",0,T,"patchFetch",0,function(){return(0,r.patchFetch)({workAsyncStorage:A,workUnitAsyncStorage:S})},"routeModule",0,h,"serverHooks",0,_,"workAsyncStorage",0,A,"workUnitAsyncStorage",0,S])}];

//# sourceMappingURL=_10or2v4._.js.map