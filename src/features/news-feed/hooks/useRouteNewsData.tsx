import { useRouteLoaderData } from "react-router-dom";
import type { NewsFeedProps, NewsObject } from "../newsTypes";

const useRouteNewsData = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;

  const successData = Object.fromEntries(
    Object.entries(newsData).map(([key, value]) => [
      key,
      Object.fromEntries(
        Object.entries(value)
          .filter(([_, subValue]) => subValue.status === "ok")
          .map(([subKey, subValue]) => [subKey, subValue.items]),
      ),
    ]),
  );
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

  const newsArr = Object.values(successData).flatMap((objValue) =>
    Object.values(objValue as NewsObject).flat(),
  );

  return { successData, newsArr };
};

export default useRouteNewsData;
