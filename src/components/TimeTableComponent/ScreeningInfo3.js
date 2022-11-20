import React, { useState } from 'react';
import css from './ScreeningInfo3.module.scss';

function App({ processedArr, idx, idx2, idx3 }) {
  const [hoverState, setHoverState] = useState(false);
  function mouseEnter() {
    setHoverState(true);
  }

  function onMouseOut() {
    setHoverState(false);
  }
  return (
    <div className={css.main} onMouseEnter={mouseEnter} onMouseOut={onMouseOut}>
      {!hoverState && (
        <div className={css.noneHover}>
          <div className={css.time}>
            {processedArr[idx][idx2][idx3].seats.time}
          </div>
          <div className={css.seatCount}>
            {processedArr[idx][idx2][idx3].seats.seats.length}석
          </div>
        </div>
      )}
      {/* {hoverState && (
        <div className={css.onHover}>
          {processedArr[idx][idx2][idx3].seats.time} ~
        </div>
      )} */}
    </div>
  );
}

export default App;
