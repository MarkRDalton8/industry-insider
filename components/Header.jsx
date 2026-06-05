'use client';

import { useState, useEffect } from 'react';
import { SITE, FONTS, COLORS, SECTIONS, NAV } from '../lib/site.config';

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);

    const applyUser = (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserName(user.given_name || user.email || 'Subscriber');
      }
    };

    const checkUser = () => {
      if (window.tp?.pianoId?.getUser) {
        applyUser(window.tp.pianoId.getUser());
        return true;
      }
      return false;
    };

    window.tp = window.tp || [];

    window.tp.push(['addHandler', 'loginSuccess', function (data) {
      window.tp.pianoId.hide();
      applyUser(data.user);
      window.location.href = '/';
    }]);

    window.tp.push(['addHandler', 'checkoutComplete', function () {
      window.location.href = '/account';
    }]);

    window.tp.push(['init', function () {
      applyUser(window.tp.pianoId.getUser());
    }]);

    if (!checkUser()) {
      const t1 = setTimeout(checkUser, 200);
      const t2 = setTimeout(checkUser, 800);
      return () => { clearTimeout(t1); clearTimeout(t2); };
    }
  }, []);

  const handleLogin = () => {
    window.tp?.pianoId?.show({
      screen: 'login',
      displayMode: 'modal',
      loggedIn: function () { window.location.href = '/'; },
    });
  };

  const handleLogout = () => {
    if (window.tp?.pianoId) window.tp.pianoId.logout();
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };

  const isActive = (href) =>
    href === '/' ? currentPath === '/' : currentPath.startsWith(href);

  const sectionLinks = [
    { href: '/', label: 'Home' },
    ...SECTIONS.map(s => ({ href: `/${s.slug}`, label: s.label })),
  ];
  const extraLinks = NAV.extraLinks || [];

  return (
    <>
      {/* Utility bar */}
      <div style={{ background: COLORS.dark, color: '#aaa', fontSize: 12, padding: '6px 0', borderBottom: '1px solid #333' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span suppressHydrationWarning>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            {isLoggedIn ? (
              <>
                <span style={{ color: '#ccc' }}>Welcome, {userName}</span>
                <a href="/account" style={{ color: '#aaa', textDecoration: 'none' }}>My Account</a>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 12, padding: 0 }}>Sign Out</button>
              </>
            ) : (
              <>
                <button onClick={handleLogin} style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: 12, padding: 0 }}>Sign In</button>
                <a href="/subscribe" style={{ color: COLORS.primary, textDecoration: 'none', fontWeight: 700 }}>{NAV.subscribeCta}</a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Masthead */}
      <div style={{ padding: '24px 0 16px', borderBottom: `4px solid ${COLORS.dark}` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', textAlign: 'center' }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <h1 style={{ fontFamily: FONTS.heading, fontSize: 60, fontWeight: 900, color: COLORS.dark, margin: 0, letterSpacing: '-1px', lineHeight: 1 }}>
              {SITE.name}
            </h1>
          </a>
          <p style={{ fontSize: 11, color: '#999', margin: '8px 0 0', letterSpacing: '3px', textTransform: 'uppercase' }}>
            {SITE.tagline}
          </p>
        </div>
      </div>

      {/* Section nav */}
      <nav style={{ background: COLORS.dark, borderBottom: `3px solid ${COLORS.primary}`, position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
          {sectionLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                color: isActive(href) ? 'white' : '#bbb',
                textDecoration: 'none',
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                borderBottom: isActive(href) ? `3px solid ${COLORS.primary}` : '3px solid transparent',
                marginBottom: -3,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </a>
          ))}
          {extraLinks.length > 0 && (
            <span style={{ width: 1, height: 20, background: '#444', margin: '0 4px', flexShrink: 0 }} />
          )}
          {extraLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                color: isActive(href) ? 'white' : '#bbb',
                textDecoration: 'none',
                padding: '12px 16px',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                borderBottom: isActive(href) ? `3px solid ${COLORS.primary}` : '3px solid transparent',
                marginBottom: -3,
                whiteSpace: 'nowrap',
              }}
            >
              {label}
            </a>
          ))}
          {NAV.showSubscribeButton && (
            <a
              href="/subscribe"
              style={{
                marginLeft: 'auto',
                background: COLORS.primary,
                color: 'white',
                textDecoration: 'none',
                padding: '9px 22px',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                borderRadius: 1,
                whiteSpace: 'nowrap',
              }}
            >
              {NAV.subscribeCta}
            </a>
          )}
        </div>
      </nav>
    </>
  );
}
