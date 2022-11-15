import React, { useState } from 'react';
import css from './Booking.module.scss';
import DayBtn from '../../components/DayBtn/DayBtn';
import SelectSeat from '../SelectSeat/SelectSeat';
function Booking() {
  let now = new Date();
  let year = now.getFullYear(); //year
  let todayMonth = now.getMonth() + 1; //month
  let week = new Array('월', '화', '수', '목', '금', '토', '일');
  let date = now.getDate(); //날짜
  let day = now.getDay(); //요일
  const [num, setnum] = useState(0);
  const [disable, setDisable] = useState(false);

  const printDayBtn = num => {
    const result = [];

    for (let i = 0; i < 14; i++) {
      result.push(
        <DayBtn
          key={i}
          date={now.setDate(date + i + num)}
          week={week[day + (i % 7) - 2]}
          today={date}
        />
      );
    }
    return result;
  };

  const printTimeBtn = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(
        <button key={i}>
          {0}
          {i}
        </button>
      );
    }
    return result;
  };

  return (
    <div className={css.container}>
      <div className={css.innerWrap}>
        <h2>빠른 예매</h2>
        {disable && (
          <div className={css.bookTable}>
            <div className={css.timeSchedule}>
              <div className={css.year}>
                <p>
                  {year}.{todayMonth}
                </p>
              </div>
              <button onClick={() => setnum(num - 1)} disabled={disable}>
                {' '}
                <img
                  src="image/left-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              {printDayBtn(num)}
              <button onClick={() => setnum(num + 1)}>
                {' '}
                <img
                  src="image/right-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              <div className={css.cal}>
                <img src="image/cal.png" alt="cal" />
              </div>
            </div>
            <div className={css.choiceArea}>
              <div className={css.movieChoice}>
                <p>영화</p>
                <div className={css.m_listArea}>
                  <p>전체</p>
                  <div className={css.m_list}></div>
                </div>
                <div className={css.selectedMovie}></div>
              </div>
              <div className={css.theaterChoice}>
                <p>극장</p>
                <div className={css.t_listArea}>
                  <p>전체</p>
                  <div className={css.t_list}></div>
                </div>
                <div className={css.selectedTheater}></div>
              </div>
              <div className={css.timeChoice}>
                <p>시간</p>
                <div className={css.h_listArea}>
                  {' '}
                  <button>
                    {' '}
                    <img
                      src="image/left-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                  {printTimeBtn()}
                  <button>
                    {' '}
                    <img
                      src="image/right-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                </div>
              </div>
            </div>
            <div className={css.ad}>광고</div>
          </div>
        )}
        {!disable && <SelectSeat />}
      </div>
    </div>
  );
}

export default Booking;
