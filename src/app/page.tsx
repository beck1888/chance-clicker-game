"use client";
import { Button } from "@/components/button";
import { useState, useEffect } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHighScore, setShowHighScore] = useState(true);
  const [buttonColor, setButtonColor] = useState("#F87171");
  const [loaded, setLoaded] = useState(false);

  // Load settings and high score from localStorage on mount
  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("soundEnabled");
    const savedShowHighScoreSetting = localStorage.getItem("showHighScore");
    setSoundEnabled(savedSoundSetting !== null ? savedSoundSetting === "true" : true);
    setShowHighScore(savedShowHighScoreSetting !== null ? savedShowHighScoreSetting === "true" : true);

    const saved = localStorage.getItem('highScore');
    if (saved) setHighScore(parseInt(saved));

    const savedButtonColor = localStorage.getItem("buttonColor");
    if (savedButtonColor) setButtonColor(savedButtonColor);

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }

    setLoaded(true);

    // Watch for settings changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "soundEnabled") {
        setSoundEnabled(e.newValue === "true");
      } else if (e.key === "showHighScore") {
        setShowHighScore(e.newValue === "true");
      } else if (e.key === "buttonColor") {
        setButtonColor(e.newValue || "#F87171");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (clicks > 0 && !startTime) {
      setStartTime(new Date());
    }
  }, [clicks, startTime]);

  const playSound = (src: string) => {
    if (!soundEnabled) return;
    const audio = new Audio(src);
    audio.play().catch(console.error);
  };

  const handleClick = () => {
    // Start tracking time on first click
    if (!startTime) {
      setStartTime(new Date());
    }

    // Generate random number between 0 and 1
    const chance = Math.random();
    // Current probability of reset is equal to click count percentage
    // e.g., 5 clicks = 5% chance, 50 clicks = 50% chance
    const resetProbability = clicks / 100;

    // If random number is less than probability, reset to 0
    if (chance < resetProbability) {
      if (startTime) {
        const endTime = new Date();
        const timePlayed = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
        const stats = JSON.parse(localStorage.getItem("stats") || "{}");
        stats.timePlayed = (stats.timePlayed || 0) + timePlayed;
        localStorage.setItem("stats", JSON.stringify(stats));
        setStartTime(null);
      }
      trackFail(clicks);
      setClicks(0);
      playSound('/sounds/fail.mp3');
    } else {
      const newScore = clicks + 1;
      setClicks(newScore);
      
      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem('highScore', newScore.toString());
      }
      
      // Update stats
      const stats = JSON.parse(localStorage.getItem("stats") || "{}");
      stats.lifetimeClicks = (stats.lifetimeClicks || 0) + 1;
      localStorage.setItem("stats", JSON.stringify(stats));
      
      // Play appropriate sound
      if (newScore % 10 === 0) {
        playSound('/sounds/level-up.mp3');
      } else {
        playSound('/sounds/click.mp3');
      }
    }
  };

  if (!loaded) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 py-24 select-none">
      <div className="flex flex-col items-center w-[180px]">
        <div className={`w-full text-6xl font-bold text-gray-300 bg-gray-100 px-6 py-3 ${showHighScore ? 'rounded-t-lg' : 'rounded-lg'} border-b border-gray-200 text-center ${document.documentElement.classList.contains('dark') ? 'dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700' : ''}`}>
          {clicks.toString().padStart(2, '0')}
        </div>
        {showHighScore && (
          <div className={`w-full text-2xl font-bold text-gray-200 bg-gray-50 px-6 py-1.5 rounded-b-lg border-t border-gray-200 text-center ${document.documentElement.classList.contains('dark') ? 'dark:bg-gray-700 dark:text-gray-200 dark:border-gray-700' : ''}`}>
            {highScore.toString().padStart(2, '0')}
          </div>
        )}
      </div>
      <Button 
        className={`w-40 h-40 ring-8 text-xl ${document.documentElement.classList.contains('dark') ? 'dark:ring-gray-700' : 'ring-gray-200'}`}
        style={{ backgroundColor: buttonColor }}
        onClick={handleClick}
      />
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


