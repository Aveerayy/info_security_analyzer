# Approval workflow assets

_Use with the documented **GitHub -> n8n -> Telegram -> human decision** loop for `info_security_analyzer`._

This file turns the planning docs into concrete execution assets:

- intake checklist
- approver checklist
- Telegram approval message templates
- Telegram outcome messages
- GitHub write-back templates
- audit record template

These assets assume the current recommended operating mode:

> **draft automatically, approve explicitly, publish manually first**

---

## 1) Intake checklist for GitHub -> n8n

Use this before n8n sends any approval request.

### Trigger allowlist

- [ ] Event is one of:
  - published release
  - merged PR with `announce`, `share`, or `launch-note`
  - issue labeled `share` or `launch-note`
- [ ] Event does **not** include `do-not-amplify`
- [ ] Event is from the canonical repo, not a fork or untrusted mirror

### Required evidence

- [ ] Event URL is present
- [ ] Primary repo link is present
- [ ] Supporting proof links are present
- [ ] Summary is grounded in release notes / PR description / issue body
- [ ] Any screenshot or asset reference is current and safe to share

### Claim safety

- [ ] Draft does not invent adoption, security, or performance claims
- [ ] Draft does not imply certification, audit, or endorsement
- [ ] Draft does not overstate privacy boundaries
- [ ] Draft links back to repo docs when mentioning privacy/security behavior
- [ ] Draft avoids quoting third-party praise unless explicitly verified and approved

### Routing

- [ ] Requested channels are listed explicitly
- [ ] Approval venue is the private maintainer Telegram chat/group
- [ ] Draft bundle has a unique request ID
- [ ] Audit destination is known before the message is sent

If any box fails, stop and route to **revise / maintainer-input required**.

---

## 2) Approver checklist for Telegram

Use this checklist before pressing **Approve**.

### Accuracy

- [ ] The event is real and linked
- [ ] The core claim is supported by the linked proof
- [ ] The draft explains the change clearly to a human who has not followed the repo closely
- [ ] Links and filenames look correct

### Trust / security

- [ ] No secrets, internal URLs, tokens, or private screenshots are exposed
- [ ] No claim implies guarantees the project does not make
- [ ] No wording suggests formal security assurance unless that assurance truly exists
- [ ] The post stays aligned with repo docs and README positioning

### Channel fit

- [ ] The requested channel(s) make sense for this event
- [ ] Telegram-first is enough if the signal is still weak or ambiguous
- [ ] The copy length fits the destination
- [ ] The CTA is reasonable: try it, star it, read docs, or give feedback

### Decision rule

Approve only if all of the below are true:

- [ ] accurate
- [ ] safe
- [ ] worth sharing now
- [ ] understandable without extra maintainer explanation

Otherwise choose:

- **Revise** for fixable copy/content problems
- **Reject** when the event should not be promoted at all

---

## 3) Approval decision rubric

### Approve when

- the event is allowlisted
- the proof is strong
- the claim set is modest and defensible
- the draft is channel-appropriate
- the asset is current and non-sensitive

### Revise when

- the event is worth sharing but the copy is weak
- the target channels are too broad
- a screenshot is outdated or unclear
- the CTA is wrong
- the wording is technically true but too hype-y

### Reject when

- the event is not worth promoting
- the draft depends on unsupported claims
- the material is stale, unsafe, or private
- the change is too internal, noisy, or low-signal
- the workflow hit a hard blocker from `posting-signals.md`

---

## 4) Telegram approval request template

Use this structure for every approval request.

### Required fields

- request ID
- event type
- event URL
- target channels
- why now
- primary proof link
- supporting proof links
- asset reference
- risk notes
- draft text
- explicit actions

### Generic template

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

Keep callback payloads short and machine-safe.

```text
approve|{{request_id}}
revise|{{request_id}}
reject|{{request_id}}
```

Store the rich context server-side in n8n; do not rely on callback payloads to carry the draft.

---

## 5) Telegram message templates by event type

These are copy skeletons for the approval message body.

### A. Release approval request

