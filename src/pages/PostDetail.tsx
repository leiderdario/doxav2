
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeartIcon, BookmarkIcon, AlertCircleIcon, MessageCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getPostById, getCommentsForPost } from "@/data/mockData";
import { Post, Comment } from "@/types/model";
import MainLayout from "@/components/layout/MainLayout";
import CommentCard from "@/components/post/CommentCard";
import SharePostDialog from "@/components/post/SharePostDialog";
import PostStatsSummary from "@/components/stats/PostStatsSummary";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [postViews, setPostViews] = useState(0);

  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
        setComments(getCommentsForPost(id));
        
        // Mock data for post views - would come from analytics in a real app
        setPostViews(Math.floor(Math.random() * 1000) + 500);
      }
    }
  }, [id]);

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

  const handleShare = () => {
    // This would be handled by the SharePostDialog component now
    setShareCount(shareCount + 1);
  };

  const handleReport = () => {
    toast.success("Post reported. Thank you for helping keep our community safe.");
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !post) return;
    
    // Create a new comment object
    const newCommentObj: Comment = {
      id: `temp-${Date.now()}`,
      content: newComment,
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
    setNewComment("");
  };

  const handleReply = (parentId: string, content: string) => {
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

  if (!post) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-64">
          <p className="text-medium-gray">Post not found</p>
        </div>
      </MainLayout>
    );
  }

  // In a real app, this data would come from analytics
  const mockActivityData = [
    { date: "Mon", posts: 5, comments: 8, likes: 15 },
    { date: "Tue", posts: 3, comments: 7, likes: 10 },
    { date: "Wed", posts: 7, comments: 13, likes: 22 },
    { date: "Thu", posts: 4, comments: 5, likes: 12 },
    { date: "Fri", posts: 6, comments: 9, likes: 18 },
    { date: "Sat", posts: 8, comments: 14, likes: 25 },
    { date: "Sun", posts: 5, comments: 12, likes: 20 },
  ];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={post.author.avatar || post.author.avatarUrl} alt={post.author.username} />
                <AvatarFallback className="bg-dark-blue text-white">
                  {post.author.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{post.author.username}</p>
                <p className="text-xs text-medium-gray">
                  {formatDistanceToNow(post.createdAt, { addSuffix: true })}
                </p>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
            
            {post.imageUrl && (
              <div className="mb-6">
                <img 
                  src={post.imageUrl} 
                  alt={post.title} 
                  className="w-full rounded-lg object-cover max-h-96"
                />
              </div>
            )}
            
            <div className="prose max-w-none mb-6 text-dark-gray">
              <p>{post.content}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <a href={`/topics/${tag}`} key={tag}>
                  <Badge variant="secondary" className="hover:bg-secondary/80">
                    {tag}
                  </Badge>
                </a>
              ))}
            </div>
            
            <Separator className="my-4" />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${liked ? "text-destructive" : ""}`}
                  onClick={handleLike}
                >
                  <HeartIcon className="h-5 w-5" />
                  <span>{liked ? post.likes + 1 : post.likes}</span>
                </Button>
                
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${bookmarked ? "text-vivid-blue" : ""}`}
                  onClick={handleBookmark}
                >
                  <BookmarkIcon className="h-5 w-5" />
                  <span>Save</span>
                </Button>
                
                {/* Replace the Share button with SharePostDialog */}
                <SharePostDialog postTitle={post.title} postId={post.id} />
                
                <Button
                  variant="ghost"
                  className={`flex items-center gap-1 ${showCommentBox ? "text-vivid-blue" : ""}`}
                  onClick={() => setShowCommentBox(!showCommentBox)}
                >
                  <MessageCircleIcon className="h-5 w-5" />
                  <span>Comment</span>
                </Button>
              </div>
              
              <Button
                variant="ghost"
                className="flex items-center gap-1 text-medium-gray"
                onClick={handleReport}
              >
                <AlertCircleIcon className="h-5 w-5" />
                <span>Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Post Statistics */}
        <div className="mb-8">
          <PostStatsSummary
            views={postViews}
            likes={post.likes}
            comments={post.comments}
            shareCount={shareCount}
          />
        </div>
        
        {showCommentBox && (
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
            <Card>
              <CardContent className="p-4">
                <Textarea
                  placeholder="What are your thoughts?"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3"
                />
                <div className="flex justify-end">
                  <Button 
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard 
                key={comment.id} 
                comment={comment} 
                onReply={handleReply}
              />
            ))
          ) : (
            <p className="text-medium-gray text-center py-6">No comments yet. Be the first to share your thoughts!</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PostDetail;
