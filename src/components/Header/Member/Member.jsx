import React from 'react';
import css from './Member.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export const Member = () => {
  const Navigate = useNavigate();
  const [name, setname] = useState('');
  const [movieName, setMovieName] = useState('');
  const myname = window.localStorage.getItem('name');
  useEffect(() => {
    setname(myname);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/mypage/header', {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setMovieName(res));
  }, []);

  function moveReservation() {
    Navigate('/mypage');
  }

  return (
    <div className={css.position}>
      <div className={css.wholeContainer}>
        <div className={css.twoContainer}>
          <div style={{ width: '250px' }}>
            <p className={css.hello}>안녕하세요!</p>
            <p className={css.member1}>
              <span className={css.name}>{movieName.name}&nbsp;</span>회원님
            </p>
          </div>
          <button onClick={moveReservation} className={css.btn}>
            나의 제가박스
          </button>
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
              <button
                style={{ marginLeft: '10px' }}
                className={`${css.btn} ${css.btn60}`}
              >
                관람권
              </button>
            </div>
          </div>
          <div className={css.component}>
            <span className={css.title}>예매율</span>
            <span className={`${css.content} ${css.fontSize}`}>
              {movieName.ko_title}
            </span>
            <button
              className={`${css.btn} ${css.btn10}`}
              onClick={moveReservation}
            >
              예매내역
            </button>
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
