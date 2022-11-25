import React, { useEffect, useState } from 'react';
import css from './MainComponent.module.scss';
import MovieCard from '../MovieCard/MovieCard';
import { BsPlusLg } from 'react-icons/bs';

import MainUnderBar from '../MainUnderBar/MainUnderBar';
const MainComponent = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [likeArr, setLikeArr] = useState([]);
  const [change, setChange] = useState(true);
  //1. 처음에 4개의 카드정보 배열을 받아온다
  //2. 전체 정보 배열에서 라이크 상태값 배열을 뽑아낸다
  //3. 라이크 배열을 카드 컴포넌트로 전달한다
  //4. 라이크배열[idx]로 해당 카드의 라이크 상태를 찾아서 컴포넌트 안에서 선언한 state에 저장한다
  //5. 온클릭 이벤트로 바꿔준다

  //데이터 받아오기
  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/movie/main', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setMovieArray(res.data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/movie/main', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
      .then(res => res.json())
      .then(res => setMovieArray(res.data));
  }, [change]);

  //전체 정보 배열에서 라이크 상태값 배열 뽑아내기
  useEffect(() => {
    if (movieArray) {
      const likeArray = [];
      for (let i = 0; i < movieArray.length - 1; i++) {
        likeArray.push(movieArray[i].isLiked);
      }
      setLikeArr(likeArray);
    }
  }, [movieArray]);

  return (
    <>
      <div className={css.coverblack}>
        <div className={css.mainWhole}>
          <div className={css.mainTitle}>
            <span></span>
            <span className={css.boxOffice}>박스오피스</span>
            <span className={css.elseMovie}>
              더 많은 영화 보기
              <BsPlusLg className={css.plus} />
            </span>
          </div>
          <div className={css.moviecards}>
            {movieArray.map((movie, i) =>
              i < 4 ? (
                <MovieCard
                  movie={movie}
                  number={i + 1}
                  key={movie.id}
                  id={movie.id}
                  img={movie.movie_poster}
                  cnt={movie.cnt}
                  description={movie.description}
                  likeArr={likeArr}
                  setChange={setChange}
                />
              ) : null
            )}
          </div>
          <div>
            <MainUnderBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainComponent;
