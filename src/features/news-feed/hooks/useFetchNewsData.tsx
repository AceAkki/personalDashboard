// import { useEffect } from "react";
// import { useShallow } from "zustand/shallow";
import { useQuery } from "@tanstack/react-query";

// import { useNewsStore } from "./useNewsStore";

import fetchNews from "../utils/fetchNews";
import type { NewsObject, NewsSourceData } from "../newsTypes";

const useFetchNewsData = () => {
  // let { newsStoreData, updateNewsStoreData } = useNewsStore(
  //   useShallow((state) => ({
  //     newsStoreData: state.newsStoreData,
  //     updateNewsStoreData: state.updateNewsStoreData,
  //   })),
  // );

  // checks if local data exists or not
  // const hasLocalNewsData = newsStoreData !== null;

  // runs query depending on if it exists or not
  const newsQuery = useQuery({
    queryKey: ["news"],
    queryFn: () => fetchNews(),
    staleTime: 5 * 60 * 1000,
    gcTime: 1 * 60 * 60 * 1000,
    // enabled: !hasLocalNewsData,
  });

  // useEffect(() => {
  //   if (newsQuery.data) {
  //     updateNewsStoreData(newsQuery.data as NewsSourceData);
  //   }
  // }, [newsQuery.data, updateNewsStoreData]);

  // const newsData = !hasLocalNewsData ? newsQuery.data : newsStoreData;

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

  if (newsQuery.data !== undefined) {
    const successData = Object.fromEntries(
      Object.entries(newsQuery.data).map(([key, value]) => [
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
