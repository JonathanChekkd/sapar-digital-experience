---
name: SAPAR Matchday Fighter World
description: A cartoon-first mobile fighting world built around an adult Jiu-Jitsu passport, social competition, deterministic progress, and proof.
colors:
  cobalt: "#003CCA"
  cobalt-dark: "#082A87"
  cobalt-soft: "#E7EDFF"
  cream: "#FDF9F3"
  white: "#FFFFFF"
  verified: "#248A57"
  verified-soft: "#E8F6EE"
  earned: "#F6B21A"
  earned-soft: "#FFF3CE"
  social: "#F36B5F"
  social-soft: "#FFEBE8"
  social-ink: "#321714"
  social-edge: "#BA493F"
  social-shadow: "#9D3C34"
  earned-ink: "#755200"
  earned-shadow: "#A97405"
  verified-ink: "#17673E"
  profile: "#7040D8"
  profile-soft: "#F1EAFF"
  profile-ink: "#3F247F"
  profile-shadow: "#5630A8"
  neutral-ink: "#4C5567"
  neutral-soft: "#F0F1F3"
  on-dark-muted: "#D9E2F3"
  electric: "#1F6BFF"
  strike: "#FF5A51"
  champion: "#FFBD22"
  aura: "#16C7D9"
  violet: "#7D4EE8"
  ink: "#182035"
  muted: "#646D7F"
  line: "#DCD9D3"
  line-strong: "#B9BEC8"
  danger: "#A83243"
typography:
  display:
    fontFamily: '"Space Grotesk Variable", "Arial Narrow", sans-serif'
    fontSize: "clamp(30px, 9vw, 56px)"
    fontWeight: 760
    lineHeight: 0.98
    letterSpacing: "-0.055em"
  identity:
    fontFamily: '"Barlow Condensed", "Space Grotesk Variable", sans-serif'
    fontSize: "clamp(42px, 12.5vw, 108px)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Space Grotesk Variable", "Arial Narrow", sans-serif'
    fontSize: "21px"
    fontWeight: 740
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  body:
    fontFamily: '"Manrope Variable", Inter, system-ui, sans-serif'
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: '"Manrope Variable", Inter, system-ui, sans-serif'
    fontSize: "11px"
    fontWeight: 850
    lineHeight: 1.25
    letterSpacing: "0.045em"
rounded:
  micro: "6px"
  tag: "8px"
  control: "12px"
  field: "13px"
  tactile: "15px 9px 15px 9px"
  surface: "16px"
  docket: "18px"
  sheet: "18px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "28px"
  section: "32px"
components:
  button-primary:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "46px"
  button-secondary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 16px"
    height: "46px"
  search-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 15px"
    height: "54px"
  status-verified:
    backgroundColor: "{colors.verified-soft}"
    textColor: "{colors.verified}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
    height: "28px"
  status-earned:
    backgroundColor: "{colors.earned-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.tag}"
    padding: "5px 8px"
    height: "28px"
  surface:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
    padding: "20px"
  passport:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "16px"
  bottom-navigation:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "7px 5px"
    height: "82px"
  matchday-docket:
    backgroundColor: "{colors.cobalt}"
    textColor: "{colors.white}"
    typography: "{typography.body}"
    rounded: "{rounded.docket}"
    padding: "16px"
  season-hud:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "16px 10px 16px 10px"
    padding: "8px"
  season-rank-card:
    backgroundColor: "#FFF4C9"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "17px 9px 17px 9px"
    padding: "16px"
  proof-route:
    backgroundColor: "#FFFAF1"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "10px 6px 10px 6px"
    padding: "18px 14px"
---

# Design System: SAPAR Matchday Fighter World

## Overview

**Creative North Star: "Matchday Fighter World"**

