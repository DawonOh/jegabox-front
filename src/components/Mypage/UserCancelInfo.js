import React from 'react';
import css from './UserCancelInfo.module.scss';

function App(elem) {
  console.log(elem.elem.cinema_name);
  return (
    <div className={css.main}>
      <div className={css.cell}>{elem.elem.created_at}</div>
      <div className={css.cell}>{elem.elem.movie_title}</div>
      <div className={css.cell}>{elem.elem.cinema_name}</div>
      <div className={css.cell}>
        {elem.elem.showtime_day} {elem.elem.start_time}
      </div>
      <div className={css.cell} style={{ color: 'red' }}>
        {elem.elem.price}
      </div>
    </div>
  );
}

export default App;
