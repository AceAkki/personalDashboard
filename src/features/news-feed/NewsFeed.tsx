import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import useFetchNewsData from "./hooks/useFetchNewsData";
import { useNewsStore } from "./hooks/useNewsStore";
import RenderNews from "./components/RenderNews";
import FallBackLoader from "../../components/ui/FallbackLoader";
import type { NewsObject } from "./newsTypes";
import "./news.css";

const NewsFeed = () => {
  const { loadingStatus, successData, newsArr } = useFetchNewsData();

  const { currentArrayName, updateCurrentArrayName, newsArray, setNewsArray } =
    useNewsStore(
      useShallow((state) => ({
        currentArrayName: state.currentArrayName,
        updateCurrentArrayName: state.updateCurrentArrayName,
        newsArray: state.newsArray,
        setNewsArray: state.setNewsArray,
      })),
    );

  useEffect(() => {
    if (newsArr && newsArray.length === 0) {
      setNewsArray(newsArr as NewsObject[]);
    }
  }, [newsArr, newsArray]);

  if (loadingStatus || !successData || !newsArr) {
    return <FallBackLoader />;
  }

  return (
    <>
      <section className="overflow-auto  inner-route-section">
        <div className="category-navbar">
          <button
            className={
              currentArrayName === "All" ? "nav-btn active" : "nav-btn"
            }
            onClick={() => {
              setNewsArray(newsArr as NewsObject[]);
              updateCurrentArrayName("All");
            }}
          >
            All
          </button>
          {Object.keys(successData).map((key) => {
            return (
              <button
                key={key}
                className={
                  currentArrayName === key ? "nav-btn active" : "nav-btn"
                }
                onClick={() => {
                  let categoryNewsArr = Object.values(
                    successData[key as keyof typeof successData],
                  ).flat();
                  setNewsArray(categoryNewsArr as NewsObject[]);
                  updateCurrentArrayName(key);
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      </section>
      <section className="overflow-auto  inner-route-section">
        <div className="news-main-wrap">
          <RenderNews newsArr={newsArray} />
        </div>
      </section>
    </>
  );
};

export default NewsFeed;
