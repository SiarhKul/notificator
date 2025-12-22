import { Controller, UseInterceptors, UseFilters } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { NotificationService } from '../services/notification.service';
import { GrpcAuthInterceptor } from '../interceptors/auth.interceptor';
import { GrpcExceptionFilter } from '../filters/grpc-exception.filter';
import {
  SendNotificationDto,
  SendNotificationResponseDto,
} from '../dto/notification.dto';

@UseFilters(GrpcExceptionFilter)
@UseInterceptors(GrpcAuthInterceptor)
@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @GrpcMethod('NotificationService', 'SendNotification')
  async sendNotification(
    data: SendNotificationDto,
  ): Promise<SendNotificationResponseDto> {
    return this.notificationService.sendNotification(data);
  }

  @GrpcMethod('NotificationService', 'GetNotificationStatus')
  async getNotificationStatus(data: any): Promise<any> {
    return this.notificationService.getNotificationStatus(data);
  }

  @GrpcMethod('NotificationService', 'HealthCheck')
  async healthCheck(data: any): Promise<any> {
    return this.notificationService.healthCheck(data);
  }
}

