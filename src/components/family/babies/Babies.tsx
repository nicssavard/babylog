import { Container } from "~/components/display/Container";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import NewBabyModal from "./NewBabyModal";
import { useState } from "react";
import useStore from "~/store/userStore";
import { api } from "~/utils/api";
import Image from "next/image";

export default function Babies() {
  const user = useStore((state) => state.user);
  const [babyModal, setBabyModal] = useState(false);

  return (
    <Container className="flex-colmx-auto flex h-20 p-2  md:my-2  ">
      <div className="mx-auto flex flex-row justify-center ">
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

      {babyModal && <NewBabyModal onClose={() => setBabyModal(false)} />}
    </Container>
  );
}

interface ListBabiesProps {
  userId: string;
}
const ListBabies = ({ userId }: ListBabiesProps) => {
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
};

interface BabyProps {
  baby: Baby;
}
const Baby = ({ baby }: BabyProps) => {
  const selectedBaby = useStore((state) => state.baby);
  const setBaby = useStore((state) => state.setBaby);

  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    ? process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    : "default-bucket-name";

  const imageSize = selectedBaby?.id === baby.id ? "h-16 w-16" : "h-8 w-8 mx-4";
  return (
    <div
      className="flex cursor-pointer items-center hover:opacity-90"
      onClick={() => setBaby(baby)}
    >
      <Image
        className={`${imageSize}   rounded-full`}
        src={`https://${bucketName}.s3.amazonaws.com/${baby.image}`}
        alt="My Image"
        width={100}
        height={100}
      />
    </div>
  );
};
