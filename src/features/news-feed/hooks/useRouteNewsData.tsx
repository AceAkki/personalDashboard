import { useRouteLoaderData } from "react-router-dom";
import type { NewsFeedProps, NewsSourceData } from "../newsTypes";

const useRouteNewsData = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  console.log(newsData);
  const successData = {};
  for (let [key, value] of Object.entries(newsData) as NewsSourceData) {
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
  console.log(successData);
  const newsArr = Object.values(successData)
    .map((objValue) => Object.values(objValue).flat())
    .flat();
  console.log(newsArr);
  return { successData, newsArr };
};

export default useRouteNewsData;
