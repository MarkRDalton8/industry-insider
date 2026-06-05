'use client';

import { useEffect } from 'react';
import { COLORS } from '../../lib/site.config';
import PianoInit from '../../components/PianoInit';

export default function AccountPage() {
  useEffect(() => {
    window.tp = window.tp || [];
    window.tp.push(['init', function () {
      if (window.tp.pianoId.getUser()) {
        window.tp.myaccount.show({
          displayMode: 'inline',
          containerSelector: '#piano-account-container',
        });
      } else {
        window.tp.pianoId.show({
          screen: 'login',
          displayMode: 'modal',
          loggedIn: function () { window.location.href = '/'; },
        });
      }
    }]);
  }, []);

  return (
    <>
      <PianoInit section="account" />
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 38, fontWeight: 700, color: COLORS.dark, borderBottom: `3px solid ${COLORS.dark}`, paddingBottom: 14, marginBottom: 32 }}>
          My Account
        </h2>
        <div id="piano-account-container" style={{ minHeight: 400 }} />
      </div>
    </>
  );
}
