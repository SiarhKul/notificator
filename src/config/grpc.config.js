"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrpcConfig = getGrpcConfig;
var microservices_1 = require("@nestjs/microservices");
var path_1 = require("path");
var fs = require("fs");
var grpc_js_1 = require("@grpc/grpc-js");
function getGrpcConfig() {
    var host = process.env.GRPC_HOST || '0.0.0.0';
    var port = process.env.GRPC_PORT || '50051';
    var useTls = process.env.GRPC_USE_TLS === 'true';
    var config = {
        transport: microservices_1.Transport.GRPC,
        options: {
            url: "".concat(host, ":").concat(port),
            package: 'notification',
            protoPath: (0, path_1.join)(__dirname, '../../proto/notification.proto'),
            loader: {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true,
            },
        },
    };
    // Configure mTLS if enabled
    if (useTls) {
        try {
            var serverCert = fs.readFileSync(process.env.GRPC_SERVER_CERT_PATH || './certs/server-cert.pem');
            var serverKey = fs.readFileSync(process.env.GRPC_SERVER_KEY_PATH || './certs/server-key.pem');
            var caCert = fs.readFileSync(process.env.GRPC_CA_CERT_PATH || './certs/ca-cert.pem');
            var checkClientCert = process.env.GRPC_CLIENT_CERT_REQUIRED === 'true';
            config.options.credentials = grpc_js_1.ServerCredentials.createSsl(caCert, [
                {
                    cert_chain: serverCert,
                    private_key: serverKey,
                },
            ], checkClientCert);
            console.log('✓ gRPC mTLS enabled');
        }
        catch (error) {
            console.error('❌ Failed to load TLS certificates:', error.message);
            throw error;
        }
    }
    else {
        console.log('⚠ gRPC running without TLS (insecure)');
    }
    return config;
}
