# Progress tracker

## Completed

- Cloned and inspected repository structure
- Compared repo state against growth/trust goals
- Added `SECURITY.md`
- Added `CONTRIBUTING.md`
- Drafted a stronger README focused on trust, quickstart, and positioning
- Added a built-in demo report path in the UI for screenshot capture without API keys
- Added demo asset docs and an SVG placeholder under `docs/assets/`

## Next

- tighten privacy and data-flow language further if maintainers want exact guarantees
- add screenshot/GIF and a sample report under `docs/`
- verify Docker quickstart on a clean machine/session
- add labels / release hygiene / issue templates on GitHub

## Risks / observations

- UI API key persistence was removed; keys are now kept only in memory for the current tab session
- backend source currently contains Azure default endpoint placeholders and legacy fallback behavior worth reviewing
- public trust surface is weaker than the product surface right now

## Need from maintainer

- preferred private security contact/disclosure channel
- whether browser local-storage API key behavior should stay as-is
- whether there is a sample report or screenshot we can publish
