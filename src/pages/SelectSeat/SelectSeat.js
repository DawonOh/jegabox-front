import React from 'react';
import css from './SelectSeat.module.scss';

function SelectSeat() {
  const prtseat = () => {
    const result = [];
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 5; j++) {
        result.push(<div className={css.seat}>좌석 </div>);
      }
      result.push();
    }
    return result;
  };
  return (
    <div className={css.container}>
      <div className={css.seatSelection}>
        <div className={css.m_title}>
          <h3>관람인원선택</h3>
          <button>초기화</button>
        </div>
        <div className={css.SelectPeople}></div>
        <div className={css.Select}>
          <img
            src="https://www.megabox.co.kr/static/pc/images/reserve/img-theater-screen.png"
            alt="screen"
            width="640px"
          />
          <div className={css.SelectSeat}>{prtseat()}</div>
        </div>
      </div>
      <div className={css.seatResult}> 결과지</div>
    </div>
  );
}

export default SelectSeat;
