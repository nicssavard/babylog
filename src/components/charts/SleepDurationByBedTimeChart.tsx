import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function SleepDurationByBedTimeChart() {
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
        data: {
          labels: ["6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
          datasets: [
            {
              label: "sleep duration (h)",
              data: [12, 10, 9, 9.5, 10, 11],
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, []);

  return <canvas ref={chartRef} />;
}
