import React from 'react';

import footerSns from '../../img/footerSns.png';
import css from './Footer.module.scss';

function Footer() {
  return (
    <div className={css.container}>
      <div className={css.footerWhole}>
        <div className={css.firstContainer}>
          <img src="https://ifh.cc/g/HV67Np.png" />
        </div>
        <div className={css.secondContainer}>
          <div className={css.leftContainer}>
            <img src="https://ifh.cc/g/m4L7Pv.jpg"></img>
            <div className={css.pContainer}>
              <p>
                서울특별시 오수구 빈드로 621 ,지상1013층(아모레파티) APR
                621-1013
              </p>
              <p>
                대표자명 비밀임 ・ 개인정보보호책임자도 비밀임 ・ 사업자
                등록번호 804 - 47 -800867 ・ 통신판매업신고번호 제
                1998-서울공릉-1802호{' '}
              </p>
              <p>COPYRIGHT © JegaboxJoongAng, Inc. All rights reserved</p>
            </div>
            <div className={css.footersns}>
              <img src={footerSns} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
