# edo0edo.me Rewrite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite edo0edo.me from scratch as a multi-page portfolio using Next.js 16, shadcn/ui, and Sanity CMS.

**Architecture:** Clean slate wipe of the Mantine codebase, bootstrap Next.js 16 App Router with shadcn/ui dark theme. Static content in `src/data/about.ts`, dynamic Projects/Blog from Sanity with ISR + webhook revalidation on Vercel.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), Sanity v3, next-sanity, Lucide React, Geist font, pnpm, Vercel

## Global Constraints

- Next.js **16** (latest), App Router, Turbopack dev, `src/` directory, import alias `@/*`
- UI: **shadcn/ui** + Tailwind CSS v4, dark theme only (no light mode toggle)
- CMS: **Sanity v3** for Projects + Blog only; About is static in `src/data/about.ts`
- Language: **English** for all UI copy
- Fonts: **Geist Sans** + **Geist Mono** via `next/font`
- Color palette: background `#0a0a0a`, foreground `#fafafa`, primary `#6366f1`, muted `#1a1a1a`, border `#27272a`
- Deploy target: **Vercel** with on-demand ISR via Sanity webhook
- SEO: full migration — metadata, JSON-LD (Person + Review in layout, BlogPosting + CreativeWork per detail page), GA + GTM via `@next/third-parties/google`
- No Jest, no Storybook — validate with `pnpm build` + manual QA
- Package manager: **pnpm**
- Domain: `https://edo0edo.me`

---

## File Map

| File | Responsibility |
|---|---|
| `src/app/layout.tsx` | Root layout, fonts, metadata, JSON-LD, analytics, header/footer shell |
| `src/app/page.tsx` | Homepage (hero, featured projects, stats, skills, CTA) |
| `src/app/about/page.tsx` | Static about page |
| `src/app/projects/page.tsx` | Projects listing from Sanity |
| `src/app/projects/[slug]/page.tsx` | Project case study detail |
| `src/app/blog/page.tsx` | Blog listing from Sanity |
| `src/app/blog/[slug]/page.tsx` | Blog post detail with portable text |
| `src/app/api/revalidate/route.ts` | Sanity webhook → `revalidatePath()` |
| `src/app/sitemap.ts` | Dynamic sitemap generation |
| `src/app/not-found.tsx` | Branded 404 |
| `src/app/loading.tsx` | Global skeleton loader |
| `src/app/error.tsx` | Error boundary with retry |
| `src/data/about.ts` | Static bio, stats, skills, social links |
| `src/lib/sanity/client.ts` | Sanity client factory |
| `src/lib/sanity/queries.ts` | GROQ query strings |
| `src/lib/sanity/types.ts` | TypeScript types for Sanity documents |
| `src/lib/sanity/image.ts` | Sanity image URL builder |
| `src/lib/sanity/fetch.ts` | Fetch helpers with error handling |
| `src/lib/seo/json-ld.ts` | JSON-LD schema builders |
| `src/components/header.tsx` | Sticky nav + mobile Sheet drawer |
| `src/components/footer.tsx` | Footer links + social icons |
| `src/components/project-card.tsx` | Project card for grids |
| `src/components/blog-card.tsx` | Blog post card for grids |
| `src/components/portable-text.tsx` | Sanity portable text renderer |
| `sanity/schemas/project.ts` | Sanity project document schema |
| `sanity/schemas/post.ts` | Sanity blog post document schema |
| `sanity/schemas/index.ts` | Schema registry |
| `sanity.config.ts` | Sanity Studio config |
| `sanity.cli.ts` | Sanity CLI config |
| `.env.local` | Local env vars (not committed) |
| `.env.example` | Env var template (committed) |

---

### Task 1: Clean Slate Wipe + Next.js 16 Bootstrap

**Files:**
- Delete: all old source (`src/`, `.storybook/`, `test-utils/`, old configs)
- Preserve: `.git/`, `docs/`, `public/favicon.svg`, `public/robots.txt`, `LICENCE`
- Create: fresh Next.js 16 scaffold

**Interfaces:**
- Produces: working Next.js 16 app with `src/app/layout.tsx`, `src/app/page.tsx`, `tailwind` configured

- [ ] **Step 1: Backup assets and docs**

```bash
cd /Users/mac/Documents/projects/edo0edo
mkdir -p .rewrite-backup
cp public/favicon.svg public/robots.txt .rewrite-backup/ 2>/dev/null || true
cp -r docs .rewrite-backup/
```

