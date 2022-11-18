import React, { useRef, useState } from 'react';
import css from './Userfind.module.scss';
import { Link } from 'react-router-dom';
import Idfind from '../../../components/Login/Userfind/Idfind/Idfind';
import Passfind from '../../../components/Login/Userfind/Passfind/Passfind';

const Userfind = () => {
  const [isOn, setIsOn] = useState(true);
  const [getInnerText, setGetInnerText] = useState('아이디 찾기');
  const handleOn = e => {
    setIsOn(!isOn);
    setGetInnerText(e.target.innerText);
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
        {getInnerText === '아이디 찾기' ? <Idfind /> : <Passfind />}
      </div>
    </div>
  );
};

export default Userfind;
