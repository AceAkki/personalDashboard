import { useRouteLoaderData } from "react-router-dom";

import type { NewsFeedProps } from "./newsTypes";
const NewsFeed = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  console.log(newsData);
  const successDataArr = newsData.filter((news) => news.status === "ok");
  const newsArr = successDataArr.map((news) => news.items).flat();
  const RenderNews = () => {
    return newsArr.map((news) => {
      return (
        <div className="news-details-wrap" key={news.link}>
          <div className="news-content">
            <h1>{news.title}</h1>
            <p>{news.description}</p>
          </div>
          {news.thumbnail ? (
            <img src={news.thumbnail} alt={news.title} />
          ) : null}
          <a href={news.link}>Read More</a>
        </div>
      );
    });
  };
  return (
    <div className="news-main-wrap">
      <RenderNews />
    </div>
  );
};

export default NewsFeed;
