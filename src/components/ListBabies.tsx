import { api } from "~/utils/api";
import Baby from "./Baby";

interface ListBabiesProps {
  selectBaby: (baby: Baby) => void;
  selectedBaby?: Baby;
}

export default function ListBabies({
  selectBaby,
  selectedBaby,
}: ListBabiesProps) {
  const babies = api.baby.getBabies.useQuery();

  return (
    <div className="flex flex-row align-middle">
      {babies.data?.map((baby: Baby) => (
        <Baby
          selectBaby={selectBaby}
          key={baby.id}
          baby={{
            ...baby,
            image: baby.image ?? "default-image-url",
          }}
          selectedBaby={selectedBaby}
        />
      ))}
    </div>
  );
}
