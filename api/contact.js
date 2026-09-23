/**
 * Serverless Contact API Route for Vercel
 * Handles secure email submissions via Resend API
 */

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;
const rateLimitMap = new Map();

function isRateLimited(ip, now) {
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  return recent.length >= MAX_REQUESTS_PER_WINDOW;
}

function recordRequest(ip, now) {
  const timestamps = rateLimitMap.get(ip) || [];
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateLimitMap.set(ip, recent);
}

function cleanRateLimits(now) {
  for (const [ip, timestamps] of rateLimitMap.entries()) {
    const valid = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (valid.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, valid);
    }
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function parseBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return null;
      }
    }
    return req.body;
  }

  return new Promise((resolve) => {
    let data = '';
    req.on('data', chunk => { data += chunk; });
    req.on('end', () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch {
        resolve(null);
      }
    });
    req.on('error', () => resolve(null));
  });
}

async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    return res.end();
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  }

  // Rate Limiting by IP
  const clientIp = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown')
    .toString()
    .split(',')[0]
    .trim();

  const now = Date.now();
  cleanRateLimits(now);

  if (isRateLimited(clientIp, now)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Too many requests. Please try again later.' }));
  }

  // Parse Body
  const body = await parseBody(req);
  if (!body || typeof body !== 'object') {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Invalid or missing JSON payload' }));
  }

  // Honeypot spam check - silent success for bots
  if (body._gotcha || body.honeypot || body.website) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ success: true, message: 'Message sent successfully.' }));
  }

  // Input sanitization & validation
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!name || name.length < 2 || name.length > 100) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Name must be between 2 and 100 characters.' }));
  }

  if (!email || email.length > 254 || !emailRegex.test(email)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Please provide a valid email address.' }));
  }

  if (!message || message.length < 10 || message.length > 5000) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ error: 'Message must be between 10 and 5000 characters.' }));
  }

  // Record valid submission for rate limiting
  recordRequest(clientIp, now);

  const timestampIso = new Date().toISOString();
  const formattedDate = new Date().toLocaleString('en-US', {
    timeZone: 'UTC',
    dateStyle: 'full',
    timeStyle: 'long'
  });

  const recipient = 'kishoremano2000@gmail.com';
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>';
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Development fallback when RESEND_API_KEY is not yet set
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API DEV] Message from "${name}" <${email}> validated successfully at ${timestampIso}. RESEND_API_KEY not configured, simulating delivery.`);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        success: true,
        message: 'Message sent successfully. Thanks for reaching out!',
        devMode: true
      }));
    } else {
      console.error('[API ERROR] RESEND_API_KEY environment variable is missing.');
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        error: 'Unable to send your message. Please try again or email me directly.'
      }));
    }
  }

  try {
    const emailPayload = {
      from: fromEmail,
      to: [recipient],
      reply_to: email,
      subject: `Portfolio Contact: Message from ${name}`,
      text: `New message from portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nTimestamp: ${formattedDate} (UTC)\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1e293b; background-color: #f8fafc; border-radius: 8px;">
          <div style="background-color: #0f1724; padding: 20px 24px; border-radius: 6px; margin-bottom: 24px;">
            <h2 style="color: #00bcf2; margin: 0; font-size: 20px;">New Portfolio Contact Message</h2>
          </div>
          <div style="background-color: #ffffff; padding: 24px; border-radius: 6px; border: 1px solid #e2e8f0;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 100px;"><strong>Name:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(name)}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Email:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;"><a href="mailto:${escapeHtml(email)}" style="color: #0078d4; text-decoration: none;">${escapeHtml(email)}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Date:</strong></td>
                <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${formattedDate} (UTC)</td>
              </tr>
            </table>
            <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
              <strong style="color: #64748b; font-size: 14px; display: block; margin-bottom: 8px;">Message:</strong>
              <div style="white-space: pre-wrap; color: #334155; font-size: 15px; line-height: 1.6; background-color: #f1f5f9; padding: 16px; border-radius: 4px;">${escapeHtml(message)}</div>
            </div>
          </div>
          <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #94a3b8;">
            Submitted via Kishore's Developer Portfolio Contact Form
          </div>
        </div>
      `
    };

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailPayload)
    });

    if (!resendResponse.ok) {
      const errBody = await resendResponse.json().catch(() => ({}));
      console.error('[API ERROR] Resend responded with status:', resendResponse.status, errBody);
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      return res.end(JSON.stringify({
        error: 'Unable to send your message. Please try again or email me directly.'
      }));
    }

    console.log(`[API] Email successfully dispatched for ${email} at ${timestampIso}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      success: true,
      message: 'Message sent successfully. Thanks for reaching out!'
    }));
  } catch (error) {
    console.error('[API ERROR] Failed to send email via Resend:', error.message || error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({
      error: 'Unable to send your message. Please try again or email me directly.'
    }));
  }
}

module.exports = handler;

// Local development runner: start standalone server on port 3000 if executed directly
if (require.main === module) {
  const http = require('http');
  const port = process.env.PORT || 3000;
  const server = http.createServer((req, res) => handler(req, res));
  server.listen(port, () => {
    console.log(`Local Contact API server listening on http://localhost:${port}/api/contact`);
  });
}
