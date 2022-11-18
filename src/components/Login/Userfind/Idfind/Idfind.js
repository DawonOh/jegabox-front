import React, { useEffect, useRef, useState } from 'react';
import css from './Idfind.module.scss';

const Idfind = () => {
  const [nameValue, setNameValue] = useState('');
  const [birthValue, setBirthValue] = useState('');
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [isBirthWrong, setIsBirthWrong] = useState(false);
  const [isPhoneWrong, setIsPhoneWrong] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState('');
  const nameInput = useRef();
  const handleName = e => {
    let data = e.target.value;
    //ㄱ-ㅎ가-힣a-zA-Z 를 제외한 나머지를 빈값으로 처리
    e.target.value = data.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, '');
    setNameValue(e.target.value);
  };
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
      console.log(birthRegex.test(e.target.value));
    } else {
      setIsBirthWrong(false);
      console.log(birthRegex.test(e.target.value));
    }
    setBirthValue(e.target.value);
  };

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

  //아이디 찾기 버튼 활성화
  useEffect(() => {
    if (
      nameValue &&
      birthValue &&
      isBirthWrong === false &&
      isPhoneWrong === false
    ) {
      setDisabled(false);
    } else if (
      nameValue ||
      birthValue ||
      isBirthWrong === false ||
      isPhoneWrong === false
    ) {
      setDisabled(true);
    }
  }, [nameValue, birthValue, isBirthWrong, isPhoneWrong]);

  //fetch로 데이터 전송 후 id받아오기
  const getId = () => {
    fetch('http://localhost:8000/users/ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phoneNumValue,
        birthday: birthValue,
        name: nameValue,
      }),
    })
      .then(res => res.json())
      .then(json => {
        setId(json.id);
      });
  };
  return (
    <div className={css.idFindWrap}>
      <table>
        <tbody>
          <tr>
            <th>이름</th>
            <td className={css.nameInputTd}>
              <input
                type="text"
                placeholder="이름"
                ref={nameInput}
                onChange={handleName}
              />
            </td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>
              <input
                type="text"
                placeholder="생년월일 앞8자리"
                onChange={handleBirth}
                maxLength="8"
              />
              <p
                className={
                  isBirthWrong
                    ? `${css.warning} ${css.warningOn}`
                    : `${css.warning} ${css.warningOff}`
                }
              >
                생년월일을 정확히 입력해주세요.
              </p>
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
              <p
                className={
                  isPhoneWrong
                    ? `${css.warning} ${css.warningOn}`
                    : `${css.warning} ${css.warningOff}`
                }
              >
                휴대폰번호를 정확히 입력해주세요.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        className={!disabled ? `${css.findIdBtn}` : `${css.disabledFindIdBtn}`}
        disabled={disabled}
        onClick={getId}
      >
        아이디 찾기
      </button>
    </div>
  );
};

export default Idfind;
