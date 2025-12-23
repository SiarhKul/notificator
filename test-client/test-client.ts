import { credentials, Metadata } from '@grpc/grpc-js';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { join } from 'path';
import * as fs from 'fs';

// Load proto file
const PROTO_PATH = join(__dirname, '../proto/notification.proto');
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = loadPackageDefinition(packageDefinition) as any;
const notificationProto = protoDescriptor.notification;

const GRPC_URL = process.env.GRPC_URL || 'localhost:50051';
const USE_TLS = process.env.GRPC_USE_TLS === 'true';

let creds;

if (USE_TLS) {
  const ca = fs.readFileSync('./certs/ca-cert.pem');
  const key = fs.readFileSync('./certs/client-key.pem');
  const cert = fs.readFileSync('./certs/client-cert.pem');

  creds = credentials.createSsl(ca, key, cert);
  console.log('🔒 Using mTLS credentials');
} else {
  creds = credentials.createInsecure();
  console.log('⚠️  Using insecure connection');
}

const client = new notificationProto.NotificationService(GRPC_URL, creds);

function createMetadata(): Metadata {
  const metadata = new Metadata();
  metadata.add('x-service-id', 'test-client')
  metadata.add('x-request-id', `req_${Date.now()}`);
  return metadata;
}

async function testSendNotification() {
  console.log('[TEST_FILE]\n📧 Test 1: Send Notification');
  console.log('─'.repeat(50));

  const request = {
    event_id: `evt_${Date.now()}`,
    user_id: 'user_1234567',
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

  console.log('[TEST_FILE] ✅ Request:', JSON.stringify(request, null, 2));

  return new Promise((resolve, reject) => {
    client.SendNotification(request, createMetadata(), (error, response) => {

      if (error) {
        console.error('[TEST_FILE] ❌ Error:', error.message);
        reject(error);
      } else {
        console.log('[TEST_FILE] ✅ Response:', JSON.stringify(response, null, 2));
        resolve(response);
      }
    });
  });
}

// Example 2: Send batch notifications
async function testBatchNotifications() {
  console.log('[TEST_FILE] \n📨 Test 2: Batch Notifications');
  console.log('─'.repeat(50));

  const request = {
    batch_id: `batch_${Date.now()}`,
    notifications: [
      {
        event_id: `evt_${Date.now()}_1`,
        user_id: 'user_1',
        type: 'EMAIL',
        template_id: 'newsletter',
        payload: { subject: 'Newsletter #1' },
        priority: 'NORMAL',
      },
      {
        event_id: `evt_${Date.now()}_2`,
        user_id: 'user_2',
        type: 'SMS',
        template_id: 'otp',
        payload: { code: '123456' },
        priority: 'URGENT',
      },
      {
        event_id: `evt_${Date.now()}_3`,
        user_id: 'user_3',
        type: 'PUSH',
        template_id: 'new_message',
        payload: { message: 'You have a new message' },
        priority: 'HIGH',
      },
    ],
  };

  return new Promise((resolve, reject) => {
    client.SendBatchNotifications(request, createMetadata(), (error, response) => {
      if (error) {
        console.error('[TEST_FILE] ❌ Error:', error.message);
        reject(error);
      } else {
        console.log('[TEST_FILE] ✅ Response:', JSON.stringify(response, null, 2));
        resolve(response);
      }
    });
  });
}

// Example 3: Get notification status
async function testGetStatus(notificationId: string) {
  console.log('[TEST_FILE] \n🔍 Test 3: Get Notification Status');
  console.log('─'.repeat(50));

  const request = {
    notification_id: notificationId,
    metadata: {},
  };

  return new Promise((resolve, reject) => {
    client.GetNotificationStatus(request, createMetadata(), (error, response) => {
      if (error) {
        console.error('[TEST_FILE] ❌ Error:', error.message);
        reject(error);
      } else {
        console.log('[TEST_FILE] ✅ Response:', JSON.stringify(response, null, 2));
        resolve(response);
      }
    });
  });
}

// Example 4: Health check
async function testHealthCheck() {
  console.log('[TEST_FILE] \n❤️  Test 4: Health Check');
  console.log('─'.repeat(50));

  const request = {
    service: 'notification-service',
  };

  return new Promise((resolve, reject) => {
    client.HealthCheck(request, createMetadata(), (error, response) => {
      if (error) {
        console.error('[TEST_FILE] ❌ Error:', error.message);
        reject(error);
      } else {
        console.log('[TEST_FILE] ✅ Response:', JSON.stringify(response, null, 2));
        resolve(response);
      }
    });
  });
}

// Run all tests
async function runTests() {
  console.log('[TEST_FILE] 🚀 Starting gRPC Client Tests');
  console.log('[TEST_FILE]📡 Server URL:', GRPC_URL);
  console.log('═'.repeat(50));

  try {
    // Test 1: Health check
    // await testHealthCheck();

    // Test 2: Send notification and get ID
    const sendResponse = await testSendNotification() as any;
    const notificationId = sendResponse.notification_id;

    // Test 3: Get status of sent notification
    // await testGetStatus(notificationId);

    // Test 4: Batch notifications
    // await testBatchNotifications();

    // console.log('[TEST_FILE] \n✅ All tests completed successfully!');
  } catch (error) {
    console.error('[TEST_FILE] \n❌ Test failed:', error);
    process.exit(1);
  }
}

// Run tests
runTests();

