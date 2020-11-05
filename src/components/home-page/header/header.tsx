import React from 'react';

import './header.css';
import IBrowserWidth from '../../../utils/browser-width-interface';
import { SearchInput } from '../../lib/TextField';


const Header: React.FC<IBrowserWidth> = props => {
  console.log(props.browserWidth);
  return (
    <header className="container navbar">
      <div className="logo">
        <p>
          <span>NEWS</span>TIME
        </p>
      </div>
      <SearchInput placeHolder={'search here'}/>
    </header>
  );
};

export default Header;