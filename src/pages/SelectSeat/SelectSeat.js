import React, { useEffect, useState } from 'react';
import css from './SelectSeat.module.scss';

function SelectSeat({ userMovie, setDisable }) {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [pay, setPay] = useState(0);
  const [s_seat, setSeat] = useState([]);
  let totalNum = adult + child;
  let user_seat = [];
  let [hour, minute] = userMovie.seats.time.split(':');
  let time = Number(hour) * 60 + Number(minute) + userMovie.movie_time;
  let f_time = String(Math.floor(time / 60)) + ':' + String(time % 60);
  let r_seats = userMovie.seats.seats;
  useEffect(() => {
    setPay(adult * 14000 + child * 13000);
  }, [adult, child]);
  const handleBack = () => {
    setDisable(true);
  };

  const handleSeat = seat => {
    if (s_seat.length < totalNum) {
      if (s_seat.includes(seat) === true) {
        alert('이미 선택한 좌석 입니다.');
      } else {
        setSeat([...s_seat, seat]);
      }
    } else {
      alert('인원 수 만큼 좌석을 선택 할 수 있습니다.');
    }
  };

  const prtS_seats = () => {
    let result = [];
    for (let i = 0; i < 8; i++) {
      result.push(
        <p key={i} className={css.eachSeat}>
          {s_seat[i] ? s_seat[i] : '  '}
        </p>
      );
    }
    return result;
  };
  const prtseat = () => {
    const section = ['A', 'B', 'C', 'D'];
    const num = ['1', '2', '3', '4', '5'];
    const result = [];
    let idx = 0;
    for (let i = 0; i < section.length; i++) {
      for (let j = 0; j < num.length; j++) {
        ++idx;

        result.push(
          <div
            className={`${
              css.seat +
              (s_seat.includes(section[i] + num[j]) ? ' ' + css.sell : ' ')
            }`}
            key={idx}
            onClick={() => handleSeat(section[i] + num[j])}
          >
            <button
              className={`${
                css.s_seat +
                (r_seats.includes(section[i] + num[j]) !== false
                  ? ''
                  : ' ' + css.empty)
              }`}
              disabled={
                r_seats.includes(section[i] + num[j]) !== false ? false : true
              }
            >
              {section[i] + num[j]}
            </button>
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
        seat_count_adult: adult,
        seat_count_child: child,
        price: pay,
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
        <button
          onClick={() =>
            totalNum < 8
              ? plus(num, setFunc)
              : alert('최대 8명까지 구매 가능합니다')
          }
          className={css.right}
        >
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
  const init = () => {
    setSeat([]);
    setAdult(0);
    setChild(0);
  };

  const plus = (num, setFunc) => {
    if (totalNum < 9) {
      setFunc(num + 1);
    }
  };
  return (
    <div className={css.container}>
      <div className={css.seatSelection}>
        <div className={css.m_title}>
          <h3>관람인원선택</h3>
          <button onClick={() => init()}>초기화</button>
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
          <p className={css.s_time}>
            {' '}
            {userMovie.seats.time}~{f_time}
          </p>
          <img src={userMovie.Img_url} alt="poster" />
        </div>
        <div className={css.choice_area}>
          <div className={css.w_seat}>
            <div className={css.seatImg}>
              <img src="/image/can.png" alt="can" width="20px" height="20px" />
              <p> 좌석 선택 가능</p>
              <img
                src="/image/cannot.png"
                alt="can"
                width="20px"
                height="20px"
              />
              <p> 좌석 선택 불가능</p>
            </div>
            <div className={css.selectedSeat}>{prtS_seats()}</div>
          </div>
        </div>
        <div className={css.pay_area}>
          <span className={css.total_money}>최종결제금액</span>{' '}
          <span className={css.price}>
            <span className={css.money}>{pay.toLocaleString()}</span>원
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
