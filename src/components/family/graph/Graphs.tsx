import SleepDurationByBedTimeChart from "./charts/SleepDurationByBedTimeChart";
import SleepDurationByDate from "./charts/SleepDurationByDate";

export default function Graphs() {
  return (
    <div className=" mx-8 flex w-full flex-col md:w-3/4">
      <div className="mb-10 mt-10">
        <SleepDurationByBedTimeChart />
      </div>
      <div className="mb-10 border-t-2 pt-5">
        <SleepDurationByDate />
      </div>
    </div>
  );
}
