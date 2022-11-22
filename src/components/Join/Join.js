import React, { Fragment, useState, useEffect, useRef } from 'react';
import css from './Join.module.scss';
import AlertModal from '../Login/AlertModal/AlertModal';

const Join = () => {
  //생년월일
  const [birthValue, setBirthValue] = useState('');
  const [isBirthWrong, setIsBirthWrong] = useState(false);
  //전화번호
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [isPhoneWrong, setIsPhoneWrong] = useState(false);
  //이름
  const [nameValue, setNameValue] = useState('');
  //아이디
  const [id, setId] = useState('');
  const [isIdWrong, setIsIdWrong] = useState(false);
  const [passId, setPassId] = useState(false);
  //비밀번호
  const [pass, setPass] = useState('');
  //입력받은 비밀번호가 조건에 맞는지 확인 여부
  const [checkPassRegex, setCheckPassRegex] = useState(false);
  //비밀번호 확인
  const [checkPass, setCheckPass] = useState('');
  //입력받은 비밀번호 확인이 조건에 맞는지 확인 여부
  const [checkPassAgainRegex, setCheckPassAgainRegex] = useState(false);
  //새 비밀번호와 비밀번호 확인이 같은 지 여부
  const [same, setSame] = useState('');
  //이메일
  const [email, setEmail] = useState('');
  const [isEmailWrong, setIsEmailWrong] = useState(false);

  //회원가입 버튼 활성화 여부
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);

  //회원가입 성공 여부
  const [success, setSuccess] = useState('');

  //0. 알림 모달창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };
  const passIDMessage = [{ id: 1, message: '사용가능한 ID입니다.' }];
  const failpassIdMessage = [{ id: 1, message: '이미 사용중인 ID입니다.' }];

  //1. 생년월일
  const handleBirth = e => {
    let data = e.target.value;
    // 숫자 이외의 값은 빈값으로 처리
    e.target.value = data.replace(/[^0-9]/g, '');

    // 1900년 01월 01일부터 ~현재연도 12월 31일까지만 가능
    const birthRegex = /(\b19|\b20)(\d\d)(0[0-9]|1[0-2])([0-2]\d|3(0|1))/;

    // 비교를 위해 연도 가져오기
    let usersBirthYear = data.substr(0, 4);
    let todayYear = new Date().getFullYear();

    // 정규식 통과못하거나 현재 연도보다 입력받은 연도가 더 크다면 no
    if (!birthRegex.test(e.target.value) || usersBirthYear > todayYear) {
      setIsBirthWrong(true);
    } else {
      setIsBirthWrong(false);
    }
    setBirthValue(e.target.value);
  };

  //2. 휴대폰 번호
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

  //3. 이름
  const handleName = e => {
    let data = e.target.value;
    //ㄱ-ㅎ가-힣a-zA-Z 를 제외한 나머지를 빈값으로 처리
    e.target.value = data.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
    setNameValue(e.target.value);
  };

  //4. 아이디
  const handelId = e => {
    const idRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!idRegex.test(e.target.value)) {
      setIsIdWrong(true);
    } else {
      setIsIdWrong(false);
    }
    setId(e.target.value);
  };

  //4-1. 아이디 중복 확인
  const alreadyUseId = () => {
    setTryCheckId('');
    fetch('http://localhost:8000/users/userID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        account_id: id,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.code == 200) {
          setPassId(true);
          openAlertModal();
        } else {
          setPassId(false);
          openAlertModal();
        }
      });
  };

  //5. 비밀번호
  const handlePass = e => {
    setPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (!(check1 || check2 || check3)) {
      setCheckPassRegex(false);
    } else {
      setCheckPassRegex(true);
    }
  };

  //6. 비밀번호 확인
  const handleCheckPass = e => {
    setCheckPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (!(check1 || check2 || check3)) {
      setCheckPassAgainRegex(false);
    } else {
      setCheckPassAgainRegex(true);
    }
  };

  //비밀번호, 비밀번호 확인이 같은지 확인
  useEffect(() => {
    if (pass === checkPass && checkPass) {
      setSame('same');
    } else {
      setSame('none');
    }
  }, [pass, checkPass]);

  //7. 이메일 주소
  const handleEmail = e => {
    const phoneRegex = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/;

    if (!phoneRegex.test(e.target.value)) {
      setIsEmailWrong(false);
    } else {
      setIsEmailWrong(true);
    }
    setEmail(e.target.value);
  };

  //회원가입 버튼 활성화 판단
  useEffect(() => {
    if (
      birthValue &&
      phoneNumValue &&
      nameValue &&
      id &&
      pass &&
      checkPass &&
      email &&
      isBirthWrong === false &&
      isPhoneWrong === false &&
      isIdWrong === false &&
      checkPassRegex === true &&
      checkPassAgainRegex === true &&
      same == 'same' &&
      isEmailWrong === true
    ) {
      setIsDisabledBtn(false);
    } else if (
      !birthValue ||
      !phoneNumValue ||
      !nameValue ||
      !id ||
      !pass ||
      !checkPass ||
      !email ||
      isBirthWrong === true ||
      isPhoneWrong === true ||
      isIdWrong === true ||
      checkPassRegex === false ||
      checkPassAgainRegex === false ||
      same !== 'same' ||
      isEmailWrong === false
    ) {
      setIsDisabledBtn(true);
    }
  }, [
    birthValue,
    phoneNumValue,
    id,
    pass,
    checkPass,
    email,
    isBirthWrong,
    isPhoneWrong,
    isIdWrong,
    checkPassRegex,
    checkPassAgainRegex,
    same,
    isEmailWrong,
  ]);

  //회원가입 버튼 클릭
  const [tryCheckId, setTryCheckId] = useState('');
  const join = () => {
    if (passId === false) {
      setTryCheckId('none');
      openAlertModal();
    } else {
      fetch('http://localhost:8000/users/userID', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          birthday: birthValue,
          phone_number: phoneNumValue,
          account_id: id,
          password: pass,
          passwordForCheck: checkPass,
          email: email,
          name: nameValue,
        }),
      })
        .then(response => response.json())
        .then(json => {
          let result = json.message;
          if (result.includes('SIGNED UP')) {
            setSuccess('성공');
            openAlertModal();
            setTimeout(function () {
              window.location.href = '/';
            }, 3000);
          } else {
            setSuccess('실패');
            openAlertModal();
          }
        });
    }
  };

  const tryIdCheck = [{ id: 1, message: '아이디 중복확인을 진행해 주세요' }];

  const successJoin = [
    { id: 1, message: '회원가입이 완료되었습니다.' },
    { id: 2, message: '3초 후에 메인페이지로 이동됩니다.' },
  ];
  const failJoin = [{ id: 1, message: '다시 시도해주세요.' }];

  return (
    <div className={css.joinWrap}>
      {alertModal ? (
        passId == true ? (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={passIDMessage}
          />
        ) : (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={failpassIdMessage}
          />
        )
      ) : (
        <></>
      )}

      {alertModal ? (
        tryCheckId === 'none' ? (
          <AlertModal closeAlertModal={closeAlertModal} messages={tryIdCheck} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      {alertModal ? (
        success == '성공' ? (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={successJoin}
          />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        success == '실패' ? (
          <AlertModal closeAlertModal={closeAlertModal} messages={failJoin} />
        ) : (
          <></>
        )
      ) : (
        <></>
      )}

      <h1 className={css.joinTitle}>회원님 안녕하세요.</h1>
      <p className={css.joinTitleContent}>회원정보를 입력해주세요.</p>
      <table>
        <tbody>
          <tr>
            <th>생년월일</th>
            <td>
              <input
                type="text"
                placeholder="생년월일 앞8자리"
                maxLength="8"
                onChange={handleBirth}
              />
              {isBirthWrong && (
                <p className={css.warning}>생년월일을 정확히 입력해주세요.</p>
              )}
            </td>
          </tr>
          <tr>
            <th>휴대폰 번호</th>
            <td>
              <input
                type="text"
                placeholder="'-'없이 입력"
                maxLength="11"
                onChange={handlePhoneNum}
              />
              {isPhoneWrong && (
                <p className={css.warning}>휴대폰번호를 정확히 입력해주세요.</p>
              )}
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td className={css.nameInputTd}>
              <input type="text" placeholder="이름" onChange={handleName} />
            </td>
          </tr>
          <tr>
            <th>아이디</th>
            <td className={css.nameInputTd}>
              <input
                type="text"
                placeholder="영문, 숫자 조합(8~12자)"
                onChange={handelId}
              />
              <button
                className={
                  !isIdWrong ? `${css.checkIdBtn}` : `${css.discheckIdBtn}`
                }
                disabled={isIdWrong}
                onClick={alreadyUseId}
              >
                중복확인
              </button>
              {isIdWrong && (
                <p className={css.warning}>
                  아이디는 영문,숫자 조합 8자리 이상 12자리 이하 입니다.
                </p>
              )}
            </td>
          </tr>
          <tr>
            <th>비밀번호</th>
            <td className={css.nameInputTd}>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
                onChange={handlePass}
              />
              {!checkPassRegex ? (
                pass.length > 0 ? (
                  <p className={css.warning}>
                    비밀번호는 영문,숫자,특수기호 중 2가지 이상 조합하여 10자리
                    이상 16자리 이하 입니다.
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </td>
          </tr>
          <tr>
            <th>비밀번호 확인</th>
            <td className={css.nameInputTd}>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
                onChange={handleCheckPass}
              />
              {!checkPassAgainRegex ? (
                checkPass.length > 0 ? (
                  <p className={css.warning}>
                    비밀번호는 영문,숫자,특수기호 중 2가지 이상 조합하여 10자리
                    이상 16자리 이하 입니다.
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
              {same != 'same' ? (
                checkPass.length > 10 ? (
                  <p className={css.warning}>
                    비밀번호와 비밀번호 확인의 입력값이 일치하지 않습니다.
                  </p>
                ) : (
                  <div></div>
                )
              ) : (
                <div></div>
              )}
            </td>
          </tr>
          <tr>
            <th>이메일 주소</th>
            <td className={css.nameInputTd}>
              <input
                type="text"
                placeholder="이메일 주소를 입력해 주세요"
                onChange={handleEmail}
              />
              {!isEmailWrong ? (
                email.length > 0 ? (
                  <p className={css.warning}>
                    올바른 이메일 형식으로 입력해주세요.
                  </p>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div>
        <button
          className={isDisabledBtn ? `${css.disjoinBtn}` : `${css.joinBtn}`}
          disabled={isDisabledBtn}
          onClick={join}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};

export default Join;
