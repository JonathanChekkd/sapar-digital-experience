# Investor Room Frontend Inspiration

This document records the reusable interface patterns identified during a private, authenticated review of the SAPAR investor experience on September 2, 2026. It is intentionally sanitized for source control: it contains no screenshots, video frames, financial terms, personal contact information, private biographies, or other confidential source material.

## Review coverage

The private review covered six primary narrative routes and their responsive page structure. The local research corpus includes full-page captures, viewport-by-viewport frames, a route inventory, and a product-demo media capture. Those raw materials remain in the ignored `.private-research/` directory and are not part of this repository.

## Patterns worth carrying into the app

- **Guided progress:** A compact top-level sequence makes a large product feel understandable. The app can reuse this idea for onboarding, tournament setup, and multi-step profile completion.
- **One question per section:** Each section should answer a single user question, then hand off to the next action. This is especially useful for rankings, quests, match history, and gym discovery.
- **Product-first staging:** Phone frames, animated grappling art, and live-looking data should lead. Supporting copy should remain short and secondary.
- **Stat strips:** Dense proof points work best as compact, highly legible rows. Apply this to Gi and No-Gi ratings, streaks, verified matches, rank movement, and seasonal progress.
- **Narrative modules:** Alternating hero, proof, process, community, and call-to-action blocks keep long pages energetic without adding empty white space.
- **Community proof:** Athlete avatars, gyms, activity, and recognizable social interactions make the network feel alive. Use fictional or properly licensed identities only.
- **Strong transitions:** Full-bleed color, illustration, and motion can separate major sections while preserving the vivid cobalt, lime, gold, and coral SAPAR world.
- **Persistent next action:** Every major screen should make the next meaningful action obvious: compete, post, follow, join, verify, or claim.

## Translation into the current prototype

| Investor experience pattern | SAPAR app implementation |
| --- | --- |
| Guided reading sequence | Onboarding steps, quest progression, and competition setup |
| Proof-point row | Passport ratings, verified record, streaks, and seasonal movement |
| Product demo stage | Animated home hero and interactive route previews |
| Modular deep dives | Discover, Compete, Leaderboards, Network, and Rewards sections |
| Community credibility | Athlete cards, gym cards, avatars, comments, and activity states |
| Conversion close | Contextual compete, join, follow, and create controls |

## Visual direction

The information architecture is the inspiration—not the investor room's restrained presentation. The consumer product should remain mobile-first, saturated, tactile, and playful: cartoon-world environments, hybrid real-person portraits, raised controls, glassy overlays, illustrated tabs, animated badges, and dense social data. White or gray should be used only as short readability breaks, not as the dominant canvas.

## Confidentiality boundary

Only these generalized interaction and layout observations may be shared publicly. Do not commit or distribute the local capture corpus, source media, private names or contact details, financial information, investor terms, or authenticated page content. Any future public reference asset must be independently created, licensed, or explicitly approved for release.
