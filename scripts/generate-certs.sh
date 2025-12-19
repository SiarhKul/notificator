#!/bin/bash
cd ..

ls -lh *.pem
echo "Generated files:"
echo ""
echo "📁 Location: $CERTS_DIR"
echo "✅ Certificates generated successfully!"

rm -f server-csr.pem client-csr.pem
# Cleanup CSR files

  -CA ca-cert.pem -CAkey ca-key.pem -set_serial 02 -out client-cert.pem
openssl x509 -req -days $DAYS_VALID -in client-csr.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=api-gateway"
openssl req -new -key client-key.pem -out client-csr.pem \
openssl genrsa -out client-key.pem 4096
echo "3️⃣ Generating Client Certificate..."
# 3. Generate Client Certificate

  -CA ca-cert.pem -CAkey ca-key.pem -set_serial 01 -out server-cert.pem
openssl x509 -req -days $DAYS_VALID -in server-csr.pem \
  -subj "/C=US/ST=State/L=City/O=Organization/CN=notification-service"
openssl req -new -key server-key.pem -out server-csr.pem \
openssl genrsa -out server-key.pem 4096
echo "2️⃣ Generating Server Certificate..."
# 2. Generate Server Certificate

  -subj "/C=US/ST=State/L=City/O=Organization/CN=NotificationServiceCA"
openssl req -new -x509 -days $DAYS_VALID -key ca-key.pem -out ca-cert.pem \
openssl genrsa -out ca-key.pem 4096
echo "1️⃣ Generating CA..."
# 1. Generate CA (Certificate Authority)

cd $CERTS_DIR
mkdir -p $CERTS_DIR
# Create certs directory

echo "🔐 Generating gRPC mTLS certificates..."

DAYS_VALID=365
CERTS_DIR="./certs"

set -e

# generate-certs.sh - Generate self-signed certificates for gRPC mTLS

