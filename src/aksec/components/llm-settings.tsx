import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { KeyIcon, CheckCircleIcon, AlertCircleIcon, SparklesIcon } from "lucide-react";

export interface LLMConfig {
  provider: string;
  apiKey: string;
  endpoint?: string;
  deployment?: string;
  model?: string;
  apiVersion?: string;
}

const PROVIDERS = [
  {
    id: "openai",
    name: "OpenAI",
    description: "GPT-4o, GPT-4 Turbo",
    icon: "🤖",
    fields: ["apiKey", "model"],
    models: ["gpt-4o", "gpt-4-turbo", "gpt-4o-mini"],
    defaultModel: "gpt-4o",
  },
  {
    id: "azure_openai",
    name: "Azure OpenAI",
    description: "Azure-hosted OpenAI models",
    icon: "☁️",
    fields: ["apiKey", "endpoint", "deployment"],
  },
  {
    id: "anthropic",
    name: "Anthropic Claude",
    description: "Claude 3.5 Sonnet, Claude 3 Opus",
    icon: "🧠",
    fields: ["apiKey", "model"],
    models: ["claude-sonnet-4-20250514", "claude-3-5-sonnet-20241022", "claude-3-opus-20240229", "claude-3-haiku-20240307"],
    defaultModel: "claude-sonnet-4-20250514",
  },
  {
    id: "google",
    name: "Google Gemini",
    description: "Gemini 1.5 Pro, Gemini 1.5 Flash",
    icon: "✨",
    fields: ["apiKey", "model"],
    models: ["gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0-flash-exp"],
    defaultModel: "gemini-1.5-pro",
  },
];

const LOCAL_STORAGE_KEY = "info_security_analyzer_llm_config";

export function LLMSettings() {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<LLMConfig>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Invalid JSON, use default
        }
      }
    }
    return { provider: "openai", apiKey: "" };
  });

  const selectedProvider = PROVIDERS.find((p) => p.id === config.provider);

  const handleSave = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
    setOpen(false);
  };

  const handleProviderChange = (providerId: string) => {
    const provider = PROVIDERS.find((p) => p.id === providerId);
    setConfig({
      provider: providerId,
      apiKey: "",
      model: provider?.defaultModel,
      endpoint: undefined,
      deployment: undefined,
    });
  };

  const isConfigured = config.apiKey && config.apiKey.length > 10;
  const isAzureComplete = config.provider !== "azure_openai" || 
    (config.endpoint && config.deployment);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          {isConfigured ? (
            <CheckCircleIcon className="h-4 w-4 text-green-500" />
          ) : (
            <KeyIcon className="h-4 w-4" />
          )}
          <span className="hidden sm:inline">
            {isConfigured ? selectedProvider?.name : "Configure API"}
          </span>
          {isConfigured && (
            <Badge variant="secondary" className="ml-1 text-xs">
              {selectedProvider?.icon}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5" />
            LLM Provider Settings
          </DialogTitle>
          <DialogDescription>
            Configure your preferred AI provider for security analysis.
            Your API key is stored locally in your browser and never sent to our servers.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Provider Selection */}
          <div className="space-y-2">
            <Label>Provider</Label>
            <Select
              value={config.provider}
              onValueChange={handleProviderChange}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PROVIDERS.map((provider) => (
                  <SelectItem key={provider.id} value={provider.id}>
                    <div className="flex items-center gap-2">
                      <span>{provider.icon}</span>
                      <div>
                        <div className="font-medium">{provider.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {provider.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label>API Key *</Label>
            <Input
              type="password"
              placeholder={`Enter your ${selectedProvider?.name} API key`}
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
            />
            <p className="text-xs text-muted-foreground">
              {config.provider === "openai" && "Get your key from platform.openai.com"}
              {config.provider === "azure_openai" && "Get your key from Azure Portal"}
              {config.provider === "anthropic" && "Get your key from console.anthropic.com"}
              {config.provider === "google" && "Get your key from aistudio.google.com"}
            </p>
          </div>

          {/* Azure-specific fields */}
          {config.provider === "azure_openai" && (
            <>
              <div className="space-y-2">
                <Label>Endpoint *</Label>
                <Input
                  placeholder="https://your-resource.openai.azure.com/"
                  value={config.endpoint || ""}
                  onChange={(e) =>
                    setConfig({ ...config, endpoint: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Found in Azure Portal → Your OpenAI Resource → Keys and Endpoint
                </p>
              </div>
              <div className="space-y-2">
                <Label>Deployment Name *</Label>
                <Input
                  placeholder="e.g., gpt-4o, gpt-4, gpt-35-turbo"
                  value={config.deployment || ""}
                  onChange={(e) =>
                    setConfig({ ...config, deployment: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Found in Azure AI Studio → Deployments. Must match exactly!
                </p>
              </div>
            </>
          )}

          {/* Model selection for providers with multiple models */}
          {selectedProvider?.models && (
            <div className="space-y-2">
              <Label>Model</Label>
              <Select
                value={config.model || selectedProvider.defaultModel}
                onValueChange={(value) =>
                  setConfig({ ...config, model: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {selectedProvider.models.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Warning if config incomplete */}
          {config.apiKey && !isAzureComplete && (
            <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md text-yellow-700 dark:text-yellow-300 text-sm">
              <AlertCircleIcon className="h-4 w-4" />
              <span>Please fill in all required Azure fields</span>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setConfig({ provider: "openai", apiKey: "" });
            }}
          >
            Clear Settings
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              disabled={!config.apiKey || !isAzureComplete}
            >
              Save Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Get the current LLM configuration from localStorage
 * @returns LLMConfig or null if not configured
 */
export function getLLMConfig(): LLMConfig | null {
  if (typeof window === "undefined") return null;
  
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!saved) return null;
  
  try {
    const config = JSON.parse(saved) as LLMConfig;
    return config.apiKey ? config : null;
  } catch {
    return null;
  }
}

/**
 * Check if LLM is configured
 */
export function isLLMConfigured(): boolean {
  const config = getLLMConfig();
  if (!config) return false;
  
  if (config.provider === "azure_openai") {
    return !!(config.apiKey && config.endpoint && config.deployment);
  }
  
  return !!config.apiKey;
}

