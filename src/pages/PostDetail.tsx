
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeartIcon, BookmarkIcon, ShareIcon, AlertCircleIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { getPostById, getCommentsForPost } from "@/data/mockData";
import { Post, Comment } from "@/types/model";
import MainLayout from "@/components/layout/MainLayout";
import CommentCard from "@/components/post/CommentCard";
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

  useEffect(() => {
    if (id) {
      const fetchedPost = getPostById(id);
      if (fetchedPost) {
        setPost(fetchedPost);
        setComments(getCommentsForPost(id));
      }
    }
  }, [id]);

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
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleReport = () => {
    toast.success("Post reported. Thank you for helping keep our community safe.");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    // In a real app, you would send this to an API
    console.log("Adding comment:", newComment);
    toast.success("Comment added!");
    setNewComment("");
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

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Avatar>
                <AvatarImage src={post.author.avatar} alt={post.author.username} />
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
                
                <Button
                  variant="ghost"
                  className="flex items-center gap-1"
                  onClick={handleShare}
                >
                  <ShareIcon className="h-5 w-5" />
                  <span>Share</span>
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
        
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Comments ({comments.length})</h2>
          <Card>
            <CardContent className="p-4">
              <Textarea
                placeholder="Add a comment..."
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
        
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PostDetail;
