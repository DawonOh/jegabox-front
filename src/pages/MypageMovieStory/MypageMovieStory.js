import React from 'react';
import css from './MypageMovieStory.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import MovieStory from '../../components/MovieStory/MovieStory';
function App() {
  return (
    <div className={css.main}>
      <MypageSidebar />
      <MovieStory />
    </div>
  );
}

export default App;
