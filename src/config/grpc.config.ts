import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import * as fs from 'fs';
import {  ServerCredentials } from '@grpc/grpc-js';

console.log('dirname:', __dirname);
export interface GrpcConfig {
  transport: Transport.GRPC;
  options: {
    url: string;
    package: string;
    protoPath: string;
    credentials?: ServerCredentials;
    loader?: {
      keepCase?: boolean;
      longs?: any;
      enums?: any;
      defaults?: boolean;
      oneofs?: boolean;
    };
  };
}

export function getGrpcConfig(): GrpcConfig {
  const host = process.env.GRPC_HOST || '0.0.0.0';
  const port = process.env.GRPC_PORT || '50051';
  const useTls = process.env.GRPC_USE_TLS === 'true';

  const config: GrpcConfig = {
    transport: Transport.GRPC,
    options: {
      url: `${host}:${port}`,
      package: 'notification',
      protoPath: join(__dirname, '../../proto/notification.proto'),
      loader: {
        keepCase: true,
        longs: 'String' as any,
        enums: 'String' as any,
        defaults: true,
        oneofs: true,
      },
    },
  };

  if (useTls) {
    try {
      const serverCert = fs.readFileSync(
        process.env.GRPC_SERVER_CERT_PATH || './certs/server-cert.pem',
      );
      const serverKey = fs.readFileSync(
        process.env.GRPC_SERVER_KEY_PATH || './certs/server-key.pem',
      );
      const caCert = fs.readFileSync(
        process.env.GRPC_CA_CERT_PATH || './certs/ca-cert.pem',
      );

      const checkClientCert =
        process.env.GRPC_CLIENT_CERT_REQUIRED === 'true';

      config.options.credentials = ServerCredentials.createSsl(
        caCert,
        [
          {
            cert_chain: serverCert,
            private_key: serverKey,
          },
        ],
        checkClientCert,
      );

      console.log('✓ gRPC mTLS enabled');
    } catch (error) {
      console.error('❌ Failed to load TLS certificates:', error.message);
      throw error;
    }
  } else {
    console.log('⚠ gRPC running without TLS (insecure)');
  }

  return config;
}