- [ ] **Step 2: Remove old codebase (keep .git, docs, backup)**

```bash
cd /Users/mac/Documents/projects/edo0edo
rm -rf src .storybook test-utils
rm -f jest.config.cjs jest.setup.cjs postcss.config.cjs
rm -f .stylelintrc.json .stylelintignore .prettierrc.cjs .prettierignore
rm -f .eslintrc.cjs .eslintignore
rm -f package.json pnpm-lock.yaml tsconfig.json next.config.mjs next-env.d.ts
rm -rf .vscode
# Keep: .git, docs/, .rewrite-backup/, LICENCE, public/
```

- [ ] **Step 3: Bootstrap Next.js 16 in temp folder**

```bash
cd /Users/mac/Documents/projects/edo0edo
pnpm create next-app@latest _temp --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
shopt -s dotglob 2>/dev/null || true
mv _temp/* . 2>/dev/null
mv _temp/.eslintrc.json _temp/.gitignore _temp/.next 2>/dev/null || true
rm -rf _temp
pnpm install
```

- [ ] **Step 4: Restore preserved assets**

```bash
cp .rewrite-backup/favicon.svg public/favicon.svg 2>/dev/null || true
cp .rewrite-backup/robots.txt public/robots.txt 2>/dev/null || true
rm -rf .rewrite-backup
```

- [ ] **Step 5: Verify bootstrap**

