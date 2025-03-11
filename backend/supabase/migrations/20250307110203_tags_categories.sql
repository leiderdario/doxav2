
/*
  # Create tags table and post_tags relationship

  1. New Tables
    - `tags`
      - `id` (uuid, primary key)
      - `name` (text, unique, not null)
      - `created_at` (timestamp)
    
    - `post_tags`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to posts)
      - `tag_id` (uuid, foreign key to tags)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on tags table and post_tags table
    - Add policies for:
      - Public can read all tags
      - Authenticated users can create tags
      - Admin users can delete tags
      - Users can tag their own posts
*/

-- Tabla de etiquetas
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Tabla de relación post-etiqueta
CREATE TABLE IF NOT EXISTS post_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, tag_id)
);

-- Tabla de roles de usuario (para administradores)
CREATE TABLE IF NOT EXISTS user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'admin')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Políticas de seguridad para tags
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all tags"
  ON tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can create tags"
  ON tags
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin users can delete tags"
  ON tags
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid()
      AND role = 'admin'
    )
  );

-- Políticas de seguridad para post_tags
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read all post_tags"
  ON post_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can tag their own posts"
  ON post_tags
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM posts
      WHERE id = post_id
      AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can untag their own posts"
  ON post_tags
  FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM posts
      WHERE id = post_id
      AND user_id = auth.uid()
    )
  );

-- Añadir columna bio y avatar_url a la tabla users
ALTER TABLE users ADD COLUMN IF NOT EXISTS bio text;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url text;
