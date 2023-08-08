import Babies from "~/components/family/babies/Babies";
import Sidebar from "~/components/family/Sidebar";
import NewSleep from "~/components/family/NewSleep";
import NewNap from "~/components/family/NewNap";
import Data from "~/components/family/data/Data";
import Graphs from "~/components/family/graph/Graphs";
import useStore from "~/store/userStore";
import { Header } from "~/components/header/Header";
import { Container } from "~/components/display/Container";
import SignIn from "./auth/signin";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Family() {
  const { data: sessionData, status } = useSession();
  const baby = useStore((state) => state.baby);
  const content = useStore((state) => state.content);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on initial load
    setIsMobile(window.innerWidth <= 768);

    // Update isMobile state if the window is resized
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (status === "unauthenticated") {
    return <SignIn />;
  }

  if (!baby)
    return (
      <>
        <Header />
        <Container className=" bg-slate-100 px-1  py-2">
          <div className=" flex flex-col md:flex-row ">
            {!isMobile && <Sidebar />}

            <div className=" flex w-full flex-col items-center rounded-lg bg-white shadow-lg">
              <div className="flex min-w-full flex-row">
                <div className="flex flex-row justify-start">
                  {isMobile && <Sidebar />}
                </div>
                <Babies />
              </div>

              <div className="my-20 text-4xl"> Select a baby</div>
            </div>
          </div>
        </Container>
      </>
    );
  return (
    <>
      <Header />
      <Container className=" bg-slate-100  py-2">
        <div className=" flex flex-col md:flex-row ">
          {!isMobile && <Sidebar />}

          <div className=" flex w-full flex-col items-center rounded-lg bg-white shadow-lg">
            <div className="flex min-w-full flex-row">
              <div className="flex flex-row justify-start">
                {isMobile && <Sidebar />}
              </div>
              <Babies />
            </div>

            {content === "Night" && <NewSleep />}
            {content === "Nap" && <NewNap />}
            {content === "Data" && <Data />}
            {content === "Graph" && <Graphs />}
          </div>
        </div>
      </Container>
    </>
  );
}
{
  /* <div className="flex min-w-full flex-row">
  <div className="flex flex-row justify-start">
    <Sidebar />
  </div>
  <Babies />
</div>; */
}
