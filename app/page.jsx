import { SITE, COLORS, SECTIONS } from '../lib/site.config';
import { ARTICLES, WHITEPAPERS, WEBINARS } from '../lib/content';
import { ArticleCard } from '../components/ArticleCard';
import { WhitepaperCard } from '../components/WhitepaperCard';
import { WebinarCard } from '../components/WebinarCard';
import PianoInit from '../components/PianoInit';

export const metadata = {
  title: `${SITE.name} — ${SITE.tagline}`,
  openGraph: { title: `${SITE.name} — ${SITE.tagline}`, type: 'website', url: '/' },
};

export default function Home() {
  const latestArticles = [...ARTICLES].sort((a, b) => b.id - a.id).slice(0, 8);
  const heroArticles = latestArticles.slice(0, 3);
  const sideArticles = latestArticles.slice(3, 6);
  const latestWhitepapers = [...WHITEPAPERS].sort((a, b) => b.id - a.id).slice(0, 3);
  const latestWebinars = [...WEBINARS].sort((a, b) => b.id - a.id).slice(0, 2);

  const SectionHeader = ({ label, color, href }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${color}`, paddingBottom: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#888' }}>{label}</span>
      {href && <a href={href} style={{ fontSize: 12, color: COLORS.primary, textDecoration: 'none', fontWeight: 600 }}>View All &rarr;</a>}
    </div>
  );

  return (
    <>
      <PianoInit section="home" />

      {/* Hero: latest articles + trending sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 28, marginBottom: 40 }}>
        <div>
          <SectionHeader label="Latest" color={COLORS.primary} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <ArticleCard article={heroArticles[0]} featured />
            {heroArticles.slice(1).map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
        <div>
          <SectionHeader label="Trending" color={COLORS.dark} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {sideArticles.map(a => <ArticleCard key={a.id} article={a} />)}
          </div>
        </div>
      </div>

      {/* Whitepapers rail */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader label="Research & Whitepapers" color={COLORS.primary} href="/resources" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {latestWhitepapers.map(wp => <WhitepaperCard key={wp.id} whitepaper={wp} />)}
        </div>
      </div>

      {/* Webinars rail */}
      <div style={{ marginBottom: 40 }}>
        <SectionHeader label="On-Demand Webinars" color={COLORS.primary} href="/webinars" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 18 }}>
          {latestWebinars.map(w => <WebinarCard key={w.id} webinar={w} />)}
        </div>
      </div>

      {/* Section highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 40 }}>
        {SECTIONS.slice(0, 4).map(s => {
          const articles = ARTICLES.filter(a => a.section === s.slug).sort((a, b) => b.id - a.id).slice(0, 2);
          if (!articles.length) return null;
          return (
            <div key={s.slug}>
              <SectionHeader label={s.label} color={s.color} href={`/${s.slug}`} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {articles.map(a => <ArticleCard key={a.id} article={a} />)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Directory CTA */}
      <div style={{ background: '#F8FAFC', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
            Buyer&apos;s Guide
          </h3>
          <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
            Find solution providers, technology vendors, and service partners in our industry directory.
          </p>
        </div>
        <a href="/directory" style={{
          background: COLORS.primary, color: 'white', padding: '12px 28px', borderRadius: 4,
          fontSize: 14, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          Browse Directory
        </a>
      </div>

      {/* Newsletter + Piano home container */}
      <div className="piano-newsletter" style={{ marginBottom: 32 }} />
      <div className="piano-home" style={{ marginTop: 16 }} />
    </>
  );
}
