import request from 'supertest';
import { createServer } from '../src/api/server.js';
import { writeFile, unlink } from 'node:fs/promises';

const TMP = 'storage.json';

describe('API integration', () => {
  let app;

  beforeEach(async () => {
    await writeFile(TMP, JSON.stringify({ users: {}, sessions: {} }, null, 2), 'utf8');
    app = createServer();
  });

  afterAll(async () => {
    try {
      await unlink(TMP);
    } catch (_e) {
    void _e; // mark used
    /* no-op: temp file might already be removed */
   }
  });

  test('GET /health', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  test('GET /users/:id/words empty', async () => {
    const res = await request(app).get('/users/u1/words');
    expect(res.status).toBe(200);
    expect(res.body.words).toEqual([]);
  });

  test('POST /users/:id/words validation', async () => {
    const res = await request(app).post('/users/u1/words').send({ term: '', translation: '' });
    expect(res.status).toBe(422);
  });

  test('POST then GET shows item', async () => {
    const created = await request(app).post('/users/u1/words').send({ term: 'apple', translation: 'яблоко' });
    expect(created.status).toBe(201);
    const list = await request(app).get('/users/u1/words');
    expect(list.body.words).toHaveLength(1);
  });

  test('DELETE removes item and 404 second time', async () => {
    const { body } = await request(app).post('/users/u1/words').send({ term: 'apple', translation: 'яблоко' });
    expect((await request(app).delete(`/users/u1/words/${body.id}`)).status).toBe(204);
    expect((await request(app).delete(`/users/u1/words/${body.id}`)).status).toBe(404);
  });

  test('404 fallback', async () => {
    expect((await request(app).get('/nope')).status).toBe(404);
  });
});
