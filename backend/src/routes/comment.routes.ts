import { Router } from 'express';
import { createComment, getCommentsByPost, updateComment, deleteComment } from '../controllers/comment.controller';
import { validateSchema } from '../middleware/validateSchema';
import { createCommentSchema, updateCommentSchema } from '../schemas/comment.schema';
import { requireAuth } from '../middleware/auth.middleware';


const router = Router();

// Rutas públicas
router.get('/post/:post_id', getCommentsByPost);

// Rutas protegidas
router.post('/', requireAuth, validateSchema(createCommentSchema), createComment);
router.put('/:id', requireAuth, validateSchema(updateCommentSchema), updateComment);
router.delete('/:id', requireAuth, deleteComment);

export default router;