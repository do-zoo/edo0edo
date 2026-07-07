# edo0edo.me Rewrite Design Spec

**Date:** 2026-07-07  
**Status:** Approved  
**Author:** Edwar + AI brainstorming session

## Overview

Full rewrite of [edo0edo.me](https://edo0edo.me) — personal portfolio website for Edwar, JavaScript/Web Developer based in Jakarta, Indonesia. Replace the existing Mantine-based Next.js 14 site with a clean Next.js 16 + shadcn/ui stack, Sanity CMS for dynamic content, and a new visual identity.

## Goals

- Multi-page portfolio: Home, About, Projects, Blog
- Modern stack: Next.js 16, shadcn/ui, Tailwind CSS, Sanity CMS
- Total visual redesign with new identity
- Full SEO & analytics migration from existing site
- Deploy on Vercel with on-demand ISR via Sanity webhooks

## Non-Goals

- Light/dark theme toggle (dark only)
- Jest / Storybook testing infrastructure
- Bilingual support (English only)
- CMS-managed About page content

## Approach

**Clean Slate Wipe** — delete all existing source code, bootstrap fresh with `create-next-app@latest` in the same repo. Git history preserved; working tree replaced entirely.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack dev) |
| UI | shadcn/ui + Tailwind CSS v4 |
| CMS | Sanity v3 (Projects + Blog) |
| Language | TypeScript |
| Icons | Lucide React |
| Fonts | Geist Sans + Geist Mono (via `next/font`) |
| Deploy | Vercel |
| Package manager | pnpm |

### Removed from Old Stack

Mantine, CSS Modules, Storybook, Jest, PostCSS Mantine preset, Tabler Icons, eslint-config-mantine, eslint-config-airbnb.

---

## Architecture

### Folder Structure

```
edo0edo/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout (nav, footer, analytics, JSON-LD)
│   │   ├── page.tsx                # Homepage
│   │   ├── not-found.tsx           # Custom 404
│   │   ├── loading.tsx             # Global loading skeleton
│   │   ├── error.tsx               # Error boundary
│   │   ├── about/page.tsx          # Static About page
│   │   ├── projects/
│   │   │   ├── page.tsx            # Projects listing
│   │   │   └── [slug]/page.tsx     # Case study detail
│   │   ├── blog/
│   │   │   ├── page.tsx            # Blog listing
│   │   │   └── [slug]/page.tsx     # Blog post detail
│   │   └── api/
│   │       └── revalidate/route.ts # Sanity webhook handler
│   ├── components/
│   │   ├── ui/                     # shadcn components
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   ├── project-card.tsx
│   │   ├── blog-card.tsx
│   │   └── ...
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts           # Sanity client config
│   │   │   ├── queries.ts          # GROQ queries
│   │   │   └── types.ts            # Generated/fetched types
│   │   └── utils.ts                # cn() helper
│   └── data/
│       └── about.ts                  # Static About content
├── sanity/
│   ├── schemas/
│   │   ├── project.ts
│   │   └── post.ts
│   └── sanity.config.ts
├── public/
│   ├── favicon.svg
│   ├── images/
│   ├── robots.txt
│   └── sitemap.xml
└── docs/superpowers/specs/
```

### Data Flow

```
Sanity CMS ──webhook──▶ POST /api/revalidate ──▶ revalidatePath()
                                                        │
Static about.ts ────────────────────────────────────────┘
                                                        │
                                                   Next.js pages
```

- **Projects & Blog**: fetched from Sanity via GROQ queries, ISR with `revalidate` + on-demand revalidation via Sanity webhook
- **About**: imported directly from `src/data/about.ts`
- **Homepage**: combination of static content + featured projects from Sanity (`featured: true`)

---

## Pages

| Route | Type | Source | Description |
|---|---|---|---|
| `/` | Homepage | Static + Sanity | Hero, featured projects, stats, skills, CTA |
| `/about` | About | Static (`about.ts`) | Bio, experience, skills, contact info |
| `/projects` | Listing | Sanity | Grid of all projects with tags |
| `/projects/[slug]` | Detail | Sanity | Full case study per project |
| `/blog` | Listing | Sanity | List of articles with tags and date |
| `/blog/[slug]` | Detail | Sanity | Full blog post with portable text |

### Homepage Sections

1. **Hero** — name, title, avatar, CTA buttons (email + GitHub)
2. **Featured Projects** — 2–3 projects with `featured: true` from Sanity
3. **Stats** — projects done, experience, client satisfaction (from `about.ts`)
4. **Skills** — tech stack grid (from `about.ts`)
5. **CTA** — "Let's work together" with email link

---

## Content Schema

### Sanity: Project

```typescript
{
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'description', type: 'text', rows: 3 },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'liveUrl', type: 'url' },
    { name: 'githubUrl', type: 'url' },
    { name: 'featured', type: 'boolean', initialValue: false },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
  ]
}
```

### Sanity: Blog Post

```typescript
{
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', validation: required },
    { name: 'slug', type: 'slug', options: { source: 'title' } },
    { name: 'excerpt', type: 'text', rows: 3 },
    { name: 'coverImage', type: 'image', options: { hotspot: true } },
    { name: 'tags', type: 'array', of: [{ type: 'string' }] },
    { name: 'publishedAt', type: 'datetime' },
    { name: 'body', type: 'array', of: [{ type: 'block' }, { type: 'image' }, { type: 'code' }] },
  ]
}
```

### Static: About (`src/data/about.ts`)

