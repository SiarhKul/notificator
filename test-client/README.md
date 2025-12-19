# gRPC Test Client

Simple client for testing Notification Service.

## Installation

```bash
cd test-client
npm install
```

## Usage

```bash
# Run tests (without TLS)
npm run test

# Run tests (with TLS)
GRPC_USE_TLS=true npm run test

# Specify different URL
GRPC_URL=notification-service:50051 npm run test
```

## Examples

### 1. Send Single Notification

```typescript
client.SendNotification({
  event_id: 'evt_123',
  user_id: 'user_456',
  type: 'EMAIL',
  template_id: 'welcome_email',
  payload: {
    user_name: 'John',
    activation_link: 'https://...'
  },
  priority: 'HIGH'
}, metadata, callback);
```

### 2. Batch Send

```typescript
client.SendBatchNotifications({
  batch_id: 'batch_789',
  notifications: [...]
}, metadata, callback);
```

### 3. Check Status

```typescript
client.GetNotificationStatus({
  notification_id: 'notif_abc'
}, metadata, callback);
```

