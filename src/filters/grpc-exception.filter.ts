import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';

@Catch()
export class GrpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: any): Observable<any> {
    const error = {
      code: this.getGrpcStatusCode(exception),
      message: exception.message || 'Internal server error',
      details: exception.details || '',
    };

    console.error('[gRPC Error]', {
      code: error.code,
      message: error.message,
      stack: exception.stack,
    });

    return throwError(() => ({
      code: error.code,
      message: error.message,
      details: error.details,
    }));
  }

  private getGrpcStatusCode(exception: any): number {
    if (exception.code) {
      return exception.code;
    }

    const statusCode = exception.status || exception.statusCode;
    switch (statusCode) {
      case 400:
        return status.INVALID_ARGUMENT;
      case 401:
        return status.UNAUTHENTICATED;
      case 403:
        return status.PERMISSION_DENIED;
      case 404:
        return status.NOT_FOUND;
      case 409:
        return status.ALREADY_EXISTS;
      case 429:
        return status.RESOURCE_EXHAUSTED;
      case 500:
        return status.INTERNAL;
      case 501:
        return status.UNIMPLEMENTED;
      case 503:
        return status.UNAVAILABLE;
      case 504:
        return status.DEADLINE_EXCEEDED;
      default:
        return status.UNKNOWN;
    }
  }
}

