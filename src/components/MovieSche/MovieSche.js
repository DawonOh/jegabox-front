import React from 'react';
import css from './MovieSche.module.scss';
function MovieSche({ movies, setDisable }) {
  let [hour, minute] = movies.seats.time.split(':');
  let time = Number(hour) * 60 + Number(minute) + movies.movie_time;
  let f_time = String(Math.floor(time / 60)) + ':' + String(time % 60);
  const goToSelect = () => {
    console.log('in');
    setDisable(false);
  };
  return (
    <div
      className={css.component}
      onClick={() => {
        goToSelect();
      }}
    >
      <div className={css.time}>
        <b>{movies.seats.time} </b>
        <span>~ {f_time}</span>
      </div>

      <div className={css.title}>
        <span>{movies.title}</span>{' '}
        <p className={css.property}>{movies.movie_property}</p>
      </div>
      <div className={css.seats}>
        <span className={css.location}>{movies.cinema_name}</span>
        <span className={css.screen}>{movies.screen}관</span>
        <span className={css.seat}>
          {movies.seats.seats.length}
          <span className={css.allSeat}>/20</span>
        </span>
      </div>
    </div>
  );
}

export default MovieSche;
