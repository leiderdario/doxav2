
type SocialPlatform = 'twitter' | 'facebook' | 'linkedin' | 'reddit' | 'whatsapp' | 'telegram';

interface ShareOptions {
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
}

export const shareOnSocial = (platform: SocialPlatform, options: ShareOptions): void => {
  const { url, title = '', description = '', hashtags = [] } = options;
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedHashtags = hashtags.join(',');
  
  let shareUrl = '';
  
  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedHashtags}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      break;
    case 'reddit':
      shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
      break;
    case 'whatsapp':
      shareUrl = `https://api.whatsapp.com/send?text=${encodedTitle} ${encodedUrl}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
      break;
    default:
      console.error('Unsupported platform');
      return;
  }
  
  window.open(shareUrl, '_blank');
};
