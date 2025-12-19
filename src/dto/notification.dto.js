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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetNotificationStatusDto = exports.SendNotificationResponseDto = exports.SendNotificationDto = exports.NotificationPriority = exports.NotificationStatus = exports.NotificationType = void 0;
var class_validator_1 = require("class-validator");
var NotificationType;
(function (NotificationType) {
    NotificationType["EMAIL"] = "EMAIL";
    NotificationType["SMS"] = "SMS";
    NotificationType["PUSH"] = "PUSH";
    NotificationType["WEBHOOK"] = "WEBHOOK";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
var NotificationStatus;
(function (NotificationStatus) {
    NotificationStatus["PENDING"] = "PENDING";
    NotificationStatus["SENT"] = "SENT";
    NotificationStatus["DELIVERED"] = "DELIVERED";
    NotificationStatus["FAILED"] = "FAILED";
    NotificationStatus["RETRY"] = "RETRY";
})(NotificationStatus || (exports.NotificationStatus = NotificationStatus = {}));
var NotificationPriority;
(function (NotificationPriority) {
    NotificationPriority["LOW"] = "LOW";
    NotificationPriority["NORMAL"] = "NORMAL";
    NotificationPriority["HIGH"] = "HIGH";
    NotificationPriority["URGENT"] = "URGENT";
})(NotificationPriority || (exports.NotificationPriority = NotificationPriority = {}));
var SendNotificationDto = function () {
    var _a;
    var _event_id_decorators;
    var _event_id_initializers = [];
    var _event_id_extraInitializers = [];
    var _user_id_decorators;
    var _user_id_initializers = [];
    var _user_id_extraInitializers = [];
    var _type_decorators;
    var _type_initializers = [];
    var _type_extraInitializers = [];
    var _template_id_decorators;
    var _template_id_initializers = [];
    var _template_id_extraInitializers = [];
    var _payload_decorators;
    var _payload_initializers = [];
    var _payload_extraInitializers = [];
    var _priority_decorators;
    var _priority_initializers = [];
    var _priority_extraInitializers = [];
    var _retry_count_decorators;
    var _retry_count_initializers = [];
    var _retry_count_extraInitializers = [];
    var _timeout_ms_decorators;
    var _timeout_ms_initializers = [];
    var _timeout_ms_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function SendNotificationDto() {
                this.event_id = __runInitializers(this, _event_id_initializers, void 0);
                this.user_id = (__runInitializers(this, _event_id_extraInitializers), __runInitializers(this, _user_id_initializers, void 0));
                this.type = (__runInitializers(this, _user_id_extraInitializers), __runInitializers(this, _type_initializers, void 0));
                this.template_id = (__runInitializers(this, _type_extraInitializers), __runInitializers(this, _template_id_initializers, void 0));
                this.payload = (__runInitializers(this, _template_id_extraInitializers), __runInitializers(this, _payload_initializers, void 0));
                this.priority = (__runInitializers(this, _payload_extraInitializers), __runInitializers(this, _priority_initializers, NotificationPriority.NORMAL));
                this.retry_count = (__runInitializers(this, _priority_extraInitializers), __runInitializers(this, _retry_count_initializers, 3));
                this.timeout_ms = (__runInitializers(this, _retry_count_extraInitializers), __runInitializers(this, _timeout_ms_initializers, 5000));
                this.metadata = (__runInitializers(this, _timeout_ms_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            return SendNotificationDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _event_id_decorators = [(0, class_validator_1.IsString)()];
            _user_id_decorators = [(0, class_validator_1.IsString)()];
            _type_decorators = [(0, class_validator_1.IsEnum)(NotificationType)];
            _template_id_decorators = [(0, class_validator_1.IsString)()];
            _payload_decorators = [(0, class_validator_1.IsObject)()];
            _priority_decorators = [(0, class_validator_1.IsEnum)(NotificationPriority), (0, class_validator_1.IsOptional)()];
            _retry_count_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(0), (0, class_validator_1.Max)(10), (0, class_validator_1.IsOptional)()];
            _timeout_ms_decorators = [(0, class_validator_1.IsNumber)(), (0, class_validator_1.Min)(100), (0, class_validator_1.Max)(30000), (0, class_validator_1.IsOptional)()];
            _metadata_decorators = [(0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _event_id_decorators, { kind: "field", name: "event_id", static: false, private: false, access: { has: function (obj) { return "event_id" in obj; }, get: function (obj) { return obj.event_id; }, set: function (obj, value) { obj.event_id = value; } }, metadata: _metadata }, _event_id_initializers, _event_id_extraInitializers);
            __esDecorate(null, null, _user_id_decorators, { kind: "field", name: "user_id", static: false, private: false, access: { has: function (obj) { return "user_id" in obj; }, get: function (obj) { return obj.user_id; }, set: function (obj, value) { obj.user_id = value; } }, metadata: _metadata }, _user_id_initializers, _user_id_extraInitializers);
            __esDecorate(null, null, _type_decorators, { kind: "field", name: "type", static: false, private: false, access: { has: function (obj) { return "type" in obj; }, get: function (obj) { return obj.type; }, set: function (obj, value) { obj.type = value; } }, metadata: _metadata }, _type_initializers, _type_extraInitializers);
            __esDecorate(null, null, _template_id_decorators, { kind: "field", name: "template_id", static: false, private: false, access: { has: function (obj) { return "template_id" in obj; }, get: function (obj) { return obj.template_id; }, set: function (obj, value) { obj.template_id = value; } }, metadata: _metadata }, _template_id_initializers, _template_id_extraInitializers);
            __esDecorate(null, null, _payload_decorators, { kind: "field", name: "payload", static: false, private: false, access: { has: function (obj) { return "payload" in obj; }, get: function (obj) { return obj.payload; }, set: function (obj, value) { obj.payload = value; } }, metadata: _metadata }, _payload_initializers, _payload_extraInitializers);
            __esDecorate(null, null, _priority_decorators, { kind: "field", name: "priority", static: false, private: false, access: { has: function (obj) { return "priority" in obj; }, get: function (obj) { return obj.priority; }, set: function (obj, value) { obj.priority = value; } }, metadata: _metadata }, _priority_initializers, _priority_extraInitializers);
            __esDecorate(null, null, _retry_count_decorators, { kind: "field", name: "retry_count", static: false, private: false, access: { has: function (obj) { return "retry_count" in obj; }, get: function (obj) { return obj.retry_count; }, set: function (obj, value) { obj.retry_count = value; } }, metadata: _metadata }, _retry_count_initializers, _retry_count_extraInitializers);
            __esDecorate(null, null, _timeout_ms_decorators, { kind: "field", name: "timeout_ms", static: false, private: false, access: { has: function (obj) { return "timeout_ms" in obj; }, get: function (obj) { return obj.timeout_ms; }, set: function (obj, value) { obj.timeout_ms = value; } }, metadata: _metadata }, _timeout_ms_initializers, _timeout_ms_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.SendNotificationDto = SendNotificationDto;
var SendNotificationResponseDto = /** @class */ (function () {
    function SendNotificationResponseDto() {
    }
    return SendNotificationResponseDto;
}());
exports.SendNotificationResponseDto = SendNotificationResponseDto;
var GetNotificationStatusDto = function () {
    var _a;
    var _notification_id_decorators;
    var _notification_id_initializers = [];
    var _notification_id_extraInitializers = [];
    var _metadata_decorators;
    var _metadata_initializers = [];
    var _metadata_extraInitializers = [];
    return _a = /** @class */ (function () {
            function GetNotificationStatusDto() {
                this.notification_id = __runInitializers(this, _notification_id_initializers, void 0);
                this.metadata = (__runInitializers(this, _notification_id_extraInitializers), __runInitializers(this, _metadata_initializers, void 0));
                __runInitializers(this, _metadata_extraInitializers);
            }
            return GetNotificationStatusDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _notification_id_decorators = [(0, class_validator_1.IsString)()];
            _metadata_decorators = [(0, class_validator_1.IsObject)(), (0, class_validator_1.IsOptional)()];
            __esDecorate(null, null, _notification_id_decorators, { kind: "field", name: "notification_id", static: false, private: false, access: { has: function (obj) { return "notification_id" in obj; }, get: function (obj) { return obj.notification_id; }, set: function (obj, value) { obj.notification_id = value; } }, metadata: _metadata }, _notification_id_initializers, _notification_id_extraInitializers);
            __esDecorate(null, null, _metadata_decorators, { kind: "field", name: "metadata", static: false, private: false, access: { has: function (obj) { return "metadata" in obj; }, get: function (obj) { return obj.metadata; }, set: function (obj, value) { obj.metadata = value; } }, metadata: _metadata }, _metadata_initializers, _metadata_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.GetNotificationStatusDto = GetNotificationStatusDto;
