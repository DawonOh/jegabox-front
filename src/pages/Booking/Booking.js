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
  //영화 선택 배열
  const [movieIds, setIds] = useState([]);
  const [locations, setLocation] = useState([]);
  const [locationId, setLocationId] = useState([]);
  const [cinemas, setCinema] = useState([]);
  const [cinemaId, setCinemaId] = useState();
  const [user_date, setDate] = useState();
  const [data, setData] = useState([]);
  const [userMovie, setUserMv] = useState({});
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
    prtMovie(); //영화 선택시, 밑에 영화 포스터 뜨게 하기 => 최대 3개까지 인거 생각하고 다시ㅏ찍
  }, [movieIds]);

  useEffect(() => {
    prtCinema(); //유저가 로케이션 클릭시 해당지역 영화관 뜨게 하기.
  }, [locationId]);

  //유저가 선택한 시네마 출력하기

  useEffect(() => {
    if (user_date && movieIds && cinemaId) {
      fetch('http://127.0.0.1:8000/booking/movie-cinema', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: user_date,
          movie_id: movieIds,
          cinema_id: cinemaId,
        }),
      })
        .then(res => res.json())
        .then(res => setData(res));
    }
  }, [user_date, movieIds, cinemaId]);

  const prtMovie = id => {
    const selectMovie = movies.filter(movie => movie.id === id);
    let url = selectMovie[0] || {};
    url = url.movie_poster;
    return url ? <img src={url} alt="poster" /> : null;
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
    selectCinema.map((cinema, idx) => {
      result.push(
        <p key={idx} onClick={() => setCinemaId(cinema.id)}>
          {cinema.cinema_name}
        </p>
      );
    });
    return result;
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
                          setIds(movie.id);
                        }}
                      >
                        {movie.ko_title}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={css.selectedMovie}>
                  <div className={css.movie1}>{prtMovie(movieIds)}</div>
                  {/* {여기 수정} */}
                  <div className={css.movie2}>{prtMovie()}</div>
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
                  <div className={css.theater1}>{cinemaId}</div>
                  <div className={css.theater2}>{cinemaId}</div>
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
                    {data.map((prop, idx) => (
                      <MovieSche
                        setDisable={setDisable}
                        key={idx}
                        movies={prop}
                        setUserMv={setUserMv}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className={css.ad}>광고</div>
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
