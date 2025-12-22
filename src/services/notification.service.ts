import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {
  NotificationStatus,
  SendNotificationDto,
  SendNotificationResponseDto,
} from '../dto/notification.dto';

@Injectable()
export class NotificationService {
  private notifications = new Map<string, any>();

  async sendNotification(
    request: SendNotificationDto,
  ): Promise<SendNotificationResponseDto> {
    const notificationId = uuidv4();
    const timestamp = Date.now();


    try {
      await this.processNotification(request);

      const notification = {
        notification_id: notificationId,
        ...request,
        status: NotificationStatus.SENT,
        created_at: timestamp,
        updated_at: timestamp,
        retry_count: 0,
      };

      this.notifications.set(notificationId, notification);

      return {
        success: true,
        notification_id: notificationId,
        message: 'Notification sent successfully',
        status: NotificationStatus.SENT,
        timestamp,
      };
    } catch (error) {
      console.error('[Notification] Failed to send:', error);

      return {
        success: false,
        notification_id: notificationId,
        message: `Failed to send notification: ${error.message}`,
        status: NotificationStatus.FAILED,
        timestamp,
      };
    }
  }

  async getNotificationStatus(request: any): Promise<any> {
    const notification = this.notifications.get(request.notification_id);

    if (!notification) {
      return {
        success: false,
        notification_id: request.notification_id,
        status: NotificationStatus.FAILED,
        message: 'Notification not found',
        created_at: 0,
        updated_at: 0,
        retry_count: 0,
      };
    }

    return {
      success: true,
      notification_id: notification.notification_id,
      status: notification.status,
      message: 'Notification found',
      created_at: notification.created_at,
      updated_at: notification.updated_at,
      retry_count: notification.retry_count,
    };
  }

  async healthCheck(request: any): Promise<any> {
    return {
      healthy: true,
      version: process.env.SERVICE_VERSION || '1.0.0',
      timestamp: Date.now(),
    };
  }

  private async processNotification(request: SendNotificationDto): Promise<void> {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.random() * 100),
    );

    // Here you would implement actual notification logic:
    // - Email: Send via SMTP, SendGrid, AWS SES, etc.
    // - SMS: Send via Twilio, AWS SNS, etc.
    // - Push: Send via FCM, APNs, etc.
    // - Webhook: Send HTTP request
    console.log('-----------',request)
    console.log(`11111[Notification] Sent ${request.type} to user ${request.user_id}`);
  }
}

