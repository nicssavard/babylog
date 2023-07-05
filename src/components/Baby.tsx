import Image from "next/image";

interface Props {
  baby: {
    name: string;
    birthDate: Date;
    image: string;
  };
}

export default function Baby({ baby }: Props) {
  return (
    <div className="cursor-pointer hover:opacity-90">
      <Image
        className=" mx-4 h-16 w-16 rounded-full"
        src={`https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${baby.image}`}
        alt="My Image"
        width={100}
        height={100}
      />
    </div>
  );
}
