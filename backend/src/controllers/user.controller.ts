
import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { UpdateUserProfileDto } from '../types/user';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id || req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, username, email, bio, avatar_url, created_at, updated_at')
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const updateUserProfile = async (req: Request<{}, {}, UpdateUserProfileDto>, res: Response) => {
  try {
    const userId = req.user?.id;
    const updates = req.body;

    if (!userId) {
      return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    // Validar si el username ya existe (si se está actualizando)
    if (updates.username) {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', updates.username)
        .neq('id', userId)
        .single();

      if (existingUser) {
        return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
      }
    }

    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date() })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    return res.json(data);
  } catch (error) {
    console.error('Error al actualizar perfil:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};
