import React, { Fragment } from 'react';
import css from './Userpasschange.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';

const Userpasschange = () => {
  let isPass = localStorage.getItem('changeInfoPassCode');
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>비밀번호 변경</h1>
            <div className={css.userInfoMain}></div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Userpasschange;