Run: `pnpm build`
Expected: PASS — default Next.js page builds successfully

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: wipe old codebase and bootstrap Next.js 16"
```

---

### Task 2: shadcn/ui Init + Dark Theme

**Files:**
- Create: `components.json`, `src/lib/utils.ts`, `src/components/ui/*`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Next.js 16 + Tailwind from Task 1
- Produces: `cn()` utility at `@/lib/utils`, shadcn UI components, dark theme CSS variables

- [ ] **Step 1: Initialize shadcn/ui**

```bash
cd /Users/mac/Documents/projects/edo0edo
pnpm dlx shadcn@latest init -d --base radix
```

- [ ] **Step 2: Add required shadcn components**

```bash
pnpm dlx shadcn@latest add button card badge separator sheet avatar skeleton navigation-menu
```

- [ ] **Step 3: Apply "Refined Dark" theme in `src/app/globals.css`**

Replace the `:root` and `.dark` CSS variable blocks with:

```css
:root {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --card: #1a1a1a;
  --card-foreground: #fafafa;
  --popover: #1a1a1a;
  --popover-foreground: #fafafa;
  --primary: #6366f1;
  --primary-foreground: #fafafa;
  --secondary: #1a1a1a;
  --secondary-foreground: #fafafa;
  --muted: #1a1a1a;
  --muted-foreground: #a1a1aa;
  --accent: #6366f1;
  --accent-foreground: #fafafa;
  --destructive: #ef4444;
  --destructive-foreground: #fafafa;
  --border: #27272a;
  --input: #27272a;
  --ring: #6366f1;
  --radius: 0.5rem;
}
```

Remove any light-mode-only overrides. Force dark by adding `class="dark"` on `<html>` in layout (Task 3).

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add components.json src/lib/utils.ts src/components/ui/ src/app/globals.css
git commit -m "feat: initialize shadcn/ui with refined dark theme"
```

---

### Task 3: Static About Data + Root Layout Shell

**Files:**
- Create: `src/data/about.ts`, `src/lib/seo/json-ld.ts`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: shadcn theme from Task 2
- Produces: `about` export from `@/data/about`, `personJsonLd()` and `reviewJsonLd()` from `@/lib/seo/json-ld`, root layout with Geist fonts + metadata

- [ ] **Step 1: Create `src/data/about.ts`**

```typescript
export const about = {
  name: 'Edwar',
  title: 'JavaScript Developer',
  location: 'Jakarta, Indonesia',
  bio: 'A JavaScript Developer in Indonesia. Skilled specialist in Front-End Dev, creating engaging and optimized websites.',
  longBio:
    'Every moment, I am ambitious to acquire projects, and I work on them wholeheartedly to deliver maximum results for you.',
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
} as const;

export type About = typeof about;
```

- [ ] **Step 2: Create `src/lib/seo/json-ld.ts`**

```typescript
import { about } from '@/data/about';

const SITE_URL = 'https://edo0edo.me';
const AVATAR_URL = `${SITE_URL}/images/jpg/hero-avatar.jpg`;

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: about.name,
    url: SITE_URL,
    image: {
      '@type': 'ImageObject',
      contentUrl: AVATAR_URL,
      license: `${SITE_URL}/license`,
      acquireLicensePage: `${SITE_URL}/image-usage`,
      creditText: 'Edo0Edo Studio',
      creator: { '@type': 'Person', name: 'Edo' },
      copyrightNotice: 'Edo',
    },
    jobTitle: 'Web Developer',
    worksFor: { '@type': 'Organization', name: 'Freelance' },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Jakarta',
      addressCountry: 'Indonesia',
    },
    description:
      'Professional Web Developer based in Jakarta, Indonesia. Specializing in modern websites and web applications.',
    sameAs: [about.social.github, about.social.linkedin, about.social.instagram],
  };
}

export function reviewJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: 'Isa J.P Simanjuntak',
      url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7138236835821977600',
    },
    publisher: { '@type': 'Organization', name: 'LinkedIn' },
    datePublished: '2024-03-31',
    description:
      'It was a pleasure working with Edwar. Fast response, can provide the best input and can apply web ideas with maximum results 👍🔥 Excellent!',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: '5',
      bestRating: '5',
      worstRating: '1',
    },
    itemReviewed: {
      '@type': 'LocalBusiness',
      name: 'Edo Web Development',
      url: SITE_URL,
      image: {
        '@type': 'ImageObject',
        contentUrl: AVATAR_URL,
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Jakarta',
        addressLocality: 'Jakarta',
        addressCountry: 'ID',
        postalCode: '11320',
      },
      telephone: '+62-851-5735-8266',
      priceRange: '$$',
      description:
        'Professional freelance web development service based in Jakarta, Indonesia.',
    },
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  coverImageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `${SITE_URL}/blog/${post.slug}`,
    image: post.coverImageUrl,
    author: { '@type': 'Person', name: about.name, url: SITE_URL },
  };
}

export function creativeWorkJsonLd(project: {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  coverImageUrl?: string;
  liveUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    datePublished: project.publishedAt,
    url: project.liveUrl ?? `${SITE_URL}/projects/${project.slug}`,
    image: project.coverImageUrl,
    author: { '@type': 'Person', name: about.name, url: SITE_URL },
  };
}
```

- [ ] **Step 3: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { personJsonLd, reviewJsonLd } from '@/lib/seo/json-ld';
import './globals.css';

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://edo0edo.me'),
  title: 'Edwar | Web Developer in Jakarta, Indonesia',
  description:
    "Professional Web Developer based in Jakarta, Indonesia. Specializing in modern websites, web applications, and digital solutions. Let's build your next project!",
  keywords:
    'Web Developer Jakarta, Freelance Web Developer, Website Developer Indonesia, Frontend Developer, Backend Developer, Fullstack Developer',
  authors: [{ name: 'Edwar' }],
  robots: 'index, follow',
};

const { GTM_ID, GA_ID } = process.env;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable}`}>
      <head>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <link rel="shortcut icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd()) }}
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Install analytics dependency**

```bash
pnpm add @next/third-parties
```

- [ ] **Step 5: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/about.ts src/lib/seo/json-ld.ts src/app/layout.tsx package.json pnpm-lock.yaml
git commit -m "feat: add static about data, SEO schemas, and root layout shell"
```

---

### Task 4: Header + Footer Components

**Files:**
- Create: `src/components/header.tsx`, `src/components/footer.tsx`
- Modify: `src/app/layout.tsx` (add Header + Footer)

**Interfaces:**
- Consumes: shadcn Button, Sheet from Task 2; `about.social` from Task 3
- Produces: `<Header />` and `<Footer />` components

- [ ] **Step 1: Create `src/components/header.tsx`**

```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { about } from '@/data/about';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold">
          edo0edo
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href={`mailto:${about.social.email}`}>Let&apos;s Talk</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4">
                <Link href={`mailto:${about.social.email}`}>Let&apos;s Talk</Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create `src/components/footer.tsx`**

```tsx
import Link from 'next/link';
import { Github, Instagram, Linkedin } from 'lucide-react';
import { about } from '@/data/about';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const socialLinks = [
  { href: about.social.linkedin, icon: Linkedin, label: 'LinkedIn' },
  { href: about.social.instagram, icon: Instagram, label: 'Instagram' },
  { href: about.social.github, icon: Github, label: 'GitHub' },
];

export function Footer() {
  return (
    <footer className="border-t border-border py-12">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">@ Created by {about.name}</p>
          <nav className="flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex gap-3">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire Header + Footer into layout**

Add to `src/app/layout.tsx` body, wrapping `{children}`:

```tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

// inside body:
<Header />
<main className="mx-auto min-h-screen max-w-5xl px-4">{children}</main>
<Footer />
```

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/header.tsx src/components/footer.tsx src/app/layout.tsx
git commit -m "feat: add header and footer navigation components"
```

---

### Task 5: Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/skill-grid.tsx`, `src/components/stats-section.tsx`

**Interfaces:**
- Consumes: `about` from `@/data/about`, shadcn Button/Card/Avatar from Task 2
- Produces: Homepage with hero, stats, skills, CTA sections (featured projects wired in Task 8)

- [ ] **Step 1: Create `src/components/stats-section.tsx`**

```tsx
import { about } from '@/data/about';

const stats = [
  { label: 'Projects Done', value: about.stats.projects },
  { label: 'Experience', value: about.stats.experience },
  { label: 'Client Satisfaction', value: about.stats.satisfaction },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {stat.label}
          </p>
          <p className="mt-2 text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Create `src/components/skill-grid.tsx`**

```tsx
import { Card, CardContent } from '@/components/ui/card';
import { about } from '@/data/about';

export function SkillGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {about.skills.map((skill) => (
        <Card key={skill} className="border-border transition-opacity hover:opacity-80">
          <CardContent className="flex items-center justify-center p-4">
            <span className="text-sm font-medium">{skill}</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Replace `src/app/page.tsx`**

```tsx
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { about } from '@/data/about';

export default function HomePage() {
  return (
    <div className="space-y-24 py-12">
      {/* Hero */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center text-center">
        <Avatar className="h-32 w-32">
          <AvatarImage src="/images/jpg/hero-avatar.jpg" alt={about.name} />
          <AvatarFallback>{about.name[0]}</AvatarFallback>
        </Avatar>
        <h1 className="mt-8 text-4xl font-bold tracking-tight md:text-5xl">
          Hello, I&apos;m {about.name}
        </h1>
        <p className="mt-2 text-xl text-muted-foreground">
          {about.title} based in {about.location}
        </p>
        <p className="mt-4 max-w-xl text-muted-foreground">{about.bio}</p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href={`mailto:${about.social.email}`}>Get in Touch</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={about.social.github} target="_blank" rel="noopener noreferrer">
              View All Works
            </Link>
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section>
        <h2 className="mb-8 text-2xl font-bold">At a Glance</h2>
        <StatsSection />
      </section>

      {/* Skills */}
      <section>
        <h2 className="mb-8 text-2xl font-bold">What I Do</h2>
        <SkillGrid />
      </section>

      {/* CTA */}
      <section className="rounded-lg border border-border bg-muted p-12 text-center">
        <h2 className="text-2xl font-bold">Let&apos;s Work Together</h2>
        <p className="mt-4 text-muted-foreground">
          Have a project in mind? I&apos;d love to hear about it.
        </p>
        <Button asChild className="mt-6">
          <Link href={`mailto:${about.social.email}`}>Send Me an Email</Link>
        </Button>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/page.tsx src/components/skill-grid.tsx src/components/stats-section.tsx
