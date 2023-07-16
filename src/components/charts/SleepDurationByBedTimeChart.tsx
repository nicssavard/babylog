import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { api } from "~/utils/api";

interface Props {
  selectedBaby: Baby;
}
export default function SleepDurationByBedTimeChart({ selectedBaby }: Props) {
  const { data: data } = api.chart.getSleepDurationByBedTimeChart.useQuery({
    baby_id: selectedBaby.id,
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
        data: data || { labels: [], datasets: [] }, // Ensure that data is always defined,
        // data: {
        //   labels: ["6pm", "7pm", "8pm", "9pm", "10pm", "11pm"],
        //   datasets: [
        //     {
        //       label: "sleep duration (h)",
        //       data: [12, 10, 9, 9.5, 10, 11],
        //       borderWidth: 1,
        //     },
        //   ],
        // },
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
