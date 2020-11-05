import React from 'react';

import './category.css';
import categoryImage1 from '../../../assets/media-outlet/techcrunch.png';
import categoryImage2 from '../../../assets/media-outlet/bitcoin.png';
import categoryImage3 from '../../../assets/media-outlet/us.png';
import { IBannerState } from '../banner/bannerState';

interface IBannerProps {
  data: IBannerState
}

const Category: React.FC<IBannerProps> = props => {
  const mediaOutlets = ['Techcrunch', 'Bitcoin', 'US Headlines'];
  const categoryImages = [categoryImage1, categoryImage2, categoryImage3];
  return (
    <div className="container category-container border-medium">
      <p>
        Top Headlines
      </p>

      <div className="category-container-holder">
        {mediaOutlets.map((outlet, index) =>
          <div key={index} className="category-container-inner">
            <img src={categoryImages[index]} alt="news categories"/>
            <p>{outlet}<span>{!props.data.loading ? props.data.response[index].totalResult : 0} posts</span></p>
          </div>)
        }
      </div>
    </div>
  );
};

export default Category;