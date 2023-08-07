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

export default function Family() {
  const { data: sessionData, status } = useSession();
  const baby = useStore((state) => state.baby);
  const content = useStore((state) => state.content);

  if (status === "unauthenticated") {
    return <SignIn />;
  }

  if (!baby)
    return (
      <>
        <Header />
        <Container>
          <div className="flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex w-full flex-col items-center">
              <Babies />
              <div className="mt-10 text-2xl"> Select a baby</div>
            </div>
          </div>
        </Container>
      </>
    );
  return (
    <>
      <Header />
      <Container>
        <div className=" flex flex-col md:flex-row ">
          <Sidebar />
          <div className="flex w-full flex-col items-center">
            <Babies />
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
