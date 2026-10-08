import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { app as backendApp } from './backend/server.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

// Serve static frontend build from dist folder in production
const distPath = path.join(__dirname, 'dist');
backendApp.use(express.static(distPath));

// Fallback all non-API routes to index.html for React SPA client-side routing
backendApp.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

backendApp.listen(PORT, '0.0.0.0', () => {
  console.log(`WeCare Hospital full-stack server running on http://0.0.0.0:${PORT}`);
});
