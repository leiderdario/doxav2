
export interface UserProfile {
  id: string;
  username: string;
  email: string;
  bio?: string;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UpdateUserProfileDto {
  username?: string;
  bio?: string;
  avatar_url?: string;
}
