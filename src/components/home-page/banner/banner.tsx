import React from 'react';

import './banner.css';
import IBrowserWidth from '../../../utils/browser-width-interface';
import BannerBox from './BannerBoxes/banner-box';
import { IBannerState } from './bannerState';

interface IBannerProps {
  width: IBrowserWidth;
  data: IBannerState
}

const Banner: React.FC<IBannerProps> = props => {

  return (
    <div className='banner-container'>
      <BannerBox width={props.width.browserWidth} articleData={props.data}/>
    </div>
  );
};

export default Banner;