import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery, useQueries } from "@tanstack/react-query";

import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";
import { userKey } from "../global/storageKeys";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

// to get products data
const useFetchData = () => {
  const storedItem = localStorage.getItem(userKey);
  const state = storedItem ? JSON.parse(storedItem).state : null;
  const location = state?.location;

  let { weatherData, updateWeatherData, aqiData, updateAQIData } = useAPIStore(
    useShallow((state) => ({
      weatherData: state.weatherData,
      updateWeatherData: state.updateWeatherData,
      aqiData: state.aqiData,
      updateAQIData: state.updateAQIData,
    })),
  );
  const hasLocalWeatherData = weatherData !== null;
  const hasLocalAQIData = aqiData !== null;

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

  useEffect(() => {
    if (weatherQuery.data && !hasLocalWeatherData) {
      updateWeatherData(weatherQuery.data as WeatherData);
    }
  }, [weatherQuery.data, hasLocalWeatherData, updateWeatherData]);

  useEffect(() => {
    if (aqiQuery.data && !hasLocalAQIData) {
      updateAQIData(aqiQuery.data as AQIData);
    }
  }, [aqiQuery.data, hasLocalAQIData, updateAQIData]);
};
export default useFetchData;
