import { z } from 'zod';

export const createPostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(255, 'El título es demasiado largo'),
  content: z.string().min(1, 'El contenido es requerido'),
});

export const updatePostSchema = z.object({
  title: z.string().min(1, 'El título es requerido').max(255, 'El título es demasiado largo').optional(),
  content: z.string().min(1, 'El contenido es requerido').optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Se debe proporcionar al menos un campo para actualizar"
});