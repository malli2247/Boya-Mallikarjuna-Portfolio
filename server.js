import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { processContactForm } from './server/contactHandler.js';
import { getLeetCodeStats } from './server/leetcodeHandler.js';

// Load environment variables from .env
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json({ limit: '50kb' }));

// Trust reverse proxies (for rate limiting client IP on cloud hosts)
app.set('trust proxy', 1);

// API Route: POST /api/contact
app.post('/api/contact', async (req, res) => {
  const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
  const result = await processContactForm(req.body, clientIp);
  return res.status(result.status).json(result.body);
});

// API Route: GET /api/leetcode
app.get('/api/leetcode', async (req, res) => {
  const username = req.query?.username?.toString() || 'Mallikarjuna_Boya';
  const force = req.query?.force === 'true';
  const result = await getLeetCodeStats(username, force);
  res.setHeader('Cache-Control', 'public, max-age=300');
  return res.status(result.status).json(result.body);
});

// Serve production static assets from dist
const distPath = path.join(__dirname, 'dist');
app.use(express.static(distPath));

// Fallback to index.html for SPA routing (Express 5 compatible)
app.use((_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`[Production Server] Portfolio listening on http://localhost:${PORT}`);
  console.log(`[Production Server] Contact endpoint ready at POST http://localhost:${PORT}/api/contact`);
  console.log(`[Production Server] Destination email: ${process.env.CONTACT_EMAIL || 'boyamallikarjuna183@gmail.com'}`);
});
