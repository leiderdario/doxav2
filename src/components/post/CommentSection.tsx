
import { Comment } from "@/types/model";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import CommentCard from "@/components/post/CommentCard";
import { useState } from "react";

interface CommentSectionProps {
  comments: Comment[];
  showCommentBox: boolean;
  onAddComment: (content: string) => void;
  onReplyComment: (parentId: string, content: string) => void;
}

const CommentSection = ({ 
  comments, 
  showCommentBox, 
  onAddComment, 
  onReplyComment 
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = () => {
    if (!newComment.trim()) return;
    onAddComment(newComment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">
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
                  onClick={handleSubmit}
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
              onReply={onReplyComment}
            />
          ))
        ) : (
          <p className="text-medium-gray text-center py-6">No comments yet. Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
