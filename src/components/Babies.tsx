import { Container } from "@/components/Container";
import { Button } from "./Button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BabyModal from "./BabyModal";
import { useState } from "react";
import ListBabies from "./ListBabies";

interface BabiesProps {
  selectBaby: (baby: Baby) => void;
}
export default function Babies({ selectBaby }: BabiesProps) {
  const [babyModal, setBabyModal] = useState(false);

  return (
    <Container className="mx-auto">
      <div className="mx-auto flex flex-row justify-center">
        <ListBabies selectBaby={selectBaby} />
        <Button
          onClick={() => setBabyModal(true)}
          color="blue"
          className="ml-5"
        >
          <PlusCircleIcon className="h-10 w-10 flex-none " aria-hidden="true" />
        </Button>
      </div>

      {babyModal && <BabyModal onClose={() => setBabyModal(false)} />}
    </Container>
  );
}
