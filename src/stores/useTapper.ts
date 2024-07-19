import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type TappingProps = {
  points: number;
  tank: number;
  remain: number;
  taps: number;
  updatePoints: (value: number) => void;
  updateRemain: () => void;
};

export const useTapper = create<TappingProps>()(
  persist(
    (set, get) => ({
      points: 1000,
      tank: 1000,
      remain: 1000,
      taps: 1,
      updatePoints: () => {
        set({
          points: get().points + get().taps,
          remain: get().remain - get().taps,
        });
      },
      updateRemain: () => {
        set({
          remain: get().remain < get().tank ? get().remain + 1 : get().tank,
        });
      },
    }), 
    {
      name: "bahman",
      storage:createJSONStorage(()=> localStorage),
    }
  )
);
