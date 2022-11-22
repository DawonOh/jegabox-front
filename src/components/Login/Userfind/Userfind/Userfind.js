import React, { Fragment, useState } from 'react';
import css from './Userfind.module.scss';

import Idfind from '../Idfind/Idfind';
import Passfind from '../Passfind/Passfind';

const Userfind = () => {
  const [isOn, setIsOn] = useState(true);
  const [getInnerText, setGetInnerText] = useState('아이디 찾기');
  const handleOn = e => {
    setIsOn(!isOn);
    setGetInnerText(e.target.innerText);
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Userfind;
