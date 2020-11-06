import axios from 'axios';
import React, { useState } from 'react';
import { NewsAPIService } from '../../services/NewsAPI/NewsAPIService';
import { IArticle, IArticleWithCategory } from '../../services/NewsAPI/NewsDataInterface';
import IBrowserWidth from '../../utils/browser-width-interface';
import { shuffle } from '../lib/shuffle-array';
import Banner from './banner/banner';
import { IBannerState, IBannerStateWithCategory } from './banner/bannerState';
import Category from './category/category';
import Footer from './footer/footer';
import Header from './header/header';
import NewsList from './news-list/news-list';

const modifyArrayFromServer = (articleArray: IArticle[], category: string, lengthOfArticle: number): IArticleWithCategory[] => {
  const arrayLength = articleArray.length > lengthOfArticle ? lengthOfArticle : articleArray.length;
  let articleWithCategory: IArticleWithCategory[] = [];
  for (let i = 0; i < arrayLength; i += 1) {
    articleWithCategory.push({ ...articleArray[i], category });
  }
  return articleWithCategory;
};

const Home: React.FC = () => {

  const [width, setWidth] = useState(0);
  const [change, setChange] = useState(false);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [dataWithCategories, setDataWithCategories] = React.useState<IBannerStateWithCategory>({
    response: [],
    error: false,
    loading: true,
  });
  const [data, setData] = React.useState<IBannerState>({
    response: [],
    error: false,
    loading: true,
  });

  const setStateForSearch = (searchValueFromResponse: string) => {
    setSearch(true);
    setSearchValue(searchValueFromResponse);
  };

  const unSetStateForSearch = () => {
    setSearch(false);
  };

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

  React.useEffect((): void => {
    const newsApi = new NewsAPIService();
    if (search) {
      newsApi.searchNews(searchValue).then((data) => {
        let { articles } = data;
        articles = articles.filter(value => value.author !== null || value.urlToImage !== null);
        const articlesWithCategory = modifyArrayFromServer(articles, 'All', 15);
        const shuffledNews: IArticleWithCategory[] = shuffle(articlesWithCategory);
        setDataWithCategories({
          response: shuffledNews,
          error: false,
          loading: false,
        });
      });
    } else newsApi.getTopHeadlines()
      .then(axios.spread((bitcoin, usHeadline, techCrunch) => {
        let { articles: bitcoinArticleArray, totalResults: bitcoinTotalResult } = bitcoin;
        let { articles: usHeadLineArticleArray, totalResults: usHeadLineTotalResult } = usHeadline;
        let { articles: techCrunchArticleArray, totalResults: techCrunchTotalResult } = techCrunch;

        const singleBitcoinArticle = returnData(bitcoinArticleArray[0], bitcoinTotalResult);
        const singleUsHeadLineArticle = returnData(usHeadLineArticleArray[0], usHeadLineTotalResult);
        const singleTechCrunchArticle = returnData(techCrunchArticleArray[0], techCrunchTotalResult);

        const data = [singleBitcoinArticle, singleUsHeadLineArticle, singleTechCrunchArticle];

        bitcoinArticleArray = bitcoinArticleArray.filter(value => value.author !== null || value.urlToImage !== null);
        usHeadLineArticleArray = usHeadLineArticleArray.filter(value => value.author !== null || value.urlToImage !== null);
        techCrunchArticleArray = techCrunchArticleArray.filter(value => value.author !== null || value.urlToImage !== null);

        /*
         *  modify response to have category attribute in each of them,
         *  and also make sure it does not exceed 5 contents in the array
         */
        const bitcoinCategoryOfAtMost5InArray = modifyArrayFromServer(bitcoinArticleArray, 'Bitcoin', 5);
        const usHeadlineCategoryOfAtMost5InArray = modifyArrayFromServer(usHeadLineArticleArray, 'US Headline', 5);
        const techCrunchCategoryOfAtMost5InArray = modifyArrayFromServer(techCrunchArticleArray, 'TechCrunch', 5);

        const shuffledNews: IArticleWithCategory[] = shuffle([
          ...bitcoinCategoryOfAtMost5InArray,
          ...usHeadlineCategoryOfAtMost5InArray,
          ...techCrunchCategoryOfAtMost5InArray,
        ]);

        setData({
          error: false,
          loading: false,
          response: data,
        });

        setDataWithCategories({
          response: shuffledNews,
          error: false,
          loading: false,
        });
      }));
  }, [search, searchValue]);

  return (
    <React.Fragment>
      <Header unSetSearchState={unSetStateForSearch} setSearchState={setStateForSearch} changeVertical={change}
              width={generatedBrowserWidth}/>
      <Banner data={data} width={generatedBrowserWidth}/>
      <Category data={data}/>
      <NewsList data={dataWithCategories} width={generatedBrowserWidth}/>
      <Footer />
    </React.Fragment>
  );
};

export default Home;