import Babies from "~/components/Babies";
import Sidebar from "~/components/Sidebar";
import { useState } from "react";
import NewSleep from "~/components/NewSleep";
import NewNap from "~/components/NewNap";
import Data from "~/components/Data";
import DisplayData from "~/components/DisplayData";

export default function Family() {
  const [baby, setBaby] = useState<Baby | undefined>();
  const [content, setContent] = useState("New Data");
  const selectBaby = (baby: Baby) => setBaby(baby);

  return (
    <>
      <div className="mt-8 flex flex-row">
        <Sidebar setContent={setContent} content={content} />
        <div className="flex w-full flex-col items-center">
          <Babies selectBaby={selectBaby} selectedBaby={baby} />
          {content === "Night" && baby && <NewSleep baby={baby} />}
          {content === "Nap" && baby && <NewNap baby={baby} />}
          {content === "Data" && baby && (
            <Data baby={baby} setContent={setContent} />
          )}
          {content === "Display Data" && <DisplayData selectedBaby={baby} />}
        </div>
      </div>
    </>
  );
}
