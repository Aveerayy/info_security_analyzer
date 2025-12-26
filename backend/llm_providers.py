"""
Multi-Provider LLM Support
Supports: OpenAI, Azure OpenAI, Anthropic Claude, Google Gemini
"""

import os
import base64
import io
import json
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional
from enum import Enum


class LLMProvider(str, Enum):
    OPENAI = "openai"
    AZURE_OPENAI = "azure_openai"
    ANTHROPIC = "anthropic"
    GOOGLE = "google"


class BaseLLMClient(ABC):
    """Abstract base class for LLM providers"""
    
    @abstractmethod
    def analyze_with_image(self, system_prompt: str, user_prompt: str, 
                           images: List[str], max_tokens: int = 4000) -> str:
        """
        Analyze content with images.
        
        Args:
            system_prompt: The system prompt for the LLM
            user_prompt: The user prompt/question
            images: List of base64-encoded images
            max_tokens: Maximum tokens in response
            
        Returns:
            The LLM's response text
        """
        pass
    
    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return the provider name for logging/display"""
        pass


class OpenAIClient(BaseLLMClient):
    """OpenAI GPT-4 Vision client"""
    
    def __init__(self, api_key: str, model: str = "gpt-4o"):
        from openai import OpenAI
        self.client = OpenAI(api_key=api_key)
        self.model = model
    
    @property
    def provider_name(self) -> str:
        return f"OpenAI ({self.model})"
    
    def analyze_with_image(self, system_prompt: str, user_prompt: str,
                           images: List[str], max_tokens: int = 4000) -> str:
        content = [{"type": "text", "text": user_prompt}]
        for img in images:
            content.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/png;base64,{img}"}
            })
        
        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": content}
            ],
            max_tokens=max_tokens,
            temperature=0.7,
        )
        return response.choices[0].message.content


class AzureOpenAIClient(BaseLLMClient):
    """Azure OpenAI client"""
    
    def __init__(self, api_key: str, endpoint: str, deployment: str, 
                 api_version: str = "2024-08-01-preview"):
        from openai import AzureOpenAI
        self.client = AzureOpenAI(
            azure_endpoint=endpoint,
            api_key=api_key,
            api_version=api_version,
        )
        self.deployment = deployment
    
    @property
    def provider_name(self) -> str:
        return f"Azure OpenAI ({self.deployment})"
    
    def analyze_with_image(self, system_prompt: str, user_prompt: str,
                           images: List[str], max_tokens: int = 4000) -> str:
        content = [{"type": "text", "text": user_prompt}]
        for img in images:
            content.append({
                "type": "image_url",
                "image_url": {"url": f"data:image/png;base64,{img}"}
            })
        
        response = self.client.chat.completions.create(
            model=self.deployment,
            messages=[
                {"role": "system", "content": [{"type": "text", "text": system_prompt}]},
                {"role": "user", "content": content}
            ],
            max_tokens=max_tokens,
            temperature=0.7,
        )
        return response.choices[0].message.content


class AnthropicClient(BaseLLMClient):
    """Anthropic Claude client"""
    
    def __init__(self, api_key: str, model: str = "claude-sonnet-4-20250514"):
        import anthropic
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model
    
    @property
    def provider_name(self) -> str:
        return f"Anthropic ({self.model})"
    
    def analyze_with_image(self, system_prompt: str, user_prompt: str,
                           images: List[str], max_tokens: int = 4000) -> str:
        content = [{"type": "text", "text": user_prompt}]
        for img in images:
            content.append({
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/png",
                    "data": img
                }
            })
        
        response = self.client.messages.create(
            model=self.model,
            max_tokens=max_tokens,
            system=system_prompt,
            messages=[{"role": "user", "content": content}]
        )
        return response.content[0].text


class GoogleGeminiClient(BaseLLMClient):
    """Google Gemini client"""
    
    def __init__(self, api_key: str, model: str = "gemini-1.5-pro"):
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        self.model_instance = genai.GenerativeModel(model)
        self.model = model
    
    @property
    def provider_name(self) -> str:
        return f"Google Gemini ({self.model})"
    
    def analyze_with_image(self, system_prompt: str, user_prompt: str,
                           images: List[str], max_tokens: int = 4000) -> str:
        from PIL import Image
        
        # Convert base64 images to PIL Images
        pil_images = []
        for img in images:
            img_bytes = base64.b64decode(img)
            pil_images.append(Image.open(io.BytesIO(img_bytes)))
        
        # Combine prompts
        full_prompt = f"{system_prompt}\n\n{user_prompt}"
        
        # Generate with images
        response = self.model_instance.generate_content(
            [full_prompt] + pil_images,
            generation_config={"max_output_tokens": max_tokens}
        )
        return response.text


def get_llm_client(provider: str, config: Dict[str, Any]) -> BaseLLMClient:
    """
    Factory function to create LLM client based on provider.
    
    Args:
        provider: Provider name (openai, azure_openai, anthropic, google)
        config: Provider-specific configuration including API key
        
    Returns:
        Configured LLM client instance
        
    Raises:
        ValueError: If provider is not supported or required config is missing
    """
    provider_enum = LLMProvider(provider)
    
    if provider_enum == LLMProvider.OPENAI:
        if not config.get("api_key"):
            raise ValueError("OpenAI API key is required")
        return OpenAIClient(
            api_key=config["api_key"],
            model=config.get("model", "gpt-4o")
        )
    
    elif provider_enum == LLMProvider.AZURE_OPENAI:
        if not config.get("api_key"):
            raise ValueError("Azure OpenAI API key is required")
        if not config.get("endpoint"):
            raise ValueError("Azure OpenAI endpoint is required")
        if not config.get("deployment"):
            raise ValueError("Azure OpenAI deployment name is required")
        return AzureOpenAIClient(
            api_key=config["api_key"],
            endpoint=config["endpoint"],
            deployment=config["deployment"],
            api_version=config.get("api_version", "2024-02-15-preview")
        )
    
    elif provider_enum == LLMProvider.ANTHROPIC:
        if not config.get("api_key"):
            raise ValueError("Anthropic API key is required")
        return AnthropicClient(
            api_key=config["api_key"],
            model=config.get("model", "claude-sonnet-4-20250514")
        )
    
    elif provider_enum == LLMProvider.GOOGLE:
        if not config.get("api_key"):
            raise ValueError("Google API key is required")
        return GoogleGeminiClient(
            api_key=config["api_key"],
            model=config.get("model", "gemini-1.5-pro")
        )
    
    else:
        raise ValueError(f"Unsupported provider: {provider}")


# Provider metadata for frontend
PROVIDER_INFO = {
    "openai": {
        "name": "OpenAI",
        "description": "GPT-4o, GPT-4 Turbo",
        "models": ["gpt-4o", "gpt-4-turbo", "gpt-4o-mini"],
        "fields": ["api_key", "model"],
    },
    "azure_openai": {
        "name": "Azure OpenAI",
        "description": "Azure-hosted OpenAI models",
        "models": [],
        "fields": ["api_key", "endpoint", "deployment"],
    },
    "anthropic": {
        "name": "Anthropic Claude",
        "description": "Claude 3.5 Sonnet, Claude 3 Opus",
        "models": ["claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
        "fields": ["api_key", "model"],
    },
    "google": {
        "name": "Google Gemini",
        "description": "Gemini 1.5 Pro, Gemini 1.5 Flash",
        "models": ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash-exp"],
        "fields": ["api_key", "model"],
    },
}

