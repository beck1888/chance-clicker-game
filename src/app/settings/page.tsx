"use client";

import { useState, useEffect } from "react";
import styles from "./settings.module.css";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showHighScore, setShowHighScore] = useState(true);
  const [buttonColor, setButtonColor] = useState("#F87171"); // Default red-400
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'system'>('system');

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
      setDarkMode(savedTheme as 'light' | 'dark' | 'system');
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

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setDarkMode(theme);
    localStorage.setItem("theme", theme);
    if (theme === 'system') {
      localStorage.removeItem("theme");
    }
    document.documentElement.classList.remove('light', 'dark');
    if (theme !== 'system') {
      document.documentElement.classList.add(theme);
    }
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

        <div className="flex flex-col space-y-2">
          <span>Theme</span>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={darkMode === 'light'}
                onChange={() => handleThemeChange('light')}
                name="theme"
                className={styles.checkbox}
              />
              <span>Light</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={darkMode === 'dark'}
                onChange={() => handleThemeChange('dark')}
                name="theme"
                className={styles.checkbox}
              />
              <span>Dark</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={darkMode === 'system'}
                onChange={() => handleThemeChange('system')}
                name="theme"
                className={styles.checkbox}
              />
              <span>System</span>
            </label>
          </div>
        </div>

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
