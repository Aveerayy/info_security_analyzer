# Send-this-week outreach playbook

A practical operator guide for doing **real outreach this week** for **Info Security Analyzer** without re-reading the whole growth folder.

Use this when the goal is:
- get the first 8-15 quality conversations
- learn where the pitch or onboarding breaks
- avoid over-posting before the repo surface is ready

This playbook assumes the product is being positioned honestly:
- **draft STRIDE findings**, not authoritative verdicts
- **demo-first evaluation** before credentials where possible
- uploaded content **may be sent to the selected LLM provider** during analysis

---

## 1) What success looks like this week

A good week is **not** "maximum impressions."

A good week is:
- 5-10 people with relevant backgrounds actually look at the repo or demo flow
- 3-5 useful replies arrive
- repeated objections are captured in one place
- docs or messaging get tighter before broader public launch

Use outreach to create signal, not noise.

---

## 2) Outreach order of operations

Do outreach in this order:

1. **Trusted security peers**
2. **AppSec / cloud / DevSecOps practitioners**
3. **Adjacent OSS maintainers**
4. **Warm communities** (Telegram / small group chats where self-promo is acceptable)
5. **One public launch channel** after the above produces no major blockers

Reason: this repo benefits more from honest technical feedback than from broad top-of-funnel traffic too early.

---

## 3) Target categories and how to use them

## Category A — trusted security peers

**Who they are**
- people who know your work or will reply candidly
- staff/security engineers, architects, consultants, practitioner friends

**Best ask**
- setup friction
- whether the README feels credible
- whether the tool sounds over-claimed

**Goal this week**
- send **3-5** messages

**What good looks like**
- at least 2 real replies
- at least 1 person actually tries the repo/demo

**Do not ask for**
- endorsements
- public sharing in the first message

---

## Category B — AppSec / cloud / DevSecOps practitioners

**Who they are**
- people doing architecture reviews, security reviews, platform/security enablement, cloud risk review

**Best ask**
- would this fit a real review workflow?
- where would they hesitate?
- what part of the trust/privacy story still feels vague?

**Goal this week**
- send **2-4** messages

**What good looks like**
- 1-2 replies with workflow-based criticism
- at least one comment on findings quality or positioning

**Do not ask for**
- stars first
- a full product review
- long unpaid testing sessions

---

## Category C — adjacent OSS maintainers

**Who they are**
- maintainers of threat-modeling, diagram, AppSec, or security-workflow tools

**Best ask**
- docs clarity
- positioning honesty
- whether the repo explains scope and limits clearly

**Goal this week**
- send **1-2** messages

**What good looks like**
- one thoughtful reaction
- one pointer about ecosystem fit, docs, or terminology

**Do not ask for**
- partnerships
- backlinks
- endorsements
- collabs in the first touch

---

## Category D — warm community posts

**Who they are**
- Telegram groups, small founder/security communities, or chats where light self-promo is normal

**Best ask**
- try the demo path
- call out setup friction
- point out misleading claims or weak findings

**Goal this week**
- make **1-2** posts total

**What good looks like**
- a few comments or DMs
- one repeated question you can convert into a docs fix

**Do not do**
- multi-community blast posting on the same day
- vague “thoughts?” posts
- copy-paste spam in communities with overlapping members

---

## Category E — public launch channel

**Who they are**
- Hacker News or one good-fit Reddit community

**Best ask**
- critique onboarding clarity
- critique trust boundaries
- critique output realism

**Goal this week**
- **0 or 1** public launch post, only after warm outreach

**What good looks like**
- serious technical discussion
- objections that improve docs/product
- no major trust mismatch between post and repo

**Rule**
- do **not** do HN and Reddit on the same day

---

## 4) Recommended send volume and cadence

Keep the volume low enough that replies can be handled well.

## Monday / first outreach day

- send **3** trusted-peer DMs
- send **1** practitioner DM
- log all sends immediately

## Tuesday

- send **1-2** more peer/practitioner DMs
- if the repo surface still looks stable, make **1 warm community post**

## Wednesday

- no new blast unless earlier replies are handled
- patch repeated confusion in README/docs
- send **1 maintainer outreach** if the repo surface still feels honest and current

## Thursday

- send **1-2** remaining DMs only if response load is manageable
- do **one** follow-up for Monday contacts who did not reply

## Friday

- decide go / no-go on one public launch post
- only post publicly if:
  - no trust mismatch is showing up repeatedly
  - demo path and quickstart still match reality
  - there is time to answer same-day questions

## Cadence rules

- never send more than **4-5 direct outreaches in one day**
- use **one follow-up max** per person
- wait **3-4 days** before the follow-up
- if no reply after follow-up, stop

This project wants careful attention, not sales automation behavior.

---

## 5) Exact ask by segment

Use **one ask per message**.

### Ask options

- **setup:** where did setup stop feeling obvious?
- **trust:** does the repo explain privacy and limitations clearly enough?
- **output:** do the findings look useful as a first-pass review aid?
- **positioning:** does this sound honest, or does it still over-claim?
- **workflow fit:** would this help in a real architecture/security review?

