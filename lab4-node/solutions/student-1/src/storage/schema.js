import { z } from 'zod';

export const wordCreateSchema = z.object({
  term: z.string().min(1),
  translation: z.string().min(1)
});

export const userSessionSchema = z.object({
  state: z.string().default('IDLE'),
  draft: z.record(z.any()).default({})
});
