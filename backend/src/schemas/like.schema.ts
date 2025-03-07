import { z } from 'zod';

export const createLikeSchema = z.object({
  post_id: z.string().uuid('ID de publicación inválido'),
});