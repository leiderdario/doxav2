
import { z } from 'zod';

export const updateUserProfileSchema = z.object({
  username: z.string().min(3, 'El nombre de usuario debe tener al menos 3 caracteres').optional(),
  bio: z.string().max(500, 'La biografía no puede tener más de 500 caracteres').optional(),
  avatar_url: z.string().url('URL de avatar inválida').optional(),
}).refine(data => Object.keys(data).length > 0, {
  message: "Se debe proporcionar al menos un campo para actualizar"
});
