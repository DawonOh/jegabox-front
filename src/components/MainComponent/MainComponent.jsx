import React, { useEffect, useState } from 'react';
import css from './MainComponent.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import { BsPlusLg } from 'react-icons/bs';

import MainUnderBar from '../MainUnderBar/MainUnderBar';
const MainComponent = () => {
  const [movieArray, setMovieArray] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/movie/main')
      .then(res => res.json())

      .then(res => setMovieArray(res.data));
  }, []);
  return (
    <>
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
            {movieArray.map(movie => {
              return (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  img={movie.movie_poster}
                  cnt={movie.cnt}
                  description={movie.description}
                  movie={movie}
                />
              );
            })}
          </div>
          <div>
            <MainUnderBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
