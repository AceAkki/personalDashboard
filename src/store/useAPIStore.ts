import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

interface APIStore {
  weatherData: WeatherData | null;
  updateWeatherData: (data: WeatherData) => void;
  aqiData: AQIData | null;
  updateAQIData: (data: AQIData) => void;
}

export const useAPIStore = create<APIStore>()(
  persist(
    (set) => ({
      weatherData: null,
      updateWeatherData: (data) =>
        set(() => ({
          weatherData: data,
        })),
      aqiData: null,
      updateAQIData: (data) =>
        set(() => ({
          aqiData: data,
        })),
    }),
    {
      name: "api-key",
    },
  ),
);
