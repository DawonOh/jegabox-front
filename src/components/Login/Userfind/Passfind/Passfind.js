import React from 'react';
import css from './Idfind.module.scss';

const Idfind = () => {
  return (
    <div className={css.passFindWrap}>
      <table>
        <tbody>
          <tr>
            <th>아이디</th>
            <td className={css.passfindIdInput}>
              <input type="text" placeholder="아이디" />
            </td>
          </tr>
          <tr>
            <th>이름</th>
            <td className={css.passfindNameInput}>
              <input type="text" placeholder="이름" />
            </td>
          </tr>
          <tr>
            <th>휴대폰 번호</th>
            <td className={css.passfindPhoneNumInput}>
              <input type="text" placeholder="'-'없이 입력" />
            </td>
          </tr>
          <tr>
            <th>인증번호</th>
            <td>
              <input type="text" />
              <div className={css.passFindTimer}></div>
            </td>
          </tr>
        </tbody>
      </table>
      <button className={css.findPassBtn}>아이디 찾기</button>
    </div>
  );
};

export default Idfind;
