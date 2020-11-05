import React, { useState } from 'react';
import IBrowserWidth from '../../utils/browser-width-interface';
import Banner from './banner/banner';
import Header from './header/header';

const Home: React.FC = () => {

  const [width, setWidth] = useState(0);
  const [change, setChange] = useState(false);

  const generatedBrowserWidth: IBrowserWidth = { browserWidth: 0 };
  generatedBrowserWidth.browserWidth = width;

  React.useEffect(function setupListener() {

    updateWindowsDimension();

    function updateWindowsDimension() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', updateWindowsDimension);

    return function cleanupListener() {
      window.removeEventListener('resize', updateWindowsDimension);
    };
  });

  React.useEffect(function setupListener() {
    function handleScroll() {
      if (window.scrollY === 0) {
        setChange(false);
      } else if (window.scrollY > 20) {
        setChange(true);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return function cleanupListener() {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  return (
    <React.Fragment>
      <Header changeVertical={change} width={generatedBrowserWidth}/>
      <Banner width={generatedBrowserWidth}/>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </React.Fragment>
  );
};

export default Home;