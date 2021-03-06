import { normalize } from 'polished';
import { createGlobalStyle } from 'styled-components';

import { primaryFont } from './typography';

export const GlobalStyle = createGlobalStyle`
${normalize()}
html {
  box-sizing: border-box;
  font-size: 16px;
}
*, *:before, *:after {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: ${primaryFont};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
}

input:focus, textarea:focus, select:focus{
  outline: none;
}
code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}
`;