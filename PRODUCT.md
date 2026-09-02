# SAPAR Digital Experience

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 App Router, React 19, TypeScript, Motion for React, Lucide React, local CSS design tokens, deterministic TypeScript fixtures, and optional local Web Audio. The public presentation contains no backend, production database, authentication, payments, uploads, analytics, or autonomous AI runtime.

## Users

Primary product users are adult Jiu-Jitsu athletes who want to find people and gyms, train, compete, share progress, and understand their development. Secondary users are gym operators, coaches, event organizers, referees, and prospective partners. The immediate website audience also includes investors and combat-sports leaders evaluating the product vision.

All people, gyms, tournaments, bouts, ratings, badges, payments, and statistics in the app prototype are fictional demonstration fixtures. No minor workflow is included.

## Product Purpose

Replace the current SAPAR site with an investor-ready digital experience that makes the company vision understandable in minutes, while providing a clickable app prototype that makes the vision tangible.

The public website should explain a credible platform sequence: community and verified human-entered competition records first; transparent ratings, gym operations, and responsible assistive intelligence on top of trusted data; higher-risk computer-vision scoring only as research and governed pilot work until independently validated.

The app prototype should let a reviewer browse Mat Pulse, inspect a Fighter Card, discover a Tournament, view a Bout Arena, replay a fictional victory, understand separate Rating Lanes, visit a Smart Gym, and explore deterministic achievements. Success means these flows are polished, mobile-first, responsive, keyboard-usable, visually memorable, and visibly labeled as synthetic. It does not imply that the production app, databases, payment rails, rating model, or AI engines already exist.

## Positioning

SAPAR is the connected layer for Jiu-Jitsu: a community surface, a governed competition record, a transparent performance system, and a gym network. Its distinctive experience is “train, connect, compete” made legible and rewarding without confusing belt rank, competitive rating, season points, private XP, badges, or social status.

## Operating Context

- Public, high-trust investor presentation with an urgent two-day polish window.
- Mobile-first use around adult training, open mats, gyms, and fictional competition events.
- Shared brand language across the public website, app prototype, social preview, and future dossier re-skin.
- The website remains broadly understandable to a non-technical audience and uses diagrams, mockups, and direct labels instead of dense technical prose.
- All prototype state changes happen locally through deterministic fixtures and a UI reducer.
- Sound starts muted and requires explicit opt-in.
- Persistent prototype label: “Interactive concept · Synthetic demonstration data · Not an official result or rating.”

## Public Routes

- `/` — premium SAPAR narrative, product ecosystem, proof/vision boundaries, endorsements, and primary calls to action.
- `/fighters` — athlete value proposition and the train-connect-compete journey.
- `/gyms` — gym network, booking, event, and operational value proposition.
- `/vision` — responsible product sequence, data flywheel, and AI feasibility labels in plain language.
- `/demo` — guided investor walkthrough into the clickable app prototype.
- `/app` — Mat Pulse home.
- `/app/profile` — Fighter Passport.
- `/app/competitions` — legacy-compatible Tournament Hub entry.
- `/app/compete` — competition calendar and registration preview.
- `/app/create` — local post, session, result, and event creation previews.
- `/app/discover` — typed fixture search across fighters, gyms, and events.
- `/app/network` — teammates, coaches, rivals, and follow-state controls.
- `/app/arena` — Bout Arena.
- `/app/replay` — verified result and Proof Thread replay.
- `/app/ratings` — Rating Lanes.
- `/app/leaderboards` — transparent synthetic rankings.
- `/app/gyms` — Smart Gym Hub.
- `/app/rewards` — Achievement Vault.
- `/app/quests` — deterministic evidence-based quests.
- `/app/notifications` — local notification states.
- `/app/settings` — privacy, accessibility, blocking, and connectivity states.
- `/app/onboarding` — adult-only role, consent, and privacy preview.

## Capabilities and Constraints

Public capabilities:

- a responsive multi-route marketing experience;
- shared SAPAR navigation, footer, typography, color, motion, and art direction;
- an investor-demo path that reaches a clickable app in one action;
- source-grounded public endorsements copied only from the current SAPAR website;
- plain-language status labels: “Concept,” “In development,” “Pilot candidate,” and “Requires validation”;
- accessible, subtle motion with reduced-motion alternatives;
- SEO, Open Graph, favicon, and social-sharing metadata;
- no invented traction, accuracy, partnership, customer, revenue, or launch claims.

