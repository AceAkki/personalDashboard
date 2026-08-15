import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";
import { userKey } from "../global/storageKeys";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

// to get products data
const useFetchData = (): {
  weatherData: WeatherData | null;
  aqiData: AQIData | null;
} => {
  const storedItem = localStorage.getItem(userKey);
  const state = storedItem ? JSON.parse(storedItem).state : null;
  const location = state?.location;
  let finalData: { weatherData: WeatherData | null; aqiData: AQIData | null } =
    {
      weatherData: null,
      aqiData: null,
    };

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

  // either from local or fetch data
  const weatherQuery = useQuery({
    ...dashboardQueries.getWeatherData({
      latitude: location?.latitude,
      longitude: location?.longitude,
    }),
    enabled: !hasLocalWeatherData && !!location,
  });

  const aqiQuery = useQuery({
    ...dashboardQueries.getAQIData({
      latitude: location?.latitude,
      longitude: location?.longitude,
    }),
    enabled: !hasLocalAQIData && !!location,
  });

  !hasLocalWeatherData
    ? (finalData.weatherData = weatherQuery.data as WeatherData)
    : (finalData.weatherData = weatherStoreData);
  !hasLocalAQIData
    ? (finalData.aqiData = aqiQuery.data as AQIData)
    : (finalData.aqiData = aqiStoreData);

  useEffect(() => {
    if (weatherQuery.data && !hasLocalWeatherData) {
      updateWeatherData(weatherQuery.data as WeatherData);
    }
    if (aqiQuery.data && !hasLocalAQIData) {
      updateAQIData(aqiQuery.data as AQIData);
    }
  }, [hasLocalWeatherData, hasLocalAQIData]);

  return finalData;
};
export default useFetchData;
