'use client';

import type { ReactNode } from 'react';
import { Code2, ContactRound, Globe } from 'lucide-react';
import Link from 'next/link';
import FadeContent from '@/components/FadeContent';
import { SiteContainer } from '@/components/site-container';
import { about } from '@/data/about';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

const socialLinks = [
  { href: about.social.linkedin, icon: ContactRound, label: 'LinkedIn' },
  { href: about.social.instagram, icon: Globe, label: 'Instagram' },
  { href: about.social.github, icon: Code2, label: 'GitHub' },
];

function FooterColumn({
  children,
  reducedMotion,
}: {
  children: React.ReactNode;
  reducedMotion: boolean;
}) {
  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <FadeContent duration={0.8} threshold={0.1}>
      {children}
    </FadeContent>
  );
}

export function Footer() {
  const year = new Date().getFullYear();
  const reducedMotion = useReducedMotion();

  return (
    <footer className="mt-20 border-t border-border/60">
      <SiteContainer className="py-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <FooterColumn reducedMotion={reducedMotion}>
            <div>
              <Link
                href="/"
                className="font-display text-lg font-bold tracking-tight"
              >
                edo<span className="text-primary">0</span>edo
              </Link>
              <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                {about.title} based in {about.location}. Building thoughtful web
                experiences.
              </p>
            </div>
          </FooterColumn>

          <FooterColumn reducedMotion={reducedMotion}>
            <nav className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Navigate
              </p>
              <div className="mt-1 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </FooterColumn>

          <FooterColumn reducedMotion={reducedMotion}>
            <div className="flex flex-col gap-2">
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Connect
              </p>
              <div className="mt-1 flex gap-2">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="rounded-lg border border-border p-2.5 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
          </FooterColumn>
        </div>

        <FooterColumn reducedMotion={reducedMotion}>
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              &copy; {year} {about.name}. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              Crafted with Next.js &amp; Sanity
            </p>
          </div>
        </FooterColumn>
      </SiteContainer>
    </footer>
  );
}
