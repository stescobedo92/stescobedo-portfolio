export async function POST({ request }: { request: Request }) {
  try {
    const data = await request.formData();
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const message = String(data.get('message') || '');

    if (!email || !message) {
      return new Response(JSON.stringify({ ok: false, error: 'Missing fields' }), { status: 400 });
    }

    // Send via mailto redirect fallback (since no email service configured)
    // In Astro serverless environments without SMTP, we can use mailto link instruction.
    // However, to actually send without client interaction, integrate a service.
    // For now, we’ll forward to Formspree style if env present; else respond with mailto.
    const TO = 'stescobedo.31@gmail.com';

    const subject = encodeURIComponent(`Portfolio contact from ${name || 'Anonymous'}`);
    const body = encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`);

    return new Response(JSON.stringify({ ok: true, mailto: `mailto:${TO}?subject=${subject}&body=${body}` }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e?.message || 'Server error' }), { status: 500 });
  }
}
