import Image from "next/image";

interface Props {
  baby: Baby;
  selectBaby: (baby: Baby) => void;
}

export default function Baby({ baby, selectBaby }: Props) {
  const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    ? process.env.NEXT_PUBLIC_AWS_BUCKET_NAME
    : "default-bucket-name";
  return (
    <div
      className="cursor-pointer hover:opacity-90"
      onClick={() => selectBaby(baby)}
    >
      <Image
        className=" mx-4 h-16 w-16 rounded-full"
        src={`https://${bucketName}.s3.amazonaws.com/${baby.image}`}
        alt="My Image"
        width={100}
        height={100}
      />
    </div>
  );
}
