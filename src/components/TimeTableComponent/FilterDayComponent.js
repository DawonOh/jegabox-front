import React, { useState, useEffect } from 'react';
import css from './dayList.module.scss';

function App({
  elem,
  idx,
  dayClick,
  day,
  dayOfWeekArr,
  setDayClickCheck,
  dayClickCheck,
  setCurrDate,
  month,
  year,
}) {
  const [backgroundColor, setbackgroundColor] = useState();
  const date = new Date();
  const today = date.getDate();

  function dayClick(event) {
    const day = event.target.innerText;
    setCurrDate(`${year}-${month + 1}-${parseInt(day)}`); // 개행 처리된 값에 split이 생각처럼 적용되지 않아서 애먹은 부분
    setDayClickCheck(idx);
  }

  useEffect(() => {
    idx === dayClickCheck
      ? setbackgroundColor('rgb(248, 248, 248)')
      : setbackgroundColor('white');
  }, [dayClickCheck]);

  return (
    <div
      key={idx}
      className={css.day}
      onClick={dayClick}
      style={{ backgroundColor: backgroundColor }}
    >
      {elem}
      <br />
      {elem === day ? '오늘' : elem === day + 1 ? '내일' : dayOfWeekArr[idx]}

      {`${month}${elem}` === `${month}${day}` && (
        <div className={css.yearMonth}>
          {year}-{month + 1}
        </div>
      )}
      {elem === 1 && (
        <div className={css.yearMonth}>
          {month + 2 > 12 ? year + 1 : year}-{month + 2 > 12 ? 1 : month + 2}
        </div>
      )}
    </div>
  );
}

export default App;
