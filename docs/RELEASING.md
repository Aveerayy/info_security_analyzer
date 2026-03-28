# Releasing Info Security Analyzer

This project does not need a heavyweight release ceremony, but it does benefit from predictable trust signals:

- clear release notes
- an updated changelog
- a version tag people can reference
- a quick sanity check that docs still match reality

## Suggested release flow

1. **Confirm scope**
   - Decide what is shipping.
   - Note any user-visible behavior changes, security fixes, or deployment changes.

2. **Update docs**
   - Update `CHANGELOG.md` under a new version heading.
   - Update `README.md` if quickstart, screenshots, provider setup, or trust boundaries changed.
   - Update `SECURITY.md` if reporting guidance or deployment risk guidance changed.

3. **Sanity check the app**
   - Frontend still starts or builds.
   - Backend still starts.
   - Docker path still works if release notes mention Docker.
   - Demo/screenshot assets still reflect the current UI closely enough.

4. **Create the release commit**
   - Keep the commit focused.
   - Prefer a message like `docs: prepare release v0.2.0` or `release: v0.2.0`.

5. **Tag the release**
   ```bash
   git tag -a v0.2.0 -m "Release v0.2.0"
   git push origin main --tags
   ```

6. **Publish GitHub release notes**
   Include:
   - what changed for users
   - any security/privacy-relevant changes
   - any migration or configuration notes
   - known limitations if relevant

## Release note template

```md
## Info Security Analyzer v0.2.0

### Highlights
- Added ...
- Improved ...
- Fixed ...

### Security / privacy notes
- ...

### Self-hosting notes
- ...

### Known limitations
- This remains an assistive threat-modeling tool; human review is still required.
```

## Lightweight quality gate

Before tagging, verify at least these:

- [ ] `CHANGELOG.md` updated
- [ ] contributor/security docs still accurate
- [ ] no secrets or `.env` files staged
- [ ] release notes mention security/privacy-impacting changes
- [ ] tag name matches the release notes

## Versioning suggestion

If the project does not yet use strict semantic versioning, that is fine. Still prefer consistent tags such as:

- `v0.1.0`
- `v0.1.1`
- `v0.2.0`

Even lightweight version tags help users, issue reporters, and downstream packagers refer to a known state.
