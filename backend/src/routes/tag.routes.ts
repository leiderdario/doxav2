
import { Router } from 'express';
import { createTag, getTags, getTagById, deleteTag } from '../controllers/tag.controller';
import { validateSchema } from '../middleware/validateSchema';
import { createTagSchema } from '../schemas/tag.schema';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getTags);
router.get('/:id', getTagById);

// Rutas protegidas
router.post('/', requireAuth, validateSchema(createTagSchema), createTag);
router.delete('/:id', requireAuth, deleteTag);

export default router;
