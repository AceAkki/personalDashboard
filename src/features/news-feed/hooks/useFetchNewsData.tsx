import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

import { useNewsStore } from "./useNewsStore";

import fetchNews from "../utils/fetchNews";
import type { NewsObject, NewsSourceData } from "../newsTypes";
import { getNewTime } from "../../../global/globalFunctions";

const useFetchNewsData = () => {
  let garbageCollectionTime = 1 * 60 * 60 * 1000;
  let { newsStoreData, updateNewsStoreData, storageTime, updateStorageTime } =
    useNewsStore(
      useShallow((state) => ({
        newsStoreData: state.newsStoreData,
        updateNewsStoreData: state.updateNewsStoreData,
        storageTime: state.storageTime,
        updateStorageTime: state.updateStorageTime,
      })),
    );

  // checks if local data exists or not
  const hasLocalNewsData =
    newsStoreData !== null &&
    storageTime !== null &&
    storageTime > getNewTime();

  // runs query depending on if it exists or not
  const newsQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNews(),
    staleTime: 5 * 60 * 1000,
    gcTime: garbageCollectionTime,
    enabled: !hasLocalNewsData,
  });

  // console.log(hasLocalNewsData, new Date(storageTime), new Date(getNewTime()));
  useEffect(() => {
    if (newsQuery.data) {
      updateNewsStoreData(newsQuery.data as NewsSourceData);
      updateStorageTime(getNewTime(garbageCollectionTime));
    }
  }, [newsQuery.data, updateNewsStoreData, updateStorageTime]);

  const newsData = !hasLocalNewsData ? newsQuery.data : newsStoreData;

  /* Kept Older Code
  // const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  // const successData = {};
  // for (let [key, value] of Object.entries(newsData)) {
  //   let valueData = {};
  //   for (const [subkey, subValue] of Object.entries(value)) {
  //     if (subValue.status === "ok") {
  //       Object.defineProperty(valueData, subkey, {
  //         value: subValue.items,
  //         enumerable: true,
  //         writable: true,
  //       });
  //     }
  //   }
  //   Object.defineProperty(successData, key, {
  //     value: valueData,
  //     enumerable: true,
  //     writable: true,
  //   });
  // }

  */

  if (newsData !== undefined) {
    const successData = Object.fromEntries(
      Object.entries(newsData).map(([key, value]) => [
        key as keyof NewsSourceData,
        Object.fromEntries(
          Object.entries(value)
            .filter(([_, subValue]) => subValue.status === "ok")
            .map(([subKey, subValue]) => [subKey, subValue.items]),
        ),
      ]),
    );
    const newsArr: NewsObject[] = Object.values(successData).flatMap(
      (objValue) => Object.values(objValue).flat(),
    );

    return {
      successData: successData,
      newsArr: newsArr,
      loadingStatus: newsQuery.isLoading,
    };
  } else {
    return { loadingStatus: newsQuery.isLoading };
  }
};

export default useFetchNewsData;
