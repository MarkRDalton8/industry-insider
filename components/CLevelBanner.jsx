'use client';

import { useState, useEffect } from 'react';

export default function CLevelBanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('clevel_banner_dismissed')) return;
    const s2Done = localStorage.getItem('ppmodal_stage2_done');
    const jobLevel = localStorage.getItem('ppmodal_job_level');
    if (s2Done && jobLevel === 'C-Level') {
      setTimeout(() => setVisible(true), 2000);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    sessionStorage.setItem('clevel_banner_dismissed', '1');
  };

  if (dismissed) return null;

  return (
    <div style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1000,
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform 0.4s ease',
      background: 'linear-gradient(135deg, #7C3AED 0%, #4C1D95 100%)',
      borderTop: '3px solid #FBBF24',
      boxShadow: '0 -4px 24px rgba(0,0,0,0.35)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
          <div style={{ background: '#FBBF24', color: '#78350F', fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', padding: '5px 12px', whiteSpace: 'nowrap' }}>
            Invite Only
          </div>
          <p style={{ color: '#EDE9FE', fontSize: 15, margin: 0, fontFamily: 'var(--font-heading)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Executive Briefing: Industry Outlook 2027 — A private session for C-suite leaders
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          <a href="/webinars" style={{ background: '#FBBF24', color: '#78350F', textDecoration: 'none', padding: '10px 28px', fontSize: 13, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', whiteSpace: 'nowrap' }}>
            Reserve Your Seat
          </a>
          <button onClick={handleDismiss} aria-label="Dismiss" style={{ background: 'none', border: '1px solid rgba(255,255,255,0.3)', color: '#C4B5FD', width: 32, height: 32, fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
