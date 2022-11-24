import React from 'react';
import css from './NoneData.module.scss';

function App() {
  return (
    <div className={css.main}>
      <div className={css.icon}>
        <i className="fa-solid fa-film"></i>
      </div>
      <div className={css.span1}>해당 지역에 상영 시간표가 없습니다. </div>
      <div className={css.span2}>다른지역을 선택해 주세요.</div>
    </div>
  );
}

export default App;
