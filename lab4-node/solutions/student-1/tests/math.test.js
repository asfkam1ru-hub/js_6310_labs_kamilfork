import { randomInt } from '../src/utils/math.js';

describe('randomInt', () => {
  test('returns number within range', () => {
    const n = randomInt(1, 3);
    expect(n).toBeGreaterThanOrEqual(1);
    expect(n).toBeLessThanOrEqual(3);
  });

  test('produces different values sometimes', () => {
    const results = new Set(Array.from({ length: 20 }, () => randomInt(1, 2)));
    expect(results.size).toBeGreaterThan(0);
  });
});
