export interface CreateCommentDto {
  content: string;
  post_id: string;
}

export interface UpdateCommentDto {
  content: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: Date;
  updated_at: Date;
  user?: {
    username: string;
    email: string;
  };
}