SAPAR feels like a portable identity object moving through a lively illustrated mat world: optimistic, tactile, evidence-aware, and unmistakably social. The experience is mobile-first and cartoon-first, with bold cobalt identity fields, warm cream reading ground, asymmetric outlined controls, and small route-map details that make training, competition, and community feel connected rather than filed into a dashboard.

Trust remains visible inside the playfulness. Synthetic fixtures, proof status, corrections, rating lanes, privacy, and unconnected services are named in the interface instead of hidden behind spectacle. Hybrid human photography and stylized realism support community, training, and replay moments, but the code-native passport, proof thread, controls, and illustrated interface materials remain the primary world.

Season Command Lobby extends this Matchday Passport world rather than replacing it. Its compact HUD brings standings, rating, quests, and the private journey into one discovery layer while preserving them as separate records; its illustrated/hybrid athlete stage, amber competitive-tier plate, and node-rail proof route reuse the established cobalt-and-ink combat language without turning the rest of the product into a game lobby.

Fighter World carries the passport's anime-inspired confidence across every route without copying any named game's trade dress. Original adult-fighter imagery, route-specific arena art, semantic metadata chips, and compact hard-shadow cards make each screen feel authored while live HTML retains every label, result, proof, and action. Location is cobalt, gym affiliation is green, belt context is violet, and the self-declared adult division is amber—color supports the visible text and never invents verification.

The normative color and type primitives remain on `.sa-app` in `app/sapar-app.css`. Season HUD, lobby, and proof-route mechanics live in `app/sapar-gamification.css`. Route energy, fighter metadata, one-shot arena entrances, and tactile quest/reward surfaces live in `app/sapar-fighter-world.css`, loaded last; keep these extensions semantic and do not use them to imply random rewards or undisclosed evidence.

**Key Characteristics:**

- Cartoon-first mobile social passport with secondary hybrid human imagery.
- Cobalt identity, coral community, amber evidence, green verification, violet profiles, cream ground, and charcoal ink.
- Tactile dark outlines, asymmetric corners, compact offset shadows, and illustrated route materials.
- Separate, explainable competition, belt, private journey, and social systems.
- Honest synthetic, local-only, unavailable, private, and proof states.
- Motion that yields completely to reduced-motion and low-stimulation preferences.
- Matchday Circuit carries a selected synthetic event from marquee and docket through rating lanes, division cards, chronology, and human authority.
- Standings Circuit separates cohort rating, season points, squad points, and Vanguard tier through portrait-led ranks and an ordered ledger.
- Rating Proof Route plots only the two disclosed snapshots around one eligible result and never implies undisclosed history.
- Season Command provides compact, separated entry points to standings, rating, evidence-based quests, and the private journey.
- Season progress is deterministic and evidence-led: competitive tier is tied only to eligible results, quests summarize completed steps, and fixture-backed XP and achievements belong only to the private journey.
- Proof connectors occupy an icon/node rail and never cross text, becoming vertical on narrow screens and horizontal on wider screens.
- Original anime-inspired fighting energy stays bold and friendly: no copied franchise characters, maps, iconography, or trade dress.
- Fighter metadata is text-first and color-supported: location cobalt, gym green, belt violet, and self-declared adult division amber.
- Route entrances happen once per mount; direct press feedback may repeat, but no decorative energy loops run indefinitely.

## Colors

The palette pairs saturated athletic signals with a warm paper-like ground; every accent has a stable semantic job.

### Primary

- **Matchday Cobalt** (`colors.cobalt`): Owns portable identity, primary actions, selected states, focus support, and the strongest section fields.
- **Deep Cobalt** (`colors.cobalt-dark`): Grounds cobalt shadows, rating depth, and high-contrast identity regions.
- **Cobalt Wash** (`colors.cobalt-soft`): Supports selected rows, feed headers, and informational tint without competing with the primary field.

### Secondary

