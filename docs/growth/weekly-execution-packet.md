# Weekly execution packet

A single operator-ready packet for this week’s launch work.

> Note: `launch-operator-packet.md` is now the canonical launch-week packet. This file remains as supporting material.

Use this as the day-to-day working document. It condenses the repo’s existing launch materials into one practical checklist covering:

- the 7-day plan
- the minimum asset pack
- the publish sequence
- channel-specific posting order
- posting guardrails and approval rules

Source docs:

- [`7-day-execution-plan.md`](./7-day-execution-plan.md)
- [`channel-strategy.md`](./channel-strategy.md)
- [`launch-assets.md`](./launch-assets.md)
- [`posting-signals.md`](./posting-signals.md)
- [`../demo-assets.md`](../demo-assets.md)

---

## 1) This week’s outcome

By end of week, the repo should have:

- a trustworthy landing surface
- 3 current publish-safe screenshots
- a ready-to-post copy pack
- 1 soft launch in warm channels
- 1 public launch in one high-signal channel
- a simple feedback log and follow-up list

Success this week is **clarity + useful feedback**, not volume.

---

## 2) Hard launch gate

Do **not** do the public launch until all of these are true:

### Product + docs

- [ ] README quickstart is accurate
- [ ] demo mode / demo report works without credentials
- [ ] smoke test or CI is green
- [ ] trust / privacy / limitations wording is visible and current
- [ ] repo description and launch copy match current behavior

### Assets

- [ ] 3 current screenshots exist
- [ ] screenshots are redacted and safe to publish
- [ ] sample report or report screenshots are safe to share
- [ ] GIF is current if used, otherwise explicitly skipped

### Messaging

- [ ] one-line description finalized
- [ ] short launch blurb finalized
- [ ] LinkedIn copy finalized
- [ ] Telegram copy finalized
- [ ] public-launch copy finalized
- [ ] reply template ready for common questions

### Ops

- [ ] target public channel chosen: Hacker News or one Reddit community
- [ ] self-promo rules checked for the target community
- [ ] feedback capture path is ready
- [ ] response time is blocked after posting

If any item above is false, stay in cleanup mode.

---

## 3) Operator run order

Follow this order. Do not skip ahead.

1. **Fix landing surface first**
   - README, demo path, screenshots, trust language
2. **Create reusable assets once**
   - avoid redoing screenshots/copy per channel
3. **Soft launch**
   - LinkedIn and/or Telegram
4. **Patch confusion fast**
   - update README/docs within 24 hours where possible
5. **Public launch**
   - one serious public channel only
6. **Synthesize feedback**
   - convert signal into docs, UX, backend, and messaging follow-ups

---

## 4) Asset pack for this week

Use the smallest asset pack that still proves the product.

### Required assets

- [ ] **Upload view screenshot**
  - show header + demo-mode banner
- [ ] **Full report screenshot**
  - summary page with top risks / next steps
- [ ] **Component detail screenshot**
  - lower report area with STRIDE/component findings

### Optional asset

- [ ] **20–40 second GIF** of the demo flow
  - only if current and easy to maintain

### Fastest capture path

1. `npm install`
2. `npm run dev`
3. open `http://localhost:5173`
4. click **Load Demo Report**
5. capture the 3 recommended views from [`../demo-assets.md`](../demo-assets.md)

### Asset storage / references

- Placeholder asset currently available: `docs/assets/demo-report-placeholder.svg`
- Replace with real screenshots when ready and record final filenames here:
  - [ ] screenshot 1 path: `________________`
  - [ ] screenshot 2 path: `________________`
  - [ ] screenshot 3 path: `________________`
  - [ ] GIF path or `skipped`: `________________`

---

## 5) Copy pack to keep handy

### Core one-line description

> **Info Security Analyzer turns architecture diagrams into draft STRIDE findings and exportable reports with AI assistance.**

### Short launch blurb

> Info Security Analyzer helps security teams turn architecture diagrams and PDFs into draft STRIDE findings, risk summaries, and exportable reports. It is designed to speed up first-pass review, not replace human judgment.

### Core trust line

> Position it as **assistive draft generation for human review**, not automated security truth.

### CTA

Ask for:

- setup friction
- weak or misleading findings
- confusing trust/privacy language
- whether the workflow feels realistic for actual review work

Canonical copy source: [`launch-assets.md`](./launch-assets.md)

---

## 6) Channel sequence for this week

### Stage 0 — repo surface ready

**Goal:** make the repo trustworthy before driving traffic.

Blockers:

- README inaccurate
- demo path unclear or broken
- screenshots outdated
- privacy / limitation language fuzzy

### Stage 1 — soft launch

**Channels:** LinkedIn and/or Telegram

**Goal:** warm feedback before broad exposure.

Ask specifically:

- Is the value prop clear?
- Does demo mode make evaluation easy?
- Does anyone misread this as fully automated threat modeling?
- What setup step feels annoying?

### Stage 2 — cleanup after soft launch

Only continue when:

- top 2–3 confusion points are fixed or clearly documented
- screenshots and copy still match the repo

### Stage 3 — public launch

**Choose one only:**

- **Hacker News** if the repo/demo is polished and technical discussion is welcome
- **Reddit** if there is a good-fit community with explicit self-promo allowance

### Stage 4 — optional follow-up amplification

Only after the public launch is stable:

- X / Bluesky
- niche communities
- awesome lists / directories
- second LinkedIn update

Do not amplify if response load is already high.

---

## 7) Day-by-day operator checklist

## Day 1 — repo and trust audit

