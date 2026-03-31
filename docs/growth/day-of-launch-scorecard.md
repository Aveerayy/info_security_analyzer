# Day-of-launch scorecard

A minimal, operator-friendly scorecard for **launch day only**.

This file is distilled from:

- [`launch-operator-packet.md`](./launch-operator-packet.md)
- [`launch-week-metrics.md`](./launch-week-metrics.md)
- [`7-day-execution-plan.md`](./7-day-execution-plan.md)

Use it when you want the fewest moving parts possible on launch day:

1. confirm the repo is safe to drive traffic to
2. capture a baseline before posting
3. log launch-day signal without pretending you have perfect analytics
4. decide whether to keep pushing, fix docs, or pause promotion

---

## Launch-day go / no-go

Do **not** post publicly until every box below is true.

### Product + trust

- [ ] README quickstart is accurate right now
- [ ] demo report works without credentials
- [ ] trust / privacy / limitations wording is visible and current
- [ ] smoke test or equivalent sanity check is green
- [ ] repo description and launch copy match actual behavior

### Assets + messaging

- [ ] at least 3 current screenshots exist
- [ ] screenshots are redacted and publish-safe
- [ ] one-line description is finalized
- [ ] launch blurb is finalized
- [ ] public post draft is finalized
- [ ] reply template is ready for setup, trust, and output-quality questions

### Ops

- [ ] target public channel is chosen
- [ ] self-promo rules were checked if using a community channel
- [ ] time is reserved to reply after posting
- [ ] one place exists to log feedback and metrics

If any item is false, stay in cleanup mode.

---

## Baseline snapshot — fill before the first launch post

| Metric | Baseline |
|---|---:|
| Date | YYYY-MM-DD |
| Time | HH:MM local |
| Stars |  |
| Watchers |  |
| Forks |  |
| Repo views |  |
| Unique visitors |  |
| Open issues / discussions needing response |  |
| Confirmed installs / runs |  |
| Known setup blockers not yet fixed |  |

### Launch target for today

- Primary channel: 
- Post / thread link: 
- Goal for today: 

---

## Launch-day scorecard

Update this only a few times: **before posting**, **~2 hours after posting**, and **end of day**.

| Checkpoint | Time | Stars | Delta stars | Views | Unique visitors | Watchers | Forks | Meaningful feedback | Confirmed runs | Setup failures | Best channel / referrer | Verdict |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---|
| Baseline |  |  | 0 |  |  |  |  |  |  |  |  | Ready / Not ready |
| +2h |  |  |  |  |  |  |  |  |  |  |  | Keep / Adjust / Pause |
| End of day |  |  |  |  |  |  |  |  |  |  |  | Keep / Adjust / Pause |

---

## What counts as real signal

Count a run only when there is **credible evidence**.

Acceptable examples:

- someone says demo mode worked
- someone reports a setup issue after trying to install
- someone shares a screenshot, report, or findings
- a trusted usage counter already exists

### Meaningful feedback means

Count feedback when it helps you improve:

- setup friction
- trust / privacy confusion
- output quality concerns
- positioning confusion
- realistic contributor interest

Do **not** overweight vanity reactions alone.

---

## Fast feedback log

Capture only launch-day items that might change what you do next.

| Time | Source | Theme | Severity | Summary | Action |
|---|---|---|---|---|---|
| HH:MM | GitHub / Telegram / LinkedIn / HN / Reddit | Setup / Trust / Output / Positioning / Feature request | High / Med / Low |  |  |
| HH:MM |  |  |  |  |  |
| HH:MM |  |  |  |  |  |

---

## Launch-day decision rules

Use these defaults instead of improvising.

### Keep pushing if

- traffic is up
- stars are moving
- feedback is coming from real evaluators
- no serious setup or trust blocker is repeating

### Adjust same day if

- traffic is up but stars are flat
- people do not understand what the project does
- people assume it is fully automated threat modeling
- people ask what data goes to the LLM provider

Default action:

- tighten README opening
- narrow launch copy
- make the trust boundary more explicit
- reuse the strongest proof screenshot

### Pause new promotion if

- multiple setup failures appear
- demo mode is broken or unclear
- trust/privacy confusion repeats more than once
- the repo or post copy overstates what the product does

Default action:

- fix docs/product wording first
- reply to existing comments calmly
- resume promotion only after the answer is visible in the repo

---

## End-of-day review

### Top-line readout

- Total stars added:
- Best referrer / channel:
- Confirmed runs:
- Setup failures:
- Most useful feedback theme:
- Main issue to fix before more outreach:

### Actions completed today

- Docs:
- Product:
- Messaging:
- Community replies:

### Tomorrow’s decision

Choose one:

- [ ] Double down on outreach
- [ ] Keep outreach steady and fix docs in parallel
- [ ] Pause new promotion and resolve onboarding / trust issues

Reason:

---

## Minimal interpretation guide

- **Good sign:** traffic up + stars up + practical questions from likely users
- **Warning sign:** traffic spike + weak stars + no confirmed runs
- **Action sign:** the same confusion appears 2+ times
- **Best outcome for day 1:** at least one channel produces useful feedback and the repo looks more trustworthy by the end of the day than at the start
