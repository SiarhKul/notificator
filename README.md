# Notification Service (NestJS + gRPC)

A notification microservice built with NestJS featuring gRPC and mTLS support.

## 🏗️ Architecture

```
notification-service/
├── proto/                      # Protocol Buffers contracts
│   └── notification.proto      # gRPC service definition
├── src/
│   ├── config/                 # Configuration
│   │   └── grpc.config.ts      # gRPC + mTLS settings
│   ├── controllers/            # gRPC Controllers
│   │   └── notification.controller.ts
│   ├── services/               # Business logic
│   │   └── notification.service.ts
│   ├── dto/                    # Data Transfer Objects
│   │   └── notification.dto.ts
│   ├── interceptors/           # Middleware
│   │   └── auth.interceptor.ts # Auth metadata
│   ├── filters/                # Exception handling
│   │   └── grpc-exception.filter.ts
│   ├── app.module.ts
│   └── main.ts
├── certs/                      # TLS certificates (don't commit!)
├── .env.example
├── package.json
└── tsconfig.json
```

## 📦 Dependencies

### Production
- `@nestjs/core` - Framework core
- `@nestjs/common` - Common modules
- `@nestjs/microservices` - Microservices support
- `@nestjs/config` - Configuration management
- `@grpc/grpc-js` - Native gRPC implementation
- `@grpc/proto-loader` - .proto file loader
- `protobufjs` - Protocol Buffers support
- `class-validator` - DTO validation
- `class-transformer` - Data transformation

### Development
- `typescript` - TypeScript compiler
- `ts-node` - TS file execution
- `nodemon` - Auto-reload

## 🚀 Installation

```bash
# Install dependencies
npm install

# Copy .env
cp .env.example .env

# Edit configuration
notepad .env
```

## ⚙️ Configuration

### Basic (.env)

```env
# gRPC Server
GRPC_HOST=0.0.0.0
GRPC_PORT=50051

# Security
GRPC_USE_TLS=false

# Service
SERVICE_NAME=notification-service
SERVICE_VERSION=1.0.0
NODE_ENV=development

# Retry & Timeout
DEFAULT_RETRY_COUNT=3
DEFAULT_TIMEOUT_MS=5000
```

### mTLS Security

To enable mTLS, you need certificates:

```bash
# Create directory for certificates
mkdir certs
cd certs

# Generate CA (Certificate Authority)
openssl genrsa -out ca-key.pem 4096
openssl req -new -x509 -days 365 -key ca-key.pem -out ca-cert.pem

# Generate server certificate
openssl genrsa -out server-key.pem 4096
openssl req -new -key server-key.pem -out server-csr.pem
openssl x509 -req -days 365 -in server-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem

# Generate client certificate (for mTLS)
openssl genrsa -out client-key.pem 4096
openssl req -new -key client-key.pem -out client-csr.pem
openssl x509 -req -days 365 -in client-csr.pem -CA ca-cert.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem
```

Then in .env:

```env
GRPC_USE_TLS=true
GRPC_SERVER_CERT_PATH=./certs/server-cert.pem
GRPC_SERVER_KEY_PATH=./certs/server-key.pem
GRPC_CA_CERT_PATH=./certs/ca-cert.pem
GRPC_CLIENT_CERT_REQUIRED=true
```

## 🏃 Running

```bash
# Development mode
npm run start:dev

# Watch mode (auto-reload)
npm run start:watch

# Production build
npm run build
npm start
```

## 📡 gRPC API

### SendNotification

```protobuf
rpc SendNotification(SendNotificationRequest) returns (SendNotificationResponse);
```

**Request:**
```json
{
  "event_id": "evt_123",
  "user_id": "user_456",
  "type": "EMAIL",
  "template_id": "welcome_email",
  "payload": {
    "user_name": "John",
    "activation_link": "https://..."
  },
  "priority": "HIGH",
  "retry_count": 3,
  "timeout_ms": 5000,
  "metadata": {
    "authorization": "Bearer token",
    "x-service-id": "api-gateway",
    "x-request-id": "req_789"
  }
}
```

**Response:**
```json
{
  "success": true,
  "notification_id": "notif_abc123",
  "message": "Notification sent successfully",
  "status": "SENT",
  "timestamp": 1703001234567
}
```

### SendBatchNotifications

Send multiple notifications in a single request.

### GetNotificationStatus

Check notification status by ID.

### HealthCheck

Service health check.

## 🔒 Security

### 1. mTLS (recommended)

- Mutual client-server authentication
- Traffic encryption
- Certificate verification

### 2. Metadata Authentication

```typescript
// Interceptor checks:
metadata.get('authorization')    // JWT token
metadata.get('x-service-id')     // Calling service ID
metadata.get('x-request-id')     // Trace ID for logging
```

### 3. Validation

`class-validator` for input data validation.

## 🔄 Retry & Timeout

- `retry_count` - number of retries (default: 3)
- `timeout_ms` - request timeout (default: 5000ms)
- Used for resilience against temporary failures

## 📊 Monitoring

Recommended additions:
- **Logging**: Winston, Pino
- **Metrics**: Prometheus + Grafana
- **Tracing**: OpenTelemetry, Jaeger
- **Health checks**: Kubernetes liveness/readiness

## 🧪 Client Testing

You can use:

### 1. grpcurl

```bash
grpcurl -plaintext localhost:50051 list
grpcurl -plaintext localhost:50051 notification.NotificationService/HealthCheck
```

### 2. BloomRPC / Postman

GUI clients for gRPC.

### 3. Node.js client

```typescript
import { credentials } from '@grpc/grpc-js';
import { loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

const packageDefinition = loadSync('proto/notification.proto');
const proto = loadPackageDefinition(packageDefinition);

const client = new proto.notification.NotificationService(
  'localhost:50051',
  credentials.createInsecure()
);

client.SendNotification({
  event_id: 'test_123',
  user_id: 'user_456',
  type: 'EMAIL',
  template_id: 'test',
  payload: { message: 'Hello' }
}, (err, response) => {
  console.log(response);
});
```

## 📝 Best Practices

1. **Shared Proto**: Store .proto in a separate repository or use Buf Schema Registry
2. **Versioning**: Add versioning to package name (`notification.v1`)
3. **Backward Compatibility**: Don't remove fields, only add new ones
4. **Idempotency**: Use `event_id` for deduplication
5. **Graceful Shutdown**: Close connections properly
6. **Circuit Breaker**: Protection against cascading failures

## 🔗 Integration with Other Services

### API Gateway → Notification Service

API Gateway should:
1. Import .proto contract
2. Create gRPC client with same parameters
3. Pass metadata (auth, request_id)
4. Handle errors and retry

### Example client in API Gateway (NestJS)

```typescript
// client.module.ts
@Module({
  imports: [
    ClientsModule.register([{
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.GRPC,
      options: {
        url: 'notification-service:50051',
        package: 'notification',
        protoPath: join(__dirname, '../proto/notification.proto'),
        credentials: credentials.createSsl(
          readFileSync('./certs/ca-cert.pem'),
          readFileSync('./certs/client-key.pem'),
          readFileSync('./certs/client-cert.pem'),
        ),
      },
    }]),
  ],
})
```

## 🐳 Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 50051
CMD ["node", "dist/main.js"]
```

## 📚 Additional Resources

- [NestJS Microservices](https://docs.nestjs.com/microservices/grpc)
- [gRPC Node.js](https://grpc.io/docs/languages/node/)
- [Protocol Buffers](https://protobuf.dev/)
- [Buf Schema Registry](https://buf.build/)

