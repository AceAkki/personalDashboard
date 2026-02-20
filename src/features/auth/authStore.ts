import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { UserStore } from "../mainTypes";

const initialState = {
  username: "",
  location: { latitude: 0, longitude: 0 },
  tasksList: {
    current: [],
    priority: [],
    completed: [],
  },
  notesList: [],
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,

      updateUser: (data) =>
        set((state) => ({
          ...state,
          ...data,
        })),

      clearUser: () => set(initialState),
    }),
    {
      name: "user-storage",
    },
  ),
);
