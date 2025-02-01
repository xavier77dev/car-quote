import { initialAuto } from "@/constants/autoConstant";
import { Auto } from "@/interfaces";
import { create } from "zustand";

interface AutoStore {
  auto: Auto;
  setAuto: (newAuto: Auto) => void;
}

export const useAutoStore = create<AutoStore>((set) => ({
  auto: initialAuto,
  setAuto: (newAuto) => set({ auto: newAuto }),
}));
