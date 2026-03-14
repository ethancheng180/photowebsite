# Ethan Cheng — Fashion & Editorial Photography Portfolio

A premium fashion photography portfolio built with Next.js, Tailwind CSS, and custom editorial design system.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## Deploy to Vercel (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel auto-detects Next.js — click Deploy
4. Your site will be live at `your-project.vercel.app`
5. Add a custom domain in Vercel settings (e.g. `ethanchengphotography.com`)

## Project Structure

```
├── public/
│   └── images/              # All photography (replace with your images)
│       ├── midnight-saint-germain.jpg
│       ├── soft-armor.jpg
│       ├── static-summer.jpg
│       ├── between-castings.jpg
│       ├── blue-hour-discipline.jpg
│       ├── modern-heirloom.jpg
│       ├── heatwave-study.jpg
│       └── after-the-show.jpg
├── src/
│   ├── app/
│   │   ├── globals.css      # All styling (CSS variables, typography, layout)
│   │   ├── layout.js        # Root layout with metadata/SEO
│   │   └── page.js          # Main site (all pages, components, navigation)
│   └── data/
│       └── projects.js      # All project data, categories, client list
├── package.json
├── next.config.js
├── tailwind.config.js
└── README.md
```

## How to Update Content

### Replace images
Drop new JPEGs into `public/images/` using the same filenames, or update the `cover` paths in `src/data/projects.js`.

### Edit project details
All project data lives in `src/data/projects.js` — titles, descriptions, credits, categories, and image paths.

### Edit copy
Bio, philosophy, contact info, and all page text is in `src/app/page.js`.

### Add new projects
Add a new object to the `PROJECTS` array in `src/data/projects.js` following the existing pattern, and drop the cover image into `public/images/`.

## Tech Stack

- **Next.js 14** — React framework with App Router
- **Tailwind CSS** — utility classes available alongside custom CSS
- **Custom CSS** — editorial design system with CSS variables
- **Google Fonts** — Cormorant Garamond, DM Sans, JetBrains Mono

## Design System

The site uses CSS custom properties defined in `globals.css`:

- `--font-display` — Cormorant Garamond (headings, editorial type)
- `--font-body` — DM Sans (body copy, UI)
- `--font-mono` — JetBrains Mono (labels, metadata)
- `--c-bg` — Background (#faf9f7)
- `--c-fg` — Foreground (#141210)
- `--c-fg-secondary` — Secondary text
- `--c-fg-tertiary` — Tertiary/label text
- `--c-border` — Border color
