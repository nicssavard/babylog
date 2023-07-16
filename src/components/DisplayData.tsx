import ListSleep from "./ListSleep";
import { api } from "~/utils/api";
import SleepDurationByBedTimeChart from "./charts/SleepDurationByBedTimeChart";

interface Props {
  selectedBaby?: Baby;
}
export default function DisplayData({ selectedBaby }: Props) {
  return (
    <div>
      {selectedBaby && (
        <SleepDurationByBedTimeChart selectedBaby={selectedBaby} />
      )}
    </div>
  );
}
