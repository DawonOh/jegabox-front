import React, { useEffect, useState } from 'react';
import css from './SelectSeat.module.scss';

function SelectSeat({ userMovie, setDisable }) {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [pay, setPay] = useState(0);
  let totalNum = adult + child;
  let user_seat = [];
  let [hour, minute] = userMovie.seats.time.split(':');
  let time = Number(hour) * 60 + Number(minute) + userMovie.movie_time;
  let f_time = String(Math.floor(time / 60)) + ':' + String(time % 60);
  console.log(userMovie);
  useEffect(() => {
    console.log(totalNum);
    setPay(adult * 14000 + child * 13000);
  }, [adult, child]);
  const handleBack = () => {
    setDisable(true);
  };
  const prtseat = () => {
    //있는 좌석만 받아오기 비교해서
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
  const buy = () => {
    fetch('http://127.0.0.1:8000/booking/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        showtime_id: userMovie.id,
        seat_count: totalNum,
        seat_name: user_seat,
      }),
    });
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
        <div className={css.tit_area}>
          {userMovie.title} <br />
          {userMovie.movie_property}
        </div>
        <div className={css.info_area}>
          {userMovie.cinema_name}
          <br />
          {userMovie.screen}관<br />
          {userMovie.seats.day}
          <br />
          {/**시간 선택 할수 있게 */}
          {userMovie.seats.time}~{f_time}
        </div>
        <div className={css.choice_area}></div>
        <div className={css.pay_area}>
          <span className={css.total_money}>최종결제금액</span>{' '}
          <span className={css.price}>
            <span className={css.money}>{pay}</span>원
          </span>
        </div>
        <div className={css.btn_group}>
          <button className={css.before} onClick={handleBack}>
            이전
          </button>
          <button className={css.submit} onClick={buy}>
            구매
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectSeat;
