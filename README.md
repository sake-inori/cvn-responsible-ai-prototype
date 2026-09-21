# Responsible Use of AI in the Workplace

A local-only React + TypeScript + Vite prototype for a Columbia Video Network instructional design interview. It contains an eight-stage asynchronous learning flow, simulated rubric feedback, revision and expert comparison, contextual practice, a downloadable STOP job aid, an action-plan generator, a personalized completion review, progress tracking, a design-rationale introduction, presentation-friendly skip navigation, and a one-click demo reset.

## Run locally

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite (normally `http://127.0.0.1:5173/`).

For a production build:

```bash
pnpm build
pnpm preview
```

## Key files

- `public/columbia-engineering-logo.png` — replace this file with the official logo if needed. Keep the filename unchanged. The UI includes a text fallback if the file is unavailable.
- `src/data/courseContent.ts` — screen names, objectives, STOP content, video transcript, expert responses, and the project’s design rationale.
- `src/lib/feedback.ts` — deterministic keyword detection and simulated rubric feedback. No API or external service is used.
- `src/App.tsx` — the eight-screen learner flow, presentation navigation, and all interaction state.
- `src/styles.css` — responsive Columbia-inspired visual design.

## Adding OpenAI later

Keep the current rubric as the reliable fallback. Add a small server-side endpoint that sends the learner response, scenario, STOP criteria, and a strict structured-output schema to the OpenAI Responses API. Validate the returned fields before displaying them, avoid sending restricted workplace data, disclose that feedback is AI-generated, and never put an API key in this client-side Vite app.
