export type NewsSource = {
  GlobalNews: {
    BBCNews: string;
    Reuters: string;
    Guardian: string;
    NPRNews: string;
    Hindu: string;
  };
  Technology: {
    TechCrunch: string;
    Verge: string;
    Wired: string;
    HackerNews: string;
    ArsTechnica: string;
  };
  Business: {
    Economist: string;
    FinancialTimes: string;
    WallStreetJournal: string;
    Fortune: string;
  };
  Science: {
    NASA: string;
    ScienceDaily: string;
    Phys: string;
  };
};

export type NewsSourceData = {
  GlobalNews: {
    BBCNews: NewsRSSFeed[];
    Reuters: NewsRSSFeed[];
    Guardian: NewsRSSFeed[];
    NPRNews: NewsRSSFeed[];
    Hindu: NewsRSSFeed[];
  };
  Technology: {
    TechCrunch: NewsRSSFeed[];
    Verge: NewsRSSFeed[];
    Wired: NewsRSSFeed[];
    HackerNews: NewsRSSFeed[];
    ArsTechnica: NewsRSSFeed[];
  };
  Business: {
    Economist: NewsRSSFeed[];
    FinancialTimes: NewsRSSFeed[];
    WallStreetJournal: NewsRSSFeed[];
    Fortune: NewsRSSFeed[];
  };
  Science: {
    NASA: NewsRSSFeed[];
    ScienceDaily: NewsRSSFeed[];
    Phys: NewsRSSFeed[];
  };
};

export type NewsSourceKey = keyof NewsSource;
export type NewsSourceSubKey = keyof NewsSource[keyof NewsSource];

export interface NewsRSSFeed {
  status: string;
  feed: {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
  };
  items: NewsObject[];
}

export type NewsRSSFeedArray = NewsRSSFeed[];

export type NewsFeedProps = {
  newsData: NewsRSSFeedArray;
};

export interface NewsObject {
  title: string;
  pubDate: string;
  link: string;
  guid: string;
  author: string;
  thumbnail: string;
  description: string;
  content: string;
  enclosure: {
    thumbnail: string;
  };
  categories: string[];
}
