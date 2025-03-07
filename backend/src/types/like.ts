export interface CreateLikeDto {
  post_id: string;
}

export interface LikeResponse {
  id: string;
  user_id: string;
  post_id: string;
  created_at: Date;
  user?: {
    username: string;
    email: string;
  };
}

export interface LikeCountResponse {
  count: number;
  hasLiked: boolean;
}