import React, { Fragment, useEffect, useState } from 'react';
import css from './Goodbye.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import AlertModal from '../../components/Login/AlertModal/AlertModal';
import { Link } from 'react-router-dom';

const Goodbye = () => {
  const [pass, setPass] = useState('');
  const [successRemove, setSuccessRemove] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  let token = localStorage.getItem('token');

  const getPass = e => {
    setPass(e.target.value);
  };
  useEffect(() => {
    if (pass !== '') {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [pass]);
  const goodbye = () => {
    fetch('http://localhost:8000/users/ID', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
      body: JSON.stringify({
        password: pass,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.message.includes('REMOVED')) {
          setSuccessRemove('success');
          openAlertModal();
          localStorage.clear();
          setTimeout(function () {
            window.location.href = '/';
          }, 3000);
        } else if (json.message.includes('PASSWORD')) {
          setSuccessRemove('wrong');
          openAlertModal();
        } else {
          setSuccessRemove('fail');
          openAlertModal();
        }
      });
  };
  const [alertModal, setAlertModal] = useState(false);
  const openAlertModal = () => {
    setAlertModal(true);
  };
  const closeAlertModal = () => {
    setAlertModal(false);
  };
  const goodbyeMessage = [
    { id: 1, message: '탈퇴 처리되었습니다.' },
    { id: 2, message: '3초 후에 메인페이지로 이동됩니다.' },
  ];
  const failMessage = [{ id: 1, message: '다시 시도하세요.' }];
  const wrongPassMessage = [{ id: 1, message: '비밀번호를 확인해주세요.' }];

  const showAlert = () => {
    if (successRemove === 'success') {
      return (
        <AlertModal
          closeAlertModal={closeAlertModal}
          messages={goodbyeMessage}
        />
      );
    } else if (successRemove === 'wrong') {
      return (
        <AlertModal
          closeAlertModal={closeAlertModal}
          messages={wrongPassMessage}
        />
      );
    } else if (successRemove === 'fail') {
      return (
        <AlertModal closeAlertModal={closeAlertModal} messages={failMessage} />
      );
    }
  };
  return (
    <Fragment>
      {alertModal && showAlert()}
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>회원 탈퇴</h1>
            <div className={css.userInfoMain}>
              <h2>
                회원님의 비밀번호를 입력하시고 [탈퇴] 버튼을 클릭해주세요.
              </h2>
              <table>
                <tbody>
                  <tr>
                    <th>비밀번호</th>
                    <td>
                      <input type="password" onChange={getPass} />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={css.changeInfoBtns}>
                <Link to="/mypage/userinfo">
                  <button className={css.cancleBtn}>취소</button>
                </Link>
                <button
                  className={
                    isDisabled
                      ? `${css.disgoodbytJegaBoxBtn}`
                      : `${css.goodbytJegaBoxBtn}`
                  }
                  disabled={isDisabled}
                  onClick={goodbye}
                >
                  탈퇴
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Goodbye;
