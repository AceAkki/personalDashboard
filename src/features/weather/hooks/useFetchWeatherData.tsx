import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "../../auth/useAuthStore.ts";
import { useWeatherStore } from "./useWeatherStore.ts";
import { dashboardQueries } from "../services/queries.ts";
import { getNewTime } from "../../../global/globalFunctions";

import type { WeatherData, AQIData } from "../weatherType";
// to get products data
const useFetchWeatherData = () => {
  let garbageCollectionTime = 24 * 60 * 60 * 1000;
  let { latitude, longitude } = useUserStore((state) => state.location);

  let {
    weatherStoreData,
    updateWeatherData,
    aqiStoreData,
    updateAQIData,
    storageTime,
    updateStorageTime,
  } = useWeatherStore(
    useShallow((state) => ({
      weatherStoreData: state.weatherStoreData,
      updateWeatherData: state.updateWeatherData,
      aqiStoreData: state.aqiStoreData,
      updateAQIData: state.updateAQIData,
      storageTime: state.storageTime,
      updateStorageTime: state.updateStorageTime,
    })),
  );
  const hasLocalWeatherData =
    weatherStoreData !== null &&
    storageTime !== null &&
    storageTime > getNewTime();
  const hasLocalAQIData =
    aqiStoreData !== null && storageTime !== null && storageTime > getNewTime();

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
    if (weatherQuery.data && !hasLocalWeatherData) {
      updateWeatherData(weatherQuery.data as WeatherData);
      updateStorageTime(getNewTime(garbageCollectionTime));
    }
  }, [
    weatherQuery.data,
    updateWeatherData,
    hasLocalWeatherData,
    updateStorageTime,
  ]);

  useEffect(() => {
    if (aqiQuery.data && !hasLocalAQIData) {
      updateAQIData(aqiQuery.data as AQIData);
      updateStorageTime(getNewTime(garbageCollectionTime));
    }
  }, [aqiQuery.data, updateAQIData, hasLocalAQIData, updateStorageTime]);

  const dataConfig =
    !hasLocalWeatherData && !hasLocalAQIData
      ? { weatherData: weatherQuery.data, aqiData: aqiQuery.data }
      : { weatherData: weatherStoreData, aqiData: aqiStoreData };

  return {
    ...dataConfig,
    weatherQueryLoading: weatherQuery.isLoading,
    apiQueryLoading: aqiQuery.isLoading,
    storageTime: storageTime,
  };
};
export default useFetchWeatherData;
