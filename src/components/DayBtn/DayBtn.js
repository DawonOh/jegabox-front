import React, { useEffect, useState } from 'react';
import css from './DayBtn.module.scss';
function DayBtn({ date, week, today, setDate, idx, dayClick, setDayClick }) {
  const [btnDisable, setBtnDisable] = useState(false);
  useEffect(() => {
    new Date(date).getDate() <= today + 4 && new Date(date).getDate() >= today
      ? setBtnDisable(false)
      : setBtnDisable(true);
  }, []);

  if (new Date(date).getDate() === today) {
    week = '오늘';
  }
  if (new Date(date).getDate() === today + 1) {
    week = '내일';
  }
  let year = new Date(date).getFullYear();
  let month = new Date(date).getMonth() + 1;
  let date1 = new Date(date).getDate();

  const change = e => {
    e.preventDefault();
    setDayClick(e.target.value);
  };

  return (
    <div
      className={css.container}
      onClick={() => setDate(year + '-' + month + '-' + date1)}
    >
      <button
        onClick={change}
        className={`${css.btn + (idx == dayClick ? ' ' + css.active : '')}`}
        value={idx}
        disabled={btnDisable}
      >
        {new Date(date).getDate()}
        <img src="image/square.png" alt="square" width="3px" height="3px" />
        {week}
      </button>
    </div>
  );
}

export default DayBtn;
