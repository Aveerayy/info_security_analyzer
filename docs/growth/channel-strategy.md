# Channel strategy

This document translates the launch plan into channel-level execution.

## Core principle

Use a **hub-and-spoke** model:

- **Hub:** GitHub repo + README + demo assets + release notes
- **Spokes:** LinkedIn, Telegram, Hacker News, Reddit, X/Bluesky, curated lists

Every external mention should point back to a clear, trustworthy landing surface in the repo.

## Audience-channel fit

| Channel | Best audience | Primary goal | Secondary goal |
|---|---|---|---|
| GitHub README / repo | evaluators, contributors, practitioners | convert visits to stars/issues/tries | establish trust quickly |
| LinkedIn | security professionals, managers, peers | awareness + credibility | drive warm feedback |
| Telegram | early community, direct supporters | feedback loop | announcements |
| Hacker News | builders, OSS enthusiasts, technical skeptics | broad technical discovery | honest product critique |
| Reddit | practitioners in security/devops communities | practical discussion | install feedback |
| X / Bluesky | lightweight awareness | screenshots and product snippets | link amplification |
| Awesome lists / directories | qualified long-tail discovery | durable inbound traffic | ecosystem legitimacy |

## Channel-by-channel plan

## 1) GitHub README and repo

### Purpose

This is the conversion surface. All external traffic eventually lands here.

### What to optimize

- immediate explanation of what the tool does
- visible screenshot or GIF
- honest privacy/limitations summary
- quickstart that works on a clean machine
- demo mode callout for zero-credential evaluation
- clear contributor path

### CTA

- star the repo
- try demo mode
- run Docker quickstart
- open an issue with setup pain or missed findings

### Cadence

- update whenever launch feedback repeats 2+ times
- treat README as a product surface, not static documentation

## 2) LinkedIn

### Purpose

Reach security professionals who may use or share the project in their teams.

### Message style

- practical, clear, and not hypey
- focus on workflow pain: threat modeling is important but often skipped because it is slow
- emphasize “assistant for first drafts,” not “AI replaces security review”

### Recommended posts

1. **Launch post**
   - what it does
   - who it is for
   - demo/screenshot
   - GitHub link
2. **Behind-the-build post**
   - why the tool exists
   - what was hard
   - privacy/trust decisions
3. **Follow-up post**
   - lessons from early users
   - new fixes or release improvements

### Cadence

- week 2 soft launch
- week 3 public launch
- week 4 lessons / improvements post

## 3) Telegram community

### Purpose

Fast feedback, lightweight announcements, and a direct line to early adopters.

### Message style

- informal but useful
- ask concrete questions
- give people one thing to try

### Good uses

- announce releases
- ask for feedback on setup friction
- share screenshots and short demos
- recruit a few people to test specific flows

### Avoid

- dumping every minor commit
- vague asks like “thoughts?” without context

### Cadence

- 1 launch announcement
- 1 mid-month request for tester feedback
- 1 post-launch recap or release note

## 4) Hacker News (Show HN)

### Purpose

Get sharp technical feedback and broad discovery from builders.

### Best angle

- open source technical tool solving a real workflow problem
- clear admission of limitations
- easy demo path

### Post ingredients

- plain title
- one or two screenshots or a GIF in the linked repo/docs if possible
- first comment from maintainer covering:
  - intended audience
  - privacy boundary
  - how demo mode works
  - what feedback is most helpful

### Guardrails

- only post when README is strong and launch assets are ready
- be responsive to skeptical comments without defensiveness

## 5) Reddit

### Purpose

Reach practitioners who care about workflows and tools.

### Likely fit

- security engineering
- devsecops
- cloud security
- software architecture communities that allow OSS/tool posts

### Post style

- lead with the problem and workflow
- give enough technical substance
- mention limitations upfront
- comply with self-promo rules

### Guardrails

- do not blast multiple subreddits in one day
- skip communities where self-promo is poorly received unless explicitly allowed

## 6) X / Bluesky

### Purpose

Support launch amplification with short, visual posts.

### Best content types

- one clear screenshot + one-line problem statement
- short thread with 3 bullets: what it does, why it exists, how to try it
- launch clip/GIF

### Cadence

- 2–3 posts max during launch month unless one takes off

## 7) Awesome lists and directories

### Purpose

Generate durable, qualified discovery over time.

### Requirements before outreach

- strong README
- screenshot/demo proof
- working install instructions
- clear license and security disclosure path

### Suggested targets

- threat-modeling lists
- devsecops/security tooling lists
- AI-for-security lists if they are curated and credible

---

## Reusable launch funnel

Use this simple path across channels:

1. **Attention:** screenshot, GIF, or sharp problem statement
2. **Interest:** explain how diagrams become draft STRIDE findings
3. **Trust:** mention privacy boundaries and human-review requirement
4. **Action:** point to demo mode or Docker quickstart
5. **Retention:** invite issue/discussion feedback and roadmap input

## Messaging guardrails by channel

| Do | Avoid |
|---|---|
| say “draft findings” | say “fully automated threat model” |
| show demo mode | force credential setup before value |
| acknowledge limitations | imply comprehensive coverage |
| ask for practical feedback | ask for generic engagement |
| post in channels where security practitioners already gather | broad AI hype farming |

## Minimal operating rhythm

If maintainer time is limited, do this and skip the rest:

1. polish README and assets
2. soft launch on LinkedIn + Telegram
3. public launch on one high-signal channel (Hacker News or a strong Reddit community)
4. collect objections and convert them into docs/product fixes
5. publish a small release with launch-week improvements
