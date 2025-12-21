"""
Security Analyzer Module
Performs STRIDE threat model analysis on architecture diagrams using Azure OpenAI
"""

import os
import base64
import mimetypes
import json
import io
from typing import Optional
from openai import AzureOpenAI

# PDF and image processing
import fitz  # PyMuPDF
from PIL import Image

# Azure OpenAI API configuration
AZURE_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT", "https://isec-test.openai.azure.com/")
AZURE_DEPLOYMENT = os.getenv("AZURE_OPENAI_DEPLOYMENT", "gpt-4.1-mini")
AZURE_API_KEY = os.getenv("AZURE_OPENAI_API_KEY", "Ec9mPzzD46GVWqfGGCMRPr90z8K2yHn9YsiYcHgG1lacARAlvYmFJQQJ99BEACYeBjFXJ3w3AAABACOGqz2f")
AZURE_API_VERSION = os.getenv("AZURE_OPENAI_API_VERSION", "2025-01-01-preview")

# System prompt for STRIDE analysis
SYSTEM_PROMPT = """You are a security analyst expert. Analyze the provided architecture diagram or document and perform a comprehensive STRIDE threat model analysis.

Your analysis MUST return a valid JSON object with the following exact structure:

{
  "components": [
    {
      "name": "Component Name",
      "type": "Component Type (e.g., Service, Database, Gateway, External Interface, etc.)",
      "description": "Brief description of what this component does",
      "securityRisks": [
        {
          "category": "STRIDE category (Spoofing, Tampering, Repudiation, Information Disclosure, Denial of Service, or Elevation of Privilege)",
          "severity": "Critical, High, Medium, or Low",
          "mitigation": "Recommended mitigation strategy"
        }
      ],
      "relationships": ["List of other component names this component connects to"]
    }
  ],
  "dataFlows": [
    {
      "source": "Source component name",
      "target": "Target component name",
      "description": "Description of data flow",
      "securityRisks": [
        {
          "risk": "Risk description",
          "impact": "Critical, High, Medium, or Low",
          "mitigation": "Recommended mitigation"
        }
      ]
    }
  ],
  "assessmentSummary": {
    "topRisks": [
      {
        "component": "Component name",
        "risk": "Risk description",
        "impact": "Impact level",
        "recommendation": "Specific recommendation"
      }
    ],
    "nextSteps": [
      "Prioritized action item 1",
      "Prioritized action item 2"
    ]
  }
}

IMPORTANT:
1. Return ONLY the JSON object, no markdown formatting, no code blocks, no additional text.
2. Identify ALL components visible in the diagram.
3. For each component, analyze ALL relevant STRIDE categories.
4. Provide specific, actionable mitigations.
5. Prioritize risks by severity in the assessment summary.
"""


def get_azure_client() -> AzureOpenAI:
    """Initialize and return Azure OpenAI client"""
    return AzureOpenAI(
        azure_endpoint=AZURE_ENDPOINT,
        api_key=AZURE_API_KEY,
        api_version=AZURE_API_VERSION,
    )


def extract_pdf_content(pdf_path: str) -> dict:
    """Extract both text and images from a PDF file"""
    try:
        pdf_document = fitz.open(pdf_path)
        extracted_text = ""
        image_data_list = []
        
        for page_num in range(len(pdf_document)):
            page = pdf_document[page_num]
            
            # Extract text
            page_text = page.get_text()
            if page_text.strip():
                extracted_text += f"\n\n--- Page {page_num + 1} ---\n\n{page_text}"
            
            # Extract images
            image_list = page.get_images(full=True)
            
            for img_index, img_info in enumerate(image_list):
                xref = img_info[0]
                base_image = pdf_document.extract_image(xref)
                image_bytes = base_image["image"]
                
                # Convert to PIL Image
                image = Image.open(io.BytesIO(image_bytes))
                
                # Save to memory buffer as PNG
                buffer = io.BytesIO()
                image.save(buffer, format="PNG")
                buffer.seek(0)
                
                # Encode as base64
                encoded_image = base64.b64encode(buffer.read()).decode('ascii')
                image_data_list.append(encoded_image)
        
        pdf_document.close()
        
        return {
            "text": extracted_text.strip(),
            "images": image_data_list
        }
    
    except Exception as e:
        print(f"Error extracting content from PDF: {str(e)}")
        return {"text": "", "images": []}


