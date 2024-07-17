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
  points: 0,
  tank: 10000,
  remain: 10000,
  taps: 2,
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
