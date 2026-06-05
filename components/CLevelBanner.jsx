'use client';

import { useState, useEffect } from 'react';
import { PIANO } from '../lib/site.config';

export default function CLevelBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const s2Done = localStorage.getItem('ppmodal_stage2_done');
    if (!s2Done) return;

    const tryCheck = () => {
      const user = window.tp?.pianoId?.getUser?.();
      if (!user?.uid) return;

      fetch(`/api/piano-profile?uid=${user.uid}`)
        .then(r => r.json())
        .then(data => {
          const jobLevel = data?.['job-level'];
          const parsed = (() => { try { return JSON.parse(jobLevel); } catch { return jobLevel; } })();
          const value = Array.isArray(parsed) ? parsed[0] : parsed;
          if (value === 'C-Level') setShow(true);
        })
        .catch(() => {});
    };

    if (window.tp?.pianoId?.getUser) {
      tryCheck();
    } else {
      window.tp = window.tp || [];
      window.tp.push(['init', tryCheck]);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
      borderRadius: 10, padding: '28px 32px', marginBottom: 32,
      border: '1px solid rgba(255,255,255,0.15)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: '#E9D5FF' }}>
          Executive Exclusive
        </span>
        <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: '#FBBF24', color: '#78350F', padding: '2px 8px', borderRadius: 2 }}>
          Invite Only
        </span>
      </div>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: 'white', margin: '0 0 8px', lineHeight: 1.3 }}>
        Executive Briefing: Industry Outlook 2027
      </h3>
      <p style={{ fontSize: 14, color: '#DDD6FE', lineHeight: 1.65, margin: '0 0 20px', maxWidth: 560 }}>
        A private, off-the-record session for C-suite leaders. Join 40 peers for an intimate discussion on market shifts, technology bets, and boardroom strategy — not available to the general audience.
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="/webinars" style={{
          display: 'inline-block', background: '#FBBF24', color: '#78350F', padding: '11px 28px',
          borderRadius: 6, fontSize: 14, fontWeight: 700, textDecoration: 'none',
        }}>
          Reserve Your Seat
        </a>
        <span style={{ fontSize: 13, color: '#C4B5FD' }}>Limited to 40 executives</span>
      </div>
    </div>
  );
}
