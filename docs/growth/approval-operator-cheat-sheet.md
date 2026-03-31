# Approval operator cheat sheet

Use this on launch day when the GitHub -> n8n -> Telegram approval loop is live.

**Operating mode:** draft automatically, approve explicitly, publish manually.

If anything feels ambiguous, **fail closed**:
- no auto-publish
- no timeout approval
- no material edits after approval
- no posting from stale or incomplete drafts

For deeper reference, use [`approval-workflow-assets.md`](./approval-workflow-assets.md).

---

## 1) Pre-flight: check this before processing requests

- [ ] Telegram approval requests are landing in the correct private chat
- [ ] you are an allowlisted approver
- [ ] the destination channel/account is accessible for manual posting
- [ ] the source repo link opens and matches a real event
- [ ] referenced screenshots/assets are current and safe to publish

If any box fails: **pause the workflow and fix the plumbing first.**

---

## 2) Intake gate: only review allowed events

Only consider approval if the event is one of these:
- published release
- merged PR labeled `announce`, `share`, or `launch-note`
- issue labeled `share` or `launch-note`

Hard stop / reject if:
- `do-not-amplify` is present
- event came from a fork or untrusted mirror
- proof depends on untrusted public comments or scraped content
- the request is missing core context and cannot be safely inferred

Every request should include:
- request ID
- event type
- source URL
- channels requested
- why now
- primary proof link
- asset reference
- risk notes
- draft text

If it is fixable but incomplete: **Revise**.

---

## 3) 60-second approval test

Approve only if all four are true:

- [ ] **Accurate** — claims match the linked release / PR / issue
- [ ] **Safe** — no secrets, private URLs, or overclaimed trust language
- [ ] **Worth sharing now** — real signal, not internal noise
- [ ] **Understandable** — makes sense without extra maintainer explanation

If any are false:
- **Revise** = worth sharing, but needs changes
- **Reject** = should not be promoted

---

## 4) Fast review checklist

### Accuracy
- [ ] event is real and linked
- [ ] main claim is supported by source material
- [ ] repo names, links, filenames, and channel targets look correct

### Trust / security
- [ ] no secrets, internal screenshots, or private endpoints
- [ ] no implication of certification, audit, or authoritative security truth
- [ ] trust/privacy wording matches repo docs
- [ ] output is framed as assistive draft generation for human review

### Channel fit
- [ ] requested channels make sense for this event
- [ ] copy length fits the destination
- [ ] CTA is practical: try it, star it, read docs, give feedback
- [ ] if uncertain, narrow to Telegram-only

---

## 5) Decision actions

## Approve

Use when the draft is accurate, safe, current, and channel-fit.

Steps:
1. confirm the exact draft version in Telegram
2. confirm approved channels explicitly
3. press **Approve**
4. treat the approved draft as frozen
5. post manually with no material edits
6. record final public URL(s)

## Revise

Use when the event is valid but the draft is not ready.

Good revision notes are short and concrete:
- tighten privacy wording
- Telegram only, not LinkedIn
- asset is stale; resend with current screenshot
- link release notes, not repo root
- remove implication of automated security truth

## Reject

Use when the request should die, not loop.

Common reasons:
- low-signal internal change
- unsupported claims
- stale/private/unsafe asset
- wrong timing or wrong channel
- blocker from `posting-signals.md`

---

## 6) Manual posting rules

### Allowed without re-approval
- formatting cleanup
- line breaks / bullets
- trimming for character limits without changing claims
- removing hashtags
- swapping equivalent approved URLs

### Requires fresh approval
- changing the claim set
- changing trust/privacy wording
- changing channel mix
- adding new proof points
- adding third-party praise/adoption language
- replacing the approved asset with a meaningfully different one

If it changes meaning, **re-approve it**.

---

## 7) After posting: close the loop

- [ ] capture final public URL
- [ ] confirm the post is visible as intended
- [ ] update audit record / write-back
- [ ] note any template or workflow friction

Minimum audit fields to keep:
- request ID
- decision
- approver
- timestamp
- approved channels
- final URL(s) if published

---

## 8) Timeout / failure rules

If a request expires or sits too long:
- do not infer approval
- close it as expired
- issue a fresh request ID before continuing

Pause the workflow immediately if:
- requests land in the wrong chat
- non-allowlisted users can approve
- drafts contain secrets, private screenshots, or broken links
- logs are capturing sensitive data
- the system starts treating untrusted input as proof

Shutdown order:
1. stop manual posting
2. disable n8n continuation/publish steps
3. rotate Telegram bot token if compromise is suspected
4. review and close ambiguous pending items

---

## 9) Shortest correct operator flow

1. receive Telegram approval request
2. verify event, proof, channels, asset, and risk notes
3. run the 60-second approval test
4. choose **Approve / Revise / Reject**
5. if approved, post manually with no material edits
6. record final URL and outcome

If the process stops being boring, it is not ready for more automation.