git commit -m "feat: build homepage with hero, stats, skills, and CTA"
```

---

### Task 6: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `about` from `@/data/about`
- Produces: `/about` route with metadata

- [ ] **Step 1: Create `src/app/about/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SkillGrid } from '@/components/skill-grid';
import { StatsSection } from '@/components/stats-section';
import { about } from '@/data/about';

export const metadata: Metadata = {
  title: 'About | Edwar',
  description: about.bio,
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-12">
      <section>
        <h1 className="text-4xl font-bold">About Me</h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{about.longBio}</p>
        <p className="mt-4 text-muted-foreground">
          {about.title} · {about.location}
        </p>
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold">Stats</h2>
        <StatsSection />
      </section>

      <section>
        <h2 className="mb-8 text-2xl font-bold">Skills</h2>
        <SkillGrid />
      </section>

      <section className="text-center">
        <Button asChild>
          <Link href={`mailto:${about.social.email}`}>Get in Touch</Link>
        </Button>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "feat: add static about page"
```

---

### Task 7: Sanity CMS Setup

**Files:**
- Create: `sanity/schemas/project.ts`, `sanity/schemas/post.ts`, `sanity/schemas/index.ts`, `sanity.config.ts`, `sanity.cli.ts`
- Create: `src/lib/sanity/client.ts`, `src/lib/sanity/queries.ts`, `src/lib/sanity/types.ts`, `src/lib/sanity/image.ts`, `src/lib/sanity/fetch.ts`
- Create: `.env.example`
- Modify: `package.json` (add sanity scripts)

**Interfaces:**
- Produces:
  - `client` from `@/lib/sanity/client`
  - `urlFor(image)` from `@/lib/sanity/image`
  - `getProjects()`, `getProjectBySlug(slug)`, `getFeaturedProjects()`, `getPosts()`, `getPostBySlug(slug)` from `@/lib/sanity/fetch`
  - Types: `Project`, `Post` from `@/lib/sanity/types`

- [ ] **Step 1: Install Sanity dependencies**

```bash
pnpm add next-sanity @sanity/image-url @portabletext/react
pnpm add -D sanity @sanity/vision
```

- [ ] **Step 2: Create `.env.example`**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=
GTM_ID=
GA_ID=
```

- [ ] **Step 3: Create Sanity schemas**

`sanity/schemas/project.ts`:

```typescript
import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'liveUrl', type: 'url' }),
    defineField({ name: 'githubUrl', type: 'url' }),
    defineField({ name: 'featured', type: 'boolean', initialValue: false }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }],
    }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
});
```

`sanity/schemas/post.ts`:

```typescript
import { defineField, defineType } from 'sanity';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'excerpt', type: 'text', rows: 3 }),
    defineField({ name: 'coverImage', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'publishedAt', type: 'datetime' }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
        { type: 'code' },
      ],
    }),
  ],
  preview: { select: { title: 'title', media: 'coverImage' } },
});
```

`sanity/schemas/index.ts`:

```typescript
import { project } from './project';
import { post } from './post';

export const schemaTypes = [project, post];
```

- [ ] **Step 4: Create `sanity.config.ts` and `sanity.cli.ts`**

`sanity.cli.ts`:

```typescript
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
```

`sanity.config.ts`:

```typescript
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'edo0edo',
  title: 'edo0edo CMS',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
```

- [ ] **Step 5: Create Sanity lib files**

`src/lib/sanity/types.ts`:

```typescript
import type { PortableTextBlock } from '@portabletext/react';

export interface SanityImage {
  _type: 'image';
  asset: { _ref: string; _type: 'reference' };
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  coverImage?: SanityImage;
  tags?: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
  publishedAt: string;
  body?: PortableTextBlock[];
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  coverImage?: SanityImage;
  tags?: string[];
  publishedAt: string;
  body?: PortableTextBlock[];
}
```

`src/lib/sanity/client.ts`:

```typescript
import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const apiVersion = '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

export const client = isSanityConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true })
  : null;
```

`src/lib/sanity/queries.ts`:

```typescript
export const projectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, featured, publishedAt
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, featured, publishedAt, body
}`;

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc)[0...3] {
  _id, title, slug, description, coverImage, tags, liveUrl, githubUrl, publishedAt
}`;

export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id, title, slug, excerpt, coverImage, tags, publishedAt
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id, title, slug, excerpt, coverImage, tags, publishedAt, body
}`;
```

`src/lib/sanity/image.ts`:

```typescript
import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';
import type { SanityImage } from './types';

