import { SITE } from '../../../lib/site.config';
import { WHITEPAPERS } from '../../../lib/content';
import WhitepaperContent from '../../../components/WhitepaperContent';

export function generateStaticParams() {
  return WHITEPAPERS.map(w => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const wp = WHITEPAPERS.find(w => w.slug === params.slug);
  if (!wp) return { title: `Resource Not Found — ${SITE.name}` };

  const canonicalUrl = `${SITE.domain}/resources/${wp.slug}`;

  return {
    title: `${wp.title} — ${SITE.name}`,
    description: wp.description,
    openGraph: {
      title: wp.title,
      description: wp.description,
      type: 'article',
      url: canonicalUrl,
      section: 'Resources',
      tags: wp.tags || [],
    },
    other: {
      'cXenseParse:pageclass': 'whitepaper',
      'cXenseParse:recs:articleid': `wp-${wp.id}`,
    },
  };
}

export default function WhitepaperDetailPage({ params }) {
  return <WhitepaperContent slug={params.slug} />;
}
