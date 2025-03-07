/*
  # Create likes table and relationships

  1. New Tables
    - `likes`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `post_id` (uuid, foreign key to posts)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on likes table
    - Add policies for:
      - Public can read all likes
      - Authenticated users can create/delete their likes
*/

CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  post_id uuid REFERENCES posts(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Public can read all likes"
  ON likes
  FOR SELECT
  TO public
  USING (true);

-- Política para crear likes (usuarios autenticados)
CREATE POLICY "Authenticated users can create likes"
  ON likes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Política para eliminar likes propios
CREATE POLICY "Users can delete own likes"
  ON likes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);