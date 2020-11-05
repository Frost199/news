import axios from 'axios';
import React from 'react';

import './banner.css';
import { NewsAPIService } from '../../../services/NewsAPI/NewsAPIService';
import { IArticle } from '../../../services/NewsAPI/NewsDataInterface';
import IBrowserWidth from '../../../utils/browser-width-interface';
import BannerBox from './BannerBoxes/banner-box';
import { IBannerState } from './bannerState';

interface IBannerProps {
  width: IBrowserWidth;
}

const Banner: React.FC<IBannerProps> = props => {

  const returnData = (serverProcessedResponse: IArticle) => {
    const { author, title, description, publishedAt, urlToImage } = serverProcessedResponse;
    return { author, title, description, publishedAt, urlToImage };
  };

  const [data, setData] = React.useState<IBannerState>({
    response: [],
    error: false,
    loading: true,
  });

  React.useEffect((): void => {
    const newsApi = new NewsAPIService();
    newsApi.getTopHeadlines()
      .then(axios.spread((bitcoin, usHeadline, techCrunch) => {
        const { articles: bitcoinArticleArray } = bitcoin;
        const { articles: usHeadLineArticleArray } = usHeadline;
        const { articles: techCrunchArticleArray } = techCrunch;

        const bitcoinArticle = returnData(bitcoinArticleArray[0]);
        const usHeadLineArticle = returnData(usHeadLineArticleArray[0]);
        const techCrunchArticle = returnData(techCrunchArticleArray[0]);

        const data = [bitcoinArticle, usHeadLineArticle, techCrunchArticle];

        setData({
          error: false,
          loading: false,
          response: data,
        });
      }));
  }, []);
  return (
    <div className='banner-container'>
      <BannerBox width={props.width.browserWidth} articleData={data}/>
    </div>
  );
};

export default Banner;