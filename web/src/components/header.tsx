'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { about } from '@/data/about';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/logo';
import { SiteContainer } from '@/components/site-container';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 backdrop-blur-xl',
        isHome
          ? 'border-b border-transparent bg-background/20'
          : 'border-b border-border/60 bg-background/70',
      )}
    >
      <SiteContainer className="flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="edo0edo home"
          className="text-foreground transition-opacity hover:opacity-80"
        >
          <Logo size={28} />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-sm transition-colors',
                  isActive
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {link.label}
                {isActive && (
                  <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-primary" />
                )}
              </Link>
            );
          })}
          <Button asChild size="sm" className="ml-3">
            <Link href={`mailto:${about.social.email}`}>Let&apos;s Talk</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-background">
            <SheetHeader>
              <SheetTitle className="font-display">Navigation</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'rounded-lg px-3 py-2.5 text-base transition-colors',
                      isActive
                        ? 'font-medium text-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Button asChild className="mt-4">
                <Link href={`mailto:${about.social.email}`}>
                  Let&apos;s Talk
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </SiteContainer>
    </header>
  );
}
