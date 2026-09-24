import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { processContactForm } from './server/contactHandler.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  // Populate process.env for contactHandler during development
  Object.assign(process.env, env);

  return {
    plugins: [
      react(),
      {
        name: 'contact-api-dev-middleware',
        configureServer(server) {
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
