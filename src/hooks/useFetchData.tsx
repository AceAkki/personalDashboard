import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useAPIStore } from "../store/useAPIStore.ts";
import { dashboardQueries } from "../services/queries";
import { userKey } from "../global/storageKeys";

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

  let queryConfig = hasLocalWeatherData ?  dashboardQueries.getWeatherData({latitude:state.location.latitude, longitude:state.location.longitude})

  // using tanstack query for fetching data over loaderData
  const { data, isLoading } = useQuery({
    ...queryConfig,
    enabled: !hasLocalWeatherData,
  });

  
  // either from local or fetch data
  function getFinalData() {
    if (!hasLocalData) return data;
  }

  const finalData = getFinalData();

//   useEffect(() => {
//     if (data && !hasLocalData && category === undefined && id === undefined) {
//       updateProductsData(data);
//     }
//   }, [data, hasLocalData]);

  return {
    finalData,
    isLoading,
  };
};

export default useFetchData;