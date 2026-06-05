import { COLORS } from '../lib/site.config';

export default function NewsletterSignup() {
  return (
    <div style={{ background: '#F8FAFC', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '24px 28px', marginTop: 48 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 18 }}>&#9993;</span>
        <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 16, fontWeight: 700, color: COLORS.dark, margin: 0 }}>
          Get Industry Insider delivered to your inbox
        </h4>
      </div>
      <p style={{ fontSize: 13, color: '#666', margin: '0 0 12px', lineHeight: 1.5 }}>
        Weekly analysis, research highlights, and market intelligence for business leaders.
      </p>
      <div className="piano-newsletter" />
    </div>
  );
}
