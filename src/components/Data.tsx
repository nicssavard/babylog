import SleepData from "./SleepData";
import NapData from "./NapData";

interface Props {
  baby: Baby;
  setContent: (content: string) => void;
}

export default function Data({ baby, setContent }: Props) {
  return (
    <div className="my-8">
      <div>
        <SleepData baby={baby} setContent={setContent} />
      </div>
      <div className="mt-10 border-t-2 pt-4">
        <NapData baby={baby} setContent={setContent} />
      </div>
    </div>
  );
}
