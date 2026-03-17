# Ethan Cheng — Fashion & Editorial Photography

A premium fashion photography portfolio built with Next.js 14, Sanity CMS, and Tailwind CSS. Real App Router pages, CMS-driven content, functional contact form, and editorial design system.

## Tech Stack

- **Next.js 14** — App Router with real routes and per-page SEO
- **Sanity CMS** — Content management for projects, pages, navigation, and settings
- **Tailwind CSS** — Utility classes alongside a custom editorial CSS design system
- **Resend** — Contact form email delivery (optional)
- **Vercel** — Zero-config deployment

## Project Structure

```
├── public/images/                      # Photography assets
├── src/
│   ├── app/
│   │   ├── (site)/                     # Main site route group
│   │   │   ├── layout.js              # Shared layout (Header + Footer)
│   │   │   ├── page.js                # Home — /
│   │   │   ├── portfolio/page.js      # Portfolio — /portfolio
│   │   │   ├── portfolio/[slug]/page.js  # Project detail — /portfolio/:slug
│   │   │   ├── about/page.js          # About — /about
│   │   │   └── contact/page.js        # Contact — /contact
│   │   ├── (studio)/studio/           # Sanity Studio — /studio
│   │   ├── api/contact/route.js       # Contact form API endpoint
│   │   ├── globals.css                # Design system + all styling
│   │   └── layout.js                  # Root layout with metadata
│   ├── components/
│   │   ├── Header.js                  # Navigation (Link-based, CMS-driven)
│   │   ├── Footer.js                  # Footer (CMS identity + social links)
│   │   ├── HomePage.js                # Hero, quote, featured grid, clients, CTA
│   │   ├── PortfolioPage.js           # Filter state + grid composition
│   │   ├── PortfolioIntro.js          # Portfolio page header
│   │   ├── PortfolioFilters.js        # Category filter tabs
│   │   ├── ProjectGrid.js             # Project card grid layout
│   │   ├── ProjectCard.js             # Individual project card (Link-based)
│   │   ├── ProjectPage.js             # Project detail with gallery
│   │   ├── ProjectImage.js            # Next/Image wrapper with reveal
│   │   ├── AboutPage.js               # Biography, info, clients, philosophy
│   │   ├── ContactPage.js             # Contact info + functional form
│   │   └── FadeIn.js                  # Scroll-triggered reveal animation
│   ├── lib/
│   │   ├── sanity.js                  # Sanity client + data fetching
│   │   └── queries.js                 # All GROQ queries
│   ├── sanity/schemaTypes/            # CMS content schemas
│   │   ├── project.js
│   │   ├── siteSettings.js
│   │   ├── navigationItem.js
│   │   ├── category.js
│   │   ├── portfolioPage.js
│   │   ├── aboutPage.js
│   │   └── contactPage.js
│   └── data/projects.js               # Static fallback data
├── sanity.config.js                    # Sanity Studio configuration
├── package.json
├── next.config.js
└── tailwind.config.js
```

## Getting Started

```bash
npm install
npm run dev
# Site:   http://localhost:3000
# CMS:    http://localhost:3000/studio
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, quote, featured work, clients, feature article, CTA |
| `/portfolio` | Filterable project grid with category tabs |
| `/portfolio/:slug` | Individual project page with credits + gallery |
| `/about` | Biography, working cities, specialties, clients, philosophy |
| `/contact` | Contact info + functional inquiry form |
| `/studio` | Sanity CMS Studio |

All routes have real URLs, browser back/forward support, shareable links, and route-specific metadata.

## CMS (Sanity Studio)

Access at `/studio`. Content is organized into:

- **Site Settings** — Site name, social links, footer text, hero, quote, clients, feature article, CTA
- **Pages** — Portfolio Page settings, About Page, Contact Page
- **Navigation** — Orderable nav items with visibility toggles
- **Categories** — Portfolio filter categories (orderable)
- **Projects** — Full project data with cover/gallery images, credits, ordering

All CMS content has code-side fallback defaults — the site works without any CMS data.

## Contact Form

The contact form at `/contact` posts to `/api/contact`. To enable email delivery:

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Create an API key
3. Add to `.env.local`:

```
RESEND_API_KEY=re_your_key_here
CONTACT_EMAIL=your@email.com
```

Without these env vars, form submissions are logged to the server console.

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. Add environment variables in Vercel project settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET` (default: `production`)
   - `RESEND_API_KEY` (optional)
   - `CONTACT_EMAIL` (optional)
4. Deploy

## How to Update Content

### Via CMS (recommended)
Go to `/studio` and edit projects, pages, navigation, categories, and site settings.

### Replace images
Drop new files into `public/images/` or upload through Sanity's media library.

### Static fallback data
`src/data/projects.js` contains fallback project and client data used when CMS is unavailable.

## Design System

Typography:
- **Display**: Cormorant Garamond — headings, editorial titles
- **Body**: DM Sans — body copy, UI elements
- **Mono**: JetBrains Mono — labels, metadata, categories

Colors:
- Background: `#faf9f7`
- Foreground: `#141210`
- Secondary: `#6b6560`
- Tertiary: `#9a948e`
- Border: `#e8e2dc`

## License

All photography © Ethan Cheng. All rights reserved.
