import moment from 'moment';
import React from 'react';

import './banner-box.css';
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
  const articles = [
    {
      urlToImage: 'https://cdn.arstechnica.net/wp-content/uploads/2020/11/Bitcoin-760x380.jpg',
      author: 'Dan Goodin',
      title: 'Someone has transferred ~$1 billion from a bitcoin wallet quiet since 2015',
      description: 'Wallet is likely tied to Silk Road, the underground crime bazaar shut down in 2013.',
      publishedAt: '2020-11-04T21:25:11+00:00',
    },
    {
      urlToImage: 'https://cdn.cnn.com/cnnnext/dam/assets/200130165125-corona-virus-cdc-image-super-tease.jpg',
      author: 'Brett McKeehan',
      title: 'The latest on the coronavirus pandemic: Live updates - CNN',
      description: 'The coronavirus pandemic has brought countries to a standstill. In many places, as countries reopen, Covid-19 cases are on the rise. Follow here for the latest.',
      publishedAt: '2020-11-05T11:57:00Z',
    },
    {
      urlToImage: 'https://i.guim.co.uk/img/media/e34ccbf00ac1b49e09d12e63676a9c8cf34e487c/0_0_3500_2101/master/3500.jpg?width=1200&height=630&quality=85&auto=format&fit=crop&overlay-align=bottom%2Cleft&overlay-width=100p&overlay-base64=L2ltZy9zdGF0aWMvb3ZlcmxheXMvdGctZGVmYXVsdC5wbmc&enable=upscale&s=30bc895b097d6cbbc668dcad9b471616',
      author: 'Peter Beaumont',
      title: 'Trump supporters protest at Arizona vote counting centre - The Guardian',
      description: 'Local TV says some protesters were carrying weapons as staff continued to tally ballots',
      publishedAt: '2020-11-05T12:10:00Z',
    }];

  const truncate = (str: string): string => {
    return str.length > 60 ? str.substring(0, 60) + '...' : str;
  };

  return (
    <div className='banner-box-container'>
      {
        articles.map((article, index) =>
          <div
            key={index}
            className={`banner-box-inner ${props.width > 759 && `first-${index}`}`}
            style={{
              backgroundImage: `url('${article.urlToImage}')`,
              backgroundSize: 'cover',
              // height: '100%',
            }}>
            <div className='overlay'>
            </div>
            <div className='container news-inner'>
              <div className='article-info'>
                <img src={authorImages[index]} alt="News"/>
                <div className="info-inner">
                  <p>{article.author}<span>{moment(article.publishedAt).format('LL')}</span></p>
                </div>
              </div>

              <div className="news-sub-content">
                <p id="article-outlet">{mediaOutlets[index]}</p>
                <p id="article-description">{truncate(article.description)}</p>
              </div>
            </div>
          </div>)

        // props.articleData.response.map((_article, index) => // TODO: change _article to article
        //   <div
        //     key={index}
        //     className="banner-box-inner"
        //     style={{
        //       backgroundImage: `url('${article.urlToImage}')`,
        //       backgroundSize: 'cover',
        //       // height: '100%',
        //     }}>
        //
        //   </div>,
        // )
      }
    </div>
  );
};

export default BannerBox;