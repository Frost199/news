import React, { CSSProperties } from 'react';
import { PrimaryButton, SecondaryButton, TertiaryButton } from './components/lib/button';

const App: React.FC = () => {

  const backgroundCSS: CSSProperties = {
    background: 'antiquewhite',
  };

  return (
    <div style={backgroundCSS}>
      <PrimaryButton>
        Hello
      </PrimaryButton>

      <SecondaryButton>
        Hello
      </SecondaryButton>

      <TertiaryButton>
        Hello
      </TertiaryButton>
    </div>
  );
};

export default App;
