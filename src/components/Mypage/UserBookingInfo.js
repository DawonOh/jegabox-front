import React from 'react';
import css from './UserBookingInfo.module.scss';

function App({ elem }) {
  function clickCancelBtn() {
    fetch('http://127.0.0.1:8000/booking/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        user_id: localStorage.getItem('id'),
        TicketNum: elem.ticket_number,
      }),
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        alert('예매가 취소되었습니다');
        window.location.reload();
      });
  }
  return (
    <div className={css.mainDiv}>
      <div className={css.bookingInfo}>
        <div
          className={css.imgDiv}
          style={{
            backgroundImage: `url(${elem.movie_poster})`,
            backgroundSize: 'cover',
          }}
        ></div>
        <div className={css.infoDiv}>
          <div className={css.infoCell}>
            <div className={css.infoCellSingle}>
              예매번호
              <span className={css.elemValue}>{elem.ticket_number}</span>
            </div>
          </div>
          <div className={css.infoCell}>
            <div className={css.infoCellSingle}>
              영화명<span className={css.elemValue}>{elem.ko_title}</span>
            </div>
          </div>
          <div className={css.infoCell}>
            <div className={css.infoCellLeft}>
              극장/상영관
              <span className={css.elemValue}>
                {`${elem.cinema_name} ${elem.screen}관`}
              </span>
            </div>
            <div className={css.infoCellRight}>
              관람인원
              <span className={css.elemValue}>
                {elem.seat_count_adult + elem.seat_count_child}
              </span>
            </div>
          </div>
          <div className={css.infoCell}>
            <div className={css.infoCellLeft}>
              관람일시<span className={css.elemValue}>{elem.showtime_day}</span>
            </div>
            <div className={css.infoCellRight}>
              관람좌석<span className={css.elemValue}>{elem.seat_name}</span>
            </div>
          </div>
          <div
            className={css.infoCell}
            style={{ backgroundColor: 'rgba(128, 128, 128, 0.261)' }}
          >
            <div className={css.infoCellLeft}>
              결제일시
              <span className={css.elemValue}>{elem.created_at}</span>
            </div>
            <div className={css.infoCellRight}>적립예정 포인트</div>
          </div>
          <div className={`${css.infoCell} ${css.infoBtnDiv}`}>
            <button className={css.infoBtn}>제휴 포인트 추후 적립</button>
            <button className={css.infoBtn}>교환권출력</button>
            <button
              className={`${css.infoBtn} ${css.cancelBtn}`}
              onClick={clickCancelBtn}
            >
              예매취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
