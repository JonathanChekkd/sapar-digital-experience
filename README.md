# SAPAR Digital Experience

A mobile-first, presentation-ready SAPAR concept for combat-sports community, competition, ratings, and gym experiences. The repository contains a public marketing site, an interactive synthetic-data app prototype, a responsible-technology roadmap, and investor presentation downloads.

## What is implemented locally

- 5 public routes: `/`, `/fighters`, `/gyms`, `/vision`, and `/demo`.
- 17 app routes under `/app`: Pulse, Arena, Compete, Competitions, Create, Discover, Gyms, Leaderboards, Network, Notifications, Onboarding, Profile, Quests, Ratings, Replay, Rewards, and Settings.
- 2 read-only prototype endpoints: `GET /api/prototype/health` and `GET /api/prototype/catalog`.
- Interactive local controls for search/filtering, likes, saves, follows, draft creation, registration and booking previews, replay, notifications, leaderboard scopes, settings, and onboarding confirmations.
- A shared reducer/provider keeps transient interactions intact during client-side navigation among `/app` routes. Transient interaction state resets on reload and never crosses devices or users; the settings preference slice may be stored in same-browser `localStorage` when available.
- 100 planned assets in the asset manifest, 36 generated calibration PNGs with provenance sidecars, and 13 unique shipping WebP references checked by repository validation scripts.

## Prototype boundary

Everything rendered by the app and its two local endpoints is typed, synthetic demonstration data. The endpoints are local fixture-service contracts, not production or external APIs.

This repository has no production database, authentication, authorization, payment flow, external service integration, authoritative rating engine, real booking or registration, message delivery, or deployed AI inference. A successful local interaction does not submit, publish, reserve, charge, verify, or modify any real record. Competition outcomes and rating changes remain explicitly human-confirmed concepts.

Names, events, gyms, bouts, records, ratings, activity, achievements, and generated people shown in the prototype are fictional demonstrations. Brand assets were sourced from the public SAPAR site, but public availability does not prove reuse rights. Real testimonial or photographic assets require documented identity, consent, likeness, and usage approval before publication. Generated imagery is documented under `public/generated/` and still requires final brand, legal, and likeness review.

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000/app`.

## Validate

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --omit=dev --audit-level=high
```

`npm test` runs the asset-manifest, calibration/shipping-asset, typed prototype-API, and route/link/asset validators. These checks validate the repository snapshot; they are not production-provider, deployment, or data-service verification.

## Documentation

- [Current state and provenance](docs/CURRENT_STATE_AND_PROVENANCE.md)
- [Product contract](PRODUCT.md)
- [Design system](DESIGN.md)
- [Proposed production architecture](docs/PRODUCTION_ARCHITECTURE.md)
- [Redesign decision log](docs/REDESIGN_DECISION_LOG.md)

## Ownership and review

Built as a working concept for Dauren and the SAPAR team. Final product, safeguarding, rules, data rights, privacy, legal, asset, and brand approvals remain required before production launch. This working tree is local prototype evidence only; it does not claim a commit, push, deployment, or production release.
