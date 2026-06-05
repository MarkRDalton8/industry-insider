'use client';

import { useState, useEffect } from 'react';
import { COLORS, PIANO } from '../lib/site.config';
import { WEBINARS } from '../lib/content';
import PianoInit from './PianoInit';

export default function WebinarContent({ slug }) {
  const webinar = WEBINARS.find(w => w.slug === slug);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!PIANO.resourceId) return;
    const tp = window.tp || [];
    tp.push(['init', function () {
      window.tp.api.callApi('/access/check', { rid: PIANO.resourceId }, function (response) {
        if (response?.access?.granted || response?.data?.access?.granted) setHasAccess(true);
      });
    }]);
  }, [slug]);

  if (!webinar) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: COLORS.dark }}>Webinar Not Found</h1>
        <a href="/webinars" style={{ color: COLORS.primary, fontSize: 15 }}>&larr; Back to Webinars</a>
      </div>
    );
  }

  return (
    <>
      <PianoInit section="webinars/article" tags={webinar.tags} />

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ fontSize: 12, color: '#999', marginBottom: 22 }}>
          <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</a>
          {' · '}
          <a href="/webinars" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Webinars
          </a>
        </div>

        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: COLORS.primary }}>Webinar</span>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: COLORS.primary, color: 'white', padding: '2px 7px', borderRadius: 2 }}>
              Registration Required
            </span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700, color: COLORS.dark, lineHeight: 1.25, margin: '0 0 16px' }}>
            {webinar.title}
          </h1>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '12px 0' }}>
            <span>{webinar.duration}</span>
            <span>{webinar.date}</span>
            {webinar.sponsor && <span>Sponsored by {webinar.sponsor}</span>}
          </div>
        </div>

        <div style={{ background: '#F8FAFC', border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: '20px 24px', marginBottom: 32 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.dark, marginBottom: 4 }}>{webinar.speaker}</div>
          <div style={{ fontSize: 13, color: '#666' }}>{webinar.speakerTitle}, {webinar.speakerCompany}</div>
        </div>

        {!hasAccess && <div className="piano-webinar-gate" />}

        {hasAccess && (
          <>
            {webinar.body.map((para, i) => (
              <p key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.85, color: '#222', marginBottom: 24 }}>{para}</p>
            ))}
            <div style={{ background: '#0F172A', borderRadius: 8, padding: '60px 40px', textAlign: 'center', marginTop: 32 }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <div style={{ width: 0, height: 0, borderTop: '18px solid transparent', borderBottom: '18px solid transparent', borderLeft: '30px solid white', marginLeft: 6 }} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'white', margin: '0 0 8px' }}>Webinar Ready</h3>
              <p style={{ fontSize: 14, color: '#94A3B8', margin: '0 0 20px' }}>Your free access is confirmed. Click play to start watching.</p>
              <div style={{ color: '#64748B', fontSize: 13 }}>{webinar.duration} &middot; On-Demand</div>
            </div>
          </>
        )}

        <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 48, paddingTop: 24 }}>
          <a href="/webinars" style={{ color: COLORS.primary, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>&larr; All Webinars</a>
        </div>
      </div>
    </>
  );
}
