import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { linkObject } from "../linkTypes";

interface useLinkStore {
  links: linkObject[];
  deleteLink: (link: string) => void;
  updateLinks: (link: linkObject) => void;
  clearAllLinks: () => void;
}

const linksKey = "links-storage";

export const useLinkStore = create<useLinkStore>()(
  persist(
    (set) => ({
      links: [],
      deleteLink: (link) =>
        set((state) => ({
          links: state.links.filter((linkObj) => linkObj.link !== link),
        })),
      updateLinks: (link) =>
        set((state) => ({ links: [...state.links, link] })),
      clearAllLinks: () => {
        set({ links: [] });
        localStorage.removeItem(linksKey);
      },
    }),
    { name: linksKey }, // localStorage key)
  ),
);
