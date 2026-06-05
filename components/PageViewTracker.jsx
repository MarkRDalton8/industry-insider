'use client';

import { useEffect } from 'react';
import { SITE } from '../lib/site.config';

export default function PageViewTracker() {
  useEffect(() => {
    const key = `${SITE.name.toLowerCase().replace(/\s+/g, '_')}_pageviews`;
    const current = parseInt(localStorage.getItem(key) || '0', 10);
    localStorage.setItem(key, current + 1);
  }, []);

  return null;
}
