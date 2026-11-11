(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/frontend/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
"[project]/frontend/src/app/staff/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>StaffPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/src/app/staff/staff.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
const statusConfig = {
    pending: {
        label: "รอดำเนินการ",
        icon: "⏳",
        color: "orange",
        next: "preparing"
    },
    preparing: {
        label: "กำลังปรุง",
        icon: "🔥",
        color: "blue",
        next: "ready"
    },
    ready: {
        label: "🔔 พร้อมเสิร์ฟ (เชฟตรวจผ่าน QC แล้ว)",
        icon: "⭐",
        color: "green",
        next: "served"
    },
    served: {
        label: "เสิร์ฟแล้ว",
        icon: "✅",
        color: "purple",
        next: null
    },
    cancelled: {
        label: "ยกเลิก",
        icon: "❌",
        color: "red",
        next: null
    }
};
function StaffPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [filterStatus, setFilterStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const [expandedOrder, setExpandedOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastRefresh, setLastRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const fetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "StaffPage.useCallback[fetchOrders]": async ()=>{
            try {
                const response = await fetch("/api/orders");
                const data = await response.json();
                setOrders(data.orders || []);
                setLastRefresh(new Date());
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally{
                setLoading(false);
            }
        }
    }["StaffPage.useCallback[fetchOrders]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "StaffPage.useEffect": ()=>{
            fetchOrders();
            const interval = setInterval(fetchOrders, 5000); // Auto-refresh every 5 seconds
            return ({
                "StaffPage.useEffect": ()=>clearInterval(interval)
            })["StaffPage.useEffect"];
        }
    }["StaffPage.useEffect"], [
        fetchOrders
    ]);
    const handleStatusChange = async (orderId, newStatus)=>{
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: newStatus
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };
    // เสิร์ฟเฉพาะ 1 จาน
    const handleServeItem = async (orderId, orderItemId, e)=>{
        if (e) e.stopPropagation();
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "serve_item",
                    order_item_id: orderItemId
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error serving item:", error);
        }
    };
    // เสิร์ฟเฉพาะรายการที่เชฟทำเสร็จแล้วในออเดอร์นี้
    const handleServeReady = async (orderId, e)=>{
        if (e) e.stopPropagation();
        try {
            const response = await fetch(`/api/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "serve_ready"
                })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error serving ready items:", error);
        }
    };
    const filteredOrders = orders.filter((o)=>{
        if (filterStatus === "all") return true;
        if (filterStatus === "ready") return o.readyCount > 0 || o.status === "ready";
        if (filterStatus === "preparing") return o.cookingCount > 0 && o.readyCount === 0 || o.status === "preparing";
        if (filterStatus === "pending") return o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0 || o.status === "pending";
        if (filterStatus === "served") return o.status === "served" || o.items?.length > 0 && o.servedCount === o.items.length;
        return o.status === filterStatus;
    }).sort((a, b)=>new Date(b.createdAt) - new Date(a.createdAt));
    const orderCounts = {
        all: orders.length,
        pending: orders.filter((o)=>o.pendingCount > 0 && o.cookingCount === 0 && o.readyCount === 0).length,
        preparing: orders.filter((o)=>o.cookingCount > 0 && o.readyCount === 0).length,
        ready: orders.filter((o)=>o.readyCount > 0 || o.status === "ready").length,
        served: orders.filter((o)=>o.status === "served" || o.items?.length > 0 && o.servedCount === o.items.length).length
    };
    const formatTime = (dateStr)=>{
        const d = new Date(dateStr);
        return d.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit"
        });
    };
    const getTimeDiff = (dateStr)=>{
        const diff = Math.floor((new Date() - new Date(dateStr)) / 60000);
        if (diff < 1) return "เมื่อสักครู่";
        if (diff < 60) return `${diff} นาทีที่แล้ว`;
        return `${Math.floor(diff / 60)} ชม.ที่แล้ว`;
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingPage,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "spinner"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/staff/page.js",
                    lineNumber: 128,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "กำลังโหลดข้อมูล..."
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/staff/page.js",
                    lineNumber: 129,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/staff/page.js",
            lineNumber: 127,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                                onClick: ()=>router.push("/"),
                                children: "← กลับ"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerTitle,
                                        children: "ระบบจัดการออเดอร์"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 143,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerSub,
                                        children: [
                                            "อัพเดทล่าสุด: ",
                                            formatTime(lastRefresh)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 144,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 138,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].refreshBtn,
                        onClick: fetchOrders,
                        children: "🔄 รีเฟรช"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stats,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statPending}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.pending
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 159,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "รอดำเนินการ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 160,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statPreparing}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.preparing
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 166,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "กำลังเตรียม"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 167,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statReady}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.ready
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 173,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "พร้อมเสิร์ฟ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statTotal}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statIcon
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statValue,
                                        children: orderCounts.all
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 180,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLabel,
                                        children: "ออเดอร์ทั้งหมด"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 181,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            orderCounts.ready > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    margin: "0 1.5rem 1rem",
                    padding: "0.85rem 1.25rem",
                    background: "rgba(45, 212, 168, 0.15)",
                    border: "1px solid var(--accent-green)",
                    borderRadius: "var(--radius-md)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    animation: "pulse 2s infinite"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "1.4rem"
                                },
                                children: "⭐🔔"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 202,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        style: {
                                            color: "var(--accent-green)"
                                        },
                                        children: [
                                            "มี ",
                                            orderCounts.ready,
                                            " ออเดอร์พร้อมเสิร์ฟ! (เชฟปรุงเสร็จและผ่านการตรวจคุณภาพแล้ว)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 204,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            fontSize: "0.8rem",
                                            color: "var(--text-secondary)"
                                        },
                                        children: "กรุณาตรวจสอบหมายเลขโต๊ะและนำอาหารไปส่งให้ลูกค้า"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 207,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filterBtn,
                        style: {
                            background: "var(--accent-green)",
                            color: "#0a0a0f",
                            fontWeight: 700
                        },
                        onClick: ()=>setFilterStatus("ready"),
                        children: "ดูออเดอร์ที่พร้อมเสิร์ฟ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 188,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filters,
                children: [
                    {
                        key: "all",
                        label: "ทั้งหมด"
                    },
                    {
                        key: "pending",
                        label: "รอ"
                    },
                    {
                        key: "preparing",
                        label: "กำลังเตรียม"
                    },
                    {
                        key: "ready",
                        label: "พร้อมเสิร์ฟ"
                    },
                    {
                        key: "served",
                        label: "เสิร์ฟแล้ว"
                    }
                ].map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filterBtn} ${filterStatus === f.key ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filterActive : ""}`,
                        onClick: ()=>setFilterStatus(f.key),
                        children: [
                            f.label,
                            orderCounts[f.key] > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].filterCount,
                                children: orderCounts[f.key]
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 241,
                                columnNumber: 15
                            }, this)
                        ]
                    }, f.key, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 232,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 224,
                columnNumber: 7
            }, this),
            filteredOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 250,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "ยังไม่มีออเดอร์"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "ออเดอร์ใหม่จะปรากฏที่นี่โดยอัตโนมัติ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 252,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 249,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderGrid,
                children: filteredOrders.map((order)=>{
                    const config = statusConfig[order.status];
                    const isExpanded = expandedOrder === order.id;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCard} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][`order${config.color.charAt(0).toUpperCase() + config.color.slice(1)}`]}`,
                        onClick: ()=>setExpandedOrder(isExpanded ? null : order.id),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardHeader,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCardId,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderId,
                                                children: [
                                                    "#",
                                                    order.id
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 269,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `badge badge-${config.color}`,
                                                children: [
                                                    config.icon,
                                                    " ",
                                                    config.label
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 270,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 268,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderMeta,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTime,
                                                children: formatTime(order.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 275,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTimeDiff,
                                                children: getTimeDiff(order.createdAt)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 278,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 274,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 267,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderCustomer,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customerInfo,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].customerName,
                                                children: [
                                                    order.isMember ? "⭐ " : "",
                                                    order.customerName
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 287,
                                                columnNumber: 21
                                            }, this),
                                            order.tableNumber !== "-" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableNum,
                                                children: [
                                                    "📍 โต๊ะ ",
                                                    order.tableNumber
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 291,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 286,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderTotal,
                                        children: [
                                            "฿",
                                            order.totalAmount?.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 296,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 285,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderProgressSummary,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            "เสิร์ฟแล้ว ",
                                            order.servedCount || 0,
                                            "/",
                                            order.items?.length || 0,
                                            " จาน"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 303,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: "flex",
                                            gap: "8px",
                                            alignItems: "center"
                                        },
                                        children: [
                                            order.readyCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#2dd4a8",
                                                    fontWeight: 700
                                                },
                                                children: [
                                                    "⭐ พร้อมเสิร์ฟ ",
                                                    order.readyCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 308,
                                                columnNumber: 23
                                            }, this),
                                            order.cookingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#60a5fa"
                                                },
                                                children: [
                                                    "🔥 กำลังปรุง ",
                                                    order.cookingCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 313,
                                                columnNumber: 23
                                            }, this),
                                            order.pendingCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: "#fbbf24"
                                                },
                                                children: [
                                                    "⏳ รอคิว ",
                                                    order.pendingCount
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/app/staff/page.js",
                                                lineNumber: 318,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 306,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 302,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItems,
                                children: [
                                    order.items.slice(0, isExpanded ? order.items.length : 5).map((item, idx)=>{
                                        const isReady = item.kitchen_status === "READY";
                                        const isCooking = item.kitchen_status === "COOKING";
                                        const isServed = item.kitchen_status === "SERVED";
                                        const isPending = item.kitchen_status === "PENDING";
                                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItem} ${isReady ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemReadyHighlight : ""} ${isServed ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemServed : ""}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemEmoji,
                                                    children: item.image
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 340,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemDetails,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemHeaderRow,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemName,
                                                                    style: {
                                                                        textDecoration: isServed ? "line-through" : "none"
                                                                    },
                                                                    children: item.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 345,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemQty,
                                                                    children: [
                                                                        "x",
                                                                        item.quantity
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 348,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                                            lineNumber: 344,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderItemSubRow,
                                                            children: [
                                                                item.station_code && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].stationBadge,
                                                                    children: item.station_code
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 354,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadgeReady,
                                                                    children: "⭐ เชฟปรุงเสร็จ พร้อมเสิร์ฟ!"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 359,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isCooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadgeCooking,
                                                                    children: "🔥 กำลังปรุง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 364,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadgePending,
                                                                    children: "⏳ รอคิวปรุง"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 369,
                                                                    columnNumber: 33
                                                                }, this),
                                                                isServed && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadgeServed,
                                                                    children: "✅ เสิร์ฟแล้ว"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                                    lineNumber: 374,
                                                                    columnNumber: 33
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                                            lineNumber: 352,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 343,
                                                    columnNumber: 27
                                                }, this),
                                                isReady && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].serveItemBtn,
                                                    onClick: (e)=>handleServeItem(order.order_id, item.order_item_id, e),
                                                    title: "เสิร์ฟจานนี้ให้ลูกค้าทันที",
                                                    children: "🍽️ เสิร์ฟจานนี้"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/staff/page.js",
                                                    lineNumber: 383,
                                                    columnNumber: 29
                                                }, this)
                                            ]
                                        }, item.order_item_id || idx, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 336,
                                            columnNumber: 25
                                        }, this);
                                    }),
                                    !isExpanded && order.items.length > 5 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].moreItems,
                                        children: [
                                            "+",
                                            order.items.length - 5,
                                            " รายการเพิ่มเติม (คลิกเพื่อดูทั้งหมด)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 402,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 326,
                                columnNumber: 17
                            }, this),
                            order.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderNote,
                                children: [
                                    "📝 ",
                                    order.note
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 410,
                                columnNumber: 19
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderActions,
                                onClick: (e)=>e.stopPropagation(),
                                children: [
                                    order.readyCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtnPrimary,
                                        onClick: (e)=>handleServeReady(order.order_id, e),
                                        children: [
                                            "⭐ เสิร์ฟเฉพาะรายการที่พร้อม (",
                                            order.readyCount,
                                            " จาน)"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 422,
                                        columnNumber: 21
                                    }, this),
                                    order.readyCount === 0 && (order.cookingCount > 0 || order.pendingCount > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].kitchenProgressNotice,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "⏳ ครัวกำลังดำเนินการ (",
                                                order.cookingCount,
                                                " ปรุง, ",
                                                order.pendingCount,
                                                " รอคิว)"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 434,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 433,
                                        columnNumber: 21
                                    }, this),
                                    order.items.length > 0 && order.servedCount === order.items.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].allServedNotice,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                "✅ เสิร์ฟครบทุกรายการแล้ว (",
                                                order.servedCount,
                                                "/",
                                                order.items.length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/staff/page.js",
                                            lineNumber: 441,
                                            columnNumber: 23
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 440,
                                        columnNumber: 21
                                    }, this),
                                    order.status === "pending" && order.servedCount === 0 && order.readyCount === 0 && order.cookingCount === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$staff$2f$staff$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionBtnCancel,
                                        onClick: ()=>handleStatusChange(order.order_id, "cancelled"),
                                        children: "ยกเลิกออเดอร์"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/staff/page.js",
                                        lineNumber: 447,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/staff/page.js",
                                lineNumber: 416,
                                columnNumber: 17
                            }, this)
                        ]
                    }, order.id, true, {
                        fileName: "[project]/frontend/src/app/staff/page.js",
                        lineNumber: 261,
                        columnNumber: 15
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/staff/page.js",
                lineNumber: 255,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/staff/page.js",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_s(StaffPage, "oyWNoTNC6K1EQtpj5AusKc7a890=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = StaffPage;
var _c;
__turbopack_context__.k.register(_c, "StaffPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/staff/staff.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionBtnCancel": "staff-module__DWWnBG__actionBtnCancel",
  "actionBtnPrimary": "staff-module__DWWnBG__actionBtnPrimary",
  "allServedNotice": "staff-module__DWWnBG__allServedNotice",
  "backBtn": "staff-module__DWWnBG__backBtn",
  "container": "staff-module__DWWnBG__container",
  "customerInfo": "staff-module__DWWnBG__customerInfo",
  "customerName": "staff-module__DWWnBG__customerName",
  "emptyIcon": "staff-module__DWWnBG__emptyIcon",
  "emptyState": "staff-module__DWWnBG__emptyState",
  "fadeIn": "staff-module__DWWnBG__fadeIn",
  "fadeInUp": "staff-module__DWWnBG__fadeInUp",
  "filterActive": "staff-module__DWWnBG__filterActive",
  "filterBtn": "staff-module__DWWnBG__filterBtn",
  "filterCount": "staff-module__DWWnBG__filterCount",
  "filters": "staff-module__DWWnBG__filters",
  "header": "staff-module__DWWnBG__header",
  "headerLeft": "staff-module__DWWnBG__headerLeft",
  "headerSub": "staff-module__DWWnBG__headerSub",
  "headerTitle": "staff-module__DWWnBG__headerTitle",
  "itemReadyHighlight": "staff-module__DWWnBG__itemReadyHighlight",
  "itemServed": "staff-module__DWWnBG__itemServed",
  "kitchenProgressNotice": "staff-module__DWWnBG__kitchenProgressNotice",
  "loadingPage": "staff-module__DWWnBG__loadingPage",
  "moreItems": "staff-module__DWWnBG__moreItems",
  "orderActions": "staff-module__DWWnBG__orderActions",
  "orderBlue": "staff-module__DWWnBG__orderBlue",
  "orderCard": "staff-module__DWWnBG__orderCard",
  "orderCardHeader": "staff-module__DWWnBG__orderCardHeader",
  "orderCardId": "staff-module__DWWnBG__orderCardId",
  "orderCustomer": "staff-module__DWWnBG__orderCustomer",
  "orderGreen": "staff-module__DWWnBG__orderGreen",
  "orderGrid": "staff-module__DWWnBG__orderGrid",
  "orderId": "staff-module__DWWnBG__orderId",
  "orderItem": "staff-module__DWWnBG__orderItem",
  "orderItemDetails": "staff-module__DWWnBG__orderItemDetails",
  "orderItemEmoji": "staff-module__DWWnBG__orderItemEmoji",
  "orderItemHeaderRow": "staff-module__DWWnBG__orderItemHeaderRow",
  "orderItemName": "staff-module__DWWnBG__orderItemName",
  "orderItemQty": "staff-module__DWWnBG__orderItemQty",
  "orderItemSubRow": "staff-module__DWWnBG__orderItemSubRow",
  "orderItems": "staff-module__DWWnBG__orderItems",
  "orderMeta": "staff-module__DWWnBG__orderMeta",
  "orderNote": "staff-module__DWWnBG__orderNote",
  "orderOrange": "staff-module__DWWnBG__orderOrange",
  "orderProgressSummary": "staff-module__DWWnBG__orderProgressSummary",
  "orderPurple": "staff-module__DWWnBG__orderPurple",
  "orderRed": "staff-module__DWWnBG__orderRed",
  "orderTime": "staff-module__DWWnBG__orderTime",
  "orderTimeDiff": "staff-module__DWWnBG__orderTimeDiff",
  "orderTotal": "staff-module__DWWnBG__orderTotal",
  "pulse": "staff-module__DWWnBG__pulse",
  "refreshBtn": "staff-module__DWWnBG__refreshBtn",
  "serveItemBtn": "staff-module__DWWnBG__serveItemBtn",
  "slideDown": "staff-module__DWWnBG__slideDown",
  "statCard": "staff-module__DWWnBG__statCard",
  "statIcon": "staff-module__DWWnBG__statIcon",
  "statLabel": "staff-module__DWWnBG__statLabel",
  "statPending": "staff-module__DWWnBG__statPending",
  "statPreparing": "staff-module__DWWnBG__statPreparing",
  "statReady": "staff-module__DWWnBG__statReady",
  "statTotal": "staff-module__DWWnBG__statTotal",
  "statValue": "staff-module__DWWnBG__statValue",
  "stationBadge": "staff-module__DWWnBG__stationBadge",
  "stats": "staff-module__DWWnBG__stats",
  "statusBadgeCooking": "staff-module__DWWnBG__statusBadgeCooking",
  "statusBadgePending": "staff-module__DWWnBG__statusBadgePending",
  "statusBadgeReady": "staff-module__DWWnBG__statusBadgeReady",
  "statusBadgeServed": "staff-module__DWWnBG__statusBadgeServed",
  "tableNum": "staff-module__DWWnBG__tableNum",
});
}),
]);

//# sourceMappingURL=frontend_0s8u_b7._.js.map