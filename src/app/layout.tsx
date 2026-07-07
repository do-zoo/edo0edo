import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
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
        <Header />
        <main className="mx-auto min-h-screen max-w-5xl px-4">{children}</main>
        <Footer />
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
