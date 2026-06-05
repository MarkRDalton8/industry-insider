import { COLORS } from '../lib/site.config';

export function WebinarCard({ webinar }) {
  return (
    <a href={`/webinars/${webinar.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{ background: 'white', border: `1px solid ${COLORS.border}`, borderLeft: `3px solid ${COLORS.primary}`, padding: '22px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary }}>
            Webinar
          </span>
          <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: COLORS.primary, color: 'white', padding: '2px 7px', borderRadius: 2 }}>
            Registration Required
          </span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: COLORS.dark, margin: '0 0 10px', lineHeight: 1.3 }}>
          {webinar.title}
        </h3>
        <p style={{ fontSize: 14, color: '#555', lineHeight: 1.6, margin: '0 0 12px' }}>
          {webinar.description}
        </p>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>
          <strong>{webinar.speaker}</strong>, {webinar.speakerTitle}, {webinar.speakerCompany}
        </div>
        <div style={{ fontSize: 12, color: '#999' }}>
          {webinar.duration} &middot; {webinar.date}
          {webinar.sponsor && <span> &middot; Sponsored by {webinar.sponsor}</span>}
        </div>
      </div>
    </a>
  );
}
