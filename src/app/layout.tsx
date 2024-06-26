import { Footer, Header } from '@edo0edo/components';
import { cssVariablesResolverTheme, theme } from '@edo0edo/configs/theme';
import { ColorSchemeScript, Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { GoogleAnalytics, GoogleTagManager } from '@next/third-parties/google';
import { Bai_Jamjuree, Inter } from 'next/font/google';
import './global.css';

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

export const metadata = {
  title: 'Hi, My name is Edo | Web Developer',
  description: 'Web Developer based on Jakarta, Indonesia',
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
