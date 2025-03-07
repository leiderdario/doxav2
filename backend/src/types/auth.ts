export interface RegisterUserDto {
  email: string;
  password: string;
  username: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  email: string;
  username: string;
  created_at: Date;
}