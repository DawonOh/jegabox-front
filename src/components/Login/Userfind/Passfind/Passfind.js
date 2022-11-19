import React, { useState } from 'react';
import css from './Passfind.module.scss';

const Passfind = () => {
  const [id, setId] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [isPhoneWrong, setIsPhoneWrong] = useState(false);

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
  return (
    <div className={css.passFindWrap}>
      <table>
        <tbody>
          <tr>
            <th>아이디</th>
            <td className={css.passfindInput}>
              <input type="text" placeholder="아이디" onChange={handelId} />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td className={css.passfindInput}>
              <input type="text" placeholder="이름" onChange={handleName} />
            </td>
          </tr>
          <tr>
            <th>휴대폰 번호</th>
            <td className={css.passfindInput}>
              <input
                type="text"
                placeholder="'-'없이 입력"
                onChange={handlePhoneNum}
              />
            </td>
          </tr>
          <tr>
            <th>인증번호</th>
            <td className={css.certificationTd}>
              <input type="text" className={css.certificationInput} />
              <div className={css.passFindTimer}></div>
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
      <button className={css.findPassBtn}>비밀번호 찾기</button>
    </div>
  );
};

export default Passfind;
