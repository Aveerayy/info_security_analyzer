export interface SecurityRisk {
  category: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  mitigation: string;
}

export interface ComponentRelationship {
  source: string;
  target: string;
  description: string;
  securityRisks: {
    risk: string;
    impact: string;
    mitigation: string;
  }[];
}

export interface ComponentAnalysis {
  name: string;
  type: string;
  description: string;
  securityRisks: SecurityRisk[];
  relationships: string[];
}

export interface SecurityAssessmentSummary {
  topRisks: {
    component: string;
    risk: string;
    impact: string;
    recommendation: string;
  }[];
  nextSteps: string[];
}

export interface KubernetesSecurityAnalysis {
  components: ComponentAnalysis[];
  dataFlows: {
    source: string;
    target: string;
    description: string;
    securityRisks: {
      risk: string;
      impact: string;
      mitigation: string;
    }[];
  }[];
  assessmentSummary: SecurityAssessmentSummary;
}

export const KUBERNETES_SECURITY_ANALYSIS: KubernetesSecurityAnalysis = {
  components: [
    {
      name: "External Systems",
      type: "External Interface",
      description: "Tools such as Kubectl and CI/CD systems used externally.",
      securityRisks: [
        {
          category: "Spoofing",
          severity: "High",
          mitigation:
            "Implement certificate-based authentication and validate client certificates",
        },
        {
          category: "Tampering",
          severity: "Medium",
          mitigation:
            "Use TLS for all communications and validate message integrity",
        },
      ],

      relationships: ["kube-api server"],
    },
    {
      name: "kube-api server",
      type: "Control Plane Component",
      description: "Handles API requests and control logic execution.",
      securityRisks: [
        {
          category: "Spoofing",
          severity: "High",
          mitigation: "TLS, strong authentication",
        },
        {
          category: "Tampering",
          severity: "High",
          mitigation: "Encryption, admission controls",
        },
        {
          category: "Repudiation",
          severity: "Medium",
          mitigation: "Audit logging",
        },
        {
          category: "Information Disclosure",
          severity: "High",
          mitigation: "RBAC, network isolation",
        },
        {
          category: "Denial of Service",
          severity: "High",
          mitigation: "Rate limiting, replicas",
        },
        {
          category: "Elevation of Privilege",
          severity: "High",
          mitigation: "Least privilege principle",
        },
      ],

      relationships: ["External Systems", "etcd", "Kube Scheduler", "Kubelet"],
    },
    {
      name: "etcd",
      type: "Control Plane Component",
      description: "Kubernetes cluster datastore that stores all cluster data.",
      securityRisks: [
        {
          category: "Information Disclosure",
          severity: "Critical",
          mitigation: "Encrypt data at rest, implement strict access controls",
        },
        {
          category: "Tampering",
          severity: "High",
          mitigation: "TLS client certificate authentication, RBAC",
        },
        {
          category: "Denial of Service",
          severity: "High",
          mitigation: "Clustering, regular backups, resource limits",
        },
      ],

      relationships: ["kube-api server"],
    },
    {
      name: "Kube Scheduler",
      type: "Control Plane Component",
      description: "Assigns Pods to Nodes based on resource requirements.",
      securityRisks: [
        {
          category: "Tampering",
          severity: "Medium",
          mitigation:
            "Secure communication with API server, admission controllers",
        },
        {
          category: "Denial of Service",
          severity: "Medium",
          mitigation: "Resource limits, redundancy",
        },
      ],

      relationships: ["kube-api server", "Kubelet"],
    },
    {
      name: "Kubelet",
      type: "Node Component",
      description: "Manages container lifecycle on worker nodes.",
      securityRisks: [
        {
          category: "Spoofing",
          severity: "High",
          mitigation: "TLS bootstrapping, certificate rotation",
        },
        {
          category: "Tampering",
          severity: "High",
          mitigation: "Validate container images, secure communication",
        },
        {
          category: "Elevation of Privilege",
          severity: "High",
          mitigation: "Pod security policies, container isolation",
        },
      ],

      relationships: ["kube-api server", "Container Runtime"],
    },
    {
      name: "Container Runtime",
      type: "Node Component",
      description: "Executes containers on worker nodes.",
      securityRisks: [
        {
          category: "Tampering",
          severity: "High",
          mitigation: "Container image signing, vulnerability scanning",
        },
        {
          category: "Elevation of Privilege",
          severity: "Critical",
          mitigation: "Seccomp, AppArmor profiles, drop capabilities",
        },
        {
          category: "Information Disclosure",
          severity: "High",
          mitigation: "Encrypt sensitive data, limit container access to host",
        },
      ],

      relationships: ["Kubelet", "Worker Node"],
    },
    {
      name: "Worker Node",
      type: "Infrastructure",
      description:
        "Physical or virtual machine that executes container workloads.",
      securityRisks: [
        {
          category: "Spoofing",
          severity: "Medium",
          mitigation: "Node authentication, secure boot",
        },
        {
          category: "Tampering",
          severity: "High",
          mitigation: "OS hardening, regular patching",
        },
        {
          category: "Denial of Service",
          severity: "Medium",
          mitigation: "Resource quotas, node auto-scaling",
        },
      ],

      relationships: ["Container Runtime"],
    },
  ],

  dataFlows: [
    {
      source: "External Systems",
      target: "kube-api server",
      description: "Pod create requests over HTTP/HTTPS",
      securityRisks: [
        {
          risk: "Unauthorized access",
          impact: "High",
          mitigation: "Enhanced authentication, TLS client certificates",
        },
        {
          risk: "Man-in-the-middle attack",
          impact: "High",
          mitigation:
            "TLS with certificate pinning, secure communication channels",
        },
      ],
    },
    {
      source: "kube-api server",
      target: "etcd",
      description: "Cluster state storage and retrieval",
      securityRisks: [
        {
          risk: "Data leakage",
          impact: "Critical",
          mitigation: "Encryption at rest, TLS for communication",
        },
        {
          risk: "Data corruption",
          impact: "High",
          mitigation: "Regular backups, data validation",
        },
      ],
    },
    {
      source: "kube-api server",
      target: "Kube Scheduler",
      description: "Pod scheduling requests",
      securityRisks: [
        {
          risk: "Scheduling manipulation",
          impact: "Medium",
          mitigation: "Secure communication, admission controllers",
        },
      ],
    },
    {
      source: "kube-api server",
      target: "Kubelet",
      description: "Pod lifecycle management commands",
      securityRisks: [
        {
          risk: "Command injection",
          impact: "High",
          mitigation: "Input validation, secure communication",
        },
        {
          risk: "Unauthorized commands",
          impact: "High",
          mitigation: "RBAC, node authorization",
        },
      ],
    },
    {
      source: "Kube Scheduler",
      target: "Kubelet",
      description: "Pod assignment instructions",
      securityRisks: [
        {
          risk: "Resource exhaustion",
          impact: "Medium",
          mitigation: "Resource quotas, limit ranges",
        },
      ],
    },
    {
      source: "Kubelet",
      target: "Container Runtime",
      description: "Container creation and management",
      securityRisks: [
        {
          risk: "Container escape",
          impact: "Critical",
          mitigation: "Container isolation, security profiles",
        },
        {
          risk: "Privilege escalation",
          impact: "High",
          mitigation: "Run containers as non-root, drop capabilities",
        },
      ],
    },
  ],

  assessmentSummary: {
    topRisks: [
      {
        component: "kube-api server",
        risk: "Unauthorized access",
        impact: "High",
        recommendation:
          "Implement rigorous access controls, RBAC, and API authentication",
      },
      {
        component: "etcd",
        risk: "Data corruption or loss",
        impact: "High",
        recommendation:
          "Regular backups, data encryption, and cluster redundancy",
      },
      {
        component: "Kubelet",
        risk: "Unauthorized container access",
        impact: "High",
        recommendation:
          "Secure and updated runtimes, strict pod security policies",
      },
      {
        component: "Container Runtime",
        risk: "Container escape",
        impact: "Critical",
        recommendation:
          "Implement container isolation, security profiles, and runtime security",
      },
      {
        component: "Worker Node",
        risk: "Node compromise",
        impact: "High",
        recommendation: "Regular OS patching, node hardening, and secure boot",
      },
    ],

    nextSteps: [
      "Implement API server authentication and authorization controls",
      "Enable encryption for etcd data at rest",
      "Configure pod security policies to restrict container privileges",
      "Implement network policies to segment cluster communication",
      "Enable audit logging for all cluster components",
      "Regularly scan container images for vulnerabilities",
      "Establish a patch management process for all cluster components",
    ],
  },
};
