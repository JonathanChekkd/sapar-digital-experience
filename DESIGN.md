# SAPAR Design Direction — Fight System Blueprint

## Intent

Preserve SAPAR's recognizable black, electric cobalt, white, and “Train. Connect. Compete.” identity while raising it to premium live-sport production quality. The concept treats the platform as an elite fight system being assembled in plain view: numbered chapters, exploded data layers, trace lines, score modules, and clear proof labels move from raw training activity to a trusted competition record.

## Visual World

- **Ground:** arena black and charcoal, with matte panels instead of generic gray cards.
- **Signal:** SAPAR cobalt blue; ice blue is used for technical illumination, not decoration.
- **Proof states:** mint for verified demo records, amber for pilot/validation states, red only for destructive or disputed states.
- **Type:** condensed, high-impact display headings paired with a calm geometric body face and tabular numerals.
- **Grid:** a 12-column broadcast grid with a subtle mat-coordinate lattice and oversized step numerals.
- **Material:** dark coated metal, translucent broadcast glass, crisp white keylines, blue edge light, restrained grain.
- **Imagery:** respectful adult no-gi and gi BJJ, cinematic side light, realistic movement, no blood or injury.

## Composition

The first viewport reads in three beats: SAPAR identity; “Train. Connect. Compete.” outcome; live product proof through an interactive phone/dashboard composition. Sections alternate between a strong editorial statement and an exploded module that reveals the data or workflow underneath it. The investor path is never more than one obvious action away.

## Motion

- A short cobalt scan line and restrained light sweep establish energy at entry.
- Scroll reveals use small vertical travel, opacity, and stagger only once.
- Metric numerals settle rather than endlessly count.
- Exploded modules assemble along visible guide lines.
- App navigation uses shared-layout movement and compact state transitions.
- Hover effects use a 1–2px lift, border illumination, and icon translation—never noisy floating.
- `prefers-reduced-motion` removes travel, parallax, scanning, and counting while preserving state clarity.

## Interaction Grammar

- Numbered chapter markers communicate sequence.
- “Proof chips” communicate Concept, Prototype, Pilot candidate, Requires validation, and Verified demo record.
- A cobalt focus ring is always visible for keyboard users.
- Primary controls are solid cobalt; secondary controls are white or transparent keyline; destructive states are never blue.
- Cards are grouped by hierarchy and purpose, not placed inside unnecessary nested containers.

## Responsive Behavior

Desktop uses asymmetrical editorial layouts and layered phone/data compositions. Tablet collapses layers into a two-column sequence. Mobile becomes a vertical fight card: identity, status, action, then supporting data. No critical copy is placed over imagery; interactions remain at least 44px high.

## Originality Boundary

“UFC quality” is interpreted as polish, live-sport urgency, premium finishing, disciplined data graphics, and presentation confidence. The design must not copy UFC trademarks, octagon geometry, broadcast packages, slogans, fighter likenesses, or audio identity.

## Implemented System Notes

### Reusable Visual Patterns

- **Palette roles:** SAPAR cobalt (`#0042ea`) is the sole primary action and signal color; arena black (`#101217`) grounds public storytelling; white, paper, and ink support legible proof and product surfaces. Mint means verified or successful, amber means pilot or validation, and red is reserved for destructive or disputed states.
- **Type roles:** Space Grotesk carries compact, high-impact headings and metrics; Manrope carries body copy, labels, and controls. Display copy uses tight tracking, while labels use small uppercase text with generous tracking and numerals remain tabular where alignment matters.
- **Broadcast modules:** Reuse numbered chapters, fine keylines, coordinate grids, restrained grain, glass overlays, and isolated cobalt edge light. Most hierarchy comes from tonal contrast and borders; strong shadows are reserved for floating product proof, phones, and other genuinely raised layers.
- **Control family:** Primary buttons are solid cobalt, secondary actions are white or transparent keyline treatments, and status chips are compact outlined pills. Controls are at least 44px high; cards use purpose-based grouping and avoid decorative nesting.

### Interaction Conventions

- Hover states use a restrained 1px lift, border or color illumination, and occasional arrow translation on a roughly 200ms transition. Keyboard focus is always a visible 3px cobalt-light ring with offset.
- Motion reveals hierarchy once: short fades, small vertical travel, compact shared-layout transitions, and settling numerals. Reduced-motion mode removes travel, scanning, parallax, and nonessential animation without removing state feedback.
- Prototype state is never implicit. Keep the persistent concept banner, synthetic-data language, and explicit proof chips near the claim or interaction they qualify; AI remains described behind proof gates with “requires validation” language.
- Below the desktop composition, layered modules collapse before copy does. Mobile orders identity, status, primary action, then supporting data; navigation becomes a drawer or bottom bar and retains full-size targets.

### Intentional Deviations

- The public experience stays in the dark arena world, while the dense app prototype shifts to white and paper work surfaces for scanability. A dark rail and persistent prototype banner preserve SAPAR continuity across that change.
- The 12-column broadcast grid is an alignment discipline, not a visible template on every route. Editorial splits, proof rails, and exploded modules may resolve to simpler two-column or single-column structures when content or viewport demands it.
- Rounded product frames and controls soften the coated-metal language to keep SAPAR elite but welcoming. Pill geometry remains limited to status labels; structural cards use controlled medium or large corners rather than fully rounded silhouettes.
