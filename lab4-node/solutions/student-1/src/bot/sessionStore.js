import { storage } from '../storage/fileStorage.js';

import { STATES } from './fsm.js';


export async function getSession(userId) {
  const session = await storage.getSession(userId);
  return session ?? { state: STATES.IDLE, draft: {} };
}

export async function setSession(userId, data) {
  await storage.setSession(userId, data);
}

export async function clearSession(userId) {
  await storage.clearSession(userId);
}
