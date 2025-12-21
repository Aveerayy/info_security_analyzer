import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldIcon,
  ServerIcon,
  NetworkIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  DownloadIcon,
} from "lucide-react";
import { KubernetesSecurityAnalysis } from "@/aksec/data/kubernetes-security-analysis";
import ComponentRelationshipDiagram from "@/aksec/components/component-relationship-diagram";
import ComponentSecurityDetail from "@/aksec/components/component-security-detail";
import SecurityAssessmentSummaryCard from "@/aksec/components/security-assessment-summary";

interface ComponentAnalysisDashboardProps {
  analysisData: KubernetesSecurityAnalysis;
}

export default function ComponentAnalysisDashboard({
  analysisData,
}: ComponentAnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedComponent, setSelectedComponent] = useState(
    analysisData.components[0]?.name
  );

  // Get the selected component data
  const componentData = analysisData.components.find(
    (c) => c.name === selectedComponent
  );

  // Count ALL risks (including Medium and Low for accurate total)
  const totalRisks = analysisData.components.reduce(
    (count, component) => count + component.securityRisks.length,
    0
  );

  // Count risks by severity
  const criticalRisks = analysisData.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "Critical")
        .length,
    0
  );
  const highRisks = analysisData.components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "High").length,
    0
  );

  const handleComponentSelect = (componentName: string) => {
    setSelectedComponent(componentName);
    if (activeTab === "overview") {
      setActiveTab("component");
    }
  };

  // Sort all components by risk (high/critical first, then total risks)
  // This ensures Top Risk Components shows ALL components from the detected list
  const sortedComponentsByRisk = analysisData.components
    .map((component) => ({
      name: component.name,
      type: component.type,
      criticalRisks: component.securityRisks.filter(
        (risk) => risk.severity === "Critical"
      ).length,
      highRisks: component.securityRisks.filter(
        (risk) => risk.severity === "High"
      ).length,
      totalRisks: component.securityRisks.length,
    }))
    .sort((a, b) => {
      // Sort by critical first, then high, then total
      if (a.criticalRisks !== b.criticalRisks) {
        return b.criticalRisks - a.criticalRisks;
      }
      if (a.highRisks !== b.highRisks) {
        return b.highRisks - a.highRisks;
      }
      return b.totalRisks - a.totalRisks;
    });

  return (
    <div className="w-full space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Component Security Analysis</h2>
          <p className="text-muted-foreground">
            STRIDE-based security analysis of architecture components
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Components Analyzed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysisData.components.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Data Flows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analysisData.dataFlows.length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Security Risks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="text-2xl font-bold">
                {totalRisks}
              </div>
              <div className="ml-auto flex space-x-1">
                {criticalRisks > 0 && (
                  <Badge variant="destructive">{criticalRisks} Critical</Badge>
                )}
                {highRisks > 0 && (
                  <Badge
                    variant="outline"
                    className="bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400"
                  >
                    {highRisks} High
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">
            <NetworkIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
            Architecture Overview
          </TabsTrigger>
          <TabsTrigger value="component">
            <ServerIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
            Component Detail
          </TabsTrigger>
          <TabsTrigger value="assessment">
            <AlertTriangleIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
            Assessment Summary
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <NetworkIcon className="h-5 w-5 mr-2" strokeWidth={1.5} />
                  Component Relationship Diagram
                </CardTitle>
                <CardDescription>
                  Interactive visualization of components and their
                  relationships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComponentRelationshipDiagram
                  components={analysisData.components}
                  dataFlows={analysisData.dataFlows}
                  selectedComponent={selectedComponent}
                  onSelectComponent={handleComponentSelect}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShieldIcon className="h-5 w-5 mr-2" strokeWidth={1.5} />
                      Component Types
                    </CardTitle>
                    <CardDescription>
                      Security analysis by component type
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Dynamically extract unique component types from analysis data */}
                      {Array.from(new Set(analysisData.components.map(c => c.type))).map((type) => {
                        const componentsOfType = analysisData.components.filter(
                          (c) => c.type === type
                        );
                        // Count ALL risks for this type (accurate total)
                        const risksCount = componentsOfType.reduce(
                          (count, component) =>
                            count + component.securityRisks.length,
                          0
                        );
                        // Count only Critical and High for display
                        const criticalHighCount = componentsOfType.reduce(
                          (count, component) =>
                            count +
                            component.securityRisks.filter(
                              (risk) =>
                                risk.severity === "High" ||
                                risk.severity === "Critical"
                            ).length,
                          0
                        );

                        return (
                          <div
                            key={type}
                            className="flex items-center justify-between p-2 border rounded-md"
                          >
                            <div>
                              <div className="font-medium">{type}</div>
                              <div className="text-sm text-muted-foreground">
                                {componentsOfType.length} component{componentsOfType.length !== 1 ? 's' : ''}: {componentsOfType.map(c => c.name).join(', ')}
                              </div>
                            </div>
                            <div className="flex items-center">
                              {criticalHighCount > 0 && (
                                <Badge
                                  variant="outline"
                                  className="mr-2 bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400"
                                >
                                  {criticalHighCount} Critical/High
                                </Badge>
                              )}
                              <Badge variant="secondary">
                                {risksCount} Total
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangleIcon
                      className="h-5 w-5 mr-2"
                      strokeWidth={1.5}
                    />
                    All Components by Risk
                  </CardTitle>
                  <CardDescription>
                    All {analysisData.components.length} components sorted by risk severity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {/* Show ALL components, sorted by risk */}
                    {sortedComponentsByRisk.map((component, index) => (
                      <div
                        key={index}
                        className="p-2 border rounded-md cursor-pointer hover:bg-muted"
                        onClick={() => handleComponentSelect(component.name)}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">
                            {component.name}
                          </span>
                          {(component.criticalRisks > 0 || component.highRisks > 0) && (
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400"
                            >
                              {component.criticalRisks + component.highRisks} Critical/High
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {component.totalRisks} total risks • Type: {component.type}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="component" className="mt-6">
          {componentData ? (
            <ComponentSecurityDetail
              component={componentData}
              dataFlows={analysisData.dataFlows}
              onSelectComponent={handleComponentSelect}
            />
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <ServerIcon className="h-12 w-12 text-muted-foreground mb-4" />

                <p className="text-lg font-medium">No component selected</p>
                <p className="text-muted-foreground mb-6">
                  Select a component to view detailed security information
                </p>
                <Button onClick={() => setActiveTab("overview")}>
                  View Architecture Overview
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="assessment" className="mt-6">
          <SecurityAssessmentSummaryCard
            assessmentSummary={analysisData.assessmentSummary}
            onSelectComponent={handleComponentSelect}
            componentNames={analysisData.components.map(c => c.name)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
