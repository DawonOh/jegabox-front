import React, { useState, useEffect } from 'react';
import css from './sortByMovie.module.scss';

function App({ idx, elem, setCurrTitle, setMovieClickCheck, movieClickCheck }) {
  const [backgroundColor, setBackgroundColor] = useState();
  const [color, setColor] = useState();

  function clickEvent(event) {
    setCurrTitle(event.target.innerText);
    setMovieClickCheck(idx);
  }

  useEffect(() => {
    idx === movieClickCheck
      ? setBackgroundColor('rgb(85, 85, 85)')
      : setBackgroundColor('white');

    idx === movieClickCheck ? setColor('white') : setColor('rgb(85, 85, 85)');
  }, [movieClickCheck]);

  return (
    <div
      onClick={clickEvent}
      key={idx}
      className={css.movieTitle}
      style={{ backgroundColor: backgroundColor, color: color }}
    >
      {elem}
    </div>
  );
}

export default App;
