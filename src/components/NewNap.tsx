import { Button } from "./Button";
import FormInput from "./FormInput";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "./loading";
import { useForm, SubmitHandler } from "react-hook-form";
import { toUTC, getCurrentDate } from "~/utils/dateUtils";
const DEFAULT_NAP_START = "13:00";
const DEFAULT_NAP_END = "15:00";
const DEFAULT_MILK_AMOUNT = "0";

type Inputs = {
  date: string;
  napStart: string;
  napEnd: string;
  milk: string;
};

const defaultValues = {
  date: getCurrentDate(),
  napStart: DEFAULT_NAP_START,
  napEnd: DEFAULT_NAP_END,
  milk: DEFAULT_MILK_AMOUNT,
};

export default function NewNap() {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues });
  const onSubmit: SubmitHandler<Inputs> = (data) => addNap(data);

  const addNap = (data: Inputs) => {
    if (!baby) {
      toast.error("Please select a baby first!");
      return;
    }
    if (data.napStart >= data.napEnd) {
      toast.error("Nap start must be before nap end!");
      return;
    }
    const napStart = new Date(`${data.date} ${data.napStart}`);
    const utcNapStart = toUTC(napStart);

    const napEnd = new Date(`${data.date} ${data.napEnd}`);
    const utcNapEnd = toUTC(napEnd);

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
            register={register("napStart", { required: true })}
            type="time"
          />
          <FormInput
            label="Wake up time"
            register={register("napEnd", { required: true })}
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
