"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./HamburgerMenu.module.css";

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`w-8 h-8 flex flex-col justify-between items-center ${styles.hamburger}`}
        onClick={toggleMenu}
      >
        <span className={`${styles.line} ${isOpen ? styles.line1Open : ""}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.line2Open : ""}`}></span>
        <span className={`${styles.line} ${isOpen ? styles.line3Open : ""}`}></span>
      </button>
      {isOpen && (
        <div className="absolute top-10 left-0 bg-white shadow-lg rounded-lg p-4">
          <Link href="/" className={`block py-2 ${styles.menuItem}`}>Home</Link>
          <Link href="/stats" className={`block py-2 ${styles.menuItem}`}>Stats</Link>
          <Link href="/settings" className={`block py-2 ${styles.menuItem}`}>Settings</Link>
        </div>
      )}
    </div>
  );
}
