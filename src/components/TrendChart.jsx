import {
  BarController,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import { Chart } from "react-chartjs-2";

import { DEFAULT_CHART_OPTIONS } from "../utils/constants";
import { parseDurationToMinutes } from "../utils/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  BarController,
  LineController,
  Title,
  Tooltip,
  Legend
);

export function TrendChart({ buildTrends }) {
  const [displayCount, setDisplayCount] = useState(10);

  const { chartData, options } = useMemo(() => {
    const sortedTrends = [...buildTrends].sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    const displayedTrends = sortedTrends.slice(-displayCount);

    const data = {
      labels: displayedTrends.map((trend) =>
        trend.build_name.length > 5
          ? trend.build_name.slice(0, 5)
          : trend.build_name
      ),
      datasets: [
        {
          type: "bar",
          label: "Passed",
          data: displayedTrends.map((trend) => trend.passed),
          backgroundColor: "rgba(34, 197, 94, 0.8)",
          stack: "stack0",
          order: 2,
        },
        {
          type: "bar",
          label: "Failed",
          data: displayedTrends.map((trend) => trend.failed),
          backgroundColor: "rgba(239, 68, 68, 0.8)",
          stack: "stack0",
          order: 2,
        },
        {
          type: "bar",
          label: "Skipped",
          data: displayedTrends.map((trend) => trend.skipped),
          backgroundColor: "rgba(234, 179, 8, 0.8)",
          stack: "stack0",
          order: 2,
        },
        {
          type: "line",
          label: "Pass Rate",
          data: displayedTrends.map((trend) => trend.pass_rate),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          borderWidth: 2,
          pointRadius: 4,
          pointBackgroundColor: "#3b82f6",
          fill: true,
          tension: 0.4,
          yAxisID: "percentage",
          order: 1,
        },
        {
          type: "line",
          label: "Duration",
          data: displayedTrends.map((trend) =>
            parseDurationToMinutes(trend.duration)
          ),
          borderColor: "#444444",
          backgroundColor: "rgba(0, 0, 0, 0.1)",
          borderWidth: 2.5,
          borderDash: [5, 5],
          pointRadius: 3,
          pointBackgroundColor: "#444444",
          tension: 0.4,
          yAxisID: "duration",
          order: 0,
        },
      ],
    };

    const chartOptions = {
      ...DEFAULT_CHART_OPTIONS.TREND,
      scales: {
        ...DEFAULT_CHART_OPTIONS.TREND.scales,
        y: {
          ...DEFAULT_CHART_OPTIONS.TREND.scales.y,
          stacked: true,
        },
        percentage: {
          position: "right",
          grid: {
            display: false,
          },
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Pass Rate (%)",
            font: {
              size: 12,
              weight: "500",
            },
            color: "#3b82f6",
          },
          ticks: {
            callback: (value) => `${value}%`,
            font: {
              size: 11,
            },
            color: "#3b82f6",
          },
        },
        duration: {
          position: "right",
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: "Duration (min)",
            font: {
              size: 12,
              weight: "500",
            },
            color: "#444444",
          },
          ticks: {
            font: {
              size: 11,
            },
            color: "#444444",
          },
          beginAtZero: true,
        },
      },
    };

    return { chartData: data, options: chartOptions };
  }, [buildTrends, displayCount]);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={20} />
          <h3 className="text-lg font-semibold text-gray-900">
            Build Trends & Duration
          </h3>
        </div>
        <select
          value={displayCount}
          onChange={(e) => setDisplayCount(Number(e.target.value))}
          className="border border-zinc-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
        >
          <option value={5}>Last 5 Builds</option>
          <option value={10}>Last 10 Builds</option>
          <option value={15}>Last 15 Builds</option>
          <option value={20}>Last 20 Builds</option>
          <option value={30}>Last 30 Builds</option>
          <option value={buildTrends.length}>
            All Builds ({buildTrends.length})
          </option>
        </select>
      </div>
      <div className="h-[400px]">
        <Chart type="bar" data={chartData} options={options} />
      </div>
    </div>
  );
}
