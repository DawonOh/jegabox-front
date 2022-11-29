import React, { Fragment, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import css from './UserInfo.module.scss';
import AlertModal from '../Login/AlertModal/AlertModal';

const UserInfo = () => {
  let id = localStorage.getItem('account_id');
  let phone_number = localStorage.getItem('phone_number');

  let secretPhoneNum = phone_number.replace(
    /(\d{3})(\d{4})(\d{4})/gi,
    '$1-****-$3'
  );

  // 확인 버튼 비활성화
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);

  // 인증요청 버튼, 인증번호 input 비활성화
  const [isDisabledReqBtn, setIsDisabledReqBtn] = useState(false);

  // 인증확인 버튼 비활성화
  const [isDisabledCheckBtn, setDisabledCheckBtn] = useState(false);

  //인증요청 -> 재전송 버튼 변경 여부
  const [tryAgain, setTryAgain] = useState(false);

  //입력받은 인증번호
  const [checkRandomNum, setCheckRandomNum] = useState('');

  //인증번호 일치 여부
  const [isSame, setIsSame] = useState('');

  //인증번호 최종 확인 받았을 때 성공 여부
  const [code, setCode] = useState('code');

  //로그인 여부
  const [isLogin, setIsLogin] = useState(true);

  //타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [timeout, setTimeout] = useState(false);

  //인증번호 유효성 검사
  const handleNum = e => {
    let data = e.target.value;

    e.target.value = data.replace(/[^0-9]/g, '');

    const numRegex = /[0-9]/;

    if (numRegex.test(e.target.value)) {
      setCheckRandomNum(e.target.value);
      setDisabledCheckBtn(true);
    } else {
      setCheckRandomNum('');
      setDisabledCheckBtn(false);
    }
  };

  //알림 모달창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  //알림 모달창 내용

  const successSend = [
    { id: 1, message: '인증번호를 전송했습니다.' },
    { id: 2, message: '인증번호가 도착하지 않았을 경우 재전송을 눌러주세요.' },
  ];

  //인증번호 요청 / 타이머 시작
  const sendInfo = () => {
    if (!localStorage.getItem('phone_number')) {
      setIsLogin(false);
      openAlertModal();
    } else {
      fetch('http://localhost:8000/users/validateNumber2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: phone_number,
          account_id: id,
        }),
      })
        .then(res => res.json())
        .then(json => {
          if (json.code == 200) {
            setStartTimer(true);
            setTryAgain(true);
            openAlertModal();
            return;
          } else {
            setStartTimer(false);
            openAlertModal();
            return;
          }
        });
    }
  };

  // 타이머
  const time = useRef(180);
  const timerId = useRef(null);
  useEffect(() => {
    if (startTimer === true) {
      timerId.current = setInterval(() => {
        if (sec > 0) {
          setSec(sec - 1);
        } else if (sec === 0) {
          if (min === 0) {
            clearInterval(timerId.current);
          } else {
            setMin(min - 1);
            setSec(59);
          }
        }
        time.current -= 1;
      }, 1000);
      return () => {
        clearInterval(timerId.current);
      };
    }
  }, [min, sec, startTimer]);

  useEffect(() => {
    if (time.current <= 0) {
      setMin(3);
      setSec(0);
      clearInterval(timerId.current);
      setTimeout(true);
      setStartTimer(false);
      time.current = 180;
    }
  }, [min, sec]);

  const clickReSend = () => {
    fetch('http://localhost:8000/users/validateNumber2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone_number,
        account_id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setMin(3);
          setSec(0);
          setStartTimer(true);
          setTimeout(false);
          openAlertModal();
        }
      });
  };

  //인증번호 맞는지 백으로 전송
  const checkNum = () => {
    fetch('http://localhost:8000/users/validateNumber2', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone_number,
        validateNumber: checkRandomNum,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setCode(json.code);
          setIsDisabledBtn(false);
          setIsSame('pass');
          setStartTimer(false);
          openAlertModal();
          return;
        } else {
          setCode('');
          setIsDisabledReqBtn(false);
          setIsSame('none');
        }
      });
  };

  //개인정보 변경 컴포넌트 이동을 위한 정보 저장
  //localStorage에 changeInfoPassCode가 pass면 userinfo 페이지에서 컴포넌트 변경
  const goToChangeInfo = () => {
    if (!localStorage.getItem('token')) {
      setIsLogin(false);
      openAlertModal();
    } else {
      setIsLogin(true);
      localStorage.setItem('changeInfoPassCode', 'pass');
      window.location.reload();
    }
  };

  const passMessage = [{ id: 1, message: '휴대폰 인증을 완료했습니다.' }];
  const requireLoginMessage = [{ id: 1, message: '로그인 후 이용가능합니다.' }];
  const showAlert = () => {
    if (startTimer) {
      return (
        <AlertModal closeAlertModal={closeAlertModal} messages={successSend} />
      );
    } else if (isSame === 'pass') {
      return (
        <AlertModal closeAlertModal={closeAlertModal} messages={passMessage} />
      );
    } else if (isLogin === false) {
      return (
        <AlertModal
          closeAlertModal={closeAlertModal}
          messages={requireLoginMessage}
        />
      );
    }
  };
  return (
    <Fragment>
      {alertModal && showAlert()}
      <div className={css.userinfoContainer}>
        <p className={css.userinfomessage}>
          회원님의 개인정보 보호를 위해 등록된 휴대폰 번호로 인증을 하셔야
          합니다.
        </p>
        <table>
          <tbody>
            <tr>
              <th>휴대폰 번호</th>
              <td>
                <input type="text" disabled defaultValue={secretPhoneNum} />
                {!tryAgain ? (
                  <button
                    className={
                      !isDisabledReqBtn
                        ? `${css.onCertification}`
                        : `${css.getNumBtn}`
                    }
                    disabled={isDisabledReqBtn}
                    onClick={sendInfo}
                  >
                    인증요청
                  </button>
                ) : (
                  <button
                    className={
                      code !== 200
                        ? `${css.onCertification}`
                        : `${css.getNumBtn}`
                    }
                    disabled={isDisabledReqBtn}
                    onClick={() => {
                      clickReSend();
                    }}
                  >
                    재전송
                  </button>
                )}
              </td>
            </tr>
            <tr style={{ display: code == 200 && 'none' }}>
              <th>인증번호</th>
              <td>
                <div className={css.certificationTd}>
                  <input
                    type="text"
                    className={css.certificationInput}
                    onChange={handleNum}
                  />
                  <div className={css.passFindTimer}>
                    {min}:{sec < 10 ? `0${sec}` : sec}
                  </div>
                  <button
                    className={
                      !isDisabledCheckBtn
                        ? `${css.getNumBtn}`
                        : `${css.checkOkBtn}`
                    }
                    onClick={checkNum}
                    disabled={!isDisabledCheckBtn}
                  >
                    인증확인
                  </button>
                </div>
                {timeout && (
                  <p className={css.warning}>
                    유효시간이 초과되었습니다. 인증번호 재전송을 통해서 다시
                    인증해주세요.
                  </p>
                )}
                {code == '' && (
                  <p className={css.warning}>
                    인증번호가 일치하지 않습니다. 인증번호를 다시 입력해주세요.
                  </p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={css.myInfoBtns}>
          <Link to="/mypage">
            <button className={css.goToMyPage}>취소</button>
          </Link>

          <button
            className={
              !isDisabledBtn ? `${css.goChangeInfoBtn}` : `${css.disConfirm}`
            }
            onClick={goToChangeInfo}
          >
            확인
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
