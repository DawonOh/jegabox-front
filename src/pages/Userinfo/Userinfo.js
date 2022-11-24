import React, { Fragment } from 'react';
import css from './Userinfo.module.scss';
import UserInfo from '../../components/UserInfo/UserInfo';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import ChangeInfo from '../../components/UserInfo/ChangeInfo/ChangeInfo';

const Userinfo = () => {
  let isPass = localStorage.getItem('changeInfoPassCode');
  return (
    <Fragment>
      <PageHeader />
      <div className={css.userinfo}>
        <div className={css.userinfoWrap}>
          <MypageSidebar />
          <div className={css.userinfoMainWrap}>
            <h1 className={css.userInfoTitle}>
              {isPass ? '개인정보수정' : '회원정보'}
            </h1>
            <div className={css.userInfoMain}>
              {isPass ? <ChangeInfo /> : <UserInfo />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Userinfo;
