import React, { useEffect, useRef, useState } from 'react';
import css from './AlertModal.module.scss';

const WrongLoginAlert = ({ closeAlertModal }) => {
  return (
    <div className={css.AlertModalBackground}>
      <div className={css.AlertModalContainer}>
        <div className={css.AlertModalHeader}>
          <div className={css.AlertModalHeaderTitle}>
            <h3>알림</h3>
            <button className={css.closeAlertModal} onClick={closeAlertModal} />
          </div>
        </div>
        <div className={css.AlertModalMain}>
          <div className={css.AlertModalContents}>
            <p>아이디 또는 비밀번호가 맞지 않습니다.</p>
            <p>로그인 정보를 다시 확인바랍니다.</p>
          </div>
          <button className={css.checkAlertModal} onClick={closeAlertModal}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default WrongLoginAlert;
