import { z } from 'zod';

export const createCommentSchema = z.object({
  content: z.string().min(1, 'El contenido es requerido'),
  post_id: z.string().uuid('ID de publicación inválido'),
});

export const updateCommentSchema = z.object({
  content: z.string().min(1, 'El contenido es requerido'),
});