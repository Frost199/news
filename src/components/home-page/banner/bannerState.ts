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