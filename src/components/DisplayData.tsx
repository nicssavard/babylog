import ListSleep from "./ListSleep";
import { api } from "~/utils/api";
import SleepDurationByBedTimeChart from "./charts/SleepDurationByBedTimeChart";

export default function DisplayData() {
  return (
    <div>
      <SleepDurationByBedTimeChart />
    </div>
  );
}
