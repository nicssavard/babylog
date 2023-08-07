import SleepData from "./SleepData";
import NapData from "./NapData";

export default function Data() {
  return (
    <div className="my-8">
      <div>
        <SleepData />
      </div>
      <div className="mt-10 border-t-2 pt-4">
        <NapData />
      </div>
    </div>
  );
}
