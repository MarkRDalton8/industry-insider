import { SITE } from '../../../lib/site.config';
import { WHITEPAPERS } from '../../../lib/content';
import WhitepaperContent from '../../../components/WhitepaperContent';

export function generateStaticParams() {
  return WHITEPAPERS.map(w => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const wp = WHITEPAPERS.find(w => w.slug === params.slug);
  if (!wp) return { title: `Resource Not Found — ${SITE.name}` };

  return {
    title: `${wp.title} — ${SITE.name}`,
    description: wp.description,
    openGraph: {
      title: wp.title,
      description: wp.description,
      type: 'article',
      url: `${SITE.domain}/resources/${wp.slug}`,
    },
  };
}

export default function WhitepaperDetailPage({ params }) {
  return <WhitepaperContent slug={params.slug} />;
}
