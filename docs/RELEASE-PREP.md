# Release Prep Checklist

Use this before tagging or publishing a GitHub release for Info Security Analyzer.

It is intentionally lightweight and based on the current repo reality:

- release guidance in `docs/RELEASING.md`
- user-facing scope in `README.md`
- change summary in `CHANGELOG.md`
- security/disclosure guidance in `SECURITY.md`
- local validation flow in `CONTRIBUTING.md` and `scripts/smoke-test.sh`

## 1) Decide what is shipping

- [ ] Pick the release version/tag, for example `v0.1.0`
- [ ] Confirm the user-visible changes that belong in this release
- [ ] Note any security/privacy-impacting changes
- [ ] Note any self-hosting or Docker behavior changes

## 2) Update release-facing docs

- [ ] Move the relevant items from `CHANGELOG.md` `Unreleased` into a new version section
- [ ] Update `README.md` if setup, demo mode, provider behavior, screenshots, or trust boundaries changed
- [ ] Update `SECURITY.md` if reporting guidance or deployment risk guidance changed
- [ ] Make sure release notes stay user-facing, not just internal refactor notes

## 3) Validate packaging paths that users will actually touch

### Frontend/package path

- [ ] `npm install`
- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] Confirm `dist/` is produced successfully

### Backend/basic validation path

- [ ] Run `python -m unittest discover -s tests -p 'test_*.py' -v`
- [ ] Run `./scripts/smoke-test.sh`
- [ ] Confirm the backend health path still behaves as documented

### Container path

If the release notes mention Docker or deployment changes:

- [ ] `./docker-run.sh full` works, or
- [ ] `docker compose up --build backend frontend-dev` works, and/or
- [ ] `docker compose up --build backend frontend-prod` works if that path is referenced

## 4) Security and packaging hygiene

- [ ] No `.env` files, API keys, or sensitive sample diagrams are staged
- [ ] Release notes call out security/privacy-relevant changes clearly
- [ ] Docs do not imply the tool is a replacement for human review
- [ ] Demo assets still match the product closely enough for trust
- [ ] The version/tag used in notes matches the git tag exactly

## 5) Check version and tag consistency

Current repo detail to verify before a public release:

- `package.json` is currently `0.0.0`

Before shipping, decide one of these and stay consistent:

- [ ] bump `package.json` to the release version, or
- [ ] keep git tags as the source of truth and avoid claiming the package version is authoritative

If package version stays `0.0.0`, mention that clearly in maintainer notes so downstream packagers are not surprised.

## 6) Create the release commit

Prefer a focused commit such as:

```bash
git commit -m "docs: prepare release v0.1.0"
```

Or, if code and docs are included together:

```bash
git commit -m "release: v0.1.0"
```

## 7) Tag and publish

```bash
git tag -a v0.1.0 -m "Release v0.1.0"
# push later from the main session when ready
# git push origin main --tags
```

## GitHub release notes template

```md
## Info Security Analyzer v0.1.0

### Highlights
- Added ...
- Improved ...
- Fixed ...

### Security / privacy notes
- ...

### Self-hosting / Docker notes
- ...

### Known limitations
- This remains an assistive threat-modeling tool; human review is still required.
```

## Quick maintainer notes from the current repo state

- `docs/RELEASING.md` already defines the lightweight release ceremony; this file turns it into a more concrete preflight checklist.
- `README.md` promises local dev, Docker quickstart, Docker Compose, demo mode, and smoke-test guidance, so those are the highest-value packaging checks.
- `SECURITY.md` currently says security fixes land on `main`; if versioned support is introduced later, update that before claiming supported release lines.
