import Image from "next/image";
import BabyLogo from "../../images/babyLogo.png";
interface Props {
  logoSize: number;
  textSize: string;
}

export function Logo({ logoSize, textSize }: Props) {
  return (
    <div className="flex flex-row">
      <h1 className={`${textSize} font-bold text-slate-900`}>
        <span className="text-blue-600">Baby</span>Sleep
      </h1>
      <Image src={BabyLogo} width={logoSize} height={logoSize} alt="logo" />
    </div>
  );
}
