'use client';

import { usePianoLogin } from '../lib/usePianoLogin';
import { WhitepaperCard } from './WhitepaperCard';
import { WebinarCard } from './WebinarCard';

export function WhitepaperList({ whitepapers, firstFeatured = false }) {
  const isLoggedIn = usePianoLogin();
  return (
    <>
      {whitepapers.map((wp, i) => (
        <WhitepaperCard key={wp.id} whitepaper={wp} featured={firstFeatured && i === 0} isLoggedIn={isLoggedIn} />
      ))}
    </>
  );
}

export function WebinarList({ webinars }) {
  const isLoggedIn = usePianoLogin();
  return (
    <>
      {webinars.map(w => (
        <WebinarCard key={w.id} webinar={w} isLoggedIn={isLoggedIn} />
      ))}
    </>
  );
}
