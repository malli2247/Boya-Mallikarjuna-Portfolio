import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for contactHandler during development
  Object.assign(process.env, env);

  return {
    base: './',
    plugins: [
      react(),
      {
        name: 'api-dev-middleware',
        configureServer(server) {
          // Dev route for /api/leetcode
          server.middlewares.use('/api/leetcode', async (req, res) => {
            if (req.method !== 'GET') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
              return;
            }

            try {
              const { getLeetCodeStats } = await import('./server/leetcodeHandler.js');
              const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
              const username = url.searchParams.get('username') || 'Mallikarjuna_Boya';
              const force = url.searchParams.get('force') === 'true';
              const result = await getLeetCodeStats(username, force);
              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'public, max-age=300');
              res.end(JSON.stringify(result.body));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: err?.message || 'Internal Server Error' }));
            }
          });

          // Dev route for /api/contact
          server.middlewares.use('/api/contact', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }));
              return;
            }

            let bodyStr = '';
            req.on('data', (chunk: Buffer) => {
              bodyStr += chunk.toString();
            });

            req.on('end', async () => {
              try {
                const { processContactForm } = await import('./server/contactHandler.js');
                const body = bodyStr ? JSON.parse(bodyStr) : {};
                const clientIp = req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || req.socket.remoteAddress || '127.0.0.1';
                const result = await processContactForm(body, clientIp);
                res.statusCode = result.status;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify(result.body));
              } catch (err) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ success: false, message: 'Invalid JSON request body' }));
              }
            });
          });
        },
      },
    ],
  };
});
