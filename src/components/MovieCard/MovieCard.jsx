import React from 'react';
import css from './MovieCard.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
const MovieCard = () => {
  return (
    <>
      <div className={css.cardWhole}>
        <span className={css.cardNumber}>1</span>
        <div className={css.img}>
          <img src="https://ifh.cc/g/y9vG5f.jpg" />
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

export default MovieCard;
