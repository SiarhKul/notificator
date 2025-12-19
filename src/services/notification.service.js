"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
var common_1 = require("@nestjs/common");
var uuid_1 = require("uuid");
var notification_dto_1 = require("../dto/notification.dto");
var NotificationService = function () {
    var _classDecorators = [(0, common_1.Injectable)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var NotificationService = _classThis = /** @class */ (function () {
        function NotificationService_1() {
            // In-memory storage for demo (replace with database in production)
            this.notifications = new Map();
        }
        NotificationService_1.prototype.sendNotification = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var notificationId, timestamp, notification, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            notificationId = (0, uuid_1.v4)();
                            timestamp = Date.now();
                            console.log("[Notification] Processing notification:", {
                                id: notificationId,
                                event_id: request.event_id,
                                user_id: request.user_id,
                                type: request.type,
                                template_id: request.template_id,
                            });
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Simulate notification processing
                            return [4 /*yield*/, this.processNotification(request)];
                        case 2:
                            // Simulate notification processing
                            _a.sent();
                            notification = __assign(__assign({ notification_id: notificationId }, request), { status: notification_dto_1.NotificationStatus.SENT, created_at: timestamp, updated_at: timestamp, retry_count: 0 });
                            this.notifications.set(notificationId, notification);
                            return [2 /*return*/, {
                                    success: true,
                                    notification_id: notificationId,
                                    message: 'Notification sent successfully',
                                    status: notification_dto_1.NotificationStatus.SENT,
                                    timestamp: timestamp,
                                }];
                        case 3:
                            error_1 = _a.sent();
                            console.error('[Notification] Failed to send:', error_1);
                            return [2 /*return*/, {
                                    success: false,
                                    notification_id: notificationId,
                                    message: "Failed to send notification: ".concat(error_1.message),
                                    status: notification_dto_1.NotificationStatus.FAILED,
                                    timestamp: timestamp,
                                }];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        NotificationService_1.prototype.sendBatchNotifications = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var results, successCount, failedCount, _i, _a, notification, result;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            console.log("[Notification] Processing batch: ".concat(request.batch_id));
                            results = [];
                            successCount = 0;
                            failedCount = 0;
                            _i = 0, _a = request.notifications;
                            _b.label = 1;
                        case 1:
                            if (!(_i < _a.length)) return [3 /*break*/, 4];
                            notification = _a[_i];
                            return [4 /*yield*/, this.sendNotification(notification)];
                        case 2:
                            result = _b.sent();
                            results.push(result);
                            if (result.success) {
                                successCount++;
                            }
                            else {
                                failedCount++;
                            }
                            _b.label = 3;
                        case 3:
                            _i++;
                            return [3 /*break*/, 1];
                        case 4: return [2 /*return*/, {
                                success: true,
                                batch_id: request.batch_id,
                                total_count: request.notifications.length,
                                success_count: successCount,
                                failed_count: failedCount,
                                results: results,
                            }];
                    }
                });
            });
        };
        NotificationService_1.prototype.getNotificationStatus = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                var notification;
                return __generator(this, function (_a) {
                    notification = this.notifications.get(request.notification_id);
                    if (!notification) {
                        return [2 /*return*/, {
                                success: false,
                                notification_id: request.notification_id,
                                status: notification_dto_1.NotificationStatus.FAILED,
                                message: 'Notification not found',
                                created_at: 0,
                                updated_at: 0,
                                retry_count: 0,
                            }];
                    }
                    return [2 /*return*/, {
                            success: true,
                            notification_id: notification.notification_id,
                            status: notification.status,
                            message: 'Notification found',
                            created_at: notification.created_at,
                            updated_at: notification.updated_at,
                            retry_count: notification.retry_count,
                        }];
                });
            });
        };
        NotificationService_1.prototype.healthCheck = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, {
                            healthy: true,
                            version: process.env.SERVICE_VERSION || '1.0.0',
                            timestamp: Date.now(),
                        }];
                });
            });
        };
        NotificationService_1.prototype.processNotification = function (request) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // Simulate async processing with timeout
                        return [4 /*yield*/, new Promise(function (resolve) {
                                return setTimeout(resolve, Math.random() * 100);
                            })];
                        case 1:
                            // Simulate async processing with timeout
                            _a.sent();
                            // Here you would implement actual notification logic:
                            // - Email: Send via SMTP, SendGrid, AWS SES, etc.
                            // - SMS: Send via Twilio, AWS SNS, etc.
                            // - Push: Send via FCM, APNs, etc.
                            // - Webhook: Send HTTP request
                            console.log("[Notification] Sent ".concat(request.type, " to user ").concat(request.user_id));
                            return [2 /*return*/];
                    }
                });
            });
        };
        return NotificationService_1;
    }());
    __setFunctionName(_classThis, "NotificationService");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NotificationService = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NotificationService = _classThis;
}();
exports.NotificationService = NotificationService;
