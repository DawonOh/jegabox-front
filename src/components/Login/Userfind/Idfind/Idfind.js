import React from 'react';
import css from './Idfind.module.scss';

const Idfind = () => {
  return (
    <div className={css.idFindWrap}>
      <table>
        <tbody>
          <tr>
            <th>이름</th>
            <td className={css.nameInputTd}>
              <input type="text" placeholder="이름" />
            </td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>
              <input type="text" placeholder="생년월일 앞8자리" />
              <p className={css.warning}>생년월일을 정확히 입력해주세요.</p>
            </td>
          </tr>
          <tr>
            <th>휴대폰 번호</th>
            <td>
              <input type="text" placeholder="'-'없이 입력" />
              <p className={css.warning}>휴대폰번호를 정확히 입력해주세요.</p>
            </td>
            {/* <td>Dolor</td>
            <td>Dolor</td> */}
          </tr>
        </tbody>
      </table>
      <button className={css.findIdBtn}>아이디 찾기</button>
    </div>
  );
};

export default Idfind;
