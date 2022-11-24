import React, { useEffect, useState } from 'react';
import css from './ScreeningInfo3.module.scss';
import { useNavigate, Link } from 'react-router-dom';
function App({ processedArr, idx, idx2, idx3 }) {
  const [endTime, setEndTime] = useState();
  const [hoverCheck, setHoverCheck] = useState(false);

  function onMouseOver() {
    setHoverCheck(true);
  }
  function onMouseOut() {
    setHoverCheck(false);
  }

  useEffect(() => {
    const playTime = processedArr[idx][idx2][idx3].movie_time;

    const playHour = parseInt(
      processedArr[idx][idx2][idx3].seats.time.split(':')[0]
    );
    const playMinute = parseInt(
      processedArr[idx][idx2][idx3].seats.time.split(':')[1]
    );

    let plusHour = Math.floor(playTime / 60);
    let restMinute = playTime % 60;

    let endHour = plusHour + playHour;
    let endMinute = playMinute + restMinute;

    if (endMinute > 60) {
      endHour += 1;
      endMinute -= 60;
    }

    if (endMinute < 10) endMinute = 0 + String(endMinute);

    setEndTime(`${endHour}:${endMinute} `);
  }, []);

  return (
    <Link
      className={css.link}
      to={`/booking`}
      state={{ movie: processedArr[idx][idx2][idx3] }}
      style={{ position: 'relative', width: '98px', height: '69px' }}
    >
      {hoverCheck && (
        <div className={css.onHover} onMouseOut={onMouseOut}>
          {`${processedArr[idx][idx2][idx3].seats.time}~${endTime}`}
        </div>
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
    </Link>
  );
}

export default App;
