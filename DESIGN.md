---
name: SAPAR Matchday Passport
description: A cartoon-first mobile social passport for adult Jiu-Jitsu identity, community, competition, and proof.
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
---

# Design System: SAPAR Matchday Passport

## Overview

**Creative North Star: "Matchday Passport"**

SAPAR feels like a portable identity object moving through a lively illustrated mat world: optimistic, tactile, evidence-aware, and unmistakably social. The experience is mobile-first and cartoon-first, with bold cobalt identity fields, warm cream reading ground, asymmetric outlined controls, and small route-map details that make training, competition, and community feel connected rather than filed into a dashboard.

Trust remains visible inside the playfulness. Synthetic fixtures, proof status, corrections, rating lanes, privacy, and unconnected services are named in the interface instead of hidden behind spectacle. Hybrid human photography and stylized realism support community, training, and replay moments, but the code-native passport, proof thread, controls, and illustrated interface materials remain the primary world.

**Key Characteristics:**

- Cartoon-first mobile social passport with secondary hybrid human imagery.
- Cobalt identity, coral community, amber evidence, green verification, cream ground, and charcoal ink.
- Tactile dark outlines, asymmetric corners, compact offset shadows, and illustrated route materials.
- Separate, explainable competition, belt, private journey, and social systems.
- Honest synthetic, local-only, unavailable, private, and proof states.
- Motion that yields completely to reduced-motion and low-stimulation preferences.

## Colors

The palette pairs saturated athletic signals with a warm paper-like ground; every accent has a stable semantic job.

### Primary

- **Matchday Cobalt** (`colors.cobalt`): Owns portable identity, primary actions, selected states, focus support, and the strongest section fields.
- **Deep Cobalt** (`colors.cobalt-dark`): Grounds cobalt shadows, rating depth, and high-contrast identity regions.
- **Cobalt Wash** (`colors.cobalt-soft`): Supports selected rows, feed headers, and informational tint without competing with the primary field.

### Secondary

- **Court Green** (`colors.verified`): Means human-confirmed, available, successful, or evidence-attached—never merely private.
- **Social Coral** (`colors.social`): Carries community warmth, reactions, social rails, and relational emphasis.
- **Semantic Inks** (`colors.verified-ink`, `colors.earned-ink`, `colors.social-ink`): Maintain readable text and icons on each light semantic surface instead of falling back to generic gray or unsafe white.
- **Passport Violet** (`colors.profile`, `colors.profile-soft`, `colors.profile-ink`): Owns personal profile navigation and account identity without impersonating a proof or verification state.

### Tertiary

- **Earned Amber** (`colors.earned`): Marks deterministic progress, explanation, matchday attention, and tactile Create controls.
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

**The Truth-State Rule.** Green means human-confirmed or successful, amber means earned or explainable progress, coral means social warmth, and neutral gray means privacy or an unconnected state; private never masquerades as verified.

**The No Dead Field Rule.** Large neutral areas must use the cream ground or be intentionally sectioned with color, keylines, illustration, or layered grouping; broad gray and page-sized white fields are out of character.

**The Route Color Rule.** Mobile wayfinding is a five-lane system: coral Pulse, cobalt Compete, amber Create, green Discover, and violet Profile. Every lane also uses label, icon, border, and selected geometry so route meaning never depends on color alone.

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

The system starts at a 390×844 phone viewport with one readable column, sticky 66px header, fixed five-slot thumb navigation, and content padded above the safe area. Pulse follows one invariant opening sequence: dominant Fighter Passport, immediate Proof Thread, Gym Community, then Recent Activity. Rankings, quick links, and schedule prompts follow that evidence-first sequence. The content container grows to a maximum of 1180px. At 700px, passports, results, settings, discovery, and event modules gain two-column compositions; at 1080px, the bottom dock becomes a 238px dark navigation rail and feed or arena layouts gain purposeful secondary columns. A compact adjustment below 360px preserves the same information order without shrinking tap targets below the intended control size.

Spacing follows a compact 4/8/12/16/20px rhythm with 28–32px reserved for major sectional separation. Identity, status, primary action, and proof precede supporting metrics. Large screens may widen or layer modules, but they do not reorder the evidence story.

All actionable controls target at least 44×44px, with primary buttons at 46px, search fields at 54px, and mobile navigation actions at 60–64px. Safe-area insets are part of the navigation and sheet measurements.

**The Thumb-and-Proof Rule.** On mobile, keep identity, state, action, and proof in that order, and keep every meaningful action operable with a 44px minimum target.

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
- **Hover / Focus:** Fine pointers lift 2px; active presses down 2px and removes the shadow; keyboard focus uses a white 3px outline plus a 6px deep-cobalt outer ring.
- **Secondary:** White with a strong warm line and a 2px neutral offset; inside cobalt introductions it may become earned amber with an ink outline.
- **Disabled:** Keeps its semantic color but lowers opacity and removes press behavior.

### Chips

- **Style:** Compact 28px evidence tags with an 8px radius, 1px current-color border, 11px heavy label, and a pale semantic tint.
- **State:** Cobalt means informational or prototype, green means verified or successful, amber means earned or research, coral means social, neutral means private or unavailable, and red means critical.

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

### Matchday Passport

The signature identity card is a cobalt asymmetric surface with a full-bleed alpha-matted fictional adult athlete, tall condensed live identity type, explicit synthetic/verification labels, separate white Gi and No-Gi rating lanes, a keyboard-operable record action, and three dimensional earned stamps. The athlete and stamp art establish material depth; names, labels, states, ratings, deltas, and proof controls remain code-native and readable without imagery.

### Earned Stamp Strip

Three original non-person medallions sit inside the passport on a deep-cobalt evidence shelf. Each image is decorative beside a live label and explanation, and every 44px-or-larger target opens the deterministic rewards record. Stamps represent Mat Tested, Identity Confirmed, and Community Trusted; they are never random drops or purchasable status.

### Proof Thread

The Proof Thread is a four-step authority-to-rating path rendered on a cream illustrated ribbon. Each step has a semantic node, short label, and supporting state; activating a result opens the detailed proof sheet. Reduced-motion and low-stimulation modes expose the same evidence without animation or decorative route textures.

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

### Don't:

- **Don't** return to a generic white dashboard or leave broad gray and white areas without hierarchy or purpose.
- **Don't** use green for privacy, private data, or generic availability when no human-confirmed success exists.
- **Don't** let photography, illustration, animation, or generated texture carry required text, proof, or control semantics.
- **Don't** imply that synthetic ratings, events, profiles, availability, API boundaries, or autonomous scoring are production facts.
- **Don't** use casino cues, random drops, fake scarcity, streak punishment, pay-to-win status, or serotonin-manipulation language.
- **Don't** copy competitor trade dress, real athlete likenesses, federation marks, or unlicensed uniform branding.
