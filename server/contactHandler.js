// @ts-check
/**
 * Server-side contact form handler with input sanitization, 
 * anti-spam honeypot detection, rate limiting, and multi-provider email delivery.
 */

// In-memory sliding window rate limiter
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Clean up stale rate limit entries every 10 minutes (unref ensures it doesn't prevent Node process exit)
const cleanupInterval = setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now - data.firstRequest > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}, 10 * 60 * 1000);
if (typeof cleanupInterval.unref === 'function') {
  cleanupInterval.unref();
}

/**
 * Basic HTML/string sanitization
 * @param {string} str 
 * @returns {string}
 */
function sanitizeInput(str) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    .replace(/[<>]/g, '') // strip brackets to prevent HTML/XSS injection
    .replace(/[\r\n\t]+/g, (match) => (match.includes('\n') ? '\n' : ' '));
}

/**
 * Validate RFC 5322 compliant email format
 * @param {string} email 
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Check and apply rate limiting
 * @param {string} clientIp 
 * @returns {boolean} true if allowed, false if rate limited
 */
function checkRateLimit(clientIp) {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIp);

  if (!clientData) {
    rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    return true;
  }

  if (now - clientData.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(clientIp, { count: 1, firstRequest: now });
    return true;
  }

  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  clientData.count += 1;
  return true;
}

/**
 * Primary Contact Request Handler
 * @param {any} body 
 * @param {string} clientIp 
 * @returns {Promise<{ status: number, body: { success: boolean, message: string } }>}
 */
