import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import css from './Booking.module.scss';
import DayBtn from '../../components/DayBtn/DayBtn';
import SelectSeat from '../SelectSeat/SelectSeat';
import MovieSche from '../../components/MovieSche/MovieSche';
import PageHeader from '../../components/PageHeader/PageHeader';
import Footer from '../../components/Footer/Footer';
import Ad from '../../components/Ad/Ad';

function Booking() {
  let now = new Date();
  let year = now.getFullYear(); //year
  let todayMonth = now.getMonth() + 1; //month
  let week = new Array('일', '월', '화', '수', '목', '금', '토');
  let date = now.getDate(); //날짜
  const [disable, setDisable] = useState(true);
  const [movies, setMovie] = useState([]);
  const [movieIds, setIds] = useState([]); //영화 선택 배열
  const [locations, setLocation] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [cinemas, setCinema] = useState([]);
  const [dayClick, setDayClick] = useState(-1);
  const [cinemaIds, setCinemaIds] = useState([]);
  let today = year + '-' + todayMonth + '-' + date;
  const [user_date, setDate] = useState(today);
  const [data, setData] = useState([]);

  //timetable에서 데이터 받아오기 위한 state
  const [movieObj, setMovieObj] = useState();
  const [userMovie, setUserMv] = useState({});
  const location = useLocation();
  useEffect(() => {
    const user = location.state.movie;
    console.log(user);
    setMovieObj(user);
  }, []);
  useEffect(() => {
    if (movieObj) {
      setUserMv(movieObj);
      setDisable(false);
    }
  }, [movieObj]);

  //보류 사용
  useEffect(() => {
    fetch('http://127.0.0.1:8000/booking/', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(res => setMovie(res.data));

    fetch('/data/cinema.json')
      .then(res => res.json())
      .then(res => setCinema(res.cinema));

    fetch('/data/location.json')
      .then(res => res.json())
      .then(res => setLocation(res.location));
  }, []);

  useEffect(() => {
    if (cinemaIds.length > 0) {
      fetch('http://127.0.0.1:8000/booking/movie-cinema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: user_date,
          movie_id: movieIds,
          cinema_id: cinemaIds,
        }),
      })
        .then(res => res.json())
        .then(res => {
          setData(res);
        });
    }
  }, [user_date, movieIds, cinemaIds]);

  const minusMovie = m_id => {
    setIds(movieIds.filter(movie => movie !== m_id));
  };

  const minusCinema = c_id => {
    setCinemaIds(cinemaIds.filter(cinema => cinema !== c_id));
  };
  const prtMovie = id => {
    const selectMovie = movies.filter(movie => movie.id === id);
    let movie = selectMovie[0] || {};
    let url = movie.movie_poster;

    return url ? (
      <div>
        <img
          className={css.closebtn}
          src="image/close.png"
          alt="closebtn"
          onClick={() => minusMovie(movie.id)}
        />
        <img src={url} alt="poster" />{' '}
      </div>
    ) : null;
  };

  const printDayBtn = () => {
    const result = [];
    for (let i = 0; i < 14; i++) {
      result.push(
        <DayBtn
          key={i}
          idx={i}
          date={now.setDate(i === 0 ? now.getDate() : now.getDate() + 1)}
          week={week[(i + 7) % 7]}
          today={date}
          setDate={setDate}
          dayClick={dayClick}
          setDayClick={setDayClick}
        />
      );
    }
    return result;
  };

  const prtCinema = () => {
    let result = [];
    const selectCinema = cinemas.filter(
      cinemas => cinemas.location_id === locationId
    );
    selectCinema.map((cinema, idx) =>
      result.push(
        <p
          key={idx}
          className={`${
            css.s_btn + (cinemaIds[idx] === cinema.id ? ' ' + css.active : '')
          }`}
          onClick={() =>
            cinemaIds.length < 2 && cinemaIds.lastIndexOf(cinema.id) === -1
              ? setCinemaIds([...cinemaIds, cinema.id])
              : alert('지역은 2개까지 선택하실 수 있습니다.')
          }
        >
          {cinema.cinema_name}
        </p>
      )
    );
    return result;
  };

  const prtTheater = num => {
    const selectTheater = cinemas.filter(cinema => cinema.id === num);
    let s_cinema = selectTheater[0] || {};
    let place = s_cinema.cinema_name;
    return place ? (
      <div>
        {' '}
        <img
          className={css.closebtn}
          src="/image/close.png"
          alt="closebtn"
          onClick={() => minusCinema(s_cinema.id)}
        />
        <p>{place}</p>
      </div>
    ) : null;
  };

  const printTimeBtn = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(
        <button key={i}>
          {0}
          {i}
        </button>
      );
    }
    return result;
  };

  const prtGrade = grade => {
    return <img className={css.grade} src={`image/${grade}.png`} alt="grade" />;
  };
  return (
    <div className={css.container}>
      <PageHeader />
      <div className={css.innerWrap}>
        <h2>빠른 예매</h2>
        {disable && (
          <div className={css.bookTable}>
            <div className={css.timeSchedule}>
              <div className={css.year}>
                <p>
                  {year}.{todayMonth}
                </p>
              </div>
              <button disabled={disable}>
                {' '}
                <img
                  src="image/left-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              {printDayBtn()}
              <button>
                {' '}
                <img
                  src="image/right-arrow.png"
                  alt="right-arrow"
                  width="12px"
                  height="12px"
                />
              </button>
              <div className={css.cal}>
                <img src="image/cal.png" alt="cal" />
              </div>
            </div>
            <div className={css.choiceArea}>
              <div className={css.movieChoice}>
                <p>영화</p>
                <div className={css.m_listArea}>
                  <p>전체</p>
                  <div className={css.m_list}>
                    {movies.map(function (movie, idx) {
                      return (
                        <div
                          key={idx}
                          className={`${
                            css.m_btn +
                            (movieIds[0] === movie.id ||
                            movieIds[1] === movie.id
                              ? ' ' + css.active
                              : '')
                          }`}
                          onClick={() => {
                            if (
                              movieIds.length < 2 &&
                              movieIds.lastIndexOf(movie.id) === -1
                            ) {
                              setIds([...movieIds, movie.id]);
                            } else {
                              alert('영화는 2개까지 선택하실 수 있습니다.');
                            }
                          }}
                        >
                          {prtGrade(movie.grade)}
                          <span>{movie.ko_title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={css.selectedMovie}>
                  <div className={css.movie1}>{prtMovie(movieIds[0])}</div>
                  <div className={css.movie2}>{prtMovie(movieIds[1])}</div>
                </div>
              </div>
              <div className={css.theaterChoice}>
                <p>극장</p>
                <div className={css.t_listArea}>
                  <p>전체</p>
                  <div className={css.t_list}>
                    <div className={css.location}>
                      {locations.map((location, idx) => (
                        <p
                          className={`${
                            css.btn +
                            (locationId === location.id ? ' ' + css.active : '')
                          }`}
                          key={idx}
                          onClick={() => {
                            setLocationId(location.id);
                          }}
                        >
                          {location.location_name}
                        </p>
                      ))}
                    </div>
                    <div className={css.cinema}>{prtCinema()}</div>
                  </div>
                </div>
                <div className={css.selectedTheater}>
                  <div className={css.theater1}>{prtTheater(cinemaIds[0])}</div>
                  <div className={css.theater2}>{prtTheater(cinemaIds[1])}</div>
                </div>
              </div>
              <div className={css.timeChoice}>
                <p>시간</p>
                <div className={css.h_listArea}>
                  {' '}
                  <button>
                    {' '}
                    <img
                      src="image/left-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                  {printTimeBtn()}
                  <button>
                    {' '}
                    <img
                      src="image/right-arrow.png"
                      alt="right-arrow"
                      width="12px"
                      height="12px"
                    />
                  </button>
                  <div className={css.movieSchedule}>
                    {cinemaIds.length !== 0 ? (
                      data.map((prop, idx) => (
                        <MovieSche
                          setDisable={setDisable}
                          key={idx}
                          movies={prop}
                          setUserMv={setUserMv}
                        />
                      ))
                    ) : (
                      <div className={css.message}>
                        <img src="image/sche.png" alt="sche" />
                        <p>
                          영화와 극장을 선택하시면 <br /> 상영시간표를 비교하여
                          볼 수 있습니다.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={css.ad}>
              <Ad
                link={'http://35.183.33.193:3000/'}
                url={'/image/jsop.png'}
                desc={'제이솝, 더 새로워진 제주 팝업 스토어에서 만나요'}
              />
            </div>
          </div>
        )}
        {!disable && (
          <SelectSeat userMovie={userMovie} setDisable={setDisable} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
