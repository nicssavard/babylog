import { Button } from "./Button";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./loading";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  date: string;
  napStart: string;
  napEnd: string;
  milk: string;
};

const defaultValues = {
  date: (() => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  })(),
  napStart: "13:00",
  napEnd: "15:00",
  milk: "0",
};

export default function NewNap() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues });
  const onSubmit: SubmitHandler<Inputs> = (data) => addNap(data);

  const baby = useStore((state) => state.baby);

  const { mutate: newNap, isLoading: isPosting } = api.nap.addNap.useMutation({
    onSuccess: () => {
      toast.success("Nap added!");
      reset(defaultValues);
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to post! Please try again later.");
    },
  });

  const addNap = (data: Inputs) => {
    console.log(data.milk);
    if (!baby) {
      return;
    }
    if (data.napStart >= data.napEnd) {
      toast.error("Nap start must be before nap end!");
      return;
    }
    const napStart = new Date(`${data.date} ${data.napStart}`);
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
    const napEnd = new Date(`${data.date} ${data.napEnd}`);
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
      milk: parseInt(data.milk),
      durationMinutes: sleepDurationMinutes,
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 text-left">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div className="mt-1">
              <input
                {...register("date", { required: true })}
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
                {...register("napStart", { required: true })}
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
                {...register("napEnd", { required: true })}
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
                {...register("milk", { required: true })}
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
              <Button color="blue" type="submit" className="text-xl">
                Add Nap
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
