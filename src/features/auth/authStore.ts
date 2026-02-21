import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { userType } from "../mainTypes";

const initialState: userType = {
  username: "",
  location: { latitude: 0, longitude: 0 },
};

interface UserStore extends userType {
  updateUser: (name: string, latitude: number, longitude: number) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,
      updateUser: (name, latitude, longitude) =>
        set(() => ({
          username: name,
          location: {
            latitude: latitude,
            longitude: longitude,
          },
        })),
      clearUser: () => set(initialState),
    }),
    { name: "user-storage" }, // localStorage key)
  ),
);
