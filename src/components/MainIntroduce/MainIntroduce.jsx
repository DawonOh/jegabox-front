import React from 'react';
import css from './MainIntroduce.module.scss';
import footerIcon from '../../img/footerIcon.png';

const MainIntroduce = () => {
  return (
    <div className={css.position}>
      <div className={css.wholeIntroduce}>
        <div className={css.title}>제가박스 안내</div>
        <div className={css.imgContainer}>
          <img
            style={{ marginLeft: '0px' }}
            src="https://cdn.pixabay.com/photo/2017/04/05/22/26/theatre-2206583__480.jpg"
          />
          <img src="https://ifh.cc/g/wz6tHw.jpg" />
          <img src="https://cdn.pixabay.com/photo/2015/12/09/17/12/popcorn-1085072_1280.jpg" />
          <img src="https://ifh.cc/g/pScJPz.jpg" />
          <img src="https://ifh.cc/g/jwA5wS.jpg" />
          <img src="https://cdn.pixabay.com/photo/2017/07/13/23/11/cinema-2502213_1280.jpg" />
        </div>
        <div className={css.notice}>
          <div className={css.name}>제가박스</div>
          <div className={css.noticeContent}>
            <div className={css.noticeTitle}>
              <span className={css.special}>[공지]</span>쉿 제가박스는 공사중!
              (6/21)
            </div>
            <div>2022.12.25</div>
          </div>
          <div className={css.plus}>더보기 ></div>
        </div>
        <div className={css.iconContainer}>
          <div className={css.icon}>
            <img src={footerIcon} />
          </div>
          <div className={css.iconName}>
            <span className={css.span}>고객센터</span>
            <span className={css.span}>자주 묻는 질문</span>
            <span style={{ marginRight: '110px' }} className={css.span}>
              1:1 문의
            </span>
            <span style={{ marginRight: '85px' }} className={css.span}>
              단체/대관문의
            </span>
            <span className={css.span2}>분실물 문의/접수</span>
            <span> 더 부티크 대관예매</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainIntroduce;
