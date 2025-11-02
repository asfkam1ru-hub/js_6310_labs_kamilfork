import { isDuplicateTerm } from '../src/utils/dups.js';

describe('isDuplicateTerm', () => {
  const words = [
    { term: 'Apple', translation: 'яблоко' },
    { term: 'Banana', translation: 'банан' }
  ];

  test('detects duplicate case-insensitive', () => {
    expect(isDuplicateTerm(words, 'apple')).toBe(true);
    expect(isDuplicateTerm(words, 'APPLE')).toBe(true);
  });

  test('non-duplicate', () => {
    expect(isDuplicateTerm(words, 'Orange')).toBe(false);
  });

  test('trims', () => {
    expect(isDuplicateTerm(words, '  apple  ')).toBe(true);
  });

  test('handles bad inputs', () => {
    expect(isDuplicateTerm(null, 'apple')).toBe(false);
    expect(isDuplicateTerm([], 'apple')).toBe(false);
    expect(isDuplicateTerm(words, '')).toBe(false);
    expect(isDuplicateTerm(words, '   ')).toBe(false);
  });
});
