# Send-this-week outreach playbook

A **minimal daily operator playbook** for doing real outreach this week for **Info Security Analyzer**.

Open this when you want to know exactly:
- who to contact today
- how many messages to send
- what single ask to use
- when to follow up
- when to stop and fix docs instead of sending more

This is intentionally short. If other outreach docs are more detailed, treat **this file as the day-to-day execution source of truth** for this week.

---

## 0) Weekly goal

Success this week is **not reach**.

Success this week is:
- **8-15 targeted sends** total
- **3-5 useful replies**
- repeated objections captured in one place
- at least one docs or messaging fix from real feedback

Position the product honestly every time:
- it produces **draft STRIDE findings**
- it is a **human-review aid**, not automated security truth
- uploaded content **may be sent to the selected LLM provider** during analysis

---

## 1) Daily run order

Do outreach in this order only:

1. **Check landing surface first**
   - README still accurate
   - demo path still works
   - trust/privacy wording still visible
2. **Send a small batch**
3. **Log every send immediately**
4. **Handle replies before sending more**
5. **Patch repeated confusion before expanding channels**

Rule: if the same confusion appears **twice**, stop sending and fix the repo/docs first.

---

## 2) Who to contact first

Use this priority order:

1. **Trusted security peers**
2. **AppSec / cloud / DevSecOps practitioners**
3. **Adjacent OSS maintainers**
4. **Warm communities**
5. **One public launch channel** only if earlier feedback is stable

Why: this project benefits more from honest technical feedback than broad attention too early.

---

## 3) Daily quotas

Keep volume low enough to respond well.

### Monday
- send **3 peer DMs**
- send **1 practitioner DM**

### Tuesday
- send **1-2 peer/practitioner DMs**
- optionally make **1 warm community post** if docs still look solid

### Wednesday
- **no new batch by default**
- fix repeated objections
- optionally send **1 maintainer DM**

### Thursday
- send **1-2 final DMs** only if reply load is manageable
- send **one follow-up wave** for Monday contacts with no reply

### Friday
- decide **go / no-go** on **one** public post
- only post if you have same-day reply time

### Hard limits
- max **4-5 direct outreaches per day**
- max **1 follow-up** per person
- wait **3-4 days** before follow-up
- do **not** do HN and Reddit on the same day

---

## 4) One ask per message

Never send a message with multiple asks.

### Ask menu
- **setup** — where did setup stop feeling obvious?
- **trust** — does the repo explain privacy and limits clearly enough?
- **output** — do the findings feel useful as a first-pass review aid?
- **positioning** — does this sound honest, or still over-claimed?
- **workflow fit** — would this help in a real security review workflow?

### Best mapping
- **peer** -> setup or positioning
- **practitioner** -> workflow fit or output
- **maintainer** -> docs clarity or positioning
- **community post** -> setup, weak findings, or trust wording

---

## 5) DM skeleton

Use this shape for almost every direct message:

> Hey {{name}} — I shipped a small OSS project called **Info Security Analyzer**. It turns architecture diagrams into **draft STRIDE findings** and report output.
>
> Thought of you because {{specific reason}}.
>
> If you have 5-10 minutes, I’d love blunt feedback on **{{one ask}}**. I’m specifically trying to catch anything unclear, unrealistic, or over-claimed before pushing it harder.
>
> Repo: {{repo-link}}
>
> No pressure if this week is packed.

Keep it short, mobile-readable, and personalized by at least one line.

---

## 6) Warm community post skeleton

> I’ve been working on an OSS tool called **Info Security Analyzer**.
>
> It turns architecture diagrams into **draft STRIDE findings** and report output. There’s a demo path, so people can inspect the workflow before wiring up credentials.
>
> If anyone tries it, the most useful feedback is:
> - setup friction
> - weak or misleading findings
> - confusing trust/privacy wording
>
> Repo: {{repo-link}}

Do not blast multiple overlapping communities on the same day.

---

## 7) Reply handling

When someone replies with real feedback, do this:

1. **acknowledge specifically**
2. **restate scope honestly**
3. **log the objection**
4. **fix docs/product if it repeats**
5. **reply back only if you actually changed something**

### Fast reply lines

**Setup confusion**
> Thanks — that’s useful. Which step stopped feeling obvious?

**Weak findings**
> Appreciate the honesty. The goal is a faster first draft for review, not a final security judgment. If one example felt clearly off, that would help a lot.

**Trust/privacy concern**
> Fair point. The intended model is that the backend processes uploaded content and analysis may be sent to the selected provider. If the repo wording still feels fuzzy, that’s exactly what I want to tighten.

**Over-automation concern**
> Totally fair. I’m trying to position it much more narrowly: assistive draft generation for human review, not automated security truth.

---

## 8) Lightweight tracking table

Keep one simple table. No CRM theater.

| Contact | Segment | Channel | Sent | Ask | Replied | Follow-up due | Status | Notes |
|---|---|---|---|---|---|---|---|---|
| Name | peer / practitioner / maintainer / community | DM / Telegram / LinkedIn | YYYY-MM-DD | setup / trust / output / positioning / workflow | yes/no | YYYY-MM-DD | new / replied / fixed / closed | short note |

Minimum note fields:
- who they are
- what you asked
- what they objected to
- whether a repo/docs fix is needed

---

## 9) Stop / continue rules

### Continue sending only if
- README quickstart is still accurate
- demo path still matches reality
- trust/privacy wording is visible
- replies are being handled within 24 hours
- no major credibility gap is repeating

### Stop sending and patch first if
- multiple people think this is fully automated threat modeling
- multiple people cannot tell what happens to uploaded diagrams
- setup confusion repeats
- post copy or screenshots no longer match the product

If any stop condition hits, stay in patch mode.

---

## 10) Minimal daily checklist

### Before sending
- [ ] README and demo path checked today
- [ ] one clear ask chosen
- [ ] message personalized
- [ ] time available to handle replies later today

### After sending
- [ ] log updated
- [ ] follow-up date recorded
- [ ] repeated objections tagged

### End of day
- [ ] useful replies counted
- [ ] repeated objections summarized
- [ ] docs/message fix created if confusion repeated
- [ ] tomorrow’s send list reduced if response load is high

---

## 11) Default weekly plan

If you want the simplest safe version, do exactly this:

- **Day 1:** 3 peer DMs + 1 practitioner DM
- **Day 2:** 2 more DMs + 1 warm community post
- **Day 3:** patch confusion + 1 maintainer DM
- **Day 4:** 1 follow-up wave + up to 2 remaining DMs
- **Day 5:** decide whether one public post is actually ready

That is enough to generate real signal without creating reply debt.

---

## 12) Related docs

Use these only if you need more detail:
- [`outreach-execution-templates.md`](./outreach-execution-templates.md)
- [`early-user-feedback-playbook.md`](./early-user-feedback-playbook.md)
- [`channel-strategy.md`](./channel-strategy.md)
- [`publish-this-week-packet.md`](./publish-this-week-packet.md)
- [`launch-assets.md`](./launch-assets.md)
