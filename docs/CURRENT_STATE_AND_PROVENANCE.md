# Current State and Provenance

Status: local working-tree evidence record
Snapshot date: 2026-09-02
Scope: this repository only; no production provider, database, or deployment state was inspected

## Reading this document

- **Shipped prototype** means code or an asset exists in this working tree and can be exercised locally.
- **Local prototype API** means a read-only route handler returns typed synthetic fixtures. It does not mean a production or external service exists.
- **Proposed production** means a target capability is described but is not implemented here.

All people, gyms, tournaments, bouts, ratings, records, activity, achievements, and responses rendered by the prototype are synthetic demonstration fixtures. They are not production records, federation decisions, customer data, or evidence of a deployed rating or AI system.

The executable source is authoritative for current behavior. [PRODUCT.md](../PRODUCT.md) and [DESIGN.md](../DESIGN.md) state intent; where they differ from source, the source wins for this record.

## Implemented surface

The working tree contains 22 UI routes and 2 local GET endpoints.

### Public routes (5)

| Route | Purpose |
| --- | --- |
| `/` | Public product overview |
| `/fighters` | Fighter-focused value proposition |
| `/gyms` | Gym-focused value proposition |
| `/vision` | Responsible product and technology roadmap |
| `/demo` | Investor walkthrough and local downloads |

### App routes (17)

| Route | Local prototype capability |
| --- | --- |
| `/app` | Dominant Fighter Passport, immediate Proof Thread, Gym Community rail, recent activity, session card, and social actions |
| `/app/arena` | Synthetic verified-result and bout timeline view |
| `/app/compete` | Competition detail and registration-preview flow |
| `/app/competitions` | Searchable/filterable event discovery |
| `/app/create` | Local draft composer |
| `/app/discover` | Search and discovery surfaces |
| `/app/gyms` | Gym discovery, schedule selection, and booking preview |
| `/app/leaderboards` | Distinct season and squad ranking scopes |
| `/app/network` | Synthetic athlete network and follow actions |
| `/app/notifications` | Local read/unread notification state |
| `/app/onboarding` | Adult and synthetic-profile confirmation preview |
| `/app/profile` | Synthetic athlete passport, rating, record, and proof |
| `/app/quests` | Private progression and quest presentation |
| `/app/ratings` | Separate Gi and No-Gi rating explanations |
| `/app/replay` | Deterministic local replay controls |
| `/app/rewards` | Private journey, XP, and milestone presentation |
| `/app/settings` | Local prototype preferences and connectivity simulation |

### Local prototype API (2)

| Method and route | Current behavior |
| --- | --- |
| `GET /api/prototype/health` | Returns the local fixture-service health contract |
| `GET /api/prototype/catalog` | Returns a typed catalog assembled from synthetic fixtures |

The endpoints are read-only, execute inside the frontend runtime, and have no database or external-service dependency. They exist to make the prototype's UI/API boundary testable without implying a production backend.

## Runtime, data, and state

| Concern | Current evidence | Conclusion |
| --- | --- | --- |
| Web runtime | `next`, React, Vinext, and Vite in [package.json](../package.json) | Local Next.js App Router prototype compiled through Vinext/Vite |
| Styling and motion | [app/globals.css](../app/globals.css), [app/sapar-app.css](../app/sapar-app.css), Fontsource, Motion, and reduced-motion handling | Custom mobile-first visual system; presentation motion only |
| Typed fixtures | [lib/sapar-prototype.ts](../lib/sapar-prototype.ts) and [lib/sapar-prototype-api.ts](../lib/sapar-prototype-api.ts) | Synthetic in-repository data; no authoritative domain records |
| Shared interaction state | [components/sapar-app/state.tsx](../components/sapar-app/state.tsx) mounted by [app/app/layout.tsx](../app/app/layout.tsx) | Reducer/provider state survives client-side navigation among app routes |
| Persistence | Reducer state plus same-browser preference storage | Likes, saves, follows, previews, and read state reset on reload; preferences may persist in local storage; nothing crosses browsers, devices, users, or a server |
| Local bindings | `.openai/hosting.json` has no enabled D1 or R2 binding | No database or object-storage connection in this snapshot |

