import React, { Fragment } from 'react';
import css from './Userinfo.module.scss';
import UserInfo from '../../components/UserInfo/UserInfo';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';

const Userinfo = () => {
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <h1 className={css.userInfoTitle}>회원정보</h1>
          <div className={css.userInfoMain}>
            <UserInfo />
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Userinfo;
