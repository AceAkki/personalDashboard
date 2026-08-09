import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import useRouteNewsData from "./hooks/useRouteNewsData";
import { useNewsStore } from "./hooks/useNewsStore";
import RenderNews from "./components/RenderNews";

import type { NewsObject } from "./newsTypes";
import "./news.css";

const NewsFeed = () => {
  const { successData, newsArr } = useRouteNewsData();

  const { newsArray, setNewsArray } = useNewsStore(
    useShallow((state) => ({
      newsArray: state.newsArray,
      setNewsArray: state.setNewsArray,
    })),
  );
  useEffect(() => {
    if (newsArray.length === 0) {
      setNewsArray(newsArr as NewsObject[]);
    }
  }, [newsArray]);
  return (
    <>
      <section className="overflow-auto  inner-route-section">
        <div className="category-navbar">
          <button
            className="nav-btn"
            onClick={() => {
              setNewsArray(newsArr as NewsObject[]);
            }}
          >
            All
          </button>
          {Object.keys(successData).map((key) => {
            return (
              <button
                key={key}
                className="nav-btn"
                onClick={() => {
                  let categoryNewsArr = Object.values(
                    successData[key as keyof typeof successData],
                  ).flat();
                  console.log(categoryNewsArr, successData[key]);
                  setNewsArray(categoryNewsArr as NewsObject[]);
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
