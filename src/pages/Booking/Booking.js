import React from 'react';

import css from './Booking.module.scss';

function Booking() {
  let now = new Date();
  let year = now.getFullYear();
  let todayMonth = now.getMonth() + 1;

  return (
    <div className={css.container}>
      <div className={css.innerWrap}>
        <h2>빠른 예매</h2>
        <div className={css.bookTable}>
          <div className={css.timeSchedule}>
            <div className={css.year}>
              <p>
                {year}.{todayMonth}
              </p>
            </div>
            시간관련 들어올예정
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
              <div className={css.h_listArea}></div>
            </div>
          </div>
          <div className={css.ad}>광고</div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