export async function processContactForm(body, clientIp = '127.0.0.1') {
  // 1. Anti-spam: Honeypot check
  // The frontend renders a hidden input `_gotcha`. Legitimate visitors never fill it.
  if (body._gotcha || body.botField || body.website) {
    console.warn(`[Contact API] Honeypot triggered by IP: ${clientIp}`);
    // Silently return success to mislead bots without sending an email
    return {
      status: 200,
      body: {
        success: true,
        message: 'Message sent successfully',
      },
    };
  }

  // 2. Anti-spam: Rate limiting
  if (!checkRateLimit(clientIp)) {
    console.warn(`[Contact API] Rate limit exceeded for IP: ${clientIp}`);
    return {
      status: 429,
      body: {
        success: false,
        message: 'Too many messages sent. Please wait a few minutes before trying again.',
      },
    };
  }

  // 3. Extract and sanitize inputs
  const rawName = body.name;
  const rawEmail = body.email;
  const rawSubject = body.subject;
  const rawMessage = body.message;

  const name = sanitizeInput(rawName);
  const email = typeof rawEmail === 'string' ? rawEmail.trim() : '';
  const subject = sanitizeInput(rawSubject);
  const message = typeof rawMessage === 'string' ? rawMessage.trim() : '';

  // 4. Server-side validation
  if (!name || name.length === 0) {
    return {
      status: 400,
      body: { success: false, message: 'Name is required.' },
    };
  }
  if (name.length > 100) {
    return {
      status: 400,
      body: { success: false, message: 'Name must not exceed 100 characters.' },
    };
  }

  if (!email || !isValidEmail(email)) {
    return {
      status: 400,
      body: { success: false, message: 'A valid email address is required.' },
    };
  }

  if (!subject || subject.length === 0) {
    return {
      status: 400,
      body: { success: false, message: 'Subject is required.' },
    };
  }
  if (subject.length > 200) {
    return {
      status: 400,
      body: { success: false, message: 'Subject must not exceed 200 characters.' },
    };
  }

  if (!message || message.length === 0) {
    return {
      status: 400,
      body: { success: false, message: 'Message is required.' },
    };
  }
  if (message.length > 5000) {
    return {
      status: 400,
      body: { success: false, message: 'Message must not exceed 5000 characters.' },
    };
  }

  // 5. Target recipient and configuration
  const recipientEmail = process.env.CONTACT_EMAIL || 'boyamallikarjuna183@gmail.com';
  const apiKey = (process.env.EMAIL_API_KEY || '').trim();
  const senderEmail = process.env.EMAIL_FROM || 'Portfolio Contact <onboarding@resend.dev>';
  const serviceOverride = (process.env.EMAIL_SERVICE || '').toLowerCase();

  // Exact plain-text structure requested by user
  const emailTextBody = `New message from your portfolio\n\nName:\n${name}\n\nEmail:\n${email}\n\nSubject:\n${subject}\n\nMessage:\n${message}\n\nSubmitted from:\nBoya Mallikarjuna Portfolio\nClient IP: ${clientIp}\nTimestamp: ${new Date().toISOString()}`;

  // Styled HTML version for Gmail rendering
  const emailHtmlBody = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #05060A; color: #E2E8F0; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #0D111E; border: 1px solid rgba(255,255,255,0.12); border-radius: 16px; padding: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
          .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; background: rgba(255,23,104,0.15); border: 1px solid rgba(255,23,104,0.3); color: #FF1768; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 16px; }
          h2 { color: #FFFFFF; margin-top: 0; font-size: 22px; }
          .field { margin-bottom: 20px; }
          .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #94A3B8; margin-bottom: 4px; font-family: monospace; }
          .value { font-size: 15px; color: #F1F5F9; background: rgba(255,255,255,0.03); padding: 10px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.06); word-break: break-word; }
          .message-box { background: rgba(255,255,255,0.04); border-left: 3px solid #06D6FF; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #F8FAFC; }
          .footer { margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 12px; color: #64748B; font-family: monospace; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="badge">Portfolio Contact Inquiry</div>
          <h2>New Message from Your Portfolio</h2>
          
          <div class="field">
            <div class="label">Visitor Name</div>
            <div class="value"><strong>${name}</strong></div>
          </div>
          
          <div class="field">
            <div class="label">Visitor Email (Reply-To)</div>
            <div class="value"><a href="mailto:${email}" style="color: #06D6FF; text-decoration: none;">${email}</a></div>
          </div>
          
          <div class="field">
            <div class="label">Subject</div>
            <div class="value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="label">Message</div>
            <div class="message-box">${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          </div>
          
          <div class="footer">
            Submitted from: Boya Mallikarjuna Portfolio<br>
            Timestamp: ${new Date().toUTCString()}
          </div>
        </div>
      </body>
    </html>
  `;

  // 6. Check if API key is provided
  if (!apiKey) {
    console.warn(`[Contact API] WARNING: EMAIL_API_KEY is not configured in .env.`);
    console.warn(`[Contact API] Message details: From "${name}" <${email}>: "${subject}"`);
    return {
      status: 503,
      body: {
        success: false,
        message: 'Email delivery service is not configured yet. Please configure EMAIL_API_KEY in the server .env file, or email directly at boyamallikarjuna183@gmail.com',
      },
    };
  }

  // 7. Determine Email Provider (Resend vs SendGrid)
  const isSendGrid = serviceOverride === 'sendgrid' || apiKey.startsWith('SG.');
  const isResend = serviceOverride === 'resend' || apiKey.startsWith('re_') || !isSendGrid;

  try {
    if (isSendGrid) {
      // SendGrid v3 API
      console.log(`[Contact API] Dispatching email via SendGrid to ${recipientEmail}...`);
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [
            {
              to: [{ email: recipientEmail }],
              subject: `[Portfolio Contact] ${subject}`,
            },
          ],
          from: { email: senderEmail.includes('<') ? senderEmail.split('<')[1].replace('>', '').trim() : senderEmail, name: 'Portfolio Contact' },
          reply_to: { email, name },
          content: [
            { type: 'text/plain', value: emailTextBody },
            { type: 'text/html', value: emailHtmlBody },
          ],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Contact API] SendGrid Error (${response.status}):`, errorText);
        return {
          status: 502,
          body: {
            success: false,
            message: 'Unable to send your message via SendGrid. Please try again.',
          },
        };
      }

      console.log(`[Contact API] Successfully delivered message to ${recipientEmail} via SendGrid!`);
      return {
        status: 200,
        body: {
          success: true,
          message: 'Message sent successfully',
        },
      };
    } else {
      // Resend API (default)
      console.log(`[Contact API] Dispatching email via Resend to ${recipientEmail}...`);
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [recipientEmail],
          reply_to: email,
          subject: `[Portfolio Contact] ${subject}`,
          text: emailTextBody,
          html: emailHtmlBody,
        }),
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        console.error(`[Contact API] Resend API Error (${response.status}):`, responseData);
        const errMsg = responseData && responseData.message ? responseData.message : 'Unable to send your message. Please try again.';
        return {
          status: 502,
          body: {
            success: false,
            message: errMsg,
          },
        };
      }

      console.log(`[Contact API] Successfully delivered message (ID: ${responseData?.id}) to ${recipientEmail} via Resend!`);
      return {
        status: 200,
        body: {
          success: true,
          message: 'Message sent successfully',
        },
      };
    }
  } catch (error) {
    console.error('[Contact API] Network/Execution Error:', error);
    return {
      status: 500,
      body: {
        success: false,
        message: 'Unable to send your message right now due to a network error. Please try again.',
      },
    };
  }
}
