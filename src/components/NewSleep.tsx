import { useRef, useEffect } from "react";
import { Button } from "./Button";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";

export default function NewSleep() {
  const baby = useStore((state) => state.baby);
  const dateRef = useRef<HTMLInputElement>(null);
  const sleepStartRef = useRef<HTMLInputElement>(null);
  const sleepEndRef = useRef<HTMLInputElement>(null);
  const milkRef = useRef<HTMLInputElement>(null);
  const newSleep = api.sleep.addSleep.useMutation();

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    const today = `${year}-${month}-${day}`;

    const startTime = "20:00";
    const endTime = "07:00";

    if (sleepStartRef.current) {
      sleepStartRef.current.value = startTime;
    }
    if (sleepEndRef.current) {
      sleepEndRef.current.value = endTime;
    }
    if (dateRef.current) {
      dateRef.current.value = today;
    }
    if (milkRef.current) {
      milkRef.current.value = "0";
    }
  }, []);
  const addSleep = () => {
    if (
      !baby ||
      !sleepStartRef.current?.value ||
      !sleepEndRef.current?.value ||
      !dateRef.current?.value
    ) {
      console.log("missing data");
      return;
    }

    const sleepStart = new Date(
      `${dateRef.current?.value} ${sleepStartRef.current?.value}`
    );
    const sleepEnd = new Date(
      `${dateRef.current?.value} ${sleepEndRef.current?.value}`
    );
    sleepEnd.setDate(sleepEnd.getDate() + 1);

    const sleepDurationMinutes =
      (sleepEnd.getTime() - sleepStart.getTime()) / 1000 / 60;

    newSleep.mutate({
      babyId: baby.id,
      sleepStart: sleepStart,
      sleepEnd: sleepEnd,
      milk: parseInt(milkRef.current?.value || "0"),
      durationMinutes: sleepDurationMinutes,
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 text-left">
      <form>
        <div className="flex flex-col">
          <div>
            <h2 className="text-xl font-medium text-gray-700">Add Sleep</h2>
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
                ref={sleepStartRef}
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
                ref={sleepEndRef}
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
            <Button color="blue" type="button" onClick={addSleep}>
              <span className="text-white">Add Sleep</span>
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
