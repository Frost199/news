import { IArticleWithCategory } from '../../../services/NewsAPI/NewsDataInterface';

interface IProcessedResponse {
  author: string;
  title: string;
  description: string;
  publishedAt: string;
  urlToImage: string;
  totalResult: number;
}


export interface IBannerState {
  response: IProcessedResponse[];
  error: boolean;
  loading: boolean
}

export interface IBannerStateWithCategory {
  response: IArticleWithCategory[];
  error: boolean;
  loading: boolean
}