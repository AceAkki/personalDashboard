import { useRouteLoaderData } from "react-router-dom";
import type { NewsFeedProps, NewsObject } from "../newsTypes";

const useRouteNewsData = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  const successData = {};
  for (let [key, value] of Object.entries(newsData)) {
    let valueData = {};
    for (const [subkey, subValue] of Object.entries(value)) {
      if (subValue.status === "ok") {
        Object.defineProperty(valueData, subkey, {
          value: subValue.items,
          enumerable: true,
          writable: true,
        });
      }
    }
    Object.defineProperty(successData, key, {
      value: valueData,
      enumerable: true,
      writable: true,
    });
  }
  // const successDataArr = newsData.filter((news) => news.status === "ok");
  // const newsArr = successDataArr.map((news) => news.items).flat();

  const newsArr = Object.values(successData)
    .map((objValue) => Object.values(objValue as NewsObject).flat())
    .flat();

  return { successData, newsArr };
};

export default useRouteNewsData;
