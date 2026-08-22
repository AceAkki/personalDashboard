// import { useEffect } from "react";
// import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useUserStore } from "../../auth/useAuthStore.ts";
// import { useWeatherStore } from "./useWeatherStore.ts";
import { dashboardQueries } from "../services/queries.ts";

// import type { WeatherData, AQIData } from "../weatherType";

// to get products data
const useFetchWeatherData = () => {
  let { latitude, longitude } = useUserStore((state) => state.location);

  // let { weatherStoreData, updateWeatherData, aqiStoreData, updateAQIData } =
  //   useWeatherStore(
  //     useShallow((state) => ({
  //       weatherStoreData: state.weatherStoreData,
  //       updateWeatherData: state.updateWeatherData,
  //       aqiStoreData: state.aqiStoreData,
  //       updateAQIData: state.updateAQIData,
  //     })),
  //   );
  // const hasLocalWeatherData = weatherStoreData !== null;
  // const hasLocalAQIData = aqiStoreData !== null;

  // either from local or fetch data
  const weatherQuery = useQuery({
    ...dashboardQueries.getWeatherData({
      latitude: latitude,
      longitude: longitude,
    }),
    // enabled: !hasLocalWeatherData,
  });

  const aqiQuery = useQuery({
    ...dashboardQueries.getAQIData({
      latitude: latitude,
      longitude: longitude,
    }),
    // enabled: !hasLocalAQIData,
  });

  // useEffect(() => {
  //   if (weatherQuery.data) {
  //     updateWeatherData(weatherQuery.data as WeatherData);
  //   }
  // }, [weatherQuery.data, updateWeatherData]);

  // useEffect(() => {
  //   if (aqiQuery.data) {
  //     updateAQIData(aqiQuery.data as AQIData);
  //   }
  // }, [aqiQuery.data, updateAQIData]);

  // const dataConfig = !hasLocalWeatherData && !hasLocalAQIData ? { weatherData: weatherQuery.data, aqiData: aqiQuery.data,}: {weatherData: weatherStoreData,aqiData: aqiStoreData,};

  return {
    weatherData: weatherQuery.data,
    aqiData: aqiQuery.data,
    weatherQueryLoading: weatherQuery.isLoading,
    apiQueryLoading: aqiQuery.isLoading,
  };
};
export default useFetchWeatherData;
