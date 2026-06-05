import { COLORS } from '../lib/site.config';

export function DirectoryCard({ listing }) {
  return (
    <a href={`/directory/${listing.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, padding: '22px 24px', borderRadius: 4 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: COLORS.dark, margin: '0 0 4px' }}>
              {listing.company}
            </h3>
            <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: COLORS.primary }}>
              {listing.category}
            </span>
          </div>
          {listing.featured && (
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: '#FEF3C7', color: '#92400E', padding: '2px 8px', borderRadius: 2, whiteSpace: 'nowrap' }}>
              Featured
            </span>
          )}
        </div>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 12px' }}>
          {listing.description}
        </p>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: '#999', flexWrap: 'wrap' }}>
          <span>{listing.location}</span>
          <span>{listing.specialties.join(', ')}</span>
        </div>
      </div>
    </a>
  );
}
