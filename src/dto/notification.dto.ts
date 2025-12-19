import { IsString, IsEnum, IsOptional, IsNumber, IsObject, Min, Max } from 'class-validator';

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
  WEBHOOK = 'WEBHOOK',
}

export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  RETRY = 'RETRY',
}

export enum NotificationPriority {
  LOW = 'LOW',
  NORMAL = 'NORMAL',
  HIGH = 'HIGH',
  URGENT = 'URGENT',
}

export class SendNotificationDto {
  @IsString()
  event_id: string;

  @IsString()
  user_id: string;

  @IsEnum(NotificationType)
  type: NotificationType;

  @IsString()
  template_id: string;

  @IsObject()
  payload: Record<string, string>;

  @IsEnum(NotificationPriority)
  @IsOptional()
  priority?: NotificationPriority = NotificationPriority.NORMAL;

  @IsNumber()
  @Min(0)
  @Max(10)
  @IsOptional()
  retry_count?: number = 3;

  @IsNumber()
  @Min(100)
  @Max(30000)
  @IsOptional()
  timeout_ms?: number = 5000;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, string>;
}

export class SendNotificationResponseDto {
  success: boolean;
  notification_id: string;
  message: string;
  status: NotificationStatus;
  timestamp: number;
}

export class GetNotificationStatusDto {
  @IsString()
  notification_id: string;

  @IsObject()
  @IsOptional()
  metadata?: Record<string, string>;
}

