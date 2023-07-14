import ListSleep from "./ListSleep";
import { api } from "~/utils/api";
import { useState, useEffect } from "react";

export default function DisplayData() {
  //const [sleeps, setSleeps] = useState<Sleep[]>([]);
  const { data: sleep } = api.sleep.getSleeps.useQuery();
  if (sleep) {
    //setSleeps(sleep);
  }
  console.log(sleep);
  useEffect(() => {
    // const { data: sleep } = api.sleep.getSleeps.useQuery();
    // console.log(sleep);
  }, []);
  //const { data: sleeps } = api.sleep.getSleeps.useQuery();

  return (
    <div>
      <h1>display data</h1>
      {sleep && <ListSleep sleeps={sleep} />}
    </div>
  );
}
