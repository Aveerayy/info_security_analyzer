# Launch operator packet

The point of this file is simple: if one human needs to run **this week’s launch** for **Info Security Analyzer**, this is the only doc they should need open.

It consolidates the practical parts of the existing growth docs into one operator-ready packet:

- what must be true before launch
- what to publish and in what order
- which assets to capture
- the exact copy to keep handy
- how to log feedback and decide what to fix next

If anything in other growth docs conflicts with this file during launch week, treat **this packet as the working source of truth** and reconcile the others afterward.

---

## 0) Mission for this week

By the end of the week, the repo should have:

- a trustworthy landing surface
- 3 publish-safe screenshots
- a ready-to-post copy pack
- 1 soft launch in warm channels
- 1 public launch in one high-signal channel
- a simple feedback + metrics loop

**Success this week = clarity, proof, and useful feedback.**
Not volume. Not hype. Not posting everywhere.

---

## 1) Use this run order

Do the week in this order only:

1. **Repo surface audit**
   - README
   - demo path
   - trust/privacy wording
   - smoke test / sanity check
2. **Asset capture**
   - 3 screenshots minimum
   - optional short GIF
3. **Copy finalization**
   - one-line description
   - short blurb
   - Telegram
   - LinkedIn
   - HN or Reddit draft
4. **Soft launch**
   - Telegram and/or LinkedIn
5. **Fix repeated confusion fast**
   - README/docs/product wording within 24 hours where possible
6. **Public launch**
   - one high-signal channel only: Hacker News **or** Reddit
7. **End-of-week review**
   - metrics
   - objections
   - next fixes

Do **not** jump to broad public posting until steps 1-5 are done.

---

## 2) Hard go / no-go gate

Do **not** do the public launch until every box here is true.

### Product + docs

- [ ] README quickstart is accurate right now
- [ ] demo report works without credentials
- [ ] trust / privacy / limitations wording is visible and current
- [ ] smoke test or equivalent sanity check is green
- [ ] repo description and launch copy match actual behavior

### Assets

- [ ] 3 current screenshots exist
- [ ] all screenshots are redacted and safe to publish
- [ ] sample report or report screenshots are safe to share
- [ ] GIF is current if used, otherwise explicitly skipped

### Messaging

- [ ] one-line description finalized
- [ ] short launch blurb finalized
- [ ] Telegram draft finalized
- [ ] LinkedIn draft finalized
- [ ] HN or Reddit draft finalized
- [ ] reply template ready for common questions

### Ops

- [ ] target public channel chosen
- [ ] self-promo rules checked if using Reddit/community channels
- [ ] time is reserved to respond after posting
- [ ] one place exists to log feedback and metrics

If even one of these is false, stay in cleanup mode.

---

## 3) Single-page weekly plan

## Day 1 — repo and trust audit

**Goal:** remove launch blockers from the landing surface.

Checklist:

- [ ] verify README quickstart end to end
- [ ] verify demo path still works without API keys
- [ ] verify `SECURITY.md`, `CONTRIBUTING.md`, and README tell the same story
- [ ] list any blockers as P0 or P1
- [ ] decide whether asset capture is greenlit

**Done when:** a new visitor can answer what it does, how to try it, and what its limits are.

## Day 2 — asset capture

**Goal:** produce the minimum reusable proof pack.

Checklist:

- [ ] capture upload / landing screenshot
- [ ] capture report summary screenshot
- [ ] capture detailed findings screenshot
- [ ] optionally record 20-40 second GIF
- [ ] confirm every visual is redacted and current
- [ ] record final asset filenames below

Asset filenames:

- Screenshot 1: `________________`
- Screenshot 2: `________________`
- Screenshot 3: `________________`
- GIF or `skipped`: `________________`

**Done when:** repo + social posts no longer depend on placeholder visuals.

## Day 3 — copy pack + feedback setup

**Goal:** remove same-day writing pressure.

Checklist:

- [ ] finalize one-line description
- [ ] finalize short launch blurb
- [ ] finalize Telegram draft
- [ ] finalize LinkedIn draft
- [ ] finalize HN first comment or Reddit body
- [ ] set up one feedback log and one metrics log

**Done when:** launch posts can be published without rewriting from scratch.

## Day 4 — soft launch

**Goal:** collect warm feedback before broader exposure.

Checklist:

- [ ] publish Telegram and/or LinkedIn post
- [ ] ask for specific feedback: setup friction, weak findings, confusing trust language
- [ ] monitor replies for 24 hours
- [ ] log repeated objections in one place

