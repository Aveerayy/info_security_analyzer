import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangleIcon,
  ShieldIcon,
  ServerIcon,
  DatabaseIcon,
  ArrowRightIcon,
  LockIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  GlobeIcon,
  BoxIcon,
} from "lucide-react";
import {
  ComponentAnalysis,
  ComponentRelationship,
} from "@/aksec/data/kubernetes-security-analysis";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ComponentSecurityDetailProps {
  component: ComponentAnalysis;
  dataFlows: ComponentRelationship[];
  onSelectComponent?: (componentName: string) => void;
}

export default function ComponentSecurityDetail({
  component,
  dataFlows,
  onSelectComponent,
}: ComponentSecurityDetailProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const getComponentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "external interface":
        return <GlobeIcon className="h-5 w-5" strokeWidth={1.5} />;

      case "control plane component":
        return <ServerIcon className="h-5 w-5" strokeWidth={1.5} />;

      case "node component":
        return <BoxIcon className="h-5 w-5" strokeWidth={1.5} />;

      case "infrastructure":
        return <DatabaseIcon className="h-5 w-5" strokeWidth={1.5} />;

      default:
        return <ServerIcon className="h-5 w-5" strokeWidth={1.5} />;
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "Critical":
        return <XCircleIcon className="h-5 w-5 text-red-500" strokeWidth={2} />;

      case "High":
        return (
          <AlertTriangleIcon
            className="h-5 w-5 text-orange-500"
            strokeWidth={2}
          />
        );

      case "Medium":
        return (
          <AlertCircleIcon className="h-5 w-5 text-amber-500" strokeWidth={2} />
        );

      case "Low":
        return (
          <CheckCircleIcon className="h-5 w-5 text-green-500" strokeWidth={2} />
        );

      default:
        return <ShieldIcon className="h-5 w-5 text-gray-500" strokeWidth={2} />;
    }
  };

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

  // Get incoming and outgoing data flows for this component
  const incomingFlows = dataFlows.filter(
    (flow) => flow.target === component.name
  );
  const outgoingFlows = dataFlows.filter(
    (flow) => flow.source === component.name
  );

  // Count risks by severity
  const criticalRisks = component.securityRisks.filter(
    (risk) => risk.severity === "Critical"
  ).length;
  const highRisks = component.securityRisks.filter(
    (risk) => risk.severity === "High"
  ).length;
  const mediumRisks = component.securityRisks.filter(
    (risk) => risk.severity === "Medium"
  ).length;
  const lowRisks = component.securityRisks.filter(
    (risk) => risk.severity === "Low"
  ).length;

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            {getComponentIcon(component.type)}
            <CardTitle className="ml-2">{component.name}</CardTitle>
            <Badge variant="outline" className="ml-2 capitalize">
              {component.type}
            </Badge>
          </div>
          <div className="flex gap-1">
            {criticalRisks > 0 && (
              <Badge variant="destructive">{criticalRisks} Critical</Badge>
            )}
            {highRisks > 0 && (
              <Badge
                variant="outline"
                className="bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400 border-red-200 dark:border-red-800/30"
              >
                {highRisks} High
              </Badge>
            )}
          </div>
        </div>
        <CardDescription>{component.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">
              <ShieldIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="risks">
              <AlertTriangleIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Security Risks
            </TabsTrigger>
            <TabsTrigger value="dataflows">
              <ArrowRightIcon className="h-4 w-4 mr-2" strokeWidth={1.5} />
              Data Flows
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Risk Summary</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <XCircleIcon className="h-4 w-4 text-red-500 mr-2" />

                        <span className="text-sm">Critical</span>
                      </div>
                      <Badge
                        variant={criticalRisks > 0 ? "destructive" : "outline"}
                      >
                        {criticalRisks}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertTriangleIcon className="h-4 w-4 text-orange-500 mr-2" />

                        <span className="text-sm">High</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          highRisks > 0
                            ? "bg-red-50 text-red-700 dark:bg-red-900/10 dark:text-red-400"
                            : ""
                        }
                      >
                        {highRisks}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <AlertCircleIcon className="h-4 w-4 text-amber-500 mr-2" />

                        <span className="text-sm">Medium</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          mediumRisks > 0
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-900/10 dark:text-amber-400"
                            : ""
                        }
                      >
                        {mediumRisks}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />

                        <span className="text-sm">Low</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          lowRisks > 0
                            ? "bg-green-50 text-green-700 dark:bg-green-900/10 dark:text-green-400"
                            : ""
                        }
                      >
                        {lowRisks}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="py-3">
                  <CardTitle className="text-sm">Related Components</CardTitle>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="space-y-2">
                    {component.relationships.length > 0 ? (
                      component.relationships.map((relatedComponent, index) => (
                        <div
                          key={index}
                          className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                          onClick={() =>
                            onSelectComponent &&
                            onSelectComponent(relatedComponent)
                          }
                        >
                          <ServerIcon className="h-4 w-4 mr-2 text-muted-foreground" />

                          <span>{relatedComponent}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-muted-foreground text-sm">
                        No related components
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">
                  STRIDE Analysis Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="py-0">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {[
                    "Spoofing",
                    "Tampering",
                    "Repudiation",
                    "Information Disclosure",
                    "Denial of Service",
                    "Elevation of Privilege",
                  ].map((category) => {
                    const risk = component.securityRisks.find(
                      (r) => r.category === category
                    );
                    return (
                      <div key={category} className="p-2 border rounded-md">
                        <div className="text-xs text-muted-foreground">
                          {category}
                        </div>
                        {risk ? (
                          <div className="flex items-center mt-1">
                            {getSeverityIcon(risk.severity)}
                            <span className="ml-1 text-sm">
                              {risk.severity}
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center mt-1">
                            <CheckCircleIcon className="h-4 w-4 text-green-500" />

                            <span className="ml-1 text-sm">Not Applicable</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks" className="mt-4">
            {component.securityRisks.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Mitigation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {component.securityRisks.map((risk, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {risk.category}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`capitalize ${getSeverityColor(risk.severity)}`}
                        >
                          {getSeverityIcon(risk.severity)}
                          <span className="ml-1">{risk.severity}</span>
                        </Badge>
                      </TableCell>
                      <TableCell>{risk.mitigation}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No security risks identified for this component
              </div>
            )}
          </TabsContent>

          <TabsContent value="dataflows" className="mt-4 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Incoming Data Flows</h3>
              {incomingFlows.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Source</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Risks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incomingFlows.map((flow, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() =>
                            onSelectComponent && onSelectComponent(flow.source)
                          }
                        >
                          {flow.source}
                        </TableCell>
                        <TableCell>{flow.description}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-muted-foreground text-sm p-2">
                  No incoming data flows
                </div>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Outgoing Data Flows</h3>
              {outgoingFlows.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Target</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Risks</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {outgoingFlows.map((flow, index) => (
                      <TableRow key={index}>
                        <TableCell
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() =>
                            onSelectComponent && onSelectComponent(flow.target)
                          }
                        >
                          {flow.target}
                        </TableCell>
                        <TableCell>{flow.description}</TableCell>
                        <TableCell>
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-muted-foreground text-sm p-2">
                  No outgoing data flows
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
