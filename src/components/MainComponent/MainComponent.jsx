import React from 'react';
import css from './MainComponent.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import { BsPlusLg } from 'react-icons/bs';
const MainComponent = () => {
  return (
    <div className={css.coverblack}>
      <div className={css.mainWhole}>
        <div className={css.mainTitle}>
          <span></span>
          <span className={css.boxOffice}>박스오피스</span>
          <span className={css.elseMovie}>
            더 많은 영화 보기
            <BsPlusLg className={css.plus} />
          </span>
        </div>
        <div className={css.moviecards}>
          <MovieCard />
          <MovieCard />
          <MovieCard />
          <MovieCard />
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default MainComponent;
