"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var grpc_js_1 = require("@grpc/grpc-js");
var grpc_js_2 = require("@grpc/grpc-js");
var proto_loader_1 = require("@grpc/proto-loader");
var path_1 = require("path");
var fs = require("fs");
// Load proto file
var PROTO_PATH = (0, path_1.join)(__dirname, '../proto/notification.proto');
var packageDefinition = (0, proto_loader_1.loadSync)(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
var protoDescriptor = (0, grpc_js_2.loadPackageDefinition)(packageDefinition);
var notificationProto = protoDescriptor.notification;
var GRPC_URL = process.env.GRPC_URL || 'localhost:50051';
var USE_TLS = process.env.GRPC_USE_TLS === 'true';
var creds;
if (USE_TLS) {
    var ca = fs.readFileSync('./certs/ca-cert.pem');
    var key = fs.readFileSync('./certs/client-key.pem');
    var cert = fs.readFileSync('./certs/client-cert.pem');
    creds = grpc_js_1.credentials.createSsl(ca, key, cert);
    console.log('🔒 Using mTLS credentials');
}
else {
    creds = grpc_js_1.credentials.createInsecure();
    console.log('⚠️  Using insecure connection');
}
var client = new notificationProto.NotificationService(GRPC_URL, creds);
function createMetadata() {
    var metadata = new grpc_js_1.Metadata();
    metadata.add('x-service-id', 'test-client');
    metadata.add('x-request-id', "req_".concat(Date.now()));
    return metadata;
}
function testSendNotification() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            console.log('\n📧 Test 1: Send Notification');
            console.log('─'.repeat(50));
            request = {
                event_id: "evt_".concat(Date.now()),
                user_id: 'user_12345',
                type: 'EMAIL',
                template_id: 'welcome_email',
                payload: {
                    user_name: 'John Doe',
                    activation_link: 'https://example.com/activate/abc123',
                },
                priority: 'HIGH',
                retry_count: 3,
                timeout_ms: 5000,
                metadata: {},
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    client.SendNotification(request, createMetadata(), function (error, response) {
                        if (error) {
                            console.error('❌ Error:', error.message);
                            reject(error);
                        }
                        else {
                            console.log('✅ Response:', JSON.stringify(response, null, 2));
                            resolve(response);
                        }
                    });
                })];
        });
    });
}
// Example 2: Send batch notifications
function testBatchNotifications() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            console.log('\n📨 Test 2: Batch Notifications');
            console.log('─'.repeat(50));
            request = {
                batch_id: "batch_".concat(Date.now()),
                notifications: [
                    {
                        event_id: "evt_".concat(Date.now(), "_1"),
                        user_id: 'user_1',
                        type: 'EMAIL',
                        template_id: 'newsletter',
                        payload: { subject: 'Newsletter #1' },
                        priority: 'NORMAL',
                    },
                    {
                        event_id: "evt_".concat(Date.now(), "_2"),
                        user_id: 'user_2',
                        type: 'SMS',
                        template_id: 'otp',
                        payload: { code: '123456' },
                        priority: 'URGENT',
                    },
                    {
                        event_id: "evt_".concat(Date.now(), "_3"),
                        user_id: 'user_3',
                        type: 'PUSH',
                        template_id: 'new_message',
                        payload: { message: 'You have a new message' },
                        priority: 'HIGH',
                    },
                ],
                metadata: {},
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    client.SendBatchNotifications(request, createMetadata(), function (error, response) {
                        if (error) {
                            console.error('❌ Error:', error.message);
                            reject(error);
                        }
                        else {
                            console.log('✅ Response:', JSON.stringify(response, null, 2));
                            resolve(response);
                        }
                    });
                })];
        });
    });
}
// Example 3: Get notification status
function testGetStatus(notificationId) {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            console.log('\n🔍 Test 3: Get Notification Status');
            console.log('─'.repeat(50));
            request = {
                notification_id: notificationId,
                metadata: {},
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    client.GetNotificationStatus(request, createMetadata(), function (error, response) {
                        if (error) {
                            console.error('❌ Error:', error.message);
                            reject(error);
                        }
                        else {
                            console.log('✅ Response:', JSON.stringify(response, null, 2));
                            resolve(response);
                        }
                    });
                })];
        });
    });
}
// Example 4: Health check
function testHealthCheck() {
    return __awaiter(this, void 0, void 0, function () {
        var request;
        return __generator(this, function (_a) {
            console.log('\n❤️  Test 4: Health Check');
            console.log('─'.repeat(50));
            request = {
                service: 'notification-service',
            };
            return [2 /*return*/, new Promise(function (resolve, reject) {
                    client.HealthCheck(request, createMetadata(), function (error, response) {
                        if (error) {
                            console.error('❌ Error:', error.message);
                            reject(error);
                        }
                        else {
                            console.log('✅ Response:', JSON.stringify(response, null, 2));
                            resolve(response);
                        }
                    });
                })];
        });
    });
}
// Run all tests
function runTests() {
    return __awaiter(this, void 0, void 0, function () {
        var sendResponse, notificationId, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('🚀 Starting gRPC Client Tests');
                    console.log('📡 Server URL:', GRPC_URL);
                    console.log('═'.repeat(50));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 6, , 7]);
                    // Test 1: Health check
                    return [4 /*yield*/, testHealthCheck()];
                case 2:
                    // Test 1: Health check
                    _a.sent();
                    return [4 /*yield*/, testSendNotification()];
                case 3:
                    sendResponse = _a.sent();
                    notificationId = sendResponse.notification_id;
                    // Test 3: Get status of sent notification
                    return [4 /*yield*/, testGetStatus(notificationId)];
                case 4:
                    // Test 3: Get status of sent notification
                    _a.sent();
                    // Test 4: Batch notifications
                    return [4 /*yield*/, testBatchNotifications()];
                case 5:
                    // Test 4: Batch notifications
                    _a.sent();
                    console.log('\n✅ All tests completed successfully!');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('\n❌ Test failed:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// Run tests
runTests();
