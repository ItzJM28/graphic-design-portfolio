# Portfolio UI/UX Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix contact, mobile, hero clutter, intro, case-study structure, accessibility and loading on the existing portfolio without changing its look.

**Architecture:** Pure logic (deliverable labels, highlight ordering, intro gating) moves into small `src/lib/*.ts` modules with Node test-runner tests. UI changes stay in the existing components (`Hero`, `Intro`, `Work`, `ProjectModal`, `Nav`, `Contact`) and `globals.css`.

**Tech Stack:** Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion, Node 24 built-in test runner (`node --test`, native TS type stripping).

**Spec:** `docs/superpowers/specs/2026-11-27-portfolio-ux-polish-design.md`

## Global Constraints

- Contact email: `jmc.demonteverde@gmail.com`.
- Keep colors, fonts, the bento concept and animations; no new artwork.
- Intro: once per browser session (sessionStorage), ~0.7s, skipped with `prefers-reduced-motion`.
- Bugtong's shows its 10 strongest pieces first, with a "Show all 28" toggle.
- Nothing slower on mobile; no invented project facts.
- `src/lib` modules use relative, type-only imports so `node --test` can run them without a bundler.

## Review Focus

- sessionStorage throws (private mode, blocked storage) → intro must simply not block, never crash. Pinned in Task 4 test `shouldPlayIntro returns false when storage throws`.
- A project with fewer than 10 items or no highlights → gallery shows everything, no toggle. Pinned in Task 2 test `orderGallery without highlights keeps all items`.
- A highlight name that doesn't match any file → ignored, never drops items. Pinned in Task 2 test `orderGallery ignores unknown highlight names`.
- Keyboard user opening a project and pressing Esc → focus returns to the card. Checked in Task 6 browser step.
- Touch device with hover emulation off (phones) → cards show artwork, never logo-only. Checked in Task 5 browser step at 375px.

---

### Task 1: Test runner + working contact email

**Files:**
- Modify: `package.json` (add `"test": "node --test src/lib/*.test.ts"`)
- Modify: `src/data/site.ts:8`
- Create: `src/lib/site.test.ts`

**Interfaces:**
- Produces: `npm test` runs every `src/lib/*.test.ts`.

- [ ] **Step 1: Write the failing test** — `site.test.ts`: `test("contact email is real", () => assert.equal(site.email, "jmc.demonteverde@gmail.com"))`, importing `../data/site.ts`.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL (`hello@example.com`).
- [ ] **Step 3: Set** `email: "jmc.demonteverde@gmail.com"` in `src/data/site.ts`; remove the TODO comment.
- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `feat: real contact email and node test runner`.

### Task 2: Case-study helpers

**Files:**
- Create: `src/lib/projectView.ts`, `src/lib/projectView.test.ts`
- Modify: `src/data/projects.ts` (add optional `highlights?: string[]` to `Project`/`Meta`; set it for `bugtongs` to 10 file names)

**Interfaces:**
- Consumes: `MediaItem`, `Project` types from `src/data/projects.ts` (type-only import).
- Produces:
  - `deliverables(p: Pick<Project, "slug" | "categories" | "items">): string[]` — ordered, de-duplicated labels from: `Logo` (slug has a logo/branding category), `Social posts`, `Print`, `Posters`, `Mockups`, `Apparel`, `Motion` (any item with `type === "video"`).
  - `orderGallery(items: MediaItem[], highlights?: string[]): { top: MediaItem[]; rest: MediaItem[] }` — `top` = items whose file name is in `highlights`, in highlight order, plus the logo-motion item kept in position 2 if present; `rest` = remaining items in original order. No highlights → `top` = all items, `rest` = [].

- [ ] **Step 1: Write failing tests** in `projectView.test.ts`:
  - `deliverables includes Motion when a video item exists` → contains `"Motion"`.
  - `deliverables for a Branding project starts with Logo` → `[0] === "Logo"`.
  - `orderGallery without highlights keeps all items` → `rest.length === 0`, `top.length === items.length`.
  - `orderGallery puts highlights first in given order` → `top.map(file)` equals highlights (motion item aside).
  - `orderGallery ignores unknown highlight names` → `top.length + rest.length === items.length`.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL (module missing).
- [ ] **Step 3: Implement** both functions in `src/lib/projectView.ts`; pick Bugtong's 10 highlights (strongest launch/promo posters, milestone, banner, calling card, tee).
- [ ] **Step 4: Run** `npm test` — Expected: PASS.
- [ ] **Step 5: Commit** `feat: case-study helpers for project viewer`.

