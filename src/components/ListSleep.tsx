import Sleep from "./Sleep";

interface Props {
  sleeps: Sleep[];
}

export default function ListSleep({ sleeps }: Props) {
  return (
    <div className="flex flex-col">
      {sleeps.map((sleep) => (
        <Sleep key={sleep.id} sleep={sleep} />
      ))}
    </div>
  );
}
