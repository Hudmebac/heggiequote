import React from 'react';
import QuoteDisplay from './quote-display';
import { Category } from '@/lib/quotes';

interface QuoteComponentProps {
  category: Category;
  currentQuote: string | null; // Receive currentQuote as prop
  setCurrentQuote: (quote: string | null) => void; // Receive setter as prop
}

const QuoteComponent: React.FC<QuoteComponentProps> = ({ category, currentQuote, setCurrentQuote }) => {
  // Removed local state for currentQuote and quoteHistory
  // The currentQuote state is now managed by the parent component (page.tsx)

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* Pass category and setCurrentQuote down to QuoteDisplay */}
      {/* Display the currentQuote received from props */}
      <QuoteDisplay
          category={category}
          setCurrentQuote={setCurrentQuote}
          initialQuote={currentQuote} // Pass initial quote if needed or let QuoteDisplay handle fetching
      />
    </div>
  );
};

export default QuoteComponent;
