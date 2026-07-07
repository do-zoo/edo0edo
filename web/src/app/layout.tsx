import { GoogleTagManager } from '@next/third-parties/google';
import type { Metadata } from 'next';
import { JetBrains_Mono, Plus_Jakarta_Sans, Syne } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { SiteContainer } from '@/components/site-container';
import { personJsonLd, reviewJsonLd } from '@/lib/seo/json-ld';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
  alternates: {
    canonical: '/',
  },
};

const { GTM_ID } = process.env;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${plusJakarta.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
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
      <body className="min-h-screen overflow-x-hidden bg-background font-sans antialiased">
        <Header />
        <main className="relative w-full min-h-screen">
          <SiteContainer>{children}</SiteContainer>
        </main>
        <Footer />
      </body>
    </html>
  );
}
