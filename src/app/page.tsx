'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from "@/components/ui/separator";
import Layout from '@/components/layout';
import { Category } from '@/lib/quotes';
import QuoteComponent from '@/components/quote-component';
import ShareCopyButtons from '@/components/share-copy-buttons';
import AffirmationWidget from '@/components/features/affirmation-widget';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Technology & Innovation');
  const [currentQuote, setCurrentQuote] = useState<string | null>(null); // Lifted state

  return (
    <Layout selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}>
      <div className='flex flex-col items-center justify-center p-4 w-full'>
        <div className='flex flex-col items-center justify-center w-full card-container'>
          <Card className="card-section">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center">
                Daily Stand Up Quote
              </CardTitle>
            </CardHeader>
            <CardContent className="min-h-[150px] flex flex-col items-center justify-center p-6 space-y-4">
              {/* Pass state and setter down */}
              <QuoteComponent
                category={selectedCategory}
                currentQuote={currentQuote}
                setCurrentQuote={setCurrentQuote}
              />
              {/* Pass currentQuote down */}
              <ShareCopyButtons quoteText={currentQuote} />
            </CardContent>
          </Card>
          <Separator className='my-4 w-full max-w-md' />
          <Card className='card-section'>
            <CardHeader>
              <CardTitle>Affirmation of the Day</CardTitle>
            </CardHeader>
            <CardContent><AffirmationWidget /></CardContent>
          </Card>
          <Separator className='my-4 w-full max-w-md' />
        </div>
      </div>
    </Layout>
  );
};
