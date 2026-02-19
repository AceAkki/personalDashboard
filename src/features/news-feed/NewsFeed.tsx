import useRouteNewsData from "./hooks/useRouteNewsData";
import RenderNews from "./components/RenderNews";
import "./news.css";
const NewsFeed = () => {
  const newsArr = useRouteNewsData();

  return (
    <section className="overflow-auto  inner-route-section">
      <div className="news-main-wrap">
        <RenderNews newsArr={newsArr} />
      </div>
    </section>
  );
};

export default NewsFeed;
