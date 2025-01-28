"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./settings.module.css";

export default function Settings() {
  const [soundEnabled, setSoundEnabled] = useState(true); // Default to true
  const [showHighScore, setShowHighScore] = useState(true); // Default to true
  const [buttonColor, setButtonColor] = useState("#F87171"); // Default red-400
  const [darkMode, setDarkMode] = useState<'light' | 'dark'>('light'); // Default to light
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  const themePickerRef = useRef<HTMLDivElement>(null);

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
      document.documentElement.style.setProperty('--button-color', savedButtonColor); // Update CSS variable
    }
    if (savedTheme) {
      setDarkMode(savedTheme as 'light' | 'dark');
      document.documentElement.classList.add(savedTheme);
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

  const handleColorChange = (color: string) => {
    setButtonColor(color);
    localStorage.setItem("buttonColor", color);
    document.documentElement.style.setProperty('--button-color', color); // Update CSS variable
    setIsColorPickerOpen(false);
  };

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setDarkMode(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    setIsThemePickerOpen(false); // Close the theme picker
  };

  const toggleThemePicker = () => {
    setIsThemePickerOpen(!isThemePickerOpen);
  };

  // Close color picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        colorPickerRef.current &&
        !colorPickerRef.current.contains(event.target as Node)
      ) {
        setIsColorPickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close theme picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        themePickerRef.current &&
        !themePickerRef.current.contains(event.target as Node)
      ) {
        setIsThemePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const predefinedColors = [
    "#F87171", // Default (Salmon red)
    "#FCA571", // Peach orange
    "#FCD34D", // Mellow yellow
    "#86EFAC", // Sage green
    "#93C5FD", // Sky blue
    "#A5B4FC", // Periwinkle
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-8">Settings</h1>
      <div className="flex flex-col items-start space-y-6 w-80">
        {/* Sound and High Score Toggles */}
        <div className="flex flex-col space-y-4">
          <label className="flex items-center justify-between w-full">
            <div className={styles.toggle}>
              <input
                type="checkbox"
                checked={soundEnabled}
                onChange={handleSoundToggle}
              />
              <span className={styles.slider}></span>
            </div>
            <span className="pl-2 text-left w-full">Sound</span>
          </label>
          <label className="flex items-center justify-between w-full">
            <div className={styles.toggle}>
              <input
                type="checkbox"
                checked={showHighScore}
                onChange={handleShowHighScoreToggle}
              />
              <span className={styles.slider}></span>
            </div>
            <span className="pl-2 text-left w-full">High Score</span>
          </label>
        </div>

        {/* Color Picker */}
        <div className="flex flex-col space-y-2 w-full">
          <span>Accent Color</span>
          <div className={styles.colorPickerContainer} ref={colorPickerRef}>
            <button
              className={`${styles.colorPickerButton} ${isColorPickerOpen ? 'open' : ''}`}
              onClick={toggleColorPicker}
            >
              <span style={{ backgroundColor: buttonColor }} className="w-6 h-6 rounded-full"></span>
                <span className="flex-1 text-center mx-auto px-4">Select</span>
                </button>
                <div className={`${styles.colorPickerPopup} ${isColorPickerOpen ? styles.open : ''}`}>
                <div className={styles.colorGrid}>
                {predefinedColors.map((color) => (
                <div
                key={color}
                className={styles.colorOption}
                style={{ backgroundColor: color }}
                onClick={() => handleColorChange(color)}
                ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="flex flex-col space-y-2 w-full">
          <span>Theme</span>
          <div className={styles.themePickerContainer} ref={themePickerRef}>
            <button
              className={`${styles.themePickerButton} ${isThemePickerOpen ? 'open' : ''}`}
              onClick={toggleThemePicker}
            >
              <span className="flex-1 text-center mx-auto px-4">
          {darkMode === 'dark' ? 'Dark' : 'Light'}
              </span>
            </button>
            <div className={`${styles.themePickerPopup} ${isThemePickerOpen ? styles.open : ''}`}>
              <div className={styles.themeOption} onClick={() => handleThemeChange('light')}>
          Light
              </div>
              <div className={styles.themeOption} onClick={() => handleThemeChange('dark')}>
          Dark
              </div>
            </div>
          </div>
        </div>

        {/* Reset Buttons */}
        <div className="flex space-x-4 w-full">
          <button
            className={styles.resetButton}
            onClick={handleResetSettings}
          >
            Reset Settings
          </button>
          <button
            className={styles.resetButton}
            onClick={handleResetStats}
          >
            Reset Stats
          </button>
        </div>
      </div>
    </div>
  );
}
