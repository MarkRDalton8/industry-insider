import { SITE, SECTIONS } from '../lib/site.config';
import { ARTICLES, WHITEPAPERS, WEBINARS, DIRECTORY } from '../lib/content';

export default function sitemap() {
  const base = SITE.domain;

  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/register`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/resources`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/webinars`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/directory`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ];

  const sectionPages = SECTIONS.map(s => ({
    url: `${base}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.8,
  }));

  const articlePages = ARTICLES.map(a => ({
    url: `${base}/${a.section}/${a.slug}`,
    lastModified: a.date ? new Date(a.date) : new Date(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }));

  const whitepaperPages = WHITEPAPERS.map(w => ({
    url: `${base}/resources/${w.slug}`,
    lastModified: w.date ? new Date(w.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const webinarPages = WEBINARS.map(w => ({
    url: `${base}/webinars/${w.slug}`,
    lastModified: w.date ? new Date(w.date) : new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const directoryPages = DIRECTORY.map(d => ({
    url: `${base}/directory/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }));

  return [...staticPages, ...sectionPages, ...articlePages, ...whitepaperPages, ...webinarPages, ...directoryPages];
}
