import moment from "moment";
import { TrashIcon } from "@heroicons/react/24/outline";
import { api } from "~/utils/api";

interface Props {
  nap: Nap;
}

export default function Nap({ nap }: Props) {
  const deleteNap = api.nap.deleteNap.useMutation();

  const napStart = moment(nap.start).format("h:mm a");
  const napEnd = moment(nap.end).format("h:mm a");

  const deleteNapHandler = () => {
    deleteNap.mutate({ nap_id: nap.id });
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
        <a
          href="#"
          className="text-red-600 hover:text-red-500"
          onClick={deleteNapHandler}
        >
          <TrashIcon className="h-5 w-5" aria-hidden="true" />
          <span className="sr-only"></span>
        </a>
      </td>
    </tr>
  );
}
