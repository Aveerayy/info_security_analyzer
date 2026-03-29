# Messaging and asset checklist

This document gives maintainers a repeatable message stack and the minimum asset pack needed for launch.

## Messaging pillars

## 1) Faster threat-model starting point

Threat modeling often stalls because the blank page is expensive. Info Security Analyzer helps teams start from an uploaded diagram and generate draft STRIDE findings faster.

## 2) Built for review, not blind trust

The tool is an assistant, not an authority. Findings should accelerate human review, not replace it.

## 3) Demo-first evaluation

People can explore the UI and output shape before wiring up API keys or production diagrams.

## 4) Practical, self-hostable workflow

The repo supports local development and Docker-based evaluation for teams that want control over their environment.

## Proof points to reuse

- analyzes architecture diagrams and PDFs
- generates STRIDE-oriented findings and summaries
- supports multiple LLM providers
- includes exportable reports
- includes a built-in demo report for zero-key evaluation
- documents trust, privacy, and limitations in the repo

## Objections to answer directly

### “Can I trust the findings?”

Use: **Treat outputs as draft findings for human review. The tool improves speed and structure, not certainty.**

### “Do I need to give you my provider credentials immediately?”

Use: **No. Demo mode lets you inspect the UI and report shape first.**

### “What happens to my architecture diagram?”

Use: **Be explicit: uploaded content is processed by the backend and may be sent to the configured LLM provider for analysis. Sensitive environments should start with sanitized diagrams.**

### “Is this just AI hype?”

Use: **Position the tool as workflow acceleration for a real security practice with clearly stated limits.**

---

## One-line messages

### Short tagline options

- AI-assisted STRIDE threat modeling from architecture diagrams
- Turn architecture diagrams into draft STRIDE findings faster
- Open source diagram-to-threat-model workflow for security teams

### Short repo description option

**Analyze architecture diagrams with AI-assisted STRIDE threat modeling and exportable reports.**

---

## Sample launch copy

## 1) GitHub / release blurb

Info Security Analyzer is an open source tool for turning architecture diagrams into draft STRIDE findings, risk summaries, and exportable reports. It supports multiple LLM providers and includes a built-in demo report so people can evaluate the workflow before supplying credentials. Human review is still required.

## 2) LinkedIn launch post

I built **Info Security Analyzer**, an open source tool that helps turn architecture diagrams into draft STRIDE findings and risk summaries.

The goal is simple: threat modeling is valuable, but a lot of teams skip it because starting from a blank page is slow.

A few things I wanted to get right:
- demo mode, so you can inspect the UI before adding credentials
- explicit trust/privacy notes in the repo
- positioning it as an assistant for human review, not a replacement for security judgment

If you do security reviews, cloud architecture, AppSec, or DevSecOps, I’d love honest feedback on setup friction and output quality.

GitHub: `<repo-link>`

## 3) Telegram announcement

New OSS project: **Info Security Analyzer**

It helps turn architecture diagrams into draft STRIDE findings and report output. There’s also a demo mode, so you can try the UI without wiring up provider keys first.

If you test it, I’m especially interested in:
- where setup feels annoying
- where findings are obviously weak or misleading
- what would make this useful in a real review workflow

Repo: `<repo-link>`

## 4) Hacker News first comment template

Happy to answer questions.

A few quick notes:
- this is meant to accelerate the first draft of threat-model findings, not replace review
- uploaded content is processed by the backend and may be sent to the selected LLM provider
- there’s a built-in demo report so people can inspect the UI/output shape before supplying credentials
- the most useful feedback is where the onboarding is confusing or where the findings are clearly off-base

---

## Asset checklist

## Minimum viable launch pack

- [ ] README screenshot or short GIF
- [ ] repo social preview image if desired
- [ ] 3 polished screenshots from demo mode
- [ ] one redacted sample exported report or report screenshots
- [ ] short launch blurb
- [ ] long technical launch post draft
- [ ] FAQ bullets for privacy, trust, and limitations

## Recommended screenshot set

Based on the current product flow:

1. **Landing / upload state**
   - hero area
   - demo-mode callout
2. **Report summary**
   - top risks
   - overall recommendations
3. **Detailed findings**
   - component or STRIDE finding cards
4. **Export/report evidence**
   - sample export view if present

## Nice-to-have assets

- 20–40 second GIF of demo flow
- architecture-to-report before/after image
- short comparison graphic: manual blank-page workflow vs assisted draft workflow
- maintainer headshot/logo for personal launch posts

---

## Content ideas for the next month

- “Why threat modeling gets skipped in real teams”
- “What AI can and cannot do in design review workflows”
- “How we built demo mode so people can evaluate the product before sharing data”
- “Common false assumptions when using LLMs for security analysis”
- “What early users found confusing in our first launch”

## Editorial guardrails

Keep every public artifact aligned with these rules:

- do not imply comprehensive security coverage
- do not claim lower risk without human validation
- do not hide provider/data-flow behavior
- do emphasize practical workflow improvement
- do show real product output
- do ask for specific feedback, not generic praise
