import { COLORS } from '../lib/site.config';

export function WhitepaperCard({ whitepaper, featured = false }) {
  const topicColors = {
    technology: '#7C3AED',
    'market-analysis': '#B45309',
    leadership: '#0891B2',
    'best-practices': '#047857',
    news: '#1E40AF',
  };
  const topicColor = topicColors[whitepaper.topic] || COLORS.primary;

  if (featured) {
    return (
      <a href={`/resources/${whitepaper.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${topicColor}`, padding: '28px 32px', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: topicColor }}>
              Whitepaper
            </span>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: COLORS.primary, color: 'white', padding: '2px 7px', borderRadius: 2 }}>
              Registration Required
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 24, fontWeight: 700, color: COLORS.dark, margin: '0 0 12px', lineHeight: 1.3 }}>
            {whitepaper.title}
          </h2>
          <p style={{ fontSize: 14, color: '#555', lineHeight: 1.65, margin: '0 0 14px' }}>
            {whitepaper.description}
          </p>
          <div style={{ fontSize: 12, color: '#999' }}>{whitepaper.pages} pages &middot; {whitepaper.date}</div>
        </div>
      </a>
    );
  }

  return (
    <a href={`/resources/${whitepaper.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${topicColor}`, padding: '18px 22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: topicColor }}>
            Whitepaper
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: '#888' }}>{whitepaper.pages} pages</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, fontWeight: 700, color: COLORS.dark, margin: '0 0 8px', lineHeight: 1.3 }}>
          {whitepaper.title}
        </h3>
        <p style={{ fontSize: 13, color: '#666', lineHeight: 1.6, margin: '0 0 10px' }}>
          {whitepaper.description}
        </p>
        <div style={{ fontSize: 12, color: '#999' }}>
          {whitepaper.sponsor && <span>Sponsored by {whitepaper.sponsor} &middot; </span>}
          {whitepaper.date}
        </div>
      </div>
    </a>
  );
}
