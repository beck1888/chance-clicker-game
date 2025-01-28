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
  const [theme, setTheme] = useState("");
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
    setTheme(savedTheme || "light");
    setLoaded(true);
  }, []);

  // Remove or comment out the following effect:
  /*
  useEffect(() => {
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
  */

  if (!loaded) {
    return (
      <html>
        <body style={{ display: "none" }} />
      </html>
    );
  }

  return (
    <html lang="en" className={theme}>
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
