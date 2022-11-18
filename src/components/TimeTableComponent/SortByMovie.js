import React from 'react';
import css from './sortByMovie.module.scss';

function App({
  titleList,
  setCurrTitle,
  currPoster,
  setTitleList,
  setCurrPoster,
}) {
  function clickEvent(event) {
    setCurrTitle(event.target.innerText);
  }

  return (
    <div className={css.mainDiv}>
      <div className={css.sortDiv}>
        <div
          className={css.sort}
          style={{ color: 'rgb(50, 32, 98)', borderRight: 'none' }}
        >
          <i className="fa-solid fa-film"></i>
          영화별
        </div>
        <div
          className={css.sort}
          style={{ backgroundColor: 'rgb(242, 242, 242)' }}
        >
          <i
            className="fa-solid fa-users-rectangle"
            style={{ backgroundColor: 'rgb(242, 242, 242)' }}
          ></i>
          극장별
        </div>
        <div
          className={css.sort}
          style={{ backgroundColor: 'rgb(242, 242, 242)' }}
        >
          <i className="fa-solid fa-champagne-glasses"></i>
          특별관
        </div>
      </div>
      <div className={css.titleCategory}>
        <div className={css.movieCategory}>
          <div className={css.category}>전체영화</div>
          <div className={css.category}>큐레이션</div>
        </div>
        <div className={css.movieTitleDiv}>
          {titleList.map((elem, idx) => {
            return (
              <div onClick={clickEvent} key={idx} className={css.movieTitle}>
                {elem}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className={css.moviePosterDiv}
        style={{ backgroundImage: `url('${currPoster}')` }}
      ></div>
    </div>
  );
}

export default App;
