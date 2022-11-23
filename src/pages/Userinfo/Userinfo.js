import React, { Fragment, useState, useRef, useEffect } from 'react';
import css from './Userinfo.module.scss';
import UserInfo from '../../components/UserInfo/UserInfo';

const Userinfo = () => {
  return (
    <Fragment>
      <div className={css.userinfoWrap}>
        <h1 className={css.userInfoTitle}>회원정보</h1>
        <div className={css.userInfoMain}>
          <UserInfo />
        </div>
      </div>
    </Fragment>
  );
};

export default Userinfo;
