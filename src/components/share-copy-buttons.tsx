import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ShareCopyButtonsProps {
  // Ensure the prop type accepts null, matching the state in page.tsx
  quoteText: string | null;
}

const ShareCopyButtons: React.FC<ShareCopyButtonsProps> = ({ quoteText }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    // Check if quoteText is not null or empty before sharing
    if (navigator.share && quoteText) {
      try {
        await navigator.share({
          title: 'Daily Stand Up Quote', // Updated title
          text: quoteText,
        });
        toast({ title: 'Shared successfully!' });
      } catch (error) {
        // Handle potential errors, like user canceling share
        if ((error as Error).name !== 'AbortError') {
           console.error('Error sharing:', error);
           toast({ title: 'Sharing failed', description: 'Could not share the quote.', variant: 'destructive' });
        } else {
            // User aborted sharing - optional: provide feedback or do nothing
            // toast({ title: 'Sharing cancelled' });
        }
      }
    } else if (quoteText) {
      // Fallback for browsers without navigator.share: copy and prompt user
      await handleCopy(); // Reuse copy logic
      toast({ title: 'Quote copied!', description: 'You can now paste it to share.' });
    } else {
      // Handle case where there is no quote to share
      toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

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

  return (
    <div className="flex justify-center gap-4 mt-4"> {/* Added margin-top */}
      {/* Ensure button is disabled if there's no quote */}
      <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Quote" disabled={!quoteText}>
        <Copy className="h-5 w-5 text-accent-foreground" />
      </Button>
       {/* Ensure button is disabled if there's no quote */}
      <Button variant="default" size="icon" onClick={handleShare} aria-label="Share Quote" disabled={!quoteText}>
        <Share2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default ShareCopyButtons;
