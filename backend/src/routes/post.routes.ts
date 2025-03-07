import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller';
import { validateSchema } from '../middleware/validateSchema';
import { createPostSchema, updatePostSchema } from '../schemas/post.schema';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Rutas públicas
router.get('/', getPosts);
router.get('/:id', getPostById);

// Rutas protegidas
router.post('/', requireAuth, validateSchema(createPostSchema), createPost);
router.put('/:id', requireAuth, validateSchema(updatePostSchema), updatePost);
router.delete('/:id', requireAuth, deletePost);

export default router;