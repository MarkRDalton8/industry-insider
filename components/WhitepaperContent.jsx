'use client';

import { useState, useEffect } from 'react';
import { COLORS, PIANO } from '../lib/site.config';
import { WHITEPAPERS } from '../lib/content';
import PianoInit from './PianoInit';

export default function WhitepaperContent({ slug }) {
  const wp = WHITEPAPERS.find(w => w.slug === slug);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const checkAccess = () => {
      if (PIANO.resourceId) {
        window.tp.api.callApi('/access/check', { rid: PIANO.resourceId }, function (response) {
          if (response?.access?.granted || response?.data?.access?.granted) setHasAccess(true);
        });
      } else {
        const user = window.tp?.pianoId?.getUser?.();
        if (user?.uid) setHasAccess(true);
      }
    };

    if (window.tp?.pianoId?.getUser) {
      checkAccess();
    } else {
      window.tp = window.tp || [];
      window.tp.push(['init', checkAccess]);
    }
  }, [slug]);

  if (!wp) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: COLORS.dark }}>Resource Not Found</h1>
        <a href="/resources" style={{ color: COLORS.primary, fontSize: 15 }}>&larr; Back to Resources</a>
      </div>
    );
  }

  return (
    <>
      <PianoInit section="resources/article" tags={wp.tags} />

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 22 }}>
          <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</a>
          {' · '}
          <a href="/resources" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Resources
          </a>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary }}>Whitepaper</span>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: COLORS.primary, color: 'white', padding: '2px 7px', borderRadius: 2 }}>
              Registration Required
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700, color: COLORS.dark, lineHeight: 1.25, margin: '0 0 16px' }}>
            {wp.title}
          </h1>
          <p style={{ fontSize: 16, color: '#555', lineHeight: 1.7, margin: '0 0 16px' }}>{wp.description}</p>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '12px 0' }}>
            <span>{wp.pages} pages</span>
            <span>{wp.date}</span>
            {wp.sponsor && <span>Sponsored by {wp.sponsor}</span>}
          </div>
        </div>

        <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.85, color: '#222', marginBottom: 24, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {wp.body[0]}
        </p>

        {!hasAccess && <div className="piano-resource-gate" />}

        {hasAccess && (
          <>
            {wp.body.slice(1).map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.85, color: '#222', marginBottom: 24 }}>{para}</p>
            ))}
            <div style={{ background: '#F0F9FF', border: `2px solid ${COLORS.primary}`, borderRadius: 8, padding: '32px 40px', textAlign: 'center', marginTop: 32 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>&#128196;</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: COLORS.dark, margin: '0 0 8px' }}>Ready to Download</h3>
              <p style={{ fontSize: 14, color: '#666', margin: '0 0 20px' }}>Your free access is confirmed. Download the full report below.</p>
              <a href={wp.downloadUrl} style={{
                display: 'inline-block', background: COLORS.primary, color: 'white', padding: '14px 36px',
                borderRadius: 4, fontSize: 15, fontWeight: 700, textDecoration: 'none',
              }}>
                Download PDF ({wp.pages} pages)
              </a>
            </div>
          </>
        )}

        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 48, paddingTop: 24 }}>
          <a href="/resources" style={{ color: COLORS.primary, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>&larr; All Resources</a>
        </div>
      </div>
    </>
  );
}
