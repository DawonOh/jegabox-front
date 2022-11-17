import React, { useState } from 'react';
import css from './Userfind.module.scss';
import { Link } from 'react-router-dom';
import Idfind from '../../../components/Login/Userfind/Idfind/Idfind';

const Userfind = () => {
  const [isOn, setIsOn] = useState(true);
  const handleOn = () => {
    setIsOn(!isOn);
  };

  return (
    <div className={css.idfindBackground}>
      <div className={css.idfindContainer}>
        <Link to={'/main'}>
          <div className={css.userfindLogo}>
            <div className={css.gotoMainLogo} />
          </div>
        </Link>
        <div className={css.userfindTitle}>
          <h1>아이디/비밀번호 찾기</h1>
        </div>
        <div className={css.userfindBtn}>
          <div className={isOn ? css.on : css.off} onClick={handleOn}>
            아이디 찾기
          </div>
          <div className={!isOn ? css.on : css.off} onClick={handleOn}>
            비밀번호 찾기
          </div>
        </div>
        {/* 아이디찾기, 비밀번호찾기 컴포넌트 들어갈 자리.. */}
        <Idfind />
      </div>
    </div>
  );
};

export default Userfind;
