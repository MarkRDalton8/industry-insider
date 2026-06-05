import { SECTIONS, SITE } from '../../../lib/site.config';
import { ARTICLES } from '../../../lib/content';
import ArticleContent from '../../../components/ArticleContent';

export function generateStaticParams() {
  return ARTICLES.map(a => ({ section: a.section, slug: a.slug }));
}

export function generateMetadata({ params }) {
  const { section, slug } = params;
  const article = ARTICLES.find(a => a.slug === slug && a.section === section);

  if (!article) return { title: `Article Not Found — ${SITE.name}` };

  const sectionConfig = SECTIONS.find(s => s.slug === section);
  const sectionLabel = sectionConfig?.label || section;
  const canonicalUrl = `${SITE.domain}/${section}/${slug}`;
  const kw = sectionConfig?.imageKeywords || 'news';
  const imageUrl = `https://loremflickr.com/1200/630/${kw}?lock=${article.id}`;
  const parsedDate = article.date ? new Date(article.date) : null;
  const pubDate = parsedDate && !isNaN(parsedDate) ? parsedDate.toISOString() : new Date().toISOString();

  return {
    title: `${article.title} — ${SITE.name}`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      url: canonicalUrl,
      images: [{ url: imageUrl }],
      publishedTime: pubDate,
      modifiedTime: pubDate,
      authors: [article.byline],
      section: sectionLabel,
      tags: article.tags || [],
    },
    other: {
      'cXenseParse:image': imageUrl,
    },
  };
}

export default function ArticleDetailPage({ params }) {
  const { section, slug } = params;
  return <ArticleContent section={section} slug={slug} />;
}
