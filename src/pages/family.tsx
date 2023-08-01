import Babies from "~/components/Babies";
import Sidebar from "~/components/Sidebar";
import NewSleep from "~/components/NewSleep";
import NewNap from "~/components/NewNap";
import Data from "~/components/Data";
import DisplayData from "~/components/DisplayData";
import useStore from "~/store/userStore";
import { Header } from "~/components/Header";

export default function Family() {
  const baby = useStore((state) => state.baby);
  const content = useStore((state) => state.content);
  //const [content, setContent] = useState("Night");

  if (!baby)
    return (
      <>
        <Header />
        <div className="mt-8 flex flex-row">
          <Sidebar />
          <div className="flex w-full flex-col items-center">
            <Babies />
            <div className="mt-10 text-2xl"> Select a baby</div>
          </div>
        </div>
      </>
    );
  return (
    <>
      <Header />
      <div className="mt-8 flex flex-row">
        <Sidebar />
        <div className="flex w-full flex-col items-center">
          <Babies />
          {content === "Night" && <NewSleep />}
          {content === "Nap" && <NewNap />}
          {content === "Data" && <Data />}
          {content === "Display Data" && <DisplayData />}
        </div>
      </div>
    </>
  );
}
