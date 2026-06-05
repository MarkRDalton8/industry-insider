'use client';

import { useState, useEffect } from 'react';
import { COLORS, SECTIONS, PIANO } from '../lib/site.config';
import { ARTICLES } from '../lib/content';
import PianoInit from './PianoInit';

function getSectionConfig(sectionSlug) {
  return SECTIONS.find(s => s.slug === sectionSlug);
}

function getArticleImageUrl(section, id, width, height) {
  const config = getSectionConfig(section);
  const kw = config?.imageKeywords || 'news';
  return `https://loremflickr.com/${width}/${height}/${kw}?lock=${id}`;
}

const PARA_STYLE = {
  fontFamily: "var(--font-body)",
  fontSize: 18, lineHeight: 1.85, color: '#222', marginBottom: 26,
};

export default function ArticleContent({ section, slug }) {
  const article = ARTICLES.find(a => a.slug === slug && a.section === section);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    if (!article?.locked || !PIANO.resourceId) return;
    const tp = window.tp || [];
    tp.push(['init', function () {
      window.tp.api.callApi('/access/check', { rid: PIANO.resourceId }, function (response) {
        if (response?.access?.granted || response?.data?.access?.granted) setHasAccess(true);
      });
    }]);
  }, [article?.slug]);

  if (!article) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 36, color: COLORS.dark }}>
          Article Not Found
        </h1>
        <a href="/" style={{ color: COLORS.primary, fontSize: 15 }}>&larr; Return to Home</a>
      </div>
    );
  }

  const sectionConfig = getSectionConfig(section);
  const sectionLabel = sectionConfig?.label || section;
  const sectionColor = sectionConfig?.color || COLORS.dark;
  const showFull = !article.locked || hasAccess;
  const visibleBody = showFull ? article.body : article.body.slice(0, 2);
  const articleImage = getArticleImageUrl(section, article.id, 160, 160);

  return (
    <>
      <PianoInit
        section={section}
        tags={[
          ...(article.tags || [section]),
          ...(article.locked ? ['premium'] : []),
        ]}
        contentCreator={article.byline}
      />

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        {/* Breadcrumb */}
        <div style={{ fontSize: 12, color: '#999', marginBottom: 22 }}>
          <a href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</a>
          {' · '}
          <a href={`/${section}`} style={{ color: sectionColor, textDecoration: 'none', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {sectionLabel}
          </a>
        </div>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: sectionColor }}>
              {article.category}
            </span>
            {article.locked && (
              <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', background: '#D97706', color: 'white', padding: '2px 7px', borderRadius: 2 }}>
                Premium
              </span>
            )}
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 44, fontWeight: 700, color: COLORS.dark, lineHeight: 1.2, margin: '0 0 22px' }}>
            {article.title}
          </h1>
          <div style={{ display: 'flex', gap: 20, fontSize: 13, color: '#888', borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, padding: '12px 0' }}>
            <span>{article.byline}</span>
            <span>{article.date}</span>
          </div>
        </div>

        {/* Body */}
        <div style={{ overflow: 'hidden' }}>
          <img
            src={articleImage}
            alt=""
            style={{ float: 'left', width: 160, height: 160, marginRight: 20, marginBottom: 10, marginTop: 4, borderRadius: 2, display: 'block' }}
          />
          {visibleBody.map((para, i) => (
            <p key={i} style={PARA_STYLE}>{para}</p>
          ))}

          {/* Piano paywall gate */}
          {article.locked && !hasAccess && (
            <div className="piano-container" />
          )}
        </div>

        {/* Newsletter signup Piano container */}
        <div className="piano-newsletter" style={{ marginTop: 48 }} />

        {showFull && (
          <div style={{ borderTop: `1px solid ${COLORS.border}`, marginTop: 48, paddingTop: 24 }}>
            <a href={`/${section}`} style={{ color: sectionColor, textDecoration: 'none', fontSize: 14, fontWeight: 700 }}>
              &larr; More {sectionLabel}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
