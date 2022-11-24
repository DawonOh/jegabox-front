import React, { useState } from 'react';
import Footer from '../../components/Footer/Footer';
import PageHeader from '../../components/PageHeader/PageHeader';
import css from './WholeMovie.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import MainMovieCard from '../../components/MovieCard/MainMovieCard/MainMovieCard';
const WholeMovie = () => {
  // const [data, setData] = useState();
  // const newData = newData.sort();
  const navigate = useNavigate();
  const [movieArray, setMovieArray] = useState([]);
  const [check, setCheck] = useState(false);
  // useEffect(() => {
  //   fetch('http://localhost:8000/movie/main')
  //     // fetch('/data/mainMovie.json')
  //     .then(res => res.json())
  //     // .then(res => setMovieArray(res.mainMovie));
  //     .then(res => setMovieArray(res.data));
  // }, []);
  useEffect(() => {
    fetch('http://localhost:8000/movie/list', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: localStorage.getItem('token'),
      },
      body: JSON.stringify({
        released: '전체',
      }),
    })
      .then(res => res.json())
      .then(res => setMovieArray(res.data));
  }, []);

  useEffect(() => {
    !check
      ? fetch('http://localhost:8000/movie/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            released: '전체',
          }),
        })
          .then(res => res.json())
          .then(res => setMovieArray(res.data))
      : fetch('http://localhost:8000/movie/list', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            released: '개봉작만',
          }),
        })
          .then(res => res.json())
          .then(res => setMovieArray(res.data));
  }, [check]);

  // useEffect(() => {
  //   console.log('useEffect', movieArray);
  // }, [movieArray]);
  // const sendMovieInfo = () => {
  //   console.log(movieArray);
  // };
  const validCheck = () => {
    if (check == true) setCheck(false);
    if (check == false) setCheck(true);
  };
  //새터함수는 비동기함수처럼
  // useEffect(() => {
  //   console.log('useEffect', check);
  // }, [check]);

  const getName = window.localStorage.getItem('name');
  const [validName, getValidName] = useState(false);
  useEffect(() => {
    if (getName) getValidName(true);
    if (!getName) getValidName(false);
  });

  return (
    <>
      <PageHeader />
      <div className={css.submenuContainer}>
        <div className={css.submenu}>
          <span>
            <AiFillHome />
            <RiArrowRightSLine />
            영화
            <RiArrowRightSLine />
            전체영화
          </span>
        </div>
      </div>
      <div className={css.movieWhole}>
        <div className={css.title}>
          <span>전체영화</span>
        </div>
        <div className={css.menu}>
          <div className={`${css.pointer} ${css.highlight}`}>박스오피스</div>
          <div
            className={css.pointer}
            onClick={e => {
              navigate('/movie/comingsoon');
            }}
            style={{ borderLeft: 'none' }}
          >
            상영예정작
          </div>
          <div style={{ borderLeft: 'none' }}>특별상영</div>
          <div style={{ borderLeft: 'none' }}>필름소사이어티</div>
          <div style={{ borderLeft: 'none' }}>클래식소사이어티</div>
          <div style={{ borderLeft: 'none' }}>
            <span className={css.myname}>{validName ? getName : '로그인'}</span>
            {validName ? '님의 선호 장르 영화' : '하시면 보여드림'}
          </div>
        </div>
        <div className={css.functionBar}>
          <div className={css.toggleBtn}>
            <label className={css.switch}>
              <input
                type="checkbox"
                //checked={checkedBox}
                onChange={validCheck}
              />
              <span className={`${css.slider} ${css.round}`}></span>
            </label>
            <span className={css.switchName}>개봉작만</span>

            <span className={css.movienumber}>
              <span className={css.highlightFont}>{movieArray.length}</span>개의
              영화가 검색되었습니다.
            </span>
          </div>

          <div className={css.searchBar}>
            <input placeholder="영화명 검색"></input>
            <BiSearch className={css.searchIcon} />
          </div>
        </div>
      </div>
      <div className={css.cardList}>
        {movieArray.map((movie, i) => {
          return (
            <MainMovieCard
              movie={movie}
              age={movie.grade}
              title={movie.ko_title}
              key={movie.id}
              id={i + 1}
              img={movie.movie_poster}
              cnt={movie.cnt}
              description={movie.sub_description}
              date={movie.release_date}
              viewer={movie.viewer}
            />
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default WholeMovie;
