import React, { useEffect, useState } from 'react';
import css from './Changepass.module.scss';
import AlertModal from '../../../AlertModal/AlertModal';

const Changepass = ({ id }) => {
  //비밀번호, 비밀번호 확인 input value
  const [pass, setPass] = useState('');
  const [checkPass, setCheckPass] = useState('');

  //변경 완료 확인용 code 저장
  const [code, setCode] = useState('');

  //확인 버튼 활성화 여부
  const [disabled, setDisabled] = useState(true);

  //새 비밀번호와 비밀번호 확인이 같은 지 여부
  const [same, setSame] = useState('');

  //입력받은 값이 조건에 맞는지 확인 여부
  const [checkRegex, setCheckRegex] = useState(false);

  let token = localStorage.getItem('passToken');

  const handlePass = e => {
    setPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (!(check1 || check2 || check3)) {
      setCheckRegex(false);
    } else {
      setCheckRegex(true);
    }
  };

  const handleCheckPass = e => {
    setCheckPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (!(check1 || check2 || check3)) {
      setCheckRegex(false);
    } else {
      setCheckRegex(true);
    }
  };
  const changePass = () => {
    fetch('http://localhost:8000/users/password1', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({
        password: pass,
        passwordForCheck: checkPass,
      }),
    })
      .then(res => res.json())
      .then(json => {
        if (json.code == 200) {
          setCode(json.code);
          openAlertModal();
          localStorage.removeItem('passToken');
          localStorage.removeItem('code');
          localStorage.removeItem('id');
          setTimeout(function () {
            window.location.href = '/';
          }, 3000);
        } else {
          openAlertModal();
          setCode('');
        }
      });
  };

  useEffect(() => {
    if (pass === checkPass && checkPass) {
      setSame('same');
    } else {
      setSame('none');
    }
  }, [pass, checkPass]);

  //알림 모달창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };
  const successSend = [
    { id: 1, message: '비밀번호 변경이 완료되었습니다.' },
    { id: 2, message: '3초 후에 메인페이지로 이동됩니다.' },
  ];
  const failSend = [{ id: 1, message: '비밀번호를 다시 확인해주세요.' }];

  return (
    <div className={css.changePassWrap}>
      {alertModal ? (
        code == 200 ? (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={successSend}
          />
        ) : (
          <AlertModal closeAlertModal={closeAlertModal} messages={failSend} />
        )
      ) : (
        <></>
      )}
      <h1>비밀번호 재설정</h1>
      <p className={css.infoMessage}>
        보안인증이 완료되었습니다. 새로 사용하실 비밀번호를 입력해주세요.
      </p>
      <table>
        <tbody>
          <tr>
            <th>아이디</th>
            <td>{id}</td>
          </tr>
          <tr>
            <th>새 비밀번호</th>
            <td>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
                onChange={handlePass}
                maxLength="16"
              />
            </td>
          </tr>
          <tr>
            <th>새 비밀번호 확인</th>
            <td>
              <input
                type="password"
                placeholder="영문,숫자,특수기호 중 2가지 이상 조합"
                onChange={handleCheckPass}
                maxLength="16"
              />
              {!checkRegex && pass !== '' && (
                <p className={css.warning}>
                  비밀번호는 영문,숫자,특수기호 중 2가지 이상 조합하여 10자리
                  이상 16자리 이하 입니다.
                </p>
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
      <div>
        <button
          className={
            same !== 'same' ? `${css.dischangePassBtn}` : `${css.changePassBtn}`
          }
          onClick={changePass}
          disabled={same === 'same' ? false : true}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Changepass;
