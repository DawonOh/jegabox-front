import React, { useEffect, useRef, useState } from 'react';
import css from './LoginModal.module.scss';
import { useCookies } from 'react-cookie';
import AlertModal from './AlertModal/AlertModal';
import { Link } from 'react-router-dom';

const LoginModal = ({ closeLogin }) => {
  //로그인 버튼 disabled 상태값
  const [disabled, setDisabled] = useState(true);

  //로그인 여부 상태값
  const [isLogin, setIsLogin] = useState(false);

  //아이디 저장
  const [id, setId] = useState('');
  const [isRemember, setIsRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);

  //아이디,비밀번호 현재값 저장
  const [idValue, setIdValue] = useState();
  const [pwValue, setPwValue] = useState();
  const idInput = useRef();
  const pwInput = useRef();
  const getIdValue = e => {
    setIdValue(e.target.value);
  };
  const getPwValue = e => {
    setPwValue(e.target.value);
  };

  //아이디,비밀번호 둘 다 값이 존재해야 로그인 버튼 활성화
  useEffect(() => {
    if (idValue && pwValue) {
      setDisabled(false);
    } else if (!idValue || !pwValue) {
      setDisabled(true);
    }
  }, [idValue, pwValue]);

  //로그인 함수(로그인버튼 onclick)
  const login = () => {
    fetch('http://localhost:8000/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: idValue, password: pwValue }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.token) {
          localStorage.setItem('token', json.token);
          setIsLogin(true);
        }
      });
    if (isLogin) {
      closeLogin();
    } else {
      idInput.current.value = '';
      pwInput.current.value = '';
      openAlertModal();
      setDisabled(true);
      return;
    }
  };
  //알림 모달창 상태값
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  //쿠키 - 아이디 가져오기
  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setId(cookies.rememberId);
      setIsRemember(true);
    }
  }, []);

  //아이디 저장 클릭할 때 실행될 함수
  const handleOnChange = e => {
    setIsRemember(e.target.check);
    if (e.target.check) {
      setCookie('rememberId', idValue, { maxAge: 2592000 });
    } else {
      removeCookie('rememberId');
    }
  };

  //알림창 모달 메세지
  const message = [
    { id: 1, message: '아이디 또는 비밀번호가 맞지 않습니다.' },
    { id: 2, message: '로그인 정보를 다시 확인바랍니다.' },
  ];

  return (
    <div className={css.loginBackground}>
      {alertModal && <AlertModal closeAlertModal={closeAlertModal} />}
      <div className={css.loginContainer}>
        <div className={css.loginTop}>
          <div className={css.loginTopTitle}>
            <h3>로그인</h3>
            <button className={css.closeLoginBtn} onClick={closeLogin} />
          </div>
        </div>
        <div className={css.loginMain}>
          <div className={css.loginElements}>
            <div className={css.loginInputs}>
              <input
                type="text"
                placeholder="아이디"
                className={css.loginInputStyle}
                ref={idInput}
                onChange={getIdValue}
              />
              <input
                type="password"
                placeholder="비밀번호"
                className={css.loginInputStyle}
                ref={pwInput}
                onChange={getPwValue}
              />
            </div>
            <label htmlFor="saveIdRadio" className={css.loginCheckboxArea}>
              <input
                type="checkbox"
                name="saveIdRadio"
                className={css.loginChekboxStyle}
                defaultChecked={isRemember}
                onChange={handleOnChange}
              />
              아이디 저장
            </label>
            <button
              className={
                !disabled ? `${css.loginBtn}` : `${css.disabledLoginBtn}`
              }
              disabled={disabled}
              onClick={login}
            >
              로그인
            </button>
            <div className={css.loginFindInfo}>
              <div className={css.loginFIndInfoCenter}>
                <Link to={'/userfind'}>
                  <span className={css.loginLink}>ID / PW 찾기</span>
                </Link>
                <div className={css.loginFindBoundary} />
                <span className={css.loginLink}>회원가입</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
