# Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Create .env File

```bash
# Windows PowerShell
Copy-Item .env.example .env

# Or use the existing .env
```

### 3. Start the Service

```bash
# Development mode (recommended for beginners)
npm run start:dev

# Watch mode (auto-reload)
npm run start:watch

# Production build
npm run build
npm start
```

### 4. Verify It's Working

The service will start on `localhost:50051` and display:

```
🚀 Starting Notification Service...
📡 gRPC URL: 0.0.0.0:50051
📦 Package: notification
📄 Proto: D:\IT\nodejs\untitled\proto\notification.proto
⚠ gRPC running without TLS (insecure)
✅ Notification Service is listening for gRPC requests
🔒 TLS: Disabled
```

## 🧪 Testing

### Install Test Client

```bash
cd test-client
npm install
cd ..
```

### Run Tests

```bash
# In another terminal (while server is running)
cd test-client
npm run test
```

You will see test output:

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
...
```

## 🔒 Enable mTLS (Optional)

### 1. Generate Certificates

```bash
# Windows PowerShell
.\scripts\generate-certs.ps1

# Linux/Mac
chmod +x ./scripts/generate-certs.sh
./scripts/generate-certs.sh
```

### 2. Update .env

```env
GRPC_USE_TLS=true
GRPC_CLIENT_CERT_REQUIRED=true
```

### 3. Restart Service

```bash
npm run start:dev
```

Now the service uses mTLS! 🔐

## 📡 gRPC API Structure

### 1. SendNotification

Send a single notification.

**Request:**
```json
{
  "event_id": "evt_123",
  "user_id": "user_456",
  "type": "EMAIL",
  "template_id": "welcome_email",
  "payload": {
    "user_name": "John Doe"
  },
  "priority": "HIGH"
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

### 2. SendBatchNotifications

Bulk notification sending.

### 3. GetNotificationStatus

Check notification status.

### 4. HealthCheck

Service health check.

## 🐳 Docker

### Local Run

```bash
# Build
docker build -t notification-service:1.0.0 .

# Run
docker run -p 50051:50051 notification-service:1.0.0
```

### Docker Compose

```bash
docker-compose up -d
```


## 🔧 API Gateway Integration

Example client for another NestJS service:

```typescript
// client.module.ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_SERVICE',
        transport: Transport.GRPC,
        options: {
          url: 'localhost:50051',
          package: 'notification',
          protoPath: join(__dirname, './proto/notification.proto'),
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class GrpcClientModule {}
```

```typescript
// some.service.ts
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface NotificationService {
  sendNotification(data: any): Observable<any>;
}

@Injectable()
export class SomeService implements OnModuleInit {
  private notificationService: NotificationService;

  constructor(
    @Inject('NOTIFICATION_SERVICE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationService = this.client.getService<NotificationService>('NotificationService');
  }

  async sendWelcomeEmail(userId: string) {
    const request = {
      event_id: `evt_${Date.now()}`,
      user_id: userId,
      type: 'EMAIL',
      template_id: 'welcome_email',
      payload: { user_name: 'John' },
      priority: 'HIGH',
    };

    const result = await lastValueFrom(
      this.notificationService.sendNotification(request)
    );
    
    return result;
  }
}
```

## 📊 Production Checklist

- [ ] Enable mTLS
- [ ] Configure logging (Winston/Pino)
- [ ] Add metrics (Prometheus)
- [ ] Setup tracing (OpenTelemetry)
- [ ] Add database for persistence
- [ ] Configure queues for retry (Bull, RabbitMQ)
- [ ] Add rate limiting
- [ ] Setup monitoring and alerts
- [ ] Add unit and integration tests
- [ ] Configure CI/CD

## 🛠️ Useful Commands

```bash
# Build TypeScript
npm run build

# Development mode
npm run start:dev

# Watch mode
npm run start:watch

# Production
npm start

# Check types
npx tsc --noEmit

# Lint proto files (if you have buf installed)
buf lint proto/

# Generate certificates
.\scripts\generate-certs.ps1
```

## 📚 Additional Resources

- [NestJS Microservices Docs](https://docs.nestjs.com/microservices/grpc)
- [gRPC Node.js Guide](https://grpc.io/docs/languages/node/)
- [Protocol Buffers Guide](https://protobuf.dev/programming-guides/proto3/)
- [mTLS Best Practices](https://www.cloudflare.com/learning/access-management/what-is-mutual-tls/)

## 🤝 Support

If you encounter problems:

1. Check that port 50051 is available
2. Make sure all dependencies are installed
3. Check service logs
4. For mTLS - ensure certificates are generated correctly

Happy coding! 🎉

