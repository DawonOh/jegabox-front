import React, { useTransition } from 'react';
import css from './MovieCard.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
const MovieCard = props => {
  const { id, img, cnt, description } = props;
  const [story, setStory] = useState(false);
  const makeStory = () => {
    setStory(true);
  };
  const outStory = () => {
    setStory(false);
  };
  // console.log(id);
  // console.log(img);
  // console.log(cnt);
  // console.log(description);
  return (
    <>
      <div className={css.cardWhole}>
        <span className={css.cardNumber}>{id}</span>
        <div className={css.img}>
          <img onMouseOut={outStory} onMouseOver={makeStory} src={img} />
          <span className={story ? `${css.story}` : `${css.none}`}>
            {description}
          </span>
        </div>
        <div className={css.underImg}>
          <div className={css.movieLike}>
            <AiOutlineHeart className={css.heart} />
            <span>{cnt}</span>
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
