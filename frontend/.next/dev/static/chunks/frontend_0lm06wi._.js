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
"[project]/frontend/src/app/chef/chef.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "backBtn": "chef-module__6g3xqW__backBtn",
  "badgeCooking": "chef-module__6g3xqW__badgeCooking",
  "badgeDone": "chef-module__6g3xqW__badgeDone",
  "badgePending": "chef-module__6g3xqW__badgePending",
  "btnAccept": "chef-module__6g3xqW__btnAccept",
  "btnComplete": "chef-module__6g3xqW__btnComplete",
  "card": "chef-module__6g3xqW__card",
  "cardActions": "chef-module__6g3xqW__cardActions",
  "cardCooking": "chef-module__6g3xqW__cardCooking",
  "cardDone": "chef-module__6g3xqW__cardDone",
  "cardHeader": "chef-module__6g3xqW__cardHeader",
  "cardHeaderLeft": "chef-module__6g3xqW__cardHeaderLeft",
  "cardHeaderRight": "chef-module__6g3xqW__cardHeaderRight",
  "cardPending": "chef-module__6g3xqW__cardPending",
  "chefIcon": "chef-module__6g3xqW__chefIcon",
  "chefInfo": "chef-module__6g3xqW__chefInfo",
  "chefName": "chef-module__6g3xqW__chefName",
  "chefTime": "chef-module__6g3xqW__chefTime",
  "doneMsg": "chef-module__6g3xqW__doneMsg",
  "emptyIcon": "chef-module__6g3xqW__emptyIcon",
  "emptyState": "chef-module__6g3xqW__emptyState",
  "emptyText": "chef-module__6g3xqW__emptyText",
  "expandArrow": "chef-module__6g3xqW__expandArrow",
  "fadeIn": "chef-module__6g3xqW__fadeIn",
  "header": "chef-module__6g3xqW__header",
  "headerLeft": "chef-module__6g3xqW__headerLeft",
  "headerSub": "chef-module__6g3xqW__headerSub",
  "headerTitle": "chef-module__6g3xqW__headerTitle",
  "ingredientAmount": "chef-module__6g3xqW__ingredientAmount",
  "ingredientDish": "chef-module__6g3xqW__ingredientDish",
  "ingredientList": "chef-module__6g3xqW__ingredientList",
  "ingredientName": "chef-module__6g3xqW__ingredientName",
  "ingredientRow": "chef-module__6g3xqW__ingredientRow",
  "ingredientsPanel": "chef-module__6g3xqW__ingredientsPanel",
  "ingredientsTitle": "chef-module__6g3xqW__ingredientsTitle",
  "itemEmoji": "chef-module__6g3xqW__itemEmoji",
  "itemList": "chef-module__6g3xqW__itemList",
  "itemName": "chef-module__6g3xqW__itemName",
  "itemQty": "chef-module__6g3xqW__itemQty",
  "itemRow": "chef-module__6g3xqW__itemRow",
  "loadingPage": "chef-module__6g3xqW__loadingPage",
  "main": "chef-module__6g3xqW__main",
  "modalActions": "chef-module__6g3xqW__modalActions",
  "modalBox": "chef-module__6g3xqW__modalBox",
  "modalBtnPrimary": "chef-module__6g3xqW__modalBtnPrimary",
  "modalBtnSecondary": "chef-module__6g3xqW__modalBtnSecondary",
  "modalField": "chef-module__6g3xqW__modalField",
  "modalHeader": "chef-module__6g3xqW__modalHeader",
  "modalIcon": "chef-module__6g3xqW__modalIcon",
  "modalInput": "chef-module__6g3xqW__modalInput",
  "modalItem": "chef-module__6g3xqW__modalItem",
  "modalItemName": "chef-module__6g3xqW__modalItemName",
  "modalItemQty": "chef-module__6g3xqW__modalItemQty",
  "modalLabel": "chef-module__6g3xqW__modalLabel",
  "modalOrderSummary": "chef-module__6g3xqW__modalOrderSummary",
  "modalOverlay": "chef-module__6g3xqW__modalOverlay",
  "modalTitle": "chef-module__6g3xqW__modalTitle",
  "noIngredients": "chef-module__6g3xqW__noIngredients",
  "noteIcon": "chef-module__6g3xqW__noteIcon",
  "orderGrid": "chef-module__6g3xqW__orderGrid",
  "orderId": "chef-module__6g3xqW__orderId",
  "orderIdRow": "chef-module__6g3xqW__orderIdRow",
  "orderNote": "chef-module__6g3xqW__orderNote",
  "page": "chef-module__6g3xqW__page",
  "refreshBtn": "chef-module__6g3xqW__refreshBtn",
  "scaleIn": "chef-module__6g3xqW__scaleIn",
  "statCooking": "chef-module__6g3xqW__statCooking",
  "statDone": "chef-module__6g3xqW__statDone",
  "statItem": "chef-module__6g3xqW__statItem",
  "statLbl": "chef-module__6g3xqW__statLbl",
  "statNum": "chef-module__6g3xqW__statNum",
  "statWait": "chef-module__6g3xqW__statWait",
  "statsBar": "chef-module__6g3xqW__statsBar",
  "statusBadge": "chef-module__6g3xqW__statusBadge",
  "tab": "chef-module__6g3xqW__tab",
  "tabActive": "chef-module__6g3xqW__tabActive",
  "tabBadge": "chef-module__6g3xqW__tabBadge",
  "tableLabel": "chef-module__6g3xqW__tableLabel",
  "tabs": "chef-module__6g3xqW__tabs",
  "timerBox": "chef-module__6g3xqW__timerBox",
  "timerLabel": "chef-module__6g3xqW__timerLabel",
  "timerValue": "chef-module__6g3xqW__timerValue",
});
}),
"[project]/frontend/src/app/chef/page.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChefPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$ingredients$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/ingredients.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/frontend/src/app/chef/chef.module.css [app-client] (css module)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
// ── helpers ──────────────────────────────────────────────────────────────────
function formatTime(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });
}
function elapsedSeconds(startIso) {
    if (!startIso) return 0;
    return Math.floor((Date.now() - new Date(startIso).getTime()) / 1000);
}
function formatDuration(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
// ── CookingTimer component (live countdown) ───────────────────────────────────
function CookingTimer({ startIso, completedAt }) {
    _s();
    const [elapsed, setElapsed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(completedAt ? Math.floor((new Date(completedAt).getTime() - new Date(startIso).getTime()) / 1000) : elapsedSeconds(startIso));
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CookingTimer.useEffect": ()=>{
            if (completedAt) return; // frozen
            const id = setInterval({
                "CookingTimer.useEffect.id": ()=>setElapsed(elapsedSeconds(startIso))
            }["CookingTimer.useEffect.id"], 1000);
            return ({
                "CookingTimer.useEffect": ()=>clearInterval(id)
            })["CookingTimer.useEffect"];
        }
    }["CookingTimer.useEffect"], [
        startIso,
        completedAt
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timerValue,
        children: formatDuration(elapsed)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/chef/page.js",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(CookingTimer, "n4rr4MeVj+EMv3OUAByL8pDyJ6g=");
_c = CookingTimer;
// ── AcceptModal ───────────────────────────────────────────────────────────────
function AcceptModal({ order, onAccept, onClose }) {
    _s1();
    const [chefName, setChefName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AcceptModal.useEffect": ()=>{
            inputRef.current?.focus();
        }
    }["AcceptModal.useEffect"], []);
    const submit = ()=>{
        if (!chefName.trim()) return;
        onAccept(order.id, chefName.trim());
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOverlay,
        onClick: onClose,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalBox,
            onClick: (e)=>e.stopPropagation(),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalHeader,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalIcon,
                            children: "👨‍🍳"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalTitle,
                            children: [
                                "รับออเดอร์ #",
                                order.id
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalOrderSummary,
                    children: order.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalItem,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalItemName,
                                    children: item.name
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/chef/page.js",
                                    lineNumber: 78,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalItemQty,
                                    children: [
                                        "×",
                                        item.quantity
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/chef/page.js",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, i, true, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 77,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalField,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalLabel,
                            children: "ชื่อเชฟ"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            ref: inputRef,
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalInput,
                            type: "text",
                            placeholder: "กรอกชื่อของคุณ...",
                            value: chefName,
                            onChange: (e)=>setChefName(e.target.value),
                            onKeyDown: (e)=>e.key === "Enter" && submit()
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 84,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalActions,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalBtnPrimary,
                            onClick: submit,
                            disabled: !chefName.trim(),
                            children: "✅ รับออเดอร์"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 98,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].modalBtnSecondary,
                            onClick: onClose,
                            children: "ยกเลิก"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 105,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/chef/page.js",
            lineNumber: 69,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/chef/page.js",
        lineNumber: 68,
        columnNumber: 5
    }, this);
}
_s1(AcceptModal, "fJzmHe1F57vbtHoC+x0U6wC3/qE=");
_c1 = AcceptModal;
// ── IngredientsPanel ──────────────────────────────────────────────────────────
function IngredientsPanel({ items }) {
    // Aggregate ingredients across all items in the order
    const allIngredients = items.flatMap((orderItem)=>{
        const baseIngredients = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$ingredients$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["menuIngredients"][orderItem.id];
        if (!baseIngredients) return [];
        return baseIngredients.map((ing)=>({
                ...ing,
                amount: ing.amount * orderItem.quantity,
                dish: orderItem.name
            }));
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientsPanel,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientsTitle,
                children: "🧂 วัตถุดิบที่ต้องใช้"
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 129,
                columnNumber: 7
            }, this),
            allIngredients.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].noIngredients,
                children: "ไม่มีข้อมูลวัตถุดิบ"
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 131,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientList,
                children: allIngredients.map((ing, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientDish,
                                children: ing.dish
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientName,
                                children: ing.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].ingredientAmount,
                                children: [
                                    ing.amount,
                                    " ",
                                    ing.unit
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 135,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 133,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/chef/page.js",
        lineNumber: 128,
        columnNumber: 5
    }, this);
}
_c2 = IngredientsPanel;
// ── OrderCard ─────────────────────────────────────────────────────────────────
function OrderCard({ order, onAccept, onComplete, expanded, onToggle }) {
    const session = order.chefSession;
    const isCooking = session && session.status === "cooking";
    const isDone = session && session.status === "done";
    const isPending = order.status === "pending";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].card} ${isPending ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardPending : isCooking ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardCooking : __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardDone}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeader,
                onClick: onToggle,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeaderLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderIdRow,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderId,
                                        children: [
                                            "#",
                                            order.id
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 170,
                                        columnNumber: 13
                                    }, this),
                                    isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgePending}`,
                                        children: "รอรับ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 172,
                                        columnNumber: 15
                                    }, this),
                                    isCooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeCooking}`,
                                        children: "🔥 กำลังทำ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 177,
                                        columnNumber: 15
                                    }, this),
                                    isDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statusBadge} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].badgeDone}`,
                                        children: "✅ เสร็จแล้ว"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 182,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            order.tableNumber && order.tableNumber !== "-" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tableLabel,
                                children: [
                                    "โต๊ะ ",
                                    order.tableNumber
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 189,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardHeaderRight,
                        children: [
                            session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timerBox,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].timerLabel,
                                        children: "เวลาทำ"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 197,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CookingTimer, {
                                        startIso: session.acceptedAt,
                                        completedAt: session.completedAt
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 198,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].expandArrow,
                                children: expanded ? "▲" : "▼"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 204,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 193,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 167,
                columnNumber: 7
            }, this),
            session && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chefInfo,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chefIcon,
                        children: "👨‍🍳"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 211,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chefName,
                        children: session.chefName
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 212,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chefTime,
                        children: [
                            "รับเมื่อ ",
                            formatTime(session.acceptedAt)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    session.completedAt && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].chefTime,
                        children: [
                            "· เสร็จ ",
                            formatTime(session.completedAt)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 217,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 210,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemList,
                children: order.items.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemRow,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemEmoji,
                                children: item.image || "🍽️"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 228,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemName,
                                children: item.name
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 229,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].itemQty,
                                children: [
                                    "×",
                                    item.quantity
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 230,
                                columnNumber: 13
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 227,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 225,
                columnNumber: 7
            }, this),
            order.note && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderNote,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].noteIcon,
                        children: "📝"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 238,
                        columnNumber: 11
                    }, this),
                    order.note
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 237,
                columnNumber: 9
            }, this),
            expanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IngredientsPanel, {
                items: order.items
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 244,
                columnNumber: 20
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cardActions,
                children: [
                    isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnAccept,
                        onClick: (e)=>{
                            e.stopPropagation();
                            onAccept(order);
                        },
                        children: "👨‍🍳 รับทำ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 249,
                        columnNumber: 11
                    }, this),
                    isCooking && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].btnComplete,
                        onClick: (e)=>{
                            e.stopPropagation();
                            onComplete(order.id);
                        },
                        children: "🔔 ส่งเรียกพนักงาน"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 261,
                        columnNumber: 11
                    }, this),
                    isDone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].doneMsg,
                        children: "พนักงานรับทราบแล้ว — รอเสิร์ฟ"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 273,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 247,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/chef/page.js",
        lineNumber: 157,
        columnNumber: 5
    }, this);
}
_c3 = OrderCard;
function ChefPage() {
    _s2();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [acceptingOrder, setAcceptingOrder] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // order to confirm
    const [expandedId, setExpandedId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [lastRefresh, setLastRefresh] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Date());
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("active"); // 'active' | 'done'
    const fetchOrders = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChefPage.useCallback[fetchOrders]": async ()=>{
            try {
                const res = await fetch("/api/chef");
                const data = await res.json();
                setOrders(data.orders || []);
                setLastRefresh(new Date());
            } catch (err) {
                console.error(err);
            } finally{
                setLoading(false);
            }
        }
    }["ChefPage.useCallback[fetchOrders]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChefPage.useEffect": ()=>{
            fetchOrders();
            const id = setInterval(fetchOrders, 5000);
            return ({
                "ChefPage.useEffect": ()=>clearInterval(id)
            })["ChefPage.useEffect"];
        }
    }["ChefPage.useEffect"], [
        fetchOrders
    ]);
    const handleAccept = async (orderId, chefName)=>{
        try {
            await fetch(`/api/chef/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "accept",
                    chefName
                })
            });
            setAcceptingOrder(null);
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };
    const handleComplete = async (orderId)=>{
        try {
            await fetch(`/api/chef/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "complete"
                })
            });
            fetchOrders();
        } catch (err) {
            console.error(err);
        }
    };
    const activeOrders = orders.filter((o)=>o.status === "pending" || o.chefSession && o.chefSession.status === "cooking");
    const doneOrders = orders.filter((o)=>o.chefSession && o.chefSession.status === "done");
    const counts = {
        pending: orders.filter((o)=>o.status === "pending").length,
        cooking: orders.filter((o)=>o.chefSession && o.chefSession.status === "cooking").length,
        done: doneOrders.length
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loadingPage,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "spinner"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 359,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "กำลังโหลด..."
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 360,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/chef/page.js",
            lineNumber: 358,
            columnNumber: 7
        }, this);
    }
    const displayOrders = tab === "active" ? activeOrders : doneOrders;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].page,
        children: [
            acceptingOrder && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AcceptModal, {
                order: acceptingOrder,
                onAccept: handleAccept,
                onClose: ()=>setAcceptingOrder(null)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 371,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerLeft,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].backBtn,
                                onClick: ()=>router.push("/"),
                                children: "← กลับ"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 381,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerTitle,
                                        children: "🍳 ห้องครัว"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 385,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerSub,
                                        children: [
                                            "อัพเดทล่าสุด ",
                                            formatTime(lastRefresh.toISOString())
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/app/chef/page.js",
                                        lineNumber: 386,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 384,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 380,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].refreshBtn,
                        onClick: fetchOrders,
                        children: "🔄 รีเฟรช"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 379,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statsBar,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statWait}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statNum,
                                children: counts.pending
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 399,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLbl,
                                children: "รอรับ"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 400,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 398,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statCooking}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statNum,
                                children: counts.cooking
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLbl,
                                children: "กำลังทำ"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 404,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 402,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statItem} ${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statDone}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statNum,
                                children: counts.done
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 407,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].statLbl,
                                children: "เสร็จแล้ว"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 406,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 397,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabs,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tab} ${tab === "active" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabActive : ""}`,
                        onClick: ()=>setTab("active"),
                        id: "tab-active",
                        children: [
                            "ออเดอร์ที่ต้องทำ",
                            activeOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBadge,
                                children: activeOrders.length
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 421,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 414,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: `${__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tab} ${tab === "done" ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabActive : ""}`,
                        onClick: ()=>setTab("done"),
                        id: "tab-done",
                        children: [
                            "เสร็จแล้ว",
                            doneOrders.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].tabBadge,
                                children: doneOrders.length
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/app/chef/page.js",
                                lineNumber: 431,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/app/chef/page.js",
                        lineNumber: 424,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 413,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].main,
                children: displayOrders.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyState,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyIcon,
                            children: tab === "active" ? "🥳" : "📋"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 440,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].emptyText,
                            children: tab === "active" ? "ไม่มีออเดอร์ค้างอยู่ — ยอดเยี่ยม!" : "ยังไม่มีออเดอร์ที่เสร็จ"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 443,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 439,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$app$2f$chef$2f$chef$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].orderGrid,
                    children: displayOrders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrderCard, {
                            order: order,
                            onAccept: setAcceptingOrder,
                            onComplete: handleComplete,
                            expanded: expandedId === order.id,
                            onToggle: ()=>setExpandedId(expandedId === order.id ? null : order.id)
                        }, order.id, false, {
                            fileName: "[project]/frontend/src/app/chef/page.js",
                            lineNumber: 452,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/chef/page.js",
                    lineNumber: 450,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/app/chef/page.js",
                lineNumber: 437,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/app/chef/page.js",
        lineNumber: 368,
        columnNumber: 5
    }, this);
}
_s2(ChefPage, "aVw/X+ndctImBdA59crRgf16EmI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c4 = ChefPage;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "CookingTimer");
__turbopack_context__.k.register(_c1, "AcceptModal");
__turbopack_context__.k.register(_c2, "IngredientsPanel");
__turbopack_context__.k.register(_c3, "OrderCard");
__turbopack_context__.k.register(_c4, "ChefPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/ingredients.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Ingredient details for each menu item, keyed by menu item id
// Each ingredient: { name, amount, unit }
__turbopack_context__.s([
    "menuIngredients",
    ()=>menuIngredients
]);
const menuIngredients = {
    // 1 - สลัดแซลมอนรมควัน
    1: [
        {
            name: 'แซลมอนรมควัน',
            amount: 120,
            unit: 'g'
        },
        {
            name: 'ผักสลัดรวม',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'น้ำผึ้ง',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'น้ำมะนาว',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'น้ำมันมะกอก',
            amount: 10,
            unit: 'ml'
        },
        {
            name: 'เกลือ',
            amount: 2,
            unit: 'g'
        },
        {
            name: 'พริกไทยป่น',
            amount: 1,
            unit: 'g'
        }
    ],
    // 2 - เกี๊ยวซ่าหมู
    2: [
        {
            name: 'หมูสับ',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'แผ่นเกี๊ยว',
            amount: 12,
            unit: 'แผ่น'
        },
        {
            name: 'กระเทียม',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'ขิง',
            amount: 5,
            unit: 'g'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'น้ำมันงา',
            amount: 5,
            unit: 'ml'
        },
        {
            name: 'ซอสพอนซึ',
            amount: 30,
            unit: 'ml'
        }
    ],
    // 3 - ปอเปี๊ยะทอดไส้ผัก
    3: [
        {
            name: 'แผ่นปอเปี๊ยะ',
            amount: 8,
            unit: 'แผ่น'
        },
        {
            name: 'วุ้นเส้น',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'กะหล่ำปลี',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'แครอท',
            amount: 40,
            unit: 'g'
        },
        {
            name: 'เห็ดหอม',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'น้ำมันทอด',
            amount: 500,
            unit: 'ml'
        },
        {
            name: 'ซอสบ๊วย',
            amount: 30,
            unit: 'ml'
        }
    ],
    // 4 - ต้มยำกุ้ง
    4: [
        {
            name: 'กุ้งสด',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'เห็ดฟาง',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'ตะไคร้',
            amount: 2,
            unit: 'ต้น'
        },
        {
            name: 'ใบมะกรูด',
            amount: 5,
            unit: 'ใบ'
        },
        {
            name: 'พริกขี้หนู',
            amount: 5,
            unit: 'เม็ด'
        },
        {
            name: 'น้ำมะนาว',
            amount: 30,
            unit: 'ml'
        },
        {
            name: 'น้ำปลา',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'เครื่องแกงต้มยำ',
            amount: 2,
            unit: 'ช้อนโต๊ะ'
        },
        {
            name: 'น้ำซุป',
            amount: 400,
            unit: 'ml'
        }
    ],
    // 5 - แกงเขียวหวานไก่
    5: [
        {
            name: 'เนื้อไก่',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'เครื่องแกงเขียวหวาน',
            amount: 3,
            unit: 'ช้อนโต๊ะ'
        },
        {
            name: 'กะทิ',
            amount: 250,
            unit: 'ml'
        },
        {
            name: 'มะเขือเปราะ',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'ใบโหระพา',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'น้ำตาลปี๊บ',
            amount: 1,
            unit: 'ช้อนโต๊ะ'
        },
        {
            name: 'น้ำปลา',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'ข้าวหอมมะลิ',
            amount: 200,
            unit: 'g'
        }
    ],
    // 6 - ข้าวผัดปู
    6: [
        {
            name: 'ข้าวสวย',
            amount: 300,
            unit: 'g'
        },
        {
            name: 'เนื้อปู',
            amount: 100,
            unit: 'g'
        },
        {
            name: 'ไข่ไก่',
            amount: 2,
            unit: 'ฟอง'
        },
        {
            name: 'ต้นหอม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'กระเทียม',
            amount: 15,
            unit: 'g'
        },
        {
            name: 'น้ำมันพืช',
            amount: 30,
            unit: 'ml'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'น้ำมันหอย',
            amount: 10,
            unit: 'ml'
        }
    ],
    // 7 - กะเพราหมูสับ
    7: [
        {
            name: 'หมูสับ',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'ใบกะเพรา',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'พริกขี้หนู',
            amount: 8,
            unit: 'เม็ด'
        },
        {
            name: 'กระเทียม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'น้ำมันหอย',
            amount: 10,
            unit: 'ml'
        },
        {
            name: 'น้ำตาล',
            amount: 5,
            unit: 'g'
        },
        {
            name: 'ไข่ดาว',
            amount: 1,
            unit: 'ฟอง'
        },
        {
            name: 'ข้าวสวย',
            amount: 200,
            unit: 'g'
        }
    ],
    // 8 - สเต็กเนื้อวากิว
    8: [
        {
            name: 'เนื้อวากิว A5',
            amount: 300,
            unit: 'g'
        },
        {
            name: 'เนย',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'กระเทียม',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'โรสแมรี่',
            amount: 2,
            unit: 'ก้าน'
        },
        {
            name: 'เกลือทะเล',
            amount: 3,
            unit: 'g'
        },
        {
            name: 'พริกไทยดำ',
            amount: 2,
            unit: 'g'
        },
        {
            name: 'ซอสพริกไทยดำ',
            amount: 50,
            unit: 'ml'
        }
    ],
    // 9 - แซลมอนเทอริยากิ
    9: [
        {
            name: 'แซลมอนสด',
            amount: 250,
            unit: 'g'
        },
        {
            name: 'ซอสเทอริยากิ',
            amount: 60,
            unit: 'ml'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'สาเก',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'น้ำตาล',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'ข้าวญี่ปุ่น',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'ผักต้ม',
            amount: 80,
            unit: 'g'
        }
    ],
    // 10 - ผัดกระเพราทะเล
    10: [
        {
            name: 'กุ้ง',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'หมึก',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'หอย',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'ใบกะเพรา',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'พริกสด',
            amount: 10,
            unit: 'เม็ด'
        },
        {
            name: 'กระเทียม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'น้ำมันหอย',
            amount: 15,
            unit: 'ml'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 15,
            unit: 'ml'
        }
    ],
    // 11 - ผัดไทยกุ้งสด
    11: [
        {
            name: 'กุ้งสด',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'เส้นจันท์',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'เต้าหู้เหลือง',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'ไข่ไก่',
            amount: 1,
            unit: 'ฟอง'
        },
        {
            name: 'ซอสผัดไทย',
            amount: 40,
            unit: 'ml'
        },
        {
            name: 'ถั่วป่น',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'ต้นหอม',
            amount: 15,
            unit: 'g'
        },
        {
            name: 'มะนาว',
            amount: 0.5,
            unit: 'ลูก'
        }
    ],
    // 12 - ราเมนหมูชาชู
    12: [
        {
            name: 'เส้นราเมน',
            amount: 180,
            unit: 'g'
        },
        {
            name: 'หมูชาชู',
            amount: 100,
            unit: 'g'
        },
        {
            name: 'น้ำซุปกระดูก',
            amount: 500,
            unit: 'ml'
        },
        {
            name: 'ไข่ยางมะตูม',
            amount: 1,
            unit: 'ฟอง'
        },
        {
            name: 'โนริ',
            amount: 2,
            unit: 'แผ่น'
        },
        {
            name: 'ต้นหอม',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'งาขาว',
            amount: 5,
            unit: 'g'
        },
        {
            name: 'เนย',
            amount: 10,
            unit: 'g'
        }
    ],
    // 13 - บะหมี่เกี๊ยวหมูแดง
    13: [
        {
            name: 'บะหมี่เหนียว',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'หมูแดง',
            amount: 100,
            unit: 'g'
        },
        {
            name: 'เกี๊ยวกุ้ง',
            amount: 4,
            unit: 'ชิ้น'
        },
        {
            name: 'ผักชีฝรั่ง',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'น้ำซุป',
            amount: 300,
            unit: 'ml'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 15,
            unit: 'ml'
        }
    ],
    // 14 - หมูสะเต๊ะ
    14: [
        {
            name: 'เนื้อหมู',
            amount: 300,
            unit: 'g'
        },
        {
            name: 'ผงกะหรี่',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'กะทิ',
            amount: 50,
            unit: 'ml'
        },
        {
            name: 'น้ำตาล',
            amount: 15,
            unit: 'g'
        },
        {
            name: 'น้ำมันพืช',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'ไม้เสียบ',
            amount: 8,
            unit: 'ไม้'
        },
        {
            name: 'ซอสถั่ว',
            amount: 60,
            unit: 'ml'
        },
        {
            name: 'อาจาด',
            amount: 50,
            unit: 'g'
        }
    ],
    // 15 - ซี่โครงหมูบาร์บีคิว
    15: [
        {
            name: 'ซี่โครงหมู',
            amount: 500,
            unit: 'g'
        },
        {
            name: 'ซอส BBQ',
            amount: 80,
            unit: 'ml'
        },
        {
            name: 'น้ำผึ้ง',
            amount: 30,
            unit: 'ml'
        },
        {
            name: 'กระเทียม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'ซอสถั่วเหลือง',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'น้ำส้มสายชู',
            amount: 15,
            unit: 'ml'
        }
    ],
    // 16 - ไก่ย่างจิ้มแจ่ว
    16: [
        {
            name: 'ไก่ทั้งตัว',
            amount: 600,
            unit: 'g'
        },
        {
            name: 'กระเทียม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'ตะไคร้',
            amount: 1,
            unit: 'ต้น'
        },
        {
            name: 'น้ำจิ้มแจ่ว',
            amount: 60,
            unit: 'ml'
        },
        {
            name: 'ข้าวเหนียว',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'เกลือ',
            amount: 5,
            unit: 'g'
        }
    ],
    // 17 - กุ้งเผาเกลือ
    17: [
        {
            name: 'กุ้งแม่น้ำ',
            amount: 300,
            unit: 'g'
        },
        {
            name: 'เกลือหยาบ',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'ตะไคร้',
            amount: 1,
            unit: 'ต้น'
        },
        {
            name: 'ซอสซีฟู้ด',
            amount: 60,
            unit: 'ml'
        }
    ],
    // 18 - ปูนิ่มผัดผงกะหรี่
    18: [
        {
            name: 'ปูนิ่ม',
            amount: 2,
            unit: 'ตัว'
        },
        {
            name: 'ผงกะหรี่',
            amount: 15,
            unit: 'g'
        },
        {
            name: 'หัวหอม',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'พริกชี้ฟ้า',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'ไข่ไก่',
            amount: 1,
            unit: 'ฟอง'
        },
        {
            name: 'น้ำมันพืช',
            amount: 40,
            unit: 'ml'
        },
        {
            name: 'น้ำปลา',
            amount: 10,
            unit: 'ml'
        }
    ],
    // 19 - ปลากะพงนึ่งมะนาว
    19: [
        {
            name: 'ปลากะพง',
            amount: 500,
            unit: 'g'
        },
        {
            name: 'น้ำมะนาว',
            amount: 60,
            unit: 'ml'
        },
        {
            name: 'น้ำปลา',
            amount: 30,
            unit: 'ml'
        },
        {
            name: 'พริกขี้หนู',
            amount: 10,
            unit: 'เม็ด'
        },
        {
            name: 'กระเทียม',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'น้ำตาล',
            amount: 10,
            unit: 'g'
        },
        {
            name: 'ตะไคร้',
            amount: 1,
            unit: 'ต้น'
        }
    ],
    // 20 - ข้าวเหนียวมะม่วง
    20: [
        {
            name: 'ข้าวเหนียวมูล',
            amount: 200,
            unit: 'g'
        },
        {
            name: 'กะทิ',
            amount: 150,
            unit: 'ml'
        },
        {
            name: 'น้ำตาล',
            amount: 40,
            unit: 'g'
        },
        {
            name: 'เกลือ',
            amount: 2,
            unit: 'g'
        },
        {
            name: 'มะม่วงน้ำดอกไม้',
            amount: 1,
            unit: 'ลูก'
        },
        {
            name: 'งาขาวคั่ว',
            amount: 5,
            unit: 'g'
        }
    ],
    // 21 - ลาวาช็อกโกแลตเค้ก
    21: [
        {
            name: 'ช็อกโกแลต 70%',
            amount: 100,
            unit: 'g'
        },
        {
            name: 'เนย',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'ไข่ไก่',
            amount: 2,
            unit: 'ฟอง'
        },
        {
            name: 'แป้งสาลี',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'น้ำตาลทราย',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'ไอศกรีมวานิลลา',
            amount: 1,
            unit: 'สกูป'
        }
    ],
    // 22 - เครปเค้กชาเขียว
    22: [
        {
            name: 'ผงมัทฉะ',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'แป้งสาลี',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'ไข่ไก่',
            amount: 3,
            unit: 'ฟอง'
        },
        {
            name: 'นม',
            amount: 300,
            unit: 'ml'
        },
        {
            name: 'วิปปิ้งครีม',
            amount: 200,
            unit: 'ml'
        },
        {
            name: 'น้ำตาลทราย',
            amount: 60,
            unit: 'g'
        }
    ],
    // 23 - ชาไทยเย็น
    23: [
        {
            name: 'ชาไทย',
            amount: 30,
            unit: 'g'
        },
        {
            name: 'น้ำเดือด',
            amount: 200,
            unit: 'ml'
        },
        {
            name: 'นมข้นจืด',
            amount: 30,
            unit: 'ml'
        },
        {
            name: 'น้ำตาล',
            amount: 20,
            unit: 'g'
        },
        {
            name: 'น้ำแข็ง',
            amount: 150,
            unit: 'g'
        }
    ],
    // 24 - น้ำมะพร้าวปั่น
    24: [
        {
            name: 'น้ำมะพร้าว',
            amount: 250,
            unit: 'ml'
        },
        {
            name: 'เนื้อมะพร้าวอ่อน',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'น้ำแข็ง',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'น้ำตาล',
            amount: 15,
            unit: 'g'
        }
    ],
    // 25 - กาแฟลาเต้เย็น
    25: [
        {
            name: 'เมล็ดกาแฟอาราบิก้า',
            amount: 18,
            unit: 'g'
        },
        {
            name: 'นมสด',
            amount: 180,
            unit: 'ml'
        },
        {
            name: 'น้ำแข็ง',
            amount: 150,
            unit: 'g'
        },
        {
            name: 'น้ำตาลทราย',
            amount: 10,
            unit: 'g'
        }
    ],
    // 26 - สมูทตี้เบอร์รี่
    26: [
        {
            name: 'สตรอว์เบอร์รี่',
            amount: 80,
            unit: 'g'
        },
        {
            name: 'บลูเบอร์รี่',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'ราสเบอร์รี่',
            amount: 50,
            unit: 'g'
        },
        {
            name: 'โยเกิร์ต',
            amount: 100,
            unit: 'ml'
        },
        {
            name: 'น้ำผึ้ง',
            amount: 20,
            unit: 'ml'
        },
        {
            name: 'น้ำแข็ง',
            amount: 100,
            unit: 'g'
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_0lm06wi._.js.map