```text
🟠 Release approval: {{request_id}}

Release: {{release_name}} ({{tag}})
Source: {{release_url}}
Default channels: Telegram, LinkedIn
Why now: published release with user-visible changes

Primary proof:
- {{release_notes_url}}

Supporting proof:
- {{repo_url}}
- {{demo_or_docs_url}}

Asset:
- {{screenshot_or_demo_asset}}

Risk notes:
- manual publish only if trust/privacy wording appears
- fresh approval required if claim set changes

Draft:
{{release_draft}}

Decision options:
- Approve
- Revise
- Reject
```

### B. Merged PR / dev update approval request

```text
🟠 Dev update approval: {{request_id}}

PR: {{pr_title}}
Source: {{pr_url}}
Default channels: Telegram
Why now: meaningful merged change with user-facing impact

Primary proof:
- {{pr_url}}

Supporting proof:
- {{repo_url}}
- {{docs_or_demo_url}}

Asset:
- {{asset_reference_or_none}}

Risk notes:
- keep claims limited to what changed
- avoid broad launch framing unless separately approved

Draft:
{{dev_update_draft}}

Decision options:
- Approve
- Revise
- Reject
```

### C. Asset/demo refresh approval request

```text
🟠 Asset refresh approval: {{request_id}}

Item: {{issue_or_asset_title}}
Source: {{issue_or_tracking_url}}
Default channels: Telegram, optional X/Bluesky
Why now: stronger visual/demo proof is available

Primary proof:
- {{asset_link}}

Supporting proof:
- {{repo_url}}
- {{relevant_docs_url}}

Asset:
- {{asset_filename}}

Risk notes:
- do not share if the asset is stale or under-redacted
- prefer Telegram-only if public value is uncertain

Draft:
{{asset_refresh_draft}}

Decision options:
- Approve
- Revise
- Reject
```

---

## 6) Telegram outcome messages

Use these after the approver chooses an action.

### Approved

```text
✅ Approved: {{request_id}}

Approver: {{approver_handle_or_id}}
Channels: {{approved_channels}}
Mode: {{manual_post_now|queue_for_scheduler}}
Next step: {{owner}} will publish and record the final URL.
```

### Revise requested

```text
✏️ Revise requested: {{request_id}}

Requested by: {{approver_handle_or_id}}
Main fixes:
- {{revision_note_1}}
- {{revision_note_2}}
- {{revision_note_3}}

Status: returned to draft queue. No publish is allowed on the current version.
```

### Rejected

```text
🛑 Rejected: {{request_id}}

Rejected by: {{approver_handle_or_id}}
Reason:
- {{rejection_reason_1}}
- {{rejection_reason_2_or_none}}

Status: closed. Do not publish this draft bundle.
```

### Timed out / expired

```text
⌛ Approval expired: {{request_id}}

No action was taken before the timeout window.
Status: closed with no publish.
To continue, create a fresh approval request.
```

---

## 7) GitHub write-back templates

Use these if n8n writes outcomes back to a tracking issue, campaign issue, or PR comment.

### Approval recorded

```text
Approval recorded for `{{request_id}}`.

- Status: approved
- Event: {{event_type}}
- Source: {{event_url}}
- Channels: {{channels}}
- Approver: {{approver_handle_or_id}}
- Timestamp: {{approved_at_iso8601}}
- Publish mode: {{manual|queued}}
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

## 8) Audit record template

Use one record per draft bundle.

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
draft_hash: {{optional_hash_of_rendered_draft}}
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

---

## 9) n8n implementation notes

Keep the workflow behavior boring and explicit.

- Verify GitHub webhook authenticity before parsing content.
- Normalize all triggers into one internal draft object.
- Generate a unique `request_id` before messaging Telegram.
- Store approver allowlist server-side.
- Reject Telegram callbacks from non-allowlisted users.
- On **Revise**, require free-text notes.
- On **Approve**, snapshot the final approved draft before any publish handoff.
- On timeout, close the request explicitly; never infer approval.
- If the draft text changes materially after approval, mint a new request ID and require re-approval.

---

## 10) Minimal manual pilot operating mode

Use this for the first real runs.

1. GitHub event creates a draft bundle.
2. n8n sends Telegram approval request.
3. Maintainer approves, revises, or rejects.
4. If approved, maintainer posts manually in the destination channel.
5. n8n or maintainer records the final URL back into GitHub/audit log.

That keeps the risky part small:

- automation helps with drafting and recordkeeping
- a human still owns the final outward post
- scheduler/API tokens can stay out of scope until the process is stable
