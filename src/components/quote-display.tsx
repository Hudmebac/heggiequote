import React, { useState, useEffect, useCallback } from 'react';
import { Loader2 } from 'lucide-react';
import { quotes, QuoteCategory } from '@/lib/quotes';
import { Button } from '@/components/ui/button';

interface QuoteDisplayProps {
    category: QuoteCategory;
    setCurrentQuote: (quote: string | null) => void; // Accept null for initial state
    initialQuote?: string | null; // Optional initial quote prop
}

const QuoteDisplay: React.FC<QuoteDisplayProps> = ({
    category,
    setCurrentQuote,
    initialQuote = null, // Default to null
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Initialize quote state with initialQuote or null
  const [quote, setQuote] = useState<string | null>(initialQuote);
  // Keep track of the index internally if needed, but mainly rely on fetched quote
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(-1);

    const fetchQuote = useCallback((isInitialFetch = false) => {
        setIsLoading(true);
        const categoryQuotes = quotes[category];
        if (categoryQuotes && categoryQuotes.length > 0) {
            let newIndex;
            // Avoid showing the same quote immediately if we just fetched one
            if (categoryQuotes.length === 1) {
                newIndex = 0;
            } else {
                 do {
                    newIndex = Math.floor(Math.random() * categoryQuotes.length);
                 } while (!isInitialFetch && newIndex === currentQuoteIndex); // Ensure new quote if not initial fetch
            }

            const newQuote = categoryQuotes[newIndex];
            setQuote(newQuote);
            setCurrentQuoteIndex(newIndex);
            setCurrentQuote(newQuote); // Update parent state
        } else {
            setQuote("No quotes available for this category.");
            setCurrentQuote(null); // Update parent state
            setCurrentQuoteIndex(-1);
        }
        setIsLoading(false);
  }, [category, setCurrentQuote, currentQuoteIndex]); // Add currentQuoteIndex dependency

    // Fetch quote when category changes or on initial mount
    useEffect(() => {
        // Only fetch if quote is null initially or category changes
        if (quote === null || !initialQuote) {
            fetchQuote(true);
        }
        // If initialQuote is provided, set it directly
        else if (initialQuote && quote !== initialQuote) {
            setQuote(initialQuote);
            // Optionally find index if needed, otherwise set to -1 or handle differently
            const initialIndex = quotes[category]?.indexOf(initialQuote);
            setCurrentQuoteIndex(initialIndex !== undefined && initialIndex > -1 ? initialIndex : -1);
        }
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, initialQuote]); // Run when category or initialQuote changes


  const handleNextQuote = () => {
    fetchQuote(); // Fetch a new random quote
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      <p id='quoteText' className="text-lg text-center min-h-[50px]"> {/* Added min-height */}
          {isLoading && !quote ? <Loader2 className="h-6 w-6 animate-spin" /> : quote}
      </p>
      <Button onClick={handleNextQuote} disabled={isLoading} className="next-quote-button">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Next Quote'}
      </Button>
    </div>
  );
};

export default QuoteDisplay;
