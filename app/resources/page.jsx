import { SITE, COLORS } from '../../lib/site.config';
import { WHITEPAPERS } from '../../lib/content';
import { WhitepaperList } from '../../components/LoginAwareCards';
import PianoInit from '../../components/PianoInit';

export const metadata = {
  title: `Resources — ${SITE.name}`,
  description: 'Download free whitepapers, research reports, and industry analysis from Industry Insider.',
  openGraph: { title: 'Resources', type: 'website', url: '/resources' },
};

export default function ResourcesPage() {
  const whitepapers = [...WHITEPAPERS].sort((a, b) => b.id - a.id);

  return (
    <>
      <PianoInit section="resources" />

      <div style={{ borderBottom: `4px solid ${COLORS.primary}`, marginBottom: 28, paddingBottom: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
          Resources
        </h2>
        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
          Whitepapers, research reports, and in-depth analysis. Free with registration.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <WhitepaperList whitepapers={whitepapers} firstFeatured />
      </div>
    </>
  );
}
