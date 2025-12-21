import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DownloadIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ShieldIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import ComponentSecurityTab from "@/aksec/components/component-security-tab";
import { KubernetesSecurityAnalysis } from "@/aksec/data/kubernetes-security-analysis";

export interface SecurityRisk {
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  mitigation: string;
}

export interface SecurityRecommendation {
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
}

interface SecurityReportProps {
  report: KubernetesSecurityAnalysis;
}

export default function SecurityReport({
  report,
}: SecurityReportProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [showAllComponents, setShowAllComponents] = useState(false);

  // Calculate total risks across all components (all severities)
  const totalRisks = report.components.reduce(
    (acc, component) => acc + component.securityRisks.length,
    0
  );

  // Count risks by severity
  const criticalRisks = report.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "Critical")
        .length,
    0
  );

  const highRisks = report.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "High").length,
    0
  );

  const mediumRisks = report.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "Medium")
        .length,
    0
  );

  const lowRisks = report.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "Low").length,
    0
  );

  const overallSeverity =
    criticalRisks > 0
      ? "critical"
      : highRisks > 0
        ? "high"
        : mediumRisks > 0
          ? "medium"
          : "low";

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return (
          <Badge variant="destructive" className="ml-2">
            Critical Risk
          </Badge>
        );

      case "high":
        return (
          <Badge
            variant="outline"
            className="ml-2 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800/30"
          >
            High Risk
          </Badge>
        );

      case "medium":
        return (
          <Badge
            variant="outline"
            className="ml-2 bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/30"
          >
            Medium Risk
          </Badge>
        );

      case "low":
        return (
          <Badge
            variant="outline"
            className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800/30"
          >
            Low Risk
          </Badge>
        );

      default:
        return (
          <Badge
            variant="outline"
            className="ml-2 bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 border-green-200 dark:border-green-800/30"
          >
            No Risk
          </Badge>
        );
    }
  };

  // Get components to display based on expand state
  const componentsToShow = showAllComponents 
    ? report.components 
    : report.components.slice(0, 5);
  const hasMoreComponents = report.components.length > 5;

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Security Analysis Report</h2>
          <p className="text-muted-foreground">
            Generated on {new Date().toLocaleString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            Executive Summary
            {getSeverityBadge(overallSeverity)}
          </CardTitle>
          <CardDescription>
            Overall security assessment of your architecture
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <p className="text-sm leading-relaxed">
                {criticalRisks > 0 || highRisks > 0 ? (
                  <>
                    This architecture has {criticalRisks > 0 ? `${criticalRisks} critical` : ''} 
                    {criticalRisks > 0 && highRisks > 0 ? ' and ' : ''}
                    {highRisks > 0 ? `${highRisks} high-risk` : ''} vulnerabilities 
                    that require immediate attention. Focus on securing{' '}
                    {report.assessmentSummary.topRisks.slice(0, 3).map(r => r.component).join(', ')}.
                    Implementing the recommended security controls will
                    significantly improve the overall security posture.
                  </>
                ) : mediumRisks > 0 ? (
                  <>
                    This architecture has {mediumRisks} medium-risk vulnerabilities.
                    While not critical, addressing these will strengthen the security posture.
                    Focus on the recommendations provided for{' '}
                    {report.components.slice(0, 3).map(c => c.name).join(', ')}.
                  </>
                ) : (
                  <>
                    This architecture has a good security posture with only minor risks identified.
                    Continue to monitor and maintain security best practices across all components.
                  </>
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Total Risks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{totalRisks}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {criticalRisks + highRisks} Critical/High
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Components
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {report.components.length}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="py-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      Data Flows
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {report.dataFlows.length}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="md:w-64 space-y-4">
              {/* Only show Critical and High severity counts prominently */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
                  <span className="text-sm">Critical Severity</span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
                >
                  {criticalRisks}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertTriangleIcon className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-sm">High Severity</span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                >
                  {highRisks}
                </Badge>
              </div>
              
              {/* Show Medium/Low in a more subtle way */}
              {(mediumRisks > 0 || lowRisks > 0) && (
                <div className="text-xs text-muted-foreground pt-1">
                  Also: {mediumRisks > 0 && `${mediumRisks} Medium`}{mediumRisks > 0 && lowRisks > 0 && ', '}{lowRisks > 0 && `${lowRisks} Low`}
                </div>
              )}

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium">
                    Detected Components ({report.components.length})
                  </h4>
                  {hasMoreComponents && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => setShowAllComponents(!showAllComponents)}
                    >
                      {showAllComponents ? (
                        <>
                          <ChevronUpIcon className="h-3 w-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronDownIcon className="h-3 w-3 mr-1" />
                          Show All
                        </>
                      )}
                    </Button>
                  )}
                </div>
                <div className="flex flex-wrap gap-1">
                  {componentsToShow.map((component, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {component.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="summary">STRIDE Analysis</TabsTrigger>
          <TabsTrigger value="component-security">
            <ShieldIcon className="h-4 w-4 mr-2" />
            Component Security
          </TabsTrigger>
        </TabsList>
        <TabsContent value="summary" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                Prioritized security improvements for your architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {report.assessmentSummary.nextSteps.map((step, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-md border-green-200 bg-green-50 dark:border-green-800/30 dark:bg-green-900/10"
                  >
                    <div className="flex items-start">
                      <div className="p-2 rounded-full mr-4 bg-green-100 dark:bg-green-900/20">
                        <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="mt-2 text-sm">{step}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="component-security" className="mt-6">
          <ComponentSecurityTab analysisData={report} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
