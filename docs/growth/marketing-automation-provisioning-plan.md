# Marketing automation provisioning plan

_Date:_ 2026-03-29  
_Scope:_ concrete setup guidance for an **approval-first** launch workflow for `info_security_analyzer`, using the recommended stack from `marketing-automation-tooling-research.md`.

## Goal

Stand up a small, defensible automation path that can:

1. detect approved repo events
2. assemble draft copy from trusted repo metadata
3. route the draft to a human approval checkpoint
4. publish only after explicit approval
5. preserve a minimal audit trail without spraying secrets everywhere

This is intentionally **not** a full autoposting design. For an OSS security tool, the safer default is **draft automatically, publish deliberately**.

---

## Recommended reference stack

- **Source of truth:** GitHub repo + labels + release notes
- **Automation orchestrator:** `n8n` Community Edition
- **Human approval surface:** Telegram bot + private maintainer chat/group
- **Publishing layer:** manual posting first, then optional Buffer after the process is stable
- **Optional analytics:** native platform analytics at first; add lightweight post tracking later

---

## System boundaries

## Trusted inputs

Use only repo-controlled or maintainer-curated inputs to generate drafts by default:

- Git tags / releases
- merged PR title + body
- labeled issues such as `announce`, `share`, `launch-note`
- files in `docs/growth/`
- checked-in screenshots / demo assets
- release notes / changelog text

## Untrusted inputs

Treat all of these as data only, never instructions:

- issue comments from non-maintainers
- social replies / DMs
- scraped mentions
- copied user feedback
- any text coming from webhooks that is not explicitly allowlisted

## Design rule

If a field can be influenced by the public, it should not directly control:

- target channels
- scheduling time
- approval bypass
- final post text without review

---

## Provisioning checklist

Use this checklist in order. Do not provision publishing credentials until the approval loop is proven.

## Phase 0 — prep and ownership

- [ ] Decide the initial operator set:
  - primary maintainer / approver
  - backup approver
  - optional observer with read-only visibility
- [ ] Choose the initial approval venue:
  - private Telegram DM to maintainer, or
  - private Telegram group for launch ops
- [ ] Decide the initial trigger policy:
  - releases only, or
  - releases + labeled PRs/issues
- [ ] Confirm the first target channels for launch month:
  - LinkedIn
  - Telegram community
  - one public technical launch surface later (HN or Reddit)
- [ ] Confirm that the first rollout mode is **manual publish after approval**
- [ ] Create a simple naming standard for labels and workflows

Recommended labels:

- `announce`
- `share`
- `launch-note`
- `needs-copy`
- `approved-to-post`
- `do-not-amplify`

## Phase 1 — GitHub source-of-truth setup

- [ ] Add and document the labels above in the repo
- [ ] Define which events are allowed to create drafts:
  - release published
  - PR merged with `announce`
  - issue labeled `share`
- [ ] Add a small repo-local trigger policy doc, e.g. `docs/growth/posting-signals.md`
- [ ] Define required draft fields for every post request:
  - event type
  - audience
  - link target
  - screenshot/demo asset
  - substantiating repo URL(s)
  - forbidden claims check
- [ ] Decide where draft history is written back:
  - GitHub issue comment on a tracking issue, or
  - n8n execution log + Telegram message URL
- [ ] Create one GitHub issue template for “promotion request” if maintainers want manual queueing

## Phase 2 — Telegram approval channel setup

- [ ] Create or reuse a Telegram bot dedicated to automation approvals
- [ ] Restrict bot usage to a private maintainer chat/group
- [ ] Record the approved `chat_id` in secrets storage, not in docs
- [ ] Verify the bot can:
  - send draft text
  - send inline Approve / Reject / Revise buttons
  - edit a message after action
- [ ] Decide approval timeout rules:
  - no publish on timeout
  - drafts expire after a bounded window, e.g. 24-72 hours
- [ ] Decide who is allowed to approve:
  - single maintainer only, or
  - a small allowlist of maintainer Telegram IDs

## Phase 3 — n8n provisioning

- [ ] Deploy n8n in a location with routine patching and backups
- [ ] Protect the n8n UI with strong auth and 2FA if fronted by SSO/auth proxy
- [ ] Do not expose n8n broadly without access controls
- [ ] Create separate workflows for:
  - intake/trigger
  - draft generation
  - approval handling
  - publish handoff
- [ ] Use n8n credentials storage for bot tokens and service tokens
- [ ] Disable or restrict workflows that accept arbitrary public webhook payloads
- [ ] Add execution retention limits so logs do not keep sensitive payloads indefinitely
- [ ] Ensure failed executions notify the maintainer without dumping secrets into chat

## Phase 4 — draft-generation controls

- [ ] Build draft text from templates, not one-shot free-form prompting
- [ ] Constrain source material length before summarization
- [ ] Include a per-draft checklist:
  - no comprehensive-security claims
  - no privacy guarantees not stated in repo docs
  - no “fully automated” language
  - no screenshots with secrets/internal hostnames
