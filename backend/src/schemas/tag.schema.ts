
import { z } from 'zod';

export const createTagSchema = z.object({
  name: z.string().min(2, 'El nombre de la etiqueta debe tener al menos 2 caracteres').max(50, 'El nombre de la etiqueta no puede tener más de 50 caracteres'),
});
