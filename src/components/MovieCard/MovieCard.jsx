import React, { useEffect, useTransition } from 'react';
import css from './MovieCard.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';

function MovieCard({ id, img, cnt, description, number, movie, setChange }) {
  const navigate = useNavigate();

  const [story, setStory] = useState(false);
  const [like, setLike] = useState();

  // console.log(likeArr);
  useEffect(() => {
    setLike(movie.isLiked);
  }, []);

  const handleLike = async () => {
    const token = localStorage.getItem('token');

    //영화 id 서버로 전송
    await fetch(`http://localhost:8000/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
      body: JSON.stringify({
        movie_id: id,
      }),
    });
    setChange(false);
    //data 갱신
    fetch(`http://localhost:8000/movie/detail/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => {
        setLike(res.isLiked);
        console.log(res);
      });
  };

  //array를 받아와서 like
  const makeStory = () => {
    setStory(true);
  };
  const outStory = () => {
    setStory(false);
  };

  return (
    <>
      <div className={css.cardWhole}>
        <span
          onMouseOut={outStory}
          onMouseOver={makeStory}
          className={css.cardNumber}
        >
          {id}
        </span>
        <div
          className={css.img}
          onClick={() => navigate(`/detail?movieNo=${id}`)}
        >
          <img onMouseOut={outStory} onMouseOver={makeStory} src={img} />
          <div
            onMouseOut={outStory}
            onMouseOver={makeStory}
            className={story ? `${css.descriptionWrap}` : `${css.none}`}
          >
            <span
              onMouseOut={outStory}
              onMouseOver={makeStory}
              className={css.story}
            >
              {description}
            </span>
          </div>
        </div>
        <div className={css.underImg}>
          <div className={css.movieLike} onClick={() => handleLike()}>
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
}

export default MovieCard;
