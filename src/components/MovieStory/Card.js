import React, { useEffect } from 'react';
import css from './Card.module.scss';
import { Link } from 'react-router-dom';
import { AiOutlineHeart } from 'react-icons/ai';
import age12 from '../../img/12.png';
import age15 from '../../img/15.png';
import age18 from '../../img/18.png';
import ageAll from '../../img/all.png';
import { useState } from 'react';
const MainMovieCard = props => {
  const { id, img, cnt, description, date, title, age, viewer } = props;
  const [grade, setGrade] = useState('');
  const [story, setStory] = useState(false);
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
          />
          <span className={story ? `${css.story}` : `${css.none}`}>
            {description}
          </span>
        </div>
        <div className={css.movieInformation}>
          <img className={css.age} src={grade} />
          <span className={css.movieTitle}>{title}</span>
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

export default MainMovieCard;
