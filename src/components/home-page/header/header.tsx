import React, { useState } from 'react';

import './header.css';
import IBrowserWidth from '../../../utils/browser-width-interface';
import { SearchInput } from '../../lib/TextField';

interface HeaderProps {
  changeVertical: boolean;
  width: IBrowserWidth;

  setSearchState(searchValue: string): void;

  unSetSearchState(): void;
}

const Header: React.FC<HeaderProps> = props => {

  const [search, setSearch] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search) {
      props.setSearchState(search);
    } else if (!search) {
      props.unSetSearchState();
    }
  };

  return (
    <header className={`container navbar ${props.changeVertical && 'sticky_navbar'}`}>
      <div className="logo">
        <p>
          <span>NEWS</span>TIME
        </p>
      </div>
      <SearchInput onKeyDown={handleKeyDown}
                   onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)}
                   placeHolder={'search here'} name="search" value={search}/>
    </header>
  );
};

export default Header;