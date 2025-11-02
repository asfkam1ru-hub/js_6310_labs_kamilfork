import { wordCreateSchema } from '../src/storage/schema.js';

describe('wordCreateSchema', () => {
  test('validates correct data', () => {
    const result = wordCreateSchema.safeParse({ term: 'apple', translation: 'яблоко' });
    expect(result.success).toBe(true);
  });

  test('fails invalid data', () => {
    const result = wordCreateSchema.safeParse({ term: '', translation: '' });
    expect(result.success).toBe(false);
  });
});
