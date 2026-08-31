import { create } from "zustand";
import { persist } from "zustand/middleware";

import { weatherKey } from "../../../global/storageKeys";
import type { WeatherData, AQIData } from "../weatherType";

interface WeatherStore {
  weatherStoreData: WeatherData | null;
  updateWeatherData: (data: WeatherData) => void;
  aqiStoreData: AQIData | null;
  updateAQIData: (data: AQIData) => void;
  weatherStorageTime: number | null;
  updateWeatherStorageTime: (time: number) => void;
  aqiStorageTime: number | null;
  updateAQIStorageTime: (time: number) => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      weatherStoreData: null,
      updateWeatherData: (data) =>
        set(() => ({
          weatherStoreData: data,
        })),
      aqiStoreData: null,
      updateAQIData: (data) =>
        set(() => ({
          aqiStoreData: data,
        })),
      weatherStorageTime: null,
      updateWeatherStorageTime: (time) =>
        set(() => ({ weatherStorageTime: time })),
      aqiStorageTime: null,
      updateAQIStorageTime: (time) => set(() => ({ aqiStorageTime: time })),
    }),
    {
      name: weatherKey,
    },
  ),
);
