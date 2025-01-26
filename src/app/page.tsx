'use client';
import { Button } from "@/components/button";
import { useState } from "react";

export default function Home() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center gap-12 py-24">
      <div className="text-6xl font-bold text-gray-300 bg-gray-100 px-6 py-3 rounded-lg">
        {clicks.toString().padStart(2, '0')}
      </div>
      <Button 
        className="w-40 h-40 bg-red-400 hover:bg-red-500 ring-8 ring-gray-200 text-xl"
        onClick={() => setClicks(prev => prev + 1)}
      >
        Click
      </Button>
    </div>
  );
}
