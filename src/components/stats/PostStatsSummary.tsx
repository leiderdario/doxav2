
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartIcon, MessageCircleIcon, EyeIcon, BarChart3Icon } from "lucide-react";

interface PostStatsProps {
  views: number;
  likes: number;
  comments: number;
  shareCount: number;
}

export const PostStatsSummary = ({ views, likes, comments, shareCount }: PostStatsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md font-medium">Post Statistics</CardTitle>
        <CardDescription>Performance of this post</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
              <EyeIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
            <div>
              <p className="text-sm font-medium">{views.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
              <HeartIcon className="h-4 w-4 text-red-600 dark:text-red-300" />
            </div>
            <div>
              <p className="text-sm font-medium">{likes.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Likes</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900">
              <MessageCircleIcon className="h-4 w-4 text-purple-600 dark:text-purple-300" />
            </div>
            <div>
              <p className="text-sm font-medium">{comments.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Comments</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900">
              <BarChart3Icon className="h-4 w-4 text-green-600 dark:text-green-300" />
            </div>
            <div>
              <p className="text-sm font-medium">{shareCount.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Shares</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostStatsSummary;
