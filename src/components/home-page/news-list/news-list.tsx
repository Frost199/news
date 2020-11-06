import React from 'react';
import IBrowserWidth from '../../../utils/browser-width-interface';
import { IBannerStateWithCategory } from '../banner/bannerState';
import NewsDetail from './news-detail/news-detail';

import './news-list.css';

interface IBannerProps {
  data: IBannerStateWithCategory
  width: IBrowserWidth;
}

const NewsList: React.FC<IBannerProps> = props => {
  return (
    <div className="container news-list-container">
      <div className="news-list-container__top">
      </div>
      <div className="news-list-container__bottom">
        {props.data.response.map((data, index) => <NewsDetail key={index} data={data}/>)}
      </div>
    </div>
  );
};

export default NewsList;