
export interface User {
  id: string;
  username: string;
  avatar?: string;
  bio?: string;
  joinedAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  author: User;
  createdAt: Date;
  updatedAt?: Date;
  tags: string[];
  likes: number;
  comments: number;
  imageUrl?: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author: User;
  postId: string;
  parentId?: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  children?: Comment[];
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface SearchResult {
  posts: Post[];
  totalResults: number;
}
