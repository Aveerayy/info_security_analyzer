# OIDC Authentication Container Setup

This container is configured to run the info-security-analyzer with OIDC authentication capabilities for Kubernetes clusters.

## Prerequisites

1. **Kubeconfig with OIDC**: Make sure you have the kubeconfig file at `~/.kube/iss-k8s-config` with the proper OIDC authentication configuration
2. **Docker and Docker Compose**: Make sure both are installed

## Running the OIDC Container

### Option 1: Using the helper script (recommended)
```bash
./run-oidc.sh
```

### Option 2: Using docker-compose directly
```bash
docker-compose up --build oidc
```

## Accessing the Application

- Application will be available at: `http://localhost:5175`
- The container includes kubectl with the OIDC login plugin
- OIDC authentication will be handled automatically based on your kubeconfig

## OIDC Authentication Process

When you run kubectl commands that require authentication, the OIDC login process will:
1. Start a local server on port 8000 inside the container
2. This port is forwarded to your host machine at http://localhost:8000
3. When prompted, open http://localhost:8000 in your browser to complete the authentication
4. After authentication, the token will be saved and used for kubectl commands

Example of using kubectl inside the container:
```bash
# Get a shell in the container
docker-compose exec oidc /bin/bash

# Inside the container, run kubectl commands
kubectl get pods
# If authentication is needed, visit http://localhost:8000 in your browser when prompted
```

## Troubleshooting

1. **Authentication Issues**: Check that your OIDC provider (purestorage.okta.com) is accessible and credentials are correct
2. **Network Issues**: Ensure the container can reach your Kubernetes cluster and OIDC provider
3. **Config Issues**: Verify your kubeconfig syntax and OIDC configuration
4. **Browser Access**: Make sure you can access http://localhost:8000 from your host machine when prompted

## Configuration

The container uses the kubeconfig from `~/.kube/iss-k8s-config` which includes multiple clusters:
- sfo-eng-prd1
- sfo-fa-general-prd1
- sfo-fa-general-stg1 (default)
- slc-eng-prd1
- slc-eng-prd2
- slc-eng-stg1
- slc-eng-stg2 