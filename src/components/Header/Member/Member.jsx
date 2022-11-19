import React from 'react';
import css from './Member.module.scss';

export const Member = () => {
  return (
    <div className={css.position}>
      <div className={css.wholeContainer}>
        <div className={css.twoContainer}>
          <div>
            <p className={css.hello}>안녕하세요!</p>
            <p className={css.member1}>
              <span className={css.name}>오뚜니&nbsp;</span>회원님
            </p>
            <p className={css.date}>
              마지막 접속일:<span>2022-10-13 10:00:00</span>
            </p>
          </div>
          <button className={css.btn}>나의 제가박스</button>
        </div>
        <div className={`${css.twoContainer} ${css.flex}`}>
          <div className={css.component}>
            <span className={css.title}>Point</span>
            <span className={css.content}>0</span>
            <button className={css.btn}>멤버십 포인트</button>
          </div>
          <div className={css.component}>
            <span className={css.title}>쿠폰/관람권</span>
            <span className={css.content}>1/0</span>
            <div className={css.btn2}>
              <button className={`${css.btn} ${css.btn60}`}>쿠폰</button>
              <button className={`${css.btn} ${css.btn60}`}>관람권</button>
            </div>
          </div>
          <div className={css.component}>
            <span className={css.title}>예매율</span>
            <span className={css.content1}>예매내역이 없어요!</span>
            <button className={`${css.btn} ${css.btn10}`}>예매내역</button>
          </div>
          <div className={css.component}>
            <span className={css.title}>구매</span>
            <span className={css.content}>
              0<span className={css.gun}>건</span>
            </span>
            <button className={css.btn}>구매내역</button>
          </div>
        </div>
      </div>
    </div>
  );
};