- **Court Green** (`colors.verified`): Means a human-confirmed result or true success. Availability, evidence presence, and locally saved previews stay amber, cobalt, or neutral; Discover's green route lane is navigation identity, not a status signal.
- **Social Coral** (`colors.social`): Carries community warmth, reactions, social rails, and relational emphasis.
- **Semantic Inks** (`colors.verified-ink`, `colors.earned-ink`, `colors.social-ink`): Maintain readable text and icons on each light semantic surface instead of falling back to generic gray or unsafe white.
- **Passport Violet** (`colors.profile`, `colors.profile-soft`, `colors.profile-ink`): Owns personal profile navigation and account identity without impersonating a proof or verification state.

### Tertiary

- **Earned Amber** (`colors.earned`): Marks deterministic progress, competitive-tier plates, explanation, matchday attention, and tactile Create controls.
- **Safety Red** (`colors.danger`): Appears only for destructive, disputed, blocked, or critical conditions.

### Neutral

- **Cream Ground** (`colors.cream`): The default app canvas and illustrated reading surface.
- **Clean White** (`colors.white`): A bounded content surface inside the cream world, not a page-sized default.
- **Charcoal Ink** (`colors.ink`): Primary copy, tactile outlines, dark proof fields, and structural contrast.
- **Muted Ink** (`colors.muted`): Secondary copy that remains legible and calm.
- **Warm Line** (`colors.line`) and **Strong Line** (`colors.line-strong`): Dividers, field boundaries, and restrained surface structure.
- **Soft State Tints** (`colors.verified-soft`, `colors.earned-soft`, `colors.social-soft`): Quiet semantic backgrounds paired with their corresponding foreground role.
- **Neutral State Pair** (`colors.neutral-soft`, `colors.neutral-ink`): Privacy, unavailable, and unconnected states only.
- **On-Dark Muted** (`colors.on-dark-muted`): Secondary copy on dark identity and clubhouse fields.

**The Truth-State Rule.** State-semantic green means a human-confirmed result or true success; locally saved previews remain amber, coral means social warmth, and neutral gray means privacy or an unconnected state. Discover's green route lane is navigation identity, never proof.

**The No Dead Field Rule.** Large neutral areas must use the cream ground or be intentionally sectioned with color, keylines, illustration, or layered grouping; broad gray and page-sized white fields are out of character.

**The Route Color Rule.** Mobile wayfinding is a five-lane system: coral Pulse, cobalt Compete, amber Create, green Discover, and violet Profile. Every lane also uses label, icon, border, and selected geometry so route meaning never depends on color alone.

**The Standing Scope Rule.** Cohort identity is cobalt, season identity is amber, and squad identity is coral. Green appears inside those scopes only for a confirmed outcome or a positive result delta; it never becomes the squad identity color.

## Typography

**Display Font:** Space Grotesk Variable (with Arial Narrow and sans-serif fallback)
**Identity Font:** Barlow Condensed 900, sourced from `@fontsource/barlow-condensed` and bundled locally; horizontally tightened to preserve the approved poster-scale passport silhouette
**Body Font:** Manrope Variable (with Inter, system-ui, and sans-serif fallback)

**Character:** The self-hosted Barlow Condensed identity face gives athlete names the poster-scale character of a physical fight passport without relying on platform fonts. Space Grotesk keeps rankings and matchday numbers compact and athletic. Manrope keeps proof language, controls, privacy copy, and social reading calm enough for daily use.

### Hierarchy

- **Display** (760, fluid 30–56px, 0.98): Route introductions and high-energy hero statements.
- **Identity** (900, condensed, fluid 42–108px, 0.78): Athlete names and passport-defining moments.
- **Title** (740, 21px, 1.05): Section headings and compact module titles.
- **Body** (400, 14px, 1.6): Explanations, consent language, and readable narrative copy.
- **Label** (850, 11px, 0.045em): Status, controls, metadata, and short uppercase identity cues.

**The Passport Hierarchy Rule.** Reserve the condensed identity stack for athlete names; use Space Grotesk for display, titles, scores, ratings, and ranks; use Manrope for actions, evidence language, privacy, and sustained reading.

