import React from 'react';
import css from './UserCancelInfo.module.scss';

function App() {
  return (
    <div className={css.main}>
      <div className={css.cell}>2202.11.10(16:29)</div>
      <div className={css.cell}>블랙 팬서: 와칸다 포에버</div>
      <div className={css.cell}>화곡</div>
      <div className={css.cell}>2022.11.20 (일) 16:10</div>
      <div className={css.cell} style={{ color: 'red' }}>
        15,000
      </div>
    </div>
  );
}

export default App;
