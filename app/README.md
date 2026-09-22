# Pathwise Go — Prototype

This is a **UI-only, click-through prototype** of the Pathwise Go flow
(everyday route intelligence). It exists to validate the product concept
described in the repo's [`docs/`](../docs) folder, not to be a production
application.

## What this is

- A fully static React + Vite + Tailwind app.
- All route data is **hardcoded** in [`src/data/dummy-data.ts`](src/data/dummy-data.ts)
  — three canned scenarios, each with a route, a "why this route?" factor
  list, and a pre-built alternative route with its own factors and time
  delta.
- The "search" screen doesn't do real geocoding — picking a scenario from the
  dropdown just swaps in the corresponding canned data so the rest of the
  flow can be demoed without typing.

## What this is NOT

- No backend, server, or database.
- No real mapping, routing, geocoding, or transit APIs.
- No real safety/incident data — all "route considerations" are illustrative
  placeholder text meant to show the *shape* of what Pathwise would
  eventually explain, not real claims about any real address.
- No persistence — "Save report" is a UI-only success state; nothing is
  written anywhere and it resets on refresh.

## Screens / states

1. **Search** — From/To/date-time/mode, prefilled from a selected demo
   scenario, with a "Check my route" button.
2. **Route report** — distance/time summary, a segmented concern bar
   (green/amber/orange), and a "Why this route?" factor list.
3. **Alternative route** — a comparison view (time delta + tradeoffs vs. the
   original), toggleable back to the original route.
4. **Saved confirmation** — a simple success state after clicking "Save
   report."

## Running locally

```bash
cd app
npm install
npm run dev
```

Then open the local URL Vite prints (defaults to http://localhost:5173).

## Scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — type-check and build a static production bundle
- `npm run lint` — run oxlint
