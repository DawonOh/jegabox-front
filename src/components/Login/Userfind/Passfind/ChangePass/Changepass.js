import React from 'react';
import css from './Changepass.module.scss';

const Changepass = () => {
  return (
    <div className={css.changePassWrap}>
      <h1>비밀번호 재설정</h1>
      <p className={css.infoMessage}>
        보안인증이 완료되었습니다. 새로 사용하실 비밀번호를 입력해주세요.
      </p>
      <table>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>asdf</td>
          </tr>
          <tr>
            <th>새 비밀번호</th>
            <td>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
              />
            </td>
          </tr>
          <tr>
            <th>새 비밀번호 확인</th>
            <td>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
              />
              <p>
                비밀번호는 영문,숫자,특수기호 중 2가지 이상 조합하여 10자리 이상
                16자리 이하 입니다.
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>
          비밀번호는 영문, 숫자, 특수문자 중 2가지 이상 조합 10자리 이상으로
          설정해주세요.
        </li>
        <li>
          생년월일, 휴대폰번호 등 개인정보와 관련된 숫자, 연속된 숫자와 같이
          쉬운 비밀번호는 사용을 자제해주세요.
        </li>
        <li>비밀번호는 3개월마다 변경해주세요.</li>
        <li>
          비밀번호 변경시 로그인된 모든 디바이스에서 로그아웃됩니다. 변경한
          비밀번호로 다시 로그인 후 이용해주세요.
        </li>
        <li>
          비밀번호 설정 시 사용가능한 특수문자는 ~ ! @ # $ % ^ & * + = - ? _
          입니다.
        </li>
      </ul>
      <button className={css.changePassBtn}>확인</button>
    </div>
  );
};

export default Changepass;
