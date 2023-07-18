import { Container } from "@/components/Container";
import { Button } from "./Button";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BabyModal from "./BabyModal";
import { useState } from "react";
import ListBabies from "./ListBabies";

export default function Babies() {
  const [babyModal, setBabyModal] = useState(false);

  return (
    <Container className="mx-auto">
      <div className="mx-auto flex flex-row justify-center">
        <ListBabies />
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
