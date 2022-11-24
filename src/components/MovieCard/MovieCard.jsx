import React, { useTransition } from 'react';
import css from './MovieCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useRef } from 'react';
import { Navigate } from 'react-router-dom';
const MovieCard = props => {
  const navigate = useNavigate();
  const { id, img, cnt, description, number, movie } = props;
  const sendMovieInfo = () => {
    console.log(movie);
  };
  const [story, setStory] = useState(false);
  const [like, setlike] = useState(false);
  const [likeNum, setLikeNum] = useState(1);
  const likenumber = useRef();
  const makeLikeNum = () => {
    setLikeNum(likeNum + 1);
    if (likeNum % 2 == 0) {
      console.log(likeNum);
      setlike(false);
    }
    if (likeNum % 2 == 1) setlike(true);
  };

  const makeStory = () => {
    setStory(true);
  };
  const outStory = () => {
    setStory(false);
  };

  function clickPoster() {
    console.log('test');
  }

  // console.log(id);
  // console.log(img);
  // console.log(cnt);
  // console.log(description);
  return (
    <>
      <div className={css.cardWhole}>
        <span className={css.cardNumber}>{id}</span>
        <div
          className={css.img}
          onClick={() => navigate(`/detail?movieNo=${id}`)}
        >
          <img onMouseOut={outStory} onMouseOver={makeStory} src={img} />
          <span
            onMouseOver={makeStory}
            className={story ? `${css.story}` : `${css.none}`}
          >
            {description}
          </span>
        </div>
        <div className={css.underImg}>
          <div className={css.movieLike} onClick={makeLikeNum} ref={likenumber}>
            {like ? (
              <AiFillHeart
                style={{ color: 'rgb(2 123 148)' }}
                className={like ? `${css.heart}` : `${css.none}`}
              />
            ) : (
              <AiOutlineHeart className={css.heart} />
            )}
            <span>{cnt}</span>
          </div>
          <Link
            className={css.reservation}
            to={`/booking`}
            state={{ id: movie.id }}
          >
            <span>예매</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
