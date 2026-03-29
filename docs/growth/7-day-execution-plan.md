# 7-day launch execution plan

A concrete one-week plan to turn the broader launch strategy into visible output, feedback, and repo improvements.

## Outcome for this week

By the end of day 7, the project should have:

- a clean repo landing surface for first-time visitors
- a ready-to-post asset pack built from the current product state
- one soft-launch pass to warm channels
- one public launch on a higher-signal channel
- a simple system for capturing feedback and turning it into docs or product fixes
- a lightweight daily metrics tracker for stars, traffic, installs/runs, feedback, and channel performance

## Priority order

1. **Fix the landing surface first**
   - README, demo path, screenshots, and trust language must be solid before broader sharing.
2. **Create reusable launch assets once**
   - Avoid re-making screenshots and copy per channel.
3. **Soft launch before broad launch**
   - Use trusted channels to catch confusion before posting publicly.
4. **Launch in sequence, not all at once**
   - This keeps feedback manageable and makes it easier to learn what message works.
5. **Convert feedback into improvements within 24 hours**
   - Fast iteration matters more than posting volume.

## Owners

Use these owners as roles. One person can hold multiple roles if needed.

| Owner | Responsibility |
|---|---|
| Maintainer / founder | final approval, posting, replying publicly, deciding tradeoffs |
| Docs owner | README polish, launch copy, FAQ, channel copy, issue templates if needed |
| Asset owner | screenshots, GIFs, demo-report visuals, social preview image if used |
| Product owner | verifying demo flow, smoke test, fixing obvious onboarding friction |
| Community owner | posting schedule, comment triage, issue/discussion follow-up |

If only one person is available, do the work in this order:

1. Product owner
2. Docs owner
3. Asset owner
4. Community owner

## Required inputs before launch

These are the minimum inputs required to execute the plan safely.

### Product inputs

- current README and quickstart verified against reality
- smoke test or CI passing
- demo mode/report path confirmed working
- one known-good local run path: Docker or standard local dev

### Trust inputs

- clear statement that findings are draft outputs for human review
- clear statement about provider/data-flow behavior
- confirmation that screenshots/reports are redacted and safe to publish

### Asset inputs

- 3 polished screenshots from the current UI
- 1 short demo GIF or decision to skip it for now
- 1 reusable short description of the project
- 1 reusable longer launch paragraph

### Channel inputs

- GitHub repo URL
- target personal/company accounts or communities
- one selected public-launch channel for day 5 or day 6
- list of communities with self-promo rules checked before posting

## Publish sequence

Do not publish broadly until the previous stage is complete.

### Stage 0 — repo surface ready

**Goal:** make the repo trustworthy before driving traffic.

Publish blockers:

- README is accurate
- demo path is obvious
- screenshots are current
- privacy/trust language is explicit

### Stage 1 — soft launch

**Channels:** LinkedIn and/or Telegram

**Goal:** collect warm feedback and spot onboarding confusion before broader exposure.

Use soft launch to answer:

- Is the value proposition immediately clear?
- Do people understand demo mode?
- Do people misread this as “fully automated threat modeling”?
- Are there obvious setup questions to fix in docs first?

### Stage 2 — docs/product cleanup after soft launch

**Goal:** fold early objections into README and FAQs.

Only proceed when:

- the top 2-3 confusion points from soft launch are addressed
- asset captions and post copy still match repo reality

### Stage 3 — public launch

**Choose one primary public channel:**

- Hacker News if the repo/demo is polished and technical discussion is welcome
- Reddit if there is a good-fit community with clear self-promo allowance

**Goal:** maximize signal quality, not posting count. One strong post is better than three rushed ones.

### Stage 4 — follow-up amplification

**Channels:** X/Bluesky, additional niche communities, awesome lists, second LinkedIn update

**Goal:** reuse what worked after the public launch proves the message.

Only do this if:

- public launch feedback is being handled
- there is a stable landing surface
- there is enough maintainer capacity to respond

## Day-by-day plan

## Day 1 — repo and trust audit

**Primary objective:** remove launch blockers from the landing surface.

### Tasks

- verify README quickstart end-to-end
- verify demo mode/report path still works without credentials
- read `SECURITY.md`, `CONTRIBUTING.md`, and launch docs for message consistency
- identify any mismatch between current UI and documented screenshots/copy
- create a short list of repo blockers labeled P0/P1

### Outputs

- blocker list
- README/docs edits queued or completed
- go/no-go on asset capture

### Owner

- Product owner
- Docs owner

### Done when

- a new visitor can answer: what it does, how to try it, what its limits are

## Day 2 — asset capture

**Primary objective:** produce the minimum reusable asset pack.

### Tasks

- capture screenshot: landing/upload state
- capture screenshot: summary/results state
- capture screenshot: detailed findings/report state
- optionally record a 20-40 second GIF of demo flow
- confirm all published visuals are redacted and current
- store filenames/locations in the docs for reuse

