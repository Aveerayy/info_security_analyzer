# Info Security Analyzer

Analyze architecture diagrams with AI-assisted STRIDE threat modeling.

Info Security Analyzer helps security engineers, architects, and developers turn uploaded diagrams into structured threat-model findings, risk summaries, and exportable reports.

![Demo report placeholder](docs/assets/demo-report-placeholder.svg)

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
- **Built-in demo report mode** for local screenshots and product walkthroughs without API keys

## Quick start

### Prerequisites

- Node.js 18+
- Python 3.10+
- One API key for Azure OpenAI, OpenAI, Anthropic, or Google Gemini

### Option 1: local development

```bash
git clone https://github.com/Aveerayy/info_security_analyzer.git
cd info_security_analyzer

# backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# frontend (new terminal)
cd ..
npm install
npm run dev
```

Open `http://localhost:5173`

Tip: click **Load Demo Report** to explore the UI and capture screenshots without configuring any provider.

### Option 2: Docker

```bash
./docker-run.sh full
```

On first run, a `.env` file will be created if needed. You can configure provider credentials either:

- in `.env` for self-hosted use, or
- in the UI settings for local evaluation

## Demo mode for screenshots and walkthroughs

If you just want to preview the product or capture demo assets:

1. Run `npm install`
2. Run `npm run dev`
3. Open `http://localhost:5173`
4. Click **Load Demo Report**
5. Capture screenshots locally

See `docs/demo-assets.md` for the recommended capture flow and placeholder asset.

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
- API keys entered in the UI are kept in memory for the current browser tab session and are cleared on refresh/close
- self-hosted users can instead provide provider credentials through environment variables
- generated findings can be helpful, but they still require human validation

If you are evaluating the tool for real environments, prefer sanitized diagrams first.

See also: `SECURITY.md`

## LLM provider configuration

Configure **one** of the following providers via environment variables or the UI settings:

| Provider | Environment variables |
|---|---|
| Azure OpenAI | `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` |
| OpenAI | `OPENAI_API_KEY` |
| Anthropic | `ANTHROPIC_API_KEY` |
| Google Gemini | `GOOGLE_API_KEY` |

## Project structure

```text
├── backend/              # FastAPI backend and provider integrations
├── src/                  # React frontend
├── docker-compose.yml    # Multi-service local orchestration
├── Dockerfile            # Production frontend image
├── Dockerfile.dev        # Development image
└── README.md
```

## Recommended next improvements

For stronger adoption and trust, the repo will benefit from:

- a screenshot or short GIF near the top of this README
- a sample redacted report under `docs/`
- a verified clean-machine quickstart
- release notes / changelog hygiene

## Contributing

Contributions are welcome.

- See `CONTRIBUTING.md` for setup and PR expectations
- Please report security issues privately as described in `SECURITY.md`

## License

MIT
