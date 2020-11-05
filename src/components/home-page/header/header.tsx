import React from 'react';

import './header.css';
import IBrowserWidth from '../../../utils/browser-width-interface';
import { SearchInput } from '../../lib/TextField';

interface HeaderProps {
  changeVertical: boolean;
  width: IBrowserWidth;
}

const Header: React.FC<HeaderProps> = props => {
  return (
    <header className={`container navbar ${props.changeVertical && 'sticky_navbar'}`}>
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