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
  let garbageCollectionTime = 2 * 60 * 60 * 1000;
  let { latitude, longitude } = useUserStore((state) => state.location);

  let {
    weatherStoreData,
    updateWeatherData,
    aqiStoreData,
    updateAQIData,
    weatherStorageTime,
    updateWeatherStorageTime,
    aqiStorageTime,
    updateAQIStorageTime,
  } = useWeatherStore(
    useShallow((state) => ({
      weatherStoreData: state.weatherStoreData,
      updateWeatherData: state.updateWeatherData,
      aqiStoreData: state.aqiStoreData,
      updateAQIData: state.updateAQIData,
      weatherStorageTime: state.weatherStorageTime,
      updateWeatherStorageTime: state.updateWeatherStorageTime,
      aqiStorageTime: state.aqiStorageTime,
      updateAQIStorageTime: state.updateAQIStorageTime,
    })),
  );
  const hasLocalWeatherData =
    weatherStoreData !== null &&
    weatherStorageTime !== null &&
    weatherStorageTime > getNewTime();
  const hasLocalAQIData =
    aqiStoreData !== null &&
    aqiStorageTime !== null &&
    aqiStorageTime > getNewTime();

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
      updateWeatherStorageTime(getNewTime(garbageCollectionTime));
    }
  }, [
    weatherQuery.data,
    updateWeatherData,
    hasLocalWeatherData,
    updateWeatherStorageTime,
  ]);

  useEffect(() => {
    if (aqiQuery.data && !hasLocalAQIData) {
      updateAQIData(aqiQuery.data as AQIData);
      updateAQIStorageTime(getNewTime(garbageCollectionTime));
    }
  }, [aqiQuery.data, updateAQIData, hasLocalAQIData, updateAQIStorageTime]);

  const dataConfig =
    !hasLocalWeatherData && !hasLocalAQIData
      ? { weatherData: weatherQuery.data, aqiData: aqiQuery.data }
      : { weatherData: weatherStoreData, aqiData: aqiStoreData };

  console.log(
    weatherStorageTime,
    aqiStorageTime,
    weatherStorageTime > getNewTime(),
  );
  return {
    ...dataConfig,
    weatherQueryLoading: weatherQuery.isLoading,
    aqiQueryLoading: aqiQuery.isLoading,
    storageTime: weatherStorageTime,
  };
};
export default useFetchWeatherData;
