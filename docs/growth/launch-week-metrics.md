# Launch-week daily review template

A practical operating sheet for the first 7 days after launch.

Use this file once or twice per day to answer the only questions that matter during launch week:

- Are people arriving?
- Are the right people understanding the project?
- Are they getting to first value?
- What confusion is repeating?
- What should change today before more outreach?

The goal is not perfect analytics. The goal is a calm daily review loop that turns signal into the next action.

## How to use this file

- Keep it manual for launch week.
- Update it in **two passes max**: morning and evening.
- Prefer **credible proxies** over invented precision.
- Capture both **what happened** and **what you did about it**.
- If the same confusion appears twice, create a docs/product action the same day.

## Review cadence

### Morning review (10-15 min)

Use this to answer: **did yesterday's attention convert into trust or usage?**

Check:
- GitHub stars / watchers / forks
- GitHub traffic and top referrers
- new issues / discussions / comments
- confirmed installs, demo runs, or setup failures
- anything overnight that could damage trust if left unanswered

### Evening review (15-20 min)

Use this to answer: **what changed today, and what should happen tomorrow?**

Check:
- performance of today's posts or threads
- repeated questions or objections
- which channel produced useful feedback vs shallow attention
- what got fixed today in docs/product/messaging
- whether tomorrow should be more outreach or more cleanup

## Where to pull data from

| Signal | Source | What to capture |
|---|---|---|
| Stars / watchers / forks | GitHub repo header / Insights | Daily snapshot and delta |
| Traffic | GitHub Insights → Traffic | Views, unique visitors, top referrers |
| Installs / runs | Demo confirmations, issues, comments, DMs, Docker pull data if available | Only count when there is credible evidence |
| Feedback | GitHub issues/discussions, Telegram, LinkedIn, Hacker News, Reddit, DMs | Theme, severity, and next action |
| Channel performance | Post reactions, replies, referral traffic, profile/repo clicks | Focus on quality of response, not vanity metrics |

## Launch-week operating rules

Use these as simple decision rules during review:

- **Traffic up, stars flat, no questions:** landing page or value prop likely weak → tighten README intro and post copy.
- **Traffic up, stars up, useful comments:** keep channel/message working → reply quickly and reuse the same proof asset.
- **Multiple setup blockers:** pause broader promotion → fix quickstart or demo instructions first.
- **Repeated trust/privacy confusion:** update README/FAQ before next post.
- **One channel sends low-fit traffic only:** reduce effort there and reallocate to the channel producing serious evaluators.
- **Confirmed runs are happening but questions repeat:** docs likely missing one key step → patch docs before adding features.

## Daily review template

Copy one section per day during launch week.

```md
## Day X — YYYY-MM-DD

### 1) Snapshot
- Stars: X (delta: +Y)
- Watchers: X (delta: +Y)
- Forks: X (delta: +Y)
- Repo views: X
- Unique visitors: X
- Confirmed installs / runs: X
- Setup failures reported: X
- Meaningful feedback items: X

### 2) Channel readout
| Channel | What happened | Traffic / click proxy | Feedback quality | Verdict |
|---|---|---:|---|---|
| LinkedIn |  |  | Low / Med / High | Keep / Adjust / Pause |
| Telegram |  |  | Low / Med / High | Keep / Adjust / Pause |
| Hacker News / Reddit |  |  | Low / Med / High | Keep / Adjust / Pause |

### 3) Repeated signals
| Theme | Evidence count | Severity | What it likely means |
|---|---:|---|---|
| Quickstart friction |  | High / Med / Low |  |
| Trust/privacy confusion |  | High / Med / Low |  |
| Demo/output confusion |  | High / Med / Low |  |
| Positioning/value prop confusion |  | High / Med / Low |  |
| Contributor interest / feature asks |  | High / Med / Low |  |

### 4) Actions taken today
- Docs:
- Product:
- Messaging/assets:
- Community replies / follow-up:

### 5) Next actions for tomorrow
- [ ]
- [ ]
- [ ]

### 6) Launch decision
Choose one:
- Double down on outreach
- Keep outreach steady and fix docs in parallel
- Pause new promotion and resolve onboarding/trust issues

Reason:
```

## Daily scorecard table

Use this as the quick at-a-glance weekly rollup.

| Day | Date | Stars | Delta stars | Repo views | Unique visitors | Forks | Watchers | Meaningful feedback | Confirmed installs / runs | Setup failures | Best channel | Main issue to fix next |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Day 0 baseline | YYYY-MM-DD |  | 0 |  |  |  |  |  |  |  |  | Capture before first launch post |
| Day 1 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 2 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 3 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 4 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 5 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 6 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |
| Day 7 | YYYY-MM-DD |  |  |  |  |  |  |  |  |  |  |  |

## Signal-to-action matrix

This is the most important part of the file: turn observed signal into a default next move.

