import { Button } from "../../display/Button";
import { api } from "~/utils/api";
import useStore from "~/store/userStore";
import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/outline";
import { LoadingSpinner } from "../../display/loading";
import { toast } from "react-hot-toast";

export default function NapData() {
  const baby = useStore((state) => state.baby);
  const setContent = useStore((state) => state.setContent);
  const { data: naps } = api.nap.getNapByBaby.useQuery({
    baby_id: baby?.id || "",
  });

  const addNap = (content: string) => {
    setContent(content);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Nap
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the naps for {baby?.name}.
          </p>
        </div>
        <div
          className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none"
          onClick={() => addNap("Nap")}
        >
          <Button color="blue" type="button">
            <span className="text-white">Add</span>
          </Button>
          {/* <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add sleep
          </button> */}
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
                {naps?.map((nap) => (
                  <Nap key={nap.id} nap={nap} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

interface NapProps {
  nap: Nap;
}

const Nap = ({ nap }: NapProps) => {
  const ctx = api.useContext();

  const { mutate: deleteNap, isLoading: isDeleting } =
    api.nap.deleteNap.useMutation({
      onSuccess: () => {
        toast.success("Nap deleted!");
        void ctx.nap.getNapByBaby.invalidate();
      },
      onError: (e) => {
        console.log(e);
        toast.error("Failed to delete nap! Please try again later.");
      },
    });

  const napStart = moment(nap.start).utc().format("h:mm a");
  const napEnd = moment(nap.end).utc().format("h:mm a");

  const deleteNapHandler = () => {
    deleteNap({ nap_id: nap.id });
  };
  return (
    <tr key={nap.id}>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
        {moment(nap.start).format("MM/D/YYYY")}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {napStart}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {napEnd}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {nap.milk}
      </td>
      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        {!isDeleting ? (
          <a
            href="#"
            className="text-red-600 hover:text-red-500"
            onClick={deleteNapHandler}
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
