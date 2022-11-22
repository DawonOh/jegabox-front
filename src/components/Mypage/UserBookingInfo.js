import React from 'react';
import css from './UserBookingInfo.module.scss';

function App() {
  return (
    <div className={css.mainDiv}>
      <div className={css.outArea}>총 1건</div>
      <div className={css.bookingInfo}>
        <div className={css.imgDiv}></div>
        <div className={css.infoDiv}>
          <div className={css.infoCell}>예매번호</div>
          <div className={css.infoCell}>영화명</div>
          <div className={css.infoCell}>
            <div className={css.infoCellLeft}>극장/상영관</div>
            <div className={css.infoCellRight}>관람인원</div>
          </div>
          <div className={css.infoCell}>
            <div className={css.infoCellLeft}>관람일시</div>
            <div className={css.infoCellRight}>관람좌석</div>
          </div>
          <div className={css.infoCell}>
            <div className={css.infoCellLeft}>결제일시</div>
            <div className={css.infoCellRight}>적립예정 포인트</div>
          </div>
          <div className={`${css.infoCell} ${css.infoBtnDiv}`}>
            <button className={css.infoBtn}>제휴 포인트 추후 적립</button>
            <button className={css.infoBtn}>교환권출력</button>
            <button className={css.infoBtn}>예매취소</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
