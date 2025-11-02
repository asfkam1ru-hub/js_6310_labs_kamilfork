import { nextState, STATES } from '../src/bot/fsm.js';

describe('FSM transitions', () => {
  test('from IDLE to ADD_WORD_TERM', () => {
    expect(nextState(STATES.IDLE, { type: 'START_ADD' })).toBe(STATES.ADD_WORD_TERM);
  });
  test('from ADD_WORD_TERM to ADD_WORD_TRANSLATION', () => {
    expect(nextState(STATES.ADD_WORD_TERM, { type: 'TERM_ENTERED' })).toBe(STATES.ADD_WORD_TRANSLATION);
  });
  test('cancel resets to IDLE', () => {
    expect(nextState(STATES.ADD_WORD_TRANSLATION, { type: 'CANCEL' })).toBe(STATES.IDLE);
  });
  test('unknown event keeps state', () => {
    expect(nextState(STATES.IDLE, { type: 'UNKNOWN' })).toBe(STATES.IDLE);
  });
});
