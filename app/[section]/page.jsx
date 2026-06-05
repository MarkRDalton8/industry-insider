import { notFound } from 'next/navigation';
import { SITE, COLORS, SECTIONS } from '../../lib/site.config';
import { ARTICLES } from '../../lib/content';
import { ArticleCard } from '../../components/ArticleCard';
import PianoInit from '../../components/PianoInit';

export function generateStaticParams() {
  return SECTIONS.map(s => ({ section: s.slug }));
}

export function generateMetadata({ params }) {
  const config = SECTIONS.find(s => s.slug === params.section);
  if (!config) return { title: 'Not Found' };
  return {
    title: `${config.label} — ${SITE.name}`,
    openGraph: {
      title: config.label,
      type: 'website',
      url: `/${params.section}`,
    },
  };
}

export default function SectionPage({ params }) {
  const { section } = params;
  const config = SECTIONS.find(s => s.slug === section);

  if (!config) notFound();

  const articles = ARTICLES.filter(a => a.section === section).sort((a, b) => b.id - a.id);

  return (
    <>
      <PianoInit section={section} />

      <div style={{ borderBottom: `4px solid ${config.color}`, marginBottom: 28, paddingBottom: 14 }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
          {config.label}
        </h2>
        <p style={{ fontSize: 14, color: '#888', margin: 0 }}>{config.tagline}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {articles.map(a => <ArticleCard key={a.id} article={a} />)}
      </div>
    </>
  );
}
