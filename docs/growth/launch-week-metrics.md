# Launch-week metrics tracker

A lightweight tracker for the first 7 days after launch.

Use this to answer a few practical questions without building a dashboard too early:

- Did awareness turn into repo trust signals?
- Which channels brought useful visitors, not just impressions?
- Are people successfully trying the product?
- What confusion or objections are repeating?
- What should change in docs, product, or messaging before week 2?

## Operating rules

- Keep it manual and lightweight for launch week.
- Update once or twice per day, not continuously.
- Prefer **directionally useful** numbers over perfect instrumentation.
- Capture both **volume** and **quality** of signal.
- Log the source and timestamp for anything you may need to verify later.

## Suggested daily check times

- **Morning:** stars, traffic, installs/runs, open feedback
- **Evening:** channel performance, notable comments, actions taken

## Where to pull data from

| Signal | Source | Notes |
|---|---|---|
| Stars / watchers / forks | GitHub repo Insights / repo header | Daily snapshots are enough |
| Traffic | GitHub Insights → Traffic | Capture views, unique visitors, top referrers |
| Installs / runs | Demo usage, local run confirmations, Docker pulls if available, comments/issues saying "got it working" | Early proxy metrics are fine |
| Feedback | GitHub issues/discussions, Telegram, LinkedIn, Hacker News, Reddit, DMs | Summarize patterns, don’t paste private content carelessly |
| Channel performance | Per-post reactions, comments, click-through proxies, referral traffic | Focus on useful conversations and referred visitors |

## Launch-week scoreboard

Fill one row per day. End-of-day is usually enough.

| Day | Date | Stars | Delta stars | Repo views | Unique visitors | Forks | Watchers | Issues / discussions opened | Meaningful feedback count | Confirmed installs / runs | Notes |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| Day 0 baseline | YYYY-MM-DD |  | 0 |  |  |  |  |  |  |  | Capture before first launch post |
| Day 1 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 2 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 3 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 4 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 5 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 6 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |
| Day 7 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |

## Traffic and referral tracker

Use this when launch traffic starts moving. One snapshot per day is enough.

| Date | Total views | Unique visitors | Top referrer 1 | Views | Top referrer 2 | Views | Top referrer 3 | Views | Notes |
|---|---:|---:|---|---:|---|---:|---|---:|---|
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |

### What good looks like

Early traffic is useful if at least one of these is true:

- visitors convert into stars at a healthy clip for a niche OSS tool
- one channel repeatedly appears in top referrers
- traffic coincides with issues, discussions, or comments showing real evaluation
- visitors keep arriving after the initial post spike

## Installs / runs tracker

For launch week, use **practical proxies** instead of overengineering telemetry.

Count a run only when there is some credible evidence, such as:

- someone says they got demo mode working
- someone reports a setup issue after attempting install
- someone shares output, screenshots, or findings
- maintainers can see a trusted usage counter already exists

| Date | Channel / source | Signal type | Count | Confidence | Notes |
|---|---|---|---:|---|---|
| YYYY-MM-DD | GitHub issue | Setup attempt | 1 | High | User hit Docker port conflict after running quickstart |
| YYYY-MM-DD | Telegram | Demo run confirmed | 1 | Medium | User said demo report loaded successfully |
| YYYY-MM-DD | Hacker News | Comment indicates evaluation | 1 | Medium | Mentioned trying sample diagram flow |

### Suggested signal types

- Demo run confirmed
- Local install confirmed
- Docker quickstart confirmed
- Setup attempt failed
- Report generated
- Repeat usage mention

## Feedback log

Capture the feedback that should change docs, onboarding, product, or messaging.

| Date | Source | Link / reference | Theme | Severity | Action owner | Action taken / next step |
|---|---|---|---|---|---|---|
| YYYY-MM-DD | GitHub issue | #123 | Quickstart confusion | High | Docs | Clarify Docker prerequisites in README |
| YYYY-MM-DD | LinkedIn comment | post link | Value prop unclear | Medium | Messaging | Rewrite first paragraph for non-experts |
| YYYY-MM-DD | Telegram | internal note | Trust/privacy question | High | Docs/Product | Add clearer data-flow FAQ |

### Recommended themes

- Quickstart friction
- Demo mode confusion
- Trust / privacy / provider behavior
- False confidence / over-automation concern
- Output quality / missed findings
- UI clarity
- Contributor interest
- Feature request

## Channel performance tracker

Track one row per meaningful post, thread, or community launch.

| Date | Channel | Post / thread | Goal | Reactions / upvotes | Comments / replies | Click / referral proxy | Quality of feedback | Follow-up needed |
|---|---|---|---|---:|---:|---|---|---|
| YYYY-MM-DD | LinkedIn | Launch post | Warm awareness + feedback |  |  | Referrer traffic / profile clicks | Low / Med / High |  |
| YYYY-MM-DD | Telegram | Soft launch | Early tester feedback |  |  | Replies / repo clicks | Low / Med / High |  |
| YYYY-MM-DD | Hacker News | Show HN | Public technical feedback |  |  | GitHub referrer spike | Low / Med / High |  |
| YYYY-MM-DD | Reddit | r/example | Setup and practitioner feedback |  |  | GitHub referrer spike | Low / Med / High |  |

### Channel quality rubric

Use this rough rubric to avoid overweighting vanity metrics.

- **High:** produced installs, actionable criticism, contributor interest, or strong trust signals
- **Medium:** produced relevant attention and a few useful questions
- **Low:** produced shallow engagement or low-fit traffic

## End-of-week synthesis

Complete this on day 7.

### 1) Top-line outcomes

- Stars added:
- Peak daily traffic:
- Confirmed installs / runs:
- Number of meaningful feedback items:
- Best-performing channel:
- Highest-quality feedback source:

### 2) What message worked

- Best hook:
- Best proof asset:
- Questions people understood immediately:
- Questions people repeatedly misunderstood:

### 3) What broke or created friction

- Top onboarding problem:
- Top trust/privacy concern:
- Top product confusion:
- Most common request:

### 4) What to change before week 2

- README change:
- Product change:
- Asset change:
- Channel strategy change:

### 5) Decision for next week

Choose one:

- Double down on the best-performing channel
- Improve onboarding before more promotion
- Ship a docs/product fix batch, then relaunch
- Start contributor-focused outreach

## Minimal interpretation guide

Do not overreact to a single spike. Look for combinations of signal:

- **Good sign:** stars up + traffic up + questions from real evaluators
- **Great sign:** one channel drives traffic and installs/runs, not just reactions
- **Warning sign:** traffic spikes but no stars, no feedback, and no run confirmations
- **Action sign:** the same confusion appears 2+ times, which means docs or copy should change

## Recommendation

Treat this file as the launch-week source of truth, then roll only the useful lessons into the longer-term plan in [`30-day-launch-plan.md`](./30-day-launch-plan.md).
