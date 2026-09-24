# Real Email Delivery Setup Guide

This portfolio includes a real, production-ready contact form backend (`POST /api/contact`) that delivers messages directly to:
**`boyamallikarjuna183@gmail.com`**

---

## 1. Quick Setup with Resend (Recommended • Free • 2 Minutes)

[Resend](https://resend.com) provides 3,000 free emails per month and requires zero credit card.

### Step 1: Create an Account
1. Go to [https://resend.com](https://resend.com) and click **Sign Up** (you can sign in with your GitHub or Google account).

### Step 2: Generate an API Key
1. Go to the [API Keys section](https://resend.com/api-keys).
2. Click **Create API Key**.
3. Name: `Portfolio Contact Form`.
4. Permission: `Full access` or `Sending access`.
5. Copy the generated key (starts with `re_...`).

### Step 3: Add the Key to Your Local `.env` File
In your portfolio root directory, open `.env` and add:
```env
CONTACT_EMAIL=boyamallikarjuna183@gmail.com
EMAIL_API_KEY=re_your_api_key_here
EMAIL_FROM=Portfolio Contact <onboarding@resend.dev>
EMAIL_SERVICE=resend
```

> **Testing Note:** By default, Resend allows you to send emails from `onboarding@resend.dev` to the exact email address you signed up with (`boyamallikarjuna183@gmail.com`). This means **you can test real email delivery immediately without purchasing or verifying a custom domain!**

### Step 4 (Optional for Custom Domain in Production):
1. In Resend, go to **Domains** &rarr; **Add Domain** (e.g. `boyamallikarjuna.com`).
2. Add the provided DNS TXT/MX records to your domain DNS registrar (Namecheap, GoDaddy, Cloudflare, etc.).
3. Once verified, update `EMAIL_FROM`:
   ```env
   EMAIL_FROM=Boya Mallikarjuna <contact@boyamallikarjuna.com>
   ```

---

## 2. Alternative Setup with SendGrid

If you prefer SendGrid:
1. Create a free account on [SendGrid](https://sendgrid.com).
2. Complete **Single Sender Verification** for `boyamallikarjuna183@gmail.com`.
3. Create an API Key in **Settings** &rarr; **API Keys** with Mail Send permissions.
4. Update `.env`:
   ```env
   CONTACT_EMAIL=boyamallikarjuna183@gmail.com
   EMAIL_API_KEY=SG.your_sendgrid_key_here
   EMAIL_FROM=boyamallikarjuna183@gmail.com
   EMAIL_SERVICE=sendgrid
   ```

---

## 3. Anti-Spam & Security Architecture

1. **Zero Secret Exposure**:
   - Secrets are loaded exclusively on the backend (`process.env.EMAIL_API_KEY`).
   - `.env` is listed in `.gitignore` and is never committed to GitHub.
   - Frontend bundle contains zero API keys or SMTP passwords.
2. **Honeypot Anti-Spam Trap**:
   - An invisible field (`_gotcha`) catches automated web scrapers and spam bots without bothering legitimate visitors.
3. **Sliding-Window Rate Limiter**:
   - Limits client IPs to a maximum of 5 requests per 15-minute window to prevent spam flooding.
4. **Strict Sanitization & Validation**:
   - `Name`: Required, max 100 characters, HTML tags stripped.
   - `Email`: Required, RFC 5322 regex validation, max 254 characters.
   - `Subject`: Required, max 200 characters.
   - `Message`: Required, 5 to 5000 characters.

---

## 4. How It Runs

* **In Development (`npm run dev`)**:
  - The Vite dev server middleware intercepts `POST /api/contact` on `http://127.0.0.1:5173/api/contact`.
  - Dispatches the email and returns JSON status.
* **In Standalone Production (`npm start` or `node server.js`)**:
  - Express server serves static `dist/` assets and listens for `POST /api/contact` on port 3000 (or `process.env.PORT`).
* **On Vercel / Netlify (`api/contact.js`)**:
  - Automatically runs as a serverless function with environment variables set in the hosting dashboard.
