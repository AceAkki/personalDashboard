import { queryOptions } from "@tanstack/react-query";
import { getWeather, getAQI } from "../features/weather/utils/getWeather";
import type { location } from "../features/mainTypes";

export const dashboardQueries = {
  getWeatherData: ({ latitude, longitude }: location) =>
    queryOptions({
      queryKey: ["weather"] as string[],
      queryFn: () => getWeather({ latitude: latitude, longitude: longitude }),
      staleTime: Infinity,
      gcTime: 10,
    }),
  getAQIData: ({ latitude, longitude }: location) =>
    queryOptions({
      queryKey: ["AQI"] as string[],
      queryFn: () => getAQI({ latitude: latitude, longitude: longitude }),
      staleTime: Infinity,
      gcTime: 10,
    }),
};
