import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewsObject, NewsSourceData } from "../newsTypes";
import { newsKey } from "../../../global/storageKeys";

interface useNewsStore {
  newsStoreData: NewsSourceData | null;
  updateNewsStoreData: (data: NewsSourceData) => void;
  storageTime: number | null;
  updateStorageTime: (time: number) => void;
  currentArrayName: string;
  updateCurrentArrayName: (name: string) => void;
  newsArray: NewsObject[];
  setNewsArray: (newArr: NewsObject[]) => void;
}

export const useNewsStore = create<useNewsStore>()(
  persist(
    (set) => ({
      newsStoreData: null,
      updateNewsStoreData: (data) =>
        set(() => ({
          newsStoreData: data,
        })),
      storageTime: null,
      updateStorageTime: (time) => set(() => ({ storageTime: time })),
      currentArrayName: "All",
      updateCurrentArrayName: (name) => set(() => ({ currentArrayName: name })),
      newsArray: [],
      setNewsArray: (newArr) => set(() => ({ newsArray: newArr })),
    }),
    { name: newsKey }, // localStorage key)
  ),
);
