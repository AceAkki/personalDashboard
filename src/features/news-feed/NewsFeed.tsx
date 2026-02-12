import { useRouteLoaderData } from "react-router-dom";

import type { NewsFeedProps } from "./newsTypes";
import "./news.css";
const NewsFeed = () => {
  const { newsData } = useRouteLoaderData("root") as NewsFeedProps;
  const successDataArr = newsData.filter((news) => news.status === "ok");
  const newsArr = successDataArr.map((news) => news.items).flat();
  const RenderNews = () => {
    return newsArr.map((news, index) => {
      return (
        <div className="news-details-wrap" key={`${news.link}-${index}`}>
          <div className="news-content">
            <h5 className="news-title">{news.title}</h5>
            <p className="news-para">{news.description}</p>
            <a href={news.link} className="news-btn" target="_blank">
              Read More
            </a>
          </div>
          {/* <div className="news-image">
            {news.thumbnail ? (
              <img src={news.thumbnail} alt={news.title} />
            ) : null}
          </div> */}
        </div>
      );
    });
  };
  return (
    <section>
      <div className="news-main-wrap">
        <RenderNews />
      </div>
    </section>
  );
};

export default NewsFeed;
