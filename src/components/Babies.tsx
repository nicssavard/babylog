import { Container } from "@/components/Container";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import BabyModal from "./BabyModal";
import { useState } from "react";
import ListBabies from "./ListBabies";
import useStore from "~/store/userStore";

export default function Babies() {
  const user = useStore((state) => state.user);
  const [babyModal, setBabyModal] = useState(false);

  return (
    <Container className="mx-auto">
      <div className="mx-auto flex flex-row justify-center">
        {user && <ListBabies userId={user?.id} />}
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
