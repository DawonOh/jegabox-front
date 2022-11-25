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
import { useLocation } from 'react-router-dom';
const PlanningMovie = () => {
  const [letterOrder, setletterOrder] = useState(false);
  const [dateOrder, setDateOrder] = useState(false);
  const navigate = useNavigate();
  const [movieArray, setMovieArray] = useState([]);
  const letterTime = () => {
    setletterOrder(true);
    setDateOrder(false);
  };
  const daterTime = () => {
    setletterOrder(false);
    setDateOrder(true);
  };
  useEffect(() => {
    fetch('http://localhost:8000/movie/comingsoon', {
      method: 'POST',
      body: JSON.stringify({
        sort: '개봉일순',
      }),
    })
      .then(res => res.json())
      .then(res => setMovieArray(res.data));
    // .then(res => console.log(res));
  }, []);
  const getName = window.localStorage.getItem('name');
  const [validName, getValidName] = useState(false);
  useEffect(() => {
    if (getName) {
      getValidName(true);
    } else if (!getName || getName === 'undefined') {
      getValidName(false);
    }
  });

  useEffect(() => {
    letterOrder
      ? fetch('http://localhost:8000/movie/comingsoon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            sort: '개봉일순',
          }),
        })
          .then(res => res.json())
          .then(res => setMovieArray(res.data))
      : fetch('http://localhost:8000/movie/comingsoon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Authorization: localStorage.getItem('token'),
          },
          body: JSON.stringify({
            sort: '가나다순',
          }),
        })
          .then(res => res.json())
          .then(res => setMovieArray(res.data));
  }, [letterOrder]);
  const [searchResult, setSearchResult] = useState([]);
  const [resultCount, setResultCount] = useState([]);
  const [content, setContent] = useState('');
  let location = useLocation();
  let params = new URLSearchParams(location.search); //?query=구름
  let searchText = params.get('searchText');
  useEffect(() => {
    setContent(searchText);
    fetch('http://localhost:8000/movie' + location.search)
      .then(res => res.json())
      .then(json => {
        setResultCount(json.data.length);
        setSearchResult(json.data);
      });
  }, []);
  const getValue = e => {
    setContent(e.target.value);
  };
  const gotomovie = e => {
    if (content == '') {
      navigate('/movie/comingsoon');
    } else {
      let url = '/movie/comingsoon?searchText=' + content;
      navigate(url);
      window.location.reload();
    }
  };

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
            <span className={css.myname}>{validName ? getName : '로그인'}</span>
            {validName ? '님의 선호 장르 영화' : '하시면 보여드림'}
          </div>
        </div>
        <div className={css.functionBar}>
          <div className={css.toggleBtn}>
            <span
              onClick={daterTime}
              className={
                dateOrder ? `${css.switchNameClick}` : `${css.switchName}`
              }
              style={{ borderRight: '1px solid rgb(180, 180, 180)' }}
            >
              가나다순
            </span>
            <span
              className={
                letterOrder ? `${css.switchNameClick}` : `${css.switchName}`
              }
              onClick={letterTime}
            >
              개봉일순
            </span>
            <span className={css.movienumber}>
              <span className={css.highlightFont}>{movieArray.length}</span>개의
              영화가 검색되었습니다.
            </span>
          </div>

          <div className={css.searchBar}>
            <input
              onChange={getValue}
              type="text"
              defaultValue={searchText}
              placeholder="영화명 검색"
            ></input>
            <BiSearch className={css.searchIcon} onClick={gotomovie} />
          </div>
        </div>
      </div>
      <div className={css.cardList}>
        {searchText ? (
          !resultCount ? (
            <div className={css.notSearch}>검색결과가 없습니다.</div>
          ) : (
            searchResult.map((movie, i) => {
              return (
                <MainMovieCard
                  movie={movie}
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
            })
          )
        ) : (
          movieArray.map((movie, i) => {
            return (
              <MainMovieCard
                movie={movie}
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
          })
        )}
      </div>
      <Footer />
    </>
  );
};

export default PlanningMovie;
