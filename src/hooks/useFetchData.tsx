import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "../features/auth/useAuthStore.ts";
import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";

import type { WeatherData, AQIData } from "../features/weather/weatherType";

// to get products data
const useFetchData = (): {
  weatherData: WeatherData;
  aqiData: AQIData;
  weatherQueryLoading: boolean;
  apiQueryLoading: boolean;
} => {
  let { latitude, longitude } = useUserStore((state) => state.location);

  let { weatherStoreData, updateWeatherData, aqiStoreData, updateAQIData } =
    useAPIStore(
      useShallow((state) => ({
        weatherStoreData: state.weatherStoreData,
        updateWeatherData: state.updateWeatherData,
        aqiStoreData: state.aqiStoreData,
        updateAQIData: state.updateAQIData,
      })),
    );
  const hasLocalWeatherData = weatherStoreData !== null;
  const hasLocalAQIData = aqiStoreData !== null;

  console.log("🏪 Store data:", { hasLocalWeatherData, hasLocalAQIData });

  // either from local or fetch data
  const weatherQuery = useQuery({
    ...dashboardQueries.getWeatherData({
      latitude: latitude,
      longitude: longitude,
    }),
    enabled: !hasLocalWeatherData,
  });

  const aqiQuery = useQuery({
    ...dashboardQueries.getAQIData({
      latitude: latitude,
      longitude: longitude,
    }),
    enabled: !hasLocalAQIData,
  });

  useEffect(() => {
    if (weatherQuery.data) {
      updateWeatherData(weatherQuery.data as WeatherData);
    }
  }, [weatherQuery.data, updateWeatherData]);

  useEffect(() => {
    if (aqiQuery.data) {
      updateAQIData(aqiQuery.data as AQIData);
    }
  }, [aqiQuery.data, updateAQIData]);

  const dataConfig =
    !hasLocalWeatherData && !hasLocalAQIData
      ? {
          weatherData: weatherQuery.data,
          aqiData: aqiQuery.data,
        }
      : {
          weatherData: weatherStoreData,
          aqiData: aqiStoreData,
        };

  return {
    ...dataConfig,
    weatherQueryLoading: weatherQuery.isLoading,
    apiQueryLoading: aqiQuery.isLoading,
  };
};
export default useFetchData;