## Best mapping

- trusted peer -> **setup** or **positioning**
- practitioner -> **workflow fit** or **output**
- OSS maintainer -> **docs clarity** or **positioning**
- community post -> **setup + weak findings + unclear trust language**

Do not ask the same person for all five.

---

## 6) Reply-time expectations

If you send outreach, be ready to respond.

### Same-day response required for
- setup blockers
- trust/privacy confusion
- public comments in launch channels
- thoughtful maintainer replies

### Within 24 hours
- practitioner feedback
- someone who actually tried the demo or local setup
- people asking clarifying questions in good faith

### Safe to defer
- feature requests
- roadmap debates
- integration asks unrelated to launch-week trust/adoption

If response capacity is low, reduce sending volume before expanding channels.

---

## 7) Response handling playbook

Use this sequence for every meaningful reply:

1. **Acknowledge specifically**
2. **Restate the intended scope**
3. **Capture the feedback in the log**
4. **Fix docs/product if it repeats**
5. **Reply with the update if you actually changed something**

## Example response shapes

### If someone says setup was confusing

> Thanks — that’s useful. Which step stopped feeling obvious? I’m trying to tighten onboarding first, so that detail is high value.

### If someone says the findings are weak

> Appreciate the honesty. The goal is a faster first draft for review, not a final security judgment. If you can summarize one example that felt clearly off, that would help me narrow whether the fix belongs in prompts, docs, or positioning.

### If someone questions privacy/trust

> Fair point. The intended model is: the backend processes uploaded content, and analysis may be sent to the selected provider. If the repo wording still feels fuzzy, that’s exactly the kind of thing I want to tighten.

### If someone assumes this replaces threat modeling expertise

> Totally fair concern. I’m trying to position it much more narrowly: assistive draft generation for human review, not automated security truth.

### If someone is positive but vague

> Glad it’s interesting. If you had to pick one thing to critique, I’d most want to know where setup or trust wording still feels weak.

---

## 8) What to log after every send or reply

Keep one simple table. Do not build CRM theater.

| Contact | Segment | Channel | Sent | Ask | Replied | Follow-up due | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Name | peer / practitioner / maintainer / community | DM / Telegram / LinkedIn | YYYY-MM-DD | setup / trust / output / positioning / workflow | yes/no | YYYY-MM-DD | new / replied / fixed / closed | short note |

## Minimum notes to capture

- who they are
- what you asked them
- what they actually objected to
- whether a repo/docs fix is needed

If the same confusion appears twice, update docs before sending more outreach.

---

## 9) Go / no-go rules for broader posting

## Go to broader launch only if

- README quickstart is still accurate
- demo path works without credentials
- trust/privacy language is visible and current
- soft-launch feedback did not reveal a major credibility gap
- there is time blocked to answer replies

## No-go this week if

- multiple people misread the product as fully automated threat modeling
- multiple people cannot tell what happens to uploaded diagrams
- setup questions keep repeating because the docs are unclear
- screenshots or post copy no longer match the product

If any of the above happens, stay in patch mode.

---

## 10) Best channels for this week

If time is limited, use only this stack:

1. **Direct DMs to trusted peers**
2. **Telegram soft launch**
3. **LinkedIn soft launch**
4. **One** public channel after fixes

That is enough for a serious first outreach week.

---

## 11) Operator checklist

### Before sending

- [ ] README and demo path checked today
- [ ] repo link copied correctly
- [ ] one clear ask selected per target
- [ ] message personalized by one line
- [ ] response time available later today

### After sending

- [ ] outreach log updated
- [ ] follow-up date recorded
- [ ] repeated objections tagged
- [ ] docs fix created if confusion repeated

### End of week

- [ ] count useful replies
- [ ] summarize top setup objections
- [ ] summarize top trust objections
- [ ] summarize best-performing ask
- [ ] decide whether public launch is ready

---

## 12) Recommended default plan

If you want the simplest safe plan, do this:

- **3 trusted peer DMs on day 1**
- **2 practitioner DMs on day 2**
- **1 Telegram post on day 2 or 3**
- **1 maintainer DM on day 3**
- **1 follow-up wave on day 4**
- **1 LinkedIn post on day 4 or 5**
- **1 public post on day 5 or later only if the feedback is stable**

That should produce enough signal to improve the repo without making response handling messy.

---

## 13) Source docs

This playbook condenses guidance from:
- [`outreach-execution-templates.md`](./outreach-execution-templates.md)
- [`early-user-feedback-playbook.md`](./early-user-feedback-playbook.md)
- [`channel-strategy.md`](./channel-strategy.md)
- [`weekly-execution-packet.md`](./weekly-execution-packet.md)
- [`publish-this-week-packet.md`](./publish-this-week-packet.md)
- [`launch-assets.md`](./launch-assets.md)

When in doubt, keep the tone technically honest, the ask small, and the response loop tight.
