# Notification Service - Complete Documentation

## ✅ Implemented Features

### 1. Dependencies (installed and configured)

```json
{
  "@nestjs/microservices": "^10.3.0",    // gRPC support
  "@grpc/grpc-js": "^1.9.14",            // Native gRPC
  "@grpc/proto-loader": "^0.7.10",       // Proto loader
  "protobufjs": "^7.2.5",                // Protocol Buffers
  "@nestjs/config": "^3.1.1",            // Configuration
  "class-validator": "^0.14.0",          // Validation
  "class-transformer": "^0.5.1",         // Transformation
  "uuid": "^13.0.0"                      // UUID generation
}
```

### 2. Project Structure

```
notification-service/
├── proto/
│   └── notification.proto          ✅ gRPC contract
├── src/
│   ├── config/
│   │   └── grpc.config.ts         ✅ gRPC + mTLS configuration
│   ├── controllers/
│   │   └── notification.controller.ts  ✅ gRPC handlers
│   ├── services/
│   │   └── notification.service.ts     ✅ Business logic
│   ├── dto/
│   │   └── notification.dto.ts         ✅ Validation DTOs
│   ├── interceptors/
│   │   └── auth.interceptor.ts         ✅ Auth metadata
│   ├── filters/
│   │   └── grpc-exception.filter.ts    ✅ Error handling
│   ├── app.module.ts              ✅ Main module
│   └── main.ts                    ✅ Bootstrap
├── test-client/
│   ├── test-client.ts             ✅ Test client
│   └── package.json
├── scripts/
│   ├── generate-certs.sh          ✅ Cert generation (Linux/Mac)
│   └── generate-certs.ps1         ✅ Cert generation (Windows)
├── Dockerfile                     ✅ Docker image
├── docker-compose.yml             ✅ Docker Compose
├── tsconfig.json                  ✅ TypeScript config
├── .env                           ✅ Environment
├── package.json                   ✅ Dependencies
└── README.md                      ✅ Documentation
```

### 3. gRPC Service Definition

**Proto Contract** (`proto/notification.proto`):

```protobuf
service NotificationService {
  rpc SendNotification(SendNotificationRequest) returns (SendNotificationResponse);
  rpc SendBatchNotifications(SendBatchNotificationsRequest) returns (SendBatchNotificationsResponse);
  rpc GetNotificationStatus(GetNotificationStatusRequest) returns (GetNotificationStatusResponse);
  rpc HealthCheck(HealthCheckRequest) returns (HealthCheckResponse);
}
```

**Notification Types:**
- `EMAIL` - Email notifications
- `SMS` - SMS messages
- `PUSH` - Push notifications
- `WEBHOOK` - Webhook calls

**Statuses:**
- `PENDING` - Waiting to send
- `SENT` - Sent
- `DELIVERED` - Delivered
- `FAILED` - Failed
- `RETRY` - Retrying

**Priorities:**
- `LOW` - Low priority
- `NORMAL` - Normal priority
- `HIGH` - High priority
- `URGENT` - Urgent priority

### 4. NestJS gRPC Configuration

**`src/config/grpc.config.ts`:**

```typescript
{
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:50051',           // gRPC endpoint
    package: 'notification',         // Proto package
    protoPath: './proto/notification.proto',
    loader: {
      keepCase: true,                // Keep field names
      longs: 'String',               // Convert longs to strings
      enums: 'String',               // Convert enums to strings
      defaults: true,                // Set default values
      oneofs: true                   // Include oneofs
    },
    credentials: ServerCredentials   // mTLS support
  }
}
```

### 5. Security

#### A) mTLS (Mutual TLS) ✅

**Certificate Generation (Windows):**
```powershell
.\scripts\generate-certs.ps1
```

**Certificate Generation (Linux/Mac):**
```bash
chmod +x ./scripts/generate-certs.sh
./scripts/generate-certs.sh
```

**Enable mTLS:**
```env
GRPC_USE_TLS=true
GRPC_SERVER_CERT_PATH=./certs/server-cert.pem
GRPC_SERVER_KEY_PATH=./certs/server-key.pem
GRPC_CA_CERT_PATH=./certs/ca-cert.pem
GRPC_CLIENT_CERT_REQUIRED=true
```

**Benefits:**
- ✅ Traffic encryption
- ✅ Mutual client-server authentication
- ✅ Protection against MITM attacks
- ✅ Certificate verification

#### B) Metadata Authentication ✅

**Interceptor checks:**
```typescript
metadata.get('authorization')    // JWT token
metadata.get('x-service-id')     // Service identifier
metadata.get('x-request-id')     // Request tracing ID
```

