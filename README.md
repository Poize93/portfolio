# Shweta Sharma — Portfolio

A bold, motion-driven portfolio inspired by award-winning portfolio design (e.g. [Melvin Winkeler on Awwwards](https://www.awwwards.com/sites/melvin-winkeler)), built with React, Vite, and GSAP.

## Features

- **Logo-driven intro loader** — Name animation on load
- **Horizontal scroll** — Project cards in a pinned horizontal strip (scroll to move)
- **Color-driven sections** — Coral, mint, lavender, and cream backgrounds
- **Adaptive navigation** — Minimal nav that gains a background on scroll
- **Dummy content** — Placeholder projects and copy; replace with your own

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize

- **Copy & images:** Edit `src/data/projects.js` for project titles, categories, years, and image URLs. Replace `hello@shwetasharma.com` and social links in `src/App.jsx`.
- **Colors:** Change CSS variables in `src/App.css` (`--coral`, `--mint`, etc.) and project `color` in `projects.js`.
- **Build:** `npm run build` → output in `dist/`.

## Stack

- React 19 + Vite 7
- GSAP + ScrollTrigger + @gsap/react
- Fonts: Syne (display), DM Sans (body)