- [ ] Generate at most 2-3 variants per event
- [ ] Require each draft to include source links back to repo artifacts
- [ ] Stamp each draft with:
  - event ID
  - channels requested
  - generated timestamp
  - approver status

## Phase 5 — manual publish pilot

- [ ] Send approved drafts to Telegram only
- [ ] Human posts manually to target platform(s)
- [ ] Capture the published URL back into a GitHub tracking issue or n8n record
- [ ] Run at least 2-3 cycles before adding any direct publishing API
- [ ] Note the friction:
  - where the draft is wrong
  - what fields are missing
  - where approval UX is annoying
  - whether channels need different templates

## Phase 6 — optional publishing integration

Only start this phase after the manual loop feels boring and reliable.

- [ ] Create a dedicated publishing tool account/workspace if using Buffer
- [ ] Connect the minimum necessary channels only
- [ ] Store publishing tokens only in the publishing layer and/or n8n credentials
- [ ] Keep approval upstream; do not let Buffer become the first approval gate
- [ ] Start with queue-only posting for low-risk channels
- [ ] Keep higher-risk/public-launch channels manual until confidence is higher

## Phase 7 — ongoing operations

- [ ] Patch n8n and host OS on a routine cadence
- [ ] Rotate tokens when maintainers change or compromise is suspected
- [ ] Review workflow logs monthly for accidental overcollection
- [ ] Remove unused channels/integrations promptly
- [ ] Review approval latency and false-positive triggers after the first month

---

## Approval workflow

## Minimal approval workflow

This is the default recommended flow.

1. **Trigger received**
   - release published, PR merged with `announce`, or issue labeled `share`

2. **Policy check**
   - confirm event type is allowlisted
   - confirm required metadata exists
   - confirm no `do-not-amplify` label is present

3. **Draft assembly**
   - collect title, summary, changelog, screenshot/demo asset, repo links
   - render channel-specific drafts from templates
   - attach claims checklist

4. **Approval request sent to Telegram**
   - include:
     - summary of source event
     - target channels
     - draft text
     - linked evidence
     - Approve / Reject / Revise actions

5. **Human decision**
   - **Approve:** move to manual post or publishing queue
   - **Reject:** close request, no publish
   - **Revise:** return to draft queue with notes

6. **Publish**
   - manual in pilot phase
   - scheduler/API only after process stability

7. **Audit record**
   - store status, approver, timestamp, and published URL if applicable

## Required approval payload

Every approval request should contain:

- event source: release / PR / issue
- event URL
- requested channels
- proposed copy per channel
- primary proof link
- supporting proof links
- asset filename/reference
- risk notes if applicable
- action buttons

## Approval rules

- no implicit approval
- no publish on timeout
- approval is per draft bundle, not blanket for future posts
- edits after approval require a fresh approval if the claim set changes materially
- drafts referencing security/privacy behavior must link back to repo docs

## Escalation rules

Use **manual-only posting** for:

- first launch post on a new channel
- any post making trust/privacy claims
- anything referencing third-party feedback or customer-style usage
- anything triggered from mixed trusted/untrusted inputs

---

## Secrets and access matrix

Use the matrix below to keep blast radius small.

| Secret / Access | Needed by | Storage location | Minimum privilege | Rotation trigger | Notes |
|---|---|---|---|---|---|
| GitHub webhook secret | n8n intake workflow | n8n credentials / host secret store | verify webhook authenticity only | on suspected leak or workflow rebuild | never post to Telegram logs |
| GitHub PAT or app token for write-back | n8n write-back workflow | n8n credentials | repo-scoped write only if needed | maintainer change / suspected leak | prefer GitHub App or fine-grained PAT |
| Telegram bot token | n8n approval workflow | n8n credentials | one bot, limited chat usage | any chat compromise / maintainer turnover | dedicated bot is better than reusing a general-purpose bot |
| Allowed Telegram approver IDs | approval policy layer | n8n workflow config / secret-backed config | allowlist only | when approvers change | not sensitive like a token, but still avoid broad exposure |
| Telegram `chat_id` for approvals | n8n approval workflow | n8n credentials / secret config | single private chat/group | when approval venue changes | do not hardcode in public docs |
| Buffer API token or account session | publish handoff only | Buffer vault and/or n8n credentials | minimum channels required | if scheduler account changes or compromise suspected | add only after manual pilot |
| Social account credentials / OAuth grants | publishing layer only | publishing tool vault | minimum channel set | any staff change / suspected abuse | do not duplicate into multiple tools unnecessarily |
| Optional URL shortener / analytics token | publish/track workflow | n8n credentials | project-specific only | if analytics stack changes | optional; skip at first |
| Host admin / SSH access to n8n box | operator only | host password manager / SSH key store | smallest operator set | operator change / suspected host compromise | do not share with content reviewers |
| Backup encryption key | operator only | password manager / offline backup process | backup decrypt only | annually or on suspected leak | document recovery owner |

