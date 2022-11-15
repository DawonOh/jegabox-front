import React, { useEffect, useState } from 'react';
import css from './DayBtn.module.scss';

function DayBtn({ date, week, today }) {
  const [btnDisable, setBtnDisable] = useState(false);
  useEffect(() => {
    new Date(date).getDate() >= today + 5
      ? setBtnDisable(true)
      : setBtnDisable(false);
  }, []);

  if (new Date(date).getDate() === today) {
    week = '오늘';
  }
  if (new Date(date).getDate() === today + 1) {
    week = '내일';
  }

  return (
    <div className={css.container}>
      <button disabled={btnDisable}>
        {new Date(date).getDate()}
        <img src="image/square.png" alt="square" width="3px" height="3px" />
        {week}
      </button>
    </div>
  );
}

export default DayBtn;
