import React, { useState, useEffect } from 'react';
import css from './Booking.module.scss';
import DayBtn from '../../components/DayBtn/DayBtn';
import SelectSeat from '../SelectSeat/SelectSeat';
import MovieSche from '../../components/MovieSche/MovieSche';
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

  const [cinemaIds, setCinemaIds] = useState([]);
  //시차 때문에 20=>date로 고쳐야함
  let today = year + '-' + todayMonth + '-' + 20;
  const [user_date, setDate] = useState(today);
  const [data, setData] = useState([]);
  //유저가 티켓을 사기 위해 클릭한 영화
  const [userMovie, setUserMv] = useState({});
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
        .then(res => setData(res));
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
          src="/image/close.png"
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
          date={now.setDate(date + i)}
          week={week[(i + 5) % 7]}
          today={date}
          setDate={setDate}
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
          onClick={() =>
            cinemaIds.length < 2
              ? setCinemaIds([...cinemaIds, cinema.id])
              : null
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

  return (
    <div className={css.container}>
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
                    {movies.map((movie, idx) => (
                      <span
                        key={idx}
                        onClick={() => {
                          if (movieIds.length < 2) {
                            setIds([...movieIds, movie.id]);
                          }
                        }}
                      >
                        {movie.ko_title}
                      </span>
                    ))}
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
            <div className={css.ad}>AD</div>
          </div>
        )}
        {!disable && (
          <SelectSeat userMovie={userMovie} setDisable={setDisable} />
        )}
      </div>
    </div>
  );
}

export default Booking;
