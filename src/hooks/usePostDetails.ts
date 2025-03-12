
import { useState, useEffect } from "react";
import { Post, Comment } from "@/types/model";
import { getPostById, getCommentsForPost } from "@/data/mockData";
import { toast } from "sonner";

export const usePostDetails = (postId: string | undefined) => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [postViews, setPostViews] = useState(0);

  useEffect(() => {
    if (postId) {
      const fetchedPost = getPostById(postId);
      if (fetchedPost) {
        setPost(fetchedPost);
        setComments(getCommentsForPost(postId));
        
        // Mock data for post views - would come from analytics in a real app
        setPostViews(Math.floor(Math.random() * 1000) + 500);
      }
    }
  }, [postId]);

  useEffect(() => {
    // Increment view count when post is loaded
    if (post) {
      // This would be an API call in a real app
      console.log("Post viewed:", post.id);
    }
  }, [post]);

  const handleLike = () => {
    if (!post) return;
    setLiked(!liked);
    setPost({
      ...post,
      likes: liked ? post.likes - 1 : post.likes + 1
    });
    
    if (!liked) {
      toast.success("Post liked!");
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    if (!bookmarked) {
      toast.success("Post bookmarked!");
    } else {
      toast.success("Bookmark removed");
    }
  };

  const handleToggleCommentBox = () => {
    setShowCommentBox(!showCommentBox);
  };

  const handleAddComment = (content: string) => {
    if (!content.trim() || !post) return;
    
    // Create a new comment object
    const newCommentObj: Comment = {
      id: `temp-${Date.now()}`,
      content,
      author: {
        id: "current-user",
        username: "Current User",
        createdAt: new Date(),
        avatar: "/placeholder.svg"
      },
      authorId: "current-user",
      postId: post.id,
      createdAt: new Date(),
      likes: 0
    };
    
    // Add the new comment to the comments array
    setComments([newCommentObj, ...comments]);
    
    // Update the post's comment count
    setPost({
      ...post,
      comments: post.comments + 1
    });
    
    toast.success("Comment added!");
  };

  const handleReplyComment = (parentId: string, content: string) => {
    if (!content.trim() || !post) return;
    
    // Find the parent comment
    const findParentAndAddReply = (commentsArray: Comment[]): Comment[] => {
      return commentsArray.map(comment => {
        if (comment.id === parentId) {
          // Create a new reply
          const newReply: Comment = {
            id: `reply-${Date.now()}`,
            content: content,
            author: {
              id: "current-user",
              username: "Current User",
              createdAt: new Date(),
              avatar: "/placeholder.svg"
            },
            authorId: "current-user",
            postId: post.id,
            parentId: parentId,
            createdAt: new Date(),
            likes: 0
          };
          
          // Add the reply to the parent's children
          return {
            ...comment,
            children: comment.children ? [...comment.children, newReply] : [newReply]
          };
        } else if (comment.children && comment.children.length > 0) {
          // If the comment has children, search through them
          return {
            ...comment,
            children: findParentAndAddReply(comment.children)
          };
        }
        return comment;
      });
    };
    
    // Update the comments with the new reply
    setComments(findParentAndAddReply(comments));
    
    // Update the post's comment count
    setPost({
      ...post,
      comments: post.comments + 1
    });
    
    toast.success("Reply added!");
  };

  const incrementShareCount = () => {
    setShareCount(prevCount => prevCount + 1);
  };

  return {
    post,
    comments,
    liked,
    bookmarked,
    showCommentBox,
    shareCount,
    postViews,
    handleLike,
    handleBookmark,
    handleToggleCommentBox,
    handleAddComment,
    handleReplyComment,
    incrementShareCount
  };
};
