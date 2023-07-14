import { Container } from "@/components/Container";
import { Button } from "./Button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BabyModal from "./BabyModal";
import { useState } from "react";
import ListBabies from "./ListBabies";

interface BabiesProps {
  selectBaby: (baby: Baby) => void;
  selectedBaby?: Baby;
}
export default function Babies({ selectBaby, selectedBaby }: BabiesProps) {
  const [babyModal, setBabyModal] = useState(false);

  return (
    <Container className="mx-auto">
      <div className="mx-auto flex flex-row justify-center">
        <ListBabies selectBaby={selectBaby} selectedBaby={selectedBaby} />
        <div
          onClick={() => setBabyModal(true)}
          color="blue"
          className="ml-5 flex cursor-pointer items-center"
        >
          <PlusCircleIcon
            className="h-10 w-10 flex-none text-blue-600 hover:text-blue-500"
            aria-hidden="true"
          />
        </div>
      </div>

      {babyModal && <BabyModal onClose={() => setBabyModal(false)} />}
    </Container>
  );
}
