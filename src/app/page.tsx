'use client';
import { Button } from "@/components/button";
import { useState } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);

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
      setClicks(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center gap-12 py-24">
      <div className="text-6xl font-bold text-gray-300 bg-gray-100 px-6 py-3 rounded-lg">
        {clicks.toString().padStart(2, '0')}
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
