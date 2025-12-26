"""
FastAPI Backend for Info Security Analyzer
Provides REST API endpoints for security analysis with multi-provider LLM support
"""

import os
import tempfile
import json
from typing import Optional
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from analyzer import analyze_file_bytes, SYSTEM_PROMPT, extract_pdf_content, process_image_file, get_file_type
from llm_providers import get_llm_client, PROVIDER_INFO, LLMProvider

# Default Azure OpenAI configuration (for backward compatibility)
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "https://isec-test.openai.azure.com/")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4.1-mini")
AZURE_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "")
AZURE_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", "2024-08-01-preview")

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
    import os
    
    # Get file extension
    ext = os.path.splitext(filename)[1]
    
    # Write to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    
    try:
        file_type = get_file_type(tmp_path)
        
        if file_type == 'unknown':
            raise ValueError(f"Unsupported file type for {filename}")
        
        # Prepare images and prompt
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
        
        # Call LLM
        response_text = llm_client.analyze_with_image(
            system_prompt=SYSTEM_PROMPT,
            user_prompt=user_prompt,
            images=images,
            max_tokens=4000
        )
        
        # Parse the response
        try:
            # Clean up response if it has markdown code blocks
            if response_text.startswith("```"):
                lines = response_text.split("\n")
                if lines[0].startswith("```"):
                    lines = lines[1:]
                if lines[-1].strip() == "```":
                    lines = lines[:-1]
                response_text = "\n".join(lines)
            
            result = json.loads(response_text)
        except json.JSONDecodeError:
            # If parsing fails, return raw response wrapped in a structure
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
        # Clean up temp file
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
    
    If no provider is specified, uses Azure OpenAI with environment variables.
    
    Returns:
    - Structured STRIDE threat model analysis
    """
    # Validate file type
    allowed_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp', '.svg', '.pdf'}
    file_ext = os.path.splitext(file.filename)[1].lower() if file.filename else ''
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type: {file_ext}. Allowed types: {', '.join(allowed_extensions)}"
        )
    
    try:
        # Read file content
        file_content = await file.read()
        
        if len(file_content) == 0:
            raise HTTPException(status_code=400, detail="Empty file uploaded")
        
        # Determine provider and build config
        use_provider = provider or "azure_openai"
        
        # Debug logging
        print(f"[DEBUG] Provider: {use_provider}")
        print(f"[DEBUG] API Key provided: {'Yes' if api_key else 'No'}")
        print(f"[DEBUG] Endpoint: {endpoint}")
        print(f"[DEBUG] Deployment: {deployment}")
        print(f"[DEBUG] Model: {model}")
        
        # Build provider config
        config = {}
        
        if use_provider == "azure_openai":
            final_endpoint = endpoint or AZURE_ENDPOINT
            final_deployment = deployment or AZURE_DEPLOYMENT
            final_api_key = api_key or AZURE_API_KEY
            final_api_version = api_version or AZURE_API_VERSION
            
            print(f"[DEBUG] Azure Config - Endpoint: {final_endpoint}")
            print(f"[DEBUG] Azure Config - Deployment: {final_deployment}")
            print(f"[DEBUG] Azure Config - API Version: {final_api_version}")
            
            config = {
                "api_key": final_api_key,
                "endpoint": final_endpoint,
                "deployment": final_deployment,
                "api_version": final_api_version,
            }
            if not config["api_key"]:
                raise HTTPException(
                    status_code=400,
                    detail="Azure OpenAI API key is required. Either provide it in the request or set AZURE_OPENAI_API_KEY environment variable."
                )
            if not config["deployment"]:
                raise HTTPException(
                    status_code=400,
                    detail="Azure OpenAI deployment name is required. Please provide the deployment name configured in your Azure OpenAI resource."
                )
                
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
        
        # Get LLM client and perform analysis
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
    except Exception as e:
        # Log the error for debugging
        print(f"Analysis error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Analysis failed: {str(e)}"
        )


@app.post("/api/analyze-multiple")
async def analyze_multiple_diagrams(
    files: list[UploadFile] = File(...),
    provider: Optional[str] = Form(None),
    api_key: Optional[str] = Form(None),
    endpoint: Optional[str] = Form(None),
    deployment: Optional[str] = Form(None),
    model: Optional[str] = Form(None),
):
    """
    Analyze multiple uploaded files.
    Returns combined analysis results.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    # Build provider config (same as single file endpoint)
    use_provider = provider or "azure_openai"
    config = {}
    
    if use_provider == "azure_openai":
        config = {
            "api_key": api_key or AZURE_API_KEY,
            "endpoint": endpoint or AZURE_ENDPOINT,
            "deployment": deployment or AZURE_DEPLOYMENT,
        }
    elif use_provider == "openai":
        config = {"api_key": api_key, "model": model or "gpt-4o"}
    elif use_provider == "anthropic":
        config = {"api_key": api_key, "model": model or "claude-sonnet-4-20250514"}
    elif use_provider == "google":
        config = {"api_key": api_key, "model": model or "gemini-1.5-pro"}
    
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
