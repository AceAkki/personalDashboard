import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQueries } from "@tanstack/react-query";

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

  // using tanstack query for fetching data over loaderData
  //   const { data, isLoading } = useQuery({
  //     ...queryConfig,
  //     enabled: !hasLocalWeatherData,
  //   });

  const results = useQueries({
    queries: [
      {
        ...dashboardQueries.getWeatherData({
          latitude: state.location.latitude,
          longitude: state.location.longitude,
        }),
        enabled: !hasLocalWeatherData,
      },
      {
        ...dashboardQueries.getAQIData({
          latitude: state.location.latitude,
          longitude: state.location.longitude,
        }),
        enabled: !hasLocalAQIData,
      },
    ],
  });

  // either from local or fetch data
  function getFinalData() {
    if (!hasLocalWeatherData && !hasLocalAQIData)
      return { weatherAPIData: results[0].data, aqiAPIData: results[1].data };
    return { weatherAPIData: weatherData, aqiAPIData: aqiData };
  }

  const finalData = getFinalData();

  useEffect(() => {
    if (results && !hasLocalWeatherData && !hasLocalAQIData) {
      updateWeatherData(results[0].data as WeatherData);
      updateAQIData(results[1].data as AQIData);
    }
  }, [
    results[0].status,
    results[0].data,
    results[1].status,
    results[1].data,
    hasLocalWeatherData,
    hasLocalAQIData,
  ]);

  return {
    finalData,
  };
};

export default useFetchData;
