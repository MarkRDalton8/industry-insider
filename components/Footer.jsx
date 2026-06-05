import { SITE, FONTS, COLORS, SECTIONS } from '../lib/site.config';

export default function Footer() {
  return (
    <footer style={{ background: COLORS.dark, color: '#888', padding: '48px 20px 24px', marginTop: 64 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 40, marginBottom: 40 }}>
          <div style={{ maxWidth: 300 }}>
            <h3 style={{ fontFamily: FONTS.heading, color: 'white', fontSize: 28, margin: '0 0 10px' }}>
              {SITE.name}
            </h3>
            <p style={{ fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              {SITE.description}
            </p>
          </div>
          <div>
            <h4 style={{ color: '#ccc', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 14px' }}>Sections</h4>
            {SECTIONS.map(s => (
              <div key={s.slug} style={{ marginBottom: 8 }}>
                <a href={`/${s.slug}`} style={{ color: '#888', textDecoration: 'none', fontSize: 13 }}>{s.label}</a>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#ccc', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 14px' }}>Resources</h4>
            {[['Whitepapers', '/resources'], ['Webinars', '/webinars'], ['Buyer\'s Guide', '/directory']].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <a href={href} style={{ color: '#888', textDecoration: 'none', fontSize: 13 }}>{label}</a>
              </div>
            ))}
          </div>
          <div>
            <h4 style={{ color: '#ccc', fontSize: 11, textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 14px' }}>Account</h4>
            {[['Register', '/register'], ['My Account', '/account']].map(([label, href]) => (
              <div key={href} style={{ marginBottom: 8 }}>
                <a href={href} style={{ color: '#888', textDecoration: 'none', fontSize: 13 }}>{label}</a>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: '1px solid #333', paddingTop: 20, fontSize: 12, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
          <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>Piano Demo Site</span>
        </div>
      </div>
    </footer>
  );
}
