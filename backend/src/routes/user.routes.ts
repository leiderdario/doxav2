
import { Router } from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { validateSchema } from '../middleware/validateSchema';
import { updateUserProfileSchema } from '../schemas/user.schema';

const router = Router();

// Rutas públicas
router.get('/:id', getUserProfile);

// Rutas protegidas
router.get('/profile', requireAuth, getUserProfile);
router.put('/profile', requireAuth, validateSchema(updateUserProfileSchema), updateUserProfile);

export default router;
