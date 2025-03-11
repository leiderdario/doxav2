
/*
  # Create search functionality with indexes

  1. Install the pg_trgm extension for text search
  2. Create indexes on searchable fields (title, content)
  3. Create a function to search posts by text
*/

-- Habilitar extensión para búsqueda de texto
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Crear índices para búsqueda
CREATE INDEX IF NOT EXISTS posts_title_trgm_idx ON posts USING GIN (title gin_trgm_ops);
CREATE INDEX IF NOT EXISTS posts_content_trgm_idx ON posts USING GIN (content gin_trgm_ops);
CREATE INDEX IF NOT EXISTS tags_name_trgm_idx ON tags USING GIN (name gin_trgm_ops);

-- Función para buscar posts
CREATE OR REPLACE FUNCTION search_posts(search_query text)
RETURNS SETOF posts
LANGUAGE sql
AS $$
  SELECT * FROM posts
  WHERE 
    title ILIKE '%' || search_query || '%' OR
    content ILIKE '%' || search_query || '%' OR
    EXISTS (
      SELECT 1 FROM post_tags pt
      JOIN tags t ON pt.tag_id = t.id
      WHERE pt.post_id = posts.id AND
      t.name ILIKE '%' || search_query || '%'
    )
  ORDER BY 
    CASE 
      WHEN title ILIKE '%' || search_query || '%' THEN 0
      WHEN content ILIKE '%' || search_query || '%' THEN 1
      ELSE 2
    END,
    created_at DESC;
$$;
