# Releasing Info Security Analyzer

Use this when you are preparing a GitHub release and want the shortest operator-ready path.

## 1) Preflight

- [ ] Decide the version/tag, for example `v0.1.0`
- [ ] Confirm what is actually shipping
- [ ] Note any user-visible changes, security/privacy changes, or deployment changes

## 2) Update the release surface

- [ ] Update `CHANGELOG.md` under the new version heading
- [ ] Update `README.md` if quickstart, screenshots, trust/privacy wording, or provider setup changed
- [ ] Update `SECURITY.md` if disclosure/reporting guidance changed
- [ ] Confirm demo/screenshot assets still reflect the current UI closely enough

## 3) Run the lightweight quality gate

- [ ] Frontend still starts or builds
- [ ] Backend still starts
- [ ] Docker path still works if the release mentions Docker
- [ ] No secrets or `.env` files are staged
- [ ] Release notes mention security/privacy-impacting changes when relevant

## 4) Prepare the release notes

Use this template:

```md
## Info Security Analyzer v0.1.0

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

Release notes should answer:

- what changed for users
- what changed for self-hosters
- whether trust/privacy behavior changed
- what limitations still matter

## 5) Create the release commit

- [ ] Keep the release commit focused
- [ ] Prefer a message like `docs: prepare release v0.1.0` or `release: v0.1.0`

## 6) Tag and publish

```bash
git tag -a v0.1.0 -m "Release v0.1.0"
git push origin main --tags
```

If you are publishing a GitHub Release from the UI, make sure:

- [ ] the tag matches the release title
- [ ] the notes match `CHANGELOG.md`
- [ ] the screenshot or asset used is current and safe to publish

## 7) Optional follow-on publish

If you are also announcing the release externally, use:

- `docs/growth/telegram-github-publish-checklist.md`

## Hard blockers

Do **not** publish the release if any of these are true:

- README is materially outdated
- demo path is broken or misleading
- screenshots are stale enough to confuse users
- trust/privacy wording is inaccurate
- secrets are staged

## Versioning suggestion

Strict semver is optional, but consistent tags help users and downstream references.

Examples:

- `v0.1.0`
- `v0.1.1`
- `v0.2.0`
