import React from 'react';
import css from './ScreeningInfo3.module.scss';
import { useNavigate, Link } from 'react-router-dom';
function App({ processedArr, idx, idx2, idx3 }) {
  const movie = processedArr[idx][idx2][idx3];
  const navigate = useNavigate();
  return (
    <div style={{ position: 'relative' }}>
      {/* <div className={css.onHover}></div> */}
      <div
        className={css.main}
        onClick={() => {
          console.log(movie);
        }}
      >
        <div className={css.noneHover}>
          <div className={css.time}>
            {processedArr[idx][idx2][idx3].seats.time}
          </div>
          <div className={css.seatCount}>
            {processedArr[idx][idx2][idx3].seats.seats.length}석
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
