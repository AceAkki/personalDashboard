import { queryOptions } from "@tanstack/react-query";
import { getWeather, getAQI } from "../features/weather/utils/getWeather";
import type { location } from "../features/mainTypes";

export const dashboardQueries = {
  getWeatherData: ({ latitude, longitude }: location) =>
    queryOptions({
      queryKey: ["weather", { latitude, longitude }] as const,
      queryFn: () => getWeather({ latitude: latitude, longitude: longitude }),
      staleTime: 30 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
    }),
  getAQIData: ({ latitude, longitude }: location) =>
    queryOptions({
      queryKey: ["AQI", { latitude, longitude }] as const,
      queryFn: () => getAQI({ latitude: latitude, longitude: longitude }),
      staleTime: 30 * 60 * 1000,
      gcTime: 24 * 60 * 60 * 1000,
    }),
};
