/*
  # Create comments table and relationships

  1. New Tables
    - `comments`
      - `id` (uuid, primary key)
      - `content` (text, not null)
      - `user_id` (uuid, foreign key to users)
      - `post_id` (uuid, foreign key to posts)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on comments table
    - Add policies for:
      - Public can read all comments
      - Authenticated users can create comments
      - Users can update/delete their own comments
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  user_id uuid REFERENCES users(id) NOT NULL,
  post_id uuid REFERENCES posts(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Política para lectura pública
CREATE POLICY "Public can read all comments"
  ON comments
  FOR SELECT
  TO public
  USING (true);

-- Política para crear comentarios (usuarios autenticados)
CREATE POLICY "Authenticated users can create comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Política para actualizar comentarios propios
CREATE POLICY "Users can update own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Política para eliminar comentarios propios
CREATE POLICY "Users can delete own comments"
  ON comments
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);