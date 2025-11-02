import { wordCreateSchema } from '../src/storage/schema.js';

describe('validators', () => {
  test('valid word passes', () => {
    const parsed = wordCreateSchema.safeParse({ term: 'car', translation: 'машина' });
    expect(parsed.success).toBe(true);
  });

  test('empty term fails', () => {
    const parsed = wordCreateSchema.safeParse({ term: '', translation: 'машина' });
    expect(parsed.success).toBe(false);
  });

  test('empty translation fails', () => {
    const parsed = wordCreateSchema.safeParse({ term: 'car', translation: '' });
    expect(parsed.success).toBe(false);
  });
});
