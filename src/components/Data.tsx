import SleepData from "./SleepData";

interface Props {
  baby: Baby;
}

export default function Data({ baby }: Props) {
  return (
    <div>
      <SleepData baby={baby} />
    </div>
  );
}
