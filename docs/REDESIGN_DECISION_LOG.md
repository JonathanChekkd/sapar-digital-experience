# SAPAR App Redesign Decision Log

## Understanding lock

- Build an original, mobile-first adult Jiu-Jitsu social competition prototype rather than reformatting an existing BJJ portal.
- Make SAPAR's differentiator visible: portable athlete identity, governed human-confirmed records, separate explainable Gi and No-Gi ratings, gym-centered communities, and evidence-linked progression.
- Preserve the SAPAR name, mark, cobalt signal color, and `Train. Connect. Compete.` commitment while replacing the existing white-dashboard app treatment.
- Keep the implementation honest: deterministic synthetic fixtures and local mock-service boundaries only; no production API, authentication, database, payment, upload, or autonomous scoring claims.
- Use ethical, deterministic progression. Competitive rating never changes because of XP, purchases, badges, belt, followers, or gym status.
- Make every visible control work locally, navigate to a real surface, or remain clearly disabled with a reason.
- Validate mobile first, then tablet and desktop, including keyboard focus, reduced motion, low-stimulation mode, and browser/console behavior.

The supplied master prompt plus the explicit instruction to run the implementation through completion are the confirmed understanding lock and implementation handoff.

## Assumptions

- This run is authorized for local repository changes and local validation only. It does not authorize a commit, push, pull request, deployment, provider mutation, or production data change.
- All named athletes, gyms, events, results, ratings, schedules, social activity, fees, and availability in the prototype are fictional demonstration fixtures.
- `invest.sapar.club` is not reused unless ownership and access are separately confirmed. No authenticated or private content is required for this build.
- The public SAPAR site is an ownership and brand-reference boundary, not a source of runtime data.
- Jits.gg and other named products are market/pattern references only. Their copy, data, assets, formulae, layouts, and trade dress are excluded.
- The generated calibration comps are design references. Core UI text, controls, and semantics remain real HTML/CSS/React.

## Direction candidates

1. **Matline Atlas** — a living proof map connecting athlete, gym, event, result, correction history, and rating change.
2. **Dojo Circuit** — gym squads and seasons presented as an adult competitive clubhouse.
3. **Fight Passport** — portable identity, evidence stamps, and separate rating lanes.
4. **Open Mat City** — discovery-first neighborhoods of gyms, open mats, coaches, and events.
5. **Corner Console** — tactile illuminated fight-corner instruments and explicit state feedback.
6. **Broadcast Chronicle** — live-sport recaps and disciplined evidence telemetry.
7. **Patch Cabinet** — woven earned achievements with attached proof.

The category-default portal/dashboard and its predictable opposite, a dark neon game HUD, were excluded as ruts.

## Selected direction

**Mat Atlas Leaguehouse**, with the portable Fighter Passport as the approved first-viewport composition.

The approved comp is [matchday-passport-pulse.png](../.impeccable/mocks/matchday-passport-pulse.png). It combines:

- Fight Passport's portable identity and clearly separate Gi/No-Gi lanes;
- Matline Atlas's evidence-linked **Proof Thread** interaction; and
- Dojo Circuit's social warmth, gym community, and optimistic daylight color.

Two composition alternates remain as non-approved references:

- [mat-atlas-pulse.png](../.impeccable/mocks/mat-atlas-pulse.png)
- [league-clubhouse-pulse.png](../.impeccable/mocks/league-clubhouse-pulse.png)

## Direction contract

- **Thesis:** SAPAR is the portable identity and evidence layer between every mat; it refuses the generic BJJ stats dashboard.
- **Own world:** cream reading ground, dominant cobalt identity fields, court green verification, amber evidence, coral social energy, charcoal ink, illustrated adults, stitched seals, and physically layered controls.
- **Story:** see who you are, trace what happened, understand why it changed, then train or compete with your community.
- **First viewport:** compact SAPAR header, portable Fighter Passport, separate rating lanes, Proof Thread, then community activity; primary Create control is anchored in the five-tab bottom navigation.
- **Form:** mobile social atlas; selected from the grounded list after Impeccable seed `9c3a3594` and the brief-pinned direction override.
- **Finish:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.

## Visual tokens

| Role | Token | Use |
|---|---|---|
| App ground | `#FDF9F3` | Warm cream reading surface sampled from the approved comp |
| Identity | `#003CCA` | Dominant cobalt passport and primary action field sampled from the approved comp |
| Deep identity | `#0A1B4D` | Rating ledgers, evidence depth, dark mode regions |
| Verified | `#248A57` | Human-confirmed or successful state only |
| Earned | `#F6B21A` | Deterministic progress and rating explanation |
| Social | `#F36B5F` | Community activity and non-critical warmth |
| Ink | `#182035` | Primary text and control outlines |
| Muted ink | `#626A79` | Secondary copy at AA contrast |

The UI uses Manrope as the workhorse face and Space Grotesk only for compact identity/display moments already bundled in the project. Structural radii stay within 12–16px; full pills are limited to status and compact filters.

## Signature interaction

**Proof Thread:** activating a verified result reveals a short, keyboard-operable evidence path from authority to result version, correction status, rating event, and plain-language reason. It is a product mechanism, not decorative animation. Reduced-motion and low-stimulation modes reveal the same information without travel, glow, particles, or sound.

## Decision log

| Decision | Alternatives considered | Reason |
|---|---|---|
| Portable passport + proof thread | generic feed hero, dark arena dashboard, map-only home | It proves identity, trust, and explainability in one viewport. |
| Bright cream/cobalt world | existing white dashboard, near-black neon HUD | Better daily-use legibility and a clearer break from the current app treatment. |
| Five canonical tabs | eight feature-first tabs | Pulse, Compete, Create, Discover, and Profile match familiar mobile mental models without copying another product. |
| Deterministic local reducer | fake API, hard-coded inert controls | Preserves prototype honesty while making interactions testable. |
| Native dialog/bottom-sheet semantics | decorative overlay divs | Better keyboard, focus, Escape, and screen-reader behavior. |
| Original generated raster calibration + code-native UI | screenshot slicing or competitor assets | Keeps the product original, responsive, accessible, and provenance-tracked. |

## Non-functional defaults

- Phone-first layout at 390×844; structural tablet and desktop adaptations.
- WCAG 2.2 AA contrast, 44×44px targets, visible focus, semantic controls, and text equivalents for charts and proof motion.
- Local state only, resilient to refresh where appropriate through guarded local storage.
- No runtime external API calls in the prototype; deterministic mock latency and error/offline states are available for validation.
- Production target remains a proposed modular monolith with Postgres, object storage/CDN, background jobs, audit trails, observability, and reversible migrations, documented separately.
