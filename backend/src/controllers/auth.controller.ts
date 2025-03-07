import { Request, Response } from 'express';
import { supabase } from '../config/supabase';
import { RegisterUserDto, LoginUserDto } from '../types/auth';

export const register = async (req: Request<{}, {}, RegisterUserDto>, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const { data: existingUser, error: searchError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      return res.status(400).json({ message: signUpError.message });
    }

    const { data: userData, error: insertError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          email,
          username,
        },
      ])
      .select()
      .single();

    if (insertError) {
      return res.status(500).json({ message: insertError.message });
    }

    return res.status(201).json(userData);
  } catch (error) {
    console.error('Error en el registro:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (userError) {
      return res.status(500).json({ message: userError.message });
    }

    return res.json({
      user: userData,
      session: data.session,
    });
  } catch (error) {
    console.error('Error en el login:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};