"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showHighScore, setShowHighScore] = useState(true);
  const [buttonColor, setButtonColor] = useState("#F87171"); // Default red-400

  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("soundEnabled");
    const savedShowHighScoreSetting = localStorage.getItem("showHighScore");
    const savedButtonColor = localStorage.getItem("buttonColor");
    
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting === "true");
    }
    if (savedShowHighScoreSetting !== null) {
      setShowHighScore(savedShowHighScoreSetting === "true");
    }
    if (savedButtonColor) {
      setButtonColor(savedButtonColor);
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

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setButtonColor(newColor);
    localStorage.setItem("buttonColor", newColor);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Settings Page</h1>
      <div className="flex flex-col items-start space-y-4">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={soundEnabled}
            onChange={handleSoundToggle}
            className={styles.checkbox}
          />
          <span>Enable Sound</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showHighScore}
            onChange={handleShowHighScoreToggle}
            className={styles.checkbox}
          />
          <span>Show High Score</span>
        </label>
        
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="color"
            value={buttonColor}
            onChange={handleColorChange}
            className={styles.colorPicker}
          />
          <span>Button Color</span>
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
