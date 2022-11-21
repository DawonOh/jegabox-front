import React, { useState } from 'react';
import css from './ScreeningInfo3.module.scss';

function App({ processedArr, idx, idx2, idx3 }) {
  const [hoverCheck, setHoverCheck] = useState(false);
  function onMouseOver() {
    setHoverCheck(true);
  }
  function onMouseOut() {
    setHoverCheck(false);
  }
  return (
    <div style={{ position: 'relative', width: '98px', height: '69px' }}>
      {hoverCheck && (
        <div className={css.onHover} onMouseOut={onMouseOut}></div>
      )}
      {!hoverCheck && (
        <div className={css.main} onMouseOver={onMouseOver}>
          <div className={css.noneHover}>
            <div className={css.time}>
              {processedArr[idx][idx2][idx3].seats.time}
            </div>
            <div className={css.seatCount}>
              {processedArr[idx][idx2][idx3].seats.seats.length}석
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
