import { getLeetCodeStats } from '../server/leetcodeHandler.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }

  const username = req.query?.username || 'Mallikarjuna_Boya';
  const force = req.query?.force === 'true';

  const result = await getLeetCodeStats(username, force);

  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
  return res.status(result.status).json(result.body);
}
