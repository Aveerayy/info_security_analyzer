#!/bin/bash

echo "Setting up OIDC authentication..."

# Configure kubectl to use port forwarding for OIDC login
export KUBELOGIN_SERVER_PORT=8000
export KUBELOGIN_SERVER_BIND_ADDRESS="0.0.0.0"

if [ -f "/root/.kube/config" ]; then
    echo "Kubeconfig found, testing connection..."
    echo "======================================================"
    echo "OIDC authentication is configured with port forwarding."
    echo "When prompted, please visit http://localhost:8000 in your browser"
    echo "to complete the authentication process."
    echo "======================================================"
    kubectl config get-contexts
    echo "Current context: $(kubectl config current-context)"
else
    echo "No kubeconfig found. Please mount your kubeconfig to /root/.kube/config"
fi

# Start the development server
npm run dev -- --host 