const builder = client ? imageUrlBuilder(client) : null;

export function urlFor(source: SanityImage) {
  if (!builder) return '';
  return builder.image(source).width(800).height(600).url();
}
```

`src/lib/sanity/fetch.ts`:

```typescript
import { client, isSanityConfigured } from './client';
import {
  projectsQuery,
  projectBySlugQuery,
  featuredProjectsQuery,
  postsQuery,
  postBySlugQuery,
} from './queries';
import type { Project, Post } from './types';

async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch<T>(query, params, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}

export async function getProjects(): Promise<Project[]> {
  const result = await sanityFetch<Project[]>(projectsQuery);
  return result ?? [];
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return sanityFetch<Project>(projectBySlugQuery, { slug });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const result = await sanityFetch<Project[]>(featuredProjectsQuery);
  return result ?? [];
}

export async function getPosts(): Promise<Post[]> {
  const result = await sanityFetch<Post[]>(postsQuery);
  return result ?? [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return sanityFetch<Post>(postBySlugQuery, { slug });
}
```

- [ ] **Step 6: Add sanity script to `package.json`**

```json
"studio": "sanity dev"
```

- [ ] **Step 7: Verify**

Run: `pnpm build`
Expected: PASS (Sanity not configured yet — fetch returns empty arrays, no crash)

- [ ] **Step 8: Commit**

```bash
git add sanity/ src/lib/sanity/ .env.example package.json pnpm-lock.yaml
git commit -m "feat: set up Sanity CMS schemas and fetch layer"
```

---

### Task 8: Projects Pages + Cards

**Files:**
- Create: `src/components/project-card.tsx`, `src/components/portable-text.tsx`
- Create: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`
- Modify: `src/app/page.tsx` (add featured projects section)

**Interfaces:**
- Consumes: `getProjects()`, `getProjectBySlug()`, `getFeaturedProjects()` from Task 7; `urlFor()` from Task 7; `creativeWorkJsonLd()` from Task 3
- Produces: `/projects` and `/projects/[slug]` routes, `<ProjectCard />`, `<PortableText />`

- [ ] **Step 1: Create `src/components/project-card.tsx`**

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity/image';
import type { Project } from '@/lib/sanity/types';

export function ProjectCard({ project }: { project: Project }) {
  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;

  return (
    <Link href={`/projects/${project.slug.current}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-lg">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{project.description}</p>
          {project.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/components/portable-text.tsx`**

```tsx
import { PortableText as PortableTextRenderer } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/react';

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return (
    <div className="prose prose-invert max-w-none">
      <PortableTextRenderer value={value} />
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/projects/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { ProjectCard } from '@/components/project-card';
import { getProjects } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Projects | Edwar',
  description: 'A collection of projects I have worked on.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 py-12">
      <h1 className="text-4xl font-bold">Projects</h1>
      {projects.length === 0 ? (
        <p className="text-muted-foreground">Projects coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: Create `src/app/projects/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PortableText } from '@/components/portable-text';
import { getProjectBySlug, getProjects } from '@/lib/sanity/fetch';
import { urlFor } from '@/lib/sanity/image';
import { creativeWorkJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };
  return {
    title: `${project.title} | Edwar`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const imageUrl = project.coverImage ? urlFor(project.coverImage) : null;
  const jsonLd = creativeWorkJsonLd({
    title: project.title,
    slug: project.slug.current,
    description: project.description,
    publishedAt: project.publishedAt,
    coverImageUrl: imageUrl || undefined,
    liveUrl: project.liveUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-8 py-12">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={project.title} fill className="object-cover" />
          </div>
        )}
        <h1 className="text-4xl font-bold">{project.title}</h1>
        <p className="text-lg text-muted-foreground">{project.description}</p>
        {project.tags && (
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
        <div className="flex gap-4">
          {project.liveUrl && (
            <Button asChild><Link href={project.liveUrl} target="_blank">Live Demo</Link></Button>
          )}
          {project.githubUrl && (
            <Button variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank">GitHub</Link>
            </Button>
          )}
        </div>
        {project.body && <PortableText value={project.body} />}
      </article>
    </>
  );
}
```

- [ ] **Step 5: Add featured projects to homepage**

Add to `src/app/page.tsx` after Hero section:

```tsx
import { ProjectCard } from '@/components/project-card';
import { getFeaturedProjects } from '@/lib/sanity/fetch';

// Make HomePage async:
export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();
  // ... after hero section:
  {featuredProjects.length > 0 && (
    <section>
      <h2 className="mb-8 text-2xl font-bold">Featured Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  )}
}
```

- [ ] **Step 6: Add Sanity image domain to `next.config.ts`**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
};

export default nextConfig;
```

- [ ] **Step 7: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/project-card.tsx src/components/portable-text.tsx src/app/projects/ src/app/page.tsx next.config.ts
git commit -m "feat: add projects listing, detail pages, and featured section"
```

---

### Task 9: Blog Pages + Cards

**Files:**
- Create: `src/components/blog-card.tsx`
- Create: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`

**Interfaces:**
- Consumes: `getPosts()`, `getPostBySlug()` from Task 7; `blogPostingJsonLd()` from Task 3; `<PortableText />` from Task 8
- Produces: `/blog` and `/blog/[slug]` routes, `<BlogCard />`

- [ ] **Step 1: Create `src/components/blog-card.tsx`**

```tsx
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { urlFor } from '@/lib/sanity/image';
import type { Post } from '@/lib/sanity/types';

export function BlogCard({ post }: { post: Post }) {
  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="overflow-hidden border-border transition-opacity hover:opacity-80">
        {imageUrl && (
          <div className="relative aspect-video">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <CardHeader>
          <p className="text-xs text-muted-foreground">{date}</p>
          <CardTitle className="text-lg">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
          {post.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
```

- [ ] **Step 2: Create `src/app/blog/page.tsx`**

```tsx
import type { Metadata } from 'next';
import { BlogCard } from '@/components/blog-card';
import { getPosts } from '@/lib/sanity/fetch';

export const metadata: Metadata = {
  title: 'Blog | Edwar',
  description: 'Thoughts on web development, JavaScript, and building things.',
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="space-y-8 py-12">
      <h1 className="text-4xl font-bold">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-muted-foreground">Blog posts coming soon.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/blog/[slug]/page.tsx`**

```tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { PortableText } from '@/components/portable-text';
import { getPostBySlug, getPosts } from '@/lib/sanity/fetch';
import { urlFor } from '@/lib/sanity/image';
import { blogPostingJsonLd } from '@/lib/seo/json-ld';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: `${post.title} | Edwar`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = post.coverImage ? urlFor(post.coverImage) : null;
  const date = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const jsonLd = blogPostingJsonLd({
    title: post.title,
    slug: post.slug.current,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    coverImageUrl: imageUrl || undefined,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="space-y-8 py-12">
        {imageUrl && (
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image src={imageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="text-sm text-muted-foreground">{date}</p>
          <h1 className="mt-2 text-4xl font-bold">{post.title}</h1>
        </div>
        {post.tags && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
        {post.body && <PortableText value={post.body} />}
      </article>
    </>
  );
}
```

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/components/blog-card.tsx src/app/blog/
git commit -m "feat: add blog listing and detail pages"
```

---

### Task 10: Revalidation API + Sitemap

**Files:**
- Create: `src/app/api/revalidate/route.ts`, `src/app/sitemap.ts`

**Interfaces:**
- Consumes: `SANITY_REVALIDATE_SECRET` env var
- Produces: `POST /api/revalidate` endpoint, `/sitemap.xml` route

- [ ] **Step 1: Create `src/app/api/revalidate/route.ts`**

```typescript
import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  const body = await request.json();
  const type = body?._type;

  if (type === 'project') {
    revalidatePath('/projects');
    revalidatePath('/');
    if (body?.slug?.current) {
      revalidatePath(`/projects/${body.slug.current}`);
    }
  }

  if (type === 'post') {
    revalidatePath('/blog');
    if (body?.slug?.current) {
      revalidatePath(`/blog/${body.slug.current}`);
    }
  }

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
```

- [ ] **Step 2: Create `src/app/sitemap.ts`**

```typescript
import type { MetadataRoute } from 'next';
import { getProjects, getPosts } from '@/lib/sanity/fetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://edo0edo.me';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
  ];

  const projects = await getProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug.current}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const posts = await getPosts();
  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug.current}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
