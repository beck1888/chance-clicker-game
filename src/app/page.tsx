'use client';
import { Button } from "@/components/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Load high score from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('highScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const handleClick = () => {
    // Generate random number between 0 and 1
    const chance = Math.random();
    // Current probability of reset is equal to click count percentage
    // e.g., 5 clicks = 5% chance, 50 clicks = 50% chance
    const resetProbability = clicks / 100;

    // If random number is less than probability, reset to 0
    // Otherwise increment the counter
    if (chance < resetProbability) {
      setClicks(0);
    } else {
      const newScore = clicks + 1;
      setClicks(newScore);
      // Update high score if new score is higher
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore.toString());
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center gap-12 py-24 select-none">
      <div className="flex flex-col items-center w-[180px]">
        <div className="w-full text-6xl font-bold text-gray-300 bg-gray-100 px-6 py-3 rounded-t-lg border-b border-gray-200 text-center">
          {clicks.toString().padStart(2, '0')}
        </div>
        <div className="w-full text-2xl font-bold text-gray-200 bg-gray-50 px-6 py-1.5 rounded-b-lg -mt-1 text-center">
          {highScore.toString().padStart(2, '0')}
        </div>
      </div>
      <Button 
        className="w-40 h-40 bg-red-400 hover:bg-red-500 ring-8 ring-gray-200 text-xl"
        onClick={handleClick}
      >
        Click
      </Button>
      <div className="text-sm text-gray-500">
        Reset chance: {clicks}%
      </div>
    </div>
  );
}
