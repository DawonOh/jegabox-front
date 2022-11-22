import React, { useState } from 'react';
import css from './BookingCancel.module.scss';
import UserCancelInfo from './UserCancelInfo';

function App() {
  const [alertCheck, setAlertCheck] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('white');

  function alertCheckFunc() {
    if (alertCheck === true) {
      setAlertCheck(false);
      setBackgroundColor('white');
    }
    if (alertCheck === false) {
      setAlertCheck(true);
      setBackgroundColor('rgb(243, 243, 243)');
    }
  }

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
        <UserCancelInfo />
      </div>
      <div
        className={css.alertDiv}
        onClick={alertCheckFunc}
        style={{ backgroundColor: backgroundColor }}
      >
        <div className={css.alertSpan}>이용안내</div>
        <div className={css.alertSpan2}>
          <i className="fa-solid fa-chevron-down"></i>
        </div>
      </div>
      {alertCheck && (
        <div className={css.alertModal}>
          <div className={css.alertModalCell}>
            [예매 안내]
            <br /> 만 4세(48개월) 이상부터는 영화티켓을 반드시 구매하셔야 입장
            가능합니다. <br />
            예매 변경은 불가능하며, 취소 후 재 예매를 하셔야만 합니다. <br />
            메가박스 모바일앱을 이용할 경우 티켓출력없이 모바일티켓을 통해 바로
            입장하실 수 있습니다.
          </div>
          <div className={css.alertModalCell}>
            [티켓교환 안내]
            <br /> 극장의 무인발권기(KIOSK)를 통해 예매번호 또는
            고객확인번호(생년월일+휴대폰번호)를 입력하여 편리하게 티켓을
            발권하실 수 있습니다. <br />
            무인발권기 이용이 어려우신경우, 티켓교환권을 출력하여 매표소에
            방문하시면 티켓을 발권하실 수 있습니다.
            <br />
            (티켓교환권 출력이 어려운경우 예매번호와 신분증을 지참하여 매표소에
            방문하시면 티켓을 발권하실 수 있습니다)
          </div>
          <div className={css.alertModalCell}>
            [예매취소 안내]
            <br /> 온라인(홈페이지/모바일) 예매 취소는 상영시간 20분전까지
            입니다.
            <br /> 위탁 예매 사이트 이용 시 취소 및 환불 규정은 해당 사이트
            규정을 따릅니다. <br />
            LIVE 공연 콘텐트는 취소 기준은 아래와 같습니다. <br />
            - 관람 4일전 : 취소 가능 관람 3일 ~ 1일전 : 취소 수수료 부담 후 취소
            가능 <br />
            - 관람 당일 : 취소 및 환불 불가 <br />
            - 공연 관람시 시작 시간 이후에는 입장이 제한 됩니다. <br />
            발권된 티켓은 상영시간 전까지 현장 방문 시에만 취소가 가능합니다.
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
