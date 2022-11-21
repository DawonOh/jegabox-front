import React from 'react';
import css from './MainMovieCard.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
const MainMovieCard = () => {
  return (
    <>
      <div className={css.cardWhole}>
        <span className={css.cardNumber}>1</span>
        <div className={css.img}>
          <img src="https://ifh.cc/g/y9vG5f.jpg" />
        </div>
        <div className={css.movieInformation}>
          <img src="" />
          <span className={css.movieTitle}>올빼미</span>
        </div>
        <div className={css.movieInfor}>
          <div className={css.moviePeople}>
            관객수 <span>12.2k</span>
          </div>
          <div className={css.movieDate}>
            개봉일 <span>2022.11.27</span>
          </div>
        </div>
        <div className={css.underImg}>
          <div className={css.movieLike}>
            <AiOutlineHeart className={css.heart} />
            <span>245</span>
          </div>
          <div className={css.reservation}>
            <span>예매</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMovieCard;
