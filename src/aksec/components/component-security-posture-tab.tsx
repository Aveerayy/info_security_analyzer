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
  CheckCircleIcon,
} from "lucide-react";
import { KubernetesSecurityAnalysis } from "@/aksec/data/kubernetes-security-analysis";
import ComponentSecurityDetail from "@/aksec/components/component-security-detail";

interface ComponentSecurityPostureTabProps {
  components: KubernetesSecurityAnalysis["components"];
  dataFlows: KubernetesSecurityAnalysis["dataFlows"];
  assessment: KubernetesSecurityAnalysis["assessmentSummary"];
}

export default function ComponentSecurityPostureTab({
  components,
  dataFlows,
  assessment,
}: ComponentSecurityPostureTabProps) {
  const [activeTab, setActiveTab] = useState("components");
  const [selectedComponent, setSelectedComponent] = useState(
    components[0]?.name
  );

  // Get the selected component data
  const componentData = components.find((c) => c.name === selectedComponent);

  // Count risks by severity
  const criticalRisks = components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "Critical")
        .length,
    0
  );

  const highRisks = components.reduce(
    (count, component) =>
      count +
      component.securityRisks.filter((risk) => risk.severity === "High").length,
    0
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 border-red-200 dark:border-red-800/30";
      case "High":
        return "bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400 border-red-200 dark:border-red-800/30";
      case "Medium":
        return "bg-amber-50 text-amber-700 dark:bg-amber-900/10 dark:text-amber-400 border-amber-200 dark:border-amber-800/30";
      case "Low":
        return "bg-green-50 text-green-700 dark:bg-green-900/10 dark:text-green-400 border-green-200 dark:border-green-800/30";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ShieldIcon className="h-5 w-5 mr-2" />
          Component Security Posture
        </CardTitle>
        <CardDescription>
          Security analysis of individual components and their interactions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Components Analyzed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{components.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Data Flows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dataFlows.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Critical/High Risks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="text-2xl font-bold">
                  {criticalRisks + highRisks}
                </div>
                <div className="ml-auto flex space-x-1">
                  {criticalRisks > 0 && (
                    <Badge variant="destructive">
                      {criticalRisks} Critical
                    </Badge>
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
            <TabsTrigger value="components">
              <ServerIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Components
            </TabsTrigger>
            <TabsTrigger value="dataflows">
              <NetworkIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Data Flows
            </TabsTrigger>
            <TabsTrigger value="toprisks">
              <AlertTriangleIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Top Risks
            </TabsTrigger>
          </TabsList>

          <TabsContent value="components" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 space-y-4">
                <Card>
                  <CardHeader className="py-3">
                    <CardTitle className="text-sm">Components</CardTitle>
                  </CardHeader>
                  <CardContent className="py-0 max-h-[400px] overflow-y-auto">
                    <div className="space-y-2">
                      {components.map((component, index) => {
                        const highRiskCount = component.securityRisks.filter(
                          (risk) =>
                            risk.severity === "High" ||
                            risk.severity === "Critical"
                        ).length;

                        return (
                          <div
                            key={index}
                            className={`p-2 rounded-md cursor-pointer ${
                              selectedComponent === component.name
                                ? "bg-primary/10 border border-primary/30"
                                : "hover:bg-muted"
                            }`}
                            onClick={() => setSelectedComponent(component.name)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <ServerIcon className="h-4 w-4 mr-2 text-muted-foreground" />

                                <span>{component.name}</span>
                              </div>
                              {highRiskCount > 0 && (
                                <Badge
                                  variant={
                                    highRiskCount > 0
                                      ? "destructive"
                                      : "outline"
                                  }
                                >
                                  {highRiskCount}
                                </Badge>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {component.type}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="md:col-span-2">
                {componentData ? (
                  <ComponentSecurityDetail
                    component={componentData}
                    dataFlows={dataFlows}
                    onSelectComponent={setSelectedComponent}
                  />
                ) : (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <ServerIcon className="h-12 w-12 text-muted-foreground mb-4" />

                      <p className="text-lg font-medium">
                        No component selected
                      </p>
                      <p className="text-muted-foreground mb-6">
                        Select a component to view detailed security information
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dataflows" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Data Flow Security Analysis
                </CardTitle>
                <CardDescription>
                  Security risks in data transfers between components
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dataFlows.map((flow, index) => (
                    <Card key={index} className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                          <div className="flex-1">
                            <div className="flex items-center">
                              <span
                                className="font-medium cursor-pointer hover:underline"
                                onClick={() => {
                                  setSelectedComponent(flow.source);
                                  setActiveTab("components");
                                }}
                              >
                                {flow.source}
                              </span>
                              <NetworkIcon className="h-4 w-4 mx-2" />

                              <span
                                className="font-medium cursor-pointer hover:underline"
                                onClick={() => {
                                  setSelectedComponent(flow.target);
                                  setActiveTab("components");
                                }}
                              >
                                {flow.target}
                              </span>
                            </div>
                            <p className="text-sm mt-1">{flow.description}</p>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {flow.securityRisks.map((risk, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="bg-amber-50 text-amber-700 dark:bg-amber-900/10 dark:text-amber-400"
                              >
                                {risk.risk}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="toprisks" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Security Risks</CardTitle>
                <CardDescription>
                  Critical security concerns requiring immediate attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {assessment.topRisks.map((risk, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-md border-red-200 bg-red-50 dark:border-red-800/30 dark:bg-red-900/10"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center">
                            <span
                              className="font-medium cursor-pointer hover:underline"
                              onClick={() => {
                                setSelectedComponent(risk.component);
                                setActiveTab("components");
                              }}
                            >
                              {risk.component}
                            </span>
                            <Badge
                              variant="outline"
                              className="ml-2 bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400"
                            >
                              {risk.impact}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{risk.risk}</p>
                        </div>
                        <div className="text-sm bg-background p-2 rounded-md border md:max-w-[50%]">
                          <span className="font-medium">Recommendation:</span>{" "}
                          {risk.recommendation}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-medium flex items-center mb-3">
                    <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500" />
                    Recommended Next Steps
                  </h3>
                  <div className="space-y-2">
                    {assessment.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500 mt-0.5" />

                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
