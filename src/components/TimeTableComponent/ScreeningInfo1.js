import React from 'react';
import ScreeningInfo2 from './ScreeningInfo2';
import css from './ScreeningInfo1.module.scss';

function App({ processedArr, idx, placeArr, screenArr }) {
  return (
    <div className={css.main}>
      <div className={css.place}>{placeArr[idx]}</div>
      {processedArr[idx].map((elem, idx2) => {
        return (
          <ScreeningInfo2
            processedArr={processedArr}
            screenArr={screenArr}
            key={idx2}
            idx={idx}
            idx2={idx2}
          />
        );
      })}
    </div>
  );
}

export default App;
