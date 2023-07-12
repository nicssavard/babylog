import NewSleep from "./NewSleep";

interface Props {
  baby: Baby;
}
export default function NewData({ baby }: Props) {
  return (
    <div className="">
      <NewSleep baby={baby} />
    </div>
  );
}
