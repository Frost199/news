import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { IArticleWithCategory } from '../../../../services/NewsAPI/NewsDataInterface';

import './news-detail.css';
import authorImage1 from '../../../../assets/author-img-0.png';
import authorImage2 from '../../../../assets/author-img-1.png';
import authorImage3 from '../../../../assets/author-img-2.png';
import { truncate } from '../../../lib/truncate-words';

interface INewsDetail {
  data: IArticleWithCategory;
}

const NewsDetail: React.FC<INewsDetail> = props => {

  const authorArray = [authorImage1, authorImage2, authorImage3];

  return (
    <div className="news-detail-container">
      <div
        className="image-container"
        style={{
          backgroundImage: `url('${props.data.urlToImage}')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className='overlay'>
        </div>
        <p>{truncate(props.data.description, 80)}</p>
      </div>

      <div className="details-container">
        <div className="title-holder">
          <p className="category">{props.data.category}<span className="description">
            {truncate(`${props.data.title}`, 40)}
          </span></p>
        </div>

        <div className="body-holder">
          <div className='article-info'>
            <img src={authorArray[Math.floor(Math.random() * 3)]} alt="News"/>
            <div className="info-inner">
              <p>{truncate(props.data.author, 25)}<span>{moment(`${props.data.publishedAt}`).format('LL')}</span></p>
            </div>
          </div>
          <div className="article-button">
            <a href={props.data.url} target="_blank"
               rel="noopener noreferrer">
              <FontAwesomeIcon icon={faArrowRight}/>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;