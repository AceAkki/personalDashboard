import { useRouteLoaderData } from "react-router-dom";
import type { NewsFeedProps } from "../newsTypes";
const useRouteNewsData = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  const successDataArr = newsData.filter((news) => news.status === "ok");
  const newsArr = successDataArr.map((news) => news.items).flat();
  return newsArr;
};

export default useRouteNewsData;
