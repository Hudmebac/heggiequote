import React from 'react';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react'; // Keep Copy icon
import { useToast } from '@/hooks/use-toast';

// Simple SVG for Facebook Icon
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// Simple SVG for WhatsApp Icon
const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
  </svg>
);


interface ShareCopyButtonsProps {
  // Ensure the prop type accepts null, matching the state in page.tsx
  quoteText: string | null;
}

const ShareCopyButtons: React.FC<ShareCopyButtonsProps> = ({ quoteText }) => {
  const { toast } = useToast();

  const handleCopy = async () => {
    // Check if quoteText is not null or empty before copying
    if (quoteText) {
      try {
        await navigator.clipboard.writeText(quoteText);
        toast({ title: 'Quote copied to clipboard!' });
      } catch (err) {
        console.error('Failed to copy text: ', err);
        toast({ title: 'Copy Failed', description: 'Could not copy the quote to clipboard.', variant: 'destructive' });
      }
    } else {
      // Handle case where there is no quote to copy
      toast({ title: 'Nothing to copy', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

  // Function to open a share link in a new tab
  const openShareLink = (url: string) => {
    if (quoteText) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

  const handleFacebookShare = () => {
    if (quoteText) {
      const encodedQuote = encodeURIComponent(quoteText);
      // Facebook sharer.php primarily shares URLs, but the 'quote' parameter adds text.
      // Provide a fallback URL (e.g., the current page) if needed, though 'quote' might suffice for text-only.
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodedQuote}`;
      openShareLink(shareUrl);
    } else {
       toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

  const handleWhatsAppShare = () => {
     if (quoteText) {
        const encodedQuote = encodeURIComponent(quoteText);
        const shareUrl = `https://wa.me/?text=${encodedQuote}`;
        openShareLink(shareUrl);
     } else {
       toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
     }
  };


  return (
    <div className="flex justify-center gap-4 mt-4"> {/* Added margin-top */}
      {/* Copy Button */}
      <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Quote" disabled={!quoteText}>
        <Copy className="h-5 w-5 text-accent-foreground" />
      </Button>

      {/* Facebook Share Button */}
      <Button variant="outline" size="icon" onClick={handleFacebookShare} aria-label="Share Quote on Facebook" disabled={!quoteText}>
        <FacebookIcon />
      </Button>

       {/* WhatsApp Share Button */}
      <Button variant="outline" size="icon" onClick={handleWhatsAppShare} aria-label="Share Quote on WhatsApp" disabled={!quoteText}>
        <WhatsAppIcon />
      </Button>

      {/* Removed the generic Share2 button */}
      {/*
      <Button variant="default" size="icon" onClick={handleShare} aria-label="Share Quote" disabled={!quoteText}>
        <Share2 className="h-5 w-5" />
      </Button>
      */}
    </div>
  );
};

export default ShareCopyButtons;
