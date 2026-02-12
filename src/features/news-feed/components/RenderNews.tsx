import type { NewsObject } from "../newsTypes";

const RenderNews = ({ newsArr }: { newsArr: NewsObject[] }) => {
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

export default RenderNews;
