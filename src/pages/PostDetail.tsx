
import { useParams } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { usePostDetails } from "@/hooks/usePostDetails";
import PostHeader from "@/components/post/PostHeader";
import PostActions from "@/components/post/PostActions";
import CommentSection from "@/components/post/CommentSection";
import PostStatsSummary from "@/components/stats/PostStatsSummary";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { 
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
    handleReplyComment
  } = usePostDetails(id);

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
            <PostHeader post={post} />
            
            <PostActions 
              post={post}
              onToggleCommentBox={handleToggleCommentBox}
              showCommentBox={showCommentBox}
              onLike={handleLike}
              liked={liked}
              bookmarked={bookmarked}
              onBookmark={handleBookmark}
            />
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
        
        <CommentSection 
          comments={comments}
          showCommentBox={showCommentBox}
          onAddComment={handleAddComment}
          onReplyComment={handleReplyComment}
        />
      </div>
    </MainLayout>
  );
};

export default PostDetail;
