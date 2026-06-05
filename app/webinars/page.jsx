import { SITE, COLORS } from '../../lib/site.config';
import { WEBINARS } from '../../lib/content';
import { WebinarList } from '../../components/LoginAwareCards';
import PianoInit from '../../components/PianoInit';

export const metadata = {
  title: `Webinars — ${SITE.name}`,
  description: 'Watch on-demand webinars from industry experts. Free with registration.',
  openGraph: { title: 'Webinars', type: 'website', url: '/webinars' },
};

export default function WebinarsPage() {
  const webinars = [...WEBINARS].sort((a, b) => b.id - a.id);

  return (
    <>
      <PianoInit section="webinars" />

      <div style={{ borderBottom: `4px solid ${COLORS.primary}`, marginBottom: 28, paddingBottom: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
          Webinars
        </h2>
        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
          On-demand sessions from industry leaders. Free with registration.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <WebinarList webinars={webinars} />
      </div>
    </>
  );
}
