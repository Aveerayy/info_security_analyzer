import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldIcon } from "lucide-react";
import ComponentAnalysisDashboard from "@/aksec/components/component-analysis-dashboard";
import { KubernetesSecurityAnalysis } from "@/aksec/data/kubernetes-security-analysis";

interface ComponentSecurityTabProps {
  analysisData: KubernetesSecurityAnalysis;
}

export default function ComponentSecurityTab({ analysisData }: ComponentSecurityTabProps) {
  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center">
            <ShieldIcon className="h-5 w-5 mr-2" strokeWidth={1.5} />
            Component Security Analysis
          </CardTitle>
          <CardDescription>
            STRIDE-based security analysis of architecture components and their
            relationships
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ComponentAnalysisDashboard analysisData={analysisData} />
        </CardContent>
      </Card>
    </div>
  );
}
