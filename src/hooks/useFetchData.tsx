import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQueries } from "@tanstack/react-query";

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
      return { weatherAPIData: results[0], aqiAPIData: results[1] };
  }

  const finalData = getFinalData();

  //   useEffect(() => {
  //     if (data && !hasLocalData && category === undefined && id === undefined) {
  //       updateProductsData(data);
  //     }
  //   }, [data, hasLocalData]);

  return {
    finalData,
  };
};

export default useFetchData;
