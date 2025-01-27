"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HamburgerMenu from "@/components/HamburgerMenu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// interface Stats {
//   failStats: Record<number, number>;
//   mostFailedNumber?: number;
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const menu = document.querySelector(".hamburger-menu");
    if (menu) {
      menu.classList.remove("open");
    }
  }, [pathname]);

  useEffect(() => {
    // Initial mount: apply saved theme
    const savedTheme = localStorage.getItem("theme");
    document.documentElement.classList.remove('light', 'dark');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    // On page change: hide content, re-apply theme, then show
    setLoaded(false);
    const savedTheme = localStorage.getItem("theme");
    requestAnimationFrame(() => {
      document.documentElement.classList.remove('light', 'dark');
      if (savedTheme) {
        document.documentElement.classList.add(savedTheme);
      }
      setLoaded(true);
    });
  }, [pathname]);

  if (!loaded) {
    return (
      <html>
        <body style={{ display: "none" }} />
      </html>
    );
  }

  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <header className="absolute top-4 left-4">
          <HamburgerMenu />
        </header>
        {children}
      </body>
    </html>
  );
}
