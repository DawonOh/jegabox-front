import React from 'react';
import ScreeningInfo3 from './ScreeningInfo3';
import css from './ScreeningInfo2.module.scss';
function App({ processedArr, idx, idx2, screenArr }) {
  return (
    <div className={css.main}>
      <div className={css.screen}>
        <div className={css.screen2}>{screenArr[idx][idx2]}관</div>
        <div className={css.seatCount}>총 20석</div>
      </div>

      <div className={css.movie}>
        <div className={css.movie_property}>
          {processedArr[idx][idx2][0].movie_property}
        </div>
        {processedArr[idx][idx2].map((elem, idx3) => {
          return (
            <ScreeningInfo3
              processedArr={processedArr}
              key={idx3}
              idx={idx}
              idx2={idx2}
              idx3={idx3}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
