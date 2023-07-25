import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

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

// import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

// interface BabyState {
//   baby?: Baby;
//   content: string;
//   setBaby: (baby: Baby) => void;
//   setContent: (content: string) => void;
//   reset: () => void;
// }

// const initialState: Omit<BabyState, "setBaby" | "setContent" | "reset"> = {
//   baby: undefined,
//   content: "Night",
// };

// const stateCreator = (set) => ({
//   ...initialState,
//   setContent: (content: string) => set({ content }),
//   setBaby: (baby: Baby) => set({ baby }),
//   reset: () => set({ ...initialState }),
// });

// const useStore = create<BabyState>(stateCreator);

// export default useStore;