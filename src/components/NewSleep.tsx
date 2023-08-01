import { Button } from "./Button";
import FormInput from "./FormInput";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./loading";
import { useForm, SubmitHandler } from "react-hook-form";
import { toUTC, getCurrentDate } from "~/utils/dateUtils";
const DEFAULT_SLEEP_START = "20:00";
const DEFAULT_SLEEP_END = "07:00";
const DEFAULT_MILK_AMOUNT = "0";

interface FormInputs {
  date: string;
  sleepStart: string;
  sleepEnd: string;
  milk: string;
}

// Set default values for the form inputs
const defaultValues = {
  date: getCurrentDate(),
  sleepStart: DEFAULT_SLEEP_START,
  sleepEnd: DEFAULT_SLEEP_END,
  milk: DEFAULT_MILK_AMOUNT,
};

export default function NewSleep() {
  const baby = useStore((state) => state.baby);

  const { mutate: newSleep, isLoading: isPosting } =
    api.sleep.addSleep.useMutation({
      onSuccess: () => {
        toast.success("Sleep added!");
        reset(defaultValues);
      },
      onError: (e) => {
        console.log(e);
        toast.error("Failed to post! Please try again later.");
      },
    });

  // Initialize form with react-hook-form
  const { register, handleSubmit, reset } = useForm<FormInputs>({
    defaultValues,
  });
  const onSubmit: SubmitHandler<FormInputs> = (data) => addSleep(data);

  const addSleep = (data: FormInputs) => {
    if (!baby) {
      toast.error("Please select a baby first!");
      return;
    }

    // Convert sleep start and end times to UTC to prevent timezone issues
    const sleepStart = new Date(`${data.date} ${data.sleepStart}`);
    const utcSleepStart = toUTC(sleepStart);

    const sleepEnd = new Date(`${data.date} ${data.sleepEnd}`);
    sleepEnd.setDate(sleepEnd.getDate() + 1);
    const utcSleepEnd = toUTC(sleepEnd);

    const sleepDurationMinutes =
      (utcSleepEnd.getTime() - utcSleepStart.getTime()) / 1000 / 60;

    newSleep({
      babyId: baby.id,
      sleepStart: utcSleepStart,
      sleepEnd: utcSleepEnd,
      milk: parseInt(data.milk),
      durationMinutes: sleepDurationMinutes,
    });
  };

  return (
    <div className="rounded-lg bg-white p-10 text-left">
      {/* eslint-disable-next-line */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* above line if not disabled Error: Promise-returning function provided to attribute where a void return was expected.  @typescript-eslint/no-misused-promises */}
        <div className="flex flex-col">
          <FormInput
            label="Date"
            register={register("date", { required: true })}
            type="date"
          />
          <FormInput
            label="Bed time"
            register={register("sleepStart")}
            type="time"
          />
          <FormInput
            label="Wake up time"
            register={register("sleepEnd")}
            type="time"
          />
          <FormInput
            label="Milk (ml)"
            register={register("milk", { required: true })}
            type="number"
            min="0"
            max="500"
            step="5"
          />

          <div className="mt-6 flex flex-row justify-center">
            {!isPosting ? (
              <Button color="blue" type="submit" className="text-xl">
                Add Sleep
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
