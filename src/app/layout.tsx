import '@mantine/core/styles.css';
import './global.css';

import { Footer, Header } from '@edo0edo/components';
import { cssVariablesResolverTheme, theme } from '@edo0edo/configs/theme';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Metadata } from 'next';
import { Bai_Jamjuree, Inter } from 'next/font/google';
import { Person, Review, WithContext } from 'schema-dts';

const baiJamjure = Bai_Jamjuree({
  subsets: ['latin'],
  display: 'swap',
  weight: '700',
  variable: '--font-bai-jamjure',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://edo0edo.me'),
  title: 'Edwar | Web Developer in Jakarta, Indonesia',
  description:
    "Professional Web Developer based in Jakarta, Indonesia. Specializing in modern websites, web applications, and digital solutions. Let's build your next project!",
  keywords:
    'Web Developer Jakarta, Freelance Web Developer, Website Developer Indonesia, Frontend Developer, Backend Developer, Fullstack Developer',
  authors: [
    {
      name: 'Edwar',
    },
  ],
  robots: 'index, follow',
};

const { GTM_ID, GA_ID } = process.env;

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" className={`${baiJamjure.variable} ${inter.variable}`}>
      <head>
        {GTM_ID && <GoogleTagManager gtmId={GTM_ID} />}
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Edwar',
              url: 'https://edo0edo.me',
              image: {
                '@type': 'ImageObject',
                url: 'https://edo0edo.me/images/jpg/hero-avatar.jpg',
                height: '600',
                width: '600',
              },
              jobTitle: 'Web Developer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance',
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Jakarta',
                addressCountry: 'Indonesia',
              },
              description:
                'Professional Web Developer based in Jakarta, Indonesia. Specializing in modern websites and web applications.',
              sameAs: [
                'https://github.com/do-zoo',
                'https://www.linkedin.com/in/edo0edo',
                'https://www.instagram.com/edo0edo',
              ],
            } as WithContext<Person>),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Review',
              author: {
                '@type': 'Person',
                name: 'Isa J.P Simanjuntak',
                url: 'https://www.linkedin.com/feed/update/urn:li:ugcPost:7138236835821977600?commentUrn=urn%3Ali%3Acomment%3A%28ugcPost%3A7138236835821977600%2C7180160516751810560%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287180160516751810560%2Curn%3Ali%3AugcPost%3A7138236835821977600%29',
              },
              publisher: {
                '@type': 'Organization',
                name: 'LinkedIn',
              },
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
                url: 'https://edo0edo.me',
                image: {
                  '@type': 'ImageObject',
                  url: 'https://edo0edo.me/images/jpg/hero-avatar.jpg',
                  height: '600',
                  width: '600',
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
            } as WithContext<Review>),
          }}
        />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          defaultColorScheme="dark"
          classNamesPrefix="edo0edo"
          cssVariablesResolver={cssVariablesResolverTheme}
        >
          <Header />
          <Container mih="100vh" component="main">
            {children}
          </Container>
          <Footer />
        </MantineProvider>
        {/* <Analytics /> */}
        {/* <SpeedInsights /> */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      </body>
    </html>
  );
}
