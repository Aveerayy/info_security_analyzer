# Demo assets and screenshots

This repo now includes a **built-in demo report** so contributors can generate screenshots locally without API keys, backend setup, or external credentials.

## Fastest local path

1. Install frontend dependencies:

   ```bash
   npm install
   ```

2. Start the frontend:

   ```bash
   npm run dev
   ```

3. Open `http://localhost:5173`
4. Click **Load Demo Report**
5. Capture screenshots of the report UI

This path works entirely from the bundled sample data in `src/aksec/data/kubernetes-security-analysis.ts`.

## Recommended screenshots

For README / launch assets, capture these three views:

1. **Upload view**
   - Show the top header plus the blue “Demo mode available” banner
2. **Full report view**
   - After clicking **Load Demo Report**, capture the summary page with top risks and next steps
3. **Component detail view**
   - Scroll lower in the report and capture component-level findings / STRIDE detail cards

## macOS capture tips

- Full app window: `Shift + Command + 4`, then `Space`
- Area selection: `Shift + Command + 4`
- Save to clipboard: hold `Control` while capturing

## Placeholder asset

Until a real screenshot is added, use:

- `docs/assets/demo-report-placeholder.svg`

This is a lightweight stand-in for README/docs use.

## Best next upgrade

If you want reproducible screenshots in CI later, the most practical next step is:

- add Playwright
- start `npm run dev` in the background
- visit `/`
- click **Load Demo Report**
- save deterministic screenshots into `docs/assets/`

That would turn demo asset generation into a one-command workflow, but the current built-in demo mode already removes the biggest blocker: needing live LLM credentials.
