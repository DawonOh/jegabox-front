import React, { Fragment, useState, useEffect } from 'react';
import css from './Userpasschange.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import AlertModal from '../../components/Login/AlertModal/AlertModal';
import { Link } from 'react-router-dom';

const Userpasschange = () => {
  const [nowPass, setNowPass] = useState();
  const [pass, setPass] = useState('');
  //입력받은 비밀번호가 조건에 맞는지 확인 여부
  const [checkPassRegex, setCheckPassRegex] = useState('');
  //비밀번호 확인
  const [checkPass, setCheckPass] = useState('');
  //입력받은 비밀번호 확인이 조건에 맞는지 확인 여부
  const [checkPassAgainRegex, setCheckPassAgainRegex] = useState('');
  //새 비밀번호와 비밀번호 확인이 같은 지 여부
  const [same, setSame] = useState('');
  //비밀번호 수정 완료 여부
  const [success, setSuccess] = useState('');

  //현재 비밀번호와 새 비밀번호가 같은지 확인
  const [sameNowAndNew, setSameNowAndNew] = useState('');

  //알림 모달창
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };

  const sameNumMessage = [{ id: 1, message: '비밀번호가 일치하지 않습니다.' }];
  const wrongPass = [
    { id: 1, message: '비밀번호를 형식에 맞게 작성해주세요.' },
  ];
  const noNowPass = [{ id: 1, message: '현재 비밀번호를 입력해 주세요.' }];
  const noPass = [{ id: 1, message: '새 비밀번호를 입력해 주세요.' }];
  const noCheckPass = [{ id: 1, message: '새 비밀번호를 재입력해 주세요.' }];

  const successChangePass = [{ id: 1, message: '비밀번호가 저장되었습니다.' }];

  const failChangePass = [{ id: 1, message: '다시 시도해주세요.' }];

  //현재 비밀번호
  const handleNowPass = e => {
    setNowPass(e.target.value);
  };

  //새 비밀번호
  const handlePass = e => {
    setPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (check1 || check2 || check3) {
      setCheckPassRegex('pass');
    } else {
      setCheckPassRegex('none');
    }
  };

  //새 비밀번호 확인
  const handleCheckPass = e => {
    setCheckPass(e.target.value);
    let check1 = /^(?=.*[a-zA-Z])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    let check2 = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{10,16}$/.test(
      e.target.value
    );
    let check3 = /^(?=.*[^a-zA-Z0-9])(?=.*[0-9]).{10,16}$/.test(e.target.value);
    if (check1 || check2 || check3) {
      setCheckPassAgainRegex('pass');
    } else {
      setCheckPassAgainRegex('none');
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

  //수정 버튼 클릭
  const changePassResult = () => {
    if (
      same === 'same' &&
      checkPassRegex == 'pass' &&
      checkPassAgainRegex == 'pass' &&
      nowPass &&
      pass &&
      checkPass
    ) {
      console.log('비밀번호 전송!');
      fetch('http://localhost:8000/users/password2', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: nowPass,
          password_new: pass,
          passwordForCheck_new: checkPass,
        }),
      })
        .then(res => res.json())
        .then(json => {
          console.log(json);
          if (json.code == 200) {
            setSuccess('success');
            openAlertModal();
          } else {
            setSuccess('fail');
            openAlertModal();
          }
        });
    } else if (
      checkPassRegex == 'none' ||
      checkPassAgainRegex == 'none' ||
      !nowPass ||
      !pass ||
      !checkPass
    ) {
      openAlertModal();
    } else {
      openAlertModal();
    }
  };

  return (
    <Fragment>
      {alertModal ? (
        same == 'none' && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={sameNumMessage}
          />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        checkPassRegex == 'none' && (
          <AlertModal closeAlertModal={closeAlertModal} messages={wrongPass} />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        checkPassAgainRegex == 'none' && (
          <AlertModal closeAlertModal={closeAlertModal} messages={wrongPass} />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        !nowPass && (
          <AlertModal closeAlertModal={closeAlertModal} messages={noNowPass} />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        !pass && (
          <AlertModal closeAlertModal={closeAlertModal} messages={noPass} />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        !checkPass && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={noCheckPass}
          />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        success == 'success' && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={successChangePass}
          />
        )
      ) : (
        <></>
      )}
      {alertModal ? (
        success == 'fail' && (
          <AlertModal
            closeAlertModal={closeAlertModal}
            messages={failChangePass}
          />
        )
      ) : (
        <></>
      )}
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>비밀번호 변경</h1>
            <div className={css.userInfoMain}>
              <p>
                현재 비밀번호를 입력한 후 새로 사용할 비밀번호를 입력하세요.
              </p>
              <table>
                <tbody>
                  <tr>
                    <th>현재 비밀번호</th>
                    <td>
                      <input type="text" onChange={handleNowPass} />
                    </td>
                  </tr>
                  <tr>
                    <th>새 비밀번호</th>
                    <td>
                      <input type="text" onChange={handlePass} />
                      <span>
                        ※ 영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리
                        이상으로 입력 해 주세요.
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th>새 비밀번호 재입력</th>
                    <td>
                      <input type="text" onChange={handleCheckPass} />
                      <span>
                        ※ 비밀번호 확인을 위해 한 번 더 입력해 주시기 바랍니다.
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <ul>
                <li>
                  생년월일, 전화번호 등 개인 정보와 관련된 숫자, 연속된 숫자와
                  같이 쉬운 비밀번호는 다른 사람이 쉽게 알아낼 수 있으니 사용을
                  자제해 주세요.
                </li>
                <li>비밀번호는 3-6개월마다 꼭 바꿔 주세요.</li>
                <li>
                  비밀번호 변경시 모바일 기기와 홈페이지에서 모두
                  로그아웃됩니다. 변경한 비밀번호로 다시 로그인해주세요.
                </li>
                <li>
                  비밀번호 설정 시 사용가능한 특수문자는 ~ ! @ # $ % ^ & * + = -
                  ? _ 입니다.
                </li>
              </ul>
            </div>
            <div className={css.changeInfoBtns}>
              <Link to="/mypage/userinfo">
                <button className={css.cancleBtn}>취소</button>
              </Link>

              <button className={css.changeInfoBtn} onClick={changePassResult}>
                수정
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Userpasschange;
