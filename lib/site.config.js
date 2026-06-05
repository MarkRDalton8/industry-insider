export const SITE = {
  name: 'Industry Insider',
  tagline: 'Intelligence for Business Leaders',
  domain: 'https://industry.pianodemo.com',
  description: 'Breaking news, research, and analysis for business and industry decision-makers.',
  ogImage: '/og.jpg',
};

export const FONTS = {
  heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  ui: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap',
};

export const COLORS = {
  primary: '#1D4ED8',
  dark: '#0F172A',
  border: '#E2E8F0',
};

export const SECTIONS = [
  { slug: 'news', label: 'News & Trends', color: '#1E40AF', tagline: 'Breaking developments across industries and markets.', imageKeywords: 'business,industry' },
  { slug: 'technology', label: 'Technology', color: '#7C3AED', tagline: 'Tools, platforms, and digital transformation strategies.', imageKeywords: 'technology,software' },
  { slug: 'best-practices', label: 'Best Practices', color: '#047857', tagline: 'Proven strategies and operational frameworks that deliver results.', imageKeywords: 'office,teamwork' },
  { slug: 'market-analysis', label: 'Market Analysis', color: '#B45309', tagline: 'Data, forecasts, and economic intelligence for strategic planning.', imageKeywords: 'analytics,chart' },
  { slug: 'leadership', label: 'Leadership', color: '#0891B2', tagline: 'Management insights, talent strategy, and executive perspectives.', imageKeywords: 'executive,meeting' },
];

export const PIANO = {
  aid: process.env.NEXT_PUBLIC_PIANO_AID || '7gZBRaNFpu',
  sandbox: process.env.NEXT_PUBLIC_PIANO_SANDBOX === 'true',
  analyticsId: process.env.NEXT_PUBLIC_PIANO_ANALYTICS_SITE || '',
  analyticsDomain: process.env.NEXT_PUBLIC_PIANO_ANALYTICS_DOMAIN || '',
  espHash: process.env.NEXT_PUBLIC_PIANO_ESP_HASH || '',
  offerId: process.env.NEXT_PUBLIC_PIANO_OFFER_ID || '',
  resourceId: process.env.NEXT_PUBLIC_PIANO_RESOURCE_ID || '',
};

export const FEATURES = {
  aiPublisher: false,
  siteLicensing: false,
  progressiveProfile: true,
  subscribeRibbon: true,
  pageViewTracker: true,
};

export const NAV = {
  showSubscribeButton: true,
  subscribeCta: 'Register Free',
  subscribeCopy: 'Get free access to premium research, webinars, and market intelligence.',
  extraLinks: [
    { href: '/resources', label: 'Resources' },
    { href: '/webinars', label: 'Webinars' },
    { href: '/directory', label: 'Directory' },
  ],
};
