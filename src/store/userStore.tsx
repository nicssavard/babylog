import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface BabyState {
  baby?: Baby;
  content: string;
  user?: User;
  setBaby: (baby: Baby) => void;
  setContent: (content: string) => void;
  setUser: (user: User) => void;
}

const useStore = create<BabyState>()(
  devtools(
    (set) => ({
      content: "Night",
      setContent: (content: string) => set(() => ({ content: content })),
      setBaby: (baby: Baby) => set(() => ({ baby: baby })),
      setUser: (user: User) => set(() => ({ user: user })),
    }),
    {
      name: "user-storage",
    }
  )
);

export default useStore;
