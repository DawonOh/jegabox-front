import React from 'react';
import css from './MypageMovieStory.module.scss';
import MypageSidebar from '../../components/Mypage/MypageSidebar';
import MovieStory from '../../components/MovieStory/MovieStory';
import Header from '../../components/PageHeader/PageHeader';
function App() {
  return (
    <div className={css.main}>
      <Header />
      <div className={css.right}>
        <MypageSidebar />
        <MovieStory />
      </div>
    </div>
  );
}

export default App;