**Done when:** there is a real first batch of reactions/questions.

## Day 5 — patch top objections

**Goal:** fix what soft launch exposed.

Checklist:

- [ ] update README/docs for repeated confusion
- [ ] tighten any misleading automation/trust wording
- [ ] improve demo/install wording if setup questions repeat
- [ ] refresh screenshots only if UI changed materially
- [ ] make explicit go / no-go decision for public launch

**Done when:** the top objections now have visible answers in the repo.

## Day 6 — public launch

**Goal:** publish in one high-signal public channel.

Checklist:

- [ ] choose **one only**: Hacker News or one good-fit Reddit community
- [ ] publish with plain, honest positioning
- [ ] post maintainer comment immediately if the channel supports it
- [ ] reply calmly and concretely
- [ ] avoid same-day cross-posting to multiple public channels

**Done when:** one serious public launch is live and actively handled.

## Day 7 — synthesize and extend

**Goal:** convert signal into next week’s plan.

Checklist:

- [ ] review stars, traffic, comments, issues, and setup questions
- [ ] group feedback into docs / UX / backend / messaging buckets
- [ ] identify good-first-issue candidates if appropriate
- [ ] update `CHANGELOG.md` if meaningful launch fixes landed
- [ ] decide whether next week is docs polish, product fixes, or wider amplification

**Done when:** next week is driven by evidence, not guesses.

---

## 4) Canonical message stack

Use these exact core ideas everywhere.

### One-line description

> **Info Security Analyzer turns architecture diagrams into draft STRIDE findings and exportable reports with AI assistance.**

### Short blurb

> Info Security Analyzer helps security teams turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports. It is designed to speed up first-pass review, not replace human judgment.

### Trust line

> Treat the output as **assistive draft generation for human review**, not automated security truth.

### Data-flow line

> Uploaded files are processed by the backend, and analysis content may be sent to the selected LLM provider.

### CTA

Ask for these specific things:

- setup friction
- weak or misleading findings
- confusing trust/privacy language
- whether the workflow feels realistic for actual review work

---

## 5) Copy to keep open during launch week

## Telegram soft-launch draft

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

## LinkedIn soft-launch draft

```md
I built **Info Security Analyzer**, an open source tool that helps turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports.

Why I made it: threat modeling is valuable, but a lot of teams skip the first pass because starting from a blank page is slow.

A few things I wanted to get right:
• a built-in demo report so people can inspect the UI before adding credentials
• support for multiple LLM providers
• explicit trust/privacy notes in the repo
• honest positioning: this is meant to accelerate human review, not replace security judgment

If you work in security engineering, AppSec, cloud architecture, or DevSecOps, I’d love practical feedback on:
• setup friction
• output quality
• where the trust/privacy language is still unclear

GitHub: https://github.com/Aveerayy/info_security_analyzer
```

## X / Bluesky optional amplification

```md
Open source launch: **Info Security Analyzer**

Turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports.

- demo report included
- multiple LLM providers supported
- built for human review, not blind trust

https://github.com/Aveerayy/info_security_analyzer
```

## Hacker News title

```text
Show HN: Info Security Analyzer — diagram-to-STRIDE threat modeling with demo mode
```

## Hacker News first comment

```md
Happy to answer questions.

A few quick notes up front:
- this is meant to accelerate the first draft of threat-model findings, not replace review
- uploaded diagrams and PDFs are processed by the backend and analysis content may be sent to the selected LLM provider
- there’s a built-in demo report so people can inspect the UI and output shape before supplying credentials
- the most useful feedback is where onboarding is confusing or where the findings are clearly off-base

If you try it, I’d especially like to hear whether the Docker/local quickstart and trust boundaries are clear enough for first-time evaluation.
```

## Reddit draft

```md
I’ve been working on **Info Security Analyzer**, an open source tool that turns architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports.

The problem I’m aiming at is simple: threat modeling is useful, but in a lot of teams the first pass gets skipped because it takes too long to go from blank page to something reviewable.

A few decisions I made deliberately:
- there’s a built-in demo report so people can inspect the UI before supplying credentials
- the repo is explicit that this is assistive tooling, not a replacement for security review
- uploaded content is processed by the backend and may be sent to the configured LLM provider during analysis

If you’re willing to take a look, the feedback I’d value most is:
- where setup is confusing
- where the findings are weak or misleading
- whether the trust/privacy language is clear enough

Repo: https://github.com/Aveerayy/info_security_analyzer
```

---

