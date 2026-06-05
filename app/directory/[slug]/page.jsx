import { SITE, COLORS } from '../../../lib/site.config';
import { DIRECTORY } from '../../../lib/content';
import DirectoryInquiryForm from '../../../components/DirectoryInquiryForm';
import PianoInit from '../../../components/PianoInit';

export function generateStaticParams() {
  return DIRECTORY.map(d => ({ slug: d.slug }));
}

export function generateMetadata({ params }) {
  const listing = DIRECTORY.find(d => d.slug === params.slug);
  if (!listing) return { title: `Not Found — ${SITE.name}` };

  return {
    title: `${listing.company} — Buyer's Guide — ${SITE.name}`,
    description: listing.description,
    openGraph: {
      title: listing.company,
      description: listing.description,
      type: 'website',
      url: `${SITE.domain}/directory/${listing.slug}`,
    },
  };
}

export default function DirectoryDetailPage({ params }) {
  const listing = DIRECTORY.find(d => d.slug === params.slug);

  if (!listing) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: COLORS.dark }}>Company Not Found</h1>
        <a href="/directory" style={{ color: COLORS.primary, fontSize: 15 }}>&larr; Back to Directory</a>
      </div>
    );
  }

  return (
    <>
      <PianoInit section="directory" tags={listing.specialties.map(s => s.toLowerCase())} />

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 22 }}>
          <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</a>
          {' · '}
          <a href="/directory" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Directory
          </a>
        </div>

        <div style={{ marginBottom: 32 }}>
          <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary, display: 'block', marginBottom: 12 }}>
            {listing.category}
          </span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700, color: COLORS.dark, lineHeight: 1.25, margin: '0 0 16px' }}>
            {listing.company}
          </h1>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '12px 0' }}>
            <span>{listing.location}</span>
            <a href={listing.website} target="_blank" rel="noopener noreferrer" style={{ color: COLORS.primary, textDecoration: 'none' }}>
              Visit Website
            </a>
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.85, color: '#222', marginBottom: 24 }}>
          {listing.description}
        </p>

        <div style={{ marginBottom: 32 }}>
          <h3 style={{ fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: 12 }}>Specialties</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {listing.specialties.map(s => (
              <span key={s} style={{ background: '#F1F5F9', color: '#475569', padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 500 }}>
                {s}
              </span>
            ))}
          </div>
        </div>

        <DirectoryInquiryForm company={listing.company} />

        <div className="piano-directory-cta" style={{ marginTop: 32 }} />

        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 48, paddingTop: 24 }}>
          <a href="/directory" style={{ color: COLORS.primary, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
            &larr; Back to Buyer&apos;s Guide
          </a>
        </div>
      </div>
    </>
  );
}