Prototype capabilities:

- seventeen responsive frontend experiences using deterministic synthetic fixtures;
- demo profiles, gyms, events, bouts, versioned results, rating transitions, achievements, and social posts;
- chess-style rating presentation with lane, confidence, peak, eligible-bout count, form, source result, and explanation;
- local interactions for following, saving, reacting, registering, exploring results, and adjusting presentation preferences;
- purposeful motion, deterministic earned celebrations, optional sound cues, reduced-motion behavior, and low-stimulation mode;
- an indexed 100-asset production inventory, with the highest-impact assets generated first rather than falsely claiming that all 100 are finished.
- a read-only same-app prototype health and catalog API that reports its synthetic, database-free operating mode without implying a production backend.

Hard constraints:

- frontend demonstration plus same-app read-only prototype endpoints only; no production backend or relational database in this repo;
- no real authentication, uploads, payments, messages, precise locations, health data, footage, personal data, or external runtime APIs;
- belt is a self-declared demo attribute and never inferred from rating, XP, badges, or payments;
- ratings, rules, results, officials, and leaderboards are demonstrations, not federation approval;
- no claim that autonomous AI judging is accurate, unbiased, production-ready, or deployed;
- no copying UFC trademarks, broadcast graphics, octagon trade dress, fighter likenesses, slogans, or audio; “UFC quality” means premium combat-sports production value, not imitation;
- no blood, injury, unsafe technique instruction, intimidation, minors, loot boxes, random drops, streak loss, fake scarcity, public inactivity, pay-to-win, or humiliation.

## Brand Commitments

Brand name: **SAPAR**.

Preserve the recognizable SAPAR mark, electric cobalt accent, and the “Train. Connect. Compete.” line. The approved “Matchday Passport” direction uses a warm cream ground, a large cobalt Fighter Passport, separate rating lanes, a visible Proof Thread, tactile controls, restrained court-green/earned-amber/coral accents, and photorealistic fictional adults framed by original illustrated topography and brushwork.

The interface should feel elite but welcoming, competitive but not threatening, energetic during earned moments, and calm during consent, safety, financial, and decision-making moments. It may learn from top-tier live-sports production, game UX, and statistical products, but it must remain original and visibly SAPAR.

## Evidence on Hand

- Current public brand and copy reference: `https://saparsport.com`.
- Source-grounded private feasibility report: sibling repo `../bjj-ai-feasibility-report`, release tag `feasibility-report-v1`.
- The private report supplies proposed domain relationships, state machines, rating alternatives, responsible AI boundaries, data-flywheel logic, build order, risk labels, and evidence discipline.
- The report remains private because it contains internal source/security material; the public site may translate conclusions but must not publish private evidence or imply solved technology.

## Product Principles

1. Make the product understandable in 90 seconds and explorable in 10 minutes.
2. Show the record behind every reward: result version, rating lane, model, confidence, and explanation remain accessible.
3. Sequence credibility before spectacle: trusted records before ratings; ratings before automation; assistive AI before autonomous judging claims.
4. Celebrate earned, deterministic milestones without variable-reward compulsion.
5. Keep belt, rating, season points, private XP, badges, social status, and leaderboard position distinct.
6. Use motion to communicate hierarchy and state, never to hide uncertainty or manufacture proof.

## Accessibility & Inclusion

- Target WCAG 2.2 AA contrast and semantic structure.
- Minimum 44×44 interactive targets, visible keyboard focus, and complete keyboard flows.
- Status uses words and icons, never color, sound, or motion alone.
- Charts have direct labels and text equivalents.
- Meaningful imagery has concise alt text; decorative effects are hidden from assistive technology.
- Sound, motion, and haptics are optional and never exclusive carriers of meaning.
- Respect `prefers-reduced-motion`; provide global mute and low-stimulation modes.
- Avoid flashes above three per second and infinite motion behind reading surfaces.
- Fictional adult athletes should reflect varied gender expression, age, body type, ethnicity, and adaptive participation without stereotypes.
