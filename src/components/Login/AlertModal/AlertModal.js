import React, { useEffect, useRef, useState } from 'react';
import css from './AlertModal.module.scss';

const AlertModal = ({ closeAlertModal, messages }) => {
  const [messageList, setMessageList] = useState(messages);
  // useEffect(() => {
  //   if (messages !== null) {
  //     setMessageList(messages);
  //   }
  //   console.log(messageList);
  // }, [messages]);

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
            {messageList.map(message => {
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
