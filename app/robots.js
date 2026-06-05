import { SITE } from '../lib/site.config';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
