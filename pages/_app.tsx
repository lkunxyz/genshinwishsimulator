import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Script from 'next/script';
import '../src/styles/globals.css';

const GA_MEASUREMENT_ID = 'G-HCE3GZFRWK';
const ADSENSE_ID = 'ca-pub-8471354774896713';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Twemoji - 延迟加载以提升性能 */}
      <Script
        src="https://cdn.jsdelivr.net/npm/twemoji@14.0.2/dist/twemoji.min.js"
        strategy="lazyOnload"
      />

      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        forcedTheme="dark"
      >
        <Component {...pageProps} />
      </ThemeProvider>

      {/* Google AdSense - 延迟加载 */}
      <Script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />

      {/* Google Analytics - 在交互后加载 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
} 