| Signal observed in review | Likely interpretation | Default next action |
|---|---|---|
| Lots of views, weak stars, few comments | Visitors are landing but not trusting or understanding it | Rewrite README opening, tighten launch copy, improve top screenshot |
| Good stars from one channel, weak feedback elsewhere | One channel has audience fit | Reuse that hook there, reduce time spent on low-fit channels |
| Comments ask "is this fully automated threat modeling?" | Positioning is too broad or too hypey | Narrow claims in README, FAQ, and launch posts the same day |
| People ask what data is sent to the provider | Trust boundary is unclear | Add explicit data-flow wording and link it in replies |
| Users report Docker/setup trouble | Onboarding is blocking evaluation | Patch quickstart, prerequisites, or demo path before more promotion |
| People like the idea but do not try it | Friction to first value is still too high | Make demo path more obvious and shorten first-run instructions |
| Weak or generic findings feedback | Product claims are outrunning current output quality | Narrow messaging and collect reproducible examples before changing prompts |
| Multiple feature requests, little real usage | Attention is broad but shallow | Do not chase roadmap; focus on activation blockers |
| One thoughtful peer offers strong critique | High-value signal | Respond quickly, log it, and convert it into a visible repo improvement |
| Feedback themes disappear after docs update | Fix worked | Resume or increase promotion carefully |

## Traffic and referral log

One snapshot per day is enough.

| Date | Total views | Unique visitors | Top referrer 1 | Views | Top referrer 2 | Views | Top referrer 3 | Views | What to do with this |
|---|---:|---:|---|---:|---|---:|---|---:|---|
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |
| YYYY-MM-DD |  |  |  |  |  |  |  |  |  |

## Installs / runs evidence log

Count a run only when there is credible evidence.

Examples of acceptable evidence:
- someone says they got demo mode working
- someone reports a setup issue after trying to install
- someone shares a screenshot, output, or findings
- maintainers see a trusted usage counter already exists

| Date | Channel / source | Signal type | Count | Confidence | Action needed | Notes |
|---|---|---|---:|---|---|---|
| YYYY-MM-DD | GitHub issue | Setup attempt failed | 1 | High | Fix Docker prerequisite docs | User hit port conflict |
| YYYY-MM-DD | Telegram | Demo run confirmed | 1 | Medium | Ask what felt smooth/unclear | User saw demo report load |
| YYYY-MM-DD | Hacker News | Evaluation mention | 1 | Medium | Watch for repeat question | Mentioned trying sample diagram flow |

### Suggested signal types

- Demo run confirmed
- Local install confirmed
- Docker quickstart confirmed
- Setup attempt failed
- Report generated
- Repeat usage mention

## Feedback review log

Capture feedback in a way that leads directly to action.

| Date | Source | Persona | Theme | Severity | Summary | Owner | Status | Next action |
|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | GitHub issue | Security engineer | Quickstart friction | High | Docker prerequisite unclear | Docs | New | Clarify README prerequisites |
| YYYY-MM-DD | LinkedIn comment | AppSec lead | Positioning confusion | Medium | Thought it replaced threat modeling | Messaging | Fixed | Narrow first paragraph + FAQ |
| YYYY-MM-DD | Telegram | Builder | Trust/privacy | High | Asked what reaches provider | Docs/Product | In progress | Add explicit data-flow section |

## Channel review log

Track one row per meaningful post, thread, or community launch.

| Date | Channel | Post / thread | Goal | Reactions / upvotes | Replies | Referral proxy | Quality of feedback | Best follow-up action |
|---|---|---|---|---:|---:|---|---|---|
| YYYY-MM-DD | LinkedIn | Launch post | Warm awareness + feedback |  |  | Referrer traffic / profile clicks | Low / Med / High |  |
| YYYY-MM-DD | Telegram | Soft launch | Early tester feedback |  |  | Replies / repo clicks | Low / Med / High |  |
| YYYY-MM-DD | Hacker News | Show HN | Public technical feedback |  |  | GitHub referrer spike | Low / Med / High |  |
| YYYY-MM-DD | Reddit | r/example | Setup and practitioner feedback |  |  | GitHub referrer spike | Low / Med / High |  |

## End-of-week synthesis

Complete this on day 7.

### 1) Top-line outcomes
- Stars added:
- Peak daily traffic:
- Confirmed installs / runs:
- Meaningful feedback items:
- Best-performing channel:
- Highest-quality feedback source:

### 2) What message worked
- Best hook:
- Best proof asset:
- Question people understood immediately:
- Question people repeatedly misunderstood:

### 3) What created friction
- Top onboarding problem:
- Top trust/privacy concern:
- Top product/output concern:
- Most common request:

### 4) What changed during launch week
- README/docs fixes shipped:
- Product/onboarding fixes shipped:
- Messaging changes shipped:
- Channel strategy changes made:

### 5) Decision for week 2
Choose one:
- Double down on the best-performing channel
- Improve onboarding before more promotion
- Ship a docs/product fix batch, then relaunch
- Start contributor-focused outreach

## Minimal interpretation guide

Avoid reacting to a single spike. Look for combinations:

- **Good sign:** stars up + traffic up + questions from real evaluators
- **Great sign:** one channel drives traffic and confirmed runs, not just reactions
- **Warning sign:** traffic spikes but no stars, no feedback, and no run confirmations
- **Action sign:** the same confusion appears 2+ times, so docs/copy/product should change now

## Recommendation

Treat this file as the launch-week operating source of truth, then roll the useful lessons into [`30-day-launch-plan.md`](./30-day-launch-plan.md).
