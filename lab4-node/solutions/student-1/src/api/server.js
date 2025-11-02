import express from 'express';
import morgan from 'morgan';
import { storage } from '../storage/fileStorage.js';
import { wordCreateSchema } from '../storage/schema.js';

export function createServer() {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (req, res) => res.json({ ok: true, env: process.env.NODE_ENV }));

  app.get('/users/:id/words', async (req, res) => {
    const words = await storage.getWords(req.params.id);
    res.json({ words });
  });

  app.post('/users/:id/words', async (req, res) => {
    const parsed = wordCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(422).json({ error: 'Invalid body' });

    const word = await storage.addWord(req.params.id, parsed.data.term, parsed.data.translation);
    res.status(201).json(word);
  });

  app.delete('/users/:id/words/:wordId', async (req, res) => {
    const ok = await storage.deleteWord(req.params.id, req.params.wordId);
    if (!ok) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  });

  app.use((req, res) => res.status(404).json({ error: 'Not found' }));
  return app;
}
