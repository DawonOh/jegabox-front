import React from 'react';
import css from './sortByMovie.module.scss';

function App({ titleList, setCurrTitle, currPoster, setTitleList }) {
  function clickEvent(event) {
    console.log(event.target.innerText);
    setCurrTitle(event.target.innerText);
  }

  return (
    <div className={css.mainDiv}>
      <div className={css.sortDiv}>
        <div className={css.sort}>영화별</div>
        <div className={css.sort}>극장별</div>
        <div className={css.sort}>특별관</div>
      </div>
      <div className={css.titleCategory}>
        <div className={css.movieCategory}></div>
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
