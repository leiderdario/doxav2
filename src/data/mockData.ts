
import { Post, User, Comment, Tag } from "../types/model";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    username: "elonmusk",
    avatar: "/placeholder.svg",
    bio: "Tech enthusiast and space explorer",
    joinedAt: new Date("2023-01-15")
  },
  {
    id: "2",
    username: "janedoe",
    avatar: "/placeholder.svg",
    bio: "Philosopher and deep thinker",
    joinedAt: new Date("2023-02-20")
  },
  {
    id: "3",
    username: "johnsmith",
    avatar: "/placeholder.svg",
    bio: "Always curious about the world",
    joinedAt: new Date("2023-03-10")
  }
];

// Mock Tags
export const mockTags: Tag[] = [
  { id: "1", name: "technology", count: 24 },
  { id: "2", name: "philosophy", count: 18 },
  { id: "3", name: "science", count: 15 },
  { id: "4", name: "future", count: 12 },
  { id: "5", name: "society", count: 10 },
  { id: "6", name: "psychology", count: 9 },
  { id: "7", name: "politics", count: 8 },
  { id: "8", name: "climate", count: 7 }
];

// Mock Posts
export const mockPosts: Post[] = [
  {
    id: "1",
    title: "The Future of Artificial Intelligence",
    content: "AI is rapidly evolving and will soon transform every aspect of our lives. From healthcare to transportation, AI will bring unprecedented changes to society. What are your thoughts on how we should prepare?",
    authorId: "1",
    author: mockUsers[0],
    createdAt: new Date("2023-05-15"),
    tags: ["technology", "future", "society"],
    likes: 125,
    comments: 42,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "2",
    title: "The Paradox of Choice",
    content: "In modern society, we're constantly bombarded with choices. But does having more options actually make us happier? Research suggests that an abundance of choices can lead to decision paralysis and dissatisfaction.",
    authorId: "2",
    author: mockUsers[1],
    createdAt: new Date("2023-05-20"),
    tags: ["psychology", "philosophy", "society"],
    likes: 89,
    comments: 31
  },
  {
    id: "3",
    title: "Climate Crisis: Time for Action",
    content: "The evidence for climate change is overwhelming. We need immediate action to reduce carbon emissions and transition to renewable energy sources. What steps can individuals take to contribute to this global effort?",
    authorId: "3",
    author: mockUsers[2],
    createdAt: new Date("2023-06-05"),
    tags: ["climate", "society", "science"],
    likes: 112,
    comments: 53,
    imageUrl: "/placeholder.svg"
  },
  {
    id: "4",
    title: "The Rise of Quantum Computing",
    content: "Quantum computing represents a paradigm shift in computational power. Unlike classical computers that use bits, quantum computers use qubits that can exist in multiple states simultaneously. This technology could revolutionize fields like cryptography and drug discovery.",
    authorId: "1",
    author: mockUsers[0],
    createdAt: new Date("2023-06-12"),
    tags: ["technology", "science", "future"],
    likes: 76,
    comments: 28
  },
  {
    id: "5",
    title: "The Ethics of Gene Editing",
    content: "With CRISPR technology, we now have the ability to edit genes with unprecedented precision. This raises profound ethical questions about how far we should go in manipulating the human genome. Where do we draw the line?",
    authorId: "2",
    author: mockUsers[1],
    createdAt: new Date("2023-07-03"),
    tags: ["science", "ethics", "future"],
    likes: 94,
    comments: 37
  },
  {
    id: "6",
    title: "Digital Minimalism in an Age of Distraction",
    content: "We're constantly bombarded with digital notifications and distractions. Is it time to adopt a more minimalist approach to technology? How can we use digital tools mindfully without letting them consume our attention?",
    authorId: "3",
    author: mockUsers[2],
    createdAt: new Date("2023-07-18"),
    tags: ["technology", "psychology", "society"],
    likes: 105,
    comments: 42
  }
];

// Mock Comments
export const mockComments: Comment[] = [
  {
    id: "1",
    content: "I completely agree with your perspective on AI. We need to ensure it's developed responsibly.",
    authorId: "2",
    author: mockUsers[1],
    postId: "1",
    createdAt: new Date("2023-05-16"),
    likes: 15,
    children: [
      {
        id: "2",
        content: "Responsible AI development is key, but how do we define 'responsible' in this context?",
        authorId: "3",
        author: mockUsers[2],
        postId: "1",
        parentId: "1",
        createdAt: new Date("2023-05-17"),
        likes: 8,
      }
    ]
  },
  {
    id: "3",
    content: "The paradox of choice is real! I often find myself overwhelmed when shopping online.",
    authorId: "1",
    author: mockUsers[0],
    postId: "2",
    createdAt: new Date("2023-05-21"),
    likes: 12,
  },
  {
    id: "4",
    content: "Climate change is the defining crisis of our time. Individual actions matter, but we need systemic change too.",
    authorId: "2",
    author: mockUsers[1],
    postId: "3",
    createdAt: new Date("2023-06-06"),
    likes: 19,
    children: [
      {
        id: "5",
        content: "Exactly! Individual actions are important but insufficient. We need policy changes at the governmental level.",
        authorId: "1",
        author: mockUsers[0],
        postId: "3",
        parentId: "4",
        createdAt: new Date("2023-06-07"),
        likes: 14,
      }
    ]
  }
];

// Function to get posts with tags
export const getPostsByTag = (tag: string): Post[] => {
  return mockPosts.filter(post => post.tags.includes(tag));
};

// Function to search posts
export const searchPosts = (query: string): Post[] => {
  const lowerCaseQuery = query.toLowerCase();
  return mockPosts.filter(
    post => post.title.toLowerCase().includes(lowerCaseQuery) || 
           post.content.toLowerCase().includes(lowerCaseQuery) ||
           post.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
  );
};

// Function to get a post by ID
export const getPostById = (id: string): Post | undefined => {
  return mockPosts.find(post => post.id === id);
};

// Function to get comments for a post
export const getCommentsForPost = (postId: string): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId && !comment.parentId);
};
