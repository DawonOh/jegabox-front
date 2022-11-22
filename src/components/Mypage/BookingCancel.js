import React from 'react';
import css from './BookingCancel.module.scss';

function App() {
  return (
    <div className={css.main}>
      <div className={css.title}>예매취소내역</div>
      <div className={css.alert}>
        - 상영일 기준 7일간 취소내역을 확인하실 수 있습니다.
      </div>
      <div className={css.titleDiv}>
        <div className={css.table}>
          <div className={css.cell}>취소일시</div>
          <div className={css.cell}>영화명</div>
          <div className={css.cell}>극장</div>
          <div className={css.cell}>상영일시</div>
          <div className={css.cell}>취소금액</div>
        </div>
        <div className={css.alertMent}>취소내역이 없습니다.</div>
      </div>
      <div className={css.alertDiv}>
        <div className={css.alertSpan}>이용안내</div>
        <div className={css.alertSpan2}>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
    </div>
  );
}

export default App;
