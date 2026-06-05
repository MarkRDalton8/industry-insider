'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { COLORS, PIANO, SITE } from '../lib/site.config';

const JOB_OPTIONS = ['C-Level', 'VP', 'Director', 'Manager', 'Individual Contributor', 'Consultant'];
const INDUSTRY_OPTIONS = ['Manufacturing', 'Construction', 'Energy', 'Healthcare', 'Technology', 'Financial Services', 'Retail', 'Transportation', 'Government', 'Education', 'Media', 'Other'];
const SIZE_OPTIONS = ['1-50', '51-200', '201-1,000', '1,001-5,000', '5,000+'];
const DEPT_OPTIONS = ['Executive', 'Operations', 'IT/Technology', 'Marketing', 'Sales', 'Finance', 'Engineering', 'Procurement', 'HR', 'Other'];

export default function ProgressiveProfileModal() {
  const [stage, setStage] = useState(0);
  const [showThankYou, setShowThankYou] = useState(null);
  const [fields, setFields] = useState({ jobLevel: '', industry: '', companySize: '', department: '' });
  const pathname = usePathname();

  useEffect(() => {
    const s1Done = localStorage.getItem('ppmodal_stage1_done');
    const s2Done = localStorage.getItem('ppmodal_stage2_done');
    if (s2Done) return;

    const key = `${SITE.name.toLowerCase().replace(/\s+/g, '_')}_pageviews`;
    const rawViews = parseInt(localStorage.getItem(key) || '0', 10);

    const tryShow = () => {
      const user = window.tp?.pianoId?.getUser?.();
      if (!user?.uid) return;

      if (!localStorage.getItem('ppmodal_registered_at')) {
        localStorage.setItem('ppmodal_registered_at', String(rawViews));
        return;
      }

      const registeredAt = parseInt(localStorage.getItem('ppmodal_registered_at') || '0', 10);
      const pageViews = rawViews - registeredAt;
      const targetStage = !s1Done && pageViews >= 3 ? 1 : (s1Done && !s2Done && pageViews >= 6 ? 2 : 0);
      if (targetStage) setTimeout(() => setStage(targetStage), 2000);
    };

    if (window.tp?.pianoId?.getUser) {
      tryShow();
    } else {
      window.tp = window.tp || [];
      window.tp.push(['init', tryShow]);
    }
  }, [pathname]);

  const submitFields = (customFields, storageKey) => {
    const user = window.tp?.pianoId?.getUser?.();
    const uid = user?.uid;
    localStorage.setItem(storageKey, '1');
    setStage(0);
    if (!uid) return;
    fetch('/api/piano-profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ uid, fields: customFields }),
    }).catch(() => {});

    const thankYouStage = storageKey === 'ppmodal_stage1_done' ? 1 : 2;
    setShowThankYou(thankYouStage);
    setTimeout(() => setShowThankYou(null), storageKey === 'ppmodal_stage1_done' ? 3000 : 4000);
  };

  const handleStage1 = (e) => {
    e.preventDefault();
    if (!fields.jobLevel) return;
    submitFields({
      'job-level': JSON.stringify([fields.jobLevel]),
    }, 'ppmodal_stage1_done');
  };

  const handleStage2 = (e) => {
    e.preventDefault();
    if (!fields.industry || !fields.department) return;
    const cf = {
      industry: JSON.stringify([fields.industry]),
      department: JSON.stringify([fields.department]),
    };
    if (fields.companySize) cf['company-size'] = JSON.stringify([fields.companySize]);
    submitFields(cf, 'ppmodal_stage2_done');
  };

  const dismiss = () => {
    localStorage.setItem(stage === 1 ? 'ppmodal_stage1_done' : 'ppmodal_stage2_done', '1');
    setStage(0);
  };

  if (!stage && !showThankYou) return null;

  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' };
  const inputStyle = { width: '100%', padding: '10px 12px', border: `1px solid ${COLORS.border}`, borderRadius: 4, fontSize: 14, fontFamily: 'inherit' };

  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, width: 380, zIndex: 2000,
      background: 'white', borderRadius: 14,
      boxShadow: '0 8px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
      border: `1px solid ${COLORS.border}`, overflow: 'hidden',
      animation: 'ppSlideUp 0.3s ease',
      fontFamily: 'var(--font-ui)',
    }}>
      <style>{`
        @keyframes ppSlideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      <div style={{ height: 4, background: showThankYou ? 'linear-gradient(90deg, #059669 0%, #10B981 100%)' : `linear-gradient(90deg, ${COLORS.primary} 0%, #3B82F6 100%)` }} />

      <div style={{ padding: '24px 24px 20px' }}>
        {showThankYou && (
          <div style={{ textAlign: 'center', padding: '12px 0' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
              <span style={{ color: '#059669', fontSize: 24, fontWeight: 700 }}>&#10003;</span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.dark, margin: '0 0 6px' }}>
              {showThankYou === 1 ? 'Thanks!' : 'Profile complete!'}
            </h3>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>
              {showThankYou === 1
                ? 'Your role has been saved. We\'ll tailor content to your level.'
                : 'Your full profile is saved. Expect personalized research, webinars, and insights matched to your industry and role.'}
            </p>
          </div>
        )}

        {!showThankYou && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: COLORS.dark, lineHeight: 1.4, margin: '0 0 4px' }}>
                  {stage === 1 ? 'Tell us about yourself' : 'One more thing...'}
                </h3>
                <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
                  {stage === 1
                    ? 'Help us personalize your experience.'
                    : 'A few more details for better recommendations.'}
                </p>
              </div>
              <button onClick={dismiss} style={{
                background: 'none', border: 'none', color: '#9CA3AF', fontSize: 18,
                cursor: 'pointer', padding: 0, lineHeight: 1, flexShrink: 0, marginLeft: 12,
              }}>&times;</button>
            </div>

            {stage === 1 && (
              <form onSubmit={handleStage1}>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Job Title</label>
                  <select value={fields.jobLevel} onChange={e => setFields(f => ({ ...f, jobLevel: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {JOB_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button type="button" onClick={dismiss} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Skip</button>
                  <button type="submit" style={{
                    background: fields.jobLevel ? COLORS.primary : '#E2E8F0',
                    color: fields.jobLevel ? 'white' : '#9CA3AF',
                    border: 'none', padding: '10px 24px', borderRadius: 6, fontSize: 13, fontWeight: 700,
                    cursor: fields.jobLevel ? 'pointer' : 'default', fontFamily: 'inherit',
                  }}>Continue</button>
                </div>
              </form>
            )}

            {stage === 2 && (
              <form onSubmit={handleStage2}>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Industry</label>
                  <select value={fields.industry} onChange={e => setFields(f => ({ ...f, industry: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {INDUSTRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>Company Size</label>
                  <select value={fields.companySize} onChange={e => setFields(f => ({ ...f, companySize: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {SIZE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={labelStyle}>Department</label>
                  <select value={fields.department} onChange={e => setFields(f => ({ ...f, department: e.target.value }))} style={inputStyle}>
                    <option value="">Select...</option>
                    {DEPT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <button type="button" onClick={dismiss} style={{ background: 'none', border: 'none', color: '#9CA3AF', fontSize: 12, cursor: 'pointer', fontFamily: 'inherit', padding: 0 }}>Skip</button>
                  <button type="submit" style={{
                    background: (fields.industry && fields.department) ? COLORS.primary : '#E2E8F0',
                    color: (fields.industry && fields.department) ? 'white' : '#9CA3AF',
                    border: 'none', padding: '10px 24px', borderRadius: 6, fontSize: 13, fontWeight: 700,
                    cursor: (fields.industry && fields.department) ? 'pointer' : 'default', fontFamily: 'inherit',
                  }}>Submit</button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
