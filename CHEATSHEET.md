# 🚀 Notification Service - Cheat Sheet

## ⚡ Quick Start

```bash
# 1. Install
npm install

# 2. Run (development)
npm run start:dev

# 3. Test (in another terminal)
cd test-client
npm install
npm run test
```

## 📋 Commands

### Development

```bash
npm run start:dev      # Dev mode
npm run start:watch    # Watch mode (auto-reload)
npm run build          # Build TypeScript
npm start              # Production mode
```

### Docker

```bash
# Build
docker build -t notification-service:1.0.0 .

# Run
docker run -p 50051:50051 notification-service:1.0.0

# Docker Compose
docker-compose up -d
docker-compose logs -f
docker-compose down
```

## 🔐 mTLS Certificates

### Windows

```powershell
.\scripts\generate-certs.ps1
```

### Linux/Mac

```bash
chmod +x ./scripts/generate-certs.sh
./scripts/generate-certs.sh
```

### Enable mTLS

```env
# .env
GRPC_USE_TLS=true
GRPC_CLIENT_CERT_REQUIRED=true
```

## 🧪 Testing

### Run Test Client

```bash
cd test-client
npm install

# Without TLS
npm run test

# With TLS
GRPC_USE_TLS=true npm run test

# Different URL
GRPC_URL=notification-service:50051 npm run test
```

### grpcurl (alternative)

```bash
# Install (Windows - Scoop)
scoop install grpcurl

# List services
grpcurl -plaintext localhost:50051 list

# Health check
grpcurl -plaintext localhost:50051 notification.NotificationService/HealthCheck

# Send notification
grpcurl -plaintext -d '{
  "event_id": "evt_123",
  "user_id": "user_456",
  "type": "EMAIL",
  "template_id": "test",
  "payload": {"message": "Hello"}
}' localhost:50051 notification.NotificationService/SendNotification
```

## 📡 gRPC API

### SendNotification

```json
{
  "event_id": "evt_123",
  "user_id": "user_456",
  "type": "EMAIL",
  "template_id": "welcome_email",
  "payload": {
    "user_name": "John Doe",
    "activation_link": "https://..."
  },
  "priority": "HIGH",
  "retry_count": 3,
  "timeout_ms": 5000
}
```

### Response

```json
{
  "success": true,
  "notification_id": "notif_abc123",
  "message": "Notification sent successfully",
  "status": "SENT",
  "timestamp": 1703001234567
}
```

## 🔧 Configuration (.env)

```env
# Server
GRPC_HOST=0.0.0.0
GRPC_PORT=50051

# Security
GRPC_USE_TLS=false
GRPC_CLIENT_CERT_REQUIRED=false

# Service
SERVICE_NAME=notification-service
SERVICE_VERSION=1.0.0
NODE_ENV=development

# Retry & Timeout
DEFAULT_RETRY_COUNT=3
DEFAULT_TIMEOUT_MS=5000
```

## 🏗️ Project Structure

```
notification-service/
├── proto/                      # gRPC contracts
├── src/
│   ├── config/                # Configuration
│   ├── controllers/           # gRPC handlers
│   ├── services/              # Business logic
│   ├── dto/                   # DTOs + validation
│   ├── interceptors/          # Auth middleware
│   ├── filters/               # Error handling
│   ├── app.module.ts
│   └── main.ts
├── test-client/               # Test client
├── scripts/                   # Utility scripts
├── Dockerfile
├── docker-compose.yml
└── .env
```

## 🛠️ Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :50051
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :50051
kill -9 <PID>
```

### Clean and Rebuild

```bash
rm -rf dist node_modules
npm install
npm run build
```

### Check Compilation

```bash
npx tsc --noEmit
```

## 📦 Dependencies

### Production

```json
{
  "@nestjs/core": "^10.3.0",
  "@nestjs/microservices": "^10.3.0",
  "@nestjs/config": "^3.1.1",
  "@grpc/grpc-js": "^1.9.14",
  "@grpc/proto-loader": "^0.7.10",
  "protobufjs": "^7.2.5",
  "class-validator": "^0.14.0",
  "uuid": "^13.0.0"
}
```

### Development

```json
{
  "typescript": "^5.3.3",
  "ts-node": "^10.9.2",
  "nodemon": "^3.0.2",
  "@types/node": "^20.10.6",
  "@types/uuid": "^10.0.0"
}
```

## 🔗 API Gateway Integration

### Client Module

```typescript
@Module({
  imports: [
    ClientsModule.register([{
      name: 'NOTIFICATION_SERVICE',
      transport: Transport.GRPC,
      options: {
        url: 'localhost:50051',
        package: 'notification',
        protoPath: join(__dirname, './proto/notification.proto')
      }
    }])
  ]
})
export class GrpcClientModule {}
```

### Service

```typescript
@Injectable()
export class SomeService implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(@Inject('NOTIFICATION_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('NotificationService');
  }

  async sendNotification() {
    return await lastValueFrom(
      this.notificationService.sendNotification({...})
    );
  }
}
```

## 🎯 Use Cases

### 1. User Registration

```typescript
// Welcome email
{
  event_id: `user_registered_${userId}`,
  user_id: userId,
  type: 'EMAIL',
  template_id: 'welcome_email',
  priority: 'HIGH'
}
```

### 2. OTP Code

```typescript
// SMS OTP
{
  event_id: `otp_${userId}_${timestamp}`,
  user_id: userId,
  type: 'SMS',
  template_id: 'otp_code',
  payload: { code: '123456' },
  priority: 'URGENT'
}
```

### 3. Bulk Newsletter

```typescript
// Newsletter
{
  batch_id: 'newsletter_2024_12',
  notifications: [
    { user_id: 'user_1', ... },
    { user_id: 'user_2', ... },
    // ...
  ]
}
```

## 📊 Monitoring

### Health Check

```bash
grpcurl -plaintext localhost:50051 notification.NotificationService/HealthCheck
```

### Metrics (planned)

- Total requests
- Success/failure rate
- Average response time
- Queue depth
- Active connections

## 🔐 Security Best Practices

1. ✅ Use mTLS in production
2. ✅ Validate auth metadata
3. ✅ Validate all incoming data
4. ✅ Log security events
5. 🔲 Rate limiting by service-id
6. 🔲 IP whitelisting for production

## 📚 Links

- [NestJS Docs](https://docs.nestjs.com/microservices/grpc)
- [gRPC Guide](https://grpc.io/docs/languages/node/)
- [Protobuf](https://protobuf.dev/)

---

**Happy Coding! 🎉**