### Task 3: Project viewer as a case study

**Files:**
- Modify: `src/components/ProjectModal.tsx`

**Interfaces:**
- Consumes: `deliverables`, `orderGallery` (Task 2).

- [ ] **Step 1: Restructure the side panel** into labelled sections "Overview" (description), "What I made" (chips from `deliverables`), "Gallery" (thumbnails from `orderGallery`; when `rest.length > 0`, a button `Show all {count}` reveals `rest`). The stage navigates over whatever is currently listed.
- [ ] **Step 2: Restore focus** to the opening card on close (pass the trigger element from `Work.tsx`), and trap Tab inside the dialog while open.
- [ ] **Step 3: Verify** `npm run build` passes; in the browser open Bugtong's → 10 thumbnails + "Show all 29"; Nature's Blend → no toggle; Esc returns focus to the card.
- [ ] **Step 4: Commit** `feat: case-study layout in project viewer`.

### Task 4: Intro once per session

**Files:**
- Create: `src/lib/intro.ts`, `src/lib/intro.test.ts`
- Modify: `src/components/Intro.tsx`

**Interfaces:**
- Produces: `shouldPlayIntro(storage: Pick<Storage, "getItem" | "setItem"> | null, reducedMotion: boolean): boolean` — false when reduced motion, storage null, storage throws, or key `"jd-intro-seen"` is set; otherwise sets the key and returns true.

- [ ] **Step 1: Write failing tests:** `plays on first visit`, `does not play on second call`, `returns false with reduced motion`, `shouldPlayIntro returns false when storage throws`.
- [ ] **Step 2: Run** `npm test` — Expected: FAIL.
- [ ] **Step 3: Implement** `shouldPlayIntro`; in `Intro.tsx` start hidden, decide in an effect, and shorten the hold to 700 ms.
- [ ] **Step 4: Run** `npm test` — Expected: PASS; reload the preview twice → intro shows once.
- [ ] **Step 5: Commit** `feat: intro plays once per session`.

### Task 5: Calmer hero + touch-friendly work cards

**Files:**
- Modify: `src/components/Hero.tsx`, `src/components/Work.tsx`, `src/app/globals.css`

- [ ] **Step 1: Hero grid (4 columns desktop):** row 1–2 = Intro (2×2) + Featured motion (2×2); row 3 = Palette (2), Logo (1), one combined stats tile (1) showing `75+ pieces` and `12 brands`. Remove the separate Alon Brew video tile. Featured videos: `preload="metadata"`.
- [ ] **Step 2: Touch cards:** add `@custom-variant touch (@media (hover: none));` in `globals.css`. On `touch`, cards show the cover artwork visible with the brand logo as a small badge (top-left, on the brand background, ~56px); hover devices keep the logo → artwork reveal.
- [ ] **Step 3: Verify** build; desktop 1440px: no grid holes, featured clip large; mobile 375px: every card shows artwork, no horizontal scroll.
- [ ] **Step 4: Commit** `feat: calmer hero and touch-friendly work cards`.

### Task 6: Polish, accessibility, loading

**Files:**
- Modify: `src/components/Nav.tsx`, `src/components/Tile.tsx`, `src/components/Work.tsx`, `src/components/ProjectModal.tsx`, `src/components/Contact.tsx`, `src/app/globals.css`

- [ ] **Step 1:** Visible `focus-visible` ring (banana, 3px offset) on all links/buttons; `scroll-margin-top` on sections for the sticky nav.
- [ ] **Step 2:** Nav highlights the section in view (IntersectionObserver over `#work`, `#about`, `#contact`), `aria-current` on the active link.
- [ ] **Step 3:** Meaningful `alt` on project images (`{title} — {n} of {count}`); gallery videos `preload="metadata"`; mobile type: headings clamp down one step below 640px, consistent section spacing (`py-16 md:py-24`).
- [ ] **Step 4: Verify** `npm run build` and `npx eslint src` clean; Tab through the page → every control shows a ring.
- [ ] **Step 5: Commit** `feat: accessibility and polish pass`.

### Task 7: Verify and deploy

- [ ] **Step 1:** `npm test`, `npm run build`, `npx eslint src` — all clean.
- [ ] **Step 2:** Browser check at 1440px and 375px: hero, work grid, viewer (Bugtong's toggle), contact mail link `mailto:jmc.demonteverde@gmail.com`.
- [ ] **Step 3:** `git push origin main`; wait for Vercel; confirm https://jdcreates.vercel.app shows the new hero and the contact link.
