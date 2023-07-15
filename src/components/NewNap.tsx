import { useRef, useEffect } from "react";
import { Button } from "./Button";
import { api } from "~/utils/api";

interface Props {
  baby: Baby;
}
export default function NewNap({ baby }: Props) {
  const dateRef = useRef<HTMLInputElement>(null);
  const napStartRef = useRef<HTMLInputElement>(null);
  const napEndRef = useRef<HTMLInputElement>(null);
  const milkRef = useRef<HTMLInputElement>(null);
  const newNap = api.nap.addNap.useMutation();

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const today = `${year}-${month}-${day}`;

    const startTime = "13:00";
    const endTime = "15:00";

    if (napStartRef.current) {
      napStartRef.current.value = startTime;
    }
    if (napEndRef.current) {
      napEndRef.current.value = endTime;
    }
    if (dateRef.current) {
      dateRef.current.value = today;
    }
    if (milkRef.current) {
      milkRef.current.value = "0";
    }
  }, []);
  const addNap = () => {
    if (
      !napStartRef.current?.value ||
      !napEndRef.current?.value ||
      !dateRef.current?.value
    ) {
      console.log("missing data");
      return;
    }

    const napStart = new Date(
      `${dateRef.current?.value} ${napStartRef.current?.value}`
    );
    const napEnd = new Date(
      `${dateRef.current?.value} ${napEndRef.current?.value}`
    );

    const sleepDurationMinutes =
      (napEnd.getTime() - napStart.getTime()) / 1000 / 60;

    newNap.mutate({
      babyId: baby.id,
      napStart: napStart,
      napEnd: napEnd,
      milk: parseInt(milkRef.current?.value || "0"),
      durationMinutes: sleepDurationMinutes,
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 text-left">
      <form>
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-medium text-gray-700">Add Nap</h2>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1">
              <input
                ref={dateRef}
                type="date"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Bed time
            </label>
            <div className="mt-1">
              <input
                ref={napStartRef}
                type="time"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Baby's name"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Wake up time
            </label>
            <div className="mt-1">
              <input
                ref={napEndRef}
                type="time"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Milk (ml)
            </label>
            <div className="mt-1">
              <input
                ref={milkRef}
                type="number"
                min="0"
                max="500"
                defaultValue="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-2 flex flex-row">
            <Button color="blue" type="button" onClick={addNap}>
              <span className="text-white">Add Nap</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
