import moment from 'moment';
import React from 'react';

import './banner-box.css';
import { truncate } from '../../../lib/truncate-words';
import { IBannerState } from '../bannerState';
import authorImage1 from '../../../../assets/author-img-0.png';
import authorImage2 from '../../../../assets/author-img-1.png';
import authorImage3 from '../../../../assets/author-img-2.png';

interface IBannerBox {
  articleData: IBannerState;
  width: number;
}

const BannerBox: React.FC<IBannerBox> = props => {
  const mediaOutlets = ['TechCrunch', 'US Headlines', 'Bitcoin'];
  const authorImages = [authorImage1, authorImage2, authorImage3];

  return (
    <div className='banner-box-container'>
      {
        props.articleData.response.map((article, index) =>
          <div
            key={index}
            className={`banner-box-inner ${props.width > 759 && `first-${index}`}`}
            style={{
              backgroundImage: `url('${article.urlToImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}>
            <div className='overlay'>
            </div>
            <div className='container news-inner'>
              <div className='article-info'>
                <img src={authorImages[index]} alt="News"/>
                <div className="info-inner">
                  <p>{article.author ? truncate(article.author, 25) : 'No specified author'}<span>{moment(article.publishedAt).format('LL')}</span>
                  </p>
                </div>
              </div>

              <div className="news-sub-content">
                <p id="article-outlet">{mediaOutlets[index]}</p>
                <p id="article-description">{truncate(article.description, 60)}</p>
              </div>
            </div>
          </div>,
        )
      }
    </div>
  );
};

export default BannerBox;