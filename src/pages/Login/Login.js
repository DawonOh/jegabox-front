import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';

import css from './Login.module.scss';

function Login() {
  return (
    <>
      <div className={css.container}>
        <PageHeader />
      </div>
    </>
  );
}

export default Login;
