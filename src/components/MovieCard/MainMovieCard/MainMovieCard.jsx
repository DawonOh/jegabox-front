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
  const [like, setlike] = useState(false);
  const [likeNum, setLikeNum] = useState(1);
  const { id, img, cnt, description, date, title, age, viewer, onClick } =
    props;
  const [grade, setGrade] = useState('');
  const [story, setStory] = useState(false);
  const [movieArray, setMovieArray] = useState([]);
  // useEffect(() => {
  //   //fetch('http://localhost:8000/movie/main');
  //   fetch('/data/mainMovie.json')
  //     .then(res => res.json())
  //     .then(res => setMovieArray(res.mainMovie));
  //   // .then(res => setMovieArray(res.data));
  // }, []);
  const sendMovieInfo = () => {
    console.log(movieArray);
  };
  const makeLikeNum = () => {
    setLikeNum(likeNum + 1);
    if (likeNum % 2 == 0) {
      console.log(likeNum);
      setlike(false);
    }
    if (likeNum % 2 == 1) setlike(true);
    console.log(likeNum);
  };
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

  return (
    <>
      <div className={css.cardWhole}>
        <span className={css.cardNumber}>{id}</span>
        <div className={css.img}>
          <img
            className={css.moviePoster}
            onMouseOut={outStory}
            onMouseOver={makeStory}
            src={img}
            onClick={() => navigate(`/detail?movieNo=${id}`)}
          />
          <span className={story ? `${css.story}` : `${css.none}`}>
            {description}
          </span>
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
          <div className={css.movieLike} onClick={makeLikeNum}>
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
          <div className={css.reservation}>
            <span>예매</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainMovieCard;
