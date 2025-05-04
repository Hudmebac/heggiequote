'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

const affirmations = [
  "I am worthy of love and happiness.",
  "I am capable of achieving my goals.",
  "I am strong and resilient.",
  "I embrace challenges as opportunities for growth.",
  "I am surrounded by positivity and abundance.",
  "I forgive myself and release the past.",
  "I am confident and courageous.",
  "I trust in my abilities and decisions.",
  "I am grateful for all that I have.",
  "I attract positivity into my life.",
  "I am in control of my life and my destiny.",
  "I am open to receiving all the good life has to offer.",
  "I choose to be happy and find joy in every day.",
  "I am deserving of all the good things that come my way.",
  "I believe in myself and my dreams.",
];

const AffirmationWidget: React.FC = () => {
  const [affirmation, setAffirmation] = useState<string>("");

  useEffect(() => {
    generateRandomAffirmation();
  }, []);

  const generateRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <p className="text-lg text-center">{affirmation}</p>
      <Button onClick={generateRandomAffirmation}>New Affirmation</Button>
    </div>
  );
};

export default AffirmationWidget;