def process_image_file(image_path: str) -> Optional[str]:
    """Process a regular image file and return base64 encoded string"""
    try:
        with open(image_path, 'rb') as image_file:
            encoded_image = base64.b64encode(image_file.read()).decode('ascii')
        return encoded_image
    except Exception as e:
        print(f"Error processing image file: {str(e)}")
        return None


def get_file_type(file_path: str) -> str:
    """Determine the file type based on extension and content"""
    mime_type, _ = mimetypes.guess_type(file_path)
    
    if mime_type:
        main_type = mime_type.split('/')[0]
        sub_type = mime_type.split('/')[1]
        
        if main_type == 'image':
            return 'image'
        elif sub_type == 'pdf':
            return 'pdf'
    
    # Fallback to extension check
    ext = os.path.splitext(file_path)[1].lower()
    if ext in ['.pdf']:
        return 'pdf'
    elif ext in ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.tiff', '.webp', '.svg']:
        return 'image'
    
    return 'unknown'


def analyze_file(file_path: str) -> dict:
    """
    Analyze a file (image or PDF) and return structured security analysis.
    
    Args:
        file_path: Path to the file to analyze
        
    Returns:
        Dictionary containing the security analysis results
    """
    # Validate file exists
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    # Determine file type
    file_type = get_file_type(file_path)
    
    if file_type == 'unknown':
        raise ValueError(f"Unsupported file type for {file_path}")
    
    # Initialize Azure OpenAI client
    client = get_azure_client()
    
    # Build messages
    messages = [
        {
            "role": "system",
            "content": [{"type": "text", "text": SYSTEM_PROMPT}]
        }
    ]
    
    # Process based on file type
    if file_type == 'image':
        encoded_image = process_image_file(file_path)
        
        if not encoded_image:
            raise ValueError("Failed to process the image file")
        
        messages.append({
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Analyze this architecture diagram for security threats using the STRIDE model. Identify all components, their relationships, and provide a comprehensive security assessment."
                },
                {
                    "type": "image_url",
                    "image_url": {
                        "url": f"data:image/jpeg;base64,{encoded_image}"
                    }
                }
            ]
        })
        
    elif file_type == 'pdf':
        pdf_content = extract_pdf_content(file_path)
        
        if not pdf_content["text"] and not pdf_content["images"]:
            raise ValueError("Could not extract any usable content from the PDF")
        
        user_content = [
            {
                "type": "text",
                "text": "Analyze this document and architecture diagrams for security threats using the STRIDE model. Identify all components, their relationships, and provide a comprehensive security assessment."
            }
        ]
        
        # Add extracted text if available
        if pdf_content["text"]:
            user_content.append({
                "type": "text",
                "text": f"Extracted text from document:\n\n{pdf_content['text']}"
            })
        
        # Add extracted images
        for img_data in pdf_content["images"]:
            user_content.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{img_data}"
                }
            })
        
        messages.append({
            "role": "user",
            "content": user_content
        })
    
    # Call Azure OpenAI API
    completion = client.chat.completions.create(
        model=AZURE_DEPLOYMENT,
        messages=messages,
        max_tokens=4000,
        temperature=0.7,
        top_p=0.95,
    )
    
    # Parse the response
    response_text = completion.choices[0].message.content
    
    # Try to parse as JSON
    try:
        # Clean up response if it has markdown code blocks
        if response_text.startswith("```"):
            # Remove markdown code block formatting
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


def analyze_file_bytes(file_bytes: bytes, filename: str) -> dict:
    """
    Analyze file from bytes (for API uploads).
    
    Args:
        file_bytes: Raw file bytes
        filename: Original filename (used to determine file type)
        
    Returns:
        Dictionary containing the security analysis results
    """
    import tempfile
    
    # Get file extension
    ext = os.path.splitext(filename)[1]
    
    # Write to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=ext) as tmp:
        tmp.write(file_bytes)
        tmp_path = tmp.name
    
    try:
        result = analyze_file(tmp_path)
        return result
    finally:
        # Clean up temp file
        if os.path.exists(tmp_path):
            os.unlink(tmp_path)

