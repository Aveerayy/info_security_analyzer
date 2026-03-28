#!/bin/bash

# Info Security Analyzer - Docker Run Script
# Usage: ./docker-run.sh [dev|prod|backend|full]

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists, if not create from example
if [ ! -f .env ]; then
    if [ -f .env.example ]; then
        echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
        cp .env.example .env
        echo -e "${YELLOW}Please update .env with your LLM provider API key${NC}"
    else
        echo -e "${YELLOW}No .env file found. Creating template...${NC}"
        cat > .env << 'EOF'
# LLM Provider Configuration
# Configure ONE of the following providers:

# Option 1: Azure OpenAI
AZURE_OPENAI_API_KEY=
AZURE_OPENAI_ENDPOINT=
AZURE_OPENAI_DEPLOYMENT=

# Option 2: OpenAI
OPENAI_API_KEY=

# Option 3: Anthropic Claude
ANTHROPIC_API_KEY=

# Option 4: Google Gemini
GOOGLE_API_KEY=
EOF
        echo -e "${YELLOW}Created .env file. Please add your API key for your preferred LLM provider.${NC}"
    fi
fi

# Prefer Docker Compose v2 but fall back to docker-compose if needed.
if command -v docker >/dev/null 2>&1 && docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD=(docker compose)
elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD=(docker-compose)
else
    echo -e "${RED}Docker Compose is not installed. Install Docker Desktop or docker-compose first.${NC}"
    exit 1
fi

# Load environment variables from .env without mangling quoted values.
if [ -f .env ]; then
    set -a
    # shellcheck disable=SC1091
    . ./.env
    set +a
fi

case "${1:-}" in
    dev)
        echo -e "${GREEN}Starting development environment (frontend only)...${NC}"
        echo -e "${YELLOW}Note: Backend must be running separately or use 'full' mode${NC}"
        "${COMPOSE_CMD[@]}" up dev
        ;;
    
    backend)
        echo -e "${GREEN}Starting backend API server...${NC}"
        "${COMPOSE_CMD[@]}" up backend
        ;;
    
    full)
        echo -e "${GREEN}Starting full stack (frontend + backend)...${NC}"
        "${COMPOSE_CMD[@]}" up backend frontend-dev
        ;;
    
    prod)
        echo -e "${GREEN}Starting production environment...${NC}"
        "${COMPOSE_CMD[@]}" up -d backend frontend-prod
        echo -e "${GREEN}Application running at:${NC}"
        echo -e "  Frontend: http://localhost:80"
        echo -e "  Backend:  http://localhost:8000"
        ;;
    
    build)
        echo -e "${GREEN}Building all Docker images...${NC}"
        "${COMPOSE_CMD[@]}" build
        ;;
    
    stop)
        echo -e "${YELLOW}Stopping all containers...${NC}"
        "${COMPOSE_CMD[@]}" down
        ;;
    
    logs)
        "${COMPOSE_CMD[@]}" logs -f
        ;;
    
    *)
        echo -e "${GREEN}Info Security Analyzer - Docker Runner${NC}"
        echo ""
        echo "Usage: $0 {dev|backend|full|prod|build|stop|logs}"
        echo ""
        echo "Commands:"
        echo "  dev      - Start frontend development server (hot-reload)"
        echo "  backend  - Start backend API server only"
        echo "  full     - Start both frontend and backend for development"
        echo "  prod     - Start production environment (detached)"
        echo "  build    - Build all Docker images"
        echo "  stop     - Stop all running containers"
        echo "  logs     - View container logs"
        echo ""
        echo "LLM Providers (configure in .env or UI):"
        echo "  - Azure OpenAI"
        echo "  - OpenAI"
        echo "  - Anthropic Claude"
        echo "  - Google Gemini"
        echo ""
        echo "Note: API keys can be configured via .env file or in the UI settings"
        exit 1
        ;;
esac
