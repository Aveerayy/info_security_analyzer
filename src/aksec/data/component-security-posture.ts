export interface SecurityVulnerability {
  id: string;
  name: string;
  description: string;
  severity: "critical" | "high" | "medium" | "low";
  cve?: string;
  discovered: string;
  status: "open" | "mitigated" | "resolved";
}

export interface ComplianceStatus {
  standard: string;
  status: "compliant" | "non-compliant" | "partially-compliant";
  lastChecked: string;
  findings: number;
}

export interface SecurityIncident {
  id: string;
  date: string;
  type: string;
  description: string;
  impact: "critical" | "high" | "medium" | "low";
  status: "active" | "contained" | "resolved";
}

export interface SecurityRisk {
  risk: string;
  impact: string;
  mitigation: string;
}

export interface ComponentSecurityPosture {
  name: string;
  type: string;
  operationalStatus: "secure" | "at-risk" | "vulnerable" | "critical";
  knownVulnerabilities: SecurityVulnerability[];
  complianceStatus: ComplianceStatus[];
  recentIncidents: SecurityIncident[];
  threatAnalysis: {
    category: string;
    description: string;
    severity: "high" | "medium" | "low";
    mitigation: string;
  }[];
}

export interface DataFlowSecurity {
  source: string;
  target: string;
  description: string;
  securityRisks: SecurityRisk[];
}

export interface SecurityAssessment {
  topRisks: {
    component: string;
    risk: string;
    impact: string;
    recommendation: string;
  }[];
  nextSteps: string[];
}

export interface ComponentSecurityPostureReport {
  components: ComponentSecurityPosture[];
  dataFlows: DataFlowSecurity[];
  assessment: SecurityAssessment;
}

