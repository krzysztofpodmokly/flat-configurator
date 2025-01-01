import { create } from "zustand";

type Store = {
  position: number;
  setPosition: (p: number) => void;
};

export const useStore = create<Store>((set) => ({
  position: 0,
  setPosition: (position: number) => set({ position }),
}));
