# Good first issues

This file gives maintainers a place to point new contributors toward low-risk, high-value work.

## What makes a task good for first-time contributors?

A good first issue here should be:

- small enough to finish in a focused session
- easy to validate locally
- unlikely to require deep architecture knowledge
- safe from a security/privacy standpoint
- useful to project trust, onboarding, or usability

## Good starter areas

### Docs and onboarding
- improve README wording or structure
- clarify provider setup instructions
- tighten privacy/trust-boundary explanations
- add or refresh screenshots using the built-in demo report
- improve Docker/local setup notes after verifying them

### Community hygiene
- improve issue templates or PR template text
- refine release checklist or changelog entries
- add label suggestions to triage docs
- document reproducible bug-report steps

### Low-risk UI polish
- text copy fixes
- empty-state improvements
- accessibility labels
- help text for inputs or settings

### Tests and validation
- add backend unit tests around parsing or validation
- add frontend tests for clearly isolated helpers/components
- improve error-message coverage for misconfiguration paths

## Example issue labels

Suggested labels maintainers can use:

- `good first issue`
- `documentation`
- `help wanted`
- `frontend`
- `backend`
- `security-docs`

## Maintainer checklist before labeling an issue

- [ ] scope is narrow and well-described
- [ ] acceptance criteria are written down
- [ ] likely file areas are mentioned
- [ ] issue does not require secret access or production data
- [ ] issue does not need major product decisions first

## Example starter issue ideas

1. **Add real screenshots to README using demo mode**
   - Capture 2–3 UI images from the built-in demo flow
   - Replace placeholder asset references
   - Keep image sizes repo-friendly

2. **Document privacy tradeoffs more clearly**
   - Reconcile README + SECURITY wording
   - Explain what may be sent to LLM providers
   - Keep claims accurate and minimal

3. **Improve local setup troubleshooting**
   - Add a short troubleshooting section for common startup issues
   - Cover missing Python/Node dependencies and port conflicts

4. **Add a pull request template**
   - Prompt for screenshots, security impact, and local verification

These tasks improve trust and contributor experience without forcing new contributors into the deepest parts of the analyzer logic first.
