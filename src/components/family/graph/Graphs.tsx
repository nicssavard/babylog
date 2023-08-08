import SleepDurationByBedTimeChart from "./charts/SleepDurationByBedTimeChart";
import SleepDurationByDate from "./charts/SleepDurationByDate";

export default function Graphs() {
  return (
    <div className=" flex w-full flex-col px-2 md:w-3/4">
      <div className="mb-10 mt-5">
        <SleepDurationByBedTimeChart />
      </div>
      <div className="mb-10 border-t-2 pt-10">
        <SleepDurationByDate />
      </div>
    </div>
  );
}
