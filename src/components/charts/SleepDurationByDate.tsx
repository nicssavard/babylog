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

  const baby = useStore((state) => state.baby);
  const { data: monthsList } = api.chart.getSleepMonthList.useQuery({
    baby_id: baby?.id || "",
  });
  const { data: yearsList } = api.chart.getSleepYearList.useQuery({
    baby_id: baby?.id || "",
  });

  const { data: data } = api.chart.getSleepDurationByDateChart.useQuery({
    baby_id: baby?.id || "",
    month: month,
    year: year,
  });

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
    setMonth(parseInt(input));
  };

  const yearHandler = (input: string) => {
    setYear(parseInt(input));
  };

  const monthList = monthsList?.map((month) => (
    <option key={month} value={month}>
      {month}
    </option>
  ));

  const yearList = yearsList?.map((year) => (
    <option key={year} value={year}>
      {year}
    </option>
  ));

  return (
    <>
      <div className="flex flex-col ">
        <h1 className="mx-auto justify-center text-2xl ">
          Daily Sleep Duration
        </h1>

        <canvas ref={chartRef} />
        <div className="mt-2 flex w-full flex-row justify-end">
          <div className="">
            <select
              onChange={(e) => monthHandler(e.target.value)}
              className="w-12 rounded-l-full border-l border-gray-500 p-1 text-xs md:w-16" //add a border on the left
              placeholder="MM"
            >
              {monthList}
            </select>
            <select
              onChange={(e) => yearHandler(e.target.value)}
              className="w-16 rounded-r-full border-r border-gray-500 p-1 text-xs md:w-20"
            >
              {yearList}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
