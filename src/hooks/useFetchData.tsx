import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery, useQueries } from "@tanstack/react-query";

import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";
import { userKey } from "../global/storageKeys";
import type { WeatherData, AQIData } from "../features/weather/weatherType";

// to get products data
const useFetchData = () => {
  let { state } = JSON.parse(localStorage.getItem(userKey) as string);
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
  function getFinalData() {
    if (!hasLocalWeatherData && !hasLocalAQIData) {
      if (!hasLocalWeatherData) {
        const { data, isLoading } = useQuery({
          ...dashboardQueries.getWeatherData({
            latitude: state.location.latitude,
            longitude: state.location.longitude,
          }),
          enabled: !hasLocalWeatherData,
        });
        updateWeatherData(data as WeatherData);
      }
      if (!hasLocalAQIData) {
        const { data, isLoading } = useQuery({
          ...dashboardQueries.getAQIData({
            latitude: state.location.latitude,
            longitude: state.location.longitude,
          }),
          enabled: !hasLocalAQIData,
        });
        updateAQIData(data as AQIData);
      }
    }
  }

  useEffect(() => {
    getFinalData();
  }, [hasLocalWeatherData, hasLocalAQIData]);
};

export default useFetchData;
