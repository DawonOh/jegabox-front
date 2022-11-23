import React, { Fragment, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import css from './ChangeInfo.module.scss';
import AlertModal from '../../Login/AlertModal/AlertModal';

const ChangeInfo = () => {
  let id = localStorage.getItem('account_id');
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [email, setEmail] = useState('');
  const [isClick, setIsClick] = useState(false);
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [samePhoneNum, setSamePhoneNum] = useState(false);
  const [isClickSendBtn, setIsClickSendBtn] = useState(false);
  let hyphenPhoneNum = phoneNum.replace(/(\d{3})(\d{4})(\d{4})/gi, '$1-$2-$3');
  // 확인 버튼 비활성화
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);

  // 인증요청 버튼, 인증번호 input 비활성화
  const [isDisabledReqBtn, setIsDisabledReqBtn] = useState(false);

  // 인증확인 버튼 비활성화
  const [isDisabledCheckBtn, setDisabledCheckBtn] = useState(false);

  //인증확인 input 비활성화
  const [isDisabledInput, setDisabledInput] = useState(true);

  //인증요청 -> 재전송 버튼 변경 여부
  const [tryAgain, setTryAgain] = useState(false);

  //입력받은 인증번호
  const [checkRandomNum, setCheckRandomNum] = useState('');

  //인증번호 일치 여부
  const [isSame, setIsSame] = useState('');

  //인증번호 최종 확인 받았을 때 성공 여부
  const [code, setCode] = useState('code');

  //타이머
  const [min, setMin] = useState(3);
  const [sec, setSec] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [timeout, setTimeout] = useState(false);
  useEffect(() => {
    fetch('http://localhost:8000/users/mypage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        setName(json.name);
        setBirthday(json.birthday);
        setPhoneNum(json.phone_number);
        setEmail(json.email);
      });
    return () => {
      localStorage.removeItem('changeInfoPassCode');
    };
  }, []);

  const handleClick = () => {
    setIsClick(!isClick);
  };

  const handleNewPhoneNum = e => {
    setNewPhoneNum(e.target.value);
    if (phoneNum === newPhoneNum) {
      setSamePhoneNum(true);
    }
  };

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

  //인증번호 요청 / 타이머 시작
  const sendInfo = () => {
    fetch('http://localhost:8000/users/validateNumber2', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNum,
        account_id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setStartTimer(true);
          setTryAgain(true);
          setDisabledInput(false);
          setIsClickSendBtn(true);
          openAlertModal();
          return;
        } else {
          setStartTimer(false);
          setIsClickSendBtn(false);
          openAlertModal();
          return;
        }
      });
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
      setDisabledInput(true);
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
        phone_number: phoneNum,
        account_id: id,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setMin(3);
          setSec(0);
          setStartTimer(true);
          setDisabledInput(false);
          setTimeout(false);
          openAlertModal();
        }
      });
  };

  //인증번호 맞는지 백으로 전송
  const checkNum = () => {
    fetch('http://localhost:8000/users/validateNumber', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNum,
        validateNumber: checkRandomNum,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          localStorage.setItem('passToken', json.token);
          setCode(json.code);
          setIsDisabledBtn(false);
          setIsSame('pass');
          openAlertModal();
          setTimeout(function () {
            window.location.reload();
          }, 3000);
          return;
        } else {
          setCode('');
          setIsDisabledReqBtn(false);
          setIsSame('none');
        }
      });
  };

  //알림창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  const successSend = [
    { id: 1, message: '인증번호를 전송했습니다.' },
    { id: 2, message: '인증번호가 도착하지 않았을 경우 재전송을 눌러주세요.' },
  ];
  const sameNumMessage = [{ id: 1, message: '휴대폰 번호가 동일합니다.' }];
  const passMessage = [{ id: 1, message: '변경이 완료되었습니다.' }];

  return (
    <Fragment>
      {alertModal ? (
        startTimer && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={successSend}
          />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        samePhoneNum == true && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={sameNumMessage}
          />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        isSame === 'pass' && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={passMessage}
          />
        )
      ) : (
        <></>
      )}
      <div className={css.changeInfoWrap}>
        <p>회원님의 정보를 정확히 입력해주세요.</p>
        <table>
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                {id}
                <Link to="/mypage/goodbye-jegabox">
                  <button className={css.goodbyeBtn}>회원탈퇴</button>
                </Link>
              </td>
            </tr>
            <tr>
              <th>이름</th>
              <td>{name}</td>
            </tr>
            <tr>
              <th>생년월일</th>
              <td>{birthday}</td>
            </tr>
            <tr>
              <th>휴대폰</th>
              <td>
                {hyphenPhoneNum}
                <button className={css.changePhoneNum} onClick={handleClick}>
                  {isClick ? '변경취소' : '휴대폰번호 변경'}
                </button>
                {isClick && (
                  <div className={css.changePhoneNumContainer}>
                    <span>변경할 휴대폰</span>
                    <input
                      type="text"
                      placeholder="'-'없이 입력해 주세요"
                      onChange={handleNewPhoneNum}
                    />
                    {!tryAgain ? (
                      <button
                        className={
                          !isDisabledReqBtn
                            ? `${css.onCertification}`
                            : `${css.getNumBtn}`
                        }
                        disabled={isDisabledReqBtn}
                        onClick={() => {
                          if (samePhoneNum !== true) {
                            sendInfo();
                          }
                        }}
                      >
                        인증번호 전송
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
                  </div>
                )}
                {isClickSendBtn && (
                  <div className={css.changePhoneNumContainer}>
                    <span>인증번호 입력</span>
                    <input
                      type="text"
                      placeholder="인증번호를 입력해 주세요"
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
                      변경완료
                    </button>
                    {timeout && (
                      <p className={css.warning}>
                        유효시간이 초과되었습니다. 인증번호 재전송을 통해서 다시
                        인증해주세요.
                      </p>
                    )}
                    {code == '' && (
                      <p className={css.warning}>
                        인증번호가 일치하지 않습니다. 인증번호를 다시
                        입력해주세요.
                      </p>
                    )}
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th>이메일</th>
              <td>
                <input type="text" defaultValue={email} />
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td>
                <Link to="/mypage/userpasschange">
                  <button className={css.changePassBtn}>비밀번호 변경</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
        <div className={css.changeInfoBtns}>
          <Link to="/mypage">
            <button className={css.cancleBtn}>취소</button>
          </Link>
          <button className={css.changeInfoBtn}>등록</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ChangeInfo;
