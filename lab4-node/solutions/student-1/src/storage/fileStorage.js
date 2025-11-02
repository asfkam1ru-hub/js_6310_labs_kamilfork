import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

const FILE = 'storage.json';

async function read() {
  try {
    const data = await readFile(FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return { users: {}, sessions: {} };
  }
}

async function write(data) {
  await writeFile(FILE, JSON.stringify(data, null, 2), 'utf8');
}

export const storage = {
  async getWords(userId) {
    const db = await read();
    return db.users[userId]?.words ?? [];
  },

  async addWord(userId, term, translation) {
    const db = await read();
    db.users[userId] ??= { words: [] };
    const word = { id: randomUUID(), term, translation };
    db.users[userId].words.push(word);
    await write(db);
    return word;
  },

  async deleteWord(userId, wordId) {
    const db = await read();
    const words = db.users[userId]?.words ?? [];
    const idx = words.findIndex((w) => w.id === wordId);
    if (idx === -1) return false;
    words.splice(idx, 1);
    await write(db);
    return true;
  },

  async getSession(userId) {
    const db = await read();
    return db.sessions[userId] ?? null;
  },

  async setSession(userId, session) {
    const db = await read();
    db.sessions[userId] = session;
    await write(db);
  },

  async clearSession(userId) {
    const db = await read();
    delete db.sessions[userId];
    await write(db);
  }
};
