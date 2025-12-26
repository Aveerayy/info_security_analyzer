# Info Security Analyzer

AI-powered security threat analysis tool that performs STRIDE-based threat modeling on architecture diagrams.

## Features

- **Diagram Analysis**: Upload architecture diagrams (PNG, JPG, PDF) for automated security analysis
- **STRIDE Threat Modeling**: Identifies Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, and Elevation of Privilege threats
- **Multi-LLM Support**: Works with Azure OpenAI, OpenAI, Anthropic Claude, or Google Gemini
- **Interactive Reports**: Visual component relationship diagrams and detailed risk breakdowns
- **PDF Export**: Generate comprehensive 5-7 page security assessment reports

## Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- API key for one of: Azure OpenAI, OpenAI, Anthropic, or Google Gemini

### Option 1: Local Development

```bash
# Clone the repository
git clone https://github.com/Aveerayy/info_security_analyzer.git
cd info_security_analyzer

# Start backend
cd backend
pip install -r requirements.txt
uvicorn main:app --port 8000

# Start frontend (new terminal)
cd ..
npm install
npm run dev
```

Open http://localhost:5173

### Option 2: Docker

```bash
# Run with Docker Compose
./docker-run.sh full
```

On first run, a `.env` file will be created. Configure your preferred LLM provider there or use the UI settings.

## Usage

1. **Configure LLM**: Click the settings button to select your LLM provider and enter your API key
2. **Upload Diagram**: Drag & drop or browse to upload an architecture diagram
3. **Analyze**: Click "Start Security Analysis" to begin the assessment
4. **Review Results**: Explore the interactive security report with:
   - Executive summary with risk counts
   - Component-level STRIDE analysis
   - Data flow security risks
   - Actionable recommendations
5. **Export**: Download a PDF report for documentation

## Project Structure

```
├── backend/                 # Python FastAPI backend
│   ├── main.py             # API endpoints
│   ├── analyzer.py         # Core analysis logic
│   ├── llm_providers.py    # Multi-LLM abstraction
│   └── requirements.txt    # Python dependencies
├── src/
│   ├── aksec/              # Main application components
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   └── layouts/        # Layout components
│   └── components/ui/      # shadcn/ui components
├── docker-compose.yml      # Docker orchestration
└── package.json            # Node.js dependencies
```

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Python FastAPI, OpenAI SDK
- **Visualization**: D3.js for relationship diagrams
- **PDF Generation**: jsPDF with autoTable

## LLM Provider Configuration

Configure **one** of the following providers via environment variables or the UI settings:

| Provider | Environment Variables |
|----------|----------------------|
| **Azure OpenAI** | `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`, `AZURE_OPENAI_DEPLOYMENT` |
| **OpenAI** | `OPENAI_API_KEY` |
| **Anthropic Claude** | `ANTHROPIC_API_KEY` |
| **Google Gemini** | `GOOGLE_API_KEY` |

**Note**: API keys can also be configured directly in the UI by clicking the settings button - no environment variables required.

## License

MIT
