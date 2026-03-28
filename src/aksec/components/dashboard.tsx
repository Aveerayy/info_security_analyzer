import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UploadIcon, ActivityIcon, ShieldIcon, RefreshCwIcon, AlertCircleIcon } from "lucide-react";
import FileUploader from "@/aksec/components/file-uploader";
import FilePreview from "@/aksec/components/file-preview";
import ProcessingStatus from "@/aksec/components/processing-status";
import SecurityReport from "@/aksec/components/security-report";
import { LLMSettings, getLLMConfig, isLLMConfigured } from "@/aksec/components/llm-settings";
import { KUBERNETES_SECURITY_ANALYSIS, KubernetesSecurityAnalysis } from "@/aksec/data/kubernetes-security-analysis";

// API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("upload");
  const [files, setFiles] = useState<File[]>([]);
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingError, setProcessingError] = useState("");
  const [analysisResult, setAnalysisResult] = useState<KubernetesSecurityAnalysis | null>(null);
  const [usedProvider, setUsedProvider] = useState<string | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleStartAnalysis = async () => {
    if (files.length === 0) {
      return;
    }

    // Check if LLM is configured
    const llmConfig = getLLMConfig();
    if (!llmConfig) {
      setProcessingError("Please configure your API key first. Click the 'Configure API' button above.");
      setProcessingStatus("error");
      return;
    }

    // Reset state
    setProcessingError("");
    setActiveTab("processing");
    setProcessingStatus("ingesting");
    setProcessingProgress(10);
    setUsedProvider(null);

    try {
      // Stage 1: Uploading
      setProcessingStatus("ingesting");
      setProcessingProgress(20);

      // Prepare form data with the first file and provider config
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("provider", llmConfig.provider);
      formData.append("api_key", llmConfig.apiKey);
      
      // Add provider-specific fields
      if (llmConfig.endpoint) {
        formData.append("endpoint", llmConfig.endpoint);
      }
      if (llmConfig.deployment) {
        formData.append("deployment", llmConfig.deployment);
      }
      if (llmConfig.model) {
        formData.append("model", llmConfig.model);
      }
      if (llmConfig.apiVersion) {
        formData.append("api_version", llmConfig.apiVersion);
      }

      // Stage 2: Sending to API
      setProcessingStatus("parsing");
      setProcessingProgress(40);

      // Call the backend API
      const response = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: "POST",
        body: formData,
      });

      // Stage 3: Processing response
      setProcessingStatus("extracting");
      setProcessingProgress(60);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ detail: "Unknown error" }));
        throw new Error(errorData.detail || `Analysis failed with status ${response.status}`);
      }

      const result = await response.json();
      
      // Debug: Log the raw API response
      console.log("API Response:", result);

      // Stage 4: Analyzing
      setProcessingStatus("analyzing");
      setProcessingProgress(80);

      if (!result.success) {
        throw new Error(result.error || "Analysis returned unsuccessful result");
      }

      // Stage 5: Rendering
      setProcessingStatus("rendering");
      setProcessingProgress(100);

      // Debug: Log the analysis data being stored
      console.log("Analysis Data:", result.data);
      
      // Store the analysis result and provider used
      setAnalysisResult(result.data);
      setUsedProvider(result.provider);

      // Small delay for UX before showing report
      await new Promise((resolve) => setTimeout(resolve, 500));

      setProcessingStatus("completed");
      setActiveTab("report");

    } catch (error) {
      console.error("Analysis error:", error);
      setProcessingError(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
      setProcessingStatus("error");
    }
  };

  const handleLoadDemoReport = () => {
    setFiles([]);
    setProcessingError("");
    setProcessingProgress(100);
    setProcessingStatus("completed");
    setAnalysisResult(KUBERNETES_SECURITY_ANALYSIS);
    setUsedProvider("Built-in demo dataset");
    setActiveTab("report");
  };

  const handleNewAnalysis = () => {
    setFiles([]);
    setProcessingStatus("idle");
    setProcessingProgress(0);
    setProcessingError("");
    setAnalysisResult(null);
    setUsedProvider(null);
    setActiveTab("upload");
  };

  const llmConfigured = isLLMConfigured();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold">Information Security Analyzer</h1>
          <p className="text-muted-foreground mt-1">
            Upload architecture diagrams for STRIDE threat analysis
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <LLMSettings />
          <Button variant="outline" onClick={handleLoadDemoReport}>
            <ShieldIcon className="h-4 w-4 mr-2" />
            Load Demo Report
          </Button>
          {processingStatus === "completed" && (
            <Button variant="outline" onClick={handleNewAnalysis}>
              <RefreshCwIcon className="h-4 w-4 mr-2" />
              New Analysis
            </Button>
          )}
          <Button
            disabled={files.length === 0 || activeTab !== "upload" || !llmConfigured}
            onClick={handleStartAnalysis}
          >
            <ShieldIcon className="h-4 w-4 mr-2" />
            Start Security Analysis
          </Button>
        </div>
      </div>

      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-center gap-3">
        <ShieldIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <div className="flex-1">
          <p className="font-medium text-blue-800 dark:text-blue-200">
            Demo mode available
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Use <span className="font-medium">Load Demo Report</span> to preview the full report UI and capture screenshots locally without API keys or backend setup.
          </p>
        </div>
      </div>

      {/* Warning banner if LLM not configured */}
      {!llmConfigured && (
        <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-3">
          <AlertCircleIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
          <div className="flex-1">
            <p className="font-medium text-yellow-800 dark:text-yellow-200">
              API Key Required
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Configure your OpenAI, Claude, Gemini, or Azure OpenAI API key to start analyzing diagrams.
            </p>
          </div>
          <LLMSettings />
        </div>
      )}

      {/* Provider badge when analysis is complete */}
      {usedProvider && processingStatus === "completed" && (
        <div className="mb-4 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Analyzed using:</span>
          <Badge variant="secondary">{usedProvider}</Badge>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger
            value="upload"
            disabled={processingStatus !== "idle" && processingStatus !== "error"}
          >
            <UploadIcon className="h-4 w-4 mr-2" />
            Upload Files
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            disabled={
              files.length === 0 ||
              processingStatus === "idle" ||
              processingStatus === "completed"
            }
          >
            <ActivityIcon className="h-4 w-4 mr-2" />
            Processing Status
          </TabsTrigger>
          <TabsTrigger
            value="report"
            disabled={processingStatus !== "completed" || !analysisResult}
          >
            <ShieldIcon className="h-4 w-4 mr-2" />
            Security Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <FileUploader onFilesSelected={handleFilesSelected} />
            </div>
            <div>
              <div className="bg-card border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">File Summary</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {files.length} files selected for analysis
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-md">
                    <div className="text-primary mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-image"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="3"
                          rx="2"
                          ry="2"
                        />

                        <circle cx="9" cy="9" r="2" />

                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Images
                    </span>
                    <span className="font-bold">
                      {
                        files.filter((file) => file.type.startsWith("image/"))
                          .length
                      }
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-md">
                    <div className="text-primary mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-file"
                      >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />

                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Documents
                    </span>
                    <span className="font-bold">
                      {
                        files.filter(
                          (file) =>
                            file.type.includes("pdf") ||
                            file.type.includes("document") ||
                            file.type.includes("sheet")
                        ).length
                      }
                    </span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-muted/50 rounded-md">
                    <div className="text-primary mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-file-text"
                      >
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />

                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />

                        <path d="M10 9H8" />

                        <path d="M16 9h-4" />

                        <path d="M16 13H8" />

                        <path d="M10 17H8" />
                      </svg>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Text/Markdown
                    </span>
                    <span className="font-bold">
                      {
                        files.filter(
                          (file) =>
                            file.type.includes("text") ||
                            file.type.includes("markdown")
                        ).length
                      }
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button
                    className="w-full"
                    disabled={files.length === 0 || !llmConfigured}
                    onClick={handleStartAnalysis}
                  >
                    <ShieldIcon className="h-4 w-4 mr-2" />
                    Start Security Analysis
                  </Button>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={handleLoadDemoReport}
                  >
                    <ShieldIcon className="h-4 w-4 mr-2" />
                    Load Demo Report Instead
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {files.length > 0 && (
            <FilePreview files={files} onRemoveFile={handleRemoveFile} />
          )}
        </TabsContent>

        <TabsContent value="processing">
          <ProcessingStatus
            currentStage={processingStatus}
            progress={processingProgress}
            error={processingError}
          />
          {processingError && (
            <div className="mt-4 flex justify-center">
              <Button variant="outline" onClick={handleNewAnalysis}>
                <RefreshCwIcon className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="report">
          {analysisResult && <SecurityReport report={analysisResult} />}
        </TabsContent>
      </Tabs>
    </div>
  );
}
