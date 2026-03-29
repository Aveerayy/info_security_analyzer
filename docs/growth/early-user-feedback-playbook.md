# Early-user feedback playbook

A lightweight process for handling launch-week feedback without losing signal or drowning in noise.

Use this during:
- soft launch replies
- Telegram / LinkedIn comments
- GitHub issues or discussions from first-time users
- direct messages from peers or maintainers

Goal: turn early reactions into **repo improvements, clearer messaging, and a tighter product surface within 24 hours where possible**.

---

## Core rule

Treat early feedback as product input, not as a debate to win.

Especially for this project, a confused reaction often means one of these is true:
- the README is burying the value
- the trust/privacy language is too vague
- the demo path is not obvious enough
- the output quality is weaker than the message implies
- the user expected full automation rather than assisted review

If multiple people stumble the same way, fix the repo before posting more.

---

## What to capture from every useful reply

For each piece of feedback, record:
- **source** — where it came from
- **persona** — security engineer, AppSec, maintainer, general builder, etc.
- **stage** — landing page, setup, demo, findings quality, export/report, trust/privacy
- **quote or summary** — what they actually said
- **severity** — blocker, friction, nit, idea
- **action owner** — docs, product, backend, frontend, outreach
- **status** — new, in progress, fixed, answered, declined

A simple markdown table is enough.

---

## Suggested launch-week triage table

| Date | Source | Persona | Stage | Feedback | Severity | Owner | Status | Link/notes |
|---|---|---|---|---|---|---|---|---|
| YYYY-MM-DD | Telegram / issue / DM | AppSec | setup | Docker step unclear | blocker | docs | new | link |

Store this wherever the maintainer will actually review it. A markdown note in `docs/growth/` or a GitHub issue is fine.

---

## Feedback buckets to use this week

### 1) Setup friction

Examples:
- install path is confusing
- Docker flow did not work as expected
- env vars or provider setup are unclear
- user cannot tell how to run demo mode

Default action:
- fix README or quickstart first
- only treat as code work if docs cannot reasonably solve it

### 2) Trust / privacy confusion

Examples:
- user does not understand what gets sent to an LLM provider
- user assumes uploaded diagrams stay fully local when that may not be true
- user thinks outputs are more authoritative than intended

Default action:
- tighten wording immediately
- prefer explicit and slightly repetitive language over vague elegance

### 3) Output quality / realism

Examples:
- findings are too generic
- findings miss obvious system context
- report language sounds inflated or unhelpful
- risk ratings feel arbitrary

Default action:
- ask for the smallest reproducible example they can safely share
- log patterns before changing prompts or product claims
- if the output is weak, narrow the public positioning rather than spinning it

### 4) Positioning confusion

Examples:
- users think it is a full threat-model replacement
- users think it is only a diagram parser
- users cannot tell who the product is for

Default action:
- update README intro, social copy, and FAQ in one pass
- check whether screenshots support the story or muddy it

### 5) Feature requests

Examples:
- support another provider
- import/export format requests
- collaboration workflow asks
- richer findings filters or report layout requests

Default action:
- thank them, log it, do not overcommit during launch week
- prioritize only if it removes adoption blockers or repeats often

---

## Response templates for early feedback

These are for public replies, DMs, and issue comments.

### When someone reports setup friction

> Thanks — that’s very useful. If you’re willing, can you share the exact step where things stopped feeling obvious? I’m trying to tighten the onboarding first, so that kind of detail helps a lot.

### When someone says the findings are weak or off-base

> Appreciate the honesty. The tool is meant to speed up the first draft, not act as a final security judgment, so weak findings are important signal. If there’s a specific example you can safely summarize, I’d like to use that to improve either the prompts, docs, or how the limits are explained.

### When someone questions trust/privacy

> Fair question. The right mental model is: the backend processes the uploaded content, and depending on configuration, analysis data may be sent to the selected LLM provider. We should make that explicit in the repo, and if the wording still feels fuzzy I want to fix it.

### When someone assumes full automation

> Totally fair concern. I’m trying to position it much more narrowly: useful draft STRIDE-oriented output to accelerate human review, not a replacement for threat-modeling expertise.

### When someone gives thoughtful positive feedback

> Thanks — glad that landed. If you notice one thing that would make it more useful in a real review workflow, I’d rather hear that than a generic thumbs-up.

---

## Launch-week service levels

Keep this simple and realistic.

### Respond within 24 hours to
- setup blockers
- trust/privacy confusion
- public comments on launch posts
- maintainers or peers who gave thoughtful review

### Respond within 48 hours to
- feature requests
- lower-severity UX suggestions
- broader workflow ideas

### Safe to defer
- large roadmap debates
- integrations that require significant new surface area
- requests unrelated to current launch messaging

---

## Decision rules

### Fix immediately if
- the same confusion appears twice
- a user cannot tell how to try the demo safely
- a public comment suggests the repo is overstating trust or capability
- setup friction blocks first-use evaluation

### Queue, do not rush, if
- it is a feature request from one person
- it would take significant code changes during launch week
- the feedback is valid but not tied to adoption or trust

### Push back politely if
- someone wants a claim the product cannot honestly support
- someone expects guarantees the tool cannot provide
- a request would encourage unsafe handling of sensitive diagrams or outputs

---

## Minimal daily review loop for this week

At the end of each day:

1. review all new comments, DMs, and issues
2. group repeated points into 2–4 themes
3. decide what gets:
   - fixed now
   - documented now
   - queued for later
4. update launch copy if the real-world objections changed the best framing
5. post or commit the documentation fix before doing more outreach

This keeps the launch honest and cumulative.

---

## Practical output for day 7

By the end of the week, you should be able to summarize feedback like this:

- top 3 setup frictions
- top 2 trust/privacy questions
- top 2 output-quality complaints
- what wording worked best in outreach
- which channel produced the highest-quality replies
- what got fixed in docs vs product

That summary should feed the next week’s README, roadmap, and outreach.

---

## Anti-patterns

Avoid these during early launch:
- arguing with users instead of clarifying the repo
- treating all feedback as equal regardless of persona or depth
- making roadmap promises in public comments under time pressure
- collecting feedback in too many places with no single review pass
- launching broader before the repeated objections are fixed

The best launch-week feedback handling is calm, specific, and visibly responsive.