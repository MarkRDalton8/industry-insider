'use client';

import { SITE, COLORS } from '../../lib/site.config';
import PianoInit from '../../components/PianoInit';

export default function RegisterPage() {
  const handleRegister = () => {
    window.tp?.pianoId?.show({
      screen: 'register',
      displayMode: 'modal',
      loggedIn: function () { window.location.href = '/'; },
    });
  };

  return (
    <>
      <PianoInit section="register" />

      <div style={{ maxWidth: 540, margin: '0 auto', padding: '40px 0' }}>
        <div style={{
          background: '#F0F7FF', border: '1px solid #BFDBFE', borderTop: `4px solid ${COLORS.primary}`,
          borderRadius: 12, overflow: 'hidden', textAlign: 'center',
        }}>
          <div style={{ padding: '40px 36px 36px' }}>
            <div style={{
              width: 56, height: 56, background: `linear-gradient(135deg, ${COLORS.primary} 0%, #1E3A8A 100%)`,
              borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px',
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>

            <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: COLORS.primary, marginBottom: 10 }}>
              Free Access
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 26, fontWeight: 800, color: '#0F172A', marginBottom: 12, lineHeight: 1.3 }}>
              Unlock Premium Research &amp; Insights
            </h1>
            <p style={{ fontSize: 15, color: '#64748B', lineHeight: 1.7, marginBottom: 28, maxWidth: 420, marginLeft: 'auto', marginRight: 'auto' }}>
              Register for free to access whitepapers, webinars, and market intelligence from Industry Insider.
            </p>

            <div style={{ textAlign: 'left', maxWidth: 360, margin: '0 auto 32px' }}>
              {[
                'Full access to research reports and whitepapers',
                'On-demand webinar library',
                'Weekly market intelligence newsletter',
                'Buyer\'s guide and directory access',
              ].map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '9px 0', borderBottom: i < 3 ? '1px solid #E0ECFF' : 'none', fontSize: 14, color: '#334155', gap: 12 }}>
                  <span style={{ color: COLORS.primary, fontWeight: 700, fontSize: 15, flexShrink: 0 }}>&#10003;</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleRegister}
              style={{
                background: COLORS.primary, color: 'white', border: 'none', padding: '14px 40px',
                borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer', width: '100%', maxWidth: 320,
              }}
            >
              Register Free
            </button>

            <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 20, lineHeight: 1.5 }}>
              No credit card required. Your data stays with us.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