## 6) Channel rules

### Always do

- say **draft findings**
- say **human review is required**
- mention **demo-first evaluation**
- be explicit about **provider/data-flow behavior**
- ask for **practical feedback**

### Never do

- say “fully automated threat modeling”
- imply complete or authoritative coverage
- hide trust/privacy tradeoffs
- post vague “thoughts?” asks
- post multiple high-signal public channels the same day

### Channel order

Use this order unless there is a strong reason not to:

1. GitHub / repo surface ready
2. Telegram soft launch
3. LinkedIn soft launch
4. Fix confusion
5. Hacker News **or** Reddit
6. X / Bluesky only as follow-up amplification

---

## 7) Asset checklist

Use the built-in demo flow from `docs/demo-assets.md`.

### Minimum required asset set

- [ ] upload / landing view screenshot
- [ ] report summary screenshot
- [ ] detailed findings screenshot
- [ ] one publish-safe report screenshot or export proof

### Optional

- [ ] 20-40 second GIF of the demo flow

### Capture path

1. `npm install`
2. `npm run dev`
3. open `http://localhost:5173`
4. click **Load Demo Report**
5. capture the required views

### Best asset by channel

- **GitHub release / repo:** report summary screenshot
- **Telegram:** report summary screenshot
- **LinkedIn:** upload/demo screenshot or report summary screenshot
- **X / Bluesky:** strongest single screenshot only
- **HN / Reddit:** rely on the repo visuals unless inline media clearly helps

---

## 8) Feedback log template

Keep one table for the whole week.

| Date | Source | Persona | Stage | Feedback | Severity | Owner | Status | Link/notes |
|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Telegram / issue / DM | AppSec | setup | Docker step unclear | blocker | docs | new | link |

### Buckets to use

- Setup friction
- Demo mode confusion
- Trust / privacy / provider behavior
- Output quality / realism
- Positioning confusion
- Feature request

### Decision rules

**Fix immediately if:**
- the same confusion appears twice
- demo mode is unclear
- the repo overstates trust or capability
- setup friction blocks first use

**Queue, don’t rush, if:**
- it is a one-off feature request
- it needs significant code work during launch week
- it does not affect trust, onboarding, or evaluation

---

## 9) Metrics tracker to update once or twice per day

| Day | Date | Stars | Delta stars | Repo views | Unique visitors | Forks | Watchers | Issues / discussions | Meaningful feedback | Confirmed runs | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Day 0 baseline | YYYY-MM-DD |  | 0 |  |  |  |  |  |  |  | Capture before first post |
| Day 1 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 2 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 3 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 4 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 5 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 6 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 7 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |

### Count a run only when there is credible evidence

Examples:

- someone says demo mode worked
- someone reports a setup issue after trying install
- someone shares output or a screenshot
- a trusted usage counter already exists

---

## 10) Common reply templates

### Setup friction

> Thanks — that’s very useful. If you’re willing, can you share the exact step where things stopped feeling obvious? I’m trying to tighten the onboarding first, so that kind of detail helps a lot.

### Weak or off-base findings

> Appreciate the honesty. The tool is meant to speed up the first draft, not act as a final security judgment, so weak findings are important signal. If there’s a specific example you can safely summarize, I’d like to use that to improve either the prompts, docs, or how the limits are explained.

### Trust/privacy concern

> Fair question. The right mental model is: the backend processes the uploaded content, and depending on configuration, analysis data may be sent to the selected LLM provider. We should make that explicit in the repo, and if the wording still feels fuzzy I want to fix it.

### Full-automation assumption

> Totally fair concern. I’m trying to position it much more narrowly: useful draft STRIDE-oriented output to accelerate human review, not a replacement for threat-modeling expertise.

---

## 11) If only one person is available

Do the minimum viable launch stack:

1. polish README and trust wording
2. capture 3 screenshots
3. soft launch in Telegram or LinkedIn
4. fix top confusion points
5. launch in one public channel only
6. log metrics and feedback for 7 days

That is enough. Do not invent extra process.

---

## 12) Source docs behind this packet

This packet consolidates the practical parts of:

- `7-day-execution-plan.md`
- `channel-strategy.md`
- `messaging-and-assets.md`
- `launch-assets.md`
- `publish-this-week-packet.md`
- `weekly-execution-packet.md`
- `launch-week-metrics.md`
- `early-user-feedback-playbook.md`
- `posting-signals.md`
- `../demo-assets.md`

If launch week reveals a mismatch, update this packet first and clean up the supporting docs second.
