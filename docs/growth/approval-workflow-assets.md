# Approval runbook: Telegram approval + manual posting

_Use this for the real operator workflow for `info_security_analyzer`._

> Need the short launch-day version? Open [`approval-operator-cheat-sheet.md`](./approval-operator-cheat-sheet.md) first. This file is the fuller reference.

This file is the day-to-day runbook for the current recommended mode:

> **draft automatically, approve explicitly, publish manually first**

It replaces the earlier "asset pack" framing with a practical operator checklist for handling inbound approval requests, deciding safely, posting manually, and recording what happened.

Canonical design references:

- [`marketing-automation-provisioning-plan.md`](./marketing-automation-provisioning-plan.md)
- [`posting-signals.md`](./posting-signals.md)
- [`publish-this-week-packet.md`](./publish-this-week-packet.md)
- [`weekly-execution-packet.md`](./weekly-execution-packet.md)

---

## 1) What this runbook is for

Use this runbook when:

- n8n sends a Telegram approval request
- a maintainer needs to decide **Approve / Revise / Reject**
- an approved draft needs to be posted manually
- the final post URL needs to be recorded back into the audit trail

Use the conservative bias throughout:

- **No automatic publishing**
- **No implicit approval**
- **No publish on timeout**
- **Any material copy change after approval requires fresh approval**

---

## 2) Roles

At small-project scale, one person may do all of these, but keep the responsibilities mentally separate.

### Drafting system

- receives GitHub events
- assembles the draft bundle
- sends Telegram approval request
- records workflow state

### Approver

- checks whether the draft is accurate, safe, and worth sharing now
- chooses **Approve**, **Revise**, or **Reject**
- does **not** assume the system already validated every claim

### Publisher

- manually posts the approved copy to the destination channel
- does not freestyle major wording changes after approval
- records the final URL(s)

### Operator / maintainer

- handles exceptions, timeouts, broken assets, and audit cleanup
- can stop the workflow if something looks wrong

---

## 3) Allowed operating mode

This runbook assumes the current pilot mode:

1. GitHub event creates draft bundle
2. n8n sends approval request to private Telegram
3. human approves / revises / rejects
4. if approved, human posts manually
5. audit record is updated with outcome and final URL

If direct publishing APIs are added later, do **not** use them by default for:

- first post on a new channel
- trust/privacy-heavy claims
- mixed trusted/untrusted source material
- anything that still needs live maintainer judgment

---

## 4) Start-of-shift operator check

Before handling approval requests, quickly verify:

- [ ] Telegram approval bot is posting into the correct private chat/group
- [ ] you are acting as an allowlisted approver
- [ ] the repo event link opens and is real
- [ ] the publish destination is one you can access manually
- [ ] screenshots/assets referenced by recent drafts are still current

If any of these fail, pause the workflow and fix the plumbing before approving anything.

---

## 5) Intake gate: when a Telegram approval request arrives

Every approval request should include:

- request ID
- event type
- source event URL
- requested channels
- why now
- primary proof link
- supporting proof links
- asset reference
- risk notes
- draft text

If any required field is missing:

- choose **Revise** if the request is otherwise valid but incomplete
- choose **Reject** if the request is noisy, unsafe, or not worth fixing
- do **not** approve based on guesswork

### Trigger allowlist

Approve consideration only if the event came from an allowed trigger in [`posting-signals.md`](./posting-signals.md):

- published release
- merged PR with `announce`, `share`, or `launch-note`
- issue labeled `share` or `launch-note`

Hard stop if:

- `do-not-amplify` is present
- the event is from a fork or untrusted mirror
- the draft depends on public comments or scraped content as if they were trusted proof

---

## 6) Approval checklist

Use this checklist before pressing **Approve**.

### A. Accuracy

- [ ] the event is real and linked
- [ ] the draft matches the linked release / PR / issue
- [ ] the most important claim is supported by the source material
- [ ] links, filenames, and repo references look correct
- [ ] the post is understandable to someone who has not followed the repo closely

### B. Trust / security

- [ ] no secrets, internal URLs, tokens, or private screenshots appear
- [ ] no claim implies certification, audit, or endorsement
- [ ] no claim overstates privacy boundaries
- [ ] any trust/privacy language matches repo docs
- [ ] the copy clearly frames outputs as assistive / draft / human-reviewed

### C. Channel fit

- [ ] the requested channel(s) make sense for this event
- [ ] the copy length fits the destination
- [ ] the CTA is reasonable: try it, star it, read docs, or give feedback
- [ ] if uncertain, Telegram-only is acceptable

