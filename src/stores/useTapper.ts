import { create } from "zustand";

type TappingProps = {
  points: number;
  tank: number;
  remain: number;
  taps: number;
  updatePoints: (value: number) => void;
  updateRemain: () => void;
};

export const useTapper = create<TappingProps>((set, get) => ({
  points: 4,
  tank: 2000,
  remain: 2000,
  taps: 5,
  updatePoints: () => {
    set({
      points: get().points + get().taps,
      remain: get().remain - get().taps,
    });
  },
  updateRemain: () => {
    set({
      remain: get().remain < get().tank ? get().remain + 3 : get().tank,
    });
  },
}));