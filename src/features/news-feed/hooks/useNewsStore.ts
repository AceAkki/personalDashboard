import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewsObject } from "../newsTypes";
import { newsKey } from "../../../global/storageKeys";

interface useNewsStore {
  newsArray: NewsObject[];
  setNewsArray: (newArr: NewsObject[]) => void;
}

export const useNewsStore = create<useNewsStore>()(
  persist(
    (set) => ({
      newsArray: [],
      setNewsArray: (newArr) => set((state) => ({ newsArray: newArr })),
    }),
    { name: newsKey }, // localStorage key)
  ),
);
