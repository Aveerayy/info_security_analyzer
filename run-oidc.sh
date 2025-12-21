#!/bin/bash

echo "Starting OIDC-enabled container..."

# Check if kubeconfig exists
if [ ! -f ~/.kube/iss-k8s-config ]; then
    echo "Warning: No kubeconfig found at ~/.kube/iss-k8s-config"
    echo "Please ensure your kubeconfig is properly configured for OIDC authentication"
    exit 1
fi

# Build and run the OIDC container
docker-compose up --build oidc

echo "OIDC container is running on http://localhost:5175"
echo "Kubeconfig is mounted from ~/.kube/iss-k8s-config" 