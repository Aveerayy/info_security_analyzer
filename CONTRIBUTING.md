# Contributing to Info Security Analyzer

Thanks for your interest in improving Info Security Analyzer.

## Ways to help

- improve threat-model quality and report clarity
- fix bugs in diagram/document processing
- improve Docker/local setup reliability
- improve docs, screenshots, sample outputs, and onboarding
- add tests, examples, and provider compatibility fixes

## Development setup

### Local

```bash
git clone https://github.com/Aveerayy/info_security_analyzer.git
cd info_security_analyzer

# backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# frontend (new terminal)
cd ..
npm install
npm run dev
```

### Docker

```bash
./docker-run.sh full
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:8000`

## Before opening a PR

Please:

- keep changes focused and reasonably small
- update docs when behavior changes
- avoid committing secrets, API keys, or `.env` files
- describe any security/privacy implications in the PR
- run `./scripts/smoke-test.sh` from the repo root when possible
- include screenshots for visible UI changes when practical

## Pull request checklist

- [ ] change is scoped and explained clearly
- [ ] local startup still works
- [ ] docs updated if needed
- [ ] no secrets or sensitive sample data added
- [ ] security-relevant behavior called out explicitly

## Good first contributions

- README improvements
- quickstart verification and cleanup
- sample report / demo assets
- tests for backend parsing and provider validation
- privacy and deployment documentation

For maintainers and new contributors, see also:

- `docs/good-first-issues.md` for starter-task guidance and labeling ideas
- `.github/ISSUE_TEMPLATE/` for intake hygiene
- `docs/RELEASING.md` and `CHANGELOG.md` for release-note expectations

## Code of conduct

Be constructive, kind, and specific. No security shaming.
