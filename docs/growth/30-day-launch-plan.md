# 30-day launch plan

A lightweight launch plan for **Info Security Analyzer** focused on trust, proof, and contributor momentum.

For the concrete launch-week sequence, use [`7-day-execution-plan.md`](./7-day-execution-plan.md) as the operating document. This file stays focused on 30-day pacing; the 7-day plan handles day-by-day execution, owners, inputs, publishing order, and launch gates.

## Goals

By day 30, aim for:

- a README that gets people to value fast
- a stable demo path with no credentials required
- a few public proof points: screenshots, sample report, or short demo clips
- clear contribution paths for docs, UX, and backend improvements
- a repeatable cadence for sharing updates without overhyping the project

## Week 1 — foundation and trust

**Primary objective:** make the repo feel safe and understandable on first visit.

Checklist:

- [ ] verify README quickstart still matches reality
- [ ] keep `SECURITY.md`, `CONTRIBUTING.md`, and issue templates aligned
- [ ] make sure the demo report path is obvious and works without API keys
- [ ] capture 1-2 current screenshots or short GIFs for repo/social reuse
- [ ] confirm smoke test / CI path is green

Success signal:

- a new visitor can understand what the tool does, how data flows, and how to try it in under 2 minutes

## Week 2 — show the product quickly

**Primary objective:** convert curiosity into first-run success.

Checklist:

- [ ] publish a short demo post with screenshots/GIFs
- [ ] add or refresh a redacted sample report if the UI changed materially
- [ ] tighten copy around "assistive, not authoritative" analysis
- [ ] document one realistic use case: architecture review before design sign-off, secure design review, etc.

Success signal:

- people can see output quality before installing anything

## Week 3 — invite contribution and feedback

**Primary objective:** lower the barrier for outside participation.

Checklist:

- [ ] label a few issues as good first issues
- [ ] open at least 2 docs/onboarding improvements that outsiders could realistically help with
- [ ] create one backend-focused and one frontend-focused starter issue
- [ ] keep PR expectations small and explicit

Success signal:

- contributors can identify a safe, bounded first change without asking for hidden context

## Week 4 — iterate from signals

**Primary objective:** refine based on what visitors actually struggle with.

Checklist:

- [ ] review incoming issues and questions for repeated setup pain
- [ ] update README / quickstart based on real friction points
- [ ] summarize what changed in `CHANGELOG.md`
- [ ] prepare a small release/tag if the repo state is materially better than launch week

Success signal:

- docs reflect actual user questions instead of guesswork

## Metrics to watch

Keep this simple. Useful early signals:

- GitHub stars
- unique contributors / first PRs
- issue quality (clear bug reports vs confused setup reports)
- demo-report usage or mentions in feedback
- repeat visitors / return feedback from the same people

## Guardrails

- do not promise complete threat coverage
- do not encourage people to upload highly sensitive diagrams without understanding provider/data flow implications
- do not post screenshots containing secrets, internal hostnames, or customer details
- prefer one high-quality artifact over many rushed ones
