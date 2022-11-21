import React, { useState } from 'react';

import css from './Login.module.scss';
import LoginModal from '../../components/Login/LoginModal';

function Login() {
  // 로그인 모달창 상태값
  const [openLoginModal, setOpenLoginModal] = useState(false);
  // 모달창 여는 함수
  const openLogin = () => {
    setOpenLoginModal(true);
  };
  // 모달창 닫는 함수
  const closeLogin = () => {
    setOpenLoginModal(false);
  };

  return (
    <div className={css.container}>
      {/* 로그인 모달창 부분*/}
      {openLoginModal && <LoginModal closeLogin={closeLogin} />}
      <div onClick={openLogin}>로그인</div>
    </div>
  );
}

export default Login;