```

- [ ] **Step 3: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/app/api/revalidate/route.ts src/app/sitemap.ts
git commit -m "feat: add Sanity revalidation webhook and dynamic sitemap"
```

---

### Task 11: Error Pages (404, Loading, Error Boundary)

**Files:**
- Create: `src/app/not-found.tsx`, `src/app/loading.tsx`, `src/app/error.tsx`

**Interfaces:**
- Consumes: shadcn Button, Skeleton from Task 2

- [ ] **Step 1: Create `src/app/not-found.tsx`**

```tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-lg text-muted-foreground">Page not found.</p>
      <Button asChild className="mt-8">
        <Link href="/">Back to Home</Link>
      </Button>
    </div>
  );
}
```

- [ ] **Step 2: Create `src/app/loading.tsx`**

```tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="space-y-6 py-12">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-4 w-full max-w-xl" />
      <Skeleton className="h-4 w-full max-w-lg" />
      <div className="grid gap-6 pt-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-48 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/app/error.tsx`**

```tsx
'use client';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <p className="mt-4 text-muted-foreground">{error.message}</p>
      <Button onClick={reset} className="mt-8">
        Try Again
      </Button>
    </div>
  );
}
```

- [ ] **Step 4: Verify**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app/not-found.tsx src/app/loading.tsx src/app/error.tsx
git commit -m "feat: add 404, loading, and error boundary pages"
```

---

### Task 12: Asset Migration + Final Verification

**Files:**
- Copy: hero avatar and images to `public/images/`
- Create: `.env.local` (local only, not committed)
- Modify: `public/robots.txt` if needed

**Interfaces:**
- Consumes: all previous tasks

- [ ] **Step 1: Restore hero avatar from git history**

```bash
cd /Users/mac/Documents/projects/edo0edo
mkdir -p public/images/jpg
git show HEAD~1:public/images/jpg/hero-avatar.jpg > public/images/jpg/hero-avatar.jpg 2>/dev/null || echo "Copy hero-avatar.jpg manually from old deploy"
```

- [ ] **Step 2: Create `.env.local` from template**

Copy `.env.example` to `.env.local` and fill in Sanity project ID, dataset, tokens, GTM_ID, GA_ID from old Vercel env vars.

- [ ] **Step 3: Update `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://edo0edo.me/sitemap.xml
```

- [ ] **Step 4: Full build verification**

Run: `pnpm build`
Expected: PASS with zero errors

- [ ] **Step 5: Dev server smoke test**

Run: `pnpm dev`
Expected: All routes load — `/`, `/about`, `/projects`, `/blog` — header/footer visible, dark theme applied

- [ ] **Step 6: Commit**

```bash
git add public/ robots.txt
git commit -m "chore: migrate assets and finalize public files"
```

---

### Task 13: Sanity Project Setup + Vercel Deploy (Manual)

**This task is manual — performed by Edwar in dashboards, not in code.**

- [ ] **Step 1: Create Sanity project**

Go to [sanity.io/manage](https://sanity.io/manage), create project, copy Project ID to `.env.local` and Vercel env vars.

- [ ] **Step 2: Run Sanity Studio locally**

Run: `pnpm studio`
Expected: Studio opens at `localhost:3333`, can create Project and Post documents

- [ ] **Step 3: Configure Sanity webhook**

In Sanity dashboard → API → Webhooks:
- URL: `https://edo0edo.me/api/revalidate?secret=YOUR_SECRET`
- Trigger on: Create, Update, Delete
- Filter: `_type == "project" || _type == "post"`

