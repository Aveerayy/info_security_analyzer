# Posting signals

This file defines which repo events are allowed to create **marketing draft content** for `info_security_analyzer`.

The default rule is simple:

> **No event may publish automatically. Allowed events may create drafts only. Human approval is always required.**

## Allowed draft triggers

## 1) Release published

Allowed when:

- the release is published intentionally
- release notes exist or can be linked
- linked assets/screenshots are safe to share

Typical output:

- release announcement draft
- "what changed" draft
- Telegram/community update draft

## 2) PR merged with promotion label

Allowed labels:

- `announce`
- `share`
- `launch-note`

Allowed when:

- the PR is merged
- the change is visible and meaningful to users or contributors
- the PR does not carry `do-not-amplify`

Typical output:

- short dev update draft
- screenshot/demo refresh draft

## 3) Issue manually labeled for promotion

Allowed labels:

- `share`
- `launch-note`

Use for:

- demo/report asset refreshes
- contributor-friendly milestones
- docs improvements worth sharing
- manual campaign requests from maintainers

Typical output:

- draft copy request sent to approval queue

---

## Events that should not trigger drafts

Do **not** draft automatically from:

- every merged PR
- every closed issue
- issue comments from the public
- social mentions or replies
- scraped web content
- dependency update churn
- CI status changes alone

These may be useful inputs for humans, but they are not trusted enough to drive outbound content by default.

---

## Hard blockers

Never create a draft when any of these are true:

- `do-not-amplify` label is present
- screenshots/assets are not redacted or not current
- README/demo path is materially broken
- the event would force unsupported claims
- the content depends on unverified third-party feedback

---

## Required fields for a draft request

Every draft request should include:

- event URL
- event type
- target audience
- primary repo link target
- supporting proof links
- asset reference if used
- requested channels
- reason this is worth sharing now

If any required field is missing, the workflow should stop and ask for maintainer input.

---

## Channel defaults

Use these defaults unless the approver overrides them.

| Event type | Default channels | Notes |
|---|---|---|
| Release | Telegram, LinkedIn | manual public launch channels separately |
| Meaningful user-facing PR | Telegram | promote outward only if the change is easy to explain |
| Docs/trust improvement | Telegram, LinkedIn optional | good for credibility posts, not hype |
| Asset/demo refresh | Telegram, X/Bluesky optional | visual channels only if the asset is strong |

---

## Review rule

If there is any doubt whether an event is worth sharing, treat it as:

- **internal signal only**, or
- **draft for Telegram approval only**, not broad external posting

That bias keeps the project from drifting into noisy autopromotion.
