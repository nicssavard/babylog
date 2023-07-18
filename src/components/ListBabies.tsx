import { api } from "~/utils/api";
import Baby from "./Baby";

export default function ListBabies() {
  const babies = api.baby.getBabies.useQuery();

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
