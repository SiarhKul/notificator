import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class GrpcAuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToRpc();
    const metadata: Metadata = ctx.getContext();

    const serviceId = metadata.get('x-service-id')[0];
    const requestId = metadata.get('x-request-id')[0];


    if (!serviceId) {
      console.warn('Missing service ID');
    }
    if (!requestId) {
      console.warn('Missing request ID');
    }

    console.log(`[gRPC Request] Service: ${serviceId}, RequestId: ${requestId}`);

    return next.handle();
  }
}