export const MOCK_COMPONENT_SECURITY_POSTURE: ComponentSecurityPostureReport = {
  components: [
    {
      name: "API Gateway",
      type: "Gateway",
      operationalStatus: "at-risk",
      knownVulnerabilities: [
        {
          id: "VULN-2023-0001",
          name: "Authentication Bypass",
          description:
            "Potential bypass of authentication mechanism through token manipulation",
          severity: "high",
          cve: "CVE-2023-32456",
          discovered: "2023-09-15",
          status: "open",
        },
        {
          id: "VULN-2023-0002",
          name: "Rate Limiting Misconfiguration",
          description:
            "Insufficient rate limiting could lead to DoS vulnerability",
          severity: "medium",
          discovered: "2023-10-02",
          status: "mitigated",
        },
      ],

      complianceStatus: [
        {
          standard: "OWASP API Security",
          status: "partially-compliant",
          lastChecked: "2023-11-01",
          findings: 3,
        },
        {
          standard: "PCI DSS",
          status: "non-compliant",
          lastChecked: "2023-10-28",
          findings: 2,
        },
      ],

      recentIncidents: [
        {
          id: "INC-2023-0045",
          date: "2023-10-10",
          type: "Brute Force Attempt",
          description:
            "Multiple failed authentication attempts detected from suspicious IPs",
          impact: "low",
          status: "resolved",
        },
      ],

      threatAnalysis: [
        {
          category: "Spoofing",
          description:
            "API Gateway lacks strong authentication mechanisms, allowing potential identity spoofing",
          severity: "high",
          mitigation:
            "Implement multi-factor authentication and OAuth 2.0 with proper token validation",
        },
        {
          category: "Denial of Service",
          description: "No rate limiting on API endpoints",
          severity: "medium",
          mitigation: "Implement rate limiting and throttling mechanisms",
        },
      ],
    },
    {
      name: "Authentication Service",
      type: "Service",
      operationalStatus: "secure",
      knownVulnerabilities: [
        {
          id: "VULN-2023-0003",
          name: "Outdated Dependency",
          description: "Using outdated JWT library with known vulnerabilities",
          severity: "medium",
          cve: "CVE-2023-28765",
          discovered: "2023-08-20",
          status: "resolved",
        },
      ],

      complianceStatus: [
        {
          standard: "OWASP ASVS",
          status: "compliant",
          lastChecked: "2023-11-05",
          findings: 0,
        },
        {
          standard: "ISO 27001",
          status: "compliant",
          lastChecked: "2023-10-15",
          findings: 0,
        },
      ],

      recentIncidents: [],
      threatAnalysis: [
        {
          category: "Information Disclosure",
          description:
            "Verbose error messages could reveal sensitive information about authentication mechanisms",
          severity: "low",
          mitigation:
            "Implement generic error messages for authentication failures",
        },
      ],
    },
    {
      name: "User Database",
      type: "Database",
      operationalStatus: "vulnerable",
      knownVulnerabilities: [
        {
          id: "VULN-2023-0004",
          name: "Unencrypted Sensitive Data",
          description: "Sensitive user data stored without encryption at rest",
          severity: "high",
          discovered: "2023-09-28",
          status: "open",
        },
        {
          id: "VULN-2023-0005",
          name: "SQL Injection Vulnerability",
          description: "Potential SQL injection in user search functionality",
          severity: "critical",
          cve: "CVE-2023-35678",
          discovered: "2023-10-05",
          status: "mitigated",
        },
      ],

      complianceStatus: [
        {
          standard: "GDPR",
          status: "non-compliant",
          lastChecked: "2023-11-02",
          findings: 2,
        },
        {
          standard: "PCI DSS",
          status: "non-compliant",
          lastChecked: "2023-10-28",
          findings: 3,
        },
      ],

      recentIncidents: [
        {
          id: "INC-2023-0046",
          date: "2023-10-15",
          type: "Unauthorized Access Attempt",
          description:
            "Attempted privilege escalation detected from internal network",
          impact: "medium",
          status: "contained",
        },
      ],

      threatAnalysis: [
        {
          category: "Information Disclosure",
          description: "Sensitive data stored in plain text in the database",
          severity: "high",
          mitigation: "Encrypt sensitive data at rest and in transit",
        },
        {
          category: "Tampering",
          description:
            "No data validation on input fields could lead to injection attacks",
          severity: "medium",
          mitigation:
            "Implement proper input validation and sanitization on all user inputs",
        },
      ],
    },
    {
      name: "Payment Processor",
      type: "Service",
      operationalStatus: "secure",
      knownVulnerabilities: [],
      complianceStatus: [
        {
          standard: "PCI DSS",
          status: "compliant",
          lastChecked: "2023-11-10",
          findings: 0,
        },
      ],

      recentIncidents: [],
      threatAnalysis: [
        {
          category: "Tampering",
          description:
            "Unencrypted data transfers between components allow for man-in-the-middle attacks",
          severity: "high",
          mitigation:
            "Implement TLS for all data transfers and add integrity checks",
        },
      ],
    },
    {
      name: "Admin Dashboard",
      type: "UI",
      operationalStatus: "at-risk",
      knownVulnerabilities: [
        {
          id: "VULN-2023-0006",
          name: "Cross-Site Scripting (XSS)",
          description: "Reflected XSS vulnerability in search functionality",
          severity: "medium",
          cve: "CVE-2023-42345",
          discovered: "2023-10-20",
          status: "open",
        },
      ],

      complianceStatus: [
        {
          standard: "OWASP Top 10",
          status: "partially-compliant",
          lastChecked: "2023-11-05",
          findings: 2,
        },
      ],

      recentIncidents: [],
      threatAnalysis: [
        {
          category: "Elevation of Privilege",
          description:
            "Insufficient role-based access control in the admin dashboard",
          severity: "medium",
          mitigation: "Implement proper RBAC with principle of least privilege",
        },
      ],
    },
  ],

  dataFlows: [
    {
      source: "User",
      target: "API Gateway",
      description: "User authentication requests",
      securityRisks: [
        {
          risk: "Man-in-the-middle attack",
          impact: "Credential theft and session hijacking",
          mitigation: "Implement TLS 1.3 with certificate pinning",
        },
        {
          risk: "Brute force attacks",
          impact: "Unauthorized access to user accounts",
          mitigation: "Implement rate limiting and account lockout policies",
        },
      ],
    },
    {
      source: "API Gateway",
      target: "Authentication Service",
      description: "Authentication token validation",
      securityRisks: [
        {
          risk: "Token forgery",
          impact: "Unauthorized access to protected resources",
          mitigation:
            "Use asymmetric key signing and short token expiration times",
        },
      ],
    },
    {
      source: "Authentication Service",
      target: "User Database",
      description: "User credential verification",
      securityRisks: [
        {
          risk: "SQL injection",
          impact: "Unauthorized data access or modification",
          mitigation: "Use parameterized queries and ORM frameworks",
        },
        {
          risk: "Credential exposure",
          impact: "Password compromise",
          mitigation:
            "Use salted hashing with strong algorithms (Argon2, bcrypt)",
        },
      ],
    },
    {
      source: "API Gateway",
      target: "Payment Processor",
      description: "Payment transaction processing",
      securityRisks: [
        {
          risk: "Payment data interception",
          impact: "Financial fraud and PCI DSS violations",
          mitigation: "End-to-end encryption of payment data",
        },
      ],
    },
    {
      source: "Admin Dashboard",
      target: "API Gateway",
      description: "Administrative operations",
      securityRisks: [
        {
          risk: "Session hijacking",
          impact: "Unauthorized administrative access",
          mitigation:
            "Implement strict session management with frequent rotation",
        },
        {
          risk: "Cross-Site Request Forgery (CSRF)",
          impact: "Unauthorized actions performed on behalf of administrators",
          mitigation:
            "Implement anti-CSRF tokens for all state-changing operations",
        },
      ],
    },
  ],

  assessment: {
    topRisks: [
      {
        component: "User Database",
        risk: "Unencrypted Sensitive Data",
        impact: "Potential exposure of user PII and compliance violations",
        recommendation:
          "Implement database encryption at rest using transparent data encryption (TDE)",
      },
      {
        component: "API Gateway",
        risk: "Authentication Bypass",
        impact: "Unauthorized access to all protected resources",
        recommendation:
          "Implement multi-factor authentication and OAuth 2.0 with proper token validation",
      },
      {
        component: "User Database",
        risk: "SQL Injection Vulnerability",
        impact: "Data breach and unauthorized data access",
        recommendation: "Implement parameterized queries and input validation",
      },
      {
        component: "Payment Processor",
        risk: "Unencrypted Data Transfers",
        impact: "Payment data exposure and financial fraud",
        recommendation:
          "Implement TLS 1.3 for all communications with the payment processor",
      },
      {
        component: "Admin Dashboard",
        risk: "Insufficient Access Controls",
        impact: "Privilege escalation and unauthorized administrative actions",
        recommendation:
          "Implement proper RBAC with principle of least privilege",
      },
    ],

    nextSteps: [
      "Implement database encryption for all sensitive user data",
      "Deploy multi-factor authentication for API Gateway access",
      "Update all data transfers to use TLS 1.3",
      "Implement comprehensive logging with user identifiers and timestamps",
      "Conduct penetration testing focused on authentication and authorization mechanisms",
      "Perform a comprehensive review of role-based access controls",
      "Establish regular security audit schedule",
    ],
  },
};
