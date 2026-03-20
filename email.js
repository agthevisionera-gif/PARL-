import { promises as fs } from 'fs';
import path from 'path';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { email, ts } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email' });
    }

    // Log to Vercel function logs (visible in dashboard)
    console.log(`NEW_USER | ${ts} | ${email}`);

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to save' });
  }
}
