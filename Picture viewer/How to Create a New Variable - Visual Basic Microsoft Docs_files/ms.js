/*!
 * 1DS JSLL SKU, 3.1.1
 * Copyright (c) Microsoft and contributors. All rights reserved.
 * (Microsoft Internal Only)
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.oneDS = global.oneDS || {}));
}(this, (function (exports) { 'use strict';

    var strShimFunction = "function";
    var strShimObject = "object";
    var strShimUndefined = "undefined";
    var strShimPrototype = "prototype";
    var strShimHasOwnProperty = "hasOwnProperty";
    function getGlobal$1() {
        if (typeof globalThis !== strShimUndefined && globalThis) {
            return globalThis;
        }
        if (typeof self !== strShimUndefined && self) {
            return self;
        }
        if (typeof window !== strShimUndefined && window) {
            return window;
        }
        if (typeof global !== strShimUndefined && global) {
            return global;
        }
        return null;
    }
    function objCreateFn(obj) {
        var func = Object["create"];
        if (func) {
            return func(obj);
        }
        if (obj == null) {
            return {};
        }
        var type = typeof obj;
        if (type !== strShimObject && type !== strShimFunction) {
            throw new TypeError('Object prototype may only be an Object:' + obj);
        }
        function tmpFunc() { }
        tmpFunc[strShimPrototype] = obj;
        return new tmpFunc();
    }
    function __assignFn(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) {
                if (Object[strShimPrototype][strShimHasOwnProperty].call(s, p)) {
                    t[p] = s[p];
                }
            }
        }
        return t;
    }
    var __extendStaticsFn = function (d, b) {
        __extendStaticsFn = Object["setPrototypeOf"] ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) {
                for (var p in b) {
                    if (b[strShimHasOwnProperty](p)) {
                        d[p] = b[p];
                    }
                }
            };
        return __extendStaticsFn(d, b);
    };
    function __extendsFn(d, b) {
        __extendStaticsFn(d, b);
        function __() { this.constructor = d; }
        d[strShimPrototype] = b === null ? objCreateFn(b) : (__[strShimPrototype] = b[strShimPrototype], new __());
    }
    var globalObj = getGlobal$1() || {};
    (function (root, assignFn, extendsFn) {
        if (!root.__assign) {
            root.__assign = Object.assign || assignFn;
        }
        if (!root.__extends) {
            root.__extends = extendsFn;
        }
    })(globalObj, __assignFn, __extendsFn);
    if (!__assign) {
        __assign = globalObj.__assign;
    }
    if (!__extends) {
        __extends = globalObj.__extends;
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var EventsDiscardedReason = {
        Unknown: 0,
        NonRetryableStatus: 1,
        InvalidEvent: 2,
        SizeLimitExceeded: 3,
        KillSwitch: 4,
        QueueFull: 5
    };

    /*!
     * Microsoft Dynamic Proto Utility, 1.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var Constructor = 'constructor';
    var Prototype = 'prototype';
    var strFunction$1 = 'function';
    var DynInstFuncTable = '_dynInstFuncs';
    var DynProxyTag = '_isDynProxy';
    var DynClassName = '_dynClass';
    var DynClassNamePrefix = '_dynCls$';
    var DynInstChkTag = '_dynInstChk';
    var DynAllowInstChkTag = DynInstChkTag;
    var DynProtoDefaultOptions = '_dfOpts';
    var UnknownValue = '_unknown_';
    var str__Proto$1 = "__proto__";
    var strUseBaseInst = 'useBaseInst';
    var strSetInstFuncs = 'setInstFuncs';
    var Obj = Object;
    var _objGetPrototypeOf$1 = Obj["getPrototypeOf"];
    var _dynamicNames = 0;
    function _hasOwnProperty(obj, prop) {
        return obj && Obj[Prototype].hasOwnProperty.call(obj, prop);
    }
    function _isObjectOrArrayPrototype(target) {
        return target && (target === Obj[Prototype] || target === Array[Prototype]);
    }
    function _isObjectArrayOrFunctionPrototype(target) {
        return _isObjectOrArrayPrototype(target) || target === Function[Prototype];
    }
    function _getObjProto$1(target) {
        if (target) {
            if (_objGetPrototypeOf$1) {
                return _objGetPrototypeOf$1(target);
            }
            var newProto = target[str__Proto$1] || target[Prototype] || target[Constructor];
            if (newProto) {
                return newProto;
            }
        }
        return null;
    }
    function _forEachProp(target, func) {
        var props = [];
        var getOwnProps = Obj["getOwnPropertyNames"];
        if (getOwnProps) {
            props = getOwnProps(target);
        }
        else {
            for (var name_1 in target) {
                if (typeof name_1 === "string" && _hasOwnProperty(target, name_1)) {
                    props.push(name_1);
                }
            }
        }
        if (props && props.length > 0) {
            for (var lp = 0; lp < props.length; lp++) {
                func(props[lp]);
            }
        }
    }
    function _isDynamicCandidate(target, funcName, skipOwn) {
        return (funcName !== Constructor && typeof target[funcName] === strFunction$1 && (skipOwn || _hasOwnProperty(target, funcName)));
    }
    function _throwTypeError(message) {
        throw new TypeError("DynamicProto: " + message);
    }
    function _getInstanceFuncs(thisTarget) {
        var instFuncs = {};
        _forEachProp(thisTarget, function (name) {
            if (!instFuncs[name] && _isDynamicCandidate(thisTarget, name, false)) {
                instFuncs[name] = thisTarget[name];
            }
        });
        return instFuncs;
    }
    function _hasVisited(values, value) {
        for (var lp = values.length - 1; lp >= 0; lp--) {
            if (values[lp] === value) {
                return true;
            }
        }
        return false;
    }
    function _getBaseFuncs(classProto, thisTarget, instFuncs, useBaseInst) {
        function _instFuncProxy(target, funcHost, funcName) {
            var theFunc = funcHost[funcName];
            if (theFunc[DynProxyTag] && useBaseInst) {
                var instFuncTable = target[DynInstFuncTable] || {};
                if (instFuncTable[DynAllowInstChkTag] !== false) {
                    theFunc = (instFuncTable[funcHost[DynClassName]] || {})[funcName] || theFunc;
                }
            }
            return function () {
                return theFunc.apply(target, arguments);
            };
        }
        var baseFuncs = {};
        _forEachProp(instFuncs, function (name) {
            baseFuncs[name] = _instFuncProxy(thisTarget, instFuncs, name);
        });
        var baseProto = _getObjProto$1(classProto);
        var visited = [];
        while (baseProto && !_isObjectArrayOrFunctionPrototype(baseProto) && !_hasVisited(visited, baseProto)) {
            _forEachProp(baseProto, function (name) {
                if (!baseFuncs[name] && _isDynamicCandidate(baseProto, name, !_objGetPrototypeOf$1)) {
                    baseFuncs[name] = _instFuncProxy(thisTarget, baseProto, name);
                }
            });
            visited.push(baseProto);
            baseProto = _getObjProto$1(baseProto);
        }
        return baseFuncs;
    }
    function _getInstFunc(target, funcName, proto, currentDynProtoProxy) {
        var instFunc = null;
        if (target && _hasOwnProperty(proto, DynClassName)) {
            var instFuncTable = target[DynInstFuncTable] || {};
            instFunc = (instFuncTable[proto[DynClassName]] || {})[funcName];
            if (!instFunc) {
                _throwTypeError("Missing [" + funcName + "] " + strFunction$1);
            }
            if (!instFunc[DynInstChkTag] && instFuncTable[DynAllowInstChkTag] !== false) {
                var canAddInst = !_hasOwnProperty(target, funcName);
                var objProto = _getObjProto$1(target);
                var visited = [];
                while (canAddInst && objProto && !_isObjectArrayOrFunctionPrototype(objProto) && !_hasVisited(visited, objProto)) {
                    var protoFunc = objProto[funcName];
                    if (protoFunc) {
                        canAddInst = (protoFunc === currentDynProtoProxy);
                        break;
                    }
                    visited.push(objProto);
                    objProto = _getObjProto$1(objProto);
                }
                try {
                    if (canAddInst) {
                        target[funcName] = instFunc;
                    }
                    instFunc[DynInstChkTag] = 1;
                }
                catch (e) {
                    instFuncTable[DynAllowInstChkTag] = false;
                }
            }
        }
        return instFunc;
    }
    function _getProtoFunc(funcName, proto, currentDynProtoProxy) {
        var protoFunc = proto[funcName];
        if (protoFunc === currentDynProtoProxy) {
            protoFunc = _getObjProto$1(proto)[funcName];
        }
        if (typeof protoFunc !== strFunction$1) {
            _throwTypeError("[" + funcName + "] is not a " + strFunction$1);
        }
        return protoFunc;
    }
    function _populatePrototype(proto, className, target, baseInstFuncs, setInstanceFunc) {
        function _createDynamicPrototype(proto, funcName) {
            var dynProtoProxy = function () {
                var instFunc = _getInstFunc(this, funcName, proto, dynProtoProxy) || _getProtoFunc(funcName, proto, dynProtoProxy);
                return instFunc.apply(this, arguments);
            };
            dynProtoProxy[DynProxyTag] = 1;
            return dynProtoProxy;
        }
        if (!_isObjectOrArrayPrototype(proto)) {
            var instFuncTable = target[DynInstFuncTable] = target[DynInstFuncTable] || {};
            var instFuncs_1 = instFuncTable[className] = (instFuncTable[className] || {});
            if (instFuncTable[DynAllowInstChkTag] !== false) {
                instFuncTable[DynAllowInstChkTag] = !!setInstanceFunc;
            }
            _forEachProp(target, function (name) {
                if (_isDynamicCandidate(target, name, false) && target[name] !== baseInstFuncs[name]) {
                    instFuncs_1[name] = target[name];
                    delete target[name];
                    if (!_hasOwnProperty(proto, name) || (proto[name] && !proto[name][DynProxyTag])) {
                        proto[name] = _createDynamicPrototype(proto, name);
                    }
                }
            });
        }
    }
    function _checkPrototype(classProto, thisTarget) {
        var thisProto = _getObjProto$1(thisTarget);
        while (thisProto && !_isObjectArrayOrFunctionPrototype(thisProto)) {
            if (thisProto === classProto) {
                return true;
            }
            thisProto = _getObjProto$1(thisProto);
        }
        return false;
    }
    function _getObjName(target, unknownValue) {
        if (_hasOwnProperty(target, Prototype)) {
            return target.name || unknownValue || UnknownValue;
        }
        return (((target || {})[Constructor]) || {}).name || unknownValue || UnknownValue;
    }
    function dynamicProto(theClass, target, delegateFunc, options) {
        if (!_hasOwnProperty(theClass, Prototype)) {
            _throwTypeError("theClass is an invalid class definition.");
        }
        var classProto = theClass[Prototype];
        if (!_checkPrototype(classProto, target)) {
            _throwTypeError("[" + _getObjName(theClass) + "] is not in class hierarchy of [" + _getObjName(target) + "]");
        }
        var className = null;
        if (_hasOwnProperty(classProto, DynClassName)) {
            className = classProto[DynClassName];
        }
        else {
            className = DynClassNamePrefix + _getObjName(theClass, "_") + "$" + _dynamicNames;
            _dynamicNames++;
            classProto[DynClassName] = className;
        }
        var perfOptions = dynamicProto[DynProtoDefaultOptions];
        var useBaseInst = !!perfOptions[strUseBaseInst];
        if (useBaseInst && options && options[strUseBaseInst] !== undefined) {
            useBaseInst = !!options[strUseBaseInst];
        }
        var instFuncs = _getInstanceFuncs(target);
        var baseFuncs = _getBaseFuncs(classProto, target, instFuncs, useBaseInst);
        delegateFunc(target, baseFuncs);
        var setInstanceFunc = !!_objGetPrototypeOf$1 && !!perfOptions[strSetInstFuncs];
        if (setInstanceFunc && options) {
            setInstanceFunc = !!options[strSetInstFuncs];
        }
        _populatePrototype(classProto, className, target, instFuncs, setInstanceFunc !== false);
    }
    var perfDefaults = {
        setInstFuncs: true,
        useBaseInst: true
    };
    dynamicProto[DynProtoDefaultOptions] = perfDefaults;

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var LoggingSeverity;
    (function (LoggingSeverity) {
        LoggingSeverity[LoggingSeverity["CRITICAL"] = 1] = "CRITICAL";
        LoggingSeverity[LoggingSeverity["WARNING"] = 2] = "WARNING";
    })(LoggingSeverity || (LoggingSeverity = {}));
    var _InternalMessageId = {
        BrowserDoesNotSupportLocalStorage: 0,
        BrowserCannotReadLocalStorage: 1,
        BrowserCannotReadSessionStorage: 2,
        BrowserCannotWriteLocalStorage: 3,
        BrowserCannotWriteSessionStorage: 4,
        BrowserFailedRemovalFromLocalStorage: 5,
        BrowserFailedRemovalFromSessionStorage: 6,
        CannotSendEmptyTelemetry: 7,
        ClientPerformanceMathError: 8,
        ErrorParsingAISessionCookie: 9,
        ErrorPVCalc: 10,
        ExceptionWhileLoggingError: 11,
        FailedAddingTelemetryToBuffer: 12,
        FailedMonitorAjaxAbort: 13,
        FailedMonitorAjaxDur: 14,
        FailedMonitorAjaxOpen: 15,
        FailedMonitorAjaxRSC: 16,
        FailedMonitorAjaxSend: 17,
        FailedMonitorAjaxGetCorrelationHeader: 18,
        FailedToAddHandlerForOnBeforeUnload: 19,
        FailedToSendQueuedTelemetry: 20,
        FailedToReportDataLoss: 21,
        FlushFailed: 22,
        MessageLimitPerPVExceeded: 23,
        MissingRequiredFieldSpecification: 24,
        NavigationTimingNotSupported: 25,
        OnError: 26,
        SessionRenewalDateIsZero: 27,
        SenderNotInitialized: 28,
        StartTrackEventFailed: 29,
        StopTrackEventFailed: 30,
        StartTrackFailed: 31,
        StopTrackFailed: 32,
        TelemetrySampledAndNotSent: 33,
        TrackEventFailed: 34,
        TrackExceptionFailed: 35,
        TrackMetricFailed: 36,
        TrackPVFailed: 37,
        TrackPVFailedCalc: 38,
        TrackTraceFailed: 39,
        TransmissionFailed: 40,
        FailedToSetStorageBuffer: 41,
        FailedToRestoreStorageBuffer: 42,
        InvalidBackendResponse: 43,
        FailedToFixDepricatedValues: 44,
        InvalidDurationValue: 45,
        TelemetryEnvelopeInvalid: 46,
        CreateEnvelopeError: 47,
        CannotSerializeObject: 48,
        CannotSerializeObjectNonSerializable: 49,
        CircularReferenceDetected: 50,
        ClearAuthContextFailed: 51,
        ExceptionTruncated: 52,
        IllegalCharsInName: 53,
        ItemNotInArray: 54,
        MaxAjaxPerPVExceeded: 55,
        MessageTruncated: 56,
        NameTooLong: 57,
        SampleRateOutOfRange: 58,
        SetAuthContextFailed: 59,
        SetAuthContextFailedAccountName: 60,
        StringValueTooLong: 61,
        StartCalledMoreThanOnce: 62,
        StopCalledWithoutStart: 63,
        TelemetryInitializerFailed: 64,
        TrackArgumentsNotSpecified: 65,
        UrlTooLong: 66,
        SessionStorageBufferFull: 67,
        CannotAccessCookie: 68,
        IdTooLong: 69,
        InvalidEvent: 70,
        FailedMonitorAjaxSetRequestHeader: 71,
        SendBrowserInfoOnUserInit: 72,
        PluginException: 73,
        NotificationException: 74,
        SnippetScriptLoadFailure: 99,
        InvalidInstrumentationKey: 100,
        CannotParseAiBlobValue: 101,
        InvalidContentBlob: 102,
        TrackPageActionEventFailed: 103
    };

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strOnPrefix = "on";
    var strAttachEvent = "attachEvent";
    var strAddEventHelper = "addEventListener";
    var strDetachEvent = "detachEvent";
    var strRemoveEventListener = "removeEventListener";
    var strHasOwnProperty = "hasOwnProperty";
    var ObjClass = Object;
    var ObjProto = ObjClass[strShimPrototype];
    var _objHasOwnProperty = ObjProto[strHasOwnProperty];
    var _objDefineProperty = ObjClass["defineProperty"];
    var _objAssign = ObjClass["assign"];
    function objToString(obj) {
        return ObjProto.toString.call(obj);
    }
    function isUndefined(value) {
        return value === undefined || typeof value === strShimUndefined;
    }
    function isNullOrUndefined(value) {
        return (value === null || isUndefined(value));
    }
    function isNotNullOrUndefined(value) {
        return !isNullOrUndefined(value);
    }
    function hasOwnProperty(obj, prop) {
        return obj && _objHasOwnProperty.call(obj, prop);
    }
    function isObject(value) {
        return typeof value === strShimObject;
    }
    function isFunction(value) {
        return typeof value === strShimFunction;
    }
    function attachEvent(obj, eventNameWithoutOn, handlerRef, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        var result = false;
        if (!isNullOrUndefined(obj)) {
            try {
                if (!isNullOrUndefined(obj[strAddEventHelper])) {
                    obj[strAddEventHelper](eventNameWithoutOn, handlerRef, useCapture);
                    result = true;
                }
                else if (!isNullOrUndefined(obj[strAttachEvent])) {
                    obj[strAttachEvent](strOnPrefix + eventNameWithoutOn, handlerRef);
                    result = true;
                }
            }
            catch (e) {
            }
        }
        return result;
    }
    function detachEvent(obj, eventNameWithoutOn, handlerRef, useCapture) {
        if (useCapture === void 0) { useCapture = false; }
        if (!isNullOrUndefined(obj)) {
            try {
                if (!isNullOrUndefined(obj[strRemoveEventListener])) {
                    obj[strRemoveEventListener](eventNameWithoutOn, handlerRef, useCapture);
                }
                else if (!isNullOrUndefined(obj[strDetachEvent])) {
                    obj[strDetachEvent](strOnPrefix + eventNameWithoutOn, handlerRef);
                }
            }
            catch (e) {
            }
        }
    }
    function normalizeJsName(name) {
        var value = name;
        var match = /([^\w\d_$])/g;
        if (match.test(name)) {
            value = name.replace(match, "_");
        }
        return value;
    }
    function objForEachKey(target, callbackfn) {
        if (target) {
            for (var prop in target) {
                if (_objHasOwnProperty.call(target, prop)) {
                    callbackfn.call(target, prop, target[prop]);
                }
            }
        }
    }
    function strEndsWith(value, search) {
        if (value && search) {
            var searchLen = search.length;
            var valLen = value.length;
            if (value === search) {
                return true;
            }
            else if (valLen >= searchLen) {
                var pos = valLen - 1;
                for (var lp = searchLen - 1; lp >= 0; lp--) {
                    if (value[pos] != search[lp]) {
                        return false;
                    }
                    pos--;
                }
                return true;
            }
        }
        return false;
    }
    function strStartsWith(value, checkValue) {
        var result = false;
        if (value && checkValue) {
            var chkLen = checkValue.length;
            if (value === checkValue) {
                return true;
            }
            else if (value.length >= chkLen) {
                for (var lp = 0; lp < chkLen; lp++) {
                    if (value[lp] !== checkValue[lp]) {
                        return false;
                    }
                }
                result = true;
            }
        }
        return result;
    }
    function strContains(value, search) {
        if (value && search) {
            return value.indexOf(search) !== -1;
        }
        return false;
    }
    function isDate(obj) {
        return objToString(obj) === "[object Date]";
    }
    function isArray(obj) {
        return objToString(obj) === "[object Array]";
    }
    function isError(obj) {
        return objToString(obj) === "[object Error]";
    }
    function isString(value) {
        return typeof value === "string";
    }
    function isNumber(value) {
        return typeof value === "number";
    }
    function isBoolean(value) {
        return typeof value === "boolean";
    }
    function toISOString(date) {
        if (isDate(date)) {
            var pad = function (num) {
                var r = String(num);
                if (r.length === 1) {
                    r = "0" + r;
                }
                return r;
            };
            return date.getUTCFullYear()
                + "-" + pad(date.getUTCMonth() + 1)
                + "-" + pad(date.getUTCDate())
                + "T" + pad(date.getUTCHours())
                + ":" + pad(date.getUTCMinutes())
                + ":" + pad(date.getUTCSeconds())
                + "." + String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5)
                + "Z";
        }
    }
    function arrForEach(arr, callbackfn, thisArg) {
        var len = arr.length;
        for (var idx = 0; idx < len; idx++) {
            if (idx in arr) {
                if (callbackfn.call(thisArg || arr, arr[idx], idx, arr) === -1) {
                    break;
                }
            }
        }
    }
    function arrIndexOf(arr, searchElement, fromIndex) {
        var len = arr.length;
        var from = fromIndex || 0;
        for (var lp = Math.max(from >= 0 ? from : len - Math.abs(from), 0); lp < len; lp++) {
            if (lp in arr && arr[lp] === searchElement) {
                return lp;
            }
        }
        return -1;
    }
    function arrMap(arr, callbackfn, thisArg) {
        var len = arr.length;
        var _this = thisArg || arr;
        var results = new Array(len);
        for (var lp = 0; lp < len; lp++) {
            if (lp in arr) {
                results[lp] = callbackfn.call(_this, arr[lp], arr);
            }
        }
        return results;
    }
    function strTrim(str) {
        if (typeof str !== "string") {
            return str;
        }
        return str.replace(/^\s+|\s+$/g, "");
    }
    var _objKeysHasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString');
    var _objKeysDontEnums = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ];
    function objKeys(obj) {
        var objType = typeof obj;
        if (objType !== strShimFunction && (objType !== strShimObject || obj === null)) {
            throw new TypeError('objKeys called on non-object');
        }
        var result = [];
        for (var prop in obj) {
            if (obj && _objHasOwnProperty.call(obj, prop)) {
                result.push(prop);
            }
        }
        if (_objKeysHasDontEnumBug) {
            var dontEnumsLength = _objKeysDontEnums.length;
            for (var lp = 0; lp < dontEnumsLength; lp++) {
                if (obj && _objHasOwnProperty.call(obj, _objKeysDontEnums[lp])) {
                    result.push(_objKeysDontEnums[lp]);
                }
            }
        }
        return result;
    }
    function objDefineAccessors(target, prop, getProp, setProp) {
        if (_objDefineProperty) {
            try {
                var descriptor = {
                    enumerable: true,
                    configurable: true
                };
                if (getProp) {
                    descriptor.get = getProp;
                }
                if (setProp) {
                    descriptor.set = setProp;
                }
                _objDefineProperty(target, prop, descriptor);
                return true;
            }
            catch (e) {
            }
        }
        return false;
    }
    function dateNow() {
        var dt = Date;
        if (dt.now) {
            return dt.now();
        }
        return new dt().getTime();
    }
    function getExceptionName(object) {
        if (isError(object)) {
            return object.name;
        }
        return "";
    }
    function setValue(target, field, value, valChk, srcChk) {
        var theValue = value;
        if (target) {
            theValue = target[field];
            if (theValue !== value && (!srcChk || srcChk(theValue)) && (!valChk || valChk(value))) {
                theValue = value;
                target[field] = theValue;
            }
        }
        return theValue;
    }
    function getSetValue(target, field, defValue) {
        var theValue;
        if (target) {
            theValue = target[field];
            if (!theValue && isNullOrUndefined(theValue)) {
                theValue = !isUndefined(defValue) ? defValue : {};
                target[field] = theValue;
            }
        }
        else {
            theValue = !isUndefined(defValue) ? defValue : {};
        }
        return theValue;
    }
    function isNotTruthy(value) {
        return !value;
    }
    function isTruthy(value) {
        return !!value;
    }
    function throwError(message) {
        throw new Error(message);
    }
    function optimizeObject(theObject) {
        if (theObject) {
            theObject = ObjClass(_objAssign ? _objAssign({}, theObject) : theObject);
        }
        return theObject;
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strUndefined = strShimUndefined;
    var strObject = strShimObject;
    var strPrototype = strShimPrototype;
    var strFunction = strShimFunction;
    var strWindow = "window";
    var strDocument = "document";
    var strNavigator = "navigator";
    var strHistory = "history";
    var strLocation = "location";
    var strConsole = "console";
    var strPerformance = "performance";
    var strJSON = "JSON";
    var strCrypto = "crypto";
    var strMsCrypto = "msCrypto";
    var strReactNative = "ReactNative";
    var strMsie = "msie";
    var strTrident = "trident/";
    var _isTrident = null;
    var _navUserAgentCheck = null;
    var _enableMocks = false;
    var getGlobal = getGlobal$1;
    function getGlobalInst(name) {
        var gbl = getGlobal();
        if (gbl && gbl[name]) {
            return gbl[name];
        }
        if (name === strWindow && hasWindow()) {
            return window;
        }
        return null;
    }
    function hasWindow() {
        return Boolean(typeof window === strObject && window);
    }
    function getWindow() {
        if (hasWindow()) {
            return window;
        }
        return getGlobalInst(strWindow);
    }
    function hasDocument() {
        return Boolean(typeof document === strObject && document);
    }
    function getDocument() {
        if (hasDocument()) {
            return document;
        }
        return getGlobalInst(strDocument);
    }
    function hasNavigator() {
        return Boolean(typeof navigator === strObject && navigator);
    }
    function getNavigator() {
        if (hasNavigator()) {
            return navigator;
        }
        return getGlobalInst(strNavigator);
    }
    function hasHistory() {
        return Boolean(typeof history === strObject && history);
    }
    function getHistory() {
        if (hasHistory()) {
            return history;
        }
        return getGlobalInst(strHistory);
    }
    function getLocation(checkForMock) {
        if (checkForMock && _enableMocks) {
            var mockLocation = getGlobalInst("__mockLocation");
            if (mockLocation) {
                return mockLocation;
            }
        }
        if (typeof location === strObject && location) {
            return location;
        }
        return getGlobalInst(strLocation);
    }
    function getConsole() {
        if (typeof console !== strUndefined) {
            return console;
        }
        return getGlobalInst(strConsole);
    }
    function getPerformance() {
        return getGlobalInst(strPerformance);
    }
    function hasJSON() {
        return Boolean((typeof JSON === strObject && JSON) || getGlobalInst(strJSON) !== null);
    }
    function getJSON() {
        if (hasJSON()) {
            return JSON || getGlobalInst(strJSON);
        }
        return null;
    }
    function getCrypto() {
        return getGlobalInst(strCrypto);
    }
    function getMsCrypto() {
        return getGlobalInst(strMsCrypto);
    }
    function isReactNative() {
        var nav = getNavigator();
        if (nav && nav.product) {
            return nav.product === strReactNative;
        }
        return false;
    }
    function isIE() {
        var nav = getNavigator();
        if (nav && (nav.userAgent !== _navUserAgentCheck || _isTrident === null)) {
            _navUserAgentCheck = nav.userAgent;
            var userAgent = (_navUserAgentCheck || "").toLowerCase();
            _isTrident = (strContains(userAgent, strMsie) || strContains(userAgent, strTrident));
        }
        return _isTrident;
    }
    function getIEVersion(userAgentStr) {
        if (userAgentStr === void 0) { userAgentStr = null; }
        var myNav = userAgentStr ? userAgentStr.toLowerCase() : "";
        if (!userAgentStr) {
            var navigator_1 = getNavigator() || {};
            myNav = navigator_1 ? (navigator_1.userAgent || "").toLowerCase() : "";
        }
        if (strContains(myNav, strMsie)) {
            return parseInt(myNav.split(strMsie)[1]);
        }
        else if (strContains(myNav, strTrident)) {
            var tridentVer = parseInt(myNav.split(strTrident)[1]);
            if (tridentVer) {
                return tridentVer + 4;
            }
        }
        return null;
    }
    function dumpObj(object) {
        var objectTypeDump = Object[strShimPrototype].toString.call(object);
        var propertyValueDump = "";
        if (objectTypeDump === "[object Error]") {
            propertyValueDump = "{ stack: '" + object.stack + "', message: '" + object.message + "', name: '" + object.name + "'";
        }
        else if (hasJSON()) {
            propertyValueDump = getJSON().stringify(object);
        }
        return objectTypeDump + propertyValueDump;
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var AiNonUserActionablePrefix = "AI (Internal): ";
    var AiUserActionablePrefix = "AI: ";
    var AIInternalMessagePrefix = "AITR_";
    function _sanitizeDiagnosticText(text) {
        if (text) {
            return "\"" + text.replace(/\"/g, "") + "\"";
        }
        return "";
    }
    var _InternalLogMessage = /** @class */ (function () {
        function _InternalLogMessage(msgId, msg, isUserAct, properties) {
            if (isUserAct === void 0) { isUserAct = false; }
            var _self = this;
            _self.messageId = msgId;
            _self.message =
                (isUserAct ? AiUserActionablePrefix : AiNonUserActionablePrefix) +
                    msgId;
            var strProps = "";
            if (hasJSON()) {
                strProps = getJSON().stringify(properties);
            }
            var diagnosticText = (msg ? " message:" + _sanitizeDiagnosticText(msg) : "") +
                (properties ? " props:" + _sanitizeDiagnosticText(strProps) : "");
            _self.message += diagnosticText;
        }
        _InternalLogMessage.dataType = "MessageData";
        return _InternalLogMessage;
    }());
    function safeGetLogger(core, config) {
        return (core || {}).logger || new DiagnosticLogger(config);
    }
    var DiagnosticLogger = /** @class */ (function () {
        function DiagnosticLogger(config) {
            this.identifier = 'DiagnosticLogger';
            this.queue = [];
            var _messageCount = 0;
            var _messageLogged = {};
            dynamicProto(DiagnosticLogger, this, function (_self) {
                if (isNullOrUndefined(config)) {
                    config = {};
                }
                _self.consoleLoggingLevel = function () { return _getConfigValue('loggingLevelConsole', 0); };
                _self.telemetryLoggingLevel = function () { return _getConfigValue('loggingLevelTelemetry', 1); };
                _self.maxInternalMessageLimit = function () { return _getConfigValue('maxMessageLimit', 25); };
                _self.enableDebugExceptions = function () { return _getConfigValue('enableDebugExceptions', false); };
                _self.throwInternal = function (severity, msgId, msg, properties, isUserAct) {
                    if (isUserAct === void 0) { isUserAct = false; }
                    var message = new _InternalLogMessage(msgId, msg, isUserAct, properties);
                    if (_self.enableDebugExceptions()) {
                        throw message;
                    }
                    else {
                        if (!isUndefined(message) && !!message && !isUndefined(message.message)) {
                            var logLevel = _self.consoleLoggingLevel();
                            if (isUserAct) {
                                var messageKey = +message.messageId;
                                if (!_messageLogged[messageKey] && logLevel >= LoggingSeverity.WARNING) {
                                    _self.warnToConsole(message.message);
                                    _messageLogged[messageKey] = true;
                                }
                            }
                            else {
                                if (logLevel >= LoggingSeverity.WARNING) {
                                    _self.warnToConsole(message.message);
                                }
                            }
                            _self.logInternalMessage(severity, message);
                        }
                    }
                };
                _self.warnToConsole = function (message) {
                    var theConsole = getConsole();
                    if (!!theConsole) {
                        var logFunc = 'log';
                        if (theConsole.warn) {
                            logFunc = 'warn';
                        }
                        if (isFunction(theConsole[logFunc])) {
                            theConsole[logFunc](message);
                        }
                    }
                };
                _self.resetInternalMessageCount = function () {
                    _messageCount = 0;
                    _messageLogged = {};
                };
                _self.logInternalMessage = function (severity, message) {
                    if (_areInternalMessagesThrottled()) {
                        return;
                    }
                    var logMessage = true;
                    var messageKey = AIInternalMessagePrefix + message.messageId;
                    if (_messageLogged[messageKey]) {
                        logMessage = false;
                    }
                    else {
                        _messageLogged[messageKey] = true;
                    }
                    if (logMessage) {
                        if (severity <= _self.telemetryLoggingLevel()) {
                            _self.queue.push(message);
                            _messageCount++;
                        }
                        if (_messageCount === _self.maxInternalMessageLimit()) {
                            var throttleLimitMessage = "Internal events throttle limit per PageView reached for this app.";
                            var throttleMessage = new _InternalLogMessage(_InternalMessageId.MessageLimitPerPVExceeded, throttleLimitMessage, false);
                            _self.queue.push(throttleMessage);
                            _self.warnToConsole(throttleLimitMessage);
                        }
                    }
                };
                function _getConfigValue(name, defValue) {
                    var value = config[name];
                    if (!isNullOrUndefined(value)) {
                        return value;
                    }
                    return defValue;
                }
                function _areInternalMessagesThrottled() {
                    return _messageCount >= _self.maxInternalMessageLimit();
                }
            });
        }
        return DiagnosticLogger;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strExecutionContextKey = "ctx";
    var PerfEvent = /** @class */ (function () {
        function PerfEvent(name, payloadDetails, isAsync) {
            var _self = this;
            var accessorDefined = false;
            _self.start = dateNow();
            _self.name = name;
            _self.isAsync = isAsync;
            _self.isChildEvt = function () { return false; };
            if (isFunction(payloadDetails)) {
                var theDetails_1;
                accessorDefined = objDefineAccessors(_self, 'payload', function () {
                    if (!theDetails_1 && isFunction(payloadDetails)) {
                        theDetails_1 = payloadDetails();
                        payloadDetails = null;
                    }
                    return theDetails_1;
                });
            }
            _self.getCtx = function (key) {
                if (key) {
                    if (key === PerfEvent.ParentContextKey || key === PerfEvent.ChildrenContextKey) {
                        return _self[key];
                    }
                    return (_self[strExecutionContextKey] || {})[key];
                }
                return null;
            };
            _self.setCtx = function (key, value) {
                if (key) {
                    if (key === PerfEvent.ParentContextKey) {
                        if (!_self[key]) {
                            _self.isChildEvt = function () { return true; };
                        }
                        _self[key] = value;
                    }
                    else if (key === PerfEvent.ChildrenContextKey) {
                        _self[key] = value;
                    }
                    else {
                        var ctx = _self[strExecutionContextKey] = _self[strExecutionContextKey] || {};
                        ctx[key] = value;
                    }
                }
            };
            _self.complete = function () {
                var childTime = 0;
                var childEvts = _self.getCtx(PerfEvent.ChildrenContextKey);
                if (isArray(childEvts)) {
                    for (var lp = 0; lp < childEvts.length; lp++) {
                        var childEvt = childEvts[lp];
                        if (childEvt) {
                            childTime += childEvt.time;
                        }
                    }
                }
                _self.time = dateNow() - _self.start;
                _self.exTime = _self.time - childTime;
                _self.complete = function () { };
                if (!accessorDefined && isFunction(payloadDetails)) {
                    _self.payload = payloadDetails();
                }
            };
        }
        PerfEvent.ParentContextKey = "parent";
        PerfEvent.ChildrenContextKey = "childEvts";
        return PerfEvent;
    }());
    var PerfManager = /** @class */ (function () {
        function PerfManager(manager) {
            this.ctx = {};
            dynamicProto(PerfManager, this, function (_self) {
                _self.create = function (src, payloadDetails, isAsync) {
                    return new PerfEvent(src, payloadDetails, isAsync);
                };
                _self.fire = function (perfEvent) {
                    if (perfEvent) {
                        perfEvent.complete();
                        if (manager) {
                            manager.perfEvent(perfEvent);
                        }
                    }
                };
                _self.setCtx = function (key, value) {
                    if (key) {
                        var ctx = _self[strExecutionContextKey] = _self[strExecutionContextKey] || {};
                        ctx[key] = value;
                    }
                };
                _self.getCtx = function (key) {
                    return (_self[strExecutionContextKey] || {})[key];
                };
            });
        }
        return PerfManager;
    }());
    var doPerfActiveKey = "CoreUtils.doPerf";
    function doPerf(mgrSource, getSource, func, details, isAsync) {
        if (mgrSource) {
            var perfMgr = mgrSource;
            if (perfMgr && isFunction(perfMgr["getPerfMgr"])) {
                perfMgr = perfMgr["getPerfMgr"]();
            }
            if (perfMgr) {
                var perfEvt = void 0;
                var currentActive = perfMgr.getCtx(doPerfActiveKey);
                try {
                    perfEvt = perfMgr.create(getSource(), details, isAsync);
                    if (perfEvt) {
                        if (currentActive && perfEvt.setCtx) {
                            perfEvt.setCtx(PerfEvent.ParentContextKey, currentActive);
                            if (currentActive.getCtx && currentActive.setCtx) {
                                var children = currentActive.getCtx(PerfEvent.ChildrenContextKey);
                                if (!children) {
                                    children = [];
                                    currentActive.setCtx(PerfEvent.ChildrenContextKey, children);
                                }
                                children.push(perfEvt);
                            }
                        }
                        perfMgr.setCtx(doPerfActiveKey, perfEvt);
                        return func(perfEvt);
                    }
                }
                catch (ex) {
                    if (perfEvt && perfEvt.setCtx) {
                        perfEvt.setCtx("exception", ex);
                    }
                }
                finally {
                    if (perfEvt) {
                        perfMgr.fire(perfEvt);
                    }
                    perfMgr.setCtx(doPerfActiveKey, currentActive);
                }
            }
        }
        return func();
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var TelemetryPluginChain = /** @class */ (function () {
        function TelemetryPluginChain(plugin, defItemCtx) {
            var _self = this;
            var _nextProxy = null;
            var _hasProcessTelemetry = isFunction(plugin.processTelemetry);
            var _hasSetNext = isFunction(plugin.setNextPlugin);
            _self._hasRun = false;
            _self.getPlugin = function () {
                return plugin;
            };
            _self.getNext = function () {
                return _nextProxy;
            };
            _self.setNext = function (nextPlugin) {
                _nextProxy = nextPlugin;
            };
            _self.processTelemetry = function (env, itemCtx) {
                if (!itemCtx) {
                    itemCtx = defItemCtx;
                }
                var identifier = plugin ? plugin.identifier : "TelemetryPluginChain";
                doPerf(itemCtx ? itemCtx.core() : null, function () { return identifier + ":processTelemetry"; }, function () {
                    if (plugin && _hasProcessTelemetry) {
                        _self._hasRun = true;
                        try {
                            itemCtx.setNext(_nextProxy);
                            if (_hasSetNext) {
                                plugin.setNextPlugin(_nextProxy);
                            }
                            _nextProxy && (_nextProxy._hasRun = false);
                            plugin.processTelemetry(env, itemCtx);
                        }
                        catch (error) {
                            var hasRun = _nextProxy && _nextProxy._hasRun;
                            if (!_nextProxy || !hasRun) {
                                itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.PluginException, "Plugin [" + plugin.identifier + "] failed during processTelemetry - " + error);
                            }
                            if (_nextProxy && !hasRun) {
                                _nextProxy.processTelemetry(env, itemCtx);
                            }
                        }
                    }
                    else if (_nextProxy) {
                        _self._hasRun = true;
                        _nextProxy.processTelemetry(env, itemCtx);
                    }
                }, function () { return ({ item: env }); }, !(env.sync));
            };
        }
        return TelemetryPluginChain;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    function _createProxyChain(plugins, itemCtx) {
        var proxies = [];
        if (plugins && plugins.length > 0) {
            var lastProxy = null;
            for (var idx = 0; idx < plugins.length; idx++) {
                var thePlugin = plugins[idx];
                if (thePlugin && isFunction(thePlugin.processTelemetry)) {
                    var newProxy = new TelemetryPluginChain(thePlugin, itemCtx);
                    proxies.push(newProxy);
                    if (lastProxy) {
                        lastProxy.setNext(newProxy);
                    }
                    lastProxy = newProxy;
                }
            }
        }
        return proxies.length > 0 ? proxies[0] : null;
    }
    function _copyProxyChain(proxy, itemCtx, startAt) {
        var plugins = [];
        var add = startAt ? false : true;
        if (proxy) {
            while (proxy) {
                var thePlugin = proxy.getPlugin();
                if (add || thePlugin === startAt) {
                    add = true;
                    plugins.push(thePlugin);
                }
                proxy = proxy.getNext();
            }
        }
        if (!add) {
            plugins.push(startAt);
        }
        return _createProxyChain(plugins, itemCtx);
    }
    function _copyPluginChain(srcPlugins, itemCtx, startAt) {
        var plugins = srcPlugins;
        var add = false;
        if (startAt && srcPlugins) {
            plugins = [];
            arrForEach(srcPlugins, function (thePlugin) {
                if (add || thePlugin === startAt) {
                    add = true;
                    plugins.push(thePlugin);
                }
            });
        }
        if (startAt && !add) {
            if (!plugins) {
                plugins = [];
            }
            plugins.push(startAt);
        }
        return _createProxyChain(plugins, itemCtx);
    }
    var ProcessTelemetryContext = /** @class */ (function () {
        function ProcessTelemetryContext(plugins, config, core, startAt) {
            var _self = this;
            var _nextProxy = null;
            if (startAt !== null) {
                if (plugins && isFunction(plugins.getPlugin)) {
                    _nextProxy = _copyProxyChain(plugins, _self, startAt || plugins.getPlugin());
                }
                else {
                    if (startAt) {
                        _nextProxy = _copyPluginChain(plugins, _self, startAt);
                    }
                    else if (isUndefined(startAt)) {
                        _nextProxy = _createProxyChain(plugins, _self);
                    }
                }
            }
            _self.core = function () {
                return core;
            };
            _self.diagLog = function () {
                return safeGetLogger(core, config);
            };
            _self.getCfg = function () {
                return config;
            };
            _self.getExtCfg = function (identifier, defaultValue) {
                if (defaultValue === void 0) { defaultValue = {}; }
                var theConfig;
                if (config) {
                    var extConfig = config.extensionConfig;
                    if (extConfig && identifier) {
                        theConfig = extConfig[identifier];
                    }
                }
                return (theConfig ? theConfig : defaultValue);
            };
            _self.getConfig = function (identifier, field, defaultValue) {
                if (defaultValue === void 0) { defaultValue = false; }
                var theValue;
                var extConfig = _self.getExtCfg(identifier, null);
                if (extConfig && !isNullOrUndefined(extConfig[field])) {
                    theValue = extConfig[field];
                }
                else if (config && !isNullOrUndefined(config[field])) {
                    theValue = config[field];
                }
                return !isNullOrUndefined(theValue) ? theValue : defaultValue;
            };
            _self.hasNext = function () {
                return _nextProxy != null;
            };
            _self.getNext = function () {
                return _nextProxy;
            };
            _self.setNext = function (nextPlugin) {
                _nextProxy = nextPlugin;
            };
            _self.processNext = function (env) {
                var nextPlugin = _nextProxy;
                if (nextPlugin) {
                    _nextProxy = nextPlugin.getNext();
                    nextPlugin.processTelemetry(env, _self);
                }
            };
            _self.createNew = function (plugins, startAt) {
                if (plugins === void 0) { plugins = null; }
                return new ProcessTelemetryContext(plugins || _nextProxy, config, core, startAt);
            };
        }
        return ProcessTelemetryContext;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strIKey = "iKey";
    var strExtensionConfig = "extensionConfig";

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strGetPlugin = "getPlugin";
    var BaseTelemetryPlugin = /** @class */ (function () {
        function BaseTelemetryPlugin() {
            var _self = this;
            var _isinitialized = false;
            var _rootCtx = null;
            var _nextPlugin = null;
            _self.core = null;
            _self.diagLog = function (itemCtx) {
                return _self._getTelCtx(itemCtx).diagLog();
            };
            _self.isInitialized = function () {
                return _isinitialized;
            };
            _self.setInitialized = function (isInitialized) {
                _isinitialized = isInitialized;
            };
            _self.setNextPlugin = function (next) {
                _nextPlugin = next;
            };
            _self.processNext = function (env, itemCtx) {
                if (itemCtx) {
                    itemCtx.processNext(env);
                }
                else if (_nextPlugin && isFunction(_nextPlugin.processTelemetry)) {
                    _nextPlugin.processTelemetry(env, null);
                }
            };
            _self._getTelCtx = function (currentCtx) {
                if (currentCtx === void 0) { currentCtx = null; }
                var itemCtx = currentCtx;
                if (!itemCtx) {
                    var rootCtx = _rootCtx || new ProcessTelemetryContext(null, {}, _self.core);
                    if (_nextPlugin && _nextPlugin[strGetPlugin]) {
                        itemCtx = rootCtx.createNew(null, _nextPlugin[strGetPlugin]);
                    }
                    else {
                        itemCtx = rootCtx.createNew(null, _nextPlugin);
                    }
                }
                return itemCtx;
            };
            _self._baseTelInit = function (config, core, extensions, pluginChain) {
                if (config) {
                    setValue(config, strExtensionConfig, [], null, isNullOrUndefined);
                }
                if (!pluginChain && core) {
                    pluginChain = core.getProcessTelContext().getNext();
                }
                var nextPlugin = _nextPlugin;
                if (_nextPlugin && _nextPlugin[strGetPlugin]) {
                    nextPlugin = _nextPlugin[strGetPlugin]();
                }
                _self.core = core;
                _rootCtx = new ProcessTelemetryContext(pluginChain, config, core, nextPlugin);
                _isinitialized = true;
            };
        }
        BaseTelemetryPlugin.prototype.initialize = function (config, core, extensions, pluginChain) {
            this._baseTelInit(config, core, extensions, pluginChain);
        };
        return BaseTelemetryPlugin;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var processTelemetry = "processTelemetry";
    var priority = "priority";
    var setNextPlugin = "setNextPlugin";
    var isInitialized = "isInitialized";
    function initializePlugins(processContext, extensions) {
        var initPlugins = [];
        var lastPlugin = null;
        var proxy = processContext.getNext();
        while (proxy) {
            var thePlugin = proxy.getPlugin();
            if (thePlugin) {
                if (lastPlugin &&
                    isFunction(lastPlugin[setNextPlugin]) &&
                    isFunction(thePlugin[processTelemetry])) {
                    lastPlugin[setNextPlugin](thePlugin);
                }
                if (!isFunction(thePlugin[isInitialized]) || !thePlugin[isInitialized]()) {
                    initPlugins.push(thePlugin);
                }
                lastPlugin = thePlugin;
                proxy = proxy.getNext();
            }
        }
        arrForEach(initPlugins, function (thePlugin) {
            thePlugin.initialize(processContext.getCfg(), processContext.core(), extensions, processContext.getNext());
        });
    }
    function sortPlugins(plugins) {
        return plugins.sort(function (extA, extB) {
            var result = 0;
            var bHasProcess = isFunction(extB[processTelemetry]);
            if (isFunction(extA[processTelemetry])) {
                result = bHasProcess ? extA[priority] - extB[priority] : 1;
            }
            else if (bHasProcess) {
                result = -1;
            }
            return result;
        });
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var ChannelControllerPriority = 500;
    var ChannelValidationMessage = "Channel has invalid priority";
    var ChannelController = /** @class */ (function (_super) {
        __extends(ChannelController, _super);
        function ChannelController() {
            var _this = _super.call(this) || this;
            _this.identifier = "ChannelControllerPlugin";
            _this.priority = ChannelControllerPriority;
            var _channelQueue;
            dynamicProto(ChannelController, _this, function (_self, _base) {
                _self.setNextPlugin = function (next) {
                };
                _self.processTelemetry = function (item, itemCtx) {
                    if (_channelQueue) {
                        arrForEach(_channelQueue, function (queues) {
                            if (queues.length > 0) {
                                var chainCtx = _this._getTelCtx(itemCtx).createNew(queues);
                                chainCtx.processNext(item);
                            }
                        });
                    }
                };
                _self.getChannelControls = function () {
                    return _channelQueue;
                };
                _self.initialize = function (config, core, extensions) {
                    if (_self.isInitialized()) {
                        return;
                    }
                    _base.initialize(config, core, extensions);
                    _createChannelQueues((config || {}).channels, extensions);
                    arrForEach(_channelQueue, function (queue) { return initializePlugins(new ProcessTelemetryContext(queue, config, core), extensions); });
                };
            });
            function _checkQueuePriority(queue) {
                arrForEach(queue, function (queueItem) {
                    if (queueItem.priority < ChannelControllerPriority) {
                        throwError(ChannelValidationMessage + queueItem.identifier);
                    }
                });
            }
            function _addChannelQueue(queue) {
                if (queue && queue.length > 0) {
                    queue = queue.sort(function (a, b) {
                        return a.priority - b.priority;
                    });
                    _checkQueuePriority(queue);
                    _channelQueue.push(queue);
                }
            }
            function _createChannelQueues(channels, extensions) {
                _channelQueue = [];
                if (channels) {
                    arrForEach(channels, function (queue) { return _addChannelQueue(queue); });
                }
                if (extensions) {
                    var extensionQueue_1 = [];
                    arrForEach(extensions, function (plugin) {
                        if (plugin.priority > ChannelControllerPriority) {
                            extensionQueue_1.push(plugin);
                        }
                    });
                    _addChannelQueue(extensionQueue_1);
                }
            }
            return _this;
        }
        ChannelController._staticInit = (function () {
            var proto = ChannelController.prototype;
            objDefineAccessors(proto, "ChannelControls", proto.getChannelControls);
            objDefineAccessors(proto, "channelQueue", proto.getChannelControls);
        })();
        return ChannelController;
    }(BaseTelemetryPlugin));

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strToGMTString = "toGMTString";
    var strToUTCString = "toUTCString";
    var strCookie = "cookie";
    var strExpires = "expires";
    var strEnabled = "enabled";
    var strIsCookieUseDisabled = "isCookieUseDisabled";
    var strDisableCookiesUsage = "disableCookiesUsage";
    var strConfigCookieMgr = "_ckMgr";
    var strEmpty = "";
    var _supportsCookies = null;
    var _allowUaSameSite = null;
    var _parsedCookieValue = null;
    var _doc = getDocument();
    var _cookieCache = {};
    var _globalCookieConfig = {};
    function _gblCookieMgr(config, logger) {
        var inst = createCookieMgr[strConfigCookieMgr] || _globalCookieConfig[strConfigCookieMgr];
        if (!inst) {
            inst = createCookieMgr[strConfigCookieMgr] = createCookieMgr(config, logger);
            _globalCookieConfig[strConfigCookieMgr] = inst;
        }
        return inst;
    }
    function _isMgrEnabled(cookieMgr) {
        if (cookieMgr) {
            return cookieMgr.isEnabled();
        }
        return true;
    }
    function _createCookieMgrConfig(rootConfig) {
        var cookieMgrCfg = rootConfig.cookieCfg = rootConfig.cookieCfg || {};
        setValue(cookieMgrCfg, "domain", rootConfig.cookieDomain, isNotNullOrUndefined, isNullOrUndefined);
        setValue(cookieMgrCfg, "path", rootConfig.cookiePath || "/", null, isNullOrUndefined);
        if (isNullOrUndefined(cookieMgrCfg[strEnabled])) {
            var cookieEnabled = void 0;
            if (!isUndefined(rootConfig[strIsCookieUseDisabled])) {
                cookieEnabled = !rootConfig[strIsCookieUseDisabled];
            }
            if (!isUndefined(rootConfig[strDisableCookiesUsage])) {
                cookieEnabled = !rootConfig[strDisableCookiesUsage];
            }
            cookieMgrCfg[strEnabled] = cookieEnabled;
        }
        return cookieMgrCfg;
    }
    function safeGetCookieMgr(core, config) {
        var cookieMgr;
        if (core) {
            cookieMgr = core.getCookieMgr();
        }
        else if (config) {
            var cookieCfg = (config || {}).cookieCfg;
            if (cookieCfg[strConfigCookieMgr]) {
                cookieMgr = cookieCfg[strConfigCookieMgr];
            }
            else {
                cookieMgr = createCookieMgr(config);
            }
        }
        if (!cookieMgr) {
            cookieMgr = _gblCookieMgr(config, (core || {}).logger);
        }
        return cookieMgr;
    }
    function createCookieMgr(rootConfig, logger) {
        var cookieMgrConfig = _createCookieMgrConfig(rootConfig || _globalCookieConfig);
        var _path = cookieMgrConfig.path || "/";
        var _domain = cookieMgrConfig.domain;
        var _enabled = cookieMgrConfig[strEnabled] !== false;
        var cookieMgr = {
            isEnabled: function () {
                var enabled = _enabled && areCookiesSupported(logger);
                var gblManager = _globalCookieConfig[strConfigCookieMgr];
                if (enabled && gblManager && cookieMgr !== gblManager) {
                    enabled = _isMgrEnabled(gblManager);
                }
                return enabled;
            },
            setEnabled: function (value) {
                _enabled = value !== false;
            },
            set: function (name, value, maxAgeSec, domain, path) {
                if (_isMgrEnabled(cookieMgr)) {
                    var values = {};
                    var theValue = strTrim(value || strEmpty);
                    var idx = theValue.indexOf(";");
                    if (idx !== -1) {
                        theValue = strTrim(value.substring(0, idx));
                        values = _extractParts(value.substring(idx + 1));
                    }
                    setValue(values, "domain", domain || _domain, isTruthy, isUndefined);
                    if (!isNullOrUndefined(maxAgeSec)) {
                        var _isIE = isIE();
                        if (isUndefined(values[strExpires])) {
                            var nowMs = dateNow();
                            var expireMs = nowMs + (maxAgeSec * 1000);
                            if (expireMs > 0) {
                                var expiry = new Date();
                                expiry.setTime(expireMs);
                                setValue(values, strExpires, _formatDate(expiry, !_isIE ? strToUTCString : strToGMTString) || _formatDate(expiry, _isIE ? strToGMTString : strToUTCString) || strEmpty, isTruthy);
                            }
                        }
                        if (!_isIE) {
                            setValue(values, "max-age", strEmpty + maxAgeSec, null, isUndefined);
                        }
                    }
                    var location_1 = getLocation();
                    if (location_1 && location_1.protocol === "https:") {
                        setValue(values, "secure", null, null, isUndefined);
                        if (_allowUaSameSite === null) {
                            _allowUaSameSite = !uaDisallowsSameSiteNone((getNavigator() || {}).userAgent);
                        }
                        if (_allowUaSameSite) {
                            setValue(values, "SameSite", "None", null, isUndefined);
                        }
                    }
                    setValue(values, "path", path || _path, null, isUndefined);
                    var setCookieFn = cookieMgrConfig.setCookie || _setCookieValue;
                    setCookieFn(name, _formatCookieValue(theValue, values));
                }
            },
            get: function (name) {
                var value = strEmpty;
                if (_isMgrEnabled(cookieMgr)) {
                    value = (cookieMgrConfig.getCookie || _getCookieValue)(name);
                }
                return value;
            },
            del: function (name, path) {
                if (_isMgrEnabled(cookieMgr)) {
                    cookieMgr.purge(name, path);
                }
            },
            purge: function (name, path) {
                if (areCookiesSupported(logger)) {
                    var values = (_a = {},
                        _a["path"] = path ? path : "/",
                        _a[strExpires] = "Thu, 01 Jan 1970 00:00:01 GMT",
                        _a);
                    if (!isIE()) {
                        values["max-age"] = "0";
                    }
                    var delCookie = cookieMgrConfig.delCookie || _setCookieValue;
                    delCookie(name, _formatCookieValue(strEmpty, values));
                }
                var _a;
            }
        };
        cookieMgr[strConfigCookieMgr] = cookieMgr;
        return cookieMgr;
    }
    function areCookiesSupported(logger) {
        if (_supportsCookies === null) {
            _supportsCookies = false;
            try {
                var doc = _doc || {};
                _supportsCookies = doc[strCookie] !== undefined;
            }
            catch (e) {
                logger && logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CannotAccessCookie, "Cannot access document.cookie - " + getExceptionName(e), { exception: dumpObj(e) });
            }
        }
        return _supportsCookies;
    }
    function _extractParts(theValue) {
        var values = {};
        if (theValue && theValue.length) {
            var parts = strTrim(theValue).split(";");
            arrForEach(parts, function (thePart) {
                thePart = strTrim(thePart || strEmpty);
                if (thePart) {
                    var idx = thePart.indexOf("=");
                    if (idx === -1) {
                        values[thePart] = null;
                    }
                    else {
                        values[strTrim(thePart.substring(0, idx))] = strTrim(thePart.substring(idx + 1));
                    }
                }
            });
        }
        return values;
    }
    function _formatDate(theDate, func) {
        if (isFunction(theDate[func])) {
            return theDate[func]();
        }
        return null;
    }
    function _formatCookieValue(value, values) {
        var cookieValue = value || strEmpty;
        objForEachKey(values, function (name, theValue) {
            cookieValue += "; " + name + (!isNullOrUndefined(theValue) ? "=" + theValue : strEmpty);
        });
        return cookieValue;
    }
    function _getCookieValue(name) {
        var cookieValue = strEmpty;
        if (_doc) {
            var theCookie = _doc[strCookie] || strEmpty;
            if (_parsedCookieValue !== theCookie) {
                _cookieCache = _extractParts(theCookie);
                _parsedCookieValue = theCookie;
            }
            cookieValue = strTrim(_cookieCache[name] || strEmpty);
        }
        return cookieValue;
    }
    function _setCookieValue(name, cookieValue) {
        if (_doc) {
            _doc[strCookie] = name + "=" + cookieValue;
        }
    }
    function uaDisallowsSameSiteNone(userAgent) {
        if (!isString(userAgent)) {
            return false;
        }
        if (strContains(userAgent, "CPU iPhone OS 12") || strContains(userAgent, "iPad; CPU OS 12")) {
            return true;
        }
        if (strContains(userAgent, "Macintosh; Intel Mac OS X 10_14") && strContains(userAgent, "Version/") && strContains(userAgent, "Safari")) {
            return true;
        }
        if (strContains(userAgent, "Macintosh; Intel Mac OS X 10_14") && strEndsWith(userAgent, "AppleWebKit/605.1.15 (KHTML, like Gecko)")) {
            return true;
        }
        if (strContains(userAgent, "Chrome/5") || strContains(userAgent, "Chrome/6")) {
            return true;
        }
        if (strContains(userAgent, "UnrealEngine") && !strContains(userAgent, "Chrome")) {
            return true;
        }
        if (strContains(userAgent, "UCBrowser/12") || strContains(userAgent, "UCBrowser/11")) {
            return true;
        }
        return false;
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var validationError = "Extensions must provide callback to initialize";
    var strNotificationManager = "_notificationManager";
    var BaseCore = /** @class */ (function () {
        function BaseCore() {
            var _isInitialized = false;
            var _eventQueue;
            var _channelController;
            var _notificationManager;
            var _perfManager;
            var _cookieManager;
            dynamicProto(BaseCore, this, function (_self) {
                _self._extensions = new Array();
                _channelController = new ChannelController();
                _self.logger = objCreateFn({
                    throwInternal: function (severity, msgId, msg, properties, isUserAct) {
                    },
                    warnToConsole: function (message) { },
                    resetInternalMessageCount: function () { }
                });
                _eventQueue = [];
                _self.isInitialized = function () { return _isInitialized; };
                _self.initialize = function (config, extensions, logger, notificationManager) {
                    if (_self.isInitialized()) {
                        throwError("Core should not be initialized more than once");
                    }
                    if (!config || isNullOrUndefined(config.instrumentationKey)) {
                        throwError("Please provide instrumentation key");
                    }
                    _notificationManager = notificationManager;
                    _self[strNotificationManager] = notificationManager;
                    _self.config = config || {};
                    config.extensions = isNullOrUndefined(config.extensions) ? [] : config.extensions;
                    var extConfig = getSetValue(config, strExtensionConfig);
                    extConfig.NotificationManager = notificationManager;
                    if (logger) {
                        _self.logger = logger;
                    }
                    var allExtensions = [];
                    allExtensions.push.apply(allExtensions, extensions.concat(config.extensions));
                    allExtensions = sortPlugins(allExtensions);
                    var coreExtensions = [];
                    var extPriorities = {};
                    arrForEach(allExtensions, function (ext) {
                        if (isNullOrUndefined(ext) || isNullOrUndefined(ext.initialize)) {
                            throwError(validationError);
                        }
                        var extPriority = ext.priority;
                        var identifier = ext.identifier;
                        if (ext && extPriority) {
                            if (!isNullOrUndefined(extPriorities[extPriority])) {
                                logger.warnToConsole("Two extensions have same priority #" + extPriority + " - " + extPriorities[extPriority] + ", " + identifier);
                            }
                            else {
                                extPriorities[extPriority] = identifier;
                            }
                        }
                        if (!extPriority || extPriority < _channelController.priority) {
                            coreExtensions.push(ext);
                        }
                    });
                    allExtensions.push(_channelController);
                    coreExtensions.push(_channelController);
                    allExtensions = sortPlugins(allExtensions);
                    _self._extensions = allExtensions;
                    initializePlugins(new ProcessTelemetryContext([_channelController], config, _self), allExtensions);
                    initializePlugins(new ProcessTelemetryContext(coreExtensions, config, _self), allExtensions);
                    _self._extensions = coreExtensions;
                    if (_self.getTransmissionControls().length === 0) {
                        throwError("No channels available");
                    }
                    _isInitialized = true;
                    _self.releaseQueue();
                };
                _self.getTransmissionControls = function () {
                    return _channelController.getChannelControls();
                };
                _self.track = function (telemetryItem) {
                    setValue(telemetryItem, strIKey, _self.config.instrumentationKey, null, isNotTruthy);
                    setValue(telemetryItem, "time", toISOString(new Date()), null, isNotTruthy);
                    setValue(telemetryItem, "ver", "4.0", null, isNullOrUndefined);
                    if (_self.isInitialized()) {
                        _self.getProcessTelContext().processNext(telemetryItem);
                    }
                    else {
                        _eventQueue.push(telemetryItem);
                    }
                };
                _self.getProcessTelContext = function () {
                    var extensions = _self._extensions;
                    var thePlugins = extensions;
                    if (!extensions || extensions.length === 0) {
                        thePlugins = [_channelController];
                    }
                    return new ProcessTelemetryContext(thePlugins, _self.config, _self);
                };
                _self.getNotifyMgr = function () {
                    if (!_notificationManager) {
                        _notificationManager = objCreateFn({
                            addNotificationListener: function (listener) { },
                            removeNotificationListener: function (listener) { },
                            eventsSent: function (events) { },
                            eventsDiscarded: function (events, reason) { },
                            eventsSendRequest: function (sendReason, isAsync) { }
                        });
                        _self[strNotificationManager] = _notificationManager;
                    }
                    return _notificationManager;
                };
                _self.getCookieMgr = function () {
                    if (!_cookieManager) {
                        _cookieManager = createCookieMgr(_self.config, _self.logger);
                    }
                    return _cookieManager;
                };
                _self.setCookieMgr = function (cookieMgr) {
                    _cookieManager = cookieMgr;
                };
                _self.getPerfMgr = function () {
                    if (!_perfManager) {
                        if (_self.config && _self.config.enablePerfMgr) {
                            _perfManager = new PerfManager(_self.getNotifyMgr());
                        }
                    }
                    return _perfManager;
                };
                _self.setPerfMgr = function (perfMgr) {
                    _perfManager = perfMgr;
                };
                _self.eventCnt = function () {
                    return _eventQueue.length;
                };
                _self.releaseQueue = function () {
                    if (_eventQueue.length > 0) {
                        arrForEach(_eventQueue, function (event) {
                            _self.getProcessTelContext().processNext(event);
                        });
                        _eventQueue = [];
                    }
                };
            });
        }
        return BaseCore;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var NotificationManager = /** @class */ (function () {
        function NotificationManager(config) {
            this.listeners = [];
            var perfEvtsSendAll = !!(config || {}).perfEvtsSendAll;
            dynamicProto(NotificationManager, this, function (_self) {
                _self.addNotificationListener = function (listener) {
                    _self.listeners.push(listener);
                };
                _self.removeNotificationListener = function (listener) {
                    var index = arrIndexOf(_self.listeners, listener);
                    while (index > -1) {
                        _self.listeners.splice(index, 1);
                        index = arrIndexOf(_self.listeners, listener);
                    }
                };
                _self.eventsSent = function (events) {
                    arrForEach(_self.listeners, function (listener) {
                        if (listener && listener.eventsSent) {
                            setTimeout(function () { return listener.eventsSent(events); }, 0);
                        }
                    });
                };
                _self.eventsDiscarded = function (events, reason) {
                    arrForEach(_self.listeners, function (listener) {
                        if (listener && listener.eventsDiscarded) {
                            setTimeout(function () { return listener.eventsDiscarded(events, reason); }, 0);
                        }
                    });
                };
                _self.eventsSendRequest = function (sendReason, isAsync) {
                    arrForEach(_self.listeners, function (listener) {
                        if (listener && listener.eventsSendRequest) {
                            if (isAsync) {
                                setTimeout(function () { return listener.eventsSendRequest(sendReason, isAsync); }, 0);
                            }
                            else {
                                try {
                                    listener.eventsSendRequest(sendReason, isAsync);
                                }
                                catch (e) {
                                }
                            }
                        }
                    });
                };
                _self.perfEvent = function (perfEvent) {
                    if (perfEvent) {
                        if (perfEvtsSendAll || !perfEvent.isChildEvt()) {
                            arrForEach(_self.listeners, function (listener) {
                                if (listener && listener.perfEvent) {
                                    if (perfEvent.isAsync) {
                                        setTimeout(function () { return listener.perfEvent(perfEvent); }, 0);
                                    }
                                    else {
                                        try {
                                            listener.perfEvent(perfEvent);
                                        }
                                        catch (e) {
                                        }
                                    }
                                }
                            });
                        }
                    }
                };
            });
        }
        return NotificationManager;
    }());

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var AppInsightsCore$1 = /** @class */ (function (_super) {
        __extends(AppInsightsCore, _super);
        function AppInsightsCore() {
            var _this = _super.call(this) || this;
            dynamicProto(AppInsightsCore, _this, function (_self, _base) {
                _self.initialize = function (config, extensions, logger, notificationManager) {
                    _base.initialize(config, extensions, logger || new DiagnosticLogger(config), notificationManager || new NotificationManager(config));
                };
                _self.track = function (telemetryItem) {
                    doPerf(_self.getPerfMgr(), function () { return "AppInsightsCore:track"; }, function () {
                        if (telemetryItem === null) {
                            _notifyInvalidEvent(telemetryItem);
                            throwError("Invalid telemetry item");
                        }
                        _validateTelemetryItem(telemetryItem);
                        _base.track(telemetryItem);
                    }, function () { return ({ item: telemetryItem }); }, !(telemetryItem.sync));
                };
                _self.addNotificationListener = function (listener) {
                    var manager = _self.getNotifyMgr();
                    if (manager) {
                        manager.addNotificationListener(listener);
                    }
                };
                _self.removeNotificationListener = function (listener) {
                    var manager = _self.getNotifyMgr();
                    if (manager) {
                        manager.removeNotificationListener(listener);
                    }
                };
                _self.pollInternalLogs = function (eventName) {
                    var interval = _self.config.diagnosticLogInterval;
                    if (!interval || !(interval > 0)) {
                        interval = 10000;
                    }
                    return setInterval(function () {
                        var queue = _self.logger ? _self.logger.queue : [];
                        arrForEach(queue, function (logMessage) {
                            var item = {
                                name: eventName ? eventName : "InternalMessageId: " + logMessage.messageId,
                                iKey: _self.config.instrumentationKey,
                                time: toISOString(new Date()),
                                baseType: _InternalLogMessage.dataType,
                                baseData: { message: logMessage.message }
                            };
                            _self.track(item);
                        });
                        queue.length = 0;
                    }, interval);
                };
                function _validateTelemetryItem(telemetryItem) {
                    if (isNullOrUndefined(telemetryItem.name)) {
                        _notifyInvalidEvent(telemetryItem);
                        throw Error("telemetry name required");
                    }
                }
                function _notifyInvalidEvent(telemetryItem) {
                    var manager = _self.getNotifyMgr();
                    if (manager) {
                        manager.eventsDiscarded([telemetryItem], EventsDiscardedReason.InvalidEvent);
                    }
                }
            });
            return _this;
        }
        return AppInsightsCore;
    }(BaseCore));

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var UInt32Mask = 0x100000000;
    var MaxUInt32 = 0xffffffff;
    var _mwcSeeded = false;
    var _mwcW = 123456789;
    var _mwcZ = 987654321;
    function _mwcSeed(seedValue) {
        if (seedValue < 0) {
            seedValue >>>= 0;
        }
        _mwcW = (123456789 + seedValue) & MaxUInt32;
        _mwcZ = (987654321 - seedValue) & MaxUInt32;
        _mwcSeeded = true;
    }
    function _autoSeedMwc() {
        try {
            var now = dateNow() & 0x7fffffff;
            _mwcSeed(((Math.random() * UInt32Mask) ^ now) + now);
        }
        catch (e) {
        }
    }
    function randomValue(maxValue) {
        if (maxValue > 0) {
            return Math.floor((random32() / MaxUInt32) * (maxValue + 1)) >>> 0;
        }
        return 0;
    }
    function random32(signed) {
        var value;
        var c = getCrypto() || getMsCrypto();
        if (c && c.getRandomValues) {
            value = c.getRandomValues(new Uint32Array(1))[0] & MaxUInt32;
        }
        else if (isIE()) {
            if (!_mwcSeeded) {
                _autoSeedMwc();
            }
            value = mwcRandom32() & MaxUInt32;
        }
        else {
            value = Math.floor((UInt32Mask * Math.random()) | 0);
        }
        if (!signed) {
            value >>>= 0;
        }
        return value;
    }
    function mwcRandom32(signed) {
        _mwcZ = (36969 * (_mwcZ & 0xFFFF) + (_mwcZ >> 16)) & MaxUInt32;
        _mwcW = (18000 * (_mwcW & 0xFFFF) + (_mwcW >> 16)) & MaxUInt32;
        var value = (((_mwcZ << 16) + (_mwcW & 0xFFFF)) >>> 0) & MaxUInt32 | 0;
        if (!signed) {
            value >>>= 0;
        }
        return value;
    }

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    function addEventHandler(eventName, callback) {
        var result = false;
        var w = getWindow();
        if (w) {
            result = attachEvent(w, eventName, callback);
            result = attachEvent(w["body"], eventName, callback) || result;
        }
        var doc = getDocument();
        if (doc) {
            result = EventHelper.Attach(doc, eventName, callback) || result;
        }
        return result;
    }
    function newGuid() {
        function randomHexDigit() {
            return randomValue(15);
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(GuidRegex, function (c) {
            var r = (randomHexDigit() | 0), v = (c === 'x' ? r : r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    function perfNow() {
        var perf = getPerformance();
        if (perf && perf.now) {
            return perf.now();
        }
        return dateNow();
    }
    function newId(maxLength) {
        if (maxLength === void 0) { maxLength = 22; }
        var base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var number = random32() >>> 0;
        var chars = 0;
        var result = "";
        while (result.length < maxLength) {
            chars++;
            result += base64chars.charAt(number & 0x3F);
            number >>>= 6;
            if (chars === 5) {
                number = (((random32() << 2) & 0xFFFFFFFF) | (number & 0x03)) >>> 0;
                chars = 0;
            }
        }
        return result;
    }
    function generateW3CId() {
        var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var oct = "", tmp;
        for (var a = 0; a < 4; a++) {
            tmp = random32();
            oct +=
                hexValues[tmp & 0xF] +
                    hexValues[tmp >> 4 & 0xF] +
                    hexValues[tmp >> 8 & 0xF] +
                    hexValues[tmp >> 12 & 0xF] +
                    hexValues[tmp >> 16 & 0xF] +
                    hexValues[tmp >> 20 & 0xF] +
                    hexValues[tmp >> 24 & 0xF] +
                    hexValues[tmp >> 28 & 0xF];
        }
        var clockSequenceHi = hexValues[8 + (random32() & 0x03) | 0];
        return oct.substr(0, 8) + oct.substr(9, 4) + "4" + oct.substr(13, 3) + clockSequenceHi + oct.substr(16, 3) + oct.substr(19, 12);
    }
    var GuidRegex = /[xy]/g;
    var EventHelper = {
        Attach: attachEvent,
        AttachEvent: attachEvent,
        Detach: detachEvent,
        DetachEvent: detachEvent
    };

    /*!
     * Application Insights JavaScript SDK - Core, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var aiInstrumentHooks = "_aiHooks";
    var cbNames = [
        "req", "rsp", "hkErr", "fnErr"
    ];
    var str__Proto = "__proto__";
    var strConstructor = "constructor";
    function _arrLoop(arr, fn) {
        if (arr) {
            for (var lp = 0; lp < arr.length; lp++) {
                if (fn(arr[lp], lp)) {
                    break;
                }
            }
        }
    }
    function _doCallbacks(hooks, callDetails, cbArgs, hookCtx, type) {
        if (type >= 0  && type <= 2 ) {
            _arrLoop(hooks, function (hook, idx) {
                var cbks = hook.cbks;
                var cb = cbks[cbNames[type]];
                if (cb) {
                    callDetails.ctx = function () {
                        var ctx = hookCtx[idx] = (hookCtx[idx] || {});
                        return ctx;
                    };
                    try {
                        cb.apply(callDetails.inst, cbArgs);
                    }
                    catch (err) {
                        var orgEx = callDetails.err;
                        try {
                            var hookErrorCb = cbks[cbNames[2 ]];
                            if (hookErrorCb) {
                                callDetails.err = err;
                                hookErrorCb.apply(callDetails.inst, cbArgs);
                            }
                        }
                        catch (e) {
                        }
                        finally {
                            callDetails.err = orgEx;
                        }
                    }
                }
            });
        }
    }
    function _createFunctionHook(aiHook) {
        return function () {
            var funcThis = this;
            var orgArgs = arguments;
            var hooks = aiHook.h;
            var funcArgs = {
                name: aiHook.n,
                inst: funcThis,
                ctx: null,
                set: _replaceArg
            };
            var hookCtx = [];
            var cbArgs = _createArgs([funcArgs], orgArgs);
            function _createArgs(target, theArgs) {
                _arrLoop(theArgs, function (arg) {
                    target.push(arg);
                });
                return target;
            }
            function _replaceArg(idx, value) {
                orgArgs = _createArgs([], orgArgs);
                orgArgs[idx] = value;
                cbArgs = _createArgs([funcArgs], orgArgs);
            }
            _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 0 );
            var theFunc = aiHook.f;
            try {
                funcArgs.rslt = theFunc.apply(funcThis, orgArgs);
            }
            catch (err) {
                funcArgs.err = err;
                _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 3 );
                throw err;
            }
            _doCallbacks(hooks, funcArgs, cbArgs, hookCtx, 1 );
            return funcArgs.rslt;
        };
    }
    var _objGetPrototypeOf = Object["getPrototypeOf"];
    function _getObjProto(target) {
        if (target) {
            if (_objGetPrototypeOf) {
                return _objGetPrototypeOf(target);
            }
            var newProto = target[str__Proto] || target[strPrototype] || target[strConstructor];
            if (newProto) {
                return newProto;
            }
        }
        return null;
    }
    function _getOwner(target, name, checkPrototype) {
        var owner = null;
        if (target) {
            if (hasOwnProperty(target, name)) {
                owner = target;
            }
            else if (checkPrototype) {
                owner = _getOwner(_getObjProto(target), name, false);
            }
        }
        return owner;
    }
    function InstrumentProto(target, funcName, callbacks) {
        if (target) {
            return InstrumentFunc(target[strPrototype], funcName, callbacks, false);
        }
        return null;
    }
    function InstrumentFunc(target, funcName, callbacks, checkPrototype) {
        if (checkPrototype === void 0) { checkPrototype = true; }
        if (target && funcName && callbacks) {
            var owner = _getOwner(target, funcName, checkPrototype);
            if (owner) {
                var fn = owner[funcName];
                if (typeof fn === strFunction) {
                    var aiHook_1 = fn[aiInstrumentHooks];
                    if (!aiHook_1) {
                        aiHook_1 = {
                            i: 0,
                            n: funcName,
                            f: fn,
                            h: []
                        };
                        var newFunc = _createFunctionHook(aiHook_1);
                        newFunc[aiInstrumentHooks] = aiHook_1;
                        owner[funcName] = newFunc;
                    }
                    var theHook = {
                        id: aiHook_1.i,
                        cbks: callbacks,
                        rm: function () {
                            var id = this.id;
                            _arrLoop(aiHook_1.h, function (hook, idx) {
                                if (hook.id === id) {
                                    aiHook_1.h.splice(idx, 1);
                                    return 1;
                                }
                            });
                        }
                    };
                    aiHook_1.i++;
                    aiHook_1.h.push(theHook);
                    return theHook;
                }
            }
        }
        return null;
    }

    /*!
     * 1DS JS SDK Core, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ValueKind = {
        NotSet: 0,
        Pii_DistinguishedName: 1,
        Pii_GenericData: 2,
        Pii_IPV4Address: 3,
        Pii_IPv6Address: 4,
        Pii_MailSubject: 5,
        Pii_PhoneNumber: 6,
        Pii_QueryString: 7,
        Pii_SipAddress: 8,
        Pii_SmtpAddress: 9,
        Pii_Identity: 10,
        Pii_Uri: 11,
        Pii_Fqdn: 12,
        Pii_IPV4AddressLegacy: 13,
        CustomerContent_GenericContent: 32
    };
    var EventLatency = {
        Normal: 1,
        CostDeferred: 2,
        RealTime: 3,
        Immediate: 4
    };
    var EventPropertyType = {
        Unspecified: 0,
        String: 1,
        Int32: 2,
        UInt32: 3,
        Int64: 4,
        UInt64: 5,
        Double: 6,
        Bool: 7,
        Guid: 8,
        DateTime: 9
    };
    var _ExtendedInternalMessageId = __assignFn(__assignFn({}, _InternalMessageId), { AuthHandShakeError: 501, AuthRedirectFail: 502, BrowserCannotReadLocalStorage: 503, BrowserCannotWriteLocalStorage: 504, BrowserDoesNotSupportLocalStorage: 505, CannotParseBiBlobValue: 506, CannotParseDataAttribute: 507, CVPluginNotAvailable: 508, DroppedEvent: 509, ErrorParsingAISessionCookie: 510, ErrorProvidedChannels: 511, FailedToGetCookies: 512, FailedToInitializeCorrelationVector: 513, FailedToInitializeSDK: 514, InvalidContentBlob: 515, InvalidCorrelationValue: 516, SessionRenewalDateIsZero: 517, SendPostOnCompleteFailure: 518, PostResponseHandler: 519, SDKNotInitialized: 520 });

    /*!
     * 1DS JS SDK Core, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var _a$1;
    var Version = '3.1.1';
    var FullVersionString = "1DS-Web-JS-" + Version;
    var _fieldTypeEventPropMap = (_a$1 = {},
        _a$1[0 ] = EventPropertyType.Unspecified,
        _a$1[2 ] = EventPropertyType.Double,
        _a$1[1 ] = EventPropertyType.String,
        _a$1[3 ] = EventPropertyType.Bool,
        _a$1[4096  | 2 ] = EventPropertyType.Double,
        _a$1[4096  | 1 ] = EventPropertyType.String,
        _a$1[4096  | 3 ] = EventPropertyType.Bool,
        _a$1);
    var beaconsSupported = null;
    var isDocumentObjectAvailable = Boolean(getDocument());
    var isWindowObjectAvailable = Boolean(getWindow());
    function isValueAssigned(value) {
        return !(value === "" || isNullOrUndefined(value));
    }
    function getTenantId(apiKey) {
        if (apiKey) {
            var indexTenantId = apiKey.indexOf("-");
            if (indexTenantId > -1) {
                return apiKey.substring(0, indexTenantId);
            }
        }
        return "";
    }
    function isBeaconsSupported() {
        if (beaconsSupported === null) {
            beaconsSupported = hasNavigator() && Boolean(getNavigator().sendBeacon);
        }
        return beaconsSupported;
    }
    function isLatency(value) {
        if (value && isNumber(value) && value >= EventLatency.Normal && value <= EventLatency.Immediate) {
            return true;
        }
        return false;
    }
    function sanitizeProperty(name, property, stringifyObjects) {
        if ((!property && !isValueAssigned(property)) || typeof name !== "string") {
            return null;
        }
        var propType = typeof property;
        if (propType === "string" || propType === "number" || propType === "boolean" || isArray(property)) {
            property = { value: property };
        }
        else if (propType === "object" && !property.hasOwnProperty("value")) {
            property = { value: stringifyObjects ? JSON.stringify(property) : property };
        }
        else if (isNullOrUndefined(property.value)
            || property.value === "" || (!isString(property.value)
            && !isNumber(property.value) && !isBoolean(property.value)
            && !isArray(property.value))) {
            return null;
        }
        if (isArray(property.value) &&
            !isArrayValid(property.value)) {
            return null;
        }
        if (!isNullOrUndefined(property.kind)) {
            if (isArray(property.value) || !isValueKind(property.kind)) {
                return null;
            }
            property.value = property.value.toString();
        }
        return property;
    }
    function useXDomainRequest() {
        if (typeof XMLHttpRequest !== undefined) {
            var xhr = getGlobalInst("XMLHttpRequest");
            if (xhr) {
                var conn = new xhr();
                return Boolean(isUndefined(conn.withCredentials) && (typeof XDomainRequest !== undefined));
            }
        }
    }
    function getCommonSchemaMetaData(value, kind, type) {
        var encodedTypeValue = -1;
        if (!isUndefined(value)) {
            if (kind > 0) {
                if (kind === 32) {
                    encodedTypeValue = (1 << 13);
                }
                else if (kind <= 13) {
                    encodedTypeValue = (kind << 5);
                }
            }
            if (isDataType(type)) {
                if (encodedTypeValue === -1) {
                    encodedTypeValue = 0;
                }
                encodedTypeValue |= type;
            }
            else {
                var propType = _fieldTypeEventPropMap[getFieldValueType(value)] || -1;
                if (encodedTypeValue !== -1 && propType !== -1) {
                    encodedTypeValue |= propType;
                }
                else if (propType === EventPropertyType.Double) {
                    encodedTypeValue = propType;
                }
            }
        }
        return encodedTypeValue;
    }
    function setCookie(name, value, days) {
        if (areCookiesSupported(null)) {
            safeGetCookieMgr(null).set(name, value, days * 86400, null, "/");
        }
    }
    function deleteCookie(name) {
        if (areCookiesSupported(null)) {
            safeGetCookieMgr(null).del(name);
        }
    }
    function getCookie(name) {
        if (areCookiesSupported(null)) {
            return getCookieValue(safeGetCookieMgr(null), name);
        }
        return "";
    }
    function getCookieValue(cookieMgr, name, decode) {
        if (decode === void 0) { decode = true; }
        var cookieValue;
        if (cookieMgr) {
            cookieValue = cookieMgr.get(name);
            if (decode && cookieValue && decodeURIComponent) {
                cookieValue = decodeURIComponent(cookieValue);
            }
        }
        return cookieValue || "";
    }
    function createGuid(style) {
        if (style === void 0) { style = "D" ; }
        var theGuid = newGuid();
        if (style === "B" ) {
            theGuid = "{" + theGuid + "}";
        }
        else if (style === "P" ) {
            theGuid = "(" + theGuid + ")";
        }
        else if (style === "N" ) {
            theGuid = theGuid.replace(/-/g, "");
        }
        return theGuid;
    }
    function extend(obj, obj2, obj3, obj4, obj5) {
        var extended = {};
        var deep = false;
        var i = 0;
        var length = arguments.length;
        var objProto = Object[strPrototype];
        var theArgs = arguments;
        if (objProto.toString.call(theArgs[0]) === "[object Boolean]") {
            deep = theArgs[0];
            i++;
        }
        for (; i < length; i++) {
            var obj = theArgs[i];
            objForEachKey(obj, function (prop, value) {
                if (deep && value && isObject(value)) {
                    if (isArray(value)) {
                        extended[prop] = extended[prop] || [];
                        arrForEach(value, function (arrayValue, arrayIndex) {
                            if (arrayValue && isObject(arrayValue)) {
                                extended[prop][arrayIndex] = extend(true, extended[prop][arrayIndex], arrayValue);
                            }
                            else {
                                extended[prop][arrayIndex] = arrayValue;
                            }
                        });
                    }
                    else {
                        extended[prop] = extend(true, extended[prop], value);
                    }
                }
                else {
                    extended[prop] = value;
                }
            });
        }
        return extended;
    }
    var getTime = perfNow;
    function isValueKind(value) {
        if (value === ValueKind.NotSet || ((value > ValueKind.NotSet && value <= ValueKind.Pii_IPV4AddressLegacy) || value === ValueKind.CustomerContent_GenericContent)) {
            return true;
        }
        return false;
    }
    function isDataType(value) {
        if (value >= 0 && value <= 9) {
            return true;
        }
        return false;
    }
    function isArrayValid(value) {
        return value.length > 0;
    }
    function addPageUnloadEventListener(listener) {
        var pageUnloadAdded = addEventHandler("beforeunload", listener);
        pageUnloadAdded = addEventHandler("unload", listener) || pageUnloadAdded;
        pageUnloadAdded = addEventHandler("pagehide", listener) || pageUnloadAdded;
        return pageUnloadAdded;
    }
    function setProcessTelemetryTimings(event, identifier) {
        var evt = event;
        evt.timings = evt.timings || {};
        evt.timings.processTelemetryStart = evt.timings.processTelemetryStart || {};
        evt.timings.processTelemetryStart[identifier] = getTime();
    }
    function getFieldValueType(value) {
        var theType = 0 ;
        if (value !== null && value !== undefined) {
            var objType = typeof value;
            if (objType === "string") {
                theType = 1 ;
            }
            else if (objType === "number") {
                theType = 2 ;
            }
            else if (objType === "boolean") {
                theType = 3 ;
            }
            else if (objType === strShimObject) {
                theType = 4 ;
                if (isArray(value)) {
                    theType = 4096 ;
                    if (value.length > 0) {
                        theType |= getFieldValueType(value[0]);
                    }
                }
                else if (hasOwnProperty(value, "value")) {
                    theType = 8192  | getFieldValueType(value.value);
                }
            }
        }
        return theType;
    }

    /*!
     * 1DS JS SDK Core, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PropVersion = "version";
    var properties = "properties";
    var AppInsightsCore = /** @class */ (function (_super) {
        __extendsFn(AppInsightsCore, _super);
        function AppInsightsCore() {
            var _this = _super.call(this) || this;
            _this.pluginVersionStringArr = [];
            _this.pluginVersionString = "";
            dynamicProto(AppInsightsCore, _this, function (_self, _base) {
                _self.initialize = function (config, extensions, logger, notificationManager) {
                    doPerf(_self, function () { return "AppInsightsCore.initialize"; }, function () {
                        if (config) {
                            if (!config.endpointUrl) {
                                config.endpointUrl = "https://browser.events.data.microsoft.com/OneCollector/1.0/";
                            }
                            var propertyStorageOverride = config.propertyStorageOverride;
                            if (propertyStorageOverride && (!propertyStorageOverride.getProperty || !propertyStorageOverride.setProperty)) {
                                throw new Error("Invalid property storage override passed.");
                            }
                            if (config.channels) {
                                arrForEach(config.channels, function (channels) {
                                    if (channels) {
                                        arrForEach(channels, function (channel) {
                                            if (channel.identifier && channel.version) {
                                                var ver = channel.identifier + "=" + channel.version;
                                                _self.pluginVersionStringArr.push(ver);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        _self.getWParam = function () {
                            return typeof document !== "undefined" ? 0 : -1;
                        };
                        if (extensions) {
                            arrForEach(extensions, function (ext) {
                                if (ext && ext.identifier && ext.version) {
                                    var ver = ext.identifier + "=" + ext.version;
                                    _self.pluginVersionStringArr.push(ver);
                                }
                            });
                        }
                        _self.pluginVersionString = _self.pluginVersionStringArr.join(";");
                        try {
                            _base.initialize(config, extensions, logger, notificationManager);
                        }
                        catch (e) {
                            _self.logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.ErrorProvidedChannels, "Channels must be provided through config.channels only");
                        }
                        _self.pollInternalLogs("InternalLog");
                    }, function () { return ({ config: config, extensions: extensions, logger: logger, notificationManager: notificationManager }); });
                };
                _self.track = function (item) {
                    doPerf(_self, function () { return "AppInsightsCore.track"; }, function () {
                        var telemetryItem = item;
                        if (telemetryItem) {
                            telemetryItem.timings = telemetryItem.timings || {};
                            telemetryItem.timings.trackStart = getTime();
                            if (!isLatency(telemetryItem.latency)) {
                                telemetryItem.latency = EventLatency.Normal;
                            }
                            var itemExt = telemetryItem.ext = telemetryItem.ext || {};
                            itemExt.sdk = itemExt.sdk || {};
                            itemExt.sdk.ver = FullVersionString;
                            var baseData = telemetryItem.baseData = telemetryItem.baseData || {};
                            if (!baseData[properties]) {
                                baseData[properties] = {};
                            }
                            var itemProperties = baseData[properties];
                            if (!itemProperties[PropVersion]) {
                                itemProperties[PropVersion] = "";
                            }
                            if (_self.pluginVersionString !== "") {
                                itemProperties[PropVersion] = _self.pluginVersionString;
                            }
                        }
                        _base.track(telemetryItem);
                    }, function () { return ({ item: item }); }, !(item.sync));
                };
            });
            return _this;
        }
        return AppInsightsCore;
    }(AppInsightsCore$1));

    var RequestHeaders = {
        requestContextHeader: "Request-Context",
        requestContextTargetKey: "appId",
        requestContextAppIdFormat: "appId=cid-v1:",
        requestIdHeader: "Request-Id",
        traceParentHeader: "traceparent",
        traceStateHeader: "tracestate",
        sdkContextHeader: "Sdk-Context",
        sdkContextHeaderAppIdRequest: "appId",
        requestContextHeaderLowerCase: "request-context"
    };

    var DataSanitizer = /** @class */ (function () {
        function DataSanitizer() {
        }
        DataSanitizer.sanitizeKeyAndAddUniqueness = function (logger, key, map) {
            var origLength = key.length;
            var field = DataSanitizer.sanitizeKey(logger, key);
            if (field.length !== origLength) {
                var i = 0;
                var uniqueField = field;
                while (map[uniqueField] !== undefined) {
                    i++;
                    uniqueField = field.substring(0, DataSanitizer.MAX_NAME_LENGTH - 3) + DataSanitizer.padNumber(i);
                }
                field = uniqueField;
            }
            return field;
        };
        DataSanitizer.sanitizeKey = function (logger, name) {
            var nameTrunc;
            if (name) {
                name = DataSanitizer.trim(name.toString());
                if (name.length > DataSanitizer.MAX_NAME_LENGTH) {
                    nameTrunc = name.substring(0, DataSanitizer.MAX_NAME_LENGTH);
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.NameTooLong, "name is too long.  It has been truncated to " + DataSanitizer.MAX_NAME_LENGTH + " characters.", { name: name }, true);
                }
            }
            return nameTrunc || name;
        };
        DataSanitizer.sanitizeString = function (logger, value, maxLength) {
            if (maxLength === void 0) { maxLength = DataSanitizer.MAX_STRING_LENGTH; }
            var valueTrunc;
            if (value) {
                maxLength = maxLength ? maxLength : DataSanitizer.MAX_STRING_LENGTH;
                value = DataSanitizer.trim(value);
                if (value.toString().length > maxLength) {
                    valueTrunc = value.toString().substring(0, maxLength);
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StringValueTooLong, "string value is too long. It has been truncated to " + maxLength + " characters.", { value: value }, true);
                }
            }
            return valueTrunc || value;
        };
        DataSanitizer.sanitizeUrl = function (logger, url) {
            return DataSanitizer.sanitizeInput(logger, url, DataSanitizer.MAX_URL_LENGTH, _InternalMessageId.UrlTooLong);
        };
        DataSanitizer.sanitizeMessage = function (logger, message) {
            var messageTrunc;
            if (message) {
                if (message.length > DataSanitizer.MAX_MESSAGE_LENGTH) {
                    messageTrunc = message.substring(0, DataSanitizer.MAX_MESSAGE_LENGTH);
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.MessageTruncated, "message is too long, it has been truncated to " + DataSanitizer.MAX_MESSAGE_LENGTH + " characters.", { message: message }, true);
                }
            }
            return messageTrunc || message;
        };
        DataSanitizer.sanitizeException = function (logger, exception) {
            var exceptionTrunc;
            if (exception) {
                if (exception.length > DataSanitizer.MAX_EXCEPTION_LENGTH) {
                    exceptionTrunc = exception.substring(0, DataSanitizer.MAX_EXCEPTION_LENGTH);
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ExceptionTruncated, "exception is too long, it has been truncated to " + DataSanitizer.MAX_EXCEPTION_LENGTH + " characters.", { exception: exception }, true);
                }
            }
            return exceptionTrunc || exception;
        };
        DataSanitizer.sanitizeProperties = function (logger, properties) {
            if (properties) {
                var tempProps_1 = {};
                objForEachKey(properties, function (prop, value) {
                    if (isObject(value) && hasJSON()) {
                        try {
                            value = getJSON().stringify(value);
                        }
                        catch (e) {
                            logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.CannotSerializeObjectNonSerializable, "custom property is not valid", { exception: e }, true);
                        }
                    }
                    value = DataSanitizer.sanitizeString(logger, value, DataSanitizer.MAX_PROPERTY_LENGTH);
                    prop = DataSanitizer.sanitizeKeyAndAddUniqueness(logger, prop, tempProps_1);
                    tempProps_1[prop] = value;
                });
                properties = tempProps_1;
            }
            return properties;
        };
        DataSanitizer.sanitizeMeasurements = function (logger, measurements) {
            if (measurements) {
                var tempMeasurements_1 = {};
                objForEachKey(measurements, function (measure, value) {
                    measure = DataSanitizer.sanitizeKeyAndAddUniqueness(logger, measure, tempMeasurements_1);
                    tempMeasurements_1[measure] = value;
                });
                measurements = tempMeasurements_1;
            }
            return measurements;
        };
        DataSanitizer.sanitizeId = function (logger, id) {
            return id ? DataSanitizer.sanitizeInput(logger, id, DataSanitizer.MAX_ID_LENGTH, _InternalMessageId.IdTooLong).toString() : id;
        };
        DataSanitizer.sanitizeInput = function (logger, input, maxLength, _msgId) {
            var inputTrunc;
            if (input) {
                input = DataSanitizer.trim(input);
                if (input.length > maxLength) {
                    inputTrunc = input.substring(0, maxLength);
                    logger.throwInternal(LoggingSeverity.WARNING, _msgId, "input is too long, it has been truncated to " + maxLength + " characters.", { data: input }, true);
                }
            }
            return inputTrunc || input;
        };
        DataSanitizer.padNumber = function (num) {
            var s = "00" + num;
            return s.substr(s.length - 3);
        };
        DataSanitizer.trim = function (str) {
            if (!isString(str)) {
                return str;
            }
            return str.replace(/^\s+|\s+$/g, "");
        };
        DataSanitizer.MAX_NAME_LENGTH = 150;
        DataSanitizer.MAX_ID_LENGTH = 128;
        DataSanitizer.MAX_PROPERTY_LENGTH = 8192;
        DataSanitizer.MAX_STRING_LENGTH = 1024;
        DataSanitizer.MAX_URL_LENGTH = 2048;
        DataSanitizer.MAX_MESSAGE_LENGTH = 32768;
        DataSanitizer.MAX_EXCEPTION_LENGTH = 32768;
        return DataSanitizer;
    }());

    function createDomEvent(eventName) {
        var event = null;
        if (isFunction(Event)) {
            event = new Event(eventName);
        }
        else {
            var doc = getDocument();
            if (doc && doc.createEvent) {
                event = doc.createEvent("Event");
                event.initEvent(eventName, true, true);
            }
        }
        return event;
    }

    function stringToBoolOrDefault(str, defaultValue) {
        if (defaultValue === void 0) { defaultValue = false; }
        if (str === undefined || str === null) {
            return defaultValue;
        }
        return str.toString().toLowerCase() === "true";
    }
    function msToTimeSpan(totalms) {
        if (isNaN(totalms) || totalms < 0) {
            totalms = 0;
        }
        totalms = Math.round(totalms);
        var ms = "" + totalms % 1000;
        var sec = "" + Math.floor(totalms / 1000) % 60;
        var min = "" + Math.floor(totalms / (1000 * 60)) % 60;
        var hour = "" + Math.floor(totalms / (1000 * 60 * 60)) % 24;
        var days = Math.floor(totalms / (1000 * 60 * 60 * 24));
        ms = ms.length === 1 ? "00" + ms : ms.length === 2 ? "0" + ms : ms;
        sec = sec.length < 2 ? "0" + sec : sec;
        min = min.length < 2 ? "0" + min : min;
        hour = hour.length < 2 ? "0" + hour : hour;
        return (days > 0 ? days + "." : "") + hour + ":" + min + ":" + sec + "." + ms;
    }
    function isCrossOriginError(message, url, lineNumber, columnNumber, error) {
        return !error && isString(message) && (message === "Script error." || message === "Script error");
    }

    var DisabledPropertyName$1 = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation";
    var strNotSpecified = "not_specified";

    var StorageType$1;
    (function (StorageType) {
        StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
        StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
    })(StorageType$1 || (StorageType$1 = {}));
    var FieldType;
    (function (FieldType) {
        FieldType[FieldType["Default"] = 0] = "Default";
        FieldType[FieldType["Required"] = 1] = "Required";
        FieldType[FieldType["Array"] = 2] = "Array";
        FieldType[FieldType["Hidden"] = 4] = "Hidden";
    })(FieldType || (FieldType = {}));
    var DistributedTracingModes;
    (function (DistributedTracingModes) {
        DistributedTracingModes[DistributedTracingModes["AI"] = 0] = "AI";
        DistributedTracingModes[DistributedTracingModes["AI_AND_W3C"] = 1] = "AI_AND_W3C";
        DistributedTracingModes[DistributedTracingModes["W3C"] = 2] = "W3C";
    })(DistributedTracingModes || (DistributedTracingModes = {}));

    var _canUseSessionStorage = undefined;
    function _getVerifiedStorageObject$1(storageType) {
        try {
            if (isNullOrUndefined(getGlobal())) {
                return null;
            }
            var uid = new Date;
            var storage = getGlobalInst(storageType === StorageType$1.LocalStorage ? "localStorage" : "sessionStorage");
            storage.setItem(uid.toString(), uid.toString());
            var fail = storage.getItem(uid.toString()) !== uid.toString();
            storage.removeItem(uid.toString());
            if (!fail) {
                return storage;
            }
        }
        catch (exception) {
        }
        return null;
    }
    function _getSessionStorageObject() {
        if (utlCanUseSessionStorage()) {
            return _getVerifiedStorageObject$1(StorageType$1.SessionStorage);
        }
        return null;
    }
    function utlDisableStorage() {
        _canUseSessionStorage = false;
    }
    function utlCanUseSessionStorage() {
        if (_canUseSessionStorage === undefined) {
            _canUseSessionStorage = !!_getVerifiedStorageObject$1(StorageType$1.SessionStorage);
        }
        return _canUseSessionStorage;
    }
    function utlGetSessionStorage(logger, name) {
        var storage = _getSessionStorageObject();
        if (storage !== null) {
            try {
                return storage.getItem(name);
            }
            catch (e) {
                _canUseSessionStorage = false;
                logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotReadSessionStorage, "Browser failed read of session storage. " + getExceptionName(e), { exception: dumpObj(e) });
            }
        }
        return null;
    }
    function utlSetSessionStorage(logger, name, data) {
        var storage = _getSessionStorageObject();
        if (storage !== null) {
            try {
                storage.setItem(name, data);
                return true;
            }
            catch (e) {
                _canUseSessionStorage = false;
                logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserCannotWriteSessionStorage, "Browser failed write to session storage. " + getExceptionName(e), { exception: dumpObj(e) });
            }
        }
        return false;
    }
    function utlRemoveSessionStorage(logger, name) {
        var storage = _getSessionStorageObject();
        if (storage !== null) {
            try {
                storage.removeItem(name);
                return true;
            }
            catch (e) {
                _canUseSessionStorage = false;
                logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.BrowserFailedRemovalFromSessionStorage, "Browser failed removal of session storage item. " + getExceptionName(e), { exception: dumpObj(e) });
            }
        }
        return false;
    }

    var _document = getDocument() || {};
    var _htmlAnchorIdx = 0;
    var _htmlAnchorElement = [null, null, null, null, null];
    function urlParseUrl(url) {
        var anchorIdx = _htmlAnchorIdx;
        var anchorCache = _htmlAnchorElement;
        var tempAnchor = anchorCache[anchorIdx];
        if (!_document.createElement) {
            tempAnchor = { host: urlParseHost(url, true) };
        }
        else if (!anchorCache[anchorIdx]) {
            tempAnchor = anchorCache[anchorIdx] = _document.createElement('a');
        }
        tempAnchor.href = url;
        anchorIdx++;
        if (anchorIdx >= anchorCache.length) {
            anchorIdx = 0;
        }
        _htmlAnchorIdx = anchorIdx;
        return tempAnchor;
    }
    function urlGetAbsoluteUrl(url) {
        var result;
        var a = urlParseUrl(url);
        if (a) {
            result = a.href;
        }
        return result;
    }
    function urlGetCompleteUrl(method, absoluteUrl) {
        if (method) {
            return method.toUpperCase() + " " + absoluteUrl;
        }
        return absoluteUrl;
    }
    function urlParseHost(url, inclPort) {
        var fullHost = urlParseFullHost(url, inclPort);
        if (fullHost) {
            var match = fullHost.match(/(www[0-9]?\.)?(.[^/:]+)(\:[\d]+)?/i);
            if (match != null && match.length > 3 && isString(match[2]) && match[2].length > 0) {
                return match[2] + (match[3] || "");
            }
        }
        return fullHost;
    }
    function urlParseFullHost(url, inclPort) {
        var result = null;
        if (url) {
            var match = url.match(/(\w*):\/\/(.[^/:]+)(\:[\d]+)?/i);
            if (match != null && match.length > 2 && isString(match[2]) && match[2].length > 0) {
                result = match[2] || "";
                if (inclPort && match.length > 2) {
                    var protocol = (match[1] || "").toLowerCase();
                    var port = match[3] || "";
                    if (protocol === "http" && port === ":80") {
                        port = "";
                    }
                    else if (protocol === "https" && port === ":443") {
                        port = "";
                    }
                    result += port;
                }
            }
        }
        return result;
    }

    var CorrelationIdHelper = {
        correlationIdPrefix: "cid-v1:",
        canIncludeCorrelationHeader: function (config, requestUrl, currentHost) {
            if (!requestUrl || (config && config.disableCorrelationHeaders)) {
                return false;
            }
            if (config && config.correlationHeaderExcludePatterns) {
                for (var i = 0; i < config.correlationHeaderExcludePatterns.length; i++) {
                    if (config.correlationHeaderExcludePatterns[i].test(requestUrl)) {
                        return false;
                    }
                }
            }
            var requestHost = urlParseUrl(requestUrl).host.toLowerCase();
            if (requestHost && (requestHost.indexOf(":443") !== -1 || requestHost.indexOf(":80") !== -1)) {
                requestHost = (urlParseFullHost(requestUrl, true) || "").toLowerCase();
            }
            if ((!config || !config.enableCorsCorrelation) && requestHost !== currentHost) {
                return false;
            }
            var includedDomains = config && config.correlationHeaderDomains;
            if (includedDomains) {
                var matchExists_1;
                arrForEach(includedDomains, function (domain) {
                    var regex = new RegExp(domain.toLowerCase().replace(/\./g, "\.").replace(/\*/g, ".*"));
                    matchExists_1 = matchExists_1 || regex.test(requestHost);
                });
                if (!matchExists_1) {
                    return false;
                }
            }
            var excludedDomains = config && config.correlationHeaderExcludedDomains;
            if (!excludedDomains || excludedDomains.length === 0) {
                return true;
            }
            for (var i = 0; i < excludedDomains.length; i++) {
                var regex = new RegExp(excludedDomains[i].toLowerCase().replace(/\./g, "\.").replace(/\*/g, ".*"));
                if (regex.test(requestHost)) {
                    return false;
                }
            }
            return requestHost && requestHost.length > 0;
        },
        getCorrelationContext: function (responseHeader) {
            if (responseHeader) {
                var correlationId = CorrelationIdHelper.getCorrelationContextValue(responseHeader, RequestHeaders.requestContextTargetKey);
                if (correlationId && correlationId !== CorrelationIdHelper.correlationIdPrefix) {
                    return correlationId;
                }
            }
        },
        getCorrelationContextValue: function (responseHeader, key) {
            if (responseHeader) {
                var keyValues = responseHeader.split(",");
                for (var i = 0; i < keyValues.length; ++i) {
                    var keyValue = keyValues[i].split("=");
                    if (keyValue.length === 2 && keyValue[0] === key) {
                        return keyValue[1];
                    }
                }
            }
        }
    };
    function AjaxHelperParseDependencyPath(logger, absoluteUrl, method, commandName) {
        var target, name = commandName, data = commandName;
        if (absoluteUrl && absoluteUrl.length > 0) {
            var parsedUrl = urlParseUrl(absoluteUrl);
            target = parsedUrl.host;
            if (!name) {
                if (parsedUrl.pathname != null) {
                    var pathName = (parsedUrl.pathname.length === 0) ? "/" : parsedUrl.pathname;
                    if (pathName.charAt(0) !== '/') {
                        pathName = "/" + pathName;
                    }
                    data = parsedUrl.pathname;
                    name = DataSanitizer.sanitizeString(logger, method ? method + " " + pathName : pathName);
                }
                else {
                    name = DataSanitizer.sanitizeString(logger, absoluteUrl);
                }
            }
        }
        else {
            target = commandName;
            name = commandName;
        }
        return {
            target: target,
            name: name,
            data: data
        };
    }
    function dateTimeUtilsNow() {
        var perf = getPerformance();
        if (perf && perf.now && perf.timing) {
            var now = perf.now() + perf.timing.navigationStart;
            if (now > 0) {
                return now;
            }
        }
        return dateNow();
    }
    function dateTimeUtilsDuration(start, end) {
        var result = null;
        if (start !== 0 && end !== 0 && !isNullOrUndefined(start) && !isNullOrUndefined(end)) {
            result = end - start;
        }
        return result;
    }

    var EventData = /** @class */ (function () {
        function EventData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
        }
        return EventData;
    }());

    var Event$1 = /** @class */ (function (_super) {
        __extends(Event, _super);
        function Event(logger, name, properties, measurements) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                name: FieldType.Required,
                properties: FieldType.Default,
                measurements: FieldType.Default
            };
            _this.name = DataSanitizer.sanitizeString(logger, name) || strNotSpecified;
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            return _this;
        }
        Event.envelopeType = "Microsoft.ApplicationInsights.{0}.Event";
        Event.dataType = "EventData";
        return Event;
    }(EventData));

    var StackFrame = /** @class */ (function () {
        function StackFrame() {
        }
        return StackFrame;
    }());

    var ExceptionData = /** @class */ (function () {
        function ExceptionData() {
            this.ver = 2;
            this.exceptions = [];
            this.properties = {};
            this.measurements = {};
        }
        return ExceptionData;
    }());

    var ExceptionDetails = /** @class */ (function () {
        function ExceptionDetails() {
            this.hasFullStack = true;
            this.parsedStack = [];
        }
        return ExceptionDetails;
    }());

    var strError = "error";
    function _isExceptionDetailsInternal(value) {
        return "hasFullStack" in value && "typeName" in value;
    }
    function _isExceptionInternal(value) {
        return ("ver" in value && "exceptions" in value && "properties" in value);
    }
    function _getErrorType(errorType) {
        var typeName = "";
        if (errorType) {
            typeName = errorType.typeName || errorType.name || "";
            if (!typeName) {
                try {
                    var funcNameRegex = /function (.{1,})\(/;
                    var results = (funcNameRegex).exec((errorType).constructor.toString());
                    typeName = (results && results.length > 1) ? results[1] : "";
                }
                catch (e) {
                }
            }
        }
        return typeName;
    }
    var Exception = /** @class */ (function (_super) {
        __extends(Exception, _super);
        function Exception(logger, exception, properties, measurements, severityLevel, id) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                exceptions: FieldType.Required,
                severityLevel: FieldType.Default,
                properties: FieldType.Default,
                measurements: FieldType.Default
            };
            if (!_isExceptionInternal(exception)) {
                _this.exceptions = [new _ExceptionDetails(logger, exception)];
                _this.properties = DataSanitizer.sanitizeProperties(logger, properties) || {};
                _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
                if (severityLevel) {
                    _this.severityLevel = severityLevel;
                }
                if (id) {
                    _this.id = id;
                }
            }
            else {
                _this.exceptions = exception.exceptions;
                _this.properties = exception.properties;
                _this.measurements = exception.measurements;
                if (exception.severityLevel) {
                    _this.severityLevel = exception.severityLevel;
                }
                if (exception.id) {
                    _this.id = exception.id;
                }
                if (exception.problemGroup) {
                    _this.problemGroup = exception.problemGroup;
                }
                _this.ver = 2;
                if (!isNullOrUndefined(exception.isManual)) {
                    _this.isManual = exception.isManual;
                }
            }
            return _this;
        }
        Exception.CreateFromInterface = function (logger, exception, properties, measurements) {
            var exceptions = exception.exceptions
                && arrMap(exception.exceptions, function (ex) { return _ExceptionDetails.CreateFromInterface(logger, ex); });
            var exceptionData = new Exception(logger, __assign({}, exception, { exceptions: exceptions }), properties, measurements);
            return exceptionData;
        };
        Exception.prototype.toInterface = function () {
            var _a = this, exceptions = _a.exceptions, properties = _a.properties, measurements = _a.measurements, severityLevel = _a.severityLevel; _a.ver; var problemGroup = _a.problemGroup, id = _a.id, isManual = _a.isManual;
            var exceptionDetailsInterface = exceptions instanceof Array
                && arrMap(exceptions, function (exception) { return exception.toInterface(); })
                || undefined;
            return {
                ver: "4.0",
                exceptions: exceptionDetailsInterface,
                severityLevel: severityLevel,
                properties: properties,
                measurements: measurements,
                problemGroup: problemGroup,
                id: id,
                isManual: isManual
            };
        };
        Exception.CreateSimpleException = function (message, typeName, assembly, fileName, details, line) {
            return {
                exceptions: [
                    {
                        hasFullStack: true,
                        message: message,
                        stack: details,
                        typeName: typeName
                    }
                ]
            };
        };
        Exception.envelopeType = "Microsoft.ApplicationInsights.{0}.Exception";
        Exception.dataType = "ExceptionData";
        return Exception;
    }(ExceptionData));
    var _ExceptionDetails = /** @class */ (function (_super) {
        __extends(_ExceptionDetails, _super);
        function _ExceptionDetails(logger, exception) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                id: FieldType.Default,
                outerId: FieldType.Default,
                typeName: FieldType.Required,
                message: FieldType.Required,
                hasFullStack: FieldType.Default,
                stack: FieldType.Default,
                parsedStack: FieldType.Array
            };
            if (!_isExceptionDetailsInternal(exception)) {
                var error = exception;
                if (!isError(error)) {
                    error = error[strError] || error.evt || error;
                }
                _this.typeName = DataSanitizer.sanitizeString(logger, _getErrorType(error)) || strNotSpecified;
                _this.message = DataSanitizer.sanitizeMessage(logger, exception.message) || strNotSpecified;
                var stack = exception.stack;
                _this.parsedStack = _ExceptionDetails.parseStack(stack);
                _this.stack = DataSanitizer.sanitizeException(logger, stack);
                _this.hasFullStack = isArray(_this.parsedStack) && _this.parsedStack.length > 0;
            }
            else {
                _this.typeName = exception.typeName;
                _this.message = exception.message;
                _this.stack = exception.stack;
                _this.parsedStack = exception.parsedStack;
                _this.hasFullStack = exception.hasFullStack;
            }
            return _this;
        }
        _ExceptionDetails.prototype.toInterface = function () {
            var parsedStack = this.parsedStack instanceof Array
                && arrMap(this.parsedStack, function (frame) { return frame.toInterface(); });
            var exceptionDetailsInterface = {
                id: this.id,
                outerId: this.outerId,
                typeName: this.typeName,
                message: this.message,
                hasFullStack: this.hasFullStack,
                stack: this.stack,
                parsedStack: parsedStack || undefined
            };
            return exceptionDetailsInterface;
        };
        _ExceptionDetails.CreateFromInterface = function (logger, exception) {
            var parsedStack = (exception.parsedStack instanceof Array
                && arrMap(exception.parsedStack, function (frame) { return _StackFrame.CreateFromInterface(frame); }))
                || exception.parsedStack;
            var exceptionDetails = new _ExceptionDetails(logger, __assign({}, exception, { parsedStack: parsedStack }));
            return exceptionDetails;
        };
        _ExceptionDetails.parseStack = function (stack) {
            var parsedStack;
            if (isString(stack)) {
                var frames_1 = stack.split('\n');
                parsedStack = [];
                var level = 0;
                var totalSizeInBytes = 0;
                for (var i = 0; i <= frames_1.length; i++) {
                    var frame = frames_1[i];
                    if (_StackFrame.regex.test(frame)) {
                        var parsedFrame = new _StackFrame(frames_1[i], level++);
                        totalSizeInBytes += parsedFrame.sizeInBytes;
                        parsedStack.push(parsedFrame);
                    }
                }
                var exceptionParsedStackThreshold = 32 * 1024;
                if (totalSizeInBytes > exceptionParsedStackThreshold) {
                    var left = 0;
                    var right = parsedStack.length - 1;
                    var size = 0;
                    var acceptedLeft = left;
                    var acceptedRight = right;
                    while (left < right) {
                        var lSize = parsedStack[left].sizeInBytes;
                        var rSize = parsedStack[right].sizeInBytes;
                        size += lSize + rSize;
                        if (size > exceptionParsedStackThreshold) {
                            var howMany = acceptedRight - acceptedLeft + 1;
                            parsedStack.splice(acceptedLeft, howMany);
                            break;
                        }
                        acceptedLeft = left;
                        acceptedRight = right;
                        left++;
                        right--;
                    }
                }
            }
            return parsedStack;
        };
        return _ExceptionDetails;
    }(ExceptionDetails));
    var _StackFrame = /** @class */ (function (_super) {
        __extends(_StackFrame, _super);
        function _StackFrame(sourceFrame, level) {
            var _this = _super.call(this) || this;
            _this.sizeInBytes = 0;
            _this.aiDataContract = {
                level: FieldType.Required,
                method: FieldType.Required,
                assembly: FieldType.Default,
                fileName: FieldType.Default,
                line: FieldType.Default
            };
            if (typeof sourceFrame === "string") {
                var frame = sourceFrame;
                _this.level = level;
                _this.method = "<no_method>";
                _this.assembly = strTrim(frame);
                _this.fileName = "";
                _this.line = 0;
                var matches = frame.match(_StackFrame.regex);
                if (matches && matches.length >= 5) {
                    _this.method = strTrim(matches[2]) || _this.method;
                    _this.fileName = strTrim(matches[4]);
                    _this.line = parseInt(matches[5]) || 0;
                }
            }
            else {
                _this.level = sourceFrame.level;
                _this.method = sourceFrame.method;
                _this.assembly = sourceFrame.assembly;
                _this.fileName = sourceFrame.fileName;
                _this.line = sourceFrame.line;
                _this.sizeInBytes = 0;
            }
            _this.sizeInBytes += _this.method.length;
            _this.sizeInBytes += _this.fileName.length;
            _this.sizeInBytes += _this.assembly.length;
            _this.sizeInBytes += _StackFrame.baseSize;
            _this.sizeInBytes += _this.level.toString().length;
            _this.sizeInBytes += _this.line.toString().length;
            return _this;
        }
        _StackFrame.CreateFromInterface = function (frame) {
            return new _StackFrame(frame, null );
        };
        _StackFrame.prototype.toInterface = function () {
            return {
                level: this.level,
                method: this.method,
                assembly: this.assembly,
                fileName: this.fileName,
                line: this.line
            };
        };
        _StackFrame.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/;
        _StackFrame.baseSize = 58;
        return _StackFrame;
    }(StackFrame));

    var MetricData = /** @class */ (function () {
        function MetricData() {
            this.ver = 2;
            this.metrics = [];
            this.properties = {};
            this.measurements = {};
        }
        return MetricData;
    }());

    var DataPointType;
    (function (DataPointType) {
        DataPointType[DataPointType["Measurement"] = 0] = "Measurement";
        DataPointType[DataPointType["Aggregation"] = 1] = "Aggregation";
    })(DataPointType || (DataPointType = {}));

    var DataPoint$1 = /** @class */ (function () {
        function DataPoint() {
            this.kind = DataPointType.Measurement;
        }
        return DataPoint;
    }());

    var DataPoint = /** @class */ (function (_super) {
        __extends(DataPoint, _super);
        function DataPoint() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.aiDataContract = {
                name: FieldType.Required,
                kind: FieldType.Default,
                value: FieldType.Required,
                count: FieldType.Default,
                min: FieldType.Default,
                max: FieldType.Default,
                stdDev: FieldType.Default
            };
            return _this;
        }
        return DataPoint;
    }(DataPoint$1));

    var Metric = /** @class */ (function (_super) {
        __extends(Metric, _super);
        function Metric(logger, name, value, count, min, max, properties, measurements) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                metrics: FieldType.Required,
                properties: FieldType.Default
            };
            var dataPoint = new DataPoint();
            dataPoint.count = count > 0 ? count : undefined;
            dataPoint.max = isNaN(max) || max === null ? undefined : max;
            dataPoint.min = isNaN(min) || min === null ? undefined : min;
            dataPoint.name = DataSanitizer.sanitizeString(logger, name) || strNotSpecified;
            dataPoint.value = value;
            _this.metrics = [dataPoint];
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            return _this;
        }
        Metric.envelopeType = "Microsoft.ApplicationInsights.{0}.Metric";
        Metric.dataType = "MetricData";
        return Metric;
    }(MetricData));

    var PageViewData = /** @class */ (function (_super) {
        __extends(PageViewData, _super);
        function PageViewData() {
            var _this = _super.call(this) || this;
            _this.ver = 2;
            _this.properties = {};
            _this.measurements = {};
            return _this;
        }
        return PageViewData;
    }(EventData));

    var PageView$1 = /** @class */ (function (_super) {
        __extends(PageView, _super);
        function PageView(logger, name, url, durationMs, properties, measurements, id) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                name: FieldType.Default,
                url: FieldType.Default,
                duration: FieldType.Default,
                properties: FieldType.Default,
                measurements: FieldType.Default,
                id: FieldType.Default
            };
            _this.id = DataSanitizer.sanitizeId(logger, id);
            _this.url = DataSanitizer.sanitizeUrl(logger, url);
            _this.name = DataSanitizer.sanitizeString(logger, name) || strNotSpecified;
            if (!isNaN(durationMs)) {
                _this.duration = msToTimeSpan(durationMs);
            }
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            return _this;
        }
        PageView.envelopeType = "Microsoft.ApplicationInsights.{0}.Pageview";
        PageView.dataType = "PageviewData";
        return PageView;
    }(PageViewData));

    var RemoteDependencyData$1 = /** @class */ (function () {
        function RemoteDependencyData() {
            this.ver = 2;
            this.success = true;
            this.properties = {};
            this.measurements = {};
        }
        return RemoteDependencyData;
    }());

    var RemoteDependencyData = /** @class */ (function (_super) {
        __extends(RemoteDependencyData, _super);
        function RemoteDependencyData(logger, id, absoluteUrl, commandName, value, success, resultCode, method, requestAPI, correlationContext, properties, measurements) {
            if (requestAPI === void 0) { requestAPI = "Ajax"; }
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                id: FieldType.Required,
                ver: FieldType.Required,
                name: FieldType.Default,
                resultCode: FieldType.Default,
                duration: FieldType.Default,
                success: FieldType.Default,
                data: FieldType.Default,
                target: FieldType.Default,
                type: FieldType.Default,
                properties: FieldType.Default,
                measurements: FieldType.Default,
                kind: FieldType.Default,
                value: FieldType.Default,
                count: FieldType.Default,
                min: FieldType.Default,
                max: FieldType.Default,
                stdDev: FieldType.Default,
                dependencyKind: FieldType.Default,
                dependencySource: FieldType.Default,
                commandName: FieldType.Default,
                dependencyTypeName: FieldType.Default
            };
            _this.id = id;
            _this.duration = msToTimeSpan(value);
            _this.success = success;
            _this.resultCode = resultCode + "";
            _this.type = DataSanitizer.sanitizeString(logger, requestAPI);
            var dependencyFields = AjaxHelperParseDependencyPath(logger, absoluteUrl, method, commandName);
            _this.data = DataSanitizer.sanitizeUrl(logger, commandName) || dependencyFields.data;
            _this.target = DataSanitizer.sanitizeString(logger, dependencyFields.target);
            if (correlationContext) {
                _this.target = _this.target + " | " + correlationContext;
            }
            _this.name = DataSanitizer.sanitizeString(logger, dependencyFields.name);
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            return _this;
        }
        RemoteDependencyData.envelopeType = "Microsoft.ApplicationInsights.{0}.RemoteDependency";
        RemoteDependencyData.dataType = "RemoteDependencyData";
        return RemoteDependencyData;
    }(RemoteDependencyData$1));

    var MessageData = /** @class */ (function () {
        function MessageData() {
            this.ver = 2;
            this.properties = {};
            this.measurements = {};
        }
        return MessageData;
    }());

    var Trace$1 = /** @class */ (function (_super) {
        __extends(Trace, _super);
        function Trace(logger, message, severityLevel, properties, measurements) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                message: FieldType.Required,
                severityLevel: FieldType.Default,
                properties: FieldType.Default
            };
            message = message || strNotSpecified;
            _this.message = DataSanitizer.sanitizeMessage(logger, message);
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            if (severityLevel) {
                _this.severityLevel = severityLevel;
            }
            return _this;
        }
        Trace.envelopeType = "Microsoft.ApplicationInsights.{0}.Message";
        Trace.dataType = "MessageData";
        return Trace;
    }(MessageData));

    var PageViewPerfData = /** @class */ (function (_super) {
        __extends(PageViewPerfData, _super);
        function PageViewPerfData() {
            var _this = _super.call(this) || this;
            _this.ver = 2;
            _this.properties = {};
            _this.measurements = {};
            return _this;
        }
        return PageViewPerfData;
    }(PageViewData));

    var PageViewPerformance$1 = /** @class */ (function (_super) {
        __extends(PageViewPerformance, _super);
        function PageViewPerformance(logger, name, url, unused, properties, measurements, cs4BaseData) {
            var _this = _super.call(this) || this;
            _this.aiDataContract = {
                ver: FieldType.Required,
                name: FieldType.Default,
                url: FieldType.Default,
                duration: FieldType.Default,
                perfTotal: FieldType.Default,
                networkConnect: FieldType.Default,
                sentRequest: FieldType.Default,
                receivedResponse: FieldType.Default,
                domProcessing: FieldType.Default,
                properties: FieldType.Default,
                measurements: FieldType.Default
            };
            _this.url = DataSanitizer.sanitizeUrl(logger, url);
            _this.name = DataSanitizer.sanitizeString(logger, name) || strNotSpecified;
            _this.properties = DataSanitizer.sanitizeProperties(logger, properties);
            _this.measurements = DataSanitizer.sanitizeMeasurements(logger, measurements);
            if (cs4BaseData) {
                _this.domProcessing = cs4BaseData.domProcessing;
                _this.duration = cs4BaseData.duration;
                _this.networkConnect = cs4BaseData.networkConnect;
                _this.perfTotal = cs4BaseData.perfTotal;
                _this.receivedResponse = cs4BaseData.receivedResponse;
                _this.sentRequest = cs4BaseData.sentRequest;
            }
            return _this;
        }
        PageViewPerformance.envelopeType = "Microsoft.ApplicationInsights.{0}.PageviewPerformance";
        PageViewPerformance.dataType = "PageviewPerformanceData";
        return PageViewPerformance;
    }(PageViewPerfData));

    var SeverityLevel;
    (function (SeverityLevel) {
        SeverityLevel[SeverityLevel["Verbose"] = 0] = "Verbose";
        SeverityLevel[SeverityLevel["Information"] = 1] = "Information";
        SeverityLevel[SeverityLevel["Warning"] = 2] = "Warning";
        SeverityLevel[SeverityLevel["Error"] = 3] = "Error";
        SeverityLevel[SeverityLevel["Critical"] = 4] = "Critical";
    })(SeverityLevel || (SeverityLevel = {}));

    var TelemetryItemCreator = /** @class */ (function () {
        function TelemetryItemCreator() {
        }
        TelemetryItemCreator.create = function (item, baseType, envelopeName, logger, customProperties, systemProperties) {
            envelopeName = DataSanitizer.sanitizeString(logger, envelopeName) || strNotSpecified;
            if (isNullOrUndefined(item) ||
                isNullOrUndefined(baseType) ||
                isNullOrUndefined(envelopeName)) {
                throw Error("Input doesn't contain all required fields");
            }
            var telemetryItem = {
                name: envelopeName,
                time: toISOString(new Date()),
                iKey: "",
                ext: systemProperties ? systemProperties : {},
                tags: [],
                data: {},
                baseType: baseType,
                baseData: item
            };
            if (!isNullOrUndefined(customProperties)) {
                objForEachKey(customProperties, function (prop, value) {
                    telemetryItem.data[prop] = value;
                });
            }
            return telemetryItem;
        };
        return TelemetryItemCreator;
    }());

    var PropertiesPluginIdentifier = "AppInsightsPropertiesPlugin";
    var AnalyticsPluginIdentifier = "ApplicationInsightsAnalytics";

    /*!
     * Application Insights JavaScript SDK - Web Analytics, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var PageViewManager = /** @class */ (function () {
        function PageViewManager(appInsights, overridePageViewDuration, core, pageViewPerformanceManager) {
            dynamicProto(PageViewManager, this, function (_self) {
                var intervalHandle = null;
                var itemQueue = [];
                var pageViewPerformanceSent = false;
                var _logger;
                if (core) {
                    _logger = core.logger;
                }
                function _flushChannels() {
                    if (core) {
                        arrForEach(core.getTransmissionControls(), function (queues) {
                            arrForEach(queues, function (q) { return q.flush(true); });
                        });
                    }
                }
                function _addQueue(cb) {
                    itemQueue.push(cb);
                    if (!intervalHandle) {
                        intervalHandle = setInterval((function () {
                            var allItems = itemQueue.slice(0);
                            var doFlush = false;
                            itemQueue = [];
                            arrForEach(allItems, function (item) {
                                if (!item()) {
                                    itemQueue.push(item);
                                }
                                else {
                                    doFlush = true;
                                }
                            });
                            if (itemQueue.length === 0) {
                                clearInterval(intervalHandle);
                                intervalHandle = null;
                            }
                            if (doFlush) {
                                _flushChannels();
                            }
                        }), 100);
                    }
                }
                _self.trackPageView = function (pageView, customProperties) {
                    var name = pageView.name;
                    if (isNullOrUndefined(name) || typeof name !== "string") {
                        var doc = getDocument();
                        name = pageView.name = doc && doc.title || "";
                    }
                    var uri = pageView.uri;
                    if (isNullOrUndefined(uri) || typeof uri !== "string") {
                        var location_1 = getLocation();
                        uri = pageView.uri = location_1 && location_1.href || "";
                    }
                    if (!pageViewPerformanceManager.isPerformanceTimingSupported()) {
                        appInsights.sendPageViewInternal(pageView, customProperties);
                        _flushChannels();
                        _logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.NavigationTimingNotSupported, "trackPageView: navigation timing API used for calculation of page duration is not supported in this browser. This page view will be collected without duration and timing info.");
                        return;
                    }
                    var pageViewSent = false;
                    var customDuration;
                    var start = pageViewPerformanceManager.getPerformanceTiming().navigationStart;
                    if (start > 0) {
                        customDuration = dateTimeUtilsDuration(start, +new Date);
                        if (!pageViewPerformanceManager.shouldCollectDuration(customDuration)) {
                            customDuration = undefined;
                        }
                    }
                    var duration;
                    if (!isNullOrUndefined(customProperties) &&
                        !isNullOrUndefined(customProperties.duration)) {
                        duration = customProperties.duration;
                    }
                    if (overridePageViewDuration || !isNaN(duration)) {
                        if (isNaN(duration)) {
                            if (!customProperties) {
                                customProperties = {};
                            }
                            customProperties["duration"] = customDuration;
                        }
                        appInsights.sendPageViewInternal(pageView, customProperties);
                        _flushChannels();
                        pageViewSent = true;
                    }
                    var maxDurationLimit = 60000;
                    if (!customProperties) {
                        customProperties = {};
                    }
                    _addQueue(function () {
                        var processed = false;
                        try {
                            if (pageViewPerformanceManager.isPerformanceTimingDataReady()) {
                                processed = true;
                                var pageViewPerformance = {
                                    name: name,
                                    uri: uri
                                };
                                pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
                                if (!pageViewPerformance.isValid && !pageViewSent) {
                                    customProperties["duration"] = customDuration;
                                    appInsights.sendPageViewInternal(pageView, customProperties);
                                }
                                else {
                                    if (!pageViewSent) {
                                        customProperties["duration"] = pageViewPerformance.durationMs;
                                        appInsights.sendPageViewInternal(pageView, customProperties);
                                    }
                                    if (!pageViewPerformanceSent) {
                                        appInsights.sendPageViewPerformanceInternal(pageViewPerformance, customProperties);
                                        pageViewPerformanceSent = true;
                                    }
                                }
                            }
                            else if (start > 0 && dateTimeUtilsDuration(start, +new Date) > maxDurationLimit) {
                                processed = true;
                                if (!pageViewSent) {
                                    customProperties["duration"] = maxDurationLimit;
                                    appInsights.sendPageViewInternal(pageView, customProperties);
                                }
                            }
                        }
                        catch (e) {
                            _logger.throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailedCalc, "trackPageView failed on page load calculation: " + getExceptionName(e), { exception: dumpObj(e) });
                        }
                        return processed;
                    });
                };
            });
        }
        return PageViewManager;
    }());

    /*!
     * Application Insights JavaScript SDK - Web Analytics, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var PageVisitTimeManager = /** @class */ (function () {
        function PageVisitTimeManager(logger, pageVisitTimeTrackingHandler) {
            this.prevPageVisitDataKeyName = "prevPageVisitData";
            this.pageVisitTimeTrackingHandler = pageVisitTimeTrackingHandler;
            this._logger = logger;
        }
        PageVisitTimeManager.prototype.trackPreviousPageVisit = function (currentPageName, currentPageUrl) {
            try {
                var prevPageVisitTimeData = this.restartPageVisitTimer(currentPageName, currentPageUrl);
                if (prevPageVisitTimeData) {
                    this.pageVisitTimeTrackingHandler(prevPageVisitTimeData.pageName, prevPageVisitTimeData.pageUrl, prevPageVisitTimeData.pageVisitTime);
                }
            }
            catch (e) {
                this._logger.warnToConsole("Auto track page visit time failed, metric will not be collected: " + dumpObj(e));
            }
        };
        PageVisitTimeManager.prototype.restartPageVisitTimer = function (pageName, pageUrl) {
            try {
                var prevPageVisitData = this.stopPageVisitTimer();
                this.startPageVisitTimer(pageName, pageUrl);
                return prevPageVisitData;
            }
            catch (e) {
                this._logger.warnToConsole("Call to restart failed: " + dumpObj(e));
                return null;
            }
        };
        PageVisitTimeManager.prototype.startPageVisitTimer = function (pageName, pageUrl) {
            try {
                if (utlCanUseSessionStorage()) {
                    if (utlGetSessionStorage(this._logger, this.prevPageVisitDataKeyName) != null) {
                        throwError("Cannot call startPageVisit consecutively without first calling stopPageVisit");
                    }
                    var currPageVisitData = new PageVisitData(pageName, pageUrl);
                    var currPageVisitDataStr = getJSON().stringify(currPageVisitData);
                    utlSetSessionStorage(this._logger, this.prevPageVisitDataKeyName, currPageVisitDataStr);
                }
            }
            catch (e) {
                this._logger.warnToConsole("Call to start failed: " + dumpObj(e));
            }
        };
        PageVisitTimeManager.prototype.stopPageVisitTimer = function () {
            try {
                if (utlCanUseSessionStorage()) {
                    var pageVisitEndTime = dateNow();
                    var pageVisitDataJsonStr = utlGetSessionStorage(this._logger, this.prevPageVisitDataKeyName);
                    if (pageVisitDataJsonStr && hasJSON()) {
                        var prevPageVisitData = getJSON().parse(pageVisitDataJsonStr);
                        prevPageVisitData.pageVisitTime = pageVisitEndTime - prevPageVisitData.pageVisitStartTime;
                        utlRemoveSessionStorage(this._logger, this.prevPageVisitDataKeyName);
                        return prevPageVisitData;
                    }
                    else {
                        return null;
                    }
                }
                return null;
            }
            catch (e) {
                this._logger.warnToConsole("Stop page visit timer failed: " + dumpObj(e));
                return null;
            }
        };
        return PageVisitTimeManager;
    }());
    var PageVisitData = /** @class */ (function () {
        function PageVisitData(pageName, pageUrl) {
            this.pageVisitStartTime = dateNow();
            this.pageName = pageName;
            this.pageUrl = pageUrl;
        }
        return PageVisitData;
    }());

    /*!
     * Application Insights JavaScript SDK - Web Analytics, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var PageViewPerformanceManager = /** @class */ (function () {
        function PageViewPerformanceManager(core) {
            this.MAX_DURATION_ALLOWED = 3600000;
            if (core) {
                this._logger = core.logger;
            }
        }
        PageViewPerformanceManager.prototype.populatePageViewPerformanceEvent = function (pageViewPerformance) {
            pageViewPerformance.isValid = false;
            var navigationTiming = this.getPerformanceNavigationTiming();
            var timing = this.getPerformanceTiming();
            if (navigationTiming || timing) {
                if (navigationTiming) {
                    var total = navigationTiming.duration;
                    var network = dateTimeUtilsDuration(navigationTiming.startTime, navigationTiming.connectEnd);
                    var request = dateTimeUtilsDuration(navigationTiming.requestStart, navigationTiming.responseStart);
                    var response = dateTimeUtilsDuration(navigationTiming.responseStart, navigationTiming.responseEnd);
                    var dom = dateTimeUtilsDuration(navigationTiming.responseEnd, navigationTiming.loadEventEnd);
                }
                else {
                    var total = dateTimeUtilsDuration(timing.navigationStart, timing.loadEventEnd);
                    var network = dateTimeUtilsDuration(timing.navigationStart, timing.connectEnd);
                    var request = dateTimeUtilsDuration(timing.requestStart, timing.responseStart);
                    var response = dateTimeUtilsDuration(timing.responseStart, timing.responseEnd);
                    var dom = dateTimeUtilsDuration(timing.responseEnd, timing.loadEventEnd);
                }
                if (total === 0) {
                    this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ErrorPVCalc, "error calculating page view performance.", { total: total, network: network, request: request, response: response, dom: dom });
                }
                else if (!this.shouldCollectDuration(total, network, request, response, dom)) {
                    this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.InvalidDurationValue, "Invalid page load duration value. Browser perf data won't be sent.", { total: total, network: network, request: request, response: response, dom: dom });
                }
                else if (total < Math.floor(network) + Math.floor(request) + Math.floor(response) + Math.floor(dom)) {
                    this._logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.ClientPerformanceMathError, "client performance math error.", { total: total, network: network, request: request, response: response, dom: dom });
                }
                else {
                    pageViewPerformance.durationMs = total;
                    pageViewPerformance.perfTotal = pageViewPerformance.duration = msToTimeSpan(total);
                    pageViewPerformance.networkConnect = msToTimeSpan(network);
                    pageViewPerformance.sentRequest = msToTimeSpan(request);
                    pageViewPerformance.receivedResponse = msToTimeSpan(response);
                    pageViewPerformance.domProcessing = msToTimeSpan(dom);
                    pageViewPerformance.isValid = true;
                }
            }
        };
        PageViewPerformanceManager.prototype.getPerformanceTiming = function () {
            if (this.isPerformanceTimingSupported()) {
                return getPerformance().timing;
            }
            return null;
        };
        PageViewPerformanceManager.prototype.getPerformanceNavigationTiming = function () {
            if (this.isPerformanceNavigationTimingSupported()) {
                return getPerformance().getEntriesByType("navigation")[0];
            }
            return null;
        };
        PageViewPerformanceManager.prototype.isPerformanceNavigationTimingSupported = function () {
            var perf = getPerformance();
            return perf && perf.getEntriesByType && perf.getEntriesByType("navigation").length > 0;
        };
        PageViewPerformanceManager.prototype.isPerformanceTimingSupported = function () {
            var perf = getPerformance();
            return perf && perf.timing;
        };
        PageViewPerformanceManager.prototype.isPerformanceTimingDataReady = function () {
            var perf = getPerformance();
            var timing = perf ? perf.timing : 0;
            return timing
                && timing.domainLookupStart > 0
                && timing.navigationStart > 0
                && timing.responseStart > 0
                && timing.requestStart > 0
                && timing.loadEventEnd > 0
                && timing.responseEnd > 0
                && timing.connectEnd > 0
                && timing.domLoading > 0;
        };
        PageViewPerformanceManager.prototype.shouldCollectDuration = function () {
            var durations = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                durations[_i] = arguments[_i];
            }
            var _navigator = getNavigator() || {};
            var botAgentNames = ['googlebot', 'adsbot-google', 'apis-google', 'mediapartners-google'];
            var userAgent = _navigator.userAgent;
            var isGoogleBot = false;
            if (userAgent) {
                for (var i = 0; i < botAgentNames.length; i++) {
                    isGoogleBot = isGoogleBot || userAgent.toLowerCase().indexOf(botAgentNames[i]) !== -1;
                }
            }
            if (isGoogleBot) {
                return false;
            }
            else {
                for (var i = 0; i < durations.length; i++) {
                    if (durations[i] < 0 || durations[i] >= this.MAX_DURATION_ALLOWED) {
                        return false;
                    }
                }
            }
            return true;
        };
        return PageViewPerformanceManager;
    }());

    /*!
     * Application Insights JavaScript SDK - Web Analytics, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var durationProperty = "duration";
    function _dispatchEvent(target, evnt) {
        if (target && target.dispatchEvent && evnt) {
            target.dispatchEvent(evnt);
        }
    }
    function _formatMessage(message) {
        if (message && !isString(message)) {
            if (isFunction(message.toString)) {
                message = message.toString();
            }
            else {
                message = JSON.stringify(message);
            }
        }
        return message;
    }
    var ApplicationInsights$2 = /** @class */ (function (_super) {
        __extends(ApplicationInsights, _super);
        function ApplicationInsights() {
            var _this = _super.call(this) || this;
            _this.identifier = AnalyticsPluginIdentifier;
            _this.priority = 180;
            _this.autoRoutePVDelay = 500;
            var _eventTracking;
            var _pageTracking;
            var _properties;
            var _prevUri;
            var _currUri;
            dynamicProto(ApplicationInsights, _this, function (_self, _base) {
                var location = getLocation(true);
                _prevUri = location && location.href || "";
                _self.getCookieMgr = function () {
                    return safeGetCookieMgr(_self.core);
                };
                _self.processTelemetry = function (env, itemCtx) {
                    doPerf(_self.core, function () { return _self.identifier + ":processTelemetry"; }, function () {
                        var doNotSendItem = false;
                        var telemetryInitializersCount = _self._telemetryInitializers.length;
                        itemCtx = _self._getTelCtx(itemCtx);
                        for (var i = 0; i < telemetryInitializersCount; ++i) {
                            var telemetryInitializer = _self._telemetryInitializers[i];
                            if (telemetryInitializer) {
                                try {
                                    if (telemetryInitializer.apply(null, [env]) === false) {
                                        doNotSendItem = true;
                                        break;
                                    }
                                }
                                catch (e) {
                                    itemCtx.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TelemetryInitializerFailed, "One of telemetry initializers failed, telemetry item will not be sent: " + getExceptionName(e), { exception: dumpObj(e) }, true);
                                }
                            }
                        }
                        if (!doNotSendItem) {
                            _self.processNext(env, itemCtx);
                        }
                    }, function () { return ({ item: env }); }, !(env.sync));
                };
                _self.trackEvent = function (event, customProperties) {
                    try {
                        var telemetryItem = TelemetryItemCreator.create(event, Event$1.dataType, Event$1.envelopeType, _self.diagLog(), customProperties);
                        _self.core.track(telemetryItem);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.startTrackEvent = function (name) {
                    try {
                        _eventTracking.start(name);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackEventFailed, "startTrackEvent failed, event will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.stopTrackEvent = function (name, properties, measurements) {
                    try {
                        _eventTracking.stop(name, undefined, properties);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackEventFailed, "stopTrackEvent failed, event will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.trackTrace = function (trace, customProperties) {
                    try {
                        var telemetryItem = TelemetryItemCreator.create(trace, Trace$1.dataType, Trace$1.envelopeType, _self.diagLog(), customProperties);
                        _self.core.track(telemetryItem);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.WARNING, _InternalMessageId.TrackTraceFailed, "trackTrace failed, trace will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.trackMetric = function (metric, customProperties) {
                    try {
                        var telemetryItem = TelemetryItemCreator.create(metric, Metric.dataType, Metric.envelopeType, _self.diagLog(), customProperties);
                        _self.core.track(telemetryItem);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackMetricFailed, "trackMetric failed, metric will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.trackPageView = function (pageView, customProperties) {
                    try {
                        var inPv = pageView || {};
                        _self._pageViewManager.trackPageView(inPv, __assign({}, inPv.properties, inPv.measurements, customProperties));
                        if (_self.config.autoTrackPageVisitTime) {
                            _self._pageVisitTimeManager.trackPreviousPageVisit(inPv.name, inPv.uri);
                        }
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageView failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.sendPageViewInternal = function (pageView, properties, systemProperties) {
                    var doc = getDocument();
                    if (doc) {
                        pageView.refUri = pageView.refUri === undefined ? doc.referrer : pageView.refUri;
                    }
                    var telemetryItem = TelemetryItemCreator.create(pageView, PageView$1.dataType, PageView$1.envelopeType, _self.diagLog(), properties, systemProperties);
                    _self.core.track(telemetryItem);
                };
                _self.sendPageViewPerformanceInternal = function (pageViewPerformance, properties, systemProperties) {
                    var telemetryItem = TelemetryItemCreator.create(pageViewPerformance, PageViewPerformance$1.dataType, PageViewPerformance$1.envelopeType, _self.diagLog(), properties, systemProperties);
                    _self.core.track(telemetryItem);
                };
                _self.trackPageViewPerformance = function (pageViewPerformance, customProperties) {
                    try {
                        _self._pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
                        _self.sendPageViewPerformanceInternal(pageViewPerformance, customProperties);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackPVFailed, "trackPageViewPerformance failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.startTrackPage = function (name) {
                    try {
                        if (typeof name !== "string") {
                            var doc = getDocument();
                            name = doc && doc.title || "";
                        }
                        _pageTracking.start(name);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StartTrackFailed, "startTrackPage failed, page view may not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.stopTrackPage = function (name, url, properties, measurement) {
                    try {
                        if (typeof name !== "string") {
                            var doc = getDocument();
                            name = doc && doc.title || "";
                        }
                        if (typeof url !== "string") {
                            var loc = getLocation();
                            url = loc && loc.href || "";
                        }
                        _pageTracking.stop(name, url, properties, measurement);
                        if (_self.config.autoTrackPageVisitTime) {
                            _self._pageVisitTimeManager.trackPreviousPageVisit(name, url);
                        }
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.StopTrackFailed, "stopTrackPage failed, page view will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self.sendExceptionInternal = function (exception, customProperties, systemProperties) {
                    var exceptionPartB = new Exception(_self.diagLog(), exception.exception || new Error(strNotSpecified), exception.properties, exception.measurements, exception.severityLevel, exception.id).toInterface();
                    var telemetryItem = TelemetryItemCreator.create(exceptionPartB, Exception.dataType, Exception.envelopeType, _self.diagLog(), customProperties, systemProperties);
                    _self.core.track(telemetryItem);
                };
                _self.trackException = function (exception, customProperties) {
                    try {
                        _self.sendExceptionInternal(exception, customProperties);
                    }
                    catch (e) {
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.TrackExceptionFailed, "trackException failed, exception will not be collected: " + getExceptionName(e), { exception: dumpObj(e) });
                    }
                };
                _self._onerror = function (exception) {
                    try {
                        var properties_1 = {
                            url: (exception && exception.url) || (getDocument() || {}).URL,
                            lineNumber: exception.lineNumber,
                            columnNumber: exception.columnNumber,
                            message: exception.message
                        };
                        if (isCrossOriginError(exception.message, exception.url, exception.lineNumber, exception.columnNumber, exception.error)) {
                            _sendCORSException(properties_1.url);
                        }
                        else {
                            if (!isError(exception.error)) {
                                var stack = "window.onerror@" + properties_1.url + ":" + exception.lineNumber + ":" + (exception.columnNumber || 0);
                                exception.error = new Error(exception.message);
                                exception.error.stack = stack;
                            }
                            _self.trackException({ exception: exception.error, severityLevel: SeverityLevel.Error }, properties_1);
                        }
                    }
                    catch (e) {
                        var errorString = exception.error ?
                            (exception.error.name + ", " + exception.error.message)
                            : "null";
                        _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _InternalMessageId.ExceptionWhileLoggingError, "_onError threw exception while logging error, error will not be collected: "
                            + getExceptionName(e), { exception: dumpObj(e), errorString: errorString });
                    }
                };
                _self.addTelemetryInitializer = function (telemetryInitializer) {
                    _self._telemetryInitializers.push(telemetryInitializer);
                };
                _self.initialize = function (config, core, extensions, pluginChain) {
                    if (_self.isInitialized()) {
                        return;
                    }
                    if (isNullOrUndefined(core)) {
                        throw Error("Error initializing");
                    }
                    _base.initialize(config, core, extensions, pluginChain);
                    _self.setInitialized(false);
                    var ctx = _self._getTelCtx();
                    var identifier = _self.identifier;
                    _self.config = ctx.getExtCfg(identifier);
                    var defaults = ApplicationInsights.getDefaultConfig();
                    if (defaults !== undefined) {
                        objForEachKey(defaults, function (field, value) {
                            _self.config[field] = ctx.getConfig(identifier, field, value);
                            if (_self.config[field] === undefined) {
                                _self.config[field] = value;
                            }
                        });
                    }
                    if (_self.config.isStorageUseDisabled) {
                        utlDisableStorage();
                    }
                    var configGetters = {
                        instrumentationKey: function () { return config.instrumentationKey; },
                        accountId: function () { return _self.config.accountId || config.accountId; },
                        sessionRenewalMs: function () { return _self.config.sessionRenewalMs || config.sessionRenewalMs; },
                        sessionExpirationMs: function () { return _self.config.sessionExpirationMs || config.sessionExpirationMs; },
                        sampleRate: function () { return _self.config.samplingPercentage || config.samplingPercentage; },
                        sdkExtension: function () { return _self.config.sdkExtension || config.sdkExtension; },
                        isBrowserLinkTrackingEnabled: function () { return _self.config.isBrowserLinkTrackingEnabled || config.isBrowserLinkTrackingEnabled; },
                        appId: function () { return _self.config.appId || config.appId; }
                    };
                    _self._pageViewPerformanceManager = new PageViewPerformanceManager(_self.core);
                    _self._pageViewManager = new PageViewManager(_this, _self.config.overridePageViewDuration, _self.core, _self._pageViewPerformanceManager);
                    _self._pageVisitTimeManager = new PageVisitTimeManager(_self.diagLog(), function (pageName, pageUrl, pageVisitTime) { return trackPageVisitTime(pageName, pageUrl, pageVisitTime); });
                    _self._telemetryInitializers = _self._telemetryInitializers || [];
                    _addDefaultTelemetryInitializers(configGetters);
                    _eventTracking = new Timing(_self.diagLog(), "trackEvent");
                    _eventTracking.action =
                        function (name, url, duration, properties) {
                            if (!properties) {
                                properties = {};
                            }
                            properties[durationProperty] = duration.toString();
                            _self.trackEvent({ name: name, properties: properties });
                        };
                    _pageTracking = new Timing(_self.diagLog(), "trackPageView");
                    _pageTracking.action = function (name, url, duration, properties, measurements) {
                        if (isNullOrUndefined(properties)) {
                            properties = {};
                        }
                        properties[durationProperty] = duration.toString();
                        var pageViewItem = {
                            name: name,
                            uri: url,
                            properties: properties,
                            measurements: measurements
                        };
                        _self.sendPageViewInternal(pageViewItem, properties);
                    };
                    var _window = getWindow();
                    var _history = getHistory();
                    var _location = getLocation(true);
                    var instance = _this;
                    if (_self.config.disableExceptionTracking === false &&
                        !_self.config.autoExceptionInstrumented && _window) {
                        var onerror_1 = "onerror";
                        var originalOnError_1 = _window[onerror_1];
                        _window.onerror = function (message, url, lineNumber, columnNumber, error) {
                            var handled = originalOnError_1 && originalOnError_1(message, url, lineNumber, columnNumber, error);
                            if (handled !== true) {
                                instance._onerror({
                                    message: _formatMessage(message),
                                    url: url,
                                    lineNumber: lineNumber,
                                    columnNumber: columnNumber,
                                    error: error
                                });
                            }
                            return handled;
                        };
                        _self.config.autoExceptionInstrumented = true;
                    }
                    if (_self.config.disableExceptionTracking === false &&
                        _self.config.enableUnhandledPromiseRejectionTracking === true &&
                        !_self.config.autoUnhandledPromiseInstrumented && _window) {
                        var onunhandledrejection = "onunhandledrejection";
                        var originalOnUnhandledRejection_1 = _window[onunhandledrejection];
                        _window[onunhandledrejection] = function (error) {
                            var handled = originalOnUnhandledRejection_1 && originalOnUnhandledRejection_1.call(_window, error);
                            if (handled !== true) {
                                instance._onerror({
                                    message: error.reason.toString(),
                                    error: error.reason instanceof Error ? error.reason : new Error(error.reason.toString()),
                                    url: _location ? _location.href : "",
                                    lineNumber: 0,
                                    columnNumber: 0
                                });
                            }
                            return handled;
                        };
                        _self.config.autoUnhandledPromiseInstrumented = true;
                    }
                    if (_self.config.enableAutoRouteTracking === true
                        && _history && isFunction(_history.pushState) && isFunction(_history.replaceState)
                        && _window
                        && typeof Event !== "undefined") {
                        var _self_1 = _this;
                        arrForEach(extensions, function (extension) {
                            if (extension.identifier === PropertiesPluginIdentifier) {
                                _properties = extension;
                            }
                        });
                        _history.pushState = (function (f) { return function pushState() {
                            var ret = f.apply(this, arguments);
                            _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "pushState"));
                            _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
                            return ret;
                        }; })(_history.pushState);
                        _history.replaceState = (function (f) { return function replaceState() {
                            var ret = f.apply(this, arguments);
                            _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "replaceState"));
                            _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
                            return ret;
                        }; })(_history.replaceState);
                        if (_window.addEventListener) {
                            _window.addEventListener(_self_1.config.namePrefix + "popstate", function () {
                                _dispatchEvent(_window, createDomEvent(_self_1.config.namePrefix + "locationchange"));
                            });
                            _window.addEventListener(_self_1.config.namePrefix + "locationchange", function () {
                                if (_properties && _properties.context && _properties.context.telemetryTrace) {
                                    _properties.context.telemetryTrace.traceID = generateW3CId();
                                    _properties.context.telemetryTrace.name = _location && _location.pathname || "_unknown_";
                                }
                                if (_currUri) {
                                    _prevUri = _currUri;
                                    _currUri = _location && _location.href || "";
                                }
                                else {
                                    _currUri = _location && _location.href || "";
                                }
                                setTimeout((function (uri) {
                                    _self_1.trackPageView({ refUri: uri, properties: { duration: 0 } });
                                }).bind(_this, _prevUri), _self_1.autoRoutePVDelay);
                            });
                        }
                    }
                    _self.setInitialized(true);
                };
                function trackPageVisitTime(pageName, pageUrl, pageVisitTime) {
                    var properties = { PageName: pageName, PageUrl: pageUrl };
                    _self.trackMetric({
                        name: "PageVisitTime",
                        average: pageVisitTime,
                        max: pageVisitTime,
                        min: pageVisitTime,
                        sampleCount: 1
                    }, properties);
                }
                function _addDefaultTelemetryInitializers(configGetters) {
                    if (!configGetters.isBrowserLinkTrackingEnabled()) {
                        var browserLinkPaths_1 = ['/browserLinkSignalR/', '/__browserLink/'];
                        var dropBrowserLinkRequests = function (envelope) {
                            if (envelope.baseType === RemoteDependencyData.dataType) {
                                var remoteData = envelope.baseData;
                                if (remoteData) {
                                    for (var i = 0; i < browserLinkPaths_1.length; i++) {
                                        if (remoteData.target && remoteData.target.indexOf(browserLinkPaths_1[i]) >= 0) {
                                            return false;
                                        }
                                    }
                                }
                            }
                            return true;
                        };
                        _addTelemetryInitializer(dropBrowserLinkRequests);
                    }
                }
                function _addTelemetryInitializer(telemetryInitializer) {
                    _self._telemetryInitializers.push(telemetryInitializer);
                }
                function _sendCORSException(url) {
                    var exception = {
                        message: "Script error: The browser's same-origin policy prevents us from getting the details of this exception. Consider using the 'crossorigin' attribute.",
                        url: url,
                        lineNumber: 0,
                        columnNumber: 0,
                        error: undefined
                    };
                    var telemetryItem = TelemetryItemCreator.create(exception, Exception.dataType, Exception.envelopeType, _self.diagLog(), { url: url });
                    _self.core.track(telemetryItem);
                }
            });
            return _this;
        }
        ApplicationInsights.getDefaultConfig = function (config) {
            if (!config) {
                config = {};
            }
            config.sessionRenewalMs = 30 * 60 * 1000;
            config.sessionExpirationMs = 24 * 60 * 60 * 1000;
            config.disableExceptionTracking = stringToBoolOrDefault(config.disableExceptionTracking);
            config.autoTrackPageVisitTime = stringToBoolOrDefault(config.autoTrackPageVisitTime);
            config.overridePageViewDuration = stringToBoolOrDefault(config.overridePageViewDuration);
            config.enableUnhandledPromiseRejectionTracking = stringToBoolOrDefault(config.enableUnhandledPromiseRejectionTracking);
            if (isNaN(config.samplingPercentage) || config.samplingPercentage <= 0 || config.samplingPercentage >= 100) {
                config.samplingPercentage = 100;
            }
            config.isStorageUseDisabled = stringToBoolOrDefault(config.isStorageUseDisabled);
            config.isBrowserLinkTrackingEnabled = stringToBoolOrDefault(config.isBrowserLinkTrackingEnabled);
            config.enableAutoRouteTracking = stringToBoolOrDefault(config.enableAutoRouteTracking);
            config.namePrefix = config.namePrefix || "";
            return config;
        };
        ApplicationInsights.Version = "2.6.1";
        return ApplicationInsights;
    }(BaseTelemetryPlugin));
    var Timing = /** @class */ (function () {
        function Timing(logger, name) {
            var _self = this;
            var _events = {};
            _self.start = function (name) {
                if (typeof _events[name] !== "undefined") {
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StartCalledMoreThanOnce, "start was called more than once for this event without calling stop.", { name: name, key: name }, true);
                }
                _events[name] = +new Date;
            };
            _self.stop = function (name, url, properties, measurements) {
                var start = _events[name];
                if (isNaN(start)) {
                    logger.throwInternal(LoggingSeverity.WARNING, _InternalMessageId.StopCalledWithoutStart, "stop was called without a corresponding start.", { name: name, key: name }, true);
                }
                else {
                    var end = +new Date;
                    var duration = dateTimeUtilsDuration(start, end);
                    _self.action(name, url, duration, properties, measurements);
                }
                delete _events[name];
                _events[name] = undefined;
            };
        }
        return Timing;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var MSCONTENT_PARTB_VERSION = "1.0";
    var CONTENT_VERSION = "2.0";
    var MAX_CONTENTNAME_LENGTH = 200;

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _removeNonObjectsAndInvalidElements$1(overrideConfig, attributeNamesExpectedObjects) {
        _removeInvalidElements$1(overrideConfig);
        arrForEach(attributeNamesExpectedObjects, function (objectName, i) {
            if (isObject(overrideConfig[objectName])) {
                _removeInvalidElements$1(overrideConfig[objectName]);
            }
            else {
                delete overrideConfig[objectName];
            }
        });
    }
    function _removeInvalidElements$1(object) {
        objForEachKey(object, function (property, value) {
            if (!isValueAssigned(value) ||
                (JSON.stringify(value) === "{}" && (property !== "callback"))) {
                delete object[property];
            }
        });
    }
    function _getIntersectionArea(rect1, rect2) {
        var x11 = rect1.left;
        var y11 = rect1.top;
        var x12 = rect1.right;
        var y12 = rect1.bottom;
        var x21 = rect2.left;
        var y21 = rect2.top;
        var x22 = rect2.right;
        var y22 = rect2.bottom;
        var xOverlap = Math.max(0, Math.min(x12, x22) - Math.max(x11, x21));
        var yOverlap = Math.max(0, Math.min(y12, y22) - Math.max(y11, y21));
        return xOverlap * yOverlap;
    }
    function _findClosestAnchor(element) {
        return _walkUpDomChainWithElementValidation(element, _isElementAnAnchor);
    }
    function _walkUpDomChainWithElementValidation(el, validationMethod, validationMethodParam) {
        var element = el;
        if (element) {
            element = _returnDomObjectIfjQuery(element);
            while (!validationMethod(element, validationMethodParam)) {
                element = element.parentNode;
                element = _returnDomObjectIfjQuery(element);
                if (!element || !(element.getAttribute)) {
                    return null;
                }
            }
            return element;
        }
    }
    function _isElementAnAnchor(element) {
        return element.nodeName === "A";
    }
    function _returnDomObjectIfjQuery(element) {
        return element;
    }
    function _isElementTrulyVisible(element, viewportBoundingRect) {
        element = _returnDomObjectIfjQuery(element);
        var rect = element.getBoundingClientRect();
        var intersectionArea = _getIntersectionArea(rect, viewportBoundingRect);
        if (intersectionArea > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    function _extractFieldFromObject$1(obj, fieldName) {
        var fieldValue;
        if (obj && obj[fieldName]) {
            fieldValue = obj[fieldName];
            delete obj[fieldName];
        }
        return fieldValue;
    }
    function _isRightClick(evt) {
        if ("which" in evt) {
            return (evt.which === 3);
        }
        else if ("button" in evt) {
            return (evt.button === 2);
        }
    }
    function _isLeftClick(evt) {
        if ("which" in evt) {
            return (evt.which === 1);
        }
        else if ("button" in evt) {
            return (evt.button === 1);
        }
    }
    function _isMiddleClick(evt) {
        if ("which" in evt) {
            return (evt.which === 2);
        }
        else if ("button" in evt) {
            return (evt.button === 4);
        }
    }
    function _isKeyboardEnter(evt) {
        if ("keyCode" in evt) {
            return (evt.keyCode === 13);
        }
    }
    function _isKeyboardSpace(evt) {
        if ("keyCode" in evt) {
            return (evt.keyCode === 32);
        }
    }
    function _isElementDnt(element, doNotTrackFieldName) {
        var dntElement = _findClosestByAttribute(element, doNotTrackFieldName);
        if (!isValueAssigned(dntElement)) {
            return false;
        }
        return true;
    }
    function _findClosestByAttribute(el, attribute) {
        return _walkUpDomChainWithElementValidation(el, _isAttributeInElement, attribute);
    }
    function _isAttributeInElement(element, attributeToLookFor) {
        var value = element.getAttribute(attributeToLookFor);
        return isValueAssigned(value) || value === "";
    }
    function _bracketIt(str) {
        return "[" + str + "]";
    }
    function _debounce(firstCallFunction, secondCallFunction, wait, context) {
        var timeout;
        return function () {
            var args = arguments;
            var later = function () {
                timeout = 0;
                if (secondCallFunction) {
                    secondCallFunction.apply(context, args);
                }
            };
            var callNow = !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
                if (firstCallFunction) {
                    firstCallFunction.apply(context, args);
                }
            }
        };
    }
    function _getScrollOffset() {
        var scrollOffset = { h: 0, v: 0 };
        var win = getWindow();
        var doc = getDocument();
        if (doc && win) {
            scrollOffset = {
                h: parseInt(doc.body.scrollLeft || doc.documentElement.scrollLeft || win.pageXOffset, 10),
                v: parseInt(doc.body.scrollTop || doc.documentElement.scrollTop || win.pageYOffset, 10)
            };
        }
        return scrollOffset;
    }
    function _getViewportDimensions() {
        var viewport = { h: 0, w: 0 };
        var win = getWindow();
        var doc = getDocument();
        if (win && doc && win.screen) {
            var body = doc.body || {};
            var docElem = doc.documentElement || {};
            viewport.h = win.innerHeight || body.clientHeight || docElem.clientHeight;
            viewport.w = win.innerWidth || body.clientWidth || docElem.clientWidth;
        }
        return viewport;
    }
    function _getViewportBoundingRect(viewportDimensions) {
        var viewportBoundingRect = {
            top: 0,
            bottom: viewportDimensions.h,
            left: 0,
            right: viewportDimensions.w
        };
        return viewportBoundingRect;
    }

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ActionType = {
        CLICKLEFT: "CL",
        CLICKRIGHT: "CR",
        CLICKMIDDLE: "CM",
        SCROLL: "S",
        ZOOM: "Z",
        RESIZE: "R",
        KEYBOARDENTER: "KE",
        KEYBOARDSPACE: "KS",
        OTHER: "O"
    };
    var EventType;
    (function (EventType) {
        EventType[EventType["PAGE_ACTION"] = 0] = "PAGE_ACTION";
        EventType[EventType["CONTENT_UPDATE"] = 1] = "CONTENT_UPDATE";
    })(EventType || (EventType = {}));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var clickCaptureInputTypes$1 = { BUTTON: true, CHECKBOX: true, RADIO: true, RESET: true, SUBMIT: true };
    function _getImageHref(element) {
        var temp = element;
        if (temp) {
            var parent = _findClosestAnchor(temp);
            if (parent.length === 1) {
                if (parent[0].href) {
                    return parent[0].href;
                }
                else if (parent[0].src) {
                    return (parent[0].src);
                }
            }
        }
        return "";
    }
    function _isPii(element) {
        if (!element || !element.attributes) {
            return false;
        }
        try {
            var pii = element.getAttribute("data-dc");
            if (isValueAssigned(pii)) {
                if (pii.toLowerCase() === "pii") {
                    return true;
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        catch (e) {
            return false;
        }
    }
    function _getUri$1(config, location) {
        if (config.coreData && config.coreData.requestUri && config.coreData.requestUri !== "") {
            return config.coreData.requestUri;
        }
        return _sanitizeUrl(config, location);
    }
    function _sanitizeUrl(config, location) {
        if (!location) {
            return null;
        }
        var url = location.protocol + "//" + (location.hostname || location.host) +
            (isValueAssigned(location.port) ? ":" + location.port : "") +
            location.pathname;
        if (config.urlCollectHash) {
            url += (location.hash || "");
        }
        if (config.urlCollectQuery) {
            var query = location.search;
            if (!query) {
                var hash = location.hash || "";
                var queryIndex = hash.indexOf("?");
                if (queryIndex !== -1) {
                    query = hash.slice(queryIndex);
                }
            }
            return url + query;
        }
        return url;
    }
    function _getPageName$1(config, overrideValues) {
        if (overrideValues && overrideValues.pageName) {
            return overrideValues.pageName;
        }
        else if (config.callback && typeof (config.callback.pageName) === "function") {
            return config.callback.pageName();
        }
        else if (config.coreData && config.coreData.pageName) {
            return config.coreData.pageName;
        }
        else {
            var loc = getLocation() || {};
            var pagename = loc.pathname || "";
            var fragments = pagename.split("/");
            if (fragments && fragments[fragments.length - 1] !== "") {
                pagename = fragments[fragments.length - 1];
            }
            else {
                pagename = "Undefined";
            }
            return pagename;
        }
    }
    function _getSignedInStatus(config) {
        var isLoggedIn = config.callback && typeof (config.callback.signedinStatus) === "function" ?
            config.callback.signedinStatus() : config.isLoggedIn;
        return isLoggedIn;
    }
    function _getClientCookies(config, traceLogger) {
        var cookies = "";
        var uniqueCookies = {};
        var mergedCookies = [];
        var cookiesConfig = config.cookiesToCollect;
        if (config.shareAuthStatus === false) {
            mergedCookies = cookiesConfig;
        }
        else {
            arrForEach(cookiesConfig, function (value) {
                if (value !== "ANON") {
                    mergedCookies.push(value);
                }
            });
        }
        var cookieValue;
        try {
            try {
                if (isWindowObjectAvailable && window.varCustomerCookies && window.varCustomerCookies.length > 0) {
                    mergedCookies = mergedCookies.concat(window.varCustomerCookies);
                }
            }
            catch (e) {
                traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.FailedToGetCookies, "Failed to get cookies ");
            }
            arrForEach(mergedCookies, function (value) {
                if (!uniqueCookies.hasOwnProperty(value)) {
                    uniqueCookies[value] = "";
                    if (isDocumentObjectAvailable) {
                        cookieValue = decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(value).replace(/[\-\.\+\*]/g, "\\$&") +
                            "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1"));
                        if (cookieValue !== "") {
                            cookies += value + "=" + cookieValue + ";";
                        }
                    }
                }
            });
        }
        catch (e) {
            traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.FailedToGetCookies, "Failed to get cookies ");
        }
        return cookies;
    }
    function _getClickTarget(element) {
        var clickTarget = "";
        switch (element.tagName) {
            case "A":
            case "AREA":
                clickTarget = element.href || "";
                break;
            case "IMG":
                clickTarget = _getImageHref(element);
                break;
            case "INPUT":
                var type = element.type;
                if (type && (clickCaptureInputTypes$1[type.toUpperCase()])) {
                    var loc = getLocation() || {};
                    if (element.form) {
                        clickTarget = element.form.action || (loc.pathname || "");
                    }
                    else {
                        clickTarget = loc.pathname || "";
                    }
                }
                break;
        }
        return clickTarget;
    }
    function onDomLoaded(callback) {
        onDomReadyDo(function () {
            if (isDocumentObjectAvailable && document.readyState === "complete") {
                callback();
            }
            else {
                var win = getWindow();
                if (win) {
                    if (win.addEventListener) {
                        win.addEventListener("load", function () {
                            callback();
                        });
                    }
                    else if (win.attachEvent) {
                        win.attachEvent("onload", function () {
                            callback();
                        });
                    }
                }
            }
        });
    }
    function onDomReadyDo(f) {
        var doc = getDocument() || {};
        /in/.test(doc.readyState) ? setTimeout(function () { onDomReadyDo(f); }, 100) : f.call();
    }

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var doNotTrackFieldName$1 = "data-bi-dnt";
    var _contentBlobFieldNameObjects = {
        longNames: {
            isShortNames: false,
            id: "data-bi-id",
            areaName: "data-bi-area",
            slotNumber: "data-bi-slot",
            contentName: "data-bi-name",
            contentSource: "data-bi-source",
            templateName: "data-bi-view",
            productId: "data-bi-product",
            contentType: "data-bi-type",
            parentId: "data-bi-parentid",
            parentName: "data-bi-parentname"
        },
        shortNames: {
            isShortNames: true,
            id: "data-bi-id",
            areaName: "data-bi-an",
            slotNumber: "data-bi-sn",
            contentName: "data-bi-cn",
            contentSource: "data-bi-cs",
            templateName: "data-bi-tn",
            productId: "data-bi-pid",
            contentType: "data-bi-ct",
            parentId: "data-bi-pi",
            parentName: "data-bi-pn"
        }
    };
    var _keyName = {
        longKeys: {
            parentId: "parentId",
            parentName: "parentName"
        },
        shortKeys: {
            parentId: "pI",
            parentName: "pN"
        }
    };
    var DomContentHandler = /** @class */ (function () {
        function DomContentHandler(_config, _traceLogger) {
            this._config = _config;
            this._traceLogger = _traceLogger;
            this._contentBlobFieldNames = null;
            this._contentBlobFieldNames = this._config.useShortNameForContentBlob === true ?
                _contentBlobFieldNameObjects.shortNames : _contentBlobFieldNameObjects.longNames;
        }
        DomContentHandler.prototype.getMetadata = function () {
            var msTags = {};
            var awaTags = {};
            if (isDocumentObjectAvailable) {
                awaTags = this._getMetaDataFromDOM("awa-", true);
                if (this._config.autoCapture && this._config.autoCapture.msTags) {
                    msTags = this._getMetaDataFromDOM("ms.", false);
                }
            }
            return extend(true, awaTags, msTags);
        };
        DomContentHandler.prototype.getVisibleContent = function () {
            var viewportDim = _getViewportDimensions();
            var viewportBoundingRect = _getViewportBoundingRect(viewportDim);
            var elements = null;
            if (isDocumentObjectAvailable) {
                elements = document.querySelectorAll(_bracketIt(this._contentBlobFieldNames.areaName) + "," +
                    _bracketIt(this._contentBlobFieldNames.slotNumber) + "," +
                    _bracketIt(this._config.biBlobAttributeTag));
            }
            var arrayOfContents = [];
            if (elements) {
                for (var i = 0; i < elements.length; i++) {
                    var element = elements[i];
                    if (!_isElementDnt(element, doNotTrackFieldName$1)) {
                        if (_isElementTrulyVisible(element, viewportBoundingRect)) {
                            var elementContent = this.getElementContent(element, EventType.CONTENT_UPDATE);
                            if (elementContent) {
                                arrayOfContents.push(elementContent);
                            }
                        }
                    }
                }
            }
            return arrayOfContents;
        };
        DomContentHandler.prototype.getElementContent = function (element, eventType) {
            if (!element) {
                return {};
            }
            var elementContent = {};
            var biBlobElement;
            var biBlobValue;
            var contentElement;
            if (!this._isTracked(element)) {
                biBlobElement = _findClosestByAttribute(element, this._config.biBlobAttributeTag);
                if (biBlobElement) {
                    biBlobValue = biBlobElement.getAttribute(this._config.biBlobAttributeTag);
                }
                if (biBlobValue) {
                    try {
                        elementContent = JSON.parse(biBlobValue);
                    }
                    catch (e) {
                        this._traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.CannotParseBiBlobValue, "Can not parse " + biBlobValue);
                    }
                }
                else {
                    contentElement = _walkUpDomChainWithElementValidation(element, this._isTrackedWithDataBi);
                    elementContent = extend(elementContent, this._populateElementContentwithDataBi(contentElement, element));
                }
            }
            else if (this._isTrackedWithDataM(element)) {
                biBlobElement = element;
                biBlobValue = biBlobElement.getAttribute(this._config.biBlobAttributeTag);
                try {
                    elementContent = JSON.parse(biBlobValue);
                }
                catch (e) {
                    this._traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.CannotParseBiBlobValue, "Can not parse " + biBlobValue);
                }
            }
            else if (this._isTrackedWithDataBi(element)) {
                contentElement = element;
                elementContent = extend(elementContent, this._populateElementContentwithDataBi(contentElement, element));
            }
            _removeInvalidElements$1(elementContent);
            if (this._config.autoCapture.lineage && eventType === EventType.PAGE_ACTION) {
                elementContent = extend(elementContent, this.getLineageDetails(element));
            }
            if (this._config.autoPopulateParentIdAndParentName) {
                elementContent = extend(elementContent, this._getParentDetails(biBlobElement ? biBlobElement : contentElement, elementContent));
            }
            return elementContent;
        };
        DomContentHandler.prototype.getLineageDetails = function (element) {
            var name = [];
            var identifier = [];
            var lineageDelimiter = ">";
            var elementBiDataAttribute = this._config.biBlobAttributeTag;
            var elementModuleIdAttribute = "data-module-id";
            var containerName;
            var nameValue;
            var idValue;
            while (element) {
                var dataAttr = element.getAttribute(elementBiDataAttribute) || element[elementBiDataAttribute];
                var moduleIdAttribute = element.getAttribute(elementModuleIdAttribute) || element[elementModuleIdAttribute];
                if (dataAttr) {
                    try {
                        var telemetryObject = JSON.parse(dataAttr);
                    }
                    catch (e) {
                        this._traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.CannotParseDataAttribute, "Can not parse " + dataAttr);
                    }
                    if (telemetryObject) {
                        nameValue = telemetryObject.cN || telemetryObject.cT;
                        idValue = telemetryObject.id || undefined;
                        if (nameValue || idValue) {
                            name.push(nameValue);
                            if (moduleIdAttribute) {
                                containerName = nameValue;
                            }
                            identifier.push(idValue);
                        }
                    }
                }
                else {
                    nameValue = element.getAttribute(this._contentBlobFieldNames.contentName) || element.getAttribute(this._contentBlobFieldNames.contentType);
                    idValue = element.getAttribute(this._contentBlobFieldNames.id) || undefined;
                    if (nameValue || idValue) {
                        name.push(nameValue);
                        if (moduleIdAttribute) {
                            containerName = nameValue;
                        }
                        identifier.push(idValue);
                    }
                }
                element = element.parentElement;
            }
            var lineageDetails = {
                lineage: name.join(lineageDelimiter),
                lineageById: identifier.join(lineageDelimiter),
                lineageContainerName: containerName
            };
            return lineageDetails;
        };
        DomContentHandler.prototype._populateElementContentwithDataBi = function (contentElement, element) {
            var elementContent = {};
            if (!contentElement) {
                if (this._config.useDefaultContentName) {
                    contentElement = element;
                }
                else {
                    return elementContent;
                }
            }
            var areaElement = _findClosestByAttribute(contentElement, this._contentBlobFieldNames.areaName);
            var areaContent = extend({}, this._getAreaContent(areaElement));
            var customizedContentName = this._config.callback.contentName ? this._config.callback.contentName(contentElement, this._config.useDefaultContentName) : "";
            var defaultContentName = this._getDefaultContentName(contentElement, this._config.useDefaultContentName);
            elementContent = {
                id: contentElement.getAttribute(this._contentBlobFieldNames.id) || contentElement.id || "",
                aN: areaContent.areaName,
                sN: contentElement.getAttribute(this._contentBlobFieldNames.slotNumber),
                cN: customizedContentName || contentElement.getAttribute(this._contentBlobFieldNames.contentName) || defaultContentName || contentElement.getAttribute("alt") || "",
                cS: contentElement.getAttribute(this._contentBlobFieldNames.contentSource) || areaContent.contentSource,
                tN: areaContent.templateName,
                pid: contentElement.getAttribute(this._contentBlobFieldNames.productId),
                cT: contentElement.getAttribute(this._contentBlobFieldNames.contentType) || areaContent.type,
                pI: contentElement.getAttribute(this._contentBlobFieldNames.parentId),
                pN: contentElement.getAttribute(this._contentBlobFieldNames.parentName)
            };
            if (!elementContent.id || !elementContent.aN || !elementContent.sN || !elementContent.cN) {
                this._traceLogger.throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.InvalidContentBlob, "Invalid content blob.  Missing required attributes (id, aN/area, sN/slot), cN/contentName. " +
                    " Content information will still be collected!");
            }
            if (!this._contentBlobFieldNames.isShortNames) {
                elementContent = {
                    contentId: elementContent.id,
                    areaName: elementContent.aN,
                    slotNumber: elementContent.sN,
                    contentName: elementContent.cN,
                    contentSource: elementContent.cS,
                    templateName: elementContent.tN,
                    productId: elementContent.pid,
                    contentType: elementContent.cT,
                    parentId: elementContent.pI,
                    parentName: elementContent.pN
                };
            }
            for (var i = 0, attrib; i < contentElement.attributes.length; i++) {
                attrib = contentElement.attributes[i];
                if (attrib.name === this._contentBlobFieldNames.id ||
                    attrib.name === this._contentBlobFieldNames.areaName ||
                    attrib.name === this._contentBlobFieldNames.slotNumber ||
                    attrib.name === this._contentBlobFieldNames.contentName ||
                    attrib.name === this._contentBlobFieldNames.contentSource ||
                    attrib.name === this._contentBlobFieldNames.templateName ||
                    attrib.name === this._contentBlobFieldNames.productId ||
                    attrib.name === this._contentBlobFieldNames.contentType ||
                    attrib.name === this._contentBlobFieldNames.parentId ||
                    attrib.name === this._contentBlobFieldNames.parentName ||
                    attrib.name.indexOf("data-bi-") === -1) {
                    continue;
                }
                var attribName = attrib.name.replace("data-bi-", "");
                elementContent[attribName] = attrib.value;
            }
            return elementContent;
        };
        DomContentHandler.prototype._getMetaDataFromDOM = function (prefix, removePrefix) {
            var metaElements;
            var metaData = {};
            if (isDocumentObjectAvailable) {
                metaElements = document.querySelectorAll("meta");
                for (var i = 0; i < metaElements.length; i++) {
                    var meta = metaElements[i];
                    if (meta.name) {
                        var mt = meta.name.toLowerCase();
                        if (mt.indexOf(prefix) === 0) {
                            var name = removePrefix ? meta.name.replace(prefix, "") : meta.name;
                            metaData[name] = meta.content;
                        }
                    }
                }
            }
            return metaData;
        };
        DomContentHandler.prototype._getAreaContent = function (areaElement) {
            areaElement = _returnDomObjectIfjQuery(areaElement);
            if (areaElement) {
                return {
                    areaName: areaElement.getAttribute(this._contentBlobFieldNames.areaName),
                    templateName: areaElement.getAttribute(this._contentBlobFieldNames.templateName),
                    contentSource: areaElement.getAttribute(this._contentBlobFieldNames.contentSource),
                    product: areaElement.getAttribute(this._contentBlobFieldNames.productId),
                    type: areaElement.getAttribute(this._contentBlobFieldNames.contentType)
                };
            }
        };
        DomContentHandler.prototype._getDefaultContentName = function (element, useDefaultContentName) {
            if (useDefaultContentName === false || _isPii(element) || !element.tagName) {
                return "";
            }
            var doc = getDocument() || {};
            var contentName;
            switch (element.tagName) {
                case "A":
                    contentName = doc.all ? element.innerText || element.innerHTML : element.text || element.innerHTML;
                    break;
                case "IMG":
                case "AREA":
                    contentName = element.alt;
                    break;
                default:
                    contentName = element.value || element.name || element.alt || element.innerText || element.id;
            }
            return contentName.substring(0, MAX_CONTENTNAME_LENGTH);
        };
        DomContentHandler.prototype._getParentDetails = function (element, elementContent) {
            var parentIdKey = this._contentBlobFieldNames.isShortNames ? _keyName.shortKeys.parentId : _keyName.longKeys.parentId;
            var parentNameKey = this._contentBlobFieldNames.isShortNames ? _keyName.shortKeys.parentName : _keyName.longKeys.parentName;
            var parentId = elementContent[parentIdKey];
            var parentName = elementContent[parentNameKey];
            var parentInfo = {};
            if (parentId || parentName || !element) {
                return parentInfo;
            }
            return this._populateParentInfo(element, parentIdKey, parentNameKey);
        };
        DomContentHandler.prototype._isTrackedWithDataM = function (element) {
            var attrs = element.attributes;
            for (var i = 0; i < attrs.length; i++) {
                if (attrs[i].name === "data-m") {
                    return true;
                }
            }
            return false;
        };
        DomContentHandler.prototype._isTrackedWithDataBi = function (element) {
            var attrs = element.attributes;
            for (var i = 0; i < attrs.length; i++) {
                if (attrs[i].name.indexOf("data-bi-") >= 0) {
                    return true;
                }
            }
            return false;
        };
        DomContentHandler.prototype._isTracked = function (element) {
            var attrs = element.attributes;
            for (var i = 0; i < attrs.length; i++) {
                if (attrs[i].name === "data-m" || attrs[i].name.indexOf("data-bi-") >= 0) {
                    return true;
                }
            }
            return false;
        };
        DomContentHandler.prototype._populateParentInfo = function (element, parentIdKey, parentNameKey) {
            var parentInfo = {};
            var elementBiDataAttribute = this._config.biBlobAttributeTag;
            var parentId;
            var parentName;
            var closestParentElement = _walkUpDomChainWithElementValidation(element.parentElement, this._isTracked);
            if (closestParentElement) {
                var dataAttr = closestParentElement.getAttribute(elementBiDataAttribute) || element[elementBiDataAttribute];
                if (dataAttr) {
                    try {
                        var telemetryObject = JSON.parse(dataAttr);
                    }
                    catch (e) {
                        this._traceLogger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.CannotParseDataAttribute, "Can not parse " + dataAttr);
                    }
                    if (telemetryObject) {
                        parentId = telemetryObject.id;
                        parentName = telemetryObject.cN;
                    }
                }
                else {
                    parentId = closestParentElement.getAttribute(this._contentBlobFieldNames.id);
                    parentName = closestParentElement.getAttribute(this._contentBlobFieldNames.contentName);
                }
                if (parentId) {
                    parentInfo[parentIdKey] = parentId;
                }
                if (parentName) {
                    parentInfo[parentNameKey] = parentName;
                }
            }
            return parentInfo;
        };
        return DomContentHandler;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var clickCaptureInputTypes = { BUTTON: true, CHECKBOX: true, RADIO: true, RESET: true, SUBMIT: true };
    var AutoCaptureHandler = /** @class */ (function () {
        function AutoCaptureHandler(_analyticsPlugin, _traceLogger) {
            this._analyticsPlugin = _analyticsPlugin;
            this._traceLogger = _traceLogger;
        }
        AutoCaptureHandler.prototype.pageView = function () {
            this._analyticsPlugin.capturePageView({ isAuto: true });
        };
        AutoCaptureHandler.prototype.onLoad = function () {
            var _this = this;
            onDomLoaded(function () {
                _this._analyticsPlugin.capturePageViewPerformance({ isAuto: true });
                _this._analyticsPlugin.captureContentUpdate({ isAuto: true, isDomComplete: true });
            });
        };
        AutoCaptureHandler.prototype.click = function () {
            var _this = this;
            var win = getWindow();
            var doc = getDocument();
            if (win && win.addEventListener) {
                var event = (navigator.appVersion.indexOf("MSIE") !== -1) ? "click" : "mousedown";
                win.addEventListener(event, function (evt) { _this._processClick(evt); }, false);
                win.addEventListener("keyup", function (evt) { _this._processClick(evt); }, false);
            }
            else if (doc && doc.attachEvent) {
                doc.attachEvent("onclick", function (evt) { _this._processClick(evt); });
                doc.attachEvent("keyup", function (evt) { _this._processClick(evt); });
            }
        };
        AutoCaptureHandler.prototype.scroll = function (debounceConfig) {
            var _this = this;
            var processScroll = _debounce(
            null,
            function () {
                _this._analyticsPlugin.captureContentUpdate({ isAuto: true, actionType: ActionType.SCROLL });
            }, debounceConfig.scroll, this);
            var win = getWindow();
            if (win) {
                if (win.addEventListener) {
                    win.addEventListener("scroll", processScroll);
                }
                else if (window.attachEvent) {
                    window.attachEvent("onscroll", processScroll);
                }
            }
        };
        AutoCaptureHandler.prototype.maxScroll = function (maxScroll) {
            var getMaxScrollDepth = function () {
                var currentScroll = _getScrollOffset();
                maxScroll.v = maxScroll.v > currentScroll.v ? maxScroll.v : currentScroll.v;
            };
            var win = getWindow();
            if (win) {
                if (win.addEventListener) {
                    win.addEventListener("scroll", getMaxScrollDepth);
                }
                else if (win.attachEvent) {
                    win.attachEvent("onscroll", getMaxScrollDepth);
                }
            }
        };
        AutoCaptureHandler.prototype.resize = function (debounceConfig) {
            var _this = this;
            var processResize = _debounce(
            function () {
                _this._analyticsPlugin.captureContentUpdate({ isAuto: true, actionType: ActionType.RESIZE });
            },
            null, debounceConfig.resize, this);
            var win = getWindow();
            if (win) {
                if (win.addEventListener) {
                    win.addEventListener("resize", processResize);
                }
                else if (win.attachEvent) {
                    win.attachEvent("onresize", processResize);
                }
            }
        };
        AutoCaptureHandler.prototype.onUnload = function () {
            var _this = this;
            addPageUnloadEventListener(function () { _this._analyticsPlugin.capturePageUnload({ isAuto: true }); });
        };
        AutoCaptureHandler.prototype._processClick = function (clickEvent) {
            var clickCaptureElements = { A: true, BUTTON: true, AREA: true, INPUT: true };
            var win = getWindow();
            clickEvent = clickEvent || win.event;
            var element = clickEvent.srcElement || clickEvent.target;
            var overrideValues = {
                isAuto: true,
                clickCoordinateX: clickEvent.pageX,
                clickCoordinateY: clickEvent.pageY
            };
            var isRightClick = _isRightClick(clickEvent);
            if (isRightClick) {
                overrideValues.actionType = ActionType.CLICKRIGHT;
            }
            else if (_isLeftClick(clickEvent)) {
                overrideValues.actionType = ActionType.CLICKLEFT;
            }
            else if (_isKeyboardEnter(clickEvent)) {
                overrideValues.actionType = ActionType.KEYBOARDENTER;
            }
            else if (_isKeyboardSpace(clickEvent)) {
                overrideValues.actionType = ActionType.KEYBOARDSPACE;
            }
            else if (_isMiddleClick(clickEvent)) {
                overrideValues.actionType = ActionType.CLICKMIDDLE;
            }
            else {
                return;
            }
            while (element && element.tagName) {
                if (element.control && clickCaptureElements[element.control.tagName.toUpperCase()]) {
                    element = element.control;
                }
                if (!clickCaptureElements[element.tagName.toUpperCase()]) {
                    element = element.parentElement || element.parentNode;
                    continue;
                }
                else {
                    var sendEvent = element.tagName.toUpperCase() === "INPUT" ? clickCaptureInputTypes[element.type.toUpperCase()] : true;
                    if (sendEvent) {
                        this._analyticsPlugin.capturePageAction(element, overrideValues, {}, isRightClick);
                    }
                    break;
                }
            }
        };
        return AutoCaptureHandler;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Behavior;
    (function (Behavior) {
        Behavior[Behavior["UNDEFINED"] = 0] = "UNDEFINED";
        Behavior[Behavior["NAVIGATIONBACK"] = 1] = "NAVIGATIONBACK";
        Behavior[Behavior["NAVIGATION"] = 2] = "NAVIGATION";
        Behavior[Behavior["NAVIGATIONFORWARD"] = 3] = "NAVIGATIONFORWARD";
        Behavior[Behavior["APPLY"] = 4] = "APPLY";
        Behavior[Behavior["REMOVE"] = 5] = "REMOVE";
        Behavior[Behavior["SORT"] = 6] = "SORT";
        Behavior[Behavior["EXPAND"] = 7] = "EXPAND";
        Behavior[Behavior["REDUCE"] = 8] = "REDUCE";
        Behavior[Behavior["CONTEXTMENU"] = 9] = "CONTEXTMENU";
        Behavior[Behavior["TAB"] = 10] = "TAB";
        Behavior[Behavior["COPY"] = 11] = "COPY";
        Behavior[Behavior["EXPERIMENTATION"] = 12] = "EXPERIMENTATION";
        Behavior[Behavior["PRINT"] = 13] = "PRINT";
        Behavior[Behavior["SHOW"] = 14] = "SHOW";
        Behavior[Behavior["HIDE"] = 15] = "HIDE";
        Behavior[Behavior["MAXIMIZE"] = 16] = "MAXIMIZE";
        Behavior[Behavior["MINIMIZE"] = 17] = "MINIMIZE";
        Behavior[Behavior["BACKBUTTON"] = 18] = "BACKBUTTON";
        Behavior[Behavior["STARTPROCESS"] = 20] = "STARTPROCESS";
        Behavior[Behavior["PROCESSCHECKPOINT"] = 21] = "PROCESSCHECKPOINT";
        Behavior[Behavior["COMPLETEPROCESS"] = 22] = "COMPLETEPROCESS";
        Behavior[Behavior["SCENARIOCANCEL"] = 23] = "SCENARIOCANCEL";
        Behavior[Behavior["DOWNLOADCOMMIT"] = 40] = "DOWNLOADCOMMIT";
        Behavior[Behavior["DOWNLOAD"] = 41] = "DOWNLOAD";
        Behavior[Behavior["SEARCHAUTOCOMPLETE"] = 60] = "SEARCHAUTOCOMPLETE";
        Behavior[Behavior["SEARCH"] = 61] = "SEARCH";
        Behavior[Behavior["SEARCHINITIATE"] = 62] = "SEARCHINITIATE";
        Behavior[Behavior["TEXTBOXINPUT"] = 63] = "TEXTBOXINPUT";
        Behavior[Behavior["PURCHASE"] = 80] = "PURCHASE";
        Behavior[Behavior["ADDTOCART"] = 81] = "ADDTOCART";
        Behavior[Behavior["VIEWCART"] = 82] = "VIEWCART";
        Behavior[Behavior["ADDWISHLIST"] = 83] = "ADDWISHLIST";
        Behavior[Behavior["FINDSTORE"] = 84] = "FINDSTORE";
        Behavior[Behavior["CHECKOUT"] = 85] = "CHECKOUT";
        Behavior[Behavior["REMOVEFROMCART"] = 86] = "REMOVEFROMCART";
        Behavior[Behavior["PURCHASECOMPLETE"] = 87] = "PURCHASECOMPLETE";
        Behavior[Behavior["VIEWCHECKOUTPAGE"] = 88] = "VIEWCHECKOUTPAGE";
        Behavior[Behavior["VIEWCARTPAGE"] = 89] = "VIEWCARTPAGE";
        Behavior[Behavior["VIEWPDP"] = 90] = "VIEWPDP";
        Behavior[Behavior["UPDATEITEMQUANTITY"] = 91] = "UPDATEITEMQUANTITY";
        Behavior[Behavior["INTENTTOBUY"] = 92] = "INTENTTOBUY";
        Behavior[Behavior["PUSHTOINSTALL"] = 93] = "PUSHTOINSTALL";
        Behavior[Behavior["SIGNIN"] = 100] = "SIGNIN";
        Behavior[Behavior["SIGNOUT"] = 101] = "SIGNOUT";
        Behavior[Behavior["SOCIALSHARE"] = 120] = "SOCIALSHARE";
        Behavior[Behavior["SOCIALLIKE"] = 121] = "SOCIALLIKE";
        Behavior[Behavior["SOCIALREPLY"] = 122] = "SOCIALREPLY";
        Behavior[Behavior["CALL"] = 123] = "CALL";
        Behavior[Behavior["EMAIL"] = 124] = "EMAIL";
        Behavior[Behavior["COMMUNITY"] = 125] = "COMMUNITY";
        Behavior[Behavior["SOCIALFOLLOW"] = 126] = "SOCIALFOLLOW";
        Behavior[Behavior["VOTE"] = 140] = "VOTE";
        Behavior[Behavior["SURVEYINITIATE"] = 141] = "SURVEYINITIATE";
        Behavior[Behavior["SURVEYCOMPLETE"] = 142] = "SURVEYCOMPLETE";
        Behavior[Behavior["REPORTAPPLICATION"] = 143] = "REPORTAPPLICATION";
        Behavior[Behavior["REPORTREVIEW"] = 144] = "REPORTREVIEW";
        Behavior[Behavior["SURVEYCHECKPOINT"] = 145] = "SURVEYCHECKPOINT";
        Behavior[Behavior["CONTACT"] = 160] = "CONTACT";
        Behavior[Behavior["REGISTRATIONINITIATE"] = 161] = "REGISTRATIONINITIATE";
        Behavior[Behavior["REGISTRATIONCOMPLETE"] = 162] = "REGISTRATIONCOMPLETE";
        Behavior[Behavior["CANCELSUBSCRIPTION"] = 163] = "CANCELSUBSCRIPTION";
        Behavior[Behavior["RENEWSUBSCRIPTION"] = 164] = "RENEWSUBSCRIPTION";
        Behavior[Behavior["CHANGESUBSCRIPTION"] = 165] = "CHANGESUBSCRIPTION";
        Behavior[Behavior["REGISTRATIONCHECKPOINT"] = 166] = "REGISTRATIONCHECKPOINT";
        Behavior[Behavior["CHATINITIATE"] = 180] = "CHATINITIATE";
        Behavior[Behavior["CHATEND"] = 181] = "CHATEND";
        Behavior[Behavior["TRIALSIGNUP"] = 200] = "TRIALSIGNUP";
        Behavior[Behavior["TRIALINITIATE"] = 201] = "TRIALINITIATE";
        Behavior[Behavior["SIGNUP"] = 210] = "SIGNUP";
        Behavior[Behavior["FREESIGNUP"] = 211] = "FREESIGNUP";
        Behavior[Behavior["PARTNERREFERRAL"] = 220] = "PARTNERREFERRAL";
        Behavior[Behavior["LEARNLOWFUNNEL"] = 230] = "LEARNLOWFUNNEL";
        Behavior[Behavior["LEARNHIGHFUNNEL"] = 231] = "LEARNHIGHFUNNEL";
        Behavior[Behavior["SHOPPINGINTENT"] = 232] = "SHOPPINGINTENT";
        Behavior[Behavior["VIDEOSTART"] = 240] = "VIDEOSTART";
        Behavior[Behavior["VIDEOPAUSE"] = 241] = "VIDEOPAUSE";
        Behavior[Behavior["VIDEOCONTINUE"] = 242] = "VIDEOCONTINUE";
        Behavior[Behavior["VIDEOCHECKPOINT"] = 243] = "VIDEOCHECKPOINT";
        Behavior[Behavior["VIDEOJUMP"] = 244] = "VIDEOJUMP";
        Behavior[Behavior["VIDEOCOMPLETE"] = 245] = "VIDEOCOMPLETE";
        Behavior[Behavior["VIDEOBUFFERING"] = 246] = "VIDEOBUFFERING";
        Behavior[Behavior["VIDEOERROR"] = 247] = "VIDEOERROR";
        Behavior[Behavior["VIDEOMUTE"] = 248] = "VIDEOMUTE";
        Behavior[Behavior["VIDEOUNMUTE"] = 249] = "VIDEOUNMUTE";
        Behavior[Behavior["VIDEOFULLSCREEN"] = 250] = "VIDEOFULLSCREEN";
        Behavior[Behavior["VIDEOUNFULLSCREEN"] = 251] = "VIDEOUNFULLSCREEN";
        Behavior[Behavior["VIDEOREPLAY"] = 252] = "VIDEOREPLAY";
        Behavior[Behavior["VIDEOPLAYERLOAD"] = 253] = "VIDEOPLAYERLOAD";
        Behavior[Behavior["VIDEOPLAYERCLICK"] = 254] = "VIDEOPLAYERCLICK";
        Behavior[Behavior["VIDEOVOLUMECONTROL"] = 255] = "VIDEOVOLUMECONTROL";
        Behavior[Behavior["VIDEOAUDIOTRACKCONTROL"] = 256] = "VIDEOAUDIOTRACKCONTROL";
        Behavior[Behavior["VIDEOCLOSEDCAPTIONCONTROL"] = 257] = "VIDEOCLOSEDCAPTIONCONTROL";
        Behavior[Behavior["VIDEOCLOSEDCAPTIONSTYLE"] = 258] = "VIDEOCLOSEDCAPTIONSTYLE";
        Behavior[Behavior["VIDEORESOLUTIONCONTROL"] = 259] = "VIDEORESOLUTIONCONTROL";
        Behavior[Behavior["VIRTUALEVENTJOIN"] = 260] = "VIRTUALEVENTJOIN";
        Behavior[Behavior["VIRTUALEVENTEND"] = 261] = "VIRTUALEVENTEND";
        Behavior[Behavior["IMPRESSION"] = 280] = "IMPRESSION";
        Behavior[Behavior["CLICK"] = 281] = "CLICK";
        Behavior[Behavior["RICHMEDIACOMPLETE"] = 282] = "RICHMEDIACOMPLETE";
        Behavior[Behavior["ADBUFFERING"] = 283] = "ADBUFFERING";
        Behavior[Behavior["ADERROR"] = 284] = "ADERROR";
        Behavior[Behavior["ADSTART"] = 285] = "ADSTART";
        Behavior[Behavior["ADCOMPLETE"] = 286] = "ADCOMPLETE";
        Behavior[Behavior["ADSKIP"] = 287] = "ADSKIP";
        Behavior[Behavior["ADTIMEOUT"] = 288] = "ADTIMEOUT";
        Behavior[Behavior["OTHER"] = 300] = "OTHER";
    })(Behavior || (Behavior = {}));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _getMetaData$1(metaTags, coreData, metaTagName) {
        var value = "";
        if (coreData && coreData[metaTagName]) {
            value = coreData[metaTagName];
        }
        else if (metaTags) {
            value = metaTags[metaTagName];
        }
        return value;
    }
    var WebEvent = /** @class */ (function () {
        function WebEvent(_webAnalyticsPlugin, _config, _contentHandler, _id, _pageTagsCallback, _metaTags, _traceLogger) {
            this._webAnalyticsPlugin = _webAnalyticsPlugin;
            this._config = _config;
            this._contentHandler = _contentHandler;
            this._id = _id;
            this._pageTagsCallback = _pageTagsCallback;
            this._metaTags = _metaTags;
            this._traceLogger = _traceLogger;
            this._pageTags = {};
        }
        WebEvent.prototype._setBasicProperties = function (event, overrideValues) {
            event.ver = MSCONTENT_PARTB_VERSION;
            event.id = this._id.getLastPageViewId();
            if (!isValueAssigned(event.name)) {
                event.name = _getPageName$1(this._config, overrideValues);
            }
            if (!isValueAssigned(event.uri) && isWindowObjectAvailable) {
                event.uri = _getUri$1(this._config, getLocation());
            }
        };
        WebEvent.prototype._setCommonProperties = function (event, eventProperties, overrideValues) {
            var _self = this;
            _self._setBasicProperties(event, overrideValues);
            _self._setPageTags(event, overrideValues);
            _self._pageTypeMetaTag = _getMetaData$1(_self._metaTags, _self._config.coreData, "pageType");
            _self._marketMetaTag = _getMetaData$1(_self._metaTags, _self._config.coreData, "market");
            _self._behaviorMetaTag = _getMetaData$1(_self._metaTags, _self._config.coreData, "behavior");
            if (isValueAssigned(overrideValues.pageType)) {
                event.pageType = overrideValues.pageType;
            }
            if (isValueAssigned(_self._pageTypeMetaTag) && !isValueAssigned(event.pageType)) {
                event.pageType = _self._pageTypeMetaTag;
            }
            if (isValueAssigned(_self._marketMetaTag)) {
                event.market = _self._marketMetaTag;
            }
            event.isLoggedIn = _getSignedInStatus(_self._config);
            eventProperties.cookieEnabled = areCookiesSupported();
        };
        WebEvent.prototype._setPageTags = function (event, overrideValues) {
            var _self = this;
            if (_self._config.coreData && _self._config.coreData.pageTags) {
                _self._pageTags = extend(true, _self._pageTags, _self._config.coreData.pageTags);
            }
            if (_self._pageTagsCallback) {
                _self._pageTags = extend(true, _self._pageTags, _self._pageTagsCallback());
            }
            if (isValueAssigned(overrideValues.pageTags)) {
                _self._pageTags = extend(true, _self._pageTags, overrideValues.pageTags);
            }
            if (_self._metaTags) {
                _self._pageTags.metaTags = {};
                objForEachKey(_self._metaTags, function (metaTag, value) {
                    if (metaTag !== "behavior" && metaTag !== "market" && metaTag !== "pageType") {
                        _self._pageTags.metaTags[metaTag] = value;
                    }
                });
            }
            event.properties = event.properties || {};
            event.properties["pageTags"] = _self._pageTags;
        };
        WebEvent.prototype._getBehavior = function (overrideValues) {
            var behavior;
            if (overrideValues && isValueAssigned(overrideValues.behavior)) {
                behavior = overrideValues.behavior;
            }
            else if (isValueAssigned(this._behaviorMetaTag)) {
                behavior = this._behaviorMetaTag;
            }
            return this._getValidBehavior(behavior);
        };
        WebEvent.prototype._getValidBehavior = function (behavior) {
            if (isValueAssigned(behavior)) {
                var result = void 0;
                var value = parseInt(behavior);
                if (!isNaN(value)) {
                    result = value;
                }
                else {
                    result = Behavior[behavior];
                }
                if (result in Behavior) {
                    return result;
                }
            }
            return 0;
        };
        return WebEvent;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PageView = /** @class */ (function (_super) {
        __extendsFn(PageView, _super);
        function PageView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PageView.prototype.capturePageView = function (overrideValues, customProperties) {
            overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
            var pageViewEvent = {};
            var properties = isValueAssigned(customProperties) ? customProperties : {};
            this._setCommonProperties(pageViewEvent, properties, overrideValues);
            pageViewEvent.refUri = isValueAssigned(overrideValues.referrerUri) ? overrideValues.referrerUri : this._config.coreData.referrerUri;
            pageViewEvent.isManual = !overrideValues.isAuto;
            var cookiesValue = _getClientCookies(this._config, this._traceLogger);
            if (cookiesValue) {
                properties.cookies = cookiesValue;
            }
            properties.behavior = this._getBehavior(overrideValues);
            this._webAnalyticsPlugin.trackPageView(pageViewEvent, properties);
        };
        return PageView;
    }(WebEvent));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PageAction = /** @class */ (function (_super) {
        __extendsFn(PageAction, _super);
        function PageAction() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PageAction.prototype.trackPageAction = function (pageActionEvent, properties) {
            var ext = {};
            ext["web"] = {};
            ext["web"]["isManual"] = pageActionEvent.isManual;
            var event = {
                name: "Ms.Web.PageAction",
                baseType: "PageActionData",
                ext: ext,
                data: {},
                baseData: {},
                latency: EventLatency.Normal
            };
            event.baseData["name"] = pageActionEvent.name;
            event.baseData["uri"] = pageActionEvent.uri;
            event.baseData["market"] = pageActionEvent.market;
            event.baseData["pageType"] = pageActionEvent.pageType;
            event.baseData["isLoggedIn"] = pageActionEvent.isLoggedIn;
            event.baseData["id"] = pageActionEvent.id;
            event.baseData["properties"] = pageActionEvent.properties;
            event.baseData["ver"] = pageActionEvent.ver;
            event.baseData["actionType"] = pageActionEvent.actionType;
            event.baseData["behavior"] = pageActionEvent.behavior;
            event.baseData["clickCoordinates"] = pageActionEvent.clickCoordinates;
            event.baseData["content"] = pageActionEvent.content;
            event.baseData["contentVer"] = pageActionEvent.contentVer;
            event.baseData["targetUri"] = pageActionEvent.targetUri;
            objForEachKey(properties, function (property, value) {
                if (!event.data[property]) {
                    event.data[property] = value;
                }
            });
            this._webAnalyticsPlugin.core.track(event);
        };
        PageAction.prototype.capturePageAction = function (element, overrideValues, customProperties, isRightClick) {
            overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
            var pageActionEvent = {};
            var pageActionProperties = isValueAssigned(customProperties) ? customProperties : {};
            this._setCommonProperties(pageActionEvent, pageActionProperties, overrideValues);
            pageActionEvent.isManual = !overrideValues.isAuto;
            pageActionEvent.behavior = this._getBehavior(overrideValues);
            var elementContent = {};
            element = _returnDomObjectIfjQuery(element);
            if (isRightClick) {
                pageActionEvent.behavior = 9 ;
            }
            if (element) {
                pageActionEvent.targetUri = _getClickTarget(element);
                elementContent = this._contentHandler.getElementContent(element, EventType.PAGE_ACTION);
                elementContent = extend(elementContent, this._getCustomTags(element));
                if (elementContent && elementContent.bhvr && !isValueAssigned(overrideValues.behavior)) {
                    var currentBehavior = _extractFieldFromObject$1(elementContent, "bhvr");
                    pageActionEvent.behavior = this._getValidBehavior(currentBehavior);
                }
            }
            if (isValueAssigned(overrideValues.actionType)) {
                pageActionEvent.actionType = overrideValues.actionType;
            }
            if (isValueAssigned(overrideValues.clickCoordinateX) && isValueAssigned(overrideValues.clickCoordinateY)) {
                pageActionEvent.clickCoordinates = overrideValues.clickCoordinateX + "X" + overrideValues.clickCoordinateY;
            }
            pageActionEvent.contentVer = CONTENT_VERSION;
            var pageActionContentTags = this._config.callback.pageActionContentTags;
            pageActionEvent.content = _bracketIt(JSON.stringify(extend(overrideValues.content || elementContent, typeof pageActionContentTags === "function" ? pageActionContentTags(element) : {}, overrideValues && overrideValues.contentTags ? overrideValues.contentTags : {})));
            pageActionProperties.timeToAction = this._getTimeToClick();
            pageActionProperties.refUri = isValueAssigned(overrideValues.refUri) ? overrideValues.refUri : this._config.coreData.referrerUri;
            var cookiesValue = _getClientCookies(this._config, this._traceLogger);
            if (cookiesValue) {
                pageActionProperties.cookies = cookiesValue;
            }
            this.trackPageAction(pageActionEvent, pageActionProperties);
        };
        PageAction.prototype._getCustomTags = function (obj) {
            var customParameters = {};
            while (obj) {
                if (!_isPii(obj)) {
                    for (var attr in obj.attributes) {
                        if (attr) {
                            if (obj.attributes[attr]) {
                                var nn = obj.attributes[attr].name;
                                if (nn) {
                                    if (nn.toLowerCase().indexOf("ms.") === 0) {
                                        customParameters[nn] = obj.attributes[attr].value;
                                    }
                                }
                            }
                        }
                    }
                }
                obj = (obj.parentElement || obj.parentNode);
            }
            return customParameters;
        };
        PageAction.prototype._getTimeToClick = function () {
            var perf = getPerformance();
            if (perf && perf.timing) {
                var isNavigationStart = perf.timing.navigationStart;
                if (isNavigationStart && isNavigationStart !== 0) {
                    return new Date().getTime() - isNavigationStart;
                }
            }
            return -1;
        };
        return PageAction;
    }(WebEvent));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ContentUpdate = /** @class */ (function (_super) {
        __extendsFn(ContentUpdate, _super);
        function ContentUpdate() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ContentUpdate.prototype.trackContentUpdate = function (contentUpdateEvent, properties) {
            var ext = {};
            ext["web"] = {};
            ext["web"]["isManual"] = contentUpdateEvent.isManual;
            var event = {
                name: "Ms.Web.ContentUpdate",
                baseType: "ContentUpdateData",
                ext: ext,
                data: {},
                baseData: {},
                latency: EventLatency.RealTime
            };
            arrForEach([
                "name",
                "uri",
                "market",
                "pageType",
                "isLoggedIn",
                "id",
                "properties",
                "ver",
                "actionType",
                "behavior",
                "pageHeight",
                "content",
                "contentVer",
                "vpHeight",
                "vpWidth",
                "vScrollOffset",
                "hScrollOffset",
            ], function (key) {
                event.baseData[key] = contentUpdateEvent[key];
            });
            objForEachKey(properties, function (property, value) {
                if (!event.data[property]) {
                    event.data[property] = value;
                }
            });
            this._webAnalyticsPlugin.core.track(event);
        };
        ContentUpdate.prototype.captureContentUpdate = function (overrideValues, customProperties) {
            overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
            var event = {};
            var properties = isValueAssigned(customProperties) ? customProperties : {};
            this._setCommonProperties(event, properties, overrideValues);
            event.behavior = this._getBehavior(overrideValues);
            if (isValueAssigned(overrideValues.actionType)) {
                event.actionType = overrideValues.actionType;
            }
            var viewportDim = _getViewportDimensions();
            var scrollOffset = _getScrollOffset();
            event.pageHeight = isDocumentObjectAvailable ? document.body.scrollHeight : null;
            event.vpHeight = viewportDim.h;
            event.vpWidth = viewportDim.w;
            event.vScrollOffset = scrollOffset.v;
            event.hScrollOffset = scrollOffset.h;
            event.contentVer = CONTENT_VERSION;
            event.isManual = !overrideValues.isAuto;
            var content = this._getContentFormatted(overrideValues.content) || JSON.stringify(this._contentHandler.getVisibleContent());
            if (content) {
                event.content = content;
            }
            if (isValueAssigned(overrideValues.isDomComplete)) {
                properties.isDomComplete = overrideValues.isDomComplete;
            }
            else {
                properties.isDomComplete = false;
            }
            this.trackContentUpdate(event, properties);
        };
        ContentUpdate.prototype._getContentFormatted = function (content) {
            if (isValueAssigned(content)) {
                if (Object.prototype.toString.call(content) === "[object Array]") {
                    return JSON.stringify(content);
                }
                else {
                    return _bracketIt(JSON.stringify(content));
                }
            }
            return undefined;
        };
        return ContentUpdate;
    }(WebEvent));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PageUnload = /** @class */ (function (_super) {
        __extendsFn(PageUnload, _super);
        function PageUnload(_webAnalyticsPlugin, _config, _id, _traceLogger, timestamp, maxScroll) {
            var _this = _super.call(this, _webAnalyticsPlugin, _config, null, _id, {}, {}, _traceLogger) || this;
            _this._webAnalyticsPlugin = _webAnalyticsPlugin;
            _this._config = _config;
            _this._id = _id;
            _this._traceLogger = _traceLogger;
            _this._timestamp = timestamp;
            _this._maxScroll = maxScroll;
            return _this;
        }
        PageUnload.prototype.trackPageUnload = function (pageUnloadEvent, properties) {
            var ext = {};
            ext["web"] = {};
            ext["web"]["isManual"] = pageUnloadEvent.isManual;
            var event = {
                name: "Ms.Web.PageUnload",
                baseType: "PageUnloadData",
                ext: ext,
                data: {},
                baseData: {},
                latency: EventLatency.RealTime
            };
            event.baseData["name"] = pageUnloadEvent.name;
            event.baseData["uri"] = pageUnloadEvent.uri;
            event.baseData["id"] = pageUnloadEvent.id;
            event.baseData["properties"] = pageUnloadEvent.properties;
            event.baseData["ver"] = pageUnloadEvent.ver;
            event.baseData["market"] = pageUnloadEvent.market;
            event.baseData["pageType"] = pageUnloadEvent.pageType;
            event.baseData["isLoggedIn"] = pageUnloadEvent.isLoggedIn;
            objForEachKey(properties, function (property, value) {
                if (!event.data[property]) {
                    event.data[property] = value;
                }
            });
            this._webAnalyticsPlugin.core.track(event);
        };
        PageUnload.prototype.capturePageUnload = function (overrideValues, customProperties) {
            overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
            var event = {};
            var properties = isValueAssigned(customProperties) ? customProperties : {};
            var scrollHeight = isDocumentObjectAvailable ? document.body.scrollHeight : 0;
            this._setBasicProperties(event, overrideValues);
            event.isManual = !overrideValues.isAuto;
            properties.dwellTime = this._timestamp._recordTimeSpan("dwellTime", true);
            properties.scrollDepth = overrideValues.scrollDepth || this._maxScroll.v.toString() + "/" + scrollHeight.toString();
            properties.vpHeight = _getViewportDimensions().h;
            properties.vScrollOffset = overrideValues.vScrollOffset || this._maxScroll.v;
            if (isWindowObjectAvailable) {
                var perf = getPerformance();
                var windowPerformanceTiming = perf ? perf.timing : null;
                if (windowPerformanceTiming && windowPerformanceTiming.loadEventStart && windowPerformanceTiming.navigationStart) {
                    if (windowPerformanceTiming.loadEventStart > 0) {
                        properties.pageLoadTime = windowPerformanceTiming.loadEventStart - windowPerformanceTiming.navigationStart;
                    }
                }
            }
            this.trackPageUnload(event, properties);
        };
        return PageUnload;
    }(WebEvent));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PageViewPerformance = /** @class */ (function (_super) {
        __extendsFn(PageViewPerformance, _super);
        function PageViewPerformance() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        PageViewPerformance.prototype.capturePageViewPerformance = function (overrideValues, customProperties) {
            overrideValues = !isValueAssigned(overrideValues) ? {} : overrideValues;
            var event = {};
            var properties = isValueAssigned(customProperties) ? customProperties : {};
            this._setBasicProperties(event, overrideValues);
            this._setPageTags(event, overrideValues);
            event.isManual = !overrideValues.isAuto;
            properties.behavior = this._getBehavior(overrideValues);
            properties.vpHeight = overrideValues.vpHeight;
            properties.vpWidth = overrideValues.vpWidth;
            properties.framework = overrideValues.framework;
            properties.systemTiming = overrideValues.systemTiming;
            properties.customTiming = overrideValues.customTiming;
            this._webAnalyticsPlugin._populatePageViewPerformance(event);
            this._webAnalyticsPlugin.trackPageViewPerformance(event, properties);
        };
        return PageViewPerformance;
    }(WebEvent));

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Id$1 = /** @class */ (function () {
        function Id(core) {
            this.core = core;
            this.appUserId = null;
            this.firstPageView = false;
            this._cookieMgr = safeGetCookieMgr(core);
            this.lastPageViewId = createGuid();
            this.traceId = this.createTraceId();
        }
        Id.visitorId = function () {
            var userId = getCookieValue(safeGetCookieMgr(null), "MUID");
            return userId;
        };
        Id.prototype.createTraceId = function () {
            return createGuid().replace(/-/g, "");
        };
        Id.prototype.getTraceId = function () {
            return this.traceId;
        };
        Id.prototype.getLastPageViewId = function () {
            return this.lastPageViewId;
        };
        Id.prototype.initializeIds = function () {
            if (!this.firstPageView) {
                this.firstPageView = true;
            }
            else {
                this.traceId = this.createTraceId();
                this.lastPageViewId = createGuid();
            }
        };
        Id.prototype.getMuidUserId = function () {
            var muidValue = getCookieValue(this._cookieMgr, "MUID");
            return muidValue && muidValue.length ? "t:" + muidValue : muidValue;
        };
        Id.prototype.setAppUserId = function (uid) {
            this.appUserId = null;
            if (!uid) {
                return;
            }
            for (var i = 0; i < Id.userIdPrefixes.length; i++) {
                if (Id.userIdPrefixes[i] === uid.substring(0, 2)) {
                    this.appUserId = uid;
                    break;
                }
            }
            if (!this.appUserId) ;
        };
        Id.prototype.setDeviceClass = function (newDeviceClass) {
            if (newDeviceClass) {
                this.deviceClass = newDeviceClass;
            }
        };
        Id.prototype.getDeviceClass = function () {
            return this.deviceClass;
        };
        Id.prototype.getAppUserId = function () {
            return this.appUserId;
        };
        Id.prototype.syncMuid = function (muidHost) {
            var location = getLocation();
            if (location) {
                var muidsrc = (location.protocol || "http:") + "//" + muidHost + "/c.gif?DI=4050&did=1&t=";
                var document_1 = getDocument();
                if (document_1) {
                    var img = document_1.createElement("IMG");
                    img.style.display = "none";
                    img.src = muidsrc;
                    img.hidden = "";
                    img["aria-hidden"] = "true";
                    img.role = "presentation";
                }
            }
        };
        Id.prototype.getMuidHost = function (rootDomain) {
            var supportedMuidHosts = {
                "microsoft.com": "c1.microsoft.com",
                "xbox.com": "c.xbox.com",
                "live.com": "c.live.com",
                "microsoftstore.com": "c.microsoftstore.com",
                "msn.com": "c.msn.com",
                "windows.com": "c.windows.com",
                "office.com": "c.office.com"
            };
            return supportedMuidHosts[rootDomain];
        };
        Id.userIdPrefixes = [
            "c:",
            "i:",
            "w:",
        ];
        return Id;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Timespan = /** @class */ (function () {
        function Timespan() {
            this._timers = [];
        }
        Timespan.prototype._recordTimeSpan = function (counterName, isComplete) {
            var timestamp = new Date().getTime();
            if (!isComplete) {
                this._timers[counterName] = timestamp;
            }
            else {
                return timestamp - this._timers[counterName];
            }
        };
        return Timespan;
    }());

    /*!
     * 1DS JS SDK Web Analytics plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var doNotTrackFieldName = "data-bi-dnt";
    var ApplicationInsights$1 = /** @class */ (function (_super) {
        __extendsFn(ApplicationInsights, _super);
        function ApplicationInsights() {
            var _this = _super.call(this) || this;
            _this.identifier = "WebAnalyticsPlugin";
            _this.version = '3.1.1';
            var _pageView;
            var _pageAction;
            var _contentUpdate;
            var _pageUnload;
            var _pageViewPerformance;
            var _cvPlugin;
            var _theConfig;
            var _maxScroll = { h: 0, v: 0 };
            var _isPageUnloadFired = false;
            var _timespan;
            var _contentHandler;
            var _autoCaptureHandler;
            dynamicProto(ApplicationInsights, _this, function (_self, _base) {
                _self._telemetryInitializers = _self._telemetryInitializers || [];
                _self.updateCoreDataConfig = function (coreData) {
                    _theConfig.coreData = extend(true, _theConfig.coreData, coreData);
                };
                function _mergeConfig(overrideConfig) {
                    var defaultConfig = {
                        useDefaultContentName: true,
                        useShortNameForContentBlob: true,
                        debounceMs: {
                            scroll: 600,
                            resize: 3000
                        },
                        biBlobAttributeTag: "data-m",
                        isLoggedIn: false,
                        shareAuthStatus: false,
                        cookiesToCollect: ["MSFPC", "ANON"],
                        autoCapture: {
                            pageView: true,
                            onLoad: true,
                            onUnload: true,
                            click: true,
                            scroll: false,
                            resize: false,
                            lineage: false,
                            jsError: true,
                            msTags: true
                        },
                        callback: {
                            pageName: null,
                            pageActionPageTags: null,
                            pageViewPageTags: null,
                            contentUpdatePageTags: null,
                            pageActionContentTags: null,
                            signedinStatus: null
                        },
                        coreData: {
                            referrerUri: isDocumentObjectAvailable ? document.referrer : "",
                            requestUri: "",
                            pageName: "",
                            pageType: "",
                            product: "",
                            market: "",
                            pageTags: {}
                        },
                        autoPopulateParentIdAndParentName: false,
                        syncMuid: false,
                        muidDomain: "microsoft.com"
                    };
                    var attributesThatAreObjectsInConfig = [];
                    objForEachKey(defaultConfig, function (attribute, value) {
                        if (isObject(value)) {
                            attributesThatAreObjectsInConfig.push(attribute);
                        }
                    });
                    if (overrideConfig) {
                        _removeNonObjectsAndInvalidElements$1(overrideConfig, attributesThatAreObjectsInConfig);
                        return extend(true, defaultConfig, overrideConfig);
                    }
                }
                _self.initialize = function (coreConfig, core, extensions) {
                    var extendedCore = core;
                    coreConfig.extensionConfig = coreConfig.extensionConfig || [];
                    coreConfig.extensionConfig[_self.identifier] = coreConfig.extensionConfig[_self.identifier] || {};
                    _self._config = _theConfig = _mergeConfig(coreConfig.extensionConfig[_self.identifier]);
                    var autoCapture = _theConfig.autoCapture;
                    var existingGetWParamMethod = extendedCore.getWParam;
                    extendedCore.getWParam = function () {
                        var wparam = 0;
                        if (_theConfig.mscomCookies) {
                            wparam = wparam | 1;
                        }
                        return wparam | existingGetWParamMethod();
                    };
                    coreConfig.extensionConfig[_self.identifier].disableExceptionTracking = !autoCapture.jsError;
                    _base.initialize(coreConfig, core, extensions);
                    _contentHandler = _contentHandler ? _contentHandler : new DomContentHandler(_theConfig, _self.diagLog());
                    _autoCaptureHandler = _autoCaptureHandler ? _autoCaptureHandler : new AutoCaptureHandler(_self, _self.diagLog());
                    if (_theConfig.manageCv) {
                        for (var i = 0; i < extensions.length; i++) {
                            if ((extensions[i]).identifier === "CorrelationVectorPlugin") {
                                _theConfig.manageCv = true;
                                _cvPlugin = extensions[i];
                                break;
                            }
                        }
                        if (!_cvPlugin) {
                            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.CVPluginNotAvailable, "Automatic Cv management is set to \"true\" in config.  However, cv plugin is not available. Disabling automatic Cv management");
                            _theConfig.manageCv = false;
                        }
                    }
                    _self.id = new Id$1(core);
                    _timespan = new Timespan();
                    var metaTags = _contentHandler.getMetadata();
                    _pageView = new PageView(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageViewPageTags, metaTags, _self.diagLog());
                    _pageAction = new PageAction(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageActionPageTags, metaTags, _self.diagLog());
                    _contentUpdate = new ContentUpdate(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.contentUpdatePageTags, metaTags, _self.diagLog());
                    _pageUnload = new PageUnload(_this, _theConfig, _self.id, _self.diagLog(), _timespan, _maxScroll);
                    _pageViewPerformance = new PageViewPerformance(_this, _theConfig, _contentHandler, _self.id, _theConfig.callback.pageViewPageTags, metaTags, _self.diagLog());
                    if (_theConfig.syncMuid) {
                        onDomLoaded(function () {
                            var muidDomain = _self.id.getMuidHost(_theConfig.muidDomain);
                            _self.id.syncMuid(muidDomain);
                        });
                    }
                    if (autoCapture.pageView) {
                        _autoCaptureHandler.pageView();
                    }
                    if (autoCapture.onLoad) {
                        _autoCaptureHandler.onLoad();
                    }
                    if (autoCapture.click) {
                        _autoCaptureHandler.click();
                    }
                    if (autoCapture.scroll) {
                        _autoCaptureHandler.scroll(_theConfig.debounceMs);
                    }
                    if (autoCapture.resize) {
                        _autoCaptureHandler.resize(_theConfig.debounceMs);
                    }
                    if (autoCapture.onUnload || _theConfig.manualPageUnload) {
                        _autoCaptureHandler.maxScroll(_maxScroll);
                    }
                    if (autoCapture.onUnload) {
                        _autoCaptureHandler.onUnload();
                    }
                };
                _self.processTelemetry = function (evt, itemCtx) {
                    setProcessTelemetryTimings(evt, _self.identifier);
                    var event = evt;
                    if (event.baseType === "PageviewData") {
                        event.name = "Ms.Web.PageView";
                        event.latency = EventLatency.RealTime;
                    }
                    else if (event.baseType === "ExceptionData") {
                        event.name = "Ms.Web.ClientError";
                        event.latency = EventLatency.Normal;
                        delete (event.baseData["aiDataContract"]);
                    }
                    else if (event.baseType === "PageviewPerformanceData") {
                        event.name = "Ms.Web.PageViewPerformance";
                        event.latency = EventLatency.Normal;
                        delete (event.baseData["isValid"]);
                        delete (event.baseData["durationMs"]);
                    }
                    var cv = null;
                    if (event.baseType !== "PageviewData") {
                        if (_theConfig.manageCv) {
                            cv = _cvPlugin.getCv();
                            if (cv) {
                                cv.increment();
                            }
                        }
                    }
                    else {
                        if (_theConfig.manageCv) {
                            cv = _cvPlugin.getCv();
                            if (!cv) {
                                cv = _cvPlugin.getCv();
                            }
                            else {
                                cv.seed();
                            }
                        }
                    }
                    var doNotSendItem = false;
                    var telemetryInitializersCount = _self._telemetryInitializers.length;
                    for (var i = 0; i < telemetryInitializersCount; ++i) {
                        var telemetryInitializer = _self._telemetryInitializers[i];
                        if (telemetryInitializer) {
                            if (telemetryInitializer.apply(null, [event]) === false) {
                                doNotSendItem = true;
                                break;
                            }
                        }
                    }
                    if (!doNotSendItem) {
                        _self.processNext(event, itemCtx);
                    }
                };
                _self.addTelemetryInitializer = function (telemetryInitializer) {
                    _self._telemetryInitializers.push(telemetryInitializer);
                };
                _self.trackEvent = function (event, customProperties) {
                    event.latency = event.latency || EventLatency.Normal;
                    event.baseData = event.baseData || {};
                    event.data = event.data || {};
                    if (isValueAssigned(customProperties)) {
                        objForEachKey(customProperties, function (prop, value) {
                            event.data[prop] = value;
                        });
                    }
                    _self.core.track(event);
                };
                _self.trackPageView = function (pageViewEvent, properties) {
                    _resetPageUnloadProperties();
                    _self.id.initializeIds();
                    pageViewEvent.id = _self.id.getLastPageViewId();
                    _base.sendPageViewInternal(pageViewEvent, properties, _getSystemProperties(pageViewEvent));
                };
                _self.capturePageView = function (overrideValues, customProperties) {
                    _pageView.capturePageView(overrideValues, customProperties);
                };
                _self.trackPageViewPerformance = function (pageViewPerformance, customProperties) {
                    _base.sendPageViewPerformanceInternal(pageViewPerformance, customProperties, _getSystemProperties(pageViewPerformance));
                };
                _self.capturePageViewPerformance = function (overrideValues, customProperties) {
                    _pageViewPerformance.capturePageViewPerformance(overrideValues, customProperties);
                };
                _self.trackException = function (exception, customProperties) {
                    exception.id = exception.id || createGuid();
                    _base.sendExceptionInternal(exception, customProperties, _getSystemProperties(exception));
                };
                _self.trackPageAction = function (pageActionEvent, pageActionProperties) {
                    _pageAction.trackPageAction(pageActionEvent, pageActionProperties);
                };
                _self.capturePageAction = function (element, overrideValues, customProperties, isRightClick) {
                    if (!_isElementDnt(element, doNotTrackFieldName)) {
                        _pageAction.capturePageAction(element, overrideValues, customProperties, isRightClick);
                    }
                };
                _self.trackContentUpdate = function (contentUpdateEvent, properties) {
                    _contentUpdate.trackContentUpdate(contentUpdateEvent, properties);
                };
                _self.captureContentUpdate = function (overrideValues, customProperties) {
                    _contentUpdate.captureContentUpdate(overrideValues, customProperties);
                };
                _self.trackPageUnload = function (pageUnloadEvent, properties) {
                    if (!_isPageUnloadFired) {
                        _isPageUnloadFired = true;
                        _pageUnload.trackPageUnload(pageUnloadEvent, properties);
                    }
                };
                _self.capturePageUnload = function (overrideValues, customProperties) {
                    if (!_isPageUnloadFired) {
                        _isPageUnloadFired = true;
                        _pageUnload.capturePageUnload(overrideValues, customProperties);
                    }
                };
                _self._populatePageViewPerformance = function (pageViewPerformance) {
                    _self._pageViewPerformanceManager.populatePageViewPerformanceEvent(pageViewPerformance);
                };
                _self.setContentHandler = function (contentHandler) {
                    _contentHandler = contentHandler;
                };
                _self.setAutoCaptureHandler = function (autoCaptureHandler) {
                    _autoCaptureHandler = autoCaptureHandler;
                };
                function _getSystemProperties(event) {
                    var ext = {};
                    if (event.isManual !== undefined) {
                        ext["web"] = {};
                        ext["web"]["isManual"] = event.isManual !== undefined ? event.isManual : true;
                        delete (event.isManual);
                    }
                    return ext;
                }
                function _resetPageUnloadProperties() {
                    _timespan._recordTimeSpan("dwellTime", false);
                    _maxScroll.v = 0;
                    _isPageUnloadFired = false;
                }
            });
            return _this;
        }
        return ApplicationInsights;
    }(ApplicationInsights$2));

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var defaultFlightIdNameSpaces = [
        "AX",
        "EX",
        "SF",
        "CS",
        "CF",
        "CT",
        "CU",
        "DC",
        "DF",
        "H5",
        "HL",
        "WS",
        "WP",
    ];
    function _validateAppExpId(appExpIdNew, flightIdNameSpaces) {
        if (flightIdNameSpaces === void 0) { flightIdNameSpaces = defaultFlightIdNameSpaces; }
        var appExpId = null;
        if (appExpIdNew) {
            var expIdArray = appExpIdNew.split(",");
            for (var i = 0; i < expIdArray.length; i++) {
                if (_isValidAppFlightId(expIdArray[i], flightIdNameSpaces)) {
                    if (!appExpId) {
                        appExpId = expIdArray[i];
                    }
                    else {
                        appExpId += "," + expIdArray[i];
                    }
                }
            }
        }
        return appExpId;
    }
    function _isValidAppFlightId(appFlightId, flightIdNameSpaces) {
        if (flightIdNameSpaces === void 0) { flightIdNameSpaces = defaultFlightIdNameSpaces; }
        if (!appFlightId || appFlightId.length < 4) {
            return false;
        }
        var isValid = false;
        var MAXFLIGHTIDLENGTH = 256;
        var curNameSpace = (appFlightId.substring(0, 3)).toString().toUpperCase();
        for (var i = 0; i < flightIdNameSpaces.length; i++) {
            if (flightIdNameSpaces[i] + ":" === curNameSpace && appFlightId.length <= MAXFLIGHTIDLENGTH) {
                isValid = true;
                break;
            }
        }
        return isValid;
    }
    var Application = /** @class */ (function () {
        function Application(propertiesConfig, core) {
            this.core = core;
            this.appExpId = null;
            this.flightIdNameSpaces = defaultFlightIdNameSpaces.slice(0);
            this.expIdCookieName = "Treatments";
            this._cookieMgr = safeGetCookieMgr(core);
            this._propertiesConfig = propertiesConfig;
            var doc = getDocument();
            if (doc) {
                var documentElement = doc.documentElement;
                if (doc) {
                    this.locale = documentElement.lang;
                }
            }
            this.env = propertiesConfig.env ? propertiesConfig.env : this._getMetaDataFromDOM("awa-")["env"];
        }
        Application.prototype.getExpId = function () {
            return this._propertiesConfig.expId ? this._readExpIdFromCoreData(this._propertiesConfig.expId) : this._readExpIdFromCookie();
        };
        Application.prototype._getMetaDataFromDOM = function (prefix) {
            var metaElements;
            var metaData = {};
            var doc = getDocument();
            if (doc) {
                metaElements = doc && doc.querySelectorAll("meta");
                for (var i = 0; i < metaElements.length; i++) {
                    var meta = metaElements[i];
                    if (meta.name) {
                        var mt = meta.name.toLowerCase();
                        if (mt.indexOf(prefix) === 0) {
                            var name = meta.name.replace(prefix, "");
                            metaData[name] = meta.content;
                        }
                    }
                }
            }
            return metaData;
        };
        Application.prototype._setAppExpId = function (appExpIdNew) {
            if (appExpIdNew === this.appExpId) {
                return;
            }
            this.appExpId = _validateAppExpId(appExpIdNew, this.flightIdNameSpaces);
        };
        Application.prototype._getAppExpId = function () {
            return this.appExpId;
        };
        Application.prototype._readExpIdFromCookie = function () {
            var cookieValue = getCookieValue(this._cookieMgr, this.expIdCookieName);
            this._setAppExpId(cookieValue);
            return this._getAppExpId();
        };
        Application.prototype._readExpIdFromCoreData = function (expId) {
            this._setAppExpId(expId);
            return this._getAppExpId();
        };
        Application.validateAppExpId = _validateAppExpId;
        Application._staticInit = (function () {
            objDefineAccessors(Application.prototype, "expId", Application.prototype.getExpId);
        })();
        return Application;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Cloud = /** @class */ (function () {
        function Cloud() {
        }
        return Cloud;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var User = /** @class */ (function () {
        function User(coreConfig, propertiesConfig, core) {
            this.core = core;
            var cookieMgr = this._cookieMgr = safeGetCookieMgr(core, coreConfig);
            if (cookieMgr && cookieMgr.isEnabled()) {
                var muidValue = getCookieValue(cookieMgr, "MUID");
                if (muidValue) {
                    this.setLocalId("t:" + muidValue);
                }
                if (propertiesConfig.enableApplicationInsightsUser) {
                    var aiUser = getCookieValue(cookieMgr, User.userCookieName);
                    if (aiUser) {
                        var params = aiUser.split(User.cookieSeparator);
                        if (params.length > 0) {
                            this.id = params[0];
                        }
                    }
                    if (!this.id) {
                        this.id = newId((coreConfig && !isUndefined(coreConfig.idLength)) ? coreConfig.idLength : 22);
                        var date = new Date();
                        var acqStr = toISOString(date);
                        this.accountAcquisitionDate = acqStr;
                        var newCookie = [this.id, acqStr];
                        var cookieDomain = propertiesConfig.cookieDomain ? propertiesConfig.cookieDomain : undefined;
                        cookieMgr.set(User.userCookieName, newCookie.join(User.cookieSeparator), 31536000, cookieDomain);
                    }
                }
            }
            if (typeof navigator !== "undefined") {
                var nav = navigator;
                this.locale = nav.userLanguage || nav.language;
            }
        }
        User.prototype.getLocalId = function () {
            if (this._customLocalId) {
                return this._customLocalId;
            }
            var muidValue = getCookieValue(this._cookieMgr, "MUID");
            if (muidValue) {
                this.setLocalId("t:" + muidValue);
            }
            return undefined;
        };
        User.prototype.setLocalId = function (value) {
            this._customLocalId = value;
        };
        User.cookieSeparator = "|";
        User.userCookieName = "ai_user";
        User._staticInit = (function () {
            objDefineAccessors(User.prototype, "localId", User.prototype.getLocalId, User.prototype.setLocalId);
        })();
        return User;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var BROWSERS = {
        MSIE: "MSIE",
        CHROME: "Chrome",
        FIREFOX: "Firefox",
        SAFARI: "Safari",
        EDGE: "Edge",
        ELECTRON: "Electron",
        SKYPE_SHELL: "SkypeShell",
        PHANTOMJS: "PhantomJS",
        OPERA: "Opera"
    };
    var REGEX_VERSION$1 = "([\\d,.]+)";
    var UNKNOWN$1 = "Unknown";
    var Web = /** @class */ (function () {
        function Web(propertiesConfig, core) {
            this._cookieMgr = safeGetCookieMgr(core);
            this._propertiesConfig = propertiesConfig;
            var windowLocation = getLocation();
            if (windowLocation) {
                var domain = windowLocation.hostname;
                if (domain) {
                    this.domain = windowLocation.protocol === "file:" ? "local" : domain;
                }
            }
            var userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
            if (propertiesConfig.userAgent) {
                userAgent = propertiesConfig.userAgent;
            }
            if (propertiesConfig.populateBrowserInfo) {
                if (userAgent) {
                    var browserName = this._getBrowserName(userAgent);
                    this.browser = browserName;
                    this.browserVer = this._getBrowserVersion(userAgent, browserName);
                }
                var screenRes = this._getScreenResolution();
                this.screenRes = screenRes.w + "X" + screenRes.h;
            }
        }
        Web.prototype.getUserConsent = function () {
            return this._propertiesConfig.userConsented || (getCookieValue(this._cookieMgr, this._propertiesConfig.userConsentCookieName || "MSCC") ? true : false);
        };
        Web.prototype.getUserConsentDetails = function () {
            try {
                if (this._propertiesConfig.callback && this._propertiesConfig.callback.userConsentDetails) {
                    var result = this._propertiesConfig.callback.userConsentDetails();
                    if (result) {
                        return JSON.stringify({
                            Required: result.Required ? result.Required : false,
                            Analytics: result.Analytics ? result.Analytics : false,
                            SocialMedia: result.SocialMedia ? result.SocialMedia : false,
                            Advertising: result.Advertising ? result.Advertising : false
                        });
                    }
                }
            }
            catch (e) {
            }
            return null;
        };
        Web.prototype._getBrowserName = function (userAgent) {
            if (this._userAgentContainsString("OPR/", userAgent)) {
                return BROWSERS.OPERA;
            }
            if (this._userAgentContainsString(BROWSERS.PHANTOMJS, userAgent)) {
                return BROWSERS.PHANTOMJS;
            }
            if (this._userAgentContainsString(BROWSERS.EDGE, userAgent)) {
                return BROWSERS.EDGE;
            }
            if (this._userAgentContainsString(BROWSERS.ELECTRON, userAgent)) {
                return BROWSERS.ELECTRON;
            }
            if (this._userAgentContainsString(BROWSERS.CHROME, userAgent)) {
                return BROWSERS.CHROME;
            }
            if (this._userAgentContainsString("Trident", userAgent)) {
                return BROWSERS.MSIE;
            }
            if (this._userAgentContainsString(BROWSERS.FIREFOX, userAgent)) {
                return BROWSERS.FIREFOX;
            }
            if (this._userAgentContainsString(BROWSERS.SAFARI, userAgent)) {
                return BROWSERS.SAFARI;
            }
            if (this._userAgentContainsString(BROWSERS.SKYPE_SHELL, userAgent)) {
                return BROWSERS.SKYPE_SHELL;
            }
            return UNKNOWN$1;
        };
        Web.prototype._userAgentContainsString = function (searchString, userAgent) {
            return userAgent.indexOf(searchString) > -1;
        };
        Web.prototype._getBrowserVersion = function (userAgent, browserName) {
            if (browserName === BROWSERS.MSIE) {
                return this._getIeVersion(userAgent);
            }
            else {
                return this._getOtherVersion(browserName, userAgent);
            }
        };
        Web.prototype._getIeVersion = function (userAgent) {
            var classicIeVersionMatches = userAgent.match(new RegExp(BROWSERS.MSIE + " " + REGEX_VERSION$1));
            if (classicIeVersionMatches) {
                return classicIeVersionMatches[1];
            }
            else {
                var ieVersionMatches = userAgent.match(new RegExp("rv:" + REGEX_VERSION$1));
                if (ieVersionMatches) {
                    return ieVersionMatches[1];
                }
            }
        };
        Web.prototype._getOtherVersion = function (browserString, userAgent) {
            if (browserString === BROWSERS.SAFARI) {
                browserString = "Version";
            }
            var matches = userAgent.match(new RegExp(browserString + "/" + REGEX_VERSION$1));
            if (matches) {
                return matches[1];
            }
            return UNKNOWN$1;
        };
        Web.prototype._getScreenResolution = function () {
            var screenRes = { h: 0, w: 0 };
            var win = getWindow();
            if (win && win.screen) {
                screenRes.h = screen.height;
                screenRes.w = screen.width;
            }
            return screenRes;
        };
        Web._staticInit = (function () {
            objDefineAccessors(Web.prototype, "userConsent", Web.prototype.getUserConsent);
        })();
        return Web;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var OPERATING_SYSTEMS = {
        WINDOWS: "Windows",
        MACOSX: "Mac OS X",
        ANDROID: "Android"
    };
    var OSNAMEREGEX = {
        WIN: /(windows|win32)/i,
        WINRT: / arm;/i,
        WINPHONE: /windows\sphone\s\d+\.\d+/i,
        OSX: /(macintosh|mac os x)/i,
        IOS: /(ipad|iphone|ipod)(?=.*like mac os x)/i,
        LINUX: /(linux|joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk)/i,
        ANDROID: /android/i,
        CROS: /CrOS/i
    };
    var VERSION_MAPPINGS = {
        "5.1": "XP",
        "6.0": "Vista",
        "6.1": "7",
        "6.2": "8",
        "6.3": "8.1",
        "10.0": "10"
    };
    var REGEX_VERSION = "([\\d,.]+)";
    var REGEX_VERSION_MAC = "([\\d,_,.]+)";
    var UNKNOWN = "Unknown";
    var OperatingSystem = /** @class */ (function () {
        function OperatingSystem(propertiesConfig) {
            var userAgent = typeof navigator !== "undefined" ? navigator.userAgent : "";
            if (propertiesConfig.userAgent) {
                userAgent = propertiesConfig.userAgent;
            }
            if (userAgent && propertiesConfig.populateOperatingSystemInfo) {
                var osName = this._getOsName(userAgent.toLowerCase());
                this.name = osName;
                this.ver = this._getOsVersion(userAgent, osName);
            }
        }
        OperatingSystem.prototype._getOsName = function (lowerCaseUserAgent) {
            if (lowerCaseUserAgent.match(OSNAMEREGEX.WINPHONE)) {
                return "Windows Phone";
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.WINRT)) {
                return "Windows RT";
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.WIN)) {
                return OPERATING_SYSTEMS.WINDOWS;
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.IOS)) {
                return "iOS";
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.ANDROID)) {
                return OPERATING_SYSTEMS.ANDROID;
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.LINUX)) {
                return "Linux";
            }
            if (lowerCaseUserAgent.indexOf("x11") !== -1) {
                return "Unix";
            }
            if (lowerCaseUserAgent.indexOf("blackberry") !== -1) {
                return "BlackBerry";
            }
            if (lowerCaseUserAgent.indexOf("symbian") !== -1) {
                return "Symbian";
            }
            if (lowerCaseUserAgent.indexOf("nokia") !== -1) {
                return "Nokia";
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.OSX)) {
                return OPERATING_SYSTEMS.MACOSX;
            }
            if (lowerCaseUserAgent.match(OSNAMEREGEX.CROS)) {
                return "Chrome OS";
            }
            return UNKNOWN;
        };
        OperatingSystem.prototype._getOsVersion = function (userAgent, osName) {
            if (osName === OPERATING_SYSTEMS.WINDOWS) {
                return this._getGenericOsVersion(userAgent, "Windows NT");
            }
            if (osName === OPERATING_SYSTEMS.ANDROID) {
                return this._getGenericOsVersion(userAgent, osName);
            }
            if (osName === OPERATING_SYSTEMS.MACOSX) {
                return this._getMacOsxVersion(userAgent);
            }
            return UNKNOWN;
        };
        OperatingSystem.prototype._getGenericOsVersion = function (userAgent, osName) {
            var ntVersionMatches = userAgent.match(new RegExp(osName + " " + REGEX_VERSION));
            if (ntVersionMatches) {
                if (VERSION_MAPPINGS[ntVersionMatches[1]]) {
                    return VERSION_MAPPINGS[ntVersionMatches[1]];
                }
                return ntVersionMatches[1];
            }
            return UNKNOWN;
        };
        OperatingSystem.prototype._getMacOsxVersion = function (userAgent) {
            var macOsxVersionInUserAgentMatches = userAgent.match(new RegExp(OPERATING_SYSTEMS.MACOSX + " " + REGEX_VERSION_MAC));
            if (macOsxVersionInUserAgentMatches) {
                var versionString = macOsxVersionInUserAgentMatches[1].replace(/_/g, ".");
                if (versionString) {
                    var delimiter = this._getDelimiter(versionString);
                    if (delimiter) {
                        var components = versionString.split(delimiter);
                        return components[0];
                    }
                    else {
                        return versionString;
                    }
                }
            }
            return UNKNOWN;
        };
        OperatingSystem.prototype._getDelimiter = function (versionString) {
            if (versionString.indexOf(".") > -1) {
                return ".";
            }
            if (versionString.indexOf("_") > -1) {
                return "_";
            }
            return null;
        };
        return OperatingSystem;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var IntWeb = /** @class */ (function () {
        function IntWeb(propertiesConfig, core) {
            this.core = core;
            if (propertiesConfig.serviceName) {
                this.serviceName = propertiesConfig.serviceName;
            }
            this._cookieMgr = safeGetCookieMgr(core);
        }
        IntWeb.prototype.getMsfpc = function () {
            return getCookieValue(this._cookieMgr, "MSFPC");
        };
        IntWeb.prototype.getAnid = function () {
            return getCookieValue(this._cookieMgr, "ANON").slice(0, 34);
        };
        IntWeb._staticInit = (function () {
            objDefineAccessors(IntWeb.prototype, "msfpc", IntWeb.prototype.getMsfpc);
            objDefineAccessors(IntWeb.prototype, "anid", IntWeb.prototype.getAnid);
        })();
        return IntWeb;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var HASH_IDENTIFIERS_FLAG = 0x100000;
    var DROP_IDENTIFIERS_FLAG = 0x200000;
    var Utc = /** @class */ (function () {
        function Utc(propertiesConfig) {
            this.popSample = 100;
            this.eventFlags = 0;
            if (propertiesConfig.hashIdentifiers) {
                this.eventFlags = this.eventFlags | HASH_IDENTIFIERS_FLAG;
            }
            if (propertiesConfig.dropIdentifiers) {
                this.eventFlags = this.eventFlags | DROP_IDENTIFIERS_FLAG;
            }
        }
        return Utc;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Loc = /** @class */ (function () {
        function Loc() {
            var timeZone = new Date().getTimezoneOffset();
            var minutes = timeZone % 60;
            var hours = (timeZone - minutes) / 60;
            var timeZonePrefix = "+";
            if (hours > 0) {
                timeZonePrefix = "-";
            }
            hours = Math.abs(hours);
            minutes = Math.abs(minutes);
            this.tz = timeZonePrefix + (hours < 10 ? "0" + hours : hours.toString()) + ":"
                + (minutes < 10 ? "0" + minutes : minutes.toString());
        }
        return Loc;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Device = /** @class */ (function () {
        function Device() {
        }
        return Device;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Session = /** @class */ (function () {
        function Session() {
        }
        Session.prototype.setId = function (id) {
            this.customId = id;
        };
        Session.prototype.getId = function () {
            if (isString(this.customId)) {
                return this.customId;
            }
            else {
                return this.automaticId;
            }
        };
        Session._staticInit = (function () {
            objDefineAccessors(Session.prototype, "id", Session.prototype.getId, Session.prototype.setId);
        })();
        return Session;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Trace = /** @class */ (function () {
        function Trace(propertiesConfig, id, parentId, name) {
            if (propertiesConfig.enableApplicationInsightsTrace) {
                this.traceId = id || generateW3CId();
                this.parentId = parentId;
                this.name = name;
                var loc = getLocation();
                if (loc && loc.pathname) {
                    this.name = loc.pathname;
                }
            }
        }
        return Trace;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var AppExtensionKeys = /** @class */ (function () {
        function AppExtensionKeys() {
        }
        AppExtensionKeys.id = "id";
        AppExtensionKeys.ver = "ver";
        AppExtensionKeys.appName = "name";
        AppExtensionKeys.locale = "locale";
        AppExtensionKeys.expId = "expId";
        AppExtensionKeys.env = "env";
        return AppExtensionKeys;
    }());
    var WebExtensionKeys = /** @class */ (function () {
        function WebExtensionKeys() {
        }
        WebExtensionKeys.domain = "domain";
        WebExtensionKeys.browser = "browser";
        WebExtensionKeys.browserVer = "browserVer";
        WebExtensionKeys.screenRes = "screenRes";
        WebExtensionKeys.userConsent = "userConsent";
        WebExtensionKeys.consentDetails = "consentDetails";
        return WebExtensionKeys;
    }());
    var UserExtensionKeys = /** @class */ (function () {
        function UserExtensionKeys() {
        }
        UserExtensionKeys.locale = "locale";
        UserExtensionKeys.localId = "localId";
        UserExtensionKeys.id = "id";
        return UserExtensionKeys;
    }());
    var OSExtKeys = /** @class */ (function () {
        function OSExtKeys() {
        }
        OSExtKeys.osName = "name";
        OSExtKeys.ver = "ver";
        return OSExtKeys;
    }());
    var SDKExtKeys = /** @class */ (function () {
        function SDKExtKeys() {
        }
        SDKExtKeys.ver = "ver";
        SDKExtKeys.seq = "seq";
        SDKExtKeys.installId = "installId";
        SDKExtKeys.epoch = "epoch";
        return SDKExtKeys;
    }());
    var IntWebExtKeys = /** @class */ (function () {
        function IntWebExtKeys() {
        }
        IntWebExtKeys.msfpc = "msfpc";
        IntWebExtKeys.anid = "anid";
        IntWebExtKeys.serviceName = "serviceName";
        return IntWebExtKeys;
    }());
    var UtcExtKeys = /** @class */ (function () {
        function UtcExtKeys() {
        }
        UtcExtKeys.popSample = "popSample";
        UtcExtKeys.eventFlags = "eventFlags";
        return UtcExtKeys;
    }());
    var LocExtKeys = /** @class */ (function () {
        function LocExtKeys() {
        }
        LocExtKeys.tz = "tz";
        return LocExtKeys;
    }());
    var SessionExtKeys = /** @class */ (function () {
        function SessionExtKeys() {
        }
        SessionExtKeys.sessionId = "sesId";
        return SessionExtKeys;
    }());
    var DeviceExtKeys = /** @class */ (function () {
        function DeviceExtKeys() {
        }
        DeviceExtKeys.localId = "localId";
        DeviceExtKeys.deviceClass = "deviceClass";
        DeviceExtKeys.make = "make";
        DeviceExtKeys.model = "model";
        return DeviceExtKeys;
    }());
    var CloudExtKeys = /** @class */ (function () {
        function CloudExtKeys() {
        }
        CloudExtKeys.role = "role";
        CloudExtKeys.roleInstance = "roleInstance";
        CloudExtKeys.roleVer = "roleVer";
        return CloudExtKeys;
    }());
    var TraceExtKeys = /** @class */ (function () {
        function TraceExtKeys() {
        }
        TraceExtKeys.traceId = "traceID";
        TraceExtKeys.traceName = "name";
        TraceExtKeys.parentId = "parentID";
        return TraceExtKeys;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Extensions = /** @class */ (function () {
        function Extensions() {
        }
        Extensions.UserExt = "user";
        Extensions.DeviceExt = "device";
        Extensions.TraceExt = "trace";
        Extensions.WebExt = "web";
        Extensions.AppExt = "app";
        Extensions.OSExt = "os";
        Extensions.SdkExt = "sdk";
        Extensions.IntWebExt = "intweb";
        Extensions.UtcExt = "utc";
        Extensions.LocExt = "loc";
        Extensions.CloudExt = "cloud";
        return Extensions;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var DEVICE_ID_COOKIE = "MicrosoftApplicationsTelemetryDeviceId";
    function _saveData(mgr, propertyStorage, name, value) {
        if (propertyStorage) {
            propertyStorage.setProperty(name, value);
        }
        else {
            mgr.set(name, value, 31536000);
        }
    }
    function _getData(mgr, propertyStorage, name) {
        if (propertyStorage) {
            return propertyStorage.getProperty(name) || "";
        }
        return getCookieValue(mgr, name);
    }
    var Sdk = /** @class */ (function () {
        function Sdk(coreConfig, core) {
            this._sequenceId = 0;
            var propertyStorage = coreConfig.propertyStorageOverride;
            this.seq = this._sequenceId;
            this.epoch = (new Date()).getTime().toString();
            var mgr = safeGetCookieMgr(core, coreConfig);
            if (mgr.isEnabled() || propertyStorage) {
                var deviceId = _getData(mgr, propertyStorage, DEVICE_ID_COOKIE);
                if (!deviceId) {
                    deviceId = newGuid();
                }
                _saveData(mgr, propertyStorage, DEVICE_ID_COOKIE, deviceId);
                this.installId = deviceId;
            }
            else {
                mgr.purge(DEVICE_ID_COOKIE);
            }
        }
        Sdk.prototype.getSequenceId = function () {
            return ++this._sequenceId;
        };
        return Sdk;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var _canUseLocalStorage;
    var StorageType;
    (function (StorageType) {
        StorageType[StorageType["LocalStorage"] = 0] = "LocalStorage";
        StorageType[StorageType["SessionStorage"] = 1] = "SessionStorage";
    })(StorageType || (StorageType = {}));
    function canUseLocalStorage() {
        if (_canUseLocalStorage === undefined) {
            _canUseLocalStorage = !!_getVerifiedStorageObject(StorageType.LocalStorage);
        }
        return _canUseLocalStorage;
    }
    function _getLocalStorageObject() {
        if (canUseLocalStorage()) {
            return _getVerifiedStorageObject(StorageType.LocalStorage);
        }
        return null;
    }
    function _getVerifiedStorageObject(storageType) {
        var storage = null;
        var fail;
        var uid;
        try {
            var global = getGlobal();
            if (!global) {
                return null;
            }
            uid = new Date();
            storage = storageType === StorageType.LocalStorage ? global.localStorage : global.sessionStorage;
            if (storage && isFunction(storage.setItem)) {
                storage.setItem(uid, uid);
                fail = storage.getItem(uid) !== uid;
                storage.removeItem(uid);
                if (fail) {
                    storage = null;
                }
            }
        }
        catch (exception) {
            storage = null;
        }
        return storage;
    }
    function setStorage(logger, name, data) {
        var storage = _getLocalStorageObject();
        if (storage !== null) {
            try {
                storage.setItem(name, data);
                return true;
            }
            catch (e) {
                _canUseLocalStorage = false;
                logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.BrowserCannotWriteLocalStorage, "Browser failed write to local storage. " + e);
            }
        }
        return false;
    }
    function getStorage(logger, name) {
        var storage = _getLocalStorageObject();
        if (storage !== null) {
            try {
                return storage.getItem(name);
            }
            catch (e) {
                _canUseLocalStorage = false;
                logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.BrowserCannotReadLocalStorage, "Browser failed read of local storage. " + e);
            }
        }
        return null;
    }

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var SessionManager = /** @class */ (function () {
        function SessionManager(core, propConfig) {
            var _cookieUpdatedTimestamp;
            var _logger = safeGetLogger(core);
            var cookieMgr = safeGetCookieMgr(core);
            var _storageNamePrefix;
            dynamicProto(SessionManager, this, function (_self) {
                var functionalConfig = getDefaultConfig(propConfig);
                if (!isFunction(propConfig.sessionExpirationMs)) {
                    functionalConfig.sessionExpirationMs = function () { return SessionManager.acquisitionSpan; };
                }
                if (!isFunction(propConfig.sessionRenewalMs)) {
                    functionalConfig.sessionRenewalMs = function () { return SessionManager.renewalSpan; };
                }
                _self.config = functionalConfig;
                _storageNamePrefix = function () { return _self.config.namePrefix && _self.config.namePrefix() ? SessionManager.cookieNameConst + _self.config.namePrefix() : SessionManager.cookieNameConst; };
                _self.automaticSession = new Session();
                _self.update = function () {
                    if (!_self.automaticSession.getId()) {
                        _initializeAutomaticSession();
                    }
                    var autoSession = _self.automaticSession;
                    var config = _self.config;
                    var now = new Date().getTime();
                    var acquisitionExpired = now - autoSession.acquisitionDate > config.sessionExpirationMs();
                    var renewalExpired = now - autoSession.renewalDate > config.sessionRenewalMs();
                    if (acquisitionExpired || renewalExpired) {
                        _renew();
                    }
                    else {
                        var cookieUpdatedTimestamp = _cookieUpdatedTimestamp;
                        if (!cookieUpdatedTimestamp || now - cookieUpdatedTimestamp > SessionManager.cookieUpdateInterval) {
                            autoSession.renewalDate = now;
                            _setCookie(autoSession.getId(), autoSession.acquisitionDate, autoSession.renewalDate);
                        }
                    }
                };
                _self.backup = function () {
                    var automaticSession = _self.automaticSession;
                    _setStorage(automaticSession.getId(), automaticSession.acquisitionDate, automaticSession.renewalDate);
                };
                function getDefaultConfig(config) {
                    return {
                        sessionRenewalMs: config.sessionRenewalMs && (function () { return config.sessionRenewalMs; }),
                        sessionExpirationMs: config.sessionExpirationMs && (function () { return config.sessionExpirationMs; }),
                        cookieDomain: config.cookieDomain && (function () { return config.cookieDomain; }),
                        namePrefix: config.namePrefix && (function () { return config.namePrefix; }),
                        sessionAsGuid: (function () { return config.sessionAsGuid; }),
                        idLength: (function () { return config.idLength ? config.idLength : 22; })
                    };
                }
                function _initializeAutomaticSession() {
                    var cookie = getCookie(_storageNamePrefix());
                    if (cookie && isFunction(cookie.split)) {
                        _initializeAutomaticSessionWithData(cookie);
                    }
                    else {
                        var storage = getStorage(_logger, _storageNamePrefix());
                        if (storage) {
                            _initializeAutomaticSessionWithData(storage);
                        }
                    }
                    if (!_self.automaticSession.getId()) {
                        _renew();
                    }
                }
                function _initializeAutomaticSessionWithData(sessionData) {
                    var automaticSession = _self.automaticSession;
                    var params = sessionData.split("|");
                    if (params.length > 0) {
                        automaticSession.setId(params[0]);
                    }
                    try {
                        if (params.length > 1) {
                            var acq = +params[1];
                            automaticSession.acquisitionDate = +new Date(acq);
                            automaticSession.acquisitionDate = automaticSession.acquisitionDate > 0 ? automaticSession.acquisitionDate : 0;
                        }
                        if (params.length > 2) {
                            var renewal = +params[2];
                            automaticSession.renewalDate = +new Date(renewal);
                            automaticSession.renewalDate = automaticSession.renewalDate > 0 ? automaticSession.renewalDate : 0;
                        }
                    }
                    catch (e) {
                        _logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.ErrorParsingAISessionCookie, "Error parsing ai_session cookie, session will be reset: " + e);
                    }
                    if (automaticSession.renewalDate === 0) {
                        _logger.throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.SessionRenewalDateIsZero, "AI session renewal date is 0, session will be reset.");
                    }
                }
                function _renew() {
                    var automaticSession = _self.automaticSession;
                    var now = new Date().getTime();
                    var sessionAsGuid = _self.config.sessionAsGuid();
                    if (!isUndefined(sessionAsGuid) && sessionAsGuid) {
                        if (!isBoolean(sessionAsGuid)) {
                            automaticSession.setId(createGuid(sessionAsGuid));
                        }
                        else {
                            automaticSession.setId(createGuid());
                        }
                    }
                    else {
                        automaticSession.setId(newId((functionalConfig && functionalConfig.idLength) ? functionalConfig.idLength() : 22));
                    }
                    automaticSession.acquisitionDate = now;
                    automaticSession.renewalDate = now;
                    _setCookie(automaticSession.getId(), automaticSession.acquisitionDate, automaticSession.renewalDate);
                    if (!canUseLocalStorage()) {
                        _logger.throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.BrowserDoesNotSupportLocalStorage, "Browser does not support local storage. Session durations will be inaccurate.");
                    }
                }
                function _setCookie(guid, acq, renewal) {
                    var acquisitionExpiry = acq + _self.config.sessionExpirationMs();
                    var renewalExpiry = renewal + _self.config.sessionRenewalMs();
                    var cookieExpiry = new Date();
                    var cookie = [guid, acq, renewal];
                    if (acquisitionExpiry < renewalExpiry) {
                        cookieExpiry.setTime(acquisitionExpiry);
                    }
                    else {
                        cookieExpiry.setTime(renewalExpiry);
                    }
                    var cookieDomain = _self.config.cookieDomain ? _self.config.cookieDomain() : null;
                    cookieMgr.set(_storageNamePrefix(), cookie.join("|") + ";expires=" + cookieExpiry.toUTCString(), null, cookieDomain);
                    _cookieUpdatedTimestamp = new Date().getTime();
                }
                function _setStorage(guid, acq, renewal) {
                    setStorage(_logger, _storageNamePrefix(), [guid, acq, renewal].join("|"));
                }
            });
        }
        SessionManager.acquisitionSpan = 86400000;
        SessionManager.renewalSpan = 1800000;
        SessionManager.cookieUpdateInterval = 60000;
        SessionManager.cookieNameConst = "ai_session";
        return SessionManager;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var _isString = isString;
    var TelemetryContext = /** @class */ (function () {
        function TelemetryContext(coreConfig, propertiesConfig, core) {
            this.app = new Application(propertiesConfig, core);
            this.cloud = new Cloud();
            this.user = new User(coreConfig, propertiesConfig, core);
            this.os = new OperatingSystem(propertiesConfig);
            this.web = new Web(propertiesConfig, core);
            this.sdk = new Sdk(coreConfig, core);
            this.intWeb = new IntWeb(propertiesConfig, core);
            this.utc = new Utc(propertiesConfig);
            this.loc = new Loc();
            this.device = new Device();
            this.telemetryTrace = new Trace(propertiesConfig);
            this.sessionManager = new SessionManager(core, propertiesConfig);
            this.session = new Session();
        }
        TelemetryContext.prototype.getSessionId = function () {
            var session = this.session;
            if (session && _isString(session.customId)) {
                return session.customId;
            }
            var sessionManager = this.sessionManager;
            sessionManager.update();
            var autoSession = sessionManager.automaticSession;
            if (autoSession) {
                var autoId = autoSession.getId();
                if (autoId && _isString(autoId)) {
                    session.automaticId = autoId;
                }
            }
            return session.automaticId;
        };
        TelemetryContext.prototype.applyApplicationContext = function (event) {
            var app = this.app;
            if (_isString(app.id)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.id] = app.id;
            }
            if (_isString(app.ver)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.ver] = app.ver;
            }
            if (_isString(app.name)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.appName] = app.name;
            }
            if (_isString(app.locale)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.locale] = app.locale;
            }
            var expId = app.getExpId();
            if (_isString(expId)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.expId] = expId;
            }
            if (_isString(app.env)) {
                event.ext[Extensions.AppExt][AppExtensionKeys.env] = app.env;
            }
        };
        TelemetryContext.prototype.applyUserContext = function (event) {
            var user = this.user;
            var localId = user.getLocalId();
            if (_isString(localId)) {
                event.ext[Extensions.UserExt][UserExtensionKeys.localId] = localId;
            }
            if (_isString(user.locale)) {
                event.ext[Extensions.UserExt][UserExtensionKeys.locale] = user.locale;
            }
            if (_isString(user.id)) {
                event.ext[Extensions.UserExt][UserExtensionKeys.id] = user.id;
            }
        };
        TelemetryContext.prototype.applyWebContext = function (event) {
            var web = this.web;
            if (_isString(web.domain)) {
                event.ext[Extensions.WebExt][WebExtensionKeys.domain] = web.domain;
            }
            if (_isString(web.browser)) {
                event.ext[Extensions.WebExt][WebExtensionKeys.browser] = web.browser;
            }
            if (_isString(web.browserVer)) {
                event.ext[Extensions.WebExt][WebExtensionKeys.browserVer] = web.browserVer;
            }
            if (_isString(web.screenRes)) {
                event.ext[Extensions.WebExt][WebExtensionKeys.screenRes] = web.screenRes;
            }
            event.ext[Extensions.WebExt][WebExtensionKeys.userConsent] = web.getUserConsent();
            event.ext[Extensions.WebExt][WebExtensionKeys.consentDetails] = web.getUserConsentDetails();
        };
        TelemetryContext.prototype.applyOsContext = function (event) {
            var os = this.os;
            if (_isString(os.name)) {
                event.ext[Extensions.OSExt][OSExtKeys.osName] = os.name;
            }
            if (_isString(os.ver)) {
                event.ext[Extensions.OSExt][OSExtKeys.ver] = os.ver;
            }
        };
        TelemetryContext.prototype.applySdkContext = function (event) {
            var sdk = this.sdk;
            event.ext[Extensions.SdkExt][SDKExtKeys.seq] = sdk.getSequenceId();
            event.ext[Extensions.SdkExt][SDKExtKeys.epoch] = sdk.epoch;
            if (_isString(sdk.installId)) {
                event.ext[Extensions.SdkExt][SDKExtKeys.installId] = sdk.installId;
            }
        };
        TelemetryContext.prototype.applyIntWebContext = function (event) {
            var intWeb = this.intWeb;
            var msfpc = intWeb.getMsfpc();
            if (_isString(msfpc)) {
                event.ext[Extensions.IntWebExt][IntWebExtKeys.msfpc] = msfpc;
            }
            var anid = intWeb.getAnid();
            if (_isString(anid)) {
                event.ext[Extensions.IntWebExt][IntWebExtKeys.anid] = anid;
            }
            if (_isString(intWeb.serviceName)) {
                event.ext[Extensions.IntWebExt][IntWebExtKeys.serviceName] = intWeb.serviceName;
            }
        };
        TelemetryContext.prototype.applyUtcContext = function (event) {
            var utc = this.utc;
            event.ext[Extensions.UtcExt][UtcExtKeys.popSample] = utc.popSample;
            if (utc.eventFlags > 0) {
                event.ext[Extensions.UtcExt][UtcExtKeys.eventFlags] = utc.eventFlags;
            }
        };
        TelemetryContext.prototype.applyLocContext = function (event) {
            event.ext[Extensions.LocExt][LocExtKeys.tz] = this.loc.tz;
        };
        TelemetryContext.prototype.applySessionContext = function (event) {
            event.ext[Extensions.AppExt][SessionExtKeys.sessionId] = this.getSessionId();
        };
        TelemetryContext.prototype.applyDeviceContext = function (event) {
            var device = this.device;
            if (_isString(device.localId)) {
                event.ext[Extensions.DeviceExt][DeviceExtKeys.localId] = device.localId;
            }
            if (_isString(device.make)) {
                event.ext[Extensions.DeviceExt][DeviceExtKeys.make] = device.make;
            }
            if (_isString(device.model)) {
                event.ext[Extensions.DeviceExt][DeviceExtKeys.model] = device.model;
            }
            if (_isString(device.deviceClass)) {
                event.ext[Extensions.DeviceExt][DeviceExtKeys.deviceClass] = device.deviceClass;
            }
        };
        TelemetryContext.prototype.applyCloudContext = function (event) {
            var cloud = this.cloud;
            if (_isString(cloud.role)) {
                event.ext[Extensions.CloudExt][CloudExtKeys.role] = cloud.role;
            }
            if (_isString(cloud.roleInstance)) {
                event.ext[Extensions.CloudExt][CloudExtKeys.roleInstance] = cloud.roleInstance;
            }
            if (_isString(cloud.roleVer)) {
                event.ext[Extensions.CloudExt][CloudExtKeys.roleVer] = cloud.roleVer;
            }
        };
        TelemetryContext.prototype.applyAITraceContext = function (event) {
            var trace = this.telemetryTrace;
            if (_isString(trace.traceId)) {
                event.ext[Extensions.TraceExt][TraceExtKeys.traceId] = trace.traceId;
            }
            if (_isString(trace.name)) {
                event.ext[Extensions.TraceExt][TraceExtKeys.traceName] = trace.name;
            }
            if (_isString(trace.parentId)) {
                event.ext[Extensions.TraceExt][TraceExtKeys.parentId] = trace.parentId;
            }
        };
        return TelemetryContext;
    }());

    /*!
     * 1DS JS SDK Properties plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var PropertiesPlugin = /** @class */ (function (_super) {
        __extendsFn(PropertiesPlugin, _super);
        function PropertiesPlugin() {
            var _this = _super.call(this) || this;
            _this.identifier = "SystemPropertiesCollector";
            _this.priority = 3;
            _this.version = '3.1.1';
            var _context;
            var _properties = {};
            dynamicProto(PropertiesPlugin, _this, function (_self, _base) {
                _self.initialize = function (coreConfig, core, extensions) {
                    _super.prototype.initialize.call(_this, coreConfig, core, extensions);
                    _context = new TelemetryContext(coreConfig, _self._getTelCtx().getExtCfg(_self.identifier), core);
                };
                _self.processTelemetry = function (event, itemCtx) {
                    setProcessTelemetryTimings(event, _self.identifier);
                    itemCtx = _self._getTelCtx(itemCtx);
                    var evtExt = event.ext = event.ext ? event.ext : {};
                    event.data = event.data ? event.data : {};
                    evtExt[Extensions.AppExt] = evtExt[Extensions.AppExt] || {};
                    evtExt[Extensions.UserExt] = evtExt[Extensions.UserExt] || {};
                    evtExt[Extensions.WebExt] = evtExt[Extensions.WebExt] || {};
                    evtExt[Extensions.OSExt] = evtExt[Extensions.OSExt] || {};
                    evtExt[Extensions.SdkExt] = evtExt[Extensions.SdkExt] || {};
                    evtExt[Extensions.IntWebExt] = evtExt[Extensions.IntWebExt] || {};
                    evtExt[Extensions.UtcExt] = evtExt[Extensions.UtcExt] || {};
                    evtExt[Extensions.LocExt] = evtExt[Extensions.LocExt] || {};
                    evtExt[Extensions.DeviceExt] = evtExt[Extensions.DeviceExt] || {};
                    evtExt[Extensions.TraceExt] = evtExt[Extensions.TraceExt] || {};
                    evtExt[Extensions.CloudExt] = evtExt[Extensions.CloudExt] || {};
                    _context.applyApplicationContext(event);
                    _context.applyUserContext(event);
                    _context.applyWebContext(event);
                    _context.applyOsContext(event);
                    _context.applySdkContext(event);
                    _context.applyIntWebContext(event);
                    _context.applyUtcContext(event);
                    _context.applyLocContext(event);
                    _context.applySessionContext(event);
                    _context.applyDeviceContext(event);
                    _context.applyAITraceContext(event);
                    _context.applyCloudContext(event);
                    arrForEach(objKeys(evtExt), function (key) {
                        if (objKeys(evtExt[key]).length === 0) {
                            delete evtExt[key];
                        }
                    });
                    _addPropertiesIfAbsent(_properties, event.data);
                    _self.processNext(event, itemCtx);
                };
                _self.getPropertiesContext = function () {
                    return _context;
                };
                _self.setProperty = function (name, value) {
                    _properties[name] = value;
                };
                function _addPropertiesIfAbsent(inputMap, outputMap) {
                    if (inputMap) {
                        objForEachKey(inputMap, function (name, inputValue) {
                            if (!outputMap[name]) {
                                outputMap[name] = inputValue;
                            }
                        });
                    }
                }
            });
            return _this;
        }
        return PropertiesPlugin;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var RT_PROFILE = "REAL_TIME";
    var NRT_PROFILE = "NEAR_REAL_TIME";
    var BE_PROFILE = "BEST_EFFORT";

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var EventBatch = /** @class */ (function () {
        function EventBatch(iKey, addEvents) {
            var events = addEvents ? [].concat(addEvents) : [];
            var _self = this;
            _self.iKey = function () {
                return iKey;
            };
            _self.count = function () {
                return events.length;
            };
            _self.events = function () {
                return events;
            };
            _self.addEvents = function (theEvents, append) {
                if (append === void 0) { append = true; }
                if (theEvents && theEvents.length > 0) {
                    if (append) {
                        events = events.concat(theEvents);
                    }
                    else {
                        events = theEvents.concat(events);
                    }
                    return theEvents.length;
                }
                return 0;
            };
            _self.split = function (fromEvent, numEvents) {
                var newBatch = new EventBatch(iKey);
                if (fromEvent < events.length) {
                    var cnt = events.length - fromEvent;
                    if (!isNullOrUndefined(numEvents)) {
                        cnt = numEvents < cnt ? numEvents : cnt;
                    }
                    newBatch.addEvents(events.splice(fromEvent, cnt), true);
                }
                return newBatch;
            };
        }
        EventBatch.create = function (iKey, theEvents) {
            return new EventBatch(iKey, theEvents);
        };
        return EventBatch;
    }());

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var _MAX_STRING_JOINS = 20;
    var RequestSizeLimitBytes = 3984588;
    var BeaconRequestSizeLimitBytes = 65000;
    var MaxRecordSize = 2000000;
    var MaxBeaconRecordSize = Math.min(MaxRecordSize, BeaconRequestSizeLimitBytes);
    var metadata = "metadata";
    var f = "f";
    var rCheckDot = /\./;
    var Serializer = /** @class */ (function () {
        function Serializer(perfManager, valueSanitizer, stringifyObjects, enableCompoundKey) {
            var strData = "data";
            var strBaseData = "baseData";
            var strExt = "ext";
            var _checkForCompoundkey = !!enableCompoundKey;
            var _processSubMetaData = true;
            var _theSanitizer = valueSanitizer;
            var _isReservedCache = {};
            dynamicProto(Serializer, this, function (_self) {
                _self.createPayload = function (retryCnt, isTeardown, isSync, useSendBeacon) {
                    return {
                        apiKeys: [],
                        payloadBlob: "",
                        overflow: null,
                        sizeExceed: [],
                        batches: [],
                        numEvents: 0,
                        retryCnt: retryCnt,
                        isTeardown: isTeardown,
                        isSync: isSync,
                        isBeacon: useSendBeacon
                    };
                };
                _self.appendPayload = function (payload, theBatch, maxEventsPerBatch) {
                    var canAddEvents = payload && theBatch && !payload.overflow;
                    if (canAddEvents) {
                        doPerf(perfManager, function () { return "Serializer:appendPayload"; }, function () {
                            var theEvents = theBatch.events();
                            var payloadBlob = payload.payloadBlob;
                            var payloadEvents = payload.numEvents;
                            var eventsAdded = false;
                            var sizeExceeded = [];
                            var isBeaconPayload = payload.isBeacon;
                            var requestMaxSize = isBeaconPayload ? BeaconRequestSizeLimitBytes : RequestSizeLimitBytes;
                            var recordMaxSize = isBeaconPayload ? MaxBeaconRecordSize : MaxRecordSize;
                            var lp = 0;
                            var joinCount = 0;
                            while (lp < theEvents.length) {
                                var theEvent = theEvents[lp];
                                if (theEvent) {
                                    if (payloadEvents >= maxEventsPerBatch) {
                                        payload.overflow = theBatch.split(lp);
                                        break;
                                    }
                                    var eventBlob = _self.getEventBlob(theEvent);
                                    if (eventBlob.length <= recordMaxSize) {
                                        var blobLength = eventBlob.length;
                                        var currentSize = payloadBlob.length;
                                        if (currentSize + blobLength > requestMaxSize) {
                                            payload.overflow = theBatch.split(lp);
                                            break;
                                        }
                                        if (payloadBlob) {
                                            payloadBlob += "\n";
                                        }
                                        payloadBlob += eventBlob;
                                        joinCount++;
                                        if (joinCount > _MAX_STRING_JOINS) {
                                            payloadBlob.substr(0, 1);
                                            joinCount = 0;
                                        }
                                        eventsAdded = true;
                                        payloadEvents++;
                                    }
                                    else {
                                        sizeExceeded.push(theEvent);
                                        theEvents.splice(lp, 1);
                                        lp--;
                                    }
                                }
                                lp++;
                            }
                            if (sizeExceeded && sizeExceeded.length > 0) {
                                payload.sizeExceed.push(EventBatch.create(theBatch.iKey(), sizeExceeded));
                            }
                            if (eventsAdded) {
                                payload.batches.push(theBatch);
                                payload.payloadBlob = payloadBlob;
                                payload.numEvents = payloadEvents;
                                var apiKey = theBatch.iKey();
                                if (arrIndexOf(payload.apiKeys, apiKey) === -1) {
                                    payload.apiKeys.push(apiKey);
                                }
                            }
                        }, function () { return ({ payload: payload, theBatch: { iKey: theBatch.iKey(), evts: theBatch.events() }, max: maxEventsPerBatch }); });
                    }
                    return canAddEvents;
                };
                _self.getEventBlob = function (eventData) {
                    return doPerf(perfManager, function () { return "Serializer.getEventBlob"; }, function () {
                        var serializedEvent = {};
                        serializedEvent.name = eventData.name;
                        serializedEvent.time = eventData.time;
                        serializedEvent.ver = eventData.ver;
                        serializedEvent.iKey = "o:" + getTenantId(eventData.iKey);
                        var serializedExt = {};
                        var eventExt = eventData[strExt];
                        if (eventExt) {
                            serializedEvent[strExt] = serializedExt;
                            objForEachKey(eventExt, function (key, value) {
                                var data = serializedExt[key] = {};
                                _processPathKeys(value, data, "ext." + key, true, null, null, true);
                            });
                        }
                        var serializedData = serializedEvent[strData] = {};
                        serializedData.baseType = eventData.baseType;
                        var serializedBaseData = serializedData[strBaseData] = {};
                        _processPathKeys(eventData.baseData, serializedBaseData, strBaseData, false, [strBaseData], function (pathKeys, name, value) {
                            _addJSONPropertyMetaData(serializedExt, pathKeys, name, value);
                        }, _processSubMetaData);
                        _processPathKeys(eventData.data, serializedData, strData, false, [], function (pathKeys, name, value) {
                            _addJSONPropertyMetaData(serializedExt, pathKeys, name, value);
                        }, _processSubMetaData);
                        return JSON.stringify(serializedEvent);
                    }, function () { return ({ item: eventData }); });
                };
                function _isReservedField(path, name) {
                    var result = _isReservedCache[path];
                    if (result === undefined) {
                        if (path.length >= 7) {
                            result = strStartsWith(path, "ext.metadata") || strStartsWith(path, "ext.web");
                        }
                        _isReservedCache[path] = result;
                    }
                    return result;
                }
                function _processPathKeys(srcObj, target, thePath, checkReserved, metadataPathKeys, metadataCallback, processSubKeys) {
                    objForEachKey(srcObj, function (key, srcValue) {
                        var prop = null;
                        if (srcValue || isValueAssigned(srcValue)) {
                            var path = thePath;
                            var name_1 = key;
                            var theMetaPathKeys = metadataPathKeys;
                            var destObj = target;
                            if (_checkForCompoundkey && !checkReserved && rCheckDot.test(key)) {
                                var subKeys = key.split(".");
                                var keyLen = subKeys.length;
                                if (keyLen > 1) {
                                    if (theMetaPathKeys) {
                                        theMetaPathKeys = theMetaPathKeys.slice();
                                    }
                                    for (var lp = 0; lp < keyLen - 1; lp++) {
                                        var subKey = subKeys[lp];
                                        destObj = destObj[subKey] = destObj[subKey] || {};
                                        path += "." + subKey;
                                        if (theMetaPathKeys) {
                                            theMetaPathKeys.push(subKey);
                                        }
                                    }
                                    name_1 = subKeys[keyLen - 1];
                                }
                            }
                            var isReserved = checkReserved && _isReservedField(path);
                            if (!isReserved && _theSanitizer && _theSanitizer.handleField(path, name_1)) {
                                prop = _theSanitizer.value(path, name_1, srcValue, stringifyObjects);
                            }
                            else {
                                prop = sanitizeProperty(name_1, srcValue, stringifyObjects);
                            }
                            if (prop) {
                                var newValue = prop.value;
                                destObj[name_1] = newValue;
                                if (metadataCallback) {
                                    metadataCallback(theMetaPathKeys, name_1, prop);
                                }
                                if (processSubKeys && typeof newValue === "object" && !isArray(newValue)) {
                                    var newPath = theMetaPathKeys;
                                    if (newPath) {
                                        newPath = newPath.slice();
                                        newPath.push(name_1);
                                    }
                                    _processPathKeys(srcValue, newValue, path + "." + name_1, checkReserved, newPath, metadataCallback, processSubKeys);
                                }
                            }
                        }
                    });
                }
            });
        }
        return Serializer;
    }());
    function _addJSONPropertyMetaData(json, propKeys, name, propertyValue) {
        if (propertyValue && json) {
            var encodedTypeValue = getCommonSchemaMetaData(propertyValue.value, propertyValue.kind, propertyValue.propertyType);
            if (encodedTypeValue > -1) {
                var metaData = json[metadata];
                if (!metaData) {
                    metaData = json[metadata] = { f: {} };
                }
                var metaTarget = metaData[f];
                if (!metaTarget) {
                    metaTarget = metaData[f] = {};
                }
                if (propKeys) {
                    for (var lp = 0; lp < propKeys.length; lp++) {
                        var key = propKeys[lp];
                        if (!metaTarget[key]) {
                            metaTarget[key] = { f: {} };
                        }
                        var newTarget = metaTarget[key][f];
                        if (!newTarget) {
                            newTarget = metaTarget[key][f] = {};
                        }
                        metaTarget = newTarget;
                    }
                }
                metaTarget = metaTarget[name] = {};
                if (isArray(propertyValue.value)) {
                    metaTarget["a"] = {
                        t: encodedTypeValue
                    };
                }
                else {
                    metaTarget["t"] = encodedTypeValue;
                }
            }
        }
    }

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var RandomizationLowerThreshold = 0.8;
    var RandomizationUpperThreshold = 1.2;
    var BaseBackoff = 3000;
    var MaxBackoff = 600000;
    var RetryPolicy = /** @class */ (function () {
        function RetryPolicy() {
        }
        RetryPolicy.shouldRetryForStatus = function (httpStatusCode) {
            return !((httpStatusCode >= 300 && httpStatusCode < 500 && httpStatusCode !== 408 && httpStatusCode !== 429)
                || (httpStatusCode === 501)
                || (httpStatusCode === 505));
        };
        RetryPolicy.getMillisToBackoffForRetry = function (retriesSoFar) {
            var waitDuration = 0;
            var minBackoff = BaseBackoff * RandomizationLowerThreshold;
            var maxBackoff = BaseBackoff * RandomizationUpperThreshold;
            var randomBackoff = Math.floor(Math.random() * (maxBackoff - minBackoff)) + minBackoff;
            waitDuration = Math.pow(2, retriesSoFar) * randomBackoff;
            return Math.min(waitDuration, MaxBackoff);
        };
        return RetryPolicy;
    }());

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var SecToMsMultiplier = 1000;
    var KillSwitch = /** @class */ (function () {
        function KillSwitch() {
            var _killedTokenDictionary = {};
            function _normalizeTenants(values) {
                var result = [];
                if (values) {
                    arrForEach(values, function (value) {
                        result.push(strTrim(value));
                    });
                }
                return result;
            }
            dynamicProto(KillSwitch, this, function (_self) {
                _self.setKillSwitchTenants = function (killTokens, killDuration) {
                    if (killTokens && killDuration) {
                        try {
                            var killedTokens = _normalizeTenants(killTokens.split(","));
                            if (killDuration === "this-request-only") {
                                return killedTokens;
                            }
                            var durationMs = parseInt(killDuration, 10) * SecToMsMultiplier;
                            for (var i = 0; i < killedTokens.length; ++i) {
                                _killedTokenDictionary[killedTokens[i]] = dateNow() + durationMs;
                            }
                        }
                        catch (ex) {
                            return [];
                        }
                    }
                    return [];
                };
                _self.isTenantKilled = function (tenantToken) {
                    var killDictionary = _killedTokenDictionary;
                    var name = strTrim(tenantToken);
                    if (killDictionary[name] !== undefined && killDictionary[name] > dateNow()) {
                        return true;
                    }
                    delete killDictionary[name];
                    return false;
                };
            });
        }
        return KillSwitch;
    }());

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ClockSkewManager = /** @class */ (function () {
        function ClockSkewManager() {
            var _allowRequestSending = true;
            var _shouldAddClockSkewHeaders = true;
            var _isFirstRequest = true;
            var _clockSkewHeaderValue = "use-collector-delta";
            var _clockSkewSet = false;
            dynamicProto(ClockSkewManager, this, function (_self) {
                _self.allowRequestSending = function () {
                    return _allowRequestSending;
                };
                _self.firstRequestSent = function () {
                    if (_isFirstRequest) {
                        _isFirstRequest = false;
                        if (!_clockSkewSet) {
                            _allowRequestSending = false;
                        }
                    }
                };
                _self.shouldAddClockSkewHeaders = function () {
                    return _shouldAddClockSkewHeaders;
                };
                _self.getClockSkewHeaderValue = function () {
                    return _clockSkewHeaderValue;
                };
                _self.setClockSkew = function (timeDeltaInMillis) {
                    if (!_clockSkewSet) {
                        if (timeDeltaInMillis) {
                            _clockSkewHeaderValue = timeDeltaInMillis;
                            _shouldAddClockSkewHeaders = true;
                            _clockSkewSet = true;
                        }
                        else {
                            _shouldAddClockSkewHeaders = false;
                        }
                        _allowRequestSending = true;
                    }
                };
            });
        }
        return ClockSkewManager;
    }());

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var _a;
    var Method = "POST";
    var DisabledPropertyName = "Microsoft_ApplicationInsights_BypassAjaxInstrumentation";
    var strDropped = "drop";
    var strSending = "send";
    var strRequeue = "requeue";
    var strResponseFail = "rspFail";
    var strOther = "oth";
    var strKillTokensHeader = "kill-tokens";
    var strKillDurationHeader = "kill-duration";
    var strKillDurationSecondsHeader = "kill-duration-seconds";
    var strTimeDeltaHeader = "time-delta-millis";
    var _eventActionMap = (_a = {},
        _a[1 ] = strRequeue,
        _a[100 ] = strRequeue,
        _a[200 ] = "sent",
        _a[8004 ] = strDropped,
        _a[8003 ] = strDropped,
        _a);
    function _getResponseText$1(xhr) {
        try {
            return xhr.responseText;
        }
        catch (e) {
        }
        return "";
    }
    var HttpManager = /** @class */ (function () {
        function HttpManager(maxEventsPerBatch, maxConnections, maxRetries, actions) {
            this._responseHandlers = [];
            var _urlString = "?cors=true&content-type=application/x-json-stream&client-id=NO_AUTH&client-version="
                + FullVersionString;
            var _killSwitch = new KillSwitch();
            var _paused = false;
            var _clockSkewManager = new ClockSkewManager();
            var _useBeacons = false;
            var _outstandingRequests = 0;
            var _postManager;
            var _httpInterface;
            var _core;
            var _customHttpInterface = true;
            var _queryStringParameters = [];
            var _headers = {};
            var _batchQueue = [];
            var _serializer = null;
            var _enableEventTimings = false;
            var _cookieMgr;
            dynamicProto(HttpManager, this, function (_self) {
                var _sendCredentials = true;
                _self.initialize = function (endpointUrl, core, postChannel, httpInterface, channelConfig) {
                    if (!channelConfig) {
                        channelConfig = {};
                    }
                    _urlString = endpointUrl + _urlString;
                    _core = core;
                    _cookieMgr = core.getCookieMgr();
                    _enableEventTimings = !_core.config.disableEventTimings;
                    var enableCompoundKey = !!_core.config.enableCompoundKey;
                    _postManager = postChannel;
                    var valueSanitizer = channelConfig.valueSanitizer;
                    var stringifyObjects = channelConfig.stringifyObjects;
                    if (!isUndefined(channelConfig.enableCompoundKey)) {
                        enableCompoundKey = !!channelConfig.enableCompoundKey;
                    }
                    _serializer = new Serializer(_core, valueSanitizer, stringifyObjects, enableCompoundKey);
                    _httpInterface = httpInterface;
                    if (!_httpInterface) {
                        _customHttpInterface = false;
                        _useBeacons = !isReactNative();
                        var location_1 = getLocation();
                        if (location_1 && location_1.protocol && location_1.protocol.toLowerCase() === "file:") {
                            _sendCredentials = false;
                        }
                        var sendPostFunc = null;
                        if (useXDomainRequest()) {
                            sendPostFunc = _xdrSendPost;
                        }
                        else if (isReactNative()) {
                            sendPostFunc = _fetchSendPost;
                        }
                        else if (typeof XMLHttpRequest !== "undefined") {
                            sendPostFunc = _xhrSendPost;
                        }
                        _httpInterface = {
                            sendPOST: sendPostFunc
                        };
                    }
                };
                _self["_getDbgPlgTargets"] = function () {
                    return [_httpInterface, _killSwitch, _serializer];
                };
                function _xdrSendPost(payload, oncomplete) {
                    var xdr = new XDomainRequest();
                    xdr.open(Method, payload.urlString);
                    xdr.onload = function () {
                        var response = _getResponseText$1(xdr);
                        _doOnComplete(oncomplete, 200, {}, response);
                        _handleCollectorResponse(response);
                    };
                    xdr.onerror = function () {
                        _doOnComplete(oncomplete, 400, {});
                    };
                    xdr.ontimeout = function () {
                        _doOnComplete(oncomplete, 500, {});
                    };
                    xdr.send(payload.data);
                }
                function _fetchSendPost(payload, oncomplete) {
                    var _a;
                    fetch(payload.urlString, (_a = {
                            body: payload.data,
                            method: Method,
                            credentials: "include"
                        },
                        _a[DisabledPropertyName] = true,
                        _a.headers = payload.headers,
                        _a)).then(function (response) {
                        var headerMap = {};
                        var responseText = "";
                        if (response.headers) {
                            response.headers.forEach(function (value, name) {
                                headerMap[name] = value;
                            });
                        }
                        if (response.body) {
                            response.text().then(function (text) {
                                responseText = text;
                            });
                        }
                        _doOnComplete(oncomplete, response.status, headerMap, responseText);
                        _handleCollectorResponse(responseText);
                    })["catch"](function (error) {
                        _doOnComplete(oncomplete, 0, {});
                    });
                }
                function _xhrSendPost(payload, oncomplete, sync) {
                    function _appendHeader(theHeaders, xhr, name) {
                        if (!theHeaders[name] && xhr && xhr.getResponseHeader) {
                            var value = xhr.getResponseHeader(name);
                            if (value) {
                                theHeaders[name] = strTrim(value);
                            }
                        }
                        return theHeaders;
                    }
                    function _getAllResponseHeaders(xhr) {
                        var theHeaders = {};
                        if (!xhr.getAllResponseHeaders) {
                            theHeaders = _appendHeader(theHeaders, xhr, strTimeDeltaHeader);
                            theHeaders = _appendHeader(theHeaders, xhr, strKillDurationHeader);
                            theHeaders = _appendHeader(theHeaders, xhr, strKillDurationSecondsHeader);
                        }
                        else {
                            theHeaders = _convertAllHeadersToMap(xhr.getAllResponseHeaders());
                        }
                        return theHeaders;
                    }
                    function xhrComplete(xhr, responseTxt) {
                        _doOnComplete(oncomplete, xhr.status, _getAllResponseHeaders(xhr), responseTxt);
                    }
                    var xhRequest = new XMLHttpRequest();
                    try {
                        xhRequest[DisabledPropertyName] = true;
                    }
                    catch (e) {
                    }
                    if (_sendCredentials) {
                        xhRequest.withCredentials = true;
                    }
                    xhRequest.open(Method, payload.urlString, !sync);
                    objForEachKey(payload.headers, function (name, value) {
                        xhRequest.setRequestHeader(name, value);
                    });
                    xhRequest.onload = function () {
                        var response = _getResponseText$1(xhRequest);
                        xhrComplete(xhRequest, response);
                        _handleCollectorResponse(response);
                    };
                    xhRequest.onerror = function () {
                        xhrComplete(xhRequest);
                    };
                    xhRequest.ontimeout = function () {
                        xhrComplete(xhRequest);
                    };
                    xhRequest.send(payload.data);
                }
                function _doOnComplete(oncomplete, status, headers, response) {
                    try {
                        oncomplete(status, headers, response);
                    }
                    catch (e) {
                        _postManager.diagLog().throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.SendPostOnCompleteFailure, e);
                    }
                }
                _self.addQueryStringParameter = function (name, value) {
                    for (var i = 0; i < _queryStringParameters.length; i++) {
                        if (_queryStringParameters[i].name === name) {
                            _queryStringParameters[i].value = value;
                            return;
                        }
                    }
                    _queryStringParameters.push({ name: name, value: value });
                };
                _self.addHeader = function (name, value) {
                    _headers[name] = value;
                };
                _self.canSendRequest = function () {
                    return _hasIdleConnection() && _clockSkewManager.allowRequestSending();
                };
                _self.sendQueuedRequests = function (sendReason, isAsync, useSendBeacon) {
                    var isSync = isNullOrUndefined(isAsync) ? false : !isAsync;
                    if (_canSendPayload(_batchQueue, isSync, 0)) {
                        _sendBatches(_clearQueue(), 0, false, isSync, sendReason || 0 , !!useSendBeacon);
                    }
                };
                _self.isCompletelyIdle = function () {
                    return !_paused && _outstandingRequests === 0 && _batchQueue.length === 0;
                };
                _self.addBatch = function (theBatch) {
                    if (theBatch && theBatch.count() > 0) {
                        if (_killSwitch.isTenantKilled(theBatch.iKey())) {
                            return false;
                        }
                        _batchQueue.push(theBatch);
                    }
                    return true;
                };
                _self.teardown = function () {
                    if (_batchQueue.length > 0) {
                        _sendBatches(_clearQueue(), 0, true, true, 2 , true);
                    }
                };
                _self.pause = function () {
                    _paused = true;
                };
                _self.resume = function () {
                    _paused = false;
                    _self.sendQueuedRequests(4 , false);
                };
                _self.sendSynchronousBatch = function (batch, sendReason, useSendBeacon) {
                    if (batch && batch.count() > 0) {
                        _sendBatches([batch], 0, false, true, sendReason || 0 , !!useSendBeacon);
                    }
                };
                function _hasIdleConnection() {
                    return !_paused && _outstandingRequests < maxConnections;
                }
                function _clearQueue() {
                    var theQueue = _batchQueue;
                    _batchQueue = [];
                    return theQueue;
                }
                function _canSendPayload(theBatches, isSync, retryCnt) {
                    var result = false;
                    if (theBatches && theBatches.length > 0 && !_paused && _httpInterface && _serializer) {
                        result = isSync || (_hasIdleConnection() && (retryCnt > 0 || _clockSkewManager.allowRequestSending()));
                    }
                    return result;
                }
                function _createDebugBatches(theBatches) {
                    var values = {};
                    if (theBatches) {
                        arrForEach(theBatches, function (theBatch, idx) {
                            values[idx] = {
                                iKey: theBatch.iKey(),
                                evts: theBatch.events()
                            };
                        });
                    }
                    return values;
                }
                function _sendBatches(theBatches, retryCount, isTeardown, isSynchronous, sendReason, useSendBeacon) {
                    if (!theBatches || theBatches.length === 0) {
                        return;
                    }
                    if (_paused) {
                        _sendBatchesNotification(theBatches, 1 , isSynchronous);
                        return;
                    }
                    var orgBatches = theBatches;
                    doPerf(_core, function () { return "HttpManager:_sendBatches"; }, function (perfEvt) {
                        if (perfEvt) {
                            theBatches = theBatches.slice(0);
                        }
                        var droppedBatches = [];
                        var thePayload = null;
                        var serializationStart = getTime();
                        while (_canSendPayload(theBatches, isSynchronous, retryCount)) {
                            var theBatch = theBatches.shift();
                            if (theBatch && theBatch.count() > 0) {
                                if (!_killSwitch.isTenantKilled(theBatch.iKey())) {
                                    thePayload = thePayload || _serializer.createPayload(retryCount, isTeardown, isSynchronous, useSendBeacon && _canUseSendBeaconApi());
                                    if (!_serializer.appendPayload(thePayload, theBatch, maxEventsPerBatch)) {
                                        _doPayloadSend(thePayload, serializationStart, getTime(), sendReason);
                                        serializationStart = getTime();
                                        theBatches = [theBatch].concat(theBatches);
                                        thePayload = null;
                                    }
                                    else if (thePayload.overflow !== null) {
                                        theBatches = [thePayload.overflow].concat(theBatches);
                                        thePayload.overflow = null;
                                        _doPayloadSend(thePayload, serializationStart, getTime(), sendReason);
                                        serializationStart = getTime();
                                        thePayload = null;
                                    }
                                }
                                else {
                                    droppedBatches.push(theBatch);
                                }
                            }
                        }
                        if (thePayload) {
                            _doPayloadSend(thePayload, serializationStart, getTime(), sendReason);
                        }
                        if (theBatches.length > 0) {
                            _batchQueue = theBatches.concat(_batchQueue);
                        }
                        _sendBatchesNotification(droppedBatches, 8004 , isSynchronous);
                    }, function () { return ({ batches: _createDebugBatches(orgBatches), retryCount: retryCount, isTeardown: isTeardown, isSynchronous: isSynchronous, sendReason: sendReason, useSendBeacon: useSendBeacon }); }, !isSynchronous);
                }
                function _buildQueryString(thePayload) {
                    var urlString = _urlString;
                    var apiQsKeys = "";
                    arrForEach(thePayload.apiKeys, function (apiKey) {
                        if (apiQsKeys.length > 0) {
                            apiQsKeys += ",";
                        }
                        apiQsKeys += apiKey;
                    });
                    if (apiQsKeys.length > 0) {
                        urlString += "&apikey=" + apiQsKeys;
                    }
                    urlString += "&upload-time=" + dateNow().toString();
                    var msfpc = _getMsfpc(thePayload);
                    if (isValueAssigned(msfpc)) {
                        urlString = urlString + "&ext.intweb.msfpc=" + msfpc;
                    }
                    if (_clockSkewManager.shouldAddClockSkewHeaders()) {
                        urlString += "&time-delta-to-apply-millis=" + _clockSkewManager.getClockSkewHeaderValue();
                    }
                    if (_core.getWParam) {
                        var wParam = _core.getWParam();
                        if (wParam >= 0) {
                            urlString += "&w=" + wParam;
                        }
                    }
                    for (var i = 0; i < _queryStringParameters.length; i++) {
                        urlString += "&" + _queryStringParameters[i].name + "=" + _queryStringParameters[i].value;
                    }
                    return urlString;
                }
                function _canUseSendBeaconApi() {
                    return !_customHttpInterface && _useBeacons && isBeaconsSupported();
                }
                function _setTimingValue(timings, name, value) {
                    timings[name] = timings[name] || {};
                    timings[name][_postManager.identifier] = value;
                }
                function _doPayloadSend(thePayload, serializationStart, serializationCompleted, sendReason) {
                    if (thePayload && thePayload.payloadBlob && thePayload.payloadBlob.length > 0) {
                        var urlString_1 = _buildQueryString(thePayload);
                        var sendEventStart_1 = getTime();
                        var strSendAttempt_1 = "sendAttempt";
                        doPerf(_core, function () { return "HttpManager:_doPayloadSend"; }, function () {
                            for (var batchLp = 0; batchLp < thePayload.batches.length; batchLp++) {
                                var theBatch = thePayload.batches[batchLp];
                                var theEvents = theBatch.events();
                                for (var evtLp = 0; evtLp < theEvents.length; evtLp++) {
                                    var telemetryItem = theEvents[evtLp];
                                    if (_enableEventTimings) {
                                        var timings = telemetryItem.timings = telemetryItem.timings || {};
                                        _setTimingValue(timings, "sendEventStart", sendEventStart_1);
                                        _setTimingValue(timings, "serializationStart", serializationStart);
                                        _setTimingValue(timings, "serializationCompleted", serializationCompleted);
                                    }
                                    telemetryItem[strSendAttempt_1] > 0 ? telemetryItem[strSendAttempt_1]++ : telemetryItem[strSendAttempt_1] = 1;
                                }
                            }
                            _sendBatchesNotification(thePayload.batches, (1000  + (sendReason || 0 )), thePayload.isSync, true);
                            var orgPayloadData = {
                                data: thePayload.payloadBlob,
                                urlString: urlString_1,
                                headers: _headers
                            };
                            var sender = null;
                            var useSendHook = !!_self.sendHook;
                            if (_canUseSendBeaconApi() && thePayload.isBeacon) {
                                useSendHook = false;
                                sender = function (payload) {
                                    _sendUsingBeacons(payload, thePayload, sendReason);
                                    if (_self.sendListener) {
                                        _self.sendListener(orgPayloadData, payload, thePayload.isSync || thePayload.isTeardown, true);
                                    }
                                };
                            }
                            else if (_httpInterface) {
                                sender = function (payload) {
                                    _clockSkewManager.firstRequestSent();
                                    var onComplete = function (status, headers) {
                                        _retryRequestIfNeeded(status, headers, thePayload, sendReason);
                                    };
                                    try {
                                        _httpInterface.sendPOST(payload, onComplete, thePayload.isTeardown || thePayload.isSync);
                                        if (_self.sendListener) {
                                            _self.sendListener(orgPayloadData, payload, thePayload.isSync || thePayload.isTeardown, false);
                                        }
                                    }
                                    catch (ex) {
                                        _doOnComplete(onComplete, 0, {});
                                    }
                                };
                            }
                            doPerf(_core, function () { return "HttpManager:_doPayloadSend.sender"; }, function () {
                                if (sender) {
                                    if (!thePayload.isSync) {
                                        _outstandingRequests++;
                                    }
                                    if (useSendHook) {
                                        var hookData_1 = {
                                            data: orgPayloadData.data,
                                            urlString: orgPayloadData.urlString,
                                            headers: orgPayloadData.headers
                                        };
                                        var senderCalled_1 = false;
                                        doPerf(_core, function () { return "HttpManager:_doPayloadSend.sendHook"; }, function () {
                                            try {
                                                _self.sendHook(hookData_1, function (payload) {
                                                    senderCalled_1 = true;
                                                    sender(payload);
                                                }, thePayload.isSync || thePayload.isTeardown);
                                            }
                                            catch (ex) {
                                                if (!senderCalled_1) {
                                                    sender(orgPayloadData);
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        sender(orgPayloadData);
                                    }
                                }
                            });
                        }, function () { return ({ thePayload: thePayload, serializationStart: serializationStart, serializationCompleted: serializationCompleted, sendReason: sendReason }); }, thePayload.isSync);
                    }
                    _sendBatchesNotification(thePayload.sizeExceed, 8003 , thePayload.isSync);
                }
                function _sendUsingBeacons(payload, thePayload, sendReason) {
                    try {
                        if (isBeaconsSupported()) {
                            var nav_1 = getNavigator();
                            if (nav_1.sendBeacon(payload.urlString, payload.data)) {
                                _handleRequestFinished(thePayload, 200 , sendReason, false);
                                return;
                            }
                            else {
                                var droppedBatches_1 = null;
                                arrForEach(thePayload.batches, function (theBatch) {
                                    if (droppedBatches_1 && theBatch && theBatch.count() > 0) {
                                        var theEvents = theBatch.events();
                                        for (var lp = 0; lp < theEvents.length; lp++) {
                                            if (!nav_1.sendBeacon(payload.urlString, _serializer.getEventBlob(theEvents[lp]))) {
                                                droppedBatches_1.push(theBatch.split(lp));
                                                break;
                                            }
                                        }
                                    }
                                    else {
                                        droppedBatches_1.push(theBatch.split(0));
                                    }
                                });
                                _handleRequestFinished(thePayload, 200 , sendReason, false);
                                _sendBatchesNotification(droppedBatches_1, 8003 , thePayload.isSync, true);
                            }
                        }
                    }
                    catch (ex) {
                        _postManager.diagLog().warnToConsole("Failed to send telemetry using sendBeacon API. Ex:" + ex);
                    }
                }
                function _addEventCompletedTimings(theEvents, sendEventCompleted) {
                    if (_enableEventTimings) {
                        arrForEach(theEvents, function (theEvent) {
                            var timings = theEvent.timings = theEvent.timings || {};
                            _setTimingValue(timings, "sendEventCompleted", sendEventCompleted);
                        });
                    }
                }
                function _retryRequestIfNeeded(status, headers, thePayload, sendReason) {
                    var reason = 9000 ;
                    var droppedBatches = null;
                    var isRetrying = false;
                    var backOffTrans = false;
                    try {
                        var shouldRetry = true;
                        if (typeof status !== strUndefined) {
                            if (headers) {
                                _clockSkewManager.setClockSkew(headers[strTimeDeltaHeader]);
                                var killDuration = headers[strKillDurationHeader] || headers["kill-duration-seconds"];
                                arrForEach(_killSwitch.setKillSwitchTenants(headers[strKillTokensHeader], killDuration), function (killToken) {
                                    arrForEach(thePayload.batches, function (theBatch) {
                                        if (theBatch.iKey() === killToken) {
                                            droppedBatches = droppedBatches || [];
                                            var removedEvents = theBatch.split(0);
                                            thePayload.numEvents -= removedEvents.count();
                                            droppedBatches.push(removedEvents);
                                        }
                                    });
                                });
                            }
                            if (status === 200) {
                                reason = 200 ;
                                return;
                            }
                            if (!RetryPolicy.shouldRetryForStatus(status) || thePayload.numEvents <= 0) {
                                shouldRetry = false;
                            }
                            reason = 9000  + (status % 1000);
                        }
                        if (shouldRetry) {
                            reason = 100 ;
                            var retryCount_1 = thePayload.retryCnt;
                            if (!thePayload.isSync) {
                                if (retryCount_1 < maxRetries) {
                                    isRetrying = true;
                                    _doAction(function () {
                                        if (!thePayload.isSync) {
                                            _outstandingRequests--;
                                        }
                                        _sendBatches(thePayload.batches, retryCount_1 + 1, thePayload.isTeardown, thePayload.isSync, 5 , thePayload.isBeacon);
                                    }, true, RetryPolicy.getMillisToBackoffForRetry(retryCount_1));
                                }
                                else {
                                    backOffTrans = true;
                                }
                            }
                        }
                    }
                    finally {
                        if (!isRetrying) {
                            _clockSkewManager.setClockSkew();
                            _handleRequestFinished(thePayload, reason, sendReason, backOffTrans);
                        }
                        _sendBatchesNotification(droppedBatches, 8004 , thePayload.isSync);
                    }
                }
                function _handleRequestFinished(thePayload, batchReason, sendReason, backOffTrans) {
                    try {
                        if (backOffTrans) {
                            _postManager._backOffTransmission();
                        }
                        if (batchReason === 200 ) {
                            if (!backOffTrans && !thePayload.isSync) {
                                _postManager._clearBackOff();
                            }
                            _addCompleteTimings(thePayload.batches);
                        }
                        _sendBatchesNotification(thePayload.batches, batchReason, thePayload.isSync, true);
                    }
                    finally {
                        if (!thePayload.isSync) {
                            _outstandingRequests--;
                            if (sendReason !== 5 ) {
                                _self.sendQueuedRequests(sendReason, !thePayload.isSync, thePayload.isBeacon);
                            }
                        }
                    }
                }
                function _addCompleteTimings(theBatches) {
                    if (_enableEventTimings) {
                        var sendEventCompleted_1 = getTime();
                        arrForEach(theBatches, function (theBatch) {
                            if (theBatch && theBatch.count() > 0) {
                                _addEventCompletedTimings(theBatch.events(), sendEventCompleted_1);
                            }
                        });
                    }
                }
                function _doAction(cb, isSync, interval) {
                    if (isSync) {
                        cb();
                    }
                    else {
                        _postManager._setTimeoutOverride(cb, interval);
                    }
                }
                function _convertAllHeadersToMap(headersString) {
                    var headers = {};
                    if (isString(headersString)) {
                        var headersArray = strTrim(headersString).split(/[\r\n]+/);
                        arrForEach(headersArray, function (headerEntry) {
                            if (headerEntry) {
                                var idx = headerEntry.indexOf(": ");
                                if (idx !== -1) {
                                    var header = strTrim(headerEntry.substring(0, idx)).toLowerCase();
                                    var value = strTrim(headerEntry.substring(idx + 1));
                                    headers[header] = value;
                                }
                                else {
                                    headers[strTrim(headerEntry)] = 1;
                                }
                            }
                        });
                    }
                    return headers;
                }
                function _getMsfpc(thePayload) {
                    for (var lp = 0; lp < thePayload.batches.length; lp++) {
                        var batchEvents = thePayload.batches[lp].events();
                        for (var evtLp = 0; evtLp < batchEvents.length; evtLp++) {
                            var intWeb = ((batchEvents[evtLp].ext || {})["intweb"] || {});
                            if (isValueAssigned(intWeb["msfpc"])) {
                                return encodeURIComponent(intWeb["msfpc"]);
                            }
                        }
                    }
                    return "";
                }
                function _handleCollectorResponse(responseText) {
                    var responseHandlers = _self._responseHandlers;
                    try {
                        for (var i = 0; i < responseHandlers.length; i++) {
                            try {
                                responseHandlers[i](responseText);
                            }
                            catch (e) {
                                _postManager.diagLog().throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.PostResponseHandler, "Response handler failed: " + e);
                            }
                        }
                        if (responseText) {
                            var response = JSON.parse(responseText);
                            if (isValueAssigned(response.webResult) && isValueAssigned(response.webResult.msfpc)) {
                                _cookieMgr.set("MSFPC", response.webResult.msfpc, 365 * 86400);
                            }
                        }
                    }
                    catch (ex) {
                    }
                }
                function _sendBatchesNotification(theBatches, batchReason, isSyncRequest, sendSync) {
                    if (theBatches && theBatches.length > 0 && actions) {
                        var theAction_1 = actions[_getNotificationAction(batchReason)];
                        if (theAction_1) {
                            doPerf(_core, function () { return "HttpManager:_sendBatchesNotification"; }, function () {
                                _doAction(function () {
                                    try {
                                        theAction_1.call(actions, theBatches, batchReason, isSyncRequest);
                                    }
                                    catch (e) {
                                        _postManager.diagLog().throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.NotificationException, "send request notification failed: " + e);
                                    }
                                }, sendSync || isSyncRequest, 0);
                            }, function () { return ({ batches: _createDebugBatches(theBatches), reason: batchReason, isSync: isSyncRequest, sendSync: sendSync }); }, !isSyncRequest);
                        }
                    }
                }
                function _getNotificationAction(reason) {
                    var action = _eventActionMap[reason];
                    if (!isValueAssigned(action)) {
                        action = strOther;
                        if (reason >= 9000  && reason <= 9999 ) {
                            action = strResponseFail;
                        }
                        else if (reason >= 8000  && reason <= 8999 ) {
                            action = strDropped;
                        }
                        else if (reason >= 1000  && reason <= 1999 ) {
                            action = strSending;
                        }
                    }
                    return action;
                }
            });
        }
        return HttpManager;
    }());

    /*!
     * 1DS JS SDK POST plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var FlushCheckTimer = 0.250;
    var MaxNumberEventPerBatch = 500;
    var EventsDroppedAtOneTime = 20;
    var MaxSendAttempts = 6;
    var MaxBackoffCount = 4;
    var globalContext = isWindowObjectAvailable ? window : undefined;
    var MaxConnections = 2;
    var MaxRetries = 1;
    var strEventsDiscarded = "eventsDiscarded";
    var strOverrideInstrumentationKey = "overrideInstrumentationKey";
    var PostChannel = /** @class */ (function (_super) {
        __extendsFn(PostChannel, _super);
        function PostChannel() {
            var _this = _super.call(this) || this;
            _this.identifier = "PostChannel";
            _this.priority = 1011;
            _this.version = '3.1.1';
            var _config;
            var _isTeardownCalled = false;
            var _flushCallbackQueue = [];
            var _flushCallbackTimerId = null;
            var _paused = false;
            var _immediateQueueSize = 0;
            var _immediateQueueSizeLimit = 500;
            var _queueSize = 0;
            var _queueSizeLimit = 10000;
            var _profiles = {};
            var _currentProfile = RT_PROFILE;
            var _scheduledTimerId = null;
            var _immediateTimerId = null;
            var _currentBackoffCount = 0;
            var _timerCount = 0;
            var _xhrOverride;
            var _httpManager;
            var _batchQueues = {};
            var _autoFlushEventsLimit;
            var _autoFlushBatchLimit;
            var _delayedBatchSendLatency = -1;
            var _delayedBatchReason;
            dynamicProto(PostChannel, _this, function (_self, _base) {
                _initializeProfiles();
                _clearQueues();
                _setAutoLimits();
                _httpManager = new HttpManager(MaxNumberEventPerBatch, MaxConnections, MaxRetries, {
                    requeue: _requeueEvents,
                    send: _sendingEvent,
                    sent: _eventsSentEvent,
                    drop: _eventsDropped,
                    rspFail: _eventsResponseFail,
                    oth: _otherEvent
                });
                _self["_getDbgPlgTargets"] = function () {
                    return [_httpManager];
                };
                _self.initialize = function (coreConfig, core, extensions) {
                    doPerf(core, function () { return "PostChannel:initialize"; }, function () {
                        var extendedCore = core;
                        _base.initialize(coreConfig, core, extensions);
                        _self.setInitialized(false);
                        var ctx = _self._getTelCtx();
                        coreConfig.extensionConfig[_self.identifier] = coreConfig.extensionConfig[_self.identifier] || {};
                        _config = ctx.getExtCfg(_self.identifier);
                        _self._setTimeoutOverride = _config.setTimeoutOverride ? _config.setTimeoutOverride : setTimeout.bind(globalContext);
                        _self._clearTimeoutOverride = _config.clearTimeoutOverride ? _config.clearTimeoutOverride : clearTimeout.bind(globalContext);
                        var existingGetWParamMethod = extendedCore.getWParam;
                        extendedCore.getWParam = function () {
                            var wparam = 0;
                            if (_config.ignoreMc1Ms0CookieProcessing) {
                                wparam = wparam | 2;
                            }
                            return wparam | existingGetWParamMethod();
                        };
                        if (_config.eventsLimitInMem > 0) {
                            _queueSizeLimit = _config.eventsLimitInMem;
                        }
                        if (_config.immediateEventLimit > 0) {
                            _immediateQueueSizeLimit = _config.immediateEventLimit;
                        }
                        if (_config.autoFlushEventsLimit > 0) {
                            _autoFlushEventsLimit = _config.autoFlushEventsLimit;
                        }
                        _setAutoLimits();
                        if (_config.httpXHROverride && _config.httpXHROverride.sendPOST) {
                            _xhrOverride = _config.httpXHROverride;
                        }
                        if (isValueAssigned(coreConfig.anonCookieName)) {
                            _httpManager.addQueryStringParameter("anoncknm", coreConfig.anonCookieName);
                        }
                        _httpManager.sendHook = _config.payloadPreprocessor;
                        _httpManager.sendListener = _config.payloadListener;
                        var endpointUrl = _config.overrideEndpointUrl ? _config.overrideEndpointUrl : coreConfig.endpointUrl;
                        _self._notificationManager = coreConfig.extensionConfig.NotificationManager;
                        _httpManager.initialize(endpointUrl, _self.core, _self, _xhrOverride, _config);
                        addPageUnloadEventListener(function () { _releaseAllQueuesUsingBeacons(2 , false); });
                        _self.setInitialized(true);
                    }, function () { return ({ coreConfig: coreConfig, core: core, extensions: extensions }); });
                };
                _self.processTelemetry = function (ev, itemCtx) {
                    setProcessTelemetryTimings(ev, _self.identifier);
                    itemCtx = _self._getTelCtx(itemCtx);
                    var channelConfig = itemCtx.getExtCfg(_self.identifier);
                    var disableTelemetry = !!_config.disableTelemetry;
                    if (channelConfig) {
                        disableTelemetry = disableTelemetry || !!channelConfig.disableTelemetry;
                    }
                    var event = ev;
                    if (!disableTelemetry && !_isTeardownCalled) {
                        if (_config[strOverrideInstrumentationKey]) {
                            event.iKey = _config[strOverrideInstrumentationKey];
                        }
                        if (channelConfig && channelConfig[strOverrideInstrumentationKey]) {
                            event.iKey = channelConfig[strOverrideInstrumentationKey];
                        }
                        _addEventToQueues(event, true);
                        _scheduleTimer();
                    }
                    _self.processNext(event, itemCtx);
                };
                function _addEventToQueues(event, append) {
                    if (!event.sendAttempt) {
                        event.sendAttempt = 0;
                    }
                    if (!event.latency) {
                        event.latency = EventLatency.Normal;
                    }
                    if (event.ext && event.ext["trace"]) {
                        delete (event.ext["trace"]);
                    }
                    if (event.ext && event.ext["user"] && event.ext["user"]["id"]) {
                        delete (event.ext["user"]["id"]);
                    }
                    event.ext = optimizeObject(event.ext);
                    if (event.baseData) {
                        event.baseData = optimizeObject(event.baseData);
                    }
                    if (event.data) {
                        event.data = optimizeObject(event.data);
                    }
                    if (event.sync) {
                        if (_currentBackoffCount || _paused) {
                            event.latency = EventLatency.RealTime;
                            event.sync = false;
                        }
                        else {
                            if (_httpManager) {
                                event = optimizeObject(event);
                                _httpManager.sendSynchronousBatch(EventBatch.create(event.iKey, [event]), 3 );
                                return;
                            }
                        }
                    }
                    var evtLatency = event.latency;
                    var queueSize = _queueSize;
                    var queueLimit = _queueSizeLimit;
                    if (evtLatency === EventLatency.Immediate) {
                        queueSize = _immediateQueueSize;
                        queueLimit = _immediateQueueSizeLimit;
                    }
                    var eventDropped = false;
                    if (queueSize < queueLimit) {
                        eventDropped = !_addEventToProperQueue(event, append);
                    }
                    else {
                        var dropLatency = EventLatency.Normal;
                        var dropNumber = EventsDroppedAtOneTime;
                        if (evtLatency === EventLatency.Immediate) {
                            dropLatency = EventLatency.Immediate;
                            dropNumber = 1;
                        }
                        eventDropped = true;
                        if (_dropEventWithLatencyOrLess(event.iKey, event.latency, dropLatency, dropNumber)) {
                            eventDropped = !_addEventToProperQueue(event, append);
                        }
                    }
                    if (eventDropped) {
                        _notifyEvents(strEventsDiscarded, [event], EventsDiscardedReason.QueueFull);
                    }
                }
                _self.setEventQueueLimits = function (eventLimit, autoFlushLimit) {
                    _queueSizeLimit = eventLimit > 0 ? eventLimit : 10000;
                    _autoFlushEventsLimit = autoFlushLimit > 0 ? autoFlushLimit : 0;
                    _setAutoLimits();
                    var doFlush = _queueSize > eventLimit;
                    if (!doFlush && _autoFlushBatchLimit > 0) {
                        for (var latency = EventLatency.Normal; !doFlush && latency <= EventLatency.RealTime; latency++) {
                            var batchQueue = _batchQueues[latency];
                            if (batchQueue && batchQueue.batches) {
                                arrForEach(batchQueue.batches, function (theBatch) {
                                    if (theBatch && theBatch.count() >= _autoFlushBatchLimit) {
                                        doFlush = true;
                                    }
                                });
                            }
                        }
                    }
                    _performAutoFlush(true, doFlush);
                };
                _self.teardown = function () {
                    _releaseAllQueuesUsingBeacons(2 , false);
                    _isTeardownCalled = true;
                    _httpManager.teardown();
                };
                _self.pause = function () {
                    _clearScheduledTimer();
                    _paused = true;
                    _httpManager.pause();
                };
                _self.resume = function () {
                    _paused = false;
                    _httpManager.resume();
                    _scheduleTimer();
                };
                _self.addResponseHandler = function (responseHandler) {
                    _httpManager._responseHandlers.push(responseHandler);
                };
                _self._loadTransmitProfiles = function (profiles) {
                    _resetTransmitProfiles();
                    objForEachKey(profiles, function (profileName, profileValue) {
                        var profLen = profileValue.length;
                        if (profLen >= 2) {
                            var directValue = (profLen > 2 ? profileValue[2] : 0);
                            profileValue.splice(0, profLen - 2);
                            if (profileValue[1] < 0) {
                                profileValue[0] = -1;
                            }
                            if (profileValue[1] > 0 && profileValue[0] > 0) {
                                var timerMultiplier = profileValue[0] / profileValue[1];
                                profileValue[0] = Math.ceil(timerMultiplier) * profileValue[1];
                            }
                            if (directValue >= 0 && profileValue[1] >= 0 && directValue > profileValue[1]) {
                                directValue = profileValue[1];
                            }
                            profileValue.push(directValue);
                            _profiles[profileName] = profileValue;
                        }
                    });
                };
                _self.flush = function (async, callback, sendReason) {
                    if (async === void 0) { async = true; }
                    if (!_paused) {
                        _clearScheduledTimer();
                        sendReason = sendReason || 1 ;
                        if (async) {
                            _queueBatches(EventLatency.Normal, sendReason, async);
                            _resetQueueCounts();
                            if (_flushCallbackTimerId == null) {
                                _flushCallbackTimerId = _createTimer(function () {
                                    _flushImpl(callback, sendReason);
                                }, 0);
                            }
                            else {
                                _flushCallbackQueue.push(callback);
                            }
                        }
                        else {
                            _sendEventsForLatencyAndAbove(EventLatency.Normal, sendReason, false);
                            if (callback !== null && callback !== undefined) {
                                callback();
                            }
                        }
                    }
                };
                _self.setMsaAuthTicket = function (ticket) {
                    _httpManager.addHeader("AuthMsaDeviceTicket", ticket);
                };
                _self.hasEvents = _hasEvents;
                _self._setTransmitProfile = function (profileName) {
                    if (_currentProfile !== profileName && _profiles[profileName] !== undefined) {
                        _clearScheduledTimer();
                        _currentProfile = profileName;
                        _scheduleTimer();
                    }
                };
                function _sendEventsForLatencyAndAbove(latency, sendReason, isAsync, useSendBeacon) {
                    var queued = _queueBatches(latency, sendReason, isAsync);
                    _httpManager.sendQueuedRequests(sendReason, isAsync, useSendBeacon);
                    return queued;
                }
                function _hasEvents() {
                    return _queueSize > 0;
                }
                function _scheduleTimer() {
                    if (_delayedBatchSendLatency >= 0 && _queueBatches(_delayedBatchSendLatency, _delayedBatchReason, true)) {
                        _httpManager.sendQueuedRequests(_delayedBatchReason, true, false);
                    }
                    if (_immediateQueueSize > 0 && !_immediateTimerId && !_paused) {
                        var immediateTimeOut = _profiles[_currentProfile][2];
                        if (immediateTimeOut >= 0) {
                            _immediateTimerId = _createTimer(function () {
                                _immediateTimerId = null;
                                _sendEventsForLatencyAndAbove(EventLatency.Immediate, 1 , true);
                                _scheduleTimer();
                            }, immediateTimeOut);
                        }
                    }
                    var timeOut = _profiles[_currentProfile][1];
                    if (!_scheduledTimerId && !_flushCallbackTimerId && timeOut >= 0 && !_paused) {
                        if (_hasEvents()) {
                            _scheduledTimerId = _createTimer(function () {
                                _scheduledTimerId = null;
                                _sendEventsForLatencyAndAbove(_timerCount === 0 ? EventLatency.RealTime : EventLatency.Normal, 1 , true);
                                _timerCount++;
                                _timerCount %= 2;
                                _scheduleTimer();
                            }, timeOut);
                        }
                        else {
                            _timerCount = 0;
                        }
                    }
                }
                _self._backOffTransmission = function () {
                    if (_currentBackoffCount < MaxBackoffCount) {
                        _currentBackoffCount++;
                        _clearScheduledTimer();
                        _scheduleTimer();
                    }
                };
                _self._clearBackOff = function () {
                    if (_currentBackoffCount) {
                        _currentBackoffCount = 0;
                        _clearScheduledTimer();
                        _scheduleTimer();
                    }
                };
                function _createTimer(theTimerFunc, timeOut) {
                    if (timeOut === 0 && _currentBackoffCount) {
                        timeOut = 1;
                    }
                    var timerMultiplier = 1000;
                    if (_currentBackoffCount) {
                        timerMultiplier = RetryPolicy.getMillisToBackoffForRetry(_currentBackoffCount - 1);
                    }
                    return _self._setTimeoutOverride(theTimerFunc, timeOut * timerMultiplier);
                }
                function _clearScheduledTimer() {
                    if (_scheduledTimerId !== null) {
                        _self._clearTimeoutOverride(_scheduledTimerId);
                        _scheduledTimerId = null;
                        _timerCount = 0;
                    }
                }
                function _releaseAllQueuesUsingBeacons(sendReason, isAsync) {
                    _clearScheduledTimer();
                    if (_flushCallbackTimerId) {
                        _self._clearTimeoutOverride(_flushCallbackTimerId);
                        _flushCallbackTimerId = null;
                    }
                    if (!_paused) {
                        _sendEventsForLatencyAndAbove(EventLatency.Normal, sendReason, isAsync, true);
                    }
                }
                function _clearQueues() {
                    _batchQueues[EventLatency.Immediate] = {
                        batches: [],
                        iKeyMap: {}
                    };
                    _batchQueues[EventLatency.RealTime] = {
                        batches: [],
                        iKeyMap: {}
                    };
                    _batchQueues[EventLatency.CostDeferred] = {
                        batches: [],
                        iKeyMap: {}
                    };
                    _batchQueues[EventLatency.Normal] = {
                        batches: [],
                        iKeyMap: {}
                    };
                }
                function _getEventBatch(iKey, latency, create) {
                    var batchQueue = _batchQueues[latency];
                    if (!batchQueue) {
                        latency = EventLatency.Normal;
                        batchQueue = _batchQueues[latency];
                    }
                    var eventBatch = batchQueue.iKeyMap[iKey];
                    if (!eventBatch && create) {
                        eventBatch = EventBatch.create(iKey);
                        batchQueue.batches.push(eventBatch);
                        batchQueue.iKeyMap[iKey] = eventBatch;
                    }
                    return eventBatch;
                }
                function _performAutoFlush(isAsync, doFlush) {
                    if (_httpManager.canSendRequest() && !_currentBackoffCount) {
                        if (_autoFlushEventsLimit > 0 && _queueSize > _autoFlushEventsLimit) {
                            doFlush = true;
                        }
                        if (doFlush && _flushCallbackTimerId == null) {
                            _self.flush(isAsync, null, 20 );
                        }
                    }
                }
                function _addEventToProperQueue(event, append) {
                    event = optimizeObject(event);
                    var latency = event.latency;
                    var eventBatch = _getEventBatch(event.iKey, latency, true);
                    if (eventBatch.addEvents([event], append)) {
                        if (latency !== EventLatency.Immediate) {
                            _queueSize++;
                            if (append && event.sendAttempt === 0) {
                                _performAutoFlush(!event.sync, _autoFlushBatchLimit > 0 && eventBatch.count() >= _autoFlushBatchLimit);
                            }
                        }
                        else {
                            _immediateQueueSize++;
                        }
                        return true;
                    }
                    return false;
                }
                function _dropEventWithLatencyOrLess(iKey, latency, currentLatency, dropNumber) {
                    while (currentLatency <= latency) {
                        var eventBatch = _getEventBatch(iKey, latency, true);
                        if (eventBatch && eventBatch.count() > 0) {
                            var droppedEvents = eventBatch.split(0, dropNumber);
                            var droppedCount = droppedEvents.count();
                            if (droppedCount > 0) {
                                if (currentLatency === EventLatency.Immediate) {
                                    _immediateQueueSize -= droppedCount;
                                }
                                else {
                                    _queueSize -= droppedCount;
                                }
                                _notifyBatchEvents(strEventsDiscarded, [droppedEvents], EventsDiscardedReason.QueueFull);
                                return true;
                            }
                        }
                        currentLatency++;
                    }
                    _resetQueueCounts();
                    return false;
                }
                function _resetQueueCounts() {
                    var immediateQueue = 0;
                    var normalQueue = 0;
                    var _loop_1 = function (latency) {
                        var batchQueue = _batchQueues[latency];
                        if (batchQueue && batchQueue.batches) {
                            arrForEach(batchQueue.batches, function (theBatch) {
                                if (latency === EventLatency.Immediate) {
                                    immediateQueue += theBatch.count();
                                }
                                else {
                                    normalQueue += theBatch.count();
                                }
                            });
                        }
                    };
                    for (var latency = EventLatency.Normal; latency <= EventLatency.Immediate; latency++) {
                        _loop_1(latency);
                    }
                    _queueSize = normalQueue;
                    _immediateQueueSize = immediateQueue;
                }
                function _queueBatches(latency, sendReason, isAsync) {
                    var eventsQueued = false;
                    if (!isAsync || _httpManager.canSendRequest()) {
                        doPerf(_self.core, function () { return "PostChannel._queueBatches"; }, function () {
                            var droppedEvents = [];
                            var latencyToProcess = EventLatency.Immediate;
                            while (latencyToProcess >= latency) {
                                var batchQueue = _batchQueues[latencyToProcess];
                                if (batchQueue && batchQueue.batches) {
                                    arrForEach(batchQueue.batches, function (theBatch) {
                                        if (!_httpManager.addBatch(theBatch)) {
                                            droppedEvents = droppedEvents.concat(theBatch.events());
                                        }
                                        else {
                                            eventsQueued = eventsQueued || (theBatch && theBatch.count() > 0);
                                        }
                                        if (latencyToProcess === EventLatency.Immediate) {
                                            _immediateQueueSize -= theBatch.count();
                                        }
                                        else {
                                            _queueSize -= theBatch.count();
                                        }
                                    });
                                    batchQueue.batches = [];
                                    batchQueue.iKeyMap = {};
                                }
                                latencyToProcess--;
                            }
                            if (droppedEvents.length > 0) {
                                _notifyEvents(strEventsDiscarded, droppedEvents, EventsDiscardedReason.KillSwitch);
                            }
                            if (eventsQueued && _delayedBatchSendLatency >= latency) {
                                _delayedBatchSendLatency = -1;
                                _delayedBatchReason = 0 ;
                            }
                        }, function () { return ({ latency: latency, sendReason: sendReason }); }, isAsync);
                    }
                    else {
                        _delayedBatchSendLatency = _delayedBatchSendLatency >= 0 ? Math.min(_delayedBatchSendLatency, latency) : latency;
                        _delayedBatchReason = Math.max(_delayedBatchReason, sendReason);
                    }
                    return eventsQueued;
                }
                function _flushImpl(callback, sendReason) {
                    _sendEventsForLatencyAndAbove(EventLatency.Normal, sendReason, true);
                    _waitForIdleManager(function () {
                        if (callback) {
                            callback();
                        }
                        if (_flushCallbackQueue.length > 0) {
                            _flushCallbackTimerId = _createTimer(function () { return _flushImpl(_flushCallbackQueue.shift(), sendReason); }, 0);
                        }
                        else {
                            _flushCallbackTimerId = null;
                            if (_hasEvents()) {
                                _scheduleTimer();
                            }
                        }
                    });
                }
                function _waitForIdleManager(callback) {
                    if (_httpManager.isCompletelyIdle()) {
                        callback();
                    }
                    else {
                        _flushCallbackTimerId = _createTimer(function () {
                            _waitForIdleManager(callback);
                        }, FlushCheckTimer);
                    }
                }
                function _resetTransmitProfiles() {
                    _clearScheduledTimer();
                    _initializeProfiles();
                    _currentProfile = RT_PROFILE;
                    _scheduleTimer();
                }
                function _initializeProfiles() {
                    _profiles = {};
                    _profiles[RT_PROFILE] = [2, 1, 0];
                    _profiles[NRT_PROFILE] = [6, 3, 0];
                    _profiles[BE_PROFILE] = [18, 9, 0];
                }
                function _requeueEvents(batches, reason) {
                    var droppedEvents = [];
                    arrForEach(batches, function (theBatch) {
                        if (theBatch && theBatch.count() > 0) {
                            arrForEach(theBatch.events(), function (theEvent) {
                                if (theEvent) {
                                    if (theEvent.sync) {
                                        theEvent.latency = EventLatency.RealTime;
                                        theEvent.sync = false;
                                    }
                                    if (theEvent.sendAttempt < MaxSendAttempts) {
                                        setProcessTelemetryTimings(theEvent, _self.identifier);
                                        _addEventToQueues(theEvent, false);
                                    }
                                    else {
                                        droppedEvents.push(theEvent);
                                    }
                                }
                            });
                        }
                    });
                    if (droppedEvents.length > 0) {
                        _notifyEvents(strEventsDiscarded, droppedEvents, EventsDiscardedReason.NonRetryableStatus);
                    }
                }
                function _callNotification(evtName, theArgs) {
                    var manager = (_self._notificationManager || {});
                    var notifyFunc = manager[evtName];
                    if (notifyFunc) {
                        try {
                            notifyFunc.apply(manager, theArgs);
                        }
                        catch (e) {
                            _self.diagLog().throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.NotificationException, evtName + " notification failed: " + e);
                        }
                    }
                }
                function _notifyEvents(evtName, theEvents) {
                    var extraArgs = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        extraArgs[_i - 2] = arguments[_i];
                    }
                    if (theEvents && theEvents.length > 0) {
                        _callNotification(evtName, [theEvents].concat(extraArgs));
                    }
                }
                function _notifyBatchEvents(evtName, batches) {
                    var extraArgs = [];
                    for (var _i = 2; _i < arguments.length; _i++) {
                        extraArgs[_i - 2] = arguments[_i];
                    }
                    if (batches && batches.length > 0) {
                        arrForEach(batches, function (theBatch) {
                            if (theBatch && theBatch.count() > 0) {
                                _callNotification(evtName, [theBatch.events()].concat(extraArgs));
                            }
                        });
                    }
                }
                function _sendingEvent(batches, reason, isSyncRequest) {
                    if (batches && batches.length > 0) {
                        _callNotification("eventsSendRequest", [(reason >= 1000  && reason <= 1999  ?
                                reason - 1000  :
                                0 ), isSyncRequest !== true]);
                    }
                }
                function _eventsSentEvent(batches, reason) {
                    _notifyBatchEvents("eventsSent", batches, reason);
                    _scheduleTimer();
                }
                function _eventsDropped(batches, reason) {
                    _notifyBatchEvents(strEventsDiscarded, batches, (reason >= 8000  && reason <= 8999  ?
                        reason - 8000  :
                        EventsDiscardedReason.Unknown));
                }
                function _eventsResponseFail(batches) {
                    _notifyBatchEvents(strEventsDiscarded, batches, EventsDiscardedReason.NonRetryableStatus);
                    _scheduleTimer();
                }
                function _otherEvent(batches, reason) {
                    _notifyBatchEvents(strEventsDiscarded, batches, EventsDiscardedReason.Unknown);
                    _scheduleTimer();
                }
                function _setAutoLimits() {
                    if (!_config || !_config.disableAutoBatchFlushLimit) {
                        _autoFlushBatchLimit = Math.max(MaxNumberEventPerBatch * (MaxConnections + 1), _queueSizeLimit / 6);
                    }
                    else {
                        _autoFlushBatchLimit = 0;
                    }
                }
            });
            return _this;
        }
        return PostChannel;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var QosEvent = /** @class */ (function () {
        function QosEvent() {
        }
        QosEvent.prototype._setCommonProperties = function (event, eventData) {
            if (isValueAssigned(eventData.cV)) {
                event.ext = event.ext || {};
                event.ext["mscv"] = event.ext["mscv"] || {};
                event.ext["mscv"]["cV"] = eventData.cV;
            }
            event.baseData["operationName"] = eventData.operationName;
            event.baseData["latencyMs"] = eventData.latencyMs;
            event.baseData["serviceErrorCode"] = eventData.serviceErrorCode || -1.0;
            event.baseData["succeeded"] = eventData.succeeded;
            event.baseData["requestStatus"] = eventData.requestStatus;
            event.baseData["requestMethod"] = eventData.requestMethod;
            if (isValueAssigned(eventData.target)) {
                event.baseData["target"] = eventData.target;
            }
            if (isValueAssigned(eventData.responseContentType)) {
                event.baseData["responseContentType"] = eventData.responseContentType;
            }
            if (isValueAssigned(eventData.protocol)) {
                event.baseData["protocol"] = eventData.protocol;
            }
            if (isValueAssigned(eventData.protocolStatusCode)) {
                event.baseData["protocolStatusCode"] = eventData.protocolStatusCode;
            }
        };
        return QosEvent;
    }());

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var OutgoingQosEvent = /** @class */ (function () {
        function OutgoingQosEvent() {
            this._qosEvent = new QosEvent();
        }
        OutgoingQosEvent.prototype._setQosProperties = function (event, eventData) {
            this._qosEvent._setCommonProperties(event, eventData);
            event.baseData["dependencyOperationName"] = eventData.dependencyOperationName;
            event.baseData["dependencyName"] = eventData.dependencyName;
            event.baseData["dependencyType"] = eventData.dependencyType || "WebService";
            if (isValueAssigned(eventData.dependencyOperationVersion)) {
                event.baseData["dependencyOperationVersion"] = eventData.dependencyOperationVersion;
            }
            if (isValueAssigned(eventData.responseSizeBytes)) {
                event.baseData["responseSizeBytes"] = eventData.responseSizeBytes;
            }
        };
        return OutgoingQosEvent;
    }());

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var IncomingQosEvent = /** @class */ (function () {
        function IncomingQosEvent() {
            this._qosEvent = new QosEvent();
        }
        IncomingQosEvent.prototype._setQosProperties = function (event, eventData) {
            this._qosEvent._setCommonProperties(event, eventData);
            if (isValueAssigned(eventData.callerIpAddress)) {
                event.baseData["callerIpAddress"] = eventData.callerIpAddress;
            }
            if (isValueAssigned(eventData.callerName)) {
                event.baseData["callerName"] = eventData.callerName;
            }
            if (isValueAssigned(eventData.requestSizeBytes)) {
                event.baseData["requestSizeBytes"] = eventData.requestSizeBytes;
            }
            if (isValueAssigned(eventData.operationVersion)) {
                event.baseData["operationVersion"] = eventData.operationVersion;
            }
        };
        return IncomingQosEvent;
    }());

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _removeNonObjectsAndInvalidElements(overrideConfig, attributeNamesExpectedObjects) {
        _removeInvalidElements(overrideConfig);
        arrForEach(attributeNamesExpectedObjects, function (objectName) {
            if (isObject(overrideConfig[objectName])) {
                _removeInvalidElements(overrideConfig[objectName]);
            }
            else {
                delete overrideConfig[objectName];
            }
        });
    }
    function _removeInvalidElements(object) {
        objForEachKey(object, function (property, value) {
            if (!isValueAssigned(value) ||
                (JSON.stringify(value) === "{}" && (property !== "callback"))) {
                delete object[property];
            }
        });
    }

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _collectMetaTags(config) {
        var msTags = {};
        var awaTags = {};
        awaTags = _getMetaDataFromDOM("awa-", true);
        if (config.autoCapture && config.autoCapture.msTags) {
            msTags = _getMetaDataFromDOM("ms.", false);
        }
        return extend(true, awaTags, msTags);
    }
    function _getMetaData(awaTags, coreData, metaTagName) {
        var data = _extractFieldFromObject(awaTags, metaTagName);
        if (coreData[metaTagName]) {
            return coreData[metaTagName];
        }
        else {
            return data;
        }
    }
    function _getMetaDataFromDOM(prefix, removePrefix) {
        var metaElements;
        var metaData = {};
        var doc = getDocument();
        if (doc) {
            metaElements = doc.querySelectorAll("meta");
            for (var i = 0; i < metaElements.length; i++) {
                var meta = metaElements[i];
                if (meta.name) {
                    var mt = meta.name.toLowerCase();
                    if (mt.indexOf(prefix) === 0) {
                        var name = removePrefix ? meta.name.replace(prefix, "") : meta.name;
                        metaData[name] = meta.content;
                    }
                }
            }
        }
        return metaData;
    }
    function _extractFieldFromObject(obj, fieldName) {
        var fieldValue;
        if (obj && obj[fieldName]) {
            fieldValue = obj[fieldName];
            delete obj[fieldName];
        }
        return fieldValue;
    }
    function _getUri(config) {
        var loc = getLocation() || {};
        return !config.coreData.requestUri ? loc.href : config.coreData.requestUri;
    }
    function _getPageName(config) {
        if (config.callback && typeof (config.callback.pageName) === "function") {
            return config.callback.pageName();
        }
        else if (config.coreData.pageName) {
            return config.coreData.pageName;
        }
        else {
            var loc = getLocation() || {};
            var pagename = loc.pathname || "";
            var framents = pagename.split("/");
            if (framents.length > 2 && framents[2] !== "") {
                pagename = framents[2];
            }
            else {
                pagename = "Home";
            }
            return pagename;
        }
    }

    /*!
     * Application Insights JavaScript SDK - Dependencies Plugin, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var strProperties = "properties";
    function _calcPerfDuration(resourceEntry, start, end) {
        var result = 0;
        var from = resourceEntry[start];
        var to = resourceEntry[end];
        if (from && to) {
            result = dateTimeUtilsDuration(from, to);
        }
        return result;
    }
    function _setPerfDuration(props, name, resourceEntry, start, end) {
        var result = 0;
        var value = _calcPerfDuration(resourceEntry, start, end);
        if (value) {
            result = _setPerfValue(props, name, msToTimeSpan(value));
        }
        return result;
    }
    function _setPerfValue(props, name, value) {
        var strPerf = "ajaxPerf";
        var result = 0;
        if (props && name && value) {
            var perfData = props[strPerf] = (props[strPerf] || {});
            perfData[name] = value;
            result = 1;
        }
        return result;
    }
    function _populatePerfData(ajaxData, dependency) {
        var resourceEntry = ajaxData.perfTiming;
        var props = dependency[strProperties] || {};
        var propsSet = 0;
        var strName = "name";
        var strStart = "Start";
        var strEnd = "End";
        var strDomainLookup = "domainLookup";
        var strConnect = "connect";
        var strRedirect = "redirect";
        var strRequest = "request";
        var strResponse = "response";
        var strDuration = "duration";
        var strStartTime = "startTime";
        var strDomainLookupStart = strDomainLookup + strStart;
        var strDomainLookupEnd = strDomainLookup + strEnd;
        var strConnectStart = strConnect + strStart;
        var strConnectEnd = strConnect + strEnd;
        var strRequestStart = strRequest + strStart;
        var strRequestEnd = strRequest + strEnd;
        var strResponseStart = strResponse + strStart;
        var strResponseEnd = strResponse + strEnd;
        var strRedirectStart = strRedirect + strStart;
        var strRedirectEnd = strRedirect = strEnd;
        var strTransferSize = "transferSize";
        var strEncodedBodySize = "encodedBodySize";
        var strDecodedBodySize = "decodedBodySize";
        var strServerTiming = "serverTiming";
        if (resourceEntry) {
            propsSet |= _setPerfDuration(props, strRedirect, resourceEntry, strRedirectStart, strRedirectEnd);
            propsSet |= _setPerfDuration(props, strDomainLookup, resourceEntry, strDomainLookupStart, strDomainLookupEnd);
            propsSet |= _setPerfDuration(props, strConnect, resourceEntry, strConnectStart, strConnectEnd);
            propsSet |= _setPerfDuration(props, strRequest, resourceEntry, strRequestStart, strRequestEnd);
            propsSet |= _setPerfDuration(props, strResponse, resourceEntry, strResponseStart, strResponseEnd);
            propsSet |= _setPerfDuration(props, "networkConnect", resourceEntry, strStartTime, strConnectEnd);
            propsSet |= _setPerfDuration(props, "sentRequest", resourceEntry, strRequestStart, strResponseEnd);
            var duration = resourceEntry[strDuration];
            if (!duration) {
                duration = _calcPerfDuration(resourceEntry, strStartTime, strResponseEnd) || 0;
            }
            propsSet |= _setPerfValue(props, strDuration, duration);
            propsSet |= _setPerfValue(props, "perfTotal", duration);
            var serverTiming = resourceEntry[strServerTiming];
            if (serverTiming) {
                var server_1 = {};
                arrForEach(serverTiming, function (value, idx) {
                    var name = normalizeJsName(value[strName] || "" + idx);
                    var newValue = server_1[name] || {};
                    objForEachKey(value, function (key, val) {
                        if (key !== strName && isString(val) || isNumber(val)) {
                            if (newValue[key]) {
                                val = newValue[key] + ";" + val;
                            }
                            if (val || !isString(val)) {
                                newValue[key] = val;
                            }
                        }
                    });
                    server_1[name] = newValue;
                });
                propsSet |= _setPerfValue(props, strServerTiming, server_1);
            }
            propsSet |= _setPerfValue(props, strTransferSize, resourceEntry[strTransferSize]);
            propsSet |= _setPerfValue(props, strEncodedBodySize, resourceEntry[strEncodedBodySize]);
            propsSet |= _setPerfValue(props, strDecodedBodySize, resourceEntry[strDecodedBodySize]);
        }
        else {
            if (ajaxData.perfMark) {
                propsSet |= _setPerfValue(props, "missing", ajaxData.perfAttempts);
            }
        }
        if (propsSet) {
            dependency[strProperties] = props;
        }
    }
    var XHRMonitoringState = /** @class */ (function () {
        function XHRMonitoringState() {
            var self = this;
            self.openDone = false;
            self.setRequestHeaderDone = false;
            self.sendDone = false;
            self.abortDone = false;
            self.stateChangeAttached = false;
        }
        return XHRMonitoringState;
    }());
    var ajaxRecord = /** @class */ (function () {
        function ajaxRecord(traceID, spanID, logger) {
            var self = this;
            var _logger = logger;
            var strResponseText = "responseText";
            self.perfMark = null;
            self.completed = false;
            self.requestHeadersSize = null;
            self.requestHeaders = null;
            self.responseReceivingDuration = null;
            self.callbackDuration = null;
            self.ajaxTotalDuration = null;
            self.aborted = 0;
            self.pageUrl = null;
            self.requestUrl = null;
            self.requestSize = 0;
            self.method = null;
            self.status = null;
            self.requestSentTime = null;
            self.responseStartedTime = null;
            self.responseFinishedTime = null;
            self.callbackFinishedTime = null;
            self.endTime = null;
            self.xhrMonitoringState = new XHRMonitoringState();
            self.clientFailure = 0;
            self.traceID = traceID;
            self.spanID = spanID;
            dynamicProto(ajaxRecord, self, function (self) {
                self.getAbsoluteUrl = function () {
                    return self.requestUrl ? urlGetAbsoluteUrl(self.requestUrl) : null;
                };
                self.getPathName = function () {
                    return self.requestUrl ? DataSanitizer.sanitizeUrl(_logger, urlGetCompleteUrl(self.method, self.requestUrl)) : null;
                };
                self.CreateTrackItem = function (ajaxType, enableRequestHeaderTracking, getResponse) {
                    self.ajaxTotalDuration = Math.round(dateTimeUtilsDuration(self.requestSentTime, self.responseFinishedTime) * 1000) / 1000;
                    if (self.ajaxTotalDuration < 0) {
                        return null;
                    }
                    var dependency = (_a = {
                            id: "|" + self.traceID + "." + self.spanID,
                            target: self.getAbsoluteUrl(),
                            name: self.getPathName(),
                            type: ajaxType,
                            startTime: null,
                            duration: self.ajaxTotalDuration,
                            success: (+(self.status)) >= 200 && (+(self.status)) < 400,
                            responseCode: (+(self.status)),
                            method: self.method
                        },
                        _a[strProperties] = { HttpMethod: self.method },
                        _a);
                    if (self.requestSentTime) {
                        dependency.startTime = new Date();
                        dependency.startTime.setTime(self.requestSentTime);
                    }
                    _populatePerfData(self, dependency);
                    if (enableRequestHeaderTracking) {
                        if (objKeys(self.requestHeaders).length > 0) {
                            dependency[strProperties] = dependency[strProperties] || {};
                            dependency[strProperties].requestHeaders = self.requestHeaders;
                        }
                    }
                    if (getResponse) {
                        var response = getResponse();
                        if (response) {
                            var correlationContext = response.correlationContext;
                            if (correlationContext) {
                                dependency.correlationContext =  correlationContext;
                            }
                            if (response.headerMap) {
                                if (objKeys(response.headerMap).length > 0) {
                                    dependency[strProperties] = dependency[strProperties] || {};
                                    dependency[strProperties].responseHeaders = response.headerMap;
                                }
                            }
                            if (self.status >= 400) {
                                var responseType = response.type;
                                dependency[strProperties] = dependency[strProperties] || {};
                                if (responseType === "" || responseType === "text") {
                                    dependency[strProperties][strResponseText] = response[strResponseText] ? response.statusText + " - " + response[strResponseText] : response.statusText;
                                }
                                if (responseType === "json") {
                                    dependency[strProperties][strResponseText] = response.response ? response.statusText + " - " + JSON.stringify(response.response) : response.statusText;
                                }
                            }
                        }
                    }
                    return dependency;
                    var _a;
                };
            });
        }
        return ajaxRecord;
    }());

    /*!
     * Application Insights JavaScript SDK - Dependencies Plugin, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var Traceparent = /** @class */ (function () {
        function Traceparent(traceId, spanId) {
            var self = this;
            self.traceFlag = Traceparent.DEFAULT_TRACE_FLAG;
            self.version = Traceparent.DEFAULT_VERSION;
            if (traceId && Traceparent.isValidTraceId(traceId)) {
                self.traceId = traceId;
            }
            else {
                self.traceId = generateW3CId();
            }
            if (spanId && Traceparent.isValidSpanId(spanId)) {
                self.spanId = spanId;
            }
            else {
                self.spanId = generateW3CId().substr(0, 16);
            }
        }
        Traceparent.isValidTraceId = function (id) {
            return id.match(/^[0-9a-f]{32}$/) && id !== "00000000000000000000000000000000";
        };
        Traceparent.isValidSpanId = function (id) {
            return id.match(/^[0-9a-f]{16}$/) && id !== "0000000000000000";
        };
        Traceparent.prototype.toString = function () {
            var self = this;
            return self.version + "-" + self.traceId + "-" + self.spanId + "-" + self.traceFlag;
        };
        Traceparent.DEFAULT_TRACE_FLAG = "01";
        Traceparent.DEFAULT_VERSION = "00";
        return Traceparent;
    }());

    /*!
     * Application Insights JavaScript SDK - Dependencies Plugin, 2.6.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     */
    var AJAX_MONITOR_PREFIX = "ai.ajxmn.";
    var strDiagLog = "diagLog";
    var strAjaxData = "ajaxData";
    var strThrowInternal = "throwInternal";
    var strFetch = "fetch";
    var _markCount = 0;
    function _supportsFetch() {
        var _global = getGlobal();
        if (!_global ||
            isNullOrUndefined(_global.Request) ||
            isNullOrUndefined(_global.Request[strPrototype]) ||
            isNullOrUndefined(_global[strFetch])) {
            return null;
        }
        return _global[strFetch];
    }
    function _supportsAjaxMonitoring(ajaxMonitorInstance) {
        var result = false;
        if (typeof XMLHttpRequest !== strUndefined && !isNullOrUndefined(XMLHttpRequest)) {
            var proto = XMLHttpRequest[strPrototype];
            result = !isNullOrUndefined(proto) &&
                !isNullOrUndefined(proto.open) &&
                !isNullOrUndefined(proto.send) &&
                !isNullOrUndefined(proto.abort);
        }
        var ieVer = getIEVersion();
        if (ieVer && ieVer < 9) {
            result = false;
        }
        if (result) {
            try {
                var xhr = new XMLHttpRequest();
                xhr[strAjaxData] = {};
                var theOpen = XMLHttpRequest[strPrototype].open;
                XMLHttpRequest[strPrototype].open = theOpen;
            }
            catch (e) {
                result = false;
                _throwInternalCritical(ajaxMonitorInstance, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to enable XMLHttpRequest monitoring, extension is not supported", {
                    exception: dumpObj(e)
                });
            }
        }
        return result;
    }
    function _getFailedAjaxDiagnosticsMessage(xhr) {
        var result = "";
        try {
            if (!isNullOrUndefined(xhr) &&
                !isNullOrUndefined(xhr[strAjaxData]) &&
                !isNullOrUndefined(xhr[strAjaxData].requestUrl)) {
                result += "(url: '" + xhr[strAjaxData].requestUrl + "')";
            }
        }
        catch (e) { }
        return result;
    }
    function _throwInternalCritical(ajaxMonitorInstance, msgId, message, properties, isUserAct) {
        ajaxMonitorInstance[strDiagLog]()[strThrowInternal](LoggingSeverity.CRITICAL, msgId, message, properties, isUserAct);
    }
    function _throwInternalWarning(ajaxMonitorInstance, msgId, message, properties, isUserAct) {
        ajaxMonitorInstance[strDiagLog]()[strThrowInternal](LoggingSeverity.WARNING, msgId, message, properties, isUserAct);
    }
    function _createErrorCallbackFunc(ajaxMonitorInstance, internalMessage, message) {
        return function (args) {
            _throwInternalCritical(ajaxMonitorInstance, internalMessage, message, {
                ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(args.inst),
                exception: dumpObj(args.err)
            });
        };
    }
    function _indexOf(value, match) {
        if (value && match) {
            return value.indexOf(match);
        }
        return -1;
    }
    var AjaxMonitor = /** @class */ (function (_super) {
        __extends(AjaxMonitor, _super);
        function AjaxMonitor() {
            var _this = _super.call(this) || this;
            _this.identifier = AjaxMonitor.identifier;
            _this.priority = 120;
            var strTrackDependencyDataInternal = "trackDependencyDataInternal";
            var location = getLocation();
            var _fetchInitialized = false;
            var _xhrInitialized = false;
            var _currentWindowHost = location && location.host && location.host.toLowerCase();
            var _config = AjaxMonitor.getEmptyConfig();
            var _enableRequestHeaderTracking = false;
            var _trackAjaxAttempts = 0;
            var _context;
            var _isUsingW3CHeaders;
            var _isUsingAIHeaders;
            var _markPrefix;
            var _enableAjaxPerfTracking = false;
            var _maxAjaxCallsPerView = 0;
            var _enableResponseHeaderTracking = false;
            var _hooks = [];
            var _disabledUrls = {};
            dynamicProto(AjaxMonitor, _this, function (_self, base) {
                _self.initialize = function (config, core, extensions, pluginChain) {
                    if (!_self.isInitialized()) {
                        base.initialize(config, core, extensions, pluginChain);
                        var ctx_1 = _self._getTelCtx();
                        var defaultConfig = AjaxMonitor.getDefaultConfig();
                        objForEachKey(defaultConfig, function (field, value) {
                            _config[field] = ctx_1.getConfig(AjaxMonitor.identifier, field, value);
                        });
                        var distributedTracingMode = _config.distributedTracingMode;
                        _enableRequestHeaderTracking = _config.enableRequestHeaderTracking;
                        _enableAjaxPerfTracking = _config.enableAjaxPerfTracking;
                        _maxAjaxCallsPerView = _config.maxAjaxCallsPerView;
                        _enableResponseHeaderTracking = _config.enableResponseHeaderTracking;
                        _isUsingAIHeaders = distributedTracingMode === DistributedTracingModes.AI || distributedTracingMode === DistributedTracingModes.AI_AND_W3C;
                        _isUsingW3CHeaders = distributedTracingMode === DistributedTracingModes.AI_AND_W3C || distributedTracingMode === DistributedTracingModes.W3C;
                        if (_enableAjaxPerfTracking) {
                            var iKey = config.instrumentationKey || "unkwn";
                            if (iKey.length > 5) {
                                _markPrefix = AJAX_MONITOR_PREFIX + iKey.substring(iKey.length - 5) + ".";
                            }
                            else {
                                _markPrefix = AJAX_MONITOR_PREFIX + iKey + ".";
                            }
                        }
                        if (_config.disableAjaxTracking === false) {
                            _instrumentXhr();
                        }
                        _instrumentFetch();
                        if (extensions.length > 0 && extensions) {
                            var propExt = void 0, extIx = 0;
                            while (!propExt && extIx < extensions.length) {
                                if (extensions[extIx] && extensions[extIx].identifier === PropertiesPluginIdentifier) {
                                    propExt = extensions[extIx];
                                }
                                extIx++;
                            }
                            if (propExt) {
                                _context = propExt.context;
                            }
                        }
                    }
                };
                _self.teardown = function () {
                    arrForEach(_hooks, function (fn) {
                        fn.rm();
                    });
                    _hooks = [];
                    _fetchInitialized = false;
                    _xhrInitialized = false;
                    _self.setInitialized(false);
                };
                _self.trackDependencyData = function (dependency, properties) {
                    _self[strTrackDependencyDataInternal](dependency, properties);
                };
                _self.includeCorrelationHeaders = function (ajaxData, input, init, xhr) {
                    var currentWindowHost = _self["_currentWindowHost"] || _currentWindowHost;
                    if (input) {
                        if (CorrelationIdHelper.canIncludeCorrelationHeader(_config, ajaxData.getAbsoluteUrl(), currentWindowHost)) {
                            if (!init) {
                                init = {};
                            }
                            init.headers = new Headers(init.headers || (input instanceof Request ? (input.headers || {}) : {}));
                            if (_isUsingAIHeaders) {
                                var id = "|" + ajaxData.traceID + "." + ajaxData.spanID;
                                init.headers.set(RequestHeaders.requestIdHeader, id);
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.requestIdHeader] = id;
                                }
                            }
                            var appId = _config.appId || (_context && _context.appId());
                            if (appId) {
                                init.headers.set(RequestHeaders.requestContextHeader, RequestHeaders.requestContextAppIdFormat + appId);
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.requestContextHeader] = RequestHeaders.requestContextAppIdFormat + appId;
                                }
                            }
                            if (_isUsingW3CHeaders) {
                                var traceparent = new Traceparent(ajaxData.traceID, ajaxData.spanID);
                                init.headers.set(RequestHeaders.traceParentHeader, traceparent.toString());
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.traceParentHeader] = traceparent.toString();
                                }
                            }
                        }
                        return init;
                    }
                    else if (xhr) {
                        if (CorrelationIdHelper.canIncludeCorrelationHeader(_config, ajaxData.getAbsoluteUrl(), currentWindowHost)) {
                            if (_isUsingAIHeaders) {
                                var id = "|" + ajaxData.traceID + "." + ajaxData.spanID;
                                xhr.setRequestHeader(RequestHeaders.requestIdHeader, id);
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.requestIdHeader] = id;
                                }
                            }
                            var appId = _config.appId || (_context && _context.appId());
                            if (appId) {
                                xhr.setRequestHeader(RequestHeaders.requestContextHeader, RequestHeaders.requestContextAppIdFormat + appId);
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.requestContextHeader] = RequestHeaders.requestContextAppIdFormat + appId;
                                }
                            }
                            if (_isUsingW3CHeaders) {
                                var traceparent = new Traceparent(ajaxData.traceID, ajaxData.spanID);
                                xhr.setRequestHeader(RequestHeaders.traceParentHeader, traceparent.toString());
                                if (_enableRequestHeaderTracking) {
                                    ajaxData.requestHeaders[RequestHeaders.traceParentHeader] = traceparent.toString();
                                }
                            }
                        }
                        return xhr;
                    }
                    return undefined;
                };
                _self[strTrackDependencyDataInternal] = function (dependency, properties, systemProperties) {
                    if (_maxAjaxCallsPerView === -1 || _trackAjaxAttempts < _maxAjaxCallsPerView) {
                        if ((_config.distributedTracingMode === DistributedTracingModes.W3C
                            || _config.distributedTracingMode === DistributedTracingModes.AI_AND_W3C)
                            && typeof dependency.id === "string" && dependency.id[dependency.id.length - 1] !== ".") {
                            dependency.id += ".";
                        }
                        if (isNullOrUndefined(dependency.startTime)) {
                            dependency.startTime = new Date();
                        }
                        var item = TelemetryItemCreator.create(dependency, RemoteDependencyData.dataType, RemoteDependencyData.envelopeType, _self[strDiagLog](), properties, systemProperties);
                        _self.core.track(item);
                    }
                    else if (_trackAjaxAttempts === _maxAjaxCallsPerView) {
                        _throwInternalCritical(_self, _InternalMessageId.MaxAjaxPerPVExceeded, "Maximum ajax per page view limit reached, ajax monitoring is paused until the next trackPageView(). In order to increase the limit set the maxAjaxCallsPerView configuration parameter.", true);
                    }
                    ++_trackAjaxAttempts;
                };
                function _instrumentFetch() {
                    var fetch = _supportsFetch();
                    if (!fetch) {
                        return;
                    }
                    var global = getGlobal();
                    var isPolyfill = fetch.polyfill;
                    if (_config.disableFetchTracking === false) {
                        _hooks.push(InstrumentFunc(global, strFetch, {
                            req: function (callDetails, input, init) {
                                var fetchData;
                                if (_fetchInitialized &&
                                    !_isDisabledRequest(null, input, init) &&
                                    !(isPolyfill && _xhrInitialized)) {
                                    var ctx = callDetails.ctx();
                                    fetchData = _createFetchRecord(input, init);
                                    var newInit = _self.includeCorrelationHeaders(fetchData, input, init);
                                    if (newInit !== init) {
                                        callDetails.set(1, newInit);
                                    }
                                    ctx.data = fetchData;
                                }
                            },
                            rsp: function (callDetails, input) {
                                var fetchData = callDetails.ctx().data;
                                if (fetchData) {
                                    callDetails.rslt = callDetails.rslt.then(function (response) {
                                        _reportFetchMetrics(callDetails, (response || {}).status, response, fetchData, function () {
                                            var ajaxResponse = {
                                                statusText: response.statusText,
                                                headerMap: null,
                                                correlationContext: _getFetchCorrelationContext(response)
                                            };
                                            if (_enableResponseHeaderTracking) {
                                                var responseHeaderMap_1 = {};
                                                response.headers.forEach(function (value, name) {
                                                    responseHeaderMap_1[name] = value;
                                                });
                                                ajaxResponse.headerMap = responseHeaderMap_1;
                                            }
                                            return ajaxResponse;
                                        });
                                        return response;
                                    })["catch"](function (reason) {
                                        _reportFetchMetrics(callDetails, 0, input, fetchData, null, { error: reason.message });
                                        throw reason;
                                    });
                                }
                            },
                            hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to monitor Window.fetch, monitoring data for this fetch call may be incorrect.")
                        }));
                        _fetchInitialized = true;
                    }
                    else if (isPolyfill) {
                        _hooks.push(InstrumentFunc(global, strFetch, {
                            req: function (callDetails, input, init) {
                                _isDisabledRequest(null, input, init);
                            }
                        }));
                    }
                    if (isPolyfill) {
                        global[strFetch].polyfill = isPolyfill;
                    }
                }
                function _hookProto(target, funcName, callbacks) {
                    _hooks.push(InstrumentProto(target, funcName, callbacks));
                }
                function _instrumentXhr() {
                    if (_supportsAjaxMonitoring(_self) && !_xhrInitialized) {
                        _hookProto(XMLHttpRequest, "open", {
                            req: function (args, method, url, async) {
                                var xhr = args.inst;
                                var ajaxData = xhr[strAjaxData];
                                if (!_isDisabledRequest(xhr, url) && _isMonitoredXhrInstance(xhr, true) &&
                                    (!ajaxData || !ajaxData.xhrMonitoringState.openDone)) {
                                    _openHandler(xhr, method, url, async);
                                }
                            },
                            hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to monitor XMLHttpRequest.open, monitoring data for this ajax call may be incorrect.")
                        });
                        _hookProto(XMLHttpRequest, "send", {
                            req: function (args, context) {
                                var xhr = args.inst;
                                var ajaxData = xhr[strAjaxData];
                                if (_isMonitoredXhrInstance(xhr) && !ajaxData.xhrMonitoringState.sendDone) {
                                    _createMarkId("xhr", ajaxData);
                                    ajaxData.requestSentTime = dateTimeUtilsNow();
                                    xhr = _self.includeCorrelationHeaders(ajaxData, undefined, undefined, xhr);
                                    ajaxData.xhrMonitoringState.sendDone = true;
                                }
                            },
                            hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxSend, "Failed to monitor XMLHttpRequest, monitoring data for this ajax call may be incorrect.")
                        });
                        _hookProto(XMLHttpRequest, "abort", {
                            req: function (args) {
                                var xhr = args.inst;
                                var ajaxData = xhr[strAjaxData];
                                if (_isMonitoredXhrInstance(xhr) && !ajaxData.xhrMonitoringState.abortDone) {
                                    ajaxData.aborted = 1;
                                    ajaxData.xhrMonitoringState.abortDone = true;
                                }
                            },
                            hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxAbort, "Failed to monitor XMLHttpRequest.abort, monitoring data for this ajax call may be incorrect.")
                        });
                        if (_enableRequestHeaderTracking) {
                            _hookProto(XMLHttpRequest, "setRequestHeader", {
                                req: function (args, header, value) {
                                    var xhr = args.inst;
                                    if (_isMonitoredXhrInstance(xhr)) {
                                        xhr[strAjaxData].requestHeaders[header] = value;
                                    }
                                },
                                hkErr: _createErrorCallbackFunc(_self, _InternalMessageId.FailedMonitorAjaxSetRequestHeader, "Failed to monitor XMLHttpRequest.setRequestHeader, monitoring data for this ajax call may be incorrect.")
                            });
                        }
                        _xhrInitialized = true;
                    }
                }
                function _isDisabledRequest(xhr, request, init) {
                    var isDisabled = false;
                    var theUrl = ((!isString(request) ? (request || {}).url || "" : request) || "").toLowerCase();
                    var idx = _indexOf(theUrl, "?");
                    var idx2 = _indexOf(theUrl, "#");
                    if (idx === -1 || (idx2 !== -1 && idx2 < idx)) {
                        idx = idx2;
                    }
                    if (idx !== -1) {
                        theUrl = theUrl.substring(0, idx);
                    }
                    if (!isNullOrUndefined(xhr)) {
                        isDisabled = xhr[DisabledPropertyName$1] === true || theUrl[DisabledPropertyName$1] === true;
                    }
                    else if (!isNullOrUndefined(request)) {
                        isDisabled = (typeof request === 'object' ? request[DisabledPropertyName$1] === true : false) ||
                            (init ? init[DisabledPropertyName$1] === true : false);
                    }
                    if (isDisabled) {
                        if (!_disabledUrls[theUrl]) {
                            _disabledUrls[theUrl] = 1;
                        }
                    }
                    else {
                        if (_disabledUrls[theUrl]) {
                            isDisabled = true;
                        }
                    }
                    return isDisabled;
                }
                function _isMonitoredXhrInstance(xhr, excludeAjaxDataValidation) {
                    var ajaxValidation = true;
                    var initialized = _xhrInitialized;
                    if (!isNullOrUndefined(xhr)) {
                        ajaxValidation = excludeAjaxDataValidation === true || !isNullOrUndefined(xhr[strAjaxData]);
                    }
                    return initialized
                        && ajaxValidation;
                }
                function _openHandler(xhr, method, url, async) {
                    var traceID = (_context && _context.telemetryTrace && _context.telemetryTrace.traceID) || generateW3CId();
                    var spanID = generateW3CId().substr(0, 16);
                    var ajaxData = new ajaxRecord(traceID, spanID, _self[strDiagLog]());
                    ajaxData.method = method;
                    ajaxData.requestUrl = url;
                    ajaxData.xhrMonitoringState.openDone = true;
                    ajaxData.requestHeaders = {};
                    ajaxData.async = async;
                    xhr[strAjaxData] = ajaxData;
                    _attachToOnReadyStateChange(xhr);
                }
                function _attachToOnReadyStateChange(xhr) {
                    xhr[strAjaxData].xhrMonitoringState.stateChangeAttached = EventHelper.Attach(xhr, "readystatechange", function () {
                        try {
                            if (xhr && xhr.readyState === 4 && _isMonitoredXhrInstance(xhr)) {
                                _onAjaxComplete(xhr);
                            }
                        }
                        catch (e) {
                            var exceptionText = dumpObj(e);
                            if (!exceptionText || _indexOf(exceptionText.toLowerCase(), "c00c023f") === -1) {
                                _throwInternalCritical(_self, _InternalMessageId.FailedMonitorAjaxRSC, "Failed to monitor XMLHttpRequest 'readystatechange' event handler, monitoring data for this ajax call may be incorrect.", {
                                    ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(xhr),
                                    exception: exceptionText
                                });
                            }
                        }
                    });
                }
                function _getResponseText(xhr) {
                    try {
                        var responseType = xhr.responseType;
                        if (responseType === "" || responseType === "text") {
                            return xhr.responseText;
                        }
                    }
                    catch (e) {
                    }
                    return null;
                }
                function _onAjaxComplete(xhr) {
                    var ajaxData = xhr[strAjaxData];
                    ajaxData.responseFinishedTime = dateTimeUtilsNow();
                    ajaxData.status = xhr.status;
                    function _reportXhrError(e, failedProps) {
                        var errorProps = failedProps || {};
                        errorProps["ajaxDiagnosticsMessage"] = _getFailedAjaxDiagnosticsMessage(xhr);
                        if (e) {
                            errorProps["exception"] = dumpObj(e);
                        }
                        _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxDur, "Failed to calculate the duration of the ajax call, monitoring data for this ajax call won't be sent.", errorProps);
                    }
                    _findPerfResourceEntry("xmlhttprequest", ajaxData, function () {
                        try {
                            var dependency = ajaxData.CreateTrackItem("Ajax", _enableRequestHeaderTracking, function () {
                                var ajaxResponse = {
                                    statusText: xhr.statusText,
                                    headerMap: null,
                                    correlationContext: _getAjaxCorrelationContext(xhr),
                                    type: xhr.responseType,
                                    responseText: _getResponseText(xhr),
                                    response: xhr.response
                                };
                                if (_enableResponseHeaderTracking) {
                                    var headers = xhr.getAllResponseHeaders();
                                    if (headers) {
                                        var arr = strTrim(headers).split(/[\r\n]+/);
                                        var responseHeaderMap_2 = {};
                                        arrForEach(arr, function (line) {
                                            var parts = line.split(': ');
                                            var header = parts.shift();
                                            var value = parts.join(': ');
                                            responseHeaderMap_2[header] = value;
                                        });
                                        ajaxResponse.headerMap = responseHeaderMap_2;
                                    }
                                }
                                return ajaxResponse;
                            });
                            if (dependency) {
                                _self[strTrackDependencyDataInternal](dependency);
                            }
                            else {
                                _reportXhrError(null, {
                                    requestSentTime: ajaxData.requestSentTime,
                                    responseFinishedTime: ajaxData.responseFinishedTime
                                });
                            }
                        }
                        finally {
                            try {
                                xhr[strAjaxData] = null;
                            }
                            catch (e) {
                            }
                        }
                    }, function (e) {
                        _reportXhrError(e, null);
                    });
                }
                function _getAjaxCorrelationContext(xhr) {
                    try {
                        var responseHeadersString = xhr.getAllResponseHeaders();
                        if (responseHeadersString !== null) {
                            var index = _indexOf(responseHeadersString.toLowerCase(), RequestHeaders.requestContextHeaderLowerCase);
                            if (index !== -1) {
                                var responseHeader = xhr.getResponseHeader(RequestHeaders.requestContextHeader);
                                return CorrelationIdHelper.getCorrelationContext(responseHeader);
                            }
                        }
                    }
                    catch (e) {
                        _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, "Failed to get Request-Context correlation header as it may be not included in the response or not accessible.", {
                            ajaxDiagnosticsMessage: _getFailedAjaxDiagnosticsMessage(xhr),
                            exception: dumpObj(e)
                        });
                    }
                }
                function _createMarkId(type, ajaxData) {
                    if (ajaxData.requestUrl && _markPrefix && _enableAjaxPerfTracking) {
                        var performance_1 = getPerformance();
                        if (performance_1 && isFunction(performance_1.mark)) {
                            _markCount++;
                            var markId = _markPrefix + type + "#" + _markCount;
                            performance_1.mark(markId);
                            var entries = performance_1.getEntriesByName(markId);
                            if (entries && entries.length === 1) {
                                ajaxData.perfMark = entries[0];
                            }
                        }
                    }
                }
                function _findPerfResourceEntry(initiatorType, ajaxData, trackCallback, reportError) {
                    var perfMark = ajaxData.perfMark;
                    var performance = getPerformance();
                    var maxAttempts = _config.maxAjaxPerfLookupAttempts;
                    var retryDelay = _config.ajaxPerfLookupDelay;
                    var requestUrl = ajaxData.requestUrl;
                    var attempt = 0;
                    (function locateResourceTiming() {
                        try {
                            if (performance && perfMark) {
                                attempt++;
                                var perfTiming = null;
                                var entries = performance.getEntries();
                                for (var lp = entries.length - 1; lp >= 0; lp--) {
                                    var entry = entries[lp];
                                    if (entry) {
                                        if (entry.entryType === "resource") {
                                            if (entry.initiatorType === initiatorType &&
                                                (_indexOf(entry.name, requestUrl) !== -1 || _indexOf(requestUrl, entry.name) !== -1)) {
                                                perfTiming = entry;
                                            }
                                        }
                                        else if (entry.entryType === "mark" && entry.name === perfMark.name) {
                                            ajaxData.perfTiming = perfTiming;
                                            break;
                                        }
                                        if (entry.startTime < perfMark.startTime - 1000) {
                                            break;
                                        }
                                    }
                                }
                            }
                            if (!perfMark ||
                                ajaxData.perfTiming ||
                                attempt >= maxAttempts ||
                                ajaxData.async === false) {
                                if (perfMark && isFunction(performance.clearMarks)) {
                                    performance.clearMarks(perfMark.name);
                                }
                                ajaxData.perfAttempts = attempt;
                                trackCallback();
                            }
                            else {
                                setTimeout(locateResourceTiming, retryDelay);
                            }
                        }
                        catch (e) {
                            reportError(e);
                        }
                    })();
                }
                function _createFetchRecord(input, init) {
                    var traceID = (_context && _context.telemetryTrace && _context.telemetryTrace.traceID) || generateW3CId();
                    var spanID = generateW3CId().substr(0, 16);
                    var ajaxData = new ajaxRecord(traceID, spanID, _self[strDiagLog]());
                    ajaxData.requestSentTime = dateTimeUtilsNow();
                    if (input instanceof Request) {
                        ajaxData.requestUrl = input ? input.url : "";
                    }
                    else {
                        ajaxData.requestUrl = input;
                    }
                    var method = "GET";
                    if (init && init.method) {
                        method = init.method;
                    }
                    else if (input && input instanceof Request) {
                        method = input.method;
                    }
                    ajaxData.method = method;
                    var requestHeaders = {};
                    if (_enableRequestHeaderTracking) {
                        var headers = new Headers((init ? init.headers : 0) || (input instanceof Request ? (input.headers || {}) : {}));
                        headers.forEach(function (value, key) {
                            requestHeaders[key] = value;
                        });
                    }
                    ajaxData.requestHeaders = requestHeaders;
                    _createMarkId("fetch", ajaxData);
                    return ajaxData;
                }
                function _getFailedFetchDiagnosticsMessage(input) {
                    var result = "";
                    try {
                        if (!isNullOrUndefined(input)) {
                            if (typeof (input) === "string") {
                                result += "(url: '" + input + "')";
                            }
                            else {
                                result += "(url: '" + input.url + "')";
                            }
                        }
                    }
                    catch (e) {
                        _throwInternalCritical(_self, _InternalMessageId.FailedMonitorAjaxOpen, "Failed to grab failed fetch diagnostics message", { exception: dumpObj(e) });
                    }
                    return result;
                }
                function _reportFetchMetrics(callDetails, status, input, ajaxData, getResponse, properties) {
                    if (!ajaxData) {
                        return;
                    }
                    function _reportFetchError(msgId, e, failedProps) {
                        var errorProps = failedProps || {};
                        errorProps["fetchDiagnosticsMessage"] = _getFailedFetchDiagnosticsMessage(input);
                        if (e) {
                            errorProps["exception"] = dumpObj(e);
                        }
                        _throwInternalWarning(_self, msgId, "Failed to calculate the duration of the fetch call, monitoring data for this fetch call won't be sent.", errorProps);
                    }
                    ajaxData.responseFinishedTime = dateTimeUtilsNow();
                    ajaxData.status = status;
                    _findPerfResourceEntry("fetch", ajaxData, function () {
                        var dependency = ajaxData.CreateTrackItem("Fetch", _enableRequestHeaderTracking, getResponse);
                        if (dependency) {
                            _self[strTrackDependencyDataInternal](dependency);
                        }
                        else {
                            _reportFetchError(_InternalMessageId.FailedMonitorAjaxDur, null, {
                                requestSentTime: ajaxData.requestSentTime,
                                responseFinishedTime: ajaxData.responseFinishedTime
                            });
                        }
                    }, function (e) {
                        _reportFetchError(_InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, e, null);
                    });
                }
                function _getFetchCorrelationContext(response) {
                    if (response && response.headers) {
                        try {
                            var responseHeader = response.headers.get(RequestHeaders.requestContextHeader);
                            return CorrelationIdHelper.getCorrelationContext(responseHeader);
                        }
                        catch (e) {
                            _throwInternalWarning(_self, _InternalMessageId.FailedMonitorAjaxGetCorrelationHeader, "Failed to get Request-Context correlation header as it may be not included in the response or not accessible.", {
                                fetchDiagnosticsMessage: _getFailedFetchDiagnosticsMessage(response),
                                exception: dumpObj(e)
                            });
                        }
                    }
                }
            });
            return _this;
        }
        AjaxMonitor.getDefaultConfig = function () {
            var config = {
                maxAjaxCallsPerView: 500,
                disableAjaxTracking: false,
                disableFetchTracking: true,
                disableCorrelationHeaders: false,
                distributedTracingMode: DistributedTracingModes.AI_AND_W3C,
                correlationHeaderExcludedDomains: [
                    "*.blob.core.windows.net",
                    "*.blob.core.chinacloudapi.cn",
                    "*.blob.core.cloudapi.de",
                    "*.blob.core.usgovcloudapi.net"
                ],
                correlationHeaderDomains: undefined,
                appId: undefined,
                enableCorsCorrelation: false,
                enableRequestHeaderTracking: false,
                enableResponseHeaderTracking: false,
                enableAjaxErrorStatusText: false,
                enableAjaxPerfTracking: false,
                maxAjaxPerfLookupAttempts: 3,
                ajaxPerfLookupDelay: 25
            };
            return config;
        };
        AjaxMonitor.getEmptyConfig = function () {
            var emptyConfig = this.getDefaultConfig();
            objForEachKey(emptyConfig, function (value) {
                emptyConfig[value] = undefined;
            });
            return emptyConfig;
        };
        AjaxMonitor.prototype.processTelemetry = function (item, itemCtx) {
            this.processNext(item, itemCtx);
        };
        AjaxMonitor.identifier = "AjaxDependencyPlugin";
        return AjaxMonitor;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Id = /** @class */ (function () {
        function Id() {
            this.lastPageViewId = createGuid();
            this.traceId = this.createTraceId();
        }
        Id.prototype.createTraceId = function () {
            return createGuid().replace(/-/g, "");
        };
        Id.prototype.getTraceId = function () {
            return this.traceId;
        };
        Id.prototype.getLastPageViewId = function () {
            return this.lastPageViewId;
        };
        return Id;
    }());

    /*!
     * 1DS JS SDK QoS plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var MS_CV = "MS-CV";
    var cfgDistributedTracingMode = "distributedTracingMode";
    var QosPlugin = /** @class */ (function (_super) {
        __extendsFn(QosPlugin, _super);
        function QosPlugin() {
            var _this = _super.call(this) || this;
            _this.identifier = "QosPlugin";
            _this.version = '3.1.1';
            var _cvPlugin;
            var _outgoingQosEvent;
            var _incomingQosEvent;
            var _metaTags = { market: "", serverImpressionGuid: "" };
            var theConfig = {};
            _outgoingQosEvent = new OutgoingQosEvent();
            _incomingQosEvent = new IncomingQosEvent();
            dynamicProto(QosPlugin, _this, function (_self, _base) {
                function _mergeConfig(overrideConfig) {
                    var defaultConfig = {
                        enableCorsCorrelation: false,
                        correlationHeaderExcludedDomains: [],
                        correlationHeaderExcludePatterns: null,
                        disableCorrelationHeaders: false,
                        maxAjaxCallsPerView: -1,
                        disableAjaxTracking: false,
                        disableFetchTracking: false,
                        enableCvHeaders: false,
                        appId: undefined,
                        callback: {
                            pageName: null,
                            id: null
                        },
                        autoCapture: {
                            msTags: true
                        },
                        coreData: {
                            requestUri: "",
                            pageName: ""
                        }
                    };
                    var attributesThatAreObjectsInConfig = [];
                    objForEachKey(defaultConfig, function (attribute, value) {
                        if (value && isObject(value)) {
                            attributesThatAreObjectsInConfig.push(attribute);
                        }
                    });
                    _removeNonObjectsAndInvalidElements(overrideConfig, attributesThatAreObjectsInConfig);
                    return extend(true, defaultConfig, overrideConfig);
                }
                _self.includeCorrelationHeaders = function (ajaxData, input, init, xhr) {
                    var dependencyRequest = _base.includeCorrelationHeaders(ajaxData, input, init, xhr);
                    if (theConfig.enableCvHeaders) {
                        var cv = _self.getCv();
                        if (cv && (input || xhr)) {
                            cv.increment();
                            var cvValue = cv.getValue();
                            if (input) {
                                if (!dependencyRequest) {
                                    dependencyRequest = init || {};
                                }
                                if (!dependencyRequest.headers || !isFunction(dependencyRequest.headers.append)) {
                                    dependencyRequest.headers = new Headers(dependencyRequest.headers || (input instanceof Request ? (input.headers || {}) : {}));
                                }
                                dependencyRequest.headers.append(MS_CV, cvValue);
                            }
                            else {
                                dependencyRequest.setRequestHeader(MS_CV, cvValue);
                            }
                        }
                    }
                    return dependencyRequest;
                };
                _self.initialize = function (coreConfig, core, extensions) {
                    var extConfig = coreConfig.extensionConfig = coreConfig.extensionConfig || [];
                    extConfig[_self.identifier] = extConfig[_self.identifier] || {};
                    theConfig = _self._qosConfig = _mergeConfig(extConfig[_self.identifier]);
                    if (isUndefined(theConfig[cfgDistributedTracingMode])) {
                        theConfig[cfgDistributedTracingMode] = 0;
                    }
                    extConfig[AjaxMonitor.identifier] = theConfig;
                    _base.initialize(coreConfig, core, extensions);
                    var metaTags = _collectMetaTags(_self._qosConfig);
                    _metaTags.market = _getMetaData(metaTags, theConfig.coreData, "market");
                    _metaTags.serverImpressionGuid = _getMetaData(metaTags, theConfig.coreData, "serverImpressionGuid");
                    var correlationVectorExtension = null;
                    var webAnalyticsExtension = null;
                    for (var i = 0; i < extensions.length; i++) {
                        if ((extensions[i]).identifier === "CorrelationVectorPlugin") {
                            correlationVectorExtension = extensions[i];
                        }
                        else if ((extensions[i]).identifier === "WebAnalyticsPlugin") {
                            webAnalyticsExtension = extensions[i];
                        }
                    }
                    if (webAnalyticsExtension && webAnalyticsExtension.id) {
                        _self.id = webAnalyticsExtension.id;
                    }
                    else {
                        _self.id = new Id();
                    }
                    if (theConfig.enableCvHeaders) {
                        if (correlationVectorExtension) {
                            theConfig.enableCvHeaders = true;
                            _cvPlugin = correlationVectorExtension;
                        }
                        else {
                            _self.diagLog().throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.CVPluginNotAvailable, "Enable cV headers it is set to \"true\" in config.  However, cv plugin is not available. Disabling adding Cv in dependency requests ");
                            theConfig.enableCvHeaders = false;
                        }
                    }
                };
                _self.processTelemetry = function (evt, itemCtx) {
                    setProcessTelemetryTimings(evt, _self.identifier);
                    var event = evt;
                    switch (event.baseType) {
                        case RemoteDependencyData.dataType:
                            if (event.name !== "Ms.Qos.OutgoingServiceRequest") {
                                event.name = "Ms.Web.OutgoingRequest";
                                event.baseData = event.baseData || {};
                                event.baseData.properties = event.baseData.properties || {};
                                event.baseData.properties["parentId"] = event.baseData.properties["parentId"] || _self.id.getLastPageViewId();
                                delete (event.baseData["method"]);
                            }
                            event.latency = EventLatency.Normal;
                            break;
                    }
                    _self.processNext(event, itemCtx);
                };
                _self.trackDependencyData = function (dependency, properties) {
                    _self.trackDependencyDataInternal(dependency, properties);
                };
                _self.trackDependencyDataInternal = function (dependency, properties, systemProperties) {
                    var ext = systemProperties || {};
                    if (isValueAssigned(dependency.cV)) {
                        ext["mscv"] = {};
                        ext["mscv"]["cV"] = dependency.cV;
                    }
                    dependency.id = theConfig.callback && theConfig.callback.id ? theConfig.callback.id() : createGuid();
                    properties = properties || {};
                    properties.pageName = isValueAssigned(properties.pageName) ? properties.pageName : _getPageName(_self._qosConfig);
                    properties.uri = isValueAssigned(properties.uri) ? properties.uri : _getUri(_self._qosConfig);
                    properties.market = isValueAssigned(properties.market) ? properties.market : _metaTags.market;
                    properties.serverImpressionGuid = isValueAssigned(properties.serverImpressionGuid) ? properties.serverImpressionGuid : _metaTags.serverImpressionGuid;
                    _base.trackDependencyDataInternal(dependency, properties, ext);
                };
                function _trackServiceQos(event, customProperties) {
                    _addCustomProperties(event, customProperties);
                    _self.core.track(event);
                }
                _self.trackServiceOutgoingQos = function (eventData, customProperties) {
                    var event = {
                        name: "Ms.Qos.OutgoingServiceRequest",
                        baseType: "RemoteDependencyData",
                        ext: {},
                        baseData: {},
                        data: {},
                        latency: EventLatency.RealTime
                    };
                    _outgoingQosEvent._setQosProperties(event, eventData);
                    _addCustomProperties(event, customProperties);
                    _trackServiceQos(event);
                };
                _self.trackServiceIncomingQos = function (eventData, customProperties) {
                    var event = {
                        name: "Ms.Qos.IncomingServiceRequest",
                        baseType: "RequestData",
                        ext: {},
                        baseData: {},
                        data: {},
                        latency: EventLatency.RealTime
                    };
                    _incomingQosEvent._setQosProperties(event, eventData);
                    _addCustomProperties(event, customProperties);
                    _trackServiceQos(event);
                };
                _self.getCv = function () {
                    if (_cvPlugin) {
                        return _cvPlugin.getCv();
                    }
                    return null;
                };
                function _addCustomProperties(event, customProperties) {
                    if (isValueAssigned(customProperties)) {
                        objForEachKey(customProperties, function (prop, value) {
                            event.data[prop] = value;
                        });
                    }
                }
            });
            return _this;
        }
        return QosPlugin;
    }(AjaxMonitor));

    /*!
     * 1DS JS SDK cV plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var CvConstant = /** @class */ (function () {
        function CvConstant() {
        }
        return CvConstant;
    }());
    var Cv$1 = /** @class */ (function () {
        function Cv(initValue, core) {
            this._base = "";
            this._currentElement = 0;
            this._base64CharSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            this._cv1Constants = new CvConstant();
            this._cv2Constants = new CvConstant();
            this._cvVersionAtLatestValidityCheck = 2;
            this._traceLogger = safeGetLogger(core);
            this._cv1Constants.maxCorrelationVectorLength = 63;
            this._cv1Constants.baseLength = 16;
            this._cv1Constants.validationPattern = new RegExp("^[" + this._base64CharSet + "]{" + this._cv1Constants.baseLength.toString() + "}(\.[0-9]+)*$");
            this._cv2Constants.maxCorrelationVectorLength = 127;
            this._cv2Constants.baseLength = 22;
            this._cv2Constants.validationPattern = new RegExp("^[" + this._base64CharSet + "]{" + this._cv2Constants.baseLength.toString() + "}(\.[0-9]+)*$");
            this._currentCvConstants = this._cv2Constants;
            this.init(initValue);
        }
        Cv.prototype.isInit = function () {
            return this.isValid(this.storedCv());
        };
        Cv.prototype.storedCv = function () {
            return this._base.concat(".", this._currentElement.toString());
        };
        Cv.prototype.getValue = function () {
            var value = this.storedCv();
            if (this.isValid(value)) {
                return value;
            }
        };
        Cv.prototype.getRelatedCv = function () {
            return this._relatedCv;
        };
        Cv.prototype.incrementExternal = function (externalCv) {
            if (this.isValid(externalCv)) {
                var externalCvParts = externalCv.split(".");
                var numberOfCvParts = externalCvParts.length;
                externalCvParts[numberOfCvParts - 1] = (parseInt(externalCvParts[numberOfCvParts - 1], 10) + 1).toString();
                var incrementedCv = "";
                for (var i = 0; i < numberOfCvParts; i++) {
                    incrementedCv += (externalCvParts[i]);
                    if (i < (numberOfCvParts - 1)) {
                        incrementedCv += ".";
                    }
                }
                var maxLength = (externalCvParts[0].length === this._cv2Constants.baseLength) ?
                    this._cv2Constants.maxCorrelationVectorLength : this._cv1Constants.maxCorrelationVectorLength;
                if (incrementedCv.length <= maxLength) {
                    return incrementedCv;
                }
            }
        };
        Cv.prototype.canExtend = function () {
            var currentCv = this.storedCv();
            if (this.isValid(currentCv)) {
                return this._isLeqThanMaxCorrelationVectorLength(currentCv.length + 2);
            }
            return false;
        };
        Cv.prototype.canIncrement = function () {
            if (this.isValid(this.storedCv())) {
                return this._isLeqThanMaxCorrelationVectorLength(this._base.length + 1 + ((this._currentElement + 1) + "").length);
            }
            return false;
        };
        Cv.prototype.setValue = function (_base) {
            if (this.isValid(_base)) {
                var lastIndex = _base.lastIndexOf(".");
                if (lastIndex > 1) {
                    this._base = _base.substr(0, lastIndex);
                    this._currentElement = parseInt(_base.substr(lastIndex + 1), 10);
                }
                else {
                    this._base = _base;
                    this._currentElement = 0;
                }
                return true;
            }
            else {
                this._traceLogger.throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.InvalidCorrelationValue, "Cannot set invalid correlation vector value");
                return false;
            }
        };
        Cv.prototype.setValueLegacy = function (cv) {
            this.setValue(cv);
            return this.getValue();
        };
        Cv.prototype.seed = function () {
            var result = "";
            for (var i = 0; i < this._currentCvConstants.baseLength; i++) {
                result += this._base64CharSet.charAt(Math.floor(Math.random() * this._base64CharSet.length));
            }
            return result;
        };
        Cv.prototype.extend = function () {
            if (this.canExtend()) {
                this._base = this._base.concat(".", this._currentElement.toString());
                this._currentElement = 0;
                return this.storedCv();
            }
        };
        Cv.prototype.increment = function () {
            if (this.canIncrement()) {
                this._currentElement = this._currentElement + 1;
                return this.storedCv();
            }
        };
        Cv.prototype.validateWithCv1 = function (_cv) {
            if (this._cv1Constants.validationPattern.test(_cv) && _cv.length <= this._cv1Constants.maxCorrelationVectorLength) {
                return true;
            }
        };
        Cv.prototype.validateWithCv2 = function (_cv) {
            if (this._cv2Constants.validationPattern.test(_cv) && _cv.length <= this._cv2Constants.maxCorrelationVectorLength) {
                return true;
            }
        };
        Cv.prototype.useCv1 = function () {
            this._currentCvConstants = this._cv1Constants;
        };
        Cv.prototype.useCv2 = function () {
            this._currentCvConstants = this._cv2Constants;
        };
        Cv.prototype.isValid = function (_cv) {
            if (_cv) {
                var baseValue = _cv.split(".")[0];
                if (baseValue) {
                    if (baseValue.length === 16) {
                        this._cvVersionAtLatestValidityCheck = 1;
                        return this.validateWithCv1(_cv);
                    }
                    else if (baseValue.length === 22) {
                        this._cvVersionAtLatestValidityCheck = 2;
                        return this.validateWithCv2(_cv);
                    }
                }
            }
        };
        Cv.prototype.init = function (cvInitValue) {
            if (cvInitValue) {
                this.setValue(cvInitValue);
            }
            else {
                this._base = this.seed();
                this._currentElement = 0;
            }
            return this.getValue();
        };
        Cv.prototype.initLegacy = function (cvInitValue) {
            return this.init(cvInitValue);
        };
        Cv.prototype._isLeqThanMaxCorrelationVectorLength = function (length) {
            if (this._cvVersionAtLatestValidityCheck === 1) {
                return length <= this._cv1Constants.maxCorrelationVectorLength;
            }
            else {
                return length <= this._cv2Constants.maxCorrelationVectorLength;
            }
        };
        return Cv;
    }());

    /*!
     * 1DS JS SDK cV plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var CorrelationVectorPlugin = /** @class */ (function (_super) {
        __extendsFn(CorrelationVectorPlugin, _super);
        function CorrelationVectorPlugin(cvInitialValue) {
            var _this = _super.call(this) || this;
            _this.identifier = "CorrelationVectorPlugin";
            _this.priority = 159;
            _this.version = '3.1.1';
            _this._cvInitialValue = cvInitialValue;
            _this._cv = _this._cvInitialValue ? new Cv$1(_this._cvInitialValue) : new Cv$1();
            return _this;
        }
        CorrelationVectorPlugin.prototype.initialize = function (coreConfig, core, extensions) {
            _super.prototype.initialize.call(this, coreConfig, core, extensions);
        };
        CorrelationVectorPlugin.prototype.processTelemetry = function (event, itemCtx) {
            setProcessTelemetryTimings(event, this.identifier);
            event.ext = event.ext || {};
            event.ext["mscv"] = event.ext["mscv"] || {};
            if (!event.ext["mscv"]["cV"]) {
                if (this._cv && this._cv.isInit()) {
                    event.ext["mscv"]["cV"] = this._cv.getValue();
                }
            }
            this.processNext(event, itemCtx);
        };
        CorrelationVectorPlugin.prototype.getCv = function () {
            if (!this._cv) {
                this.diagLog().throwInternal(LoggingSeverity.WARNING, _ExtendedInternalMessageId.FailedToInitializeCorrelationVector, "Correlation Vector has not been initialized.");
            }
            return this._cv;
        };
        return CorrelationVectorPlugin;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JS SDK Authentication plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var AuthType = {
        NONE: 1,
        MSA: 1,
        AAD: 2
    };

    /*!
     * 1DS JS SDK Authentication plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _getResponseText(xhr) {
        try {
            return xhr.responseText;
        }
        catch (e) {
        }
        return "";
    }
    var RequestHandler = /** @class */ (function () {
        function RequestHandler() {
        }
        RequestHandler.prototype.makeRequest = function (urlString, data, method, oncomplete) {
            var _a;
            var _this = this;
            if (useXDomainRequest()) {
                var xdr_1 = new XDomainRequest();
                xdr_1.open(method, urlString);
                xdr_1.onload = function () {
                    oncomplete(200, _getResponseText(xdr_1), {});
                };
                xdr_1.onerror = function () {
                    oncomplete(400, _getResponseText(xdr_1), {});
                };
                xdr_1.ontimeout = function () {
                    oncomplete(500, _getResponseText(xdr_1), {});
                };
                xdr_1.send(data);
            }
            else if (isReactNative()) {
                fetch(urlString, (_a = {
                        body: data,
                        method: method,
                        credentials: "include"
                    },
                    _a[DisabledPropertyName$1] = true,
                    _a)).then(function (response) {
                    var headerMap = {};
                    if (response.headers) {
                        response.headers.forEach(function (value, name) {
                            headerMap[name] = value;
                        });
                    }
                    oncomplete(response.status, JSON.stringify(response.json()), headerMap);
                })["catch"](function (error) {
                    oncomplete(0, error, {});
                });
            }
            else if (typeof XMLHttpRequest !== "undefined") {
                var xhr_1 = new XMLHttpRequest();
                try {
                    xhr_1[DisabledPropertyName$1] = true;
                }
                catch (e) {
                }
                xhr_1.withCredentials = true;
                xhr_1.open(method, urlString);
                xhr_1.onload = function () {
                    oncomplete(xhr_1.status, _getResponseText(xhr_1), _this._convertAllHeadersToMap(xhr_1.getAllResponseHeaders()));
                };
                xhr_1.onerror = function () {
                    oncomplete(xhr_1.status, _getResponseText(xhr_1), _this._convertAllHeadersToMap(xhr_1.getAllResponseHeaders()));
                };
                xhr_1.ontimeout = function () {
                    oncomplete(xhr_1.status, _getResponseText(xhr_1), _this._convertAllHeadersToMap(xhr_1.getAllResponseHeaders()));
                };
                xhr_1.send(data);
            }
        };
        RequestHandler.prototype._convertAllHeadersToMap = function (headersString) {
            var headers = {};
            if (headersString) {
                var headersArray = headersString.split("\n");
                for (var i = 0; i < headersArray.length; ++i) {
                    var header = headersArray[i].split(": ");
                    headers[header[0]] = header[1];
                }
            }
            return headers;
        };
        return RequestHandler;
    }());

    /*!
     * 1DS JS SDK Authentication plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var WebAuthHandler = /** @class */ (function () {
        function WebAuthHandler(endpointUrl, authType, logger) {
            this._endpointUrl = "";
            var authTypeResource = "";
            switch (authType) {
                case AuthType.AAD:
                    authTypeResource = "aad.js";
                    break;
                case AuthType.MSA:
                    authTypeResource = "msa.js";
                    break;
            }
            this._logger = logger;
            this._endpointUrl = endpointUrl;
            this._getLoginUrlPath = this._endpointUrl + "auth/GetLoginUrl/" + authTypeResource;
            this._signOutPath = this._endpointUrl + "auth/SignOut/" + authTypeResource;
            this._requestHandler = new RequestHandler();
        }
        WebAuthHandler.prototype.startAuthHandshake = function () {
            var _this = this;
            this._requestHandler.makeRequest(this._getLoginUrlPath, "", "GET", function (status, responseBody, headers) {
                try {
                    var json = JSON.parse(responseBody);
                    var loginUrl = json.webResult.authLoginUrl;
                    var doc = getDocument();
                    if (doc) {
                        var loginIframe = doc.createElement("iframe");
                        var randomNumber = Math.floor(Math.random() * Math.floor(10000));
                        loginIframe.id = "telframe" + randomNumber;
                        loginIframe.style.display = "none";
                        loginIframe.src = loginUrl;
                        doc.body.appendChild(loginIframe);
                        _this._loginIframeId = loginIframe.id;
                    }
                }
                catch (e) {
                    _this._logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.AuthHandShakeError, "Error with auth handshake process: " + e);
                }
            });
        };
        WebAuthHandler.prototype.cleanAuthIFrame = function () {
            var doc = getDocument();
            if (doc) {
                var authIframe = doc.getElementById(this._loginIframeId);
                if (authIframe) {
                    doc.body.removeChild(authIframe);
                }
            }
        };
        WebAuthHandler.prototype.signOutAndClearCookies = function () {
            this._requestHandler.makeRequest(this._signOutPath, "", "POST", function (status, responseBody, headers) {
            });
        };
        return WebAuthHandler;
    }());

    /*!
     * 1DS JS SDK Authentication plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var bouncedAuthCookieName = "authBounced";
    var aadloginUrl = "https://login.microsoftonline.com";
    var defaultHandShakeTimeoutMS = 5000;
    var AuthPlugin = /** @class */ (function (_super) {
        __extendsFn(AuthPlugin, _super);
        function AuthPlugin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.identifier = "AuthPlugin";
            _this.priority = 190;
            _this.version = '3.1.1';
            _this._eventQueue = [];
            return _this;
        }
        AuthPlugin.prototype.initialize = function (coreConfig, core, extensions) {
            var _this = this;
            _super.prototype.initialize.call(this, coreConfig, core, extensions);
            this._getTelCtx();
            var identifier = this.identifier;
            var extConfig = coreConfig.extensionConfig[identifier] || {};
            coreConfig.extensionConfig[identifier] = extConfig;
            this._handshakeInProgress = false;
            this._authHandhshakeTimeoutMs = extConfig.handShakeTimeoutMs ? extConfig.handShakeTimeoutMs : defaultHandShakeTimeoutMS;
            var endpointUrl = extConfig.overrideAuthEndpointUrl ? extConfig.overrideAuthEndpointUrl : coreConfig.endpointUrl;
            var extCore = core;
            this._authHandler = new WebAuthHandler(endpointUrl, extConfig.authType, this.diagLog());
            var existingGetWParamMethod = extCore.getWParam;
            extCore.getWParam = function () {
                var wparam = 0;
                wparam = extConfig.authType === AuthType.MSA ? wparam | 8 : wparam | 16;
                return wparam | (existingGetWParamMethod ? existingGetWParamMethod() : 0);
            };
            addPageUnloadEventListener(function () { _this._releaseEventQueue(); });
            var win = getWindow();
            if (win) {
                attachEvent(win, "message", function (msg) { _this._receiveMessage(msg, endpointUrl); });
            }
        };
        AuthPlugin.prototype.processTelemetry = function (event, itemCtx) {
            var _this = this;
            itemCtx = this._getTelCtx(itemCtx);
            var config = itemCtx.getExtCfg(this.identifier);
            setProcessTelemetryTimings(event, this.identifier);
            if (config.loggedInStatusCallback && config.loggedInStatusCallback() === true) {
                var cookieMgr = safeGetCookieMgr(this.core);
                var authBounced = getCookieValue(cookieMgr, bouncedAuthCookieName);
                if (!authBounced) {
                    var halfHour = 30 * 60;
                    cookieMgr.set(bouncedAuthCookieName, toISOString(new Date()), halfHour);
                    this._handshakeInProgress = true;
                    this._authHandhshakeTimeout = setTimeout(function () { _this._completeAuthHandshake(); }, this._authHandhshakeTimeoutMs);
                    this._authHandler.startAuthHandshake();
                }
            }
            if (this._handshakeInProgress) {
                this._eventQueue.push({
                    ctx: itemCtx,
                    item: event
                });
            }
            else {
                this.processNext(event, itemCtx);
            }
        };
        AuthPlugin.prototype.signOut = function () {
            this._authHandler.signOutAndClearCookies();
        };
        AuthPlugin.prototype._receiveMessage = function (event, endpointUrl) {
            var doc = getDocument();
            if (doc) {
                var a = doc.createElement("a");
                a.href = endpointUrl;
                var endpointOrigin = a.protocol + "//" + a.hostname;
                if (event.origin === endpointOrigin || event.origin === aadloginUrl) {
                    if (event.data) {
                        try {
                            this._completeAuthHandshake();
                        }
                        catch (e) {
                            this.diagLog().throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.AuthRedirectFail, "Error receiving auth redirect message: " + e);
                        }
                    }
                }
            }
        };
        AuthPlugin.prototype._completeAuthHandshake = function () {
            clearTimeout(this._authHandhshakeTimeout);
            this._authHandler.cleanAuthIFrame();
            this._handshakeInProgress = false;
            this._releaseEventQueue();
        };
        AuthPlugin.prototype._releaseEventQueue = function () {
            arrForEach(this._eventQueue, function (evt) {
                evt.ctx.processNext(evt.item);
            });
            this._eventQueue = [];
        };
        return AuthPlugin;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JS SDK ID Sync plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function _getAnid(cookieMgr, webResult) {
        if (webResult && isValueAssigned(webResult.anid)) {
            return webResult.anid;
        }
        return getCookieValue(cookieMgr, "ANON").slice(0, 34);
    }
    var Ix$1 = /** @class */ (function () {
        function Ix(_config, core) {
            this._config = _config;
            this.core = core;
            this.isEnabled = false;
            this.isSyncDone = false;
            this.isEnabled = this._config.adobe || this._config.google;
            this._cookieMgr = safeGetCookieMgr(core);
        }
        Ix.prototype.idSync = function (responseText) {
            try {
                if (this.isEnabled && !this.isSyncDone && responseText) {
                    var response = JSON.parse(responseText);
                    if (isValueAssigned(response.webResult)) {
                        if (this._config.adobe === true) {
                            var anid = _getAnid(this._cookieMgr, response.webResult);
                            if (isValueAssigned(response.webResult.mc1) || isValueAssigned(anid)) {
                                var requestSrc = this._getAdobeUrl(response.webResult.mc1, anid);
                                if (typeof XMLHttpRequest !== "undefined") {
                                    var request = new XMLHttpRequest();
                                    request.open("GET", requestSrc, true);
                                    request.setRequestHeader("Accept", "application/json; charset=utf-8");
                                    request.send();
                                }
                            }
                        }
                        if (this._config.google === true) {
                            if (isValueAssigned(response.webResult.mc1)) {
                                var requestSrc = this._getGoogleUrl(response.webResult.mc1);
                                var newImage = new Image();
                                newImage.src = requestSrc;
                            }
                        }
                        this.isSyncDone = true;
                    }
                }
            }
            catch (ex) {
            }
        };
        Ix.prototype._getAdobeUrl = function (mc1, anid) {
            var mc1IdKey = "88170%01";
            var anidKey = "88169%01";
            var qpSeparation = "%01";
            var versionAndSuffix = "&d_ver=2";
            var authStatus = "%010";
            var url = "https://dpm.demdex.net/id?d_orgid=EA76ADE95776D2EC7F000101@AdobeOrg&d_cid=";
            if (isValueAssigned(mc1)) {
                url += mc1IdKey + mc1 + authStatus;
            }
            if (isValueAssigned(anid)) {
                if (isValueAssigned(mc1)) {
                    url += qpSeparation;
                }
                url += anidKey + anid + authStatus;
            }
            url += versionAndSuffix;
            return url;
        };
        Ix.prototype._getGoogleUrl = function (mc1) {
            return "https://ad.doubleclick.net/ddm/activity/src=6952136;type=store0;cat=oneds;u58=" +
                mc1 + ";match_id=" + mc1 + ";dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;ord=1?";
        };
        return Ix;
    }());

    /*!
     * 1DS JS SDK ID Sync plugin, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var IdSyncPlugin = /** @class */ (function (_super) {
        __extendsFn(IdSyncPlugin, _super);
        function IdSyncPlugin() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.identifier = "IdSyncPlugin";
            _this.version = '3.1.1';
            return _this;
        }
        IdSyncPlugin.prototype.initialize = function (coreConfig, core, extensions) {
            var _this = this;
            var identifier = this.identifier;
            var extConfig = coreConfig.extensionConfig[identifier] || {};
            coreConfig.extensionConfig[identifier] = extConfig;
            var postChannel = null;
            if (coreConfig.channels) {
                for (var i = 0; i < coreConfig.channels.length; i++) {
                    if (coreConfig.channels[i]) {
                        for (var j = 0; j < coreConfig.channels[i].length; j++) {
                            var channel = coreConfig.channels[i][j];
                            if (channel.identifier === "PostChannel") {
                                postChannel = coreConfig.channels[i][j];
                                break;
                            }
                        }
                    }
                }
            }
            if (!postChannel) {
                for (var i = 0; i < extensions.length; i++) {
                    if ((extensions[i]).identifier === "PostChannel") {
                        postChannel = extensions[i];
                        break;
                    }
                }
            }
            if (postChannel) {
                this._ix = new Ix$1(extConfig, core);
                postChannel.addResponseHandler(function (response) { _this._ix.idSync(response); });
            }
        };
        IdSyncPlugin.prototype.processTelemetry = function (evt, itemCtx) {
            this.processNext(evt, itemCtx);
        };
        return IdSyncPlugin;
    }(BaseTelemetryPlugin));

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ApplicationInsights = /** @class */ (function (_super) {
        __extendsFn(ApplicationInsights, _super);
        function ApplicationInsights() {
            var _this = _super.call(this) || this;
            _this._postChannel = new PostChannel();
            _this._propertyManager = new PropertiesPlugin();
            _this._webAnalytics = new ApplicationInsights$1();
            _this._qosPlugin = new QosPlugin();
            _this._cvPlugin = new CorrelationVectorPlugin();
            _this._authPlugin = new AuthPlugin();
            _this._idSyncPlugin = new IdSyncPlugin();
            return _this;
        }
        ApplicationInsights.prototype.initialize = function (config, extensions) {
            var _self = this;
            _self._config = config;
            var plugins = [_self._propertyManager, _self._webAnalytics, _self._qosPlugin, _self._cvPlugin];
            if (_self._config.jsllConfiguration && _self._config.jsllConfiguration.shareAuthStatus) {
                plugins = plugins.concat(_self._authPlugin);
            }
            if (_self._config.jsllConfiguration && _self._config.jsllConfiguration.ix) {
                plugins = plugins.concat(_self._idSyncPlugin);
            }
            if (extensions) {
                plugins = plugins.concat(extensions);
            }
            if (config.channels && config.channels.length > 0) {
                var postFound = false;
                for (var j = 0; j < config.channels[0].length; j++) {
                    if (config.channels[0][j].identifier === _self._postChannel.identifier) {
                        postFound = true;
                        break;
                    }
                }
                if (!postFound) {
                    config.channels[0].push(_self._postChannel);
                }
            }
            else {
                config.channels = [[_self._postChannel]];
            }
            _self.initializeConfigurations();
            try {
                _super.prototype.initialize.call(this, config, plugins);
                if (_self._config.jsllConfiguration) {
                    if (_self._config.jsllConfiguration.coreData && isValueAssigned(_self._config.jsllConfiguration.coreData.appId)) {
                        _self._propertyManager.getPropertiesContext().app.id = _self._config.jsllConfiguration.coreData.appId;
                    }
                    if (isValueAssigned(_self._config.jsllConfiguration.logLevel)) {
                        _self.logger.consoleLoggingLevel = function () { return _self._config.jsllConfiguration.logLevel; };
                    }
                }
            }
            catch (error) {
                _self.logger.throwInternal(LoggingSeverity.CRITICAL, _ExtendedInternalMessageId.FailedToInitializeSDK, "Failed to initialize SDK." + error);
            }
        };
        ApplicationInsights.prototype.getPropertyManager = function () {
            return this._propertyManager;
        };
        ApplicationInsights.prototype.getPropertyManagerConfig = function () {
            var extConfig = this._config.extensionConfig || [];
            return extConfig[this._propertyManager.identifier];
        };
        ApplicationInsights.prototype.getPostChannel = function () {
            return this._postChannel;
        };
        ApplicationInsights.prototype.getPostChannelConfig = function () {
            var extConfig = this._config.extensionConfig || [];
            return extConfig[this._postChannel.identifier];
        };
        ApplicationInsights.prototype.getWebAnalyticsExtension = function () {
            return this._webAnalytics;
        };
        ApplicationInsights.prototype.getWebAnalyticsExtensionConfig = function () {
            var extConfig = this._config.extensionConfig || [];
            return extConfig[this._webAnalytics.identifier];
        };
        ApplicationInsights.prototype.getQosExtension = function () {
            return this._qosPlugin;
        };
        ApplicationInsights.prototype.getQosExtensionConfig = function () {
            var extConfig = this._config.extensionConfig || [];
            return extConfig[this._qosPlugin.identifier];
        };
        ApplicationInsights.prototype.getAuthExtension = function () {
            return this._authPlugin;
        };
        ApplicationInsights.prototype.getCvExtension = function () {
            return this._cvPlugin;
        };
        ApplicationInsights.prototype.getIdSyncExtension = function () {
            return this._idSyncPlugin;
        };
        ApplicationInsights.prototype.initializeConfigurations = function () {
            var _self = this;
            var extConfig = _self._config.extensionConfig = _self._config.extensionConfig || [];
            extConfig[_self._qosPlugin.identifier] = _self._config.qosConfiguration || {};
            extConfig[_self._postChannel.identifier] = _self._config.channelConfiguration || {};
            var propertiesConfig = extConfig[_self._propertyManager.identifier] = _self._config.propertyConfiguration || {};
            var webAnalyticsConfig = extConfig[_self._webAnalytics.identifier] = _self._config.webAnalyticsConfiguration || {};
            var qosConfig = extConfig[_self._qosPlugin.identifier] = _self._config.qosConfiguration || {};
            extConfig[_self._idSyncPlugin.identifier] = _self._config.idSyncConfiguration || {};
            var authConfig = extConfig[_self._authPlugin.identifier] = _self._config.authConfiguration || { authType: 2, loggedInStatusCallback: function () { return false; } };
            var jsllConfig = _self._config.jsllConfiguration;
            if (jsllConfig) {
                _self._config.endpointUrl = jsllConfig.endpoint;
                qosConfig.disableAjaxTracking = !jsllConfig.enableAjaxTracking;
                qosConfig.disableFetchTracking = !jsllConfig.enableFetchTracking;
                if (jsllConfig.autoCapture) {
                    webAnalyticsConfig.autoCapture = webAnalyticsConfig.autoCapture || {};
                    webAnalyticsConfig.autoCapture.click = jsllConfig.autoCapture.click;
                    webAnalyticsConfig.autoCapture.jsError = jsllConfig.autoCapture.jsError;
                    webAnalyticsConfig.autoCapture.lineage = jsllConfig.autoCapture.lineage;
                    webAnalyticsConfig.autoCapture.onLoad = jsllConfig.autoCapture.onLoad;
                    webAnalyticsConfig.autoCapture.onUnload = jsllConfig.autoCapture.onUnload;
                    webAnalyticsConfig.autoCapture.pageView = jsllConfig.autoCapture.pageView;
                    webAnalyticsConfig.autoCapture.resize = jsllConfig.autoCapture.resize;
                    webAnalyticsConfig.autoCapture.scroll = jsllConfig.autoCapture.scroll;
                    webAnalyticsConfig.autoCapture.msTags = jsllConfig.autoCapture.msTags;
                    qosConfig.autoCapture = qosConfig.autoCapture || {};
                    qosConfig.autoCapture.msTags = jsllConfig.autoCapture.msTags;
                }
                if (jsllConfig.ix) {
                    ({
                        adobe: jsllConfig.ix.a,
                        google: jsllConfig.ix.g
                    });
                }
                if (jsllConfig.coreData) {
                    webAnalyticsConfig.coreData = webAnalyticsConfig.coreData || {};
                    webAnalyticsConfig.coreData.market = jsllConfig.coreData.market;
                    webAnalyticsConfig.coreData.pageName = jsllConfig.coreData.pageName;
                    webAnalyticsConfig.coreData.pageTags = jsllConfig.coreData.pageTags;
                    webAnalyticsConfig.coreData.pageType = jsllConfig.coreData.pageType;
                    webAnalyticsConfig.coreData.product = jsllConfig.coreData.product;
                    webAnalyticsConfig.coreData.referrerUri = jsllConfig.coreData.referrerUri;
                    webAnalyticsConfig.coreData.requestUri = jsllConfig.coreData.requestUri;
                    propertiesConfig.env = jsllConfig.coreData.env;
                    propertiesConfig.expId = jsllConfig.coreData.expId;
                    propertiesConfig.serviceName = jsllConfig.coreData.serviceName;
                }
                if (jsllConfig.callback) {
                    webAnalyticsConfig.callback = webAnalyticsConfig.callback || {};
                    webAnalyticsConfig.callback.contentUpdatePageTags = jsllConfig.callback.contentUpdatePageTags;
                    webAnalyticsConfig.callback.pageActionContentTags = jsllConfig.callback.pageActionContentTags;
                    webAnalyticsConfig.callback.pageActionPageTags = jsllConfig.callback.pageActionPageTags;
                    webAnalyticsConfig.callback.pageName = jsllConfig.callback.pageName;
                    webAnalyticsConfig.callback.pageViewPageTags = jsllConfig.callback.pageViewPageTags;
                    webAnalyticsConfig.callback.signedinStatus = jsllConfig.callback.signedinStatus;
                    authConfig.loggedInStatusCallback = jsllConfig.callback.signedinStatus;
                    propertiesConfig.callback = propertiesConfig.callback || {};
                    propertiesConfig.callback.userConsentDetails = jsllConfig.callback.userConsentDetailsCallback;
                }
                if (jsllConfig.debounceMs) {
                    webAnalyticsConfig.debounceMs = webAnalyticsConfig.debounceMs || {};
                    webAnalyticsConfig.debounceMs.scroll = jsllConfig.debounceMs.scroll;
                    webAnalyticsConfig.debounceMs.resize = jsllConfig.debounceMs.resize;
                }
                webAnalyticsConfig.cookiesToCollect = jsllConfig.cookiesToCollect;
                webAnalyticsConfig.mscomCookies = jsllConfig.mscomCookies;
                webAnalyticsConfig.urlCollectHash = jsllConfig.urlCollectHash;
                webAnalyticsConfig.urlCollectQuery = jsllConfig.urlCollectQuery;
                webAnalyticsConfig.useDefaultContentName = jsllConfig.useDefaultContentName;
                webAnalyticsConfig.useShortNameForContentBlob = jsllConfig.useShortNameForContentBlob;
                webAnalyticsConfig.biBlobAttributeTag = jsllConfig.biBlobAttributeTag;
                webAnalyticsConfig.useShortNameForContentBlob = jsllConfig.useShortNameForContentBlob;
                webAnalyticsConfig.isLoggedIn = jsllConfig.isLoggedIn;
                webAnalyticsConfig.manualPageUnload = jsllConfig.manualPageUnload;
                webAnalyticsConfig.syncMuid = jsllConfig.syncMuid;
                webAnalyticsConfig.muidDomain = jsllConfig.muidDomain;
                propertiesConfig.userConsentCookieName = jsllConfig.userConsentCookieName;
                propertiesConfig.userConsented = jsllConfig.userConsented;
                webAnalyticsConfig.shareAuthStatus = jsllConfig.shareAuthStatus;
                authConfig.authType = jsllConfig.authMethod;
            }
        };
        return ApplicationInsights;
    }(AppInsightsCore));

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    function notImplementedWarn(methodName) {
        console && console.warn(methodName + ": Method not available in 1DS");
    }
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.prototype.stringifyField = function (fieldName, value) {
            notImplementedWarn("stringifyField");
        };
        Utils.prototype.getMuidHost = function (rootDomain) {
            notImplementedWarn("getMuidHost");
            return "";
        };
        Utils.prototype.isOfCorrectType = function (type, value) {
            notImplementedWarn("isOfCorrectType");
            return true;
        };
        Utils.prototype.getOs = function () {
            notImplementedWarn("getOs");
            return "";
        };
        Utils.prototype.getUserAgent = function () {
            notImplementedWarn("getUserAgent");
            return "";
        };
        Utils.prototype.extractFieldFromObject = function (obj, fieldName) {
            notImplementedWarn("extractFieldFromObject");
            return "";
        };
        Utils.prototype.extend = function (obj, obj2, obj3, obj4, obj5) {
            notImplementedWarn("extend");
        };
        Utils.prototype.isValueAssigned = function (obj) {
            notImplementedWarn("isValueAssigned");
        };
        Utils.prototype.removeNonObjectsAndInvalidElements = function (obj1, obj2) {
            notImplementedWarn("removeNonObjectsAndInvalidElements");
        };
        Utils.prototype.dateToISOString = function (date) {
            notImplementedWarn("dateToISOString");
            return "";
        };
        Utils.prototype.getAppIdWithPrefix = function (appId) {
            notImplementedWarn("getAppIdWithPrefix");
            return "";
        };
        Utils.prototype.removeInvalidElements = function (obj) {
            notImplementedWarn("removeInvalidElements");
        };
        Utils.prototype.findClosestByAttribute = function (element, attribute) {
            notImplementedWarn("findClosestByAttribute");
            return null;
        };
        Utils.prototype.findClosestAnchor = function (element) {
            notImplementedWarn("findClosestAnchor");
            return null;
        };
        Utils.prototype.returnDomObjectIfjQuery = function (obj) {
            notImplementedWarn("returnDomObjectIfjQuery");
            return null;
        };
        Utils.prototype.getPerformanceData = function () {
            notImplementedWarn("getPerformanceData");
        };
        Utils.prototype.bracketIt = function (input) {
            notImplementedWarn("bracketIt");
            return "";
        };
        Utils.prototype.getPageLoadTime = function () {
            notImplementedWarn("getPageLoadTime");
            return -1;
        };
        Utils.prototype.isElementTrulyVisible = function (element, viewportRectangle) {
            notImplementedWarn("isElementTrulyVisible");
            return false;
        };
        Utils.prototype.addPageUnloadEventListener = function (listener) {
            notImplementedWarn("addPageUnloadEventListener");
            return false;
        };
        Utils.prototype.addEventHandler = function (eventName, callback) {
            notImplementedWarn("addEventHandler");
            return false;
        };
        Utils.prototype.attachEvent = function (obj, eventNameWithoutOn, handlerRef, useCapture) {
            notImplementedWarn("attachEvent");
            return false;
        };
        return Utils;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ClickstreamTracker = /** @class */ (function () {
        function ClickstreamTracker(sku) {
            this.testHook = {};
            this._sku = sku;
        }
        ClickstreamTracker.prototype.capturePageView = function (overrideValues) {
            var overrides = {
                referrerUri: overrideValues.referrerUri,
                behavior: overrideValues.behavior,
                pageName: overrideValues.pageName,
                pageTags: overrideValues.pageTags,
                isAuto: overrideValues.isAuto
            };
            this._sku.getWebAnalyticsExtension().capturePageView(overrides);
        };
        ClickstreamTracker.prototype.captureContentUpdate = function (overrideValues) {
            var overrides = {
                content: overrideValues.content,
                isDomComplete: overrideValues.isDomComplete,
                actionType: overrideValues.actionType,
                behavior: overrideValues.behavior,
                pageName: overrideValues.pageName,
                pageTags: overrideValues.pageTags,
                isAuto: overrideValues.isAuto
            };
            this._sku.getWebAnalyticsExtension().captureContentUpdate(overrides);
        };
        ClickstreamTracker.prototype.capturePageAction = function (element, overrideValues) {
            var overrides = {
                refUri: overrideValues.referrerUri,
                actionType: overrideValues.actionType,
                targetUri: overrideValues.targetUri,
                content: overrideValues.content,
                contentTags: overrideValues.contentTags,
                behavior: overrideValues.behavior,
                pageName: overrideValues.pageName,
                pageTags: overrideValues.pageTags,
                isAuto: overrideValues.isAuto
            };
            this._sku.getWebAnalyticsExtension().capturePageAction(element, overrides);
        };
        ClickstreamTracker.prototype.captureContentPageAction = function (overrideValues) {
            this.capturePageAction(null, overrideValues);
        };
        ClickstreamTracker.prototype.captureClientError = function (error) {
            var exceptionTelemetry = {};
            exceptionTelemetry.exception = error.errorInfo;
            this._sku.getWebAnalyticsExtension().trackException(exceptionTelemetry);
        };
        ClickstreamTracker.prototype.captureQos = function (qosEvent) {
            if (qosEvent && qosEvent.data && qosEvent.data.baseData) {
                var dependencyTelemetry = {
                    id: "",
                    duration: qosEvent.data.baseData.latencyMs,
                    success: qosEvent.data.baseData.succeeded,
                    responseCode: Number(qosEvent.data.baseData.protocolStatusCode),
                    type: qosEvent.data.baseData.dependencyType,
                    target: qosEvent.data.baseData.targetUri
                };
                var customProperties_1 = {};
                objForEachKey(qosEvent.data.baseData, function (key, value) {
                    if (key !== "latencyMs" && key !== "succeeded" && key !== "protocolStatusCode" && key !== "dependencyType" && key !== "targetUri") {
                        customProperties_1[key] = value;
                    }
                });
                objForEachKey(qosEvent.data, function (key, value) {
                    if (key !== "baseData" && key !== "baseType") {
                        customProperties_1[key] = value;
                    }
                });
                this._sku.getQosExtension().trackDependencyData(dependencyTelemetry, customProperties_1);
            }
        };
        ClickstreamTracker.prototype.getUri = function (windowLocation) {
            return _getUri$1(this._sku.getWebAnalyticsExtensionConfig(), windowLocation);
        };
        ClickstreamTracker.prototype.getPageContent = function (viewportBoundingRect) {
            notImplementedWarn("getPageContent");
            return "";
        };
        ClickstreamTracker.prototype.getTimeToClick = function () {
            notImplementedWarn("getTimeToClick");
            return -1;
        };
        ClickstreamTracker.prototype.initialize = function (config) {
            notImplementedWarn("ClickstreamTracker initialize");
        };
        ClickstreamTracker.prototype.captureCorsDisallowed = function (overrideValues) {
            notImplementedWarn("captureCorsDisallowed");
        };
        ClickstreamTracker.prototype.captureEventTooLong = function (overrideValues) {
            notImplementedWarn("captureEventTooLong");
        };
        ClickstreamTracker.prototype.captureEventDrop = function (errorInfo) {
            notImplementedWarn("captureEventDrop");
        };
        ClickstreamTracker.prototype.captureSwap = function (overrideValues) {
            notImplementedWarn("captureSwap");
        };
        ClickstreamTracker.prototype.domReadyTasksWrapper = function () {
            notImplementedWarn("domReadyTasksWrapper");
        };
        ClickstreamTracker.prototype.domReadyTasks = function () {
            notImplementedWarn("domReadyTasks");
        };
        ClickstreamTracker.prototype.onDomReadyDo = function (f) {
            notImplementedWarn("onDomReadyDo");
        };
        return ClickstreamTracker;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Cookie = /** @class */ (function () {
        function Cookie() {
        }
        Cookie.prototype.getCookie = function (name, valuePrefix) {
            return getCookie(name);
        };
        Cookie.prototype.setCookie = function (name, value, days) {
            setCookie(name, value, days);
        };
        Cookie.prototype.deleteCookie = function (name) {
            deleteCookie(name);
        };
        Cookie.prototype.getCookieKeyValue = function (cookieName, keyName) {
            notImplementedWarn("getCookieKeyValue");
            return undefined;
        };
        Cookie.prototype.getAllCookies = function () {
            notImplementedWarn("getAllCookies");
            return undefined;
        };
        return Cookie;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var ErrorHandler = /** @class */ (function () {
        function ErrorHandler() {
        }
        ErrorHandler.prototype.init = function () {
            notImplementedWarn("ErrorHandler init");
        };
        return ErrorHandler;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var TimespanHandler = /** @class */ (function () {
        function TimespanHandler() {
        }
        TimespanHandler.prototype.recordTimeSpan = function (counterName, isComplete) {
            notImplementedWarn("recordTimeSpan");
            return -1;
        };
        return TimespanHandler;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Service = /** @class */ (function () {
        function Service() {
        }
        Service.prototype.get = function (requestOptions) {
            notImplementedWarn("get");
        };
        Service.prototype.post = function (requestOptions) {
            notImplementedWarn("post");
        };
        Service.prototype.put = function (requestOptions) {
            notImplementedWarn("put");
        };
        Service.prototype["delete"] = function (requestOptions) {
            notImplementedWarn("delete");
        };
        Service.prototype.patch = function (requestOptions) {
            notImplementedWarn("patch");
        };
        Service.prototype.alwaysAddCvToRequestHeader = function () {
            notImplementedWarn("alwaysAddCvToRequestHeader");
            return true;
        };
        Service.prototype.doNotChangeSupportCors = function () {
            notImplementedWarn("doNotChangeSupportCors");
            return true;
        };
        Service.prototype.setTargetUriOverride = function (targetUriOverrideStringOrCallback) {
            notImplementedWarn("setTargetUriOverride");
        };
        return Service;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Cv = /** @class */ (function () {
        function Cv(sku) {
            this._sku = sku;
        }
        Cv.prototype.isInit = function () {
            return this._sku.getCvExtension().getCv().isInit();
        };
        Cv.prototype.canExtend = function () {
            return this._sku.getCvExtension().getCv().canExtend();
        };
        Cv.prototype.canIncrement = function () {
            return this._sku.getCvExtension().getCv().canIncrement();
        };
        Cv.prototype.isValid = function (cv) {
            return this._sku.getCvExtension().getCv().isValid(cv);
        };
        Cv.prototype.getValue = function () {
            return this._sku.getCvExtension().getCv().getValue();
        };
        Cv.prototype.setValue = function (cv) {
            this._sku.getCvExtension().getCv().setValueLegacy(cv);
        };
        Cv.prototype.init = function (seedValue) {
            return this._sku.getCvExtension().getCv().initLegacy(seedValue);
        };
        Cv.prototype.extend = function () {
            return this._sku.getCvExtension().getCv().extend();
        };
        Cv.prototype.increment = function () {
            return this._sku.getCvExtension().getCv().increment();
        };
        Cv.prototype.incrementExternal = function (externalCv) {
            return this._sku.getCvExtension().getCv().incrementExternal(externalCv);
        };
        Cv.prototype.useCv1 = function () {
            this._sku.getCvExtension().getCv().useCv1();
        };
        Cv.prototype.useCv2 = function () {
            this._sku.getCvExtension().getCv().useCv2();
        };
        return Cv;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Ids = /** @class */ (function () {
        function Ids(sku) {
            this._sku = sku;
        }
        Ids.prototype.getVisitorId = function () {
            return this._sku.getPropertyManager().getPropertiesContext().user.localId;
        };
        Ids.prototype.getMuidUserId = function (allCookies) {
            var muid = this._sku.getPropertyManager().getPropertiesContext().user.localId;
            return isValueAssigned(muid) ? "t:" + muid : "";
        };
        Ids.prototype.setDeviceClass = function (deviceClass) {
            this._sku.getPropertyManager().getPropertiesContext().device.deviceClass = deviceClass;
        };
        Ids.prototype.getDeviceClass = function () {
            return this._sku.getPropertyManager().getPropertiesContext().device.deviceClass;
        };
        Ids.prototype.setAppUserId = function (userId) {
            notImplementedWarn("setAppUserId");
        };
        Ids.prototype.getAppUserId = function () {
            notImplementedWarn("getAppUserId");
            return "";
        };
        Ids.prototype.readExpIdFromCookie = function (allCookies) {
            notImplementedWarn("readExpIdFromCookie");
            return "";
        };
        Ids.prototype.getImpressionGuid = function () {
            notImplementedWarn("getImpressionGuid");
            return "";
        };
        Ids.prototype.getGroups = function () {
            notImplementedWarn("getGroups");
            return "";
        };
        Ids.prototype.setExpIdCookieName = function (name) {
            notImplementedWarn("setExpIdCookieName");
            return "";
        };
        Ids.prototype.readExpIdFromCoreData = function (expId) {
            notImplementedWarn("readExpIdFromCoreData");
            return "";
        };
        Ids.prototype.getPageViewImpressionGuid = function () {
            notImplementedWarn("getPageViewImpressionGuid");
            return "";
        };
        return Ids;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Ix = /** @class */ (function () {
        function Ix() {
            this.testHook = {};
        }
        Ix.prototype.init = function (config) {
            notImplementedWarn("Ix init");
        };
        Ix.prototype.set = function (ids) {
            notImplementedWarn("Ix set");
        };
        return Ix;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var Logger = /** @class */ (function () {
        function Logger(sku) {
            this._sku = sku;
        }
        Logger.prototype.logError = function (message) {
            this._sku.logger.warnToConsole(message);
        };
        Logger.prototype.logWarning = function (message) {
            this._sku.logger.warnToConsole(message);
        };
        Logger.prototype.logInformation = function (message) {
            this._sku.logger.warnToConsole(message);
        };
        return Logger;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var VortexEvents = /** @class */ (function () {
        function VortexEvents() {
        }
        VortexEvents.prototype.sendError = function (errorInfo, displayedToUser) {
            notImplementedWarn("sendError");
        };
        VortexEvents.prototype.sendApiComplete = function (eventData) {
            notImplementedWarn("sendApiComplete");
        };
        VortexEvents.prototype.sendJsllEvent = function (eventData) {
            notImplementedWarn("sendJsllEvent");
        };
        VortexEvents.prototype.SendOrScheduleEvent = function (eventData, isCritical) {
            notImplementedWarn("SendOrScheduleEvent");
        };
        VortexEvents.prototype.overrideQueueBehavior = function (options) {
            notImplementedWarn("overrideQueueBehavior");
        };
        VortexEvents.prototype.drainQueuedEvents = function () {
            notImplementedWarn("drainQueuedEvents");
        };
        VortexEvents.prototype.batchEventsByNumber = function (num) {
            notImplementedWarn("batchEventsByNumber");
        };
        VortexEvents.prototype.batchQueuedEvents = function () {
            notImplementedWarn("batchQueuedEvents");
        };
        VortexEvents.prototype.addEventToQueue = function (event) {
            notImplementedWarn("addEventToQueue");
        };
        return VortexEvents;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    var JavascriptLoggingLibrary = /** @class */ (function () {
        function JavascriptLoggingLibrary() {
            var _this = this;
            this.isAvailable = true;
            this.requestBody = "";
            this._schemas = [];
            this.testHook = {};
            this.OnSuccessfulVortexRequest = function () { };
            this.sku = new ApplicationInsights();
            this.ct = new ClickstreamTracker(this.sku);
            this.cv = new Cv(this.sku);
            this.ids = new Ids(this.sku);
            this.ix = new Ix();
            this.logger = new Logger(this.sku);
            this.timespanHandler = new TimespanHandler();
            this.service = new Service();
            this.utils = new Utils();
            this.cookie = new Cookie();
            this.errorHandler = new ErrorHandler();
            this.vortexEvents = new VortexEvents();
            this.behavior = Behavior;
            this.behaviorKeys = [];
            objForEachKey(Behavior, function (behaviorKey) {
                _this.behaviorKeys.push(behaviorKey);
            });
            this.actionType = ActionType;
        }
        JavascriptLoggingLibrary.prototype.init = function (options) {
            if (options.useDefaultContentName == undefined) {
                options.useDefaultContentName = true;
            }
            if (options.useShortNameForContentBlob == undefined) {
                options.useShortNameForContentBlob = false;
            }
            this._awaConfig = options;
            var config = { instrumentationKey: this._awaConfig.instrumentationKey, jsllConfiguration: this._awaConfig };
            this.sku.initialize(config, []);
            this.isInitialized = true;
        };
        JavascriptLoggingLibrary.prototype.writeEvent = function (eventData, doNotRetryOnError) {
            var jsllData = eventData;
            if (isArray(jsllData)) {
                for (var i = 0; i < jsllData.length; i++) {
                    this.sku.track(this.transformCustomEvent(jsllData[i]));
                }
            }
            else {
                this.sku.track(this.transformCustomEvent(jsllData));
            }
        };
        JavascriptLoggingLibrary.prototype.getConfig = function () {
            return this._awaConfig;
        };
        JavascriptLoggingLibrary.prototype.extendCoreData = function (coreData) {
            this.sku.getWebAnalyticsExtension().updateCoreDataConfig(coreData);
        };
        JavascriptLoggingLibrary.prototype.capabilitiesCheck = function () {
            if (!JSON || !JSON.stringify) {
                this.logger.logError("Unable to write event: the global JSON.stringify method does not exist");
                this.isAvailable = false;
            }
        };
        JavascriptLoggingLibrary.prototype.getSignedInStatus = function () {
            return _getSignedInStatus(this.sku.getWebAnalyticsExtensionConfig());
        };
        JavascriptLoggingLibrary.prototype._validateAndTranslateEvent = function (eventObject) {
            return { event: eventObject };
        };
        JavascriptLoggingLibrary.prototype.sanitizeUrl = function (originalUrl) {
            var location = document.createElement("a");
            location.href = originalUrl;
            document.body.appendChild(location);
            document.body.removeChild(location);
            if (location && originalUrl) {
                return _sanitizeUrl(this.sku.getWebAnalyticsExtensionConfig(), location);
            }
            return "";
        };
        JavascriptLoggingLibrary.prototype.sanitizeCurrentUrl = function () {
            if (window.location) {
                return _sanitizeUrl(this.sku.getWebAnalyticsExtensionConfig(), window.location);
            }
            return "";
        };
        JavascriptLoggingLibrary.prototype.getQueryStringParameters = function () {
            notImplementedWarn("getQueryStringParameters");
            return "";
        };
        JavascriptLoggingLibrary.prototype._registerSchemas = function (schemas) {
            notImplementedWarn("_registerSchemas");
        };
        JavascriptLoggingLibrary.prototype.sendEventThroughIframe = function (frameSrc) {
            notImplementedWarn("sendEventThroughIframe");
        };
        JavascriptLoggingLibrary.prototype.isEventValid = function (event) {
            notImplementedWarn("isEventValid");
            return true;
        };
        JavascriptLoggingLibrary.prototype.translateEventFromIntermediateStructure = function (oldEventFormat) {
            notImplementedWarn("translateEventFromIntermediateStructure");
        };
        JavascriptLoggingLibrary.prototype.firstEventDone = function () {
            notImplementedWarn("firstEventDone");
        };
        JavascriptLoggingLibrary.prototype.firstEventDoneTasks = function () {
            notImplementedWarn("firstEventDoneTasks");
        };
        JavascriptLoggingLibrary.prototype.resetFirstEvent = function () {
            notImplementedWarn("resetFirstEvent");
        };
        JavascriptLoggingLibrary.prototype.transformCustomEvent = function (eventData) {
            var event = {
                name: eventData.name,
                baseType: eventData.data && eventData.data.baseType ? eventData.data.baseType : ""
            };
            event.baseData = event.baseData || {};
            if (eventData.data && eventData.data.baseData) {
                objForEachKey(eventData.data.baseData, function (key, value) {
                    event.baseData[key] = value;
                });
            }
            event.data = event.data || {};
            if (eventData.data) {
                objForEachKey(eventData.data, function (key, value) {
                    if (key !== "baseData") {
                        event.data[key] = eventData.data[key];
                    }
                });
            }
            if (isValueAssigned(eventData.serviceName)) {
                event.ext = event.ext || {};
                event.ext["intweb"] = event.ext["intweb"] || {};
                event.ext["intweb"]["serviceName"] = eventData.serviceName;
            }
            if (isValueAssigned(eventData.cV)) {
                event.ext = event.ext || {};
                event.ext["mscv"] = event.ext["mscv"] || {};
                event.ext["mscv"]["cV"] = eventData.cV;
            }
            if (isValueAssigned(eventData.appId)) {
                event.ext = event.ext || {};
                event.ext["app"] = event.ext["app"] || {};
                event.ext["app"]["id"] = eventData.appId;
            }
            if (isValueAssigned(eventData.env)) {
                event.ext = event.ext || {};
                event.ext["app"] = event.ext["app"] || {};
                event.ext["app"]["env"] = eventData.env;
            }
            return event;
        };
        return JavascriptLoggingLibrary;
    }());

    /*!
     * 1DS JSLL SKU, 3.1.1
     * Copyright (c) Microsoft and contributors. All rights reserved.
     * (Microsoft Internal Only)
     */
    getGlobal()["awa"] = new JavascriptLoggingLibrary();

    exports.JavascriptLoggingLibrary = JavascriptLoggingLibrary;

    (function(obj, prop, descriptor) { /* ai_es3_polyfil defineProperty */ var func = Object["defineProperty"]; if (func) { try { return func(obj, prop, descriptor); } catch(e) { /* IE8 defines defineProperty, but will throw */ } } if (descriptor && typeof descriptor.value !== undefined) { obj[prop] = descriptor.value; } return obj; })(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ms.jsll-3.1.1.js.map
