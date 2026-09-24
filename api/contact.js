import { processContactForm } from '../server/contactHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket?.remoteAddress || '127.0.0.1';
  const result = await processContactForm(req.body, clientIp);
  return res.status(result.status).json(result.body);
}
