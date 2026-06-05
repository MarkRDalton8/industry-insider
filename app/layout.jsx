import Script from 'next/script';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageViewTracker from '../components/PageViewTracker';
import SubscribeRibbon from '../components/SubscribeRibbon';
import ProgressiveProfileModal from '../components/ProgressiveProfileModal';
import { SITE, FONTS, PIANO, FEATURES } from '../lib/site.config';
import './globals.css';

export const metadata = {
  metadataBase: new URL(SITE.domain),
  title: SITE.name,
  description: SITE.description,
  openGraph: {
    siteName: SITE.name,
    type: 'website',
  },
};

const composerDomain = PIANO.sandbox
  ? 'sandbox.tinypass.com'
  : 'experience.tinypass.com';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href={FONTS.googleFontsUrl} rel="stylesheet" />
      </head>
      <body>
        {/* Piano Composer */}
        {PIANO.aid && (
          <Script
            id="piano-composer"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(src){var a=document.createElement("script");a.type="text/javascript";a.async=true;a.src=src;var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})("https://${composerDomain}/xbuilder/experience/load?aid=${PIANO.aid}");`,
            }}
          />
        )}

        {/* Piano Analytics */}
        {PIANO.analyticsId && PIANO.analyticsDomain && (
          <Script
            id="piano-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(_config) {
                  var script = document.createElement("script");
                  script.src = "https://tag.aticdn.net/piano-analytics.js";
                  script.async = true;
                  script.dataset.config = JSON.stringify(_config);
                  document.head.appendChild(script);
                })({
                  site: ${PIANO.analyticsId},
                  collectDomain: "${PIANO.analyticsDomain}",
                  instantTracking: true
                });
              `,
            }}
          />
        )}

        {/* Piano ESP */}
        {PIANO.espHash && (
          <Script
            id="piano-esp"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                !function(){
                  window.PianoESPConfig = { hashId: "${PIANO.espHash}" };
                  var e=document.createElement("script");
                  e.setAttribute("id","pnesplucidsdksel");
                  e.type="text/javascript";
                  e.src="//api-esp.piano.io/public/sdk/vx/sdk.js?i=${PIANO.espHash}&v="+(localStorage&&localStorage.lucidsdkver||"xxx");
                  e.async=true;
                  document.getElementsByTagName("script")[0].parentNode.appendChild(e);
                }();
              `,
            }}
          />
        )}

        {FEATURES.pageViewTracker && <PageViewTracker />}
        <Header />

        <main style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 20px' }}>
          {children}
        </main>

        <Footer />
        {FEATURES.subscribeRibbon && <SubscribeRibbon />}
        {FEATURES.progressiveProfile && <ProgressiveProfileModal />}
      </body>
    </html>
  );
}
