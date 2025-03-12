
import { useState } from "react";
import { HeartIcon, BookmarkIcon, AlertCircleIcon, MessageCircleIcon } from "lucide-react";
import { Post } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SharePostDialog from "@/components/post/SharePostDialog";
import { toast } from "sonner";

interface PostActionsProps {
  post: Post;
  onToggleCommentBox: () => void;
  showCommentBox: boolean;
  onLike: () => void;
  liked: boolean;
  bookmarked: boolean;
  onBookmark: () => void;
}

const PostActions = ({ 
  post, 
  onToggleCommentBox, 
  showCommentBox, 
  onLike, 
  liked, 
  bookmarked, 
  onBookmark 
}: PostActionsProps) => {
  
  const handleReport = () => {
    toast.success("Post reported. Thank you for helping keep our community safe.");
  };

  return (
    <>
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className={`flex items-center gap-1 ${liked ? "text-destructive" : ""}`}
            onClick={onLike}
          >
            <HeartIcon className="h-5 w-5" />
            <span>{liked ? post.likes + 1 : post.likes}</span>
          </Button>
          
          <Button
            variant="ghost"
            className={`flex items-center gap-1 ${bookmarked ? "text-vivid-blue" : ""}`}
            onClick={onBookmark}
          >
            <BookmarkIcon className="h-5 w-5" />
            <span>Save</span>
          </Button>
          
          <SharePostDialog postTitle={post.title} postId={post.id} />
          
          <Button
            variant="ghost"
            className={`flex items-center gap-1 ${showCommentBox ? "text-vivid-blue" : ""}`}
            onClick={onToggleCommentBox}
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
    </>
  );
};

export default PostActions;