**Usage example:**
```typescript
const metadata = new Metadata();
metadata.add('authorization', 'Bearer eyJhbGc...');
metadata.add('x-service-id', 'api-gateway');
metadata.add('x-request-id', 'req_123456');

client.SendNotification(request, metadata, callback);
```

### 6. Validation ✅

**class-validator for DTOs:**

```typescript
export class SendNotificationDto {
  @IsString()
  event_id: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  retry_count?: number = 3;

  // ... other fields
}
```

### 7. Retry & Timeout ✅

**Parameters:**
- `retry_count`: Number of retries (default: 3)
- `timeout_ms`: Request timeout in ms (default: 5000)

**Configuration in .env:**
```env
DEFAULT_RETRY_COUNT=3
DEFAULT_TIMEOUT_MS=5000
```

**Usage in request:**
```json
{
  "event_id": "evt_123",
  "retry_count": 5,
  "timeout_ms": 10000,
  ...
}
```

### 8. Error Handling ✅

**GrpcExceptionFilter:**
- Automatic mapping of errors to gRPC status codes
- Error logging
- Structured responses

**Mapping:**
```
400 Bad Request     → INVALID_ARGUMENT
401 Unauthorized    → UNAUTHENTICATED
403 Forbidden       → PERMISSION_DENIED
404 Not Found       → NOT_FOUND
500 Internal Error  → INTERNAL
503 Unavailable     → UNAVAILABLE
```

## 🚀 Running the Service

### Method 1: Development Mode (recommended)

```bash
# Install dependencies
npm install

# Run in dev mode
npm run start:dev

# Or with auto-reload
npm run start:watch
```

### Method 2: Production Build

```bash
# Build
npm run build

# Start
npm start
```

### Method 3: Docker

```bash
# Build image
docker build -t notification-service:1.0.0 .

# Run container
docker run -p 50051:50051 notification-service:1.0.0
```

### Method 4: Docker Compose

```bash
docker-compose up -d
```


## 🧪 Testing

### 1. Install Test Client

```bash
cd test-client
npm install
cd ..
```

### 2. Run Tests

```bash
# In new terminal (while server is running)
cd test-client
npm run test
```

### 3. Expected Test Output

```
🚀 Starting gRPC Client Tests
📡 Server URL: localhost:50051
══════════════════════════════════════════════════

❤️  Test 4: Health Check
──────────────────────────────────────────────────
✅ Response: {
  "healthy": true,
  "version": "1.0.0",
  "timestamp": "1703001234567"
}

📧 Test 1: Send Notification
──────────────────────────────────────────────────
✅ Response: {
  "success": true,
  "notification_id": "notif_abc123",
  "message": "Notification sent successfully",
  "status": "SENT",
  "timestamp": 1703001234567
}

🔍 Test 3: Get Notification Status
──────────────────────────────────────────────────
✅ Response: {
  "success": true,
  "notification_id": "notif_abc123",
  "status": "SENT",
  ...
}

📨 Test 2: Batch Notifications
──────────────────────────────────────────────────
✅ Response: {
  "success": true,
  "batch_id": "batch_789",
  "total_count": 3,
  "success_count": 3,
  "failed_count": 0
}

✅ All tests completed successfully!
```

## 📡 API Examples

### 1. Send Single Notification

```typescript
client.SendNotification({
  event_id: 'evt_welcome_123',
  user_id: 'user_456',
  type: 'EMAIL',
  template_id: 'welcome_email',
  payload: {
    user_name: 'John Doe',
    activation_link: 'https://example.com/activate/abc'
  },
  priority: 'HIGH',
  retry_count: 3,
  timeout_ms: 5000,
  metadata: {}
}, metadata, callback);
```

### 2. Batch Send

```typescript
client.SendBatchNotifications({
  batch_id: 'batch_weekly_newsletter',
  notifications: [
    {
      event_id: 'evt_1',
      user_id: 'user_1',
      type: 'EMAIL',
      template_id: 'newsletter',
      payload: { subject: 'Weekly Update' }
    },
    {
      event_id: 'evt_2',
      user_id: 'user_2',
      type: 'SMS',
      template_id: 'otp',
      payload: { code: '123456' }
    }
  ]
}, metadata, callback);
```

### 3. Check Status

```typescript
client.GetNotificationStatus({
  notification_id: 'notif_abc123',
  metadata: {}
}, metadata, callback);
```

## 🔗 Integration with Other Services

### API Gateway → Notification Service

**Example NestJS client:**

