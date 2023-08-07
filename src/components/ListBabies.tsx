import { api } from "~/utils/api";
import Baby from "./Baby";
import useStore from "~/store/userStore";

interface Props {
  userId: string;
}
export default function ListBabies({ userId }: Props) {
  const baby = useStore((state) => state.baby);
  const babies = api.baby.getBabiesByUser.useQuery({
    userId: userId,
  });

  return (
    <div className="flex flex-row align-middle">
      {babies.data?.map((baby: Baby) => (
        <Baby
          key={baby.id}
          baby={{
            ...baby,
            image: baby.image ?? "default-image-url",
          }}
        />
      ))}
    </div>
  );
}
