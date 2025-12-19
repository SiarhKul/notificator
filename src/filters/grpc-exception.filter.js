"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrpcExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var grpc_js_1 = require("@grpc/grpc-js");
var GrpcExceptionFilter = function () {
    var _classDecorators = [(0, common_1.Catch)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var GrpcExceptionFilter = _classThis = /** @class */ (function () {
        function GrpcExceptionFilter_1() {
        }
        GrpcExceptionFilter_1.prototype.catch = function (exception, host) {
            var error = {
                code: this.getGrpcStatusCode(exception),
                message: exception.message || 'Internal server error',
                details: exception.details || '',
            };
            console.error('[gRPC Error]', {
                code: error.code,
                message: error.message,
                stack: exception.stack,
            });
            return (0, rxjs_1.throwError)(function () { return ({
                code: error.code,
                message: error.message,
                details: error.details,
            }); });
        };
        GrpcExceptionFilter_1.prototype.getGrpcStatusCode = function (exception) {
            if (exception.code) {
                return exception.code;
            }
            // Map HTTP status to gRPC status
            var statusCode = exception.status || exception.statusCode;
            switch (statusCode) {
                case 400:
                    return grpc_js_1.status.INVALID_ARGUMENT;
                case 401:
                    return grpc_js_1.status.UNAUTHENTICATED;
                case 403:
                    return grpc_js_1.status.PERMISSION_DENIED;
                case 404:
                    return grpc_js_1.status.NOT_FOUND;
                case 409:
                    return grpc_js_1.status.ALREADY_EXISTS;
                case 429:
                    return grpc_js_1.status.RESOURCE_EXHAUSTED;
                case 500:
                    return grpc_js_1.status.INTERNAL;
                case 501:
                    return grpc_js_1.status.UNIMPLEMENTED;
                case 503:
                    return grpc_js_1.status.UNAVAILABLE;
                case 504:
                    return grpc_js_1.status.DEADLINE_EXCEEDED;
                default:
                    return grpc_js_1.status.UNKNOWN;
            }
        };
        return GrpcExceptionFilter_1;
    }());
    __setFunctionName(_classThis, "GrpcExceptionFilter");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        GrpcExceptionFilter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return GrpcExceptionFilter = _classThis;
}();
exports.GrpcExceptionFilter = GrpcExceptionFilter;
