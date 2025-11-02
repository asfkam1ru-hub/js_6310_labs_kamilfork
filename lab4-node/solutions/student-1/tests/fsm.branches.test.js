import { STATES, nextState } from '../src/bot/fsm.js';

describe('FSM branch coverage', () => {
  const UNKNOWN = { type: 'UNKNOWN' };

  test('IDLE: handles START_ADD, START_QUIZ and ignores unknown', () => {
    expect(nextState(STATES.IDLE, { type: 'START_ADD' })).toBe(STATES.ADD_WORD_TERM);
    expect(nextState(STATES.IDLE, { type: 'START_QUIZ' })).toBe(STATES.QUIZ_SHOW);
    // unknown -> stay IDLE
    expect(nextState(STATES.IDLE, UNKNOWN)).toBe(STATES.IDLE);
  });

  test('ADD_WORD_TERM: TERM_ENTERED -> ADD_WORD_TRANSLATION; CANCEL -> IDLE; unknown -> stay', () => {
    expect(nextState(STATES.ADD_WORD_TERM, { type: 'TERM_ENTERED' })).toBe(STATES.ADD_WORD_TRANSLATION);
    expect(nextState(STATES.ADD_WORD_TERM, { type: 'CANCEL' })).toBe(STATES.IDLE);
    expect(nextState(STATES.ADD_WORD_TERM, UNKNOWN)).toBe(STATES.ADD_WORD_TERM);
  });

  test('ADD_WORD_TRANSLATION: TRANSLATION_ENTERED -> IDLE; CANCEL -> IDLE; unknown -> stay', () => {
    expect(nextState(STATES.ADD_WORD_TRANSLATION, { type: 'TRANSLATION_ENTERED' })).toBe(STATES.IDLE);
    expect(nextState(STATES.ADD_WORD_TRANSLATION, { type: 'CANCEL' })).toBe(STATES.IDLE);
    expect(nextState(STATES.ADD_WORD_TRANSLATION, UNKNOWN)).toBe(STATES.ADD_WORD_TRANSLATION);
  });

  test('QUIZ_SHOW: ASKED -> QUIZ_ANSWER; CANCEL -> IDLE; unknown -> stay', () => {
    expect(nextState(STATES.QUIZ_SHOW, { type: 'ASKED' })).toBe(STATES.QUIZ_ANSWER);
    expect(nextState(STATES.QUIZ_SHOW, { type: 'CANCEL' })).toBe(STATES.IDLE);
    expect(nextState(STATES.QUIZ_SHOW, UNKNOWN)).toBe(STATES.QUIZ_SHOW);
  });

  test('QUIZ_ANSWER: ANSWERED -> IDLE; CANCEL -> IDLE; unknown -> stay', () => {
    expect(nextState(STATES.QUIZ_ANSWER, { type: 'ANSWERED' })).toBe(STATES.IDLE);
    expect(nextState(STATES.QUIZ_ANSWER, { type: 'CANCEL' })).toBe(STATES.IDLE);
    expect(nextState(STATES.QUIZ_ANSWER, UNKNOWN)).toBe(STATES.QUIZ_ANSWER);
  });

  test('Unknown current state falls back to IDLE', () => {
    // Любое неизвестное текущее состояние -> IDLE
    expect(nextState('NO_SUCH_STATE', { type: 'ANY' })).toBe(STATES.IDLE);
    // И с CANCEL тоже IDLE
    expect(nextState('NO_SUCH_STATE', { type: 'CANCEL' })).toBe(STATES.IDLE);
  });

  test('Happy paths end-to-end (add and quiz)', () => {
    // add flow
    let s = STATES.IDLE;
    s = nextState(s, { type: 'START_ADD' });
    s = nextState(s, { type: 'TERM_ENTERED' });
    s = nextState(s, { type: 'TRANSLATION_ENTERED' });
    expect(s).toBe(STATES.IDLE);

    // quiz flow
    s = nextState(STATES.IDLE, { type: 'START_QUIZ' });
    s = nextState(s, { type: 'ASKED' });
    s = nextState(s, { type: 'ANSWERED' });
    expect(s).toBe(STATES.IDLE);
  });
});
