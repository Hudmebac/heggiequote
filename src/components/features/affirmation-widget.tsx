'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react'; // Import icons
import { useToast } from '@/hooks/use-toast'; // Import useToast

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
  const [isSpeaking, setIsSpeaking] = useState(false); // State for narration status
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesis | null>(null); // State for speech synthesis object
  const { toast } = useToast(); // Initialize useToast

  // Get SpeechSynthesis instance on client side
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        setSpeechSynthesis(window.speechSynthesis);
    }
    // Fetch initial affirmation
    generateRandomAffirmation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs once on mount


  const generateRandomAffirmation = () => {
     // Stop any ongoing speech before generating a new affirmation
    if (speechSynthesis && isSpeaking) {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    }
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setAffirmation(affirmations[randomIndex]);
  };

   const handleAudioNarration = () => {
    if (!speechSynthesis) {
        toast({ title: 'Audio Narration Unavailable', description: 'Your browser does not support speech synthesis.', variant: 'destructive' });
        return;
    }

    if (isSpeaking) {
        speechSynthesis.cancel(); // Stop current speech
        setIsSpeaking(false);
    } else if (affirmation) {
        const utterance = new SpeechSynthesisUtterance(affirmation);
        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event);
            setIsSpeaking(false);
            toast({ title: 'Audio Failed', description: 'Could not narrate the affirmation.', variant: 'destructive' });
        };
        speechSynthesis.speak(utterance);
    } else {
        toast({ title: 'Nothing to narrate', description: 'No affirmation is currently displayed.', variant: 'destructive' });
    }
};


  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-4">
      <p className="text-lg text-center min-h-[48px]">{affirmation}</p> {/* Added min-height */}
      <div className="flex gap-2"> {/* Wrap buttons in a flex container */}
        <Button onClick={generateRandomAffirmation}>New Affirmation</Button>
        {/* Audio Narration Button */}
        <Button variant="outline" size="icon" onClick={handleAudioNarration} aria-label="Narrate Affirmation" disabled={!affirmation || !speechSynthesis}>
            {isSpeaking ? <Loader2 className="h-5 w-5 text-foreground animate-spin" /> : <Volume2 className="h-5 w-5 text-foreground" />}
        </Button>
      </div>
    </div>
  );
};

export default AffirmationWidget;
