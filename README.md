# SAPAR Digital Experience

A public, presentation-ready concept for SAPAR: a combat-sports community, competition, ratings, and smart-gym platform. The repository contains the marketing website, an interactive frontend prototype, a staged AI/build roadmap, and an investor presentation package.

## What is included

- Premium SAPAR marketing site
- Clickable athlete app prototype
- Profiles, competitions, gyms, replay, ratings, rewards, and arena views
- Plain-language build phases and AI feasibility gates
- Downloadable investor deck in PowerPoint and PDF formats
- Synthetic key art with documented provenance

## Important prototype boundaries

- This is a frontend prototype; it is not connected to a production database or payment system.
- Competition outcomes and rating changes are explicitly human-confirmed.
- Body tracking, technique recognition, and autonomous scoring are research-stage capabilities, not shipped product claims.
- Names, events, gyms, records, ratings, and activity shown in the app are synthetic demonstration data.
- SAPAR brand assets were sourced from the current public SAPAR website. Generated imagery is documented in `public/generated/PROVENANCE.md`.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Verify

```bash
npm run lint
npm run build
npm audit --omit=dev
```

## Presentation routes

- `/` — public homepage
- `/demo` — investor demo hub and downloads
- `/vision` — phased product and AI roadmap
- `/app` — athlete home
- `/app/competitions` — event discovery and prototype registration
- `/app/replay` — human-confirmed match replay
- `/app/ratings` — transparent rating view
- `/app/gyms` — smart-gym discovery
- `/app/rewards` — progression and rewards

## Ownership and review

Built as a working concept for Dauren and the SAPAR team. Final product, legal, safeguarding, rules, data rights, and brand approvals remain required before production launch.
