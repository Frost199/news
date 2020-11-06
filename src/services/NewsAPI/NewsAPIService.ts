import axios  from 'axios';
import { AxiosRequestConfig } from 'axios';
import { HttpClient } from '../httpService';
import { INewsData } from './NewsDataInterface';

export class NewsAPIService extends HttpClient {
  public constructor() {
    super('http://newsapi.org/v2/'); // TODO: change empty sting to http://newsapi.org/v2/

    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError,
    );
  };

  private _handleRequest = (config: AxiosRequestConfig) => {
    // config.headers['Authorization'] = 'Bearer e3713477ecd746a0a3a4ec2e068aa8b3';
    config.headers['Authorization'] = 'Bearer 0d6ae68dc4614b2cbc2e8c41c0a0eb47';

    return config;
  };

  public getTopHeadlines = () => {
    const topHeadlineBitcoin: string = `top-headlines?q=bitcoin`;
    const topHeadlineUsHeadline: string = `top-headlines?country=us`;
    const topHeadlineTechCrunch: string = `top-headlines?sources=techcrunch`;
    return axios.all<INewsData>([
      this.instance.get(topHeadlineBitcoin),
      this.instance.get(topHeadlineUsHeadline),
      this.instance.get(topHeadlineTechCrunch),
    ]);
  };

  public searchNews = (param: string): Promise<INewsData> => {
    const searchParam = `everything?q=${param}`;
    return this.instance.get(searchParam);
  };
}