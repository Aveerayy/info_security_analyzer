# Outreach execution templates

Practical outreach copy for **this week’s soft launch and early public launch prep**.

Use these templates for:
- warm peer outreach
- OSS maintainer outreach
- follow-ups after no reply
- follow-ups after someone tried the project

Principles:
- keep the ask small
- personalize the first sentence
- ask for one kind of feedback at a time
- do not oversell accuracy or automation
- do not mass-send identical messages to people who can see each other in the same community

---

## Before sending anything

Check these first:
- have you verified the current README and demo flow?
- is the repo link correct?
- are you asking this person for feedback they are actually qualified to give?
- can you handle replies within 24 hours?
- is the message short enough to read on mobile?

Personalize at least one line:
- their recent post, repo, talk, or comment
- why their perspective is relevant
- why you chose them instead of blasting a list

---

## Suggested outreach targets for this week

### 1) Trusted security peers

Best for:
- setup-friction feedback
- finding weak or misleading findings
- checking whether the positioning sounds honest

### 2) AppSec / cloud / DevSecOps practitioners

Best for:
- workflow fit
- “would this help in a real review?”
- trust and privacy objections

### 3) OSS maintainers with adjacent projects

Best for:
- repo/docs clarity
- positioning feedback
- possible future cross-linking, issue references, or lightweight ecosystem awareness

Do **not** lead with a partnership ask. Lead with a review ask.

---

## Template 1 — warm peer DM

Use when you already know the person or have interacted before.

> Hey {{name}} — I shipped a small OSS project called **Info Security Analyzer**. It turns architecture diagrams into draft STRIDE findings and report output.
>
> I thought of you because {{specific reason}}.
>
> If you have 5–10 minutes, I’d love blunt feedback on **{{one focus area}}**. I’m especially trying to catch anything unclear, over-claimed, or unrealistic before I push it harder.
>
> Repo: {{repo-link}}
>
> No pressure if this week is packed.

### Good focus-area substitutions

- whether the setup path is annoying or confusing
- whether the findings look useful as a first-pass review aid
- whether the trust/privacy language is clear enough
- whether the README explains the product fast enough

---

## Template 2 — security engineer / AppSec peer

> Hey {{name}} — I’m testing an OSS tool I built for turning architecture diagrams into draft STRIDE findings.
>
> It’s positioned very deliberately as a **human-review accelerator**, not an automated security verdict.
>
> Since you do {{their relevant area}}, I’d value a quick sanity check on one thing: **{{one focus area}}**.
>
> If you try it, the most useful feedback is where the workflow breaks, where a finding feels obviously off, or where the trust language still sounds too fuzzy.
>
> Repo: {{repo-link}}

---

## Template 3 — OSS maintainer outreach

Use for maintainers of adjacent security tooling, diagram tooling, or threat-modeling projects.

> Hi {{name}} — I’m reaching out because you maintain {{project/community}} and I think your perspective on security-tooling UX would be especially useful.
>
> I built **Info Security Analyzer**, an OSS tool that turns architecture diagrams into draft STRIDE findings and exportable reports. It includes a demo path and tries to be explicit about privacy and review limitations.
>
> If you are open to a quick look, I’d love feedback on **docs clarity and positioning** — especially whether the repo feels honest about what the tool can and cannot do.
>
> Repo: {{repo-link}}
>
> Totally fine if you do not have time; even a one-line reaction is useful.

### Why this works

- respects their time
- asks for judgment, not promotion
- signals seriousness about trust boundaries
- avoids premature collaboration pressure

---

## Template 4 — “try it if you want” community message

Use for small group chats or communities where self-promo is allowed and the tone is casual.

> I’ve been working on an OSS tool called **Info Security Analyzer**.
>
> It turns architecture diagrams into draft STRIDE findings and report output. There’s a demo mode, so you can inspect the workflow before wiring up provider credentials.
>
> If anyone here tries it, I’d love very specific feedback on:
> - setup friction
> - weak or misleading findings
> - anything in the docs that feels unclear or too hand-wavy
>
> Repo: {{repo-link}}

---

## Follow-up templates

Use follow-ups sparingly. One follow-up is normal. Two is usually too many unless the person explicitly showed interest.

### Follow-up timing for this week

- first message
- wait 3–4 days if no reply
- if still no reply, stop

For people who said they would try it:
- follow up after 2–3 days
- keep it easy to answer in one sentence

---

## Follow-up 1 — no reply

> Hey {{name}} — just resurfacing this once in case it got buried.
>
> No pressure, but if you do get a few minutes, I’d still love a quick read on **{{focus area}}**:
> {{repo-link}}
>
> If now is bad timing, all good.

### Notes

- keep it shorter than the first message
- do not add new asks
- do not guilt them for being busy

---

## Follow-up 2 — they said they would take a look

> Hey {{name}} — quick check-in in case you had a chance to glance at it.
>
> Even a short answer is useful: **what felt most unclear or least convincing?**
>
> Repo: {{repo-link}}

### Alternate version for setup testing

> If you tried it at all, the most useful thing for me is simply: **where did you hesitate, get confused, or stop?**

---

## Follow-up 3 — after they gave feedback

> Thanks — that was genuinely useful.
>
> I’m folding that into the repo this week. If I tighten the docs / fix that rough edge, would you mind if I send you the updated version for a quick re-check later?

Use this only if you actually plan to follow through.

---

## Micro-reply templates for common responses

### If they say “interesting, but I’m busy”

> Totally understand — appreciate the reply. If you ever do glance at it later, I’d especially value a gut-check on whether the README and trust language feel credible.

### If they say “AI security tools make me nervous”

> Same instinct, honestly. I’m trying to position it narrowly: faster first-draft analysis from diagrams, with explicit human-review requirements and visible privacy/trust notes. If any wording still overreaches, that’s exactly the kind of feedback I want.

### If they say “what makes this different?”

> The practical angle is: upload a diagram, get draft STRIDE-oriented findings and report structure quickly, and evaluate the workflow in demo mode before committing credentials. I’m optimizing for a useful review starting point, not a magic security answer.

---

## Lightweight tracking table

Use this in a local note, issue, or spreadsheet.

| Contact | Segment | Sent | Focus ask | Replied? | Follow-up due | Outcome |
|---|---|---:|---|---|---|---|
| Name | peer / maintainer / user | YYYY-MM-DD | setup / findings / trust / docs | yes/no | YYYY-MM-DD | useful notes, no reply, etc. |

Keep it simple. The goal is not CRM theater. The goal is to avoid duplicate outreach and to learn which asks get useful responses.

---

## Recommended ask mix for this week

If outreach time is limited, use this sequence:

1. 3–5 trusted peers
2. 2–3 AppSec / cloud practitioners
3. 1–2 adjacent OSS maintainers
4. only then broader community nudges

That order keeps the feedback high-quality before public amplification.

---

## What to avoid

Do not:
- ask for stars before asking for feedback
- imply the tool replaces threat modeling expertise
- send long unsolicited product pitches
- ask maintainers for endorsements in the first message
- pile on multiple follow-ups
- send people unredacted sensitive diagrams or outputs

The best outreach for this project sounds careful, technically honest, and easy to answer.