### D. Final decision rule

Approve only if all four are true:

- [ ] accurate
- [ ] safe
- [ ] worth sharing now
- [ ] understandable without extra explanation

If not, use:

- **Revise** = worth sharing, but fixable
- **Reject** = should not be promoted at all

---

## 7) Decision rubric

### Approve when

- the event is allowlisted
- proof is strong enough
- claims are modest and defensible
- the copy is channel-appropriate
- assets are current and safe to share

### Revise when

- the event is worth sharing but the copy is weak
- the channels are too broad
- the screenshot is stale, confusing, or unnecessary
- the CTA is wrong
- the wording is technically true but still too hype-y
- a required field or proof link is missing

### Reject when

- the event is not worth promoting
- the copy depends on unsupported claims
- the materials are stale, private, or unsafe
- the event is too internal / noisy / low-signal
- a blocker from [`posting-signals.md`](./posting-signals.md) applies

---

## 8) What to do for each Telegram action

## Approve

When approving:

1. confirm the exact draft version in Telegram
2. ensure the requested channels are explicit
3. press **Approve**
4. treat the approved draft as frozen for manual posting
5. post manually without material edits
6. record final published URL(s)

If you need to change the claim set, trust wording, or channel mix after approval, stop and create a fresh approval request.

## Revise

Use **Revise** when the draft is close but not ready.

Include short, operator-useful notes such as:

- tighten privacy wording
- remove implication of automated security truth
- Telegram only, not LinkedIn
- asset is stale; resend with current screenshot
- link release notes, not just repo root

Revision notes should be concrete enough that the next draft can be approved or rejected quickly.

## Reject

Use **Reject** when the request should die, not loop.

Common reasons:

- low-signal internal change
- unsupported claims required to make it sound interesting
- asset is unsafe to publish
- event should stay internal only
- timing is wrong and there is no meaningful urgency

A rejected draft bundle is closed. Do not manually post it anyway.

---

## 9) Manual posting checklist

Once a request is approved, the publisher should do the following.

### Before posting

- [ ] copy the approved draft exactly or make only non-material formatting fixes
- [ ] verify the destination account/channel is correct
- [ ] verify the repo link is correct
- [ ] verify the attached screenshot/asset is the approved one
- [ ] confirm the post still matches repo reality at publish time

### Allowed non-material edits

These do **not** require re-approval if the meaning stays the same:

- platform formatting cleanup
- line breaks / bullet formatting
- hashtag removal
- shortening for platform character limits without changing claims
- swapping in the same approved URL with tracking removed

### Material edits that require fresh approval

These **do** require a new approval request:

- changing the claim set
- changing trust/privacy wording
- changing the target channels
- adding new proof points
- adding third-party praise or adoption language
- replacing the asset with a meaningfully different screenshot

### After posting

- [ ] capture the final public URL
- [ ] confirm the post is visible as intended
- [ ] update the audit record / GitHub write-back
- [ ] note any friction that should improve the template next time

---

## 10) Timeout / expiry handling

If a request expires or sits too long:

- do not infer approval
- mark it expired / closed
- require a fresh request ID to continue
- re-check assets and source links before reissuing

Use a fresh request instead of reviving an old one when:

- the source event evolved
- the screenshots changed
- the copy changed materially
- the timing context changed enough that “why now” is different

---

## 11) Audit log: minimum record to keep

Keep one record per draft bundle.

```yaml
request_id: isa-{{yyyyMMdd}}-{{shortid}}
status: pending # pending|approved|revise|rejected|published|expired
source:
  event_type: release # release|pr|issue
  event_url: {{event_url}}
  repo: aveerayy/info_security_analyzer
channels_requested:
  - telegram
channels_approved:
  - telegram
proof:
  primary: {{primary_proof_link}}
  supporting:
    - {{supporting_proof_link_1}}
    - {{supporting_proof_link_2}}
asset_reference: {{asset_reference_or_none}}
risk_notes:
  - {{risk_note_or_none}}
approver:
  telegram_id: {{approver_id_or_none}}
  handle: {{approver_handle_or_none}}
decision:
  action: pending
  decided_at: null
  notes: []
publish:
  mode: manual
  published_at: null
  published_urls: []
audit:
  n8n_execution_id: {{execution_id}}
  github_writeback_url: {{issue_comment_or_none}}
```

Minimum useful fields if you are in a rush:

