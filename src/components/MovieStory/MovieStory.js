import React from 'react';
import css from './MovieStory.module.scss';

function App() {
  return (
    <div className={css.main}>
      <div className={css.title}>나의 무비스토리</div>
      <div className={css.cardList}>
        <div>총 1건</div>
        <div className={css.cardListMain}></div>
      </div>
    </div>
  );
}

export default App;
