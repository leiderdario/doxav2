
export interface CreateTagDto {
  name: string;
}

export interface TagResponse {
  id: string;
  name: string;
  created_at: Date;
}
