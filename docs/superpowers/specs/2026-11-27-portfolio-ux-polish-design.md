# Portfolio UI/UX polish — design

## Intent

Make jdcreates.vercel.app better for the people who land on it: potential clients, agencies and recruiters.
John asked to "make it better" and left the decisions to Claude. Keep the identity he chose (dark gray base,
his 10-tone palette, bento grid, animations) and fix what gets in the way of seeing the work and getting in touch.

## Goals

- A visitor can contact John in one click: every contact button uses `jmc.demonteverde@gmail.com`.
- The work is visible on phones without hover.
- The first screen is calmer and the featured logo animations are big enough to enjoy.
- The site feels fast: the intro never blocks returning visitors.
- Projects read as small case studies, not just image dumps.
- Keyboard and screen-reader users can use everything.

## Non-goals

- No new visual direction (no redesign of colors, fonts or the bento concept).
- No separate page per project (approach C) — the viewer is structured so that can come later.
- No new artwork; the four placeholder logos stay until John supplies real ones.

## Anti-goals

- Losing animation richness that makes it feel like a designer's site.
- Making anything slower on mobile.
- Inventing project facts (briefs, results) John hasn't given.

## Approaches

- **A. Fix and polish (picked by Claude, John handed over the choice).** Keep the look; fix contact, mobile, hero
  clutter, intro, case-study structure, accessibility. Highest value for least risk.
- B. Full visual redesign — fresher but discards the bento identity John asked for.
- C. A page per project — strong for recruiters but needs content John may not have yet.

## The design (Claude's calls)

1. **Contact:** `site.email` = `jmc.demonteverde@gmail.com`; "Hire me", the contact button and "Copy email" all work.
2. **Hero, fewer tiles:** intro card, logo tile, a larger featured motion tile (2 columns wide instead of a narrow
   1-column strip, so the square clips show big), two stat tiles, the palette tile. Remove the separate
   Alon Brew video tile (it already plays in the featured slideshow).
3. **Intro curtain:** plays once per browser session (sessionStorage), shorter (~0.7s); skipped with reduced motion.
4. **Work cards on touch devices:** on screens without hover, cards show the cover artwork with a small logo badge
   instead of logo-only; on hover devices the current logo → artwork reveal stays.
5. **Project viewer as a case study:** the side panel gets three labelled parts: Overview (existing description),
   What I made (deliverable chips derived from the project's items, e.g. Logo, Social posts, Posters, Mockups,
   Motion), and the gallery. Bugtong's shows its 10 strongest pieces first with a "Show all 28" toggle.
6. **Polish:** consistent spacing scale, tighter type sizes on mobile, visible focus rings on every interactive
   element, alt text on images, nav highlights the section in view, smooth scroll offset for the sticky nav.
7. **Performance:** featured and gallery videos `preload="metadata"` except the playing one; images lazy below the fold.

## Left to the builder

Exact tile sizes and breakpoints, the order of Bugtong's top 10, deliverable-chip mapping, animation timings.

## Done means

Builds clean, lint clean, checked in the browser on desktop and phone width, pushed to GitHub so Vercel deploys,
live site verified.
