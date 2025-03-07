import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { CreateCommentDto, UpdateCommentDto } from '../types/comment';

export const createComment = async (req: Request<{}, {}, CreateCommentDto>, res: Response) => {
  try {
    const { content, post_id } = req.body;
    const user_id = req.user?.id;

    // Verificar si el post existe
    const { data: post, error: postError } = await supabase
      .from('posts')
      .select('id')
      .eq('id', post_id)
      .single();

    if (postError || !post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    const { data, error } = await supabase
      .from('comments')
      .insert([
        { content, post_id, user_id }
      ])
      .select('*, user:users(username, email)')
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;

    const { data, error } = await supabase
      .from('comments')
      .select('*, user:users(username, email)')
      .eq('post_id', post_id)
      .order('created_at', { ascending: true });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateComment = async (req: Request<{ id: string }, {}, UpdateCommentDto>, res: Response) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const user_id = req.user?.id;

    const { data: existingComment } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    if (existingComment.user_id !== user_id) {
      return res.status(403).json({ message: 'No tienes permiso para editar este comentario' });
    }

    const { data, error } = await supabase
      .from('comments')
      .update({ content, updated_at: new Date() })
      .eq('id', id)
      .select('*, user:users(username, email)')
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al actualizar comentario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    const { data: existingComment } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingComment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }

    if (existingComment.user_id !== user_id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este comentario' });
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json({ message: 'Comentario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar comentario:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};