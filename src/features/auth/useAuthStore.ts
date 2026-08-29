import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { userType } from "../mainTypes";
import { userKey } from "../../global/storageKeys";

const initialState: userType = {
  username: "",
  backgroundURL: "",
  themeType: "light",
  location: { latitude: 0, longitude: 0 },
};

interface UserStore extends userType {
  updateUser: (name: string, latitude: number, longitude: number) => void;
  updateThemeType: () => void;
  updateBackground: (url: string) => void;
  logOutUser: () => void;
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
      updateThemeType: () =>
        set((state) => ({
          themeType: state.themeType === "dark" ? "light" : "dark",
        })),
      updateBackground: (url) => set(() => ({ backgroundURL: url })),
      logOutUser: () => set(initialState),
    }),
    { name: userKey }, // localStorage key)
  ),
);
