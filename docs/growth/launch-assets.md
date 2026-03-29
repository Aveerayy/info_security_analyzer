# Launch assets

Copy-paste-ready launch assets for **Info Security Analyzer**.

## 1) Short description

**Info Security Analyzer turns architecture diagrams into draft STRIDE findings and exportable reports with AI assistance.**

## 2) One-line tagline options

- AI-assisted STRIDE threat modeling from architecture diagrams
- Turn architecture diagrams into draft STRIDE findings faster
- Open source diagram-to-threat-model workflow for security teams

## 3) GitHub release notes blurb

**Info Security Analyzer** helps security teams turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports.

This release emphasizes a safer launch surface:

- built-in demo report for zero-key evaluation
- clearer trust and privacy language
- multi-provider support for Azure OpenAI, OpenAI, Anthropic, and Google Gemini
- explicit note that outputs are assistive and still require human review

If you try it, the most useful feedback is on setup friction, output quality, and any places where the docs feel unclear.

## 4) README intro refinement

Suggested replacement for the current first paragraph:

> Info Security Analyzer helps security engineers, architects, and developers turn uploaded diagrams and PDFs into structured STRIDE-oriented findings, risk summaries, and exportable reports. It is designed to speed up first-pass review, not replace human judgment.

## 5) LinkedIn launch post

I built **Info Security Analyzer**, an open source tool that helps turn architecture diagrams into draft STRIDE findings and risk summaries.

Why I made it: threat modeling is valuable, but a lot of teams skip it because the first draft takes too long to produce.

A few things I wanted to get right:
- demo mode so you can inspect the UI before adding credentials
- explicit trust/privacy notes in the repo
- positioning it as an assistant for human review, not a replacement for security judgment

If you work in security engineering, AppSec, cloud architecture, or DevSecOps, I’d love practical feedback on setup friction and output quality.

GitHub: `<repo-link>`

## 6) Telegram announcement

New OSS project: **Info Security Analyzer**

It turns architecture diagrams into draft STRIDE findings and report output. There’s also a demo mode, so you can try the UI without wiring up provider keys first.

If you test it, I’m especially interested in:
- where setup feels annoying
- where findings are obviously weak or misleading
- what would make this useful in a real review workflow

Repo: `<repo-link>`

## 7) X / Bluesky post

Open source launch: **Info Security Analyzer**

Turn architecture diagrams into draft STRIDE findings and exportable reports.

- demo mode included
- multiple LLM providers supported
- built for human review, not blind trust

Repo: `<repo-link>`

## 8) Hacker News / Show HN title options

- Show HN: Info Security Analyzer — diagram-to-STRIDE threat modeling with demo mode
- Show HN: Open source STRIDE threat modeling from architecture diagrams
- Show HN: Info Security Analyzer — AI-assisted threat modeling for architecture reviews

## 9) Hacker News first comment

Happy to answer questions.

A few quick notes:
- this is meant to accelerate the first draft of threat-model findings, not replace review
- uploaded content is processed by the backend and may be sent to the selected LLM provider
- there’s a built-in demo report so people can inspect the UI and output shape before supplying credentials
- the most useful feedback is where the onboarding is confusing or where the findings are clearly off-base

## 10) Outreach snippets

### For a security engineer

Hey — I’m sharing an open source tool that turns architecture diagrams into draft STRIDE findings and reports. It’s demo-first and explicitly framed as an assistant for human review. If you have 5 minutes, I’d love feedback on whether the setup and output feel realistic for a design review workflow.

### For an AppSec / DevSecOps peer

I put together an OSS diagram-to-threat-model workflow aimed at speeding up the first pass on architecture reviews. It supports a built-in demo report and multiple LLM providers. If you try it, I’d especially value feedback on trust language and whether the findings are useful as a starting point.

### For a maintainer / OSS contact

If you’re open to it, I’d value a quick look at Info Security Analyzer. It’s an open source STRIDE analysis tool for architecture diagrams, with demo mode and clear trust/privacy notes. I’m looking for feedback on positioning, docs clarity, and whether the launch surface feels honest.

## 11) Reply template for early feedback

Thanks — that’s helpful. The goal is to make the first draft of a threat model faster, not to claim complete coverage. If you notice any setup friction or a finding that feels off, I’d especially like to know which step caused it so I can tighten the docs or workflow.