### Outputs

- 3 screenshots minimum
- optional short GIF
- optional social preview image

### Owner

- Asset owner
- Product owner

### Done when

- there is enough visual proof to support repo, LinkedIn, Telegram, and one public launch post

## Day 3 — copy pack and launch issue triage setup

**Primary objective:** reduce decision fatigue before posting.

### Tasks

- finalize one-line description
- finalize short launch blurb
- finalize LinkedIn copy
- finalize Telegram copy
- finalize Hacker News first-comment template
- finalize peer/maintainer outreach templates and one follow-up template
- create a simple feedback capture section or issue label plan for launch-week feedback

### Outputs

- approved copy snippets
- posting checklist
- issue/feedback triage labels if needed

### Owner

- Docs owner
- Community owner

### Done when

- channel posts can be published without writing from scratch the same day

## Day 4 — soft launch

**Primary objective:** get warm feedback from trusted audiences.

### Tasks

- publish LinkedIn post and/or Telegram announcement
- ask for specific feedback: setup friction, weak findings, confusing language
- watch for repeated questions for 24 hours
- log feedback in a single place

### Outputs

- 1-2 soft-launch posts live
- first feedback batch collected

### Owner

- Maintainer / founder
- Community owner

### Done when

- at least a few real reactions or comments are collected and reviewed

## Day 5 — fix top objections

**Primary objective:** patch the obvious confusion before broader reach.

### Tasks

- update README or docs for repeated confusion points
- tighten any misleading language around automation or trust
- improve install/demo wording if setup questions repeat
- update screenshots only if the UI materially changed

### Outputs

- repo/docs improvements based on real feedback
- public launch still on track or delayed with explicit reason

### Owner

- Docs owner
- Product owner

### Done when

- the top objections from soft launch have a visible answer in the repo

## Day 6 — public launch

**Primary objective:** publish to one high-signal public channel.

### Tasks

- choose one: Hacker News or one strong Reddit community
- publish with a practical title and honest positioning
- post the maintainer comment immediately if the channel supports it
- monitor questions and respond with calm, concrete answers
- avoid cross-posting multiple public channels on the same day unless response load is low

### Outputs

- 1 primary public launch post
- comment/reply log if useful

### Owner

- Maintainer / founder
- Community owner

### Done when

- the project is publicly launched in one serious external channel and responses are handled

## Day 7 — synthesize and extend

**Primary objective:** turn launch-week feedback into next actions.

### Tasks

- review comments, issues, stars, and setup questions
- group feedback into docs, UX, backend, and messaging buckets
- create or refine `good first issue` candidates where appropriate
- update `CHANGELOG.md` if meaningful launch improvements landed
- decide whether to do follow-up amplification next week

### Outputs

- launch-week summary
- prioritized follow-up list
- next public post angle if warranted

### Owner

- Maintainer / founder
- Docs owner

### Done when

- week 2 work is informed by real signal, not guesses

## Minimal launch checklist

Use this as the hard gate before any public launch.

### Product and docs

- [ ] README quickstart is accurate
- [ ] demo mode/report path works without credentials
- [ ] smoke test or CI is green
- [ ] trust/privacy/limitations language is visible and current
- [ ] repo description and launch copy match current product behavior

### Assets

- [ ] 3 current screenshots exist
- [ ] screenshots are redacted and publish-safe
- [ ] optional GIF is current if used
- [ ] sample report or report screenshots are safe to share

### Messaging

- [ ] one-line project description finalized
- [ ] short launch blurb finalized
- [ ] LinkedIn/Telegram copy drafted
- [ ] public-launch post copy drafted
- [ ] maintainer response template ready for common questions

### Community ops

- [ ] target channel chosen for public launch
- [ ] self-promo/community rules checked
- [ ] issue/discussion path for feedback is obvious
- [ ] time is reserved to respond after posting

## Launch-week decision rules

### Delay launch if

- demo mode breaks
- README is misleading or materially outdated
- screenshots no longer reflect the current UI
- trust/privacy wording is still fuzzy
- there is no capacity to respond to launch-day questions

### Keep launch scope small if

- only one person is available
- assets are incomplete
- there are still onboarding rough edges

In that case, do this minimum set:

1. polish README
2. capture 3 screenshots
3. soft launch in Telegram or LinkedIn
4. fix the top confusion points
5. launch in one public channel only

## Signals to review after the week

Do not over-optimize metrics, but do capture enough signal to decide what to do next.

- stars during launch week
- comments or issues showing real setup/use interest
- repeated questions about trust, provider behavior, or demo mode
- contributor interest in docs/frontend/backend issues
- which channel brought the most useful feedback

## What success looks like

A good week is not “went viral.” A good week is:

- visitors quickly understand the product
- at least one external channel produces useful feedback
- objections are turned into repo improvements fast
- the project looks more trustworthy at the end of the week than at the start
