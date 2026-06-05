import { SITE, COLORS } from '../../lib/site.config';
import { DIRECTORY } from '../../lib/content';
import { DirectoryCard } from '../../components/DirectoryCard';
import PianoInit from '../../components/PianoInit';

export const metadata = {
  title: `Buyer's Guide — ${SITE.name}`,
  description: 'Find solution providers, technology vendors, and service partners in our industry directory.',
  openGraph: { title: "Buyer's Guide", type: 'website', url: '/directory' },
};

export default function DirectoryPage() {
  const featured = DIRECTORY.filter(d => d.featured);
  const categories = [...new Set(DIRECTORY.map(d => d.category))].sort();

  return (
    <>
      <PianoInit section="directory" />

      <div style={{ borderBottom: `4px solid ${COLORS.primary}`, marginBottom: 28, paddingBottom: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
          Buyer&apos;s Guide
        </h2>
        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>
          Find solution providers, technology vendors, and service partners.
        </p>
      </div>

      {featured.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#888', marginBottom: 16 }}>
            Featured Partners
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 16 }}>
            {featured.map(d => <DirectoryCard key={d.id} listing={d} />)}
          </div>
        </div>
      )}

      {categories.map(cat => {
        const listings = DIRECTORY.filter(d => d.category === cat && !d.featured);
        if (!listings.length) return null;
        return (
          <div key={cat} style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: COLORS.primary, borderBottom: `2px solid ${COLORS.border}`, paddingBottom: 8, marginBottom: 16 }}>
              {cat}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {listings.map(d => <DirectoryCard key={d.id} listing={d} />)}
            </div>
          </div>
        );
      })}

      <div className="piano-directory-cta" style={{ marginTop: 40 }} />
    </>
  );
}
