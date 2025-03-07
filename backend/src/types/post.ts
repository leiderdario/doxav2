export interface CreatePostDto {
  title: string;
  content: string;
}

export interface UpdatePostDto {
  title?: string;
  content?: string;
}

export interface PostResponse {
  id: string;
  title: string;
  content: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
  user?: {
    username: string;
    email: string;
  };
}