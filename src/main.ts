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

  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      grpcConfig,
    );

    await app.listen();

    console.log('✅ Notification Service is listening for gRPC requests');
    console.log(`🔒 TLS: ${grpcConfig.options.credentials ? 'Enabled (mTLS)' : 'Disabled'}`);
  } catch (error) {
    if (error.message?.includes('EADDRINUSE')) {
      const port = grpcConfig.options.url.split(':').pop();
      console.error(`\n❌ Port ${port} is already in use!`);
      console.error('\n💡 Solutions:');
      console.error('   1. Stop the existing service');
      console.error(`   2. Run: .\\scripts\\kill-port.ps1 -Port ${port}`);
      console.error(`   3. Or manually: Get-NetTCPConnection -LocalPort ${port} | Select OwningProcess`);
      console.error('   4. Use a different port with GRPC_PORT environment variable\n');
    }
    throw error;
  }
}

bootstrap().catch((error) => {
  console.error('❌ Failed to start service:', error.message || error);
  process.exit(1);
});

