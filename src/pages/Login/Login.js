import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import PageHeader from '../../components/PageHeader/PageHeader';

import css from './Login.module.scss';

function Login() {
  return (
    <>
      <PageHeader />
      <div className={css.content}>
        <div className={css.text}>
          준비 중이니까 <br />
          나중에 오도록해
        </div>
        <div className={css.container}></div>
      </div>
      <div></div>

      <Footer />
    </>
  );
}

export default Login;
