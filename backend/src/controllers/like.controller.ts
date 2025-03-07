import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { CreateLikeDto } from '../types/like';

export const toggleLike = async (req: Request<{}, {}, CreateLikeDto>, res: Response) => {
  try {
    const { post_id } = req.body;
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

    // Verificar si ya existe el like
    const { data: existingLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', post_id)
      .eq('user_id', user_id)
      .single();

    if (existingLike) {
      // Si existe, eliminar el like
      const { error: deleteError } = await supabase
        .from('likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        return res.status(400).json({ message: deleteError.message });
      }

      return res.json({ message: 'Like eliminado correctamente' });
    } else {
      // Si no existe, crear el like
      const { data: newLike, error: createError } = await supabase
        .from('likes')
        .insert([{ post_id, user_id }])
        .select('*, user:users(username, email)')
        .single();

      if (createError) {
        return res.status(400).json({ message: createError.message });
      }

      return res.status(201).json(newLike);
    }
  } catch (error) {
    console.error('Error al gestionar like:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getLikesByPost = async (req: Request, res: Response) => {
  try {
    const { post_id } = req.params;
    const user_id = req.user?.id;

    // Obtener el conteo de likes
    const { count, error: countError } = await supabase
      .from('likes')
      .select('id', { count: 'exact', head: true })
      .eq('post_id', post_id);

    if (countError) {
      return res.status(400).json({ message: countError.message });
    }

    // Verificar si el usuario actual ha dado like
    const { data: userLike } = await supabase
      .from('likes')
      .select('id')
      .eq('post_id', post_id)
      .eq('user_id', user_id)
      .single();

    return res.json({
      count: count || 0,
      hasLiked: !!userLike
    });
  } catch (error) {
    console.error('Error al obtener likes:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};