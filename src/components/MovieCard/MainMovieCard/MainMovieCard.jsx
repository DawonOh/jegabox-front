import React, { useEffect } from 'react';
import css from './MainMovieCard.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import age12 from '../../../img/12.png';
import age15 from '../../../img/15.png';
import age18 from '../../../img/18.png';
import ageAll from '../../../img/all.png';
import { useState } from 'react';
import { AiFillHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
const MainMovieCard = props => {
  const navigate = useNavigate();
  const [like, setLike] = useState();

  const {
    id,
    img,
    cnt,
    description,
    date,
    title,
    age,
    viewer,
    number,
    movie,
    likeArr,
  } = props;
  const [grade, setGrade] = useState('');
  const [story, setStory] = useState(false);
  console.log('in movie Card');
  // useEffect(() => {
  //   setLike(likeArr[number]);
  //   console.log(like);
  // }, []);
  // const makeLikeNum = () => {
  //   setLikeNum(likeNum + 1);
  //   if (likeNum % 2 == 0) {
  //     console.log(likeNum);
  //     setlike(false);
  //   }
  //   if (likeNum % 2 == 1) setlike(true);
  //   console.log(likeNum);
  // };
  const makeStory = () => {
    setStory(true);
  };
  const outStory = () => {
    setStory(false);
  };

  useEffect(() => {
    if (age == '12세이상관람가') {
      setGrade(age12);
    } else if (age == '15세이상관람가') {
      setGrade(age15);
    } else if (age == '18세이상관람가') {
      setGrade(age18);
    } else {
      setGrade(ageAll);
    }
  }, []);

  const handleLike = async () => {
    const token = localStorage.getItem('token');
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
        <div className={css.img}>
          <img
            className={css.moviePoster}
            onMouseOut={outStory}
            onMouseOver={makeStory}
            src={img}
            onClick={() => navigate(`/detail?movieNo=${id}`)}
          />{' '}
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
        <div className={css.movieInformation}>
          <img className={css.age} src={grade} />
          <span className={css.movieTitle}>{title}</span>
        </div>
        <div className={css.movieInfo}>
          <div className={css.moviePeople}>
            관객수 <span>{viewer}</span>
          </div>
          <div className={css.movieDate}>
            개봉일 <span>{date}</span>
          </div>
        </div>
        <div className={css.underImg}>
          <div className={css.movieLike} onClick={handleLike}>
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

export default MainMovieCard;