## Layout

The system starts at a 390×844 phone viewport with one readable column, sticky 66px header, fixed five-slot thumb navigation, and content padded above the safe area. Pulse follows one invariant opening sequence: Season Command Lobby, dominant Fighter Passport, immediate Proof Thread, Gym Community, then Recent Activity. Rankings, quick links, and schedule prompts follow that evidence-first sequence. The content container grows to a maximum of 1180px. At 700px, passports, results, settings, discovery, and event modules gain two-column compositions; at 1080px, the bottom dock becomes a 238px dark navigation rail and feed or arena layouts gain purposeful secondary columns. A compact adjustment below 360px preserves the same information order without shrinking tap targets below the intended control size.

Compete follows the same 390/700/1080 contract. At 390px, the cartoon-first Matchday Marquee stacks above its deep-cobalt Event Docket; the amber date plate, four-cell aggregate roster/capacity rail, side-by-side Gi and No-Gi Competition Passport lanes, and horizontally snapping Division Board stay legible in one reading order. At 700px, the marquee splits into art and docket, the passport and board become companion columns, division cards resolve to two columns, event cards pair up, and the human-authority dock separates art from copy. At 1080px, the hero gives more room to the arena art and event imagery grows, while chronology, authority, and task order remain unchanged.

Standings and rating proof follow the same breakpoints without changing their factual order. On phones, the three standing scopes remain one 66px tab row, first place spans the portrait shelf above second and third, ranks four onward continue in an ordered ledger, and the rating route stays a single readable previous–proof–current module. At 700px, the scope tabs grow to 76px, all three podium positions share one row, ledger column labels appear, and the two disclosed rating snapshots sit side by side. At 1080px, the standings board gains a 330px sticky rules companion while the ordered ranking and rating proof sequence remain unchanged.

Season Command uses additional breakpoints that belong only to the shared HUD, the Pulse lobby, and the proof connector. The HUD is a 2×2 action grid through 859px and becomes one five-column row at 860px and above, with a spacing-only width refinement at 1280px. The lobby is one column below 760px, two columns from 760px, and three columns from 1360px. The proof connector is a vertical icon/node rail on narrow screens and becomes a horizontal node rail at 760px. These thresholds do not replace or globally redefine the established 390/700/1080 contracts on other surfaces.

Spacing follows a compact 4/8/12/16/20px rhythm with 28–32px reserved for major sectional separation. Identity, status, primary action, and proof precede supporting metrics. Large screens may widen or layer modules, but they do not reorder the evidence story.

Mobile controls retain an effective 44×44px target floor, with primary buttons at 46px, search fields at 54px, and mobile navigation actions at 60–64px. Safe-area insets are part of the navigation and sheet measurements.

**The Thumb-and-Proof Rule.** On mobile, keep identity, state, action, and proof in that order, and keep every meaningful action operable with a 44px minimum target.

**The Matchday Breakpoint Rule.** The Compete sequence stays one reading order at 390px; at 700px, the marquee splits and the Division Board becomes two columns; at 1080px, art and event cards gain room without changing chronology or authority.

**The Standing Breakpoint Rule.** Preserve the portrait shelf before the ordered ledger at every width: phone stacks the first-place portrait above ranks two and three, 700px places all three together and reveals ledger headers, and 1080px adds the rules companion without reordering the standings.

**The Season Scope Breakpoint Rule.** Keep the Season HUD 2×2 through 859px and five-column from 860px; keep the Season Lobby one column below 760px, two columns from 760px, and three columns from 1360px. Apply these thresholds only to Season Command and its proof route.

## Elevation & Depth

Depth is structural and tactile rather than glossy. Most surfaces rely on color blocks, 1–2px outlines, and short hard offset shadows; ambient blur is reserved for genuinely floating layers such as the bottom dock, toast, and modal sheet. Illustrated route textures remain low-opacity and decorative so HTML content and proof semantics carry the hierarchy.

