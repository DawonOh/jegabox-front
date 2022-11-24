import React, { useEffect, useState } from 'react';
import ScreeningInfo3 from './ScreeningInfo3';
import css from './ScreeningInfo2.module.scss';
function App({ processedArr, idx, idx2, screenArr }) {
  const [modifyScreen, setModifyScreen] = useState();
  useEffect(() => {
    let screen = processedArr[idx][idx2][0].movie_property;
    let modifyScreen = '';

    for (let i = 0; i < screen.length; i++) {
      if (screen[i] === '(') modifyScreen += '\n(';
      else modifyScreen += screen[i];
    }
    setModifyScreen(modifyScreen);
    console.log(modifyScreen);
  }, []);

  return (
    <div className={css.main}>
      <div className={css.screen}>
        <div className={css.screen2}>{screenArr[idx][idx2]}관</div>
        <div className={css.seatCount}>총 20석</div>
      </div>

      <div className={css.movie}>
        <div className={css.movie_property}>
          {/* {processedArr[idx][idx2][0].movie_property} */}
          {modifyScreen}
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
