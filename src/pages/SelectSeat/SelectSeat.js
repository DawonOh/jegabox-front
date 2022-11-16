import React, { useState } from 'react';
import css from './SelectSeat.module.scss';

function SelectSeat() {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [elderly, setElderly] = useState(0);
  const prtseat = () => {
    const section = ['A', 'B', 'C', 'D'];
    const num = ['1', '2', '3', '4', '5'];
    const result = [];
    let idx = 0;
    for (let i = 0; i < section.length; i++) {
      for (let j = 0; j < num.length; j++) {
        idx++;
        result.push(
          <div
            className={css.seat}
            key={idx}
            onClick={() => console.log(section[i] + num[j])}
          >
            <h2>
              {section[i]}
              {num[j]}{' '}
            </h2>
          </div>
        );
      }
      result.push();
    }
    return result;
  };

  const prtbtn = (num, setFunc) => {
    return (
      <div className={css.Selectbtn}>
        <button onClick={() => minus(num, setFunc)} className={css.left}>
          -
        </button>
        <button className={css.prtNum}>{num}</button>
        <button onClick={() => plus(num, setFunc)} className={css.right}>
          +
        </button>
      </div>
    );
  };

  const minus = (num, setFunc) => {
    if (num > 0) {
      setFunc(--num);
    }
  };

  const plus = (num, setFunc) => {
    setFunc(++num);
  };
  return (
    <div className={css.container}>
      <div className={css.seatSelection}>
        <div className={css.m_title}>
          <h3>관람인원선택</h3>
          <button>초기화</button>
        </div>
        <div className={css.selectDisplay}>
          <div className={css.SelectPeople}>
            <div className={css.cell}>
              <p>성인</p>
              {prtbtn(adult, setAdult)}
            </div>
            <div className={css.cell}>
              <p>청소년</p>
              {prtbtn(child, setChild)}
            </div>
            <div className={css.cell}>
              <p>우대</p>
              {prtbtn(elderly, setElderly)}
            </div>
          </div>
          <div className={css.Select}>
            <img
              src="https://www.megabox.co.kr/static/pc/images/reserve/img-theater-screen.png"
              alt="screen"
              width="640px"
            />
            <div className={css.SelectSeat}>{prtseat()}</div>
          </div>
        </div>
      </div>
      <div className={css.seatResult}>
        <div className={css.tit_area}></div>
        <div className={css.info_area}></div>
        <div className={css.choice_area}></div>
        <div className={css.pay_area}></div>
        <div className={css.btn_group}></div>
      </div>
    </div>
  );
}

export default SelectSeat;
