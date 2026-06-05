// Site Licensing API proxy — wraps Piano's Site Licensing API
// Enable: set FEATURES.siteLicensing = true in site.config.js
// Requires env vars: PIANO_API_TOKEN, NEXT_PUBLIC_PIANO_AID, PIANO_CONTRACT_ID
//
// Endpoints (all POST):
//   /api/site-licensing?action=list-users
//   /api/site-licensing?action=create-user
//   /api/site-licensing?action=remove-user
//   /api/site-licensing?action=send-invitation
//   /api/site-licensing?action=get-contract

import { NextResponse } from 'next/server';

const API_BASE = 'https://api.piano.io/api/v3';
const TOKEN = process.env.PIANO_API_TOKEN;
const AID = process.env.NEXT_PUBLIC_PIANO_AID;
const CONTRACT_ID = process.env.PIANO_CONTRACT_ID;

function makeFormBody(params) {
  return new URLSearchParams({ api_token: TOKEN, aid: AID, ...params }).toString();
}

async function pianoPost(endpoint, params) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: makeFormBody(params),
  });
  return res.json();
}

export async function POST(request) {
  if (!TOKEN || !AID || !CONTRACT_ID) {
    return NextResponse.json({ error: 'Site licensing not configured. Set PIANO_API_TOKEN, NEXT_PUBLIC_PIANO_AID, and PIANO_CONTRACT_ID.' }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const body = await request.json().catch(() => ({}));

  switch (action) {
    case 'list-users': {
      const data = await pianoPost('/publisher/licensing/contract/users', { contract_id: CONTRACT_ID, offset: body.offset || 0, limit: body.limit || 25 });
      return NextResponse.json(data);
    }
    case 'create-user': {
      const data = await pianoPost('/publisher/licensing/contract/user/create', { contract_id: CONTRACT_ID, email: body.email, first_name: body.firstName || '', last_name: body.lastName || '' });
      return NextResponse.json(data);
    }
    case 'remove-user': {
      const data = await pianoPost('/publisher/licensing/contract/user/remove', { contract_id: CONTRACT_ID, uid: body.uid });
      return NextResponse.json(data);
    }
    case 'send-invitation': {
      const data = await pianoPost('/publisher/licensing/contract/user/invite', { contract_id: CONTRACT_ID, uid: body.uid });
      return NextResponse.json(data);
    }
    case 'get-contract': {
      const data = await pianoPost('/publisher/licensing/contract/get', { contract_id: CONTRACT_ID });
      return NextResponse.json(data);
    }
    default:
      return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
  }
}
