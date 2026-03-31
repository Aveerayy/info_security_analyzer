# Telegram + GitHub publish checklist

Use this when you are actually about to publish **Info Security Analyzer** and want the shortest safe path.

**Scope:** GitHub release surface + Telegram announcement only.

Canonical repo URL: `https://github.com/Aveerayy/info_security_analyzer`

---

## 0) Hard stop if any of these are false

- [ ] README quickstart still matches reality
- [ ] demo mode still works without credentials
- [ ] trust/privacy wording in README is still accurate
- [ ] at least 1 current publish-safe screenshot exists
- [ ] you have 20-30 minutes available to handle replies after posting

If any box is false, fix that first. Do not publish yet.

---

## 1) Prep the GitHub release surface

- [ ] `CHANGELOG.md` has the user-facing changes for this release
- [ ] `docs/RELEASING.md` checklist is satisfied
- [ ] choose 1 screenshot for the release page
  - preferred: report summary screenshot
- [ ] confirm the release title and version/tag
- [ ] keep this blurb ready:

> Info Security Analyzer helps security teams turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports. It is designed to speed up first-pass review, not replace human judgment.

---

## 2) Prep the Telegram post

### Required message points

- [ ] says **draft STRIDE findings**
- [ ] says **human review is still required**
- [ ] mentions **demo-first** evaluation
- [ ] links to the repo
- [ ] asks for concrete feedback: setup friction, weak findings, or unclear trust language

### Telegram draft

```md
New OSS project: **Info Security Analyzer**

It turns architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports.

A few things I wanted to get right before sharing it:
- built-in demo report so you can inspect the UI without wiring up API keys first
- support for multiple LLM providers
- explicit trust/privacy language in the repo
- clear positioning as an assistant for human review, not a replacement for it

If you try it, the most useful feedback is:
- where setup feels annoying
- where findings are obviously weak or misleading
- what would make this more useful in a real review workflow

Repo: https://github.com/Aveerayy/info_security_analyzer
```

### Telegram attachment

- [ ] attach 1 screenshot only
- [ ] preferred: report summary screenshot
- [ ] confirm the image contains no sensitive data

---

## 3) Publish order

Do these in order:

1. [ ] publish or update the GitHub release
2. [ ] verify the release page renders correctly
3. [ ] publish the Telegram post with the screenshot
4. [ ] stay available for replies

Do **not** post Telegram first if the GitHub release surface is still missing the final notes.

---

## 4) Immediate reply templates

### Setup friction

> Thanks — that’s useful. If you’re willing, can you share the exact step where setup stopped feeling obvious? I’m trying to tighten onboarding first.

### Weak findings

> Appreciate the honesty. The goal is to accelerate the first draft for human review, not claim complete coverage. If you can safely summarize the example, that would help improve the workflow and docs.

### Trust/privacy concern

> Fair question. The backend processes uploaded content, and analysis data may be sent to the selected LLM provider. If the repo wording still feels fuzzy, that’s something I want to tighten.

---

## 5) Log right after posting

Capture these before you forget:

- [ ] date/time posted
- [ ] release URL
- [ ] Telegram message link or chat reference
- [ ] starting GitHub stars
- [ ] any immediate questions/confusion

Recommended log locations:

- launch feedback: `docs/growth/launch-week-metrics.md`
- release history: `CHANGELOG.md`

---

## 6) Never say these

- [ ] “fully automated threat modeling”
- [ ] “complete security coverage”
- [ ] anything implying the tool replaces human review

Keep the claim narrow and honest.

---

## Source docs behind this checklist

This is the short execution layer for:

- `launch-operator-packet.md`
- `publish-this-week-packet.md`
- `messaging-and-assets.md`
- `launch-assets.md`
- `../RELEASING.md`
