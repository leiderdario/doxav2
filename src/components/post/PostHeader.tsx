
import { formatDistanceToNow } from "date-fns";
import { Post } from "@/types/model";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PostHeaderProps {
  post: Post;
}

const PostHeader = ({ post }: PostHeaderProps) => {
  return (
    <div>
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
    </div>
  );
};

export default PostHeader;
