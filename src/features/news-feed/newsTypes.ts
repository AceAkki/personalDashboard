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

export type NewsData = NewsObject[];

export interface NewsDataObject {
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

export type NewsDataObjectArr = NewsDataObject[];

export type NewsFeedProps = {
  newsData: NewsDataObjectArr;
};
