'use client';
import { Button } from "@/components/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);

  // Load high score from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('highScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  useEffect(() => {
    if (clicks > 0 && !startTime) {
      setStartTime(new Date());
    }
  }, [clicks]);

  const handleClick = () => {
    // Generate random number between 0 and 1
    const chance = Math.random();
    // Current probability of reset is equal to click count percentage
    // e.g., 5 clicks = 5% chance, 50 clicks = 50% chance
    const resetProbability = clicks / 100;

    // If random number is less than probability, reset to 0
    // Otherwise increment the counter
    if (chance < resetProbability) {
      if (startTime) {
        const endTime = new Date();
        const timePlayed = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        const stats = JSON.parse(localStorage.getItem("stats") || "{}");
        stats.timePlayed = (stats.timePlayed || 0) + timePlayed;
        localStorage.setItem("stats", JSON.stringify(stats));
        setStartTime(null);
      }
      trackFail(clicks); // Track the fail
      setClicks(0);
      // Play fail sound
      const failAudio = new Audio('/sounds/fail.mp3');
      failAudio.play();
    } else {
      const newScore = clicks + 1;
      setClicks(newScore);
      // Update high score if new score is higher
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore.toString());
      }
      // Play level-up sound if on a multiple of 10 minus one
      if (newScore % 10 === 0) {
        const levelUpAudio = new Audio('/sounds/level-up.mp3');
        levelUpAudio.play();
      } else {
        // Play click sound
        const clickAudio = new Audio('/sounds/click.mp3');
        clickAudio.play();
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
      {/* <div className="text-sm text-gray-500">
        Reset chance: {clicks}%
      </div> */}
    </div>
  );
}
function trackFail(clicks: number) {
  const stats = JSON.parse(localStorage.getItem("stats") || "{}");
  stats.failStats = stats.failStats || {};
  stats.failStats[clicks] = (stats.failStats[clicks] || 0) + 1;
  stats.mostFailedNumber = Object.entries(stats.failStats)
    .reduce<[string, number]>((a, [key, value]) => 
      (value as number > (a[1] || 0) ? [key, value as number] : a), 
      ['0', 0])[0];
  localStorage.setItem("stats", JSON.stringify(stats));
}
  

