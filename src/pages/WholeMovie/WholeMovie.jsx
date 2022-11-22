import React from 'react';
import Footer from '../../components/Footer/Footer';
import PageHeader from '../../components/PageHeader/PageHeader';
import css from './WholeMovie.module.scss';
import { BiSearch } from 'react-icons/bi';
import { AiFillHome } from 'react-icons/ai';
import { RiArrowRightSLine } from 'react-icons/ri';
import MainMovieCard from '../../components/MovieCard/MainMovieCard/MainMovieCard';
const WholeMovie = () => {
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
          <div className={css.highlight}>박스오피스</div>
          <div style={{ borderLeft: 'none' }}>상영예정작</div>
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
              <span className={css.highlightFont}>121</span>개의 영화가
              검색되었습니다.
            </span>
          </div>

          <div className={css.searchBar}>
            <input placeholder="영화명 검색"></input>
            <BiSearch className={css.searchIcon} />
          </div>
        </div>
      </div>
      <div className={css.cardList}>
        <MainMovieCard />
      </div>
      <Footer />
    </>
  );
};

export default WholeMovie;
