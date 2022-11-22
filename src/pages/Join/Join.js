import React from 'react';
import css from './Join.module.scss';
import { Link } from 'react-router-dom';
import JoinComponent from '../../components/Join/Join';

const Join = () => {
  return (
    <div className={css.joinBackground}>
      <div className={css.joinContainer}>
        <Link to="/">
          <div className={css.joinLogo}>
            <div className={css.gotoMainLogo} />
          </div>
        </Link>
        <JoinComponent />
      </div>
    </div>
  );
};

export default Join;
