export interface INewsData {
  status: string;
  totalResults: number;
  articles: IArticle[];
}

export interface IArticle {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleWithCategory {
  source: ISource;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  category: string
}

export interface ISource {
  id: string;
  name: string;
}