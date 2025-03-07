import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { CreatePostDto, UpdatePostDto } from '../types/post';

export const createPost = async (req: Request<{}, {}, CreatePostDto>, res: Response) => {
  try {
    const { title, content } = req.body;
    const user_id = req.user?.id;

    const { data, error } = await supabase
      .from('posts')
      .insert([
        { title, content, user_id }
      ])
      .select('*, user:users(username, email)')
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear post:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*, user:users(username, email)')
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('posts')
      .select('*, user:users(username, email)')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener post:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updatePost = async (req: Request<{ id: string }, {}, UpdatePostDto>, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user_id = req.user?.id;

    const { data: existingPost } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (existingPost.user_id !== user_id) {
      return res.status(403).json({ message: 'No tienes permiso para editar este post' });
    }

    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select('*, user:users(username, email)')
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al actualizar post:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    const { data: existingPost } = await supabase
      .from('posts')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!existingPost) {
      return res.status(404).json({ message: 'Post no encontrado' });
    }

    if (existingPost.user_id !== user_id) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar este post' });
    }

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json({ message: 'Post eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar post:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};