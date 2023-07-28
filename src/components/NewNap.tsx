import { useRef, useEffect } from "react";
import { Button } from "./Button";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./loading";

export default function NewNap() {
  const baby = useStore((state) => state.baby);
  const dateRef = useRef<HTMLInputElement>(null);
  const napStartRef = useRef<HTMLInputElement>(null);
  const napEndRef = useRef<HTMLInputElement>(null);
  const milkRef = useRef<HTMLInputElement>(null);

  const {
    mutate: newNap,
    isLoading: isPosting,
    isSuccess,
  } = api.nap.addNap.useMutation({
    onSuccess: () => {
      toast.success("Nap added!");
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to post! Please try again later.");
    },
  });

  useEffect(() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const today = `${year}-${month}-${day}`;

    if (napStartRef.current) {
      napStartRef.current.value = "13:00";
    }
    if (napEndRef.current) {
      napEndRef.current.value = "15:00";
    }
    if (dateRef.current) {
      dateRef.current.value = today;
    }
    if (milkRef.current) {
      milkRef.current.value = "0";
    }
  }, [isSuccess]);

  const addNap = () => {
    if (
      !baby ||
      !napStartRef.current?.value ||
      !napEndRef.current?.value ||
      !dateRef.current?.value
    ) {
      toast.error("Please fill in all fields!");
      return;
    }

    if (napStartRef.current?.value >= napEndRef.current?.value) {
      toast.error("Nap start must be before nap end!");
      return;
    }

    const napStart = new Date(
      `${dateRef.current?.value} ${napStartRef.current?.value}`
    );
    const utcNapStart = new Date(
      Date.UTC(
        napStart.getFullYear(),
        napStart.getMonth(),
        napStart.getDate(),
        napStart.getHours(),
        napStart.getMinutes(),
        napStart.getSeconds()
      )
    );

    const napEnd = new Date(
      `${dateRef.current?.value} ${napEndRef.current?.value}`
    );

    const utcNapEnd = new Date(
      Date.UTC(
        napEnd.getFullYear(),
        napEnd.getMonth(),
        napEnd.getDate(),
        napEnd.getHours(),
        napEnd.getMinutes(),
        napEnd.getSeconds()
      )
    );

    const sleepDurationMinutes =
      (utcNapEnd.getTime() - utcNapStart.getTime()) / 1000 / 60;

    newNap({
      babyId: baby.id,
      napStart: utcNapStart,
      napEnd: utcNapEnd,
      milk: parseInt(milkRef.current?.value || "0"),
      durationMinutes: sleepDurationMinutes,
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 text-left">
      <form>
        <div className="flex flex-col">
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
          <div className="mt-6 flex flex-row justify-center">
            {!isPosting ? (
              <Button
                color="blue"
                type="button"
                className="text-xl"
                onClick={addNap}
              >
                <span className="text-white">Add Nap</span>
              </Button>
            ) : (
              <LoadingSpinner size={30} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
