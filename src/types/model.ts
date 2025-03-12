
export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  authorId: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
  comments: number;
  tags: Tag[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt?: Date;
  likes: number;
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}
