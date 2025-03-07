
import { MessageSquareTextIcon } from "lucide-react";

interface ThoughtChatLogoProps {
  className?: string;
}

const ThoughtChatLogo = ({ className }: ThoughtChatLogoProps) => {
  return (
    <div className={`text-vivid-blue ${className}`}>
      <MessageSquareTextIcon />
    </div>
  );
};

export default ThoughtChatLogo;
