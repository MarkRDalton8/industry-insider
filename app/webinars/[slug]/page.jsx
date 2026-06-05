import { SITE } from '../../../lib/site.config';
import { WEBINARS } from '../../../lib/content';
import WebinarContent from '../../../components/WebinarContent';

export function generateStaticParams() {
  return WEBINARS.map(w => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const webinar = WEBINARS.find(w => w.slug === params.slug);
  if (!webinar) return { title: `Webinar Not Found — ${SITE.name}` };

  const canonicalUrl = `${SITE.domain}/webinars/${webinar.slug}`;

  return {
    title: `${webinar.title} — ${SITE.name}`,
    description: webinar.description,
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      type: 'article',
      url: canonicalUrl,
      section: 'Webinars',
      tags: webinar.tags || [],
    },
    other: {
      'cXenseParse:pageclass': 'webinar',
      'cXenseParse:recs:articleid': `web-${webinar.id}`,
    },
  };
}

export default function WebinarDetailPage({ params }) {
  return <WebinarContent slug={params.slug} />;
}
