import moment from 'moment';
import React, { useEffect, useReducer, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { IArticleWithCategory } from '../../../services/NewsAPI/NewsDataInterface';

import IBrowserWidth from '../../../utils/browser-width-interface';
import { SecondaryButton, TertiaryButton } from '../../lib/button';
import { BasicInput } from '../../lib/TextField';
import { IBannerStateWithCategory } from '../banner/bannerState';
import emptyResult from '../../../assets/empty.svg';
import NewsDetail from './news-detail/news-detail';

import './news-list.css';

interface IBannerProps {
  data: IBannerStateWithCategory
  width: IBrowserWidth;
}

const initialState = {
  sources: '',
  author: '',
  publishedDate: '',
};

const reducer = (state: any, { field, value }: any) => {
  return {
    ...state,
    [field]: value,
  };
};

const NewsList: React.FC<IBannerProps> = props => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const [filteredInput, setFilteredInput] = useState<IArticleWithCategory[]>([]);

  const { sources, author, publishedDate } = state;

  useEffect((): void => {
    setFilteredInput(props.data.response);
    if (sources && author && publishedDate) {
      const publishedAtDate = moment(publishedDate).format('LL').toString() || publishedDate;
      setFilteredInput((filteredInput) => filteredInput.filter(data => {
        return (data.title?.includes(sources) ||
          data.author?.includes(author) ||
          moment(data.publishedAt).format('LL')?.toString()?.includes(publishedAtDate));
      }));
    }
  }, [author, publishedDate, sources, props.data.response]);

  const inputOnChange = (e: any) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const [isFilter, setIsFilter] = useState(false);

  const filterAnimation = useSpring({
    transform: isFilter ? `translate3d(0,0%,0)` : `translate3d(0,-5%,0)`,
  });

  const opacitySwitching = useSpring({
    opacity: isFilter ? 1 : 0,
    // display: isFilter ? 'flex': 'none',
  });

  const animate = () => {
    if (!(filteredInput === undefined || filteredInput.length === 0)) setIsFilter(!isFilter);
    clearFilters();
  };

  const clearFilters = () => {
    dispatch({ field: 'sources', value: '' });
    dispatch({ field: 'author', value: '' });
    dispatch({ field: 'publishedDate', value: '' });
  }

  return (
    <div className="container news-list-container">
      <div className="news-list-container__top">
        <div className="news-list-container__top--01">
          <p>RECENT NEWS</p>
          <div className="inner">
            <p>Browse News Worldwide</p>
            <div onClick={animate}>
              <SecondaryButton>
                {isFilter ? 'Stop Filtering' : 'Filter'}
              </SecondaryButton>
            </div>
          </div>
        </div>
        <animated.div
          style={opacitySwitching}
          className={`news-list-container__top--02 ${filteredInput === undefined || filteredInput.length === 0 ? 'clear-inputs' : ''}`}>
          <BasicInput name="sources" value={sources} onChange={inputOnChange} placeHolder="sources"/>
          <BasicInput name="author" value={author} onChange={inputOnChange} placeHolder="Author"/>
          <BasicInput name="publishedDate" value={publishedDate} onChange={inputOnChange} placeHolder="Published Date"/>
          <div onClick={clearFilters}>
            <TertiaryButton>
              Clear
            </TertiaryButton>
          </div>
        </animated.div>
      </div>
      <animated.div style={filterAnimation} className="news-list-container__bottom">
        {filteredInput === undefined || filteredInput.length === 0 ?
          <div className="news-detail-container--empty">
            <img
              src={emptyResult}
              alt='Empty Result'/>
          </div>
          :
          filteredInput.map((data, index) => <NewsDetail key={index} data={data}/>)}
      </animated.div>
    </div>
  );
};

export default NewsList;