import Babies from "~/components/Babies";
import Sidebar from "~/components/Sidebar";
import { useState } from "react";
import NewData from "~/components/NewData";
import DisplayData from "~/components/DisplayData";

export default function Family() {
  const [baby, setBaby] = useState<Baby | null>(null);
  const [content, setContent] = useState("New Data");
  const selectBaby = (baby: Baby) => setBaby(baby);

  return (
    <>
      <div className="mt-8 flex flex-row">
        <Sidebar setContent={setContent} content={content} />
        <div className="flex w-full flex-col items-center">
          <Babies selectBaby={selectBaby} />
          {baby && <div> {baby.name} </div>}
          {content === "New Data" && baby && <NewData baby={baby} />}
          {content === "Display Data" && <DisplayData />}
        </div>
      </div>
    </>
  );
}
