import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

interface APIStore {
  weatherStoreData: WeatherData | null;
  updateWeatherData: (data: WeatherData) => void;
  aqiStoreData: AQIData | null;
  updateAQIData: (data: AQIData) => void;
}

export const useAPIStore = create<APIStore>()(
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
      name: "api-key",
    },
  ),
);
