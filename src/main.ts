import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { getGrpcConfig } from './config/grpc.config';

async function bootstrap() {
  const grpcConfig = getGrpcConfig();

  console.log('🚀 Starting Notification Service...');
  console.log(`📡 gRPC URL: ${grpcConfig.options.url}`);
  console.log(`📦 Package: ${grpcConfig.options.package}`);
  console.log(`📄 Proto: ${grpcConfig.options.protoPath}`);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    grpcConfig,
  );

  await app.listen();

  console.log('✅ Notification Service is listening for gRPC requests');
  console.log(`🔒 TLS: ${grpcConfig.options.credentials ? 'Enabled (mTLS)' : 'Disabled'}`);
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start service:', error);
  process.exit(1);
});

