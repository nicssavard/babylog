import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";

export default function SleepDurationByBedTimeChart() {
  const baby = useStore((state) => state.baby);
  const { data: data } = api.chart.getSleepDurationByBedTimeChart.useQuery({
    baby_id: baby?.id || "",
  });
  console.log(data);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<Chart<"line", number[], string> | undefined>(
    undefined
  ); // Add a ref to store the Chart instance

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current !== undefined) {
        chartInstanceRef.current.destroy(); // Destroy previous Chart instance
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "line",
        data: data || { labels: [], datasets: [] }, // Ensure that data is always defined, otherwise Chart.js throws an error
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  return <canvas ref={chartRef} />;
}
