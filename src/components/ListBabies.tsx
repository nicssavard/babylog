import { api } from "~/utils/api";
import Baby from "./Baby";

interface ListBabiesProps {
  selectBaby: (baby: Baby) => void;
}

export default function ListBabies({ selectBaby }: ListBabiesProps) {
  const babies = api.baby.getBabies.useQuery();

  return (
    <div className="flex flex-row">
      {babies.data?.map((baby: Baby) => (
        <Baby
          selectBaby={selectBaby}
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
