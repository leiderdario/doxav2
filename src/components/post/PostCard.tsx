
import { Post } from "@/types/model";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { MessageCircleIcon, HeartIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200 mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.username} />
              <AvatarFallback className="bg-dark-blue text-white">{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${post.author.id}`} className="font-medium text-sm hover:underline">
                {post.author.username}
              </Link>
              <p className="text-xs text-medium-gray">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <Link to={`/post/${post.id}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-vivid-blue transition-colors duration-200">
            {post.title}
          </h3>
        </Link>
        <p className="text-dark-gray line-clamp-3 mb-3">
          {post.content}
        </p>
        {post.imageUrl && (
          <div className="mb-3">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-48 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-2">
          {post.tags.map((tag) => (
            <Link to={`/topics/${tag}`} key={tag}>
              <Badge variant="secondary" className="hover:bg-secondary/80">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 border-t border-border">
        <div className="flex items-center justify-between w-full text-sm text-medium-gray">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <HeartIcon className="h-4 w-4" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircleIcon className="h-4 w-4" />
              <span>{post.comments}</span>
            </div>
          </div>
          <Link 
            to={`/post/${post.id}`} 
            className="text-vivid-blue hover:underline"
          >
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
