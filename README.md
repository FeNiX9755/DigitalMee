# DigitalMe — Scrollytelling Proposal

A mobile-first, private relationship scrapbook built with React, Tailwind CSS, and Framer Motion.

## Features

- **Landing** — Paper-toned scrapbook with polaroid accents and a **Start** button
- **Scrollytelling** — Sticky pinned sections; speech lines fade in/out on scroll
- **Gradients** — Soft, shifting backgrounds per chapter
- **Finale** — Pinned card with pulsing **"Now, look up at me."** button

## Quick start

```bash
cd c:\xampp\htdocs\DigitalMe
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Customize

Edit speech lines and gradients in `src/data/speech.ts`.

## Build for production

```bash
npm run build
npm run preview
```

Deploy the `dist` folder to any static host.
