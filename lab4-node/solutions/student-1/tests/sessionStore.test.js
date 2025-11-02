import { getSession, setSession, clearSession } from '../src/bot/sessionStore.js';
import { writeFile, unlink } from 'node:fs/promises';

const TMP = 'storage.json';

describe('sessionStore', () => {
  beforeEach(async () => {
    await writeFile(TMP, JSON.stringify({ users: {}, sessions: {} }, null, 2), 'utf8');
  });

  afterAll(async () => {
    try { await unlink(TMP); } catch {}
  });

  test('get default session when none exists', async () => {
    const s = await getSession('u0');
    expect(s.state).toBe('IDLE');
    expect(s.draft).toEqual({});
  });

  test('set and get session', async () => {
    await setSession('u1', { state: 'ADD_WORD_TERM', draft: { term: 'apple' } });
    const s = await getSession('u1');
    expect(s.state).toBe('ADD_WORD_TERM');
    expect(s.draft.term).toBe('apple');
  });

  test('clear session resets to default', async () => {
    await setSession('u2', { state: 'QUIZ_SHOW', draft: {} });
    await clearSession('u2');
    const s = await getSession('u2');
    expect(s.state).toBe('IDLE');
  });
});
