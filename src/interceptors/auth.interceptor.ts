import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcAuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const metadata: Metadata = ctx.getContext();

    // Extract auth metadata
    const authToken = metadata.get('authorization')[0];
    const serviceId = metadata.get('x-service-id')[0];
    const requestId = metadata.get('x-request-id')[0];

    // Simple validation (replace with your actual auth logic)
    if (!authToken) {
      console.warn('Missing authorization token');
      // In production, you might want to throw:
      // throw new UnauthorizedException('Missing authorization token');
    }

    if (!serviceId) {
      console.warn('Missing service ID');
    }

    // Log request
    console.log(`[gRPC Request] Service: ${serviceId}, RequestId: ${requestId}`);

    // You can add the validated user/service info to the request
    // ctx.getData().auth = { serviceId, requestId };

    return next.handle();
  }
}

