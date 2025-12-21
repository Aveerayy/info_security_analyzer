import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  DownloadIcon,
  ShieldIcon,
  ClipboardListIcon,
} from "lucide-react";
import { SecurityAssessmentSummary } from "@/aksec/data/kubernetes-security-analysis";

interface SecurityAssessmentSummaryCardProps {
  assessmentSummary: SecurityAssessmentSummary;
  onSelectComponent?: (componentName: string) => void;
  componentNames?: string[];
}

export default function SecurityAssessmentSummaryCard({
  assessmentSummary,
  onSelectComponent,
  componentNames = [],
}: SecurityAssessmentSummaryCardProps) {
  // Generate dynamic summary based on top risks
  const criticalComponents = assessmentSummary.topRisks
    .filter(r => r.impact === 'Critical')
    .map(r => r.component);
  const highComponents = assessmentSummary.topRisks
    .filter(r => r.impact === 'High')
    .map(r => r.component);
  
  const summaryText = (() => {
    const topComponents = [...criticalComponents, ...highComponents].slice(0, 3);
    if (criticalComponents.length > 0) {
      return `This architecture has critical security concerns that require immediate attention. Focus on securing ${topComponents.join(', ')}. Implementing the recommended security controls will significantly improve the overall security posture.`;
    } else if (highComponents.length > 0) {
      return `This architecture has high-risk components that should be addressed. Prioritize securing ${topComponents.join(', ')}. Following the recommended mitigations will strengthen your security posture.`;
    } else if (assessmentSummary.topRisks.length > 0) {
      return `This architecture has moderate security risks identified. Review and address the recommendations for ${componentNames.slice(0, 3).join(', ')} to maintain a strong security posture.`;
    }
    return `This architecture has a good security posture. Continue to monitor and maintain security best practices across all components.`;
  })();
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <ShieldIcon className="h-5 w-5 mr-2 text-primary" />

            <CardTitle>Security Assessment Summary</CardTitle>
          </div>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
        <CardDescription>
          Key findings and recommended actions from the security analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium flex items-center mb-3">
            <AlertTriangleIcon className="h-5 w-5 mr-2 text-destructive" />
            Top Security Risks
          </h3>
          <div className="space-y-3">
            {assessmentSummary.topRisks.map((risk, index) => (
              <Card key={index} className="bg-muted/30">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span
                          className="font-medium cursor-pointer hover:underline"
                          onClick={() =>
                            onSelectComponent &&
                            onSelectComponent(risk.component)
                          }
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium flex items-center mb-3">
            <ClipboardListIcon className="h-5 w-5 mr-2 text-primary" />
            Recommended Next Steps
          </h3>
          <div className="space-y-2">
            {assessmentSummary.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <CheckCircleIcon className="h-5 w-5 mr-2 text-green-500 mt-0.5" />

                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start">
              <ShieldIcon className="h-6 w-6 mr-3 text-primary mt-1" />

              <div>
                <h4 className="font-medium">Security Posture Summary</h4>
                <p className="text-sm mt-1">
                  {summaryText}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
