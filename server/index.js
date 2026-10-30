import express from 'express';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';
import { createApp } from './app.js';

const app = createApp();
const port = Number(process.env.PORT || 3000);
let vite;
if (process.argv.includes('--dev')) {
  const { createServer } = await import('vite');
  vite = await createServer({ server: { middlewareMode: true }, appType: 'spa' });
  app.use(vite.middlewares);
} else {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  if (!existsSync(`${dist}/index.html`)) {
    console.error('Build the frontend first with npm run build.');
    process.exit(1);
  }
  app.use(express.static(dist));
}
const server = app.listen(port, '127.0.0.1', () => {
  console.log(`Gradebook is ready at http://127.0.0.1:${port}`);
});
server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is in use. Set PORT to another port.` : error.message);
  process.exit(1);
});
async function shutdown() {
  if (vite) await vite.close();
  server.close(() => process.exit(0));
  server.closeAllConnections();
}
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
