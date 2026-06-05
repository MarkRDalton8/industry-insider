'use client';

import { useState, useEffect } from 'react';
import { COLORS, PIANO } from '../lib/site.config';

const JOB_OPTIONS = ['C-Level', 'VP', 'Director', 'Manager', 'Individual Contributor', 'Consultant'];
const INDUSTRY_OPTIONS = ['Manufacturing', 'Construction', 'Energy', 'Healthcare', 'Technology', 'Financial Services', 'Retail', 'Transportation', 'Government', 'Education', 'Media', 'Other'];
const SIZE_OPTIONS = ['1-50', '51-200', '201-1,000', '1,001-5,000', '5,000+'];
const DEPT_OPTIONS = ['Executive', 'Operations', 'IT/Technology', 'Marketing', 'Sales', 'Finance', 'Engineering', 'Procurement', 'HR', 'Other'];

export default function ProgressiveProfileModal() {
  const [stage, setStage] = useState(0);
  const [fields, setFields] = useState({ company: '', jobLevel: '', industry: '', companySize: '', department: '' });

  useEffect(() => {
    const s1Done = localStorage.getItem('ppmodal_stage1_done');
    const s2Done = localStorage.getItem('ppmodal_stage2_done');
    if (s2Done) return;

    const pageViews = parseInt(localStorage.getItem('pageviews') || '0', 10);
    const targetStage = !s1Done && pageViews >= 3 ? 1 : (s1Done && !s2Done && pageViews >= 6 ? 2 : 0);
    if (!targetStage) return;

    window.tp = window.tp || [];
    window.tp.push(['init', function () {
      const user = window.tp?.pianoId?.getUser?.();
      if (user?.uid) setTimeout(() => setStage(targetStage), 2000);
    }]);
  }, []);

  const submitFields = (customFields, storageKey) => {
    localStorage.setItem(storageKey, '1');
    setStage(0);
    if (!PIANO.aid) return;
    window.tp = window.tp || [];
    window.tp.push(['init', function () {
      const user = window.tp?.pianoId?.getUser?.();
      if (!user?.uid) return;
      fetch('/api/piano-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: user.uid, fields: customFields }),
      }).catch(() => {});
    }]);
  };

  const handleStage1 = (e) => {
    e.preventDefault();
    if (!fields.company || !fields.jobLevel) return;
    submitFields({
      'Company Name': fields.company.trim(),
      job_level: JSON.stringify([fields.jobLevel]),
    }, 'ppmodal_stage1_done');
  };

  const handleStage2 = (e) => {
    e.preventDefault();
    if (!fields.industry || !fields.department) return;
    const cf = {
      INDUSTRY: JSON.stringify([fields.industry]),
      DEPARTMENT: JSON.stringify([fields.department]),
    };
    if (fields.companySize) cf['company_size'] = JSON.stringify([fields.companySize]);
    submitFields(cf, 'ppmodal_stage2_done');
  };

  const dismiss = () => {
    localStorage.setItem(stage === 1 ? 'ppmodal_stage1_done' : 'ppmodal_stage2_done', '1');
    setStage(0);
  };

  if (!stage) return null;

  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' };
  const inputStyle = { width: '100%', padding: '10px 12px', border: `1px solid ${COLORS.border}`, borderRadius: 4, fontSize: 14 };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', padding: 40, borderRadius: 8, maxWidth: 440, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ width: 40, height: 4, background: COLORS.primary, borderRadius: 2, marginBottom: 20 }} />

        {stage === 1 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: COLORS.dark, margin: '0 0 8px' }}>
              Tell us about yourself
            </h2>
            <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.6 }}>
              Help us personalize your Industry Insider experience with content relevant to your role.
            </p>
            <form onSubmit={handleStage1}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Company</label>
                <input type="text" value={fields.company} onChange={e => setFields(f => ({ ...f, company: e.target.value }))} placeholder="Your company name" style={inputStyle} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Job Title</label>
                <select value={fields.jobLevel} onChange={e => setFields(f => ({ ...f, jobLevel: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {JOB_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" style={{ flex: 1, background: COLORS.primary, color: 'white', border: 'none', padding: '12px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>Continue</button>
                <button type="button" onClick={dismiss} style={{ flex: 1, background: '#f0f0f0', color: '#555', border: 'none', padding: '12px 0', fontSize: 14, cursor: 'pointer', borderRadius: 4 }}>Skip</button>
              </div>
            </form>
          </>
        )}

        {stage === 2 && (
          <>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontWeight: 700, color: COLORS.dark, margin: '0 0 8px' }}>
              One more thing...
            </h2>
            <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.6 }}>
              A few more details help us surface the research and insights most relevant to you.
            </p>
            <form onSubmit={handleStage2}>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Industry</label>
                <select value={fields.industry} onChange={e => setFields(f => ({ ...f, industry: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {INDUSTRY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Company Size</label>
                <select value={fields.companySize} onChange={e => setFields(f => ({ ...f, companySize: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {SIZE_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={labelStyle}>Department</label>
                <select value={fields.department} onChange={e => setFields(f => ({ ...f, department: e.target.value }))} style={inputStyle}>
                  <option value="">Select...</option>
                  {DEPT_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <button type="submit" style={{ flex: 1, background: COLORS.primary, color: 'white', border: 'none', padding: '12px 0', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>Submit</button>
                <button type="button" onClick={dismiss} style={{ flex: 1, background: '#f0f0f0', color: '#555', border: 'none', padding: '12px 0', fontSize: 14, cursor: 'pointer', borderRadius: 4 }}>Skip</button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
