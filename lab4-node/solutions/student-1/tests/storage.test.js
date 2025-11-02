import { storage } from '../src/storage/fileStorage.js';
import { writeFile, unlink } from 'node:fs/promises';

const TMP = 'storage.json';

describe('storage', () => {
  beforeEach(async () => {
    await writeFile(TMP, JSON.stringify({ users: {}, sessions: {} }, null, 2), 'utf8');
  });
  afterAll(async () => {
    try { await unlink(TMP); } catch {}
  });

  test('add and get word', async () => {
    await storage.addWord('u1', 'apple', 'яблоко');
    const words = await storage.getWords('u1');
    expect(words[0].term).toBe('apple');
  });

  test('delete word', async () => {
    const word = await storage.addWord('u1', 'apple', 'яблоко');
    const ok = await storage.deleteWord('u1', word.id);
    expect(ok).toBe(true);
  });

  test('delete non-existing returns false', async () => {
    const ok = await storage.deleteWord('u1', 'wrong-id');
    expect(ok).toBe(false);
  });

  test('sessions CRUD', async () => {
    await storage.setSession('u1', { state: 'TEST', draft: {} });
    const s = await storage.getSession('u1');
    expect(s.state).toBe('TEST');
    await storage.clearSession('u1');
    const cleared = await storage.getSession('u1');
    expect(cleared).toBe(null);
  });
});
