import express from 'express';
import { calculateResult } from '../shared/grades.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json({ limit: '16kb' }));
  app.post('/api/results', (req, res) => {
    const result = calculateResult(req.body);
    res.status(result.errors ? 400 : 200).json(result);
  });
  app.use('/api', (req, res) => {
    res.status(404).json({ errors: { form: 'API route not found.' } });
  });
  app.use((error, req, res, next) => {
    const status = error.status === 413 ? 413 : 400;
    res.status(status).json({ errors: { form: status === 413 ? 'Too many marks. Submit a smaller request.' : 'Send a valid JSON request.' } });
  });
  return app;
}
