"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true); // Default to true
  const [showHighScore, setShowHighScore] = useState(true); // Default to true
  const [buttonColor, setButtonColor] = useState("#F87171"); // Default red-400
  const [darkMode, setDarkMode] = useState<'light' | 'dark'>('light'); // Default to light

  useEffect(() => {
    const savedSoundSetting = localStorage.getItem("soundEnabled");
    const savedShowHighScoreSetting = localStorage.getItem("showHighScore");
    const savedButtonColor = localStorage.getItem("buttonColor");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting === "true");
    }
    if (savedShowHighScoreSetting !== null) {
      setShowHighScore(savedShowHighScoreSetting === "true");
    }
    if (savedButtonColor) {
      setButtonColor(savedButtonColor);
    }
    if (savedTheme) {
      setDarkMode(savedTheme as 'light' | 'dark');
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

  const handleResetSettings = () => {
    setSoundEnabled(true); // Reset to default
    setShowHighScore(true); // Reset to default
    setButtonColor("#F87171"); // Reset to default
    setDarkMode('light'); // Reset to default
    localStorage.setItem("soundEnabled", "true");
    localStorage.setItem("showHighScore", "true");
    localStorage.setItem("buttonColor", "#F87171");
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setButtonColor(newColor);
    localStorage.setItem("buttonColor", newColor);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setDarkMode(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Settings Page</h1>
      <div className="flex flex-col items-start space-y-4 w-80">
        <div className="flex flex-col space-y-2">
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
        </div>

        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="color"
              value={buttonColor}
              onChange={handleColorChange}
              className={styles.colorPicker}
            />
            <span>Button Color</span>
          </label>
        </div>

        <div className="flex flex-col space-y-2">
          <span>Theme</span>
          <select
            value={darkMode}
            onChange={(e) => handleThemeChange(e.target.value as 'light' | 'dark')}
            className={`p-2 border rounded ${document.documentElement.classList.contains('dark') ? 'bg-gray-800 text-gray-100 border-gray-700' : 'bg-white text-black border-gray-300'}`}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleResetSettings}
        >
          Reset Settings
        </button>

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
