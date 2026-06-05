'use client';

import { useState } from 'react';
import { COLORS } from '../lib/site.config';

export default function DirectoryInquiryForm({ company }) {
  const [fields, setFields] = useState({ name: '', email: '', org: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.org) return;
    const existing = JSON.parse(localStorage.getItem('directory_inquiries') || '[]');
    existing.push({ ...fields, company, timestamp: new Date().toISOString() });
    localStorage.setItem('directory_inquiries', JSON.stringify(existing));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 8, padding: '32px 40px', textAlign: 'center' }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>&#10003;</div>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: COLORS.dark, margin: '0 0 8px' }}>Inquiry Sent</h3>
        <p style={{ fontSize: 14, color: '#666', margin: 0 }}>
          Your request has been submitted to {company}. A representative will follow up shortly.
        </p>
      </div>
    );
  }

  const inputStyle = { width: '100%', padding: '10px 12px', border: `1px solid ${COLORS.border}`, borderRadius: 4, fontSize: 14, boxSizing: 'border-box' };
  const labelStyle = { display: 'block', fontSize: 12, fontWeight: 700, color: '#555', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.5px' };

  return (
    <div style={{ background: '#F8FAFC', border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: '32px 36px' }}>
      <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, fontWeight: 700, color: COLORS.dark, margin: '0 0 8px' }}>
        Request Information
      </h3>
      <p style={{ fontSize: 14, color: '#666', margin: '0 0 24px', lineHeight: 1.5 }}>
        Contact {company} to learn more about their solutions.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
          <div>
            <label style={labelStyle}>Your Name</label>
            <input type="text" value={fields.name} onChange={e => setFields(f => ({ ...f, name: e.target.value }))} style={inputStyle} required />
          </div>
          <div>
            <label style={labelStyle}>Email</label>
            <input type="email" value={fields.email} onChange={e => setFields(f => ({ ...f, email: e.target.value }))} style={inputStyle} required />
          </div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Company</label>
          <input type="text" value={fields.org} onChange={e => setFields(f => ({ ...f, org: e.target.value }))} style={inputStyle} required />
        </div>
        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>Message <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
          <textarea value={fields.message} onChange={e => setFields(f => ({ ...f, message: e.target.value }))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
        </div>
        <button type="submit" style={{ background: COLORS.primary, color: 'white', border: 'none', padding: '12px 32px', fontSize: 14, fontWeight: 700, cursor: 'pointer', borderRadius: 4 }}>
          Submit Request
        </button>
      </form>
    </div>
  );
}
