export const STATES = {
  IDLE: 'IDLE',
  ADD_WORD_TERM: 'ADD_WORD_TERM',
  ADD_WORD_TRANSLATION: 'ADD_WORD_TRANSLATION',
  QUIZ_SHOW: 'QUIZ_SHOW',
  QUIZ_ANSWER: 'QUIZ_ANSWER'
};

export function nextState(state, event) {
  switch (state) {
    case STATES.IDLE:
      if (event.type === 'START_ADD') return STATES.ADD_WORD_TERM;
      if (event.type === 'START_QUIZ') return STATES.QUIZ_SHOW;
      return state;
    case STATES.ADD_WORD_TERM:
      if (event.type === 'TERM_ENTERED') return STATES.ADD_WORD_TRANSLATION;
      break;
    case STATES.ADD_WORD_TRANSLATION:
      if (event.type === 'TRANSLATION_ENTERED') return STATES.IDLE;
      break;
    case STATES.QUIZ_SHOW:
      if (event.type === 'ASKED') return STATES.QUIZ_ANSWER;
      break;
    case STATES.QUIZ_ANSWER:
      if (event.type === 'ANSWERED') return STATES.IDLE;
      break;
  }
  if (event.type === 'CANCEL') return STATES.IDLE;
  return state || STATES.IDLE;
}
