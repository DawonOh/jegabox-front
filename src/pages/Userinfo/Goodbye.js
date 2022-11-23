import React, { Fragment } from 'react';
import css from './Goodbye.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import ChangeInfo from '../../components/UserInfo/ChangeInfo/ChangeInfo';

const Goodbye = () => {
  let isPass = localStorage.getItem('changeInfoPassCode');
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>회원탈퇴</h1>
            <div className={css.userInfoMain}></div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Goodbye;
