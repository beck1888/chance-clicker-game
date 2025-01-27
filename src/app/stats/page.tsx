"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js"; // Import CategoryScale

Chart.register(CategoryScale); // Register CategoryScale

export default function Stats() {
  const [failStats, setFailStats] = useState({});
  const [highestNumber, setHighestNumber] = useState(0);
  const [mostFailedNumber, setMostFailedNumber] = useState(0);
  const [averageCPS, setAverageCPS] = useState(0);
  const [timePlayed, setTimePlayed] = useState(0);

  useEffect(() => {
    // Fetch stats from local storage or API
    const stats = JSON.parse(localStorage.getItem("stats") || "{}");
    setFailStats(stats.failStats || {});
    setHighestNumber(stats.highestNumber || 0);
    setMostFailedNumber(stats.mostFailedNumber || 0);
    setAverageCPS(stats.averageCPS || 0);
    setTimePlayed(stats.timePlayed || 0);
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  const data = {
    labels: Object.keys(failStats),
    datasets: [
      {
        label: "Fails per Number",
        data: Object.values(failStats),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl mb-8 font-bold">Stats Page</h1>
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
        <div className="w-1/2 p-6">
          <h2 className="text-2xl mb-4 font-semibold">Statistics</h2>
          <p className="mb-2"><span className="font-bold">Highest Number Reached:</span> <span className="font-medium">{highestNumber}</span></p>
          <p className="mb-2"><span className="font-bold">Most Failed Number:</span> <span className="font-medium">{mostFailedNumber}</span></p>
          <p className="mb-2"><span className="font-bold">Average Clicks Per Second:</span> <span className="font-medium">{averageCPS}</span></p>
          <p className="mb-2"><span className="font-bold">Time Played (Lifetime):</span> <span className="font-medium">{formatTime(timePlayed)}</span></p>
        </div>
        <div className="w-1/2 p-6">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
}
