import { SITE } from '../../../lib/site.config';
import { WEBINARS } from '../../../lib/content';
import WebinarContent from '../../../components/WebinarContent';

export function generateStaticParams() {
  return WEBINARS.map(w => ({ slug: w.slug }));
}

export function generateMetadata({ params }) {
  const webinar = WEBINARS.find(w => w.slug === params.slug);
  if (!webinar) return { title: `Webinar Not Found — ${SITE.name}` };

  return {
    title: `${webinar.title} — ${SITE.name}`,
    description: webinar.description,
    openGraph: {
      title: webinar.title,
      description: webinar.description,
      type: 'article',
      url: `${SITE.domain}/webinars/${webinar.slug}`,
    },
  };
}

export default function WebinarDetailPage({ params }) {
  return <WebinarContent slug={params.slug} />;
}