### Shadow Vocabulary

- **Primary press plate** (`box-shadow: 0 3px 0 #082A87`): Primary buttons at rest; active press removes the offset.
- **Tactile surface** (`box-shadow: 0 4px 0 #D0CBC2`): Bounded white modules sitting on the cream ground.
- **Passport lift** (`box-shadow: 0 5px 0 #082A87, 0 12px 28px rgba(0, 60, 202, .16)`): The portable identity card and only similarly dominant cobalt objects.
- **Floating dock** (`box-shadow: 0 -8px 22px rgba(24, 32, 53, .08)`): Mobile navigation above page content.
- **Sheet lift** (`box-shadow: 0 -16px 50px rgba(24, 32, 53, .22)`): Native dialog content rising from the bottom edge.

**The Tactile Stack Rule.** Use hard 3–5px offsets to make actions and identity blocks feel pressable; use blurred shadows only when a layer truly floats above another layer.

## Shapes

Structural surfaces use gently rounded 16px corners, controls use 12–13px corners, compact tags use 8px corners, and sheets use 18px top corners. Entity marks, medals, icon wells, and Create controls use the recurring asymmetric 15px/9px or 14px/7px cut-corner rhythm, reinforced by dark outlines. Person portraits are circular, with a visible semantic ring and white separation edge, so a fighter reads as a social identity rather than a data monogram. Other full circles are limited to progress nodes, notification counters, and truly circular indicators; full pills are not the default silhouette.

Borders are visible and purposeful: 1px warm lines for ordinary grouping, 2px ink or semantic strokes for tactile or important objects, and 5px colored top rules for section identity. Cropped imagery uses intentional framed windows and never replaces readable labels or interactive controls.

## Components

### Buttons

- **Shape:** Compact rounded rectangles (12px) with a 46px minimum height and 16px inline padding.
- **Primary:** Solid cobalt, white label, cobalt-dark 3px press plate.
- **Hover / Focus:** Fine pointers lift 2px; ordinary controls press down 2px and Matchday actions press down 3px, removing the hard shadow; keyboard focus uses a white 3px outline plus a 6px deep-cobalt outer ring.
- **Secondary:** White with a strong warm line and a 2px neutral offset; inside cobalt introductions it may become earned amber with an ink outline.
- **Disabled:** Keeps its semantic color but lowers opacity and removes press behavior.

### Chips

- **Style:** Compact 28px evidence tags with an 8px radius, 1px current-color border, 11px heavy label, and a pale semantic tint.
- **State:** Cobalt means informational or prototype, green means human-confirmed or truly successful, amber means earned, research, pending, or locally preview-saved, coral means social, neutral means private or unavailable, and red means critical.

### Cards / Containers

- **Corner Style:** Structural 16px corners; signature media or icon frames use asymmetric corners.
- **Background:** White cards stay bounded on cream, while cobalt, green, coral, and amber blocks establish identity or sectional purpose.
- **Shadow Strategy:** Hard offset for tactile hierarchy; no indiscriminate card-cloud shadows.
- **Border:** Warm 1px default with semantic 2–5px emphasis where the content role warrants it.
- **Internal Padding:** 16px for passports and compact mobile modules; 20px for standard surfaces.

### Inputs / Fields

- **Style:** 54px white field, 13px radius, strong warm border, cobalt leading icon, and 13px Manrope input copy.
- **Focus:** Uses the global white-plus-deep-cobalt ring without suppressing the native focus-visible state.
- **Error / Disabled:** Critical copy uses safety red; unavailable services remain neutral or amber and always retain explanatory text.

### Navigation

