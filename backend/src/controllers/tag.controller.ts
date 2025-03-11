
import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { CreateTagDto } from '../types/tag';

export const createTag = async (req: Request<{}, {}, CreateTagDto>, res: Response) => {
  try {
    const { name } = req.body;

    // Verificar si ya existe la etiqueta
    const { data: existingTag } = await supabase
      .from('tags')
      .select('id')
      .ilike('name', name)
      .single();

    if (existingTag) {
      return res.status(400).json({ message: 'La etiqueta ya existe' });
    }

    const { data, error } = await supabase
      .from('tags')
      .insert([{ name }])
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(201).json(data);
  } catch (error) {
    console.error('Error al crear etiqueta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getTags = async (_req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener etiquetas:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('tags')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Etiqueta no encontrada' });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener etiqueta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user_id = req.user?.id;

    // Verificar si el usuario es administrador (debería implementarse un sistema de roles)
    const { data: userRole } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user_id)
      .single();

    if (!userRole || userRole.role !== 'admin') {
      return res.status(403).json({ message: 'No tienes permiso para eliminar etiquetas' });
    }

    const { error } = await supabase
      .from('tags')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json({ message: 'Etiqueta eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar etiqueta:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
