import Image from "next/image";

interface Props {
  baby: Baby;
  selectBaby: (baby: Baby) => void;
  selectedBaby?: Baby;
}

export default function Baby({ baby, selectBaby, selectedBaby }: Props) {
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    ? process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    : "default-bucket-name";

  const imageSize = selectedBaby?.id === baby.id ? "h-16 w-16" : "h-8 w-8 mx-4";
  return (
    <div
      className="flex cursor-pointer items-center hover:opacity-90"
      onClick={() => selectBaby(baby)}
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
}
