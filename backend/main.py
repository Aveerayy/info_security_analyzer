"""
FastAPI Backend for Info Security Analyzer
Provides REST API endpoints for security analysis
"""

import os
import tempfile
from typing import Optional
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from analyzer import analyze_file, analyze_file_bytes

# Create FastAPI app
app = FastAPI(
    title="Info Security Analyzer API",
    description="API for performing STRIDE threat model analysis on architecture diagrams",
    version="1.0.0"
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


@app.post("/api/analyze")
async def analyze_diagram(file: UploadFile = File(...)):
    """
    Analyze an uploaded architecture diagram or document.
    
    Accepts:
    - Images: PNG, JPG, JPEG, GIF, BMP, TIFF, WEBP, SVG
    - Documents: PDF
    
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
        
        # Perform analysis
        result = analyze_file_bytes(file_content, file.filename)
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "data": result,
                "filename": file.filename
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
async def analyze_multiple_diagrams(files: list[UploadFile] = File(...)):
    """
    Analyze multiple uploaded files.
    Returns combined analysis results.
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files uploaded")
    
    results = []
    errors = []
    
    for file in files:
        try:
            file_content = await file.read()
            result = analyze_file_bytes(file_content, file.filename)
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
            "errors": errors if errors else None
        }
    )


# Run with: uvicorn backend.main:app --reload --port 8000
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

