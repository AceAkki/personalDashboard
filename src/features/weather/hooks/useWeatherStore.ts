import { create } from "zustand";
import { persist } from "zustand/middleware";

import { weatherKey } from "../../../global/storageKeys";
import type { WeatherData, AQIData } from "../weatherType";

interface WeatherStore {
  weatherStoreData: WeatherData | null;
  updateWeatherData: (data: WeatherData) => void;
  aqiStoreData: AQIData | null;
  updateAQIData: (data: AQIData) => void;
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
    }),
    {
      name: weatherKey,
    },
  ),
);
