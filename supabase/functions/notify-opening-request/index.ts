// Emails a submitted hiring request to the JITSIE inbox.
//
// The row is written by the browser before this runs, so a delivery failure never
// costs a submission — the function reports the failure and the record stands.
// Sending goes through Resend; set RESEND_API_KEY in the project's function secrets.

const TO = 'jitsie@study.iitm.ac.in';
const FROM = 'JITSIE Site <onboarding@resend.dev>';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FIELDS: [string, string][] = [
  ['Startup', 'startup_name'],
  ['Website', 'website_url'],
  ['Role title', 'role_title'],
  ['Type', 'type'],
  ['Location', 'location'],
  ['Stipend / salary', 'stipend_salary'],
  ['Sector', 'sector'],
  ['Stage', 'stage'],
  ['Description', 'description'],
  ['Application link', 'apply_link'],
  ['Contact name', 'contact_name'],
  ['Contact role', 'contact_role'],
  ['Contact email', 'contact_email'],
  ['Contact phone', 'contact_phone'],
];

const escape = (v: string) =>
  v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });

  try {
    const body = await req.json();

    const email = String(body.contact_email ?? '').toLowerCase();
    if (!email.endsWith('iitm.ac.in')) {
      return new Response(JSON.stringify({ error: 'An iitm.ac.in address is required.' }), {
        status: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const key = Deno.env.get('RESEND_API_KEY');
    if (!key) {
      return new Response(JSON.stringify({ error: 'RESEND_API_KEY is not set.' }), {
        status: 500,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    const rows = FIELDS.filter(([, k]) => body[k])
      .map(
        ([label, k]) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top;white-space:nowrap">${label}</td>` +
          `<td style="padding:6px 0"><strong>${escape(String(body[k]))}</strong></td></tr>`,
      )
      .join('');

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: body.contact_email,
        subject: `Hiring request — ${body.role_title} at ${body.startup_name}`,
        html:
          `<div style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6">` +
          `<h2 style="margin:0 0 4px">New hiring request</h2>` +
          `<p style="margin:0 0 16px;color:#666">Submitted from the JITSIE startup openings page.</p>` +
          `<table style="border-collapse:collapse">${rows}</table></div>`,
      }),
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: await res.text() }), {
        status: 502,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
});
