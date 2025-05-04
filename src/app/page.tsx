'use client';

import { useState, useEffect } from 'react';
import { generateMotivationalQuote, GenerateMotivationalQuoteOutput } from '@/ai/flows/generate-motivational-quote';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';
import { Share2, Copy, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [quoteData, setQuoteData] = useState<GenerateMotivationalQuoteOutput | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showQuote, setShowQuote] = useState(false); // For fade-in animation
  const { toast } = useToast();

  const fetchQuote = async () => {
    setIsLoading(true);
    setShowQuote(false); // Hide quote before fetching new one
    try {
      const result = await generateMotivationalQuote({});
      setQuoteData(result);
      // Trigger fade-in after a short delay
      setTimeout(() => {
        setShowQuote(true);
        setIsLoading(false);
        setIsRefreshing(false);
      }, 100); // Small delay for animation effect
    } catch (error) {
      console.error('Error generating quote:', error);
      toast({
        title: "Error",
        description: "Failed to fetch a new quote. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Fetch quote on initial load

  const handleShare = async () => {
    if (navigator.share && quoteData) {
      try {
        await navigator.share({
          title: 'Daily Motivation',
          text: `"${quoteData.quote}"`,
        });
        toast({ title: "Shared successfully!" });
      } catch (error) {
        console.error('Error sharing:', error);
        toast({ title: "Sharing failed", variant: "destructive" });
      }
    } else if (quoteData) {
      // Fallback for browsers/devices that don't support navigator.share
      await handleCopy();
      toast({ title: "Quote copied to clipboard. Use Ctrl+V or Cmd+V to share." });
    } else {
       toast({ title: "No quote to share.", variant: "destructive" });
    }
  };

  const handleCopy = async () => {
    if (quoteData) {
        try {
            await navigator.clipboard.writeText(`"${quoteData.quote}"`);
            toast({ title: "Quote copied to clipboard!" });
        } catch (err) {
            console.error('Failed to copy text: ', err);
            toast({ title: "Failed to copy quote.", variant: "destructive" });
        }
    } else {
        toast({ title: "No quote to copy.", variant: "destructive" });
    }
  };

  const handleRefresh = () => {
    if (!isRefreshing) {
        setIsRefreshing(true);
        fetchQuote();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-secondary text-foreground relative">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon" onClick={handleRefresh} disabled={isRefreshing} aria-label="Refresh Quote">
          {isRefreshing ? <Loader2 className="h-5 w-5 animate-spin" /> : <RefreshCw className="h-5 w-5" />}
        </Button>
      </div>

      <Card className="w-full max-w-md shadow-lg bg-card text-card-foreground rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-primary">Daily Stand Up Quote</CardTitle>
        </CardHeader>
        <CardContent className="min-h-[150px] flex items-center justify-center p-6">
          {isLoading && !isRefreshing ? (
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
          ) : quoteData ? (
            <blockquote className={`text-center text-xl italic ${showQuote ? 'fade-in' : 'opacity-0'}`}>
              <p className="mb-2">"{quoteData.quote}"</p>
            </blockquote>
          ) : (
            <p className="text-center text-muted-foreground">Could not load quote.</p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center gap-4 p-4 bg-muted/50">
           <Button variant="outline" size="icon" onClick={handleCopy} aria-label="Copy Quote">
              <Copy className="h-5 w-5 text-accent-foreground" />
           </Button>
           <Button variant="default" size="icon" onClick={handleShare} aria-label="Share Quote">
             <Share2 className="h-5 w-5 text-primary-foreground" />
           </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
