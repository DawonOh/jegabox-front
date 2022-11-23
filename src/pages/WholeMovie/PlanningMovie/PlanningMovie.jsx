import React from 'react';
import Footer from '../../../components/Footer/Footer';
import PageHeader from '../../../components/PageHeader/PageHeader';
import css from './PlanningMovie.module.scss';
import { useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import MainMovieCard from '../../../components/MovieCard/MainMovieCard/MainMovieCard';
import { useState } from 'react';
import { useEffect } from 'react';
const PlanningMovie = () => {
  const navigate = useNavigate();
  const [movieArray, setMovieArray] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8000/movie/comingsoon', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(res => setMovieArray(res.data));
  }, []);
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
          <div
            className={css.pointer}
            onClick={e => {
              navigate('/movie');
            }}
            style={{ borderRight: 'none' }}
          >
            박스오피스
          </div>
          <div className={`${css.pointer} ${css.highlight}`}>상영예정작</div>
          <div style={{ borderLeft: 'none' }}>특별상영</div>
          <div style={{ borderLeft: 'none' }}>필름소사이어티</div>
          <div style={{ borderLeft: 'none' }}>클래식소사이어티</div>
          <div style={{ borderLeft: 'none' }}>
            <span className={css.myname}>오수빈</span>님 선호 장르 영화
          </div>
        </div>
        <div className={css.functionBar}>
          <div className={css.toggleBtn}>
            <label className={css.switch}>
              <input type="checkbox" />
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
              age={movie.grade}
              title={movie.ko_title}
              key={movie.id}
              id={i + 1}
              img={movie.movie_poster}
              cnt={movie.cnt}
              description={movie.description}
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

export default PlanningMovie;
