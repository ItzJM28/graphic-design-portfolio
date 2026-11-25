# Graphic Design Portfolio

A bento-grid portfolio built with **Next.js 16**, **Tailwind CSS v4** and **Framer Motion**.

- Dark-gray base with a 10-tone palette (Dusty Grape → Sandy Brown)
- Intro curtain, scroll progress bar, staggered reveals, cursor spotlight and 3D tilt on cards
- Filterable work grid with an animated project viewer (keyboard ← → / Esc, swipe on mobile)
- Animated counters, palette bars, marquees and a featured slideshow

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

| What | Where |
| --- | --- |
| Name, tagline, email | `src/data/site.ts` |
| Project titles, descriptions, colors, card sizes | `src/data/projects.ts` |
| Images | `public/work/<project>/` (listed in `src/data/manifest.json`) |
| Colors & fonts | `src/app/globals.css` (`@theme`) and `src/app/layout.tsx` |

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no configuration needed.