Mobile uses a five-slot fixed cream dock with persistent route lanes: coral Pulse, cobalt Compete, amber Create, green Discover, and violet Profile. Every inactive destination keeps a quiet tinted field and framed icon; the active destination gains a saturated field, dark outline, short press-plate, and explicit `aria-current` state. Create remains raised and tactile in earned amber. At 1080px the dock becomes a dark 238px rail with 44px rows and a visibly selected surface.

### Season Command HUD

The shared Season HUD is a compact dark-ink discovery rail with four direct destinations: standings, No-Gi rating, the active quest, and the private journey. Each destination keeps its own icon well, label, current value, accessible route name, and full-link target; adjacency is for scanning, not for combining the underlying systems. Its four actions form a 2×2 grid through 859px, then join the title in one five-column row at 860px and above.

**The Season System Separation Rule.** Standing, competitive rating, quest completion, and private journey progress may appear together for orientation, but they remain separate records with separate routes, labels, evidence, and update rules.

### Season Command Lobby

The lobby is an illustrated/hybrid athlete stage inside the original cobalt-and-ink combat world. A fictional adult athlete, rank crest, amber competitive-tier plate, and direct standings action establish the competitive state; objective cards then expose the eligible-result rating lane, an evidence-based quest completion count, and fixture-backed private XP and achievement counts. These are deterministic display contracts backed by static prototype fixtures, not evidence of a live award engine. Only eligible synthetic No-Gi results may move the competitive tier. Belt, XP, followers, purchases, and social reach cannot move it, and private XP never impersonates rating or rank.

Season ambient and entry choreography is one-shot per mount: the athlete settles once over 620ms, the crest arrives once over 560ms after a 90ms delay, rank progress reveals once over 520ms after a 150ms delay, the proof path draws once over 500ms, and proof nodes arrive once over 260ms with a 70ms stagger. There are no ambient Season loops; repeatable hover and press transforms remain direct-manipulation feedback. Both OS reduced-motion and the in-app low-stimulation preference remove path travel, progress drawing, filters, and entry animation; state, labels, and final values remain present without motion.

**The One-Shot Season Motion Rule.** Introduce athlete, crest, progress, or proof sequence once per mount; reserve repeatable motion for direct hover and press feedback. Never loop ambient lobby decoration, and always honor both OS reduced-motion and the in-app low-stimulation preference.

### Matchday Circuit

Compete opens with a cartoon-first Matchday Marquee and a deep-cobalt Event Docket that carries an amber date plate, explicit synthetic status, venue and format, aggregate roster/capacity statistics, price or result authority, and one primary action. Below it, the Fighter Competition Passport keeps Gi and No-Gi ratings in separate lanes; the mobile Division Board is an explicitly named horizontal snap region that resolves to a two-column board at 700px; the URL-backed Event Circuit sorts fixtures chronologically and fails explicitly for unknown event IDs; and the final dock names the human authority and experimental model boundary.

Event selection uses a 220–260ms handoff—implemented at 240ms—with opacity and 6px of vertical travel. Reduced-motion and low-stimulation preferences bypass both travel and duration. Required status, selection, and chronology remain readable without animation. Interactive controls are at least 44px; Matchday actions use a 4px hard press plate, lift 2px on fine pointers, and compress 3px on activation.

All event names, ratings, rosters, availability, artwork, and registration behavior are explicit synthetic or local fixtures. A locally saved entry preview remains amber; green is reserved for a completed human-confirmed result or another true success. The marquee ships `arena-regional-championship.webp` as the optimized derivative; retain `arena-regional-championship.png` as its source asset, `arena-regional-championship.prompt.txt` as the generation record, and `arena-regional-championship.webp.json` as the derivative relationship. The WebP is the runtime asset, not the provenance master.

**The Matchday Handoff Rule.** URL-selected event changes use a 220–260ms opacity-and-6px handoff; reduced-motion and low-stimulation modes bypass travel and duration, and required state never depends on motion.

### Standings Circuit

