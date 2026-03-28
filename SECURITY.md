# Security Policy

Thank you for helping improve the security of Info Security Analyzer.

## Scope

This project analyzes architecture diagrams and documents using third-party LLM providers. Security issues may affect:

- uploaded diagrams and PDFs
- API keys provided by users
- generated threat-model reports
- deployment defaults and container exposure

## Supported versions

At the moment, security fixes are made on the `main` branch.

## Reporting a vulnerability

Please report suspected vulnerabilities privately. Do **not** open a public GitHub issue for unpatched security problems.

Please use one of these private reporting paths:

- email: `akshay@veerayyagari.com`
- GitHub private security advisory, if enabled for the repository

When reporting, include:

- affected commit / branch / version
- reproduction steps or proof of concept
- impact assessment
- any suggested remediation

## Data handling notes

A few important trust boundaries for this project:

- Uploaded diagrams and PDFs are processed by the backend and may be sent to the configured LLM provider for analysis.
- API keys entered in the UI are stored in the browser's local storage on that device.
- Environment-variable-based keys may be used on self-hosted deployments instead of browser-stored keys.
- Generated analysis should be reviewed by a human before operational or compliance use.

## Deployment guidance

If you self-host this project:

- avoid exposing the backend broadly to the internet unless you add authentication and rate limiting
- do not commit `.env` files or API keys
- prefer least-privilege API keys and isolated test projects during evaluation
- review logs and defaults before using real sensitive architecture diagrams

## Out of scope / known limitations

- LLM output is assistive analysis, not a guarantee of complete threat coverage
- diagrams may contain secrets or sensitive infrastructure details; sanitize where possible before upload
- provider-specific retention and training policies depend on the selected LLM vendor
