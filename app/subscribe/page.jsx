import { SITE, COLORS, NAV } from '../../lib/site.config';
import PianoInit from '../../components/PianoInit';

export const metadata = {
  title: `Subscribe — ${SITE.name}`,
};

export default function SubscribePage() {
  return (
    <>
      <PianoInit section="subscribe" />

      <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center', padding: '60px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 42, fontWeight: 700, color: COLORS.dark, margin: '0 0 16px' }}>
          {NAV.subscribeCta}
        </h1>
        <p style={{ fontSize: 18, color: '#555', lineHeight: 1.7, margin: '0 0 36px' }}>
          {NAV.subscribeCopy}
        </p>

        {/* Piano Composer will inject the registration/offer experience here */}
        <div className="piano-subscribe" style={{ minHeight: 200 }} />
      </div>
    </>
  );
}
