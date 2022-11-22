import React from 'react';
import css from './Userfind.module.scss';
import { Link } from 'react-router-dom';
import UserfindMain from '../../../components/Login/Userfind/Userfind/Userfind';
import ChangePass from '../../../components/Login/Userfind/Passfind/ChangePass/Changepass';

const Userfind = () => {
  const id = localStorage.getItem('id');
  const code = localStorage.getItem('code');
  return (
    <div className={css.idfindBackground}>
      <div className={css.idfindContainer}>
        <Link to="/">
          <div className={css.userfindLogo}>
            <div className={css.gotoMainLogo} />
          </div>
        </Link>
        {code == 200 ? <ChangePass id={id} /> : <UserfindMain />}
      </div>
    </div>
  );
};

export default Userfind;
