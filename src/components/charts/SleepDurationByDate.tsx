import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { useState } from "react";

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export default function SleepDurationByDate() {
  const [month, setMonth] = useState<number>(currentMonth);
  const [year, setYear] = useState<number>(currentYear);
  const [monthValue, setMonthValue] = useState<number>(currentMonth);
  const [yearValue, setYearValue] = useState<number>(currentYear);

  const baby = useStore((state) => state.baby);

  const { data: data } = api.chart.getSleepDurationByDateChart.useQuery({
    baby_id: baby?.id || "",
    month: month,
    year: year,
  });
  console.log(data);
  const chartRef = useRef(null);
  const chartInstanceRef = useRef<Chart<"bar", number[], number> | undefined>(
    undefined
  ); // Add a ref to store the Chart instance

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstanceRef.current !== undefined) {
        chartInstanceRef.current.destroy(); // Destroy previous Chart instance
      }

      chartInstanceRef.current = new Chart(chartRef.current, {
        type: "bar",
        data: data || { labels: [], datasets: [] }, // Ensure that data is always defined, otherwise Chart.js throws an error
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  const monthHandler = (input: string) => {
    setMonthValue(parseInt(input));
  };
  const monthVerify = (input: string) => {
    if (!input) {
      return;
    }
    if (parseInt(input) < 1 || parseInt(input) > 12) {
      setMonth(currentMonth);
      setMonthValue(currentMonth);
    } else {
      setMonth(parseInt(input));
    }
  };

  const yearHandler = (input: string) => {
    setYearValue(parseInt(input));
  };
  const yearVerify = (input: string) => {
    if (!input) {
      return;
    }
    if (parseInt(input) < 2000 || parseInt(input) > 2025) {
      setYear(currentYear);
      setYearValue(currentYear);
    } else {
      setYear(parseInt(input));
    }
  };

  return (
    <>
      <div className="flex flex-col ">
        <h1 className="mx-auto justify-center text-2xl ">
          Daily Sleep Duration
        </h1>

        <canvas ref={chartRef} />
        <div className="mt-2 flex w-full flex-row justify-end">
          <div className="">
            <input
              onBlur={(e) => monthVerify(e.target.value)}
              onChange={(e) => monthHandler(e.target.value)}
              value={monthValue}
              type="number"
              className="w-12 rounded-l-full border-l border-gray-500 text-xs" //add a border on the left
              placeholder="MM"
              maxLength={2}
            ></input>
            <input
              onBlur={(e) => yearVerify(e.target.value)}
              onChange={(e) => yearHandler(e.target.value)}
              value={yearValue}
              type="number"
              className="w-16 rounded-r-full border-r border-gray-500 text-xs"
              placeholder="YYYY"
              maxLength={4}
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