```typescript
// grpc-client.module.ts
@Module({
  imports: [
    ClientsModule.register([{
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.GRPC,
      options: {
        url: process.env.NOTIFICATION_SERVICE_URL || 'localhost:50051',
        package: 'notification',
        protoPath: join(__dirname, '../proto/notification.proto'),
        credentials: credentials.createSsl(
          fs.readFileSync('./certs/ca-cert.pem'),
          fs.readFileSync('./certs/client-key.pem'),
          fs.readFileSync('./certs/client-cert.pem'),
        ),
      },
    }]),
  ],
  exports: [ClientsModule],
})
export class GrpcClientModule {}
```

**Usage in service:**

```typescript
@Injectable()
export class UserService implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(
    @Inject('NOTIFICATION_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('NotificationService');
  }

  async registerUser(userData: any) {
    // 1. Save user to DB
    const user = await this.userRepository.save(userData);

    // 2. Send welcome notification via gRPC
    const metadata = new Metadata();
    metadata.add('authorization', 'Bearer token');
    metadata.add('x-service-id', 'user-service');
    metadata.add('x-request-id', `req_${Date.now()}`);

    const result = await lastValueFrom(
      this.notificationService.sendNotification({
        event_id: `user_registered_${user.id}`,
        user_id: user.id,
        type: 'EMAIL',
        template_id: 'welcome_email',
        payload: {
          user_name: user.name,
          activation_link: `https://example.com/activate/${user.activationToken}`
        },
        priority: 'HIGH'
      })
    );

    return { user, notification: result };
  }
}
```

## 🛡️ Production Checklist

### Security
- ✅ mTLS certificates configured
- ✅ Auth interceptor implemented
- ✅ Input validation via class-validator
- ✅ Error handling via exception filter
- 🔲 Rate limiting (recommended to add)
- 🔲 IP whitelisting (if needed)

### Reliability
- ✅ Retry logic
- ✅ Timeout configuration
- 🔲 Circuit breaker (recommended: Hystrix/Opossum)
- 🔲 Message queue for async (Bull, RabbitMQ)
- 🔲 Database for persistence (PostgreSQL, MongoDB)

### Observability
- ✅ Basic console logging
- 🔲 Structured logging (Winston, Pino)
- 🔲 Metrics (Prometheus + Grafana)
- 🔲 Distributed tracing (OpenTelemetry, Jaeger)
- 🔲 Health checks endpoints

### Testing
- ✅ Test client
- 🔲 Unit tests (Jest)
- 🔲 Integration tests
- 🔲 Load testing (k6, Artillery)

### Deployment
- ✅ Dockerfile
- ✅ Docker Compose
- ✅ Environment configuration
- 🔲 CI/CD pipeline (GitHub Actions, GitLab CI)

## 📚 Shared Proto Contract

For inter-service communication, recommended:

### Option 1: Git Submodule

```bash
# In each service
git submodule add https://github.com/your-org/proto-contracts.git proto
```

### Option 2: npm package

```bash
# Publish proto as npm package
npm publish @your-org/notification-proto

# Install in other services
npm install @your-org/notification-proto
```

### Option 3: Buf Schema Registry

```bash
# buf.yaml
version: v1
name: buf.build/your-org/notification
deps:
  - buf.build/googleapis/googleapis

# Push to buf registry
buf push
```

## 🎯 Key Concepts

### 1. Event ID
Unique event identifier for:
- Deduplication of repeated requests
- Idempotency of operations
- Event tracing

### 2. Metadata
Passing service information:
- `authorization`: JWT token
- `x-service-id`: Calling service identifier
- `x-request-id`: Request ID for tracing
- `x-correlation-id`: Correlation ID for linking requests

### 3. Priority-based Processing
Processing by priority:
- `URGENT`: Immediate processing
- `HIGH`: High priority
- `NORMAL`: Standard queue
- `LOW`: Background processing

## 🚨 Troubleshooting

### Issue: Port 50051 is busy

```bash
# Windows
netstat -ano | findstr :50051
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :50051
kill -9 <PID>
```

### Issue: Certificate errors

```bash
# Regenerate certificates
rm -rf certs
.\scripts\generate-certs.ps1

# Or disable TLS for testing
GRPC_USE_TLS=false
```

### Issue: TypeScript errors

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

## 📝 Best Practices

1. **Shared Proto**: Store .proto in separate repository or use Buf Schema Registry
2. **Versioning**: Add versioning to package name (`notification.v1`)
3. **Backward Compatibility**: Don't remove fields, only add new ones
4. **Idempotency**: Use `event_id` for deduplication
5. **Graceful Shutdown**: Close connections properly
6. **Circuit Breaker**: Protection against cascading failures

## 📞 Support

- 📖 [NestJS Documentation](https://docs.nestjs.com/)
- 📖 [gRPC Node.js Guide](https://grpc.io/docs/languages/node/)
- 📖 [Protocol Buffers](https://protobuf.dev/)

---

**Ready to use! 🎉**

All necessary components are implemented and tested.

