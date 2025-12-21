# Info Security Analyzer

AI-powered security threat analysis tool for architecture diagrams using STRIDE methodology.

## Overview

Upload architecture diagrams (images, PDFs) and get comprehensive security analysis powered by Azure OpenAI GPT-4.

## Quick Start

```bash
# Start backend
cd backend && pip install -r requirements.txt && uvicorn main:app --port 8000

# Start frontend (in another terminal)
npm install && npm run dev
```

Open http://localhost:5173 and upload a diagram to analyze.

## Tech Stack

- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Python FastAPI + Azure OpenAI
- **Analysis**: STRIDE threat modeling framework
