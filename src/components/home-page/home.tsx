import axios from 'axios';
import React, { useState } from 'react';
import { NewsAPIService } from '../../services/NewsAPI/NewsAPIService';
import { IArticle } from '../../services/NewsAPI/NewsDataInterface';
import IBrowserWidth from '../../utils/browser-width-interface';
import Banner from './banner/banner';
import { IBannerState } from './banner/bannerState';
import Category from './category/category';
import Header from './header/header';

const Home: React.FC = () => {

  const [width, setWidth] = useState(0);
  const [change, setChange] = useState(false);

  const generatedBrowserWidth: IBrowserWidth = { browserWidth: 0 };
  generatedBrowserWidth.browserWidth = width;

  React.useEffect(function setupListener() {

    updateWindowsDimension();

    function updateWindowsDimension() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowsDimension);

    return function cleanupListener() {
      window.removeEventListener('resize', updateWindowsDimension);
    };
  });

  React.useEffect(function setupListener() {
    function handleScroll() {
      if (window.scrollY === 0) {
        setChange(false);
      } else if (window.scrollY > 20) {
        setChange(true);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return function cleanupListener() {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const returnData = (serverProcessedResponse: IArticle, totalResult: number) => {
    const { author, title, description, publishedAt, urlToImage } = serverProcessedResponse;
    return { author, title, description, publishedAt, urlToImage, totalResult };
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
        const { articles: bitcoinArticleArray, totalResults: bitcoinTotalResult } = bitcoin;
        const { articles: usHeadLineArticleArray, totalResults: usHeadLineTotalResult } = usHeadline;
        const { articles: techCrunchArticleArray, totalResults: techCrunchTotalResult } = techCrunch;

        const bitcoinArticle = returnData(bitcoinArticleArray[0], bitcoinTotalResult);
        const usHeadLineArticle = returnData(usHeadLineArticleArray[0], usHeadLineTotalResult);
        const techCrunchArticle = returnData(techCrunchArticleArray[0], techCrunchTotalResult);

        const data = [bitcoinArticle, usHeadLineArticle, techCrunchArticle];

        setData({
          error: false,
          loading: false,
          response: data,
        });
      }));
  }, []);

  return (
    <React.Fragment>
      <Header changeVertical={change} width={generatedBrowserWidth}/>
      <Banner data={data} width={generatedBrowserWidth}/>
      <Category data={data}/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </React.Fragment>
  );
};

export default Home;