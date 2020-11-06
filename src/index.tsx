import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as _ from 'styled-components/cssprop';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalStyle } from './utils';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
      <GlobalStyle/>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
