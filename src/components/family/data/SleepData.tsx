import { Button } from "../../display/Button";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import { toast } from "react-hot-toast";
import { LoadingSpinner } from "../../display/loading";
import { TrashIcon } from "@heroicons/react/24/outline";
import moment from "moment";

export default function SleepData() {
  const baby = useStore((state) => state.baby);
  const setContent = useStore((state) => state.setContent);

  const { data: sleep } = api.sleep.getSleepByBaby.useQuery({
    baby_id: baby?.id || "",
  });

  const addSleep = (content: string) => {
    setContent(content);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Sleep
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the sleep nights for {baby?.name}.
          </p>
        </div>
        <div
          className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
          onClick={() => addSleep("Night")}
        >
          <Button color="blue" type="button">
            <span className="text-white">Add</span>
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Bed Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Wake Up Time
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Milk (ml)
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sleep?.map((sleep) => (
                  <Sleep key={sleep.id} sleep={sleep} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface SleepProps {
  sleep: Sleep;
}

const Sleep = ({ sleep }: SleepProps) => {
  const ctx = api.useContext();

  const { mutate: deleteSleep, isLoading: isDeleting } =
    api.sleep.deleteSleep.useMutation({
      onSuccess: () => {
        toast.success("Sleep deleted!");
        void ctx.sleep.getSleepByBaby.invalidate();
      },
      onError: (e) => {
        console.log(e);
        toast.error("Failed to delete sleep! Please try again later.");
      },
    });

  const sleepStart = moment(sleep.start).utc().format("h:mm a");
  const sleepEnd = moment(sleep.end).utc().format("h:mm a");

  const deleteSleepHandler = () => {
    deleteSleep({ sleep_id: sleep.id });
  };
  return (
    <tr key={sleep.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        {moment(sleep.start).format("MM/D/YYYY")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {sleepStart}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {sleepEnd}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {sleep.milk}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        {!isDeleting ? (
          <a
            href="#"
            className="text-red-600 hover:text-red-500"
            onClick={deleteSleepHandler}
          >
            <TrashIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        ) : (
          <LoadingSpinner color="fill-red-600 text-red-300" />
        )}
      </td>
    </tr>
  );
};
