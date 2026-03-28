"""
FastAPI Backend for Info Security Analyzer
Provides REST API endpoints for security analysis with multi-provider LLM support
"""

import json
import logging
import os
from typing import Optional

from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

try:
    from .analyzer import SYSTEM_PROMPT, extract_pdf_content, process_image_file, get_file_type
    from .llm_providers import get_llm_client, PROVIDER_INFO
except ImportError:  # pragma: no cover - allows `python backend/main.py` style execution
    from analyzer import SYSTEM_PROMPT, extract_pdf_content, process_image_file, get_file_type
    from llm_providers import get_llm_client, PROVIDER_INFO

logger = logging.getLogger(__name__)

SUPPORTED_PROVIDERS = set(PROVIDER_INFO.keys())
DEFAULT_AZURE_API_VERSION = "2024-08-01-preview"

# Optional environment-backed Azure OpenAI configuration.
# No legacy fallback endpoint/deployment is provided: operators must configure these explicitly.
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT")
AZURE_API_KEY = os.getenv("AZURE_OPENAI_API_KEY")
AZURE_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", DEFAULT_AZURE_API_VERSION)

# Create FastAPI app
app = FastAPI(
    title="Info Security Analyzer API",
    description="API for performing STRIDE threat model analysis on architecture diagrams",
    version="2.0.0"
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative dev port
        "http://localhost:80",    # Production
        "http://localhost",       # Docker
        "*"                       # Allow all for development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class HealthResponse(BaseModel):
    status: str
    message: str


class AnalysisResponse(BaseModel):
    success: bool
    data: Optional[dict] = None
    error: Optional[str] = None
    provider: Optional[str] = None


def normalize_provider(provider: Optional[str]) -> Optional[str]:
    if provider is None:
        return None

    normalized = provider.strip().lower()
    if not normalized:
        return None

    if normalized not in SUPPORTED_PROVIDERS:
        raise HTTPException(status_code=400, detail=f"Unsupported provider: {provider}")

    return normalized


def azure_runtime_config_from_request(
    api_key: Optional[str],
    endpoint: Optional[str],
    deployment: Optional[str],
    api_version: Optional[str],
) -> dict:
    config = {
        "api_key": api_key or AZURE_API_KEY,
        "endpoint": endpoint or AZURE_ENDPOINT,
        "deployment": deployment or AZURE_DEPLOYMENT,
        "api_version": api_version or AZURE_API_VERSION,
    }

    missing_fields = [
        field_name
        for field_name in ("api_key", "endpoint", "deployment")
        if not config.get(field_name)
    ]
    if missing_fields:
        missing_display = ", ".join(missing_fields)
        raise HTTPException(
            status_code=400,
            detail=(
                "Azure OpenAI configuration is incomplete. Missing: "
                f"{missing_display}. Provide them in the request or set the corresponding "
                "AZURE_OPENAI_* environment variables."
            ),
        )

    return config


def build_provider_config(
    provider: Optional[str],
    api_key: Optional[str],
    endpoint: Optional[str],
    deployment: Optional[str],
    model: Optional[str],
    api_version: Optional[str],
) -> tuple[str, dict]:
    use_provider = normalize_provider(provider)

    if use_provider is None:
        if AZURE_API_KEY and AZURE_ENDPOINT and AZURE_DEPLOYMENT:
            use_provider = "azure_openai"
        else:
            raise HTTPException(
                status_code=400,
                detail=(
                    "No provider configured. Select a provider in the UI or configure a complete "
                    "Azure OpenAI environment (AZURE_OPENAI_API_KEY, AZURE_OPENAI_ENDPOINT, "
                    "AZURE_OPENAI_DEPLOYMENT)."
                ),
            )

    if use_provider == "azure_openai":
        config = azure_runtime_config_from_request(api_key, endpoint, deployment, api_version)
    elif use_provider == "openai":
        if not api_key:
            raise HTTPException(status_code=400, detail="OpenAI API key is required")
        config = {
            "api_key": api_key,
            "model": model or "gpt-4o",
        }
    elif use_provider == "anthropic":
        if not api_key:
            raise HTTPException(status_code=400, detail="Anthropic API key is required")
        config = {
            "api_key": api_key,
            "model": model or "claude-sonnet-4-20250514",
        }
    elif use_provider == "google":
        if not api_key:
            raise HTTPException(status_code=400, detail="Google API key is required")
        config = {
            "api_key": api_key,
            "model": model or "gemini-1.5-pro",
        }
    else:
        raise HTTPException(status_code=400, detail=f"Unsupported provider: {use_provider}")

    return use_provider, config


@app.get("/", response_model=HealthResponse)
async def root():
    """Root endpoint - health check"""
    return HealthResponse(
        status="ok",
        message="Info Security Analyzer API is running"
    )


@app.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint"""
    return HealthResponse(
        status="healthy",
        message="Service is operational"
    )


@app.get("/api/providers")
async def get_providers():
    """Get available LLM providers and their configuration requirements"""
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "providers": PROVIDER_INFO
        }
    )


def analyze_with_provider(file_bytes: bytes, filename: str, llm_client) -> dict:
    """
    Analyze file using the provided LLM client.

    Args:
        file_bytes: Raw file bytes
        filename: Original filename
        llm_client: Configured LLM client instance

    Returns:
        Dictionary containing the security analysis results
    """
    import tempfile

    ext = os.path.splitext(filename)[1]

    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name

    try:
        file_type = get_file_type(tmp_path)

        if file_type == 'unknown':
            raise ValueError(f"Unsupported file type for {filename}")

        images = []
        user_prompt = "Analyze this architecture diagram for security threats using the STRIDE model. Identify all components, their relationships, and provide a comprehensive security assessment."

        if file_type == 'image':
            encoded_image = process_image_file(tmp_path)
            if not encoded_image:
                raise ValueError("Failed to process the image file")
            images.append(encoded_image)

        elif file_type == 'pdf':
            pdf_content = extract_pdf_content(tmp_path)

            if not pdf_content["text"] and not pdf_content["images"]:
                raise ValueError("Could not extract any usable content from the PDF")

            if pdf_content["text"]:
                user_prompt += f"\n\nExtracted text from document:\n\n{pdf_content['text']}"

            images.extend(pdf_content["images"])

        response_text = llm_client.analyze_with_image(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            images=images,
            max_tokens=4000
        )

        try:
            if response_text.startswith("```"):
                lines = response_text.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines[-1].strip() == "```":
                    lines = lines[:-1]
                response_text = "\n".join(lines)

            result = json.loads(response_text)
        except json.JSONDecodeError:
            result = {
                "components": [],
                "dataFlows": [],
                "assessmentSummary": {
                    "topRisks": [],
                    "nextSteps": ["Unable to parse structured response. Raw analysis follows."]
                },
                "rawAnalysis": response_text
            }

        return result

    finally:
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)


@app.post("/api/analyze")
async def analyze_diagram(
    file: UploadFile = File(...),
    provider: Optional[str] = Form(None),
    api_key: Optional[str] = Form(None),
    endpoint: Optional[str] = Form(None),
    deployment: Optional[str] = Form(None),
    model: Optional[str] = Form(None),
    api_version: Optional[str] = Form(None),
):
    """
    Analyze an uploaded architecture diagram or document.

    Accepts:
    - Images: PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP, SVG
    - Documents: PDF

    Provider options:
    - openai: Requires api_key, optional model (default: gpt-4o)
    - azure_openai: Requires api_key, endpoint, deployment
    - anthropic: Requires api_key, optional model (default: claude-sonnet-4-20250514)
    - google: Requires api_key, optional model (default: gemini-1.5-pro)

    If no provider is specified, the backend only falls back to Azure OpenAI when a complete
    Azure environment configuration is present.

    Returns:
    - Structured STRIDE threat model analysis
    """
    allowed_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.pdf'}
    file_ext = os.path.splitext(file.filename)[1].lower() if file.filename else ''

    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file_ext}. Allowed types: {', '.join(allowed_extensions)}"
        )

    try:
        file_content = await file.read()

        if len(file_content) == 0:
            raise HTTPException(status_code=400, detail="Empty file uploaded")

        use_provider, config = build_provider_config(
            provider=provider,
            api_key=api_key,
            endpoint=endpoint,
            deployment=deployment,
            model=model,
            api_version=api_version,
        )

        logger.info("Starting analysis", extra={"provider": use_provider, "filename": file.filename})

        llm_client = get_llm_client(use_provider, config)
        result = analyze_with_provider(file_content, file.filename, llm_client)

        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result,
                "filename": file.filename,
                "provider": llm_client.provider_name
            }
        )

    except FileNotFoundError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except HTTPException:
        raise
    except Exception:
        logger.exception("Analysis failed", extra={"filename": file.filename})
        raise HTTPException(
            status_code=500,
            detail="Analysis failed due to an internal server error. Check backend logs for details."
        )


@app.post("/api/analyze-multiple")
async def analyze_multiple_diagrams(
    files: list[UploadFile] = File(...),
    provider: Optional[str] = Form(None),
    api_key: Optional[str] = Form(None),
    endpoint: Optional[str] = Form(None),
    deployment: Optional[str] = Form(None),
    model: Optional[str] = Form(None),
    api_version: Optional[str] = Form(None),
):
    """
    Analyze multiple uploaded files.
    Returns combined analysis results.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")

    use_provider, config = build_provider_config(
        provider=provider,
        api_key=api_key,
        endpoint=endpoint,
        deployment=deployment,
        model=model,
        api_version=api_version,
    )

    try:
        llm_client = get_llm_client(use_provider, config)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    results = []
    errors = []

    for file in files:
        try:
            file_content = await file.read()
            result = analyze_with_provider(file_content, file.filename, llm_client)
            results.append({
                "filename": file.filename,
                "analysis": result
            })
        except Exception as e:
            logger.warning("Multi-file analysis item failed", extra={"filename": file.filename, "provider": use_provider})
            errors.append({
                "filename": file.filename,
                "error": str(e)
            })

    return JSONResponse(
        status_code=200,
        content={
            "success": len(results) > 0,
            "results": results,
            "errors": errors if errors else None,
            "provider": llm_client.provider_name
        }
    )


# Run with: uvicorn backend.main:app --reload --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
