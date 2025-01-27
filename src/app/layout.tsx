"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HamburgerMenu from "@/components/HamburgerMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface Stats {
  failStats: Record<number, number>;
  mostFailedNumber?: number;
  timePlayed?: number;
}

function trackFail(number: number): void {
  const stats: Stats = JSON.parse(localStorage.getItem("stats") || "{}");
  stats.failStats = stats.failStats || {};
  stats.failStats[number] = (stats.failStats[number] || 0) + 1;
  stats.mostFailedNumber = Number(Object.keys(stats.failStats).reduce((a, b) =>
    stats.failStats[Number(a)] > stats.failStats[Number(b)] ? a : b
  ));
  localStorage.setItem("stats", JSON.stringify(stats));
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      const menu = document.querySelector(".hamburger-menu");
      if (menu) {
        menu.classList.remove("open");
      }
    };

    // Navigation events are handled differently in App Router
    window.addEventListener('routeChangeComplete', handleRouteChange);
    return () => {
      window.removeEventListener('routeChangeComplete', handleRouteChange);
    };
  }, []);

  return (
    <html lang="en" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <header className="absolute top-4 left-4">
          <HamburgerMenu />
        </header>
        {children}
      </body>
    </html>
  );
}
