import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import useFetchNewsData from "./hooks/useFetchNewsData";
import { useNewsStore } from "./hooks/useNewsStore";
import RenderNews from "./components/RenderNews";
import FallBackLoader from "../../components/ui/FallBackLoader";
import type { NewsObject } from "./newsTypes";
import "./news.css";

const NewsFeed = () => {
  const { loadingStatus, expTime, successData, newsArr } = useFetchNewsData();

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
        <h2 className="section-title">News & Updates</h2>
        <p>Pick a category to discover the news that matters to you.</p>
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
        <div className="expiry-time">
          Expiry Time : &nbsp;
          {expTime
            ? new Date(expTime).toLocaleDateString("default", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })
            : null}
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
