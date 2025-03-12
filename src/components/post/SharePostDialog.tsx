
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShareIcon, Twitter, Facebook, Linkedin, MessageSquare, Copy } from "lucide-react";
import { toast } from "sonner";
import { shareOnSocial } from "@/utils/socialShare";

interface SharePostDialogProps {
  postTitle: string;
  postId: string;
}

export const SharePostDialog = ({ postTitle, postId }: SharePostDialogProps) => {
  const [postUrl, setPostUrl] = useState("");
  
  useEffect(() => {
    // Get the current URL
    const origin = window.location.origin;
    setPostUrl(`${origin}/post/${postId}`);
  }, [postId]);
  
  const handleShare = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    shareOnSocial(platform, {
      url: postUrl,
      title: postTitle,
      hashtags: ['doxa', 'discussion']
    });
  };
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(postUrl);
    toast.success("Link copied to clipboard!");
  };
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-1"
        >
          <ShareIcon className="h-5 w-5" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this post</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="rounded-full p-3" onClick={() => handleShare('twitter')}>
              <Twitter className="h-5 w-5 text-[#1DA1F2]" />
            </Button>
            <Button variant="outline" className="rounded-full p-3" onClick={() => handleShare('facebook')}>
              <Facebook className="h-5 w-5 text-[#1877F2]" />
            </Button>
            <Button variant="outline" className="rounded-full p-3" onClick={() => handleShare('linkedin')}>
              <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            </Button>
            <Button variant="outline" className="rounded-full p-3" onClick={handleCopyLink}>
              <Copy className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <div className="flex w-full items-center justify-between rounded-md border p-2">
                <span className="text-sm text-muted-foreground truncate max-w-[180px] sm:max-w-[300px]">
                  {postUrl}
                </span>
                <Button size="sm" variant="ghost" onClick={handleCopyLink}>
                  Copy
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SharePostDialog;
