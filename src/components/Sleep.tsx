import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";

interface Props {
  sleep: Sleep;
}

export default function Sleep({ sleep }: Props) {
  const deleteSleep = api.sleep.deleteSleep.useMutation();

  const sleepStart = moment(sleep.start).utc().format("h:mm a");
  const sleepEnd = moment(sleep.end).utc().format("h:mm a");

  const deleteSleepHandler = () => {
    deleteSleep.mutate({ sleep_id: sleep.id });
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
        <a
          href="#"
          className="text-red-600 hover:text-red-500"
          onClick={deleteSleepHandler}
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only"></span>
        </a>
      </td>
    </tr>
  );
}
