import React, { Fragment, useState, useRef, useEffect } from 'react';
import css from './UserInfo.module.scss';

const UserInfo = () => {
  let id = localStorage.getItem('account_id');
  let phone_number = localStorage.getItem('phone_number');
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
  const wrongInfomessage = [
    { id: 1, message: '회원님의 계정에 등록된 정보와 일치하지 않습니다.' },
    { id: 2, message: '다시 입력해주세요.' },
  ];

  const successSend = [
    { id: 1, message: '인증번호를 전송했습니다.' },
    { id: 2, message: '인증번호가 도착하지 않았을 경우 재전송을 눌러주세요.' },
  ];

  //인증번호 요청 / 타이머 시작
  const sendInfo = () => {
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

  //개인정보 변경 컴포넌트 이동을 위한 정보 저장
  //localStorage에 code가 있으면 userinfo 페이지에서 컴포넌트 변경
  //id 저장해놓고 비밀번호 변경 페이지에서 띄워야 함
  const goToChangePass = () => {
    localStorage.setItem('code', 200);
    localStorage.setItem('id', id);
    window.location.reload();
  };

  const passMessage = [{ id: 1, message: '휴대폰 인증을 완료했습니다.' }];

  return (
    <Fragment>
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
                <input type="text" disabled value={phone_number} />
                <button className={css.onCertification}>인증요청</button>
              </td>
            </tr>
            <tr>
              <th>인증번호</th>
              <td>
                <div className={css.certificationTd}>
                  <input type="text" className={css.certificationInput} />
                  <div className={css.passFindTimer}>
                    {min}:{sec < 10 ? `0${sec}` : sec}
                  </div>
                  <button className={css.getNumBtn} disabled>
                    인증확인
                  </button>
                </div>
                {/* <p className={css.warning}>
                  유효시간이 초과되었습니다. 인증번호 재전송을 통해서 다시
                  인증해주세요.
                </p>
                <p className={css.warning}>
                  인증번호가 일치하지 않습니다. 인증번호를 다시 입력해주세요.
                </p> */}
              </td>
            </tr>
          </tbody>
        </table>
        <div className={css.myInfoBtns}>
          <button className={css.goToMyPage}>취소</button>
          <button className={css.disConfirm}>확인</button>
        </div>
      </div>
    </Fragment>
  );
};

export default UserInfo;