```typescript
export const about = {
  name: 'Edwar',
  title: 'JavaScript Developer',
  location: 'Jakarta, Indonesia',
  bio: 'Professional description...',
  stats: {
    projects: '15+',
    experience: '2+ Years',
    satisfaction: '100%',
  },
  skills: [
    'HTML', 'CSS', 'TailwindCSS', 'Git', 'JavaScript', 'TypeScript',
    'Node.js', 'React', 'Next.js', 'Discord.js', 'Express.js',
    'MongoDB', 'VS Code', 'Figma',
  ],
  social: {
    github: 'https://github.com/do-zoo',
    linkedin: 'https://www.linkedin.com/in/edo0edo',
    instagram: 'https://www.instagram.com/edo0edo',
    email: 'edwardedo603@gmail.com',
  },
  experience: [], // optional timeline entries
}
```

---

## Visual Design

### Direction: "Refined Dark"

Minimal aesthetic with a strong accent color. Typography and spacing carry the design; no heavy gradients.

### Color Palette (shadcn CSS variables)

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0a0a0a` | Page background |
| `--foreground` | `#fafafa` | Primary text |
| `--primary` | `#6366f1` | Indigo — buttons, links, accents |
| `--primary-foreground` | `#fafafa` | Text on primary |
| `--muted` | `#1a1a1a` | Cards, secondary surfaces |
| `--muted-foreground` | `#a1a1aa` | Secondary text |
| `--border` | `#27272a` | Borders, dividers |
| `--accent` | `#6366f1` | Hover states, highlights |

Dark theme only. No light mode toggle.

### Typography

| Role | Font | Weight |
|---|---|---|
| Headings | Geist Sans | 600–700 |
| Body | Geist Sans | 400–500 |
| Code/mono | Geist Mono | 400 |

Loaded via `next/font/google` or Geist package.

### Layout

- **Max width**: `max-w-5xl` (1024px) for content, `max-w-7xl` for full-width sections
- **Section spacing**: `py-24` between homepage sections
- **Grid**: CSS Grid for project/blog cards, responsive 1 → 2 → 3 columns
- **Navigation**: Sticky header with blur backdrop (`backdrop-blur-md bg-background/80`)

### shadcn Components

| Component | Usage |
|---|---|
| `Button` | CTA, nav actions |
| `Card` | Project cards, blog cards, skill cards |
| `Badge` | Tags (project/blog) |
| `Separator` | Section dividers |
| `Sheet` | Mobile navigation drawer |
| `Avatar` | Hero profile image |
| `NavigationMenu` | Desktop nav links |
| `Skeleton` | Loading states |

### Visual Rules

- No gradient text — plain foreground headings, accent only on interactive elements
- Subtle borders on cards (`border border-border`), no heavy shadows
- Hover: subtle scale/opacity transitions on cards
- Images: `rounded-lg`, consistent aspect ratios

---

## SEO & Analytics

### Metadata (per page)

| Page | Title Pattern |
|---|---|
| Home | `Edwar \| Web Developer in Jakarta, Indonesia` |
| About | `About \| Edwar` |
| Projects | `Projects \| Edwar` |
| Project detail | `{title} \| Edwar` |
| Blog | `Blog \| Edwar` |
| Blog post | `{title} \| Edwar` |

- `metadataBase`: `https://edo0edo.me`
- Open Graph + Twitter cards auto-generated from metadata
- `robots.txt` + `sitemap.xml` via App Router sitemap or `next-sitemap`

### JSON-LD Schema

- **Person** — in root layout (name, url, image, jobTitle, address, sameAs)
- **Review** — LinkedIn testimonial (migrated from old site)
- **BlogPosting** — auto-generated per blog post page
- **CreativeWork** — auto-generated per project detail page

### Analytics

| Service | Package | Env Var |
|---|---|---|
| Google Tag Manager | `@next/third-parties/google` | `GTM_ID` |
| Google Analytics | `@next/third-parties/google` | `GA_ID` |

### Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
GTM_ID=
GA_ID=
```

---

## Error Handling

| Scenario | Handling |
|---|---|
| Project/blog slug not found | `notFound()` → custom 404 page |
| Sanity fetch fails | Fallback UI + console error; page renders with empty state |
| Missing env vars | Build-time warning; CMS pages show empty/coming-soon state |
| Invalid Sanity data | Type-safe GROQ queries; optional Zod validation in fetch layer |

### Custom Pages

- `not-found.tsx` — branded 404 with link to homepage
- `loading.tsx` — skeleton loaders (shadcn Skeleton)
- `error.tsx` — error boundary with retry button

---

## Sanity Webhook Revalidation

```
Sanity (on publish/unpublish) → POST /api/revalidate?secret=... → revalidatePath('/projects') etc.
```

Configure webhook in Sanity dashboard pointing to production Vercel URL.

---

## Testing Strategy

No Jest or Storybook. Validation via:

- `pnpm build` — catch type and build errors
- Manual QA on Vercel preview deploys
- Lighthouse audit for performance and SEO

---

## Migration Checklist

Assets and content to preserve from old site:

- [ ] `public/favicon.svg`
- [ ] `public/images/` (hero avatar, etc.)
- [ ] SEO metadata strings (title, description, keywords)
- [ ] JSON-LD Person and Review schema data
- [ ] Social media URLs
- [ ] Email address
- [ ] Stats numbers (15+ projects, 2+ years, 100% satisfaction)
- [ ] Skills list
- [ ] GTM_ID and GA_ID env vars

---

## Success Criteria

1. All 6 routes render correctly (home, about, projects list, project detail, blog list, blog post)
2. Sanity CMS can create/edit projects and blog posts
3. Publishing in Sanity triggers revalidation on Vercel
4. SEO metadata and JSON-LD present on all pages
5. GA and GTM fire correctly
6. Lighthouse performance score ≥ 90
7. Mobile responsive with working Sheet navigation
8. `pnpm build` passes with zero errors
