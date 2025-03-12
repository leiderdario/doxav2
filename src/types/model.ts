
export interface User {
  id: string;
  username: string;
  email?: string;
  avatarUrl?: string;
  createdAt: Date;
  avatar?: string;  // Adding avatar property
  bio?: string;     // Adding bio property
  joinedAt?: Date;  // Adding joinedAt property
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
  tags: string[];    // Changed from Tag[] to string[] to match usage
  imageUrl?: string; // Adding imageUrl property
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
  parentId?: string;   // Adding parentId property
  children?: Comment[]; // Adding children property
}

export interface Tag {
  id: string;
  name: string;
  count: number;
}
