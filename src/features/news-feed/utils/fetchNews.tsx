import type {
  NewsSource,
  NewsSourceKey,
  NewsSourceSubKey,
  NewsRSSFeed,
  NewsRSSFeedArray,
  NewsSourceData,
} from "../newsTypes";
const fetchNews = async (): Promise<NewsSourceData> => {
  const newsSources: NewsSource = {
    GlobalNews: {
      BBCNews: "https://feeds.bbci.co.uk/news/world/rss.xml",
      Reuters: "https://www.reutersagency.com/feed/",
      Guardian: "https://www.theguardian.com/world/rss",
      NPRNews: "https://feeds.npr.org/1001/rss.xml",
      Hindu: "https://www.thehindu.com/news/national/feeder/default.rss",
    },
    Technology: {
      TechCrunch: "https://techcrunch.com/feed/",
      Verge: "https://www.theverge.com/rss/index.xml",
      Wired: "https://www.wired.com/feed/rss",
      HackerNews: "https://hnrss.org/best",
      ArsTechnica: "http://feeds.arstechnica.com/arstechnica/index/",
    },
    Business: {
      Economist: "https://www.economist.com/latest/rss.xml",
      FinancialTimes: "https://www.ft.com/?format=rss",
      WallStreetJournal: "https://feeds.a.dj.com/rss/RSSMarketsMain.xml",
      Fortune: "https://fortune.com/feed/",
    },
    Science: {
      NASA: "https://www.nasa.gov/rss/dyn/breaking_news.rss",
      ScienceDaily: "https://www.sciencedaily.com/rss/all.xml",
      Phys: "https://phys.org/rss-feed/",
    },
  };

  const rsstoJSON = "https://api.rss2json.com/v1/api.json?rss_url=";

  // all links as array
  /*
  const currentSources: string[] = [];
  let currentNews: NewsRSSFeedArray = [];

  Object.keys(newsSources).forEach((key) =>
    Object.keys(newsSources[key as NewsSourceKey]).forEach((subKey) => {
      currentSources.push(
        newsSources[key as NewsSourceKey][subKey as NewsSourceSubKey],
      );
    }),
  );

  if (currentSources.length > 0) {
    const promises = await Promise.all(
      currentSources.map(async (source) => {
        const res = await fetch(`${rsstoJSON}${encodeURIComponent(source)}`);
        const data = await res.json();
        return data as NewsRSSFeed;
      }),
    ).then((values) => values);
    currentNews = promises;
  }
  return currentNews;

  */

  async function fetchData(): Promise<NewsSourceData> {
    let currentSources = {};
    for (const [key, value] of Object.entries(newsSources)) {
      let valueData = {};
      for (const [subkey, subValue] of Object.entries(value)) {
        const res = await fetch(`${rsstoJSON}${encodeURIComponent(subValue)}`);
        const data = await res.json();
        Object.defineProperty(valueData, subkey, {
          value: data,
          enumerable: true,
          writable: true,
        });
      }
      Object.defineProperty(currentSources, key, {
        value: valueData,
        enumerable: true,
        writable: true,
      });
    }
    return currentSources as NewsSourceData;
  }
  let newsData: NewsSourceData = await fetchData();
  return newsData;
};

export default fetchNews;
