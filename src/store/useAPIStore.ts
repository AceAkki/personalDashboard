import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

interface APIStore {
  weatherAPIData: WeatherData | null;
  updateWeatherData: (data: WeatherData) => void;
  aqiAPIData: AQIData | null;
  updateAQIData: (data: AQIData) => void;
}

export const useAPIStore = create<APIStore>()(
  persist(
    (set) => ({
      weatherAPIData: null,
      updateWeatherData: (data) =>
        set(() => ({
          weatherAPIData: data,
        })),
      aqiAPIData: null,
      updateAQIData: (data) =>
        set(() => ({
          aqiAPIData: data,
        })),
    }),
    {
      name: "api-key",
    },
  ),
);
