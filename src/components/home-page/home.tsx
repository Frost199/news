import React, { useState } from 'react';
import Header from './header/header';

const Home: React.FC = () => {

  const [width, setWidth] = useState(0);

  React.useEffect(function setupListener() {
    function updateWindowsDimension() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowsDimension);

    return function cleanupListener() {
      window.removeEventListener('resize', updateWindowsDimension);
    };
  });

  return (
    <div>
      <Header browserWidth={width}/>
    </div>
  );
};

export default Home;