- request ID
- decision
- approver
- timestamp
- approved channels
- final URL(s) if published

---

## 12) GitHub / audit write-back templates

Use these if the workflow writes back to a tracking issue, PR comment, or internal log.

### Approval recorded

```text
Approval recorded for `{{request_id}}`.

- Status: approved
- Event: {{event_type}}
- Source: {{event_url}}
- Channels: {{channels}}
- Approver: {{approver_handle_or_id}}
- Timestamp: {{approved_at_iso8601}}
- Publish mode: manual
- Audit ref: {{n8n_execution_or_internal_ref}}
```

### Revision requested

```text
Revision requested for `{{request_id}}`.

- Status: revise
- Event: {{event_type}}
- Source: {{event_url}}
- Requested by: {{approver_handle_or_id}}
- Timestamp: {{revised_at_iso8601}}

Requested changes:
- {{revision_note_1}}
- {{revision_note_2}}
- {{revision_note_3}}

No publish is authorized for the current draft.
```

### Rejected

```text
Approval request closed for `{{request_id}}`.

- Status: rejected
- Event: {{event_type}}
- Source: {{event_url}}
- Rejected by: {{approver_handle_or_id}}
- Timestamp: {{rejected_at_iso8601}}

Reason:
- {{rejection_reason_1}}
- {{rejection_reason_2_or_none}}
```

### Published manually

```text
Publish recorded for `{{request_id}}`.

- Status: published
- Channels: {{published_channels}}
- Published by: {{publisher}}
- Timestamp: {{published_at_iso8601}}
- Final URL(s):
  - {{published_url_1}}
  - {{published_url_2_or_none}}
```

---

## 13) Telegram templates

Use these as the operational baseline.

### Approval request

```text
🟠 Approval request: {{request_id}}

Event: {{event_type}}
Source: {{event_url}}
Why now: {{reason_this_is_worth_sharing_now}}
Channels: {{channels}}

Primary proof:
- {{primary_proof_link}}

Supporting proof:
- {{supporting_proof_link_1}}
- {{supporting_proof_link_2}}

Asset:
- {{asset_reference_or_none}}

Risk notes:
- {{risk_note_1_or_none}}
- {{risk_note_2_or_none}}

Draft:
{{draft_text}}

Decision options:
- Approve
- Revise
- Reject
```

### Callback payload recommendation

Keep callback payloads short and machine-safe:

```text
approve|{{request_id}}
revise|{{request_id}}
reject|{{request_id}}
```

Store rich context server-side; do not depend on callback payloads for the full draft.

### Approved outcome

```text
✅ Approved: {{request_id}}

Approver: {{approver_handle_or_id}}
Channels: {{approved_channels}}
Mode: manual post now
Next step: {{owner}} will publish and record the final URL.
```

### Revise outcome

```text
✏️ Revise requested: {{request_id}}

Requested by: {{approver_handle_or_id}}
Main fixes:
- {{revision_note_1}}
- {{revision_note_2}}
- {{revision_note_3}}

Status: returned to draft queue. No publish is allowed on the current version.
```

### Rejected outcome

```text
🛑 Rejected: {{request_id}}

Rejected by: {{approver_handle_or_id}}
Reason:
- {{rejection_reason_1}}
- {{rejection_reason_2_or_none}}

Status: closed. Do not publish this draft bundle.
```

### Expired outcome

```text
⌛ Approval expired: {{request_id}}

No action was taken before the timeout window.
Status: closed with no publish.
To continue, create a fresh approval request.
```

---

## 14) Failure handling / kill switch

Pause the workflow immediately if any of these happen:

- Telegram requests are landing in the wrong chat
- non-allowlisted users can approve
- drafts include secrets, private screenshots, or broken links
- n8n is writing noisy or sensitive logs
- the system starts treating public/user input as trusted proof

Disable order:

1. stop manual posting
2. disable the n8n publish/approval continuation step
3. revoke or rotate the Telegram bot token if compromise is suspected
4. review recent requests and close any ambiguous pending items

When in doubt, fail closed.

---

## 15) Minimal operator flow

Use this as the shortest correct path.

1. receive Telegram approval request
2. verify event, proof, channels, asset, and risk notes
3. run the approval checklist
4. choose **Approve / Revise / Reject**
5. if approved, post manually with no material edits
6. record final URL and outcome
7. note what should be improved before the next cycle

That is the intended boring path.

If the process stops being boring, the workflow is not ready for more automation.
