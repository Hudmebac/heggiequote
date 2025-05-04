import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2, Check, Volume2, Loader2 } from 'lucide-react'; // Added Volume2, Loader2
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

// Simple SVG for Microsoft Teams Icon
const TeamsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M11.75 2.5a1.25 1.25 0 0 0-1.25 1.25V6h-2.5a1.25 1.25 0 0 0 0 2.5h2.5v1.75c0 .69.56 1.25 1.25 1.25h2.5a1.25 1.25 0 0 0 1.25-1.25V9.25h2.25a.75.75 0 0 0 0-1.5h-2.25V6a1.25 1.25 0 0 0-1.25-1.25h-2.5zm-5.75 6a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h5a.75.75 0 0 0 0-1.5H6.75V9.25a.75.75 0 0 0-.75-.75zm10.5 2.25a1.25 1.25 0 0 0-1.25 1.25v4.25h-2a.75.75 0 0 0 0 1.5h2.75a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 0-.75-.75h-.5zm-1.25-3.25a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5zm-6.5 3.5a1.75 1.75 0 1 1-3.5 0 1.75 1.75 0 0 1 3.5 0z"/>
    </svg>
);

interface ShareCopyButtonsProps {
  quoteText: string | null;
}

const ShareCopyButtons: React.FC<ShareCopyButtonsProps> = ({ quoteText }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null);

  // Get SpeechSynthesis instance on client side
  useEffect(() => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          setSpeechSynthesis(window.speechSynthesis);
      }
  }, []);

  const copyToClipboard = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
      return true;
    } catch (err) {
      console.error('Failed to copy text: ', err);
      toast({ title: 'Copy Failed', description: 'Could not copy the text.', variant: 'destructive' });
      return false;
    }
  };

  const handleCopy = async () => {
    if (quoteText) {
        if(await copyToClipboard(quoteText)) {
            toast({ title: 'Quote copied!' });
        }
    } else {
      toast({ title: 'Nothing to copy', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

  const openShareLink = (url: string) => {
    if (quoteText) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };

  const handleFacebookShare = async () => {
    if (quoteText) {
      // Updated textToShare
      const textToShare = `${quoteText}\n\n#DailyStandUp #Heggiehub(Links to https://heggie.netlify.app/)`;
      const success = await copyToClipboard(textToShare);
      if(success) {
          toast({
              title: 'Quote Copied!',
              description: 'Paste Message in Facebook Post.',
          });
          // Optionally open Facebook in a new tab, though the user has to paste manually.
          // window.open('https://www.facebook.com/', '_blank', 'noopener,noreferrer');
      }
    } else {
       toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
  };


  const handleWhatsAppShare = () => {
     if (quoteText) {
        // Updated textToShare
        const textToShare = `${quoteText}\n\n#DailyStandUp #Heggiehub(Links to https://heggie.netlify.app/)`;
        const encodedQuote = encodeURIComponent(textToShare);
        const shareUrl = `https://wa.me/?text=${encodedQuote}`;
        openShareLink(shareUrl);
     } else {
       toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
     }
  };

   const handleTeamsShare = () => {
     if (quoteText) {
        // Updated textToShare
        const textToShare = `${quoteText}\n\n#DailyStandUp #Heggiehub(Links to https://heggie.netlify.app/)`;
        const encodedQuote = encodeURIComponent(textToShare);
        // Note: Teams deep links are more complex and often require specific contexts (chats/channels).
        // This basic link opens Teams but might not pre-fill the message effectively everywhere.
        // A more robust solution might involve the Microsoft Graph API.
        const shareUrl = `https://teams.microsoft.com/l/chat/0/0?message=${encodedQuote}`;
        openShareLink(shareUrl);
     } else {
       toast({ title: 'Nothing to share', description: 'No quote is currently displayed.', variant: 'destructive' });
     }
   };

   const handleAudioNarration = () => {
    if (!speechSynthesis) {
        toast({ title: 'Audio Narration Unavailable', description: 'Your browser does not support speech synthesis.', variant: 'destructive' });
        return;
    }

    if (isSpeaking) {
        speechSynthesis.cancel(); // Stop current speech
        setIsSpeaking(false);
    } else if (quoteText) {
        const utterance = new SpeechSynthesisUtterance(quoteText);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsSpeaking(false);
            toast({ title: 'Audio Failed', description: 'Could not narrate the quote.', variant: 'destructive' });
        };
        speechSynthesis.speak(utterance);
    } else {
        toast({ title: 'Nothing to narrate', description: 'No quote is currently displayed.', variant: 'destructive' });
    }
};

  return (
    <div className="flex justify-center gap-2 mt-4"> {/* Reduced gap slightly */}
       {/* Audio Narration Button */}
      <Button variant="outline" size="icon" onClick={handleAudioNarration} aria-label="Narrate Quote" disabled={!quoteText || !speechSynthesis}>
        {/* Use foreground color for icon */}
        {isSpeaking ? <Loader2 className="h-5 w-5 text-foreground animate-spin" /> : <Volume2 className="h-5 w-5 text-foreground" />}
      </Button>

      {/* Copy Button - Use standard button variant */}
      <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Quote" disabled={!quoteText}>
        {/* Use foreground color for icon */}
        {copied ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-foreground" />}
      </Button>

      {/* Share Dropdown Button - Use standard button variant */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Share Quote" disabled={!quoteText}>
            {/* Use foreground color for icon */}
            <Share2 className="h-5 w-5 text-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleFacebookShare}>
            <FacebookIcon /> <span className="ml-2">Facebook</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleWhatsAppShare}>
            <WhatsAppIcon /> <span className="ml-2">WhatsApp</span>
          </DropdownMenuItem>
           <DropdownMenuItem onClick={handleTeamsShare}>
            <TeamsIcon /> <span className="ml-2">Microsoft Teams</span>
          </DropdownMenuItem>
          {/* Add more share options here if needed */}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ShareCopyButtons;
