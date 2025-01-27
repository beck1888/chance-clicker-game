"use client";

import { useState, useEffect } from "react";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showHighScore, setShowHighScore] = useState(true);

  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("soundEnabled");
    const savedShowHighScoreSetting = localStorage.getItem("showHighScore");
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting === "true");
    }
    if (savedShowHighScoreSetting !== null) {
      setShowHighScore(savedShowHighScoreSetting === "true");
    }
  }, []);

  const handleSoundToggle = () => {
    setSoundEnabled(!soundEnabled);
    localStorage.setItem("soundEnabled", (!soundEnabled).toString());
  };

  const handleShowHighScoreToggle = () => {
    setShowHighScore(!showHighScore);
    localStorage.setItem("showHighScore", (!showHighScore).toString());
  };

  const handleResetStats = () => {
    if (confirm("Are you sure you want to reset all stats?")) {
      localStorage.removeItem("stats");
      localStorage.removeItem("highScore");
      alert("Stats have been reset.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Settings Page</h1>
      <div className="flex flex-col items-start space-y-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={handleSoundToggle}
          />
          <span>Enable Sound</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showHighScore}
            onChange={handleShowHighScoreToggle}
          />
          <span>Show High Score</span>
        </label>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded"
          onClick={handleResetStats}
        >
          Reset Stats
        </button>
      </div>
    </div>
  );
}
