
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
    <Card className="hover:shadow-md transition-shadow duration-200 border-blue-gray/10">
      <CardHeader className="pb-3 pt-5 px-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-powder-blue">
              <AvatarImage src={post.author.avatar} alt={post.author.username} />
              <AvatarFallback className="bg-dark-blue text-white font-medium">{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <Link to={`/profile/${post.author.id}`} className="font-medium text-dark-blue hover:text-vivid-blue hover:underline transition-colors">
                {post.author.username}
              </Link>
              <p className="text-xs text-medium-gray mt-0.5">
                {formatDistanceToNow(post.createdAt, { addSuffix: true })}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-3 px-6">
        <Link to={`/post/${post.id}`}>
          <h3 className="font-playfair text-xl font-semibold mb-3 hover:text-vivid-blue transition-colors duration-200 leading-tight">
            {post.title}
          </h3>
        </Link>
        <p className="text-dark-gray leading-relaxed line-clamp-3 mb-4">
          {post.content}
        </p>
        {post.imageUrl && (
          <div className="mb-4">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="w-full h-56 object-cover rounded-md"
            />
          </div>
        )}
        <div className="flex flex-wrap gap-2.5 mb-3">
          {post.tags.map((tag) => (
            <Link to={`/topics/${tag}`} key={tag}>
              <Badge variant="secondary" className="hover:bg-secondary/80 py-1 px-3 text-dark-blue">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 px-6 border-t border-blue-gray/10">
        <div className="flex items-center justify-between w-full text-sm text-medium-gray">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <HeartIcon className="h-4.5 w-4.5" />
              <span>{post.likes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircleIcon className="h-4.5 w-4.5" />
              <span>{post.comments}</span>
            </div>
          </div>
          <Link 
            to={`/post/${post.id}`} 
            className="text-vivid-blue hover:underline font-medium"
          >
            Read more
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
