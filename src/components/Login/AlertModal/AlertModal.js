import React, { useEffect, useRef, useState } from 'react';
import css from './AlertModal.module.scss';

const AlertModal = ({ closeAlertModal, messages }) => {
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
            {messages.map(message => {
              return <p key={message.id}>{message.message}</p>;
            })}
          </div>
          <button className={css.checkAlertModal} onClick={closeAlertModal}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
