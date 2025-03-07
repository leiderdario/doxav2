import { Router } from 'express';
import { toggleLike, getLikesByPost } from '../controllers/like.controller';
import { validateSchema } from '../middleware/validateSchema';
import { createLikeSchema } from '../schemas/like.schema';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/post/:post_id', getLikesByPost);

// Rutas protegidas
router.post('/toggle', requireAuth, validateSchema(createLikeSchema), toggleLike);

export default router;