- [ ] **Step 4: Deploy to Vercel**

Push to GitHub, connect repo in Vercel dashboard, set all env vars from `.env.example`, deploy.

- [ ] **Step 5: Post-deploy verification**

- [ ] All 6 routes render on production
- [ ] JSON-LD validates at [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] GA/GTM firing (check browser Network tab)
- [ ] Sanity publish triggers page update within 60s
- [ ] Lighthouse performance ≥ 90

---

## Spec Coverage Check

| Spec Requirement | Task |
|---|---|
| Next.js 16 + App Router | Task 1 |
| shadcn/ui dark theme | Task 2 |
| Geist fonts | Task 3 |
| Static About page | Task 6 |
| Homepage sections | Task 5 (+ featured in Task 8) |
| Projects list + detail | Task 8 |
| Blog list + detail | Task 9 |
| Sanity CMS schemas | Task 7 |
| Sanity fetch + ISR | Task 7 |
| Webhook revalidation | Task 10 |
| SEO metadata all pages | Tasks 3, 6, 8, 9 |
| JSON-LD Person + Review | Task 3 |
| JSON-LD BlogPosting + CreativeWork | Tasks 8, 9 |
| GA + GTM | Task 3 |
| Sitemap | Task 10 |
| 404 / loading / error | Task 11 |
| Mobile Sheet nav | Task 4 |
| Asset migration | Task 12 |
| Vercel deploy | Task 13 |

## Type Consistency Check

- `Project.slug.current` and `Post.slug.current` used consistently across queries, types, pages, and sitemap
- `getProjects()`, `getProjectBySlug()`, `getFeaturedProjects()`, `getPosts()`, `getPostBySlug()` — all defined in Task 7, consumed in Tasks 8, 9, 10
- `urlFor(SanityImage)` — defined Task 7, used Tasks 8, 9
- `about` export — defined Task 3, used Tasks 4, 5, 6
