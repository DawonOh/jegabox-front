import React from 'react';
import css from './MovieStory.module.scss';
import Card from './Card';

function App() {
  return (
    <div className={css.main}>
      <div className={css.title}>나의 무비스토리</div>
      <div className={css.filterDiv}>
        <div className={css.filter}>무비타임라인</div>
        <div className={css.filter}>무비포스트</div>
        <div className={css.filter}>관람평</div>
        <div className={css.filter}>본영화</div>
        <div className={css.filter}>보고싶어</div>
      </div>
      <div className={css.cardList}>
        <div className={css.total}>총 1건</div>
        <div className={css.cardListMain}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default App;
