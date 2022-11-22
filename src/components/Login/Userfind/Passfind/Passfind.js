import React, { useState, useEffect, useRef } from 'react';
import css from './Passfind.module.scss';
import AlertModal from '../../AlertModal/AlertModal';

const Passfind = () => {
  const [id, setId] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [isPhoneWrong, setIsPhoneWrong] = useState(false);

  // 비밀번호 찾기 버튼 비활성화
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

  //아이디 유효성검사
  const handelId = e => {
    let data = e.target.value;
    e.target.value = data.replace(/[^a-zA-Z0-9]/g, '');
    setId(e.target.value);
  };

  //이름 유효성검사
  const handleName = e => {
    let data = e.target.value;
    e.target.value = data.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
    setNameValue(e.target.value);
  };

  //전화번호 유효성 검사
  const handlePhoneNum = e => {
    let data = e.target.value;

    e.target.value = data.replace(/[^0-9]/g, '');

    const phoneRegex = /(01[0|1])(\d{4})(\d{4})/;

    if (!phoneRegex.test(e.target.value)) {
      setIsPhoneWrong(true);
    } else {
      setIsPhoneWrong(false);
    }
    setPhoneNumValue(e.target.value);
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

  //인증요청 버튼 활성화 판단
  useEffect(() => {
    if (id && nameValue && phoneNumValue && isPhoneWrong === false) {
      setIsDisabledReqBtn(false);
    } else if (id || nameValue || phoneNumValue || isPhoneWrong === false) {
      setIsDisabledReqBtn(true);
    }
  }, [id, nameValue, phoneNumValue, isPhoneWrong]);

  //알림 모달창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  //알림 모달창 내용
  const wrongInfomessage = [
    { id: 1, message: '회원님의 계정에 등록된 정보와 일치하지 않습니다.' },
    { id: 2, message: '다시 입력해주세요.' },
  ];

  const successSend = [
    { id: 1, message: '인증번호를 전송했습니다.' },
    { id: 2, message: '인증번호가 도착하지 않았을 경우 재전송을 눌러주세요.' },
  ];

  //입력받은 정보가 맞는지 확인 / 맞으면 타이머 시작 / 인증번호 문자 전송
  const sendInfo = () => {
    fetch('http://localhost:8000/users/validateNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumValue,
        account_id: id,
        name: nameValue,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setId(json.userID);
          setStartTimer(startTimerFunc);
          setTryAgain(true);
          setDisabledInput(false);
          setIsSame('pass');
          openAlertModal();
          return;
        } else {
          setStartTimer(false);
          setIsSame('none');
          openAlertModal();
          return;
        }
      });
  };

  const startTimerFunc = () => {
    setStartTimer(true);
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
    fetch('http://localhost:8000/users/validateNumber', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumValue,
        account_id: id,
        name: nameValue,
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
        account_id: id,
        validateNumber: checkRandomNum,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          localStorage.setItem('passToken', json.token);
          setCode(json.code);
          setIsDisabledBtn(false);
          openAlertModal();
          return;
        } else {
          setCode('');
          setIsDisabledReqBtn(false);
        }
      });
  };

  //비밀번호 변경 페이지 이동을 위한 정보 저장
  //localStorage에 code가 있으면 userfind페이지에서 컴포넌트 변경
  //id 저장해놓고 비밀번호 변경 페이지에서 띄워야 함
  const goToChangePass = () => {
    localStorage.setItem('code', 200);
    localStorage.setItem('id', id);
    window.location.reload();
  };

  const passMessage = [{ id: 1, message: '휴대폰 인증을 완료했습니다.' }];

  return (
    <div className={css.passFindWrap}>
      {alertModal &&
        (startTimer ? (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={passMessage}
          />
        ) : (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={wrongInfomessage}
          />
        ))}
      <table>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>
              <input type="text" placeholder="아이디" onChange={handelId} />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td>
              <input type="text" placeholder="이름" onChange={handleName} />
            </td>
          </tr>
          <tr>
            <th>휴대폰 번호</th>
            <td>
              <input
                type="text"
                placeholder="'-'없이 입력"
                onChange={handlePhoneNum}
                maxLength="11"
              />
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
                    code !== 200 ? `${css.onCertification}` : `${css.getNumBtn}`
                  }
                  disabled={isDisabledReqBtn}
                  onClick={() => {
                    // sendInfo();
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
                  disabled={isDisabledInput}
                  onChange={handleNum}
                  maxLength="6"
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
              {alertModal && isSame === 'pass' ? (
                <AlertModal
                  closeAlertModal={closeAlertModal}
                  messages={successSend}
                />
              ) : (
                <div />
              )}
              {!timeout ? (
                <p
                  className={
                    isPhoneWrong
                      ? `${css.warning} ${css.warningOn}`
                      : `${css.warning} ${css.warningOff}`
                  }
                >
                  휴대폰번호를 정확히 입력해주세요.
                </p>
              ) : (
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
      <button
        className={
          !isDisabledBtn ? `${css.goFindPassBtn}` : `${css.findPassBtn}`
        }
        disabled={isDisabledBtn}
        onClick={goToChangePass}
      >
        비밀번호 찾기
      </button>
    </div>
  );
};

export default Passfind;