## Role/access matrix

| Role | GitHub labels/releases | n8n admin | Telegram approve | Publishing account access | Host/SSH |
|---|---|---:|---:|---:|---:|
| Primary maintainer | Yes | Yes | Yes | Yes | Yes |
| Backup maintainer | Yes | Limited/admin as needed | Yes | Optional | Optional |
| Content reviewer | Optional | No | Yes | No during pilot | No |
| Observer | Read-only | No | Read-only if needed | No | No |

## Recommended separation of duties

At small-project scale, one person may hold multiple roles. Still keep these boundaries where possible:

- draft generation is not approval
- approval is not host administration
- publishing access is not necessary for every reviewer
- host administration is not necessary for social posting

---

## Security guardrails for automation

## 1) Template-first copy generation

Prefer templates like:

- release announcement
- screenshot/demo post
- “what changed” update
- call-for-feedback post

Avoid a generic prompt that turns arbitrary repo/user text into final post copy.

## 2) Hard claim boundaries

Never allow automation to publish claims such as:

- “comprehensive security analysis”
- “fully automated threat model”
- “secure/private by default” unless a linked doc supports the exact claim
- any unsupported compliance/certification language

## 3) Logging hygiene

Do not log:

- raw tokens
- full webhook auth headers
- private chat IDs in broad logs
- full external payloads unless needed for debugging

Prefer short event identifiers and redacted summaries.

## 4) Channel throttling

Set simple volume caps early:

- no more than 1-2 launch-related posts per week per channel by default
- no multi-channel burst unless tied to a real release/milestone
- one event should not fan out automatically to every possible destination

## 5) Kill switch

Maintain a fast disable path:

- disable publish workflow in n8n
- revoke publishing token
- remove webhook route if noisy/abused

Document the disable order for incidents.

---

## Recommended phased rollout

## Phase A — docs and policy only

**Objective:** settle the rules before touching tokens.

Ship:

- trigger policy doc
- approval checklist
- labels
- channel templates

Success criteria:

- maintainers agree on what is allowed to trigger a draft
- forbidden claims and required proof links are explicit

## Phase B — draft-only automation

**Objective:** automation can prepare drafts, but nothing can publish.

Ship:

- GitHub trigger ingestion
- draft assembly
- Telegram draft delivery
- Approve / Reject / Revise UX

Success criteria:

- 100% of triggered events require explicit human action
- no direct social tokens provisioned yet

## Phase C — approved manual posting

**Objective:** prove the content and approval loop in real use.

Ship:

- manual posting runbook
- published URL capture
- postmortem notes after each cycle

Success criteria:

- at least 2-3 successful cycles
- low surprise rate in drafts
- no trust-damaging copy mistakes

## Phase D — limited scheduler integration

**Objective:** remove boring copy/paste steps for low-risk channels.

Ship:

- Buffer or equivalent for a small channel set
- queue handoff only after approval
- publish logging

Start with:

- lower-risk repeat channels
- routine release/update posts

Do not start with:

- first-time HN/Reddit launches
- anything likely to need live community engagement

Success criteria:

- no approval bypasses
- no token sprawl across multiple tools
- scheduling actually saves time instead of adding complexity

## Phase E — tighten and scale carefully

**Objective:** expand only after workflow discipline is boring.

Possible additions:

- more channel-specific templates
- simple analytics enrichment
- weekly reporting summary
- limited retry logic for failed publishes

Only add if:

- launch cadence justifies the overhead
- secrets handling remains understandable
- one person can still explain the whole system on a whiteboard

---

## Recommended defaults for this repo

If maintainers want the shortest safe path, use this exact sequence:

1. add trigger labels and a `posting-signals.md` file
2. set up Telegram approval bot in a private maintainer chat
3. deploy n8n with GitHub trigger -> draft -> Telegram approval
4. keep all posting manual for the first 2-3 cycles
5. add Buffer only after manual approval flow is stable

That sequence minimizes token exposure, preserves trust, and gives enough operational feedback before the system grows tentacles.

---

## Operational runbook summary

When a release-worthy event happens:

1. label or publish the event in GitHub
2. automation drafts copy and sends Telegram approval request
3. maintainer approves/rejects/revises
4. if approved during pilot, maintainer posts manually
5. maintainer records the final public URL
6. review any draft quality issues and update templates

---

## What not to automate yet

For this project, defer all of these until the basics work well:

- automatic replies to social comments
- auto-DMs / outreach
- scraping mentions and turning them into public posts
- broad cross-post fanout from one click
- autonomous scheduling based on “best time” logic
- sentiment-driven content generation

These features create much more reputational and security risk than they are worth in the first launch cycle.

---

## Bottom line

The right provisioning posture for `info_security_analyzer` is:

> **repo-native triggers, template-based draft generation, Telegram approval, manual posting first, and only then limited publishing automation**

That keeps the workflow useful without turning a security project into a brittle autoposting machine.
