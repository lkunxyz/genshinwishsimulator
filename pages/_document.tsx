import { Html, Head, Main, NextScript } from 'next/document'
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from '@/config/site'

export default function Document() {
  // 获取当前语言
  const locale = typeof window !== 'undefined' ? window.__NEXT_DATA__?.locale || DEFAULT_LOCALE : DEFAULT_LOCALE
  const htmlLang = SUPPORTED_LOCALES[locale]?.htmlLang || locale

  return (
    <Html lang={htmlLang}>
       <Head>
        <meta name="google-adsense-account" content="ca-pub-8471354774896713" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8471354774896713"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "rl8u039i75");
            `
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
} 