- [ ] verify README quickstart end to end
- [ ] verify demo report path still works without credentials
- [ ] verify `SECURITY.md`, `CONTRIBUTING.md`, and launch docs say consistent things
- [ ] list blockers as P0 / P1
- [ ] decide go / no-go for asset capture

**Done when:** a new visitor can quickly answer what it does, how to try it, and what its limits are.

## Day 2 — asset capture

- [ ] capture upload view screenshot
- [ ] capture report summary screenshot
- [ ] capture component/finding detail screenshot
- [ ] optionally record short GIF
- [ ] confirm all visuals are redacted and current
- [ ] record final filenames in this packet

**Done when:** there is enough visual proof for repo + soft launch + one public launch post.

## Day 3 — copy pack + feedback setup

- [ ] finalize one-line description
- [ ] finalize short launch blurb
- [ ] finalize LinkedIn copy
- [ ] finalize Telegram copy
- [ ] finalize HN first-comment template or Reddit supporting text
- [ ] decide feedback capture path
  - issue label, notes file, or simple launch-week log

**Done when:** no channel requires same-day rewriting from scratch.

## Day 4 — soft launch

- [ ] publish LinkedIn post and/or Telegram announcement
- [ ] ask for concrete feedback, not generic engagement
- [ ] monitor repeated questions for 24 hours
- [ ] log feedback in one place

**Done when:** a first batch of real reactions/questions exists.

## Day 5 — patch top objections

- [ ] update README/docs for repeated confusion
- [ ] tighten any misleading automation/trust wording
- [ ] improve install/demo wording if setup questions repeat
- [ ] refresh screenshots only if the UI changed materially
- [ ] decide whether public launch stays on track

**Done when:** top objections have visible answers in the repo.

## Day 6 — public launch

- [ ] pick one primary public channel only
- [ ] publish with clear, honest positioning
- [ ] post maintainer comment immediately if the channel supports it
- [ ] monitor replies and answer calmly, concretely, and without hype
- [ ] avoid same-day cross-posting to multiple public channels

**Done when:** one serious public launch is live and handled.

## Day 7 — synthesize and extend

- [ ] review comments, issues, stars, and setup questions
- [ ] bucket feedback into docs / UX / backend / messaging
- [ ] identify `good first issue` candidates if appropriate
- [ ] update `CHANGELOG.md` if meaningful improvements landed
- [ ] decide whether to do follow-up amplification next week

**Done when:** next week is driven by signal, not guesswork.

---

## 8) Posting rules and guardrails

### Positioning rules

Always:

- say **draft findings**
- show or mention **demo mode** where relevant
- acknowledge **limitations** and the **human-review requirement**
- ask for **practical feedback**

Avoid:

- “fully automated threat modeling”
- claims of comprehensive coverage
- broad AI hype framing
- vague asks like “thoughts?” with no test prompt

### Draft-generation rules

Allowed events may create drafts only.

- **No automatic publishing**
- **Human approval is always required**

### Hard blockers for drafting or posting

Do not create or publish a draft when:

- `do-not-amplify` is present
- screenshots/assets are not redacted or current
- README/demo path is materially broken
- the post would force unsupported claims
- content depends on unverified third-party feedback

### Channel defaults

- **Release:** Telegram, LinkedIn
- **Meaningful user-facing PR:** Telegram
- **Docs/trust improvement:** Telegram, LinkedIn optional
- **Asset/demo refresh:** Telegram, X/Bluesky optional

If there is doubt, downgrade to **internal only** or **Telegram approval only**.

---

## 9) Channel notes at posting time

### LinkedIn

Use for:

- soft launch
- credibility with security/AppSec/devsecops peers

Checklist:

- [ ] practical tone, not hype
- [ ] explain who it is for
- [ ] mention trust/privacy choices
- [ ] ask for setup/output feedback
- [ ] link back to repo

### Telegram

Use for:

- warm feedback
- release/update announcement
- recruiting a few testers

Checklist:

- [ ] informal and concrete
- [ ] give people one thing to try
- [ ] ask 2–3 specific questions
- [ ] avoid dumping every minor update

### Hacker News

Use only if:

- README is strong
- demo path is easy
- assets are ready
- maintainer can answer skeptical technical questions

Checklist:

- [ ] plain title
- [ ] honest positioning
- [ ] maintainer first comment ready
- [ ] privacy boundary explained
- [ ] no defensiveness in replies

### Reddit

Use only if:

- the subreddit clearly allows self-promo or OSS tool sharing
- the post leads with workflow value, not “please star this”

Checklist:

- [ ] rules checked first
- [ ] problem/workflow led
- [ ] limitations upfront
- [ ] only one strong community that day

---

## 10) Response handling rules

After posting:

- reserve time to reply the same day
- answer skeptical questions with specifics
- log repeated objections
- turn repeated objections into repo fixes quickly
- do not argue people into liking it

Use this reply shape:

1. acknowledge the feedback
2. restate the intended scope
3. point to the relevant doc/demo path if helpful
4. invite one concrete next piece of feedback

Reference reply template: [`launch-assets.md`](./launch-assets.md)

---

## 11) End-of-week review

Capture these signals:

- stars during launch week
- comments/issues showing real evaluation or install interest
- repeated trust/provider/demo-mode questions
- contributor interest in docs/frontend/backend work
- which channel produced the most useful feedback

A good week means:

- visitors understand the repo faster
- at least one external channel produced useful signal
- objections became docs/product improvements quickly
- the repo looks more trustworthy at week’s end than at week’s start
