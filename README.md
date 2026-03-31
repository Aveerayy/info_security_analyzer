# Info Security Analyzer

[![CI](https://img.shields.io/github/actions/workflow/status/Aveerayy/info_security_analyzer/ci.yml?branch=main&label=CI)](https://github.com/Aveerayy/info_security_analyzer/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
[![Security Policy](https://img.shields.io/badge/security-policy-blue.svg)](SECURITY.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

Analyze architecture diagrams with AI-assisted STRIDE threat modeling.

Info Security Analyzer helps security engineers, architects, and developers turn uploaded diagrams and PDFs into structured STRIDE-oriented findings, risk summaries, and exportable reports.

**Best for:** fast first-pass threat modeling, security review prep, and stakeholder-friendly report exports.

**Not for:** replacing human judgment, security sign-off, or guaranteeing completeness.

## What you get in one pass

- Upload a diagram or PDF and turn it into structured STRIDE-oriented findings
- Review risks by component, flow, and summary recommendations
- Export a stakeholder-friendly report instead of stitching together notes by hand
- Preview the UX with the built-in demo report before adding any provider credentials

![Demo report preview](docs/assets/demo-report-placeholder.svg)

Quick links: [Quick start](#quick-start) · [SECURITY.md](SECURITY.md) · [CONTRIBUTING.md](CONTRIBUTING.md) · [Demo assets](docs/demo-assets.md)

## Try it in 2 minutes

If you want to evaluate the project before wiring up LLM credentials:

1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:5173`
5. Click **Load Demo Report**

That path lets GitHub visitors preview the report UX immediately, without API keys or backend setup.

## Why this exists

Threat modeling is useful but often skipped because it is slow, inconsistent, or hard to start. This project aims to lower the friction:

- upload a diagram or PDF
- identify components and data flows
- generate STRIDE-oriented findings
- review recommendations and export a report

This is an assistive tool, **not** a certification or guarantee of completeness. Human review is still required.

## Features

- **Diagram and document analysis** for PNG, JPG, and PDF inputs
- **STRIDE threat modeling** across components and data flows
- **Multi-LLM support** for Azure OpenAI, OpenAI, Anthropic, and Google Gemini
- **Interactive report output** with risk breakdowns and relationship views
- **PDF export** for sharing and documentation
- **Built-in demo report** so you can preview the UI without API keys

## Prerequisites

- Node.js 18+
- Python 3.10+
- Docker Desktop or Docker Engine + Docker Compose (for containerized runs)
- One API key for Azure OpenAI, OpenAI, Anthropic, or Google Gemini if you want live analysis

## Choose your path

| Goal | Best option |
|---|---|
| Preview the UI with no API key | `npm install && npm run dev`, then click **Load Demo Report** |
| Run the full stack locally for development | Local development setup below |
| Start with containers | Docker quickstart or Docker Compose |

## Quick start

### Option 1: local development

```bash
git clone https://github.com/Aveerayy/info_security_analyzer.git
cd info_security_analyzer

# Backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

In a second terminal:

```bash
cd info_security_analyzer
npm install
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- Backend health: `http://localhost:8000/health`

Notes:

- You can click **Load Demo Report** immediately to validate the UI without backend credentials.
- For live analysis, configure a provider in the UI or set environment variables before starting the backend.

### Option 2: Docker quickstart

```bash
cp .env.example .env
# edit .env only if you want server-side provider defaults
./docker-run.sh full
```

This starts:

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

On first run, the script can still create `.env` from `.env.example` if needed, but copying and reviewing it yourself is clearer for deployments.

### Option 3: Docker Compose directly

```bash
docker compose up --build backend frontend-dev
```

If you want a production-style frontend image instead:

```bash
docker compose up --build backend frontend-prod
```

The production frontend is served on `http://localhost`.

## Environment configuration

A sample environment file is included as `.env.example`.

Configure **one** of the following providers via environment variables or the UI settings:

| Provider | Environment variables |
|---|---|
| Azure OpenAI | `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT`, optionally `AZURE_OPENAI_API_VERSION` |
| OpenAI | `OPENAI_API_KEY` |
| Anthropic | `ANTHROPIC_API_KEY` |
| Google Gemini | `GOOGLE_API_KEY` |

### Deployment note

This repository does **not** ship a usable Azure endpoint, deployment, or placeholder key anymore. For self-hosting, set your own environment variables explicitly. For local evaluation, entering credentials in the UI is usually the safest starting point.

## How it works

1. Configure an LLM provider
2. Upload an architecture diagram or PDF
3. Run analysis
4. Review findings across components, data flows, and summary recommendations
5. Export the report if needed

## Trust, privacy, and limits

Before using this on sensitive material, understand the basic trust boundaries:

- uploaded diagrams/PDFs are processed by the backend
- analysis content may be sent to the configured LLM provider
- API keys entered in the UI are kept only in memory for the current browser tab session and are cleared on refresh/close
- self-hosted users can instead provide provider credentials through environment variables
- if no provider is selected, the backend only falls back to Azure OpenAI when a complete Azure environment configuration is present
- generated findings can be helpful, but they still require human validation

If you are evaluating the tool for real environments, prefer sanitized diagrams first.

See also: `SECURITY.md`

## Project structure

```text
├── backend/              # FastAPI backend and provider integrations
├── src/                  # React frontend
├── docker-compose.yml    # Multi-service local orchestration
├── Dockerfile            # Production frontend image
├── Dockerfile.dev        # Development frontend image
├── docker-run.sh         # Convenience wrapper for compose workflows
└── README.md
```

## Contributing

Contributions are welcome.

- See `CONTRIBUTING.md` for setup and PR expectations
- Run `./scripts/smoke-test.sh` before opening a PR to verify the main local path (frontend build, lint, backend import, health endpoint, and expected no-provider API error)
- Run `python -m unittest discover -s tests -p 'test_*.py' -v` for a fast backend CI-smoke check without starting the full local stack
- Please report security issues privately as described in `SECURITY.md`

## Growth and launch planning

Repo-local launch planning lives in [`docs/growth/`](./docs/growth/).

**Start here for this week’s launch:** [`launch-operator-packet.md`](./docs/growth/launch-operator-packet.md)

Supporting docs:

- [`day-of-launch-scorecard.md`](./docs/growth/day-of-launch-scorecard.md)
- [`30-day-launch-plan.md`](./docs/growth/30-day-launch-plan.md)
- [`7-day-execution-plan.md`](./docs/growth/7-day-execution-plan.md)
- [`channel-strategy.md`](./docs/growth/channel-strategy.md)
- [`channel-execution-sequencing.md`](./docs/growth/channel-execution-sequencing.md)
- [`messaging-and-assets.md`](./docs/growth/messaging-and-assets.md)
- [`launch-assets.md`](./docs/growth/launch-assets.md)

The operator packet is the single execution doc for launch week; the supporting docs hold the deeper planning, messaging rationale, and reusable templates behind it.

## License

MIT