Implemented controls include navigation, mobile drawers, search/filtering, likes, saves, follows, share/report sheets, draft creation, registration and booking previews, replay advancement, notification read state, leaderboard scopes, settings, and onboarding confirmations. Their copy and feedback explicitly describe local behavior. No action publishes, books, registers, verifies, charges, or sends real data.

## Validation surface

[package.json](../package.json) defines lint, strict typecheck, build, and test scripts. `npm test` runs:

- `scripts/validate-asset-manifest.mjs` for the 100-entry planned-asset manifest;
- `scripts/validate-calibration-assets.mjs` for generated calibration sources, dimensions, prompt/JSON sidecars, and shipping references;
- `scripts/validate-prototype-api.mjs` for typed health and catalog response builders;
- `scripts/validate-routes-and-assets.mjs` for route destinations, links, and public assets.

The checked asset inventory is 100 planned manifest entries, 36 generated calibration PNGs, and 13 unique shipping WebP references. These are repository checks, not legal clearance or production monitoring.

## Absent production capabilities

The table records absence from this repository, not absence from every SAPAR system or provider account.

| Capability | Current status |
| --- | --- |
| Production/external API | **Not shipped.** The two `/api/prototype/*` handlers only expose local synthetic fixtures. |
| Production database or ORM | **Not shipped.** No authoritative or durable server-side records exist. |
| Authentication, sessions, or authorization | **Not shipped.** There are no accounts, roles, tenant policies, or row-level access controls. |
| Payments | **Not shipped.** No checkout, charge, refund, or webhook flow exists. |
| Real booking or competition registration | **Not shipped.** Buttons save local previews only. |
| Production rating engine | **Not shipped.** Ratings and explanations are demonstration fixtures, not official calculations. |
| AI inference or automated scoring | **Not shipped.** Technology appears in roadmap copy only. |
| Media upload/processing | **Not shipped.** Images are repository-hosted static files. |
| Email, push, or real-time messaging | **Not shipped.** Notifications are local fixtures. |
| Analytics, telemetry, queues, or workers | **Not shipped.** No production operations pipeline exists. |
| Cross-device persistence | **Not shipped.** No server receives prototype state. |

## Asset ownership and provenance

Repository inclusion is not evidence of legal ownership or publication clearance.

| Asset group | Evidence available | Approval boundary |
| --- | --- | --- |
| SAPAR marks and original-site captures | Repository files and the README source statement | Original URL, capture date, rights holder, and written reuse approval are incomplete |
| Testimonial or real-person photography | Repository files only | Identity, consent, likeness, source, and usage rights must be documented before publication; do not assume clearance |
| Generated calibration imagery | PNGs, prompt files, metadata sidecars, manifest entries, and validation scripts | Technical provenance exists; final brand, legal, safeguarding, and likeness approval is still required |
| Shipping WebP derivatives | Adjacent metadata sidecars and source-dimension validation | Optimization does not change the underlying rights-review requirement |
| Investor deck downloads | Repository files and route links | Author, source-material rights, embedded-asset rights, approval date, and distribution classification remain unrecorded |
| Fonts and icons | Package and lockfile metadata | Confirm licenses and attribution requirements during release review |
| Synthetic app content | Typed fixtures and visible prototype labels | Must remain unmistakably synthetic and must never be migrated into production records |

Generated adults are fictional visual demonstrations, not photographs of actual SAPAR members or evidence of real competition participation. Any future use of actual people requires specific, documented consent and photo/likeness rights.

## Current gaps and risks

1. **No trust boundary exists.** Authentication, authorization, tenant scoping, consent evidence, audit, safeguarding, and privacy controls must precede real-user data.
2. **No authoritative workflow exists.** Production verification, results, corrections, disputes, ratings, booking, and registration require named authorities and immutable history.
3. **Local APIs are not production services.** They have no persistence, identity, policy enforcement, external integrations, provider monitoring, or recovery contract.
4. **Asset clearance is incomplete.** Public-source brand, testimonial, and photographic assets need a rights-and-consent register before publication.
5. **Prototype validation is bounded.** Repository scripts catch code, route, fixture-contract, and asset-reference regressions; they do not prove provider, legal, model, or production readiness.

## Production handoff boundary

Nothing in this document authorizes collection of personal data, a commit, push, deployment, publication, provider change, database creation, migration, or release. [PRODUCTION_ARCHITECTURE.md](./PRODUCTION_ARCHITECTURE.md) remains a target design, not evidence that its production capabilities exist.
