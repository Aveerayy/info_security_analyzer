#!/bin/bash

# Info Security Analyzer - Docker Run Script
# Usage: ./docker-run.sh [dev|prod|backend|full]

set -e

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
        echo -e "${YELLOW}Please update .env with your Azure OpenAI API key${NC}"
    fi
fi

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

case "$1" in
    dev)
        echo -e "${GREEN}Starting development environment (frontend only)...${NC}"
        echo -e "${YELLOW}Note: Backend must be running separately or use 'full' mode${NC}"
        docker-compose up dev
        ;;
    
    backend)
        echo -e "${GREEN}Starting backend API server...${NC}"
        docker-compose up backend
        ;;
    
    full)
        echo -e "${GREEN}Starting full stack (frontend + backend)...${NC}"
        docker-compose up backend frontend-dev
        ;;
    
    prod)
        echo -e "${GREEN}Starting production environment...${NC}"
        docker-compose up -d backend frontend-prod
        echo -e "${GREEN}Application running at:${NC}"
        echo -e "  Frontend: http://localhost:80"
        echo -e "  Backend:  http://localhost:8000"
        ;;
    
    build)
        echo -e "${GREEN}Building all Docker images...${NC}"
        docker-compose build
        ;;
    
    stop)
        echo -e "${YELLOW}Stopping all containers...${NC}"
        docker-compose down
        ;;
    
    logs)
        docker-compose logs -f
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
        echo "Environment:"
        echo "  Copy .env.example to .env and update with your Azure OpenAI credentials"
        exit 1
        ;;
esac