Standings use a real three-tab scope selector rather than decorative segmented buttons. Cohort, Season, and Squad are `tab` controls inside a named `tablist`, expose `aria-selected` and `aria-controls`, use roving tab focus, and support Left, Right, Home, and End keys. The selected scope is stored in the `scope` query parameter—cohort remains the clean default URL—so refreshes and shared links preserve the visible ranking lane.

Each tab resolves to one focusable `tabpanel` with a scope-colored board head, explicit measurement source, and truthful synthetic-fixture strip. Cohort is cobalt, season is amber, and squad is coral; confirmed positive deltas may remain green inside any scope, but green never names the squad lane. The top three form a portrait-led ordered shelf with first place carrying extra scale, while ranks four onward continue in a semantic ordered ledger. Current-athlete and current-squad labels supplement color and outline, tabular numerals keep metrics aligned, and the rules companion explains that rating, season points, squad points, and Vanguard tier are separate records.

Scope changes use a 200ms opacity-and-6px handoff with the same exponential ease-out as Matchday. Reduced-motion preference removes both travel and duration. The selected tab, focus ring, text labels, rank numbers, and current-record markers remain complete in higher-contrast and forced-color modes; no standing depends on tint, portrait, or motion alone.

**The Standing Handoff Rule.** Query-backed scope changes use a 200ms opacity-and-6px handoff; reduced-motion mode removes travel and duration, while tab state, focus, rank, and metric remain explicit without animation.

### Rating Proof Route

Rating history is a factual previous–proof–current route, not a fabricated trend line. The route plots exactly two disclosed snapshots from the selected rating lane: the pre-result baseline and the current rating after one eligible result. Its center proof plate names the result authority and exact delta, the accessible image label describes the same movement, and the ordered history list repeats both snapshots in text. The history-window selector changes the disclosed context label only; it never interpolates extra points or implies hidden eligible changes.

The route uses a deep-cobalt field, cream path, distinct baseline/proof/current nodes, tabular rating values, and a green proof plate only when the source outcome is confirmed. White strokes, ink-bordered plates, explicit labels, and the global white-plus-deep-cobalt focus treatment preserve contrast without relying on hue. Synthetic model and snapshot boundaries remain adjacent to the visualization, and the action leads to cohort standings without claiming federation authority.

**The Two-Snapshot Rule.** Plot only disclosed rating states. A selected window may change context, but it never creates intermediate points, smooths a fictional trend, or implies evidence the fixture does not contain.

### Matchday Passport

The signature identity card is a cobalt asymmetric surface with a full-bleed alpha-matted fictional adult athlete, tall condensed live identity type, explicit synthetic/verification labels, separate white Gi and No-Gi rating lanes, a keyboard-operable record action, and three dimensional earned stamps. The athlete and stamp art establish material depth; names, labels, states, ratings, deltas, and proof controls remain code-native and readable without imagery.

### Earned Stamp Strip

Three original non-person medallions sit inside the passport on a deep-cobalt evidence shelf. Each image is decorative beside a live label and explanation, and every 44px-or-larger target opens the deterministic rewards record. Stamps represent Mat Tested, Identity Confirmed, and Community Trusted; they are never random drops or purchasable status.

### Proof Thread

The Proof Thread is a four-milestone authority-to-rating docket built entirely from live interface geometry: Authority, Result, Corrections, and the explained rating outcome. On narrow screens, a full-height vertical connector occupies the 48px icon/node rail while each copy card sits in a separate adjacent column. From 760px, the connector becomes one horizontal rail aligned through the four nodes, with copy placed below each node. The line never enters a text card, and numbered, labeled, non-color-dependent nodes preserve the order without the connector. The preview derives its authority, version, correction state, and rating movement from the same deterministic fixture as the five-event detail record. One explicit 48px Full Record action opens the native proof dialog, while the semantic ordered list remains descriptive rather than pretending each node is independently actionable. The component stays complete and legible without animation, raster alignment, or decorative route textures.

