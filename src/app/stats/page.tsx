"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js"; // Import CategoryScale and LinearScale

Chart.register(CategoryScale, LinearScale); // Register CategoryScale and LinearScale

export default function Stats() {
  const [failStats, setFailStats] = useState<Record<number, number>>({});
  const [highScore, setHighScore] = useState(0);
  const [mostFailedNumbers, setMostFailedNumbers] = useState<string[]>([]);
  const [timePlayed, setTimePlayed] = useState(0);
  const [lifetimeClicks, setLifetimeClicks] = useState(0);

  useEffect(() => {
    // Fetch stats from local storage or API
    const stats = JSON.parse(localStorage.getItem("stats") || "{}");
    setFailStats(stats.failStats || {});
    setHighScore(stats.highScore || 0);
    setTimePlayed(stats.timePlayed || 0);
    setLifetimeClicks(stats.lifetimeClicks || 0);

    // Determine most failed numbers
    const maxFails = Math.max(...Object.values(stats.failStats || {}) as number[]);
    const mostFailed = Object.entries(stats.failStats || {})
      .filter(([_, value]) => value === maxFails)
      .map(([key]) => key);
    setMostFailedNumbers(mostFailed);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const data = {
    labels: Array.from({ length: highScore + 1 }, (_, i) => i.toString()),
    datasets: [
      {
        label: "Fails per Number",
        data: Array.from({ length: highScore + 1 }, (_, i) => failStats[i] || 0),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Number',
        },
        ticks: {
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            if (value === 0 || value === highScore || value === Math.floor(highScore / 2)) {
              return value;
            }
            return '';
          },
        },
      },
      y: {
        type: 'linear' as const,
        title: {
          display: true,
          text: 'Fails',
        },
        ticks: {
          callback: function(tickValue: string | number) {
            const value = Number(tickValue);
            const maxFails = Math.max(...Object.values(failStats) as number[]);
            if (value === 0 || value === maxFails || value === Math.floor(maxFails / 2)) {
              return value;
            }
            return '';
          },
        },
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl mb-8 font-bold">Stats Page</h1>
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl mb-4 font-semibold">Statistics</h2>
          <p className="mb-2"><span className="font-bold">High Score:</span> <span className="font-medium">{highScore}</span></p>
          <p className="mb-2"><span className="font-bold">Most Failed Number(s):</span> <span className="font-medium">{mostFailedNumbers.join(', ')}</span></p>
          <p className="mb-2"><span className="font-bold">Time Played (Lifetime):</span> <span className="font-medium">{formatTime(timePlayed)}</span></p>
          <p className="mb-2"><span className="font-bold">Lifetime Clicks:</span> <span className="font-medium">{lifetimeClicks}</span></p>
        </div>
        <div className="w-1/2 p-6">
          <Line data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
