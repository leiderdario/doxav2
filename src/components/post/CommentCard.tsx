
import { Comment } from "@/types/model";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { HeartIcon, ReplyIcon, MoreHorizontalIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface CommentCardProps {
  comment: Comment;
  level?: number;
  onReply?: (parentId: string, content: string) => void;
}

const CommentCard = ({ comment, level = 0, onReply }: CommentCardProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    toast.success(liked ? "Comment unliked" : "Comment liked");
  };

  const handleReply = () => {
    if (onReply && replyContent.trim()) {
      onReply(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    }
  };

  return (
    <div className={`ml-${level * 6}`}>
      <Card className="mb-3 border-l-4 border-l-powder-blue">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={comment.author.avatar || comment.author.avatarUrl} alt={comment.author.username} />
              <AvatarFallback className="bg-dark-blue text-white">
                {comment.author.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{comment.author.username}</p>
                  <p className="text-xs text-medium-gray">
                    {formatDistanceToNow(comment.createdAt, { addSuffix: true })}
                  </p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontalIcon className="h-4 w-4" />
                </Button>
              </div>
              <p className="mt-2 text-dark-gray">{comment.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={`flex items-center gap-1 text-xs ${liked ? 'text-destructive' : 'text-medium-gray'}`}
                  onClick={handleLike}
                >
                  <HeartIcon className="h-4 w-4" />
                  <span>{liked ? comment.likes + 1 : comment.likes}</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-1 text-xs text-medium-gray"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                >
                  <ReplyIcon className="h-4 w-4" />
                  <span>Reply</span>
                </Button>
              </div>
              
              {showReplyForm && (
                <div className="mt-3">
                  <Textarea 
                    placeholder="Write a reply..." 
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="mb-2"
                  />
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowReplyForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm"
                      onClick={handleReply}
                      disabled={!replyContent.trim()}
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {comment.children && comment.children.map((child) => (
        <CommentCard 
          key={child.id} 
          comment={child} 
          level={level + 1} 
          onReply={onReply}
        />
      ))}
    </div>
  );
};

export default CommentCard;
