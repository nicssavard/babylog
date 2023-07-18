import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface BabyState {
  baby?: Baby;
  content: string;
  setBaby: (baby: Baby) => void;
  setContent: (content: string) => void;
}

const useStore = create<BabyState>()(
  devtools(
    (set) => ({
      content: "Night",
      setContent: (content: string) => set(() => ({ content: content })),
      setBaby: (baby: Baby) => set(() => ({ baby: baby })),
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
