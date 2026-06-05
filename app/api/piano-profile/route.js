// Piano Publisher API — custom fields read/write
// Used by ProgressiveProfileModal to save user profile data
// Requires env vars: PIANO_API_TOKEN, NEXT_PUBLIC_PIANO_AID

import { NextResponse } from 'next/server';

const API_BASE = 'https://api.piano.io/api/v3';
const TOKEN = process.env.PIANO_API_TOKEN;
const AID = process.env.NEXT_PUBLIC_PIANO_AID;

export async function GET(request) {
  if (!TOKEN || !AID) {
    return NextResponse.json({ error: 'Piano API not configured' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get('uid');
  if (!uid) return NextResponse.json({ error: 'uid required' }, { status: 400 });

  const body = new URLSearchParams({ api_token: TOKEN, aid: AID, uid });
  const res = await fetch(`${API_BASE}/publisher/user/get`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await res.json();
  const customFields = {};
  if (data?.user?.custom_fields) {
    data.user.custom_fields.forEach(f => { customFields[f.field_name] = f.value; });
  }
  return NextResponse.json(customFields);
}

export async function POST(request) {
  if (!TOKEN || !AID) {
    return NextResponse.json({ error: 'Piano API not configured' }, { status: 500 });
  }

  const { uid, fields } = await request.json();
  if (!uid || !fields) return NextResponse.json({ error: 'uid and fields required' }, { status: 400 });

  const body = new URLSearchParams({
    api_token: TOKEN,
    aid: AID,
    uid,
    custom_fields: JSON.stringify(fields),
  });

  const res = await fetch(`${API_BASE}/publisher/user/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
