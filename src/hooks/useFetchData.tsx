import { useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";
import { userKey } from "../global/storageKeys";

import type { WeatherData, AQIData } from "../features/weather/weatherType";
import type { location } from "../features/mainTypes.ts";

// to get products data
const useFetchData = (): {
  weatherData: WeatherData | null;
  aqiData: AQIData | null;
} => {
  let [location, setLocation] = useState<location>({
    longitude: 1,
    latitude: 1,
  });
  const [hasSyncedWeather, setHasSyncedWeather] = useState(false);
  const [hasSyncedAQI, setHasSyncedAQI] = useState(false);

  useEffect(() => {
    const storedItem = localStorage.getItem(userKey);
    const state = storedItem ? JSON.parse(storedItem).state : null;
    setLocation(state?.location);
  }, []);

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

  useEffect(() => {
    if (weatherQuery.data && !hasSyncedWeather) {
      updateWeatherData(weatherQuery.data as WeatherData);
      setHasSyncedWeather(true);
    }
  }, [weatherQuery.data, hasSyncedWeather, updateWeatherData]);

  useEffect(() => {
    if (aqiQuery.data && !hasSyncedAQI) {
      updateAQIData(aqiQuery.data as AQIData);
      setHasSyncedAQI(true);
    }
  }, [aqiQuery.data, hasSyncedAQI, updateAQIData]);

  let finalData = useMemo(
    () => ({
      weatherData: hasLocalWeatherData
        ? weatherStoreData
        : (weatherQuery.data ?? null),
      aqiData: hasLocalAQIData ? aqiStoreData : (aqiQuery.data ?? null),
    }),
    [
      hasLocalWeatherData,
      weatherStoreData,
      weatherQuery.data,
      hasLocalAQIData,
      aqiStoreData,
      aqiQuery.data,
    ],
  );
  console.log(weatherQuery, finalData);
  return finalData;
};
export default useFetchData;