**The Node Rail Rule.** A proof connector belongs only in the icon/node rail: vertical beside copy on narrow screens and horizontal through nodes at 760px and above. It must never cross, underline, or sit behind text.

### Booking Mat Pass

The booking preview is a compact Mat Pass rather than a generic summary table. A restrained hybrid image of fictional adult No-Gi athletes establishes the session context while live fixture text carries the gym, class, place, format, level, time, duration, capacity, booking state, verification, and accessibility details. The facts use semantic description-list markup, and available, waitlist, full, and locally saved states each receive explicit copy and action behavior rather than color alone. A cobalt informational disclosure is inseparable from the 66px action, making it clear that no reservation, payment, or message is sent without borrowing green verification semantics. On short devices, the pass scrolls inside the sheet while the cobalt header and action region remain visible; the close control is 48px and the primary action spans the available width.

### Gym Community

Gym Community is a horizontally scrollable illustrated card rail immediately after proof. Each card uses original cartoon-first or restrained hybrid adult imagery, a deep-cobalt live-text overlay, active-member state, and a direct local route. It behaves as a social neighborhood, not a neutral directory grid.

## Do's and Don'ts

### Do:

- **Do** begin phone layouts with identity, current state, primary action, and proof before secondary metrics.
- **Do** use cartoon-first interface imagery and fictional adult characters as the dominant visual register.
- **Do** use hybrid human photography or stylized realism secondarily for community, gym, competition, and replay context.
- **Do** label synthetic fixtures, local-only actions, unconnected services, and human-confirmed proof in plain language.
- **Do** keep competition rating, belt, private journey XP, and social reach visually and semantically separate.
- **Do** honor reduced-motion, low-stimulation, higher-contrast, and forced-color modes without removing state clarity.
- **Do** preserve the 390/700/1080 Matchday reflow, the 44px control floor, URL-backed chronology, and the named human-authority boundary.
- **Do** keep each optimized shipping WebP linked to its retained source asset, prompt record, and derivative sidecar.
- **Do** keep cohort cobalt, season amber, and squad coral, with real tablist semantics, query-backed scope persistence, and a 200ms reduced-motion-safe handoff.
- **Do** preserve the portrait-led top-three shelf, the ordered remainder ledger, and the factual two-snapshot rating route at phone, 700px, and 1080px widths.
- **Do** keep the Season HUD's standings, rating, quest, and private-journey entries explicit, directly navigable, and semantically separate.
- **Do** keep Season quests evidence-based and present private XP, achievements, and tier progress as deterministic fixture-backed displays without implying a live award engine.
- **Do** keep the proof connector inside its icon/node rail, vertical below 760px and horizontal from 760px, with no text crossing.
- **Do** keep Season-specific 760/860/1360 reflow scoped to the HUD, lobby, and proof route while retaining the 44px mobile target floor.

### Don't:

- **Don't** return to a generic white dashboard or leave broad gray and white areas without hierarchy or purpose.
- **Don't** use green for privacy, private data, or generic availability when no human-confirmed success exists.
- **Don't** style a locally saved preview as green; it is an amber local state, not registration or result confirmation.
- **Don't** let photography, illustration, animation, or generated texture carry required text, proof, or control semantics.
- **Don't** imply that synthetic ratings, events, profiles, availability, API boundaries, or autonomous scoring are production facts.
- **Don't** use verified green as the squad identity or let tint, portrait art, or motion become the only standing-state cue.
- **Don't** interpolate a smooth history, add undisclosed rating samples, or make a window label look like evidence the synthetic fixture does not contain.
- **Don't** use loot boxes, random drops, casino loops, fake scarcity, streak punishment, pay-to-win status, or serotonin-manipulation language.
- **Don't** let belt, private XP, achievements, followers, purchases, or social reach move competitive rating or tier.
- **Don't** copy competitor trade dress, real athlete likenesses, federation marks, or unlicensed uniform branding.
