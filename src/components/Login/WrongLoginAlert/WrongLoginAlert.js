import React, { useEffect, useRef, useState } from 'react';
import css from './WrongLoginAlert.module.scss';

const WrongLoginAlert = ({ closeLoginAlert }) => {
  return (
    <div className={css.loginAlertBackground}>
      <div className={css.loginAlertContainer}>
        <div className={css.loginAlertHeader}>
          <div className={css.loginAlertHeaderTitle}>
            <h3>알림</h3>
            <button className={css.closeLoginAlert} onClick={closeLoginAlert} />
          </div>
        </div>
        <div className={css.loginAlertMain}>
          <div className={css.loginAlertContents}>
            <p>아이디 또는 비밀번호가 맞지 않습니다.</p>
            <p>로그인 정보를 다시 확인바랍니다.</p>
          </div>
          <button className={css.checkLoginAlert} onClick={closeLoginAlert}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongLoginAlert;
